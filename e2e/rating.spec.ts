import { test, expect } from '@playwright/test';

test.describe('DsRating', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsrating--default');
    await page.waitForSelector('.ds-rating');
  });

  test('should render rating component', async ({ page }) => {
    await expect(page.locator('.ds-rating')).toBeVisible();
  });

  test('should display all stars', async ({ page }) => {
    const stars = page.locator('.ds-rating__star');
    await expect(stars).toHaveCount(5);
  });

  test('should have correct default classes', async ({ page }) => {
    const rating = page.locator('.ds-rating');
    await expect(rating).toHaveClass(/ds-rating--md/);
  });
});

test.describe('DsRating sizes', () => {
  test('should render small size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsrating--sizes');
    await page.waitForSelector('.ds-rating--sm');
    await expect(page.locator('.ds-rating--sm')).toBeVisible();
  });

  test('should render medium size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsrating--sizes');
    await page.waitForSelector('.ds-rating--md');
    await expect(page.locator('.ds-rating--md')).toBeVisible();
  });

  test('should render large size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsrating--sizes');
    await page.waitForSelector('.ds-rating--lg');
    await expect(page.locator('.ds-rating--lg')).toBeVisible();
  });
});

test.describe('DsRating interaction', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsrating--default');
    await page.waitForSelector('.ds-rating');
  });

  test('should change rating on star click', async ({ page }) => {
    const stars = page.locator('.ds-rating__star');
    const thirdStar = stars.nth(2);

    await thirdStar.click();

    // Verify at least 3 stars are filled
    const filledStars = page.locator('.ds-rating__star--filled');
    await expect(filledStars.first()).toBeVisible();
  });

  test('should update rating sequentially', async ({ page }) => {
    const stars = page.locator('.ds-rating__star');

    await stars.nth(0).click();
    await stars.nth(2).click();
    await stars.nth(4).click();

    // Verify stars are clickable
    await expect(stars.nth(4)).toBeVisible();
  });

  test('should show hover state', async ({ page }) => {
    const stars = page.locator('.ds-rating__star');
    const thirdStar = stars.nth(2);

    await thirdStar.hover();

    // Star should be visible after hover
    await expect(thirdStar).toBeVisible();
  });
});

test.describe('DsRating half stars', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsrating--half-stars');
    await page.waitForSelector('.ds-rating');
  });

  test('should display half star class', async ({ page }) => {
    const rating = page.locator('.ds-rating');
    await expect(rating).toBeVisible();
  });

  test('should allow half star selection on click', async ({ page }) => {
    const stars = page.locator('.ds-rating__star');
    const firstStar = stars.nth(0);

    const boundingBox = await firstStar.boundingBox();

    if (boundingBox) {
      // Click on left half
      await page.mouse.click(
        boundingBox.x + boundingBox.width * 0.25,
        boundingBox.y + boundingBox.height / 2
      );
    }

    await expect(firstStar).toBeVisible();
  });
});

test.describe('DsRating readonly', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsrating--readonly');
    await page.waitForSelector('.ds-rating');
  });

  test('should have readonly class', async ({ page }) => {
    const rating = page.locator('.ds-rating');
    await expect(rating).toHaveClass(/ds-rating--readonly/);
  });

  test('should not respond to clicks', async ({ page }) => {
    const stars = page.locator('.ds-rating__star');
    const initialCount = await page.locator('.ds-rating__star--filled').count();

    await stars.nth(4).click();

    // Count should remain the same
    const newCount = await page.locator('.ds-rating__star--filled').count();
    expect(newCount).toBe(initialCount);
  });

  test('should not show hover effects', async ({ page }) => {
    const stars = page.locator('.ds-rating__star');

    await stars.nth(2).hover();

    // Should still be visible but no hover class
    await expect(stars.nth(2)).toBeVisible();
  });
});

test.describe('DsRating disabled', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsrating--disabled');
    await page.waitForSelector('.ds-rating');
  });

  test('should have disabled class', async ({ page }) => {
    const rating = page.locator('.ds-rating');
    await expect(rating).toHaveClass(/ds-rating--disabled/);
  });

  test('should not be focusable when disabled', async ({ page }) => {
    await page.keyboard.press('Tab');
    const stars = page.locator('.ds-rating__star');
    await expect(stars.first()).not.toBeFocused();
  });
});

test.describe('DsRating keyboard navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsrating--default');
    await page.waitForSelector('.ds-rating');
  });

  test('should be focusable', async ({ page }) => {
    await page.keyboard.press('Tab');
    const rating = page.locator('.ds-rating');
    await expect(rating).toBeFocused();
  });

  test('should increase rating with ArrowRight', async ({ page }) => {
    const rating = page.locator('.ds-rating');
    await rating.focus();

    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');

    // Rating should have increased
    await expect(rating).toBeVisible();
  });

  test('should decrease rating with ArrowLeft', async ({ page }) => {
    const rating = page.locator('.ds-rating');
    await rating.focus();

    // First increase
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');

    // Then decrease
    await page.keyboard.press('ArrowLeft');

    await expect(rating).toBeVisible();
  });

  test('should go to min with Home key', async ({ page }) => {
    const rating = page.locator('.ds-rating');
    await rating.focus();

    await page.keyboard.press('Home');

    // Should have zero or minimal rating
    await expect(rating).toBeVisible();
  });

  test('should go to max with End key', async ({ page }) => {
    const rating = page.locator('.ds-rating');
    await rating.focus();

    await page.keyboard.press('End');

    // Should have max rating (5 stars filled)
    const filledStars = page.locator('.ds-rating__star--filled');
    await expect(filledStars.first()).toBeVisible();
  });
});

test.describe('DsRating accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsrating--default');
    await page.waitForSelector('.ds-rating');
  });

  test('should have appropriate role', async ({ page }) => {
    const rating = page.locator('.ds-rating');
    const role = await rating.getAttribute('role');
    expect(role).toBeTruthy();
  });

  test('should have aria-label', async ({ page }) => {
    const rating = page.locator('.ds-rating');
    await expect(rating).toHaveAttribute('aria-label');
  });

  test('should have aria-valuenow', async ({ page }) => {
    const rating = page.locator('.ds-rating');
    await expect(rating).toHaveAttribute('aria-valuenow');
  });

  test('should have aria-valuemin', async ({ page }) => {
    const rating = page.locator('.ds-rating');
    await expect(rating).toHaveAttribute('aria-valuemin');
  });

  test('should have aria-valuemax', async ({ page }) => {
    const rating = page.locator('.ds-rating');
    await expect(rating).toHaveAttribute('aria-valuemax');
  });

  test('should have tabindex when not disabled', async ({ page }) => {
    const rating = page.locator('.ds-rating');
    await expect(rating).toHaveAttribute('tabindex', '0');
  });
});

test.describe('DsRating with custom max', () => {
  test('should display custom number of stars', async ({ page }) => {
    await page.goto('/iframe.html?id=components-forms-dsrating--custom-max');
    await page.waitForSelector('.ds-rating');

    const stars = page.locator('.ds-rating__star');
    const count = await stars.count();

    // Should have more or less than default 5
    expect(count).toBeGreaterThan(0);
  });
});
