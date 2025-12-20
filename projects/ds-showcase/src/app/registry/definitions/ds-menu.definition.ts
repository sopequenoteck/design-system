import { ComponentDefinition } from '../types';
import { getExampleSources } from '../../../generated/examples-source.generated';

export const DsMenuDefinition: ComponentDefinition = {
  id: 'ds-menu',
  name: 'Menu',
  selector: 'ds-menu',
  category: 'navigation',
  description:
    "Menu contextuel avec trigger click ou clic droit, icônes, dividers et navigation clavier complète.",
  props: [
    {
      name: 'items',
      kind: 'input',
      type: 'MenuItem[]',
      description: 'Liste des items du menu (requis)',
      required: true,
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille du menu',
    },
    {
      name: 'trigger',
      kind: 'input',
      type: "'click' | 'contextmenu'",
      defaultValue: "'click'",
      description: 'Événement déclencheur',
    },
    {
      name: 'closeOnSelect',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Fermer le menu après sélection',
    },
    {
      name: 'ariaLabel',
      kind: 'input',
      type: 'string',
      description: "Label ARIA pour l'accessibilité",
    },
    {
      name: 'itemSelected',
      kind: 'output',
      type: 'EventEmitter<MenuItem>',
      description: "Émis lors de la sélection d'un item",
    },
    {
      name: 'opened',
      kind: 'output',
      type: 'EventEmitter<void>',
      description: "Émis à l'ouverture du menu",
    },
    {
      name: 'closed',
      kind: 'output',
      type: 'EventEmitter<void>',
      description: 'Émis à la fermeture du menu',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Menu avec contrôles interactifs.',
      examplePath: 'ds-menu/default',
      sources: getExampleSources('ds-menu', 'default'),
      controls: [
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
        { name: 'trigger', type: 'select', defaultValue: 'click', options: ['click', 'contextmenu'] },
      ],
      code: `<ds-menu
  [items]="menuItems"
  [size]="size"
  [trigger]="trigger"
  (itemSelected)="onItemSelect($event)"
>
  <button>Ouvrir le menu</button>
</ds-menu>`,
    },
    {
      id: 'with-icons',
      name: 'With Icons',
      description: 'Items avec icônes FontAwesome.',
      controls: [],
      code: `<ds-menu
  [items]="menuItemsWithIcons"
  (itemSelected)="onItemSelect($event)"
>
  <button>Actions</button>
</ds-menu>`,
    },
    {
      id: 'with-dividers',
      name: 'With Dividers',
      description: 'Menu avec séparateurs.',
      controls: [],
      code: `<ds-menu
  [items]="menuItemsWithDividers"
  (itemSelected)="onItemSelect($event)"
>
  <button>Options</button>
</ds-menu>`,
    },
    {
      id: 'context-menu',
      name: 'Context Menu',
      description: 'Menu clic droit.',
      controls: [],
      code: `<ds-menu
  [items]="menuItems"
  trigger="contextmenu"
  (itemSelected)="onItemSelect($event)"
>
  <div class="context-area">Clic droit ici</div>
</ds-menu>`,
    },
  ],
};
