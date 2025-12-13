import { test, expect } from '@playwright/test';

test.describe('DsCarousel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--default');
    await page.waitForSelector('.ds-carousel');
  });

  test('should render carousel component', async ({ page }) => {
    await expect(page.locator('.ds-carousel')).toBeVisible();
  });

  test('should display first slide initially', async ({ page }) => {
    const firstSlide = page.locator('.ds-carousel__slide').first();
    await expect(firstSlide).toHaveClass(/ds-carousel__slide--active/);
  });

  test('should display slides container', async ({ page }) => {
    const container = page.locator('.ds-carousel__container');
    await expect(container).toBeVisible();
  });

  test('should display track', async ({ page }) => {
    const track = page.locator('.ds-carousel__track');
    await expect(track).toBeVisible();
  });

  test('should display all slides', async ({ page }) => {
    const slides = page.locator('.ds-carousel__slide');
    const count = await slides.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('DsCarousel navigation arrows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--default');
    await page.waitForSelector('.ds-carousel');
  });

  test('should display navigation arrows', async ({ page }) => {
    const prevArrow = page.locator('.ds-carousel__arrow--left');
    const nextArrow = page.locator('.ds-carousel__arrow--right');

    await expect(prevArrow).toBeVisible();
    await expect(nextArrow).toBeVisible();
  });

  test('should navigate to next slide on next button click', async ({ page }) => {
    const nextArrow = page.locator('.ds-carousel__arrow--right');
    await nextArrow.click();

    // Wait for transition
    await page.waitForTimeout(400);

    const secondSlide = page.locator('.ds-carousel__slide').nth(1);
    await expect(secondSlide).toHaveClass(/ds-carousel__slide--active/);
  });

  test('should navigate to previous slide on prev button click', async ({ page }) => {
    // First go to second slide
    const nextArrow = page.locator('.ds-carousel__arrow--right');
    await nextArrow.click();
    await page.waitForTimeout(400);

    // Then go back
    const prevArrow = page.locator('.ds-carousel__arrow--left');
    await prevArrow.click();
    await page.waitForTimeout(400);

    const firstSlide = page.locator('.ds-carousel__slide').first();
    await expect(firstSlide).toHaveClass(/ds-carousel__slide--active/);
  });

  test('should hide arrows when single slide', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--single-slide');
    await page.waitForSelector('.ds-carousel');

    const arrows = page.locator('.ds-carousel__arrow');
    await expect(arrows).toHaveCount(0);
  });

  test('should not show arrows when arrows prop is false', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--no-arrows');
    await page.waitForSelector('.ds-carousel');

    const arrows = page.locator('.ds-carousel__arrow');
    await expect(arrows).toHaveCount(0);
  });
});

test.describe('DsCarousel navigation dots', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--default');
    await page.waitForSelector('.ds-carousel');
  });

  test('should display navigation dots', async ({ page }) => {
    const dots = page.locator('.ds-carousel__dots');
    await expect(dots).toBeVisible();
  });

  test('should display correct number of dots', async ({ page }) => {
    const slides = page.locator('.ds-carousel__slide');
    const slidesCount = await slides.count();

    const dots = page.locator('.ds-carousel__dot');
    const dotsCount = await dots.count();

    expect(dotsCount).toBe(slidesCount);
  });

  test('should highlight active dot', async ({ page }) => {
    const firstDot = page.locator('.ds-carousel__dot').first();
    await expect(firstDot).toHaveClass(/ds-carousel__dot--active/);
  });

  test('should navigate to slide on dot click', async ({ page }) => {
    const thirdDot = page.locator('.ds-carousel__dot').nth(2);
    await thirdDot.click();

    // Wait for transition
    await page.waitForTimeout(400);

    const thirdSlide = page.locator('.ds-carousel__slide').nth(2);
    await expect(thirdSlide).toHaveClass(/ds-carousel__slide--active/);
    await expect(thirdDot).toHaveClass(/ds-carousel__dot--active/);
  });

  test('should hide dots when single slide', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--single-slide');
    await page.waitForSelector('.ds-carousel');

    const dots = page.locator('.ds-carousel__dots');
    await expect(dots).toHaveCount(0);
  });

  test('should not show dots when dots prop is false', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--no-dots');
    await page.waitForSelector('.ds-carousel');

    const dots = page.locator('.ds-carousel__dots');
    await expect(dots).toHaveCount(0);
  });
});

