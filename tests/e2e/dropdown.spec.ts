import { test, expect } from '@playwright/test';

/**
 * Tests e2e pour le composant ds-dropdown
 *
 * Exécutés sur Showcase (/test/dropdown)
 *
 * Scénarios testés :
 * - Ouverture et fermeture du dropdown
 * - Sélection d'un item
 * - Navigation clavier (ArrowDown, ArrowUp, Enter, ESC)
 * - Items disabled
 */

test.describe('DsDropdown - Ouverture et fermeture', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/dropdown');
    await page.waitForLoadState('networkidle');
  });

  test('devrait ouvrir le dropdown au clic sur le trigger', async ({ page }) => {
    const section = page.locator('[data-testid="dropdown-default"]');
    const trigger = section.locator('ds-dropdown ds-button');
    const menu = page.locator('.menu-sort-and-group[role="menu"]');

    // Vérifier que le menu n'est pas visible
    await expect(menu).not.toBeVisible();

    // Cliquer sur le trigger
    await trigger.click();

    // Vérifier que le menu est visible
    await expect(menu).toBeVisible();
  });

  test('devrait fermer le dropdown avec ESC', async ({ page }) => {
    const section = page.locator('[data-testid="dropdown-default"]');
    const trigger = section.locator('ds-dropdown ds-button');
    const menu = page.locator('.menu-sort-and-group[role="menu"]');

    // Ouvrir le dropdown
    await trigger.click();
    await expect(menu).toBeVisible();

    // Appuyer sur ESC
    await page.keyboard.press('Escape');

    // Vérifier que le menu est fermé
    await expect(menu).not.toBeVisible();
  });

  test('devrait fermer le dropdown au clic sur le backdrop', async ({ page }) => {
    const section = page.locator('[data-testid="dropdown-default"]');
    const trigger = section.locator('ds-dropdown ds-button');
    const menu = page.locator('.menu-sort-and-group[role="menu"]');

    // Ouvrir le dropdown
    await trigger.click();
    await expect(menu).toBeVisible();

    // Cliquer sur le backdrop (overlay CDK)
    const backdrop = page.locator('.menu-overlay');
    await backdrop.click({ force: true });

    // Vérifier que le menu est fermé
    await expect(menu).not.toBeVisible();
  });
});

test.describe('DsDropdown - Sélection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/dropdown');
    await page.waitForLoadState('networkidle');
  });

  test('devrait sélectionner un item au clic', async ({ page }) => {
    const section = page.locator('[data-testid="dropdown-default"]');
    const trigger = section.locator('ds-dropdown ds-button');

    // Ouvrir le dropdown
    await trigger.click();

    // Cliquer sur le premier item
    const firstItem = page.locator('.menu-item-content').first();
    await firstItem.click();

    // Vérifier que le menu est fermé après la sélection
    const menu = page.locator('.menu-sort-and-group[role="menu"]');
    await expect(menu).not.toBeVisible();

    // Vérifier que la sélection est affichée
    const selectionText = section.locator('p');
    await expect(selectionText).toContainText('Modifier');
  });
});

