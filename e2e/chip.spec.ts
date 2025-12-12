import { test, expect } from '@playwright/test';

test.describe('DsChip', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dschip--default');
    await page.waitForSelector('.ds-chip');
  });

  test('should render chip component', async ({ page }) => {
    await expect(page.locator('.ds-chip')).toBeVisible();
  });

  test('should display label text', async ({ page }) => {
    const label = page.locator('.ds-chip__label');
    await expect(label).toBeVisible();
    await expect(label).not.toBeEmpty();
  });

  test('should have correct default classes', async ({ page }) => {
    const chip = page.locator('.ds-chip');
    await expect(chip).toHaveClass(/ds-chip--md/);
  });
});

test.describe('DsChip variants', () => {
  test('should render filled variant', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dschip--default');
    const chip = page.locator('.ds-chip');
    await expect(chip).not.toHaveClass(/ds-chip--outlined/);
  });

  test('should render outlined variant', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dschip--outlined');
    await page.waitForSelector('.ds-chip');
    const chip = page.locator('.ds-chip');
    await expect(chip).toHaveClass(/ds-chip--outlined/);
  });
});

test.describe('DsChip sizes', () => {
  test('should render small size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dschip--sizes');
    await page.waitForSelector('.ds-chip--sm');
    await expect(page.locator('.ds-chip--sm')).toBeVisible();
  });

  test('should render medium size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dschip--sizes');
    await page.waitForSelector('.ds-chip--md');
    await expect(page.locator('.ds-chip--md')).toBeVisible();
  });

  test('should render large size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dschip--sizes');
    await page.waitForSelector('.ds-chip--lg');
    await expect(page.locator('.ds-chip--lg')).toBeVisible();
  });
});

test.describe('DsChip colors', () => {
  test('should render primary color', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dschip--colors');
    await page.waitForSelector('.ds-chip--primary');
    await expect(page.locator('.ds-chip--primary')).toBeVisible();
  });

  test('should render success color', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dschip--colors');
    await page.waitForSelector('.ds-chip--success');
    await expect(page.locator('.ds-chip--success')).toBeVisible();
  });

  test('should render warning color', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dschip--colors');
    await page.waitForSelector('.ds-chip--warning');
    await expect(page.locator('.ds-chip--warning')).toBeVisible();
  });

  test('should render error color', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dschip--colors');
    await page.waitForSelector('.ds-chip--error');
    await expect(page.locator('.ds-chip--error')).toBeVisible();
  });
});

test.describe('DsChip removable', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dschip--removable');
    await page.waitForSelector('.ds-chip');
  });

  test('should show remove button', async ({ page }) => {
    const removeBtn = page.locator('.ds-chip__remove');
    await expect(removeBtn).toBeVisible();
  });

  test('should have accessible remove button', async ({ page }) => {
    const removeBtn = page.locator('.ds-chip__remove');
    await expect(removeBtn).toHaveAttribute('aria-label', /Remove/i);
  });
});

test.describe('DsChip clickable', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dschip--clickable');
    await page.waitForSelector('.ds-chip');
  });

  test('should have clickable class', async ({ page }) => {
    const chip = page.locator('.ds-chip');
    await expect(chip).toHaveClass(/ds-chip--clickable/);
  });

  test('should have pointer cursor', async ({ page }) => {
    const chip = page.locator('.ds-chip');
    await expect(chip).toHaveCSS('cursor', 'pointer');
  });

  test('should be focusable with keyboard', async ({ page }) => {
    await page.keyboard.press('Tab');
    const chip = page.locator('.ds-chip');
    await expect(chip).toBeFocused();
  });
});

test.describe('DsChip disabled', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dschip--disabled');
    await page.waitForSelector('.ds-chip');
  });

  test('should have disabled class', async ({ page }) => {
    const chip = page.locator('.ds-chip');
    await expect(chip).toHaveClass(/ds-chip--disabled/);
  });

  test('should have aria-disabled attribute', async ({ page }) => {
    const chip = page.locator('.ds-chip');
    await expect(chip).toHaveAttribute('aria-disabled', 'true');
  });
});

test.describe('DsChip with icon', () => {
  test('should display icon', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dschip--with-icon');
    await page.waitForSelector('.ds-chip');
    const icon = page.locator('.ds-chip__icon');
    await expect(icon).toBeVisible();
  });
});

test.describe('DsChip with avatar', () => {
  test('should display avatar image', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dschip--with-avatar');
    await page.waitForSelector('.ds-chip');
    const avatar = page.locator('.ds-chip__avatar');
    await expect(avatar).toBeVisible();
  });
});

test.describe('DsChip accessibility', () => {
  test('should have correct role when clickable', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dschip--clickable');
    await page.waitForSelector('.ds-chip');
    const chip = page.locator('.ds-chip');
    await expect(chip).toHaveAttribute('role', 'button');
  });

  test('should have tabindex when clickable', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dschip--clickable');
    await page.waitForSelector('.ds-chip');
    const chip = page.locator('.ds-chip');
    await expect(chip).toHaveAttribute('tabindex', '0');
  });

  test('should respond to Enter key when clickable', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dschip--clickable');
    await page.waitForSelector('.ds-chip');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    // Verify chip responded (no error thrown)
  });

  test('should respond to Space key when clickable', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dschip--clickable');
    await page.waitForSelector('.ds-chip');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    // Verify chip responded (no error thrown)
  });
});

test.describe('DsChip selected state', () => {
  test('should show selected visual indicator', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dschip--selected');
    await page.waitForSelector('.ds-chip');
    const chip = page.locator('.ds-chip');
    await expect(chip).toHaveClass(/ds-chip--selected/);
  });

  test('should have aria-selected attribute', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dschip--selected');
    await page.waitForSelector('.ds-chip');
    const chip = page.locator('.ds-chip');
    await expect(chip).toHaveAttribute('aria-selected', 'true');
  });
});
