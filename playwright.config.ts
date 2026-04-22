import { defineConfig, devices } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 60_000,  // 60s per test (Next.js dev server can be slow on first load)
  expect: { timeout: 10_000 },
  reporter: [
    ["html", { open: "never" }],
    ["json", { outputFile: "tests/results/e2e-results.json" }],
  ],
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    navigationTimeout: 45_000,  // 45s for page.goto (cold start tolerance)
  },
  projects: [
    // --- Desktop browsers ---
    {
      name: "chromium-desktop",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox-desktop",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit-desktop",
      use: { ...devices["Desktop Safari"] },
    },

    // --- Mobile devices ---
    {
      name: "iphone-se",
      use: { ...devices["iPhone SE"] },
    },
    {
      name: "iphone-14",
      use: { ...devices["iPhone 14"] },
    },
    {
      name: "ipad",
      use: { ...devices["iPad (gen 7)"] },
    },
    {
      name: "ipad-landscape",
      use: {
        ...devices["iPad (gen 7) landscape"],
      },
    },

    // --- Ultrawide ---
    {
      name: "ultrawide",
      use: {
        viewport: { width: 2560, height: 1080 },
        deviceScaleFactor: 1,
        isMobile: false,
        hasTouch: false,
      },
    },
  ],

  // Auto-start dev server for local runs
  webServer: {
    command: "npm run dev",
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,  // 2 min for dev server startup (Turbopack cold compile)
  },
});
