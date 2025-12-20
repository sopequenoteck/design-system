import { test, expect } from '@playwright/test';

/**
 * Tests e2e pour le composant ds-carousel
 *
 * Exécutés sur Showcase (/test/carousel)
 */

test.describe('DsCarousel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/carousel');
    await page.waitForLoadState('networkidle');
  });

  test('should render carousel component', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    await expect(section.locator('.ds-carousel')).toBeVisible();
  });

  test('should display first slide initially', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const firstSlide = section.locator('.ds-carousel__slide').first();
    await expect(firstSlide).toHaveClass(/ds-carousel__slide--active/);
  });

  test('should display slides container', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const container = section.locator('.ds-carousel__container');
    await expect(container).toBeVisible();
  });

  test('should display track', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const track = section.locator('.ds-carousel__track');
    await expect(track).toBeVisible();
  });

  test('should display all slides', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const slides = section.locator('.ds-carousel__slide');
    const count = await slides.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('DsCarousel navigation arrows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/carousel');
    await page.waitForLoadState('networkidle');
  });

  test('should display navigation arrows', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const prevArrow = section.locator('.ds-carousel__arrow--left');
    const nextArrow = section.locator('.ds-carousel__arrow--right');

    await expect(prevArrow).toBeVisible();
    await expect(nextArrow).toBeVisible();
  });

  test('should navigate to next slide on next button click', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const nextArrow = section.locator('.ds-carousel__arrow--right');
    await nextArrow.click();

    // Wait for transition
    await page.waitForTimeout(400);

    const secondSlide = section.locator('.ds-carousel__slide').nth(1);
    await expect(secondSlide).toHaveClass(/ds-carousel__slide--active/);
  });

  test('should navigate to previous slide on prev button click', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');

    // First go to second slide
    const nextArrow = section.locator('.ds-carousel__arrow--right');
    await nextArrow.click();
    await page.waitForTimeout(400);

    // Then go back
    const prevArrow = section.locator('.ds-carousel__arrow--left');
    await prevArrow.click();
    await page.waitForTimeout(400);

    const firstSlide = section.locator('.ds-carousel__slide').first();
    await expect(firstSlide).toHaveClass(/ds-carousel__slide--active/);
  });

  test('should hide arrows when single slide', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-single-slide"]');
    const arrows = section.locator('.ds-carousel__arrow');
    await expect(arrows).toHaveCount(0);
  });

  test('should not show arrows when arrows prop is false', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-no-arrows"]');
    const arrows = section.locator('.ds-carousel__arrow');
    await expect(arrows).toHaveCount(0);
  });
});

test.describe('DsCarousel navigation dots', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/carousel');
    await page.waitForLoadState('networkidle');
  });

  test('should display navigation dots', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const dots = section.locator('.ds-carousel__dots');
    await expect(dots).toBeVisible();
  });

  test('should display correct number of dots', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const slides = section.locator('.ds-carousel__slide');
    const slidesCount = await slides.count();

    const dots = section.locator('.ds-carousel__dot');
    const dotsCount = await dots.count();

    expect(dotsCount).toBe(slidesCount);
  });

  test('should highlight active dot', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const firstDot = section.locator('.ds-carousel__dot').first();
    await expect(firstDot).toHaveClass(/ds-carousel__dot--active/);
  });

  test('should navigate to slide on dot click', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const thirdDot = section.locator('.ds-carousel__dot').nth(2);
    await thirdDot.click();

    // Wait for transition
    await page.waitForTimeout(400);

    const thirdSlide = section.locator('.ds-carousel__slide').nth(2);
    await expect(thirdSlide).toHaveClass(/ds-carousel__slide--active/);
    await expect(thirdDot).toHaveClass(/ds-carousel__dot--active/);
  });

  test('should hide dots when single slide', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-single-slide"]');
    const dots = section.locator('.ds-carousel__dots');
    await expect(dots).toHaveCount(0);
  });

  test('should not show dots when dots prop is false', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-no-dots"]');
    const dots = section.locator('.ds-carousel__dots');
    await expect(dots).toHaveCount(0);
  });
});

