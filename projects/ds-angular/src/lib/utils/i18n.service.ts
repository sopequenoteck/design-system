import { Injectable, signal, computed, isDevMode } from '@angular/core';

/**
 * Locales supportées.
 */
export type SupportedLocale = 'fr' | 'en' | 'es' | 'de';

/**
 * Structure des labels i18n.
 */
export interface I18nLabels {
  // Actions communes
  close: string;
  cancel: string;
  confirm: string;
  save: string;
  delete: string;
  edit: string;
  add: string;
  search: string;
  clear: string;
  reset: string;

  // États
  loading: string;
  error: string;
  success: string;
  warning: string;
  info: string;

  // Navigation
  previous: string;
  next: string;
  first: string;
  last: string;
  page: string;
  of: string;

  // Formulaires
  required: string;
  optional: string;
  invalidEmail: string;
  invalidUrl: string;
  minLength: string;
  maxLength: string;
  minValue: string;
  maxValue: string;

  // Accessibilité
  expandAll: string;
  collapseAll: string;
  openMenu: string;
  closeMenu: string;
  selectOption: string;
  selectedOption: string;
  noResults: string;

  // Pagination
  itemsPerPage: string;
  showingItems: string;
  goToPage: string;

  // Stepper
  stepCompleted: string;
  stepActive: string;
  stepPending: string;
  stepError: string;
}

/**
 * Labels par défaut en français.
 */
const FR_LABELS: I18nLabels = {
  // Actions communes
  close: 'Fermer',
  cancel: 'Annuler',
  confirm: 'Confirmer',
  save: 'Enregistrer',
  delete: 'Supprimer',
  edit: 'Modifier',
  add: 'Ajouter',
  search: 'Rechercher',
  clear: 'Effacer',
  reset: 'Réinitialiser',

  // États
  loading: 'Chargement en cours...',
  error: 'Une erreur est survenue',
  success: 'Opération réussie',
  warning: 'Attention',
  info: 'Information',

  // Navigation
  previous: 'Précédent',
  next: 'Suivant',
  first: 'Premier',
  last: 'Dernier',
  page: 'Page',
  of: 'sur',

  // Formulaires
  required: 'Ce champ est requis',
  optional: 'Optionnel',
  invalidEmail: 'Adresse email invalide',
  invalidUrl: 'URL invalide',
  minLength: 'Minimum {min} caractères requis',
  maxLength: 'Maximum {max} caractères autorisés',
  minValue: 'La valeur minimale est {min}',
  maxValue: 'La valeur maximale est {max}',

  // Accessibilité
  expandAll: 'Tout déplier',
  collapseAll: 'Tout replier',
  openMenu: 'Ouvrir le menu',
  closeMenu: 'Fermer le menu',
  selectOption: 'Sélectionner une option',
  selectedOption: 'Option sélectionnée',
  noResults: 'Aucun résultat',

  // Pagination
  itemsPerPage: 'Éléments par page',
  showingItems: '{start} - {end} sur {total}',
  goToPage: 'Aller à la page {page}',

  // Stepper
  stepCompleted: 'Étape terminée',
  stepActive: 'Étape en cours',
  stepPending: 'Étape en attente',
  stepError: 'Erreur à cette étape',
};

/**
 * Labels en anglais.
 */
