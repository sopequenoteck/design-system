import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type BadgeType = 'status' | 'count' | 'label';
export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'default' | 'accent';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeShape = 'rounded' | 'pill';
export type BadgeAppearance = 'solid' | 'outline';

/**
 * Composant badge primitif sans logique métier.
 *
 * @description
 * Badge atomique stylisé par CSS custom properties. Petit élément visuel utilisé pour
 * afficher des statuts, des compteurs ou des labels. Supporte plusieurs variantes de
 * couleur, tailles, formes (arrondi ou pill), apparences (solid ou outline) et peut
 * afficher des icônes FontAwesome. Permet également des styles personnalisés.
 *
 * @example
 * ```html
 * <primitive-badge variant="success">
 *   Actif
 * </primitive-badge>
 * ```
 *
 * @example
 * ```html
 * <primitive-badge
 *   variant="error"
 *   shape="pill"
 *   appearance="outline"
 *   [iconStart]="faExclamation">
 *   Urgent
 * </primitive-badge>
 * ```
 */
@Component({
  selector: 'primitive-badge',
  imports: [CommonModule, FaIconComponent],
  templateUrl: './primitive-badge.html',
  styleUrl: './primitive-badge.scss',
})
export class PrimitiveBadge {
  // === PROPRIÉTÉS D'ENTRÉE ===

  /**
   * Type sémantique du badge.
   *
   * @description
   * Définit l'intention d'usage du badge. Le type est exposé via l'attribut `data-type`
   * pour permettre un ciblage CSS spécifique selon le contexte d'utilisation.
   *
   * Types disponibles :
   * - `label` : badge de libellé générique (par défaut)
   * - `status` : indicateur d'état (actif, inactif, etc.)
   * - `count` : compteur numérique (notifications, messages, etc.)
   *
   * @default 'label'
   *
   * @example
   * ```html
   * <primitive-badge type="count">5</primitive-badge>
   * <primitive-badge type="status">En ligne</primitive-badge>
   * ```
   */
  type = input<BadgeType>('label');

  /**
   * Variante visuelle du badge.
   *
   * @description
   * Définit la couleur et le style sémantique du badge. Chaque variante applique
   * une classe CSS qui utilise les tokens de couleur correspondants.
   *
   * Variantes disponibles :
   * - `primary` : couleur principale (par défaut)
   * - `secondary` : couleur secondaire
   * - `success` : succès, validation (vert)
   * - `warning` : avertissement (orange)
   * - `error` : erreur, danger (rouge)
   * - `info` : information (bleu)
   * - `neutral` : neutre (gris)
   * - `default` : style par défaut
   * - `accent` : couleur d'accent
   *
   * @default 'primary'
   *
   * @example
   * ```html
   * <primitive-badge variant="success">Validé</primitive-badge>
   * ```
   */
  variant = input<BadgeVariant>('primary');

  /**
   * Taille du badge.
   *
   * @description
   * Contrôle la hauteur, le padding et la taille de police du badge via les tokens
   * CSS custom properties.
   *
   * Tailles disponibles :
   * - `sm` : petit
   * - `md` : moyen (par défaut)
   * - `lg` : grand
   *
   * @default 'md'
   *
   * @example
   * ```html
   * <primitive-badge size="sm">Petit</primitive-badge>
   * ```
   */
  size = input<BadgeSize>('md');

  /**
   * Forme du badge.
   *
   * @description
   * Définit le degré d'arrondi des coins du badge.
   *
   * Formes disponibles :
   * - `rounded` : coins légèrement arrondis (par défaut)
   * - `pill` : coins complètement arrondis (forme capsule)
   *
   * @default 'rounded'
   *
   * @example
   * ```html
   * <primitive-badge shape="pill">99+</primitive-badge>
   * ```
   */
  shape = input<BadgeShape>('rounded');

