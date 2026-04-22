/**
 * Converts a PNG/JPG image to a DotPattern bitmap schematic.
 * Usage: npx tsx scripts/image-to-bitmap.ts <image-path> [options]
 */

import sharp from "sharp";
import path from "path";

async function main() {
  const args = process.argv.slice(2);
  const imagePath = args[0];
  if (!imagePath) {
    console.error("Usage: npx tsx scripts/image-to-bitmap.ts <image-path> [--cols N] [--x N] [--y N] [--w N] [--threshold N] [--invert]");
    process.exit(1);
  }

  const getArg = (name: string, def: number) => {
    const idx = args.indexOf(`--${name}`);
    return idx >= 0 && args[idx + 1] ? Number(args[idx + 1]) : def;
  };
  const cols = getArg("cols", 80);
  const x = getArg("x", 15);
  const y = getArg("y", 40);
  const w = getArg("w", 70);
  const threshold = getArg("threshold", 200);
  const invert = args.includes("--invert");

  const metadata = await sharp(path.resolve(imagePath)).metadata();
  const hasAlpha = !!metadata.hasAlpha;
  const srcW = metadata.width!;
  const srcH = metadata.height!;
  const aspect = srcH / srcW;
  const rows = Math.round(cols * aspect);

  let bitmap = "";
  let onCount = 0;

  if (hasAlpha) {
    // PNG with alpha: use alpha channel as the mask.
    // Non-transparent pixels = shape. Brightness controls density.
    const { data } = await sharp(path.resolve(imagePath))
      .resize(cols, rows, { fit: "fill" })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const channels = 4; // RGBA

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = (r * cols + c) * channels;
        const red = data[idx], green = data[idx + 1], blue = data[idx + 2], alpha = data[idx + 3];

        // Transparent = background
        if (alpha < 30) {
          bitmap += "0";
          continue;
        }

        // Semi-transparent or opaque: check brightness
        // For a line drawing, dark lines on transparent = shape
        const gray = (red + green + blue) / 3;
        const isShape = invert ? (gray > threshold) : (gray < threshold);
        bitmap += isShape ? "1" : "0";
        if (isShape) onCount++;
      }
    }
  } else {
    // JPEG or no-alpha: flatten onto white, use brightness.
    // Detect checkerboard background (gray ~204 and ~255 alternating).
    const { data } = await sharp(path.resolve(imagePath))
      .resize(cols, rows, { fit: "fill" })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const channels = 3;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = (r * cols + c) * channels;
        const red = data[idx], green = data[idx + 1], blue = data[idx + 2];
        const gray = (red + green + blue) / 3;

        // Detect checkerboard (uniform gray in the 195-215 or >248 range)
        const maxDiff = Math.max(Math.abs(red - green), Math.abs(red - blue), Math.abs(green - blue));
        if (maxDiff < 15 && (gray > 195 || gray < 5)) {
          bitmap += "0";
          continue;
        }

        const isShape = invert ? (gray > threshold) : (gray < threshold);
        bitmap += isShape ? "1" : "0";
        if (isShape) onCount++;
      }
    }
  }

  const h = Math.round(w * aspect * (16 / 9));

  console.log(`// Image: ${path.basename(imagePath)}`);
  console.log(`// Resolution: ${cols}x${rows} (${onCount} active pixels, ${Math.round(onCount / (cols * rows) * 100)}% fill)`);
  console.log(`// Position: (${x}%, ${y}%) — Size: ${w}% × ${h}%`);
  console.log("");
  console.log(`const IMAGE_SCHEMATIC: Schematic = {`);
  console.log(`  paths: [],`);
  console.log(`  pads: [],`);
  console.log(`  bitmap: {`);
  console.log(`    data: "${bitmap}",`);
  console.log(`    cols: ${cols},`);
  console.log(`    rows: ${rows},`);
  console.log(`    x: ${x},`);
  console.log(`    y: ${y},`);
  console.log(`    w: ${w},`);
  console.log(`    h: ${h},`);
  console.log(`  },`);
  console.log(`};`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