test.describe('DsCarousel dots position', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/carousel');
    await page.waitForLoadState('networkidle');
  });

  test('should position dots at bottom by default', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const carousel = section.locator('.ds-carousel');
    await expect(carousel).toHaveClass(/ds-carousel--dots-bottom/);
  });

  test('should position dots at top', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-dots-top"]');
    const carousel = section.locator('.ds-carousel');
    await expect(carousel).toHaveClass(/ds-carousel--dots-top/);
  });

  test('should position dots at left', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-dots-left"]');
    const carousel = section.locator('.ds-carousel');
    await expect(carousel).toHaveClass(/ds-carousel--dots-left/);
  });

  test('should position dots at right', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-dots-right"]');
    const carousel = section.locator('.ds-carousel');
    await expect(carousel).toHaveClass(/ds-carousel--dots-right/);
  });
});

test.describe('DsCarousel autoplay', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/carousel');
    await page.waitForLoadState('networkidle');
  });

  test('should auto advance slides when autoplay is enabled', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-autoplay"]');
    const firstSlide = section.locator('.ds-carousel__slide').first();
    await expect(firstSlide).toHaveClass(/ds-carousel__slide--active/);

    // Wait for autoplay (2000ms + margin)
    await page.waitForTimeout(2500);

    const secondSlide = section.locator('.ds-carousel__slide').nth(1);
    await expect(secondSlide).toHaveClass(/ds-carousel__slide--active/);
  });

  test('should pause autoplay on hover', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-autoplay"]');
    const carousel = section.locator('.ds-carousel');
    await carousel.hover();

    const firstSlide = section.locator('.ds-carousel__slide').first();
    await expect(firstSlide).toHaveClass(/ds-carousel__slide--active/);

    // Wait longer than autoplay interval
    await page.waitForTimeout(3000);

    // Should still be on first slide
    await expect(firstSlide).toHaveClass(/ds-carousel__slide--active/);
  });

  test('should resume autoplay after mouse leave', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-autoplay"]');
    const carousel = section.locator('.ds-carousel');

    // Hover to pause
    await carousel.hover();
    await page.waitForTimeout(500);

    // Move away to resume
    await page.mouse.move(0, 0);
    await page.waitForTimeout(2500);

    const secondSlide = section.locator('.ds-carousel__slide').nth(1);
    await expect(secondSlide).toHaveClass(/ds-carousel__slide--active/);
  });

  test('should not pause on hover when pauseOnHover is false', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-autoplay-no-pause"]');
    const carousel = section.locator('.ds-carousel');
    await carousel.hover();

    // Wait for autoplay
    await page.waitForTimeout(2500);

    const secondSlide = section.locator('.ds-carousel__slide').nth(1);
    await expect(secondSlide).toHaveClass(/ds-carousel__slide--active/);
  });
});

test.describe('DsCarousel keyboard navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/carousel');
    await page.waitForLoadState('networkidle');
  });

  test('should be focusable', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const carousel = section.locator('.ds-carousel');
    await carousel.focus();
    await expect(carousel).toBeFocused();
  });

  test('should navigate to next slide with ArrowRight', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const carousel = section.locator('.ds-carousel');
    await carousel.focus();
    await page.keyboard.press('ArrowRight');

    // Wait for transition
    await page.waitForTimeout(400);

    const secondSlide = section.locator('.ds-carousel__slide').nth(1);
    await expect(secondSlide).toHaveClass(/ds-carousel__slide--active/);
  });

  test('should navigate to previous slide with ArrowLeft', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const carousel = section.locator('.ds-carousel');
    await carousel.focus();

    // Go to second slide first
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(400);

    // Go back
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(400);

    const firstSlide = section.locator('.ds-carousel__slide').first();
    await expect(firstSlide).toHaveClass(/ds-carousel__slide--active/);
  });

  test('should go to first slide with Home key', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const carousel = section.locator('.ds-carousel');
    await carousel.focus();

    // Navigate to third slide
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(400);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(400);

    // Press Home
    await page.keyboard.press('Home');
    await page.waitForTimeout(400);

    const firstSlide = section.locator('.ds-carousel__slide').first();
    await expect(firstSlide).toHaveClass(/ds-carousel__slide--active/);
  });

  test('should go to last slide with End key', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const carousel = section.locator('.ds-carousel');
    await carousel.focus();

    await page.keyboard.press('End');
    await page.waitForTimeout(400);

    const slides = section.locator('.ds-carousel__slide');
    const lastIndex = (await slides.count()) - 1;
    const lastSlide = slides.nth(lastIndex);
    await expect(lastSlide).toHaveClass(/ds-carousel__slide--active/);
  });
});

