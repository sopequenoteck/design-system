import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DsTable, DsTableColumn, DsButton, DsInputField, DsPagination, DsBadge, DsDropdown, PageChangeEvent } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { ComponentPageHeader } from '../../../shared/page/component-page-header';
import { DocIcon } from '../../../shared/icon/doc-icon';
import { DsTableDefinition } from '../../../registry/definitions/ds-table.definition';
import { ControlValues } from '../../../registry/types';

type TableVariant = 'default' | 'striped' | 'bordered';
type SizeType = 'sm' | 'md' | 'lg';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  [key: string]: unknown;
}

interface Metric {
  id: number;
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  [key: string]: unknown;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  [key: string]: unknown;
}

@Component({
  selector: 'app-table-page',
  standalone: true,
  imports: [FormsModule, DsTable, DsButton, DsInputField, DsPagination, DsBadge, DsDropdown, DemoContainer, PropsTable, ComponentPageHeader, DocIcon],
  template: `
    <div class="component-page">
      <doc-component-page-header
        category="data-display"
        [name]="definition.name"
        [description]="definition.description"
        [selector]="definition.selector"
        version="1.7.0"
        status="stable"
        sourceLink="https://github.com/anthropics/design-system/tree/main/projects/ds-angular/src/lib/components/ds-table"
      />

      <!-- Section 1: Playground -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="eye" size="sm" />
            Playground
          </h2>
          <p class="section-desc">Explorez les différentes options du composant de manière interactive.</p>
        </div>

        <doc-demo-container
          [code]="definition.demos[0].code"
          [controls]="definition.demos[0].controls"
          [initialValues]="defaultValues()"
          (controlChange)="onDefaultChange($event)"
        >
          <ds-table
            [data]="users"
            [columns]="columns"
            [variant]="demoVariant()"
            [size]="demoSize()"
            [hoverable]="demoHoverable()"
            [selectable]="demoSelectable()"
            (selectionChange)="onPlaygroundSelection($event)"
          />
          @if (playgroundSelected().length > 0) {
            <div class="selection-info">
              {{ playgroundSelected().length }} ligne(s) sélectionnée(s)
            </div>
          }
        </doc-demo-container>
      </section>

      <!-- Section 2: Variantes -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Variantes</h2>
          <p class="section-desc">Trois styles visuels pour différents contextes.</p>
        </div>

        <doc-demo-container [code]="variantsCode">
          <div class="demo-column">
            <div class="variant-demo">
              <span class="variant-label">Default</span>
              <ds-table [data]="shortUsers" [columns]="columns" variant="default" />
            </div>
            <div class="variant-demo">
              <span class="variant-label">Striped</span>
              <ds-table [data]="shortUsers" [columns]="columns" variant="striped" />
            </div>
            <div class="variant-demo">
              <span class="variant-label">Bordered</span>
              <ds-table [data]="shortUsers" [columns]="columns" variant="bordered" />
            </div>
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 3: Tailles -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Tailles</h2>
          <p class="section-desc">Densité d'affichage adaptée au contexte.</p>
        </div>

        <doc-demo-container [code]="sizesCode">
          <div class="demo-column">
            <div class="size-demo">
              <span class="size-label">Small (compact)</span>
              <ds-table [data]="shortUsers" [columns]="columns" size="sm" />
            </div>
            <div class="size-demo">
              <span class="size-label">Medium (défaut)</span>
              <ds-table [data]="shortUsers" [columns]="columns" size="md" />
            </div>
            <div class="size-demo">
              <span class="size-label">Large (spacieux)</span>
              <ds-table [data]="shortUsers" [columns]="columns" size="lg" />
            </div>
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 4: Tri des colonnes -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Tri des colonnes</h2>
          <p class="section-desc">Cliquez sur les en-têtes pour trier les données.</p>
        </div>

        <doc-demo-container [code]="sortableCode">
          <ds-table
            [data]="sortedUsers()"
            [columns]="sortableColumns"
            (sortChange)="onSort($event)"
          />
          @if (currentSort()) {
            <div class="sort-info">
              Tri par : {{ currentSort()?.column }} ({{ currentSort()?.direction }})
            </div>
          }
        </doc-demo-container>
      </section>

      <!-- Section 5: États -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">États</h2>
          <p class="section-desc">Chargement, vide et header fixe.</p>
        </div>

        <doc-demo-container [code]="statesCode">
          <div class="demo-column">
            <div class="state-demo">
              <span class="state-label">Loading</span>
              <ds-table [data]="[]" [columns]="columns" [loading]="true" />
            </div>
            <div class="state-demo">
              <span class="state-label">Empty</span>
              <ds-table
                [data]="[]"
                [columns]="columns"
                emptyText="Aucun utilisateur trouvé"
              />
            </div>
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 6: Use Cases -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="zap" size="sm" />
            Use Cases
          </h2>
          <p class="section-desc">Scénarios d'utilisation concrets dans une application.</p>
        </div>

        <!-- Use Case 1: Liste utilisateurs -->
        <div class="use-case">
          <h3 class="use-case__title">Liste d'utilisateurs</h3>
          <p class="use-case__desc">Gestion des utilisateurs avec statuts et actions.</p>
          <doc-demo-container [code]="usersListCode">
            <div class="users-table-demo">
              <div class="table-toolbar">
                <ds-input-field
                  placeholder="Rechercher un utilisateur..."
                  [(ngModel)]="userSearch"
                />
                <ds-button variant="primary">Ajouter un utilisateur</ds-button>
              </div>
              <ds-table
                [data]="filteredUsers()"
                [columns]="userColumns"
                [selectable]="true"
                variant="striped"
                (selectionChange)="onUserSelection($event)"
              />
              @if (selectedUsersList().length > 0) {
                <div class="bulk-actions">
                  <span>{{ selectedUsersList().length }} sélectionné(s)</span>
                  <ds-button variant="ghost" size="sm">Exporter</ds-button>
                  <ds-button variant="danger" size="sm">Supprimer</ds-button>
                </div>
              }
            </div>
          </doc-demo-container>
        </div>

        <!-- Use Case 2: Dashboard metrics -->
        <div class="use-case">
          <h3 class="use-case__title">Tableau de métriques</h3>
          <p class="use-case__desc">Dashboard avec indicateurs de performance et tendances.</p>
          <doc-demo-container [code]="metricsCode">
            <div class="metrics-table-demo">
              <ds-table
                [data]="metrics"
                [columns]="metricsColumns"
                size="md"
              />
            </div>
          </doc-demo-container>
        </div>

        <!-- Use Case 3: CRUD -->
        <div class="use-case">
          <h3 class="use-case__title">Gestion de produits (CRUD)</h3>
          <p class="use-case__desc">Liste avec actions en ligne pour éditer/supprimer.</p>
          <doc-demo-container [code]="crudCode">
            <div class="crud-demo">
              <div class="crud-header">
                <h4>Catalogue produits</h4>
                <ds-button variant="primary" (click)="addProduct()">Nouveau produit</ds-button>
              </div>
              <ds-table
                [data]="products()"
                [columns]="productColumns"
                variant="bordered"
                (rowClick)="onProductClick($event)"
              />
              @if (editingProduct()) {
                <div class="edit-form">
                  <h5>Édition : {{ editingProduct()?.name }}</h5>
                  <ds-input-field label="Nom" [(ngModel)]="editingProduct()!.name" />
                  <ds-input-field label="Prix" type="number" [(ngModel)]="editingProduct()!.price" />
                  <div class="edit-actions">
                    <ds-button variant="ghost" (click)="cancelEdit()">Annuler</ds-button>
                    <ds-button variant="primary" (click)="saveProduct()">Enregistrer</ds-button>
                  </div>
                </div>
              }
            </div>
          </doc-demo-container>
        </div>
      </section>

      <!-- Section 7: Composition -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="grid" size="sm" />
            Composition
          </h2>
          <p class="section-desc">Combinaisons avec d'autres composants du Design System.</p>
        </div>

        <!-- Composition 1: Table + Pagination -->
        <div class="use-case">
          <h3 class="use-case__title">Table avec pagination</h3>
          <p class="use-case__desc">Navigation dans un grand ensemble de données.</p>
          <doc-demo-container [code]="tablePaginationCode">
            <div class="paginated-table-demo">
              <ds-table
                [data]="paginatedData()"
                [columns]="columns"
                variant="striped"
              />
              <div class="table-footer">
                <ds-pagination
                  [totalItems]="allTableData.length"
                  [pageSize]="tablePageSize"
                  [currentPage]="tablePage()"
                  [showPageSizeSelector]="true"
                  (pageChange)="onTablePageChange($event)"
                  (pageSizeChange)="onTablePageSizeChange($event)"
                />
              </div>
            </div>
          </doc-demo-container>
        </div>

        <!-- Composition 2: Table + Filters -->
        <div class="use-case">
          <h3 class="use-case__title">Table avec filtres</h3>
          <p class="use-case__desc">Filtrage avancé par colonne et recherche globale.</p>
          <doc-demo-container [code]="tableFiltersCode">
            <div class="filtered-table-demo">
              <div class="filters-bar">
                <ds-input-field
                  placeholder="Recherche globale..."
                  [(ngModel)]="globalSearch"
                />
                <div class="filter-buttons">
                  <ds-button
                    [variant]="roleFilter() === 'all' ? 'primary' : 'ghost'"
                    size="sm"
                    (click)="setRoleFilter('all')"
                  >Tous</ds-button>
                  <ds-button
                    [variant]="roleFilter() === 'Admin' ? 'primary' : 'ghost'"
                    size="sm"
                    (click)="setRoleFilter('Admin')"
                  >Admin</ds-button>
                  <ds-button
                    [variant]="roleFilter() === 'Editor' ? 'primary' : 'ghost'"
                    size="sm"
                    (click)="setRoleFilter('Editor')"
                  >Editor</ds-button>
                  <ds-button
                    [variant]="roleFilter() === 'User' ? 'primary' : 'ghost'"
                    size="sm"
                    (click)="setRoleFilter('User')"
                  >User</ds-button>
                </div>
              </div>
              <ds-table
                [data]="filteredTableData()"
                [columns]="filterColumns"
              />
              <div class="filter-results">
                {{ filteredTableData().length }} résultat(s) sur {{ filterableUsers.length }}
              </div>
            </div>
          </doc-demo-container>
        </div>

        <!-- Composition 3: Table + Actions dropdown -->
        <div class="use-case">
          <h3 class="use-case__title">Table avec actions contextuelles</h3>
          <p class="use-case__desc">Menu déroulant d'actions pour chaque ligne.</p>
          <doc-demo-container [code]="tableActionsCode">
            <div class="actions-table-demo">
              <ds-table
                [data]="actionUsers"
                [columns]="actionColumns"
                [hoverable]="true"
              />
            </div>
          </doc-demo-container>
        </div>
      </section>

      <!-- Section 8: API Reference -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="code" size="sm" />
            API Reference
          </h2>
          <p class="section-desc">Documentation complète des propriétés et événements.</p>
        </div>

        <doc-props-table [props]="definition.props" />
      </section>
    </div>
  `,
  styles: [`
    .component-page {
      max-width: 900px;
    }

    .page-section {
      margin-bottom: var(--doc-space-2xl, 48px);
      animation: doc-fade-in-up 300ms ease-out;
      animation-fill-mode: both;

      &:nth-child(2) { animation-delay: 50ms; }
      &:nth-child(3) { animation-delay: 100ms; }
      &:nth-child(4) { animation-delay: 150ms; }
      &:nth-child(5) { animation-delay: 200ms; }
      &:nth-child(6) { animation-delay: 250ms; }
      &:nth-child(7) { animation-delay: 300ms; }
      &:nth-child(8) { animation-delay: 350ms; }
      &:nth-child(9) { animation-delay: 400ms; }
    }

    .section-header {
      margin-bottom: var(--doc-space-lg, 24px);
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
      margin: 0 0 var(--doc-space-sm, 8px) 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--doc-text-primary, #0f172a);
    }

    .section-desc {
      margin: 0;
      font-size: 0.9375rem;
      color: var(--doc-text-secondary, #475569);
      line-height: 1.6;
    }

    .demo-column {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-xl, 32px);
    }

    .selection-info, .sort-info {
      margin-top: var(--doc-space-md, 16px);
      padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #f8fafc);
      border-radius: var(--doc-radius-md, 8px);
      font-size: 0.875rem;
      color: var(--doc-text-secondary, #64748b);
    }

    /* Variant demos */
    .variant-demo, .size-demo, .state-demo {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-sm, 8px);
    }

    .variant-label, .size-label, .state-label {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--doc-text-muted, #94a3b8);
    }

    /* Use Cases */
    .use-case {
      margin-bottom: var(--doc-space-xl, 32px);

      &:last-child {
        margin-bottom: 0;
      }
    }

    .use-case__title {
      margin: 0 0 var(--doc-space-xs, 4px) 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--doc-text-primary, #0f172a);
    }

    .use-case__desc {
      margin: 0 0 var(--doc-space-md, 16px) 0;
      font-size: 0.875rem;
      color: var(--doc-text-secondary, #64748b);
    }

    /* Users table demo */
    .users-table-demo {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-md, 16px);
    }

    .table-toolbar {
      display: flex;
      gap: var(--doc-space-md, 16px);
      align-items: flex-end;

      ds-input-field {
        flex: 1;
      }
    }

    .bulk-actions {
      display: flex;
      align-items: center;
      gap: var(--doc-space-md, 16px);
      padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #f8fafc);
      border-radius: var(--doc-radius-md, 8px);

      span {
        font-size: 0.875rem;
        color: var(--doc-text-secondary, #64748b);
      }
    }

    /* Metrics demo */
    .metrics-table-demo {
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-lg, 12px);
      overflow: hidden;
    }

    /* CRUD demo */
    .crud-demo {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-md, 16px);
    }

    .crud-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h4 {
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
        color: var(--doc-text-primary, #0f172a);
      }
    }

    .edit-form {
      padding: var(--doc-space-lg, 24px);
      background: var(--doc-surface-elevated, #f8fafc);
      border-radius: var(--doc-radius-md, 8px);
      border: 1px solid var(--doc-border-default, #e2e8f0);

      h5 {
        margin: 0 0 var(--doc-space-md, 16px) 0;
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--doc-text-primary, #0f172a);
      }

      ds-input-field {
        margin-bottom: var(--doc-space-md, 16px);
      }
    }

    .edit-actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--doc-space-sm, 8px);
    }

    /* Paginated table demo */
    .paginated-table-demo {
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-lg, 12px);
      overflow: hidden;
    }

    .table-footer {
      padding: var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #f8fafc);
      border-top: 1px solid var(--doc-border-default, #e2e8f0);
    }

    /* Filtered table demo */
    .filtered-table-demo {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-md, 16px);
    }

    .filters-bar {
      display: flex;
      gap: var(--doc-space-md, 16px);
      align-items: flex-end;

      ds-input-field {
        flex: 1;
      }
    }

    .filter-buttons {
      display: flex;
      gap: var(--doc-space-xs, 4px);
    }

    .filter-results {
      font-size: 0.875rem;
      color: var(--doc-text-muted, #94a3b8);
      text-align: center;
    }

    /* Actions table demo */
    .actions-table-demo {
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-lg, 12px);
      overflow: hidden;
    }
  `]
})
export class TablePage {
  definition = DsTableDefinition;

