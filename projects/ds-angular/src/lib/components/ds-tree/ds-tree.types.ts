import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/**
 * Tailles disponibles pour le tree.
 */
export type TreeSize = 'sm' | 'md' | 'lg';

/**
 * Interface représentant un nœud de l'arbre.
 */
export interface TreeNode {
  id: string | number;
  label: string;
  children?: TreeNode[];
  icon?: IconDefinition;
  expandedIcon?: IconDefinition;
  disabled?: boolean;
  expanded?: boolean;
  checked?: boolean;
  data?: any;
}

/**
 * Événement de sélection d'un nœud.
 */
export interface TreeNodeSelectEvent {
  node: TreeNode;
  selected: boolean;
}

/**
 * Événement d'expansion/collapse d'un nœud.
 */
export interface TreeNodeExpandEvent {
  node: TreeNode;
  expanded: boolean;
}

/**
 * Événement de check d'un nœud.
 */
export interface TreeNodeCheckEvent {
  node: TreeNode;
  checked: boolean;
}
