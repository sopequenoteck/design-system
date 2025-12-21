import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DsButton, DsSkeleton, DsProgressBar, DsCard } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { CodeSource } from '../../../registry/types';

interface UsedComponent {
  id: string;
  label: string;
  path: string;
}

@Component({
  selector: 'demo-loading-states-page',
  standalone: true,
  imports: [RouterLink, DsButton, DsSkeleton, DsProgressBar, DsCard, DemoContainer],
  template: `
    <div class="demo-page">
      <header class="demo-header">
        <h1>Loading States</h1>
        <p class="demo-description">Différents états de chargement : skeletons, progress bars et boutons loading.</p>
      </header>

      <section class="demo-section">
        <doc-demo-container [sources]="sources">
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
        </doc-demo-container>
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
    .demo-section { margin-bottom: 32px; }
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

  sources: CodeSource[] = [
    {
      language: 'html',
      filename: 'loading-demo.component.html',
      content: `<!-- Skeleton loading pour une carte -->
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

<!-- Progress indicators -->
<div class="progress-stack">
  <div class="progress-item">
    <span>Téléchargement...</span>
    <ds-progress-bar [value]="downloadProgress" />
  </div>
  <div class="progress-item">
    <span>Installation...</span>
    <ds-progress-bar [value]="installProgress" variant="success" />
  </div>
</div>

<!-- Button loading states -->
<div class="buttons-row">
  <ds-button variant="primary" [loading]="isSaving" (click)="save()">
    {{ isSaving ? 'Enregistrement...' : 'Enregistrer' }}
  </ds-button>
  <ds-button variant="secondary" [loading]="isLoading" (click)="load()">
    {{ isLoading ? 'Chargement...' : 'Charger plus' }}
  </ds-button>
</div>`
    },
    {
      language: 'typescript',
      filename: 'loading-demo.component.ts',
      content: `import { Component, signal } from '@angular/core';
import { DsButton, DsSkeleton, DsProgressBar, DsCard } from 'ds-angular';

@Component({
  selector: 'app-loading-demo',
  standalone: true,
  imports: [DsButton, DsSkeleton, DsProgressBar, DsCard],
  templateUrl: './loading-demo.component.html',
  styleUrl: './loading-demo.component.scss'
})
export class LoadingDemoComponent {
  downloadProgress = signal(65);
  installProgress = signal(30);
  isSaving = signal(false);
  isLoading = signal(false);

  async save() {
    this.isSaving.set(true);
    await this.delay(2000);
    this.isSaving.set(false);
  }

  async load() {
    this.isLoading.set(true);
    await this.delay(1500);
    this.isLoading.set(false);
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}`
    },
    {
      language: 'scss',
      filename: 'loading-demo.component.scss',
      content: `.skeleton-card {
  padding: var(--space-5);
  max-width: 320px;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.skeleton-header {
  display: flex;
  gap: var(--space-3);
}

.skeleton-text {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.progress-stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  max-width: 400px;
}

.progress-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);

  span {
    font-size: 0.875rem;
    color: var(--text-secondary);
  }
}

.buttons-row {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}`
    }
  ];
}
