import {
  Component,
  input,
  output,
  model,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type ToggleSize = 'sm' | 'md' | 'lg';

/**
 * Composant toggle (switch) primitif sans logique métier.
 *
 * @description
 * Interrupteur atomique stylisé par CSS custom properties. Représente un état binaire
 * activé/désactivé avec une animation de transition fluide. Supporte plusieurs tailles,
 * un label optionnel positionnable à gauche ou à droite, et utilise `model()` pour
 * le binding bidirectionnel.
 *
 * @example
 * ```html
 * <primitive-toggle
 *   [(checked)]="notificationsEnabled"
 *   label="Activer les notifications">
 * </primitive-toggle>
 * ```
 *
 * @example
 * ```html
 * <primitive-toggle
 *   [checked]="true"
 *   [disabled]="false"
 *   size="lg"
 *   labelPosition="left"
 *   label="Mode sombre"
 *   (checkedChange)="onThemeChange($event)">
 * </primitive-toggle>
 * ```
 */
@Component({
  selector: 'primitive-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './primitive-toggle.html',
  styleUrl: './primitive-toggle.scss',
})
export class PrimitiveToggle {
  // === PROPRIÉTÉ MODEL (BINDING BIDIRECTIONNEL) ===

  /**
   * État activé du toggle avec binding bidirectionnel.
   *
   * @description
   * Utilise le signal `model()` pour permettre le binding bidirectionnel via `[(checked)]`.
   * L'état est inversé automatiquement lors du clic utilisateur.
   * Le thumb (curseur) se déplace de gauche à droite selon l'état.
   *
   * @default false
   *
   * @example
   * ```typescript
   * darkModeEnabled = signal(false);
   * ```
   * ```html
   * <primitive-toggle [(checked)]="darkModeEnabled" label="Mode sombre"></primitive-toggle>
   * <p>Mode sombre : {{ darkModeEnabled() ? 'Activé' : 'Désactivé' }}</p>
   * ```
   */
  checked = model<boolean>(false);

  // === PROPRIÉTÉS D'ENTRÉE ===

  /**
   * État désactivé du toggle.
   *
   * @description
   * Lorsque `true`, le toggle devient non-cliquable, applique les styles visuels
   * d'état désactivé et définit `tabindex="-1"` et `aria-disabled="true"`.
   * Les événements ne sont pas émis en état désactivé.
   *
   * @default false
   *
   * @example
   * ```html
   * <primitive-toggle [disabled]="!hasPermission" label="Option premium"></primitive-toggle>
   * ```
   */
  disabled = input<boolean>(false);

  /**
   * Taille du toggle.
   *
   * @description
   * Contrôle la hauteur du track (rail), la taille du thumb (curseur) et la taille
   * de police du label via les tokens CSS custom properties.
   *
   * Tailles disponibles :
   * - `sm` : petit (track 32px × 18px, thumb 14px)
   * - `md` : moyen (track 44px × 24px, thumb 20px, par défaut)
   * - `lg` : grand (track 56px × 30px, thumb 26px)
   *
   * @default 'md'
   *
   * @example
   * ```html
   * <primitive-toggle size="lg" label="Grande option"></primitive-toggle>
   * ```
   */
  size = input<ToggleSize>('md');

  /**
   * Texte du label affiché à côté du toggle.
   *
   * @description
   * Si fourni, affiche un label cliquable associé au toggle.
   * Le label est lié au toggle via `aria-labelledby` pour l'accessibilité.
   * Le clic sur le label déclenche le toggle.
   *
   * @default ''
   *
   * @example
   * ```html
   * <primitive-toggle label="Accepter les cookies"></primitive-toggle>
   * ```
   */
  label = input<string>('');

  /**
   * Position du label par rapport au switch.
   *
   * @description
   * Définit si le label s'affiche à gauche ou à droite du switch visuel.
   * Applique la classe CSS `primitive-toggle--label-{position}` si un label est présent.
   *
   * Positions disponibles :
   * - `right` : label à droite du switch (par défaut)
   * - `left` : label à gauche du switch
   *
   * @default 'right'
   *
   * @example
   * ```html
   * <primitive-toggle labelPosition="left" label="Notifications"></primitive-toggle>
   * ```
   */
  labelPosition = input<'left' | 'right'>('right');

  /**
   * Identifiant unique du toggle pour l'accessibilité.
   *
   * @description
   * Utilisé pour générer les IDs des éléments internes (label) et pour l'association
   * ARIA. Si non fourni, un ID aléatoire est généré automatiquement.
   *
   * @default `toggle-${random}`
   *
   * @example
   * ```html
   * <primitive-toggle toggleId="dark-mode-switch" label="Mode sombre"></primitive-toggle>
   * ```
   */
  toggleId = input<string>(`toggle-${Math.random().toString(36).slice(2, 11)}`);

  // === ÉVÉNEMENTS DE SORTIE ===

  /**
   * Événement émis lors du changement d'état du toggle.
   *
   * @description
   * Émis uniquement si le toggle n'est pas désactivé (`disabled = false`).
   * Transporte la nouvelle valeur booléenne de l'état activé.
   * Émis à chaque toggle (activation ou désactivation).
   *
   * @example
   * ```html
   * <primitive-toggle
   *   [(checked)]="autoSave"
   *   (checkedChange)="onAutoSaveChange($event)">
   * </primitive-toggle>
   * ```
   * ```typescript
   * onAutoSaveChange(enabled: boolean) {
   *   console.log('Sauvegarde automatique :', enabled ? 'activée' : 'désactivée');
   * }
   * ```
   */
  checkedChange = output<boolean>();

  // === SIGNAUX INTERNES ===

  /**
   * Signal interne de l'état focus du toggle.
   *
   * @description
   * Signal utilisé en interne pour suivre l'état focus du switch.
   * Applique la classe CSS `primitive-toggle--focused` lorsque `true`.
   *
   * @internal
   */
  protected focused = signal<boolean>(false);

  /**
   * Signal calculé des classes CSS du toggle.
   *
   * @description
   * Génère dynamiquement un objet de classes CSS en fonction des propriétés :
   * - Classe de base : `primitive-toggle`
   * - Classe de taille : `primitive-toggle--{size}`
   * - Classe de position du label : `primitive-toggle--label-{position}` (si label présent)
   * - Classe d'état activé : `primitive-toggle--checked`
   * - Classe d'état désactivé : `primitive-toggle--disabled`
   * - Classe d'état focus : `primitive-toggle--focused`
   *
   * @returns Objet de classes CSS avec valeurs booléennes.
   *
   * @internal
   */
  protected cssClasses = computed(() => ({
    'primitive-toggle': true,
    [`primitive-toggle--${this.size()}`]: true,
    [`primitive-toggle--label-${this.labelPosition()}`]: !!this.label(),
    'primitive-toggle--checked': this.checked(),
    'primitive-toggle--disabled': this.disabled(),
    'primitive-toggle--focused': this.focused(),
  }));

  // === MÉTHODES INTERNES ===

  /**
   * Gestionnaire de toggle interne.
   *
   * @description
   * Méthode appelée par le template lors du clic sur le switch ou son label.
   * Inverse l'état `checked` et émet l'événement `checkedChange`.
   * Ne fait rien si le toggle est désactivé.
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
   * Méthode appelée par le template lorsque le switch reçoit le focus.
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
   * Méthode appelée par le template lorsque le switch perd le focus.
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
   * Déclenche le toggle sur les touches `Space` ou `Enter` et empêche le
   * comportement par défaut (scroll de la page sur Space).
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
