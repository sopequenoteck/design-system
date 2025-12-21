import { Component, signal, computed, inject } from '@angular/core';
import { DsNotificationContainerComponent, DsNotificationService } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsNotificationDefinition } from '../../../registry/definitions/ds-notification.definition';
import { ControlValues } from '../../../registry/types';

import { UsedInSection } from '../../../shared/used-in/used-in-section';
type NotificationType = 'info' | 'success' | 'warning' | 'error';

@Component({
  selector: 'app-notification-page',
  standalone: true,
  imports: [DsNotificationContainerComponent, DemoContainer, PropsTable, UsedInSection],
  template: `
    <div class="component-page">
      <header class="component-header">
        <div class="component-header__meta">
          <span class="component-badge">{{ definition.category }}</span>
        </div>
        <h1 class="component-title">{{ definition.name }}</h1>
        <p class="component-desc">{{ definition.description }}</p>
        <code class="component-selector">&lt;{{ definition.selector }}&gt;</code>
      </header>

      <section class="component-section">
        <h2>Exemples</h2>

        <div class="demo-block">
          <h3 class="demo-block__title">Default</h3>
          <p class="demo-block__desc">Notification via le service.</p>
          <doc-demo-container
            [sources]="definition.demos[0].sources ?? []"
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <button class="demo-btn" (click)="showNotification()">
              Afficher une notification
            </button>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">All Types</h3>
          <p class="demo-block__desc">Les 4 types de notification.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <div class="demo-row">
              <button class="demo-btn demo-btn--success" (click)="showType('success')">Success</button>
              <button class="demo-btn demo-btn--warning" (click)="showType('warning')">Warning</button>
              <button class="demo-btn demo-btn--error" (click)="showType('error')">Error</button>
              <button class="demo-btn demo-btn--info" (click)="showType('info')">Info</button>
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Persistent</h3>
          <p class="demo-block__desc">Notification persistante (duration: 0).</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <button class="demo-btn" (click)="showPersistent()">
              Notification persistante
            </button>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Actions</h3>
          <p class="demo-block__desc">Notification avec boutons d'action.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <button class="demo-btn" (click)="showWithActions()">
              Notification avec actions
            </button>
          </doc-demo-container>
        </div>
      </section>

      <section class="component-section">
        <h2>API Reference</h2>
        <doc-props-table [props]="definition.props" />
      </section>

      <!-- Utilisé dans -->
      <doc-used-in-section [componentId]="definition.id" />
    </div>

    <ds-notification-container />
  `,
  styles: [`
    .component-page { max-width: 900px; }
    .component-header { margin-bottom: 48px; }
    .component-header__meta { margin-bottom: 12px; }
    .component-badge {
      display: inline-block; padding: 4px 10px; font-size: 0.75rem; font-weight: 500;
      text-transform: uppercase; letter-spacing: 0.05em;
      background: var(--color-primary-light, #eff6ff); color: var(--color-primary, #3b82f6); border-radius: 4px;
    }
    .component-title { margin: 0 0 12px 0; font-size: 2rem; font-weight: 700; color: var(--text-default, #1a1a1a); }
    .component-desc { margin: 0 0 16px 0; font-size: 1.125rem; color: var(--text-muted, #6b7280); line-height: 1.6; }
    .component-selector {
      display: inline-block; padding: 6px 12px; font-family: var(--doc-code-font, monospace); font-size: 0.875rem;
      background: var(--background-secondary, #f3f4f6); color: var(--text-default, #374151); border-radius: 4px;
    }
    .component-section {
      margin-bottom: 48px;
      h2 { font-size: 1.25rem; font-weight: 600; color: var(--text-default, #1a1a1a); margin: 0 0 24px 0; padding-bottom: 12px; border-bottom: 1px solid var(--border-default, #e5e7eb); }
    }
    .demo-block { margin-bottom: 32px; }
    .demo-block__title { margin: 0 0 8px 0; font-size: 1rem; font-weight: 600; color: var(--text-default, #1a1a1a); }
    .demo-block__desc { margin: 0 0 16px 0; font-size: 0.875rem; color: var(--text-muted, #6b7280); }
    .demo-row { display: flex; gap: 8px; flex-wrap: wrap; }
    .demo-btn {
      padding: 8px 16px; border: none; border-radius: 4px;
      background: var(--color-primary, #3b82f6); color: white; cursor: pointer;
      font-size: 0.875rem;
      &:hover { opacity: 0.9; }
    }
    .demo-btn--success { background: var(--success, #22c55e); }
    .demo-btn--warning { background: var(--warning, #f59e0b); }
    .demo-btn--error { background: var(--error, #ef4444); }
    .demo-btn--info { background: var(--info, #3b82f6); }
  `]
})
export class NotificationPage {
  definition = DsNotificationDefinition;
  private notificationService = inject(DsNotificationService);

  defaultValues = signal<ControlValues>({
    type: 'info',
    duration: 4500,
  });

  demoType = computed(() => this.defaultValues()['type'] as NotificationType);
  demoDuration = computed(() => this.defaultValues()['duration'] as number);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  showNotification(): void {
    this.notificationService.open({
      title: 'Notification',
      message: 'Ceci est un message de notification.',
      type: this.demoType(),
      duration: this.demoDuration(),
    });
  }

  showType(type: NotificationType): void {
    const messages = {
      success: { title: 'Succès', message: 'Opération réussie !' },
      warning: { title: 'Attention', message: 'Vérifiez vos données.' },
      error: { title: 'Erreur', message: 'Une erreur est survenue.' },
      info: { title: 'Information', message: 'Information importante.' },
    };
    this.notificationService.open({
      ...messages[type],
      type,
    });
  }

  showPersistent(): void {
    this.notificationService.open({
      title: 'Action requise',
      message: 'Veuillez confirmer votre email.',
      type: 'warning',
      duration: 0,
      closable: true,
    });
  }

  showWithActions(): void {
    this.notificationService.open({
      title: 'Mise à jour disponible',
      message: 'Une nouvelle version est disponible.',
      type: 'info',
      actions: [
        { label: 'Mettre à jour', handler: () => console.log('Update'), variant: 'primary' },
        { label: 'Plus tard', handler: () => console.log('Dismiss'), variant: 'ghost' },
      ],
    });
  }
}
