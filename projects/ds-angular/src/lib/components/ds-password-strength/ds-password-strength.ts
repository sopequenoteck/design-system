import { Component, input, output, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

/**
 * Niveaux de force du mot de passe.
 */
export type PasswordStrength = 'none' | 'weak' | 'medium' | 'strong';

/**
 * Tailles disponibles pour le composant.
 */
export type PasswordStrengthSize = 'sm' | 'md' | 'lg';

/**
 * Critère de validation du mot de passe.
 */
export interface PasswordCriterion {
  key: string;
  label: string;
  valid: boolean;
}

/**
 * # DsPasswordStrength
 *
 * Composant indicateur de force de mot de passe avec affichage visuel
 * (barres de progression) et optionnel des critères de validation.
 *
 * ## Usage
 *
 * ```html
 * <ds-password-strength
 *   [password]="userPassword"
 *   [minLength]="8"
 *   [showLabel]="true"
 *   [showCriteria]="true"
 *   (strengthChange)="handleStrengthChange($event)" />
 * ```
 *
 * ## Calcul de la force
 *
 * - `none`: Champ vide
 * - `weak`: Longueur < minLength OU uniquement lettres
 * - `medium`: Longueur ≥ minLength ET (lettres+chiffres OU lettres+spéciaux)
 * - `strong`: Longueur ≥ minLength ET majuscules + minuscules + chiffres + spéciaux
 *
 * ## Accessibilité
 *
 * - Attribut `role="status"` pour annoncer les changements
 * - Label ARIA dynamique selon la force
 * - Couleurs sémantiques (error/warning/success)
 *
 * @component
 */
@Component({
  selector: 'ds-password-strength',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './ds-password-strength.html',
  styleUrl: './ds-password-strength.scss',
})
export class DsPasswordStrength {
  /**
   * Mot de passe à évaluer.
   * @default ''
   */
  password = input<string>('');

  /**
   * Longueur minimale requise.
   * @default 8
   */
  minLength = input<number>(8);

  /**
   * Afficher le label textuel (ex: "Faible", "Moyen", "Fort").
   * @default true
   */
  showLabel = input<boolean>(true);

  /**
   * Afficher les critères détaillés de validation.
   * @default false
   */
  showCriteria = input<boolean>(false);

  /**
   * Taille du composant.
   * @default 'md'
   */
  size = input<PasswordStrengthSize>('md');

  /**
   * Émis lorsque la force du mot de passe change.
   */
  strengthChange = output<PasswordStrength>();

  /**
   * Icônes FontAwesome pour les critères.
   */
  protected readonly faCheck = faCheck;
  protected readonly faTimes = faTimes;

  /**
   * Regex patterns pour la validation.
   */
  private readonly hasUpperCase = /[A-Z]/;
  private readonly hasLowerCase = /[a-z]/;
  private readonly hasNumber = /[0-9]/;
  private readonly hasSpecialChar = /[^A-Za-z0-9]/;

  /**
   * Calcul de la force du mot de passe.
   */
  readonly strength = computed(() => {
    const pwd = this.password();
    const minLen = this.minLength();

    if (!pwd || pwd.length === 0) {
      return 'none' as PasswordStrength;
    }

    const hasUpper = this.hasUpperCase.test(pwd);
    const hasLower = this.hasLowerCase.test(pwd);
    const hasNum = this.hasNumber.test(pwd);
    const hasSpecial = this.hasSpecialChar.test(pwd);

    const lengthValid = pwd.length >= minLen;

    // Weak: longueur insuffisante OU uniquement lettres
    if (!lengthValid) {
      return 'weak' as PasswordStrength;
    }

    const hasLetters = hasUpper || hasLower;
    const hasOnlyLetters = hasLetters && !hasNum && !hasSpecial;

    if (hasOnlyLetters) {
      return 'weak' as PasswordStrength;
    }

    // Strong: toutes les catégories présentes
    if (hasUpper && hasLower && hasNum && hasSpecial) {
      return 'strong' as PasswordStrength;
    }

    // Medium: au moins deux catégories
    return 'medium' as PasswordStrength;
  });

  /**
   * Label textuel de la force (pour affichage).
   */
  readonly strengthLabel = computed(() => {
    const labels: Record<PasswordStrength, string> = {
      none: '',
      weak: 'Faible',
      medium: 'Moyen',
      strong: 'Fort',
    };
    return labels[this.strength()];
  });

  /**
   * Label ARIA pour accessibilité.
   */
  readonly ariaLabel = computed(() => {
    const str = this.strength();
    if (str === 'none') {
      return 'Force du mot de passe : non définie';
    }
    return `Force du mot de passe : ${this.strengthLabel()}`;
  });

  /**
   * Classes CSS calculées pour le conteneur.
   */
  readonly containerClasses = computed(() => {
    return [
      'ds-password-strength',
      `ds-password-strength--${this.size()}`,
      `ds-password-strength--${this.strength()}`,
    ].filter(Boolean).join(' ');
  });

  /**
   * Barres indicatrices (3 barres).
   * Chaque barre est active selon la force.
   */
  readonly bars = computed(() => {
    const str = this.strength();
    const barCount = 3;

    const activeCount: Record<PasswordStrength, number> = {
      none: 0,
      weak: 1,
      medium: 2,
      strong: 3,
    };

    const count = activeCount[str];

    return Array.from({ length: barCount }, (_, index) => ({
      active: index < count,
      level: str,
    }));
  });

  /**
   * Liste des critères de validation (pour affichage détaillé).
   */
  readonly criteria = computed((): PasswordCriterion[] => {
    const pwd = this.password();
    const minLen = this.minLength();

    return [
      {
        key: 'length',
        label: `Au moins ${minLen} caractères`,
        valid: pwd.length >= minLen,
      },
      {
        key: 'uppercase',
        label: 'Contient des majuscules',
        valid: this.hasUpperCase.test(pwd),
      },
      {
        key: 'lowercase',
        label: 'Contient des minuscules',
        valid: this.hasLowerCase.test(pwd),
      },
      {
        key: 'number',
        label: 'Contient des chiffres',
        valid: this.hasNumber.test(pwd),
      },
      {
        key: 'special',
        label: 'Contient des caractères spéciaux',
        valid: this.hasSpecialChar.test(pwd),
      },
    ];
  });

  /**
   * Constructeur : émet les changements de force via effect.
   */
  constructor() {
    let previousStrength: PasswordStrength = 'none';

    // Émettre strengthChange à chaque changement
    effect(() => {
      const currentStrength = this.strength();
      if (currentStrength !== previousStrength) {
        previousStrength = currentStrength;
        this.strengthChange.emit(currentStrength);
      }
    });
  }
}
