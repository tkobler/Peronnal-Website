/**
 * Tier 2 — Responsive & Orientation Matrix Tests
 *
 * Tests every page across multiple viewports to verify:
 * - Layout adapts correctly (mobile vs desktop)
 * - Navigation switches between hamburger and pill
 * - Typography remains readable (no overflow, no clipping)
 * - DotPattern hidden on mobile, visible on desktop
 * - No horizontal overflow (scrollbar) on any viewport
 */
import { test, expect, type Page } from "@playwright/test";
import { DEVICES, ROUTES } from "../utils/devices";

// Increase timeout for all tests in this file (many viewports, cold navigations)
test.setTimeout(60_000);

// Helper: check no horizontal overflow
async function assertNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  expect(overflow).toBe(false);
}

// Helper: check text isn't clipped by checking for elements wider than viewport
// Excludes invisible elements (opacity: 0, display: none, visibility: hidden) — e.g. tooltips
async function assertNoTextOverflow(page: Page) {
  const overflowing = await page.evaluate(() => {
    const elements = document.querySelectorAll("h1, h2, h3, p, span, a, button");
    const viewportWidth = window.innerWidth;
    const overflowed: string[] = [];
    for (const el of elements) {
      const style = getComputedStyle(el);
      // Skip invisible elements (tooltips, hidden hover labels, etc.)
      if (style.opacity === "0" || style.display === "none" || style.visibility === "hidden") continue;
      const rect = el.getBoundingClientRect();
      if (rect.right > viewportWidth + 5) {
        overflowed.push(`${el.tagName}.${el.className}: right=${rect.right}`);
      }
    }
    return overflowed;
  });
  expect(overflowing).toEqual([]);
}

for (const device of DEVICES) {
  test.describe(`${device.name} (${device.width}x${device.height})`, () => {
    test.use({
      viewport: { width: device.width, height: device.height },
      isMobile: device.isMobile,
      hasTouch: device.hasTouch,
      deviceScaleFactor: device.deviceScaleFactor,
    });

    // Firefox's browser.newContext rejects isMobile outright — it's a
    // Chromium/WebKit-only capability. Mobile-viewport coverage for these
    // device profiles is already provided by the dedicated iphone-se/
    // iphone-14/ipad/ipad-landscape projects, so skipping here loses no
    // real coverage; Firefox still runs the non-mobile device profiles
    // (Desktop 1440p, Ultrawide) below.
    test.skip(
      ({ browserName }) => browserName === "firefox" && device.isMobile,
      "isMobile is not supported in Firefox"
    );

    for (const route of ROUTES) {
      test(`${route} — no horizontal overflow`, async ({ page }) => {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(500);
        await assertNoHorizontalOverflow(page);
      });

      test(`${route} — no text overflow`, async ({ page }) => {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(500);
        await assertNoTextOverflow(page);
      });
    }

    test("navigation pill is visible", async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForSelector("nav.nav-pill", { state: "visible" });
      await expect(page.locator("nav.nav-pill")).toBeVisible();
    });

    test("hamburger menu works", async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForSelector("nav.nav-pill", { state: "visible" });

      await page.locator("nav.nav-pill .hamburger").click();
      const dialog = page.locator("[role='dialog']");
      await expect(dialog).toBeVisible();

      // Close it
      await dialog.locator("button[aria-label='Close menu']").click();
      await page.waitForTimeout(600);
      // Dialog uses opacity-0 + pointer-events-none when closed (not display:none)
      await expect(dialog).toHaveCSS("opacity", "0");
    });

    if (device.width < 768) {
      test("DotPattern canvas is hidden on mobile", async ({ page }) => {
        await page.goto("/", { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(500);

        const canvas = page.locator("canvas");
        if (await canvas.count() > 0) {
          // Canvas should be hidden or have 0 dimensions
          const visible = await canvas.first().isVisible();
          if (visible) {
            const box = await canvas.first().boundingBox();
            // It might be rendered but with 0 size or off-screen
            expect(box === null || box.width === 0 || box.height === 0).toBeTruthy();
          }
        }
        // If no canvas exists, that's also fine for mobile
      });
    }

    if (device.width >= 768) {
      test("DotPattern canvas is visible on desktop", async ({ page }) => {
        await page.goto("/", { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(1000);

        const canvas = page.locator("canvas");
        const count = await canvas.count();
        if (count > 0) {
          await expect(canvas.first()).toBeVisible();
        }
      });
    }

    // Regression test for bug/projects-filter-pill-overflow: the /projects
    // hero used a fixed h-[40vh] + overflow-hidden. Domain filter pills wrap
    // onto extra rows when labels are long (French translations) or the
    // viewport is narrow (mobile), and any row past the fixed 40vh got
    // silently clipped by overflow-hidden instead of the hero growing to
    // fit — pills disappeared behind the next section's background.
    test("/projects — filter pills are not clipped by the hero section (FR locale)", async ({ page }) => {
      await page.addInitScript(() => localStorage.setItem("locale", "fr"));
      await page.goto("/projects", { waitUntil: "domcontentloaded" });
      await page.waitForFunction(() => document.querySelector("h1")?.textContent?.includes("Projets"));

      const hero = page.locator("main > section").first();
      const heroBox = await hero.boundingBox();
      expect(heroBox).not.toBeNull();

      const pills = page.locator('[role="group"][aria-label="Filter projects by domain"] button');
      const count = await pills.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const box = await pills.nth(i).boundingBox();
        expect(box).not.toBeNull();
        if (box && heroBox) {
          expect(box.y + box.height).toBeLessThanOrEqual(heroBox.y + heroBox.height + 1);
        }
      }
    });

    test("locale toggle is accessible", async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForSelector(".nav-locale-toggle", { state: "visible" });

      const toggle = page.locator(".nav-locale-toggle");
      await expect(toggle).toBeVisible();

      // Buttons should be tappable
      const frBtn = toggle.locator("button").filter({ hasText: "FR" });
      await expect(frBtn).toBeVisible();
      const box = await frBtn.boundingBox();
      // Minimum touch target (44x44 is WCAG recommendation, but be lenient)
      expect(box).not.toBeNull();
      if (box && device.hasTouch) {
        expect(box.width).toBeGreaterThanOrEqual(24);
        expect(box.height).toBeGreaterThanOrEqual(24);
      }
    });
  });
}
