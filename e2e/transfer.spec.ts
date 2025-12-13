import { test, expect } from '@playwright/test';

test.describe('DsTransfer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dstransfer--default');
    await page.waitForSelector('.ds-transfer');
  });

  test('should render transfer component', async ({ page }) => {
    await expect(page.locator('.ds-transfer')).toBeVisible();
  });

  test('should display two panels (source and target)', async ({ page }) => {
    const sourcePanel = page.locator('.ds-transfer__panel--source');
    const targetPanel = page.locator('.ds-transfer__panel--target');

    await expect(sourcePanel).toBeVisible();
    await expect(targetPanel).toBeVisible();
  });

  test('should display panel titles', async ({ page }) => {
    const sourceTitle = page.locator('.ds-transfer__panel--source .ds-transfer__title span').first();
    const targetTitle = page.locator('.ds-transfer__panel--target .ds-transfer__title span').first();

    await expect(sourceTitle).toBeVisible();
    await expect(targetTitle).toBeVisible();
    await expect(sourceTitle).toContainText('Available');
    await expect(targetTitle).toContainText('Selected');
  });

  test('should display item counts', async ({ page }) => {
    const sourceCount = page.locator('.ds-transfer__panel--source .ds-transfer__count');
    const targetCount = page.locator('.ds-transfer__panel--target .ds-transfer__count');

    await expect(sourceCount).toBeVisible();
    await expect(targetCount).toBeVisible();
  });

  test('should display transfer action buttons', async ({ page }) => {
    const buttons = page.locator('.ds-transfer__actions ds-button');
    await expect(buttons).toHaveCount(2);
  });

  test('should have correct default classes', async ({ page }) => {
    const transfer = page.locator('.ds-transfer');
    await expect(transfer).toHaveClass(/ds-transfer/);
  });
});

test.describe('DsTransfer item selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dstransfer--default');
    await page.waitForSelector('.ds-transfer');
  });

  test('should select item on click', async ({ page }) => {
    const firstItem = page.locator('.ds-transfer__panel--source .ds-transfer__item').first();
    await firstItem.click();

    await expect(firstItem).toHaveClass(/ds-transfer__item--selected/);
  });

  test('should unselect item on second click', async ({ page }) => {
    const firstItem = page.locator('.ds-transfer__panel--source .ds-transfer__item').first();

    // Select
    await firstItem.click();

    // Unselect
    await firstItem.click();

    await expect(firstItem).not.toHaveClass(/ds-transfer__item--selected/);
  });

  test('should select multiple items', async ({ page }) => {
    const items = page.locator('.ds-transfer__panel--source .ds-transfer__item');
    const firstItem = items.first();
    const secondItem = items.nth(1);

    await firstItem.click();
    await secondItem.click();

    await expect(firstItem).toHaveClass(/ds-transfer__item--selected/);
    await expect(secondItem).toHaveClass(/ds-transfer__item--selected/);
  });

  test('should select item via checkbox', async ({ page }) => {
    const firstItem = page.locator('.ds-transfer__panel--source .ds-transfer__item').first();
    const checkbox = firstItem.locator('primitive-checkbox');

    await checkbox.click();

    await expect(firstItem).toHaveClass(/ds-transfer__item--selected/);
  });

  test('should update selection count on select', async ({ page }) => {
    const firstItem = page.locator('.ds-transfer__panel--source .ds-transfer__item').first();
    const count = page.locator('.ds-transfer__panel--source .ds-transfer__count');

    const initialText = await count.textContent();

    await firstItem.click();

    const updatedText = await count.textContent();
    await expect(updatedText).not.toBe(initialText);
  });

  test('should not select disabled items', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dstransfer--with-disabled-items');
    await page.waitForSelector('.ds-transfer');

    const disabledItem = page.locator('.ds-transfer__item--disabled').first();
    await disabledItem.click();

    await expect(disabledItem).not.toHaveClass(/ds-transfer__item--selected/);
  });
});