const EN_LABELS: I18nLabels = {
  // Actions communes
  close: 'Close',
  cancel: 'Cancel',
  confirm: 'Confirm',
  save: 'Save',
  delete: 'Delete',
  edit: 'Edit',
  add: 'Add',
  search: 'Search',
  clear: 'Clear',
  reset: 'Reset',

  // États
  loading: 'Loading...',
  error: 'An error occurred',
  success: 'Operation successful',
  warning: 'Warning',
  info: 'Information',

  // Navigation
  previous: 'Previous',
  next: 'Next',
  first: 'First',
  last: 'Last',
  page: 'Page',
  of: 'of',

  // Formulaires
  required: 'This field is required',
  optional: 'Optional',
  invalidEmail: 'Invalid email address',
  invalidUrl: 'Invalid URL',
  minLength: 'Minimum {min} characters required',
  maxLength: 'Maximum {max} characters allowed',
  minValue: 'Minimum value is {min}',
  maxValue: 'Maximum value is {max}',

  // Accessibilité
  expandAll: 'Expand all',
  collapseAll: 'Collapse all',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  selectOption: 'Select an option',
  selectedOption: 'Selected option',
  noResults: 'No results',

  // Pagination
  itemsPerPage: 'Items per page',
  showingItems: '{start} - {end} of {total}',
  goToPage: 'Go to page {page}',

  // Stepper
  stepCompleted: 'Step completed',
  stepActive: 'Current step',
  stepPending: 'Pending step',
  stepError: 'Error at this step',
};

/**
 * Labels en espagnol.
 */
const ES_LABELS: I18nLabels = {
  close: 'Cerrar',
  cancel: 'Cancelar',
  confirm: 'Confirmar',
  save: 'Guardar',
  delete: 'Eliminar',
  edit: 'Editar',
  add: 'Añadir',
  search: 'Buscar',
  clear: 'Borrar',
  reset: 'Restablecer',
  loading: 'Cargando...',
  error: 'Se produjo un error',
  success: 'Operación exitosa',
  warning: 'Advertencia',
  info: 'Información',
  previous: 'Anterior',
  next: 'Siguiente',
  first: 'Primero',
  last: 'Último',
  page: 'Página',
  of: 'de',
  required: 'Este campo es obligatorio',
  optional: 'Opcional',
  invalidEmail: 'Correo electrónico inválido',
  invalidUrl: 'URL inválida',
  minLength: 'Mínimo {min} caracteres requeridos',
  maxLength: 'Máximo {max} caracteres permitidos',
  minValue: 'El valor mínimo es {min}',
  maxValue: 'El valor máximo es {max}',
  expandAll: 'Expandir todo',
  collapseAll: 'Contraer todo',
  openMenu: 'Abrir menú',
  closeMenu: 'Cerrar menú',
  selectOption: 'Seleccionar una opción',
  selectedOption: 'Opción seleccionada',
  noResults: 'Sin resultados',
  itemsPerPage: 'Elementos por página',
  showingItems: '{start} - {end} de {total}',
  goToPage: 'Ir a la página {page}',
  stepCompleted: 'Paso completado',
  stepActive: 'Paso actual',
  stepPending: 'Paso pendiente',
  stepError: 'Error en este paso',
};

/**
 * Labels en allemand.
 */
const DE_LABELS: I18nLabels = {
  close: 'Schließen',
  cancel: 'Abbrechen',
  confirm: 'Bestätigen',
  save: 'Speichern',
  delete: 'Löschen',
  edit: 'Bearbeiten',
  add: 'Hinzufügen',
  search: 'Suchen',
  clear: 'Löschen',
  reset: 'Zurücksetzen',
  loading: 'Wird geladen...',
  error: 'Ein Fehler ist aufgetreten',
  success: 'Operation erfolgreich',
  warning: 'Warnung',
  info: 'Information',
  previous: 'Zurück',
  next: 'Weiter',
  first: 'Erste',
  last: 'Letzte',
  page: 'Seite',
  of: 'von',
  required: 'Dieses Feld ist erforderlich',
  optional: 'Optional',
  invalidEmail: 'Ungültige E-Mail-Adresse',
  invalidUrl: 'Ungültige URL',
  minLength: 'Mindestens {min} Zeichen erforderlich',
  maxLength: 'Maximal {max} Zeichen erlaubt',
  minValue: 'Der Mindestwert ist {min}',
  maxValue: 'Der Maximalwert ist {max}',
  expandAll: 'Alle erweitern',
  collapseAll: 'Alle reduzieren',
  openMenu: 'Menü öffnen',
  closeMenu: 'Menü schließen',
  selectOption: 'Option auswählen',
  selectedOption: 'Ausgewählte Option',
  noResults: 'Keine Ergebnisse',
  itemsPerPage: 'Elemente pro Seite',
  showingItems: '{start} - {end} von {total}',
  goToPage: 'Gehe zu Seite {page}',
  stepCompleted: 'Schritt abgeschlossen',
  stepActive: 'Aktueller Schritt',
  stepPending: 'Ausstehender Schritt',
  stepError: 'Fehler bei diesem Schritt',
};

