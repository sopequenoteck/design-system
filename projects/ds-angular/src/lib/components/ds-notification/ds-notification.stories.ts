import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { DsNotificationContainerComponent } from './ds-notification-container.component';
import { DsNotificationService } from './ds-notification.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'notification-demo',
  standalone: true,
  imports: [CommonModule, DsNotificationContainerComponent],
  template: `
    <div style="padding: 20px;">
      <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px;">
        <button (click)="openInfo()" class="demo-btn demo-btn--primary">
          Info Notification
        </button>
        <button (click)="openSuccess()" class="demo-btn demo-btn--success">
          Success Notification
        </button>
        <button (click)="openWarning()" class="demo-btn demo-btn--warning">
          Warning Notification
        </button>
        <button (click)="openError()" class="demo-btn demo-btn--error">
          Error Notification
        </button>
        <button (click)="openWithActions()" class="demo-btn">
          With Actions
        </button>
        <button (click)="openPersistent()" class="demo-btn">
          Persistent
        </button>
        <button (click)="closeAll()" class="demo-btn demo-btn--ghost">
          Close All
        </button>
      </div>

      <ds-notification-container [placement]="placement" [maxStack]="maxStack" />
    </div>
  `,
  styles: [`
    .demo-btn {
      padding: 8px 16px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      background: white;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
    }
    .demo-btn:hover {
      background: #f3f4f6;
    }
    .demo-btn--primary {
      background: #3b82f6;
      color: white;
      border-color: #3b82f6;
    }
    .demo-btn--primary:hover {
      background: #2563eb;
    }
    .demo-btn--success {
      background: #10b981;
      color: white;
      border-color: #10b981;
    }
    .demo-btn--success:hover {
      background: #059669;
    }
    .demo-btn--warning {
      background: #f59e0b;
      color: white;
      border-color: #f59e0b;
    }
    .demo-btn--warning:hover {
      background: #d97706;
    }
    .demo-btn--error {
      background: #ef4444;
      color: white;
      border-color: #ef4444;
    }
    .demo-btn--error:hover {
      background: #dc2626;
    }
    .demo-btn--ghost {
      background: transparent;
      color: #6b7280;
    }
    .demo-btn--ghost:hover {
      background: #f3f4f6;
    }
  `]
})
class NotificationDemoComponent {
  placement: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft' = 'topRight';
  maxStack = 5;

  constructor(private notificationService: DsNotificationService) {}

  openInfo() {
    this.notificationService.info(
      'Information',
      'Ceci est une notification informative.'
    );
  }

  openSuccess() {
    this.notificationService.success(
      'Succès',
      'Opération effectuée avec succès !'
    );
  }

  openWarning() {
    this.notificationService.warning(
      'Attention',
      'Cette action nécessite votre attention.'
    );
  }

  openError() {
    this.notificationService.error(
      'Erreur',
      'Une erreur est survenue lors du traitement.'
    );
  }

  openWithActions() {
    this.notificationService.open({
      title: 'Confirmation requise',
      message: 'Voulez-vous vraiment effectuer cette action ?',
      type: 'warning',
      duration: 0,
      actions: [
        {
          label: 'Confirmer',
          variant: 'primary',
          handler: () => {
            console.log('Confirmed');
            this.notificationService.success('Confirmé', 'Action confirmée avec succès.');
          }
        },
        {
          label: 'Annuler',
          variant: 'ghost',
          handler: () => {
            console.log('Cancelled');
          }
        }
      ]
    });
  }

  openPersistent() {
    this.notificationService.open({
      title: 'Notification persistante',
      message: 'Cette notification ne se fermera pas automatiquement.',
      type: 'info',
      duration: 0
    });
  }

  closeAll() {
    this.notificationService.closeAll();
  }
}

const meta: Meta<NotificationDemoComponent> = {
  title: 'Feedback/Notification',
  component: NotificationDemoComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, DsNotificationContainerComponent]
    })
  ],
  argTypes: {
    placement: {
      control: 'select',
      options: ['topRight', 'topLeft', 'bottomRight', 'bottomLeft'],
      description: 'Position du container de notifications'
    },
    maxStack: {
      control: 'number',
      description: 'Nombre maximum de notifications affichées'
    }
  }
};

export default meta;
type Story = StoryObj<NotificationDemoComponent>;

export const Default: Story = {
  args: {
    placement: 'topRight',
    maxStack: 5
  }
};

export const TopLeft: Story = {
  args: {
    placement: 'topLeft',
    maxStack: 5
  }
};

export const BottomRight: Story = {
  args: {
    placement: 'bottomRight',
    maxStack: 5
  }
};

export const BottomLeft: Story = {
  args: {
    placement: 'bottomLeft',
    maxStack: 5
  }
};

export const LimitedStack: Story = {
  args: {
    placement: 'topRight',
    maxStack: 3
  }
};