test.describe('DsCarousel dots position', () => {
  test('should position dots at bottom by default', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--default');
    await page.waitForSelector('.ds-carousel');

    const carousel = page.locator('.ds-carousel');
    await expect(carousel).toHaveClass(/ds-carousel--dots-bottom/);
  });

  test('should position dots at top', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--dots-top');
    await page.waitForSelector('.ds-carousel');

    const carousel = page.locator('.ds-carousel');
    await expect(carousel).toHaveClass(/ds-carousel--dots-top/);
  });

  test('should position dots at left', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--dots-left');
    await page.waitForSelector('.ds-carousel');

    const carousel = page.locator('.ds-carousel');
    await expect(carousel).toHaveClass(/ds-carousel--dots-left/);
  });

  test('should position dots at right', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--dots-right');
    await page.waitForSelector('.ds-carousel');

    const carousel = page.locator('.ds-carousel');
    await expect(carousel).toHaveClass(/ds-carousel--dots-right/);
  });
});

test.describe('DsCarousel autoplay', () => {
  test('should auto advance slides when autoplay is enabled', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--autoplay');
    await page.waitForSelector('.ds-carousel');

    const firstSlide = page.locator('.ds-carousel__slide').first();
    await expect(firstSlide).toHaveClass(/ds-carousel__slide--active/);

    // Wait for autoplay (2000ms + margin)
    await page.waitForTimeout(2500);

    const secondSlide = page.locator('.ds-carousel__slide').nth(1);
    await expect(secondSlide).toHaveClass(/ds-carousel__slide--active/);
  });

  test('should pause autoplay on hover', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--autoplay');
    await page.waitForSelector('.ds-carousel');

    const carousel = page.locator('.ds-carousel');
    await carousel.hover();

    const firstSlide = page.locator('.ds-carousel__slide').first();
    await expect(firstSlide).toHaveClass(/ds-carousel__slide--active/);

    // Wait longer than autoplay interval
    await page.waitForTimeout(3000);

    // Should still be on first slide
    await expect(firstSlide).toHaveClass(/ds-carousel__slide--active/);
  });

  test('should resume autoplay after mouse leave', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--autoplay');
    await page.waitForSelector('.ds-carousel');

    const carousel = page.locator('.ds-carousel');

    // Hover to pause
    await carousel.hover();
    await page.waitForTimeout(500);

    // Move away to resume
    await page.mouse.move(0, 0);
    await page.waitForTimeout(2500);

    const secondSlide = page.locator('.ds-carousel__slide').nth(1);
    await expect(secondSlide).toHaveClass(/ds-carousel__slide--active/);
  });

  test('should not pause on hover when pauseOnHover is false', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--autoplay-no-pause');
    await page.waitForSelector('.ds-carousel');

    const carousel = page.locator('.ds-carousel');
    await carousel.hover();

    // Wait for autoplay
    await page.waitForTimeout(2500);

    const secondSlide = page.locator('.ds-carousel__slide').nth(1);
    await expect(secondSlide).toHaveClass(/ds-carousel__slide--active/);
  });
});

test.describe('DsCarousel keyboard navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--default');
    await page.waitForSelector('.ds-carousel');
  });

  test('should be focusable', async ({ page }) => {
    await page.keyboard.press('Tab');
    const carousel = page.locator('.ds-carousel');
    await expect(carousel).toBeFocused();
  });

  test('should navigate to next slide with ArrowRight', async ({ page }) => {
    const carousel = page.locator('.ds-carousel');
    await carousel.focus();
    await page.keyboard.press('ArrowRight');

    // Wait for transition
    await page.waitForTimeout(400);

    const secondSlide = page.locator('.ds-carousel__slide').nth(1);
    await expect(secondSlide).toHaveClass(/ds-carousel__slide--active/);
  });

  test('should navigate to previous slide with ArrowLeft', async ({ page }) => {
    const carousel = page.locator('.ds-carousel');
    await carousel.focus();

    // Go to second slide first
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(400);

    // Go back
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(400);

    const firstSlide = page.locator('.ds-carousel__slide').first();
    await expect(firstSlide).toHaveClass(/ds-carousel__slide--active/);
  });

  test('should go to first slide with Home key', async ({ page }) => {
    const carousel = page.locator('.ds-carousel');
    await carousel.focus();

    // Navigate to third slide
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(400);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(400);

    // Press Home
    await page.keyboard.press('Home');
    await page.waitForTimeout(400);

    const firstSlide = page.locator('.ds-carousel__slide').first();
    await expect(firstSlide).toHaveClass(/ds-carousel__slide--active/);
  });

  test('should go to last slide with End key', async ({ page }) => {
    const carousel = page.locator('.ds-carousel');
    await carousel.focus();

    await page.keyboard.press('End');
    await page.waitForTimeout(400);

    const slides = page.locator('.ds-carousel__slide');
    const lastIndex = await slides.count() - 1;
    const lastSlide = slides.nth(lastIndex);
    await expect(lastSlide).toHaveClass(/ds-carousel__slide--active/);
  });
});

