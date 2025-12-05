import { test, expect } from '@playwright/test';

/**
 * Tests e2e pour le composant ds-toast
 *
 * Scénarios testés :
 * - Apparition du toast
 * - Disparition automatique après duration
 * - Fermeture manuelle
 * - Multiples toasts (stack)
 * - Différents types (success, error, warning, info)
 * - Positions (top-right, top-left, bottom-right, bottom-left)
 */

test.describe('DsToast - Apparition et disparition', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-toast--default');
  });

  test('devrait afficher un toast au clic sur le trigger', async ({ page }) => {
    // Cliquer sur le bouton pour afficher un toast
    const triggerButton = page.locator('button:has-text("Afficher Toast")');
    await triggerButton.click();

    // Vérifier que le toast apparaît
    const toast = page.locator('.ds-toast').first();
    await expect(toast).toBeVisible();
  });

  test('devrait disparaître automatiquement après la duration', async ({ page }) => {
    await page.goto('/iframe.html?id=components-toast--auto-dismiss');

    // Afficher un toast avec une courte duration (2s)
    const triggerButton = page.locator('button:has-text("Toast 2s")');
    await triggerButton.click();

    const toast = page.locator('.ds-toast').first();
    await expect(toast).toBeVisible();

    // Attendre que le toast disparaisse (2s + marge)
    await page.waitForTimeout(2500);
    await expect(toast).not.toBeVisible();
  });

  test('devrait fermer le toast manuellement', async ({ page }) => {
    // Afficher un toast
    const triggerButton = page.locator('button:has-text("Afficher Toast")');
    await triggerButton.click();

    const toast = page.locator('.ds-toast').first();
    await expect(toast).toBeVisible();

    // Cliquer sur le bouton close
    const closeButton = toast.locator('.ds-toast__close');
    await closeButton.click();

    // Vérifier que le toast a disparu
    await expect(toast).not.toBeVisible();
  });
});

test.describe('DsToast - Types et styles', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-toast--all-types');
  });

  test('devrait afficher un toast de type success', async ({ page }) => {
    const successButton = page.locator('button:has-text("Success")');
    await successButton.click();

    const toast = page.locator('.ds-toast--success').first();
    await expect(toast).toBeVisible();
    await expect(toast).toHaveClass(/ds-toast--success/);
  });

  test('devrait afficher un toast de type error', async ({ page }) => {
    const errorButton = page.locator('button:has-text("Error")');
    await errorButton.click();

    const toast = page.locator('.ds-toast--error').first();
    await expect(toast).toBeVisible();
    await expect(toast).toHaveClass(/ds-toast--error/);
  });

  test('devrait afficher un toast de type warning', async ({ page }) => {
    const warningButton = page.locator('button:has-text("Warning")');
    await warningButton.click();

    const toast = page.locator('.ds-toast--warning').first();
    await expect(toast).toBeVisible();
    await expect(toast).toHaveClass(/ds-toast--warning/);
  });

  test('devrait afficher un toast de type info', async ({ page }) => {
    const infoButton = page.locator('button:has-text("Info")');
    await infoButton.click();

    const toast = page.locator('.ds-toast--info').first();
    await expect(toast).toBeVisible();
    await expect(toast).toHaveClass(/ds-toast--info/);
  });
});

test.describe('DsToast - Multiples toasts (Stack)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-toast--multiple-toasts');
  });

  test('devrait afficher plusieurs toasts en stack', async ({ page }) => {
    const triggerButton = page.locator('button:has-text("Afficher 3 Toasts")');
    await triggerButton.click();

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

  test('devrait retirer un toast spécifique du stack', async ({ page }) => {
    const triggerButton = page.locator('button:has-text("Afficher 3 Toasts")');
    await triggerButton.click();

    const toasts = page.locator('.ds-toast');
    await expect(toasts).toHaveCount(3);

    // Fermer le deuxième toast
    const secondToast = toasts.nth(1);
    const closeButton = secondToast.locator('.ds-toast__close');
    await closeButton.click();

    // Vérifier qu'il reste 2 toasts
    await expect(toasts).toHaveCount(2);
  });
});

test.describe('DsToast - Positions', () => {
  test('devrait afficher le toast en top-right', async ({ page }) => {
    await page.goto('/iframe.html?id=components-toast--position-top-right');

    const triggerButton = page.locator('button:has-text("Afficher Toast")');
    await triggerButton.click();

    const container = page.locator('.ds-toast-container--top-right');
    await expect(container).toBeVisible();

    const box = await container.boundingBox();
    const viewport = page.viewportSize();

    // Vérifier que le container est dans le coin top-right
    expect(box?.x).toBeGreaterThan((viewport?.width ?? 0) / 2);
    expect(box?.y).toBeLessThan((viewport?.height ?? 0) / 2);
  });

  test('devrait afficher le toast en bottom-left', async ({ page }) => {
    await page.goto('/iframe.html?id=components-toast--position-bottom-left');

    const triggerButton = page.locator('button:has-text("Afficher Toast")');
    await triggerButton.click();

    const container = page.locator('.ds-toast-container--bottom-left');
    await expect(container).toBeVisible();

    const box = await container.boundingBox();
    const viewport = page.viewportSize();

    // Vérifier que le container est dans le coin bottom-left
    expect(box?.x).toBeLessThan((viewport?.width ?? 0) / 2);
    expect(box?.y).toBeGreaterThan((viewport?.height ?? 0) / 2);
  });
});

test.describe('DsToast - Accessibilité', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-toast--default');
  });

  test('devrait avoir le rôle alert', async ({ page }) => {
    const triggerButton = page.locator('button:has-text("Afficher Toast")');
    await triggerButton.click();

    const toast = page.locator('.ds-toast[role="alert"]').first();
    await expect(toast).toBeVisible();
  });

  test('devrait avoir aria-live pour les annonces', async ({ page }) => {
    const triggerButton = page.locator('button:has-text("Afficher Toast")');
    await triggerButton.click();

    const container = page.locator('.ds-toast-container');
    const ariaLive = await container.getAttribute('aria-live');

    expect(ariaLive).toBeTruthy();
    expect(['polite', 'assertive']).toContain(ariaLive || '');
  });
});

test.describe('DsToast - Animations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-toast--default');
  });

  test('devrait avoir une animation d\'entrée', async ({ page }) => {
    const triggerButton = page.locator('button:has-text("Afficher Toast")');
    await triggerButton.click();

    const toast = page.locator('.ds-toast').first();

    // Vérifier que le toast a une classe d'animation
    const classes = await toast.getAttribute('class');
    expect(classes).toMatch(/ds-toast--enter|ds-toast-enter/);
  });

  test('devrait avoir une animation de sortie', async ({ page }) => {
    const triggerButton = page.locator('button:has-text("Afficher Toast")');
    await triggerButton.click();

    const toast = page.locator('.ds-toast').first();
    await expect(toast).toBeVisible();

    // Fermer le toast
    const closeButton = toast.locator('.ds-toast__close');
    await closeButton.click();

    // Vérifier qu'il y a une animation de sortie
    const classes = await toast.getAttribute('class');
    expect(classes).toMatch(/ds-toast--exit|ds-toast-exit/);
  });
});
