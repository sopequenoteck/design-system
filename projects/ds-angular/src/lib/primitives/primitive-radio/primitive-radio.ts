import {
  Component,
  input,
  output,
  model,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type RadioSize = 'sm' | 'md' | 'lg';

/**
 * Composant radio primitif sans logique métier.
 *
 * @description
 * Bouton radio atomique stylisé par CSS custom properties. Respecte le comportement
 * natif des radios : une fois sélectionné, il ne peut pas être désélectionné par clic
 * (seul un autre radio du même groupe peut le désélectionner). Supporte plusieurs
 * tailles et un label optionnel. Utilise `model()` pour le binding bidirectionnel.
 *
 * @example
 * ```html
 * <primitive-radio
 *   [(checked)]="selectedOption === 'option1'"
 *   name="options"
 *   value="option1"
 *   label="Option 1"
 *   (checkedChange)="onOptionSelect('option1')">
 * </primitive-radio>
 * ```
 *
 * @example
 * ```html
 * <primitive-radio
 *   [checked]="true"
 *   [disabled]="true"
 *   size="lg"
 *   label="Option désactivée">
 * </primitive-radio>
 * ```
 */
@Component({
  selector: 'primitive-radio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './primitive-radio.html',
  styleUrl: './primitive-radio.scss',
})
export class PrimitiveRadio {
  // === PROPRIÉTÉ MODEL (BINDING BIDIRECTIONNEL) ===

  /**
   * État sélectionné du radio avec binding bidirectionnel.
   *
   * @description
   * Utilise le signal `model()` pour permettre le binding bidirectionnel via `[(checked)]`.
   * Contrairement à une checkbox, un radio sélectionné ne peut pas être désélectionné
   * en cliquant dessus à nouveau (comportement natif HTML).
   *
   * @default false
   *
   * @example
   * ```typescript
   * selectedValue = signal('option1');
   * ```
   * ```html
   * <primitive-radio
   *   [(checked)]="selectedValue() === 'option1'"
   *   value="option1">
   * </primitive-radio>
   * ```
   */
  checked = model<boolean>(false);

  // === PROPRIÉTÉS D'ENTRÉE ===

  /**
   * État désactivé du radio.
   *
   * @description
   * Lorsque `true`, le radio devient non-cliquable, applique les styles visuels
   * d'état désactivé et définit `tabindex="-1"` et `aria-disabled="true"`.
   * Les événements ne sont pas émis en état désactivé.
   *
   * @default false
   *
   * @example
   * ```html
   * <primitive-radio [disabled]="!isAvailable" label="Option indisponible"></primitive-radio>
   * ```
   */
  disabled = input<boolean>(false);

  /**
   * Taille du radio.
   *
   * @description
   * Contrôle la taille du cercle du radio et la taille de police du label via
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
   * <primitive-radio size="lg" label="Grande option"></primitive-radio>
   * ```
   */
  size = input<RadioSize>('md');

  /**
   * Texte du label affiché à côté du radio.
   *
   * @description
   * Si fourni, affiche un label cliquable associé au radio.
   * Le label est lié au radio via `aria-labelledby` pour l'accessibilité.
   * Le clic sur le label sélectionne le radio.
   *
   * @default ''
   *
   * @example
   * ```html
   * <primitive-radio label="Option A"></primitive-radio>
   * ```
   */
  label = input<string>('');

  /**
   * Nom du groupe de radios pour le comportement exclusif.
   *
   * @description
   * Tous les radios avec le même `name` appartiennent au même groupe.
   * Un seul radio par groupe peut être sélectionné à la fois.
   * Important pour la gestion de l'état exclusif dans les groupes de radios.
   *
   * @default ''
   *
   * @example
   * ```html
   * <primitive-radio name="size" value="small" label="Petit"></primitive-radio>
   * <primitive-radio name="size" value="medium" label="Moyen"></primitive-radio>
   * <primitive-radio name="size" value="large" label="Grand"></primitive-radio>
   * ```
   */
  name = input<string>('');

  /**
   * Valeur du radio pour l'identification dans un groupe.
   *
   * @description
   * Valeur unique qui identifie ce radio dans son groupe.
   * Utilisée par le composant parent pour déterminer quelle option est sélectionnée.
   *
   * @default ''
   *
   * @example
   * ```html
   * <primitive-radio
   *   name="payment"
   *   value="card"
   *   label="Carte bancaire"
   *   [(checked)]="paymentMethod === 'card'">
   * </primitive-radio>
   * ```
   */
  value = input<string>('');

  /**
   * Identifiant unique du radio pour l'accessibilité.
   *
   * @description
   * Utilisé pour générer les IDs des éléments internes (label) et pour l'association
   * ARIA. Si non fourni, un ID aléatoire est généré automatiquement.
   *
   * @default `radio-${random}`
   *
   * @example
   * ```html
   * <primitive-radio radioId="payment-card" label="Carte"></primitive-radio>
   * ```
   */
  radioId = input<string>(`radio-${Math.random().toString(36).slice(2, 11)}`);

  // === ÉVÉNEMENTS DE SORTIE ===

  /**
   * Événement émis lors de la sélection du radio.
   *
   * @description
   * Émis uniquement si le radio n'est pas désactivé et n'est pas déjà sélectionné.
   * Transporte toujours la valeur `true` car un radio ne peut que passer à l'état sélectionné.
   * Non émis lors d'un clic sur un radio déjà sélectionné (comportement natif).
   *
   * @example
   * ```html
   * <primitive-radio
   *   name="options"
   *   value="option1"
   *   (checkedChange)="onOptionSelect('option1')">
   * </primitive-radio>
   * ```
   * ```typescript
   * onOptionSelect(value: string) {
   *   console.log('Option sélectionnée :', value);
   * }
   * ```
   */
  checkedChange = output<boolean>();

  // === SIGNAUX INTERNES ===

  /**
   * Signal interne de l'état focus du radio.
   *
   * @description
   * Signal utilisé en interne pour suivre l'état focus du radio.
   * Applique la classe CSS `primitive-radio--focused` lorsque `true`.
   *
   * @internal
   */
  protected focused = signal<boolean>(false);

  /**
   * Signal calculé des classes CSS du radio.
   *
   * @description
   * Génère dynamiquement un objet de classes CSS en fonction des propriétés :
   * - Classe de base : `primitive-radio`
   * - Classe de taille : `primitive-radio--{size}`
   * - Classe d'état sélectionné : `primitive-radio--checked`
   * - Classe d'état désactivé : `primitive-radio--disabled`
   * - Classe d'état focus : `primitive-radio--focused`
   *
   * @returns Objet de classes CSS avec valeurs booléennes.
   *
   * @internal
   */
  protected cssClasses = computed(() => ({
    'primitive-radio': true,
    [`primitive-radio--${this.size()}`]: true,
    'primitive-radio--checked': this.checked(),
    'primitive-radio--disabled': this.disabled(),
    'primitive-radio--focused': this.focused(),
  }));

  // === MÉTHODES INTERNES ===

  /**
   * Gestionnaire de sélection interne.
   *
   * @description
   * Méthode appelée par le template lors du clic sur le radio ou son label.
   * Ne fait rien si le radio est désactivé ou déjà sélectionné (comportement natif).
   * Définit `checked` à `true` et émet l'événement `checkedChange`.
   *
   * @internal
   */
  protected onSelect(): void {
    if (this.disabled() || this.checked()) return;

    this.checked.set(true);
    this.checkedChange.emit(true);
  }

  /**
   * Gestionnaire de l'événement focus natif.
   *
   * @description
   * Méthode appelée par le template lorsque le radio reçoit le focus.
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
   * Méthode appelée par le template lorsque le radio perd le focus.
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
   * Déclenche la sélection sur les touches `Space` ou `Enter` et empêche le
   * comportement par défaut (scroll de la page sur Space).
   *
   * @param event - Événement clavier natif.
   *
   * @internal
   */
  protected onKeyDown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.onSelect();
    }
  }
}
