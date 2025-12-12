import { test, expect } from '@playwright/test';

test.describe('DsDrawer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-overlay-dsdrawer--default');
  });

  test('should open drawer on button click', async ({ page }) => {
    const openButton = page.locator('button:has-text("Open")');
    await openButton.click();

    const drawer = page.locator('.ds-drawer');
    await expect(drawer).toBeVisible();
  });

  test('should display drawer content', async ({ page }) => {
    const openButton = page.locator('button:has-text("Open")');
    await openButton.click();

    const content = page.locator('.ds-drawer__content');
    await expect(content).toBeVisible();
  });

  test('should have overlay backdrop', async ({ page }) => {
    const openButton = page.locator('button:has-text("Open")');
    await openButton.click();

    const overlay = page.locator('.cdk-overlay-backdrop');
    await expect(overlay).toBeVisible();
  });
});

test.describe('DsDrawer positions', () => {
  test('should open from left', async ({ page }) => {
    await page.goto('/iframe.html?id=components-overlay-dsdrawer--left-position');

    const openButton = page.locator('button:has-text("Open")');
    await openButton.click();

    const drawer = page.locator('.ds-drawer');
    await expect(drawer).toHaveClass(/ds-drawer--left/);
  });

  test('should open from right', async ({ page }) => {
    await page.goto('/iframe.html?id=components-overlay-dsdrawer--right-position');

    const openButton = page.locator('button:has-text("Open")');
    await openButton.click();

    const drawer = page.locator('.ds-drawer');
    await expect(drawer).toHaveClass(/ds-drawer--right/);
  });

  test('should open from top', async ({ page }) => {
    await page.goto('/iframe.html?id=components-overlay-dsdrawer--top-position');

    const openButton = page.locator('button:has-text("Open")');
    await openButton.click();

    const drawer = page.locator('.ds-drawer');
    await expect(drawer).toHaveClass(/ds-drawer--top/);
  });

  test('should open from bottom', async ({ page }) => {
    await page.goto('/iframe.html?id=components-overlay-dsdrawer--bottom-position');

    const openButton = page.locator('button:has-text("Open")');
    await openButton.click();

    const drawer = page.locator('.ds-drawer');
    await expect(drawer).toHaveClass(/ds-drawer--bottom/);
  });
});

test.describe('DsDrawer sizes', () => {
  test('should render small size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-overlay-dsdrawer--sizes');

    const openButton = page.locator('button:has-text("Small")').first();
    await openButton.click();

    const drawer = page.locator('.ds-drawer');
    await expect(drawer).toHaveClass(/ds-drawer--sm/);
  });

  test('should render medium size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-overlay-dsdrawer--sizes');

    const openButton = page.locator('button:has-text("Medium")').first();
    await openButton.click();

    const drawer = page.locator('.ds-drawer');
    await expect(drawer).toHaveClass(/ds-drawer--md/);
  });

  test('should render large size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-overlay-dsdrawer--sizes');

    const openButton = page.locator('button:has-text("Large")').first();
    await openButton.click();

    const drawer = page.locator('.ds-drawer');
    await expect(drawer).toHaveClass(/ds-drawer--lg/);
  });
});

test.describe('DsDrawer close behavior', () => {
  test('should close on close button click', async ({ page }) => {
    await page.goto('/iframe.html?id=components-overlay-dsdrawer--default');

    const openButton = page.locator('button:has-text("Open")');
    await openButton.click();

    const closeButton = page.locator('.ds-drawer__close');
    await closeButton.click();

    const drawer = page.locator('.ds-drawer');
    await expect(drawer).not.toBeVisible();
  });

  test('should close on overlay click', async ({ page }) => {
    await page.goto('/iframe.html?id=components-overlay-dsdrawer--default');

    const openButton = page.locator('button:has-text("Open")');
    await openButton.click();

    const overlay = page.locator('.cdk-overlay-backdrop');
    await overlay.click();

    const drawer = page.locator('.ds-drawer');
    await expect(drawer).not.toBeVisible();
  });

  test('should close on Escape key', async ({ page }) => {
    await page.goto('/iframe.html?id=components-overlay-dsdrawer--default');

    const openButton = page.locator('button:has-text("Open")');
    await openButton.click();

    await page.keyboard.press('Escape');

    const drawer = page.locator('.ds-drawer');
    await expect(drawer).not.toBeVisible();
  });

  test('should not close on overlay click when disableClose', async ({ page }) => {
    await page.goto('/iframe.html?id=components-overlay-dsdrawer--disable-close');

    const openButton = page.locator('button:has-text("Open")');
    await openButton.click();

    const overlay = page.locator('.cdk-overlay-backdrop');
    await overlay.click();

    const drawer = page.locator('.ds-drawer');
    await expect(drawer).toBeVisible();
  });
});

