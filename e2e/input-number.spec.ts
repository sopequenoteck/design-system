import { test, expect } from '@playwright/test';

const STORYBOOK_URL = 'http://localhost:6006';

test.describe('DsInputNumber', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-dsinputnumber--default&viewMode=story`);
    await page.waitForSelector('ds-input-number');
  });

  // === RENDERING ===

  test('should render input number component', async ({ page }) => {
    const component = page.locator('ds-input-number');
    await expect(component).toBeVisible();
  });

  test('should render input element', async ({ page }) => {
    const input = page.locator('ds-input-number input');
    await expect(input).toBeVisible();
  });

  test('should render increment and decrement buttons', async ({ page }) => {
    const incrementBtn = page.locator('.ds-input-number__btn--increment');
    const decrementBtn = page.locator('.ds-input-number__btn--decrement');

    await expect(incrementBtn).toBeVisible();
    await expect(decrementBtn).toBeVisible();
  });

  // === INCREMENT / DECREMENT ===

  test('should increment value on increment button click', async ({ page }) => {
    const input = page.locator('ds-input-number input');
    const incrementBtn = page.locator('.ds-input-number__btn--increment');

    // Définir valeur initiale
    await input.fill('5');
    await incrementBtn.click();

    // Vérifier que la valeur est incrémentée
    await expect(input).toHaveValue('6');
  });

  test('should decrement value on decrement button click', async ({ page }) => {
    const input = page.locator('ds-input-number input');
    const decrementBtn = page.locator('.ds-input-number__btn--decrement');

    await input.fill('5');
    await decrementBtn.click();

    await expect(input).toHaveValue('4');
  });

  test('should respect max value', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-dsinputnumber--with-min-max&viewMode=story`);
    await page.waitForSelector('ds-input-number');

    const input = page.locator('ds-input-number input');
    const incrementBtn = page.locator('.ds-input-number__btn--increment');

    // Atteindre la valeur maximale
    await input.fill('50');

    // Vérifier que le bouton est désactivé
    await expect(incrementBtn).toBeDisabled();
  });

  test('should respect min value', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-dsinputnumber--with-min-max&viewMode=story`);
    await page.waitForSelector('ds-input-number');

    const input = page.locator('ds-input-number input');
    const decrementBtn = page.locator('.ds-input-number__btn--decrement');

    // Atteindre la valeur minimale
    await input.fill('10');

    // Vérifier que le bouton est désactivé
    await expect(decrementBtn).toBeDisabled();
  });

  // === KEYBOARD NAVIGATION ===

  test('should increment on ArrowUp key', async ({ page }) => {
    const input = page.locator('ds-input-number input');

    await input.fill('5');
    await input.focus();
    await input.press('ArrowUp');

    await expect(input).toHaveValue('6');
  });

  test('should decrement on ArrowDown key', async ({ page }) => {
    const input = page.locator('ds-input-number input');

    await input.fill('5');
    await input.focus();
    await input.press('ArrowDown');

    await expect(input).toHaveValue('4');
  });

  test('should set to min on Home key', async ({ page }) => {
    const input = page.locator('ds-input-number input');

    await input.fill('50');
    await input.focus();
    await input.press('Home');

    await expect(input).toHaveValue('0');
  });

  test('should set to max on End key', async ({ page }) => {
    const input = page.locator('ds-input-number input');

    await input.fill('50');
    await input.focus();
    await input.press('End');

    await expect(input).toHaveValue('100');
  });

  // === SIZES ===

  test('should render small size', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-dsinputnumber--sizes&viewMode=story`);
    await page.waitForSelector('ds-input-number');

    const smallInput = page.locator('ds-input-number').first();
    await expect(smallInput).toHaveClass(/ds-input-number--sm/);
  });

  test('should render medium size', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-dsinputnumber--sizes&viewMode=story`);
    await page.waitForSelector('ds-input-number');

    const mediumInput = page.locator('ds-input-number').nth(1);
    await expect(mediumInput).toHaveClass(/ds-input-number--md/);
  });

  test('should render large size', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-dsinputnumber--sizes&viewMode=story`);
    await page.waitForSelector('ds-input-number');

    const largeInput = page.locator('ds-input-number').nth(2);
    await expect(largeInput).toHaveClass(/ds-input-number--lg/);
  });

  // === PREFIX / SUFFIX ===

  test('should display prefix', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-dsinputnumber--with-prefix-suffix&viewMode=story`);
    await page.waitForSelector('ds-input-number');

    const prefix = page.locator('.ds-input-number__prefix').first();
    await expect(prefix).toBeVisible();
    await expect(prefix).toHaveText('$');
  });

  test('should display suffix', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-dsinputnumber--with-prefix-suffix&viewMode=story`);
    await page.waitForSelector('ds-input-number');

    const suffix = page.locator('.ds-input-number__suffix').first();
    await expect(suffix).toBeVisible();
    await expect(suffix).toHaveText('kg');
  });

  test('should display both prefix and suffix', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-dsinputnumber--with-prefix-suffix&viewMode=story`);
    await page.waitForSelector('ds-input-number');

    const component = page.locator('ds-input-number').nth(3);
    const prefix = component.locator('.ds-input-number__prefix');
    const suffix = component.locator('.ds-input-number__suffix');

    await expect(prefix).toHaveText('€');
    await expect(suffix).toHaveText('EUR');
  });

  // === DISABLED STATE ===

  test('should disable input when disabled', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-dsinputnumber--disabled&viewMode=story`);
    await page.waitForSelector('ds-input-number');

    const input = page.locator('ds-input-number input');
    await expect(input).toBeDisabled();
  });

  test('should disable buttons when disabled', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-dsinputnumber--disabled&viewMode=story`);
    await page.waitForSelector('ds-input-number');

    const incrementBtn = page.locator('.ds-input-number__btn--increment');
    const decrementBtn = page.locator('.ds-input-number__btn--decrement');

    await expect(incrementBtn).toBeDisabled();
    await expect(decrementBtn).toBeDisabled();
  });

  test('should apply disabled class', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-dsinputnumber--disabled&viewMode=story`);
    await page.waitForSelector('ds-input-number');

    const component = page.locator('ds-input-number');
    await expect(component).toHaveClass(/ds-input-number--disabled/);
  });

  // === READONLY STATE ===

  test('should make input readonly', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-dsinputnumber--readonly&viewMode=story`);
    await page.waitForSelector('ds-input-number');

    const input = page.locator('ds-input-number input');
    await expect(input).toHaveAttribute('readonly');
  });

  test('should apply readonly class', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-dsinputnumber--readonly&viewMode=story`);
    await page.waitForSelector('ds-input-number');

    const component = page.locator('ds-input-number');
    await expect(component).toHaveClass(/ds-input-number--readonly/);
  });

  // === PRECISION ===

  test('should format value with precision', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-dsinputnumber--with-precision&viewMode=story`);
    await page.waitForSelector('ds-input-number');

    const input = page.locator('ds-input-number').nth(2).locator('input');

    // Saisir une valeur avec plusieurs décimales
    await input.fill('0.12345');
    await input.blur();

    // Vérifier que la valeur est arrondie à 2 décimales
    await expect(input).toHaveValue('0.12');
  });

  // === CONTROLS POSITION ===

  test('should display controls on right', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-dsinputnumber--controls-right&viewMode=story`);
    await page.waitForSelector('ds-input-number');

    const component = page.locator('ds-input-number');
    await expect(component).toHaveClass(/ds-input-number--controls-right/);

    const controlsRight = page.locator('.ds-input-number__controls-right');
    await expect(controlsRight).toBeVisible();
  });

  test('should hide controls when controls is false', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-dsinputnumber--no-controls&viewMode=story`);
    await page.waitForSelector('ds-input-number');

    const buttons = page.locator('.ds-input-number__btn');
    await expect(buttons).toHaveCount(0);
  });

  // === STEP ===

  test('should increment by step value', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-dsinputnumber--with-step&viewMode=story`);
    await page.waitForSelector('ds-input-number');

    const input = page.locator('ds-input-number input');
    const incrementBtn = page.locator('.ds-input-number__btn--increment');

    await input.fill('0');
    await incrementBtn.click();

    // Step = 5
    await expect(input).toHaveValue('5');
  });

  // === ACCESSIBILITY ===

  test('should have role spinbutton', async ({ page }) => {
    const input = page.locator('ds-input-number input');
    await expect(input).toHaveAttribute('role', 'spinbutton');
  });

  test('should have aria-valuemin attribute', async ({ page }) => {
    const input = page.locator('ds-input-number input');
    await expect(input).toHaveAttribute('aria-valuemin', '0');
  });

  test('should have aria-valuemax attribute', async ({ page }) => {
    const input = page.locator('ds-input-number input');
    await expect(input).toHaveAttribute('aria-valuemax', '100');
  });

  test('should update aria-valuenow on value change', async ({ page }) => {
    const input = page.locator('ds-input-number input');
    const incrementBtn = page.locator('.ds-input-number__btn--increment');

    await input.fill('5');
    await incrementBtn.click();

    await expect(input).toHaveAttribute('aria-valuenow', '6');
  });

  test('should have aria-label on buttons', async ({ page }) => {
    const incrementBtn = page.locator('.ds-input-number__btn--increment');
    const decrementBtn = page.locator('.ds-input-number__btn--decrement');

    await expect(incrementBtn).toHaveAttribute('aria-label', 'Increment value');
    await expect(decrementBtn).toHaveAttribute('aria-label', 'Decrement value');
  });

  // === FOCUS STATES ===

  test('should apply focused class on focus', async ({ page }) => {
    const component = page.locator('ds-input-number');
    const input = page.locator('ds-input-number input');

    await input.focus();

    await expect(component).toHaveClass(/ds-input-number--focused/);
  });

  test('should remove focused class on blur', async ({ page }) => {
    const component = page.locator('ds-input-number');
    const input = page.locator('ds-input-number input');

    await input.focus();
    await input.blur();

    await expect(component).not.toHaveClass(/ds-input-number--focused/);
  });
});