  // Basic data
  users: User[] = [
    { id: 1, name: 'Alice Dupont', email: 'alice@example.com', role: 'Admin', status: 'Actif' },
    { id: 2, name: 'Bob Martin', email: 'bob@example.com', role: 'User', status: 'Actif' },
    { id: 3, name: 'Claire Bernard', email: 'claire@example.com', role: 'Editor', status: 'Inactif' },
    { id: 4, name: 'David Petit', email: 'david@example.com', role: 'User', status: 'Actif' },
  ];

  shortUsers = this.users.slice(0, 3);

  columns: DsTableColumn[] = [
    { key: 'name', label: 'Nom' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Rôle' },
  ];

  sortableColumns: DsTableColumn[] = [
    { key: 'name', label: 'Nom', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Rôle', sortable: true },
  ];

  // Playground
  defaultValues = signal<ControlValues>({
    variant: 'default',
    size: 'md',
    hoverable: true,
    selectable: false,
  });

  demoVariant = computed(() => this.defaultValues()['variant'] as TableVariant);
  demoSize = computed(() => this.defaultValues()['size'] as SizeType);
  demoHoverable = computed(() => this.defaultValues()['hoverable'] as boolean);
  demoSelectable = computed(() => this.defaultValues()['selectable'] as boolean);

  playgroundSelected = signal<User[]>([]);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  onPlaygroundSelection(selected: User[]): void {
    this.playgroundSelected.set(selected);
  }

  variantsCode = `<!-- Default -->
<ds-table [data]="users" [columns]="columns" variant="default" />

<!-- Striped (lignes alternées) -->
<ds-table [data]="users" [columns]="columns" variant="striped" />

<!-- Bordered (bordures complètes) -->
<ds-table [data]="users" [columns]="columns" variant="bordered" />`;

  sizesCode = `<!-- Small (compact) -->
<ds-table [data]="users" [columns]="columns" size="sm" />

<!-- Medium (défaut) -->
<ds-table [data]="users" [columns]="columns" size="md" />

<!-- Large (spacieux) -->
<ds-table [data]="users" [columns]="columns" size="lg" />`;

  // Sortable
  currentSort = signal<{ column: string; direction: 'asc' | 'desc' } | null>(null);

  sortedUsers = computed(() => {
    const sort = this.currentSort();
    if (!sort) return this.users;

    return [...this.users].sort((a, b) => {
      const aVal = String(a[sort.column] ?? '');
      const bVal = String(b[sort.column] ?? '');
      return sort.direction === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });
  });

  onSort(event: { column: string; direction: 'asc' | 'desc' }): void {
    this.currentSort.set(event);
  }

  sortableCode = `columns: DsTableColumn[] = [
  { key: 'name', label: 'Nom', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Rôle', sortable: true }
];

<ds-table
  [data]="sortedUsers()"
  [columns]="columns"
  (sortChange)="onSort($event)"
/>

onSort(event: { column: string; direction: 'asc' | 'desc' }): void {
  // Trier les données selon la colonne et direction
}`;

  statesCode = `<!-- Loading -->
<ds-table [data]="[]" [columns]="columns" [loading]="true" />

<!-- Empty -->
<ds-table
  [data]="[]"
  [columns]="columns"
  emptyText="Aucun utilisateur trouvé"
/>`;

  // Use Case 1: Users list
  userColumns: DsTableColumn[] = [
    { key: 'name', label: 'Nom', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Rôle' },
    { key: 'status', label: 'Statut' },
  ];

  userSearch = signal('');
  selectedUsersList = signal<User[]>([]);

  filteredUsers = computed(() => {
    const search = this.userSearch().toLowerCase();
    if (!search) return this.users;
    return this.users.filter(
      (u) => u.name.toLowerCase().includes(search) || u.email.toLowerCase().includes(search)
    );
  });

  onUserSelection(selected: User[]): void {
    this.selectedUsersList.set(selected);
  }

  usersListCode = `// Barre d'outils avec recherche
<div class="table-toolbar">
  <ds-input-field
    placeholder="Rechercher..."
    [(ngModel)]="userSearch"
  />
  <ds-button variant="primary">Ajouter</ds-button>
</div>

// Tableau avec sélection
<ds-table
  [data]="filteredUsers()"
  [columns]="userColumns"
  [selectable]="true"
  variant="striped"
  (selectionChange)="onUserSelection($event)"
/>

// Actions en masse
@if (selectedUsers().length > 0) {
  <div class="bulk-actions">
    <span>{{ selectedUsers().length }} sélectionné(s)</span>
    <ds-button variant="ghost">Exporter</ds-button>
    <ds-button variant="danger">Supprimer</ds-button>
  </div>
}`;

  // Use Case 2: Metrics
  metrics: Metric[] = [
    { id: 1, name: 'Visiteurs', value: 12500, change: 12.5, trend: 'up' },
    { id: 2, name: 'Conversions', value: 325, change: -2.3, trend: 'down' },
    { id: 3, name: 'Revenus', value: 48750, change: 8.1, trend: 'up' },
    { id: 4, name: 'Panier moyen', value: 150, change: 0, trend: 'neutral' },
  ];

  metricsColumns: DsTableColumn[] = [
    { key: 'name', label: 'Métrique' },
    { key: 'value', label: 'Valeur' },
    { key: 'change', label: 'Évolution' },
  ];

  metricsCode = `// Données avec tendances
metrics = [
  { name: 'Visiteurs', value: 12500, change: 12.5, trend: 'up' },
  { name: 'Conversions', value: 325, change: -2.3, trend: 'down' },
  { name: 'Revenus', value: 48750, change: 8.1, trend: 'up' }
];

// Colonnes personnalisées
columns = [
  { key: 'name', label: 'Métrique' },
  { key: 'value', label: 'Valeur' },
  { key: 'change', label: 'Évolution' }
];

<ds-table [data]="metrics" [columns]="columns" />`;

  // Use Case 3: CRUD
  products = signal<Product[]>([
    { id: 1, name: 'MacBook Pro', category: 'Ordinateurs', price: 2499, stock: 15 },
    { id: 2, name: 'iPhone 15', category: 'Téléphones', price: 1199, stock: 42 },
    { id: 3, name: 'iPad Air', category: 'Tablettes', price: 699, stock: 28 },
    { id: 4, name: 'AirPods Pro', category: 'Audio', price: 279, stock: 85 },
  ]);

  productColumns: DsTableColumn[] = [
    { key: 'name', label: 'Produit' },
    { key: 'category', label: 'Catégorie' },
    { key: 'price', label: 'Prix' },
    { key: 'stock', label: 'Stock' },
  ];

  editingProduct = signal<Product | null>(null);

  addProduct(): void {
    const newId = Math.max(...this.products().map((p) => p.id)) + 1;
    this.products.update((p) => [
      ...p,
      { id: newId, name: 'Nouveau produit', category: 'Autre', price: 0, stock: 0 },
    ]);
  }

  onProductClick(event: { row: Product; index: number }): void {
    this.editingProduct.set({ ...event.row });
  }

  cancelEdit(): void {
    this.editingProduct.set(null);
  }

  saveProduct(): void {
    const editing = this.editingProduct();
    if (editing) {
      this.products.update((products) =>
        products.map((p) => (p.id === editing.id ? editing : p))
      );
      this.editingProduct.set(null);
    }
  }

  crudCode = `// Liste de produits modifiable
products = signal<Product[]>([...]);

// Colonnes
productColumns = [
  { key: 'name', label: 'Produit' },
  { key: 'category', label: 'Catégorie' },
  { key: 'price', label: 'Prix' },
  { key: 'stock', label: 'Stock' }
];

// Édition inline
editingProduct = signal<Product | null>(null);

<ds-table
  [data]="products()"
  [columns]="productColumns"
  variant="bordered"
  (rowClick)="onProductClick($event)"
/>

@if (editingProduct()) {
  <div class="edit-form">
    <ds-input-field label="Nom" [(ngModel)]="editingProduct().name" />
    <ds-button (click)="saveProduct()">Enregistrer</ds-button>
  </div>
}`;

  // Composition 1: Table + Pagination
  allTableData: User[] = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: ['Alice', 'Bob', 'Claire', 'David', 'Emma'][i % 5] + ' ' + ['Dupont', 'Martin', 'Bernard', 'Petit', 'Leroy'][i % 5],
    email: `user${i + 1}@example.com`,
    role: ['Admin', 'Editor', 'User'][i % 3],
    status: ['Actif', 'Inactif'][i % 2],
  }));

