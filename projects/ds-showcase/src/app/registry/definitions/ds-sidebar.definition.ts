import { ComponentDefinition } from '../types';

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
      description: 'Mode icônes uniquement.',
      controls: [],
      code: `<ds-sidebar
  [items]="sidebarItems"
  mode="collapsed"
/>`,
    },
    {
      id: 'with-header-footer',
      name: 'With Header/Footer',
      description: 'Slots header et footer.',
      controls: [],
      code: `<ds-sidebar [items]="sidebarItems">
  <ng-container sidebar-header>
    <img src="logo.svg" alt="Logo" />
  </ng-container>
  <ng-container sidebar-footer>
    <button>Déconnexion</button>
  </ng-container>
</ds-sidebar>`,
    },
  ],
};
