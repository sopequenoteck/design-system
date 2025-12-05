import { test, expect } from '@playwright/test';

/**
 * Tests e2e pour le composant ds-modal
 *
 * Scénarios testés :
 * - Ouverture et fermeture de la modal
 * - Focus trap (le focus reste dans la modal)
 * - Fermeture avec touche ESC
 * - Fermeture avec clic sur backdrop
 * - Fermeture avec bouton close
 * - Tailles (sm, md, lg)
 */

test.describe('DsModal - Ouverture et fermeture', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-modal--default');
    await page.waitForLoadState('networkidle');
  });

  test('devrait ouvrir la modal au clic sur le bouton trigger', async ({ page }) => {
    // Vérifier que la modal n'est pas visible initialement
    const modal = page.locator('.modal[role="dialog"]');
    await expect(modal).not.toBeVisible();

    // Cliquer sur le bouton pour ouvrir la modal
    const openButton = page.locator('button:has-text("Ouvrir la modale")');
    await openButton.click();

    // Vérifier que la modal est maintenant visible
    await expect(modal).toBeVisible();

    // Vérifier que l'overlay est visible
    const overlay = page.locator('.overlay');
    await expect(overlay).toBeVisible();
  });

  test('devrait fermer la modal avec le bouton close', async ({ page }) => {
    // Ouvrir la modal
    await page.locator('button:has-text("Ouvrir la modale")').click();
    const modal = page.locator('.modal[role="dialog"]');
    await expect(modal).toBeVisible();

    // Cliquer sur le bouton close (✕)
    const closeButton = page.locator('.close-btn');
    await closeButton.click();

    // Vérifier que la modal est fermée
    await expect(modal).not.toBeVisible();
  });

  test('devrait fermer la modal avec la touche ESC', async ({ page }) => {
    // Ouvrir la modal
    await page.locator('button:has-text("Ouvrir la modale")').click();
    const modal = page.locator('.modal[role="dialog"]');
    await expect(modal).toBeVisible();

    // Appuyer sur ESC
    await page.keyboard.press('Escape');

    // Vérifier que la modal est fermée
    await expect(modal).not.toBeVisible();
  });

  test('devrait fermer la modal avec clic sur backdrop', async ({ page }) => {
    // Ouvrir la modal
    await page.locator('button:has-text("Ouvrir la modale")').click();
    const modal = page.locator('.modal[role="dialog"]');
    await expect(modal).toBeVisible();

    // Cliquer sur l'overlay (backdrop)
    const overlay = page.locator('.overlay');
    await overlay.click({ force: true });

    // Vérifier que la modal est fermée
    await expect(modal).not.toBeVisible();
  });
});

test.describe('DsModal - Focus trap', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-modal--form-modal');
    await page.waitForLoadState('networkidle');
  });

  test('devrait piéger le focus dans la modal', async ({ page }) => {
    // Ouvrir la modal
    await page.locator('button:has-text("Créer un compte")').click();
    const modal = page.locator('.modal[role="dialog"]');
    await expect(modal).toBeVisible();

    // Récupérer tous les éléments focusables dans la modal
    const focusableSelector = '.modal button, .modal input, .modal [tabindex="0"]';
    const focusableElements = page.locator(focusableSelector);
    const count = await focusableElements.count();

    // Parcourir tous les éléments avec Tab
    for (let i = 0; i < count + 2; i++) {
      await page.keyboard.press('Tab');
    }

    // Vérifier que le focus est toujours dans la modal
    const isInModal = await page.evaluate(() => {
      const modalElement = document.querySelector('.modal[role="dialog"]');
      return modalElement?.contains(document.activeElement) ?? false;
    });

    expect(isInModal).toBe(true);
  });
});

test.describe('DsModal - Tailles', () => {
  test('devrait afficher la modal en taille small', async ({ page }) => {
    await page.goto('/iframe.html?id=components-modal--small-size');
    await page.waitForLoadState('networkidle');

    await page.locator('button:has-text("Small Modal")').click();

    const modal = page.locator('.modal[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal).toHaveClass(/modal-sm/);
  });

  test('devrait afficher la modal en taille large', async ({ page }) => {
    await page.goto('/iframe.html?id=components-modal--large-size');
    await page.waitForLoadState('networkidle');

    await page.locator('button:has-text("Large Modal")').click();

    const modal = page.locator('.modal[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal).toHaveClass(/modal-lg/);
  });
});

test.describe('DsModal - Accessibilité', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-modal--default');
    await page.waitForLoadState('networkidle');
  });

  test('devrait avoir les attributs ARIA corrects', async ({ page }) => {
    await page.locator('button:has-text("Ouvrir la modale")').click();

    const modal = page.locator('.modal[role="dialog"]');
    await expect(modal).toBeVisible();

    // Vérifier les attributs ARIA
    await expect(modal).toHaveAttribute('role', 'dialog');
    await expect(modal).toHaveAttribute('aria-modal', 'true');

    // Vérifier aria-labelledby pointe vers le titre
    const labelledBy = await modal.getAttribute('aria-labelledby');
    expect(labelledBy).toBeTruthy();

    const title = page.locator(`#${labelledBy}`);
    await expect(title).toBeVisible();
    await expect(title).toContainText('Titre de la modale');
  });
});

test.describe('DsModal - Types sémantiques', () => {
  test('devrait afficher la modal de type success', async ({ page }) => {
    await page.goto('/iframe.html?id=components-modal--success-with-icon');
    await page.waitForLoadState('networkidle');

    await page.locator('button:has-text("Afficher succès")').click();

    const modal = page.locator('.modal[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal).toHaveClass(/modal-success/);
  });

  test('devrait afficher la modal de type error', async ({ page }) => {
    await page.goto('/iframe.html?id=components-modal--error-with-icon');
    await page.waitForLoadState('networkidle');

    await page.locator('button:has-text("Afficher erreur")').click();

    const modal = page.locator('.modal[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal).toHaveClass(/modal-error/);
  });

  test('devrait afficher la modal de type warning', async ({ page }) => {
    await page.goto('/iframe.html?id=components-modal--warning-with-icon');
    await page.waitForLoadState('networkidle');

    await page.locator('button:has-text("Afficher avertissement")').click();

    const modal = page.locator('.modal[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal).toHaveClass(/modal-warning/);
  });
});
