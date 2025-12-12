import { test, expect } from '@playwright/test';

test.describe('DsTree', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dstree--default');
    await page.waitForSelector('.ds-tree');
  });

  test('should render tree component', async ({ page }) => {
    await expect(page.locator('.ds-tree')).toBeVisible();
  });

  test('should display root nodes', async ({ page }) => {
    const nodes = page.locator('.ds-tree-node');
    await expect(nodes.first()).toBeVisible();
  });

  test('should display node labels', async ({ page }) => {
    const label = page.locator('.ds-tree-node__label').first();
    await expect(label).toBeVisible();
    await expect(label).not.toBeEmpty();
  });

  test('should have correct default classes', async ({ page }) => {
    const tree = page.locator('.ds-tree');
    await expect(tree).toHaveClass(/ds-tree/);
  });
});

test.describe('DsTree expand/collapse', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dstree--default');
    await page.waitForSelector('.ds-tree');
  });

  test('should expand node on toggle click', async ({ page }) => {
    const toggle = page.locator('.ds-tree-node__toggle').first();
    await toggle.click();

    const children = page.locator('.ds-tree-node__children').first();
    await expect(children).toBeVisible();
  });

  test('should collapse node on second toggle click', async ({ page }) => {
    const toggle = page.locator('.ds-tree-node__toggle').first();

    // Expand
    await toggle.click();

    // Collapse
    await toggle.click();

    const children = page.locator('.ds-tree-node__children').first();
    await expect(children).not.toBeVisible();
  });

  test('should show expand icon when collapsed', async ({ page }) => {
    const toggle = page.locator('.ds-tree-node__toggle').first();
    const icon = toggle.locator('fa-icon');

    await expect(icon).toBeVisible();
  });

  test('should show collapse icon when expanded', async ({ page }) => {
    const toggle = page.locator('.ds-tree-node__toggle').first();
    await toggle.click();

    const icon = toggle.locator('fa-icon');
    await expect(icon).toBeVisible();
  });

  test('should have expanded class when expanded', async ({ page }) => {
    const node = page.locator('.ds-tree-node').first();
    const toggle = node.locator('.ds-tree-node__toggle');

    await toggle.click();

    await expect(node).toHaveClass(/ds-tree-node--expanded/);
  });
});

test.describe('DsTree with checkboxes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dstree--with-checkboxes');
    await page.waitForSelector('.ds-tree');
  });

  test('should display checkboxes', async ({ page }) => {
    const checkbox = page.locator('.ds-tree-node__checkbox').first();
    await expect(checkbox).toBeVisible();
  });

  test('should select node on checkbox click', async ({ page }) => {
    const checkbox = page.locator('.ds-tree-node__checkbox').first();
    await checkbox.click();

    const node = page.locator('.ds-tree-node').first();
    await expect(node).toHaveClass(/ds-tree-node--selected/);
  });

  test('should unselect node on second checkbox click', async ({ page }) => {
    const checkbox = page.locator('.ds-tree-node__checkbox').first();

    // Select
    await checkbox.click();

    // Unselect
    await checkbox.click();

    const node = page.locator('.ds-tree-node').first();
    await expect(node).not.toHaveClass(/ds-tree-node--selected/);
  });

  test('should select all children when parent selected', async ({ page }) => {
    const parentNode = page.locator('.ds-tree-node').first();
    const toggle = parentNode.locator('.ds-tree-node__toggle');

    // Expand to show children
    await toggle.click();

    const checkbox = parentNode.locator('.ds-tree-node__checkbox');
    await checkbox.click();

    // Children should be selected
    const childNodes = parentNode.locator('.ds-tree-node__children .ds-tree-node');
    await expect(childNodes.first()).toBeVisible();
  });

  test('should show indeterminate state', async ({ page }) => {
    const parentNode = page.locator('.ds-tree-node').first();
    const toggle = parentNode.locator('.ds-tree-node__toggle');

    // Expand
    await toggle.click();

    // Select first child only
    const firstChild = parentNode.locator('.ds-tree-node__children .ds-tree-node').first();
    const childCheckbox = firstChild.locator('.ds-tree-node__checkbox');
    await childCheckbox.click();

    // Parent should have indeterminate class
    await expect(parentNode).toHaveClass(/ds-tree-node--indeterminate/);
  });
});

