import { ComponentDefinition } from '../types';
import { getExampleSources } from '../../../generated/examples-source.generated';

export const DsAccordionDefinition: ComponentDefinition = {
  id: 'ds-accordion',
  name: 'Accordion',
  selector: 'ds-accordion',
  category: 'navigation',
  description:
    "Composant accordion pour afficher/masquer des sections de contenu. Supporte le mode data-driven (texte simple) et template-driven (contenu riche via <ds-accordion-item>).",
  props: [
    {
      name: 'items',
      kind: 'input',
      type: 'AccordionItem[]',
      defaultValue: '[]',
      description: "Liste des items (mode data-driven). Laisser vide pour utiliser le mode template-driven.",
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
      name: 'expandedBorderColor',
      kind: 'input',
      type: 'string',
      defaultValue: 'undefined',
      description: "Couleur de bordure quand un item est ouvert (variant separated). Fallback: --color-primary",
    },
    {
      name: 'itemChange',
      kind: 'output',
      type: 'EventEmitter<AccordionChangeEvent>',
      description: "Émis lors du changement d'état d'un item",
    },
    // DsAccordionItem props (mode template-driven)
    {
      name: 'header',
      kind: 'input',
      type: 'string',
      description: '[DsAccordionItem] Texte du header',
    },
    {
      name: 'badge',
      kind: 'input',
      type: 'string | number',
      description: '[DsAccordionItem] Badge optionnel (ex: compteur)',
    },
    {
      name: 'id (item)',
      kind: 'input',
      type: 'string',
      description: "[DsAccordionItem] ID unique de l'item (auto-généré si non fourni)",
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
    {
      id: 'template-driven',
      name: 'Template-Driven (Rich Content)',
      description: 'Mode template-driven avec contenu riche via <ds-accordion-item>. Supporte badge et projection de contenu Angular.',
      examplePath: 'ds-accordion/template-driven',
      sources: getExampleSources('ds-accordion', 'template-driven'),
      controls: [
        { name: 'multiple', type: 'boolean', defaultValue: true },
        { name: 'variant', type: 'select', defaultValue: 'separated', options: ['default', 'bordered', 'separated'] },
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
      ],
      code: `<ds-accordion [multiple]="true" variant="separated">
  @for (group of groupedItems(); track group.key) {
    <ds-accordion-item [header]="group.label" [badge]="group.items.length">
      <!-- Rich content here: components, HTML, etc. -->
      @for (task of group.items; track task.id) {
        <div class="task-item">{{ task.name }}</div>
      }
    </ds-accordion-item>
  }
</ds-accordion>`,
    },
  ],
};
