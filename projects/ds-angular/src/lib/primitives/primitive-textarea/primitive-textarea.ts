import { Component, input, output, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type TextareaState = 'default' | 'success' | 'warning' | 'error';
export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaAppearance = 'default' | 'outline' | 'ghost';
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

/**
 * Composant textarea primitif sans logique métier.
 *
 * @description
 * Zone de saisie multiligne atomique stylisée par CSS custom properties. Supporte plusieurs
 * états visuels, tailles, apparences et modes de redimensionnement. Peut afficher des icônes
 * FontAwesome avant/après le champ. Utilise `model()` pour le binding bidirectionnel de la valeur.
 *
 * @example
 * ```html
 * <primitive-textarea
 *   placeholder="Saisissez votre commentaire"
 *   [(value)]="comment"
 *   [rows]="5">
 * </primitive-textarea>
 * ```
 *
 * @example
 * ```html
 * <primitive-textarea
 *   state="error"
 *   [maxlength]="500"
 *   resize="none"
 *   appearance="outline"
 *   (inputChanged)="onCommentChange($event)">
 * </primitive-textarea>
 * ```
 */
@Component({
  selector: 'primitive-textarea',
  imports: [CommonModule, FormsModule, FaIconComponent],
  templateUrl: './primitive-textarea.html',
  styleUrl: './primitive-textarea.scss',
})
export class PrimitiveTextarea {
  // === PROPRIÉTÉS D'ENTRÉE ===

  /**
   * Identifiant HTML unique du champ.
   *
   * @description
   * Attribut `id` natif du champ `<textarea>`. Utile pour lier un `<label>` au champ.
   *
   * @default undefined
   *
   * @example
   * ```html
   * <label for="comment-textarea">Commentaire</label>
   * <primitive-textarea id="comment-textarea"></primitive-textarea>
   * ```
   */
  id = input<string | undefined>(undefined);

  /**
   * Nom du champ pour les formulaires HTML.
   *
   * @description
   * Attribut `name` natif utilisé lors de la soumission d'un formulaire.
   *
   * @default undefined
   *
   * @example
   * ```html
   * <primitive-textarea name="description"></primitive-textarea>
   * ```
   */
  name = input<string | undefined>(undefined);

  /**
   * Texte d'indication affiché lorsque le champ est vide.
   *
   * @description
   * Attribut `placeholder` natif. Disparaît dès que l'utilisateur commence à saisir.
   *
   * @default ''
   *
   * @example
   * ```html
   * <primitive-textarea placeholder="Décrivez votre problème..."></primitive-textarea>
   * ```
   */
  placeholder = input<string>('');

  /**
   * État désactivé du champ.
   *
   * @description
   * Lorsque `true`, le champ devient non-éditable, applique l'attribut HTML `disabled`
   * et affiche les styles visuels d'état désactivé. Les événements ne sont pas émis.
   *
   * @default false
   *
   * @example
   * ```html
   * <primitive-textarea [disabled]="!canEdit"></primitive-textarea>
   * ```
   */
  disabled = input<boolean>(false);

  /**
   * État lecture seule du champ.
   *
   * @description
   * Lorsque `true`, le champ est visible et sélectionnable mais non-éditable.
   * Applique l'attribut HTML `readonly` et la classe CSS `.readonly`.
   *
   * @default false
   *
   * @example
   * ```html
   * <primitive-textarea [readonly]="true" value="Texte fixe"></primitive-textarea>
   * ```
   */
  readonly = input<boolean>(false);

  /**
   * Champ obligatoire pour la validation HTML5.
   *
   * @description
   * Lorsque `true`, applique l'attribut HTML `required`. Le navigateur empêchera
   * la soumission du formulaire parent si le champ est vide.
   *
   * @default false
   *
   * @example
   * ```html
   * <primitive-textarea [required]="true"></primitive-textarea>
   * ```
   */
  required = input<boolean>(false);

  /**
   * État visuel du champ (feedback utilisateur).
   *
   * @description
   * Applique une couleur de bordure et une classe CSS selon l'état de validation ou le contexte.
   *
   * États disponibles :
   * - `default` : état neutre (par défaut)
   * - `success` : validation réussie, bordure verte
   * - `warning` : avertissement, bordure orange
   * - `error` : erreur de validation, bordure rouge
   *
   * @default 'default'
   *
   * @example
   * ```html
   * <primitive-textarea [state]="isValid ? 'success' : 'error'"></primitive-textarea>
   * ```
   */
  state = input<TextareaState>('default');

  /**
   * Taille du champ.
   *
   * @description
   * Contrôle le padding et la taille de police du champ via les tokens CSS custom properties.
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
   * <primitive-textarea size="lg"></primitive-textarea>
   * ```
   */
  size = input<TextareaSize>('md');

  /**
   * Apparence visuelle du champ.
   *
   * @description
   * Contrôle le style de bordure et de fond du champ.
   *
   * Apparences disponibles :
   * - `default` : bordure standard, fond blanc (par défaut)
   * - `outline` : bordure fine, fond transparent
   * - `ghost` : bordure invisible au repos, visible au focus
   *
   * @default 'default'
   *
   * @example
   * ```html
   * <primitive-textarea appearance="outline"></primitive-textarea>
   * ```
   */
  appearance = input<TextareaAppearance>('default');

  /**
   * Mode de redimensionnement du champ.
   *
   * @description
   * Contrôle la possibilité pour l'utilisateur de redimensionner le champ manuellement.
   * Applique la propriété CSS `resize` au textarea.
   *
   * Modes disponibles :
   * - `none` : pas de redimensionnement
   * - `vertical` : redimensionnement vertical uniquement (par défaut)
   * - `horizontal` : redimensionnement horizontal uniquement
   * - `both` : redimensionnement dans les deux directions
   *
   * @default 'vertical'
   *
   * @example
   * ```html
   * <primitive-textarea resize="none"></primitive-textarea>
   * ```
   */
  resize = input<TextareaResize>('vertical');

  /**
   * Nombre de lignes visibles du textarea.
   *
   * @description
   * Attribut `rows` natif. Définit la hauteur initiale du champ en nombre de lignes de texte.
   *
   * @default undefined
   *
   * @example
   * ```html
   * <primitive-textarea [rows]="5"></primitive-textarea>
   * ```
   */
  rows = input<number | undefined>(undefined);

  /**
   * Nombre de colonnes (largeur en caractères) du textarea.
   *
   * @description
   * Attribut `cols` natif. Définit la largeur du champ en nombre de caractères.
   * Rarement utilisé car la largeur est souvent contrôlée par CSS.
   *
   * @default undefined
   *
   * @example
   * ```html
   * <primitive-textarea [cols]="80"></primitive-textarea>
   * ```
   */
  cols = input<number | undefined>(undefined);

  /**
   * Longueur maximale autorisée en nombre de caractères.
   *
   * @description
   * Attribut `maxlength` natif. Le navigateur empêche la saisie au-delà de cette limite.
   *
   * @default undefined
   *
   * @example
   * ```html
   * <primitive-textarea [maxlength]="500"></primitive-textarea>
   * ```
   */
  maxlength = input<number | undefined>(undefined);

  /**
   * Icône FontAwesome affichée avant le champ.
   *
   * @description
   * Accepte une `IconDefinition` de `@fortawesome/fontawesome-svg-core`.
   * L'icône est rendue via `<fa-icon>` avec la classe CSS `.icon-start`.
   * Ajoute automatiquement du padding en haut à gauche du champ.
   *
   * @default null
   *
   * @example
   * ```typescript
   * import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
   * ```
   * ```html
   * <primitive-textarea [iconStart]="faCommentDots"></primitive-textarea>
   * ```
   */
  iconStart = input<IconDefinition | null>(null);

  /**
   * Icône FontAwesome affichée après le champ.
   *
   * @description
   * Accepte une `IconDefinition` de `@fortawesome/fontawesome-svg-core`.
   * L'icône est rendue via `<fa-icon>` avec la classe CSS `.icon-end`.
   * Ajoute automatiquement du padding en haut à droite du champ.
   *
   * @default null
   *
   * @example
   * ```typescript
   * import { faPen } from '@fortawesome/free-solid-svg-icons';
   * ```
   * ```html
   * <primitive-textarea [iconEnd]="faPen"></primitive-textarea>
   * ```
   */
  iconEnd = input<IconDefinition | null>(null);

  /**
   * Label ARIA pour l'accessibilité.
   *
   * @description
   * Attribut `aria-label` natif utilisé par les lecteurs d'écran lorsqu'aucun
   * `<label>` visible n'est associé au champ.
   *
   * @default undefined
   *
   * @example
   * ```html
   * <primitive-textarea ariaLabel="Commentaire détaillé"></primitive-textarea>
   * ```
   */
  ariaLabel = input<string | undefined>(undefined);

  /**
   * ID de l'élément décrivant le champ pour l'accessibilité.
   *
   * @description
   * Attribut `aria-describedby` natif. Référence l'ID d'un élément HTML contenant
   * une description complémentaire (message d'aide, erreur de validation, etc.).
   *
   * @default undefined
   *
   * @example
   * ```html
   * <primitive-textarea ariaDescribedBy="comment-help"></primitive-textarea>
   * <small id="comment-help">Maximum 500 caractères</small>
   * ```
   */
  ariaDescribedBy = input<string | undefined>(undefined);

  // === PROPRIÉTÉ MODEL (BINDING BIDIRECTIONNEL) ===

  /**
   * Valeur du champ avec binding bidirectionnel.
   *
   * @description
   * Utilise le signal `model()` pour permettre le binding bidirectionnel via `[(value)]`.
   * La valeur est mise à jour automatiquement lors de la saisie utilisateur.
   *
   * @default ''
   *
   * @example
   * ```typescript
   * comment = signal('');
   * ```
   * ```html
   * <primitive-textarea [(value)]="comment"></primitive-textarea>
   * <p>Longueur : {{ comment().length }} caractères</p>
   * ```
   */
  value = model<string>('');

  // === ÉVÉNEMENTS DE SORTIE ===

  /**
   * Événement émis à chaque modification de la valeur du champ.
   *
   * @description
   * Déclenché lors de l'événement HTML `input` natif (à chaque frappe clavier).
   * Transporte la nouvelle valeur du champ sous forme de `string`.
   *
   * @example
   * ```html
   * <primitive-textarea (inputChanged)="onInputChange($event)"></primitive-textarea>
   * ```
   * ```typescript
   * onInputChange(value: string) {
   *   console.log('Nouvelle valeur :', value);
   * }
   * ```
   */
  inputChanged = output<string>();

  /**
   * Événement émis lorsque le champ perd le focus.
   *
   * @description
   * Déclenché lors de l'événement HTML `blur` natif. Ne transporte aucune donnée (`void`).
   * Utile pour déclencher des validations ou sauvegarder les données.
   *
   * @example
   * ```html
   * <primitive-textarea (inputBlurred)="onBlur()"></primitive-textarea>
   * ```
   */
  inputBlurred = output<void>();

  /**
   * Événement émis lorsque le champ reçoit le focus.
   *
   * @description
   * Déclenché lors de l'événement HTML `focus` natif. Ne transporte aucune donnée (`void`).
   * Utile pour afficher des indices ou mettre en surbrillance la section.
   *
   * @example
   * ```html
   * <primitive-textarea (inputFocused)="onFocus()"></primitive-textarea>
   * ```
   */
  inputFocused = output<void>();

  // === MÉTHODES PUBLIQUES ===

  /**
   * Calcule dynamiquement les classes CSS du wrapper.
   *
   * @description
   * Génère une chaîne de classes CSS combinant :
   * - L'état (`default`, `success`, `warning`, `error`)
   * - La taille (`sm`, `md`, `lg`)
   * - L'apparence (`outline`, `ghost` si non-default)
   * - `disabled` si le champ est désactivé
   * - `readonly` si le champ est en lecture seule
   * - `has-icon-start` si une icône de début est présente
   * - `has-icon-end` si une icône de fin est présente
   *
   * @returns Une chaîne de classes CSS séparées par des espaces.
   *
   * @example
   * ```typescript
   * // state='error', size='lg', appearance='outline', iconStart présent
   * // → "error lg outline has-icon-start"
   * ```
   */
  get wrapperClasses(): string {
    const classes: string[] = [this.state(), this.size()];
    if (this.appearance() !== 'default') {
      classes.push(this.appearance());
    }
    if (this.disabled()) {
      classes.push('disabled');
    }
    if (this.readonly()) {
      classes.push('readonly');
    }
    if (this.iconStart()) {
      classes.push('has-icon-start');
    }
    if (this.iconEnd()) {
      classes.push('has-icon-end');
    }
    return classes.filter(Boolean).join(' ');
  }

  /**
   * Gestionnaire de l'événement input natif.
   *
   * @description
   * Méthode appelée par le template lors de la saisie utilisateur.
   * Met à jour le signal `value` et émet l'événement `inputChanged`.
   *
   * @param event - Événement HTML `input` natif.
   *
   * @internal
   */
  handleInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.value.set(target.value);
    this.inputChanged.emit(target.value);
  }

  /**
   * Gestionnaire de l'événement blur natif.
   *
   * @description
   * Méthode appelée par le template lorsque le champ perd le focus.
   * Émet l'événement `inputBlurred`.
   *
   * @internal
   */
  handleBlur(): void {
    this.inputBlurred.emit();
  }

  /**
   * Gestionnaire de l'événement focus natif.
   *
   * @description
   * Méthode appelée par le template lorsque le champ reçoit le focus.
   * Émet l'événement `inputFocused`.
   *
   * @internal
   */
  handleFocus(): void {
    this.inputFocused.emit();
  }
}
