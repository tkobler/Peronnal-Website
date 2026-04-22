import { defineConfig, devices } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

export default defineConfig({
  testDir: "./tests/visual",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  timeout: 60_000,
  reporter: [
    ["html", { open: "never", outputFolder: "playwright-report-visual" }],
    ["json", { outputFile: "tests/results/visual-results.json" }],
  ],
  use: {
    baseURL: BASE_URL,
    trace: "off",
    navigationTimeout: 45_000,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  snapshotPathTemplate: "{testDir}/baselines/{arg}{ext}",
  webServer: {
    command: "npm run dev",
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
