import { test, expect } from '@playwright/test';

test.describe('DsCombobox', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-dscombobox--default');
    await page.waitForSelector('.ds-combobox');
  });

  test('should render combobox component', async ({ page }) => {
    await expect(page.locator('.ds-combobox')).toBeVisible();
  });

  test('should show input field', async ({ page }) => {
    await expect(page.locator('.ds-combobox__input')).toBeVisible();
  });

  test('should open dropdown on focus', async ({ page }) => {
    await page.click('.ds-combobox__input');
    await expect(page.locator('.ds-combobox__dropdown')).toBeVisible();
  });

  test('should filter options on input', async ({ page }) => {
    await page.click('.ds-combobox__input');
    await page.fill('.ds-combobox__input', 'a');

    const options = page.locator('.ds-combobox__option');
    const count = await options.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should show no results message', async ({ page }) => {
    await page.click('.ds-combobox__input');
    await page.fill('.ds-combobox__input', 'zzzzzzzzz');

    await expect(page.locator('.ds-combobox__no-results')).toBeVisible();
  });

  test('should select option on click', async ({ page }) => {
    await page.click('.ds-combobox__input');
    await page.click('.ds-combobox__option:first-child');

    await expect(page.locator('.ds-combobox__dropdown')).not.toBeVisible();
  });

  test('should navigate with arrow keys', async ({ page }) => {
    await page.click('.ds-combobox__input');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');

    const highlighted = page.locator('.ds-combobox__option--highlighted');
    await expect(highlighted).toBeVisible();
  });

  test('should select with Enter key', async ({ page }) => {
    await page.click('.ds-combobox__input');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(page.locator('.ds-combobox__dropdown')).not.toBeVisible();
  });

  test('should close with Escape key', async ({ page }) => {
    await page.click('.ds-combobox__input');
    await expect(page.locator('.ds-combobox__dropdown')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.locator('.ds-combobox__dropdown')).not.toBeVisible();
  });

  test('should clear input with clear button', async ({ page }) => {
    await page.click('.ds-combobox__input');
    await page.fill('.ds-combobox__input', 'test');

    const clearButton = page.locator('.ds-combobox__clear');
    if (await clearButton.isVisible()) {
      await clearButton.click();
      await expect(page.locator('.ds-combobox__input')).toHaveValue('');
    }
  });
});

test.describe('DsCombobox accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-dscombobox--default');
    await page.waitForSelector('.ds-combobox');
  });

  test('should have combobox role', async ({ page }) => {
    await expect(page.locator('.ds-combobox__input')).toHaveAttribute('role', 'combobox');
  });

  test('should have aria-expanded', async ({ page }) => {
    const input = page.locator('.ds-combobox__input');
    await expect(input).toHaveAttribute('aria-expanded', 'false');

    await input.click();
    await expect(input).toHaveAttribute('aria-expanded', 'true');
  });

  test('should have aria-autocomplete', async ({ page }) => {
    await expect(page.locator('.ds-combobox__input')).toHaveAttribute('aria-autocomplete', 'list');
  });

  test('should have listbox role on dropdown', async ({ page }) => {
    await page.click('.ds-combobox__input');
    await expect(page.locator('.ds-combobox__dropdown')).toHaveAttribute('role', 'listbox');
  });

  test('should have option role on items', async ({ page }) => {
    await page.click('.ds-combobox__input');
    const options = page.locator('.ds-combobox__option');
    const count = await options.count();

    if (count > 0) {
      await expect(options.first()).toHaveAttribute('role', 'option');
    }
  });
});

test.describe('DsCombobox creatable', () => {
  test('should allow creating new option', async ({ page }) => {
    await page.goto('/iframe.html?id=components-dscombobox--creatable');
    await page.click('.ds-combobox__input');
    await page.fill('.ds-combobox__input', 'New Item');

    const createOption = page.locator('.ds-combobox__create');
    await expect(createOption).toBeVisible();
  });
});

test.describe('DsCombobox disabled', () => {
  test('should not open when disabled', async ({ page }) => {
    await page.goto('/iframe.html?id=components-dscombobox--disabled');
    await page.click('.ds-combobox__input', { force: true });

    await expect(page.locator('.ds-combobox__dropdown')).not.toBeVisible();
  });
});