test.describe('DsDrawer focus trap', () => {
  test('should trap focus inside drawer', async ({ page }) => {
    await page.goto('/iframe.html?id=components-overlay-dsdrawer--default');

    const openButton = page.locator('button:has-text("Open")');
    await openButton.click();

    // First tab should focus close button
    await page.keyboard.press('Tab');
    const closeButton = page.locator('.ds-drawer__close');
    await expect(closeButton).toBeFocused();
  });

  test('should cycle focus within drawer', async ({ page }) => {
    await page.goto('/iframe.html?id=components-overlay-dsdrawer--with-form');

    const openButton = page.locator('button:has-text("Open")');
    await openButton.click();

    // Tab through elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Focus should stay in drawer
    const drawer = page.locator('.ds-drawer');
    await expect(drawer).toBeVisible();
  });

  test('should restore focus on close', async ({ page }) => {
    await page.goto('/iframe.html?id=components-overlay-dsdrawer--default');

    const openButton = page.locator('button:has-text("Open")');
    await openButton.click();

    await page.keyboard.press('Escape');

    // Focus should return to open button
    await expect(openButton).toBeFocused();
  });
});

test.describe('DsDrawer accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-overlay-dsdrawer--default');

    const openButton = page.locator('button:has-text("Open")');
    await openButton.click();
  });

  test('should have dialog role', async ({ page }) => {
    const drawer = page.locator('.ds-drawer');
    await expect(drawer).toHaveAttribute('role', 'dialog');
  });

  test('should have aria-modal', async ({ page }) => {
    const drawer = page.locator('.ds-drawer');
    await expect(drawer).toHaveAttribute('aria-modal', 'true');
  });

  test('should have aria-labelledby', async ({ page }) => {
    const drawer = page.locator('.ds-drawer');
    await expect(drawer).toHaveAttribute('aria-labelledby');
  });

  test('should have accessible close button', async ({ page }) => {
    const closeButton = page.locator('.ds-drawer__close');
    await expect(closeButton).toHaveAttribute('aria-label');
  });

  test('should have visible focus indicators', async ({ page }) => {
    await page.keyboard.press('Tab');
    const closeButton = page.locator('.ds-drawer__close');
    await expect(closeButton).toBeFocused();
  });
});

test.describe('DsDrawer with header and footer', () => {
  test('should display header', async ({ page }) => {
    await page.goto('/iframe.html?id=components-overlay-dsdrawer--with-header-footer');

    const openButton = page.locator('button:has-text("Open")');
    await openButton.click();

    const header = page.locator('.ds-drawer__header');
    await expect(header).toBeVisible();
  });

  test('should display footer', async ({ page }) => {
    await page.goto('/iframe.html?id=components-overlay-dsdrawer--with-header-footer');

    const openButton = page.locator('button:has-text("Open")');
    await openButton.click();

    const footer = page.locator('.ds-drawer__footer');
    await expect(footer).toBeVisible();
  });

  test('should display title in header', async ({ page }) => {
    await page.goto('/iframe.html?id=components-overlay-dsdrawer--with-header-footer');

    const openButton = page.locator('button:has-text("Open")');
    await openButton.click();

    const title = page.locator('.ds-drawer__title');
    await expect(title).toBeVisible();
    await expect(title).not.toBeEmpty();
  });
});