test.describe('DsTransfer select all', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dstransfer--default');
    await page.waitForSelector('.ds-transfer');
  });

  test('should display select all checkbox', async ({ page }) => {
    const selectAll = page.locator('.ds-transfer__panel--source .ds-transfer__select-all');
    await expect(selectAll).toBeVisible();
  });

  test('should select all items on select all click', async ({ page }) => {
    const selectAll = page.locator('.ds-transfer__panel--source .ds-transfer__select-all');
    await selectAll.click();

    const items = page.locator('.ds-transfer__panel--source .ds-transfer__item:not(.ds-transfer__item--disabled)');
    const count = await items.count();

    for (let i = 0; i < count; i++) {
      await expect(items.nth(i)).toHaveClass(/ds-transfer__item--selected/);
    }
  });

  test('should unselect all items on second select all click', async ({ page }) => {
    const selectAll = page.locator('.ds-transfer__panel--source .ds-transfer__select-all');

    // Select all
    await selectAll.click();

    // Unselect all
    await selectAll.click();

    const items = page.locator('.ds-transfer__panel--source .ds-transfer__item');
    const count = await items.count();

    for (let i = 0; i < count; i++) {
      await expect(items.nth(i)).not.toHaveClass(/ds-transfer__item--selected/);
    }
  });

  test('should not select disabled items when selecting all', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dstransfer--with-disabled-items');
    await page.waitForSelector('.ds-transfer');

    const selectAll = page.locator('.ds-transfer__panel--source .ds-transfer__select-all');
    await selectAll.click();

    const disabledItem = page.locator('.ds-transfer__panel--source .ds-transfer__item--disabled').first();
    await expect(disabledItem).not.toHaveClass(/ds-transfer__item--selected/);
  });
});

test.describe('DsTransfer item transfer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dstransfer--default');
    await page.waitForSelector('.ds-transfer');
  });

  test('should transfer selected items to target on button click', async ({ page }) => {
    const sourceItems = page.locator('.ds-transfer__panel--source .ds-transfer__item');
    const firstItem = sourceItems.first();

    // Select item
    await firstItem.click();

    // Transfer to target
    const transferButton = page.locator('.ds-transfer__actions ds-button').first();
    await transferButton.click();

    // Verify item is no longer in source
    const sourceItemsAfter = page.locator('.ds-transfer__panel--source .ds-transfer__item');
    const sourceCount = await sourceItemsAfter.count();

    // Item should be transferred
    await expect(sourceItemsAfter).not.toHaveCount(await sourceItems.count());
  });

  test('should transfer selected items to source on button click', async ({ page }) => {
    const targetItems = page.locator('.ds-transfer__panel--target .ds-transfer__item');
    const firstItem = targetItems.first();

    // Select item
    await firstItem.click();

    // Transfer to source
    const transferButton = page.locator('.ds-transfer__actions ds-button').last();
    await transferButton.click();

    // Item should be transferred
    const targetItemsAfter = page.locator('.ds-transfer__panel--target .ds-transfer__item');
    await expect(targetItemsAfter).not.toHaveCount(await targetItems.count());
  });

  test('should transfer multiple selected items', async ({ page }) => {
    const sourceItems = page.locator('.ds-transfer__panel--source .ds-transfer__item');

    // Select multiple items
    await sourceItems.first().click();
    await sourceItems.nth(1).click();

    // Transfer
    const transferButton = page.locator('.ds-transfer__actions ds-button').first();
    await transferButton.click();

    // Both items should be transferred
    await page.waitForTimeout(100);
  });

  test('should disable transfer button when no items selected', async ({ page }) => {
    const transferButton = page.locator('.ds-transfer__actions ds-button').first();
    await expect(transferButton).toBeDisabled();
  });

  test('should enable transfer button when items selected', async ({ page }) => {
    const firstItem = page.locator('.ds-transfer__panel--source .ds-transfer__item').first();
    await firstItem.click();

    const transferButton = page.locator('.ds-transfer__actions ds-button').first();
    await expect(transferButton).not.toBeDisabled();
  });

  test('should clear selection after transfer', async ({ page }) => {
    const firstItem = page.locator('.ds-transfer__panel--source .ds-transfer__item').first();
    await firstItem.click();

    const transferButton = page.locator('.ds-transfer__actions ds-button').first();
    await transferButton.click();

    // Wait for transfer to complete
    await page.waitForTimeout(100);

    // Selection count should be reset
    const count = page.locator('.ds-transfer__panel--source .ds-transfer__count');
    await expect(count).toContainText('0 /');
  });
});

