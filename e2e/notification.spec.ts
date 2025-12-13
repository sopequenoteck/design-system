import { test, expect } from '@playwright/test';

test.describe('DsNotification - Rendu initial', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-notification--default');
  });

  test('should render notification container', async ({ page }) => {
    const container = page.locator('.ds-notification-container');
    await expect(container).toBeVisible();
  });

  test('should have correct placement class', async ({ page }) => {
    const container = page.locator('.ds-notification-container');
    await expect(container).toHaveClass(/ds-notification-container--topRight/);
  });

  test('should start with no notifications', async ({ page }) => {
    const notifications = page.locator('.ds-notification');
    await expect(notifications).toHaveCount(0);
  });
});

test.describe('DsNotification - Apparition', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-notification--default');
  });

  test('should show info notification on button click', async ({ page }) => {
    const button = page.locator('button:has-text("Info Notification")');
    await button.click();

    const notification = page.locator('.ds-notification');
    await expect(notification).toBeVisible();
  });

  test('should display notification title', async ({ page }) => {
    const button = page.locator('button:has-text("Info Notification")');
    await button.click();

    const title = page.locator('.ds-notification__title');
    await expect(title).toContainText('Information');
  });

  test('should display notification message', async ({ page }) => {
    const button = page.locator('button:has-text("Info Notification")');
    await button.click();

    const message = page.locator('.ds-notification__message');
    await expect(message).toContainText('Ceci est une notification informative');
  });

  test('should display icon', async ({ page }) => {
    const button = page.locator('button:has-text("Info Notification")');
    await button.click();

    const icon = page.locator('.ds-notification__icon');
    await expect(icon).toBeVisible();
  });
});

test.describe('DsNotification - Types', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-notification--default');
  });

  test('should display info notification with correct class', async ({ page }) => {
    const button = page.locator('button:has-text("Info Notification")');
    await button.click();

    const notification = page.locator('.ds-notification');
    await expect(notification).toHaveClass(/ds-notification--info/);
  });

  test('should display success notification with correct class', async ({ page }) => {
    const button = page.locator('button:has-text("Success Notification")');
    await button.click();

    const notification = page.locator('.ds-notification');
    await expect(notification).toHaveClass(/ds-notification--success/);
  });

  test('should display warning notification with correct class', async ({ page }) => {
    const button = page.locator('button:has-text("Warning Notification")');
    await button.click();

    const notification = page.locator('.ds-notification');
    await expect(notification).toHaveClass(/ds-notification--warning/);
  });

  test('should display error notification with correct class', async ({ page }) => {
    const button = page.locator('button:has-text("Error Notification")');
    await button.click();

    const notification = page.locator('.ds-notification');
    await expect(notification).toHaveClass(/ds-notification--error/);
  });

  test('should display success notification with correct title', async ({ page }) => {
    const button = page.locator('button:has-text("Success Notification")');
    await button.click();

    const title = page.locator('.ds-notification__title');
    await expect(title).toContainText('Succès');
  });

  test('should display warning notification with correct message', async ({ page }) => {
    const button = page.locator('button:has-text("Warning Notification")');
    await button.click();

    const message = page.locator('.ds-notification__message');
    await expect(message).toContainText('Cette action nécessite votre attention');
  });

  test('should display error notification with correct message', async ({ page }) => {
    const button = page.locator('button:has-text("Error Notification")');
    await button.click();

    const message = page.locator('.ds-notification__message');
    await expect(message).toContainText('Une erreur est survenue');
  });
});

test.describe('DsNotification - Fermeture manuelle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-notification--persistent-notification');
  });

  test('should display close button', async ({ page }) => {
    const button = page.locator('button:has-text("Notification Persistante")');
    await button.click();

    const closeButton = page.locator('.ds-notification__close');
    await expect(closeButton).toBeVisible();
  });

  test('should close notification on close button click', async ({ page }) => {
    const button = page.locator('button:has-text("Notification Persistante")');
    await button.click();

    const closeButton = page.locator('.ds-notification__close');
    await closeButton.click();

    const notification = page.locator('.ds-notification');
    await expect(notification).not.toBeVisible();
  });

  test('should have accessible close button', async ({ page }) => {
    const button = page.locator('button:has-text("Notification Persistante")');
    await button.click();

    const closeButton = page.locator('.ds-notification__close');
    await expect(closeButton).toHaveAttribute('aria-label');
  });
});

