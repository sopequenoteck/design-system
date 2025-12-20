import { ComponentDefinition } from '../types';
import { getExampleSources } from '../../../generated/examples-source.generated';

export const DsTimePickerDefinition: ComponentDefinition = {
  id: 'ds-time-picker',
  name: 'Time Picker',
  selector: 'ds-time-picker',
  category: 'forms',
  description:
    'Sélecteur d\'heure avec dropdown scrollable, support 12h/24h, secondes optionnelles et intégration formulaires.',
  props: [
    {
      name: 'value',
      kind: 'input',
      type: 'string',
      defaultValue: "''",
      description: 'Heure sélectionnée (format HH:mm ou HH:mm:ss)',
    },
    {
      name: 'format',
      kind: 'input',
      type: "'12h' | '24h'",
      defaultValue: "'24h'",
      description: 'Format d\'affichage',
    },
    {
      name: 'showSeconds',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Afficher les secondes',
    },
    {
      name: 'minuteStep',
      kind: 'input',
      type: 'number',
      defaultValue: '1',
      description: 'Incrément des minutes',
    },
    {
      name: 'hourStep',
      kind: 'input',
      type: 'number',
      defaultValue: '1',
      description: 'Incrément des heures',
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
      name: 'placeholder',
      kind: 'input',
      type: 'string',
      defaultValue: "'Select time'",
      description: 'Placeholder du champ',
    },
    {
      name: 'timeChange',
      kind: 'output',
      type: 'EventEmitter<string>',
      description: 'Émis lors du changement d\'heure',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Time picker avec contrôles interactifs.',
      examplePath: 'ds-time-picker/default',
      sources: getExampleSources('ds-time-picker', 'default'),
      controls: [
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
        { name: 'showSeconds', type: 'boolean', defaultValue: false },
        { name: 'disabled', type: 'boolean', defaultValue: false },
      ],
      code: `<ds-time-picker
  [(ngModel)]="time"
  [size]="size"
  [showSeconds]="showSeconds"
  [disabled]="disabled"
/>`,
    },
    {
      id: '12h-format',
      name: '12h Format',
      description: 'Format 12 heures avec AM/PM.',
      controls: [],
      code: `<ds-time-picker
  [(ngModel)]="time"
  format="12h"
/>`,
    },
    {
      id: 'with-seconds',
      name: 'With Seconds',
      description: 'Affichage des secondes.',
      controls: [],
      code: `<ds-time-picker
  [(ngModel)]="time"
  [showSeconds]="true"
/>`,
    },
    {
      id: 'custom-steps',
      name: 'Custom Steps',
      description: 'Incréments personnalisés (15 minutes).',
      controls: [],
      code: `<ds-time-picker
  [(ngModel)]="time"
  [minuteStep]="15"
/>`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<ds-time-picker size="sm" />
<ds-time-picker size="md" />
<ds-time-picker size="lg" />`,
    },
  ],
};
