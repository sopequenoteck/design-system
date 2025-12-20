import { Component, signal, computed } from '@angular/core';
import { DsSidebar, SidebarItem, SidebarMode, SidebarSize, SidebarCollapsedTrigger } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsSidebarDefinition } from '../../../registry/definitions';
import { ControlValues } from '../../../registry/types';
import { faHome, faUser, faCog, faEnvelope, faChartBar, faFolder, faCalendar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar-page',
  standalone: true,
  imports: [DsSidebar, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Sidebar avec contrôles interactifs.</p>
          <doc-demo-container
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <div class="sidebar-container">
              <ds-sidebar
                [items]="sidebarItems"
                [mode]="demoMode()"
                [size]="demoSize()"
                [collapsible]="demoCollapsible()"
                (itemClick)="onItemClick($event)"
                (modeChange)="onModeChange($event)"
              />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Groups</h3>
          <p class="demo-block__desc">Items groupés avec expansion.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <div class="sidebar-container">
              <ds-sidebar
                [items]="groupedSidebarItems"
                (itemClick)="onItemClick($event)"
                [collapsedTrigger]="demoCollapsedTrigger()"
              />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Collapsed Mode</h3>
          <p class="demo-block__desc">Mode icônes uniquement. Les items avec enfants affichent un popover au hover ou au clic.</p>
          <doc-demo-container
            [code]="definition.demos[2].code"
            [controls]="definition.demos[2].controls"
            [initialValues]="collapsedValues()"
            (controlChange)="onCollapsedChange($event)"
          >
            <div class="sidebar-container sidebar-container--collapsed">
              <ds-sidebar
                [items]="groupedSidebarItems"
                [mode]="'collapsed'"
                [size]="demoSize()"
                [collapsedTrigger]="demoCollapsedTrigger()"
              />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Header/Footer</h3>
          <p class="demo-block__desc">Slots header et footer. En mode collapsed, seule l'icône du logo est visible.</p>
          <doc-demo-container
            [code]="definition.demos[3].code"
            [controls]="definition.demos[3].controls"
            [initialValues]="headerFooterValues()"
            (controlChange)="onHeaderFooterChange($event)"
          >
            <div class="sidebar-container" [class.sidebar-container--collapsed]="headerFooterMode() === 'collapsed'">
              <ds-sidebar [items]="sidebarItems" [mode]="headerFooterMode()">
                <ng-container sidebar-header>
                  <div class="sidebar-logo">
                    <span class="ds-sidebar-logo-icon">🚀</span>
                    <span class="ds-sidebar-logo-text">Mon App</span>
                  </div>
                </ng-container>
                <ng-container sidebar-footer>
                  <button class="sidebar-logout-btn">Déconnexion</button>
                </ng-container>
              </ds-sidebar>
            </div>
          </doc-demo-container>
        </div>
      </section>

      <section class="component-section">
        <h2>API Reference</h2>
        <doc-props-table [props]="definition.props" />
      </section>
    </div>
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
      display: inline-block; padding: 6px 12px; font-family: var(--doc-code-font, monospace),sans-serif; font-size: 0.875rem;
      background: var(--background-secondary, #f3f4f6); color: var(--text-default, #374151); border-radius: 4px;
    }
    .component-section {
      margin-bottom: 48px;
      h2 { font-size: 1.25rem; font-weight: 600; color: var(--text-default, #1a1a1a); margin: 0 0 24px 0; padding-bottom: 12px; border-bottom: 1px solid var(--border-default, #e5e7eb); }
    }
    .demo-block { margin-bottom: 32px; }
    .demo-block__title { margin: 0 0 8px 0; font-size: 1rem; font-weight: 600; color: var(--text-default, #1a1a1a); }
    .demo-block__desc { margin: 0 0 16px 0; font-size: 0.875rem; color: var(--text-muted, #6b7280); }
    .sidebar-container {
      height: 400px;
      border: 1px solid var(--border-default, #e5e7eb);
      border-radius: 8px;
      overflow: hidden;
      position: relative;
    }
    .sidebar-container--collapsed {
      width: 80px;
    }
    .sidebar-logo {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      .logo-icon { font-size: 24px; }
      .logo-text { font-weight: 600; font-size: 1.125rem; }
    }
    .sidebar-logout-btn {
      width: 100%;
      padding: 12px 16px;
      border: none;
      background: var(--error, #ef4444);
      color: white;
      cursor: pointer;
      font-size: 0.875rem;
      &:hover { opacity: 0.9; }
    }
  `]
})
export class SidebarPage {
  definition = DsSidebarDefinition;

  sidebarItems: SidebarItem[] = [
    { id: 'home', label: 'Accueil', icon: faHome },
    { id: 'analytics', label: 'Analytiques', icon: faChartBar },
    { id: 'messages', label: 'Messages', icon: faEnvelope },
    { id: 'calendar', label: 'Calendrier', icon: faCalendar },
    { id: 'settings', label: 'Paramètres', icon: faCog },
  ];

  groupedSidebarItems: SidebarItem[] = [
    { id: 'home', label: 'Accueil', icon: faHome },
    {
      id: 'content',
      label: 'Contenu',
      icon: faFolder,
      expanded: true,
      children: [
        { id: 'articles', label: 'Articles' },
        { id: 'pages', label: 'Pages' },
        { id: 'media', label: 'Médias' },
      ],
    },
    {
      id: 'users',
      label: 'Utilisateurs',
      icon: faUser,
      children: [
        { id: 'list', label: 'Liste' },
        { id: 'roles', label: 'Rôles' },
      ],
    },
    { id: 'settings', label: 'Paramètres', icon: faCog },
  ];

  defaultValues = signal<ControlValues>({
    mode: 'full',
    size: 'md',
    collapsible: true,
  });

  collapsedValues = signal<ControlValues>({
    collapsedTrigger: 'hover',
  });

  headerFooterValues = signal<ControlValues>({
    mode: 'full',
  });

  demoMode = computed(() => this.defaultValues()['mode'] as SidebarMode);
  demoSize = computed(() => this.defaultValues()['size'] as SidebarSize);
  demoCollapsible = computed(() => this.defaultValues()['collapsible'] as boolean);
  demoCollapsedTrigger = computed(() => this.collapsedValues()['collapsedTrigger'] as SidebarCollapsedTrigger);
  headerFooterMode = computed(() => this.headerFooterValues()['mode'] as SidebarMode);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  onCollapsedChange(values: ControlValues): void {
    this.collapsedValues.set(values);
  }

  onHeaderFooterChange(values: ControlValues): void {
    this.headerFooterValues.set(values);
  }

  onItemClick(event: any): void {
    console.log('Item clicked:', event);
  }

  onModeChange(mode: SidebarMode): void {
    console.log('Mode changed:', mode);
  }
}
