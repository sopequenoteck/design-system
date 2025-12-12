import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faInbox } from '@fortawesome/free-solid-svg-icons';

/**
 * Tailles disponibles pour le composant Empty.
 */
export type EmptySize = 'sm' | 'md' | 'lg';

/**
 * # DsEmpty
 *
 * Composant d'état vide standardisé permettant d'afficher un message
 * lorsqu'aucune donnée n'est disponible, avec une illustration optionnelle.
 *
 * ## Usage
 *
 * ```html
 * <ds-empty
 *   title="Aucun résultat"
 *   description="Essayez de modifier vos filtres"
 *   [icon]="faSearch">
 *   <button ds-button (click)="resetFilters()">Réinitialiser</button>
 * </ds-empty>
 * ```
 *
 * ## Accessibilité
 *
 * - Utilise `role="region"` avec `aria-label` descriptif
 * - Icônes décoratives avec `aria-hidden="true"`
 * - Support des actions via content projection
 *
 * @component
 */
@Component({
  selector: 'ds-empty',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './ds-empty.html',
  styleUrl: './ds-empty.scss',
})
export class DsEmpty {
  /**
   * Titre principal de l'état vide.
   * @default 'Aucune donnée'
   */
  title = input<string>('Aucune donnée');

  /**
   * Description complémentaire optionnelle.
   */
  description = input<string>('');

  /**
   * Icône FontAwesome à afficher.
   * @default faInbox
   */
  icon = input<IconDefinition>(faInbox);

  /**
   * URL d'une image personnalisée (illustration ou SVG).
   * Si fournie, prend le pas sur l'icône FontAwesome.
   */
  imageUrl = input<string>('');

  /**
   * Taille du composant (affecte l'icône et les espacements).
   * @default 'md'
   */
  size = input<EmptySize>('md');

  /**
   * Classes CSS calculées pour le conteneur.
   */
  readonly containerClasses = computed(() => {
    return [
      'ds-empty',
      `ds-empty--${this.size()}`,
    ].join(' ');
  });

  /**
   * Classes CSS calculées pour l'icône.
   */
  readonly iconClasses = computed(() => {
    const baseClass = 'ds-empty__icon';
    return `${baseClass} ${baseClass}--${this.size()}`;
  });

  /**
   * Classes CSS calculées pour l'image.
   */
  readonly imageClasses = computed(() => {
    const baseClass = 'ds-empty__image';
    return `${baseClass} ${baseClass}--${this.size()}`;
  });

  /**
   * Détermine si une image doit être affichée.
   */
  readonly hasImage = computed(() => !!this.imageUrl());

  /**
   * Détermine si une description est fournie.
   */
  readonly hasDescription = computed(() => !!this.description());
}