  tablePage = signal(1);
  tablePageSize = 5;

  paginatedData = computed(() => {
    const start = (this.tablePage() - 1) * this.tablePageSize;
    return this.allTableData.slice(start, start + this.tablePageSize);
  });

  onTablePageChange(event: PageChangeEvent): void {
    this.tablePage.set(event.page);
  }

  onTablePageSizeChange(size: number): void {
    this.tablePageSize = size;
    this.tablePage.set(1);
  }

  tablePaginationCode = `// Données paginées
paginatedData = computed(() => {
  const start = (this.currentPage() - 1) * this.pageSize;
  return this.allData.slice(start, start + this.pageSize);
});

<ds-table
  [data]="paginatedData()"
  [columns]="columns"
  variant="striped"
/>

<ds-pagination
  [totalItems]="allData.length"
  [pageSize]="pageSize"
  [currentPage]="currentPage()"
  [showPageSizeSelector]="true"
  (pageChange)="onPageChange($event)"
/>`;

  // Composition 2: Table + Filters
  filterableUsers: User[] = [
    { id: 1, name: 'Alice Dupont', email: 'alice@example.com', role: 'Admin', status: 'Actif' },
    { id: 2, name: 'Bob Martin', email: 'bob@example.com', role: 'User', status: 'Actif' },
    { id: 3, name: 'Claire Bernard', email: 'claire@example.com', role: 'Editor', status: 'Inactif' },
    { id: 4, name: 'David Petit', email: 'david@example.com', role: 'User', status: 'Actif' },
    { id: 5, name: 'Emma Leroy', email: 'emma@example.com', role: 'Admin', status: 'Actif' },
    { id: 6, name: 'François Moreau', email: 'francois@example.com', role: 'Editor', status: 'Inactif' },
  ];

