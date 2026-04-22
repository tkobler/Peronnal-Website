/**
 * Translation key validation script.
 * Compares EN and FR translation files to ensure key parity.
 * Run with: npx tsx scripts/validate-translations.ts
 */

import { getTranslations } from "../src/data/translations/index";

function getKeys(obj: unknown, prefix = ""): string[] {
  if (obj === null || obj === undefined) return [];
  if (typeof obj !== "object") return [prefix];
  if (Array.isArray(obj)) return [prefix]; // arrays are leaf values

  const keys: string[] = [];
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    const path = prefix ? `${prefix}.${key}` : key;
    keys.push(...getKeys(value, path));
  }
  return keys;
}

const en = getTranslations("en");
const fr = getTranslations("fr");

const enKeys = new Set(getKeys(en));
const frKeys = new Set(getKeys(fr));

const missingInFr = [...enKeys].filter((k) => !frKeys.has(k));
const missingInEn = [...frKeys].filter((k) => !enKeys.has(k));

let hasErrors = false;

if (missingInFr.length > 0) {
  hasErrors = true;
  console.error(`\n❌ Keys missing in FR (${missingInFr.length}):`);
  missingInFr.forEach((k) => console.error(`  - ${k}`));
}

if (missingInEn.length > 0) {
  hasErrors = true;
  console.error(`\n❌ Keys missing in EN (${missingInEn.length}):`);
  missingInEn.forEach((k) => console.error(`  - ${k}`));
}

if (hasErrors) {
  console.error("\n⚠️  Translation key mismatch detected.\n");
  process.exit(1);
} else {
  console.log(`✅ All ${enKeys.size} translation keys match between EN and FR.`);
}
