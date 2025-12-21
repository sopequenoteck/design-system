import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DsButton, DsAlert } from 'ds-angular';

interface UsedComponent {
  id: string;
  label: string;
  path: string;
}

@Component({
  selector: 'demo-notifications-page',
  standalone: true,
  imports: [RouterLink, DsButton, DsAlert],
  template: `
    <div class="demo-page">
      <header class="demo-header">
        <h1>Notifications</h1>
        <p class="demo-description">Différents types de notifications : toasts, alertes et notifications.</p>
      </header>

      <section class="demo-preview">
        <div class="demo-preview__container">
          <div class="notifications-demo">
            <div class="demo-section">
              <h3>Alertes inline</h3>
              <div class="alerts-stack">
                <ds-alert variant="info">Information : Votre session expire dans 5 minutes.</ds-alert>
                <ds-alert variant="success">Succès : Vos modifications ont été enregistrées.</ds-alert>
                <ds-alert variant="warning">Attention : Espace de stockage presque plein.</ds-alert>
                <ds-alert variant="danger">Erreur : Impossible de charger les données.</ds-alert>
              </div>
            </div>

            <div class="demo-section">
              <h3>Déclencher un toast</h3>
              <div class="buttons-row">
                <ds-button variant="primary" size="sm">Toast Info</ds-button>
                <ds-button variant="secondary" size="sm">Toast Success</ds-button>
                <ds-button variant="secondary" size="sm">Toast Warning</ds-button>
                <ds-button variant="error" size="sm">Toast Error</ds-button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-components">
        <h2>Composants utilisés</h2>
        <div class="component-list">
          @for (comp of usedComponents; track comp.id) {
            <a [routerLink]="comp.path" class="component-chip">{{ comp.label }}</a>
          }
        </div>
      </section>
    </div>
  `,
  styles: [`
    .demo-page { max-width: 1200px; margin: 0 auto; }
    .demo-header { margin-bottom: 32px; }
    .demo-header h1 { font-size: 2rem; font-weight: 700; margin: 0 0 8px; }
    .demo-description { font-size: 1.125rem; color: var(--doc-text-secondary); margin: 0; }
    .demo-preview { background: var(--doc-surface-sunken); border-radius: 12px; padding: 32px; margin-bottom: 32px; }
    .demo-preview__container { width: 100%; }
    .notifications-demo { display: flex; flex-direction: column; gap: 32px; }
    .demo-section h3 { margin: 0 0 16px; font-size: 1rem; font-weight: 600; }
    .alerts-stack { display: flex; flex-direction: column; gap: 12px; }
    .buttons-row { display: flex; gap: 12px; flex-wrap: wrap; }
    .demo-components h2 { font-size: 1.25rem; margin: 0 0 16px; }
    .component-list { display: flex; flex-wrap: wrap; gap: 8px; }
    .component-chip {
      padding: 4px 16px; background: var(--doc-surface-elevated); border: 1px solid var(--doc-border-default);
      border-radius: 9999px; color: var(--doc-text-primary); font-size: 0.875rem; text-decoration: none;
    }
    .component-chip:hover { border-color: var(--doc-accent-primary); color: var(--doc-accent-primary); }
  `]
})
export class NotificationsDemoPage {
  usedComponents: UsedComponent[] = [
    { id: 'ds-alert', label: 'Alert', path: '/components/feedback/ds-alert' },
    { id: 'ds-toast', label: 'Toast', path: '/components/feedback/ds-toast' },
    { id: 'ds-notification', label: 'Notification', path: '/components/feedback/ds-notification' },
    { id: 'ds-button', label: 'Button', path: '/components/actions/ds-button' },
  ];
}
