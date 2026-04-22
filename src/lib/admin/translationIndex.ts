import type { Translations } from "@/data/translations";

/**
 * Recursively walk the Translations object and collect all leaf string values.
 * Returns Map<textValue, keyPath[]> (multiple paths can have the same value).
 */
export function buildTranslationIndex(
  t: Translations
): Map<string, string[]> {
  const index = new Map<string, string[]>();

  function walk(obj: unknown, path: string) {
    if (typeof obj === "string") {
      const existing = index.get(obj) || [];
      existing.push(path);
      index.set(obj, existing);
      return;
    }
    if (Array.isArray(obj)) {
      obj.forEach((item, i) => walk(item, `${path}.${i}`));
      return;
    }
    if (obj && typeof obj === "object") {
      for (const [key, value] of Object.entries(obj)) {
        walk(value, path ? `${path}.${key}` : key);
      }
    }
  }

  walk(t, "");
  return index;
}

/**
 * Get a value from the translations object by dot-notation key path.
 */
export function getByPath(
  t: Translations,
  keyPath: string
): string | undefined {
  const parts = keyPath.split(".");
  let current: unknown = t;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : undefined;
}
