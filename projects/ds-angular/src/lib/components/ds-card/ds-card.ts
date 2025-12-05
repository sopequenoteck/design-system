import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Variantes visuelles disponibles pour le composant Card.
 * - **default** : carte simple avec bordure
 * - **elevated** : carte avec ombre portée
 * - **outlined** : carte avec bordure accentuée
 */
export type CardVariant = 'default' | 'elevated' | 'outlined';

/**
 * Tailles disponibles pour le composant Card.
 */
export type CardSize = 'sm' | 'md' | 'lg';

/**
 * # DsCard
 *
 * Composant container permettant de regrouper du contenu avec un en-tête,
 * un corps et un pied de page optionnels.
 *
 * ## Usage
 *
 * ```html
 * <ds-card variant="elevated" size="md">
 *   <div header>Titre de la carte</div>
 *   <div>Contenu principal</div>
 *   <div footer>Actions ou informations complémentaires</div>
 * </ds-card>
 * ```
 *
 * ## Accessibilité
 *
 * - Utilise la sémantique HTML appropriée (`article`)
 * - Structure claire avec header, body, footer
 *
 * @component
 */
@Component({
  selector: 'ds-card',
  imports: [CommonModule],
  templateUrl: './ds-card.html',
  styleUrl: './ds-card.scss',
})
export class DsCard {
  /**
   * Variante visuelle de la carte.
   * @default 'default'
   */
  variant = input<CardVariant>('default');

  /**
   * Taille de la carte (affecte le padding).
   * @default 'md'
   */
  size = input<CardSize>('md');

  /**
   * Désactive l'interaction avec la carte (apparence désactivée).
   * @default false
   */
  disabled = input<boolean>(false);

  /**
   * Rend la carte cliquable avec effet hover.
   * @default false
   */
  clickable = input<boolean>(false);

  /**
   * Classes CSS calculées pour le composant.
   */
  get cardClasses(): string[] {
    return [
      'ds-card',
      `ds-card--${this.variant()}`,
      `ds-card--${this.size()}`,
      this.disabled() ? 'ds-card--disabled' : '',
      this.clickable() ? 'ds-card--clickable' : '',
    ].filter(Boolean);
  }
}