test.describe('DsCarousel infinite loop', () => {
  test('should loop to first slide when reaching end (infinite mode)', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--default');
    await page.waitForSelector('.ds-carousel');

    const carousel = page.locator('.ds-carousel');
    await carousel.focus();

    // Navigate to last slide
    await page.keyboard.press('End');
    await page.waitForTimeout(400);

    // Press next to loop
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(400);

    const firstSlide = page.locator('.ds-carousel__slide').first();
    await expect(firstSlide).toHaveClass(/ds-carousel__slide--active/);
  });

  test('should loop to last slide when going back from first (infinite mode)', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--default');
    await page.waitForSelector('.ds-carousel');

    const carousel = page.locator('.ds-carousel');
    await carousel.focus();

    // Press prev from first slide
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(400);

    const slides = page.locator('.ds-carousel__slide');
    const lastIndex = await slides.count() - 1;
    const lastSlide = slides.nth(lastIndex);
    await expect(lastSlide).toHaveClass(/ds-carousel__slide--active/);
  });

  test('should not loop when infinite is false', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--non-infinite');
    await page.waitForSelector('.ds-carousel');

    const carousel = page.locator('.ds-carousel');
    await carousel.focus();

    // Try to go back from first slide
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(400);

    // Should still be on first slide
    const firstSlide = page.locator('.ds-carousel__slide').first();
    await expect(firstSlide).toHaveClass(/ds-carousel__slide--active/);
  });
});

test.describe('DsCarousel effects', () => {
  test('should have slide effect by default', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--default');
    await page.waitForSelector('.ds-carousel');

    const carousel = page.locator('.ds-carousel');
    await expect(carousel).toHaveClass(/ds-carousel--slide/);
  });

  test('should apply fade effect', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--fade-effect');
    await page.waitForSelector('.ds-carousel');

    const carousel = page.locator('.ds-carousel');
    await expect(carousel).toHaveClass(/ds-carousel--fade/);

    const slides = page.locator('.ds-carousel__slide');
    const firstSlide = slides.first();
    await expect(firstSlide).toHaveClass(/ds-carousel__slide--fade/);
  });
});

