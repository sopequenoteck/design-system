import { ComponentDefinition } from '../types';
import { getExampleSources } from '../../../generated/examples-source.generated';

export const DsListItemDefinition: ComponentDefinition = {
  id: 'ds-list-item',
  name: 'List Item',
  selector: 'ds-list-item',
  category: 'data-display',
  description:
    "Composant de ligne d'élément de liste interactif avec checkbox, indicateur de priorité et slots pour métadonnées.",
  props: [
    {
      name: 'title',
      kind: 'input',
      type: 'string',
      description: "Titre principal de l'élément (requis)",
    },
    {
      name: 'subtitle',
      kind: 'input',
      type: 'string',
      description: 'Sous-titre optionnel',
    },
    {
      name: 'indicator',
      kind: 'input',
      type: "'none' | 'priority' | 'dot' | 'status'",
      defaultValue: "'none'",
      description: 'Type d\'indicateur à afficher',
    },
    {
      name: 'indicatorColor',
      kind: 'input',
      type: "'high' | 'medium' | 'low' | 'success' | 'warning' | 'error' | 'info' | string",
      defaultValue: "'medium'",
      description: "Couleur de l'indicateur",
    },
    {
      name: 'checkable',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Affiche une checkbox',
    },
    {
      name: 'checked',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'État coché de la checkbox',
    },
    {
      name: 'completed',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Applique le style complété',
    },
    {
      name: 'disabled',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: "Désactive l'interaction",
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: "Taille de l'élément",
    },
    {
      name: 'checkedChange',
      kind: 'output',
      type: 'EventEmitter<{ checked: boolean }>',
      description: 'Émis lors du changement de la checkbox',
    },
    {
      name: 'clicked',
      kind: 'output',
      type: 'EventEmitter<{ event: Event }>',
      description: "Émis lors du clic sur l'élément",
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'List item avec contrôles interactifs.',
      examplePath: 'ds-list-item/default',
      sources: getExampleSources('ds-list-item', 'default'),
      controls: [
        { name: 'checkable', type: 'boolean', defaultValue: false },
        { name: 'indicator', type: 'select', defaultValue: 'none', options: ['none', 'priority', 'dot', 'status'] },
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
      ],
      code: `<ds-list-item
  title="Ma tâche"
  [checkable]="checkable"
  [indicator]="indicator"
  [size]="size"
/>`,
    },
    {
      id: 'with-checkbox',
      name: 'With Checkbox',
      description: 'Item avec checkbox pour liste de tâches.',
      controls: [],
      code: `<ds-list-item
  title="Tâche à faire"
  [checkable]="true"
  [checked]="isChecked"
  (checkedChange)="onCheck($event)"
/>`,
    },
    {
      id: 'with-priority',
      name: 'With Priority',
      description: 'Item avec indicateur de priorité.',
      controls: [],
      code: `<ds-list-item
  title="Tâche urgente"
  indicator="priority"
  indicatorColor="high"
/>
<ds-list-item
  title="Tâche normale"
  indicator="priority"
  indicatorColor="medium"
/>
<ds-list-item
  title="Tâche basse priorité"
  indicator="priority"
  indicatorColor="low"
/>`,
    },
    {
      id: 'completed',
      name: 'Completed State',
      description: 'Item avec état complété.',
      controls: [],
      code: `<ds-list-item
  title="Tâche terminée"
  [checkable]="true"
  [checked]="true"
  [completed]="true"
/>`,
    },
  ],
};
