#!/usr/bin/env tsx
/**
 * Visual reproduction helper.
 *
 * Capture a screenshot of the running dev server at a specific device
 * viewport for bug reports and feature reviews. See
 * .claude/docs/visual-reproduction.md for the full procedure and conventions.
 *
 * Usage:
 *   npm run visual:repro -- --url /projects --viewport "iPhone SE" --out before.png
 *
 * Prerequisite: dev server running (`npm run dev` in another terminal).
 */
import { chromium, devices } from "@playwright/test";
import { mkdirSync } from "fs";
import { dirname } from "path";

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

const urlArg = arg("url") ?? "/";
const viewportName = arg("viewport") ?? "iPhone SE";
const out = arg("out") ?? "repro.png";
const base = arg("base") ?? "http://localhost:3000";

const fullUrl = /^https?:/.test(urlArg) ? urlArg : `${base}${urlArg}`;
const device = devices[viewportName];

if (!device) {
  const names = Object.keys(devices);
  const mobile = names.filter((n) => /iPhone|Pixel|Galaxy/.test(n)).slice(0, 8);
  const tablet = names.filter((n) => /iPad/.test(n)).slice(0, 4);
  const desktop = names.filter((n) => /Desktop/.test(n)).slice(0, 4);
  console.error(`Unknown viewport: "${viewportName}"`);
  console.error("Playwright device names are case-sensitive. Examples:");
  console.error(`  Mobile:  ${mobile.join(", ")}`);
  console.error(`  Tablet:  ${tablet.join(", ")}`);
  console.error(`  Desktop: ${desktop.join(", ")}`);
  process.exit(1);
}

(async () => {
  mkdirSync(dirname(out) || ".", { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({ ...device });
  const page = await context.newPage();

  try {
    await page.goto(fullUrl, { waitUntil: "networkidle", timeout: 30000 });
  } catch (err) {
    console.error(`Failed to navigate to ${fullUrl}`);
    console.error("Is the dev server running? (npm run dev)");
    console.error(err instanceof Error ? err.message : String(err));
    await browser.close();
    process.exit(1);
  }

  await page.screenshot({ path: out, fullPage: true });
  await browser.close();

  const { width, height } = device.viewport ?? { width: 0, height: 0 };
  console.log(`Saved: ${out}`);
  console.log(`  Viewport: ${viewportName} (${width}x${height})`);
  console.log(`  URL:      ${fullUrl}`);
})();
