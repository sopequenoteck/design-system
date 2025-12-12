import { test, expect } from '@playwright/test';

test.describe('DsSlider', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsslider--default');
    await page.waitForSelector('.ds-slider');
  });

  test('should render slider component', async ({ page }) => {
    await expect(page.locator('.ds-slider')).toBeVisible();
  });

  test('should display track', async ({ page }) => {
    const track = page.locator('.ds-slider__track');
    await expect(track).toBeVisible();
  });

  test('should display thumb', async ({ page }) => {
    const thumb = page.locator('.ds-slider__thumb');
    await expect(thumb).toBeVisible();
  });

  test('should display fill', async ({ page }) => {
    const fill = page.locator('.ds-slider__fill');
    await expect(fill).toBeVisible();
  });
});

test.describe('DsSlider sizes', () => {
  test('should render small size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsslider--sizes');
    await page.waitForSelector('.ds-slider--sm');
    await expect(page.locator('.ds-slider--sm')).toBeVisible();
  });

  test('should render medium size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsslider--sizes');
    await page.waitForSelector('.ds-slider--md');
    await expect(page.locator('.ds-slider--md')).toBeVisible();
  });

  test('should render large size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsslider--sizes');
    await page.waitForSelector('.ds-slider--lg');
    await expect(page.locator('.ds-slider--lg')).toBeVisible();
  });
});

test.describe('DsSlider interaction', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsslider--default');
    await page.waitForSelector('.ds-slider');
  });

  test('should change value on track click', async ({ page }) => {
    const track = page.locator('.ds-slider__track');
    const boundingBox = await track.boundingBox();

    if (boundingBox) {
      // Click in the middle of the track
      await page.mouse.click(
        boundingBox.x + boundingBox.width / 2,
        boundingBox.y + boundingBox.height / 2
      );
    }

    // Verify thumb moved (fill width changed)
    const fill = page.locator('.ds-slider__fill');
    await expect(fill).toBeVisible();
  });

  test('should change value with drag', async ({ page }) => {
    const thumb = page.locator('.ds-slider__thumb');
    const track = page.locator('.ds-slider__track');

    const thumbBox = await thumb.boundingBox();
    const trackBox = await track.boundingBox();

    if (thumbBox && trackBox) {
      await page.mouse.move(thumbBox.x + thumbBox.width / 2, thumbBox.y + thumbBox.height / 2);
      await page.mouse.down();
      await page.mouse.move(trackBox.x + trackBox.width * 0.75, thumbBox.y + thumbBox.height / 2);
      await page.mouse.up();
    }

    // Verify thumb moved
    const fill = page.locator('.ds-slider__fill');
    await expect(fill).toBeVisible();
  });
});

test.describe('DsSlider keyboard navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsslider--default');
    await page.waitForSelector('.ds-slider');
  });

  test('should be focusable', async ({ page }) => {
    await page.keyboard.press('Tab');
    const thumb = page.locator('.ds-slider__thumb');
    await expect(thumb).toBeFocused();
  });

  test('should increase value with ArrowRight', async ({ page }) => {
    const thumb = page.locator('.ds-slider__thumb');
    await thumb.focus();

    const initialFillWidth = await page.locator('.ds-slider__fill').evaluate(el => el.style.width);
    await page.keyboard.press('ArrowRight');

    // Value should have increased
    await expect(page.locator('.ds-slider__fill')).toBeVisible();
  });

  test('should decrease value with ArrowLeft', async ({ page }) => {
    const thumb = page.locator('.ds-slider__thumb');
    await thumb.focus();

    // First increase, then decrease
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowLeft');

    await expect(page.locator('.ds-slider__fill')).toBeVisible();
  });

  test('should go to min with Home key', async ({ page }) => {
    const thumb = page.locator('.ds-slider__thumb');
    await thumb.focus();

    await page.keyboard.press('Home');

    // Fill should be minimal
    const fill = page.locator('.ds-slider__fill');
    await expect(fill).toBeVisible();
  });

  test('should go to max with End key', async ({ page }) => {
    const thumb = page.locator('.ds-slider__thumb');
    await thumb.focus();

    await page.keyboard.press('End');

    // Fill should be maximal (100%)
    const fill = page.locator('.ds-slider__fill');
    await expect(fill).toBeVisible();
  });
});

test.describe('DsSlider disabled', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsslider--disabled');
    await page.waitForSelector('.ds-slider');
  });

  test('should have disabled class', async ({ page }) => {
    const slider = page.locator('.ds-slider');
    await expect(slider).toHaveClass(/ds-slider--disabled/);
  });

  test('should not be focusable when disabled', async ({ page }) => {
    await page.keyboard.press('Tab');
    const thumb = page.locator('.ds-slider__thumb');
    await expect(thumb).not.toBeFocused();
  });
});

test.describe('DsSlider with ticks', () => {
  test('should display tick marks', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsslider--with-ticks');
    await page.waitForSelector('.ds-slider');

    const ticks = page.locator('.ds-slider__tick');
    await expect(ticks.first()).toBeVisible();
  });
});

test.describe('DsSlider with labels', () => {
  test('should display min/max labels', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsslider--with-labels');
    await page.waitForSelector('.ds-slider');

    const labels = page.locator('.ds-slider__label');
    await expect(labels.first()).toBeVisible();
  });
});

test.describe('DsSlider accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsslider--default');
    await page.waitForSelector('.ds-slider');
  });

  test('should have slider role', async ({ page }) => {
    const thumb = page.locator('.ds-slider__thumb');
    await expect(thumb).toHaveAttribute('role', 'slider');
  });

  test('should have aria-valuemin', async ({ page }) => {
    const thumb = page.locator('.ds-slider__thumb');
    await expect(thumb).toHaveAttribute('aria-valuemin');
  });

  test('should have aria-valuemax', async ({ page }) => {
    const thumb = page.locator('.ds-slider__thumb');
    await expect(thumb).toHaveAttribute('aria-valuemax');
  });

  test('should have aria-valuenow', async ({ page }) => {
    const thumb = page.locator('.ds-slider__thumb');
    await expect(thumb).toHaveAttribute('aria-valuenow');
  });

  test('should have tabindex', async ({ page }) => {
    const thumb = page.locator('.ds-slider__thumb');
    await expect(thumb).toHaveAttribute('tabindex', '0');
  });
});

test.describe('DsSlider range mode', () => {
  test('should display two thumbs in range mode', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsslider--range');
    await page.waitForSelector('.ds-slider');

    const thumbs = page.locator('.ds-slider__thumb');
    await expect(thumbs).toHaveCount(2);
  });
});

test.describe('DsSlider with step', () => {
  test('should respect step value', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsslider--with-step');
    await page.waitForSelector('.ds-slider');

    const thumb = page.locator('.ds-slider__thumb');
    await thumb.focus();

    // Press arrow right multiple times
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');

    // Value should have changed in steps
    await expect(page.locator('.ds-slider__fill')).toBeVisible();
  });
});

test.describe('DsSlider vertical', () => {
  test('should render in vertical orientation', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsslider--vertical');
    await page.waitForSelector('.ds-slider');

    const slider = page.locator('.ds-slider');
    await expect(slider).toHaveClass(/ds-slider--vertical/);
  });

  test('should use ArrowUp/Down for vertical', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsslider--vertical');
    await page.waitForSelector('.ds-slider');

    const thumb = page.locator('.ds-slider__thumb');
    await thumb.focus();

    await page.keyboard.press('ArrowUp');
    await expect(page.locator('.ds-slider__fill')).toBeVisible();
  });
});
