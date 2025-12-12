import { Component, input, output, signal, computed, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Tailles disponibles pour le composant Rating.
 */
export type RatingSize = 'sm' | 'md' | 'lg';

/**
 * # DsRating
 *
 * Composant de notation par étoiles permettant d'afficher et de saisir
 * une note sur une échelle configurable (par défaut 0-5).
 *
 * ## Usage
 *
 * ```html
 * <ds-rating
 *   [(value)]="rating"
 *   [max]="5"
 *   [allowHalf]="true"
 *   (ratingChange)="handleRatingChange($event)" />
 * ```
 *
 * ## Intégration formulaires
 *
 * ```html
 * <form [formGroup]="form">
 *   <ds-rating formControlName="rating" />
 * </form>
 * ```
 *
 * ## Accessibilité
 *
 * - Navigation clavier : ArrowLeft/Right pour changer la note
 * - Attributs ARIA : role, aria-label, aria-valuenow/valuemin/valuemax
 * - Focus visible sur les étoiles
 *
 * @component
 */
@Component({
  selector: 'ds-rating',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './ds-rating.html',
  styleUrl: './ds-rating.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsRating),
      multi: true,
    },
  ],
})
export class DsRating implements ControlValueAccessor {
  /**
   * Valeur actuelle de la notation (0 à max).
   * @default 0
   */
  value = input<number>(0);

  /**
   * Valeur maximale de la notation.
   * @default 5
   */
  max = input<number>(5);

  /**
   * Taille du composant (affecte la taille des étoiles).
   * @default 'md'
   */
  size = input<RatingSize>('md');

  /**
   * Permet la saisie de demi-étoiles (notes 0.5, 1.5, etc.).
   * @default false
   */
  allowHalf = input<boolean>(false);

  /**
   * Mode lecture seule (affichage uniquement).
   * @default false
   */
  readonly = input<boolean>(false);

  /**
   * État désactivé (pas d'interaction).
   * @default false
   */
  disabled = input<boolean>(false);

  /**
   * Émis lorsque la notation change.
   */
  ratingChange = output<number>();

  /**
   * État interne de la valeur (ControlValueAccessor).
   */
  readonly internalValue = signal<number>(0);

  /**
   * État de survol (pour aperçu avant clic).
   */
  readonly hoverValue = signal<number | null>(null);

  /**
   * Callbacks ControlValueAccessor.
   */
  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  /**
   * Icônes FontAwesome pour les étoiles.
   */
  protected readonly faStar = faStar;
  protected readonly faStarHalf = faStarHalfStroke;

  /**
   * Tableau des indices d'étoiles pour le rendu.
   */
  readonly stars = computed(() => {
    return Array.from({ length: this.max() }, (_, i) => i + 1);
  });

  /**
   * Valeur affichée (avec prise en compte du survol).
   */
  readonly displayValue = computed(() => {
    return this.hoverValue() ?? this.internalValue();
  });

  /**
   * Classes CSS calculées pour le conteneur.
   */
  readonly containerClasses = computed(() => {
    return [
      'ds-rating',
      `ds-rating--${this.size()}`,
      this.disabled() ? 'ds-rating--disabled' : '',
      this.readonly() ? 'ds-rating--readonly' : '',
    ].filter(Boolean).join(' ');
  });

  /**
   * Détermine le type d'icône à afficher pour une étoile donnée.
   * - 'full' : étoile pleine
   * - 'half' : demi-étoile
   * - 'empty' : étoile vide
   */
  getStarType(index: number): 'full' | 'half' | 'empty' {
    const value = this.displayValue();
    const diff = value - index;

    if (diff >= 0) return 'full';
    if (this.allowHalf() && diff >= -0.5) return 'half';
    return 'empty';
  }

  /**
   * Gère le clic sur une étoile.
   */
  handleStarClick(index: number, event: MouseEvent): void {
    if (this.disabled() || this.readonly()) return;

    let newValue = index;

    // Détection du clic sur la moitié gauche ou droite
    if (this.allowHalf()) {
      const target = event.target as HTMLElement;
      const rect = target.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const halfWidth = rect.width / 2;

      if (clickX < halfWidth) {
        newValue = index - 0.5;
      }
    }

    this.updateValue(newValue);
  }

  /**
   * Gère le survol d'une étoile.
   */
  handleStarHover(index: number, event: MouseEvent): void {
    if (this.disabled() || this.readonly()) return;

    let hoverVal = index;

    if (this.allowHalf()) {
      const target = event.target as HTMLElement;
      const rect = target.getBoundingClientRect();
      const hoverX = event.clientX - rect.left;
      const halfWidth = rect.width / 2;

      if (hoverX < halfWidth) {
        hoverVal = index - 0.5;
      }
    }

    this.hoverValue.set(hoverVal);
  }

  /**
   * Réinitialise le survol.
   */
  handleMouseLeave(): void {
    this.hoverValue.set(null);
  }

  /**
   * Navigation clavier (ArrowLeft/Right).
   */
  handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled() || this.readonly()) return;

    const step = this.allowHalf() ? 0.5 : 1;
    let newValue = this.internalValue();

    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      newValue = Math.min(this.max(), newValue + step);
      this.updateValue(newValue);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      newValue = Math.max(0, newValue - step);
      this.updateValue(newValue);
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.updateValue(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      this.updateValue(this.max());
    }
  }

  /**
   * Met à jour la valeur interne et notifie les changements.
   */
  private updateValue(newValue: number): void {
    this.internalValue.set(newValue);
    this.onChange(newValue);
    this.onTouched();
    this.ratingChange.emit(newValue);
  }

  // ============================================================================
  // ControlValueAccessor
  // ============================================================================

  writeValue(value: number): void {
    this.internalValue.set(value ?? 0);
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Le signal disabled est déjà géré via input()
  }
}
