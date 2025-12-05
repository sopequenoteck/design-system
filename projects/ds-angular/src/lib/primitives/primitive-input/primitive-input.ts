import { Component, input, output, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date';
export type InputState = 'default' | 'success' | 'warning' | 'error';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputAppearance = 'default' | 'outline' | 'ghost';

/**
 * Composant input primitif sans logique métier.
 *
 * @description
 * Champ de saisie atomique stylisé par CSS custom properties. Supporte plusieurs types HTML5,
 * états visuels, tailles et apparences. Peut afficher des icônes FontAwesome avant/après le champ.
 * Utilise `model()` pour le binding bidirectionnel de la valeur.
 *
 * @example
 * ```html
 * <primitive-input
 *   type="text"
 *   placeholder="Entrez votre nom"
 *   [(value)]="username">
 * </primitive-input>
 * ```
 *
 * @example
 * ```html
 * <primitive-input
 *   type="email"
 *   state="error"
 *   [iconStart]="faEnvelope"
 *   placeholder="email@example.com"
 *   (inputChanged)="onEmailChange($event)">
 * </primitive-input>
 * ```
 */
@Component({
  selector: 'primitive-input',
  imports: [CommonModule, FormsModule, FaIconComponent],
  templateUrl: './primitive-input.html',
  styleUrl: './primitive-input.scss',
})
export class PrimitiveInput {
  // === PROPRIÉTÉS D'ENTRÉE ===

  /**
   * Identifiant HTML unique du champ.
   *
   * @description
   * Attribut `id` natif du champ `<input>`. Utile pour lier un `<label>` au champ.
   *
   * @default undefined
   *
   * @example
   * ```html
   * <label for="username-input">Nom d'utilisateur</label>
   * <primitive-input id="username-input"></primitive-input>
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
   * <primitive-input name="email"></primitive-input>
   * ```
   */
  name = input<string | undefined>(undefined);

  /**
   * Valeur d'autocomplétion HTML5.
   *
   * @description
   * Attribut `autocomplete` natif pour activer/désactiver l'autocomplétion du navigateur.
   * Valeurs courantes : `email`, `username`, `current-password`, `new-password`, `tel`, etc.
   *
   * @default undefined
   *
   * @example
   * ```html
   * <primitive-input type="email" autocomplete="email"></primitive-input>
   * ```
   */
  autocomplete = input<string | undefined>(undefined);

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
   * <primitive-input placeholder="jean.dupont@example.com"></primitive-input>
   * ```
   */
  placeholder = input<string>('');

  /**
   * Type HTML5 du champ de saisie.
   *
   * @description
   * Détermine le type de clavier affiché sur mobile et les validations natives du navigateur.
   *
   * Types disponibles :
   * - `text` : texte libre (par défaut)
   * - `password` : masque les caractères saisis
   * - `email` : clavier avec @ et validation email
   * - `number` : clavier numérique
   * - `tel` : clavier téléphonique
   * - `url` : clavier avec .com et validation URL
   * - `search` : champ de recherche avec icône × de nettoyage
   * - `date` : sélecteur de date natif
   *
   * @default 'text'
   *
   * @example
   * ```html
   * <primitive-input type="password"></primitive-input>
   * ```
   */
  type = input<InputType>('text');

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
   * <primitive-input [disabled]="!canEdit"></primitive-input>
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
   * <primitive-input [readonly]="true" value="Valeur fixe"></primitive-input>
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
   * <primitive-input [required]="true" placeholder="Email requis"></primitive-input>
   * ```
   */
  required = input<boolean>(false);

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
   * <primitive-input [maxlength]="50" placeholder="Max 50 caractères"></primitive-input>
   * ```
   */
  maxlength = input<number | undefined>(undefined);

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
   * <primitive-input [state]="isValid ? 'success' : 'error'"></primitive-input>
   * ```
   */
  state = input<InputState>('default');

  /**
   * Taille du champ.
   *
   * @description
   * Contrôle la hauteur, le padding et la taille de police du champ via
   * les tokens `--input-height-*` et `--input-font-size-*`.
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
   * <primitive-input size="lg"></primitive-input>
   * ```
   */
  size = input<InputSize>('md');

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
   * <primitive-input appearance="ghost"></primitive-input>
   * ```
   */
  appearance = input<InputAppearance>('default');

  /**
   * Icône FontAwesome affichée avant le champ.
   *
   * @description
   * Accepte une `IconDefinition` de `@fortawesome/fontawesome-svg-core`.
   * L'icône est rendue via `<fa-icon>` avec la classe CSS `.icon-start`.
   * Ajoute automatiquement du padding à gauche du champ.
   *
   * @default null
   *
   * @example
   * ```typescript
   * import { faUser } from '@fortawesome/free-solid-svg-icons';
   * ```
   * ```html
   * <primitive-input [iconStart]="faUser" placeholder="Username"></primitive-input>
   * ```
   */
  iconStart = input<IconDefinition | null>(null);

  /**
   * Icône FontAwesome affichée après le champ.
   *
   * @description
   * Accepte une `IconDefinition` de `@fortawesome/fontawesome-svg-core`.
   * L'icône est rendue via `<fa-icon>` avec la classe CSS `.icon-end`.
   * Ajoute automatiquement du padding à droite du champ.
   *
   * @default null
   *
   * @example
   * ```typescript
   * import { faSearch } from '@fortawesome/free-solid-svg-icons';
   * ```
   * ```html
   * <primitive-input [iconEnd]="faSearch" placeholder="Rechercher"></primitive-input>
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
   * <primitive-input ariaLabel="Adresse email"></primitive-input>
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
   * <primitive-input ariaDescribedBy="email-help"></primitive-input>
   * <small id="email-help">Utilisez votre email professionnel</small>
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
   * username = signal('');
   * ```
   * ```html
   * <primitive-input [(value)]="username"></primitive-input>
   * <p>Bonjour {{ username() }}</p>
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
   * <primitive-input (inputChanged)="onInputChange($event)"></primitive-input>
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
   * <primitive-input (inputBlurred)="onBlur()"></primitive-input>
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
   * <primitive-input (inputFocused)="onFocus()"></primitive-input>
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
    const target = event.target as HTMLInputElement;
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
