/**
 * Tier 5 — Visual Regression Tests
 *
 * Captures screenshots of every page across viewports and languages,
 * then compares them against baselines using pixel diffing.
 */
import { test, expect } from "@playwright/test";
import { ROUTES, LOCALES } from "../utils/devices";

const VIEWPORTS = [
  { name: "mobile",  width: 390,  height: 844  },
  { name: "tablet",  width: 810,  height: 1080 },
  { name: "desktop", width: 1440, height: 900  },
];

for (const viewport of VIEWPORTS) {
  for (const locale of LOCALES) {
    test.describe(`Visual: ${viewport.name} / ${locale}`, () => {
      test.use({
        viewport: { width: viewport.width, height: viewport.height },
      });

      for (const route of ROUTES) {
        const testName = `${route === "/" ? "home" : route.slice(1)}-${viewport.name}-${locale}`;

        test(testName, async ({ page }) => {
          // Set locale via localStorage before navigating
          await page.addInitScript((loc: string) => {
            localStorage.setItem("locale", loc);
          }, locale);

          await page.goto(route);
          // Wait for fonts, animations, and client hydration
          await page.waitForTimeout(2000);

          // Hide dynamic content that changes between runs
          await page.evaluate(() => {
            // Hide any elements with dynamic timestamps
            document.querySelectorAll("[data-testid='current-time']").forEach(
              (el) => ((el as HTMLElement).style.visibility = "hidden")
            );
          });

          await expect(page).toHaveScreenshot(`${testName}.png`, {
            fullPage: true,
            maxDiffPixelRatio: 0.02,  // Allow 2% pixel difference
            threshold: 0.3,            // Per-pixel color threshold
            animations: "disabled",
          });
        });
      }
    });
  }
}

// ── Glass-morphism and Backdrop Blur Tests ──────────────────────────────────

test.describe("Visual: Glass-morphism Effects", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("menu glass-morphism renders correctly", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("nav.nav-pill", { state: "visible" });

    await page.locator("nav.nav-pill .hamburger").click();
    await page.waitForTimeout(600);

    await expect(page).toHaveScreenshot("menu-glassmorphism.png", {
      maxDiffPixelRatio: 0.05,
      threshold: 0.3,
      animations: "disabled",
    });
  });
});

// ── Theme Transition Snapshots ──────────────────────────────────────────────

test.describe("Visual: Theme Sections", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("dark-to-light section boundary", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(1500);

    // Scroll to first section transition
    await page.evaluate(() => window.scrollTo({ top: 700, behavior: "instant" as ScrollBehavior }));
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot("section-transition.png", {
      maxDiffPixelRatio: 0.05,
      threshold: 0.3,
      animations: "disabled",
    });
  });
});
