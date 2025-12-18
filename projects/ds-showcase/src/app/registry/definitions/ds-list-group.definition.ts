import { ComponentDefinition } from '../types';

export const DsListGroupDefinition: ComponentDefinition = {
  id: 'ds-list-group',
  name: 'List Group',
  selector: 'ds-list-group',
  category: 'data-display',
  description:
    "Composant de regroupement d'éléments de liste avec header et contenu collapsible.",
  props: [
    {
      name: 'title',
      kind: 'input',
      type: 'string',
      description: 'Titre du groupe (requis)',
    },
    {
      name: 'subtitle',
      kind: 'input',
      type: 'string',
      description: 'Sous-titre optionnel',
    },
    {
      name: 'count',
      kind: 'input',
      type: 'number',
      description: "Nombre d'éléments (affiché comme badge)",
    },
    {
      name: 'variant',
      kind: 'input',
      type: "'default' | 'collapsible'",
      defaultValue: "'default'",
      description: 'Variante du groupe',
    },
    {
      name: 'expanded',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'État expanded (pour variante collapsible)',
    },
    {
      name: 'sticky',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Header sticky au scroll',
    },
    {
      name: 'expandedChange',
      kind: 'output',
      type: 'EventEmitter<{ expanded: boolean }>',
      description: 'Émis lors du toggle expand/collapse',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Groupe de liste simple.',
      controls: [
        { name: 'variant', type: 'select', defaultValue: 'default', options: ['default', 'collapsible'] },
        { name: 'sticky', type: 'boolean', defaultValue: false },
      ],
      code: `<ds-list-group title="Aujourd'hui" [variant]="variant" [sticky]="sticky">
  <ds-list-item title="Tâche 1" />
  <ds-list-item title="Tâche 2" />
</ds-list-group>`,
    },
    {
      id: 'with-count',
      name: 'With Count',
      description: 'Groupe avec compteur.',
      controls: [],
      code: `<ds-list-group title="Messages" [count]="5">
  <ds-list-item title="Message 1" />
  <ds-list-item title="Message 2" />
</ds-list-group>`,
    },
    {
      id: 'collapsible',
      name: 'Collapsible',
      description: 'Groupe collapsible.',
      controls: [],
      code: `<ds-list-group
  title="Cette semaine"
  [count]="3"
  variant="collapsible"
  [expanded]="true"
  (expandedChange)="onToggle($event)"
>
  <ds-list-item title="Tâche 1" />
  <ds-list-item title="Tâche 2" />
  <ds-list-item title="Tâche 3" />
</ds-list-group>`,
    },
    {
      id: 'multiple-groups',
      name: 'Multiple Groups',
      description: 'Plusieurs groupes dans une liste.',
      controls: [],
      code: `<ds-list>
  <ds-list-group title="Haute priorité" [count]="2" variant="collapsible">
    <ds-list-item title="Urgent 1" />
    <ds-list-item title="Urgent 2" />
  </ds-list-group>
  <ds-list-group title="Normale" [count]="3" variant="collapsible">
    <ds-list-item title="Normal 1" />
    <ds-list-item title="Normal 2" />
    <ds-list-item title="Normal 3" />
  </ds-list-group>
</ds-list>`,
    },
  ],
};
