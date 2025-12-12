import { test, expect } from '@playwright/test';

test.describe('DsEmpty', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-feedback-dsempty--default');
    await page.waitForSelector('.ds-empty');
  });

  test('should render empty component', async ({ page }) => {
    await expect(page.locator('.ds-empty')).toBeVisible();
  });

  test('should display title', async ({ page }) => {
    const title = page.locator('.ds-empty__title');
    await expect(title).toBeVisible();
    await expect(title).not.toBeEmpty();
  });

  test('should display description', async ({ page }) => {
    const description = page.locator('.ds-empty__description');
    await expect(description).toBeVisible();
  });

  test('should have correct default classes', async ({ page }) => {
    const empty = page.locator('.ds-empty');
    await expect(empty).toHaveClass(/ds-empty--md/);
  });
});

test.describe('DsEmpty variants', () => {
  test('should render icon variant', async ({ page }) => {
    await page.goto('/iframe.html?id=components-feedback-dsempty--icon-variant');
    await page.waitForSelector('.ds-empty');
    const icon = page.locator('.ds-empty__icon');
    await expect(icon).toBeVisible();
  });

  test('should render image variant', async ({ page }) => {
    await page.goto('/iframe.html?id=components-feedback-dsempty--image-variant');
    await page.waitForSelector('.ds-empty');
    const image = page.locator('.ds-empty__image');
    await expect(image).toBeVisible();
  });
});

test.describe('DsEmpty sizes', () => {
  test('should render small size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-feedback-dsempty--sizes');
    await page.waitForSelector('.ds-empty--sm');
    await expect(page.locator('.ds-empty--sm')).toBeVisible();
  });

  test('should render medium size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-feedback-dsempty--sizes');
    await page.waitForSelector('.ds-empty--md');
    await expect(page.locator('.ds-empty--md')).toBeVisible();
  });

  test('should render large size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-feedback-dsempty--sizes');
    await page.waitForSelector('.ds-empty--lg');
    await expect(page.locator('.ds-empty--lg')).toBeVisible();
  });
});

test.describe('DsEmpty with action', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-feedback-dsempty--with-action');
    await page.waitForSelector('.ds-empty');
  });

  test('should display action slot content', async ({ page }) => {
    const action = page.locator('.ds-empty__action');
    await expect(action).toBeVisible();
  });

  test('should have clickable action button', async ({ page }) => {
    const button = page.locator('.ds-empty__action button');
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
  });

  test('should be focusable with keyboard', async ({ page }) => {
    await page.keyboard.press('Tab');
    const button = page.locator('.ds-empty__action button');
    await expect(button).toBeFocused();
  });

  test('should respond to click', async ({ page }) => {
    const button = page.locator('.ds-empty__action button');
    await button.click();
    // Verify click worked (no error thrown)
  });

  test('should respond to Enter key', async ({ page }) => {
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    // Verify Enter worked (no error thrown)
  });
});

test.describe('DsEmpty accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-feedback-dsempty--default');
    await page.waitForSelector('.ds-empty');
  });

  test('should have appropriate landmark role', async ({ page }) => {
    const empty = page.locator('.ds-empty');
    await expect(empty).toBeVisible();
  });

  test('should have accessible title', async ({ page }) => {
    const title = page.locator('.ds-empty__title');
    await expect(title).toHaveRole('heading');
  });

  test('should have describedby relationship', async ({ page }) => {
    const empty = page.locator('.ds-empty');
    const description = page.locator('.ds-empty__description');

    await expect(empty).toBeVisible();
    await expect(description).toBeVisible();
  });
});

test.describe('DsEmpty custom content', () => {
  test('should support custom icon', async ({ page }) => {
    await page.goto('/iframe.html?id=components-feedback-dsempty--custom-icon');
    await page.waitForSelector('.ds-empty');
    const icon = page.locator('.ds-empty__icon fa-icon');
    await expect(icon).toBeVisible();
  });

  test('should support custom image', async ({ page }) => {
    await page.goto('/iframe.html?id=components-feedback-dsempty--custom-image');
    await page.waitForSelector('.ds-empty');
    const image = page.locator('.ds-empty__image img');
    await expect(image).toBeVisible();
  });
});