  globalSearch = signal('');
  roleFilter = signal<string>('all');

  filterColumns: DsTableColumn[] = [
    { key: 'name', label: 'Nom' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Rôle' },
    { key: 'status', label: 'Statut' },
  ];

  filteredTableData = computed(() => {
    let data = this.filterableUsers;

    // Filter by role
    const role = this.roleFilter();
    if (role !== 'all') {
      data = data.filter((u) => u.role === role);
    }

    // Filter by search
    const search = this.globalSearch().toLowerCase();
    if (search) {
      data = data.filter(
        (u) =>
          u.name.toLowerCase().includes(search) ||
          u.email.toLowerCase().includes(search) ||
          u.role.toLowerCase().includes(search)
      );
    }

    return data;
  });

  setRoleFilter(role: string): void {
    this.roleFilter.set(role);
  }

  tableFiltersCode = `// Filtres combinés
globalSearch = signal('');
roleFilter = signal('all');

filteredData = computed(() => {
  let data = this.allUsers;

  // Filtre par rôle
  if (this.roleFilter() !== 'all') {
    data = data.filter(u => u.role === this.roleFilter());
  }

  // Recherche globale
  const search = this.globalSearch().toLowerCase();
  if (search) {
    data = data.filter(u =>
      u.name.toLowerCase().includes(search) ||
      u.email.toLowerCase().includes(search)
    );
  }

  return data;
});

<div class="filters-bar">
  <ds-input-field [(ngModel)]="globalSearch" />
  <ds-button (click)="setRoleFilter('Admin')">Admin</ds-button>
  <ds-button (click)="setRoleFilter('User')">User</ds-button>
</div>

<ds-table [data]="filteredData()" [columns]="columns" />`;

  // Composition 3: Table + Actions
  actionUsers: User[] = this.users;

  actionColumns: DsTableColumn[] = [
    { key: 'name', label: 'Nom' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Rôle' },
  ];

  tableActionsCode = `// Colonnes avec actions
columns = [
  { key: 'name', label: 'Nom' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Rôle' },
  {
    key: 'actions',
    label: '',
    template: actionsTemplate
  }
];

// Template d'actions
<ng-template #actionsTemplate let-row>
  <ds-dropdown [items]="[
    { label: 'Éditer', value: 'edit' },
    { label: 'Dupliquer', value: 'duplicate' },
    { label: 'Supprimer', value: 'delete' }
  ]">
    <ds-button variant="ghost" size="sm">...</ds-button>
  </ds-dropdown>
</ng-template>`;
}
