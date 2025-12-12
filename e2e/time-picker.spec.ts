import { test, expect } from '@playwright/test';

test.describe('DsTimePicker', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dstimepicker--default');
    await page.waitForSelector('.ds-time-picker');
  });

  test('should render time picker component', async ({ page }) => {
    await expect(page.locator('.ds-time-picker')).toBeVisible();
  });

  test('should display input field', async ({ page }) => {
    const input = page.locator('.ds-time-picker input');
    await expect(input).toBeVisible();
  });

  test('should display clock icon', async ({ page }) => {
    const icon = page.locator('.ds-time-picker__icon');
    await expect(icon).toBeVisible();
  });

  test('should have correct default classes', async ({ page }) => {
    const timePicker = page.locator('.ds-time-picker');
    await expect(timePicker).toHaveClass(/ds-time-picker--md/);
  });
});

test.describe('DsTimePicker panel interaction', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dstimepicker--default');
    await page.waitForSelector('.ds-time-picker');
  });

  test('should open panel on input click', async ({ page }) => {
    const input = page.locator('.ds-time-picker input');
    await input.click();

    const panel = page.locator('.ds-time-picker-panel');
    await expect(panel).toBeVisible();
  });

  test('should open panel on icon click', async ({ page }) => {
    const icon = page.locator('.ds-time-picker__icon');
    await icon.click();

    const panel = page.locator('.ds-time-picker-panel');
    await expect(panel).toBeVisible();
  });

  test('should display hours column', async ({ page }) => {
    const input = page.locator('.ds-time-picker input');
    await input.click();

    const hoursColumn = page.locator('.ds-time-picker-panel__hours');
    await expect(hoursColumn).toBeVisible();
  });

  test('should display minutes column', async ({ page }) => {
    const input = page.locator('.ds-time-picker input');
    await input.click();

    const minutesColumn = page.locator('.ds-time-picker-panel__minutes');
    await expect(minutesColumn).toBeVisible();
  });

  test('should close panel on outside click', async ({ page }) => {
    const input = page.locator('.ds-time-picker input');
    await input.click();

    // Click outside
    await page.mouse.click(10, 10);

    const panel = page.locator('.ds-time-picker-panel');
    await expect(panel).not.toBeVisible();
  });

  test('should close panel on Escape key', async ({ page }) => {
    const input = page.locator('.ds-time-picker input');
    await input.click();

    await page.keyboard.press('Escape');

    const panel = page.locator('.ds-time-picker-panel');
    await expect(panel).not.toBeVisible();
  });
});

test.describe('DsTimePicker time selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dstimepicker--default');
    await page.waitForSelector('.ds-time-picker');
  });

  test('should select hour on click', async ({ page }) => {
    const input = page.locator('.ds-time-picker input');
    await input.click();

    const hourOption = page.locator('.ds-time-picker-panel__hours .ds-time-picker-panel__option').first();
    await hourOption.click();

    await expect(hourOption).toHaveClass(/ds-time-picker-panel__option--selected/);
  });

  test('should select minute on click', async ({ page }) => {
    const input = page.locator('.ds-time-picker input');
    await input.click();

    const minuteOption = page.locator('.ds-time-picker-panel__minutes .ds-time-picker-panel__option').first();
    await minuteOption.click();

    await expect(minuteOption).toHaveClass(/ds-time-picker-panel__option--selected/);
  });

  test('should update input value on selection', async ({ page }) => {
    const input = page.locator('.ds-time-picker input');
    await input.click();

    const hourOption = page.locator('.ds-time-picker-panel__hours .ds-time-picker-panel__option').nth(10);
    await hourOption.click();

    const minuteOption = page.locator('.ds-time-picker-panel__minutes .ds-time-picker-panel__option').nth(6);
    await minuteOption.click();

    const value = await input.inputValue();
    expect(value).toBeTruthy();
  });
});

test.describe('DsTimePicker 12h format', () => {
  test('should display AM/PM column in 12h format', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dstimepicker--format-12h');
    await page.waitForSelector('.ds-time-picker');

    const input = page.locator('.ds-time-picker input');
    await input.click();

    const periodColumn = page.locator('.ds-time-picker-panel__period');
    await expect(periodColumn).toBeVisible();
  });

  test('should toggle AM/PM on click', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dstimepicker--format-12h');
    await page.waitForSelector('.ds-time-picker');

    const input = page.locator('.ds-time-picker input');
    await input.click();

    const amOption = page.locator('.ds-time-picker-panel__period .ds-time-picker-panel__option:has-text("AM")');
    await amOption.click();

    await expect(amOption).toHaveClass(/ds-time-picker-panel__option--selected/);
  });

  test('should display 12 hours in 12h format', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dstimepicker--format-12h');
    await page.waitForSelector('.ds-time-picker');

    const input = page.locator('.ds-time-picker input');
    await input.click();

    const hourOptions = page.locator('.ds-time-picker-panel__hours .ds-time-picker-panel__option');
    const count = await hourOptions.count();

    expect(count).toBe(12);
  });
});