/**
 * Map des labels par locale.
 */
const LABELS_MAP: Record<SupportedLocale, I18nLabels> = {
  fr: FR_LABELS,
  en: EN_LABELS,
  es: ES_LABELS,
  de: DE_LABELS,
};

/**
 * # DsI18nService
 *
 * Service d'internationalisation pour les labels des composants du design system.
 * Fournit des labels traduits pour les actions communes, états, navigation, etc.
 *
 * ## Usage
 *
 * ```typescript
 * import { DsI18nService } from 'ds-angular';
 *
 * @Component({...})
 * export class MyComponent {
 *   private i18n = inject(DsI18nService);
 *
 *   closeLabel = this.i18n.get('close');
 *
 *   ngOnInit() {
 *     // Changer la locale
 *     this.i18n.setLocale('en');
 *   }
 * }
 * ```
 *
 * ## Locales supportées
 *
 * - `fr` : Français (défaut)
 * - `en` : English
 * - `es` : Español
 * - `de` : Deutsch
 *
 * @service
 */
@Injectable({
  providedIn: 'root',
})
export class DsI18nService {
  /**
   * Locale courante.
   */
  private readonly _locale = signal<SupportedLocale>('fr');

  /**
   * Labels personnalisés (surcharge partielle).
   */
  private readonly _customLabels = signal<Partial<I18nLabels>>({});

  /**
   * Locale courante (lecture seule).
   */
  readonly locale = this._locale.asReadonly();

  /**
   * Labels courants fusionnés (locale + custom).
   */
  readonly labels = computed(() => {
    const baseLabels = LABELS_MAP[this._locale()];
    const customLabels = this._customLabels();
    return { ...baseLabels, ...customLabels };
  });

  /**
   * Définir la locale.
   */
  setLocale(locale: SupportedLocale): void {
    if (LABELS_MAP[locale]) {
      this._locale.set(locale);
    } else {
      if (isDevMode()) {
        console.warn(`[DsI18nService] Locale '${locale}' not supported. Using 'fr'.`);
      }
      this._locale.set('fr');
    }
  }

  /**
   * Obtenir un label par clé.
   */
  get<K extends keyof I18nLabels>(key: K): string {
    return this.labels()[key];
  }

  /**
   * Obtenir un label formaté avec des variables.
   *
   * @example
   * i18n.format('minLength', { min: 5 }) // "Minimum 5 caractères requis"
   */
  format<K extends keyof I18nLabels>(key: K, params: Record<string, string | number>): string {
    let label = this.labels()[key];
    for (const [param, value] of Object.entries(params)) {
      label = label.replace(`{${param}}`, String(value));
    }
    return label;
  }

  /**
   * Surcharger des labels personnalisés.
   */
  setCustomLabels(labels: Partial<I18nLabels>): void {
    this._customLabels.set(labels);
  }

  /**
   * Réinitialiser les labels personnalisés.
   */
  resetCustomLabels(): void {
    this._customLabels.set({});
  }

  /**
   * Obtenir toutes les locales supportées.
   */
  getSupportedLocales(): SupportedLocale[] {
    return Object.keys(LABELS_MAP) as SupportedLocale[];
  }

  /**
   * Détecter la locale du navigateur.
   */
  detectBrowserLocale(): SupportedLocale {
    const browserLang = navigator.language.split('-')[0];
    if (this.getSupportedLocales().includes(browserLang as SupportedLocale)) {
      return browserLang as SupportedLocale;
    }
    return 'fr';
  }

  /**
   * Initialiser avec la locale du navigateur.
   */
  initFromBrowser(): void {
    this.setLocale(this.detectBrowserLocale());
  }
}
