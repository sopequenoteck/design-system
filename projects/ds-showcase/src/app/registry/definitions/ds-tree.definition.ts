import { ComponentDefinition } from '../types';
import { getExampleSources } from '../../../generated/examples-source.generated';

export const DsTreeDefinition: ComponentDefinition = {
  id: 'ds-tree',
  name: 'Tree',
  selector: 'ds-tree',
  category: 'data-display',
  description:
    "Composant d'affichage hiérarchique avec sélection, checkbox tri-state, expand/collapse et navigation clavier.",
  props: [
    {
      name: 'data',
      kind: 'input',
      type: 'TreeNode[]',
      defaultValue: '[]',
      description: "Données de l'arbre",
    },
    {
      name: 'selectable',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Active la sélection de nœuds',
    },
    {
      name: 'checkable',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Affiche des checkboxes',
    },
    {
      name: 'expandAll',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Étend tous les nœuds par défaut',
    },
    {
      name: 'showIcon',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Affiche les icônes',
    },
    {
      name: 'showLine',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Affiche les lignes de connexion',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: "Taille de l'arbre",
    },
    {
      name: 'nodeSelect',
      kind: 'output',
      type: 'EventEmitter<{ node: TreeNode; selected: boolean }>',
      description: 'Émis lors de la sélection',
    },
    {
      name: 'nodeExpand',
      kind: 'output',
      type: 'EventEmitter<{ node: TreeNode; expanded: boolean }>',
      description: "Émis lors de l'expand/collapse",
    },
    {
      name: 'nodeCheck',
      kind: 'output',
      type: 'EventEmitter<{ node: TreeNode; checked: boolean }>',
      description: 'Émis lors du check/uncheck',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Arbre avec contrôles interactifs.',
      examplePath: 'ds-tree/default',
      sources: getExampleSources('ds-tree', 'default'),
      controls: [
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
        { name: 'checkable', type: 'boolean', defaultValue: false },
        { name: 'showLine', type: 'boolean', defaultValue: false },
        { name: 'expandAll', type: 'boolean', defaultValue: false },
      ],
      code: `<ds-tree
  [data]="treeData"
  [size]="size"
  [checkable]="checkable"
  [showLine]="showLine"
  [expandAll]="expandAll"
/>`,
    },
    {
      id: 'checkable',
      name: 'With Checkboxes',
      description: 'Arbre avec checkboxes tri-state.',
      controls: [],
      code: `<ds-tree
  [data]="treeData"
  [checkable]="true"
  (nodeCheck)="onNodeCheck($event)"
/>`,
    },
    {
      id: 'with-lines',
      name: 'With Lines',
      description: 'Arbre avec lignes de connexion.',
      controls: [],
      code: `<ds-tree
  [data]="treeData"
  [showLine]="true"
/>`,
    },
    {
      id: 'file-explorer',
      name: 'File Explorer',
      description: 'Exemple explorateur de fichiers.',
      controls: [],
      code: `<ds-tree
  [data]="fileTree"
  [showIcon]="true"
  (nodeSelect)="onFileSelect($event)"
/>

// fileTree = [
//   { id: 1, label: 'src', children: [
//     { id: 2, label: 'components', children: [...] },
//     { id: 3, label: 'app.ts' },
//   ]}
// ]`,
    },
  ],
};
