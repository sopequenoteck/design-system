import { ComponentDefinition } from '../types';
import { getExampleSources } from '../../../generated/examples-source.generated';

export const DsAccordionDefinition: ComponentDefinition = {
  id: 'ds-accordion',
  name: 'Accordion',
  selector: 'ds-accordion',
  category: 'navigation',
  description:
    "Composant accordion pour afficher/masquer des sections de contenu avec support multi-ouverture et navigation clavier.",
  props: [
    {
      name: 'items',
      kind: 'input',
      type: 'AccordionItem[]',
      description: "Liste des items de l'accordion (requis)",
      required: true,
    },
    {
      name: 'multiple',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Permettre plusieurs items ouverts',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille du composant',
    },
    {
      name: 'variant',
      kind: 'input',
      type: "'default' | 'bordered' | 'separated'",
      defaultValue: "'default'",
      description: 'Variante de style',
    },
    {
      name: 'expandedIds',
      kind: 'input',
      type: 'string[]',
      defaultValue: '[]',
      description: 'IDs des items initialement ouverts',
    },
    {
      name: 'disabled',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: "Désactiver tout l'accordion",
    },
    {
      name: 'itemChange',
      kind: 'output',
      type: 'EventEmitter<AccordionChangeEvent>',
      description: "Émis lors du changement d'état d'un item",
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Accordion avec contrôles interactifs.',
      examplePath: 'ds-accordion/default',
      sources: getExampleSources('ds-accordion', 'default'),
      controls: [
        { name: 'multiple', type: 'boolean', defaultValue: false },
        { name: 'variant', type: 'select', defaultValue: 'default', options: ['default', 'bordered', 'separated'] },
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
      ],
      code: `<ds-accordion
  [items]="items"
  [multiple]="multiple"
  [variant]="variant"
  [size]="size"
  (itemChange)="onItemChange($event)"
/>`,
    },
    {
      id: 'multiple',
      name: 'Multiple',
      description: 'Plusieurs sections ouvertes simultanément.',
      controls: [],
      code: `<ds-accordion
  [items]="items"
  [multiple]="true"
/>`,
    },
    {
      id: 'bordered',
      name: 'Bordered',
      description: 'Style avec bordures.',
      controls: [],
      code: `<ds-accordion
  [items]="items"
  variant="bordered"
/>`,
    },
    {
      id: 'separated',
      name: 'Separated',
      description: 'Items séparés visuellement.',
      controls: [],
      code: `<ds-accordion
  [items]="items"
  variant="separated"
/>`,
    },
  ],
};
