import { test, expect } from '@playwright/test';

/**
 * Tests e2e pour le composant ds-tabs
 *
 * Exécutés sur Showcase (/test/tabs)
 *
 * Scénarios testés :
 * - Sélection de tabs au clic
 * - Navigation clavier (ArrowLeft, ArrowRight, Home, End)
 * - Indicateur visuel de la tab active
 * - Affichage du contenu correspondant
 * - Tabs disabled
 */

test.describe('DsTabs - Sélection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/tabs');
    await page.waitForLoadState('networkidle');
  });

  test('devrait sélectionner une tab au clic', async ({ page }) => {
    const section = page.locator('[data-testid="tabs-default"]');
    const tabs = section.locator('.ds-tabs__tab');

    // Cliquer sur la deuxième tab
    const secondTab = tabs.nth(1);
    await secondTab.click();

    // Vérifier que la tab est active
    await expect(secondTab).toHaveAttribute('aria-selected', 'true');
    await expect(secondTab).toHaveClass(/ds-tabs__tab--active/);
  });

  test('devrait afficher le contenu correspondant à la tab active', async ({ page }) => {
    const section = page.locator('[data-testid="tabs-default"]');
    const tabs = section.locator('.ds-tabs__tab');
    const content = section.locator('.tab-content p');

    // Vérifier le contenu initial (onglet 1)
    await expect(content).toContainText('onglet 1');

    // Cliquer sur la deuxième tab
    await tabs.nth(1).click();

    // Vérifier que le contenu a changé
    await expect(content).toContainText('onglet 2');
  });

  test('ne devrait pas sélectionner une tab disabled', async ({ page }) => {
    const section = page.locator('[data-testid="tabs-disabled"]');
    const tabs = section.locator('.ds-tabs__tab');

    // Trouver la tab disabled
    const disabledTab = tabs.filter({ hasText: 'Désactivé' });
    await expect(disabledTab).toHaveAttribute('aria-disabled', 'true');

    // Essayer de cliquer dessus
    await disabledTab.click({ force: true });

    // Vérifier qu'elle n'est pas sélectionnée
    await expect(disabledTab).toHaveAttribute('aria-selected', 'false');
  });
});

test.describe('DsTabs - Navigation clavier', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/tabs');
    await page.waitForLoadState('networkidle');
  });

  test('devrait naviguer avec ArrowRight', async ({ page }) => {
    const section = page.locator('[data-testid="tabs-default"]');
    const tabs = section.locator('.ds-tabs__tab');
    const firstTab = tabs.first();
    const secondTab = tabs.nth(1);

    // Focus sur la première tab
    await firstTab.focus();

    // Appuyer sur ArrowRight
    await page.keyboard.press('ArrowRight');

    // Vérifier que la deuxième tab a le focus et est active
    await expect(secondTab).toBeFocused();
    await expect(secondTab).toHaveAttribute('aria-selected', 'true');
  });

  test('devrait naviguer avec ArrowLeft', async ({ page }) => {
    const section = page.locator('[data-testid="tabs-default"]');
    const tabs = section.locator('.ds-tabs__tab');
    const firstTab = tabs.first();
    const secondTab = tabs.nth(1);

    // Sélectionner la deuxième tab
    await secondTab.click();
    await expect(secondTab).toBeFocused();

    // Appuyer sur ArrowLeft
    await page.keyboard.press('ArrowLeft');

    // Vérifier que la première tab a le focus et est active
    await expect(firstTab).toBeFocused();
    await expect(firstTab).toHaveAttribute('aria-selected', 'true');
  });

  test('devrait aller à la première tab avec Home', async ({ page }) => {
    const section = page.locator('[data-testid="tabs-default"]');
    const tabs = section.locator('.ds-tabs__tab');
    const firstTab = tabs.first();
    const lastTab = tabs.last();

    // Focus sur la dernière tab
    await lastTab.click();

    // Appuyer sur Home
    await page.keyboard.press('Home');

    // Vérifier que la première tab est active
    await expect(firstTab).toBeFocused();
    await expect(firstTab).toHaveAttribute('aria-selected', 'true');
  });

  test('devrait aller à la dernière tab avec End', async ({ page }) => {
    const section = page.locator('[data-testid="tabs-default"]');
    const tabs = section.locator('.ds-tabs__tab');
    const firstTab = tabs.first();
    const lastTab = tabs.last();

    // Focus sur la première tab
    await firstTab.focus();

    // Appuyer sur End
    await page.keyboard.press('End');

    // Vérifier que la dernière tab est active
    await expect(lastTab).toBeFocused();
    await expect(lastTab).toHaveAttribute('aria-selected', 'true');
  });

  test('devrait naviguer en boucle avec ArrowRight', async ({ page }) => {
    const section = page.locator('[data-testid="tabs-default"]');
    const tabs = section.locator('.ds-tabs__tab');
    const firstTab = tabs.first();
    const lastTab = tabs.last();

    // Focus sur la dernière tab
    await lastTab.click();

    // Appuyer sur ArrowRight pour boucler
    await page.keyboard.press('ArrowRight');

    // Vérifier que le focus est revenu à la première tab
    await expect(firstTab).toBeFocused();
    await expect(firstTab).toHaveAttribute('aria-selected', 'true');
  });
});

