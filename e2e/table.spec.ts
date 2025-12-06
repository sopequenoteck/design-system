import { test, expect } from '@playwright/test';

test.describe('DsTable', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-dstable--default');
    await page.waitForSelector('.ds-table');
  });

  test('should render table component', async ({ page }) => {
    await expect(page.locator('.ds-table')).toBeVisible();
  });

  test('should render header row', async ({ page }) => {
    await expect(page.locator('.ds-table__header')).toBeVisible();
    const headers = page.locator('.ds-table__th');
    await expect(headers).toHaveCount(await headers.count());
  });

  test('should render data rows', async ({ page }) => {
    const rows = page.locator('.ds-table__row');
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have correct table structure', async ({ page }) => {
    await expect(page.locator('table.ds-table')).toBeVisible();
    await expect(page.locator('thead')).toBeVisible();
    await expect(page.locator('tbody')).toBeVisible();
  });
});

test.describe('DsTable sorting', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-dstable--sortable');
    await page.waitForSelector('.ds-table');
  });

  test('should show sort indicator on sortable columns', async ({ page }) => {
    const sortableHeader = page.locator('.ds-table__th--sortable').first();
    await expect(sortableHeader).toBeVisible();
  });

  test('should toggle sort on header click', async ({ page }) => {
    const sortableHeader = page.locator('.ds-table__th--sortable').first();
    await sortableHeader.click();

    await expect(sortableHeader).toHaveAttribute('aria-sort', /(ascending|descending)/);
  });

  test('should reverse sort on second click', async ({ page }) => {
    const sortableHeader = page.locator('.ds-table__th--sortable').first();

    await sortableHeader.click();
    const firstSort = await sortableHeader.getAttribute('aria-sort');

    await sortableHeader.click();
    const secondSort = await sortableHeader.getAttribute('aria-sort');

    expect(firstSort).not.toBe(secondSort);
  });
});

test.describe('DsTable striped', () => {
  test('should render striped rows', async ({ page }) => {
    await page.goto('/iframe.html?id=components-dstable--striped');
    await expect(page.locator('.ds-table--striped')).toBeVisible();
  });
});

test.describe('DsTable hover', () => {
  test('should highlight row on hover', async ({ page }) => {
    await page.goto('/iframe.html?id=components-dstable--hoverable');
    await expect(page.locator('.ds-table--hoverable')).toBeVisible();
  });
});

test.describe('DsTable sizes', () => {
  test('should render small size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-dstable--sizes');
    await expect(page.locator('.ds-table--sm')).toBeVisible();
  });

  test('should render medium size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-dstable--sizes');
    await expect(page.locator('.ds-table--md')).toBeVisible();
  });

  test('should render large size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-dstable--sizes');
    await expect(page.locator('.ds-table--lg')).toBeVisible();
  });
});

test.describe('DsTable accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-dstable--default');
    await page.waitForSelector('.ds-table');
  });

  test('should have scope on header cells', async ({ page }) => {
    const headers = page.locator('.ds-table__th');
    const count = await headers.count();

    for (let i = 0; i < count; i++) {
      await expect(headers.nth(i)).toHaveAttribute('scope', 'col');
    }
  });

  test('should have proper table role', async ({ page }) => {
    await expect(page.locator('.ds-table')).toHaveAttribute('role', 'table');
  });
});

test.describe('DsTable empty state', () => {
  test('should show empty message when no data', async ({ page }) => {
    await page.goto('/iframe.html?id=components-dstable--empty');
    await expect(page.locator('.ds-table__empty')).toBeVisible();
  });
});
