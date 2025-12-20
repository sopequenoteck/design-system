import { ComponentDefinition } from '../types';
import { getExampleSources } from '../../../generated/examples-source.generated';

export const DsNavListDefinition: ComponentDefinition = {
  id: 'ds-nav-list',
  name: 'Nav List',
  selector: 'ds-nav-list',
  category: 'navigation',
  description:
    "Liste de navigation/filtrage avec groupes, icônes, badges et indicateurs colorés.",
  props: [
    {
      name: 'groups',
      kind: 'input',
      type: 'NavListGroup[]',
      description: "Liste des groupes d'items (requis)",
      required: true,
    },
    {
      name: 'activeItemId',
      kind: 'input',
      type: 'string | number | null',
      defaultValue: 'null',
      description: "ID de l'item actif",
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille du composant',
    },
    {
      name: 'ariaLabel',
      kind: 'input',
      type: 'string',
      defaultValue: "'Navigation'",
      description: "Label ARIA pour l'accessibilité",
    },
    {
      name: 'itemClick',
      kind: 'output',
      type: 'EventEmitter<NavListItemClickEvent>',
      description: 'Émis lors du clic sur un item',
    },
    {
      name: 'groupToggle',
      kind: 'output',
      type: 'EventEmitter<NavListGroupToggleEvent>',
      description: "Émis lors du toggle d'un groupe",
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Liste de navigation simple.',
      examplePath: 'ds-nav-list/default',
      sources: getExampleSources('ds-nav-list', 'default'),
      controls: [
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
      ],
      code: `<ds-nav-list
  [groups]="navGroups"
  [activeItemId]="activeFilter"
  [size]="size"
  (itemClick)="onItemClick($event)"
/>`,
    },
    {
      id: 'with-badges',
      name: 'With Badges',
      description: 'Items avec compteurs.',
      controls: [],
      code: `<ds-nav-list
  [groups]="navGroupsWithBadges"
  [activeItemId]="activeFilter"
  (itemClick)="onItemClick($event)"
/>`,
    },
    {
      id: 'collapsible',
      name: 'Collapsible Groups',
      description: 'Groupes repliables.',
      controls: [],
      code: `<ds-nav-list
  [groups]="collapsibleGroups"
  [activeItemId]="activeFilter"
  (groupToggle)="onGroupToggle($event)"
/>`,
    },
    {
      id: 'with-icons',
      name: 'With Icons',
      description: 'Items avec icônes.',
      controls: [],
      code: `<ds-nav-list
  [groups]="navGroupsWithIcons"
  [activeItemId]="activeFilter"
/>`,
    },
  ],
};
