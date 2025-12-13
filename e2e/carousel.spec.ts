import { test, expect } from '@playwright/test';

test.describe('DsCarousel - Rendu initial', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--default');
    await page.waitForSelector('.ds-carousel');
  });

  test('should render carousel component', async ({ page }) => {
    await expect(page.locator('.ds-carousel')).toBeVisible();
  });

  test('should display slides container', async ({ page }) => {
    const slidesContainer = page.locator('.ds-carousel__slides');
    await expect(slidesContainer).toBeVisible();
  });

  test('should display active slide', async ({ page }) => {
    const activeSlide = page.locator('.ds-carousel__slide--active');
    await expect(activeSlide).toBeVisible();
  });

  test('should have correct number of slides', async ({ page }) => {
    const slides = page.locator('.ds-carousel__slide');
    await expect(slides).toHaveCount(4);
  });

  test('should display navigation arrows', async ({ page }) => {
    const prevArrow = page.locator('.ds-carousel__arrow--prev');
    const nextArrow = page.locator('.ds-carousel__arrow--next');

    await expect(prevArrow).toBeVisible();
    await expect(nextArrow).toBeVisible();
  });

  test('should display navigation dots', async ({ page }) => {
    const dots = page.locator('.ds-carousel__dots');
    await expect(dots).toBeVisible();
  });

  test('should have correct number of dots', async ({ page }) => {
    const dots = page.locator('.ds-carousel__dot');
    await expect(dots).toHaveCount(4);
  });

  test('should highlight active dot', async ({ page }) => {
    const activeDot = page.locator('.ds-carousel__dot--active');
    await expect(activeDot).toBeVisible();
  });
});

test.describe('DsCarousel - Navigation prev/next', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--default');
    await page.waitForSelector('.ds-carousel');
  });

  test('should navigate to next slide on next arrow click', async ({ page }) => {
    const nextArrow = page.locator('.ds-carousel__arrow--next');
    await nextArrow.click();

    // Attendre la transition
    await page.waitForTimeout(500);

    const activeDot = page.locator('.ds-carousel__dot--active');
    const dotIndex = await activeDot.getAttribute('data-index');
    expect(dotIndex).toBe('1');
  });

  test('should navigate to previous slide on prev arrow click', async ({ page }) => {
    // D'abord aller à la slide 2
    const nextArrow = page.locator('.ds-carousel__arrow--next');
    await nextArrow.click();
    await page.waitForTimeout(500);

    // Puis revenir à la slide 1
    const prevArrow = page.locator('.ds-carousel__arrow--prev');
    await prevArrow.click();
    await page.waitForTimeout(500);

    const activeDot = page.locator('.ds-carousel__dot--active');
    const dotIndex = await activeDot.getAttribute('data-index');
    expect(dotIndex).toBe('0');
  });

  test('should navigate multiple slides forward', async ({ page }) => {
    const nextArrow = page.locator('.ds-carousel__arrow--next');

    await nextArrow.click();
    await page.waitForTimeout(500);
    await nextArrow.click();
    await page.waitForTimeout(500);
    await nextArrow.click();
    await page.waitForTimeout(500);

    const activeDot = page.locator('.ds-carousel__dot--active');
    const dotIndex = await activeDot.getAttribute('data-index');
    expect(dotIndex).toBe('3');
  });

  test('should loop to first slide in infinite mode', async ({ page }) => {
    const nextArrow = page.locator('.ds-carousel__arrow--next');

    // Naviguer jusqu'à la dernière slide (index 3)
    for (let i = 0; i < 4; i++) {
      await nextArrow.click();
      await page.waitForTimeout(500);
    }

    // Devrait être revenu à la première slide (index 0)
    const activeDot = page.locator('.ds-carousel__dot--active');
    const dotIndex = await activeDot.getAttribute('data-index');
    expect(dotIndex).toBe('0');
  });

  test('should loop to last slide when clicking prev on first slide', async ({ page }) => {
    const prevArrow = page.locator('.ds-carousel__arrow--prev');
    await prevArrow.click();
    await page.waitForTimeout(500);

    const activeDot = page.locator('.ds-carousel__dot--active');
    const dotIndex = await activeDot.getAttribute('data-index');
    expect(dotIndex).toBe('3');
  });
});

