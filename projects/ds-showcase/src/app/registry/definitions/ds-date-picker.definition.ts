import { ComponentDefinition } from '../types';

export const DsDatePickerDefinition: ComponentDefinition = {
  id: 'ds-date-picker',
  name: 'Date Picker',
  selector: 'ds-date-picker',
  category: 'forms',
  description:
    'Calendrier avec navigation mensuelle, sélection simple ou range, presets, et intégration formulaires.',
  props: [
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille du composant',
    },
    {
      name: 'mode',
      kind: 'input',
      type: "'single' | 'range'",
      defaultValue: "'single'",
      description: 'Mode de sélection',
    },
    {
      name: 'disabled',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Désactiver le composant',
    },
    {
      name: 'minDate',
      kind: 'input',
      type: 'Date | null',
      defaultValue: 'null',
      description: 'Date minimum sélectionnable',
    },
    {
      name: 'maxDate',
      kind: 'input',
      type: 'Date | null',
      defaultValue: 'null',
      description: 'Date maximum sélectionnable',
    },
    {
      name: 'showTodayButton',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Afficher le bouton "Aujourd\'hui"',
    },
    {
      name: 'showClearButton',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Afficher le bouton "Effacer"',
    },
    {
      name: 'showPresets',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Afficher les presets (mode range)',
    },
    {
      name: 'presets',
      kind: 'input',
      type: 'DatePreset[]',
      defaultValue: '[]',
      description: 'Presets personnalisés pour le mode range',
    },
    {
      name: 'dateChange',
      kind: 'output',
      type: 'EventEmitter<Date | null>',
      description: 'Émis lors du changement de date (mode single)',
    },
    {
      name: 'rangeChange',
      kind: 'output',
      type: 'EventEmitter<DateRange>',
      description: 'Émis lors du changement de range',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Date picker avec contrôles interactifs.',
      controls: [
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
        { name: 'showTodayButton', type: 'boolean', defaultValue: true },
        { name: 'showClearButton', type: 'boolean', defaultValue: true },
        { name: 'disabled', type: 'boolean', defaultValue: false },
      ],
      code: `<ds-date-picker
  [(ngModel)]="date"
  [size]="size"
  [showTodayButton]="showTodayButton"
  [showClearButton]="showClearButton"
  [disabled]="disabled"
/>`,
    },
    {
      id: 'range-mode',
      name: 'Range Mode',
      description: 'Sélection d\'une plage de dates.',
      controls: [],
      code: `<ds-date-picker
  mode="range"
  (rangeChange)="onRangeChange($event)"
/>`,
    },
    {
      id: 'with-presets',
      name: 'With Presets',
      description: 'Presets pour sélection rapide (7 jours, 30 jours, etc.).',
      controls: [],
      code: `<ds-date-picker
  mode="range"
  [showPresets]="true"
/>`,
    },
    {
      id: 'min-max-dates',
      name: 'Min/Max Dates',
      description: 'Limiter la plage de dates sélectionnables.',
      controls: [],
      code: `<ds-date-picker
  [minDate]="minDate"
  [maxDate]="maxDate"
/>

// minDate = new Date(2024, 0, 1);
// maxDate = new Date(2024, 11, 31);`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<ds-date-picker size="sm" />
<ds-date-picker size="md" />
<ds-date-picker size="lg" />`,
    },
  ],
};
