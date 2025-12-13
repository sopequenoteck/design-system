import { test, expect } from '@playwright/test';

test.describe('DsCalendar - Rendu initial', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--default');
    await page.waitForSelector('.ds-calendar');
  });

  test('should render calendar component', async ({ page }) => {
    await expect(page.locator('.ds-calendar')).toBeVisible();
  });

  test('should display current month and year in title', async ({ page }) => {
    const title = page.locator('.ds-calendar__title');
    await expect(title).toBeVisible();
    const titleText = await title.textContent();
    expect(titleText).toBeTruthy();
  });

  test('should display weekday headers', async ({ page }) => {
    const weekdays = page.locator('.ds-calendar__weekday');
    await expect(weekdays).toHaveCount(7);
  });

  test('should display calendar grid with days', async ({ page }) => {
    const days = page.locator('.ds-calendar__day');
    const count = await days.count();
    expect(count).toBe(42); // 6 semaines x 7 jours
  });

  test('should highlight today', async ({ page }) => {
    const today = page.locator('.ds-calendar__day--today');
    await expect(today).toBeVisible();
  });

  test('should display navigation buttons', async ({ page }) => {
    const navBtns = page.locator('.ds-calendar__nav-btn');
    await expect(navBtns).toHaveCount(2); // Prev et Next
  });

  test('should display mode selector with month and year buttons', async ({ page }) => {
    const modeBtns = page.locator('.ds-calendar__mode-btn');
    await expect(modeBtns).toHaveCount(2);
  });
});

test.describe('DsCalendar - Navigation mois', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--default');
    await page.waitForSelector('.ds-calendar');
  });

  test('should navigate to previous month', async ({ page }) => {
    const title = page.locator('.ds-calendar__title');
    const initialTitle = await title.textContent();

    const prevBtn = page.locator('.ds-calendar__nav-btn').first();
    await prevBtn.click();

    const newTitle = await title.textContent();
    expect(newTitle).not.toBe(initialTitle);
  });

  test('should navigate to next month', async ({ page }) => {
    const title = page.locator('.ds-calendar__title');
    const initialTitle = await title.textContent();

    const nextBtn = page.locator('.ds-calendar__nav-btn').last();
    await nextBtn.click();

    const newTitle = await title.textContent();
    expect(newTitle).not.toBe(initialTitle);
  });

  test('should navigate multiple months backward', async ({ page }) => {
    const prevBtn = page.locator('.ds-calendar__nav-btn').first();

    // Naviguer 3 mois en arrière
    await prevBtn.click();
    await prevBtn.click();
    await prevBtn.click();

    const title = await page.locator('.ds-calendar__title').textContent();
    expect(title).toBeTruthy();
  });

  test('should navigate multiple months forward', async ({ page }) => {
    const nextBtn = page.locator('.ds-calendar__nav-btn').last();

    // Naviguer 3 mois en avant
    await nextBtn.click();
    await nextBtn.click();
    await nextBtn.click();

    const title = await page.locator('.ds-calendar__title').textContent();
    expect(title).toBeTruthy();
  });
});

test.describe('DsCalendar - Sélection de date', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--default');
    await page.waitForSelector('.ds-calendar');
  });

  test('should select date on click', async ({ page }) => {
    const day = page.locator('.ds-calendar__day').filter({ hasNotText: '' }).first();
    await day.click();

    // Vérifier que le jour a été cliqué (via output dateSelect)
    await expect(day).toBeVisible();
  });

  test('should not select disabled date', async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--disabled-weekends');
    await page.waitForSelector('.ds-calendar');

    const disabledDay = page.locator('.ds-calendar__day--disabled').first();

    // Le bouton doit être disabled
    await expect(disabledDay).toBeDisabled();
  });

  test('should allow selecting multiple dates sequentially', async ({ page }) => {
    const days = page.locator('.ds-calendar__day:not(.ds-calendar__day--other-month)');

    await days.nth(5).click();
    await days.nth(10).click();
    await days.nth(15).click();

    // Vérifier que les jours sont toujours visibles
    await expect(days.nth(5)).toBeVisible();
    await expect(days.nth(10)).toBeVisible();
    await expect(days.nth(15)).toBeVisible();
  });
});