test.describe('DsNotification - Fermeture automatique', () => {
  test('should auto-dismiss notification after duration', async ({ page }) => {
    await page.goto('/iframe.html?id=components-notification--auto-dismiss');

    const button = page.locator('button:has-text("Notification Auto-dismiss")');
    await button.click();

    // Notification visible initialement
    const notification = page.locator('.ds-notification');
    await expect(notification).toBeVisible();

    // Attendre la fermeture automatique (2 secondes + marge)
    await page.waitForTimeout(2500);

    await expect(notification).not.toBeVisible();
  });

  test('should not auto-dismiss persistent notification', async ({ page }) => {
    await page.goto('/iframe.html?id=components-notification--persistent-notification');

    const button = page.locator('button:has-text("Notification Persistante")');
    await button.click();

    const notification = page.locator('.ds-notification');
    await expect(notification).toBeVisible();

    // Attendre 3 secondes
    await page.waitForTimeout(3000);

    // La notification doit toujours être visible
    await expect(notification).toBeVisible();
  });
});

test.describe('DsNotification - Actions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-notification--with-actions');
  });

  test('should display notification with actions', async ({ page }) => {
    const button = page.locator('button:has-text("Notification avec Actions")');
    await button.click();

    const actions = page.locator('.ds-notification__actions');
    await expect(actions).toBeVisible();
  });

  test('should display action buttons', async ({ page }) => {
    const button = page.locator('button:has-text("Notification avec Actions")');
    await button.click();

    const actionButtons = page.locator('.ds-notification__action');
    await expect(actionButtons).toHaveCount(2);
  });

  test('should trigger action handler on click', async ({ page }) => {
    const button = page.locator('button:has-text("Notification avec Actions")');
    await button.click();

    const confirmButton = page.locator('.ds-notification__action:has-text("Confirmer")');
    await confirmButton.click();

    // Vérifier qu'une nouvelle notification de succès apparaît
    const successNotification = page.locator('.ds-notification--success');
    await expect(successNotification).toBeVisible();
  });

  test('should display multiple actions', async ({ page }) => {
    await page.goto('/iframe.html?id=components-notification--multiple-actions');

    const button = page.locator('button:has-text("Notification avec 3 Actions")');
    await button.click();

    const actionButtons = page.locator('.ds-notification__action');
    await expect(actionButtons).toHaveCount(3);
  });

  test('should have correct variant classes for actions', async ({ page }) => {
    const button = page.locator('button:has-text("Notification avec Actions")');
    await button.click();

    const primaryAction = page.locator('.ds-notification__action--primary');
    await expect(primaryAction).toBeVisible();

    const ghostAction = page.locator('.ds-notification__action--ghost');
    await expect(ghostAction).toBeVisible();
  });
});

test.describe('DsNotification - Stack de notifications', () => {
  test('should stack multiple notifications', async ({ page }) => {
    await page.goto('/iframe.html?id=components-notification--all-types');

    // Les 4 notifications sont affichées automatiquement via play function
    await page.waitForTimeout(1000);

    const notifications = page.locator('.ds-notification');
    await expect(notifications).toHaveCount(4);
  });

  test('should respect maxStack limit', async ({ page }) => {
    await page.goto('/iframe.html?id=components-notification--limited-stack');

    // Cliquer plusieurs fois pour générer plus que maxStack (3)
    const button = page.locator('button:has-text("Info Notification")');

    for (let i = 0; i < 5; i++) {
      await button.click();
      await page.waitForTimeout(100);
    }

    const notifications = page.locator('.ds-notification');
    await expect(notifications).toHaveCount(3); // maxStack = 3
  });

  test('should close all notifications', async ({ page }) => {
    await page.goto('/iframe.html?id=components-notification--default');

    // Créer plusieurs notifications
    const infoButton = page.locator('button:has-text("Info Notification")');
    await infoButton.click();

    const successButton = page.locator('button:has-text("Success Notification")');
    await successButton.click();

    // Vérifier qu'il y a des notifications
    const notificationsBefore = page.locator('.ds-notification');
    await expect(notificationsBefore.first()).toBeVisible();

    // Tout fermer
    const closeAllButton = page.locator('button:has-text("Close All")');
    await closeAllButton.click();

    // Vérifier qu'il n'y a plus de notifications
    const notificationsAfter = page.locator('.ds-notification');
    await expect(notificationsAfter).toHaveCount(0);
  });
});

test.describe('DsNotification - Positions', () => {
  test('should position at top-right', async ({ page }) => {
    await page.goto('/iframe.html?id=components-notification--default');

    const container = page.locator('.ds-notification-container');
    await expect(container).toHaveClass(/ds-notification-container--topRight/);
  });

  test('should position at top-left', async ({ page }) => {
    await page.goto('/iframe.html?id=components-notification--top-left');

    const container = page.locator('.ds-notification-container');
    await expect(container).toHaveClass(/ds-notification-container--topLeft/);
  });

  test('should position at bottom-right', async ({ page }) => {
    await page.goto('/iframe.html?id=components-notification--bottom-right');

    const container = page.locator('.ds-notification-container');
    await expect(container).toHaveClass(/ds-notification-container--bottomRight/);
  });

  test('should position at bottom-left', async ({ page }) => {
    await page.goto('/iframe.html?id=components-notification--bottom-left');

    const container = page.locator('.ds-notification-container');
    await expect(container).toHaveClass(/ds-notification-container--bottomLeft/);
  });
});

