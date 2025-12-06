import { test, expect } from '@playwright/test';

test.describe('DsSelect', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-dsselect--default');
    await page.waitForSelector('.ds-select');
  });

  test('should render select component', async ({ page }) => {
    await expect(page.locator('.ds-select')).toBeVisible();
  });

  test('should open dropdown on click', async ({ page }) => {
    await page.click('.ds-select__trigger');
    await expect(page.locator('.ds-select__dropdown')).toBeVisible();
  });

  test('should close dropdown on outside click', async ({ page }) => {
    await page.click('.ds-select__trigger');
    await expect(page.locator('.ds-select__dropdown')).toBeVisible();

    await page.click('body', { position: { x: 10, y: 10 } });
    await expect(page.locator('.ds-select__dropdown')).not.toBeVisible();
  });

  test('should select option on click', async ({ page }) => {
    await page.click('.ds-select__trigger');
    await page.click('.ds-select__option:first-child');

    await expect(page.locator('.ds-select__dropdown')).not.toBeVisible();
  });

  test('should navigate options with arrow keys', async ({ page }) => {
    await page.click('.ds-select__trigger');

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');

    const focusedOption = page.locator('.ds-select__option--focused');
    await expect(focusedOption).toBeVisible();
  });

  test('should select option with Enter key', async ({ page }) => {
    await page.click('.ds-select__trigger');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(page.locator('.ds-select__dropdown')).not.toBeVisible();
  });

  test('should close with Escape key', async ({ page }) => {
    await page.click('.ds-select__trigger');
    await expect(page.locator('.ds-select__dropdown')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.locator('.ds-select__dropdown')).not.toBeVisible();
  });

  test('should have correct ARIA attributes', async ({ page }) => {
    const trigger = page.locator('.ds-select__trigger');
    await expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');

    await page.click('.ds-select__trigger');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    const dropdown = page.locator('.ds-select__dropdown');
    await expect(dropdown).toHaveAttribute('role', 'listbox');
  });

  test('should display placeholder when no selection', async ({ page }) => {
    const placeholder = page.locator('.ds-select__placeholder');
    await expect(placeholder).toBeVisible();
  });
});

test.describe('DsSelect sizes', () => {
  test('should render small size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-dsselect--sizes');
    await expect(page.locator('.ds-select--sm')).toBeVisible();
  });

  test('should render medium size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-dsselect--sizes');
    await expect(page.locator('.ds-select--md')).toBeVisible();
  });

  test('should render large size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-dsselect--sizes');
    await expect(page.locator('.ds-select--lg')).toBeVisible();
  });
});

test.describe('DsSelect disabled', () => {
  test('should not open when disabled', async ({ page }) => {
    await page.goto('/iframe.html?id=components-dsselect--disabled');
    await page.click('.ds-select__trigger');

    await expect(page.locator('.ds-select__dropdown')).not.toBeVisible();
  });

  test('should have disabled styling', async ({ page }) => {
    await page.goto('/iframe.html?id=components-dsselect--disabled');
    await expect(page.locator('.ds-select--disabled')).toBeVisible();
  });
});
