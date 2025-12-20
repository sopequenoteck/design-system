import { ComponentDefinition } from '../types';
import { getExampleSources } from '../../../generated/examples-source.generated';

export const DsCheckboxListDefinition: ComponentDefinition = {
  id: 'ds-checkbox-list',
  name: 'Checkbox List',
  selector: 'ds-checkbox-list',
  category: 'forms',
  description:
    'Liste de checkboxes avec support d\'icônes/emojis, sélection globale, helper text par item et navigation clavier.',
  props: [
    {
      name: 'items',
      kind: 'model',
      type: 'CheckboxListItem[]',
      defaultValue: '[]',
      description: 'Liste des items (two-way binding avec model)',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille du composant',
    },
    {
      name: 'showSelectAll',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Afficher le checkbox "Tout sélectionner"',
    },
    {
      name: 'selectAllLabel',
      kind: 'input',
      type: 'string',
      defaultValue: "'Tout sélectionner'",
      description: 'Label du checkbox "Tout sélectionner"',
    },
    {
      name: 'ariaLabel',
      kind: 'input',
      type: 'string',
      defaultValue: "'Liste de sélection'",
      description: 'Label ARIA pour l\'accessibilité',
    },
    {
      name: 'disabled',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Désactiver toute la liste',
    },
    {
      name: 'itemChange',
      kind: 'output',
      type: 'EventEmitter<CheckboxListItemChangeEvent>',
      description: 'Émis lors du changement d\'un item',
    },
    {
      name: 'change',
      kind: 'output',
      type: 'EventEmitter<CheckboxListChangeEvent>',
      description: 'Émis lors de tout changement (liste complète)',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Liste de checkboxes avec contrôles interactifs.',
      examplePath: 'ds-checkbox-list/default',
      sources: getExampleSources('ds-checkbox-list', 'default'),
      controls: [
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
        { name: 'showSelectAll', type: 'boolean', defaultValue: false },
        { name: 'disabled', type: 'boolean', defaultValue: false },
      ],
      code: `<ds-checkbox-list
  [(items)]="items"
  [size]="size"
  [showSelectAll]="showSelectAll"
  [disabled]="disabled"
/>`,
    },
    {
      id: 'with-select-all',
      name: 'With Select All',
      description: 'Checkbox "Tout sélectionner" pour sélectionner/désélectionner tous les items.',
      controls: [],
      code: `<ds-checkbox-list
  [(items)]="items"
  [showSelectAll]="true"
  selectAllLabel="Sélectionner tout"
/>`,
    },
    {
      id: 'with-icons',
      name: 'With Icons/Emojis',
      description: 'Items avec icônes FontAwesome ou emojis.',
      controls: [],
      code: `<ds-checkbox-list
  [(items)]="itemsWithIcons"
/>

// itemsWithIcons = [
//   { id: 1, label: 'Email', emoji: '📧', checked: true },
//   { id: 2, label: 'SMS', emoji: '💬', checked: false },
//   { id: 3, label: 'Push', emoji: '🔔', checked: true },
// ]`,
    },
    {
      id: 'with-helper-text',
      name: 'With Helper Text',
      description: 'Items avec texte d\'aide descriptif.',
      controls: [],
      code: `<ds-checkbox-list
  [(items)]="itemsWithHelper"
/>

// itemsWithHelper = [
//   { id: 1, label: 'Newsletter', helper: 'Recevez nos actualités', checked: false },
//   { id: 2, label: 'Alertes', helper: 'Notifications importantes', checked: true },
// ]`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<ds-checkbox-list [(items)]="items" size="sm" />
<ds-checkbox-list [(items)]="items" size="md" />
<ds-checkbox-list [(items)]="items" size="lg" />`,
    },
  ],
};
