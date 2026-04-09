import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { getEnvironmentConfig } from "./src/configs/environment.config";

dotenv.config({ path: path.resolve(__dirname, ".env") });

export const STORAGE_STATE = path.join(
  __dirname,
  "./playwright/.auth/user.json",
);

const config = getEnvironmentConfig();

export default defineConfig({
  testDir: "./src/tests/",

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Retry on CI only */
  retries: config.retries,

  /* Opt out of parallel tests on CI. */
  workers: config.workers,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",

  timeout: config.timeout.test,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    trace: config.trace,
    screenshot: config.screenshot,
    video: config.video,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "setup",
      testMatch: /.*setup\.ts$/,
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], storageState: STORAGE_STATE },
      dependencies: ["setup"],
    },
  ],
});
