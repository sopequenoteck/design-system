import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DsButton, DsAvatar } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { CodeSource } from '../../../registry/types';

interface UsedComponent {
  id: string;
  label: string;
  path: string;
}

@Component({
  selector: 'demo-header-page',
  standalone: true,
  imports: [RouterLink, DsButton, DsAvatar, DemoContainer],
  template: `
    <div class="demo-page">
      <header class="demo-header">
        <h1>Header</h1>
        <p class="demo-description">En-tête d'application avec navigation, recherche et profil utilisateur.</p>
      </header>

      <section class="demo-section">
        <doc-demo-container [sources]="sources">
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

  sources: CodeSource[] = [
    {
      language: 'html',
      filename: 'app-header.component.html',
      content: `<header class="app-header">
  <div class="header-left">
    <a routerLink="/" class="header-logo">
      <img src="/assets/logo.svg" alt="Logo" />
      <span>MyApp</span>
    </a>
    <nav class="header-nav">
      @for (item of navItems; track item.path) {
        <a [routerLink]="item.path" routerLinkActive="active">
          {{ item.label }}
        </a>
      }
    </nav>
  </div>

  <div class="header-right">
    <ds-button variant="ghost" size="sm" (click)="openSearch()">
      <fa-icon [icon]="faSearch" />
      Rechercher
    </ds-button>

    <ds-dropdown [trigger]="userTrigger" [items]="userMenuItems">
      <ng-template #userTrigger>
        <button class="user-button">
          <ds-avatar [initials]="user.initials" size="sm" />
          <span>{{ user.name }}</span>
        </button>
      </ng-template>
    </ds-dropdown>
  </div>
</header>`
    },
    {
      language: 'typescript',
      filename: 'app-header.component.ts',
      content: `import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DsButton, DsAvatar, DsDropdown, DropdownItem } from 'ds-angular';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface NavItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, DsButton, DsAvatar, DsDropdown, FaIconComponent],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent {
  faSearch = faSearch;

  user = {
    name: 'John Doe',
    initials: 'JD',
    email: 'john@example.com'
  };

  navItems: NavItem[] = [
    { label: 'Accueil', path: '/' },
    { label: 'Produits', path: '/products' },
    { label: 'À propos', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  userMenuItems: DropdownItem[] = [
    { id: 'profile', label: 'Mon profil', icon: 'user' },
    { id: 'settings', label: 'Paramètres', icon: 'cog' },
    { id: 'divider', type: 'divider' },
    { id: 'logout', label: 'Déconnexion', icon: 'sign-out-alt' }
  ];

  openSearch() {
    // Open search modal...
  }
}`
    },
    {
      language: 'scss',
      filename: 'app-header.component.scss',
      content: `.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-3) var(--space-6);
  background: var(--surface-elevated);
  border-bottom: 1px solid var(--border-default);
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--space-8);
}

.header-logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  text-decoration: none;

  img { width: 32px; height: 32px; }
  span { font-weight: 700; font-size: 1.25rem; color: var(--text-primary); }
}

.header-nav {
  display: flex;
  gap: var(--space-6);

  a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 150ms;

    &:hover, &.active { color: var(--text-primary); }
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.user-button {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-2);
  background: none;
  border: none;
  cursor: pointer;
  border-radius: var(--radius-md);

  &:hover { background: var(--surface-sunken); }
  span { font-size: 0.875rem; }
}`
    }
  ];
}