test.describe('DsCarousel - Navigation via indicateurs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--default');
    await page.waitForSelector('.ds-carousel');
  });

  test('should navigate to specific slide on dot click', async ({ page }) => {
    const dots = page.locator('.ds-carousel__dot');
    await dots.nth(2).click();
    await page.waitForTimeout(500);

    const activeDot = page.locator('.ds-carousel__dot--active');
    const dotIndex = await activeDot.getAttribute('data-index');
    expect(dotIndex).toBe('2');
  });

  test('should update active dot on navigation', async ({ page }) => {
    const nextArrow = page.locator('.ds-carousel__arrow--next');
    await nextArrow.click();
    await page.waitForTimeout(500);

    const dots = page.locator('.ds-carousel__dot');
    await expect(dots.nth(1)).toHaveClass(/ds-carousel__dot--active/);
  });

  test('should navigate to first slide on first dot click', async ({ page }) => {
    const dots = page.locator('.ds-carousel__dot');

    // D'abord aller à la slide 2
    await dots.nth(2).click();
    await page.waitForTimeout(500);

    // Puis revenir à la slide 0
    await dots.nth(0).click();
    await page.waitForTimeout(500);

    const activeDot = page.locator('.ds-carousel__dot--active');
    const dotIndex = await activeDot.getAttribute('data-index');
    expect(dotIndex).toBe('0');
  });

  test('should navigate to last slide on last dot click', async ({ page }) => {
    const dots = page.locator('.ds-carousel__dot');
    await dots.nth(3).click();
    await page.waitForTimeout(500);

    const activeDot = page.locator('.ds-carousel__dot--active');
    const dotIndex = await activeDot.getAttribute('data-index');
    expect(dotIndex).toBe('3');
  });
});

test.describe('DsCarousel - Autoplay', () => {
  test('should auto-advance slides when autoplay enabled', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--autoplay');
    await page.waitForSelector('.ds-carousel');

    // Attendre que l'autoplay change de slide (2s + marge)
    await page.waitForTimeout(2500);

    const activeDot = page.locator('.ds-carousel__dot--active');
    const dotIndex = await activeDot.getAttribute('data-index');

    // Devrait être passé à la slide suivante
    expect(dotIndex).not.toBe('0');
  });

  test('should pause autoplay on hover when pauseOnHover enabled', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--autoplay');
    await page.waitForSelector('.ds-carousel');

    const carousel = page.locator('.ds-carousel');

    // Hover sur le carousel
    await carousel.hover();

    // Attendre 3 secondes (plus que autoplaySpeed)
    await page.waitForTimeout(3000);

    // La slide devrait toujours être la première (pause activé)
    const activeDot = page.locator('.ds-carousel__dot--active');
    const dotIndex = await activeDot.getAttribute('data-index');
    expect(dotIndex).toBe('0');
  });

  test('should not pause autoplay on hover when pauseOnHover disabled', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--autoplay-no-pause');
    await page.waitForSelector('.ds-carousel');

    const carousel = page.locator('.ds-carousel');

    // Hover sur le carousel
    await carousel.hover();

    // Attendre que l'autoplay change de slide (2s + marge)
    await page.waitForTimeout(2500);

    const activeDot = page.locator('.ds-carousel__dot--active');
    const dotIndex = await activeDot.getAttribute('data-index');

    // Devrait avoir changé malgré le hover
    expect(dotIndex).not.toBe('0');
  });
});

