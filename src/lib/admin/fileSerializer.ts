/**
 * Maps translation key paths to their source files and applies text edits
 * to TypeScript source files while preserving structure.
 */

/** First segment of a key path -> source file name (without locale prefix). */
const KEY_TO_FILE: Record<string, string> = {
  nav: "nav.ts",
  hero: "hero.ts",
  homeCards: "homeCards.ts",
  explore: "homeCards.ts",
  projects: "projects.ts",
  projectsContent: "projects.ts",
  projectDetailsContent: "projectDetails.ts",
  experience: "experience.ts",
  experienceData: "experience.ts",
  flight: "flightLog.ts",
  flightLog: "flightLog.ts",
  contact: "contact.ts",
  footer: "footer.ts",
  about: "about.ts",
  placeholder: "placeholder.ts",
};

/**
 * Resolve a translation key path to the repo-relative source file.
 *
 * @example keyPathToFile("nav.home", "en") => "src/data/translations/en/nav.ts"
 */
export function keyPathToFile(keyPath: string, locale: string): string {
  const segment = keyPath.split(".")[0];
  const file = KEY_TO_FILE[segment];
  if (!file) {
    throw new Error(
      `Unknown translation key segment "${segment}" (from key path "${keyPath}")`,
    );
  }
  return `src/data/translations/${locale}/${file}`;
}

/**
 * Apply a set of string-literal edits to a TypeScript source string.
 *
 * Each edit replaces the *first* occurrence of a quoted string literal
 * (`"oldValue"` or `'oldValue'`) with the new value, keeping the original
 * quote style. The match is exact (full quoted string, not a substring).
 */
export function applyEditsToSource(
  source: string,
  edits: Array<{ oldValue: string; newValue: string }>,
): string {
  let result = source;

  for (const { oldValue, newValue } of edits) {
    // Try double quotes first, then single quotes, then template literals
    const doubleQuoted = `"${oldValue}"`;
    const singleQuoted = `'${oldValue}'`;
    const templateQuoted = `\`${oldValue}\``;

    if (result.includes(doubleQuoted)) {
      result = result.replace(doubleQuoted, `"${newValue}"`);
    } else if (result.includes(singleQuoted)) {
      result = result.replace(singleQuoted, `'${newValue}'`);
    } else if (result.includes(templateQuoted)) {
      result = result.replace(templateQuoted, `\`${newValue}\``);
    } else {
      throw new Error(
        `Could not find string literal "${oldValue}" in source`,
      );
    }
  }

  return result;
}
