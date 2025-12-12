import {
  Component,
  input,
  output,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrimitiveCheckbox } from '../../primitives/primitive-checkbox/primitive-checkbox';
import { DsButton } from '../ds-button/ds-button';

export interface TransferItem {
  key: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

export type TransferDirection = 'left' | 'right';
export type TransferSize = 'sm' | 'md' | 'lg';

export interface TransferChangeEvent {
  source: TransferItem[];
  target: TransferItem[];
}

/**
 * DS Transfer
 *
 * Composant permettant de transférer des items entre deux listes (source et cible).
 * Inclut recherche, sélection multiple, et navigation clavier.
 *
 * @example
 * <ds-transfer
 *   [source]="sourceItems"
 *   [target]="targetItems"
 *   sourceTitle="Disponibles"
 *   targetTitle="Sélectionnés"
 *   [showSearch]="true"
 *   (transferChange)="onTransfer($event)"
 * />
 */
@Component({
  selector: 'ds-transfer',
  standalone: true,
  imports: [CommonModule, FormsModule, PrimitiveCheckbox, DsButton],
  templateUrl: './ds-transfer.html',
  styleUrls: ['./ds-transfer.scss'],
})
export class DsTransfer {
  // Inputs
  readonly source = input<TransferItem[]>([]);
  readonly target = input<TransferItem[]>([]);
  readonly sourceTitle = input<string>('Source');
  readonly targetTitle = input<string>('Target');
  readonly showSearch = input<boolean>(true);
  readonly showSelectAll = input<boolean>(true);
  readonly disabled = input<boolean>(false);
  readonly size = input<TransferSize>('md');

  // Outputs
  readonly transferChange = output<TransferChangeEvent>();

  // Internal state
  protected readonly sourceSelected = signal<Set<string>>(new Set());
  protected readonly targetSelected = signal<Set<string>>(new Set());
  protected readonly sourceSearchQuery = signal<string>('');
  protected readonly targetSearchQuery = signal<string>('');

  // Computed
  protected readonly filteredSource = computed(() => {
    const query = this.sourceSearchQuery().toLowerCase();
    if (!query) return this.source();
    return this.source().filter(item =>
      item.label.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query)
    );
  });

  protected readonly filteredTarget = computed(() => {
    const query = this.targetSearchQuery().toLowerCase();
    if (!query) return this.target();
    return this.target().filter(item =>
      item.label.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query)
    );
  });

  protected readonly sourceSelectableCount = computed(() =>
    this.filteredSource().filter(item => !item.disabled).length
  );

  protected readonly targetSelectableCount = computed(() =>
    this.filteredTarget().filter(item => !item.disabled).length
  );

  protected readonly isAllSourceSelected = computed(() => {
    const count = this.sourceSelectableCount();
    return count > 0 && this.sourceSelected().size === count;
  });

  protected readonly isAllTargetSelected = computed(() => {
    const count = this.targetSelectableCount();
    return count > 0 && this.targetSelected().size === count;
  });

  protected readonly canTransferToTarget = computed(() =>
    this.sourceSelected().size > 0 && !this.disabled()
  );

  protected readonly canTransferToSource = computed(() =>
    this.targetSelected().size > 0 && !this.disabled()
  );

  protected readonly containerClasses = computed(() => ({
    'ds-transfer': true,
    'ds-transfer--disabled': this.disabled(),
    [`ds-transfer--${this.size()}`]: true,
  }));

  // Public methods
  transferToTarget(): void {
    if (!this.canTransferToTarget()) return;

    const selectedKeys = Array.from(this.sourceSelected());
    const itemsToTransfer = this.source().filter(item =>
      selectedKeys.includes(item.key)
    );

    const newSource = this.source().filter(item =>
      !selectedKeys.includes(item.key)
    );
    const newTarget = [...this.target(), ...itemsToTransfer];

    this.sourceSelected.set(new Set());
    this.emitChange(newSource, newTarget);
  }

  transferToSource(): void {
    if (!this.canTransferToSource()) return;

    const selectedKeys = Array.from(this.targetSelected());
    const itemsToTransfer = this.target().filter(item =>
      selectedKeys.includes(item.key)
    );

    const newTarget = this.target().filter(item =>
      !selectedKeys.includes(item.key)
    );
    const newSource = [...this.source(), ...itemsToTransfer];

    this.targetSelected.set(new Set());
    this.emitChange(newSource, newTarget);
  }

  toggleSelectAll(direction: TransferDirection): void {
    if (this.disabled()) return;

    const isSource = direction === 'left';
    const items = isSource ? this.filteredSource() : this.filteredTarget();
    const selected = isSource ? this.sourceSelected() : this.targetSelected();
    const isAllSelected = isSource ? this.isAllSourceSelected() : this.isAllTargetSelected();

    const newSelected = new Set<string>();

    if (!isAllSelected) {
      items.forEach(item => {
        if (!item.disabled) {
          newSelected.add(item.key);
        }
      });
    }

    if (isSource) {
      this.sourceSelected.set(newSelected);
    } else {
      this.targetSelected.set(newSelected);
    }
  }

  toggleItemSelection(item: TransferItem, direction: TransferDirection): void {
    if (this.disabled() || item.disabled) return;

    const isSource = direction === 'left';
    const selected = isSource ? this.sourceSelected() : this.targetSelected();
    const newSelected = new Set<string>(selected);

    if (newSelected.has(item.key)) {
      newSelected.delete(item.key);
    } else {
      newSelected.add(item.key);
    }

    if (isSource) {
      this.sourceSelected.set(newSelected);
    } else {
      this.targetSelected.set(newSelected);
    }
  }

  isItemSelected(item: TransferItem, direction: TransferDirection): boolean {
    const selected = direction === 'left' ? this.sourceSelected() : this.targetSelected();
    return selected.has(item.key);
  }

  onSearchInput(event: Event, direction: TransferDirection): void {
    const input = event.target as HTMLInputElement;
    const query = input.value;

    if (direction === 'left') {
      this.sourceSearchQuery.set(query);
    } else {
      this.targetSearchQuery.set(query);
    }
  }

  clearSearch(direction: TransferDirection): void {
    if (direction === 'left') {
      this.sourceSearchQuery.set('');
    } else {
      this.targetSearchQuery.set('');
    }
  }

  getSelectedCount(direction: TransferDirection): number {
    return direction === 'left'
      ? this.sourceSelected().size
      : this.targetSelected().size;
  }

  getItemCount(direction: TransferDirection): number {
    return direction === 'left'
      ? this.filteredSource().length
      : this.filteredTarget().length;
  }

  private emitChange(source: TransferItem[], target: TransferItem[]): void {
    this.transferChange.emit({ source, target });
  }

  // ARIA helpers
  protected getListboxId(direction: TransferDirection): string {
    return `ds-transfer-${direction}-listbox`;
  }

  protected getItemId(item: TransferItem, direction: TransferDirection): string {
    return `ds-transfer-${direction}-item-${item.key}`;
  }

  protected readonly sourceListboxLabel = computed(() =>
    `${this.sourceTitle()} (${this.getSelectedCount('left')}/${this.getItemCount('left')} sélectionné(s))`
  );

  protected readonly targetListboxLabel = computed(() =>
    `${this.targetTitle()} (${this.getSelectedCount('right')}/${this.getItemCount('right')} sélectionné(s))`
  );
}
