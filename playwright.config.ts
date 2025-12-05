import { defineConfig, devices } from '@playwright/test';

/**
 * Configuration Playwright pour les tests e2e du design system.
 *
 * Tests des composants critiques :
 * - ds-modal : ouverture/fermeture, focus trap, ESC key
 * - ds-dropdown : navigation clavier, sélection
 * - ds-tabs : sélection, navigation clavier
 * - ds-toast : apparition, disparition, multiples toasts
 *
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env["CI"],
  retries: process.env["CI"] ? 2 : 0,
  workers: process.env["CI"] ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:6006',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Test mobile viewports
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  // Run Storybook dev server before tests
  webServer: {
    command: 'npm run storybook',
    url: 'http://localhost:6006',
    reuseExistingServer: !process.env["CI"],
    timeout: 120000,
  },
});