  /**
   * Apparence visuelle du badge.
   *
   * @description
   * Contrôle le style de remplissage du badge :
   * - `solid` : fond plein avec couleur de variante (par défaut)
   * - `outline` : fond transparent avec bordure colorée
   *
   * @default 'solid'
   *
   * @example
   * ```html
   * <primitive-badge appearance="outline">Outline</primitive-badge>
   * ```
   */
  appearance = input<BadgeAppearance>('solid');

  /**
   * Icône FontAwesome affichée avant le texte du badge.
   *
   * @description
   * Accepte une `IconDefinition` de `@fortawesome/fontawesome-svg-core`.
   * L'icône est rendue via `<fa-icon>` avec la classe CSS `.icon-start`.
   * Couramment utilisée pour les badges de statut ou d'alerte.
   *
   * @default null
   *
   * @example
   * ```typescript
   * import { faCheck } from '@fortawesome/free-solid-svg-icons';
   * ```
   * ```html
   * <primitive-badge [iconStart]="faCheck">Validé</primitive-badge>
   * ```
   */
  iconStart = input<IconDefinition | null>(null);

  /**
   * Icône FontAwesome affichée après le texte du badge.
   *
   * @description
   * Accepte une `IconDefinition` de `@fortawesome/fontawesome-svg-core`.
   * L'icône est rendue via `<fa-icon>` avec la classe CSS `.icon-end`.
   * Utile pour les badges avec action ou indication directionnelle.
   *
   * @default null
   *
   * @example
   * ```typescript
   * import { faTimes } from '@fortawesome/free-solid-svg-icons';
   * ```
   * ```html
   * <primitive-badge [iconEnd]="faTimes">Fermer</primitive-badge>
   * ```
   */
  iconEnd = input<IconDefinition | null>(null);

  /**
   * Styles CSS personnalisés appliqués au badge.
   *
   * @description
   * Objet de paires clé-valeur de propriétés CSS permettant de surcharger les styles
   * par défaut. Utile pour des couleurs de marque spécifiques ou des styles non couverts
   * par les variantes standards. Appliqué via `[ngStyle]` sur le span interne.
   *
   * @default null
   *
   * @example
   * ```html
   * <primitive-badge [customStyles]="{
   *   backgroundColor: '#ff6b6b',
   *   borderColor: '#ff6b6b',
   *   color: '#fff'
   * }">
   *   Custom
   * </primitive-badge>
   * ```
   */
  customStyles = input<Record<string, string> | null>(null);

  // === MÉTHODES PUBLIQUES ===

  /**
   * Calcule dynamiquement les classes CSS du badge.
   *
   * @description
   * Génère une chaîne de classes CSS combinant :
   * - La variante (`primary`, `secondary`, `success`, etc.)
   * - La taille (`sm`, `md`, `lg`)
   * - La forme (`rounded`, `pill`)
   * - `outline` si `appearance === 'outline'`
   *
   * @returns Une chaîne de classes CSS séparées par des espaces.
   *
   * @example
   * ```typescript
   * // variant='success', size='lg', shape='pill', appearance='outline'
   * // → "success lg pill outline"
   * ```
   */
  get badgeClasses(): string {
    const classes: string[] = [this.variant(), this.size(), this.shape()];
    if (this.appearance() === 'outline') {
      classes.push('outline');
    }
    return classes.filter(Boolean).join(' ');
  }

  /**
   * Retourne les styles personnalisés à appliquer.
   *
   * @description
   * Getter simple qui retourne la valeur de `customStyles()` pour être utilisé
   * avec la directive `[ngStyle]` dans le template.
   *
   * @returns Objet de styles CSS ou `null` si aucun style personnalisé.
   *
   * @example
   * ```typescript
   * const styles = component.styleOverrides;
   * // → { backgroundColor: '#123456', color: '#fff' }
   * ```
   */
  get styleOverrides(): Record<string, string> | null {
    return this.customStyles();
  }
}
