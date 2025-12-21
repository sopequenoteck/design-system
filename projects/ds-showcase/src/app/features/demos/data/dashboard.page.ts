import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DsCard, DsProgressBar, DsTable, DsBadge } from 'ds-angular';

interface UsedComponent {
  id: string;
  label: string;
  path: string;
}

@Component({
  selector: 'demo-dashboard-page',
  standalone: true,
  imports: [RouterLink, DsCard, DsProgressBar, DsBadge],
  template: `
    <div class="demo-page">
      <header class="demo-header">
        <h1>Dashboard</h1>
        <p class="demo-description">Tableau de bord avec métriques, graphiques et données.</p>
      </header>

      <section class="demo-preview">
        <div class="demo-preview__container">
          <div class="dashboard-demo">
            <div class="stats-row">
              <ds-card class="stat-card">
                <span class="stat-label">Utilisateurs</span>
                <span class="stat-value">12,453</span>
                <ds-badge type="success">+12%</ds-badge>
              </ds-card>
              <ds-card class="stat-card">
                <span class="stat-label">Revenus</span>
                <span class="stat-value">€45,231</span>
                <ds-badge type="success">+8%</ds-badge>
              </ds-card>
              <ds-card class="stat-card">
                <span class="stat-label">Commandes</span>
                <span class="stat-value">1,234</span>
                <ds-badge type="warning">-3%</ds-badge>
              </ds-card>
            </div>

            <ds-card class="progress-card">
              <h3>Objectifs mensuels</h3>
              <div class="progress-item">
                <span>Ventes</span>
                <ds-progress-bar [value]="75" />
              </div>
              <div class="progress-item">
                <span>Leads</span>
                <ds-progress-bar [value]="45" />
              </div>
              <div class="progress-item">
                <span>Support</span>
                <ds-progress-bar [value]="90" />
              </div>
            </ds-card>
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
    .demo-preview__container { display: flex; justify-content: center; width: 100%; }
    .dashboard-demo { width: 100%; display: flex; flex-direction: column; gap: 24px; }
    .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    .stat-card { padding: 20px; display: flex; flex-direction: column; gap: 8px; }
    .stat-label { font-size: 0.875rem; color: var(--doc-text-secondary); }
    .stat-value { font-size: 1.75rem; font-weight: 700; }
    .progress-card { padding: 24px; }
    .progress-card h3 { margin: 0 0 20px; font-size: 1.125rem; }
    .progress-item { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
    .progress-item span { font-size: 0.875rem; color: var(--doc-text-secondary); }
    .demo-components h2 { font-size: 1.25rem; margin: 0 0 16px; }
    .component-list { display: flex; flex-wrap: wrap; gap: 8px; }
    .component-chip {
      padding: 4px 16px; background: var(--doc-surface-elevated); border: 1px solid var(--doc-border-default);
      border-radius: 9999px; color: var(--doc-text-primary); font-size: 0.875rem; text-decoration: none;
    }
    .component-chip:hover { border-color: var(--doc-accent-primary); color: var(--doc-accent-primary); }
  `]
})
export class DashboardDemoPage {
  usedComponents: UsedComponent[] = [
    { id: 'ds-card', label: 'Card', path: '/components/data-display/ds-card' },
    { id: 'ds-badge', label: 'Badge', path: '/components/data-display/ds-badge' },
    { id: 'ds-progress-bar', label: 'Progress Bar', path: '/components/feedback/ds-progress-bar' },
  ];
}
