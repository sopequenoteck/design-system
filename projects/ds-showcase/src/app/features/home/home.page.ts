import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ComponentRegistry } from '../../registry/component.registry';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="home-page">
      <header class="home-header">
        <h1 class="home-title">DS Showcase</h1>
        <p class="home-subtitle">
          Documentation interactive du Design System Angular
        </p>
      </header>

      <section class="home-section">
        <h2>Démarrage rapide</h2>
        <div class="quick-start">
          <div class="quick-start__step">
            <span class="quick-start__number">1</span>
            <div>
              <h3>Installation</h3>
              <code>npm install &#64;kksdev/ds-angular</code>
            </div>
          </div>
          <div class="quick-start__step">
            <span class="quick-start__number">2</span>
            <div>
              <h3>Import des styles</h3>
              <code>&#64;import 'ds-angular/styles';</code>
            </div>
          </div>
          <div class="quick-start__step">
            <span class="quick-start__number">3</span>
            <div>
              <h3>Utilisation</h3>
              <code>&lt;ds-button&gt;Click me&lt;/ds-button&gt;</code>
            </div>
          </div>
        </div>
      </section>

      <section class="home-section">
        <h2>Composants populaires</h2>
        <div class="component-grid">
          @for (component of popularComponents; track component.id) {
            <a
              class="component-card"
              [routerLink]="['/components', component.category, component.id]"
            >
              <h3 class="component-card__title">{{ component.name }}</h3>
              <p class="component-card__desc">{{ component.description }}</p>
            </a>
          }
        </div>
      </section>

      <section class="home-section">
        <h2>Statistiques</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-card__value">{{ stats.components }}</span>
            <span class="stat-card__label">Composants</span>
          </div>
          <div class="stat-card">
            <span class="stat-card__value">{{ stats.primitives }}</span>
            <span class="stat-card__label">Primitives</span>
          </div>
          <div class="stat-card">
            <span class="stat-card__value">{{ stats.themes }}</span>
            <span class="stat-card__label">Thèmes</span>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-page {
      max-width: 900px;
      margin: 0 auto;
    }

    .home-header {
      text-align: center;
      margin-bottom: 48px;
    }

    .home-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--text-default, #1a1a1a);
      margin: 0 0 8px 0;
    }

    .home-subtitle {
      font-size: 1.125rem;
      color: var(--text-muted, #6b7280);
      margin: 0;
    }

    .home-section {
      margin-bottom: 48px;

      h2 {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-default, #1a1a1a);
        margin: 0 0 24px 0;
      }
    }

    // ==========================================================================
    // Quick start
    // ==========================================================================
    .quick-start {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .quick-start__step {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 16px;
      background: var(--background-panel, #ffffff);
      border: 1px solid var(--border-default, #e5e7eb);
      border-radius: var(--radius-2, 8px);

      h3 {
        margin: 0 0 8px 0;
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--text-default, #374151);
      }

      code {
        font-family: var(--doc-code-font, monospace);
        font-size: 0.875rem;
        color: var(--color-primary, #3b82f6);
        background: var(--color-primary-light, #eff6ff);
        padding: 4px 8px;
        border-radius: 4px;
      }
    }

    .quick-start__number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: var(--color-primary, #3b82f6);
      color: white;
      border-radius: 50%;
      font-weight: 600;
      font-size: 0.875rem;
      flex-shrink: 0;
    }

    // ==========================================================================
    // Component grid
    // ==========================================================================
    .component-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 16px;
    }

    .component-card {
      padding: 20px;
      background: var(--background-panel, #ffffff);
      border: 1px solid var(--border-default, #e5e7eb);
      border-radius: var(--radius-2, 8px);
      text-decoration: none;
      transition: all 0.15s ease;

      &:hover {
        border-color: var(--color-primary, #3b82f6);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      }
    }

    .component-card__title {
      margin: 0 0 8px 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-default, #1a1a1a);
    }

    .component-card__desc {
      margin: 0;
      font-size: 0.875rem;
      color: var(--text-muted, #6b7280);
      line-height: 1.5;
    }

    // ==========================================================================
    // Stats
    // ==========================================================================
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    .stat-card {
      padding: 24px;
      background: var(--background-panel, #ffffff);
      border: 1px solid var(--border-default, #e5e7eb);
      border-radius: var(--radius-2, 8px);
      text-align: center;
    }

    .stat-card__value {
      display: block;
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-primary, #3b82f6);
    }

    .stat-card__label {
      display: block;
      margin-top: 4px;
      font-size: 0.875rem;
      color: var(--text-muted, #6b7280);
    }
  `]
})
export class HomePage {
  private registry = inject(ComponentRegistry);

  popularComponents = [
    { id: 'ds-button', name: 'Button', category: 'actions', description: 'Bouton d\'action avec variantes et états.' },
    { id: 'ds-input-field', name: 'Input Field', category: 'forms', description: 'Champ de saisie avec label et validation.' },
    { id: 'ds-modal', name: 'Modal', category: 'overlays', description: 'Fenêtre modale avec overlay et animations.' },
    { id: 'ds-select', name: 'Select', category: 'forms', description: 'Liste déroulante avec recherche et options.' },
    { id: 'ds-tabs', name: 'Tabs', category: 'navigation', description: 'Navigation par onglets accessible.' },
  ];

  stats = {
    components: 53,
    primitives: 7,
    themes: 3,
  };
}