test.describe('DsCarousel - Navigation clavier', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--default');
    await page.waitForSelector('.ds-carousel');
  });

  test('should navigate to next slide with ArrowRight', async ({ page }) => {
    const carousel = page.locator('.ds-carousel');
    await carousel.focus();
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(500);

    const activeDot = page.locator('.ds-carousel__dot--active');
    const dotIndex = await activeDot.getAttribute('data-index');
    expect(dotIndex).toBe('1');
  });

  test('should navigate to previous slide with ArrowLeft', async ({ page }) => {
    const carousel = page.locator('.ds-carousel');
    await carousel.focus();

    // D'abord aller à la slide 2
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(500);

    // Puis revenir
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(500);

    const activeDot = page.locator('.ds-carousel__dot--active');
    const dotIndex = await activeDot.getAttribute('data-index');
    expect(dotIndex).toBe('0');
  });

  test('should focus navigation arrows with Tab', async ({ page }) => {
    await page.keyboard.press('Tab');

    const prevArrow = page.locator('.ds-carousel__arrow--prev');
    await expect(prevArrow).toBeFocused();
  });

  test('should activate arrow button with Enter', async ({ page }) => {
    const nextArrow = page.locator('.ds-carousel__arrow--next');
    await nextArrow.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);

    const activeDot = page.locator('.ds-carousel__dot--active');
    const dotIndex = await activeDot.getAttribute('data-index');
    expect(dotIndex).toBe('1');
  });

  test('should activate arrow button with Space', async ({ page }) => {
    const nextArrow = page.locator('.ds-carousel__arrow--next');
    await nextArrow.focus();
    await page.keyboard.press('Space');
    await page.waitForTimeout(500);

    const activeDot = page.locator('.ds-carousel__dot--active');
    const dotIndex = await activeDot.getAttribute('data-index');
    expect(dotIndex).toBe('1');
  });
});

test.describe('DsCarousel - Variantes', () => {
  test('should render without arrows', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--no-arrows');
    await page.waitForSelector('.ds-carousel');

    const arrows = page.locator('.ds-carousel__arrow');
    await expect(arrows).toHaveCount(0);
  });

  test('should render without dots', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--no-dots');
    await page.waitForSelector('.ds-carousel');

    const dots = page.locator('.ds-carousel__dots');
    await expect(dots).not.toBeVisible();
  });

  test('should render minimal carousel (no arrows, no dots)', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--minimal');
    await page.waitForSelector('.ds-carousel');

    const arrows = page.locator('.ds-carousel__arrow');
    const dots = page.locator('.ds-carousel__dots');

    await expect(arrows).toHaveCount(0);
    await expect(dots).not.toBeVisible();
  });

  test('should position dots at top', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--dots-top');
    await page.waitForSelector('.ds-carousel');

    const dots = page.locator('.ds-carousel__dots');
    await expect(dots).toHaveClass(/ds-carousel__dots--top/);
  });

  test('should position dots at left', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--dots-left');
    await page.waitForSelector('.ds-carousel');

    const dots = page.locator('.ds-carousel__dots');
    await expect(dots).toHaveClass(/ds-carousel__dots--left/);
  });

  test('should position dots at right', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--dots-right');
    await page.waitForSelector('.ds-carousel');

    const dots = page.locator('.ds-carousel__dots');
    await expect(dots).toHaveClass(/ds-carousel__dots--right/);
  });

  test('should apply fade effect', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--fade-effect');
    await page.waitForSelector('.ds-carousel');

    const carousel = page.locator('.ds-carousel');
    await expect(carousel).toHaveClass(/ds-carousel--fade/);
  });
});

test.describe('DsCarousel - Mode non-infini', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--non-infinite');
    await page.waitForSelector('.ds-carousel');
  });

  test('should disable prev arrow on first slide', async ({ page }) => {
    const prevArrow = page.locator('.ds-carousel__arrow--prev');
    await expect(prevArrow).toBeDisabled();
  });

  test('should disable next arrow on last slide', async ({ page }) => {
    const nextArrow = page.locator('.ds-carousel__arrow--next');

    // Naviguer jusqu'à la dernière slide
    for (let i = 0; i < 3; i++) {
      await nextArrow.click();
      await page.waitForTimeout(500);
    }

    await expect(nextArrow).toBeDisabled();
  });

  test('should not loop to first slide when on last slide', async ({ page }) => {
    const dots = page.locator('.ds-carousel__dot');

    // Aller à la dernière slide
    await dots.nth(3).click();
    await page.waitForTimeout(500);

    const nextArrow = page.locator('.ds-carousel__arrow--next');
    await expect(nextArrow).toBeDisabled();
  });
});

test.describe('DsCarousel - Slide unique', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--single-slide');
    await page.waitForSelector('.ds-carousel');
  });

  test('should render carousel with single slide', async ({ page }) => {
    const slides = page.locator('.ds-carousel__slide');
    await expect(slides).toHaveCount(1);
  });

  test('should hide arrows with single slide', async ({ page }) => {
    const arrows = page.locator('.ds-carousel__arrow');
    await expect(arrows).toHaveCount(0);
  });

  test('should hide dots with single slide', async ({ page }) => {
    const dots = page.locator('.ds-carousel__dots');
    await expect(dots).not.toBeVisible();
  });
});

