import {
  Component,
  input,
  output,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimitiveCheckbox } from '../../primitives/primitive-checkbox/primitive-checkbox';
import {
  ListItemSize,
  ListItemIndicator,
  ListItemIndicatorColor,
  ListItemClickEvent,
  ListItemCheckEvent,
} from './ds-list-item.types';

/**
 * Mapping des couleurs prédéfinies vers les variables CSS
 */
const INDICATOR_COLOR_MAP: Record<ListItemIndicatorColor, string> = {
  high: 'var(--color-error, #ef4444)',
  medium: 'var(--color-warning, #f59e0b)',
  low: 'var(--color-info, #3b82f6)',
  success: 'var(--color-success, #22c55e)',
  warning: 'var(--color-warning, #f59e0b)',
  error: 'var(--color-error, #ef4444)',
  info: 'var(--color-info, #3b82f6)',
};

/**
 * # DsListItem
 *
 * Composant de ligne d'élément de liste interactif, style TickTick/Todoist.
 * Supporte checkbox intégrée, indicateur de priorité, et slots pour métadonnées.
 *
 * ## Usage
 *
 * ```html
 * <!-- Basique -->
 * <ds-list-item title="Ma tâche" />
 *
 * <!-- Avec checkbox et priorité -->
 * <ds-list-item
 *   title="Tâche importante"
 *   [checkable]="true"
 *   [checked]="task.completed"
 *   indicator="priority"
 *   indicatorColor="high"
 *   (checkedChange)="onComplete($event)"
 * />
 *
 * <!-- Avec métadonnées -->
 * <ds-list-item title="Réunion" [checkable]="true">
 *   <ds-chip inline size="sm">Travail</ds-chip>
 *   <span meta>09:00</span>
 *   <span meta>30min</span>
 * </ds-list-item>
 * ```
 *
 * ## Accessibilité
 *
 * - Role `button` quand clickable, `listitem` sinon
 * - Navigation clavier (Enter, Space)
 * - aria-disabled, aria-selected appropriés
 */
@Component({
  selector: 'ds-list-item',
  standalone: true,
  imports: [CommonModule, PrimitiveCheckbox],
  templateUrl: './ds-list-item.html',
  styleUrl: './ds-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsListItem {
  // === Contenu ===

  /**
   * Titre principal de l'élément (requis)
   */
  readonly title = input.required<string>();

  /**
   * Sous-titre optionnel
   */
  readonly subtitle = input<string>();

  // === Indicateur visuel ===

  /**
   * Type d'indicateur à afficher à gauche
   * @default 'none'
   */
  readonly indicator = input<ListItemIndicator>('none');

  /**
   * Couleur de l'indicateur (prédéfinie ou custom CSS)
   * @default 'medium'
   */
  readonly indicatorColor = input<ListItemIndicatorColor | string>('medium');

  // === Checkbox ===

  /**
   * Affiche une checkbox
   * @default false
   */
  readonly checkable = input<boolean>(false);

  /**
   * État coché de la checkbox
   * @default false
   */
  readonly checked = input<boolean>(false);

  /**
   * État indéterminé de la checkbox
   * @default false
   */
  readonly indeterminate = input<boolean>(false);

  // === États ===

  /**
   * Applique le style complété (texte barré, opacité réduite)
   * @default false
   */
  readonly completed = input<boolean>(false);

  /**
   * Désactive l'interaction
   * @default false
   */
  readonly disabled = input<boolean>(false);

  /**
   * Applique le style de sélection
   * @default false
   */
  readonly selected = input<boolean>(false);

  /**
   * Rend l'élément cliquable avec effet hover
   * @default true
   */
  readonly clickable = input<boolean>(true);

  // === Apparence ===

  /**
   * Taille de l'élément
   * @default 'md'
   */
  readonly size = input<ListItemSize>('md');

  // === Événements ===

  /**
   * Émis lors du changement de la checkbox
   */
  readonly checkedChange = output<ListItemCheckEvent>();

  /**
   * Émis lors du clic sur l'élément
   */
  readonly clicked = output<ListItemClickEvent>();

  // === Computed ===

  /**
   * Classes CSS calculées
   */
  readonly itemClasses = computed(() => {
    const classes: string[] = ['ds-list-item'];

    classes.push(`ds-list-item--${this.size()}`);

    if (this.completed()) classes.push('ds-list-item--completed');
    if (this.disabled()) classes.push('ds-list-item--disabled');
    if (this.selected()) classes.push('ds-list-item--selected');
    if (this.clickable() && !this.disabled()) classes.push('ds-list-item--clickable');

    return classes.join(' ');
  });

  /**
   * Role ARIA
   */
  readonly role = computed(() => {
    return this.clickable() ? 'button' : 'listitem';
  });

  /**
   * Tabindex
   */
  readonly tabindex = computed(() => {
    return this.disabled() ? -1 : 0;
  });

  /**
   * Afficher l'indicateur ?
   */
  readonly showIndicator = computed(() => {
    return this.indicator() !== 'none';
  });

  /**
   * Est-ce un indicateur de type barre ?
   */
  readonly isBarIndicator = computed(() => {
    return this.indicator() === 'priority';
  });

  /**
   * Est-ce un indicateur de type dot ?
   */
  readonly isDotIndicator = computed(() => {
    return this.indicator() === 'dot' || this.indicator() === 'status';
  });

  // === Méthodes ===

  /**
   * Résout la couleur de l'indicateur (prédéfinie ou custom)
   */
  resolveIndicatorColor(): string {
    const color = this.indicatorColor();

    // Si c'est une couleur prédéfinie
    if (color in INDICATOR_COLOR_MAP) {
      return INDICATOR_COLOR_MAP[color as ListItemIndicatorColor];
    }

    // Sinon c'est une couleur custom (hex, rgb, var, etc.)
    return color;
  }

  /**
   * Gère le clic sur l'élément
   */
  handleClick(event: MouseEvent | KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    this.clicked.emit({ event });
  }

  /**
   * Gère le changement de la checkbox
   */
  handleCheckedChange(checked: boolean): void {
    if (this.disabled()) {
      return;
    }

    this.checkedChange.emit({ checked });
  }

  /**
   * Gère les événements clavier
   */
  handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleClick(event);
    }
  }
}
