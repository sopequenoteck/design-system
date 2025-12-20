import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChevronRight,
  faChevronDown,
  faFolder,
  faFile,
  faFolderOpen,
} from '@fortawesome/free-solid-svg-icons';
import type { TreeNode } from './ds-tree';

@Component({
  selector: 'ds-tree-node',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, DsTreeNodeComponent],
  template: `
    <div
      class="ds-tree-node"
      [class.ds-tree-node--selected]="isSelected()"
      [class.ds-tree-node--disabled]="node().disabled"
      [attr.role]="'treeitem'"
      [attr.aria-selected]="isSelected()"
      [attr.aria-expanded]="hasChildren() ? isExpanded() : null"
      [attr.aria-disabled]="node().disabled"
      [attr.tabindex]="node().disabled ? -1 : 0"
      (click)="handleClick($event)"
      (keydown.enter)="handleClick($event)"
      (keydown.space)="handleClick($event); $event.preventDefault()"
      (keydown.arrowRight)="handleArrowRight($event)"
      (keydown.arrowLeft)="handleArrowLeft($event)">

      <div class="ds-tree-node__content" [style.padding-left.px]="level() * 20">
        <!-- Expand/collapse toggle -->
        @if (hasChildren()) {
          <button
            type="button"
            class="ds-tree-node__toggle"
            [attr.aria-label]="isExpanded() ? 'Collapse' : 'Expand'"
            (click)="handleToggle($event)">
            <fa-icon
              [icon]="isExpanded() ? expandedIcon : collapsedIcon"
              aria-hidden="true">
            </fa-icon>
          </button>
        } @else {
          <span class="ds-tree-node__toggle-placeholder"></span>
        }

        <!-- Checkbox (if checkable) -->
        @if (checkable()) {
          <input
            type="checkbox"
            class="ds-tree-node__checkbox"
            [checked]="isChecked()"
            [indeterminate]="isIndeterminate()"
            [disabled]="node().disabled"
            (change)="handleCheck($event)"
            (click)="$event.stopPropagation()">
        }

        <!-- Icon -->
        @if (showIcon()) {
          <fa-icon
            class="ds-tree-node__icon"
            [icon]="nodeIcon()"
            aria-hidden="true">
          </fa-icon>
        }

        <!-- Label -->
        <span class="ds-tree-node__label">{{ node().label }}</span>
      </div>
    </div>

    <!-- Children (recursive) -->
    @if (hasChildren() && isExpanded()) {
      <div class="ds-tree-node__children" role="group">
        @for (child of node().children; track child.id) {
          <ds-tree-node
            [node]="child"
            [level]="level() + 1"
            [selectable]="selectable()"
            [checkable]="checkable()"
            [showIcon]="showIcon()"
            [selectedNodeId]="selectedNodeId()"
            [expandedNodeIds]="expandedNodeIds()"
            [checkedNodeIds]="checkedNodeIds()"
            [getIndeterminateState]="getIndeterminateState()"
            (nodeClick)="nodeClick.emit($event)"
            (nodeToggle)="nodeToggle.emit($event)"
            (nodeCheck)="nodeCheck.emit($event)">
          </ds-tree-node>
        }
      </div>
    }
  `,
  styleUrl: './ds-tree-node.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsTreeNodeComponent {
  // Inputs
  readonly node = input.required<TreeNode>();
  readonly level = input(0);
  readonly selectable = input(true);
  readonly checkable = input(false);
  readonly showIcon = input(true);
  readonly selectedNodeId = input<string | number | null>(null);
  readonly expandedNodeIds = input<Set<string | number>>(new Set());
  readonly checkedNodeIds = input<Set<string | number>>(new Set());
  readonly getIndeterminateState = input<((node: TreeNode) => boolean) | null>(null);

  // Outputs
  readonly nodeClick = output<TreeNode>();
  readonly nodeToggle = output<TreeNode>();
  readonly nodeCheck = output<{ node: TreeNode; checked: boolean }>();

  // Icons
  readonly collapsedIcon = faChevronRight;
  readonly expandedIcon = faChevronDown;
  readonly folderIcon = faFolder;
  readonly folderOpenIcon = faFolderOpen;
  readonly fileIcon = faFile;

  // Computed
  readonly hasChildren = computed(() => {
    const children = this.node().children;
    return !!children && children.length > 0;
  });

  readonly isExpanded = computed(() => {
    return this.expandedNodeIds().has(this.node().id);
  });

  readonly isSelected = computed(() => {
    return this.selectedNodeId() === this.node().id;
  });

  readonly isChecked = computed(() => {
    return this.checkedNodeIds().has(this.node().id);
  });

  readonly isIndeterminate = computed(() => {
    const fn = this.getIndeterminateState();
    return fn ? fn(this.node()) : false;
  });

  readonly nodeIcon = computed(() => {
    const node = this.node();

    // Custom icon with optional expanded variant
    if (node.icon) {
      if (this.hasChildren() && this.isExpanded() && node.expandedIcon) {
        return node.expandedIcon;
      }
      return node.icon;
    }

    // Default folder/file icons
    if (this.hasChildren()) {
      return this.isExpanded() ? this.folderOpenIcon : this.folderIcon;
    }

    return this.fileIcon;
  });

  handleClick(event: Event): void {
    event.stopPropagation();
    if (!this.node().disabled && this.selectable()) {
      this.nodeClick.emit(this.node());
    }
  }

  handleToggle(event: Event): void {
    event.stopPropagation();
    if (!this.node().disabled) {
      this.nodeToggle.emit(this.node());
    }
  }

  handleCheck(event: Event): void {
    event.stopPropagation();
    const checkbox = event.target as HTMLInputElement;
    if (!this.node().disabled) {
      this.nodeCheck.emit({ node: this.node(), checked: checkbox.checked });
    }
  }

  handleArrowRight(event: Event): void {
    event.preventDefault();
    if (this.hasChildren() && !this.isExpanded()) {
      this.handleToggle(event);
    }
  }

  handleArrowLeft(event: Event): void {
    event.preventDefault();
    if (this.hasChildren() && this.isExpanded()) {
      this.handleToggle(event);
    }
  }
}
