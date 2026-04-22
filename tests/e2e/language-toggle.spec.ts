/**
 * Tier 1 — Language Toggle Tests
 *
 * Tests EN/FR switching, localStorage persistence, and cross-page consistency.
 */
import { test, expect } from "@playwright/test";

test.setTimeout(60_000);

test.describe("Language Toggle", () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to start fresh
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForSelector("nav.nav-pill", { state: "visible" });
  });

  test("locale toggle buttons are visible", async ({ page }) => {
    const frBtn = page.locator(".nav-locale-toggle button").filter({ hasText: "FR" });
    const enBtn = page.locator(".nav-locale-toggle button").filter({ hasText: "EN" });
    await expect(frBtn).toBeVisible();
    await expect(enBtn).toBeVisible();
  });

  test("both locale buttons are perceivable on mobile viewport (Pixel 9 ~412px)", async ({ page }) => {
    // Regression test for bug/mobile-locale-toggle: at 412x915 (Pixel 9),
    // the inactive locale button was rendered at opacity 0.25 which is
    // perceptually invisible in typical mobile viewing conditions.
    // Playwright's toBeVisible() passes at opacity > 0, so we must assert
    // computed opacity explicitly.
    await page.setViewportSize({ width: 412, height: 915 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("nav.nav-pill", { state: "visible" });

    const frBtn = page.locator(".nav-locale-toggle button").filter({ hasText: "FR" });
    const enBtn = page.locator(".nav-locale-toggle button").filter({ hasText: "EN" });

    for (const btn of [frBtn, enBtn]) {
      await expect(btn).toBeVisible();
      const opacity = await btn.evaluate(
        (el) => parseFloat(getComputedStyle(el).opacity),
      );
      expect(opacity).toBeGreaterThanOrEqual(0.5);
      const box = await btn.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThanOrEqual(44);
      expect(box!.height).toBeGreaterThanOrEqual(44);
    }
  });

  test("default locale is English (when no browser pref or stored value)", async ({ page }) => {
    const enBtn = page.locator(".nav-locale-toggle button").filter({ hasText: "EN" });
    await expect(enBtn).toHaveClass(/active/);
  });

  test("switching to FR updates page content", async ({ page }) => {
    // Get initial home text
    const homeLink = page.locator("nav.nav-pill .nav-home-text");
    const initialText = await homeLink.textContent();

    // Switch to French
    await page.locator(".nav-locale-toggle button").filter({ hasText: "FR" }).click();
    await page.waitForTimeout(300);

    const newText = await homeLink.textContent();
    // The nav home text should differ between EN and FR
    expect(newText).not.toBe(initialText);
  });

  test("locale persists in localStorage", async ({ page }) => {
    // Switch to French
    await page.locator(".nav-locale-toggle button").filter({ hasText: "FR" }).click();
    await page.waitForTimeout(200);

    const stored = await page.evaluate(() => localStorage.getItem("locale"));
    expect(stored).toBe("fr");
  });

  test("locale persists across page reload", async ({ page }) => {
    // Switch to French
    await page.locator(".nav-locale-toggle button").filter({ hasText: "FR" }).click();
    await page.waitForTimeout(200);

    // Reload
    await page.reload();
    await page.waitForSelector("nav.nav-pill", { state: "visible" });

    const frBtn = page.locator(".nav-locale-toggle button").filter({ hasText: "FR" });
    await expect(frBtn).toHaveClass(/active/);
  });

  test("locale persists across navigation", async ({ page }) => {
    // Switch to French
    await page.locator(".nav-locale-toggle button").filter({ hasText: "FR" }).click();
    await page.waitForTimeout(200);

    // Navigate to experience
    await page.goto("/experience", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("nav.nav-pill", { state: "visible" });

    const frBtn = page.locator(".nav-locale-toggle button").filter({ hasText: "FR" });
    await expect(frBtn).toHaveClass(/active/);
  });

  test("switching back to EN works", async ({ page }) => {
    // Go to FR
    await page.locator(".nav-locale-toggle button").filter({ hasText: "FR" }).click();
    await page.waitForTimeout(200);

    // Back to EN
    await page.locator(".nav-locale-toggle button").filter({ hasText: "EN" }).click();
    await page.waitForTimeout(200);

    const enBtn = page.locator(".nav-locale-toggle button").filter({ hasText: "EN" });
    await expect(enBtn).toHaveClass(/active/);

    const stored = await page.evaluate(() => localStorage.getItem("locale"));
    expect(stored).toBe("en");
  });
});
