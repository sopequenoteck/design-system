import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faAnglesLeft,
  faAnglesRight
} from '@fortawesome/free-solid-svg-icons';

/**
 * Tailles disponibles pour la pagination.
 */
export type PaginationSize = 'sm' | 'md' | 'lg';

/**
 * Options de taille de page disponibles.
 */
export type PageSizeOption = number;

/**
 * Événement émis lors du changement de page.
 */
export interface PageChangeEvent {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

/**
 * # DsPagination
 *
 * Composant de pagination pour naviguer entre les pages d'un ensemble de données.
 *
 * ## Usage
 *
 * ```html
 * <ds-pagination
 *   [totalItems]="100"
 *   [pageSize]="10"
 *   [currentPage]="1"
 *   [showFirstLast]="true"
 *   [showPageSizeSelector]="true"
 *   (pageChange)="onPageChange($event)">
 * </ds-pagination>
 * ```
 *
 * ## Accessibilité
 *
 * - Utilise `role="navigation"` avec `aria-label`
 * - Boutons avec `aria-label` descriptifs
 * - Page courante indiquée par `aria-current="page"`
 * - Navigation clavier complète (Tab, Enter, Space)
 *
 * @component
 */
@Component({
  selector: 'ds-pagination',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './ds-pagination.html',
  styleUrl: './ds-pagination.scss',
})
export class DsPagination {
  // Icônes FontAwesome
  readonly faChevronLeft = faChevronLeft;
  readonly faChevronRight = faChevronRight;
  readonly faAnglesLeft = faAnglesLeft;
  readonly faAnglesRight = faAnglesRight;

  /**
   * Nombre total d'éléments.
   */
  totalItems = input.required<number>();

  /**
   * Nombre d'éléments par page.
   * @default 10
   */
  pageSize = input<number>(10);

  /**
   * Page courante (1-indexed).
   * @default 1
   */
  currentPage = input<number>(1);

  /**
   * Taille du composant.
   * @default 'md'
   */
  size = input<PaginationSize>('md');

  /**
   * Afficher les boutons première/dernière page.
   * @default true
   */
  showFirstLast = input<boolean>(true);

  /**
   * Afficher le sélecteur de taille de page.
   * @default false
   */
  showPageSizeSelector = input<boolean>(false);

  /**
   * Options de taille de page disponibles.
   * @default [10, 25, 50, 100]
   */
  pageSizeOptions = input<PageSizeOption[]>([10, 25, 50, 100]);

  /**
   * Nombre maximum de pages affichées dans la navigation.
   * @default 5
   */
  maxVisiblePages = input<number>(5);

  /**
   * Afficher les informations "X - Y sur Z".
   * @default true
   */
  showInfo = input<boolean>(true);

  /**
   * Désactiver le composant.
   * @default false
   */
  disabled = input<boolean>(false);

  /**
   * Label ARIA pour la navigation.
   * @default 'Pagination'
   */
  ariaLabel = input<string>('Pagination');

  /**
   * Événement émis lors du changement de page.
   */
  pageChange = output<PageChangeEvent>();

  /**
   * Événement émis lors du changement de taille de page.
   */
  pageSizeChange = output<number>();

  /**
   * Calcul du nombre total de pages.
   */
  readonly totalPages = computed(() => {
    const total = this.totalItems();
    const size = this.pageSize();
    return Math.max(1, Math.ceil(total / size));
  });

  /**
   * Page courante normalisée (entre 1 et totalPages).
   */
  readonly normalizedCurrentPage = computed(() => {
    const page = this.currentPage();
    const total = this.totalPages();
    return Math.max(1, Math.min(page, total));
  });

  /**
   * Premier élément affiché (1-indexed).
   */
  readonly startItem = computed(() => {
    const page = this.normalizedCurrentPage();
    const size = this.pageSize();
    return (page - 1) * size + 1;
  });

  /**
   * Dernier élément affiché.
   */
  readonly endItem = computed(() => {
    const start = this.startItem();
    const size = this.pageSize();
    const total = this.totalItems();
    return Math.min(start + size - 1, total);
  });

  /**
   * Peut aller à la page précédente.
   */
  readonly canGoPrevious = computed(() => {
    return this.normalizedCurrentPage() > 1 && !this.disabled();
  });

  /**
   * Peut aller à la page suivante.
   */
  readonly canGoNext = computed(() => {
    return this.normalizedCurrentPage() < this.totalPages() && !this.disabled();
  });

  /**
   * Pages visibles dans la navigation.
   */
  readonly visiblePages = computed(() => {
    const current = this.normalizedCurrentPage();
    const total = this.totalPages();
    const max = this.maxVisiblePages();

    if (total <= max) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const half = Math.floor(max / 2);
    let start = current - half;
    let end = current + half;

    if (start < 1) {
      start = 1;
      end = max;
    }

    if (end > total) {
      end = total;
      start = total - max + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

  /**
   * Afficher les ellipses au début.
   */
  readonly showStartEllipsis = computed(() => {
    const pages = this.visiblePages();
    return pages.length > 0 && pages[0] > 1;
  });

  /**
   * Afficher les ellipses à la fin.
   */
  readonly showEndEllipsis = computed(() => {
    const pages = this.visiblePages();
    const total = this.totalPages();
    return pages.length > 0 && pages[pages.length - 1] < total;
  });

  /**
   * Classes CSS du conteneur.
   */
  readonly containerClasses = computed(() => {
    return [
      'ds-pagination',
      `ds-pagination--${this.size()}`,
      this.disabled() ? 'ds-pagination--disabled' : ''
    ].filter(Boolean);
  });

  /**
   * Aller à une page spécifique.
   */
  goToPage(page: number): void {
    if (this.disabled()) return;

    const normalized = Math.max(1, Math.min(page, this.totalPages()));
    if (normalized !== this.normalizedCurrentPage()) {
      this.emitPageChange(normalized);
    }
  }

  /**
   * Aller à la première page.
   */
  goToFirst(): void {
    this.goToPage(1);
  }

  /**
   * Aller à la dernière page.
   */
  goToLast(): void {
    this.goToPage(this.totalPages());
  }

  /**
   * Aller à la page précédente.
   */
  goToPrevious(): void {
    this.goToPage(this.normalizedCurrentPage() - 1);
  }

  /**
   * Aller à la page suivante.
   */
  goToNext(): void {
    this.goToPage(this.normalizedCurrentPage() + 1);
  }

  /**
   * Changer la taille de page.
   */
  onPageSizeChange(event: Event): void {
    if (this.disabled()) return;

    const select = event.target as HTMLSelectElement;
    const newSize = parseInt(select.value, 10);
    this.pageSizeChange.emit(newSize);
    // Recalculer la page pour rester au même endroit dans les données
    const currentStart = this.startItem();
    const newPage = Math.ceil(currentStart / newSize);
    this.emitPageChange(newPage, newSize);
  }

  /**
   * Émettre l'événement de changement de page.
   */
  private emitPageChange(page: number, pageSize?: number): void {
    const size = pageSize ?? this.pageSize();
    this.pageChange.emit({
      page,
      pageSize: size,
      totalItems: this.totalItems(),
      totalPages: Math.ceil(this.totalItems() / size)
    });
  }

  /**
   * Gestion du clavier sur les boutons de page.
   */
  onPageKeydown(event: KeyboardEvent, page: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.goToPage(page);
    }
  }
}
