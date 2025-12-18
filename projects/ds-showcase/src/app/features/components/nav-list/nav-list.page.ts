import { Component, signal, computed } from '@angular/core';
import { DsNavList, NavListGroup, NavListSize } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsNavListDefinition } from '../../../registry/definitions/ds-nav-list.definition';
import { ControlValues } from '../../../registry/types';
import { faHome, faUser, faCog, faEnvelope, faFile } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-list-page',
  standalone: true,
  imports: [DsNavList, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Liste de navigation simple.</p>
          <doc-demo-container
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <div class="nav-list-container">
              <ds-nav-list
                [groups]="navGroups"
                [activeItemId]="activeFilter"
                [size]="demoSize()"
                (itemClick)="onItemClick($event)"
              />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Badges</h3>
          <p class="demo-block__desc">Items avec compteurs.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <div class="nav-list-container">
              <ds-nav-list
                [groups]="navGroupsWithBadges"
                [activeItemId]="activeFilter"
                (itemClick)="onItemClick($event)"
              />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Collapsible Groups</h3>
          <p class="demo-block__desc">Groupes repliables.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <div class="nav-list-container">
              <ds-nav-list
                [groups]="collapsibleGroups"
                [activeItemId]="activeFilter"
                (groupToggle)="onGroupToggle($event)"
              />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Icons</h3>
          <p class="demo-block__desc">Items avec icônes.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <div class="nav-list-container">
              <ds-nav-list
                [groups]="navGroupsWithIcons"
                [activeItemId]="activeFilter"
              />
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
      display: inline-block; padding: 6px 12px; font-family: var(--doc-code-font, monospace); font-size: 0.875rem;
      background: var(--background-secondary, #f3f4f6); color: var(--text-default, #374151); border-radius: 4px;
    }
    .component-section {
      margin-bottom: 48px;
      h2 { font-size: 1.25rem; font-weight: 600; color: var(--text-default, #1a1a1a); margin: 0 0 24px 0; padding-bottom: 12px; border-bottom: 1px solid var(--border-default, #e5e7eb); }
    }
    .demo-block { margin-bottom: 32px; }
    .demo-block__title { margin: 0 0 8px 0; font-size: 1rem; font-weight: 600; color: var(--text-default, #1a1a1a); }
    .demo-block__desc { margin: 0 0 16px 0; font-size: 0.875rem; color: var(--text-muted, #6b7280); }
    .nav-list-container {
      max-width: 280px;
      border: 1px solid var(--border-default, #e5e7eb);
      border-radius: 8px;
      overflow: hidden;
    }
  `]
})
export class NavListPage {
  definition = DsNavListDefinition;

  activeFilter: string | number = 'all';

  navGroups: NavListGroup[] = [
    {
      id: 'main',
      title: 'Navigation',
      items: [
        { id: 'all', label: 'Tous' },
        { id: 'active', label: 'Actifs' },
        { id: 'archived', label: 'Archivés' },
      ],
    },
  ];

  navGroupsWithBadges: NavListGroup[] = [
    {
      id: 'inbox',
      title: 'Messages',
      items: [
        { id: 'inbox', label: 'Boîte de réception', badge: 12 },
        { id: 'sent', label: 'Envoyés', badge: 3 },
        { id: 'drafts', label: 'Brouillons', badge: 1 },
        { id: 'trash', label: 'Corbeille' },
      ],
    },
  ];

  collapsibleGroups: NavListGroup[] = [
    {
      id: 'main',
      title: 'Principal',
      collapsible: true,
      items: [
        { id: 'dashboard', label: 'Tableau de bord' },
        { id: 'analytics', label: 'Analytiques' },
      ],
    },
    {
      id: 'settings',
      title: 'Paramètres',
      collapsible: true,
      collapsed: true,
      items: [
        { id: 'profile', label: 'Profil' },
        { id: 'security', label: 'Sécurité' },
      ],
    },
  ];

  navGroupsWithIcons: NavListGroup[] = [
    {
      id: 'menu',
      title: 'Menu',
      items: [
        { id: 'home', label: 'Accueil', icon: faHome },
        { id: 'profile', label: 'Profil', icon: faUser },
        { id: 'messages', label: 'Messages', icon: faEnvelope },
        { id: 'files', label: 'Fichiers', icon: faFile },
        { id: 'settings', label: 'Paramètres', icon: faCog },
      ],
    },
  ];

  defaultValues = signal<ControlValues>({
    size: 'md',
  });

  demoSize = computed(() => this.defaultValues()['size'] as NavListSize);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  onItemClick(event: any): void {
    this.activeFilter = event.item.id;
    console.log('Item clicked:', event);
  }

  onGroupToggle(event: any): void {
    console.log('Group toggled:', event);
  }
}
