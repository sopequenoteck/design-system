import { test, expect } from '@playwright/test';

/**
 * Tests e2e pour le composant ds-toast
 *
 * Exécutés sur Showcase (/test/toast)
 *
 * Scénarios testés :
 * - Apparition du toast
 * - Disparition automatique après duration
 * - Fermeture manuelle
 * - Multiples toasts (stack)
 * - Différents types (success, error, warning, info)
 * - Positions (top-right, top-left, bottom-right, bottom-left)
 */

test.describe('DsToast - Apparition et types', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/toast');
    await page.waitForLoadState('networkidle');
  });

  test('devrait afficher un toast success', async ({ page }) => {
    const section = page.locator('[data-testid="toast-basic"]');
    const successButton = section.locator('ds-button:has-text("Toast Success")');
    await successButton.click();

    // Vérifier que le toast apparaît
    const toast = page.locator('.ds-toast--success').first();
    await expect(toast).toBeVisible();
  });

  test('devrait afficher un toast error', async ({ page }) => {
    const section = page.locator('[data-testid="toast-basic"]');
    const errorButton = section.locator('ds-button:has-text("Toast Error")');
    await errorButton.click();

    const toast = page.locator('.ds-toast--error').first();
    await expect(toast).toBeVisible();
    await expect(toast).toHaveClass(/ds-toast--error/);
  });

  test('devrait afficher un toast warning', async ({ page }) => {
    const section = page.locator('[data-testid="toast-basic"]');
    const warningButton = section.locator('ds-button:has-text("Toast Warning")');
    await warningButton.click();

    const toast = page.locator('.ds-toast--warning').first();
    await expect(toast).toBeVisible();
    await expect(toast).toHaveClass(/ds-toast--warning/);
  });

  test('devrait afficher un toast info', async ({ page }) => {
    const section = page.locator('[data-testid="toast-basic"]');
    const infoButton = section.locator('ds-button:has-text("Toast Info")');
    await infoButton.click();

    const toast = page.locator('.ds-toast--info').first();
    await expect(toast).toBeVisible();
    await expect(toast).toHaveClass(/ds-toast--info/);
  });
});

test.describe('DsToast - Duration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/toast');
    await page.waitForLoadState('networkidle');
  });

  test('devrait disparaître automatiquement après la duration', async ({ page }) => {
    const section = page.locator('[data-testid="toast-duration"]');
    const shortButton = section.locator('ds-button:has-text("Toast court")');
    await shortButton.click();

    const toast = page.locator('.ds-toast').first();
    await expect(toast).toBeVisible();

    // Attendre que le toast disparaisse (2s + marge)
    await page.waitForTimeout(2500);
    await expect(toast).not.toBeVisible();
  });

  test('le toast persistant devrait rester visible', async ({ page }) => {
    const section = page.locator('[data-testid="toast-duration"]');
    const persistentButton = section.locator('ds-button:has-text("Toast persistant")');
    await persistentButton.click();

    const toast = page.locator('.ds-toast').first();
    await expect(toast).toBeVisible();

    // Attendre plus longtemps que la durée par défaut
    await page.waitForTimeout(6000);

    // Le toast persistant devrait toujours être visible
    await expect(toast).toBeVisible();
  });

  test('devrait fermer le toast manuellement', async ({ page }) => {
    const section = page.locator('[data-testid="toast-duration"]');
    const persistentButton = section.locator('ds-button:has-text("Toast persistant")');
    await persistentButton.click();

    const toast = page.locator('.ds-toast').first();
    await expect(toast).toBeVisible();

    // Cliquer sur le bouton close
    const closeButton = toast.locator('.ds-toast__close');
    await closeButton.click();

    // Vérifier que le toast a disparu
    await expect(toast).not.toBeVisible();
  });
});

