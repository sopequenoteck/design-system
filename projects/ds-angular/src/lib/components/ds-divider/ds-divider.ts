import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Orientations disponibles pour le composant Divider.
 * - **horizontal** : séparateur horizontal (défaut)
 * - **vertical** : séparateur vertical
 */
export type DividerOrientation = 'horizontal' | 'vertical';

/**
 * Variantes visuelles disponibles pour le composant Divider.
 * - **solid** : ligne continue (défaut)
 * - **dashed** : ligne en tirets
 * - **dotted** : ligne en pointillés
 */
export type DividerVariant = 'solid' | 'dashed' | 'dotted';

/**
 * Tailles disponibles pour le composant Divider (épaisseur).
 */
export type DividerSize = 'sm' | 'md' | 'lg';

/**
 * Position du label pour un divider horizontal.
 * - **left** : label aligné à gauche
 * - **center** : label centré (défaut)
 * - **right** : label aligné à droite
 */
export type DividerLabelPosition = 'left' | 'center' | 'right';

/**
 * # DsDivider
 *
 * Composant séparateur permettant de diviser visuellement le contenu.
 * Supporte les orientations horizontales et verticales, avec un label optionnel.
 *
 * ## Usage
 *
 * ### Sans label
 * ```html
 * <ds-divider variant="solid" size="md"></ds-divider>
 * ```
 *
 * ### Avec label
 * ```html
 * <ds-divider>Section suivante</ds-divider>
 * ```
 *
 * ### Vertical
 * ```html
 * <ds-divider orientation="vertical"></ds-divider>
 * ```
 *
 * ## Accessibilité
 *
 * - Utilise `role="separator"` pour la sémantique
 * - Attribut `aria-orientation` pour l'orientation
 * - Label accessible pour les lecteurs d'écran
 *
 * @component
 */
@Component({
  selector: 'ds-divider',
  imports: [CommonModule],
  templateUrl: './ds-divider.html',
  styleUrl: './ds-divider.scss',
})
export class DsDivider {
  /**
   * Orientation du séparateur.
   * @default 'horizontal'
   */
  orientation = input<DividerOrientation>('horizontal');

  /**
   * Variante visuelle (solid, dashed, dotted).
   * @default 'solid'
   */
  variant = input<DividerVariant>('solid');

  /**
   * Taille (épaisseur) du séparateur.
   * @default 'md'
   */
  size = input<DividerSize>('md');

  /**
   * Position du label (uniquement pour horizontal).
   * @default 'center'
   */
  labelPosition = input<DividerLabelPosition>('center');

  /**
   * Marge verticale/horizontale autour du divider.
   * @default 'md'
   */
  spacing = input<'none' | 'sm' | 'md' | 'lg'>('md');

  /**
   * Classes CSS calculées pour le composant.
   */
  get dividerClasses(): string[] {
    return [
      'ds-divider',
      `ds-divider--${this.orientation()}`,
      `ds-divider--${this.variant()}`,
      `ds-divider--${this.size()}`,
      `ds-divider--spacing-${this.spacing()}`,
      this.orientation() === 'horizontal' ? `ds-divider--label-${this.labelPosition()}` : '',
    ].filter(Boolean);
  }

  /**
   * Vérifie si le composant a du contenu projeté (label).
   */
  get hasLabel(): boolean {
    // La détection du contenu projeté sera gérée dans le template via #content
    return true; // Géré dynamiquement dans le template
  }
}
