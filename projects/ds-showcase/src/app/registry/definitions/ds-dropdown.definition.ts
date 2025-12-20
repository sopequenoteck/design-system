import { ComponentDefinition } from '../types';
import { getExampleSources } from '../../../generated/examples-source.generated';

export const DsDropdownDefinition: ComponentDefinition = {
  id: 'ds-dropdown',
  name: 'Dropdown',
  selector: 'ds-dropdown',
  category: 'overlays',
  description:
    "Menu déroulant avec bouton trigger, navigation clavier complète et support ControlValueAccessor.",
  props: [
    {
      name: 'dropdownItems',
      kind: 'input',
      type: 'DropdownItem[]',
      description: 'Liste des options du menu (requis)',
      required: true,
    },
    {
      name: 'selectedItem',
      kind: 'input',
      type: 'string | null',
      description: "Code de l'option sélectionnée",
    },
    {
      name: 'type',
      kind: 'input',
      type: "'primary' | 'secondary' | 'success' | 'warning' | 'error'",
      defaultValue: "'primary'",
      description: 'Variante du bouton trigger',
    },
    {
      name: 'variant',
      kind: 'input',
      type: "'solid' | 'outline'",
      defaultValue: "'solid'",
      description: 'Apparence du bouton',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille du dropdown',
    },
    {
      name: 'position',
      kind: 'input',
      type: "'bottom' | 'top' | 'right'",
      defaultValue: "'bottom'",
      description: "Direction d'ouverture",
    },
    {
      name: 'disabled',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Désactive le dropdown',
    },
    {
      name: 'loading',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Affiche un état de chargement',
    },
    {
      name: 'closeOnSelect',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Ferme le menu après sélection',
    },
    {
      name: 'selectedItemChanged',
      kind: 'output',
      type: 'EventEmitter<string>',
      description: "Émis lors de la sélection d'un item",
    },
    {
      name: 'opened',
      kind: 'output',
      type: 'EventEmitter<void>',
      description: "Émis à l'ouverture",
    },
    {
      name: 'closed',
      kind: 'output',
      type: 'EventEmitter<void>',
      description: 'Émis à la fermeture',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Dropdown avec contrôles interactifs.',
      examplePath: 'ds-dropdown/default',
      sources: getExampleSources('ds-dropdown', 'default'),
      controls: [
        { name: 'type', type: 'select', defaultValue: 'primary', options: ['primary', 'secondary', 'success', 'warning', 'error'] },
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
        { name: 'position', type: 'select', defaultValue: 'bottom', options: ['bottom', 'top', 'right'] },
      ],
      code: `<ds-dropdown
  [dropdownItems]="items"
  [type]="type"
  [size]="size"
  [position]="position"
  (selectedItemChanged)="onSelect($event)"
>
  Sélectionner
</ds-dropdown>`,
    },
    {
      id: 'with-icons',
      name: 'With Icons',
      description: 'Items avec icônes.',
      controls: [],
      code: `<ds-dropdown
  [dropdownItems]="itemsWithIcons"
  [dropdownStartIcon]="faUser"
>
  Actions
</ds-dropdown>

// itemsWithIcons = [
//   { code: 'edit', label: 'Modifier', icon: faEdit },
//   { code: 'delete', label: 'Supprimer', icon: faTrash },
// ]`,
    },
    {
      id: 'outline',
      name: 'Outline Variant',
      description: 'Style outline.',
      controls: [],
      code: `<ds-dropdown
  [dropdownItems]="items"
  variant="outline"
  type="secondary"
>
  Options
</ds-dropdown>`,
    },
    {
      id: 'with-form',
      name: 'With Reactive Form',
      description: 'Intégration formulaire réactif.',
      controls: [],
      code: `<ds-dropdown
  [dropdownItems]="statusOptions"
  formControlName="status"
>
  {{ selectedStatus?.label || 'Choisir' }}
</ds-dropdown>`,
    },
  ],
};
