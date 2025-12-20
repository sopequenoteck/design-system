import {
  Component,
  input,
  signal,
  computed,
  OnInit,
  OnDestroy,
  ElementRef,
  HostListener,
  afterNextRender,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocIcon } from '../icon/doc-icon';

export interface TocItem {
  id: string;
  label: string;
  level: number;
}

@Component({
  selector: 'doc-toc',
  standalone: true,
  imports: [CommonModule, DocIcon],
  template: `
    <aside class="toc" [class.toc--expanded]="isExpanded()" aria-label="Table des matières">
      <button
        type="button"
        class="toc__toggle"
        (click)="toggleExpanded()"
        [attr.aria-expanded]="isExpanded()"
      >
        <doc-icon name="book" size="sm" />
        <span class="toc__toggle-label">Sur cette page</span>
        <doc-icon [name]="isExpanded() ? 'chevron-down' : 'chevron-right'" size="xs" />
      </button>

      @if (isExpanded()) {
        <nav class="toc__nav" aria-label="Navigation de la page">
          <div class="toc__indicator" [style.top.px]="indicatorTop()" [style.height.px]="indicatorHeight()"></div>
          <ul class="toc__list">
            @for (item of items(); track item.id; let i = $index) {
              <li
                class="toc__item"
                [class.toc__item--active]="activeId() === item.id"
                [class.toc__item--level-2]="item.level === 2"
                [class.toc__item--level-3]="item.level === 3"
              >
                <a
                  class="toc__link"
                  [href]="'#' + item.id"
                  (click)="scrollTo($event, item.id)"
                >
                  {{ item.label }}
                </a>
              </li>
            }
          </ul>
        </nav>
      }
    </aside>
  `,
  styles: [`
    .toc {
      position: sticky;
      top: calc(var(--doc-header-height, 60px) + var(--doc-space-lg, 24px));
      max-height: calc(100vh - var(--doc-header-height, 60px) - var(--doc-space-2xl, 48px));
      width: 220px;
      padding: var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #ffffff);
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-lg, 14px);
      overflow-y: auto;
      flex-shrink: 0;

      // Custom scrollbar
      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background: var(--doc-border-default, #e2e8f0);
        border-radius: 2px;
      }
    }

    .toc__toggle {
      display: flex;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
      width: 100%;
      padding: 0;
      border: none;
      background: transparent;
      color: var(--doc-text-secondary, #475569);
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      cursor: pointer;
      transition: color var(--doc-transition-fast, 150ms);

      &:hover {
        color: var(--doc-text-primary, #0f172a);
      }
    }

    .toc__toggle-label {
      flex: 1;
      text-align: left;
    }

    .toc__nav {
      position: relative;
      margin-top: var(--doc-space-md, 16px);
      padding-left: var(--doc-space-md, 16px);
      animation: doc-fade-in-up 200ms ease-out;
    }

    .toc__indicator {
      position: absolute;
      left: 0;
      width: 2px;
      background: var(--doc-accent-primary, #6366f1);
      border-radius: 1px;
      transition: top var(--doc-transition-fast, 150ms),
                  height var(--doc-transition-fast, 150ms);
    }

    .toc__list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .toc__item {
      position: relative;

      &--level-2 {
        padding-left: 0;
      }

      &--level-3 {
        padding-left: var(--doc-space-md, 16px);
      }
    }

    .toc__link {
      display: block;
      padding: var(--doc-space-xs, 4px) 0;
      font-size: 0.8125rem;
      color: var(--doc-text-tertiary, #94a3b8);
      text-decoration: none;
      line-height: 1.5;
      transition: color var(--doc-transition-fast, 150ms);
      border-left: 2px solid transparent;
      margin-left: calc(-1 * var(--doc-space-md, 16px) - 2px);
      padding-left: calc(var(--doc-space-md, 16px) + 2px);

      &:hover {
        color: var(--doc-text-secondary, #475569);
      }

      .toc__item--active & {
        color: var(--doc-accent-primary, #6366f1);
        font-weight: 500;
      }
    }

    // Responsive: hide on smaller screens
    @media (max-width: 1200px) {
      .toc {
        display: none;
      }
    }
  `]
})
export class TableOfContents implements OnInit, OnDestroy {
  /** Items de la table des matières */
  items = input<TocItem[]>([]);

  /** Offset pour le scroll (header height) */
  scrollOffset = input<number>(80);

  /** ID de la section active */
  activeId = signal<string | null>(null);

  /** Expanded state */
  isExpanded = signal(true);

  /** Position de l'indicateur */
  indicatorTop = signal(0);
  indicatorHeight = signal(24);

  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef) {
    afterNextRender(() => {
      this.initScrollSpy();
    });
  }

  ngOnInit(): void {
    // Initial active section from URL hash
    const hash = window.location.hash.slice(1);
    if (hash) {
      this.activeId.set(hash);
    } else if (this.items().length > 0) {
      this.activeId.set(this.items()[0].id);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  toggleExpanded(): void {
    this.isExpanded.update(v => !v);
  }

  scrollTo(event: Event, id: string): void {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - this.scrollOffset();
      window.scrollTo({ top, behavior: 'smooth' });
      this.activeId.set(id);
      history.replaceState(null, '', `#${id}`);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    this.updateActiveSection();
  }

  private initScrollSpy(): void {
    const options = {
      rootMargin: `-${this.scrollOffset()}px 0px -50% 0px`,
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeId.set(entry.target.id);
          this.updateIndicatorPosition();
        }
      });
    }, options);

    // Observe all sections
    this.items().forEach(item => {
      const element = document.getElementById(item.id);
      if (element) {
        this.observer?.observe(element);
      }
    });
  }

  private updateActiveSection(): void {
    const offset = this.scrollOffset();
    let activeItem: TocItem | null = null;

    for (const item of this.items()) {
      const element = document.getElementById(item.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= offset + 50) {
          activeItem = item;
        }
      }
    }

    if (activeItem) {
      this.activeId.set(activeItem.id);
      this.updateIndicatorPosition();
    }
  }

  private updateIndicatorPosition(): void {
    const activeId = this.activeId();
    if (!activeId) return;

    const activeIndex = this.items().findIndex(item => item.id === activeId);
    if (activeIndex >= 0) {
      // Approximate position based on index
      const itemHeight = 28;
      this.indicatorTop.set(activeIndex * itemHeight);
      this.indicatorHeight.set(itemHeight);
    }
  }
}
