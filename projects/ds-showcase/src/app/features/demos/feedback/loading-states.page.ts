import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DsButton, DsSkeleton, DsProgressBar, DsCard } from 'ds-angular';

interface UsedComponent {
  id: string;
  label: string;
  path: string;
}

@Component({
  selector: 'demo-loading-states-page',
  standalone: true,
  imports: [RouterLink, DsButton, DsSkeleton, DsProgressBar, DsCard],
  template: `
    <div class="demo-page">
      <header class="demo-header">
        <h1>Loading States</h1>
        <p class="demo-description">Différents états de chargement : skeletons, progress bars et boutons loading.</p>
      </header>

      <section class="demo-preview">
        <div class="demo-preview__container">
          <div class="loading-demo">
            <div class="demo-section">
              <h3>Skeleton loading</h3>
              <ds-card class="skeleton-card">
                <div class="skeleton-header">
                  <ds-skeleton variant="circle" width="48px" height="48px" />
                  <div class="skeleton-text">
                    <ds-skeleton width="120px" height="16px" />
                    <ds-skeleton width="80px" height="12px" />
                  </div>
                </div>
                <ds-skeleton height="100px" />
                <ds-skeleton width="60%" height="14px" />
              </ds-card>
            </div>

            <div class="demo-section">
              <h3>Progress indicators</h3>
              <div class="progress-stack">
                <div class="progress-item">
                  <span>Téléchargement...</span>
                  <ds-progress-bar [value]="65" />
                </div>
                <div class="progress-item">
                  <span>Installation...</span>
                  <ds-progress-bar [value]="30" variant="default" />
                </div>
              </div>
            </div>

            <div class="demo-section">
              <h3>Button loading states</h3>
              <div class="buttons-row">
                <ds-button variant="primary" [loading]="true">Enregistrement...</ds-button>
                <ds-button variant="secondary" [loading]="true">Chargement...</ds-button>
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
    .loading-demo { display: flex; flex-direction: column; gap: 32px; }
    .demo-section h3 { margin: 0 0 16px; font-size: 1rem; font-weight: 600; }
    .skeleton-card { padding: 20px; max-width: 320px; display: flex; flex-direction: column; gap: 16px; }
    .skeleton-header { display: flex; gap: 12px; }
    .skeleton-text { display: flex; flex-direction: column; gap: 8px; }
    .progress-stack { display: flex; flex-direction: column; gap: 16px; max-width: 400px; }
    .progress-item { display: flex; flex-direction: column; gap: 8px; }
    .progress-item span { font-size: 0.875rem; color: var(--doc-text-secondary); }
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
export class LoadingStatesDemoPage {
  usedComponents: UsedComponent[] = [
    { id: 'ds-skeleton', label: 'Skeleton', path: '/components/feedback/ds-skeleton' },
    { id: 'ds-progress-bar', label: 'Progress Bar', path: '/components/feedback/ds-progress-bar' },
    { id: 'ds-button', label: 'Button', path: '/components/actions/ds-button' },
    { id: 'ds-card', label: 'Card', path: '/components/data-display/ds-card' },
  ];
}
