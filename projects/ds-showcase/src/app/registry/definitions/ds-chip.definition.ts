import { ComponentDefinition } from '../types';

export const DsChipDefinition: ComponentDefinition = {
  id: 'ds-chip',
  name: 'Chip',
  selector: 'ds-chip',
  category: 'data-display',
  description:
    'Composant chip pour afficher des tags, labels ou éléments interactifs avec support de suppression et sélection.',
  props: [
    {
      name: 'label',
      kind: 'input',
      type: 'string',
      description: 'Texte du chip (requis)',
    },
    {
      name: 'variant',
      kind: 'input',
      type: "'filled' | 'outlined'",
      defaultValue: "'filled'",
      description: 'Variante visuelle',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille du chip',
    },
    {
      name: 'color',
      kind: 'input',
      type: "'default' | 'primary' | 'success' | 'warning' | 'error'",
      defaultValue: "'default'",
      description: 'Couleur du chip',
    },
    {
      name: 'removable',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Affiche le bouton de suppression',
    },
    {
      name: 'clickable',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Rend le chip cliquable',
    },
    {
      name: 'selected',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'État sélectionné',
    },
    {
      name: 'disabled',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Désactive le chip',
    },
    {
      name: 'removed',
      kind: 'output',
      type: 'EventEmitter<void>',
      description: 'Émis lors de la suppression',
    },
    {
      name: 'clicked',
      kind: 'output',
      type: 'EventEmitter<void>',
      description: 'Émis lors du clic',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Chip avec contrôles interactifs.',
      controls: [
        { name: 'variant', type: 'select', defaultValue: 'filled', options: ['filled', 'outlined'] },
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
        { name: 'color', type: 'select', defaultValue: 'default', options: ['default', 'primary', 'success', 'warning', 'error'] },
        { name: 'removable', type: 'boolean', defaultValue: false },
        { name: 'clickable', type: 'boolean', defaultValue: false },
      ],
      code: `<ds-chip
  label="Chip"
  [variant]="variant"
  [size]="size"
  [color]="color"
  [removable]="removable"
  [clickable]="clickable"
/>`,
    },
    {
      id: 'colors',
      name: 'Colors',
      description: 'Les différentes couleurs.',
      controls: [],
      code: `<ds-chip label="Default" color="default" />
<ds-chip label="Primary" color="primary" />
<ds-chip label="Success" color="success" />
<ds-chip label="Warning" color="warning" />
<ds-chip label="Error" color="error" />`,
    },
    {
      id: 'removable',
      name: 'Removable',
      description: 'Chips avec bouton de suppression.',
      controls: [],
      code: `<ds-chip label="Tag 1" [removable]="true" (removed)="onRemove('1')" />
<ds-chip label="Tag 2" [removable]="true" (removed)="onRemove('2')" />`,
    },
    {
      id: 'selectable',
      name: 'Selectable',
      description: 'Chips sélectionnables.',
      controls: [],
      code: `<ds-chip label="Option A" [clickable]="true" [selected]="selectedA" (clicked)="toggleA()" />
<ds-chip label="Option B" [clickable]="true" [selected]="selectedB" (clicked)="toggleB()" />`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<ds-chip label="Small" size="sm" />
<ds-chip label="Medium" size="md" />
<ds-chip label="Large" size="lg" />`,
    },
  ],
};
