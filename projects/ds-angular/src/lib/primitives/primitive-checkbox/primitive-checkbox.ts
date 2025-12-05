import {
  Component,
  input,
  output,
  model,
  signal,
  computed,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxState = 'unchecked' | 'checked' | 'indeterminate';

/**
 * Composant checkbox primitif sans logique métier.
 *
 * @description
 * Case à cocher atomique stylisée par CSS custom properties. Supporte trois états
 * (non coché, coché, indéterminé), plusieurs tailles et un label optionnel.
 * Utilise `model()` pour le binding bidirectionnel de l'état coché.
 *
 * @example
 * ```html
 * <primitive-checkbox
 *   [(checked)]="isAccepted"
 *   label="J'accepte les conditions">
 * </primitive-checkbox>
 * ```
 *
 * @example
 * ```html
 * <primitive-checkbox
 *   [checked]="selectAll"
 *   [indeterminate]="isPartialSelection"
 *   size="lg"
 *   (checkedChange)="onSelectionChange($event)">
 * </primitive-checkbox>
 * ```
 */
@Component({
  selector: 'primitive-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './primitive-checkbox.html',
  styleUrl: './primitive-checkbox.scss',
})
export class PrimitiveCheckbox {
  // === PROPRIÉTÉ MODEL (BINDING BIDIRECTIONNEL) ===

  /**
   * État coché de la checkbox avec binding bidirectionnel.
   *
   * @description
   * Utilise le signal `model()` pour permettre le binding bidirectionnel via `[(checked)]`.
   * L'état est mis à jour automatiquement lors du clic utilisateur.
   *
   * @default false
   *
   * @example
   * ```typescript
   * isAccepted = signal(false);
   * ```
   * ```html
   * <primitive-checkbox [(checked)]="isAccepted"></primitive-checkbox>
   * <p>Accepté : {{ isAccepted() }}</p>
   * ```
   */
  checked = model<boolean>(false);

  // === PROPRIÉTÉS D'ENTRÉE ===

  /**
   * État indéterminé de la checkbox.
   *
   * @description
   * Lorsque `true`, affiche l'icône d'état indéterminé (tiret horizontal).
   * L'état indéterminé est prioritaire sur l'état `checked` et est couramment
   * utilisé dans les sélections partielles (ex: sélection de sous-éléments).
   * L'attribut ARIA `aria-checked` prend la valeur `"indeterminate"`.
   *
   * @default false
   *
   * @example
   * ```html
   * <primitive-checkbox
   *   [checked]="someItemsSelected"
   *   [indeterminate]="!allItemsSelected && someItemsSelected"
   *   label="Tout sélectionner">
   * </primitive-checkbox>
   * ```
   */
  indeterminate = input<boolean>(false);

  /**
   * État désactivé de la checkbox.
   *
   * @description
   * Lorsque `true`, la checkbox devient non-cliquable, applique les styles visuels
   * d'état désactivé et définit `tabindex="-1"` et `aria-disabled="true"`.
   * Les événements ne sont pas émis en état désactivé.
   *
   * @default false
   *
   * @example
   * ```html
   * <primitive-checkbox [disabled]="!canEdit" label="Option verrouillée"></primitive-checkbox>
   * ```
   */
  disabled = input<boolean>(false);

  /**
   * Taille de la checkbox.
   *
   * @description
   * Contrôle la taille du carré de la checkbox et la taille de police du label via
   * les tokens CSS custom properties.
   *
   * Tailles disponibles :
   * - `sm` : petit (16px)
   * - `md` : moyen (20px, par défaut)
   * - `lg` : grand (24px)
   *
   * @default 'md'
   *
   * @example
   * ```html
   * <primitive-checkbox size="lg" label="Grande checkbox"></primitive-checkbox>
   * ```
   */
  size = input<CheckboxSize>('md');

  /**
   * Texte du label affiché à côté de la checkbox.
   *
   * @description
   * Si fourni, affiche un label cliquable associé à la checkbox.
   * Le label est lié à la checkbox via `aria-labelledby` pour l'accessibilité.
   * Le clic sur le label déclenche le toggle de la checkbox.
   *
   * @default ''
   *
   * @example
   * ```html
   * <primitive-checkbox label="J'accepte les conditions générales"></primitive-checkbox>
   * ```
   */
  label = input<string>('');

  /**
   * Identifiant unique de la checkbox pour l'accessibilité.
   *
   * @description
   * Utilisé pour générer les IDs des éléments internes (label) et pour l'association
   * ARIA. Si non fourni, un ID aléatoire est généré automatiquement.
   *
   * @default `checkbox-${random}`
   *
   * @example
   * ```html
   * <primitive-checkbox checkboxId="accept-terms" label="Accepter"></primitive-checkbox>
   * ```
   */
  checkboxId = input<string>(`checkbox-${Math.random().toString(36).slice(2, 11)}`);

  // === ÉVÉNEMENTS DE SORTIE ===

  /**
   * Événement émis lors du changement d'état de la checkbox.
   *
   * @description
   * Émis uniquement si la checkbox n'est pas désactivée (`disabled = false`).
   * Transporte la nouvelle valeur booléenne de l'état coché.
   * Ne s'active pas lorsque l'état change via le binding `[(checked)]` depuis le parent.
   *
   * @example
   * ```html
   * <primitive-checkbox
   *   [(checked)]="isAccepted"
   *   (checkedChange)="onAcceptChange($event)">
   * </primitive-checkbox>
   * ```
   * ```typescript
   * onAcceptChange(checked: boolean) {
   *   console.log('Nouvelle valeur :', checked);
   * }
   * ```
   */
  checkedChange = output<boolean>();

  // === SIGNAUX INTERNES ===

  /**
   * Signal interne de l'état focus de la checkbox.
   *
   * @description
   * Signal utilisé en interne pour suivre l'état focus de la checkbox.
   * Applique la classe CSS `primitive-checkbox--focused` lorsque `true`.
   *
   * @internal
   */
  protected focused = signal<boolean>(false);

  /**
   * Signal calculé de l'état de la checkbox.
   *
   * @description
   * Calcule l'état actuel de la checkbox en fonction de `indeterminate()` et `checked()`.
   * L'état `indeterminate` est prioritaire sur `checked`.
   *
   * @returns État de la checkbox : `'unchecked'`, `'checked'` ou `'indeterminate'`.
   *
   * @internal
   */
  protected checkboxState = computed<CheckboxState>(() => {
    if (this.indeterminate()) return 'indeterminate';
    return this.checked() ? 'checked' : 'unchecked';
  });

  /**
   * Signal calculé des classes CSS de la checkbox.
   *
   * @description
   * Génère dynamiquement un objet de classes CSS en fonction des propriétés :
   * - Classe de base : `primitive-checkbox`
   * - Classe de taille : `primitive-checkbox--{size}`
   * - Classe d'état coché : `primitive-checkbox--checked`
   * - Classe d'état indéterminé : `primitive-checkbox--indeterminate`
   * - Classe d'état désactivé : `primitive-checkbox--disabled`
   * - Classe d'état focus : `primitive-checkbox--focused`
   *
   * @returns Objet de classes CSS avec valeurs booléennes.
   *
   * @internal
   */
  protected cssClasses = computed(() => ({
    'primitive-checkbox': true,
    [`primitive-checkbox--${this.size()}`]: true,
    'primitive-checkbox--checked': this.checked(),
    'primitive-checkbox--indeterminate': this.indeterminate(),
    'primitive-checkbox--disabled': this.disabled(),
    'primitive-checkbox--focused': this.focused(),
  }));

  // === MÉTHODES INTERNES ===

  /**
   * Gestionnaire de toggle interne.
   *
   * @description
   * Méthode appelée par le template lors du clic sur la checkbox ou son label.
   * Inverse l'état `checked` et émet l'événement `checkedChange`.
   * Ne fait rien si la checkbox est désactivée.
   *
   * @internal
   */
  protected onToggle(): void {
    if (this.disabled()) return;

    const newValue = !this.checked();
    this.checked.set(newValue);
    this.checkedChange.emit(newValue);
  }

  /**
   * Gestionnaire de l'événement focus natif.
   *
   * @description
   * Méthode appelée par le template lorsque la checkbox reçoit le focus.
   * Met à jour le signal interne `focused` à `true`.
   *
   * @internal
   */
  protected onFocus(): void {
    this.focused.set(true);
  }

  /**
   * Gestionnaire de l'événement blur natif.
   *
   * @description
   * Méthode appelée par le template lorsque la checkbox perd le focus.
   * Met à jour le signal interne `focused` à `false`.
   *
   * @internal
   */
  protected onBlur(): void {
    this.focused.set(false);
  }

  /**
   * Gestionnaire de l'événement keydown natif.
   *
   * @description
   * Méthode appelée par le template lors de la pression d'une touche clavier.
   * Déclenche le toggle sur les touches `Space` ou `Enter` et empêche le comportement
   * par défaut (scroll de la page sur Space).
   *
   * @param event - Événement clavier natif.
   *
   * @internal
   */
  protected onKeyDown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.onToggle();
    }
  }
}
