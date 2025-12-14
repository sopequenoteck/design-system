import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { Component, inject } from '@angular/core';
import { DsToastContainerComponent } from './ds-toast-container.component';
import { DsToastService, ToastType, ToastPosition } from './ds-toast.service';
import { DsButton } from '../ds-button/ds-button';

// Helper component for stories
@Component({
  selector: 'toast-demo',
  standalone: true,
  imports: [DsButton, DsToastContainerComponent],
  template: `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <ds-button variant="success" (clicked)="showToast('success')">Success</ds-button>
        <ds-button variant="warning" (clicked)="showToast('warning')">Warning</ds-button>
        <ds-button variant="error" (clicked)="showToast('error')">Error</ds-button>
        <ds-button variant="info" (clicked)="showToast('info')">Info</ds-button>
      </div>
      <ds-toast-container></ds-toast-container>
    </div>
  `,
})
class ToastDemoComponent {
  private toastService = inject(DsToastService);

  showToast(type: ToastType) {
    const messages: Record<ToastType, string> = {
      success: 'Opération réussie !',
      warning: 'Attention, vérifiez les données.',
      error: 'Une erreur s\'est produite.',
      info: 'Information importante.',
    };
    this.toastService.show({ message: messages[type], type });
  }
}

@Component({
  selector: 'toast-positions-demo',
  standalone: true,
  imports: [DsButton, DsToastContainerComponent],
  template: `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <ds-button (clicked)="showAt('top-left')">Top Left</ds-button>
        <ds-button (clicked)="showAt('top-right')">Top Right</ds-button>
        <ds-button (clicked)="showAt('bottom-left')">Bottom Left</ds-button>
        <ds-button (clicked)="showAt('bottom-right')">Bottom Right</ds-button>
      </div>
      <ds-toast-container></ds-toast-container>
    </div>
  `,
})
class ToastPositionsDemoComponent {
  private toastService = inject(DsToastService);

  showAt(position: ToastPosition) {
    this.toastService.show({
      message: `Toast en position ${position}`,
      type: 'info',
      position,
    });
  }
}

@Component({
  selector: 'toast-action-demo',
  standalone: true,
  imports: [DsButton, DsToastContainerComponent],
  template: `
    <div>
      <ds-button (clicked)="showWithAction()">Toast avec action</ds-button>
      <ds-toast-container></ds-toast-container>
    </div>
  `,
})
class ToastActionDemoComponent {
  private toastService = inject(DsToastService);

  showWithAction() {
    this.toastService.show({
      message: 'Élément supprimé',
      type: 'info',
      actionLabel: 'Annuler',
      onAction: () => {
        this.toastService.show({ message: 'Suppression annulée', type: 'success' });
      },
      duration: 5000,
    });
  }
}

@Component({
  selector: 'toast-persistent-demo',
  standalone: true,
  imports: [DsButton, DsToastContainerComponent],
  template: `
    <div style="display: flex; gap: 8px;">
      <ds-button (clicked)="showPersistent()">Toast persistant</ds-button>
      <ds-button variant="secondary" (clicked)="clearAll()">Fermer tout</ds-button>
      <ds-toast-container></ds-toast-container>
    </div>
  `,
})
class ToastPersistentDemoComponent {
  private toastService = inject(DsToastService);

  showPersistent() {
    this.toastService.show({
      message: 'Ce toast reste affiché jusqu\'à fermeture manuelle',
      type: 'warning',
      duration: 0, // Persistant
      closable: true,
    });
  }

  clearAll() {
    this.toastService.clear();
  }
}

const meta: Meta = {
  title: 'Feedback/Toast',
  decorators: [
    moduleMetadata({
      imports: [ToastDemoComponent, ToastPositionsDemoComponent, ToastActionDemoComponent, ToastPersistentDemoComponent],
    }),
  ],
  argTypes: {
    // Events/Actions
    closed: {
      action: 'closed',
      description: 'Émis lorsqu\'un toast est fermé (manuellement ou automatiquement)',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<void>' },
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Toasts avec les 4 types de feedback : success (action réussie), warning (attention requise), error (échec), info (information neutre).',
      },
    },
  },
  render: () => ({
    template: `<toast-demo></toast-demo>`,
  }),
};

export const Positions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Les 4 positions disponibles : top-left, top-right, bottom-left, bottom-right. Choisissez selon votre layout.',
      },
    },
  },
  render: () => ({
    template: `<toast-positions-demo></toast-positions-demo>`,
  }),
};

export const WithAction: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Toast avec bouton d\'action. Idéal pour les actions réversibles (ex: "Annuler" après suppression).',
      },
    },
  },
  render: () => ({
    template: `<toast-action-demo></toast-action-demo>`,
  }),
};

export const Persistent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Toast persistant (duration: 0) qui reste affiché jusqu\'à fermeture manuelle. Pour les messages critiques.',
      },
    },
  },
  render: () => ({
    template: `<toast-persistent-demo></toast-persistent-demo>`,
  }),
};

export const Themed: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div class="theme-light" style="padding: 24px; background: var(--background-main); border-radius: 8px; position: relative;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Light</h4>
          <ds-toast-container></ds-toast-container>
        </div>
        <div class="theme-dark" style="padding: 24px; background: var(--background-main); border-radius: 8px; position: relative;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Dark</h4>
          <ds-toast-container></ds-toast-container>
        </div>
        <div class="theme-custom" style="padding: 24px; background: var(--background-main); border-radius: 8px; position: relative;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Custom</h4>
          <ds-toast-container></ds-toast-container>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Affiche le composant dans les 3 thèmes (Light, Dark, Custom) pour vérifier la thématisation.',
      },
    },
  },
};