test.describe('DsNotification - Navigation clavier', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-notification--persistent-notification');
  });

  test('should focus close button with Tab', async ({ page }) => {
    const button = page.locator('button:has-text("Notification Persistante")');
    await button.click();

    await page.keyboard.press('Tab');

    const closeButton = page.locator('.ds-notification__close');
    await expect(closeButton).toBeFocused();
  });

  test('should close notification with Enter on close button', async ({ page }) => {
    const button = page.locator('button:has-text("Notification Persistante")');
    await button.click();

    const closeButton = page.locator('.ds-notification__close');
    await closeButton.focus();
    await page.keyboard.press('Enter');

    const notification = page.locator('.ds-notification');
    await expect(notification).not.toBeVisible();
  });

  test('should navigate through action buttons with Tab', async ({ page }) => {
    await page.goto('/iframe.html?id=components-notification--with-actions');

    const button = page.locator('button:has-text("Notification avec Actions")');
    await button.click();

    // Tab vers close button
    await page.keyboard.press('Tab');
    const closeButton = page.locator('.ds-notification__close');
    await expect(closeButton).toBeFocused();

    // Tab vers premier bouton d'action
    await page.keyboard.press('Tab');
    const firstAction = page.locator('.ds-notification__action').first();
    await expect(firstAction).toBeFocused();

    // Tab vers second bouton d'action
    await page.keyboard.press('Tab');
    const secondAction = page.locator('.ds-notification__action').nth(1);
    await expect(secondAction).toBeFocused();
  });
});

test.describe('DsNotification - Accessibilité ARIA', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-notification--default');
  });

  test('should have role alert', async ({ page }) => {
    const button = page.locator('button:has-text("Info Notification")');
    await button.click();

    const notification = page.locator('.ds-notification');
    await expect(notification).toHaveAttribute('role', 'alert');
  });

  test('should have aria-live polite for info', async ({ page }) => {
    const button = page.locator('button:has-text("Info Notification")');
    await button.click();

    const notification = page.locator('.ds-notification');
    await expect(notification).toHaveAttribute('aria-live', 'polite');
  });

  test('should have aria-live assertive for error', async ({ page }) => {
    const button = page.locator('button:has-text("Error Notification")');
    await button.click();

    const notification = page.locator('.ds-notification--error');
    await expect(notification).toHaveAttribute('aria-live', 'assertive');
  });

  test('should have aria-atomic true', async ({ page }) => {
    const button = page.locator('button:has-text("Info Notification")');
    await button.click();

    const notification = page.locator('.ds-notification');
    await expect(notification).toHaveAttribute('aria-atomic', 'true');
  });

  test('should have aria-hidden on icon', async ({ page }) => {
    const button = page.locator('button:has-text("Info Notification")');
    await button.click();

    const icon = page.locator('.ds-notification__icon');
    await expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  test('should have aria-label on close button', async ({ page }) => {
    await page.goto('/iframe.html?id=components-notification--persistent-notification');

    const button = page.locator('button:has-text("Notification Persistante")');
    await button.click();

    const closeButton = page.locator('.ds-notification__close');
    await expect(closeButton).toHaveAttribute('aria-label', 'Fermer la notification');
  });
});

test.describe('DsNotification - Non fermable', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-notification--not-closable');
  });

  test('should not display close button when not closable', async ({ page }) => {
    const button = page.locator('button:has-text("Notification Non Fermable")');
    await button.click();

    const closeButton = page.locator('.ds-notification__close');
    await expect(closeButton).not.toBeVisible();
  });

  test('should still display notification content', async ({ page }) => {
    const button = page.locator('button:has-text("Notification Non Fermable")');
    await button.click();

    const title = page.locator('.ds-notification__title');
    await expect(title).toBeVisible();

    const message = page.locator('.ds-notification__message');
    await expect(message).toBeVisible();
  });
});

test.describe('DsNotification - Animation', () => {
  test('should animate notification entrance', async ({ page }) => {
    await page.goto('/iframe.html?id=components-notification--default');

    const button = page.locator('button:has-text("Info Notification")');
    await button.click();

    const wrapper = page.locator('.ds-notification-wrapper');
    await expect(wrapper).toBeVisible();
  });

  test('should stack notifications with proper spacing', async ({ page }) => {
    await page.goto('/iframe.html?id=components-notification--all-types');

    await page.waitForTimeout(1000);

    const wrappers = page.locator('.ds-notification-wrapper');
    await expect(wrappers).toHaveCount(4);

    // Vérifier que toutes les notifications sont visibles
    for (let i = 0; i < 4; i++) {
      await expect(wrappers.nth(i)).toBeVisible();
    }
  });
});
