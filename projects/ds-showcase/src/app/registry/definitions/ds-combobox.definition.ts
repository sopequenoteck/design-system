import { ComponentDefinition } from '../types';

export const DsComboboxDefinition: ComponentDefinition = {
  id: 'ds-combobox',
  name: 'Combobox',
  selector: 'ds-combobox',
  category: 'forms',
  description:
    'Champ de recherche autocomplete avec filtrage, descriptions d\'options, et support des valeurs personnalisées.',
  props: [
    {
      name: 'options',
      kind: 'input',
      type: 'DsComboboxOption[]',
      defaultValue: '[]',
      description: 'Liste des options disponibles',
    },
    {
      name: 'placeholder',
      kind: 'input',
      type: 'string',
      defaultValue: "'Rechercher...'",
      description: 'Placeholder du champ',
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
      name: 'error',
      kind: 'input',
      type: 'string',
      defaultValue: "''",
      description: 'Message d\'erreur',
    },
    {
      name: 'helper',
      kind: 'input',
      type: 'string',
      defaultValue: "''",
      description: 'Texte d\'aide',
    },
    {
      name: 'label',
      kind: 'input',
      type: 'string',
      defaultValue: "''",
      description: 'Label du champ',
    },
    {
      name: 'clearable',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Afficher le bouton clear',
    },
    {
      name: 'allowCustom',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Autoriser les valeurs personnalisées',
    },
    {
      name: 'minChars',
      kind: 'input',
      type: 'number',
      defaultValue: '0',
      description: 'Caractères minimum avant filtrage',
    },
    {
      name: 'maxResults',
      kind: 'input',
      type: 'number',
      defaultValue: '50',
      description: 'Nombre maximum de résultats',
    },
    {
      name: 'selectionChange',
      kind: 'output',
      type: 'EventEmitter<DsComboboxOption | null>',
      description: 'Émis lors de la sélection',
    },
    {
      name: 'inputChange',
      kind: 'output',
      type: 'EventEmitter<string>',
      description: 'Émis lors de la saisie',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Combobox avec contrôles interactifs.',
      controls: [
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
        { name: 'clearable', type: 'boolean', defaultValue: true },
        { name: 'disabled', type: 'boolean', defaultValue: false },
      ],
      code: `<ds-combobox
  [options]="options"
  [size]="size"
  [clearable]="clearable"
  [disabled]="disabled"
  placeholder="Rechercher un pays..."
/>`,
    },
    {
      id: 'with-descriptions',
      name: 'With Descriptions',
      description: 'Options avec descriptions détaillées.',
      controls: [],
      code: `<ds-combobox
  [options]="optionsWithDesc"
  placeholder="Rechercher..."
/>

// optionsWithDesc = [
//   { value: 'react', label: 'React', description: 'Bibliothèque UI de Facebook' },
//   { value: 'angular', label: 'Angular', description: 'Framework complet de Google' },
//   { value: 'vue', label: 'Vue.js', description: 'Framework progressif' },
// ]`,
    },
    {
      id: 'allow-custom',
      name: 'Allow Custom Values',
      description: 'Permet de saisir des valeurs personnalisées.',
      controls: [],
      code: `<ds-combobox
  [options]="options"
  [allowCustom]="true"
  placeholder="Tapez ou sélectionnez..."
/>`,
    },
    {
      id: 'min-chars',
      name: 'Minimum Characters',
      description: 'Filtrage déclenché après 2 caractères.',
      controls: [],
      code: `<ds-combobox
  [options]="options"
  [minChars]="2"
  placeholder="Tapez au moins 2 caractères..."
/>`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<ds-combobox [options]="options" size="sm" placeholder="Small" />
<ds-combobox [options]="options" size="md" placeholder="Medium" />
<ds-combobox [options]="options" size="lg" placeholder="Large" />`,
    },
  ],
};
