import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DsTable, DsTableColumn } from './ds-table';

interface TestData {
  id: number;
  name: string;
  email: string;
  age: number;
}

const mockData: TestData[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', age: 25 },
  { id: 2, name: 'Bob', email: 'bob@example.com', age: 30 },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 35 },
];

const mockColumns: DsTableColumn<TestData>[] = [
  { key: 'name', label: 'Nom', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'age', label: 'Âge', sortable: true, align: 'right' },
];

@Component({
  template: `
    <ds-table
      [data]="data"
      [columns]="columns"
      [size]="size"
      [variant]="variant"
      [selectable]="selectable"
      [hoverable]="hoverable"
      [loading]="loading"
      [emptyText]="emptyText"
      (sortChange)="onSortChange($event)"
      (rowClick)="onRowClick($event)"
      (selectionChange)="onSelectionChange($event)">
    </ds-table>
  `,
  standalone: true,
  imports: [DsTable],
})
class TestComponent {
  data = mockData;
  columns = mockColumns;
  size: 'sm' | 'md' | 'lg' = 'md';
  variant: 'default' | 'striped' | 'bordered' = 'default';
  selectable = false;
  hoverable = true;
  loading = false;
  emptyText = 'Aucune donnée';
  onSortChange = jasmine.createSpy('onSortChange');
  onRowClick = jasmine.createSpy('onRowClick');
  onSelectionChange = jasmine.createSpy('onSelectionChange');
}

