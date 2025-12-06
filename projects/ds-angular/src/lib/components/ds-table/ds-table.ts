import {
  Component,
  input,
  output,
  signal,
  computed,
  TrackByFunction,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DsTableColumn<T = Record<string, unknown>> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  cellClass?: string;
  headerClass?: string;
  format?: (value: unknown, row: T) => string;
}

export type DsTableSize = 'sm' | 'md' | 'lg';
export type DsTableVariant = 'default' | 'striped' | 'bordered';
export type SortDirection = 'asc' | 'desc' | null;

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

export interface TableState {
  sortColumn: string | null;
  sortDirection: SortDirection;
  filters: Record<string, string>;
}

@Component({
  selector: 'ds-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ds-table.html',
  styleUrls: ['./ds-table.scss'],
})
export class DsTable<T extends Record<string, unknown> = Record<string, unknown>> {
  // Inputs
  readonly data = input<T[]>([]);
  readonly columns = input<DsTableColumn<T>[]>([]);
  readonly size = input<DsTableSize>('md');
  readonly variant = input<DsTableVariant>('default');
  readonly selectable = input<boolean>(false);
  readonly hoverable = input<boolean>(true);
  readonly loading = input<boolean>(false);
  readonly emptyText = input<string>('Aucune donnée');
  readonly showHeader = input<boolean>(true);
  readonly stickyHeader = input<boolean>(false);
  readonly trackBy = input<TrackByFunction<T>>((index: number) => index);

  // Outputs
  readonly sortChange = output<SortEvent>();
  readonly rowClick = output<{ row: T; index: number }>();
  readonly selectionChange = output<T[]>();

  // Internal state
  protected readonly sortColumn = signal<string | null>(null);
  protected readonly sortDirection = signal<SortDirection>(null);
  protected readonly selectedRows = signal<Set<number>>(new Set());
  protected readonly filters = signal<Record<string, string>>({});

  // Computed
  protected readonly containerClasses = computed(() => ({
    'ds-table': true,
    [`ds-table--${this.size()}`]: true,
    [`ds-table--${this.variant()}`]: true,
    'ds-table--selectable': this.selectable(),
    'ds-table--hoverable': this.hoverable(),
    'ds-table--loading': this.loading(),
    'ds-table--sticky-header': this.stickyHeader(),
  }));

  protected readonly processedData = computed(() => {
    let result = [...this.data()];

    // Apply filters
    const currentFilters = this.filters();
    Object.keys(currentFilters).forEach(key => {
      const filterValue = currentFilters[key]?.toLowerCase();
      if (filterValue) {
        result = result.filter(row => {
          const cellValue = String(this.getCellValue(row, key)).toLowerCase();
          return cellValue.includes(filterValue);
        });
      }
    });

    // Apply sorting
    const column = this.sortColumn();
    const direction = this.sortDirection();
    if (column && direction) {
      result.sort((a, b) => {
        const aVal = this.getCellValue(a, column);
        const bVal = this.getCellValue(b, column);

        if (aVal === bVal) return 0;
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;

        const comparison = aVal < bVal ? -1 : 1;
        return direction === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  });

  protected readonly isAllSelected = computed(() => {
    const data = this.processedData();
    if (data.length === 0) return false;
    return this.selectedRows().size === data.length;
  });

  protected readonly isPartiallySelected = computed(() => {
    const selected = this.selectedRows().size;
    return selected > 0 && selected < this.processedData().length;
  });

  // Methods
  getCellValue(row: T, key: string): unknown {
    const keys = key.split('.');
    let value: unknown = row;
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = (value as Record<string, unknown>)[k];
      } else {
        return undefined;
      }
    }
    return value;
  }

  formatCellValue(row: T, column: DsTableColumn<T>): string {
    const value = this.getCellValue(row, column.key as string);
    if (column.format) {
      return column.format(value, row);
    }
    if (value === null || value === undefined) {
      return '';
    }
    return String(value);
  }

  onSort(column: DsTableColumn<T>): void {
    if (!column.sortable) return;

    const key = column.key as string;
    const currentColumn = this.sortColumn();
    const currentDirection = this.sortDirection();

    let newDirection: SortDirection;
    if (currentColumn !== key) {
      newDirection = 'asc';
    } else if (currentDirection === 'asc') {
      newDirection = 'desc';
    } else {
      newDirection = null;
    }

    this.sortColumn.set(newDirection ? key : null);
    this.sortDirection.set(newDirection);

    this.sortChange.emit({
      column: key,
      direction: newDirection,
    });
  }

  onRowClick(row: T, index: number): void {
    this.rowClick.emit({ row, index });
  }

  toggleRowSelection(index: number, event: Event): void {
    event.stopPropagation();
    const newSet = new Set(this.selectedRows());
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    this.selectedRows.set(newSet);
    this.emitSelectionChange();
  }

  toggleAllSelection(event: Event): void {
    event.stopPropagation();
    const data = this.processedData();
    if (this.isAllSelected()) {
      this.selectedRows.set(new Set());
    } else {
      this.selectedRows.set(new Set(data.map((_, i) => i)));
    }
    this.emitSelectionChange();
  }

  isRowSelected(index: number): boolean {
    return this.selectedRows().has(index);
  }

  setFilter(column: string, value: string): void {
    const newFilters = { ...this.filters() };
    if (value) {
      newFilters[column] = value;
    } else {
      delete newFilters[column];
    }
    this.filters.set(newFilters);
  }

  clearFilters(): void {
    this.filters.set({});
  }

  getSelectedRows(): T[] {
    const data = this.processedData();
    return Array.from(this.selectedRows()).map(i => data[i]);
  }

  getSortIcon(column: DsTableColumn<T>): string {
    const key = column.key as string;
    if (this.sortColumn() !== key) {
      return 'sort';
    }
    return this.sortDirection() === 'asc' ? 'sort-asc' : 'sort-desc';
  }

  getColumnStyle(column: DsTableColumn<T>): Record<string, string> {
    const style: Record<string, string> = {};
    if (column.width) {
      style['width'] = column.width;
    }
    if (column.align) {
      style['text-align'] = column.align;
    }
    return style;
  }

  private emitSelectionChange(): void {
    this.selectionChange.emit(this.getSelectedRows());
  }

  // TrackBy
  trackByFn: TrackByFunction<T> = (index: number, item: T) => {
    const customTrackBy = this.trackBy();
    return customTrackBy(index, item);
  };
}
