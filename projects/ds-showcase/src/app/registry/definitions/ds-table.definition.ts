import { ComponentDefinition } from '../types';

export const DsTableDefinition: ComponentDefinition = {
  id: 'ds-table',
  name: 'Table',
  selector: 'ds-table',
  category: 'data-display',
  description:
    'Composant tableau de données avec tri, filtrage, sélection et personnalisation des colonnes.',
  props: [
    {
      name: 'data',
      kind: 'input',
      type: 'T[]',
      defaultValue: '[]',
      description: 'Données du tableau',
    },
    {
      name: 'columns',
      kind: 'input',
      type: 'DsTableColumn[]',
      defaultValue: '[]',
      description: 'Configuration des colonnes',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille du tableau',
    },
    {
      name: 'variant',
      kind: 'input',
      type: "'default' | 'striped' | 'bordered'",
      defaultValue: "'default'",
      description: 'Variante visuelle',
    },
    {
      name: 'selectable',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Active la sélection des lignes',
    },
    {
      name: 'hoverable',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Active le hover sur les lignes',
    },
    {
      name: 'loading',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Affiche un état de chargement',
    },
    {
      name: 'emptyText',
      kind: 'input',
      type: 'string',
      defaultValue: "'Aucune donnée'",
      description: 'Texte affiché si tableau vide',
    },
    {
      name: 'stickyHeader',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Header fixe au scroll',
    },
    {
      name: 'sortChange',
      kind: 'output',
      type: 'EventEmitter<SortEvent>',
      description: 'Émis lors du changement de tri',
    },
    {
      name: 'rowClick',
      kind: 'output',
      type: 'EventEmitter<{ row: T; index: number }>',
      description: 'Émis au clic sur une ligne',
    },
    {
      name: 'selectionChange',
      kind: 'output',
      type: 'EventEmitter<T[]>',
      description: 'Émis lors du changement de sélection',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Tableau avec contrôles interactifs.',
      controls: [
        { name: 'variant', type: 'select', defaultValue: 'default', options: ['default', 'striped', 'bordered'] },
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
        { name: 'hoverable', type: 'boolean', defaultValue: true },
        { name: 'selectable', type: 'boolean', defaultValue: false },
      ],
      code: `<ds-table
  [data]="users"
  [columns]="columns"
  [variant]="variant"
  [size]="size"
  [hoverable]="hoverable"
  [selectable]="selectable"
/>`,
    },
    {
      id: 'sortable',
      name: 'Sortable',
      description: 'Colonnes triables.',
      controls: [],
      code: `<ds-table
  [data]="users"
  [columns]="sortableColumns"
  (sortChange)="onSort($event)"
/>`,
    },
    {
      id: 'selectable',
      name: 'Selectable',
      description: 'Sélection multiple de lignes.',
      controls: [],
      code: `<ds-table
  [data]="users"
  [columns]="columns"
  [selectable]="true"
  (selectionChange)="onSelectionChange($event)"
/>`,
    },
    {
      id: 'loading',
      name: 'Loading',
      description: 'État de chargement.',
      controls: [],
      code: `<ds-table
  [data]="[]"
  [columns]="columns"
  [loading]="true"
/>`,
    },
    {
      id: 'empty',
      name: 'Empty',
      description: 'Tableau vide.',
      controls: [],
      code: `<ds-table
  [data]="[]"
  [columns]="columns"
  emptyText="Aucun utilisateur trouvé"
/>`,
    },
  ],
};
