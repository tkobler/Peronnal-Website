/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS script run by `node`, not part of the Next.js bundle */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const IMG_DIR = path.join(__dirname, "..", "public", "images");
const MAX_WIDTH = 1920;
const JPEG_QUALITY = 80;
const MIN_SIZE = 100 * 1024; // 100 KB threshold to attempt compression

async function isOpaquePng(buf) {
  const meta = await sharp(buf).metadata();
  if (!meta.hasAlpha) return true;
  const { data } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < 255) return false;
  }
  return true;
}

function walk(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(walk(full));
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const beforeSize = fs.statSync(filePath).size;

  if (beforeSize < MIN_SIZE) {
    return { filePath, beforeSize, afterSize: beforeSize, skipped: true };
  }

  const buf = fs.readFileSync(filePath);
  const meta = await sharp(buf).metadata();

  let candidates = [];

  if (ext === ".png") {
    const opaque = await isOpaquePng(buf);

    // Strategy 1: standard PNG compression
    {
      let p = sharp(buf);
      if (meta.width > MAX_WIDTH) p = p.resize({ width: MAX_WIDTH, withoutEnlargement: true });
      if (opaque) p = p.flatten({ background: { r: 255, g: 255, b: 255 } });
      const out = await p.png({ compressionLevel: 9, effort: 10, palette: false }).toBuffer();
      candidates.push(out);
    }

    // Strategy 2: palette-based lossy PNG (like pngquant) - great for photos
    if (opaque && beforeSize > 500 * 1024) {
      let p = sharp(buf);
      if (meta.width > MAX_WIDTH) p = p.resize({ width: MAX_WIDTH, withoutEnlargement: true });
      p = p.flatten({ background: { r: 255, g: 255, b: 255 } });
      const out = await p.png({ quality: 85, effort: 10, palette: true, colors: 256 }).toBuffer();
      candidates.push(out);
    }
  } else {
    // JPEG
    let p = sharp(buf);
    if (meta.width > MAX_WIDTH) p = p.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    const out = await p.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();
    candidates.push(out);
  }

  // Pick the smallest candidate
  candidates.sort((a, b) => a.length - b.length);
  const best = candidates[0];

  if (best.length < beforeSize) {
    fs.writeFileSync(filePath, best);
    return { filePath, beforeSize, afterSize: best.length, skipped: false };
  }
  return { filePath, beforeSize, afterSize: beforeSize, skipped: true, reason: "no gain" };
}

async function main() {
  const files = walk(IMG_DIR);
  console.log(`Found ${files.length} images in ${IMG_DIR}\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const f of files) {
    const result = await compressImage(f);
    totalBefore += result.beforeSize;
    totalAfter += result.afterSize;

    const rel = path.relative(path.join(__dirname, ".."), f);
    const bMB = (result.beforeSize / 1024 / 1024).toFixed(2);
    const aMB = (result.afterSize / 1024 / 1024).toFixed(2);

    if (result.skipped) {
      const reason = result.reason || "< 100KB";
      console.log(`SKIP  ${rel}  (${bMB} MB) [${reason}]`);
    } else {
      const pct = (((result.beforeSize - result.afterSize) / result.beforeSize) * 100).toFixed(1);
      console.log(`DONE  ${rel}  ${bMB} MB -> ${aMB} MB  (-${pct}%)`);
    }
  }

  console.log("\n--- TOTALS ---");
  console.log(`Before: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
  console.log(`After:  ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Saved:  ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(2)} MB  (${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
