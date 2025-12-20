import { ComponentDefinition } from '../types';
import { getExampleSources } from '../../../generated/examples-source.generated';

export const DsPaginationDefinition: ComponentDefinition = {
  id: 'ds-pagination',
  name: 'Pagination',
  selector: 'ds-pagination',
  category: 'navigation',
  description:
    "Composant de pagination avec navigation pages, sélecteur de taille et informations de position.",
  props: [
    {
      name: 'totalItems',
      kind: 'input',
      type: 'number',
      description: "Nombre total d'éléments (requis)",
      required: true,
    },
    {
      name: 'pageSize',
      kind: 'input',
      type: 'number',
      defaultValue: '10',
      description: "Nombre d'éléments par page",
    },
    {
      name: 'currentPage',
      kind: 'input',
      type: 'number',
      defaultValue: '1',
      description: 'Page courante (1-indexed)',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille du composant',
    },
    {
      name: 'showFirstLast',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Afficher boutons première/dernière page',
    },
    {
      name: 'showPageSizeSelector',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Afficher sélecteur de taille de page',
    },
    {
      name: 'showInfo',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Afficher "X - Y sur Z"',
    },
    {
      name: 'disabled',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Désactiver le composant',
    },
    {
      name: 'pageChange',
      kind: 'output',
      type: 'EventEmitter<PageChangeEvent>',
      description: 'Émis lors du changement de page',
    },
    {
      name: 'pageSizeChange',
      kind: 'output',
      type: 'EventEmitter<number>',
      description: 'Émis lors du changement de taille',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Pagination avec contrôles.',
      examplePath: 'ds-pagination/default',
      sources: getExampleSources('ds-pagination', 'default'),
      controls: [
        { name: 'totalItems', type: 'number', defaultValue: 100 },
        { name: 'pageSize', type: 'number', defaultValue: 10 },
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
        { name: 'showInfo', type: 'boolean', defaultValue: true },
      ],
      code: `<ds-pagination
  [totalItems]="totalItems"
  [pageSize]="pageSize"
  [currentPage]="currentPage"
  [size]="size"
  [showInfo]="showInfo"
  (pageChange)="onPageChange($event)"
/>`,
    },
    {
      id: 'with-page-size',
      name: 'With Page Size Selector',
      description: 'Sélecteur de taille de page.',
      controls: [],
      code: `<ds-pagination
  [totalItems]="100"
  [pageSize]="10"
  [showPageSizeSelector]="true"
  (pageChange)="onPageChange($event)"
  (pageSizeChange)="onPageSizeChange($event)"
/>`,
    },
    {
      id: 'compact',
      name: 'Compact',
      description: 'Version compacte sans info.',
      controls: [],
      code: `<ds-pagination
  [totalItems]="100"
  [pageSize]="10"
  size="sm"
  [showInfo]="false"
  [showFirstLast]="false"
/>`,
    },
    {
      id: 'many-pages',
      name: 'Many Pages',
      description: 'Avec ellipsis pour nombreuses pages.',
      controls: [],
      code: `<ds-pagination
  [totalItems]="500"
  [pageSize]="10"
  [maxVisiblePages]="5"
/>`,
    },
  ],
};
