import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Variants de skeleton disponibles.
 */
export type SkeletonVariant = 'text' | 'circle' | 'rectangle' | 'card';

/**
 * Tailles pour les variants circle et rectangle.
 */
export type SkeletonSize = 'sm' | 'md' | 'lg';

/**
 * # DsSkeleton
 *
 * Composant de placeholder skeleton pour indiquer le chargement de contenu.
 * Utilisé pour améliorer l'expérience utilisateur pendant le chargement des données.
 *
 * ## Usage
 *
 * ```html
 * <!-- Texte skeleton -->
 * <ds-skeleton variant="text" [lines]="3"></ds-skeleton>
 *
 * <!-- Avatar circle -->
 * <ds-skeleton variant="circle" size="lg"></ds-skeleton>
 *
 * <!-- Image rectangle -->
 * <ds-skeleton variant="rectangle" [width]="'300px'" [height]="'200px'"></ds-skeleton>
 *
 * <!-- Card skeleton -->
 * <ds-skeleton variant="card"></ds-skeleton>
 * ```
 *
 * ## Accessibilité
 *
 * - Utilise `aria-busy="true"` et `aria-live="polite"` pour indiquer le chargement
 * - Label accessible via `aria-label`
 *
 * @component
 */
@Component({
  selector: 'ds-skeleton',
  imports: [CommonModule],
  templateUrl: './ds-skeleton.html',
  styleUrl: './ds-skeleton.scss',
})
export class DsSkeleton {
  /**
   * Type de skeleton.
   * @default 'text'
   */
  variant = input<SkeletonVariant>('text');

  /**
   * Taille (pour circle et rectangle).
   * @default 'md'
   */
  size = input<SkeletonSize>('md');

  /**
   * Nombre de lignes (pour text).
   * @default 1
   */
  lines = input<number>(1);

  /**
   * Largeur personnalisée.
   */
  width = input<string>('');

  /**
   * Hauteur personnalisée.
   */
  height = input<string>('');

  /**
   * Désactiver l'animation pulse.
   * @default false
   */
  noAnimation = input<boolean>(false);

  /**
   * Label accessible pour les lecteurs d'écran.
   * @default 'Chargement en cours...'
   */
  ariaLabel = input<string>('Chargement en cours...');

  /**
   * Classes CSS calculées pour le skeleton (public pour tests).
   */
  readonly skeletonClasses = computed(() => {
    const classes = [
      'ds-skeleton',
      `ds-skeleton--${this.variant()}`,
    ];

    if (this.variant() === 'circle' || this.variant() === 'rectangle') {
      classes.push(`ds-skeleton--${this.size()}`);
    }

    if (!this.noAnimation()) {
      classes.push('ds-skeleton--animated');
    }

    return classes.filter(Boolean);
  });

  /**
   * Style inline personnalisé (public pour tests).
   */
  readonly customStyle = computed(() => {
    const style: any = {};

    if (this.width()) {
      style.width = this.width();
    }

    if (this.height()) {
      style.height = this.height();
    }

    return style;
  });

  /**
   * Génère un tableau pour les lignes de texte (public pour tests).
   */
  readonly textLines = computed(() => {
    return Array.from({ length: this.lines() }, (_, i) => i);
  });
}