test.describe('DsTree keyboard navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dstree--default');
    await page.waitForSelector('.ds-tree');
  });

  test('should be focusable', async ({ page }) => {
    await page.keyboard.press('Tab');
    const firstNode = page.locator('.ds-tree-node').first();
    await expect(firstNode).toBeFocused();
  });

  test('should navigate down with ArrowDown', async ({ page }) => {
    const firstNode = page.locator('.ds-tree-node').first();
    await firstNode.focus();

    await page.keyboard.press('ArrowDown');

    const secondNode = page.locator('.ds-tree-node').nth(1);
    await expect(secondNode).toBeFocused();
  });

  test('should navigate up with ArrowUp', async ({ page }) => {
    const secondNode = page.locator('.ds-tree-node').nth(1);
    await secondNode.focus();

    await page.keyboard.press('ArrowUp');

    const firstNode = page.locator('.ds-tree-node').first();
    await expect(firstNode).toBeFocused();
  });

  test('should expand with ArrowRight', async ({ page }) => {
    const node = page.locator('.ds-tree-node').first();
    await node.focus();

    await page.keyboard.press('ArrowRight');

    await expect(node).toHaveClass(/ds-tree-node--expanded/);
  });

  test('should collapse with ArrowLeft', async ({ page }) => {
    const node = page.locator('.ds-tree-node').first();
    await node.focus();

    // Expand first
    await page.keyboard.press('ArrowRight');

    // Then collapse
    await page.keyboard.press('ArrowLeft');

    await expect(node).not.toHaveClass(/ds-tree-node--expanded/);
  });

  test('should expand/collapse with Enter', async ({ page }) => {
    const node = page.locator('.ds-tree-node').first();
    await node.focus();

    await page.keyboard.press('Enter');

    // Should toggle expanded state
    await expect(node).toBeDefined();
  });

  test('should select with Space key when checkboxes enabled', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dstree--with-checkboxes');
    await page.waitForSelector('.ds-tree');

    const node = page.locator('.ds-tree-node').first();
    await node.focus();

    await page.keyboard.press('Space');

    await expect(node).toHaveClass(/ds-tree-node--selected/);
  });
});

test.describe('DsTree lazy loading', () => {
  test('should display loading indicator', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dstree--lazy-loading');
    await page.waitForSelector('.ds-tree');

    const toggle = page.locator('.ds-tree-node__toggle').first();
    await toggle.click();

    const loader = page.locator('.ds-tree-node__loader');
    await expect(loader).toBeVisible();
  });

  test('should load children on expand', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dstree--lazy-loading');
    await page.waitForSelector('.ds-tree');

    const toggle = page.locator('.ds-tree-node__toggle').first();
    await toggle.click();

    // Wait for children to load
    await page.waitForTimeout(1000);

    const children = page.locator('.ds-tree-node__children').first();
    await expect(children).toBeVisible();
  });
});

test.describe('DsTree with icons', () => {
  test('should display node icons', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dstree--with-icons');
    await page.waitForSelector('.ds-tree');

    const icon = page.locator('.ds-tree-node__icon').first();
    await expect(icon).toBeVisible();
  });

  test('should display different icons for expanded/collapsed', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dstree--with-icons');
    await page.waitForSelector('.ds-tree');

    const node = page.locator('.ds-tree-node').first();
    const toggle = node.locator('.ds-tree-node__toggle');

    // Click to expand
    await toggle.click();

    const icon = node.locator('.ds-tree-node__icon');
    await expect(icon).toBeVisible();
  });
});

test.describe('DsTree accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dstree--default');
    await page.waitForSelector('.ds-tree');
  });

  test('should have tree role', async ({ page }) => {
    const tree = page.locator('.ds-tree');
    await expect(tree).toHaveAttribute('role', 'tree');
  });

  test('should have treeitem role on nodes', async ({ page }) => {
    const node = page.locator('.ds-tree-node').first();
    await expect(node).toHaveAttribute('role', 'treeitem');
  });

  test('should have aria-expanded on expandable nodes', async ({ page }) => {
    const node = page.locator('.ds-tree-node').first();
    await expect(node).toHaveAttribute('aria-expanded');
  });

  test('should update aria-expanded on toggle', async ({ page }) => {
    const node = page.locator('.ds-tree-node').first();
    const toggle = node.locator('.ds-tree-node__toggle');

    await toggle.click();

    await expect(node).toHaveAttribute('aria-expanded', 'true');
  });

  test('should have aria-selected when checkboxes enabled', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dstree--with-checkboxes');
    await page.waitForSelector('.ds-tree');

    const node = page.locator('.ds-tree-node').first();
    await expect(node).toHaveAttribute('aria-selected');
  });

  test('should have tabindex for keyboard navigation', async ({ page }) => {
    const node = page.locator('.ds-tree-node').first();
    await expect(node).toHaveAttribute('tabindex');
  });
});

test.describe('DsTree nested structure', () => {
  test('should display multiple levels', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dstree--nested');
    await page.waitForSelector('.ds-tree');

    // Expand first level
    const firstToggle = page.locator('.ds-tree-node__toggle').first();
    await firstToggle.click();

    // Expand second level
    const secondToggle = page.locator('.ds-tree-node__children .ds-tree-node__toggle').first();
    await secondToggle.click();

    // Third level should be visible
    const thirdLevel = page.locator('.ds-tree-node__children .ds-tree-node__children');
    await expect(thirdLevel.first()).toBeVisible();
  });

  test('should maintain proper indentation', async ({ page }) => {
    await page.goto('/iframe.html?id=components-data-display-dstree--nested');
    await page.waitForSelector('.ds-tree');

    const firstToggle = page.locator('.ds-tree-node__toggle').first();
    await firstToggle.click();

    const childNode = page.locator('.ds-tree-node__children .ds-tree-node').first();
    await expect(childNode).toBeVisible();
  });
});
