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

@Component({
  selector: 'doc-global-search',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <!-- Trigger button -->
    <button
      type="button"
      class="search-trigger"
      (click)="open()"
      aria-label="Ouvrir la recherche"
    >
      <span class="search-trigger__icon">🔍</span>
      <span class="search-trigger__text">Rechercher...</span>
      <kbd class="search-trigger__kbd">⌘K</kbd>
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
            <span class="search-input__icon">🔍</span>
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
                ✕
              </button>
            }
          </div>

          <!-- Results -->
          <div class="search-results">
            @if (query() && results().length === 0) {
              <div class="search-empty">
                <span class="search-empty__icon">🔍</span>
                <p>Aucun résultat pour "{{ query() }}"</p>
              </div>
            }

            @if (results().length > 0) {
              <!-- Composants -->
              @if (componentResults().length > 0) {
                <div class="search-group">
                  <div class="search-group__header">Composants</div>
                  @for (result of componentResults(); track result.id; let i = $index) {
                    <a
                      class="search-result"
                      [class.selected]="i === selectedIndex()"
                      [routerLink]="result.path"
                      (click)="selectResult(result)"
                      (mouseenter)="selectedIndex.set(i)"
                    >
                      <span class="search-result__icon">{{ result.icon }}</span>
                      <div class="search-result__content">
                        <span class="search-result__label">{{ result.label }}</span>
                        <span class="search-result__category">{{ result.category }}</span>
                      </div>
                      <span class="search-result__type">↵</span>
                    </a>
                  }
                </div>
              }

              <!-- Documentation -->
              @if (docResults().length > 0) {
                <div class="search-group">
                  <div class="search-group__header">Documentation</div>
                  @for (result of docResults(); track result.id; let i = $index) {
                    <a
                      class="search-result"
                      [class.selected]="componentResults().length + i === selectedIndex()"
                      [routerLink]="result.path"
                      (click)="selectResult(result)"
                      (mouseenter)="selectedIndex.set(componentResults().length + i)"
                    >
                      <span class="search-result__icon">{{ result.icon }}</span>
                      <div class="search-result__content">
                        <span class="search-result__label">{{ result.label }}</span>
                        <span class="search-result__desc">{{ result.description }}</span>
                      </div>
                      <span class="search-result__type">↵</span>
                    </a>
                  }
                </div>
              }
            }

            @if (!query()) {
              <div class="search-hints">
                <p>Tapez pour rechercher dans les composants et la documentation</p>
                <div class="search-hints__keys">
                  <span><kbd>↑↓</kbd> pour naviguer</span>
                  <span><kbd>↵</kbd> pour sélectionner</span>
                  <span><kbd>esc</kbd> pour fermer</span>
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
      gap: 8px;
      padding: 8px 12px;
      border: 1px solid var(--border-default, #e5e7eb);
      border-radius: var(--radius-2, 8px);
      background: var(--background-secondary, #f3f4f6);
      color: var(--text-muted, #6b7280);
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.15s ease;
      min-width: 200px;

      &:hover {
        background: var(--background-main, #ffffff);
        border-color: var(--border-hover, #d1d5db);
      }
    }

    .search-trigger__icon {
      font-size: 0.875rem;
    }

    .search-trigger__text {
      flex: 1;
      text-align: left;
    }

    .search-trigger__kbd {
      padding: 2px 6px;
      font-size: 0.75rem;
      font-family: inherit;
      background: var(--background-main, #ffffff);
      border: 1px solid var(--border-default, #e5e7eb);
      border-radius: 4px;
      color: var(--text-muted, #9ca3af);
    }

    // ==========================================================================
    // Modal overlay
    // ==========================================================================
    .search-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 10vh;
      animation: fadeIn 0.15s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .search-modal {
      width: 100%;
      max-width: 600px;
      background: var(--background-panel, #ffffff);
      border-radius: var(--radius-3, 12px);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      overflow: hidden;
      animation: slideDown 0.2s ease;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    // ==========================================================================
    // Search input
    // ==========================================================================
    .search-input-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      border-bottom: 1px solid var(--border-default, #e5e7eb);
    }

    .search-input__icon {
      font-size: 1.25rem;
      color: var(--text-muted, #9ca3af);
    }

    .search-input {
      flex: 1;
      border: none;
      background: transparent;
      font-size: 1.125rem;
      color: var(--text-default, #1a1a1a);
      outline: none;

      &::placeholder {
        color: var(--text-muted, #9ca3af);
      }
    }

    .search-input__clear {
      width: 24px;
      height: 24px;
      padding: 0;
      border: none;
      border-radius: 4px;
      background: var(--background-secondary, #f3f4f6);
      color: var(--text-muted, #6b7280);
      font-size: 0.75rem;
      cursor: pointer;

      &:hover {
        background: var(--background-main, #e5e7eb);
        color: var(--text-default, #1a1a1a);
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
      gap: 8px;
      padding: 48px 24px;
      color: var(--text-muted, #9ca3af);

      .search-empty__icon {
        font-size: 2rem;
        opacity: 0.5;
      }

      p {
        margin: 0;
        font-size: 0.875rem;
      }
    }

    .search-group {
      padding: 8px 0;
    }

    .search-group__header {
      padding: 8px 20px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted, #9ca3af);
    }

    .search-result {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 20px;
      text-decoration: none;
      color: var(--text-default, #1a1a1a);
      cursor: pointer;
      transition: background 0.1s ease;

      &:hover,
      &.selected {
        background: var(--background-secondary, #f3f4f6);
      }

      &.selected {
        .search-result__type {
          opacity: 1;
        }
      }
    }

    .search-result__icon {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      background: var(--background-secondary, #f3f4f6);
      border-radius: var(--radius-1, 4px);
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
    }

    .search-result__category,
    .search-result__desc {
      font-size: 0.75rem;
      color: var(--text-muted, #9ca3af);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .search-result__type {
      font-size: 0.875rem;
      color: var(--text-muted, #9ca3af);
      opacity: 0;
      transition: opacity 0.1s ease;
    }

    // ==========================================================================
    // Hints
    // ==========================================================================
    .search-hints {
      padding: 24px;
      text-align: center;
      color: var(--text-muted, #9ca3af);

      p {
        margin: 0 0 16px 0;
        font-size: 0.875rem;
      }
    }

    .search-hints__keys {
      display: flex;
      justify-content: center;
      gap: 24px;
      font-size: 0.75rem;

      kbd {
        padding: 2px 6px;
        background: var(--background-secondary, #f3f4f6);
        border: 1px solid var(--border-default, #e5e7eb);
        border-radius: 4px;
        font-family: inherit;
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
