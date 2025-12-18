import { ComponentDefinition } from '../types';

export const DsSliderDefinition: ComponentDefinition = {
  id: 'ds-slider',
  name: 'Slider',
  selector: 'ds-slider',
  category: 'forms',
  description:
    'Slider avec mode range, ticks, labels, orientation horizontale/verticale et navigation clavier.',
  props: [
    {
      name: 'min',
      kind: 'input',
      type: 'number',
      defaultValue: '0',
      description: 'Valeur minimale',
    },
    {
      name: 'max',
      kind: 'input',
      type: 'number',
      defaultValue: '100',
      description: 'Valeur maximale',
    },
    {
      name: 'step',
      kind: 'input',
      type: 'number',
      defaultValue: '1',
      description: 'Incrément',
    },
    {
      name: 'disabled',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Désactiver le composant',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille du composant',
    },
    {
      name: 'range',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Mode range (deux valeurs)',
    },
    {
      name: 'orientation',
      kind: 'input',
      type: "'horizontal' | 'vertical'",
      defaultValue: "'horizontal'",
      description: 'Orientation du slider',
    },
    {
      name: 'showLabels',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Afficher les labels de valeur',
    },
    {
      name: 'showTicks',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Afficher les graduations',
    },
    {
      name: 'valueChange',
      kind: 'output',
      type: 'EventEmitter<number | [number, number]>',
      description: 'Émis lors du changement de valeur',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Slider avec contrôles interactifs.',
      controls: [
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
        { name: 'showLabels', type: 'boolean', defaultValue: false },
        { name: 'showTicks', type: 'boolean', defaultValue: false },
        { name: 'disabled', type: 'boolean', defaultValue: false },
      ],
      code: `<ds-slider
  [(ngModel)]="value"
  [size]="size"
  [showLabels]="showLabels"
  [showTicks]="showTicks"
  [disabled]="disabled"
/>`,
    },
    {
      id: 'range-mode',
      name: 'Range Mode',
      description: 'Sélection d\'une plage de valeurs.',
      controls: [],
      code: `<ds-slider
  [(ngModel)]="range"
  [range]="true"
  [min]="0"
  [max]="100"
/>

// range = [20, 80]`,
    },
    {
      id: 'with-ticks',
      name: 'With Ticks',
      description: 'Graduations et labels.',
      controls: [],
      code: `<ds-slider
  [min]="0"
  [max]="100"
  [step]="10"
  [showTicks]="true"
  [showLabels]="true"
/>`,
    },
    {
      id: 'vertical',
      name: 'Vertical Orientation',
      description: 'Slider vertical.',
      controls: [],
      code: `<ds-slider
  orientation="vertical"
  [min]="0"
  [max]="100"
  style="height: 200px"
/>`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<ds-slider size="sm" />
<ds-slider size="md" />
<ds-slider size="lg" />`,
    },
  ],
};
