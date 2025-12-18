import { ComponentDefinition } from '../types';

export const DsSelectDefinition: ComponentDefinition = {
  id: 'ds-select',
  name: 'Select',
  selector: 'ds-select',
  category: 'forms',
  description: 'Liste déroulante avec recherche, options multiples et navigation clavier. Supporte ControlValueAccessor.',

  props: [
    {
      name: 'label',
      kind: 'input',
      type: 'string',
      description: 'Label affiché au-dessus du select.',
    },
    {
      name: 'placeholder',
      kind: 'input',
      type: 'string',
      defaultValue: "'Sélectionner...'",
      description: 'Texte affiché quand aucune option n\'est sélectionnée.',
    },
    {
      name: 'options',
      kind: 'input',
      type: 'SelectOption[]',
      required: true,
      description: 'Liste des options disponibles.',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille du select.',
    },
    {
      name: 'searchable',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Active la recherche dans les options.',
    },
    {
      name: 'clearable',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Affiche un bouton pour effacer la sélection.',
    },
    {
      name: 'disabled',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Désactive le select.',
    },
    {
      name: 'error',
      kind: 'input',
      type: 'string',
      description: 'Message d\'erreur à afficher.',
    },
    {
      name: 'selectionChange',
      kind: 'output',
      type: 'EventEmitter<SelectOption>',
      description: 'Émis lors du changement de sélection.',
    },
  ],

  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Select par défaut avec options.',
      controls: [
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
        { name: 'searchable', type: 'boolean', defaultValue: false },
        { name: 'clearable', type: 'boolean', defaultValue: false },
        { name: 'disabled', type: 'boolean', defaultValue: false },
      ],
      code: `<ds-select
  label="Pays"
  placeholder="Sélectionner un pays"
  [options]="[
    { value: 'fr', label: 'France' },
    { value: 'be', label: 'Belgique' },
    { value: 'ch', label: 'Suisse' },
    { value: 'ca', label: 'Canada' }
  ]"
></ds-select>`,
    },
    {
      id: 'searchable',
      name: 'Searchable',
      description: 'Select avec recherche.',
      controls: [],
      code: `<ds-select
  label="Rechercher un pays"
  [options]="countries"
  [searchable]="true"
></ds-select>`,
    },
    {
      id: 'states',
      name: 'States',
      description: 'États disabled et error.',
      controls: [],
      code: `<ds-select
  label="Disabled"
  [options]="options"
  [disabled]="true"
></ds-select>

<ds-select
  label="Error"
  [options]="options"
  error="Veuillez sélectionner une option"
></ds-select>`,
    },
  ],
};
