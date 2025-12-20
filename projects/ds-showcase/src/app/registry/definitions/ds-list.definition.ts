import { ComponentDefinition } from '../types';
import { getExampleSources } from '../../../generated/examples-source.generated';

export const DsListDefinition: ComponentDefinition = {
  id: 'ds-list',
  name: 'List',
  selector: 'ds-list',
  category: 'data-display',
  description:
    "Composant conteneur pour afficher une liste d'éléments avec support loading, empty state, drag & drop et virtualisation.",
  props: [
    {
      name: 'variant',
      kind: 'input',
      type: "'default' | 'bordered' | 'separated'",
      defaultValue: "'default'",
      description: 'Variante visuelle de la liste',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille de la liste',
    },
    {
      name: 'loading',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Affiche les skeletons de chargement',
    },
    {
      name: 'loadingCount',
      kind: 'input',
      type: 'number',
      defaultValue: '3',
      description: 'Nombre de skeletons à afficher',
    },
    {
      name: 'empty',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: "Affiche l'état vide",
    },
    {
      name: 'emptyTitle',
      kind: 'input',
      type: 'string',
      defaultValue: "'Aucun élément'",
      description: "Titre de l'état vide",
    },
    {
      name: 'draggable',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Active le mode Drag & Drop',
    },
    {
      name: 'virtual',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Active la virtualisation',
    },
    {
      name: 'selectable',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Active la sélection multiple',
    },
    {
      name: 'dropped',
      kind: 'output',
      type: 'EventEmitter<ListDragEvent>',
      description: "Émis lors d'un drop",
    },
    {
      name: 'selectionChange',
      kind: 'output',
      type: 'EventEmitter<ListSelectionChangeEvent>',
      description: 'Émis lors du changement de sélection',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Liste simple avec items.',
      examplePath: 'ds-list/default',
      sources: getExampleSources('ds-list', 'default'),
      controls: [
        { name: 'variant', type: 'select', defaultValue: 'default', options: ['default', 'bordered', 'separated'] },
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
      ],
      code: `<ds-list [variant]="variant" [size]="size">
  <ds-list-item title="Item 1" />
  <ds-list-item title="Item 2" />
  <ds-list-item title="Item 3" />
</ds-list>`,
    },
    {
      id: 'loading',
      name: 'Loading State',
      description: 'Liste en état de chargement.',
      controls: [],
      code: `<ds-list [loading]="true" [loadingCount]="5" />`,
    },
    {
      id: 'empty',
      name: 'Empty State',
      description: 'Liste vide avec message.',
      controls: [],
      code: `<ds-list
  [empty]="true"
  emptyTitle="Aucun élément"
  emptyDescription="Ajoutez des éléments pour commencer"
/>`,
    },
    {
      id: 'draggable',
      name: 'Draggable',
      description: 'Liste avec drag & drop.',
      controls: [],
      code: `<ds-list [draggable]="true" [dragData]="items" (dropped)="onDrop($event)">
  @for (item of items; track item.id) {
    <ds-list-item [title]="item.title" cdkDrag />
  }
</ds-list>`,
    },
  ],
};