test.describe('DsCarousel accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--default');
    await page.waitForSelector('.ds-carousel');
  });

  test('should have region role', async ({ page }) => {
    const carousel = page.locator('.ds-carousel');
    await expect(carousel).toHaveAttribute('role', 'region');
  });

  test('should have aria-roledescription', async ({ page }) => {
    const carousel = page.locator('.ds-carousel');
    await expect(carousel).toHaveAttribute('aria-roledescription', 'carousel');
  });

  test('should have aria-label', async ({ page }) => {
    const carousel = page.locator('.ds-carousel');
    await expect(carousel).toHaveAttribute('aria-label', /Carousel with \d+ slides/);
  });

  test('should have tabindex for keyboard navigation', async ({ page }) => {
    const carousel = page.locator('.ds-carousel');
    await expect(carousel).toHaveAttribute('tabindex', '0');
  });

  test('should have aria-label on navigation arrows', async ({ page }) => {
    const prevArrow = page.locator('.ds-carousel__arrow--left');
    const nextArrow = page.locator('.ds-carousel__arrow--right');

    await expect(prevArrow).toHaveAttribute('aria-label', 'Previous slide');
    await expect(nextArrow).toHaveAttribute('aria-label', 'Next slide');
  });

  test('should have list role on track', async ({ page }) => {
    const track = page.locator('.ds-carousel__track');
    await expect(track).toHaveAttribute('role', 'list');
  });

  test('should have listitem role on slides', async ({ page }) => {
    const firstSlide = page.locator('.ds-carousel__slide').first();
    await expect(firstSlide).toHaveAttribute('role', 'listitem');
  });

  test('should have aria-hidden on inactive slides', async ({ page }) => {
    const slides = page.locator('.ds-carousel__slide');
    const secondSlide = slides.nth(1);
    await expect(secondSlide).toHaveAttribute('aria-hidden', 'true');
  });

  test('should have aria-label on slides', async ({ page }) => {
    const slides = page.locator('.ds-carousel__slide');
    const count = await slides.count();
    const firstSlide = slides.first();
    await expect(firstSlide).toHaveAttribute('aria-label', `Slide 1 of ${count}`);
  });

  test('should have tablist role on dots container', async ({ page }) => {
    const dots = page.locator('.ds-carousel__dots');
    await expect(dots).toHaveAttribute('role', 'tablist');
  });

  test('should have tab role on dots', async ({ page }) => {
    const firstDot = page.locator('.ds-carousel__dot').first();
    await expect(firstDot).toHaveAttribute('role', 'tab');
  });

  test('should have aria-selected on active dot', async ({ page }) => {
    const firstDot = page.locator('.ds-carousel__dot').first();
    await expect(firstDot).toHaveAttribute('aria-selected', 'true');

    const secondDot = page.locator('.ds-carousel__dot').nth(1);
    await expect(secondDot).toHaveAttribute('aria-selected', 'false');
  });

  test('should have aria-label on dots', async ({ page }) => {
    const firstDot = page.locator('.ds-carousel__dot').first();
    await expect(firstDot).toHaveAttribute('aria-label', 'Go to slide 1');
  });

  test('should have aria-controls on dots', async ({ page }) => {
    const firstDot = page.locator('.ds-carousel__dot').first();
    await expect(firstDot).toHaveAttribute('aria-controls', 'carousel-slide-0');
  });

  test('should have alt text on images', async ({ page }) => {
    const image = page.locator('.ds-carousel__image').first();
    const alt = await image.getAttribute('alt');
    expect(alt).toBeTruthy();
    expect(alt?.length).toBeGreaterThan(0);
  });
});

test.describe('DsCarousel transitions', () => {
  test('should add transitioning class during transition', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--default');
    await page.waitForSelector('.ds-carousel');

    const carousel = page.locator('.ds-carousel');
    const nextArrow = page.locator('.ds-carousel__arrow--right');

    await nextArrow.click();

    // Should have transitioning class immediately after click
    await expect(carousel).toHaveClass(/ds-carousel--transitioning/);
  });

  test('should remove transitioning class after transition', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--default');
    await page.waitForSelector('.ds-carousel');

    const carousel = page.locator('.ds-carousel');
    const nextArrow = page.locator('.ds-carousel__arrow--right');

    await nextArrow.click();

    // Wait for transition to complete
    await page.waitForTimeout(500);

    // Should not have transitioning class anymore
    const classes = await carousel.getAttribute('class');
    expect(classes).not.toContain('ds-carousel--transitioning');
  });
});

test.describe('DsCarousel minimal mode', () => {
  test('should not display arrows or dots in minimal mode', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--minimal');
    await page.waitForSelector('.ds-carousel');

    const arrows = page.locator('.ds-carousel__arrow');
    const dots = page.locator('.ds-carousel__dots');

    await expect(arrows).toHaveCount(0);
    await expect(dots).toHaveCount(0);
  });

  test('should still support keyboard navigation in minimal mode', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--minimal');
    await page.waitForSelector('.ds-carousel');

    const carousel = page.locator('.ds-carousel');
    await carousel.focus();

    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(400);

    const secondSlide = page.locator('.ds-carousel__slide').nth(1);
    await expect(secondSlide).toHaveClass(/ds-carousel__slide--active/);
  });
});

test.describe('DsCarousel images', () => {
  test('should display images', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--default');
    await page.waitForSelector('.ds-carousel');

    const image = page.locator('.ds-carousel__image').first();
    await expect(image).toBeVisible();
  });

  test('should display only images without titles', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--images-only');
    await page.waitForSelector('.ds-carousel');

    const image = page.locator('.ds-carousel__image').first();
    await expect(image).toBeVisible();

    const title = page.locator('.ds-carousel__title');
    await expect(title).toHaveCount(0);
  });
});

test.describe('DsCarousel content', () => {
  test('should display slide title', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--default');
    await page.waitForSelector('.ds-carousel');

    const title = page.locator('.ds-carousel__title').first();
    await expect(title).toBeVisible();
  });

  test('should display slide description', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--default');
    await page.waitForSelector('.ds-carousel');

    const description = page.locator('.ds-carousel__description').first();
    await expect(description).toBeVisible();
  });
});