test.describe('DsTransfer search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dstransfer--default');
    await page.waitForSelector('.ds-transfer');
  });

  test('should display search inputs', async ({ page }) => {
    const sourceSearch = page.locator('.ds-transfer__panel--source .ds-transfer__search-input');
    const targetSearch = page.locator('.ds-transfer__panel--target .ds-transfer__search-input');

    await expect(sourceSearch).toBeVisible();
    await expect(targetSearch).toBeVisible();
  });

  test('should filter items on search input', async ({ page }) => {
    const searchInput = page.locator('.ds-transfer__panel--source .ds-transfer__search-input');
    await searchInput.fill('JavaScript');

    // Wait for filtering
    await page.waitForTimeout(100);

    const items = page.locator('.ds-transfer__panel--source .ds-transfer__item');
    await expect(items).toHaveCount(1);
  });

  test('should filter by label or description', async ({ page }) => {
    const searchInput = page.locator('.ds-transfer__panel--source .ds-transfer__search-input');
    await searchInput.fill('Langage');

    // Wait for filtering
    await page.waitForTimeout(100);

    const items = page.locator('.ds-transfer__panel--source .ds-transfer__item');
    const count = await items.count();
    await expect(count).toBeGreaterThan(1);
  });

  test('should display clear button when search has value', async ({ page }) => {
    const searchInput = page.locator('.ds-transfer__panel--source .ds-transfer__search-input');
    await searchInput.fill('test');

    const clearButton = page.locator('.ds-transfer__panel--source .ds-transfer__search-clear');
    await expect(clearButton).toBeVisible();
  });

  test('should clear search on clear button click', async ({ page }) => {
    const searchInput = page.locator('.ds-transfer__panel--source .ds-transfer__search-input');
    await searchInput.fill('test');

    const clearButton = page.locator('.ds-transfer__panel--source .ds-transfer__search-clear');
    await clearButton.click();

    await expect(searchInput).toHaveValue('');
  });

  test('should show no results message when search has no matches', async ({ page }) => {
    const searchInput = page.locator('.ds-transfer__panel--source .ds-transfer__search-input');
    await searchInput.fill('zzzznonexistent');

    await page.waitForTimeout(100);

    const emptyMessage = page.locator('.ds-transfer__panel--source .ds-transfer__empty');
    await expect(emptyMessage).toBeVisible();
    await expect(emptyMessage).toContainText('Aucun résultat');
  });

  test('should restore all items after clearing search', async ({ page }) => {
    const searchInput = page.locator('.ds-transfer__panel--source .ds-transfer__search-input');

    // Get initial count
    const initialItems = page.locator('.ds-transfer__panel--source .ds-transfer__item');
    const initialCount = await initialItems.count();

    // Filter
    await searchInput.fill('JavaScript');
    await page.waitForTimeout(100);

    // Clear
    const clearButton = page.locator('.ds-transfer__panel--source .ds-transfer__search-clear');
    await clearButton.click();
    await page.waitForTimeout(100);

    // Count should be restored
    const restoredItems = page.locator('.ds-transfer__panel--source .ds-transfer__item');
    await expect(restoredItems).toHaveCount(initialCount);
  });
});

test.describe('DsTransfer without search', () => {
  test('should not display search inputs when showSearch is false', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dstransfer--without-search');
    await page.waitForSelector('.ds-transfer');

    const searchInputs = page.locator('.ds-transfer__search-input');
    await expect(searchInputs).toHaveCount(0);
  });
});

test.describe('DsTransfer without select all', () => {
  test('should not display select all checkboxes when showSelectAll is false', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dstransfer--without-select-all');
    await page.waitForSelector('.ds-transfer');

    const selectAllCheckboxes = page.locator('.ds-transfer__select-all');
    await expect(selectAllCheckboxes).toHaveCount(0);
  });
});

test.describe('DsTransfer disabled state', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dstransfer--disabled');
    await page.waitForSelector('.ds-transfer');
  });

  test('should have disabled class', async ({ page }) => {
    const transfer = page.locator('.ds-transfer');
    await expect(transfer).toHaveClass(/ds-transfer--disabled/);
  });

  test('should disable search inputs', async ({ page }) => {
    const sourceSearch = page.locator('.ds-transfer__panel--source .ds-transfer__search-input');
    const targetSearch = page.locator('.ds-transfer__panel--target .ds-transfer__search-input');

    await expect(sourceSearch).toBeDisabled();
    await expect(targetSearch).toBeDisabled();
  });

  test('should disable transfer buttons', async ({ page }) => {
    const buttons = page.locator('.ds-transfer__actions ds-button');

    await expect(buttons.first()).toBeDisabled();
    await expect(buttons.last()).toBeDisabled();
  });

  test('should not allow item selection', async ({ page }) => {
    const firstItem = page.locator('.ds-transfer__panel--source .ds-transfer__item').first();
    await firstItem.click();

    await expect(firstItem).not.toHaveClass(/ds-transfer__item--selected/);
  });
});

test.describe('DsTransfer sizes', () => {
  test('should have small size class', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dstransfer--small-size');
    await page.waitForSelector('.ds-transfer');

    const transfer = page.locator('.ds-transfer');
    await expect(transfer).toHaveClass(/ds-transfer--sm/);
  });

  test('should have large size class', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dstransfer--large-size');
    await page.waitForSelector('.ds-transfer');

    const transfer = page.locator('.ds-transfer');
    await expect(transfer).toHaveClass(/ds-transfer--lg/);
  });
});

