import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faCircle, faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';

/**
 * Mode d'affichage de la timeline.
 */
export type TimelineMode = 'left' | 'right' | 'alternate';

/**
 * Taille de la timeline.
 */
export type TimelineSize = 'sm' | 'md' | 'lg';

/**
 * Couleur du point de la timeline.
 */
export type TimelineColor = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';

/**
 * Configuration d'un item de timeline.
 */
export interface TimelineItem {
  /**
   * Contenu textuel de l'événement.
   */
  content: string;

  /**
   * Date optionnelle de l'événement.
   */
  date?: string;

  /**
   * Icône FontAwesome optionnelle.
   */
  icon?: IconDefinition;

  /**
   * Couleur du point (si pas d'icône).
   * @default 'default'
   */
  color?: TimelineColor;

  /**
   * Position du contenu (pour mode alternate).
   * Si non défini, suit le mode global.
   */
  position?: 'left' | 'right';
}

/**
 * Événement émis au clic sur un item.
 */
export interface TimelineItemClickEvent {
  item: TimelineItem;
  index: number;
}

/**
 * # DsTimeline
 *
 * Composant pour afficher une liste d'événements dans un ordre chronologique vertical.
 *
 * ## Usage
 *
 * ```html
 * <ds-timeline
 *   [items]="events"
 *   mode="left"
 *   size="md"
 *   [pending]="false"
 *   (itemClick)="onItemClick($event)">
 * </ds-timeline>
 * ```
 *
 * ## Modes
 *
 * - `left` : Contenu aligné à droite de la ligne
 * - `right` : Contenu aligné à gauche de la ligne
 * - `alternate` : Contenu alterné gauche/droite
 *
 * ## Accessibilité
 *
 * - Liste sémantique avec `role="list"` et `role="listitem"`
 * - Dates et contenus avec attributs ARIA
 * - Navigation clavier supportée
 *
 * @component
 */
@Component({
  selector: 'ds-timeline',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './ds-timeline.html',
  styleUrl: './ds-timeline.scss',
})
export class DsTimeline {
  /**
   * Liste des événements à afficher.
   */
  items = input.required<TimelineItem[]>();

  /**
   * Mode d'affichage (position du contenu).
   * @default 'left'
   */
  mode = input<TimelineMode>('left');

  /**
   * Taille du composant.
   * @default 'md'
   */
  size = input<TimelineSize>('md');

  /**
   * Affiche un indicateur "en cours" à la fin.
   * @default false
   */
  pending = input<boolean>(false);

  /**
   * Texte de l'indicateur pending.
   * @default 'En cours...'
   */
  pendingContent = input<string>('En cours...');

  /**
   * Inverse l'ordre d'affichage (plus récent en haut).
   * @default false
   */
  reverse = input<boolean>(false);

  /**
   * Événement émis au clic sur un item.
   */
  itemClick = output<TimelineItemClickEvent>();

  /**
   * Icônes par défaut.
   */
  readonly defaultIcon = faCircle;
  readonly pendingIcon = faCircleHalfStroke;

  /**
   * Items triés (reverse si demandé).
   */
  readonly sortedItems = computed(() => {
    const items = [...this.items()];
    return this.reverse() ? items.reverse() : items;
  });

  /**
   * Classes CSS du conteneur.
   */
  readonly containerClasses = computed(() => {
    return [
      'ds-timeline',
      `ds-timeline--${this.mode()}`,
      `ds-timeline--${this.size()}`,
    ].filter(Boolean);
  });

  /**
   * Classes CSS pour un item.
   */
  getItemClasses(item: TimelineItem, index: number): string[] {
    const position = this.getItemPosition(index);

    return [
      'ds-timeline__item',
      `ds-timeline__item--${position}`,
      item.color ? `ds-timeline__item--${item.color}` : 'ds-timeline__item--default',
    ].filter(Boolean);
  }

  /**
   * Classes CSS pour le point d'un item.
   */
  getDotClasses(item: TimelineItem): string[] {
    return [
      'ds-timeline__dot',
      item.icon ? 'ds-timeline__dot--with-icon' : '',
      item.color ? `ds-timeline__dot--${item.color}` : 'ds-timeline__dot--default',
    ].filter(Boolean);
  }

  /**
   * Détermine la position d'un item en fonction du mode.
   */
  getItemPosition(index: number): 'left' | 'right' {
    const mode = this.mode();

    if (mode === 'left') return 'right'; // Contenu à droite de la ligne
    if (mode === 'right') return 'left'; // Contenu à gauche de la ligne

    // Mode alternate : alterner selon l'index
    return index % 2 === 0 ? 'right' : 'left';
  }

  /**
   * Gère le clic sur un item.
   */
  handleItemClick(item: TimelineItem, index: number): void {
    this.itemClick.emit({ item, index });
  }

  /**
   * Gère la touche Enter/Space sur un item.
   */
  handleKeydown(event: KeyboardEvent, item: TimelineItem, index: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleItemClick(item, index);
    }
  }

  /**
   * Icône à afficher pour un item.
   */
  getIcon(item: TimelineItem): IconDefinition {
    return item.icon || this.defaultIcon;
  }

  /**
   * Vérifie si c'est le dernier item.
   */
  isLastItem(index: number): boolean {
    return index === this.sortedItems().length - 1;
  }
}