test.describe('DsToast - Positions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/toast');
    await page.waitForLoadState('networkidle');
  });

  test('devrait afficher le toast en top-right', async ({ page }) => {
    const section = page.locator('[data-testid="toast-position"]');
    const topRightButton = section.locator('ds-button:has-text("Top Right")');
    await topRightButton.click();

    const container = page.locator('.ds-toast-container--top-right');
    await expect(container).toBeVisible();

    const box = await container.boundingBox();
    const viewport = page.viewportSize();

    // Vérifier que le container est dans le coin top-right
    expect(box?.x).toBeGreaterThan((viewport?.width ?? 0) / 2);
    expect(box?.y).toBeLessThan((viewport?.height ?? 0) / 2);
  });

  test('devrait afficher le toast en top-left', async ({ page }) => {
    const section = page.locator('[data-testid="toast-position"]');
    const topLeftButton = section.locator('ds-button:has-text("Top Left")');
    await topLeftButton.click();

    const container = page.locator('.ds-toast-container--top-left');
    await expect(container).toBeVisible();

    const box = await container.boundingBox();
    const viewport = page.viewportSize();

    // Vérifier que le container est dans le coin top-left
    expect(box?.x).toBeLessThan((viewport?.width ?? 0) / 2);
    expect(box?.y).toBeLessThan((viewport?.height ?? 0) / 2);
  });

  test('devrait afficher le toast en bottom-right', async ({ page }) => {
    const section = page.locator('[data-testid="toast-position"]');
    const bottomRightButton = section.locator('ds-button:has-text("Bottom Right")');
    await bottomRightButton.click();

    const container = page.locator('.ds-toast-container--bottom-right');
    await expect(container).toBeVisible();

    const box = await container.boundingBox();
    const viewport = page.viewportSize();

    expect(box?.x).toBeGreaterThan((viewport?.width ?? 0) / 2);
    expect(box?.y).toBeGreaterThan((viewport?.height ?? 0) / 2);
  });

  test('devrait afficher le toast en bottom-left', async ({ page }) => {
    const section = page.locator('[data-testid="toast-position"]');
    const bottomLeftButton = section.locator('ds-button:has-text("Bottom Left")');
    await bottomLeftButton.click();

    const container = page.locator('.ds-toast-container--bottom-left');
    await expect(container).toBeVisible();

    const box = await container.boundingBox();
    const viewport = page.viewportSize();

    expect(box?.x).toBeLessThan((viewport?.width ?? 0) / 2);
    expect(box?.y).toBeGreaterThan((viewport?.height ?? 0) / 2);
  });
});

test.describe('DsToast - Multiples toasts (Stack)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/toast');
    await page.waitForLoadState('networkidle');
  });

  test('devrait afficher plusieurs toasts en stack', async ({ page }) => {
    const section = page.locator('[data-testid="toast-multiple"]');
    const multipleButton = section.locator('ds-button:has-text("Afficher 3 toasts")');
    await multipleButton.click();

    // Attendre que tous les toasts apparaissent
    await page.waitForTimeout(1000);

    // Vérifier que 3 toasts sont affichés
    const toasts = page.locator('.ds-toast');
    await expect(toasts).toHaveCount(3);

    // Vérifier qu'ils sont empilés (différentes positions verticales)
    const boxes = await Promise.all([
      toasts.nth(0).boundingBox(),
      toasts.nth(1).boundingBox(),
      toasts.nth(2).boundingBox(),
    ]);

    // Les toasts doivent avoir des positions Y différentes
    expect(boxes[0]?.y).not.toBe(boxes[1]?.y);
    expect(boxes[1]?.y).not.toBe(boxes[2]?.y);
  });

  test('devrait fermer tous les toasts avec clearAll', async ({ page }) => {
    const section = page.locator('[data-testid="toast-multiple"]');

    // Afficher 3 toasts
    await section.locator('ds-button:has-text("Afficher 3 toasts")').click();
    await page.waitForTimeout(1000);

    const toasts = page.locator('.ds-toast');
    await expect(toasts).toHaveCount(3);

    // Fermer tous les toasts
    await section.locator('ds-button:has-text("Fermer tous")').click();

    // Vérifier qu'il n'y a plus de toasts
    await expect(toasts).toHaveCount(0);
  });
});

test.describe('DsToast - Accessibilité', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/toast');
    await page.waitForLoadState('networkidle');
  });

  test('devrait avoir le rôle alert', async ({ page }) => {
    const section = page.locator('[data-testid="toast-basic"]');
    await section.locator('ds-button:has-text("Toast Success")').click();

    const toast = page.locator('.ds-toast[role="alert"]').first();
    await expect(toast).toBeVisible();
  });

  test('devrait avoir aria-live pour les annonces', async ({ page }) => {
    const section = page.locator('[data-testid="toast-basic"]');
    await section.locator('ds-button:has-text("Toast Success")').click();

    const container = page.locator('.ds-toast-container');
    const ariaLive = await container.getAttribute('aria-live');

    expect(ariaLive).toBeTruthy();
    expect(['polite', 'assertive']).toContain(ariaLive || '');
  });
});