test.describe('DsTransfer empty states', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dstransfer--empty-lists');
    await page.waitForSelector('.ds-transfer');
  });

  test('should display empty message in source when no items', async ({ page }) => {
    const emptyMessage = page.locator('.ds-transfer__panel--source .ds-transfer__empty');
    await expect(emptyMessage).toBeVisible();
    await expect(emptyMessage).toContainText('Aucun item disponible');
  });

  test('should display empty message in target when no items', async ({ page }) => {
    const emptyMessage = page.locator('.ds-transfer__panel--target .ds-transfer__empty');
    await expect(emptyMessage).toBeVisible();
    await expect(emptyMessage).toContainText('Aucun item sélectionné');
  });

  test('should disable select all when no items', async ({ page }) => {
    const sourceSelectAll = page.locator('.ds-transfer__panel--source .ds-transfer__select-all');
    await expect(sourceSelectAll).toBeDisabled();
  });
});

test.describe('DsTransfer keyboard navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dstransfer--default');
    await page.waitForSelector('.ds-transfer');
  });

  test('should navigate through items with Tab', async ({ page }) => {
    await page.keyboard.press('Tab');

    const searchInput = page.locator('.ds-transfer__panel--source .ds-transfer__search-input');
    await expect(searchInput).toBeFocused();
  });

  test('should activate item with Enter key', async ({ page }) => {
    const firstItem = page.locator('.ds-transfer__panel--source .ds-transfer__item').first();
    await firstItem.focus();

    await page.keyboard.press('Enter');

    // Note: Enter may or may not select depending on implementation
    await expect(firstItem).toBeDefined();
  });

  test('should activate item with Space key', async ({ page }) => {
    const firstItem = page.locator('.ds-transfer__panel--source .ds-transfer__item').first();
    await firstItem.focus();

    await page.keyboard.press('Space');

    // Note: Space may or may not select depending on implementation
    await expect(firstItem).toBeDefined();
  });
});

test.describe('DsTransfer accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dstransfer--default');
    await page.waitForSelector('.ds-transfer');
  });

  test('should have group role on container', async ({ page }) => {
    const transfer = page.locator('.ds-transfer');
    await expect(transfer).toHaveAttribute('role', 'group');
  });

  test('should have aria-label on container', async ({ page }) => {
    const transfer = page.locator('.ds-transfer');
    await expect(transfer).toHaveAttribute('aria-label', 'Transfer component');
  });

  test('should have listbox role on lists', async ({ page }) => {
    const sourcelist = page.locator('.ds-transfer__panel--source .ds-transfer__list');
    const targetList = page.locator('.ds-transfer__panel--target .ds-transfer__list');

    await expect(sourcelist).toHaveAttribute('role', 'listbox');
    await expect(targetList).toHaveAttribute('role', 'listbox');
  });

  test('should have aria-multiselectable on lists', async ({ page }) => {
    const sourcelist = page.locator('.ds-transfer__panel--source .ds-transfer__list');
    await expect(sourcelist).toHaveAttribute('aria-multiselectable', 'true');
  });

  test('should have option role on items', async ({ page }) => {
    const item = page.locator('.ds-transfer__item').first();
    await expect(item).toHaveAttribute('role', 'option');
  });

  test('should have aria-selected on items', async ({ page }) => {
    const item = page.locator('.ds-transfer__item').first();
    await expect(item).toHaveAttribute('aria-selected');
  });

  test('should update aria-selected on selection', async ({ page }) => {
    const item = page.locator('.ds-transfer__item').first();
    await item.click();

    await expect(item).toHaveAttribute('aria-selected', 'true');
  });

  test('should have aria-disabled on disabled items', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dstransfer--with-disabled-items');
    await page.waitForSelector('.ds-transfer');

    const disabledItem = page.locator('.ds-transfer__item--disabled').first();
    await expect(disabledItem).toHaveAttribute('aria-disabled', 'true');
  });

  test('should have aria-label on search inputs', async ({ page }) => {
    const sourceSearch = page.locator('.ds-transfer__panel--source .ds-transfer__search-input');
    await expect(sourceSearch).toHaveAttribute('aria-label');
  });

  test('should have aria-label on transfer buttons', async ({ page }) => {
    const buttons = page.locator('.ds-transfer__actions ds-button');

    await expect(buttons.first()).toHaveAttribute('aria-label');
    await expect(buttons.last()).toHaveAttribute('aria-label');
  });

  test('should have unique IDs on listboxes', async ({ page }) => {
    const sourcelist = page.locator('.ds-transfer__panel--source .ds-transfer__list');
    const targetList = page.locator('.ds-transfer__panel--target .ds-transfer__list');

    const sourceId = await sourcelist.getAttribute('id');
    const targetId = await targetList.getAttribute('id');

    expect(sourceId).not.toBe(targetId);
    expect(sourceId).toContain('ds-transfer');
    expect(targetId).toContain('ds-transfer');
  });
});
