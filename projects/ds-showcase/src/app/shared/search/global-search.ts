import {
  Component,
  signal,
  computed,
  inject,
  ElementRef,
  ViewChild,
  HostListener,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { SearchService } from './search.service';
import { SearchResult } from '../../registry/types';
import { DocIcon } from '../icon/doc-icon';

@Component({
  selector: 'doc-global-search',
  standalone: true,
  imports: [FormsModule, RouterLink, DocIcon],
  template: `
    <!-- Trigger button -->
    <button
      type="button"
      class="search-trigger"
      (click)="open()"
      aria-label="Ouvrir la recherche"
    >
      <doc-icon name="search" size="sm" />
      <span class="search-trigger__text">Rechercher...</span>
      <kbd class="search-trigger__kbd">
        <span class="search-trigger__kbd-symbol">&#8984;</span>K
      </kbd>
    </button>

    <!-- Modal overlay -->
    @if (isOpen()) {
      <div
        class="search-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Recherche globale"
        (click)="close()"
      >
        <div class="search-modal" (click)="$event.stopPropagation()">
          <!-- Search input -->
          <div class="search-input-wrapper">
            <doc-icon name="search" size="md" class="search-input__icon" />
            <input
              #searchInput
              type="text"
              class="search-input"
              placeholder="Rechercher composants et documentation..."
              [ngModel]="query()"
              (ngModelChange)="onQueryChange($event)"
              (keydown)="onKeydown($event)"
              autocomplete="off"
            />
            @if (query()) {
              <button
                type="button"
                class="search-input__clear"
                (click)="clearQuery()"
                aria-label="Effacer la recherche"
              >
                <doc-icon name="close" size="xs" />
              </button>
            }
          </div>

          <!-- Results -->
          <div class="search-results">
            @if (query() && results().length === 0) {
              <div class="search-empty">
                <doc-icon name="search" size="xl" class="search-empty__icon" />
                <p>Aucun résultat pour "{{ query() }}"</p>
              </div>
            }

            @if (results().length > 0) {
              <!-- Composants -->
              @if (componentResults().length > 0) {
                <div class="search-group">
                  <div class="search-group__header">
                    <doc-icon name="components" size="xs" />
                    Composants
                  </div>
                  @for (result of componentResults(); track result.id; let i = $index) {
                    <a
                      class="search-result"
                      [class.selected]="i === selectedIndex()"
                      [routerLink]="result.path"
                      (click)="selectResult(result)"
                      (mouseenter)="selectedIndex.set(i)"
                    >
                      <div class="search-result__icon">
                        <doc-icon name="components" size="sm" />
                      </div>
                      <div class="search-result__content">
                        <span class="search-result__label">{{ result.label }}</span>
                        <span class="search-result__category">{{ result.category }}</span>
                      </div>
                      <doc-icon name="arrow-right" size="sm" class="search-result__arrow" />
                    </a>
                  }
                </div>
              }

              <!-- Documentation -->
              @if (docResults().length > 0) {
                <div class="search-group">
                  <div class="search-group__header">
                    <doc-icon name="book" size="xs" />
                    Documentation
                  </div>
                  @for (result of docResults(); track result.id; let i = $index) {
                    <a
                      class="search-result"
                      [class.selected]="componentResults().length + i === selectedIndex()"
                      [routerLink]="result.path"
                      (click)="selectResult(result)"
                      (mouseenter)="selectedIndex.set(componentResults().length + i)"
                    >
                      <div class="search-result__icon">
                        <doc-icon name="book" size="sm" />
                      </div>
                      <div class="search-result__content">
                        <span class="search-result__label">{{ result.label }}</span>
                        <span class="search-result__desc">{{ result.description }}</span>
                      </div>
                      <doc-icon name="arrow-right" size="sm" class="search-result__arrow" />
                    </a>
                  }
                </div>
              }
            }

            @if (!query()) {
              <div class="search-hints">
                <doc-icon name="info" size="lg" class="search-hints__icon" />
                <p>Tapez pour rechercher dans les composants et la documentation</p>
                <div class="search-hints__keys">
                  <span><kbd>&#8593;&#8595;</kbd> naviguer</span>
                  <span><kbd>&#8629;</kbd> sélectionner</span>
                  <span><kbd>esc</kbd> fermer</span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    // ==========================================================================
    // Trigger button
    // ==========================================================================
    .search-trigger {
      display: flex;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
      padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-md, 10px);
      background: var(--doc-surface-elevated, #ffffff);
      color: var(--doc-text-tertiary, #94a3b8);
      font-size: 0.875rem;
      cursor: pointer;
      transition: all var(--doc-transition-fast, 150ms);
      min-width: 200px;

      &:hover {
        background: var(--doc-surface-sunken, #f1f5f9);
        border-color: var(--doc-border-strong, #cbd5e1);
        color: var(--doc-text-secondary, #475569);
      }

      &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 2px var(--doc-accent-primary-light, #eef2ff),
                    0 0 0 4px var(--doc-accent-primary, #6366f1);
      }
    }

    .search-trigger__text {
      flex: 1;
      text-align: left;
    }

    .search-trigger__kbd {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      padding: 2px 6px;
      font-size: 0.6875rem;
      font-family: inherit;
      font-weight: 500;
      background: var(--doc-surface-sunken, #f1f5f9);
      border: 1px solid var(--doc-border-subtle, #e2e8f0);
      border-radius: var(--doc-radius-sm, 6px);
      color: var(--doc-text-tertiary, #94a3b8);
    }

    .search-trigger__kbd-symbol {
      font-size: 0.8125rem;
    }

    // ==========================================================================
    // Modal overlay
    // ==========================================================================
    .search-overlay {
      position: fixed;
      inset: 0;
      z-index: var(--doc-z-modal, 400);
      background: var(--doc-surface-overlay, rgba(0, 0, 0, 0.5));
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 10vh;
      animation: doc-fade-in 150ms ease-out;
      backdrop-filter: blur(4px);
    }

    .search-modal {
      width: 100%;
      max-width: 600px;
      margin: 0 var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #ffffff);
      border-radius: var(--doc-radius-xl, 20px);
      box-shadow: var(--doc-shadow-xl);
      overflow: hidden;
      animation: doc-scale-in 200ms ease-out;
    }

    // ==========================================================================
    // Search input
    // ==========================================================================
    .search-input-wrapper {
      display: flex;
      align-items: center;
      gap: var(--doc-space-md, 16px);
      padding: var(--doc-space-lg, 24px);
      border-bottom: 1px solid var(--doc-border-default, #e2e8f0);
    }

    .search-input__icon {
      color: var(--doc-text-tertiary, #94a3b8);
      flex-shrink: 0;
    }

    .search-input {
      flex: 1;
      border: none;
      background: transparent;
      font-size: 1.125rem;
      color: var(--doc-text-primary, #0f172a);
      outline: none;

      &::placeholder {
        color: var(--doc-text-tertiary, #94a3b8);
      }
    }

    .search-input__clear {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      padding: 0;
      border: none;
      border-radius: var(--doc-radius-sm, 6px);
      background: var(--doc-surface-sunken, #f1f5f9);
      color: var(--doc-text-tertiary, #94a3b8);
      cursor: pointer;
      transition: all var(--doc-transition-fast, 150ms);

      &:hover {
        background: var(--doc-border-default, #e2e8f0);
        color: var(--doc-text-primary, #0f172a);
      }
    }

    // ==========================================================================
    // Results
    // ==========================================================================
    .search-results {
      max-height: 400px;
      overflow-y: auto;
    }

    .search-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--doc-space-md, 16px);
      padding: var(--doc-space-2xl, 48px) var(--doc-space-lg, 24px);
      color: var(--doc-text-tertiary, #94a3b8);

      .search-empty__icon {
        opacity: 0.4;
      }

      p {
        margin: 0;
        font-size: 0.9375rem;
      }
    }

    .search-group {
      padding: var(--doc-space-sm, 8px) 0;
    }

    .search-group__header {
      display: flex;
      align-items: center;
      gap: var(--doc-space-xs, 4px);
      padding: var(--doc-space-sm, 8px) var(--doc-space-lg, 24px);
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--doc-text-tertiary, #94a3b8);
    }

    .search-result {
      display: flex;
      align-items: center;
      gap: var(--doc-space-md, 16px);
      padding: var(--doc-space-sm, 8px) var(--doc-space-lg, 24px);
      text-decoration: none;
      color: var(--doc-text-primary, #0f172a);
      cursor: pointer;
      transition: all var(--doc-transition-fast, 150ms);

      &:hover,
      &.selected {
        background: var(--doc-accent-primary-light, #eef2ff);

        .search-result__icon {
          background: var(--doc-accent-primary, #6366f1);
          color: white;
        }

        .search-result__arrow {
          opacity: 1;
          transform: translateX(0);
        }
      }
    }

    .search-result__icon {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--doc-surface-sunken, #f1f5f9);
      color: var(--doc-text-secondary, #475569);
      border-radius: var(--doc-radius-md, 10px);
      transition: all var(--doc-transition-fast, 150ms);
      flex-shrink: 0;
    }

    .search-result__content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }

    .search-result__label {
      font-weight: 500;
      font-size: 0.9375rem;
    }

    .search-result__category,
    .search-result__desc {
      font-size: 0.75rem;
      color: var(--doc-text-tertiary, #94a3b8);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .search-result__arrow {
      color: var(--doc-accent-primary, #6366f1);
      opacity: 0;
      transform: translateX(-4px);
      transition: all var(--doc-transition-fast, 150ms);
    }

    // ==========================================================================
    // Hints
    // ==========================================================================
    .search-hints {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--doc-space-md, 16px);
      padding: var(--doc-space-2xl, 48px) var(--doc-space-lg, 24px);
      text-align: center;
      color: var(--doc-text-tertiary, #94a3b8);

      .search-hints__icon {
        opacity: 0.4;
      }

      p {
        margin: 0;
        font-size: 0.9375rem;
        max-width: 280px;
      }
    }

    .search-hints__keys {
      display: flex;
      justify-content: center;
      gap: var(--doc-space-lg, 24px);
      font-size: 0.75rem;

      kbd {
        padding: 4px 8px;
        background: var(--doc-surface-sunken, #f1f5f9);
        border: 1px solid var(--doc-border-subtle, #e2e8f0);
        border-radius: var(--doc-radius-sm, 6px);
        font-family: inherit;
        font-weight: 500;
      }
    }

    // ==========================================================================
    // Responsive
    // ==========================================================================
    @media (max-width: 640px) {
      .search-trigger__text {
        display: none;
      }

      .search-trigger {
        min-width: auto;
        padding: var(--doc-space-sm, 8px);
      }

      .search-modal {
        margin-top: var(--doc-space-md, 16px);
        border-radius: var(--doc-radius-lg, 14px);
      }
    }
  `],
})
export class GlobalSearch implements OnInit, OnDestroy {
  @ViewChild('searchInput') searchInputRef!: ElementRef<HTMLInputElement>;

