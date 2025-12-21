import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DsTable, DsButton, DsBadge, DsPagination, DsSearchInput } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { CodeSource } from '../../../registry/types';

interface UsedComponent {
  id: string;
  label: string;
  path: string;
}

@Component({
  selector: 'demo-table-advanced-page',
  standalone: true,
  imports: [RouterLink, DsTable, DsButton, DsPagination, DsSearchInput, DemoContainer],
  template: `
    <div class="demo-page">
      <header class="demo-header">
        <h1>Table Advanced</h1>
        <p class="demo-description">Table de données avec recherche, tri, pagination et actions.</p>
      </header>

      <section class="demo-section">
        <doc-demo-container [sources]="sources">
          <div class="table-demo">
            <div class="table-toolbar">
              <ds-search-input placeholder="Rechercher..." />
              <ds-button variant="primary" size="sm">Ajouter</ds-button>
            </div>

            <ds-table [columns]="columns" [data]="data" />

            <div class="table-footer">
              <span class="table-info">1-10 sur 42 résultats</span>
              <ds-pagination [totalItems]="42" [pageSize]="10" [currentPage]="1" />
            </div>
          </div>
        </doc-demo-container>
      </section>

      <section class="demo-components">
        <h2>Composants utilisés</h2>
        <div class="component-list">
          @for (comp of usedComponents; track comp.id) {
            <a [routerLink]="comp.path" class="component-chip">{{ comp.label }}</a>
          }
        </div>
      </section>
    </div>
  `,
  styles: [`
    .demo-page { max-width: 1200px; margin: 0 auto; }
    .demo-header { margin-bottom: 32px; }
    .demo-header h1 { font-size: 2rem; font-weight: 700; margin: 0 0 8px; }
    .demo-description { font-size: 1.125rem; color: var(--doc-text-secondary); margin: 0; }
    .demo-section { margin-bottom: 32px; }
    .table-demo { width: 100%; background: var(--doc-surface-elevated); border-radius: 8px; overflow: hidden; }
    .table-toolbar { display: flex; justify-content: space-between; padding: 16px; border-bottom: 1px solid var(--doc-border-default); }
    .table-footer { display: flex; justify-content: space-between; align-items: center; padding: 16px; border-top: 1px solid var(--doc-border-default); }
    .table-info { font-size: 0.875rem; color: var(--doc-text-secondary); }
    .demo-components h2 { font-size: 1.25rem; margin: 0 0 16px; }
    .component-list { display: flex; flex-wrap: wrap; gap: 8px; }
    .component-chip {
      padding: 4px 16px; background: var(--doc-surface-elevated); border: 1px solid var(--doc-border-default);
      border-radius: 9999px; color: var(--doc-text-primary); font-size: 0.875rem; text-decoration: none;
    }
    .component-chip:hover { border-color: var(--doc-accent-primary); color: var(--doc-accent-primary); }
  `]
})
export class TableAdvancedDemoPage {
  columns = [
    { key: 'name', label: 'Nom' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Rôle' },
    { key: 'status', label: 'Statut' },
  ];
  data = [
    { name: 'Alice Martin', email: 'alice@example.com', role: 'Admin', status: 'Actif' },
    { name: 'Bob Durant', email: 'bob@example.com', role: 'User', status: 'Actif' },
    { name: 'Claire Petit', email: 'claire@example.com', role: 'User', status: 'Inactif' },
  ];
  usedComponents: UsedComponent[] = [
    { id: 'ds-table', label: 'Table', path: '/components/data-display/ds-table' },
    { id: 'ds-search-input', label: 'Search Input', path: '/components/forms/text-inputs/ds-search-input' },
    { id: 'ds-pagination', label: 'Pagination', path: '/components/navigation/ds-pagination' },
    { id: 'ds-button', label: 'Button', path: '/components/actions/ds-button' },
    { id: 'ds-badge', label: 'Badge', path: '/components/data-display/ds-badge' },
  ];

  sources: CodeSource[] = [
    {
      language: 'html',
      filename: 'users-table.component.html',
      content: `<div class="table-container">
  <div class="table-toolbar">
    <ds-search-input
      placeholder="Rechercher..."
      (searchChange)="onSearch($event)"
    />
    <ds-button variant="primary" size="sm" (click)="addUser()">
      Ajouter
    </ds-button>
  </div>

  <ds-table
    [columns]="columns"
    [data]="filteredData"
    [sortable]="true"
    (sortChange)="onSort($event)"
  >
    <ng-template #cellTemplate let-row let-column="column">
      @if (column.key === 'status') {
        <ds-badge [type]="row.status === 'Actif' ? 'success' : 'warning'">
          {{ row.status }}
        </ds-badge>
      } @else if (column.key === 'actions') {
        <ds-button variant="ghost" size="sm">Modifier</ds-button>
      }
    </ng-template>
  </ds-table>

  <div class="table-footer">
    <span class="table-info">
      {{ startIndex }}-{{ endIndex }} sur {{ totalItems }} résultats
    </span>
    <ds-pagination
      [totalItems]="totalItems"
      [pageSize]="pageSize"
      [currentPage]="currentPage"
      (pageChange)="onPageChange($event)"
    />
  </div>
</div>`
    },
    {
      language: 'typescript',
      filename: 'users-table.component.ts',
      content: `import { Component, signal, computed } from '@angular/core';
import { DsTable, DsButton, DsPagination, DsSearchInput, DsBadge, TableColumn, SortEvent } from 'ds-angular';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Actif' | 'Inactif';
}

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [DsTable, DsButton, DsPagination, DsSearchInput, DsBadge],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})
export class UsersTableComponent {
  columns: TableColumn[] = [
    { key: 'name', label: 'Nom', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Rôle' },
    { key: 'status', label: 'Statut' },
    { key: 'actions', label: '' }
  ];

  allData: User[] = [
    { id: 1, name: 'Alice Martin', email: 'alice@example.com', role: 'Admin', status: 'Actif' },
    { id: 2, name: 'Bob Durant', email: 'bob@example.com', role: 'User', status: 'Actif' },
    // ...more data
  ];

  searchTerm = signal('');
  currentPage = signal(1);
  pageSize = 10;

  filteredData = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.allData.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });

  totalItems = computed(() => this.filteredData().length);

  onSearch(term: string) {
    this.searchTerm.set(term);
    this.currentPage.set(1);
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  onSort(event: SortEvent) {
    // Handle sorting...
  }
}`
    },
    {
      language: 'scss',
      filename: 'users-table.component.scss',
      content: `.table-container {
  background: var(--surface-elevated);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.table-toolbar {
  display: flex;
  justify-content: space-between;
  padding: var(--space-4);
  border-bottom: 1px solid var(--border-default);
}

.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4);
  border-top: 1px solid var(--border-default);
}

.table-info {
  font-size: 0.875rem;
  color: var(--text-secondary);
}`
    }
  ];
}
