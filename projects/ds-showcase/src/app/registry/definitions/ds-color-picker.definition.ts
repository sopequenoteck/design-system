import { ComponentDefinition } from '../types';
import { getExampleSources } from '../../../generated/examples-source.generated';

export const DsColorPickerDefinition: ComponentDefinition = {
  id: 'ds-color-picker',
  name: 'Color Picker',
  selector: 'ds-color-picker',
  category: 'forms',
  description:
    'Sélecteur de couleur avec palette prédéfinie, spectre de couleurs, support HEX/RGB/HSL et alpha channel.',
  props: [
    {
      name: 'value',
      kind: 'input',
      type: 'string',
      defaultValue: "''",
      description: 'Couleur sélectionnée',
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
      name: 'showAlpha',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Afficher le slider alpha',
    },
    {
      name: 'presetColors',
      kind: 'input',
      type: 'string[]',
      defaultValue: '[]',
      description: 'Couleurs prédéfinies personnalisées',
    },
    {
      name: 'format',
      kind: 'input',
      type: "'hex' | 'rgb' | 'hsl'",
      defaultValue: "'hex'",
      description: 'Format de sortie de la couleur',
    },
    {
      name: 'placeholder',
      kind: 'input',
      type: 'string',
      defaultValue: "'Select color'",
      description: 'Placeholder du champ',
    },
    {
      name: 'allowClear',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Permettre d\'effacer la sélection',
    },
    {
      name: 'showRecentColors',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Afficher les couleurs récentes',
    },
    {
      name: 'colorChange',
      kind: 'output',
      type: 'EventEmitter<string>',
      description: 'Émis lors du changement de couleur',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Color picker avec contrôles interactifs.',
      examplePath: 'ds-color-picker/default',
      sources: getExampleSources('ds-color-picker', 'default'),
      controls: [
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
        { name: 'showAlpha', type: 'boolean', defaultValue: false },
        { name: 'disabled', type: 'boolean', defaultValue: false },
      ],
      code: `<ds-color-picker
  [(ngModel)]="color"
  [size]="size"
  [showAlpha]="showAlpha"
  [disabled]="disabled"
/>`,
    },
    {
      id: 'with-alpha',
      name: 'With Alpha Channel',
      description: 'Sélection de la transparence.',
      controls: [],
      code: `<ds-color-picker
  [(ngModel)]="color"
  [showAlpha]="true"
/>`,
    },
    {
      id: 'custom-presets',
      name: 'Custom Presets',
      description: 'Palette de couleurs personnalisée.',
      controls: [],
      code: `<ds-color-picker
  [(ngModel)]="color"
  [presetColors]="brandColors"
/>

// brandColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']`,
    },
    {
      id: 'formats',
      name: 'Output Formats',
      description: 'Différents formats de sortie.',
      controls: [],
      code: `<ds-color-picker format="hex" />  // Output: #3b82f6
<ds-color-picker format="rgb" />  // Output: rgb(59, 130, 246)
<ds-color-picker format="hsl" />  // Output: hsl(217, 91%, 60%)`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<ds-color-picker size="sm" />
<ds-color-picker size="md" />
<ds-color-picker size="lg" />`,
    },
  ],
};
