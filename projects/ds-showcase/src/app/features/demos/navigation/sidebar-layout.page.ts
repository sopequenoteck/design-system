import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DsButton } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { CodeSource } from '../../../registry/types';

interface UsedComponent {
  id: string;
  label: string;
  path: string;
}

@Component({
  selector: 'demo-sidebar-layout-page',
  standalone: true,
  imports: [RouterLink, DsButton, DemoContainer],
  template: `
    <div class="demo-page">
      <header class="demo-header">
        <h1>Sidebar Layout</h1>
        <p class="demo-description">Layout avec sidebar de navigation et contenu principal.</p>
      </header>

      <section class="demo-section">
        <doc-demo-container [sources]="sources">
          <div class="layout-demo">
            <aside class="demo-sidebar">
              <div class="sidebar-header">
                <span class="logo">App</span>
              </div>
              <nav class="nav-list">
                <a href="#" class="nav-item active">Dashboard</a>
                <a href="#" class="nav-item">Projets</a>
                <a href="#" class="nav-item">Équipe</a>
                <a href="#" class="nav-item">Paramètres</a>
              </nav>
            </aside>
            <main class="demo-main">
              <header class="demo-topbar">
                <h2>Dashboard</h2>
                <ds-button variant="primary" size="sm">Action</ds-button>
              </header>
              <div class="demo-content">
                <p>Contenu principal de l'application...</p>
              </div>
            </main>
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
    .layout-demo {
      display: flex; width: 100%; max-width: 900px; height: 500px;
      border: 1px solid var(--doc-border-default); border-radius: 8px; overflow: hidden;
      background: var(--doc-surface-elevated);
    }
    .demo-sidebar {
      width: 220px; background: var(--doc-surface-page); border-right: 1px solid var(--doc-border-default);
      display: flex; flex-direction: column;
    }
    .sidebar-header { padding: 16px; border-bottom: 1px solid var(--doc-border-default); }
    .logo { font-weight: 700; font-size: 1.25rem; }
    .nav-list { display: flex; flex-direction: column; padding: 8px; }
    .nav-item {
      padding: 10px 16px; border-radius: 6px; color: var(--doc-text-secondary);
      text-decoration: none; font-size: 0.875rem;
    }
    .nav-item:hover { background: var(--doc-surface-sunken); }
    .nav-item.active { background: var(--doc-accent-primary-light); color: var(--doc-accent-primary); }
    .demo-main { flex: 1; display: flex; flex-direction: column; }
    .demo-topbar {
      display: flex; justify-content: space-between; align-items: center;
      padding: 16px 24px; border-bottom: 1px solid var(--doc-border-default);
    }
    .demo-topbar h2 { margin: 0; font-size: 1.25rem; }
    .demo-content { flex: 1; padding: 24px; color: var(--doc-text-secondary); }
    .demo-components h2 { font-size: 1.25rem; margin: 0 0 16px; }
    .component-list { display: flex; flex-wrap: wrap; gap: 8px; }
    .component-chip {
      padding: 4px 16px; background: var(--doc-surface-elevated); border: 1px solid var(--doc-border-default);
      border-radius: 9999px; color: var(--doc-text-primary); font-size: 0.875rem; text-decoration: none;
    }
    .component-chip:hover { border-color: var(--doc-accent-primary); color: var(--doc-accent-primary); }
  `]
})
export class SidebarLayoutDemoPage {
  usedComponents: UsedComponent[] = [
    { id: 'ds-sidebar', label: 'Sidebar', path: '/components/navigation/ds-sidebar' },
    { id: 'ds-nav-list', label: 'Nav List', path: '/components/navigation/ds-nav-list' },
    { id: 'ds-button', label: 'Button', path: '/components/actions/ds-button' },
  ];

  sources: CodeSource[] = [
    {
      language: 'html',
      filename: 'app-layout.component.html',
      content: `<div class="app-layout">
  <ds-sidebar [collapsed]="sidebarCollapsed" (collapsedChange)="sidebarCollapsed = $event">
    <div class="sidebar-header">
      <img src="/logo.svg" alt="Logo" />
      <span>Mon App</span>
    </div>

    <ds-nav-list [groups]="navGroups" [(activeId)]="activeNavId" />

    <div class="sidebar-footer">
      <ds-button variant="ghost" size="sm" (click)="logout()">
        Déconnexion
      </ds-button>
    </div>
  </ds-sidebar>

  <main class="app-main">
    <header class="app-topbar">
      <ds-button variant="ghost" size="sm" (click)="sidebarCollapsed = !sidebarCollapsed">
        <fa-icon [icon]="faMenu" />
      </ds-button>
      <h1>{{ pageTitle }}</h1>
      <ds-button variant="primary">Nouvelle action</ds-button>
    </header>

    <div class="app-content">
      <router-outlet />
    </div>
  </main>
</div>`
    },
    {
      language: 'typescript',
      filename: 'app-layout.component.ts',
      content: `import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DsSidebar, DsNavList, DsButton, NavGroup } from 'ds-angular';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, DsSidebar, DsNavList, DsButton],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss'
})
export class AppLayoutComponent {
  sidebarCollapsed = false;
  activeNavId = 'dashboard';
  pageTitle = 'Dashboard';

  navGroups: NavGroup[] = [
    {
      id: 'main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: 'home', path: '/dashboard' },
        { id: 'projects', label: 'Projets', icon: 'folder', path: '/projects' },
        { id: 'team', label: 'Équipe', icon: 'users', path: '/team' }
      ]
    },
    {
      id: 'settings',
      label: 'Configuration',
      items: [
        { id: 'settings', label: 'Paramètres', icon: 'cog', path: '/settings' }
      ]
    }
  ];

  logout() {
    // Logout logic...
  }
}`
    },
    {
      language: 'scss',
      filename: 'app-layout.component.scss',
      content: `.app-layout {
  display: flex;
  height: 100vh;
  background: var(--surface-page);
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.app-topbar {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-6);
  border-bottom: 1px solid var(--border-default);
  background: var(--surface-elevated);

  h1 {
    flex: 1;
    margin: 0;
    font-size: 1.25rem;
  }
}

.app-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-6);
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);

  img { width: 32px; height: 32px; }
  span { font-weight: 600; }
}

.sidebar-footer {
  margin-top: auto;
  padding: var(--space-4);
  border-top: 1px solid var(--border-default);
}`
    }
  ];
}