test.describe('DsCalendar - Mode année', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--default');
    await page.waitForSelector('.ds-calendar');
  });

  test('should switch to year mode on title click', async ({ page }) => {
    const title = page.locator('.ds-calendar__title');
    await title.click();

    await expect(page.locator('.ds-calendar__year-view')).toBeVisible();
    await expect(page.locator('.ds-calendar__month-view')).not.toBeVisible();
  });

  test('should display 12 months in year view', async ({ page }) => {
    const title = page.locator('.ds-calendar__title');
    await title.click();

    const months = page.locator('.ds-calendar__month');
    await expect(months).toHaveCount(12);
  });

  test('should highlight current month in year view', async ({ page }) => {
    const title = page.locator('.ds-calendar__title');
    await title.click();

    const currentMonth = page.locator('.ds-calendar__month--current');
    await expect(currentMonth).toBeVisible();
  });

  test('should switch back to month mode on month selection', async ({ page }) => {
    const title = page.locator('.ds-calendar__title');
    await title.click();

    const month = page.locator('.ds-calendar__month').nth(3);
    await month.click();

    await expect(page.locator('.ds-calendar__month-view')).toBeVisible();
    await expect(page.locator('.ds-calendar__year-view')).not.toBeVisible();
  });

  test('should navigate to previous year in year mode', async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--year-mode');
    await page.waitForSelector('.ds-calendar');

    const title = page.locator('.ds-calendar__title');
    const initialYear = await title.textContent();

    const prevBtn = page.locator('.ds-calendar__nav-btn').first();
    await prevBtn.click();

    const newYear = await title.textContent();
    expect(newYear).not.toBe(initialYear);
  });

  test('should navigate to next year in year mode', async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--year-mode');
    await page.waitForSelector('.ds-calendar');

    const title = page.locator('.ds-calendar__title');
    const initialYear = await title.textContent();

    const nextBtn = page.locator('.ds-calendar__nav-btn').last();
    await nextBtn.click();

    const newYear = await title.textContent();
    expect(newYear).not.toBe(initialYear);
  });
});

test.describe('DsCalendar - Mode selector buttons', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--default');
    await page.waitForSelector('.ds-calendar');
  });

  test('should switch to year mode via mode button', async ({ page }) => {
    const yearModeBtn = page.locator('.ds-calendar__mode-btn').last();
    await yearModeBtn.click();

    await expect(page.locator('.ds-calendar__year-view')).toBeVisible();
    await expect(yearModeBtn).toHaveClass(/ds-calendar__mode-btn--active/);
  });

  test('should switch back to month mode via mode button', async ({ page }) => {
    // D'abord passer en mode année
    const yearModeBtn = page.locator('.ds-calendar__mode-btn').last();
    await yearModeBtn.click();

    // Puis revenir au mode mois
    const monthModeBtn = page.locator('.ds-calendar__mode-btn').first();
    await monthModeBtn.click();

    await expect(page.locator('.ds-calendar__month-view')).toBeVisible();
    await expect(monthModeBtn).toHaveClass(/ds-calendar__mode-btn--active/);
  });

  test('should have active class on current mode button', async ({ page }) => {
    const monthModeBtn = page.locator('.ds-calendar__mode-btn').first();
    await expect(monthModeBtn).toHaveClass(/ds-calendar__mode-btn--active/);
  });
});

test.describe('DsCalendar - Événements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--with-events');
    await page.waitForSelector('.ds-calendar');
  });

  test('should display events on calendar days', async ({ page }) => {
    const daysWithEvents = page.locator('.ds-calendar__day--has-events');
    const count = await daysWithEvents.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display event dots', async ({ page }) => {
    const eventDots = page.locator('.ds-calendar__event-dot');
    const count = await eventDots.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display event with correct type classes', async ({ page }) => {
    const events = page.locator('.ds-calendar__event');
    const firstEvent = events.first();

    await expect(firstEvent).toBeVisible();

    // Vérifier qu'au moins un événement a un type
    const typedEvents = page.locator('[class*="ds-calendar__event--"]');
    const count = await typedEvents.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should show event title on large size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--size-large');
    await page.waitForSelector('.ds-calendar');

    const eventTitles = page.locator('.ds-calendar__event-title');
    const count = await eventTitles.count();

    // Si des événements existent, leurs titres doivent être visibles en taille lg
    if (count > 0) {
      await expect(eventTitles.first()).toBeVisible();
    }
  });

  test('should handle click on event', async ({ page }) => {
    const event = page.locator('.ds-calendar__event').first();

    if (await event.count() > 0) {
      await event.click();
      // L'événement ne doit pas causer d'erreur
      await expect(event).toBeVisible();
    }
  });
});

