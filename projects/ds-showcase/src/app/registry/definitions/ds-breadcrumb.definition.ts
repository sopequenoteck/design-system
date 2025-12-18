import { ComponentDefinition } from '../types';

export const DsBreadcrumbDefinition: ComponentDefinition = {
  id: 'ds-breadcrumb',
  name: 'Breadcrumb',
  selector: 'ds-breadcrumb',
  category: 'navigation',
  description:
    "Fil d'Ariane pour afficher le chemin de navigation avec support de troncature automatique.",
  props: [
    {
      name: 'items',
      kind: 'input',
      type: 'BreadcrumbItem[]',
      description: "Liste des items du fil d'Ariane (requis)",
      required: true,
    },
    {
      name: 'separator',
      kind: 'input',
      type: 'string',
      defaultValue: "'/'",
      description: 'Séparateur entre les items',
    },
    {
      name: 'maxItems',
      kind: 'input',
      type: 'number | undefined',
      description: 'Nombre max d\'items visibles (troncature automatique)',
    },
    {
      name: 'itemClicked',
      kind: 'output',
      type: 'EventEmitter<BreadcrumbItem>',
      description: 'Émis au clic sur un item',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: "Fil d'Ariane simple.",
      controls: [
        { name: 'separator', type: 'text', defaultValue: '/' },
      ],
      code: `<ds-breadcrumb
  [items]="breadcrumbs"
  [separator]="separator"
  (itemClicked)="onItemClick($event)"
/>`,
    },
    {
      id: 'custom-separator',
      name: 'Custom Separator',
      description: 'Séparateur personnalisé.',
      controls: [],
      code: `<ds-breadcrumb
  [items]="breadcrumbs"
  separator=">"
/>`,
    },
    {
      id: 'truncated',
      name: 'Truncated',
      description: 'Troncature avec ellipsis.',
      controls: [],
      code: `<ds-breadcrumb
  [items]="longBreadcrumbs"
  [maxItems]="4"
/>`,
    },
    {
      id: 'with-icons',
      name: 'With Home',
      description: 'Premier item avec icône home.',
      controls: [],
      code: `<ds-breadcrumb
  [items]="breadcrumbsWithHome"
/>`,
    },
  ],
};