test.describe('DsCarousel - Contenu slides', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--default');
    await page.waitForSelector('.ds-carousel');
  });

  test('should display slide image', async ({ page }) => {
    const image = page.locator('.ds-carousel__slide--active img');
    await expect(image).toBeVisible();
  });

  test('should display slide title', async ({ page }) => {
    const title = page.locator('.ds-carousel__slide--active .ds-carousel__title');
    await expect(title).toBeVisible();
    await expect(title).toContainText('Beautiful Mountains');
  });

  test('should display slide description', async ({ page }) => {
    const description = page.locator('.ds-carousel__slide--active .ds-carousel__description');
    await expect(description).toBeVisible();
  });

  test('should render images only without titles', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--images-only');
    await page.waitForSelector('.ds-carousel');

    const image = page.locator('.ds-carousel__slide--active img');
    await expect(image).toBeVisible();

    const title = page.locator('.ds-carousel__slide--active .ds-carousel__title');
    await expect(title).not.toBeVisible();
  });
});

test.describe('DsCarousel - Accessibilité ARIA', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--default');
    await page.waitForSelector('.ds-carousel');
  });

  test('should have role region on carousel', async ({ page }) => {
    const carousel = page.locator('.ds-carousel');
    await expect(carousel).toHaveAttribute('role', 'region');
  });

  test('should have aria-roledescription carousel', async ({ page }) => {
    const carousel = page.locator('.ds-carousel');
    await expect(carousel).toHaveAttribute('aria-roledescription', 'carousel');
  });

  test('should have aria-label on prev arrow', async ({ page }) => {
    const prevArrow = page.locator('.ds-carousel__arrow--prev');
    await expect(prevArrow).toHaveAttribute('aria-label', 'Diapositive précédente');
  });

  test('should have aria-label on next arrow', async ({ page }) => {
    const nextArrow = page.locator('.ds-carousel__arrow--next');
    await expect(nextArrow).toHaveAttribute('aria-label', 'Diapositive suivante');
  });

  test('should have aria-label on dots', async ({ page }) => {
    const dot = page.locator('.ds-carousel__dot').first();
    const ariaLabel = await dot.getAttribute('aria-label');
    expect(ariaLabel).toContain('diapositive');
  });

  test('should have aria-current on active dot', async ({ page }) => {
    const activeDot = page.locator('.ds-carousel__dot--active');
    await expect(activeDot).toHaveAttribute('aria-current', 'true');
  });

  test('should have alt text on images', async ({ page }) => {
    const image = page.locator('.ds-carousel__slide--active img');
    const alt = await image.getAttribute('alt');
    expect(alt).toBeTruthy();
  });

  test('should have aria-live on slides container', async ({ page }) => {
    const slidesContainer = page.locator('.ds-carousel__slides');
    await expect(slidesContainer).toHaveAttribute('aria-live', 'polite');
  });
});

test.describe('DsCarousel - Slides multiples', () => {
  test('should render carousel with many slides', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--many-slides');
    await page.waitForSelector('.ds-carousel');

    const slides = page.locator('.ds-carousel__slide');
    await expect(slides).toHaveCount(7);
  });

  test('should render correct number of dots for many slides', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--many-slides');
    await page.waitForSelector('.ds-carousel');

    const dots = page.locator('.ds-carousel__dot');
    await expect(dots).toHaveCount(7);
  });

  test('should navigate through all slides', async ({ page }) => {
    await page.goto('/iframe.html?id=components-carousel--many-slides');
    await page.waitForSelector('.ds-carousel');

    const nextArrow = page.locator('.ds-carousel__arrow--next');

    // Naviguer à travers toutes les slides
    for (let i = 0; i < 7; i++) {
      await nextArrow.click();
      await page.waitForTimeout(500);
    }

    // Devrait être revenu au début (infinite mode)
    const activeDot = page.locator('.ds-carousel__dot--active');
    const dotIndex = await activeDot.getAttribute('data-index');
    expect(dotIndex).toBe('0');
  });
});