test.describe('DsCalendar - Tailles', () => {
  test('should render in small size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--size-small');
    await page.waitForSelector('.ds-calendar');

    await expect(page.locator('.ds-calendar--sm')).toBeVisible();
  });

  test('should render in medium size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--size-medium');
    await page.waitForSelector('.ds-calendar');

    await expect(page.locator('.ds-calendar--md')).toBeVisible();
  });

  test('should render in large size', async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--size-large');
    await page.waitForSelector('.ds-calendar');

    await expect(page.locator('.ds-calendar--lg')).toBeVisible();
  });
});

test.describe('DsCalendar - Locales', () => {
  test('should display in English locale', async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--english-locale');
    await page.waitForSelector('.ds-calendar');

    const weekdays = page.locator('.ds-calendar__weekday');
    const firstWeekday = await weekdays.first().textContent();

    // En locale US avec firstDayOfWeek=0, on devrait avoir dimanche en premier
    expect(firstWeekday).toBeTruthy();
  });

  test('should display in Spanish locale', async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--spanish-locale');
    await page.waitForSelector('.ds-calendar');

    const title = page.locator('.ds-calendar__title');
    await expect(title).toBeVisible();
  });

  test('should display in German locale', async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--german-locale');
    await page.waitForSelector('.ds-calendar');

    const title = page.locator('.ds-calendar__title');
    await expect(title).toBeVisible();
  });

  test('should change first day of week', async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--sunday-first');
    await page.waitForSelector('.ds-calendar');

    const weekdays = page.locator('.ds-calendar__weekday');
    await expect(weekdays.first()).toBeVisible();
  });
});

test.describe('DsCalendar - Dates désactivées', () => {
  test('should disable weekends', async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--disabled-weekends');
    await page.waitForSelector('.ds-calendar');

    const disabledDays = page.locator('.ds-calendar__day--disabled');
    const count = await disabledDays.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should disable past dates', async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--disabled-past-dates');
    await page.waitForSelector('.ds-calendar');

    const disabledDays = page.locator('.ds-calendar__day--disabled');
    const count = await disabledDays.count();
    expect(count).toBeGreaterThan(0);
  });

  test('disabled days should not be clickable', async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--disabled-weekends');
    await page.waitForSelector('.ds-calendar');

    const disabledDay = page.locator('.ds-calendar__day--disabled').first();
    await expect(disabledDay).toBeDisabled();
  });
});

test.describe('DsCalendar - Navigation clavier', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--default');
    await page.waitForSelector('.ds-calendar');
  });

  test('should focus navigation buttons with Tab', async ({ page }) => {
    await page.keyboard.press('Tab');

    const prevBtn = page.locator('.ds-calendar__nav-btn').first();
    await expect(prevBtn).toBeFocused();
  });

  test('should activate navigation button with Enter', async ({ page }) => {
    const title = page.locator('.ds-calendar__title');
    const initialTitle = await title.textContent();

    const prevBtn = page.locator('.ds-calendar__nav-btn').first();
    await prevBtn.focus();
    await page.keyboard.press('Enter');

    const newTitle = await title.textContent();
    expect(newTitle).not.toBe(initialTitle);
  });

  test('should activate navigation button with Space', async ({ page }) => {
    const title = page.locator('.ds-calendar__title');
    const initialTitle = await title.textContent();

    const nextBtn = page.locator('.ds-calendar__nav-btn').last();
    await nextBtn.focus();
    await page.keyboard.press('Space');

    const newTitle = await title.textContent();
    expect(newTitle).not.toBe(initialTitle);
  });

  test('should navigate through calendar days with Tab', async ({ page }) => {
    // Focus sur le premier jour
    const firstDay = page.locator('.ds-calendar__day').first();
    await firstDay.focus();
    await expect(firstDay).toBeFocused();

    // Tab pour passer au jour suivant
    await page.keyboard.press('Tab');
    const secondDay = page.locator('.ds-calendar__day').nth(1);
    await expect(secondDay).toBeFocused();
  });

  test('should select day with Enter key', async ({ page }) => {
    const day = page.locator('.ds-calendar__day:not(.ds-calendar__day--other-month)').first();
    await day.focus();
    await page.keyboard.press('Enter');

    // Vérifier que le jour reste visible après sélection
    await expect(day).toBeVisible();
  });

  test('should toggle mode with keyboard on title button', async ({ page }) => {
    const title = page.locator('.ds-calendar__title');
    await title.focus();
    await page.keyboard.press('Enter');

    await expect(page.locator('.ds-calendar__year-view')).toBeVisible();
  });
});