test.describe('DsCarousel infinite loop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/carousel');
    await page.waitForLoadState('networkidle');
  });

  test('should loop to first slide when reaching end (infinite mode)', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const carousel = section.locator('.ds-carousel');
    await carousel.focus();

    // Navigate to last slide
    await page.keyboard.press('End');
    await page.waitForTimeout(400);

    // Press next to loop
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(400);

    const firstSlide = section.locator('.ds-carousel__slide').first();
    await expect(firstSlide).toHaveClass(/ds-carousel__slide--active/);
  });

  test('should loop to last slide when going back from first (infinite mode)', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const carousel = section.locator('.ds-carousel');
    await carousel.focus();

    // Press prev from first slide
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(400);

    const slides = section.locator('.ds-carousel__slide');
    const lastIndex = (await slides.count()) - 1;
    const lastSlide = slides.nth(lastIndex);
    await expect(lastSlide).toHaveClass(/ds-carousel__slide--active/);
  });

  test('should not loop when infinite is false', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-non-infinite"]');
    const carousel = section.locator('.ds-carousel');
    await carousel.focus();

    // Try to go back from first slide
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(400);

    // Should still be on first slide
    const firstSlide = section.locator('.ds-carousel__slide').first();
    await expect(firstSlide).toHaveClass(/ds-carousel__slide--active/);
  });
});

test.describe('DsCarousel effects', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/carousel');
    await page.waitForLoadState('networkidle');
  });

  test('should have slide effect by default', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const carousel = section.locator('.ds-carousel');
    await expect(carousel).toHaveClass(/ds-carousel--slide/);
  });

  test('should apply fade effect', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-fade-effect"]');
    const carousel = section.locator('.ds-carousel');
    await expect(carousel).toHaveClass(/ds-carousel--fade/);

    const slides = section.locator('.ds-carousel__slide');
    const firstSlide = slides.first();
    await expect(firstSlide).toHaveClass(/ds-carousel__slide--fade/);
  });
});

