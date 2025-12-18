import { Component, signal, computed } from '@angular/core';
import { DsPagination, PaginationSize, PageChangeEvent } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsPaginationDefinition } from '../../../registry/definitions/ds-pagination.definition';
import { ControlValues } from '../../../registry/types';

@Component({
  selector: 'app-pagination-page',
  standalone: true,
  imports: [DsPagination, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Pagination avec contrôles.</p>
          <doc-demo-container
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-pagination
              [totalItems]="demoTotalItems()"
              [pageSize]="demoPageSize()"
              [currentPage]="currentPage"
              [size]="demoSize()"
              [showInfo]="demoShowInfo()"
              (pageChange)="onPageChange($event)"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Page Size Selector</h3>
          <p class="demo-block__desc">Sélecteur de taille de page.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <ds-pagination
              [totalItems]="100"
              [pageSize]="pageSizeDemo2"
              [showPageSizeSelector]="true"
              (pageChange)="onPageChange($event)"
              (pageSizeChange)="onPageSizeChange($event)"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Compact</h3>
          <p class="demo-block__desc">Version compacte sans info.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <ds-pagination
              [totalItems]="100"
              [pageSize]="10"
              size="sm"
              [showInfo]="false"
              [showFirstLast]="false"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Many Pages</h3>
          <p class="demo-block__desc">Avec ellipsis pour nombreuses pages.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <ds-pagination
              [totalItems]="500"
              [pageSize]="10"
              [maxVisiblePages]="5"
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
  `]
})
export class PaginationPage {
  definition = DsPaginationDefinition;

  currentPage = 1;
  pageSizeDemo2 = 10;

  defaultValues = signal<ControlValues>({
    totalItems: 100,
    pageSize: 10,
    size: 'md',
    showInfo: true,
  });

  demoTotalItems = computed(() => this.defaultValues()['totalItems'] as number);
  demoPageSize = computed(() => this.defaultValues()['pageSize'] as number);
  demoSize = computed(() => this.defaultValues()['size'] as PaginationSize);
  demoShowInfo = computed(() => this.defaultValues()['showInfo'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  onPageChange(event: PageChangeEvent): void {
    this.currentPage = event.page;
    console.log('Page changed:', event);
  }

  onPageSizeChange(size: number): void {
    this.pageSizeDemo2 = size;
    console.log('Page size changed:', size);
  }
}
