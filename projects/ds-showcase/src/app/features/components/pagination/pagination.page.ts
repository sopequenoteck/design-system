import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { DsPagination, PaginationSize, PageChangeEvent, DsButton, DsInputField, DsCard, DsSkeleton } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { ComponentPageHeader } from '../../../shared/page/component-page-header';
import { DocIcon } from '../../../shared/icon/doc-icon';
import { DsPaginationDefinition } from '../../../registry/definitions/ds-pagination.definition';
import { ControlValues } from '../../../registry/types';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
}

interface SearchResult {
  id: number;
  title: string;
  url: string;
  snippet: string;
}

interface LogEntry {
  id: number;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-pagination-page',
  standalone: true,
  imports: [FormsModule, DecimalPipe, DsPagination, DsButton, DsInputField, DsSkeleton, DemoContainer, PropsTable, ComponentPageHeader, DocIcon],
  template: `
    <div class="component-page">
      <doc-component-page-header
        category="navigation"
        [name]="definition.name"
        [description]="definition.description"
        [selector]="definition.selector"
        version="1.7.0"
        status="stable"
        sourceLink="https://github.com/anthropics/design-system/tree/main/projects/ds-angular/src/lib/components/ds-pagination"
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
          <ds-pagination
            [totalItems]="demoTotalItems()"
            [pageSize]="demoPageSize()"
            [currentPage]="playgroundPage()"
            [size]="demoSize()"
            [showInfo]="demoShowInfo()"
            (pageChange)="onPlaygroundPageChange($event)"
          />
          <div class="page-info">
            Page {{ playgroundPage() }} sur {{ totalPages() }} ({{ demoTotalItems() }} éléments)
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 2: Tailles -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Tailles</h2>
          <p class="section-desc">Trois tailles pour s'adapter à différents contextes d'interface.</p>
        </div>

        <doc-demo-container [code]="sizesCode">
          <div class="demo-column">
            <div class="size-demo">
              <span class="size-label">Small</span>
              <ds-pagination [totalItems]="50" [pageSize]="10" size="sm" />
            </div>
            <div class="size-demo">
              <span class="size-label">Medium</span>
              <ds-pagination [totalItems]="50" [pageSize]="10" size="md" />
            </div>
            <div class="size-demo">
              <span class="size-label">Large</span>
              <ds-pagination [totalItems]="50" [pageSize]="10" size="lg" />
            </div>
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 3: Options d'affichage -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Options d'affichage</h2>
          <p class="section-desc">Personnalisez les éléments visibles de la pagination.</p>
        </div>

        <doc-demo-container [code]="optionsCode">
          <div class="demo-column">
            <div class="option-demo">
              <span class="option-label">Complet (défaut)</span>
              <ds-pagination
                [totalItems]="100"
                [pageSize]="10"
                [showInfo]="true"
                [showFirstLast]="true"
              />
            </div>
            <div class="option-demo">
              <span class="option-label">Sans info</span>
              <ds-pagination
                [totalItems]="100"
                [pageSize]="10"
                [showInfo]="false"
                [showFirstLast]="true"
              />
            </div>
            <div class="option-demo">
              <span class="option-label">Sans premier/dernier</span>
              <ds-pagination
                [totalItems]="100"
                [pageSize]="10"
                [showInfo]="true"
                [showFirstLast]="false"
              />
            </div>
            <div class="option-demo">
              <span class="option-label">Minimal</span>
              <ds-pagination
                [totalItems]="100"
                [pageSize]="10"
                [showInfo]="false"
                [showFirstLast]="false"
              />
            </div>
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 4: Avec sélecteur de taille -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Sélecteur de taille</h2>
          <p class="section-desc">Permet à l'utilisateur de choisir le nombre d'éléments par page.</p>
        </div>

        <doc-demo-container [code]="pageSizeSelectorCode">
          <ds-pagination
            [totalItems]="100"
            [pageSize]="pageSizeDemo()"
            [currentPage]="pageSizeDemoPage()"
            [showPageSizeSelector]="true"
            (pageChange)="onPageSizeDemoPageChange($event)"
            (pageSizeChange)="onPageSizeChange($event)"
          />
          <div class="page-info">
            Affichage de {{ pageSizeDemo() }} éléments par page
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 5: Nombreuses pages -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Nombreuses pages</h2>
          <p class="section-desc">Gestion intelligente avec ellipsis pour de grandes collections.</p>
        </div>

        <doc-demo-container [code]="manyPagesCode">
          <ds-pagination
            [totalItems]="1000"
            [pageSize]="10"
            [currentPage]="manyPagesDemo()"
            [maxVisiblePages]="5"
            (pageChange)="onManyPagesChange($event)"
          />
          <div class="page-info">
            Navigation dans 100 pages (cliquez sur les numéros pour voir l'ellipsis se déplacer)
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

        <!-- Use Case 1: Liste d'articles -->
        <div class="use-case">
          <h3 class="use-case__title">Liste d'articles</h3>
          <p class="use-case__desc">Pagination d'un blog ou d'une section actualités.</p>
          <doc-demo-container [code]="articlesCode">
            <div class="articles-demo">
              <div class="articles-header">
                <h4>Articles récents</h4>
                <span class="articles-count">{{ allArticles.length }} articles</span>
              </div>

              @if (isLoadingArticles()) {
                <div class="articles-loading">
                  @for (i of [1, 2, 3]; track i) {
                    <div class="article-skeleton">
                      <ds-skeleton variant="text" [lines]="1" />
                      <ds-skeleton variant="text" [lines]="2" />
                    </div>
                  }
                </div>
              } @else {
                <div class="articles-list">
                  @for (article of paginatedArticles(); track article.id) {
                    <article class="article-item">
                      <h5 class="article-title">{{ article.title }}</h5>
                      <p class="article-excerpt">{{ article.excerpt }}</p>
                      <div class="article-meta">
                        <span>Par {{ article.author }}</span>
                        <span>{{ article.date }}</span>
                      </div>
                    </article>
                  }
                </div>
              }

              <div class="articles-footer">
                <ds-pagination
                  [totalItems]="allArticles.length"
                  [pageSize]="articlesPageSize"
                  [currentPage]="articlesPage()"
                  [showInfo]="true"
                  (pageChange)="onArticlesPageChange($event)"
                />
              </div>
            </div>
          </doc-demo-container>
        </div>

        <!-- Use Case 2: Résultats de recherche -->
        <div class="use-case">
          <h3 class="use-case__title">Résultats de recherche</h3>
          <p class="use-case__desc">Affichage paginé des résultats d'une recherche.</p>
          <doc-demo-container [code]="searchResultsCode">
            <div class="search-demo">
              <div class="search-header">
                <ds-input-field
                  placeholder="Rechercher..."
                  [(ngModel)]="searchQuery"
                />
                <ds-button variant="primary" (click)="performSearch()">Rechercher</ds-button>
              </div>

              @if (hasSearched()) {
                <div class="search-info">
                  <p>{{ filteredSearchResults().length }} résultats pour "{{ lastSearchQuery() }}"</p>
                </div>

                <div class="search-results">
                  @for (result of paginatedSearchResults(); track result.id) {
                    <div class="search-result">
                      <a class="result-title">{{ result.title }}</a>
                      <p class="result-url">{{ result.url }}</p>
                      <p class="result-snippet">{{ result.snippet }}</p>
                    </div>
                  }
                </div>

                <ds-pagination
                  [totalItems]="filteredSearchResults().length"
                  [pageSize]="searchPageSize"
                  [currentPage]="searchPage()"
                  size="sm"
                  (pageChange)="onSearchPageChange($event)"
                />
              }
            </div>
          </doc-demo-container>
        </div>

        <!-- Use Case 3: Log viewer -->
        <div class="use-case">
          <h3 class="use-case__title">Visualiseur de logs</h3>
          <p class="use-case__desc">Navigation dans les entrées de journal avec densité élevée.</p>
          <doc-demo-container [code]="logViewerCode">
            <div class="log-demo">
              <div class="log-toolbar">
                <div class="log-filters">
                  <ds-button
                    [variant]="logFilter() === 'all' ? 'primary' : 'ghost'"
                    size="sm"
                    (click)="setLogFilter('all')"
                  >Tous</ds-button>
                  <ds-button
                    [variant]="logFilter() === 'info' ? 'primary' : 'ghost'"
                    size="sm"
                    (click)="setLogFilter('info')"
                  >Info</ds-button>
                  <ds-button
                    [variant]="logFilter() === 'warning' ? 'primary' : 'ghost'"
                    size="sm"
                    (click)="setLogFilter('warning')"
                  >Warning</ds-button>
                  <ds-button
                    [variant]="logFilter() === 'error' ? 'primary' : 'ghost'"
                    size="sm"
                    (click)="setLogFilter('error')"
                  >Error</ds-button>
                </div>
                <span class="log-count">{{ filteredLogs().length }} entrées</span>
              </div>

              <div class="log-table">
                <div class="log-header">
                  <span class="log-col-time">Timestamp</span>
                  <span class="log-col-level">Level</span>
                  <span class="log-col-message">Message</span>
                </div>
                @for (log of paginatedLogs(); track log.id) {
                  <div class="log-row" [class]="'log-row--' + log.level">
                    <span class="log-col-time">{{ log.timestamp }}</span>
                    <span class="log-col-level log-level" [class]="'log-level--' + log.level">{{ log.level }}</span>
                    <span class="log-col-message">{{ log.message }}</span>
                  </div>
                }
              </div>

              <div class="log-footer">
                <ds-pagination
                  [totalItems]="filteredLogs().length"
                  [pageSize]="logsPageSize()"
                  [currentPage]="logsPage()"
                  size="sm"
                  [showPageSizeSelector]="true"
                  (pageChange)="onLogsPageChange($event)"
                  (pageSizeChange)="onLogsPageSizeChange($event)"
                />
              </div>
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

        <!-- Composition 1: Pagination + Table -->
        <div class="use-case">
          <h3 class="use-case__title">Tableau avec pagination</h3>
          <p class="use-case__desc">Pagination intégrée sous un tableau de données.</p>
          <doc-demo-container [code]="tableCode">
            <div class="table-demo">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Rôle</th>
                  </tr>
                </thead>
                <tbody>
                  @for (user of paginatedUsers(); track user.id) {
                    <tr>
                      <td>{{ user.id }}</td>
                      <td>{{ user.name }}</td>
                      <td>{{ user.email }}</td>
                      <td>{{ user.role }}</td>
                    </tr>
                  }
                </tbody>
              </table>
              <div class="table-footer">
                <ds-pagination
                  [totalItems]="allUsers.length"
                  [pageSize]="usersPageSize"
                  [currentPage]="usersPage()"
                  [showPageSizeSelector]="true"
                  (pageChange)="onUsersPageChange($event)"
                  (pageSizeChange)="onUsersPageSizeChange($event)"
                />
              </div>
            </div>
          </doc-demo-container>
        </div>

        <!-- Composition 2: Pagination + Cards grid -->
        <div class="use-case">
          <h3 class="use-case__title">Grille de cartes</h3>
          <p class="use-case__desc">Navigation dans une collection de produits en grille.</p>
          <doc-demo-container [code]="cardsGridCode">
            <div class="cards-demo">
              <div class="cards-grid">
                @for (product of paginatedProducts(); track product.id) {
                  <div class="product-card">
                    <div class="product-image">{{ product.image }}</div>
                    <div class="product-info">
                      <h5 class="product-name">{{ product.name }}</h5>
                      <span class="product-price">{{ product.price | number:'1.2-2' }} €</span>
                    </div>
                  </div>
                }
              </div>
              <div class="cards-footer">
                <ds-pagination
                  [totalItems]="allProducts.length"
                  [pageSize]="productsPageSize"
                  [currentPage]="productsPage()"
                  [showInfo]="true"
                  (pageChange)="onProductsPageChange($event)"
                />
              </div>
            </div>
          </doc-demo-container>
        </div>

        <!-- Composition 3: Navigation avec boutons -->
        <div class="use-case">
          <h3 class="use-case__title">Navigation simplifiée</h3>
          <p class="use-case__desc">Alternative avec boutons Précédent/Suivant pour les longs contenus.</p>
          <doc-demo-container [code]="simplifiedNavCode">
            <div class="simplified-demo">
              <div class="content-viewer">
                <h4>Chapitre {{ chapterPage() }}</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
              </div>
              <div class="simplified-nav">
                <ds-button
                  variant="ghost"
                  [disabled]="chapterPage() === 1"
                  (click)="previousChapter()"
                >
                  Chapitre précédent
                </ds-button>
                <ds-pagination
                  [totalItems]="totalChapters"
                  [pageSize]="1"
                  [currentPage]="chapterPage()"
                  [showInfo]="false"
                  [showFirstLast]="false"
                  size="sm"
                  (pageChange)="onChapterChange($event)"
                />
                <ds-button
                  variant="ghost"
                  [disabled]="chapterPage() === totalChapters"
                  (click)="nextChapter()"
                >
                  Chapitre suivant
                </ds-button>
              </div>
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

    .page-info {
      margin-top: var(--doc-space-md, 16px);
      padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #f8fafc);
      border-radius: var(--doc-radius-md, 8px);
      font-size: 0.875rem;
      color: var(--doc-text-secondary, #64748b);
    }

    .demo-column {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-lg, 24px);
    }

    /* Size demos */
    .size-demo, .option-demo {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-sm, 8px);
    }

    .size-label, .option-label {
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

    /* Articles demo */
    .articles-demo {
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-lg, 12px);
      overflow: hidden;
    }

    .articles-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--doc-space-md, 16px) var(--doc-space-lg, 24px);
      border-bottom: 1px solid var(--doc-border-default, #e2e8f0);
      background: var(--doc-surface-elevated, #f8fafc);

      h4 {
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
        color: var(--doc-text-primary, #0f172a);
      }
    }

    .articles-count {
      font-size: 0.875rem;
      color: var(--doc-text-muted, #94a3b8);
    }

    .articles-loading, .articles-list {
      padding: var(--doc-space-md, 16px) var(--doc-space-lg, 24px);
    }

    .article-skeleton {
      padding: var(--doc-space-md, 16px) 0;
      border-bottom: 1px solid var(--doc-border-subtle, #f1f5f9);

      &:last-child {
        border-bottom: none;
      }
    }

    .article-item {
      padding: var(--doc-space-md, 16px) 0;
      border-bottom: 1px solid var(--doc-border-subtle, #f1f5f9);

      &:last-child {
        border-bottom: none;
      }
    }

    .article-title {
      margin: 0 0 var(--doc-space-xs, 4px) 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--doc-text-primary, #0f172a);
    }

    .article-excerpt {
      margin: 0 0 var(--doc-space-sm, 8px) 0;
      font-size: 0.875rem;
      color: var(--doc-text-secondary, #64748b);
      line-height: 1.5;
    }

    .article-meta {
      display: flex;
      gap: var(--doc-space-md, 16px);
      font-size: 0.75rem;
      color: var(--doc-text-muted, #94a3b8);
    }

    .articles-footer {
      padding: var(--doc-space-md, 16px) var(--doc-space-lg, 24px);
      border-top: 1px solid var(--doc-border-default, #e2e8f0);
      background: var(--doc-surface-elevated, #f8fafc);
    }

    /* Search demo */
    .search-demo {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-md, 16px);
    }

    .search-header {
      display: flex;
      gap: var(--doc-space-sm, 8px);

      ds-input-field {
        flex: 1;
      }
    }

    .search-info {
      padding: var(--doc-space-sm, 8px);
      background: var(--doc-surface-elevated, #f8fafc);
      border-radius: var(--doc-radius-md, 8px);

      p {
        margin: 0;
        font-size: 0.875rem;
        color: var(--doc-text-secondary, #64748b);
      }
    }

    .search-results {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-md, 16px);
    }

    .search-result {
      padding: var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #f8fafc);
      border-radius: var(--doc-radius-md, 8px);
    }

    .result-title {
      font-weight: 600;
      color: var(--color-primary, #3b82f6);
      cursor: pointer;
    }

    .result-url {
      margin: var(--doc-space-xs, 4px) 0;
      font-size: 0.75rem;
      color: var(--success, #10b981);
    }

    .result-snippet {
      margin: 0;
      font-size: 0.875rem;
      color: var(--doc-text-secondary, #64748b);
    }

    /* Log demo */
    .log-demo {
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-lg, 12px);
      overflow: hidden;
      font-family: var(--doc-code-font, monospace);
      font-size: 0.8125rem;
    }

    .log-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
      background: var(--doc-surface-inset, #1e293b);
      border-bottom: 1px solid var(--doc-border-default, #334155);
    }

    .log-filters {
      display: flex;
      gap: var(--doc-space-xs, 4px);
    }

    .log-count {
      font-size: 0.75rem;
      color: var(--doc-text-muted, #94a3b8);
    }

    .log-table {
      background: var(--doc-surface-inset, #0f172a);
      color: var(--doc-text-inverse, #e2e8f0);
    }

    .log-header, .log-row {
      display: grid;
      grid-template-columns: 180px 80px 1fr;
      gap: var(--doc-space-md, 16px);
      padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
    }

    .log-header {
      font-weight: 600;
      color: var(--doc-text-muted, #94a3b8);
      border-bottom: 1px solid var(--doc-border-default, #334155);
    }

    .log-row {
      border-bottom: 1px solid var(--doc-border-subtle, #1e293b);

      &--error {
        background: rgba(239, 68, 68, 0.1);
      }

      &--warning {
        background: rgba(245, 158, 11, 0.1);
      }
    }

    .log-level {
      padding: 2px 6px;
      border-radius: var(--doc-radius-sm, 4px);
      font-size: 0.6875rem;
      text-transform: uppercase;

      &--info {
        background: rgba(59, 130, 246, 0.2);
        color: #60a5fa;
      }

      &--warning {
        background: rgba(245, 158, 11, 0.2);
        color: #fbbf24;
      }

      &--error {
        background: rgba(239, 68, 68, 0.2);
        color: #f87171;
      }
    }

    .log-footer {
      padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
      background: var(--doc-surface-inset, #1e293b);
      border-top: 1px solid var(--doc-border-default, #334155);
    }

    /* Table demo */
    .table-demo {
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-lg, 12px);
      overflow: hidden;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;

      th, td {
        padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
        text-align: left;
      }

      th {
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--doc-text-muted, #94a3b8);
        background: var(--doc-surface-elevated, #f8fafc);
        border-bottom: 1px solid var(--doc-border-default, #e2e8f0);
      }

      td {
        font-size: 0.875rem;
        color: var(--doc-text-primary, #0f172a);
        border-bottom: 1px solid var(--doc-border-subtle, #f1f5f9);
      }

      tr:last-child td {
        border-bottom: none;
      }
    }

    .table-footer {
      padding: var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #f8fafc);
      border-top: 1px solid var(--doc-border-default, #e2e8f0);
    }

    /* Cards demo */
    .cards-demo {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-lg, 24px);
    }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: var(--doc-space-md, 16px);
    }

    .product-card {
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-md, 8px);
      overflow: hidden;
      transition: box-shadow 150ms ease;

      &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
    }

    .product-image {
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--doc-surface-elevated, #f8fafc);
      font-size: 2rem;
    }

    .product-info {
      padding: var(--doc-space-sm, 8px);
    }

    .product-name {
      margin: 0 0 var(--doc-space-xs, 4px) 0;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--doc-text-primary, #0f172a);
    }

    .product-price {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--color-primary, #3b82f6);
    }

    .cards-footer {
      display: flex;
      justify-content: center;
    }

    /* Simplified nav demo */
    .simplified-demo {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-lg, 24px);
    }

    .content-viewer {
      padding: var(--doc-space-lg, 24px);
      background: var(--doc-surface-elevated, #f8fafc);
      border-radius: var(--doc-radius-lg, 12px);

      h4 {
        margin: 0 0 var(--doc-space-md, 16px) 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--doc-text-primary, #0f172a);
      }

      p {
        margin: 0;
        color: var(--doc-text-secondary, #64748b);
        line-height: 1.6;
      }
    }

    .simplified-nav {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: var(--doc-space-md, 16px);
    }
  `]
})
export class PaginationPage {
  definition = DsPaginationDefinition;

