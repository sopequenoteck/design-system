import { ComponentDefinition } from '../types';
import { getExampleSources } from '../../../generated/examples-source.generated';

export const DsProgressBarDefinition: ComponentDefinition = {
  id: 'ds-progress-bar',
  name: 'Progress Bar',
  selector: 'ds-progress-bar',
  category: 'feedback',
  description:
    "Barre de progression pour indiquer l'avancement d'une tâche ou un état de chargement.",
  props: [
    {
      name: 'value',
      kind: 'input',
      type: 'number',
      defaultValue: '0',
      description: 'Valeur de progression (0-100)',
    },
    {
      name: 'variant',
      kind: 'input',
      type: "'default' | 'success' | 'warning' | 'error'",
      defaultValue: "'default'",
      description: 'Variante de couleur',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille de la barre',
    },
    {
      name: 'mode',
      kind: 'input',
      type: "'determinate' | 'indeterminate'",
      defaultValue: "'determinate'",
      description: 'Mode de progression',
    },
    {
      name: 'showLabel',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Affiche le pourcentage',
    },
    {
      name: 'ariaLabel',
      kind: 'input',
      type: 'string',
      description: 'Label accessible',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Barre de progression avec contrôles.',
      examplePath: 'ds-progress-bar/default',
      sources: getExampleSources('ds-progress-bar', 'default'),
      controls: [
        { name: 'value', type: 'number', defaultValue: 50, min: 0, max: 100 },
        { name: 'variant', type: 'select', defaultValue: 'default', options: ['default', 'success', 'warning', 'error'] },
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
        { name: 'showLabel', type: 'boolean', defaultValue: false },
      ],
      code: `<ds-progress-bar
  [value]="value"
  [variant]="variant"
  [size]="size"
  [showLabel]="showLabel"
/>`,
    },
    {
      id: 'indeterminate',
      name: 'Indeterminate',
      description: 'Mode indéterminé pour chargement.',
      controls: [],
      code: `<ds-progress-bar
  mode="indeterminate"
  variant="default"
/>`,
    },
    {
      id: 'variants',
      name: 'Variants',
      description: 'Différentes variantes de couleur.',
      controls: [],
      code: `<ds-progress-bar [value]="75" variant="default" />
<ds-progress-bar [value]="75" variant="success" />
<ds-progress-bar [value]="75" variant="warning" />
<ds-progress-bar [value]="75" variant="error" />`,
    },
    {
      id: 'with-label',
      name: 'With Label',
      description: 'Affichage du pourcentage.',
      controls: [],
      code: `<ds-progress-bar
  [value]="65"
  [showLabel]="true"
  variant="success"
/>`,
    },
  ],
};
