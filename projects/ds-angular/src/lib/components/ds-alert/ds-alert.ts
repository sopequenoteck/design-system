import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCheckCircle,
  faExclamationTriangle,
  faTimesCircle,
  faInfoCircle,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/**
 * Types de feedback disponibles pour le composant Alert.
 * - **success** : opération réussie
 * - **warning** : attention ou avertissement
 * - **error** : erreur ou échec
 * - **info** : information neutre
 */
export type AlertType = 'success' | 'warning' | 'error' | 'info';

/**
 * Tailles disponibles pour le composant Alert.
 */
export type AlertSize = 'sm' | 'md' | 'lg';

/**
 * # DsAlert
 *
 * Composant de bannière de feedback permettant d'afficher des messages
 * de succès, d'avertissement, d'erreur ou d'information.
 *
 * ## Usage
 *
 * ```html
 * <ds-alert type="success" [closable]="true" (closed)="handleClose()">
 *   <p>Votre opération a été effectuée avec succès !</p>
 * </ds-alert>
 * ```
 *
 * ## Accessibilité
 *
 * - Utilise `role="alert"` pour les messages importants
 * - Icônes décoratives avec `aria-hidden="true"`
 * - Bouton de fermeture avec `aria-label` explicite
 *
 * @component
 */
@Component({
  selector: 'ds-alert',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './ds-alert.html',
  styleUrl: './ds-alert.scss',
})
export class DsAlert {
  /**
   * Type de feedback (success, warning, error, info).
   * @default 'info'
   */
  type = input<AlertType>('info');

  /**
   * Taille de l'alerte (affecte le padding et la taille de l'icône).
   * @default 'md'
   */
  size = input<AlertSize>('md');

  /**
   * Affiche une icône selon le type.
   * @default true
   */
  showIcon = input<boolean>(true);

  /**
   * Permet de fermer l'alerte avec un bouton de fermeture.
   * @default false
   */
  closable = input<boolean>(false);

  /**
   * Masque l'alerte (contrôle de visibilité externe).
   * @default false
   */
  hidden = input<boolean>(false);

  /**
   * Émis lorsque l'utilisateur ferme l'alerte.
   */
  closed = output<void>();

  /**
   * Mapping des icônes FontAwesome par type d'alerte.
   * Exposé en readonly pour les tests et l'introspection.
   */
  readonly icons: Record<AlertType, IconDefinition> = {
    success: faCheckCircle,
    warning: faExclamationTriangle,
    error: faTimesCircle,
    info: faInfoCircle,
  };

  protected readonly closeIcon = faTimes;

  /**
   * Classes CSS calculées pour le composant.
   */
  get alertClasses(): string[] {
    return [
      'ds-alert',
      `ds-alert--${this.type()}`,
      `ds-alert--${this.size()}`,
      this.hidden() ? 'ds-alert--hidden' : '',
    ].filter(Boolean);
  }

  /**
   * Icône à afficher selon le type.
   */
  get currentIcon(): IconDefinition {
    return this.icons[this.type()];
  }

  /**
   * Gère la fermeture de l'alerte.
   */
  handleClose(): void {
    this.closed.emit();
  }
}
