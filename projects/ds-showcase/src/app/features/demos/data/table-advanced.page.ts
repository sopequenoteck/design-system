import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DsTable, DsButton, DsBadge, DsPagination, DsSearchInput } from 'ds-angular';

interface UsedComponent {
  id: string;
  label: string;
  path: string;
}

@Component({
  selector: 'demo-table-advanced-page',
  standalone: true,
  imports: [RouterLink, DsTable, DsButton, DsPagination, DsSearchInput],
  template: `
    <div class="demo-page">
      <header class="demo-header">
        <h1>Table Advanced</h1>
        <p class="demo-description">Table de données avec recherche, tri, pagination et actions.</p>
      </header>

      <section class="demo-preview">
        <div class="demo-preview__container">
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
        </div>
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
    .demo-preview { background: var(--doc-surface-sunken); border-radius: 12px; padding: 32px; margin-bottom: 32px; }
    .demo-preview__container { width: 100%; }
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
}