describe('DsTable', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  describe('Rendering', () => {
    it('should create', () => {
      const table = fixture.debugElement.query(By.directive(DsTable));
      expect(table).toBeTruthy();
    });

    it('should render table element', () => {
      const tableEl = fixture.nativeElement.querySelector('table');
      expect(tableEl).toBeTruthy();
    });

    it('should render header with column labels', () => {
      const headers = fixture.nativeElement.querySelectorAll('.ds-table__cell--header');
      expect(headers.length).toBe(3);
      expect(headers[0].textContent).toContain('Nom');
      expect(headers[1].textContent).toContain('Email');
      expect(headers[2].textContent).toContain('Âge');
    });

    it('should render data rows', () => {
      const rows = fixture.nativeElement.querySelectorAll('.ds-table__row--body');
      expect(rows.length).toBe(3);
    });

    it('should render cell values', () => {
      const cells = fixture.nativeElement.querySelectorAll('.ds-table__row--body .ds-table__cell');
      expect(cells[0].textContent).toContain('Alice');
      expect(cells[1].textContent).toContain('alice@example.com');
      expect(cells[2].textContent).toContain('25');
    });
  });

  describe('Sizes', () => {
    it('should apply md size by default', () => {
      const container = fixture.nativeElement.querySelector('.ds-table');
      expect(container.classList).toContain('ds-table--md');
    });

    it('should apply sm size', () => {
      component.size = 'sm';
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-table');
      expect(container.classList).toContain('ds-table--sm');
    });

    it('should apply lg size', () => {
      component.size = 'lg';
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-table');
      expect(container.classList).toContain('ds-table--lg');
    });
  });

  describe('Variants', () => {
    it('should apply default variant by default', () => {
      const container = fixture.nativeElement.querySelector('.ds-table');
      expect(container.classList).toContain('ds-table--default');
    });

    it('should apply striped variant', () => {
      component.variant = 'striped';
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-table');
      expect(container.classList).toContain('ds-table--striped');
    });

    it('should apply bordered variant', () => {
      component.variant = 'bordered';
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-table');
      expect(container.classList).toContain('ds-table--bordered');
    });
  });

  describe('Sorting', () => {
    it('should show sort icon on sortable columns', () => {
      const sortableHeaders = fixture.nativeElement.querySelectorAll('.ds-table__cell--sortable');
      expect(sortableHeaders.length).toBe(2); // name and age are sortable
    });

    it('should sort ascending on first click', fakeAsync(() => {
      const header = fixture.nativeElement.querySelector('.ds-table__cell--sortable');
      header.click();
      tick();
      fixture.detectChanges();

      expect(component.onSortChange).toHaveBeenCalledWith({
        column: 'name',
        direction: 'asc',
      });
    }));

    it('should sort descending on second click', fakeAsync(() => {
      const header = fixture.nativeElement.querySelector('.ds-table__cell--sortable');
      header.click();
      tick();
      fixture.detectChanges();

      header.click();
      tick();
      fixture.detectChanges();

      expect(component.onSortChange).toHaveBeenCalledWith({
        column: 'name',
        direction: 'desc',
      });
    }));

    it('should clear sort on third click', fakeAsync(() => {
      const header = fixture.nativeElement.querySelector('.ds-table__cell--sortable');
      header.click();
      tick();
      header.click();
      tick();
      header.click();
      tick();
      fixture.detectChanges();

      expect(component.onSortChange).toHaveBeenCalledWith({
        column: 'name',
        direction: null,
      });
    }));

    it('should have aria-sort attribute when sorted', fakeAsync(() => {
      const header = fixture.nativeElement.querySelector('.ds-table__cell--sortable');
      header.click();
      tick();
      fixture.detectChanges();

      expect(header.getAttribute('aria-sort')).toBe('ascending');
    }));
  });

  describe('Selection', () => {
    beforeEach(() => {
      component.selectable = true;
      fixture.detectChanges();
    });

    it('should show checkboxes when selectable', () => {
      const checkboxes = fixture.nativeElement.querySelectorAll('.ds-table__checkbox');
      expect(checkboxes.length).toBe(4); // 1 header + 3 rows
    });

    it('should select row on checkbox click', fakeAsync(() => {
      const rowCheckbox = fixture.nativeElement.querySelectorAll('.ds-table__row--body .ds-table__checkbox')[0];
      rowCheckbox.click();
      tick();
      fixture.detectChanges();

      expect(component.onSelectionChange).toHaveBeenCalled();
      const args = component.onSelectionChange.calls.mostRecent().args[0];
      expect(args.length).toBe(1);
      expect(args[0].name).toBe('Alice');
    }));

    it('should select all on header checkbox click', fakeAsync(() => {
      const headerCheckbox = fixture.nativeElement.querySelector('.ds-table__header .ds-table__checkbox');
      headerCheckbox.click();
      tick();
      fixture.detectChanges();

      expect(component.onSelectionChange).toHaveBeenCalled();
      const args = component.onSelectionChange.calls.mostRecent().args[0];
      expect(args.length).toBe(3);
    }));

    it('should deselect all when all are selected', fakeAsync(() => {
      const headerCheckbox = fixture.nativeElement.querySelector('.ds-table__header .ds-table__checkbox');
      headerCheckbox.click(); // Select all
      tick();
      fixture.detectChanges();

      headerCheckbox.click(); // Deselect all
      tick();
      fixture.detectChanges();

      const args = component.onSelectionChange.calls.mostRecent().args[0];
      expect(args.length).toBe(0);
    }));

    it('should add selected class to selected row', fakeAsync(() => {
      const rowCheckbox = fixture.nativeElement.querySelectorAll('.ds-table__row--body .ds-table__checkbox')[0];
      rowCheckbox.click();
      tick();
      fixture.detectChanges();

      const rows = fixture.nativeElement.querySelectorAll('.ds-table__row--body');
      expect(rows[0].classList).toContain('ds-table__row--selected');
    }));
  });

  describe('Row click', () => {
    it('should emit rowClick on row click', fakeAsync(() => {
      const row = fixture.nativeElement.querySelector('.ds-table__row--body');
      row.click();
      tick();

      expect(component.onRowClick).toHaveBeenCalledWith({
        row: mockData[0],
        index: 0,
      });
    }));
  });

  describe('Empty state', () => {
    it('should show empty message when no data', () => {
      component.data = [];
      fixture.detectChanges();

      const empty = fixture.nativeElement.querySelector('.ds-table__empty');
      expect(empty).toBeTruthy();
      expect(empty.textContent).toContain('Aucune donnée');
    });

    it('should show custom empty text', () => {
      component.data = [];
      component.emptyText = 'Pas de résultats';
      fixture.detectChanges();

      const empty = fixture.nativeElement.querySelector('.ds-table__empty');
      expect(empty.textContent).toContain('Pas de résultats');
    });
  });

  describe('Loading state', () => {
    it('should show loading indicator when loading', () => {
      component.loading = true;
      fixture.detectChanges();

      const loading = fixture.nativeElement.querySelector('.ds-table__loading');
      expect(loading).toBeTruthy();
    });

    it('should have loading class when loading', () => {
      component.loading = true;
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-table');
      expect(container.classList).toContain('ds-table--loading');
    });
  });

  describe('Column formatting', () => {
    it('should apply custom format function', () => {
      const columnsWithFormat: DsTableColumn<TestData>[] = [
        {
          key: 'age',
          label: 'Âge',
          format: (value) => `${value} ans`,
        },
      ];
      component.columns = columnsWithFormat;
      fixture.detectChanges();

      const cell = fixture.nativeElement.querySelector('.ds-table__row--body .ds-table__cell');
      expect(cell.textContent).toContain('25 ans');
    });

    it('should apply column width', () => {
      const columnsWithWidth: DsTableColumn<TestData>[] = [
        { key: 'name', label: 'Nom', width: '200px' },
      ];
      component.columns = columnsWithWidth;
      fixture.detectChanges();

      const header = fixture.nativeElement.querySelector('.ds-table__cell--header');
      expect(header.style.width).toBe('200px');
    });

    it('should apply column alignment', () => {
      const columnsWithAlign: DsTableColumn<TestData>[] = [
        { key: 'age', label: 'Âge', align: 'right' },
      ];
      component.columns = columnsWithAlign;
      fixture.detectChanges();

      const header = fixture.nativeElement.querySelector('.ds-table__cell--header');
      expect(header.style.textAlign).toBe('right');
    });
  });

  describe('Accessibility', () => {
    it('should have role=grid on table', () => {
      const table = fixture.nativeElement.querySelector('table');
      expect(table.getAttribute('role')).toBe('grid');
    });

    it('should have role=row on body rows', () => {
      const rows = fixture.nativeElement.querySelectorAll('.ds-table__row--body');
      rows.forEach((row: HTMLElement) => {
        expect(row.getAttribute('role')).toBe('row');
      });
    });

    it('should have role=gridcell on body cells', () => {
      const cells = fixture.nativeElement.querySelectorAll('.ds-table__row--body .ds-table__cell:not(.ds-table__cell--checkbox)');
      cells.forEach((cell: HTMLElement) => {
        expect(cell.getAttribute('role')).toBe('gridcell');
      });
    });

    it('should have scope=col on header cells', () => {
      const headers = fixture.nativeElement.querySelectorAll('.ds-table__cell--header');
      headers.forEach((header: HTMLElement) => {
        expect(header.getAttribute('scope')).toBe('col');
      });
    });
  });

  describe('Hoverable', () => {
    it('should have hoverable class by default', () => {
      const container = fixture.nativeElement.querySelector('.ds-table');
      expect(container.classList).toContain('ds-table--hoverable');
    });

    it('should not have hoverable class when disabled', () => {
      component.hoverable = false;
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-table');
      expect(container.classList).not.toContain('ds-table--hoverable');
    });
  });
});
