import {
  Component,
  input,
  output,
  computed,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { DsBadge } from '../ds-badge/ds-badge';
import { ListGroupVariant, ListGroupToggleEvent } from './ds-list-group.types';

/**
 * # DsListGroup
 *
 * Composant de regroupement d'éléments de liste avec header et contenu collapsible.
 * Idéal pour organiser les tâches par date, catégorie ou statut.
 *
 * ## Usage
 *
 * ```html
 * <!-- Groupe simple -->
 * <ds-list-group title="Aujourd'hui">
 *   <ds-list-item title="Tâche 1" />
 *   <ds-list-item title="Tâche 2" />
 * </ds-list-group>
 *
 * <!-- Groupe collapsible avec compteur -->
 * <ds-list-group
 *   title="Cette semaine"
 *   [count]="5"
 *   variant="collapsible"
 *   [expanded]="true"
 * >
 *   <ds-list-item title="Tâche 1" />
 * </ds-list-group>
 *
 * <!-- Groupes dans une liste -->
 * <ds-list>
 *   <ds-list-group title="Haute priorité" [count]="3" variant="collapsible">
 *     ...
 *   </ds-list-group>
 *   <ds-list-group title="Normale" [count]="5" variant="collapsible">
 *     ...
 *   </ds-list-group>
 * </ds-list>
 * ```
 */
@Component({
  selector: 'ds-list-group',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, DsBadge],
  templateUrl: './ds-list-group.html',
  styleUrl: './ds-list-group.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsListGroup {
  // === Contenu ===

  /**
   * Titre du groupe (requis)
   */
  readonly title = input.required<string>();

  /**
   * Sous-titre optionnel
   */
  readonly subtitle = input<string>();

  /**
   * Nombre d'éléments (affiché comme badge)
   */
  readonly count = input<number>();

  // === Comportement ===

  /**
   * Variante du groupe
   * @default 'default'
   */
  readonly variant = input<ListGroupVariant>('default');

  /**
   * État expanded (pour variante collapsible)
   * @default true
   */
  readonly expanded = input<boolean>(true);

  /**
   * Émis lors du toggle expand/collapse
   */
  readonly expandedChange = output<ListGroupToggleEvent>();

  // === Apparence ===

  /**
   * Header sticky au scroll
   * @default false
   */
  readonly sticky = input<boolean>(false);

  /**
   * Icône personnalisée pour le header
   */
  readonly icon = input<IconDefinition>();

  // === Internal state ===
  private readonly internalExpanded = signal<boolean | null>(null);

  // === Icons ===
  readonly faChevronRight = faChevronRight;
  readonly faChevronDown = faChevronDown;

  // === Computed ===

  /**
   * État expanded effectif (interne ou input)
   */
  readonly isExpanded = computed(() => {
    const internal = this.internalExpanded();
    return internal !== null ? internal : this.expanded();
  });

  /**
   * Est-ce un groupe collapsible ?
   */
  readonly isCollapsible = computed(() => {
    return this.variant() === 'collapsible';
  });

  /**
   * Classes CSS du conteneur
   */
  readonly groupClasses = computed(() => {
    const classes: string[] = ['ds-list-group'];

    if (this.isCollapsible()) classes.push('ds-list-group--collapsible');
    if (!this.isExpanded()) classes.push('ds-list-group--collapsed');
    if (this.sticky()) classes.push('ds-list-group--sticky');

    return classes.join(' ');
  });

  /**
   * Icône du chevron
   */
  readonly chevronIcon = computed(() => {
    return this.isExpanded() ? this.faChevronDown : this.faChevronRight;
  });

  /**
   * Afficher le compteur ?
   */
  readonly showCount = computed(() => {
    return this.count() !== undefined && this.count() !== null;
  });

  // === Méthodes ===

  /**
   * Toggle expand/collapse
   */
  toggle(): void {
    if (!this.isCollapsible()) return;

    const newValue = !this.isExpanded();
    this.internalExpanded.set(newValue);
    this.expandedChange.emit({ expanded: newValue });
  }

  /**
   * Gère les événements clavier sur le header
   */
  handleKeyDown(event: KeyboardEvent): void {
    if (!this.isCollapsible()) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle();
    }
  }
}
