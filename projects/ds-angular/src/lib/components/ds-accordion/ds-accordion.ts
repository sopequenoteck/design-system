import { Component, input, output, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

/**
 * Taille de l'accordion.
 */
export type AccordionSize = 'sm' | 'md' | 'lg';

/**
 * Variant de style de l'accordion.
 */
export type AccordionVariant = 'default' | 'bordered' | 'separated';

/**
 * Configuration d'un item d'accordion.
 */
export interface AccordionItem {
  id: string;
  header: string;
  content: string;
  disabled?: boolean;
}

/**
 * Événement émis lors du changement d'état d'un item.
 */
export interface AccordionChangeEvent {
  itemId: string;
  expanded: boolean;
  expandedItems: string[];
}

/**
 * # DsAccordion
 *
 * Composant accordion pour afficher/masquer des sections de contenu.
 *
 * ## Usage
 *
 * ```html
 * <ds-accordion
 *   [items]="items"
 *   [multiple]="false"
 *   (itemChange)="onItemChange($event)">
 * </ds-accordion>
 * ```
 *
 * ## Accessibilité
 *
 * - Headers avec `role="button"` et `aria-expanded`
 * - Contenu avec `role="region"` et `aria-labelledby`
 * - Navigation clavier : Enter/Space pour toggle, ArrowUp/Down pour navigation
 *
 * @component
 */
@Component({
  selector: 'ds-accordion',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './ds-accordion.html',
  styleUrl: './ds-accordion.scss',
})
export class DsAccordion {
  // Icône FontAwesome
  readonly faChevronDown = faChevronDown;

  /**
   * Liste des items de l'accordion.
   */
  items = input.required<AccordionItem[]>();

  /**
   * Permettre l'expansion de plusieurs items simultanément.
   * @default false
   */
  multiple = input<boolean>(false);

  /**
   * Taille du composant.
   * @default 'md'
   */
  size = input<AccordionSize>('md');

  /**
   * Variant de style.
   * @default 'default'
   */
  variant = input<AccordionVariant>('default');

  /**
   * IDs des items initialement ouverts.
   * @default []
   */
  expandedIds = input<string[]>([]);

  /**
   * Désactiver tout l'accordion.
   * @default false
   */
  disabled = input<boolean>(false);

  /**
   * Événement émis lors du changement d'état d'un item.
   */
  itemChange = output<AccordionChangeEvent>();

  /**
   * État interne des items ouverts.
   */
  private readonly _expandedIds = signal<Set<string>>(new Set());

  /**
   * Initialiser les items ouverts à partir de l'input.
   */
  constructor() {
    // Note: L'initialisation réactive se fait via effect() si nécessaire
  }

  /**
   * IDs des items actuellement ouverts.
   */
  readonly currentExpandedIds = computed(() => {
    const inputIds = this.expandedIds();
    const internalIds = this._expandedIds();

    // Fusionner les deux sources
    const merged = new Set([...inputIds, ...internalIds]);
    return merged;
  });

  /**
   * Vérifier si un item est ouvert.
   */
  isExpanded(itemId: string): boolean {
    return this.currentExpandedIds().has(itemId);
  }

  /**
   * Toggle un item.
   */
  toggleItem(item: AccordionItem): void {
    if (this.disabled() || item.disabled) return;

    const current = new Set(this._expandedIds());
    const isCurrentlyExpanded = current.has(item.id);

    if (isCurrentlyExpanded) {
      current.delete(item.id);
    } else {
      if (!this.multiple()) {
        current.clear();
      }
      current.add(item.id);
    }

    this._expandedIds.set(current);

    this.itemChange.emit({
      itemId: item.id,
      expanded: !isCurrentlyExpanded,
      expandedItems: Array.from(current),
    });
  }

  /**
   * Ouvrir tous les items.
   */
  expandAll(): void {
    if (this.disabled()) return;

    const allIds = new Set(
      this.items()
        .filter((item) => !item.disabled)
        .map((item) => item.id)
    );
    this._expandedIds.set(allIds);
  }

  /**
   * Fermer tous les items.
   */
  collapseAll(): void {
    if (this.disabled()) return;
    this._expandedIds.set(new Set());
  }

  /**
   * Gestion du clavier.
   */
  onKeydown(event: KeyboardEvent, item: AccordionItem, index: number): void {
    const itemsArr = this.items();

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggleItem(item);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.focusItem(Math.min(index + 1, itemsArr.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusItem(Math.max(index - 1, 0));
        break;
      case 'Home':
        event.preventDefault();
        this.focusItem(0);
        break;
      case 'End':
        event.preventDefault();
        this.focusItem(itemsArr.length - 1);
        break;
    }
  }

  /**
   * Focus sur un item par index.
   */
  private focusItem(index: number): void {
    const headers = document.querySelectorAll('.ds-accordion__header');
    const target = headers[index] as HTMLElement;
    target?.focus();
  }

  /**
   * Classes CSS du conteneur.
   */
  readonly containerClasses = computed(() => {
    return [
      'ds-accordion',
      `ds-accordion--${this.size()}`,
      `ds-accordion--${this.variant()}`,
      this.disabled() ? 'ds-accordion--disabled' : '',
    ].filter(Boolean);
  });

  /**
   * Classes CSS pour un item.
   */
  getItemClasses(item: AccordionItem): string[] {
    return [
      'ds-accordion__item',
      this.isExpanded(item.id) ? 'ds-accordion__item--expanded' : '',
      item.disabled ? 'ds-accordion__item--disabled' : '',
    ].filter(Boolean);
  }

  /**
   * ID unique pour le header.
   */
  getHeaderId(item: AccordionItem): string {
    return `accordion-header-${item.id}`;
  }

  /**
   * ID unique pour le contenu.
   */
  getContentId(item: AccordionItem): string {
    return `accordion-content-${item.id}`;
  }
}
