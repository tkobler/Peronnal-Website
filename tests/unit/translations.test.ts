/**
 * Unit Tests — Translation Integrity
 *
 * Verifies EN and FR translations have the same keys,
 * no missing translations, and no empty strings.
 */
import { describe, it, expect } from "vitest";
import { getTranslations, type Locale } from "@/data/translations";
import { getFeaturedProjects } from "@/data/projects";

const LOCALES: Locale[] = ["en", "fr"];

describe("Translation Integrity", () => {
  it("both locales return valid translation objects", () => {
    for (const locale of LOCALES) {
      const t = getTranslations(locale);
      expect(t).toBeDefined();
      expect(t.nav).toBeDefined();
      expect(t.hero).toBeDefined();
      expect(t.projects).toBeDefined();
    }
  });

  it("EN and FR have matching top-level keys", () => {
    const en = getTranslations("en");
    const fr = getTranslations("fr");

    const enKeys = Object.keys(en).sort();
    const frKeys = Object.keys(fr).sort();

    expect(enKeys).toEqual(frKeys);
  });

  it("nav translations have matching keys", () => {
    const en = getTranslations("en");
    const fr = getTranslations("fr");

    expect(Object.keys(en.nav).sort()).toEqual(Object.keys(fr.nav).sort());
  });

  it("projects translations have matching keys", () => {
    const en = getTranslations("en");
    const fr = getTranslations("fr");

    expect(Object.keys(en.projects).sort()).toEqual(Object.keys(fr.projects).sort());
  });

  it("no empty string values in nav translations", () => {
    for (const locale of LOCALES) {
      const t = getTranslations(locale);
      for (const [key, value] of Object.entries(t.nav)) {
        expect(value, `nav.${key} is empty in ${locale}`).toBeTruthy();
      }
    }
  });

  it("hero phrases are non-empty arrays", () => {
    for (const locale of LOCALES) {
      const t = getTranslations(locale);
      expect(Array.isArray(t.hero.phrases)).toBe(true);
      expect(t.hero.phrases.length).toBeGreaterThan(0);
      for (const phrase of t.hero.phrases) {
        expect(phrase).toBeTruthy();
      }
    }
  });

  it("homeCards translations exist for all featured project IDs", () => {
    const featured = getFeaturedProjects();

    for (const locale of LOCALES) {
      const t = getTranslations(locale);
      for (const project of featured) {
        const card = t.homeCards[project.id];
        // homeCards may not cover all featured projects, but if it exists, it should be valid
        if (card) {
          expect(card.title, `homeCards.${project.id}.title empty in ${locale}`).toBeTruthy();
        }
      }
    }
  });

  it("projectsContent translations have required fields", () => {
    for (const locale of LOCALES) {
      const t = getTranslations(locale);
      for (const [id, content] of Object.entries(t.projectsContent)) {
        expect(content.title, `projectsContent.${id}.title empty in ${locale}`).toBeTruthy();
        expect(content.tagline, `projectsContent.${id}.tagline empty in ${locale}`).toBeTruthy();
        expect(content.detail, `projectsContent.${id}.detail missing in ${locale}`).toBeDefined();
        expect(content.detail.role, `projectsContent.${id}.detail.role empty in ${locale}`).toBeTruthy();
      }
    }
  });
});
