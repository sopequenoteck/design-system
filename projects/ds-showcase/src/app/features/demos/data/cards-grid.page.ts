import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DsCard, DsButton, DsBadge, DsAvatar } from 'ds-angular';

interface UsedComponent {
  id: string;
  label: string;
  path: string;
}

@Component({
  selector: 'demo-cards-grid-page',
  standalone: true,
  imports: [RouterLink, DsCard, DsButton, DsBadge, DsAvatar],
  template: `
    <div class="demo-page">
      <header class="demo-header">
        <h1>Cards Grid</h1>
        <p class="demo-description">Grille de cartes pour afficher des produits, projets ou profils.</p>
      </header>

      <section class="demo-preview">
        <div class="demo-preview__container">
          <div class="cards-grid">
            @for (item of items; track item.id) {
              <ds-card class="grid-card">
                <div class="card-header">
                  <ds-avatar [initials]="item.initials" size="md" />
                  <ds-badge [type]="item.badgeType">{{ item.status }}</ds-badge>
                </div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
                <div class="card-actions">
                  <ds-button variant="ghost" size="sm">Voir</ds-button>
                  <ds-button variant="primary" size="sm">Contacter</ds-button>
                </div>
              </ds-card>
            }
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
    .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
    .grid-card { padding: 20px; }
    .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
    .grid-card h3 { margin: 0 0 8px; font-size: 1.125rem; }
    .grid-card p { margin: 0 0 16px; font-size: 0.875rem; color: var(--doc-text-secondary); }
    .card-actions { display: flex; gap: 8px; }
    .demo-components h2 { font-size: 1.25rem; margin: 0 0 16px; }
    .component-list { display: flex; flex-wrap: wrap; gap: 8px; }
    .component-chip {
      padding: 4px 16px; background: var(--doc-surface-elevated); border: 1px solid var(--doc-border-default);
      border-radius: 9999px; color: var(--doc-text-primary); font-size: 0.875rem; text-decoration: none;
    }
    .component-chip:hover { border-color: var(--doc-accent-primary); color: var(--doc-accent-primary); }
  `]
})
export class CardsGridDemoPage {
  items = [
    { id: 1, title: 'Marie Curie', initials: 'MC', description: 'Développeuse Frontend Senior', status: 'Disponible', badgeType: 'success' as const },
    { id: 2, title: 'Jean Dupont', initials: 'JD', description: 'Designer UX/UI', status: 'En mission', badgeType: 'warning' as const },
    { id: 3, title: 'Sophie Martin', initials: 'SM', description: 'Chef de projet', status: 'Disponible', badgeType: 'success' as const },
    { id: 4, title: 'Pierre Durand', initials: 'PD', description: 'Développeur Backend', status: 'Indisponible', badgeType: 'error' as const },
  ];
  usedComponents: UsedComponent[] = [
    { id: 'ds-card', label: 'Card', path: '/components/data-display/ds-card' },
    { id: 'ds-avatar', label: 'Avatar', path: '/components/data-display/ds-avatar' },
    { id: 'ds-badge', label: 'Badge', path: '/components/data-display/ds-badge' },
    { id: 'ds-button', label: 'Button', path: '/components/actions/ds-button' },
  ];
}
