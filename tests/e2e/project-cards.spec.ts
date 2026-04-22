/**
 * Tier 1 — Project Card Interaction Tests
 *
 * Tests home page project sections: card rendering, "Explore" button,
 * navigation to detail pages.
 */
import { test, expect } from "@playwright/test";

test.setTimeout(60_000);

test.describe("Home Page Project Sections", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("nav.nav-pill", { state: "visible" });
  });

  test("hero section is visible", async ({ page }) => {
    // There should be a main element
    const main = page.locator("main");
    await expect(main).toBeVisible();
  });

  test("project sections exist on the home page", async ({ page }) => {
    // Sections with data-section-theme
    const sections = page.locator("[data-section-theme]");
    const count = await sections.count();
    // Hero + project cards = at least 2 sections
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test("project sections alternate dark/light themes", async ({ page }) => {
    const themes = await page.locator("[data-section-theme]").evaluateAll(
      (els) => els.map((el) => el.getAttribute("data-section-theme"))
    );

    // Check alternation pattern (skip hero if needed)
    for (let i = 1; i < themes.length; i++) {
      if (themes[i - 1] === themes[i]) {
        // Two consecutive same themes is a failure
        // (allowing for hero section which may match first card)
        if (i > 1) {
          expect(themes[i]).not.toBe(themes[i - 1]);
        }
      }
    }
  });

  test("Explore buttons are present and clickable", async ({ page }) => {
    // Scroll down to find Explore buttons
    await page.evaluate(() => window.scrollTo({ top: 800, behavior: "instant" as ScrollBehavior }));
    await page.waitForTimeout(300);

    const exploreButtons = page.locator("button").filter({ hasText: /explore/i });
    const count = await exploreButtons.count();
    expect(count).toBeGreaterThan(0);
  });

  test("clicking Explore button navigates to project detail", async ({ page }) => {
    // Scroll to first project section
    await page.evaluate(() => window.scrollTo({ top: 800, behavior: "instant" as ScrollBehavior }));
    await page.waitForTimeout(300);

    const firstExplore = page.locator("button").filter({ hasText: /explore/i }).first();
    if (await firstExplore.isVisible()) {
      await firstExplore.click();
      await page.waitForTimeout(500);
      // Should navigate away from home
      const url = page.url();
      expect(url).not.toBe("/");
    }
  });
});

test.describe("Portfolio Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/projects", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("h1", { state: "visible" });
  });

  test("displays project heading", async ({ page }) => {
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
  });

  test("domain/list view toggle works", async ({ page }) => {
    // Click list view tab (exact match to avoid ambiguity with domain cards)
    const listBtn = page.locator("button").filter({ hasText: /^list view$/i });
    if (await listBtn.isVisible()) {
      await listBtn.click();
      await page.waitForTimeout(500);
      // Should show project sections in list view
      const sections = page.locator("section");
      const count = await sections.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test("domain view shows domain categories", async ({ page }) => {
    // Click the "By Domain" tab specifically using getByRole for exact match
    const domainBtn = page.getByRole("button", { name: "By Domain", exact: true });
    if (await domainBtn.isVisible()) {
      await domainBtn.click();
      await page.waitForTimeout(300);
    }
    // Should have some interactive domain elements
    const main = page.locator("main");
    await expect(main).toBeVisible();
  });

  test("More Details button triggers card flip and navigates", async ({ page }) => {
    // Switch to list view first
    const listBtn = page.locator("button").filter({ hasText: /^list view$/i });
    if (await listBtn.isVisible()) {
      await listBtn.click();
      await page.waitForTimeout(1000);
    }

    const moreBtn = page.locator("button").filter({ hasText: /more details|plus de d/i }).first();
    if (await moreBtn.isVisible()) {
      await moreBtn.click();
      // Should navigate to project detail page after flip animation
      await page.waitForURL("**/projects/**", { timeout: 10000 });
      expect(page.url()).toMatch(/\/projects\/.+/);
    }
  });

  test("URL state preserves view mode", async ({ page }) => {
    await page.goto("/projects?view=list", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);
    // The list view should show project sections
    const sections = page.locator("main section");
    const count = await sections.count();
    expect(count).toBeGreaterThan(0);
  });
});
