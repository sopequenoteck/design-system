import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for DS components.
 * Uses Playwright screenshot comparison to detect visual changes.
 *
 * To update snapshots: npm run test:visual:update
 */

test.describe('Visual Regression - Components', () => {
  test.beforeEach(async ({ page }) => {
    // Wait for fonts and styles to load
    await page.waitForLoadState('networkidle');
  });

  test('ds-button variants', async ({ page }) => {
    await page.goto('/components/actions/ds-button');
    await page.waitForSelector('ds-button');
    await expect(page).toHaveScreenshot('ds-button.png', {
      fullPage: false,
      maxDiffPixels: 100,
    });
  });

  test('ds-input-field states', async ({ page }) => {
    await page.goto('/components/form/ds-input-field');
    await page.waitForSelector('ds-input-field');
    await expect(page).toHaveScreenshot('ds-input-field.png', {
      fullPage: false,
      maxDiffPixels: 100,
    });
  });

  test('ds-modal default', async ({ page }) => {
    await page.goto('/test/modal');
    // Open the modal
    await page.click('[data-testid="modal-default"] ds-button');
    await page.waitForSelector('.ds-modal__overlay');
    await expect(page).toHaveScreenshot('ds-modal.png', {
      fullPage: false,
      maxDiffPixels: 100,
    });
  });

  test('ds-dropdown open', async ({ page }) => {
    await page.goto('/test/dropdown');
    // Open the dropdown
    await page.click('[data-testid="dropdown-default"] ds-dropdown');
    await page.waitForSelector('.ds-dropdown__panel');
    await expect(page).toHaveScreenshot('ds-dropdown.png', {
      fullPage: false,
      maxDiffPixels: 100,
    });
  });

  test('ds-tabs navigation', async ({ page }) => {
    await page.goto('/test/tabs');
    await page.waitForSelector('ds-tabs');
    await expect(page).toHaveScreenshot('ds-tabs.png', {
      fullPage: false,
      maxDiffPixels: 100,
    });
  });

  test('ds-table default', async ({ page }) => {
    await page.goto('/components/data/ds-table');
    await page.waitForSelector('ds-table');
    await expect(page).toHaveScreenshot('ds-table.png', {
      fullPage: false,
      maxDiffPixels: 100,
    });
  });

  test('ds-card variants', async ({ page }) => {
    await page.goto('/components/layout/ds-card');
    await page.waitForSelector('ds-card');
    await expect(page).toHaveScreenshot('ds-card.png', {
      fullPage: false,
      maxDiffPixels: 100,
    });
  });

  test('ds-alert types', async ({ page }) => {
    await page.goto('/components/feedback/ds-alert');
    await page.waitForSelector('ds-alert');
    await expect(page).toHaveScreenshot('ds-alert.png', {
      fullPage: false,
      maxDiffPixels: 100,
    });
  });

  test('ds-pagination default', async ({ page }) => {
    await page.goto('/components/navigation/ds-pagination');
    await page.waitForSelector('ds-pagination');
    await expect(page).toHaveScreenshot('ds-pagination.png', {
      fullPage: false,
      maxDiffPixels: 100,
    });
  });

  test('ds-accordion expanded', async ({ page }) => {
    await page.goto('/components/layout/ds-accordion');
    await page.waitForSelector('ds-accordion');
    await expect(page).toHaveScreenshot('ds-accordion.png', {
      fullPage: false,
      maxDiffPixels: 100,
    });
  });
});

test.describe('Visual Regression - Primitives', () => {
  test('primitive-button variants', async ({ page }) => {
    await page.goto('/primitives/primitive-button');
    await page.waitForSelector('primitive-button');
    await expect(page).toHaveScreenshot('primitive-button.png', {
      fullPage: false,
      maxDiffPixels: 100,
    });
  });

  test('primitive-input states', async ({ page }) => {
    await page.goto('/primitives/primitive-input');
    await page.waitForSelector('primitive-input');
    await expect(page).toHaveScreenshot('primitive-input.png', {
      fullPage: false,
      maxDiffPixels: 100,
    });
  });

  test('primitive-checkbox states', async ({ page }) => {
    await page.goto('/primitives/primitive-checkbox');
    await page.waitForSelector('primitive-checkbox');
    await expect(page).toHaveScreenshot('primitive-checkbox.png', {
      fullPage: false,
      maxDiffPixels: 100,
    });
  });

  test('primitive-toggle states', async ({ page }) => {
    await page.goto('/primitives/primitive-toggle');
    await page.waitForSelector('primitive-toggle');
    await expect(page).toHaveScreenshot('primitive-toggle.png', {
      fullPage: false,
      maxDiffPixels: 100,
    });
  });
});