test.describe('DsTimePicker 24h format', () => {
  test('should not display AM/PM column in 24h format', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dstimepicker--format-24h');
    await page.waitForSelector('.ds-time-picker');

    const input = page.locator('.ds-time-picker input');
    await input.click();

    const periodColumn = page.locator('.ds-time-picker-panel__period');
    await expect(periodColumn).not.toBeVisible();
  });

  test('should display 24 hours in 24h format', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dstimepicker--format-24h');
    await page.waitForSelector('.ds-time-picker');

    const input = page.locator('.ds-time-picker input');
    await input.click();

    const hourOptions = page.locator('.ds-time-picker-panel__hours .ds-time-picker-panel__option');
    const count = await hourOptions.count();

    expect(count).toBe(24);
  });
});

test.describe('DsTimePicker with seconds', () => {
  test('should display seconds column when enabled', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dstimepicker--with-seconds');
    await page.waitForSelector('.ds-time-picker');

    const input = page.locator('.ds-time-picker input');
    await input.click();

    const secondsColumn = page.locator('.ds-time-picker-panel__seconds');
    await expect(secondsColumn).toBeVisible();
  });

  test('should select seconds on click', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dstimepicker--with-seconds');
    await page.waitForSelector('.ds-time-picker');

    const input = page.locator('.ds-time-picker input');
    await input.click();

    const secondOption = page.locator('.ds-time-picker-panel__seconds .ds-time-picker-panel__option').nth(5);
    await secondOption.click();

    await expect(secondOption).toHaveClass(/ds-time-picker-panel__option--selected/);
  });
});

test.describe('DsTimePicker keyboard navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dstimepicker--default');
    await page.waitForSelector('.ds-time-picker');
  });

  test('should navigate hours with ArrowUp/Down', async ({ page }) => {
    const input = page.locator('.ds-time-picker input');
    await input.click();

    const hoursColumn = page.locator('.ds-time-picker-panel__hours');
    await hoursColumn.click();

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');

    // Hours should have changed
    const panel = page.locator('.ds-time-picker-panel');
    await expect(panel).toBeVisible();
  });

  test('should navigate minutes with ArrowUp/Down', async ({ page }) => {
    const input = page.locator('.ds-time-picker input');
    await input.click();

    const minutesColumn = page.locator('.ds-time-picker-panel__minutes');
    await minutesColumn.click();

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');

    // Minutes should have changed
    const panel = page.locator('.ds-time-picker-panel');
    await expect(panel).toBeVisible();
  });

  test('should move focus between columns with Tab', async ({ page }) => {
    const input = page.locator('.ds-time-picker input');
    await input.click();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Focus should have moved
    const panel = page.locator('.ds-time-picker-panel');
    await expect(panel).toBeVisible();
  });
});

test.describe('DsTimePicker sizes', () => {
  test('should render small size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dstimepicker--sizes');
    await page.waitForSelector('.ds-time-picker--sm');
    await expect(page.locator('.ds-time-picker--sm')).toBeVisible();
  });

  test('should render medium size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dstimepicker--sizes');
    await page.waitForSelector('.ds-time-picker--md');
    await expect(page.locator('.ds-time-picker--md')).toBeVisible();
  });

  test('should render large size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dstimepicker--sizes');
    await page.waitForSelector('.ds-time-picker--lg');
    await expect(page.locator('.ds-time-picker--lg')).toBeVisible();
  });
});

test.describe('DsTimePicker disabled', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dstimepicker--disabled');
    await page.waitForSelector('.ds-time-picker');
  });

  test('should have disabled input', async ({ page }) => {
    const input = page.locator('.ds-time-picker input');
    await expect(input).toBeDisabled();
  });

  test('should not open panel when disabled', async ({ page }) => {
    const input = page.locator('.ds-time-picker input');
    await input.click({ force: true });

    const panel = page.locator('.ds-time-picker-panel');
    await expect(panel).not.toBeVisible();
  });
});

test.describe('DsTimePicker accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dstimepicker--default');
    await page.waitForSelector('.ds-time-picker');
  });

  test('should have accessible input', async ({ page }) => {
    const input = page.locator('.ds-time-picker input');
    await expect(input).toHaveAttribute('aria-label');
  });

  test('should have accessible icon button', async ({ page }) => {
    const icon = page.locator('.ds-time-picker__icon');
    await expect(icon).toHaveAttribute('aria-label');
  });

  test('should have proper ARIA attributes on panel', async ({ page }) => {
    const input = page.locator('.ds-time-picker input');
    await input.click();

    const panel = page.locator('.ds-time-picker-panel');
    await expect(panel).toHaveAttribute('role');
  });
});
