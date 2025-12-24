import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { DsBadge } from '../ds-badge/ds-badge';
import { DsDivider } from '../ds-divider/ds-divider';

import {
  NavListItem,
  NavListGroup,
  NavListSize,
  NavListItemClickEvent,
  NavListGroupToggleEvent,
  NavListGroupActionEvent,
} from './ds-nav-list.types';

/**
 * # DsNavList
 *
 * Composant de liste de navigation/filtrage avec support de groupes,
 * icônes/emojis, badges et indicateurs colorés.
 *
 * ## Fonctionnalités
 * - Groupes avec titres (dividers)
 * - Items avec icône FontAwesome OU emoji
 * - Badge compteur avec variantes de couleur
 * - Indicateur dot coloré
 * - Groupes repliables
 * - Navigation clavier
 *
 * ## Usage
 *
 * ```html
 * <ds-nav-list
 *   [groups]="navGroups"
 *   [activeItemId]="activeFilter"
 *   [size]="'md'"
 *   (itemClick)="onItemClick($event)">
 * </ds-nav-list>
 * ```
 *
 * ## Accessibilité
 * - Rôle navigation avec aria-label
 * - Navigation clavier (Arrow, Enter, Space)
 * - États aria-current pour item actif
 *
 * @component
 */
@Component({
  selector: 'ds-nav-list',
  standalone: true,
  imports: [
    CommonModule,
    FaIconComponent,
    DsBadge,
    DsDivider,
  ],
  templateUrl: './ds-nav-list.html',
  styleUrl: './ds-nav-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsNavList {
  // ============ INPUTS ============

  /** Liste des groupes d'items */
  readonly groups = input.required<NavListGroup[]>();

  /** ID de l'item actif */
  readonly activeItemId = input<string | number | null>(null);

  /** Taille du composant */
  readonly size = input<NavListSize>('md');

  /** Label ARIA pour l'accessibilité */
  readonly ariaLabel = input<string>('Navigation');

  // ============ OUTPUTS ============

  /** Émis lors du clic sur un item */
  readonly itemClick = output<NavListItemClickEvent>();

  /** Émis lors du toggle d'un groupe */
  readonly groupToggle = output<NavListGroupToggleEvent>();

  /** Émis lors du clic sur l'action d'un groupe */
  readonly groupAction = output<NavListGroupActionEvent>();

  // ============ ICONS ============

  protected readonly faChevronDown = faChevronDown;
  protected readonly faChevronRight = faChevronRight;

  // ============ INTERNAL STATE ============

  /** IDs des groupes collapsed */
  private readonly collapsedGroupIds = signal<Set<string>>(new Set());

  // ============ COMPUTED ============

  /** Classes CSS du conteneur */
  readonly containerClasses = computed(() => {
    return [
      'ds-nav-list',
      `ds-nav-list--${this.size()}`,
    ].join(' ');
  });

  // ============ LIFECYCLE ============

  constructor() {
    // Initialiser les groupes collapsed à partir de leur état initial
  }

  // ============ PUBLIC METHODS ============

  /**
   * Vérifie si un item est actif
   */
  isActive(item: NavListItem): boolean {
    return this.activeItemId() === item.id;
  }

  /**
   * Vérifie si un groupe est collapsed
   */
  isGroupCollapsed(group: NavListGroup): boolean {
    if (!group.collapsible) return false;

    // Vérifier l'état interne ou l'état initial
    if (this.collapsedGroupIds().has(group.id)) {
      return true;
    }

    // État initial si pas encore togglé
    return group.collapsed ?? false;
  }

  /**
   * Toggle l'état collapsed d'un groupe
   */
  toggleGroup(group: NavListGroup, event: MouseEvent): void {
    if (!group.collapsible) return;

    event.stopPropagation();

    const collapsed = new Set(this.collapsedGroupIds());
    const isCurrentlyCollapsed = this.isGroupCollapsed(group);

    if (isCurrentlyCollapsed) {
      collapsed.delete(group.id);
    } else {
      collapsed.add(group.id);
    }

    this.collapsedGroupIds.set(collapsed);

    this.groupToggle.emit({
      group,
      collapsed: !isCurrentlyCollapsed,
    });
  }

  /**
   * Gère le clic sur un item
   */
  handleItemClick(item: NavListItem, group: NavListGroup, event: MouseEvent): void {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    this.itemClick.emit({
      item,
      group,
      event,
    });
  }

  /**
   * Gère la navigation clavier sur un item
   */
  handleItemKeydown(item: NavListItem, group: NavListGroup, event: KeyboardEvent): void {
    if (item.disabled) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.itemClick.emit({
        item,
        group,
        event: event as unknown as MouseEvent,
      });
    }
  }

  /**
   * Retourne les classes CSS pour un item
   */
  getItemClasses(item: NavListItem): string {
    const classes = ['nav-list-item'];

    if (this.isActive(item)) {
      classes.push('nav-list-item--active');
    }

    if (item.disabled) {
      classes.push('nav-list-item--disabled');
    }

    return classes.join(' ');
  }

  /**
   * Gère le clic sur l'action d'un groupe
   */
  handleGroupAction(group: NavListGroup, event: MouseEvent): void {
    event.stopPropagation();
    this.groupAction.emit({ group, event });
  }
}