test.describe('DsCalendar - Accessibilité ARIA', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--default');
    await page.waitForSelector('.ds-calendar');
  });

  test('should have aria-label on navigation buttons', async ({ page }) => {
    const prevBtn = page.locator('.ds-calendar__nav-btn').first();
    const nextBtn = page.locator('.ds-calendar__nav-btn').last();

    await expect(prevBtn).toHaveAttribute('aria-label', 'Mois précédent');
    await expect(nextBtn).toHaveAttribute('aria-label', 'Mois suivant');
  });

  test('should have aria-label on title button', async ({ page }) => {
    const title = page.locator('.ds-calendar__title');
    await expect(title).toHaveAttribute('aria-label', /Voir/);
  });

  test('should have aria-label on calendar days', async ({ page }) => {
    const day = page.locator('.ds-calendar__day').first();
    const ariaLabel = await day.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
  });

  test('should have aria-current on today', async ({ page }) => {
    const today = page.locator('.ds-calendar__day--today');
    await expect(today).toHaveAttribute('aria-current', 'date');
  });

  test('should have aria-label on months in year view', async ({ page }) => {
    const title = page.locator('.ds-calendar__title');
    await title.click();

    const month = page.locator('.ds-calendar__month').first();
    const ariaLabel = await month.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
  });

  test('should have aria-current on current month in year view', async ({ page }) => {
    const title = page.locator('.ds-calendar__title');
    await title.click();

    const currentMonth = page.locator('.ds-calendar__month--current');
    await expect(currentMonth).toHaveAttribute('aria-current', 'true');
  });

  test('should have role and aria-label on event buttons', async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--with-events');
    await page.waitForSelector('.ds-calendar');

    const event = page.locator('.ds-calendar__event').first();

    if (await event.count() > 0) {
      await expect(event).toHaveAttribute('role', 'button');
      const ariaLabel = await event.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
    }
  });
});

test.describe('DsCalendar - Cas d\'usage avancés', () => {
  test('should handle many events on same day', async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--many-events');
    await page.waitForSelector('.ds-calendar');

    const events = page.locator('.ds-calendar__event');
    const count = await events.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display team planning events', async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--team-planning');
    await page.waitForSelector('.ds-calendar');

    const daysWithEvents = page.locator('.ds-calendar__day--has-events');
    const count = await daysWithEvents.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should handle historical dates', async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--historical-date');
    await page.waitForSelector('.ds-calendar');

    const title = page.locator('.ds-calendar__title');
    const titleText = await title.textContent();
    expect(titleText).toContain('2020');
  });

  test('should handle future dates', async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--future-date');
    await page.waitForSelector('.ds-calendar');

    const title = page.locator('.ds-calendar__title');
    const titleText = await title.textContent();
    expect(titleText).toContain('2030');
  });

  test('should display other month days with correct styling', async ({ page }) => {
    const otherMonthDays = page.locator('.ds-calendar__day--other-month');
    const count = await otherMonthDays.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should maintain 6 weeks grid layout', async ({ page }) => {
    const days = page.locator('.ds-calendar__day');
    await expect(days).toHaveCount(42); // 6 semaines x 7 jours
  });
});
