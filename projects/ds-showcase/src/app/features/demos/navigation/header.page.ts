import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DsButton, DsAvatar } from 'ds-angular';

interface UsedComponent {
  id: string;
  label: string;
  path: string;
}

@Component({
  selector: 'demo-header-page',
  standalone: true,
  imports: [RouterLink, DsButton, DsAvatar],
  template: `
    <div class="demo-page">
      <header class="demo-header">
        <h1>Header</h1>
        <p class="demo-description">En-tête d'application avec navigation, recherche et profil utilisateur.</p>
      </header>

      <section class="demo-preview">
        <div class="demo-preview__container">
          <div class="header-demo">
            <div class="header-left">
              <span class="header-logo">MyApp</span>
              <nav class="header-nav">
                <a href="#" class="nav-link active">Accueil</a>
                <a href="#" class="nav-link">Produits</a>
                <a href="#" class="nav-link">À propos</a>
                <a href="#" class="nav-link">Contact</a>
              </nav>
            </div>
            <div class="header-right">
              <ds-button variant="ghost" size="sm">Rechercher</ds-button>
              <ds-avatar initials="JD" size="sm" />
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
    .demo-preview__container { display: flex; justify-content: center; }
    .header-demo {
      display: flex; justify-content: space-between; align-items: center; width: 100%;
      padding: 12px 24px; background: var(--doc-surface-elevated);
      border: 1px solid var(--doc-border-default); border-radius: 8px;
    }
    .header-left { display: flex; align-items: center; gap: 32px; }
    .header-logo { font-weight: 700; font-size: 1.25rem; }
    .header-nav { display: flex; gap: 24px; }
    .nav-link { color: var(--doc-text-secondary); text-decoration: none; font-size: 0.875rem; }
    .nav-link:hover, .nav-link.active { color: var(--doc-text-primary); }
    .header-right { display: flex; align-items: center; gap: 16px; }
    .demo-components h2 { font-size: 1.25rem; margin: 0 0 16px; }
    .component-list { display: flex; flex-wrap: wrap; gap: 8px; }
    .component-chip {
      padding: 4px 16px; background: var(--doc-surface-elevated); border: 1px solid var(--doc-border-default);
      border-radius: 9999px; color: var(--doc-text-primary); font-size: 0.875rem; text-decoration: none;
    }
    .component-chip:hover { border-color: var(--doc-accent-primary); color: var(--doc-accent-primary); }
  `]
})
export class HeaderDemoPage {
  usedComponents: UsedComponent[] = [
    { id: 'ds-button', label: 'Button', path: '/components/actions/ds-button' },
    { id: 'ds-avatar', label: 'Avatar', path: '/components/data-display/ds-avatar' },
    { id: 'ds-dropdown', label: 'Dropdown', path: '/components/overlays/ds-dropdown' },
  ];
}