  // Playground
  defaultValues = signal<ControlValues>({
    totalItems: 100,
    pageSize: 10,
    size: 'md',
    showInfo: true,
  });
  playgroundPage = signal(1);

  demoTotalItems = computed(() => this.defaultValues()['totalItems'] as number);
  demoPageSize = computed(() => this.defaultValues()['pageSize'] as number);
  demoSize = computed(() => this.defaultValues()['size'] as PaginationSize);
  demoShowInfo = computed(() => this.defaultValues()['showInfo'] as boolean);
  totalPages = computed(() => Math.ceil(this.demoTotalItems() / this.demoPageSize()));

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
    this.playgroundPage.set(1);
  }

  onPlaygroundPageChange(event: PageChangeEvent): void {
    this.playgroundPage.set(event.page);
  }

  sizesCode = `<!-- Small -->
<ds-pagination [totalItems]="50" [pageSize]="10" size="sm" />

<!-- Medium (défaut) -->
<ds-pagination [totalItems]="50" [pageSize]="10" size="md" />

<!-- Large -->
<ds-pagination [totalItems]="50" [pageSize]="10" size="lg" />`;

  optionsCode = `<!-- Complet (défaut) -->
<ds-pagination [totalItems]="100" [showInfo]="true" [showFirstLast]="true" />

<!-- Sans info -->
<ds-pagination [totalItems]="100" [showInfo]="false" />

<!-- Sans premier/dernier -->
<ds-pagination [totalItems]="100" [showFirstLast]="false" />

<!-- Minimal -->
<ds-pagination [totalItems]="100" [showInfo]="false" [showFirstLast]="false" />`;

  // Page size selector demo
  pageSizeDemo = signal(10);
  pageSizeDemoPage = signal(1);

  onPageSizeDemoPageChange(event: PageChangeEvent): void {
    this.pageSizeDemoPage.set(event.page);
  }

  onPageSizeChange(size: number): void {
    this.pageSizeDemo.set(size);
    this.pageSizeDemoPage.set(1);
  }

  pageSizeSelectorCode = `<ds-pagination
  [totalItems]="100"
  [pageSize]="pageSize()"
  [currentPage]="currentPage()"
  [showPageSizeSelector]="true"
  (pageChange)="onPageChange($event)"
  (pageSizeChange)="onPageSizeChange($event)"
/>`;

  // Many pages demo
  manyPagesDemo = signal(1);

  onManyPagesChange(event: PageChangeEvent): void {
    this.manyPagesDemo.set(event.page);
  }

  manyPagesCode = `<ds-pagination
  [totalItems]="1000"
  [pageSize]="10"
  [currentPage]="currentPage()"
  [maxVisiblePages]="5"
  (pageChange)="onPageChange($event)"
/>`;

  // Use Case 1: Articles
  allArticles: Article[] = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: `Article ${i + 1}: ${['Les tendances tech 2025', 'Guide du développeur', 'Nouveautés Angular', 'Design System best practices', 'Performance web'][i % 5]}`,
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
    author: ['Alice', 'Bob', 'Claire', 'David', 'Emma'][i % 5],
    date: `${15 + (i % 15)} déc. 2025`,
  }));

  articlesPageSize = 3;
  articlesPage = signal(1);
  isLoadingArticles = signal(false);

  paginatedArticles = computed(() => {
    const start = (this.articlesPage() - 1) * this.articlesPageSize;
    return this.allArticles.slice(start, start + this.articlesPageSize);
  });

  onArticlesPageChange(event: PageChangeEvent): void {
    this.isLoadingArticles.set(true);
    // Simulate loading
    setTimeout(() => {
      this.articlesPage.set(event.page);
      this.isLoadingArticles.set(false);
    }, 300);
  }

  articlesCode = `// Liste d'articles paginée
allArticles: Article[] = [...]; // 25 articles

paginatedArticles = computed(() => {
  const start = (this.currentPage() - 1) * this.pageSize;
  return this.allArticles.slice(start, start + this.pageSize);
});

<div class="articles-list">
  @for (article of paginatedArticles(); track article.id) {
    <article>{{ article.title }}</article>
  }
</div>

<ds-pagination
  [totalItems]="allArticles.length"
  [pageSize]="pageSize"
  [currentPage]="currentPage()"
  (pageChange)="onPageChange($event)"
/>`;

  // Use Case 2: Search results
  searchQuery = signal('');
  hasSearched = signal(false);
  lastSearchQuery = signal('');
  searchPage = signal(1);
  searchPageSize = 5;

  allSearchResults: SearchResult[] = Array.from({ length: 42 }, (_, i) => ({
    id: i + 1,
    title: `Résultat ${i + 1}: ${['Documentation API', 'Guide utilisateur', 'FAQ', 'Tutoriel', 'Blog post'][i % 5]}`,
    url: `https://example.com/docs/page-${i + 1}`,
    snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Découvrez comment utiliser notre API...',
  }));

  filteredSearchResults = signal<SearchResult[]>([]);

  paginatedSearchResults = computed(() => {
    const start = (this.searchPage() - 1) * this.searchPageSize;
    return this.filteredSearchResults().slice(start, start + this.searchPageSize);
  });

  performSearch(): void {
    const query = this.searchQuery();
    if (query.trim()) {
      this.lastSearchQuery.set(query);
      this.hasSearched.set(true);
      this.searchPage.set(1);
      // Simulate filtered results
      this.filteredSearchResults.set(this.allSearchResults.slice(0, 15 + Math.floor(Math.random() * 20)));
    }
  }

  onSearchPageChange(event: PageChangeEvent): void {
    this.searchPage.set(event.page);
  }

  searchResultsCode = `// Recherche avec pagination
searchQuery = signal('');
filteredResults = signal<SearchResult[]>([]);
currentPage = signal(1);

performSearch(): void {
  this.filteredResults.set(
    this.allResults.filter(r => r.title.includes(this.searchQuery()))
  );
  this.currentPage.set(1);
}

<ds-input-field [(ngModel)]="searchQuery" />
<ds-button (click)="performSearch()">Rechercher</ds-button>

@for (result of paginatedResults(); track result.id) {
  <div>{{ result.title }}</div>
}

<ds-pagination
  [totalItems]="filteredResults().length"
  [pageSize]="pageSize"
  [currentPage]="currentPage()"
/>`;

  // Use Case 3: Log viewer
  allLogs: LogEntry[] = Array.from({ length: 200 }, (_, i) => ({
    id: i + 1,
    timestamp: `2025-12-20 ${String(Math.floor(i / 60) % 24).padStart(2, '0')}:${String(i % 60).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    level: ['info', 'info', 'info', 'warning', 'error'][Math.floor(Math.random() * 5)] as 'info' | 'warning' | 'error',
    message: [
      'Application started successfully',
      'Connection established',
      'Request processed',
      'Cache miss, fetching from database',
      'High memory usage detected',
      'Rate limit exceeded for user',
      'Failed to connect to external service',
      'Database query timeout',
    ][Math.floor(Math.random() * 8)],
  }));

  logFilter = signal<'all' | 'info' | 'warning' | 'error'>('all');
  logsPage = signal(1);
  logsPageSize = signal(10);

  filteredLogs = computed(() => {
    const filter = this.logFilter();
    if (filter === 'all') return this.allLogs;
    return this.allLogs.filter((log) => log.level === filter);
  });

  paginatedLogs = computed(() => {
    const start = (this.logsPage() - 1) * this.logsPageSize();
    return this.filteredLogs().slice(start, start + this.logsPageSize());
  });

  setLogFilter(filter: 'all' | 'info' | 'warning' | 'error'): void {
    this.logFilter.set(filter);
    this.logsPage.set(1);
  }

  onLogsPageChange(event: PageChangeEvent): void {
    this.logsPage.set(event.page);
  }

  onLogsPageSizeChange(size: number): void {
    this.logsPageSize.set(size);
    this.logsPage.set(1);
  }

  logViewerCode = `// Log viewer avec filtres
logFilter = signal<'all' | 'info' | 'warning' | 'error'>('all');
logsPage = signal(1);
logsPageSize = signal(10);

filteredLogs = computed(() => {
  const filter = this.logFilter();
  if (filter === 'all') return this.allLogs;
  return this.allLogs.filter(log => log.level === filter);
});

<div class="log-toolbar">
  <ds-button (click)="setLogFilter('all')">Tous</ds-button>
  <ds-button (click)="setLogFilter('error')">Error</ds-button>
</div>

@for (log of paginatedLogs(); track log.id) {
  <div [class]="'log--' + log.level">{{ log.message }}</div>
}

<ds-pagination
  [totalItems]="filteredLogs().length"
  [pageSize]="logsPageSize()"
  [showPageSizeSelector]="true"
/>`;

  // Composition 1: Table with pagination
  allUsers = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: ['Alice Martin', 'Bob Dupont', 'Claire Leroy', 'David Bernard', 'Emma Petit'][i % 5],
    email: `user${i + 1}@example.com`,
    role: ['Admin', 'Éditeur', 'Viewer', 'Manager'][i % 4],
  }));

  usersPage = signal(1);
  usersPageSize = 5;

  paginatedUsers = computed(() => {
    const start = (this.usersPage() - 1) * this.usersPageSize;
    return this.allUsers.slice(start, start + this.usersPageSize);
  });

  onUsersPageChange(event: PageChangeEvent): void {
    this.usersPage.set(event.page);
  }

  onUsersPageSizeChange(size: number): void {
    this.usersPageSize = size;
    this.usersPage.set(1);
  }

  tableCode = `<table class="data-table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Nom</th>
      <th>Email</th>
      <th>Rôle</th>
    </tr>
  </thead>
  <tbody>
    @for (user of paginatedUsers(); track user.id) {
      <tr>
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role }}</td>
      </tr>
    }
  </tbody>
</table>

<ds-pagination
  [totalItems]="allUsers.length"
  [pageSize]="usersPageSize"
  [currentPage]="usersPage()"
  [showPageSizeSelector]="true"
  (pageChange)="onUsersPageChange($event)"
/>`;

  // Composition 2: Cards grid
  allProducts: Product[] = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    name: ['MacBook Pro', 'iPhone 15', 'iPad Air', 'Apple Watch', 'AirPods Pro', 'Magic Keyboard'][i % 6],
    price: [2499, 1199, 699, 449, 279, 349][i % 6],
    image: ['💻', '📱', '📱', '⌚', '🎧', '⌨️'][i % 6],
  }));

  productsPage = signal(1);
  productsPageSize = 6;

  paginatedProducts = computed(() => {
    const start = (this.productsPage() - 1) * this.productsPageSize;
    return this.allProducts.slice(start, start + this.productsPageSize);
  });

  onProductsPageChange(event: PageChangeEvent): void {
    this.productsPage.set(event.page);
  }

  cardsGridCode = `<div class="cards-grid">
  @for (product of paginatedProducts(); track product.id) {
    <div class="product-card">
      <div class="product-image">{{ product.image }}</div>
      <div class="product-info">
        <h5>{{ product.name }}</h5>
        <span>{{ product.price }} €</span>
      </div>
    </div>
  }
</div>

<ds-pagination
  [totalItems]="allProducts.length"
  [pageSize]="productsPageSize"
  [currentPage]="productsPage()"
  [showInfo]="true"
  (pageChange)="onProductsPageChange($event)"
/>`;

  // Composition 3: Simplified navigation
  totalChapters = 12;
  chapterPage = signal(1);

  previousChapter(): void {
    if (this.chapterPage() > 1) {
      this.chapterPage.update((p) => p - 1);
    }
  }

  nextChapter(): void {
    if (this.chapterPage() < this.totalChapters) {
      this.chapterPage.update((p) => p + 1);
    }
  }

  onChapterChange(event: PageChangeEvent): void {
    this.chapterPage.set(event.page);
  }

  simplifiedNavCode = `<div class="content-viewer">
  <h4>Chapitre {{ chapterPage() }}</h4>
  <p>Contenu du chapitre...</p>
</div>

<div class="simplified-nav">
  <ds-button
    variant="ghost"
    [disabled]="chapterPage() === 1"
    (click)="previousChapter()"
  >Précédent</ds-button>

  <ds-pagination
    [totalItems]="totalChapters"
    [pageSize]="1"
    [currentPage]="chapterPage()"
    [showInfo]="false"
    [showFirstLast]="false"
    size="sm"
    (pageChange)="onChapterChange($event)"
  />

  <ds-button
    variant="ghost"
    [disabled]="chapterPage() === totalChapters"
    (click)="nextChapter()"
  >Suivant</ds-button>
</div>`;
}
