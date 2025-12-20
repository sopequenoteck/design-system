import { ComponentDefinition } from '../types';
import { getExampleSources } from '../../../generated/examples-source.generated';

export const DsSidebarDefinition: ComponentDefinition = {
  id: 'ds-sidebar',
  name: 'Sidebar',
  selector: 'ds-sidebar',
  category: 'navigation',
  description:
    "Navigation verticale multi-niveaux avec modes full, collapsed et overlay pour responsive.",
  props: [
    {
      name: 'items',
      kind: 'input',
      type: 'SidebarItem[]',
      description: 'Liste des items de navigation (requis)',
      required: true,
    },
    {
      name: 'mode',
      kind: 'input',
      type: "'full' | 'collapsed' | 'overlay'",
      defaultValue: "'full'",
      description: "Mode d'affichage",
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille (largeur)',
    },
    {
      name: 'position',
      kind: 'input',
      type: "'left' | 'right'",
      defaultValue: "'left'",
      description: 'Position du sidebar',
    },
    {
      name: 'collapsible',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Permet le toggle full/collapsed',
    },
    {
      name: 'autoCollapseOnMobile',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Mode overlay automatique sur mobile',
    },
    {
      name: 'showTooltips',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Affiche les tooltips en mode collapsed',
    },
    {
      name: 'collapsedTrigger',
      kind: 'input',
      type: "'hover' | 'click'",
      defaultValue: "'hover'",
      description: 'Trigger pour ouvrir le popover des sous-menus en mode collapsed',
    },
    {
      name: 'itemClick',
      kind: 'output',
      type: 'EventEmitter<SidebarItemClickEvent>',
      description: 'Émis lors du clic sur un item',
    },
    {
      name: 'modeChange',
      kind: 'output',
      type: 'EventEmitter<SidebarMode>',
      description: 'Émis lors du changement de mode',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Sidebar avec contrôles interactifs.',
      examplePath: 'ds-sidebar/default',
      sources: getExampleSources('ds-sidebar', 'default'),
      controls: [
        { name: 'mode', type: 'select', defaultValue: 'full', options: ['full', 'collapsed', 'overlay'] },
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
        { name: 'collapsible', type: 'boolean', defaultValue: true },
      ],
      code: `<ds-sidebar
  [items]="sidebarItems"
  [mode]="mode"
  [size]="size"
  [collapsible]="collapsible"
  (itemClick)="onItemClick($event)"
  (modeChange)="onModeChange($event)"
/>`,
    },
    {
      id: 'with-groups',
      name: 'With Groups',
      description: 'Items groupés avec expansion.',
      controls: [],
      code: `<ds-sidebar
  [items]="groupedSidebarItems"
  (itemClick)="onItemClick($event)"
/>`,
    },
    {
      id: 'collapsed',
      name: 'Collapsed Mode',
      description: 'Mode icônes uniquement. Les items avec enfants affichent un popover au hover ou au clic.',
      controls: [
        { name: 'collapsedTrigger', type: 'select', defaultValue: 'hover', options: ['hover', 'click'] },
      ],
      code: `<ds-sidebar
  [items]="groupedSidebarItems"
  mode="collapsed"
  [collapsedTrigger]="collapsedTrigger"
/>`,
    },
    {
      id: 'with-header-footer',
      name: 'With Header/Footer',
      description: 'Slots header et footer. En mode collapsed, utilisez les classes .ds-sidebar-logo-icon et .ds-sidebar-logo-text pour un affichage adaptatif.',
      controls: [
        { name: 'mode', type: 'select', defaultValue: 'full', options: ['full', 'collapsed'] },
      ],
      code: `<ds-sidebar [items]="sidebarItems" [mode]="mode">
  <ng-container sidebar-header>
    <div class="sidebar-logo">
      <span class="ds-sidebar-logo-icon">🚀</span>
      <span class="ds-sidebar-logo-text">Mon App</span>
    </div>
  </ng-container>
  <ng-container sidebar-footer>
    <button>Déconnexion</button>
  </ng-container>
</ds-sidebar>`,
    },
  ],
};
