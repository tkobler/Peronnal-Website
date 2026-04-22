/**
 * Tier 1 — Navigation Interaction Flow Tests
 *
 * Tests the pill navigation, hamburger menu, scroll hide/show,
 * route transitions, and home button behavior.
 */
import { test, expect } from "@playwright/test";

test.setTimeout(60_000);

test.describe("Navigation Pill", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    // Wait for the client shell to mount
    await page.waitForSelector("nav.nav-pill", { state: "visible" });
  });

  test("pill navigation is visible on page load", async ({ page }) => {
    const nav = page.locator("nav.nav-pill");
    await expect(nav).toBeVisible();
  });

  test("pill has hamburger button and home link", async ({ page }) => {
    const hamburger = page.locator("nav.nav-pill .hamburger");
    const homeLink = page.locator("nav.nav-pill .nav-home-text");
    await expect(hamburger).toBeVisible();
    await expect(homeLink).toBeVisible();
  });

  test("pill hides on scroll down and reappears on scroll up", async ({ page }) => {
    const nav = page.locator("nav.nav-pill");

    // Scroll down significantly
    await page.evaluate(() => window.scrollTo({ top: 800, behavior: "instant" as ScrollBehavior }));
    await page.waitForTimeout(300);
    // Scroll a bit more to trigger the hide
    await page.evaluate(() => window.scrollTo({ top: 1200, behavior: "instant" as ScrollBehavior }));
    await page.waitForTimeout(300);

    await expect(nav).toHaveClass(/hidden/);

    // Scroll up
    await page.evaluate(() => window.scrollTo({ top: 400, behavior: "instant" as ScrollBehavior }));
    await page.waitForTimeout(300);

    await expect(nav).not.toHaveClass(/hidden/);
  });

  test("clicking home link on homepage scrolls to top", async ({ page }) => {
    // Scroll down
    await page.evaluate(() => window.scrollTo({ top: 300, behavior: "instant" as ScrollBehavior }));
    await page.waitForTimeout(300);

    // Programmatically click the home link (nav may be hidden after scroll)
    await page.evaluate(() => {
      const link = document.querySelector("nav.nav-pill .nav-home-text") as HTMLElement;
      if (link) link.click();
    });
    await page.waitForTimeout(1000); // smooth scroll delay

    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(50);
  });
});

test.describe("Hamburger Menu", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("nav.nav-pill", { state: "visible" });
  });

  test("opens menu panel on hamburger click", async ({ page }) => {
    await page.locator("nav.nav-pill .hamburger").click();
    // Menu panel appears (the dialog)
    const menuPanel = page.locator("[role='dialog']");
    await expect(menuPanel).toBeVisible();
  });

  test("menu has all navigation items", async ({ page }) => {
    await page.locator("nav.nav-pill .hamburger").click();
    const menuPanel = page.locator("[role='dialog']");
    await expect(menuPanel).toBeVisible();

    // Check menu links exist
    const links = menuPanel.locator("ul a");
    const count = await links.count();
    expect(count).toBe(4); // Projects, Experience, Flight, About
  });

  test("menu closes when clicking close button", async ({ page }) => {
    await page.locator("nav.nav-pill .hamburger").click();
    const menuPanel = page.locator("[role='dialog']");
    await expect(menuPanel).toBeVisible();

    // Click close button
    await menuPanel.locator("button[aria-label='Close menu']").click();
    await page.waitForTimeout(600);

    // Dialog uses opacity-0 + pointer-events-none when closed (not display:none)
    await expect(menuPanel).toHaveCSS("opacity", "0");
  });

  test("menu closes when clicking backdrop", async ({ page }) => {
    await page.locator("nav.nav-pill .hamburger").click();
    const menuPanel = page.locator("#nav-menu-panel");
    await expect(menuPanel).toHaveCSS("opacity", "1");

    // Get the dialog bounds so we can click in the narrow margin to its LEFT
    const box = await menuPanel.boundingBox();
    // Dialog is centered at 90% width, so there's a 5% margin on each side
    // Click at x=5 (left edge) at the vertical center of the dialog
    const clickX = box ? box.x - 10 : 5;
    const clickY = box ? box.y + box.height / 2 : 450;
    await page.mouse.click(Math.max(clickX, 2), clickY);
    await page.waitForTimeout(800);

    // Dialog uses opacity-0 + pointer-events-none when closed
    await expect(menuPanel).toHaveCSS("opacity", "0");
  });

  test("menu locks body scroll when open", async ({ page }) => {
    await page.locator("nav.nav-pill .hamburger").click();
    await page.waitForTimeout(200);

    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow).toBe("hidden");
  });

  test("navigating from menu goes to correct page", async ({ page }) => {
    await page.locator("nav.nav-pill .hamburger").click();
    const menuPanel = page.locator("#nav-menu-panel");
    await expect(menuPanel).toHaveCSS("opacity", "1");

    // Click first menu item (Projects) — use force since animation may overlap
    await menuPanel.locator("ul a").first().click({ force: true });
    await page.waitForURL("**/projects", { timeout: 10000 });

    expect(page.url()).toContain("/projects");
  });

  test("Get in Touch button navigates to contact page", async ({ page }) => {
    await page.locator("nav.nav-pill .hamburger").click();
    const menuPanel = page.locator("[role='dialog']");
    await expect(menuPanel).toBeVisible();

    // Click the "Get in Touch" button in footer of menu
    const contactBtn = menuPanel.locator("button").filter({ hasText: /touch|contact/i });
    await contactBtn.click();
    await page.waitForURL("**/contact");

    expect(page.url()).toContain("/contact");
  });
});

test.describe("Route Transitions", () => {
  test("home to projects transition happens smoothly", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("nav.nav-pill", { state: "visible" });

    // Navigate via menu
    await page.locator("nav.nav-pill .hamburger").click();
    await page.locator("[role='dialog'] ul a").first().click();

    // Wait for new page content
    await page.waitForURL("**/projects");

    // Page content should be visible
    const heading = page.locator("h1");
    await expect(heading).toBeVisible({ timeout: 5000 });
  });

  test("navigating back preserves state", async ({ page }) => {
    await page.goto("/projects");
    await page.waitForSelector("h1", { state: "visible" });

    // Navigate to home via nav
    await page.locator("nav.nav-pill .nav-home-text").click();
    await page.waitForURL("/");

    // Go back
    await page.goBack();
    await page.waitForURL("**/projects");

    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
  });
});