  private searchService = inject(SearchService);
  private router = inject(Router);
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  /** États */
  isOpen = signal(false);
  query = signal('');
  results = signal<SearchResult[]>([]);
  selectedIndex = signal(0);

  /** Résultats filtrés par type */
  componentResults = computed(() =>
    this.results().filter(r => r.type === 'component')
  );

  docResults = computed(() =>
    this.results().filter(r => r.type === 'documentation')
  );

  ngOnInit(): void {
    // Debounce de la recherche
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(query => {
        const results = this.searchService.search(query);
        this.results.set(results);
        this.selectedIndex.set(0);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Raccourci clavier global Cmd/Ctrl+K */
  @HostListener('document:keydown', ['$event'])
  handleGlobalKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      this.open();
    }
  }

  /** Ouvrir le modal */
  open(): void {
    this.isOpen.set(true);
    setTimeout(() => {
      this.searchInputRef?.nativeElement?.focus();
    }, 50);
  }

  /** Fermer le modal */
  close(): void {
    this.isOpen.set(false);
    this.query.set('');
    this.results.set([]);
    this.selectedIndex.set(0);
  }

  /** Changement de query */
  onQueryChange(value: string): void {
    this.query.set(value);
    this.searchSubject.next(value);
  }

  /** Effacer la query */
  clearQuery(): void {
    this.query.set('');
    this.results.set([]);
    this.searchInputRef?.nativeElement?.focus();
  }

  /** Navigation clavier dans les résultats */
  onKeydown(event: KeyboardEvent): void {
    const totalResults = this.results().length;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex.update(i => (i + 1) % totalResults || 0);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex.update(i => (i - 1 + totalResults) % totalResults || 0);
        break;
      case 'Enter':
        event.preventDefault();
        const selected = this.results()[this.selectedIndex()];
        if (selected) {
          this.selectResult(selected);
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
    }
  }

  /** Sélectionner un résultat */
  selectResult(result: SearchResult): void {
    this.router.navigate([result.path]);
    this.close();
  }
}