test.describe('DsTabs - Indicateur visuel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/tabs');
    await page.waitForLoadState('networkidle');
  });

  test('devrait déplacer l\'indicateur avec la tab active', async ({ page }) => {
    const section = page.locator('[data-testid="tabs-default"]');
    const indicator = section.locator('.ds-tabs__indicator');
    const tabs = section.locator('.ds-tabs__tab');

    // Vérifier que l'indicateur existe
    await expect(indicator).toBeVisible();

    // Obtenir la position initiale de l'indicateur
    const initialBox = await indicator.boundingBox();

    // Cliquer sur la deuxième tab
    await tabs.nth(1).click();

    // Attendre l'animation
    await page.waitForTimeout(300);

    // Vérifier que l'indicateur a bougé
    const newBox = await indicator.boundingBox();
    expect(newBox?.x).not.toBe(initialBox?.x);
  });
});

test.describe('DsTabs - Tailles', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/tabs');
    await page.waitForLoadState('networkidle');
  });

  test('devrait afficher les tabs en différentes tailles', async ({ page }) => {
    const section = page.locator('[data-testid="tabs-sizes"]');

    // Vérifier les 3 groupes de tabs (sm, md, lg)
    const tabGroups = section.locator('ds-tabs');
    await expect(tabGroups).toHaveCount(3);

    // Vérifier que chaque groupe a des tabs
    for (let i = 0; i < 3; i++) {
      const tabs = tabGroups.nth(i).locator('.ds-tabs__tab');
      const count = await tabs.count();
      expect(count).toBeGreaterThan(0);
    }
  });
});

test.describe('DsTabs - Accessibilité', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/tabs');
    await page.waitForLoadState('networkidle');
  });

  test('devrait avoir les attributs ARIA corrects', async ({ page }) => {
    const section = page.locator('[data-testid="tabs-default"]');
    const tabList = section.locator('[role="tablist"]');
    const tabs = section.locator('[role="tab"]');

    // Vérifier les rôles
    await expect(tabList).toHaveCount(1);
    expect(await tabs.count()).toBeGreaterThan(0);

    // Vérifier que chaque tab contrôle un panel
    const firstTab = tabs.first();
    const controls = await firstTab.getAttribute('aria-controls');
    expect(controls).toBeTruthy();
  });

  test('devrait avoir les attributs tabindex corrects', async ({ page }) => {
    const section = page.locator('[data-testid="tabs-default"]');
    const tabs = section.locator('.ds-tabs__tab');

    // La tab active doit avoir tabindex="0"
    const activeTab = tabs.first();
    await expect(activeTab).toHaveAttribute('tabindex', '0');

    // Les autres tabs doivent avoir tabindex="-1"
    const inactiveTab = tabs.nth(1);
    await expect(inactiveTab).toHaveAttribute('tabindex', '-1');
  });
});
