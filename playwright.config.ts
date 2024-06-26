import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: "./tests",
  timeout: 55000,
  fullyParallel: true,
  expect: {
    timeout: 55000
  },
  reporter: [["line"], ["allure-playwright"]],
  use: {
    actionTimeout: 100000,
    navigationTimeout: 100000,
    headless: true,
    // retries: 1,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        navigationTimeout: 100000,
      } as any,
    },
    {
      name: 'Mozila',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
        navigationTimeout: 100000,
      },
    }
  ],
});
