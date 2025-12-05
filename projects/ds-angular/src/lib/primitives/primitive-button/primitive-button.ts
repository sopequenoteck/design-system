import { Component, HostBinding, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'success' | 'warning' | 'error' | 'info';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonAppearance = 'solid' | 'outline';

/**
 * Composant bouton primitif sans logique métier.
 *
 * @description
 * Bouton atomique stylisé par CSS custom properties. Supporte plusieurs variantes,
 * tailles, apparences et états. Peut afficher des icônes FontAwesome avant/après le texte.
 *
 * @example
 * ```html
 * <primitive-button variant="primary" size="md">
 *   Cliquez ici
 * </primitive-button>
 * ```
 *
 * @example
 * ```html
 * <primitive-button
 *   variant="success"
 *   appearance="outline"
 *   [iconStart]="faCheck"
 *   (clicked)="onSave()">
 *   Enregistrer
 * </primitive-button>
 * ```
 */
@Component({
  selector: 'primitive-button',
  imports: [CommonModule, FaIconComponent],
  templateUrl: './primitive-button.html',
  styleUrl: './primitive-button.scss',
})
export class PrimitiveButton {
  // === PROPRIÉTÉS D'ENTRÉE ===

  /**
   * Type HTML du bouton.
   *
   * @description
   * Détermine le comportement natif du bouton dans un formulaire :
   * - `button` : bouton standard sans action de formulaire (par défaut)
   * - `submit` : soumet le formulaire parent
   * - `reset` : réinitialise le formulaire parent
   *
   * @default 'button'
   *
   * @example
   * ```html
   * <primitive-button type="submit">Valider</primitive-button>
   * ```
   */
  type = input<ButtonType>('button');

  /**
   * Variante visuelle du bouton.
   *
   * @description
   * Définit la couleur et le style sémantique du bouton. Chaque variante
   * applique une classe CSS qui utilise les tokens de couleur correspondants.
   *
   * Variantes disponibles :
   * - `primary` : action principale (par défaut)
   * - `secondary` : action secondaire
   * - `ghost` : action discrète, fond transparent
   * - `success` : confirmation, succès
   * - `warning` : avertissement, attention
   * - `error` : action destructive, erreur
   * - `info` : information neutre
   *
   * @default 'primary'
   *
   * @example
   * ```html
   * <primitive-button variant="error">Supprimer</primitive-button>
   * ```
   */
  variant = input<ButtonVariant>('primary');

  /**
   * Taille du bouton.
   *
   * @description
   * Contrôle la hauteur, le padding et la taille de police du bouton via
   * les tokens `--btn-height-*`, `--btn-padding-*` et `--btn-font-size-*`.
   *
   * Tailles disponibles :
   * - `sm` : petit (32px de hauteur)
   * - `md` : moyen (40px de hauteur, par défaut)
   * - `lg` : grand (48px de hauteur)
   *
   * @default 'md'
   *
   * @example
   * ```html
   * <primitive-button size="lg">Bouton large</primitive-button>
   * ```
   */
  size = input<ButtonSize>('md');

  /**
   * État désactivé du bouton.
   *
   * @description
   * Lorsque `true`, le bouton devient non-cliquable, applique l'attribut HTML
   * `disabled` et affiche les styles visuels d'état désactivé. L'événement
   * `clicked` n'est pas émis en état désactivé.
   *
   * @default false
   *
   * @example
   * ```html
   * <primitive-button [disabled]="!isFormValid">Soumettre</primitive-button>
   * ```
   */
  disabled = input<boolean>(false);

  /**
   * Icône FontAwesome affichée avant le texte du bouton.
   *
   * @description
   * Accepte une `IconDefinition` de `@fortawesome/fontawesome-svg-core`.
   * L'icône est rendue via `<fa-icon>` avec la classe CSS `.icon-start`.
   *
   * @default null
   *
   * @example
   * ```typescript
   * import { faPlus } from '@fortawesome/free-solid-svg-icons';
   * ```
   * ```html
   * <primitive-button [iconStart]="faPlus">Ajouter</primitive-button>
   * ```
   */
  iconStart = input<IconDefinition | null>(null);

  /**
   * Icône FontAwesome affichée après le texte du bouton.
   *
   * @description
   * Accepte une `IconDefinition` de `@fortawesome/fontawesome-svg-core`.
   * L'icône est rendue via `<fa-icon>` avec la classe CSS `.icon-end`.
   *
   * @default null
   *
   * @example
   * ```typescript
   * import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
   * ```
   * ```html
   * <primitive-button [iconEnd]="faArrowRight">Suivant</primitive-button>
   * ```
   */
  iconEnd = input<IconDefinition | null>(null);

  /**
   * Apparence visuelle du bouton.
   *
   * @description
   * Contrôle le style de remplissage du bouton :
   * - `solid` : fond plein avec couleur de variante (par défaut)
   * - `outline` : fond transparent avec bordure colorée
   *
   * @default 'solid'
   *
   * @example
   * ```html
   * <primitive-button variant="primary" appearance="outline">
   *   Action secondaire
   * </primitive-button>
   * ```
   */
  appearance = input<ButtonAppearance>('solid');

  /**
   * Mode pleine largeur.
   *
   * @description
   * Lorsque `true`, le bouton s'étend sur toute la largeur de son conteneur.
   * Applique la classe CSS `.block` au bouton et au composant hôte via `@HostBinding`.
   *
   * @default false
   *
   * @example
   * ```html
   * <primitive-button [block]="true">
   *   Bouton pleine largeur
   * </primitive-button>
   * ```
   */
  block = input<boolean>(false);

  /**
   * Host binding pour la classe CSS `.block`.
   *
   * @description
   * Lie la classe `.block` au composant hôte (`<primitive-button>`) lorsque
   * la propriété `block()` est `true`. Permet de styliser le conteneur externe.
   *
   * @returns `true` si le mode block est activé, sinon `false`.
   */
  @HostBinding('class.block')
  get hostBlock(): boolean {
    return this.block();
  }

  // === ÉVÉNEMENTS DE SORTIE ===

  /**
   * Événement émis lors d'un clic sur le bouton actif.
   *
   * @description
   * Émis uniquement si le bouton n'est pas désactivé (`disabled = false`).
   * Ne transporte aucune donnée (`void`). Utilisé pour déclencher des actions
   * métier dans le composant parent.
   *
   * @example
   * ```html
   * <primitive-button (clicked)="onButtonClick()">
   *   Cliquez-moi
   * </primitive-button>
   * ```
   */
  clicked = output<void>();

  // === MÉTHODES PUBLIQUES ===

  /**
   * Calcule dynamiquement les classes CSS du bouton.
   *
   * @description
   * Génère une chaîne de classes CSS combinant :
   * - La variante (`primary`, `secondary`, etc.)
   * - La taille (`sm`, `md`, `lg`)
   * - `outline` si `appearance === 'outline'`
   * - `block` si `block === true`
   *
   * @returns Une chaîne de classes CSS séparées par des espaces.
   *
   * @example
   * ```typescript
   * // variant='error', size='lg', appearance='outline', block=true
   * // → "error lg outline block"
   * ```
   */
  get buttonClasses(): string {
    const classes: string[] = [this.variant(), this.size()];
    if (this.appearance() === 'outline') {
      classes.push('outline');
    }
    if (this.block()) {
      classes.push('block');
    }
    return classes.filter(Boolean).join(' ');
  }

  /**
   * Gestionnaire de clic interne.
   *
   * @description
   * Méthode appelée par le template lors d'un clic sur le bouton HTML.
   * Vérifie l'état `disabled()` avant d'émettre l'événement `clicked`.
   *
   * @internal
   */
  handleClick(): void {
    if (!this.disabled()) {
      this.clicked.emit();
    }
  }
}
