import { ComponentDefinition } from '../types';

export const DsSegmentedControlDefinition: ComponentDefinition = {
  id: 'ds-segmented-control',
  name: 'Segmented Control',
  selector: 'ds-segmented-control',
  category: 'forms',
  description:
    'Groupe de boutons mutuellement exclusifs pour basculer entre vues, modes ou options. Alternative stylisée aux boutons radio.',
  props: [
    {
      name: 'options',
      kind: 'input',
      type: 'SegmentOption[]',
      required: true,
      description: 'Liste des options (required)',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille du composant',
    },
    {
      name: 'disabled',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Désactiver le composant',
    },
    {
      name: 'fullWidth',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Prend toute la largeur du conteneur',
    },
    {
      name: 'orientation',
      kind: 'input',
      type: "'horizontal' | 'vertical'",
      defaultValue: "'horizontal'",
      description: 'Orientation du composant',
    },
    {
      name: 'color',
      kind: 'input',
      type: "'primary' | 'neutral'",
      defaultValue: "'primary'",
      description: 'Couleur du segment actif',
    },
    {
      name: 'ngModel / formControlName',
      kind: 'input',
      type: 'string',
      description: 'Valeur sélectionnée (ControlValueAccessor)',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Segmented control avec contrôles interactifs.',
      controls: [
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
        { name: 'fullWidth', type: 'boolean', defaultValue: false },
        { name: 'disabled', type: 'boolean', defaultValue: false },
      ],
      code: `<ds-segmented-control
  [(ngModel)]="value"
  [options]="options"
  [size]="size"
  [fullWidth]="fullWidth"
  [disabled]="disabled"
/>`,
    },
    {
      id: 'with-icons',
      name: 'With Icons',
      description: 'Options avec icônes FontAwesome.',
      controls: [],
      code: `<ds-segmented-control
  [(ngModel)]="view"
  [options]="[
    { value: 'list', label: 'Liste', icon: 'fas-list' },
    { value: 'grid', label: 'Grille', icon: 'fas-grid' },
    { value: 'map', label: 'Carte', icon: 'fas-map' }
  ]"
/>`,
    },
    {
      id: 'vertical',
      name: 'Vertical Orientation',
      description: 'Orientation verticale pour les menus latéraux.',
      controls: [],
      code: `<ds-segmented-control
  [(ngModel)]="section"
  [options]="sectionOptions"
  orientation="vertical"
/>`,
    },
    {
      id: 'full-width',
      name: 'Full Width',
      description: 'Prend toute la largeur disponible.',
      controls: [],
      code: `<ds-segmented-control
  [(ngModel)]="tab"
  [options]="tabOptions"
  [fullWidth]="true"
/>`,
    },
    {
      id: 'colors',
      name: 'Colors',
      description: 'Les deux couleurs disponibles (primary, neutral).',
      controls: [],
      code: `<ds-segmented-control [options]="options" color="primary" />
<ds-segmented-control [options]="options" color="neutral" />`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<ds-segmented-control [options]="options" size="sm" />
<ds-segmented-control [options]="options" size="md" />
<ds-segmented-control [options]="options" size="lg" />`,
    },
  ],
};
