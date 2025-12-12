import { test, expect } from '@playwright/test';

test.describe('DsPasswordStrength', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-password-strength--interactive');
    await page.waitForSelector('.ds-password-strength');
  });

  // ==========================================================================
  // RENDERING
  // ==========================================================================

  test('should render the component', async ({ page }) => {
    const component = page.locator('.ds-password-strength');
    await expect(component).toBeVisible();
  });

  test('should render 3 bars', async ({ page }) => {
    const bars = page.locator('.ds-password-strength__bar');
    await expect(bars).toHaveCount(3);
  });

  test('should have role="status"', async ({ page }) => {
    const component = page.locator('.ds-password-strength');
    await expect(component).toHaveAttribute('role', 'status');
  });

  // ==========================================================================
  // STRENGTH LEVELS
  // ==========================================================================

  test('should show "none" strength for empty password', async ({ page }) => {
    const input = page.locator('input[type="password"]');
    await input.clear();
    await page.waitForTimeout(300);

    const activeBars = page.locator('.ds-password-strength__bar--active');
    await expect(activeBars).toHaveCount(0);
  });

  test('should show "weak" strength for short password', async ({ page }) => {
    const input = page.locator('input[type="password"]');
    await input.fill('abc');
    await page.waitForTimeout(300);

    const activeBars = page.locator('.ds-password-strength__bar--active');
    await expect(activeBars).toHaveCount(1);

    const weakBar = page.locator('.ds-password-strength__bar--weak');
    await expect(weakBar).toBeVisible();
  });

  test('should show "weak" strength for only letters', async ({ page }) => {
    const input = page.locator('input[type="password"]');
    await input.fill('abcdefgh');
    await page.waitForTimeout(300);

    const activeBars = page.locator('.ds-password-strength__bar--active');
    await expect(activeBars).toHaveCount(1);
  });

  test('should show "medium" strength for letters and numbers', async ({ page }) => {
    const input = page.locator('input[type="password"]');
    await input.fill('Test1234');
    await page.waitForTimeout(300);

    const activeBars = page.locator('.ds-password-strength__bar--active');
    await expect(activeBars).toHaveCount(2);

    const mediumBar = page.locator('.ds-password-strength__bar--medium');
    await expect(mediumBar).toBeVisible();
  });

  test('should show "strong" strength for all criteria', async ({ page }) => {
    const input = page.locator('input[type="password"]');
    await input.fill('Test123!@#');
    await page.waitForTimeout(300);

    const activeBars = page.locator('.ds-password-strength__bar--active');
    await expect(activeBars).toHaveCount(3);

    const strongBar = page.locator('.ds-password-strength__bar--strong');
    await expect(strongBar).toBeVisible();
  });

  // ==========================================================================
  // LABEL
  // ==========================================================================

  test('should display "Faible" label for weak password', async ({ page }) => {
    const input = page.locator('input[type="password"]');
    await input.fill('abc');
    await page.waitForTimeout(300);

    const label = page.locator('.ds-password-strength__label');
    await expect(label).toContainText('Faible');
  });

  test('should display "Moyen" label for medium password', async ({ page }) => {
    const input = page.locator('input[type="password"]');
    await input.fill('Test1234');
    await page.waitForTimeout(300);

    const label = page.locator('.ds-password-strength__label');
    await expect(label).toContainText('Moyen');
  });

  test('should display "Fort" label for strong password', async ({ page }) => {
    const input = page.locator('input[type="password"]');
    await input.fill('Test123!@#');
    await page.waitForTimeout(300);

    const label = page.locator('.ds-password-strength__label');
    await expect(label).toContainText('Fort');
  });

  // ==========================================================================
  // CRITERIA
  // ==========================================================================

  test('should display 5 criteria items', async ({ page }) => {
    const criteria = page.locator('.ds-password-strength__criterion');
    await expect(criteria).toHaveCount(5);
  });

  test('should mark valid criteria with check icon', async ({ page }) => {
    const input = page.locator('input[type="password"]');
    await input.fill('Test123!@#');
    await page.waitForTimeout(300);

    const validCriteria = page.locator('.ds-password-strength__criterion--valid');
    await expect(validCriteria).toHaveCount(5);
  });

  test('should mark invalid criteria correctly', async ({ page }) => {
    const input = page.locator('input[type="password"]');
    await input.fill('test');
    await page.waitForTimeout(300);

    const validCriteria = page.locator('.ds-password-strength__criterion--valid');
    await expect(validCriteria).toHaveCount(1); // Only lowercase
  });

  // ==========================================================================
  // ACCESSIBILITY
  // ==========================================================================

  test('should have aria-label attribute', async ({ page }) => {
    const component = page.locator('.ds-password-strength');
    const ariaLabel = await component.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
  });

  test('should update aria-label on password change', async ({ page }) => {
    const component = page.locator('.ds-password-strength');
    const input = page.locator('input[type="password"]');

    await input.fill('Test123!@#');
    await page.waitForTimeout(300);

    const ariaLabel = await component.getAttribute('aria-label');
    expect(ariaLabel).toContain('Fort');
  });

  // ==========================================================================
  // VISUAL STATES
  // ==========================================================================

  test('should apply correct CSS class for weak strength', async ({ page }) => {
    const input = page.locator('input[type="password"]');
    await input.fill('abc');
    await page.waitForTimeout(300);

    const component = page.locator('.ds-password-strength--weak');
    await expect(component).toBeVisible();
  });

  test('should apply correct CSS class for medium strength', async ({ page }) => {
    const input = page.locator('input[type="password"]');
    await input.fill('Test1234');
    await page.waitForTimeout(300);

    const component = page.locator('.ds-password-strength--medium');
    await expect(component).toBeVisible();
  });

  test('should apply correct CSS class for strong strength', async ({ page }) => {
    const input = page.locator('input[type="password"]');
    await input.fill('Test123!@#');
    await page.waitForTimeout(300);

    const component = page.locator('.ds-password-strength--strong');
    await expect(component).toBeVisible();
  });

  // ==========================================================================
  // TRANSITIONS
  // ==========================================================================

  test('should transition from weak to medium', async ({ page }) => {
    const input = page.locator('input[type="password"]');

    // Start with weak
    await input.fill('abc');
    await page.waitForTimeout(300);
    let activeBars = page.locator('.ds-password-strength__bar--active');
    await expect(activeBars).toHaveCount(1);

    // Transition to medium
    await input.fill('Test1234');
    await page.waitForTimeout(300);
    activeBars = page.locator('.ds-password-strength__bar--active');
    await expect(activeBars).toHaveCount(2);
  });

  test('should transition from medium to strong', async ({ page }) => {
    const input = page.locator('input[type="password"]');

    // Start with medium
    await input.fill('Test1234');
    await page.waitForTimeout(300);
    let activeBars = page.locator('.ds-password-strength__bar--active');
    await expect(activeBars).toHaveCount(2);

    // Transition to strong
    await input.fill('Test123!@#');
    await page.waitForTimeout(300);
    activeBars = page.locator('.ds-password-strength__bar--active');
    await expect(activeBars).toHaveCount(3);
  });

  // ==========================================================================
  // CUSTOM MIN LENGTH
  // ==========================================================================

  test('should respect custom minimum length', async ({ page }) => {
    // Naviguer vers une story avec minLength personnalisé
    await page.goto('http://localhost:6006/iframe.html?id=components-password-strength--custom-min-length');
    await page.waitForSelector('.ds-password-strength');

    // Vérifier que "Test12" (6 chars) est valide avec minLength=6
    const criteria = page.locator('.ds-password-strength__criterion').first();
    await expect(criteria).toHaveClass(/ds-password-strength__criterion--valid/);
  });

  // ==========================================================================
  // KEYBOARD INTERACTION
  // ==========================================================================

  test('should update strength on keyboard input', async ({ page }) => {
    const input = page.locator('input[type="password"]');

    await input.focus();
    await page.keyboard.type('T');
    await page.waitForTimeout(100);
    await page.keyboard.type('e');
    await page.waitForTimeout(100);
    await page.keyboard.type('s');
    await page.waitForTimeout(100);
    await page.keyboard.type('t');
    await page.waitForTimeout(100);

    const activeBars = page.locator('.ds-password-strength__bar--active');
    await expect(activeBars).toHaveCount(1); // Weak (only letters)
  });

  // ==========================================================================
  // THEMING
  // ==========================================================================

  test('should display correctly in light theme', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-password-strength--themed');
    await page.waitForSelector('.theme-light .ds-password-strength');

    const component = page.locator('.theme-light .ds-password-strength');
    await expect(component).toBeVisible();
  });

  test('should display correctly in dark theme', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-password-strength--themed');
    await page.waitForSelector('.theme-dark .ds-password-strength');

    const component = page.locator('.theme-dark .ds-password-strength');
    await expect(component).toBeVisible();
  });

  test('should display correctly in custom theme', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-password-strength--themed');
    await page.waitForSelector('.theme-custom .ds-password-strength');

    const component = page.locator('.theme-custom .ds-password-strength');
    await expect(component).toBeVisible();
  });
});
