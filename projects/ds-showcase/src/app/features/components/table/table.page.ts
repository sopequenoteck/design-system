import { Component, signal, computed } from '@angular/core';
import { DsTable, DsTableColumn } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsTableDefinition } from '../../../registry/definitions/ds-table.definition';
import { ControlValues } from '../../../registry/types';

type TableVariant = 'default' | 'striped' | 'bordered';
type SizeType = 'sm' | 'md' | 'lg';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  [key: string]: unknown;
}

@Component({
  selector: 'app-table-page',
  standalone: true,
  imports: [DsTable, DemoContainer, PropsTable],
  template: `
    <div class="component-page">
      <header class="component-header">
        <div class="component-header__meta">
          <span class="component-badge">{{ definition.category }}</span>
        </div>
        <h1 class="component-title">{{ definition.name }}</h1>
        <p class="component-desc">{{ definition.description }}</p>
        <code class="component-selector">&lt;{{ definition.selector }}&gt;</code>
      </header>

      <section class="component-section">
        <h2>Exemples</h2>

        <div class="demo-block">
          <h3 class="demo-block__title">Default</h3>
          <p class="demo-block__desc">Tableau avec contrôles interactifs.</p>
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
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Sortable</h3>
          <p class="demo-block__desc">Colonnes triables.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <ds-table
              [data]="users"
              [columns]="sortableColumns"
              (sortChange)="onSort($event)"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Selectable</h3>
          <p class="demo-block__desc">Sélection multiple de lignes.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <ds-table
              [data]="users"
              [columns]="columns"
              [selectable]="true"
              (selectionChange)="onSelectionChange($event)"
            />
            @if (selectedUsers().length > 0) {
              <p class="selection-info">{{ selectedUsers().length }} utilisateur(s) sélectionné(s)</p>
            }
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Loading</h3>
          <p class="demo-block__desc">État de chargement.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <ds-table
              [data]="[]"
              [columns]="columns"
              [loading]="true"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Empty</h3>
          <p class="demo-block__desc">Tableau vide.</p>
          <doc-demo-container [code]="definition.demos[4].code">
            <ds-table
              [data]="[]"
              [columns]="columns"
              emptyText="Aucun utilisateur trouvé"
            />
          </doc-demo-container>
        </div>
      </section>

      <section class="component-section">
        <h2>API Reference</h2>
        <doc-props-table [props]="definition.props" />
      </section>
    </div>
  `,
  styles: [`
    .component-page { max-width: 900px; }
    .component-header { margin-bottom: 48px; }
    .component-header__meta { margin-bottom: 12px; }
    .component-badge {
      display: inline-block; padding: 4px 10px; font-size: 0.75rem; font-weight: 500;
      text-transform: uppercase; letter-spacing: 0.05em;
      background: var(--color-primary-light, #eff6ff); color: var(--color-primary, #3b82f6); border-radius: 4px;
    }
    .component-title { margin: 0 0 12px 0; font-size: 2rem; font-weight: 700; color: var(--text-default, #1a1a1a); }
    .component-desc { margin: 0 0 16px 0; font-size: 1.125rem; color: var(--text-muted, #6b7280); line-height: 1.6; }
    .component-selector {
      display: inline-block; padding: 6px 12px; font-family: var(--doc-code-font, monospace); font-size: 0.875rem;
      background: var(--background-secondary, #f3f4f6); color: var(--text-default, #374151); border-radius: 4px;
    }
    .component-section {
      margin-bottom: 48px;
      h2 { font-size: 1.25rem; font-weight: 600; color: var(--text-default, #1a1a1a); margin: 0 0 24px 0; padding-bottom: 12px; border-bottom: 1px solid var(--border-default, #e5e7eb); }
    }
    .demo-block { margin-bottom: 32px; }
    .demo-block__title { margin: 0 0 8px 0; font-size: 1rem; font-weight: 600; color: var(--text-default, #1a1a1a); }
    .demo-block__desc { margin: 0 0 16px 0; font-size: 0.875rem; color: var(--text-muted, #6b7280); }
    .selection-info { margin-top: 12px; font-size: 0.875rem; color: var(--text-muted, #6b7280); }
  `]
})
export class TablePage {
  definition = DsTableDefinition;

  users: User[] = [
    { id: 1, name: 'Alice Dupont', email: 'alice@example.com', role: 'Admin' },
    { id: 2, name: 'Bob Martin', email: 'bob@example.com', role: 'User' },
    { id: 3, name: 'Claire Bernard', email: 'claire@example.com', role: 'Editor' },
    { id: 4, name: 'David Petit', email: 'david@example.com', role: 'User' },
  ];

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

  selectedUsers = signal<User[]>([]);

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

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  onSort(event: unknown): void {
    console.log('Sort changed:', event);
  }

  onSelectionChange(selected: User[]): void {
    this.selectedUsers.set(selected);
  }
}