export const AllTypes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 20px;">
        <button (click)="openAllTypes()" class="demo-btn demo-btn--primary">
          Show All Types
        </button>
        <ds-notification-container [placement]="placement" [maxStack]="maxStack" />
      </div>
    `,
    styles: [`
      .demo-btn {
        padding: 8px 16px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        background: white;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s;
      }
      .demo-btn--primary {
        background: #3b82f6;
        color: white;
        border-color: #3b82f6;
      }
      .demo-btn--primary:hover {
        background: #2563eb;
      }
    `],
    moduleMetadata: {
      imports: [CommonModule, DsNotificationContainerComponent]
    }
  }),
  play: async ({ canvasElement }) => {
    const service = (canvasElement as any).ownerDocument.defaultView.injector?.get(DsNotificationService);
    if (service) {
      service.info('Information', 'Ceci est une notification informative.', { duration: 0 });
      setTimeout(() => {
        service.success('Succès', 'Opération effectuée avec succès !', { duration: 0 });
      }, 200);
      setTimeout(() => {
        service.warning('Attention', 'Cette action nécessite votre attention.', { duration: 0 });
      }, 400);
      setTimeout(() => {
        service.error('Erreur', 'Une erreur est survenue.', { duration: 0 });
      }, 600);
    }
  }
};

export const WithActions: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 20px;">
        <button (click)="openActionNotification()" class="demo-btn demo-btn--primary">
          Notification avec Actions
        </button>
        <ds-notification-container [placement]="placement" />
      </div>
    `,
    styles: [`
      .demo-btn {
        padding: 8px 16px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        background: #3b82f6;
        color: white;
        border-color: #3b82f6;
      }
    `],
    moduleMetadata: {
      imports: [CommonModule, DsNotificationContainerComponent]
    }
  })
};

export const PersistentNotification: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 20px;">
        <p style="margin-bottom: 12px; color: #6b7280;">
          Cette notification ne se fermera pas automatiquement (duration: 0)
        </p>
        <button (click)="openPersistent()" class="demo-btn demo-btn--primary">
          Notification Persistante
        </button>
        <ds-notification-container [placement]="placement" />
      </div>
    `,
    styles: [`
      .demo-btn {
        padding: 8px 16px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        background: #3b82f6;
        color: white;
      }
    `],
    moduleMetadata: {
      imports: [CommonModule, DsNotificationContainerComponent]
    }
  })
};

export const AutoDismiss: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 20px;">
        <p style="margin-bottom: 12px; color: #6b7280;">
          Ces notifications se ferment automatiquement après 2 secondes
        </p>
        <button (click)="openAutoDismiss()" class="demo-btn demo-btn--primary">
          Notification Auto-dismiss
        </button>
        <ds-notification-container [placement]="placement" />
      </div>
    `,
    styles: [`
      .demo-btn {
        padding: 8px 16px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        background: #3b82f6;
        color: white;
      }
    `],
    moduleMetadata: {
      imports: [CommonModule, DsNotificationContainerComponent]
    }
  })
};

export const NotClosable: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 20px;">
        <p style="margin-bottom: 12px; color: #6b7280;">
          Ces notifications ne peuvent pas être fermées manuellement
        </p>
        <button (click)="openNotClosable()" class="demo-btn demo-btn--primary">
          Notification Non Fermable
        </button>
        <ds-notification-container [placement]="placement" />
      </div>
    `,
    styles: [`
      .demo-btn {
        padding: 8px 16px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        background: #3b82f6;
        color: white;
      }
    `],
    moduleMetadata: {
      imports: [CommonModule, DsNotificationContainerComponent]
    }
  })
};

export const MultipleActions: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 20px;">
        <button (click)="openMultipleActions()" class="demo-btn demo-btn--primary">
          Notification avec 3 Actions
        </button>
        <ds-notification-container [placement]="placement" />
      </div>
    `,
    styles: [`
      .demo-btn {
        padding: 8px 16px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        background: #3b82f6;
        color: white;
      }
    `],
    moduleMetadata: {
      imports: [CommonModule, DsNotificationContainerComponent]
    }
  })
};

export const RealWorldExample: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 20px;">
        <h3 style="margin-bottom: 16px;">Simulateur d'opérations</h3>
        <div style="display: flex; gap: 12px; margin-bottom: 20px;">
          <button (click)="simulateUpload()" class="demo-btn demo-btn--primary">
            Uploader un fichier
          </button>
          <button (click)="simulateDelete()" class="demo-btn demo-btn--error">
            Supprimer élément
          </button>
          <button (click)="simulateUpdate()" class="demo-btn demo-btn--success">
            Mettre à jour
          </button>
        </div>
        <ds-notification-container placement="topRight" />
      </div>
    `,
    styles: [`
      .demo-btn {
        padding: 8px 16px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        background: white;
        transition: all 0.2s;
      }
      .demo-btn--primary {
        background: #3b82f6;
        color: white;
        border-color: #3b82f6;
      }
      .demo-btn--error {
        background: #ef4444;
        color: white;
        border-color: #ef4444;
      }
      .demo-btn--success {
        background: #10b981;
        color: white;
        border-color: #10b981;
      }
    `],
    moduleMetadata: {
      imports: [CommonModule, DsNotificationContainerComponent]
    }
  })
};
