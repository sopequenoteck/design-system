import { test, expect } from '@playwright/test';

test.describe('DsDatePicker', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-dsdatepicker--default');
    await page.waitForSelector('.ds-date-picker');
  });

  test('should render date picker component', async ({ page }) => {
    await expect(page.locator('.ds-date-picker')).toBeVisible();
  });

  test('should display current month and year', async ({ page }) => {
    const header = page.locator('.ds-date-picker__header');
    await expect(header).toBeVisible();

    const monthBtn = page.locator('.ds-date-picker__month-btn');
    const yearBtn = page.locator('.ds-date-picker__year-btn');
    await expect(monthBtn).toBeVisible();
    await expect(yearBtn).toBeVisible();
  });

  test('should display weekday headers', async ({ page }) => {
    const weekdays = page.locator('.ds-date-picker__weekday');
    await expect(weekdays).toHaveCount(7);
  });

  test('should display calendar days', async ({ page }) => {
    const days = page.locator('.ds-date-picker__day');
    const count = await days.count();
    expect(count).toBeGreaterThanOrEqual(28);
  });

  test('should highlight today', async ({ page }) => {
    const today = page.locator('.ds-date-picker__day--today');
    await expect(today).toBeVisible();
  });
});

test.describe('DsDatePicker navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-dsdatepicker--default');
    await page.waitForSelector('.ds-date-picker');
  });

  test('should navigate to previous month', async ({ page }) => {
    const monthBtn = page.locator('.ds-date-picker__month-btn');
    const initialMonth = await monthBtn.textContent();

    await page.click('.ds-date-picker__nav--prev');
    const newMonth = await monthBtn.textContent();

    expect(newMonth).not.toBe(initialMonth);
  });

  test('should navigate to next month', async ({ page }) => {
    const monthBtn = page.locator('.ds-date-picker__month-btn');
    const initialMonth = await monthBtn.textContent();

    await page.click('.ds-date-picker__nav--next');
    const newMonth = await monthBtn.textContent();

    expect(newMonth).not.toBe(initialMonth);
  });

  test('should open month picker', async ({ page }) => {
    await page.click('.ds-date-picker__month-btn');
    await expect(page.locator('.ds-date-picker__month-picker')).toBeVisible();
  });

  test('should select month from picker', async ({ page }) => {
    await page.click('.ds-date-picker__month-btn');
    await page.click('.ds-date-picker__month-option:nth-child(3)');

    await expect(page.locator('.ds-date-picker__month-picker')).not.toBeVisible();
  });

  test('should open year picker', async ({ page }) => {
    await page.click('.ds-date-picker__year-btn');
    await expect(page.locator('.ds-date-picker__year-picker')).toBeVisible();
  });

  test('should select year from picker', async ({ page }) => {
    await page.click('.ds-date-picker__year-btn');
    await page.click('.ds-date-picker__year-option:nth-child(5)');

    await expect(page.locator('.ds-date-picker__year-picker')).not.toBeVisible();
  });
});

test.describe('DsDatePicker selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-dsdatepicker--default');
    await page.waitForSelector('.ds-date-picker');
  });

  test('should select date on click', async ({ page }) => {
    const day = page.locator('.ds-date-picker__day:not(.ds-date-picker__day--other-month)').first();
    await day.click();

    await expect(day).toHaveClass(/ds-date-picker__day--selected/);
  });

  test('should show today button', async ({ page }) => {
    const todayBtn = page.locator('.ds-date-picker__action').first();
    await expect(todayBtn).toBeVisible();
  });

  test('should navigate to today on button click', async ({ page }) => {
    // Navigate away first
    await page.click('.ds-date-picker__nav--prev');
    await page.click('.ds-date-picker__nav--prev');

    const todayBtn = page.locator('.ds-date-picker__action').first();
    await todayBtn.click();

    await expect(page.locator('.ds-date-picker__day--today')).toBeVisible();
  });

  test('should clear selection on clear button click', async ({ page }) => {
    const day = page.locator('.ds-date-picker__day:not(.ds-date-picker__day--other-month)').first();
    await day.click();

    const clearBtn = page.locator('.ds-date-picker__action').nth(1);
    await clearBtn.click();

    await expect(page.locator('.ds-date-picker__day--selected')).not.toBeVisible();
  });
});

test.describe('DsDatePicker keyboard navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-dsdatepicker--default');
    await page.waitForSelector('.ds-date-picker');
  });

  test('should navigate days with arrow keys', async ({ page }) => {
    const day = page.locator('.ds-date-picker__day:not(.ds-date-picker__day--other-month)').first();
    await day.focus();

    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowDown');
  });

  test('should select with Enter key', async ({ page }) => {
    const day = page.locator('.ds-date-picker__day:not(.ds-date-picker__day--other-month)').first();
    await day.focus();
    await page.keyboard.press('Enter');

    await expect(day).toHaveClass(/ds-date-picker__day--selected/);
  });
});

test.describe('DsDatePicker range mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-dsdatepicker--rangeselection');
    await page.waitForSelector('.ds-date-picker');
  });

  test('should select range start on first click', async ({ page }) => {
    const days = page.locator('.ds-date-picker__day:not(.ds-date-picker__day--other-month)');
    await days.nth(5).click();

    await expect(days.nth(5)).toHaveClass(/ds-date-picker__day--range-start/);
  });

  test('should complete range on second click', async ({ page }) => {
    const days = page.locator('.ds-date-picker__day:not(.ds-date-picker__day--other-month)');
    await days.nth(5).click();
    await days.nth(10).click();

    await expect(days.nth(10)).toHaveClass(/ds-date-picker__day--range-end/);
  });

  test('should highlight days in range', async ({ page }) => {
    const days = page.locator('.ds-date-picker__day:not(.ds-date-picker__day--other-month)');
    await days.nth(5).click();
    await days.nth(10).click();

    const inRange = page.locator('.ds-date-picker__day--in-range');
    const count = await inRange.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('DsDatePicker accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-dsdatepicker--default');
    await page.waitForSelector('.ds-date-picker');
  });

  test('should have grid role on calendar', async ({ page }) => {
    await expect(page.locator('.ds-date-picker__calendar')).toHaveAttribute('role', 'grid');
  });

  test('should have columnheader role on weekdays', async ({ page }) => {
    const weekday = page.locator('.ds-date-picker__weekday').first();
    await expect(weekday).toHaveAttribute('role', 'columnheader');
  });

  test('should have gridcell role on days', async ({ page }) => {
    const day = page.locator('.ds-date-picker__day').first();
    await expect(day).toHaveAttribute('role', 'gridcell');
  });

  test('should have aria-label on navigation buttons', async ({ page }) => {
    const prevBtn = page.locator('.ds-date-picker__nav--prev');
    const nextBtn = page.locator('.ds-date-picker__nav--next');

    await expect(prevBtn).toHaveAttribute('aria-label', /mois/i);
    await expect(nextBtn).toHaveAttribute('aria-label', /mois/i);
  });
});

test.describe('DsDatePicker min/max constraints', () => {
  test('should disable dates outside range', async ({ page }) => {
    await page.goto('/iframe.html?id=components-dsdatepicker--withminmaxdate');
    await page.waitForSelector('.ds-date-picker');

    const disabledDays = page.locator('.ds-date-picker__day--disabled');
    const count = await disabledDays.count();
    expect(count).toBeGreaterThan(0);
  });
});
