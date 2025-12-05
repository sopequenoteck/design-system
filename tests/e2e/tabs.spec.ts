import { test, expect } from '@playwright/test';

/**
 * Tests e2e pour le composant ds-tabs
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
    await page.goto('/iframe.html?id=components-tabs--default');
  });

  test('devrait sélectionner une tab au clic', async ({ page }) => {
    // Cliquer sur la deuxième tab
    const secondTab = page.locator('.ds-tabs__tab').nth(1);
    await secondTab.click();

    // Vérifier que la tab est active
    await expect(secondTab).toHaveAttribute('aria-selected', 'true');
    await expect(secondTab).toHaveClass(/ds-tabs__tab--active/);

    // Vérifier que le contenu correspondant est affiché
    const secondPanel = page.locator('.ds-tabs__panel').nth(1);
    await expect(secondPanel).toBeVisible();
  });

  test('devrait afficher uniquement le contenu de la tab active', async ({ page }) => {
    const firstTab = page.locator('.ds-tabs__tab').first();
    const secondTab = page.locator('.ds-tabs__tab').nth(1);

    // Vérifier que le premier panel est visible initialement
    const firstPanel = page.locator('.ds-tabs__panel').first();
    const secondPanel = page.locator('.ds-tabs__panel').nth(1);
    await expect(firstPanel).toBeVisible();
    await expect(secondPanel).not.toBeVisible();

    // Cliquer sur la deuxième tab
    await secondTab.click();

    // Vérifier que les panels ont changé
    await expect(firstPanel).not.toBeVisible();
    await expect(secondPanel).toBeVisible();
  });

  test('ne devrait pas sélectionner une tab disabled', async ({ page }) => {
    await page.goto('/iframe.html?id=components-tabs--with-disabled-tab');

    // Essayer de cliquer sur une tab disabled
    const disabledTab = page.locator('.ds-tabs__tab[aria-disabled="true"]').first();
    const wasSelected = await disabledTab.getAttribute('aria-selected');

    await disabledTab.click();

    // Vérifier que la tab n'est toujours pas sélectionnée
    const isSelected = await disabledTab.getAttribute('aria-selected');
    expect(isSelected).toBe(wasSelected);
  });
});

test.describe('DsTabs - Navigation clavier', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-tabs--default');
  });

  test('devrait naviguer avec ArrowRight', async ({ page }) => {
    const firstTab = page.locator('.ds-tabs__tab').first();
    const secondTab = page.locator('.ds-tabs__tab').nth(1);

    // Focus sur la première tab
    await firstTab.focus();

    // Appuyer sur ArrowRight
    await page.keyboard.press('ArrowRight');

    // Vérifier que la deuxième tab a le focus et est active
    await expect(secondTab).toBeFocused();
    await expect(secondTab).toHaveAttribute('aria-selected', 'true');
  });

  test('devrait naviguer avec ArrowLeft', async ({ page }) => {
    const firstTab = page.locator('.ds-tabs__tab').first();
    const secondTab = page.locator('.ds-tabs__tab').nth(1);

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
    const firstTab = page.locator('.ds-tabs__tab').first();
    const lastTab = page.locator('.ds-tabs__tab').last();

    // Focus sur la dernière tab
    await lastTab.click();

    // Appuyer sur Home
    await page.keyboard.press('Home');

    // Vérifier que la première tab est active
    await expect(firstTab).toBeFocused();
    await expect(firstTab).toHaveAttribute('aria-selected', 'true');
  });

  test('devrait aller à la dernière tab avec End', async ({ page }) => {
    const firstTab = page.locator('.ds-tabs__tab').first();
    const lastTab = page.locator('.ds-tabs__tab').last();

    // Focus sur la première tab
    await firstTab.focus();

    // Appuyer sur End
    await page.keyboard.press('End');

    // Vérifier que la dernière tab est active
    await expect(lastTab).toBeFocused();
    await expect(lastTab).toHaveAttribute('aria-selected', 'true');
  });

  test('devrait naviguer en boucle avec ArrowRight', async ({ page }) => {
    const tabs = page.locator('.ds-tabs__tab');
    const count = await tabs.count();
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
    await page.goto('/iframe.html?id=components-tabs--default');
  });

  test('devrait déplacer l\'indicateur avec la tab active', async ({ page }) => {
    const indicator = page.locator('.ds-tabs__indicator');

    // Vérifier que l'indicateur existe
    await expect(indicator).toBeVisible();

    // Obtenir la position initiale de l'indicateur
    const initialBox = await indicator.boundingBox();

    // Cliquer sur la deuxième tab
    await page.locator('.ds-tabs__tab').nth(1).click();

    // Attendre l'animation
    await page.waitForTimeout(300);

    // Vérifier que l'indicateur a bougé
    const newBox = await indicator.boundingBox();
    expect(newBox?.x).not.toBe(initialBox?.x);
  });
});

test.describe('DsTabs - Accessibilité', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-tabs--default');
  });

  test('devrait avoir les attributs ARIA corrects', async ({ page }) => {
    const tabList = page.locator('[role="tablist"]');
    const tabs = page.locator('[role="tab"]');
    const panels = page.locator('[role="tabpanel"]');

    // Vérifier les rôles
    await expect(tabList).toHaveCount(1);
    expect(await tabs.count()).toBeGreaterThan(0);
    expect(await panels.count()).toBeGreaterThan(0);

    // Vérifier que chaque tab contrôle un panel
    const firstTab = tabs.first();
    const controls = await firstTab.getAttribute('aria-controls');
    expect(controls).toBeTruthy();

    const controlledPanel = page.locator(`#${controls}`);
    await expect(controlledPanel).toHaveCount(1);
  });
});
