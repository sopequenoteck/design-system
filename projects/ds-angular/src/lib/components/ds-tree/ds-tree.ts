import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  signal,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsTreeNodeComponent } from './ds-tree-node.component';

// Re-export des types depuis le fichier dédié
export type { TreeSize, TreeNode, TreeNodeSelectEvent, TreeNodeExpandEvent, TreeNodeCheckEvent } from './ds-tree.types';
import type { TreeSize, TreeNode, TreeNodeSelectEvent, TreeNodeExpandEvent, TreeNodeCheckEvent } from './ds-tree.types';

/**
 * DsTree - Composant d'affichage hiérarchique
 *
 * @description
 * Arbre hiérarchique avec support de sélection, checkbox,
 * expand/collapse, et navigation clavier.
 *
 * @example
 * ```html
 * <ds-tree
 *   [data]="treeData"
 *   [selectable]="true"
 *   (nodeSelect)="onNodeSelect($event)">
 * </ds-tree>
 * ```
 */
@Component({
  selector: 'ds-tree',
  standalone: true,
  imports: [CommonModule, DsTreeNodeComponent],
  templateUrl: './ds-tree.html',
  styleUrl: './ds-tree.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsTree {
  // Inputs
  readonly data = input<TreeNode[]>([]);
  readonly selectable = input(true);
  readonly checkable = input(false);
  readonly expandAll = input(false);
  readonly showIcon = input(true);
  readonly showLine = input(false);
  readonly draggable = input(false);
  readonly virtualScroll = input(false);
  readonly size = input<TreeSize>('md');
  readonly loadChildren = input<((node: TreeNode) => Promise<TreeNode[]>) | null>(null);

  // Outputs
  readonly nodeSelect = output<TreeNodeSelectEvent>();
  readonly nodeExpand = output<TreeNodeExpandEvent>();
  readonly nodeCheck = output<TreeNodeCheckEvent>();

  // State
  readonly selectedNodeId = signal<string | number | null>(null);
  readonly expandedNodeIds = signal<Set<string | number>>(new Set());
  readonly checkedNodeIds = signal<Set<string | number>>(new Set());

  // Computed
  readonly containerClasses = computed(() => {
    const classes = ['ds-tree'];
    classes.push(`ds-tree--${this.size()}`);
    if (this.showLine()) classes.push('ds-tree--with-lines');
    if (this.checkable()) classes.push('ds-tree--checkable');
    return classes.join(' ');
  });

  readonly processedData = computed(() => {
    return this.data();
  });

  constructor() {
    // Initialize expanded state from data
    this.initializeExpandedState();

    // Effect to handle expandAll changes
    effect(() => {
      if (this.expandAll()) {
        this.expandAllNodes(this.data());
      }
    });
  }

  onNodeClick(node: TreeNode): void {
    if (node.disabled || !this.selectable()) return;

    this.selectedNodeId.set(node.id);
    this.nodeSelect.emit({ node, selected: true });
  }

  onNodeToggle(node: TreeNode): void {
    if (node.disabled) return;

    const expanded = !this.isExpanded(node.id);
    this.toggleExpand(node.id, expanded);
    this.nodeExpand.emit({ node, expanded });

    // Load children if lazy loading
    if (expanded && this.loadChildren()) {
      const loader = this.loadChildren();
      if (loader) {
        loader(node).then((children) => {
          node.children = children;
        });
      }
    }
  }

  onNodeCheck(node: TreeNode, checked: boolean): void {
    if (node.disabled) return;

    this.setNodeChecked(node, checked);
    this.nodeCheck.emit({ node, checked });
  }

  isSelected(nodeId: string | number): boolean {
    return this.selectedNodeId() === nodeId;
  }

  isExpanded(nodeId: string | number): boolean {
    return this.expandedNodeIds().has(nodeId);
  }

  isChecked(nodeId: string | number): boolean {
    return this.checkedNodeIds().has(nodeId);
  }

  getIndeterminateState(node: TreeNode): boolean {
    if (!node.children || node.children.length === 0) return false;

    const checkedChildren = node.children.filter((child) => this.isChecked(child.id));
    return checkedChildren.length > 0 && checkedChildren.length < node.children.length;
  }

  private toggleExpand(nodeId: string | number, expanded: boolean): void {
    const expandedIds = new Set(this.expandedNodeIds());
    if (expanded) {
      expandedIds.add(nodeId);
    } else {
      expandedIds.delete(nodeId);
    }
    this.expandedNodeIds.set(expandedIds);
  }

  private setNodeChecked(node: TreeNode, checked: boolean): void {
    const checkedIds = new Set(this.checkedNodeIds());

    // Update current node
    if (checked) {
      checkedIds.add(node.id);
    } else {
      checkedIds.delete(node.id);
    }

    // Update all children recursively
    if (node.children) {
      this.updateChildrenChecked(node.children, checked, checkedIds);
    }

    this.checkedNodeIds.set(checkedIds);
  }

  private updateChildrenChecked(
    children: TreeNode[],
    checked: boolean,
    checkedIds: Set<string | number>
  ): void {
    children.forEach((child) => {
      if (!child.disabled) {
        if (checked) {
          checkedIds.add(child.id);
        } else {
          checkedIds.delete(child.id);
        }

        if (child.children) {
          this.updateChildrenChecked(child.children, checked, checkedIds);
        }
      }
    });
  }

  private expandAllNodes(nodes: TreeNode[]): void {
    const expandedIds = new Set(this.expandedNodeIds());

    const expand = (items: TreeNode[]) => {
      items.forEach((item) => {
        if (item.children && item.children.length > 0) {
          expandedIds.add(item.id);
          expand(item.children);
        }
      });
    };

    expand(nodes);
    this.expandedNodeIds.set(expandedIds);
  }

  private initializeExpandedState(): void {
    const data = this.data();
    const expandedIds = new Set<string | number>();

    const findExpanded = (nodes: TreeNode[]) => {
      nodes.forEach((node) => {
        if (node.expanded) {
          expandedIds.add(node.id);
        }
        if (node.children) {
          findExpanded(node.children);
        }
      });
    };

    findExpanded(data);
    this.expandedNodeIds.set(expandedIds);
  }
}
