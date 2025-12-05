import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Variants de couleur pour la barre de progression.
 */
export type ProgressBarVariant = 'default' | 'success' | 'warning' | 'error';

/**
 * Tailles disponibles pour la barre de progression.
 */
export type ProgressBarSize = 'sm' | 'md' | 'lg';

/**
 * Mode de la barre de progression.
 */
export type ProgressBarMode = 'determinate' | 'indeterminate';

/**
 * # DsProgressBar
 *
 * Composant de barre de progression pour indiquer la progression d'une tâche
 * ou l'état de chargement d'une opération.
 *
 * ## Usage
 *
 * ```html
 * <!-- Mode déterminé -->
 * <ds-progress-bar
 *   [value]="75"
 *   variant="success"
 *   size="md">
 * </ds-progress-bar>
 *
 * <!-- Mode indéterminé -->
 * <ds-progress-bar
 *   mode="indeterminate"
 *   variant="primary">
 * </ds-progress-bar>
 * ```
 *
 * ## Accessibilité
 *
 * - Utilise `role="progressbar"` avec `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
 * - Label accessible via `aria-label` ou contenu texte
 *
 * @component
 */
@Component({
  selector: 'ds-progress-bar',
  imports: [CommonModule],
  templateUrl: './ds-progress-bar.html',
  styleUrl: './ds-progress-bar.scss',
})
export class DsProgressBar {
  /**
   * Valeur de progression (0-100).
   * @default 0
   */
  value = input<number>(0);

  /**
   * Variant de couleur.
   * @default 'default'
   */
  variant = input<ProgressBarVariant>('default');

  /**
   * Taille de la barre.
   * @default 'md'
   */
  size = input<ProgressBarSize>('md');

  /**
   * Mode de progression (déterminé ou indéterminé).
   * @default 'determinate'
   */
  mode = input<ProgressBarMode>('determinate');

  /**
   * Afficher le pourcentage en texte.
   * @default false
   */
  showLabel = input<boolean>(false);

  /**
   * Label accessible pour les lecteurs d'écran.
   */
  ariaLabel = input<string>('');

  /**
   * Valeur normalisée (0-100) (public pour tests).
   */
  readonly normalizedValue = computed(() => {
    const val = this.value();
    return Math.max(0, Math.min(100, val));
  });

  /**
   * Classes CSS calculées pour le conteneur (public pour tests).
   */
  readonly containerClasses = computed(() => {
    return [
      'ds-progress-bar',
      `ds-progress-bar--${this.variant()}`,
      `ds-progress-bar--${this.size()}`,
      this.mode() === 'indeterminate' ? 'ds-progress-bar--indeterminate' : '',
    ].filter(Boolean);
  });

  /**
   * Style inline pour la progression (public pour tests).
   */
  readonly progressStyle = computed(() => {
    if (this.mode() === 'indeterminate') {
      return {};
    }
    return {
      width: `${this.normalizedValue()}%`
    };
  });

  /**
   * Label ARIA dynamique (public pour tests).
   */
  readonly ariaLabelText = computed(() => {
    if (this.ariaLabel()) {
      return this.ariaLabel();
    }
    if (this.mode() === 'indeterminate') {
      return 'Chargement en cours';
    }
    return `Progression : ${this.normalizedValue()}%`;
  });
}