test.describe('DsCarousel accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/carousel');
    await page.waitForLoadState('networkidle');
  });

  test('should have region role', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const carousel = section.locator('.ds-carousel');
    await expect(carousel).toHaveAttribute('role', 'region');
  });

  test('should have aria-roledescription', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const carousel = section.locator('.ds-carousel');
    await expect(carousel).toHaveAttribute('aria-roledescription', 'carousel');
  });

  test('should have aria-label', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const carousel = section.locator('.ds-carousel');
    await expect(carousel).toHaveAttribute('aria-label', /Carousel with \d+ slides/);
  });

  test('should have tabindex for keyboard navigation', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const carousel = section.locator('.ds-carousel');
    await expect(carousel).toHaveAttribute('tabindex', '0');
  });

  test('should have aria-label on navigation arrows', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const prevArrow = section.locator('.ds-carousel__arrow--left');
    const nextArrow = section.locator('.ds-carousel__arrow--right');

    await expect(prevArrow).toHaveAttribute('aria-label', 'Previous slide');
    await expect(nextArrow).toHaveAttribute('aria-label', 'Next slide');
  });

  test('should have list role on track', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const track = section.locator('.ds-carousel__track');
    await expect(track).toHaveAttribute('role', 'list');
  });

  test('should have listitem role on slides', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const firstSlide = section.locator('.ds-carousel__slide').first();
    await expect(firstSlide).toHaveAttribute('role', 'listitem');
  });

  test('should have aria-hidden on inactive slides', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const slides = section.locator('.ds-carousel__slide');
    const secondSlide = slides.nth(1);
    await expect(secondSlide).toHaveAttribute('aria-hidden', 'true');
  });

  test('should have aria-label on slides', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const slides = section.locator('.ds-carousel__slide');
    const count = await slides.count();
    const firstSlide = slides.first();
    await expect(firstSlide).toHaveAttribute('aria-label', `Slide 1 of ${count}`);
  });

  test('should have tablist role on dots container', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const dots = section.locator('.ds-carousel__dots');
    await expect(dots).toHaveAttribute('role', 'tablist');
  });

  test('should have tab role on dots', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const firstDot = section.locator('.ds-carousel__dot').first();
    await expect(firstDot).toHaveAttribute('role', 'tab');
  });

  test('should have aria-selected on active dot', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const firstDot = section.locator('.ds-carousel__dot').first();
    await expect(firstDot).toHaveAttribute('aria-selected', 'true');

    const secondDot = section.locator('.ds-carousel__dot').nth(1);
    await expect(secondDot).toHaveAttribute('aria-selected', 'false');
  });

  test('should have aria-label on dots', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const firstDot = section.locator('.ds-carousel__dot').first();
    await expect(firstDot).toHaveAttribute('aria-label', 'Go to slide 1');
  });

  test('should have aria-controls on dots', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const firstDot = section.locator('.ds-carousel__dot').first();
    await expect(firstDot).toHaveAttribute('aria-controls', 'carousel-slide-0');
  });

  test('should have alt text on images', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const image = section.locator('.ds-carousel__image').first();
    const alt = await image.getAttribute('alt');
    expect(alt).toBeTruthy();
    expect(alt?.length).toBeGreaterThan(0);
  });
});

test.describe('DsCarousel transitions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/carousel');
    await page.waitForLoadState('networkidle');
  });

  test('should add transitioning class during transition', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const carousel = section.locator('.ds-carousel');
    const nextArrow = section.locator('.ds-carousel__arrow--right');

    await nextArrow.click();

    // Should have transitioning class immediately after click
    await expect(carousel).toHaveClass(/ds-carousel--transitioning/);
  });

  test('should remove transitioning class after transition', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const carousel = section.locator('.ds-carousel');
    const nextArrow = section.locator('.ds-carousel__arrow--right');

    await nextArrow.click();

    // Wait for transition to complete
    await page.waitForTimeout(500);

    // Should not have transitioning class anymore
    const classes = await carousel.getAttribute('class');
    expect(classes).not.toContain('ds-carousel--transitioning');
  });
});

test.describe('DsCarousel minimal mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/carousel');
    await page.waitForLoadState('networkidle');
  });

  test('should not display arrows or dots in minimal mode', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-minimal"]');
    const arrows = section.locator('.ds-carousel__arrow');
    const dots = section.locator('.ds-carousel__dots');

    await expect(arrows).toHaveCount(0);
    await expect(dots).toHaveCount(0);
  });

  test('should still support keyboard navigation in minimal mode', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-minimal"]');
    const carousel = section.locator('.ds-carousel');
    await carousel.focus();

    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(400);

    const secondSlide = section.locator('.ds-carousel__slide').nth(1);
    await expect(secondSlide).toHaveClass(/ds-carousel__slide--active/);
  });
});

test.describe('DsCarousel images', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/carousel');
    await page.waitForLoadState('networkidle');
  });

  test('should display images', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const image = section.locator('.ds-carousel__image').first();
    await expect(image).toBeVisible();
  });

  test('should display only images without titles', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-images-only"]');
    const image = section.locator('.ds-carousel__image').first();
    await expect(image).toBeVisible();

    const title = section.locator('.ds-carousel__title');
    await expect(title).toHaveCount(0);
  });
});

test.describe('DsCarousel content', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/carousel');
    await page.waitForLoadState('networkidle');
  });

  test('should display slide title', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const title = section.locator('.ds-carousel__title').first();
    await expect(title).toBeVisible();
  });

  test('should display slide description', async ({ page }) => {
    const section = page.locator('[data-testid="carousel-default"]');
    const description = section.locator('.ds-carousel__description').first();
    await expect(description).toBeVisible();
  });
});