test.describe('DsDropdown - Navigation clavier', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/dropdown');
    await page.waitForLoadState('networkidle');
  });

  test('devrait ouvrir le dropdown avec ArrowDown', async ({ page }) => {
    const section = page.locator('[data-testid="dropdown-default"]');
    const trigger = section.locator('ds-dropdown ds-button');
    const menu = page.locator('.menu-sort-and-group[role="menu"]');

    // Focus sur le trigger
    await trigger.focus();

    // Appuyer sur ArrowDown pour ouvrir
    await page.keyboard.press('ArrowDown');

    // Vérifier que le menu est ouvert
    await expect(menu).toBeVisible();
  });

  test('devrait naviguer avec ArrowDown et ArrowUp', async ({ page }) => {
    const section = page.locator('[data-testid="dropdown-default"]');
    const trigger = section.locator('ds-dropdown ds-button');

    // Ouvrir le dropdown
    await trigger.click();

    // Appuyer sur ArrowDown
    await page.keyboard.press('ArrowDown');

    // Vérifier que le premier item a le focus
    const firstItem = page.locator('.menu-item-content').first();
    await expect(firstItem).toBeFocused();

    // Appuyer sur ArrowDown à nouveau
    await page.keyboard.press('ArrowDown');

    // Vérifier que le deuxième item a le focus
    const secondItem = page.locator('.menu-item-content').nth(1);
    await expect(secondItem).toBeFocused();

    // Appuyer sur ArrowUp
    await page.keyboard.press('ArrowUp');

    // Vérifier que le premier item a le focus à nouveau
    await expect(firstItem).toBeFocused();
  });

  test('devrait sélectionner avec Enter', async ({ page }) => {
    const section = page.locator('[data-testid="dropdown-default"]');
    const trigger = section.locator('ds-dropdown ds-button');

    // Ouvrir le dropdown
    await trigger.click();

    // Naviguer au premier item
    await page.keyboard.press('ArrowDown');

    // Sélectionner avec Enter
    await page.keyboard.press('Enter');

    // Vérifier que le menu est fermé
    const menu = page.locator('.menu-sort-and-group[role="menu"]');
    await expect(menu).not.toBeVisible();
  });

  test('devrait naviguer en boucle', async ({ page }) => {
    const section = page.locator('[data-testid="dropdown-default"]');
    const trigger = section.locator('ds-dropdown ds-button');
    await trigger.click();

    // Compter les items
    const items = page.locator('.menu-item-content');
    const count = await items.count();

    // Naviguer jusqu'au dernier item + 1 pour boucler
    for (let i = 0; i <= count; i++) {
      await page.keyboard.press('ArrowDown');
    }

    // Vérifier que le focus est revenu au premier item
    const firstItem = items.first();
    await expect(firstItem).toBeFocused();
  });

  test('devrait aller au premier item avec Home', async ({ page }) => {
    const section = page.locator('[data-testid="dropdown-default"]');
    const trigger = section.locator('ds-dropdown ds-button');
    await trigger.click();

    // Naviguer au milieu de la liste
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');

    // Appuyer sur Home
    await page.keyboard.press('Home');

    // Vérifier que le premier item a le focus
    const firstItem = page.locator('.menu-item-content').first();
    await expect(firstItem).toBeFocused();
  });

  test('devrait aller au dernier item avec End', async ({ page }) => {
    const section = page.locator('[data-testid="dropdown-default"]');
    const trigger = section.locator('ds-dropdown ds-button');
    await trigger.click();

    // Appuyer sur End
    await page.keyboard.press('End');

    // Vérifier que le dernier item a le focus
    const lastItem = page.locator('.menu-item-content').last();
    await expect(lastItem).toBeFocused();
  });
});

test.describe('DsDropdown - Items désactivés', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/dropdown');
    await page.waitForLoadState('networkidle');
  });

  test('ne devrait pas sélectionner un item disabled', async ({ page }) => {
    const section = page.locator('[data-testid="dropdown-disabled"]');
    const trigger = section.locator('ds-dropdown ds-button');

    // Ouvrir le dropdown
    await trigger.click();

    // Trouver l'item disabled
    const disabledItem = page.locator('.menu-item-content[aria-disabled="true"]');
    await expect(disabledItem).toBeVisible();

    // Essayer de cliquer sur l'item disabled
    await disabledItem.click({ force: true });

    // Le menu devrait toujours être ouvert
    const menu = page.locator('.menu-sort-and-group[role="menu"]');
    await expect(menu).toBeVisible();
  });
});

test.describe('DsDropdown - Accessibilité', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/dropdown');
    await page.waitForLoadState('networkidle');
  });

  test('devrait avoir les attributs ARIA corrects sur le trigger', async ({ page }) => {
    const section = page.locator('[data-testid="dropdown-default"]');
    const dropdown = section.locator('ds-dropdown');
    const trigger = dropdown.locator('ds-button');

    // Vérifier aria-haspopup
    await expect(dropdown).toHaveAttribute('aria-haspopup', 'menu');

    // Vérifier aria-expanded est false initialement
    await expect(dropdown).toHaveAttribute('aria-expanded', 'false');

    // Ouvrir le dropdown
    await trigger.click();

    // Vérifier aria-expanded est true
    await expect(dropdown).toHaveAttribute('aria-expanded', 'true');
  });

  test('devrait avoir le rôle menu sur le panel', async ({ page }) => {
    const section = page.locator('[data-testid="dropdown-default"]');
    const trigger = section.locator('ds-dropdown ds-button');
    await trigger.click();

    const menu = page.locator('.menu-sort-and-group');
    await expect(menu).toHaveAttribute('role', 'menu');
  });

  test('devrait avoir le rôle menuitemradio sur les items', async ({ page }) => {
    const section = page.locator('[data-testid="dropdown-default"]');
    const trigger = section.locator('ds-dropdown ds-button');
    await trigger.click();

    const items = page.locator('.menu-item-content');
    const firstItem = items.first();
    await expect(firstItem).toHaveAttribute('role', 'menuitemradio');
  });
});
