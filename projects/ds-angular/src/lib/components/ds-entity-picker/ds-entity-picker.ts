import {
  Component,
  input,
  output,
  signal,
  computed,
  forwardRef,
  ElementRef,
  ViewChild,
  HostListener,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faChevronDown, faXmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import { DsEntityChip } from './ds-entity-chip';
import {
  DsEntityOption,
  DsEntityPickerSize,
  DsEntityPickerDisplayMode,
} from './ds-entity-picker.types';
import { AUTOCOMPLETE_POSITIONS } from '../../utils/overlay-positions';

/**
 * Entity Picker - Sélecteur d'entités riches
 *
 * Permet la sélection d'entités avec icônes, couleurs, emojis.
 * Supporte la sélection simple et multiple avec affichage en chips colorés.
 *
 * @example
 * ```html
 * <!-- Sélection simple -->
 * <ds-entity-picker
 *   [options]="tags"
 *   [(ngModel)]="selectedTag"
 *   placeholder="Choisir un tag"
 * />
 *
 * <!-- Sélection multiple -->
 * <ds-entity-picker
 *   [options]="categories"
 *   [multiple]="true"
 *   [(ngModel)]="selectedCategories"
 *   [allowCreate]="true"
 *   (createRequested)="onCreateCategory($event)"
 * />
 * ```
 */
@Component({
  selector: 'ds-entity-picker',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, DsEntityChip, CdkConnectedOverlay, CdkOverlayOrigin],
  templateUrl: './ds-entity-picker.html',
  styleUrls: ['./ds-entity-picker.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsEntityPicker),
      multi: true,
    },
  ],
})
export class DsEntityPicker implements ControlValueAccessor {
  // ─────────────────────────────────────────────────────────────────────────────
  // Inputs
  // ─────────────────────────────────────────────────────────────────────────────

  /** Liste des options disponibles */
  readonly options = input<DsEntityOption[]>([]);

  /** Active la sélection multiple */
  readonly multiple = input<boolean>(false);

  /** Permet la création d'options à la volée */
  readonly allowCreate = input<boolean>(false);

  /** Placeholder du champ de recherche */
  readonly placeholder = input<string>('Rechercher...');

  /** Taille du composant */
  readonly size = input<DsEntityPickerSize>('md');

  /** Mode d'affichage des sélections multiples */
  readonly displayMode = input<DsEntityPickerDisplayMode>('chip');

  /** Afficher le bouton clear */
  readonly clearable = input<boolean>(true);

  /** Nombre maximum de sélections (multi-select) */
  readonly maxSelections = input<number | undefined>(undefined);

  /** Label du champ */
  readonly label = input<string>('');

  /** Message d'erreur */
  readonly error = input<string>('');

  /** Texte d'aide */
  readonly helper = input<string>('');

  /** Champ désactivé */
  readonly disabled = input<boolean>(false);

  /** Champ obligatoire */
  readonly required = input<boolean>(false);

  /** Caractères minimum avant filtrage */
  readonly minChars = input<number>(0);

  /** Texte si aucun résultat */
  readonly noResultsText = input<string>('Aucun résultat');

  /** Template du texte de création (utiliser {query} comme placeholder) */
  readonly createText = input<string>('Créer "{query}"');

  /** Nom du champ (pour formulaires) */
  readonly name = input<string>('');

  // ─────────────────────────────────────────────────────────────────────────────
  // Outputs
  // ─────────────────────────────────────────────────────────────────────────────

  /** Émis lors d'un changement de sélection */
  readonly selectionChange = output<DsEntityOption | DsEntityOption[] | null>();

  /** Émis lors d'une demande de création */
  readonly createRequested = output<string>();

  /** Émis lors d'un changement de recherche */
  readonly searchChange = output<string>();

  /** Émis à l'ouverture du panel */
  readonly opened = output<void>();

  /** Émis à la fermeture du panel */
  readonly closed = output<void>();

  // ─────────────────────────────────────────────────────────────────────────────
  // Internal state
  // ─────────────────────────────────────────────────────────────────────────────

  protected readonly isOpen = signal(false);
  protected readonly searchQuery = signal('');
  protected readonly focusedIndex = signal(-1);
  private readonly internalValue = signal<string | string[] | null>(null);
  private readonly cvaDisabled = signal(false);

  @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;
  @ViewChild('listbox') listbox!: ElementRef<HTMLUListElement>;

  private onChange: (value: string | string[] | null) => void = () => {};
  private onTouched: () => void = () => {};

  // Icons
  readonly iconPlus = faPlus;
  readonly iconChevron = faChevronDown;
  readonly iconClear = faXmark;
  readonly iconSearch = faSearch;

  // CDK Overlay positions
  readonly overlayPositions = AUTOCOMPLETE_POSITIONS;

  // ─────────────────────────────────────────────────────────────────────────────
  // Computed
  // ─────────────────────────────────────────────────────────────────────────────

  protected readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled());

  /** Options sélectionnées (objets complets) */
  protected readonly selectedOptions = computed((): DsEntityOption[] => {
    const value = this.internalValue();
    const opts = this.options();

    if (value === null) return [];

    if (this.multiple()) {
      const values = Array.isArray(value) ? value : [value];
      return opts.filter(opt => values.includes(opt.value));
    } else {
      const found = opts.find(opt => opt.value === value);
      return found ? [found] : [];
    }
  });

  /** Texte affiché dans l'input (mode single) */
  protected readonly displayValue = computed(() => {
    if (this.multiple()) return '';
    const selected = this.selectedOptions();
    return selected.length > 0 ? selected[0].label : '';
  });

  /** Options filtrées selon la recherche */
  protected readonly filteredOptions = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const minLen = this.minChars();
    const selected = this.selectedOptions().map(o => o.value);

    if (query.length < minLen) {
      // En multi-select, exclure les options déjà sélectionnées
      if (this.multiple()) {
        return this.options().filter(opt => !selected.includes(opt.value));
      }
      return this.options();
    }

    let results = this.options().filter(opt => {
      const matchLabel = opt.label.toLowerCase().includes(query);
      const matchDesc = opt.description?.toLowerCase().includes(query);
      return matchLabel || matchDesc;
    });

    // En multi-select, exclure les options déjà sélectionnées
    if (this.multiple()) {
      results = results.filter(opt => !selected.includes(opt.value));
    }

    return results;
  });

  /** Peut créer une nouvelle option */
  protected readonly canCreate = computed(() => {
    if (!this.allowCreate()) return false;

    const query = this.searchQuery().trim();
    if (!query) return false;

    // Vérifie si l'option n'existe pas déjà
    const exists = this.options().some(
      opt => opt.label.toLowerCase() === query.toLowerCase()
    );

    return !exists;
  });

  /** Afficher le dropdown */
  protected readonly shouldShowDropdown = computed(() => {
    return this.isOpen();
  });

  /** Classes du container */
  protected readonly containerClasses = computed(() => ({
    'ds-entity-picker': true,
    'ds-entity-picker--open': this.isOpen(),
    'ds-entity-picker--disabled': this.isDisabled(),
    'ds-entity-picker--error': !!this.error(),
    'ds-entity-picker--multiple': this.multiple(),
    [`ds-entity-picker--${this.size()}`]: true,
  }));

  /** Classes de l'input */
  protected readonly inputClasses = computed(() => ({
    'ds-entity-picker__input': true,
    'ds-entity-picker__input--has-value': this.multiple()
      ? this.selectedOptions().length > 0
      : !!this.internalValue(),
  }));

  /** ID unique pour le listbox */
  protected readonly listboxId = computed(() => `${this.name() || 'entity-picker'}-listbox`);

  /** ID unique pour l'input */
  protected readonly inputId = computed(() => `${this.name() || 'entity-picker'}-input`);

  /** Texte du compteur (mode count) */
  protected readonly countText = computed(() => {
    const count = this.selectedOptions().length;
    if (count === 0) return '';
    return `${count} sélectionné${count > 1 ? 's' : ''}`;
  });

  /** Limite de sélection atteinte */
  protected readonly maxReached = computed(() => {
    const max = this.maxSelections();
    if (max === undefined) return false;
    return this.selectedOptions().length >= max;
  });

  /** Texte formaté pour l'option de création */
  protected readonly formattedCreateText = computed(() => {
    return this.createText().replace('{query}', this.searchQuery());
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // ControlValueAccessor
  // ─────────────────────────────────────────────────────────────────────────────

  writeValue(value: string | string[] | null): void {
    this.internalValue.set(value);
  }

  registerOnChange(fn: (value: string | string[] | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Public methods
  // ─────────────────────────────────────────────────────────────────────────────

  onInputFocus(): void {
    if (this.isDisabled()) return;
    this.open();
  }

  onInputBlur(): void {
    this.onTouched();
    // Fermeture retardée pour permettre le clic sur une option
    setTimeout(() => {
      if (!this.isOpen()) return;
      this.close();
    }, 200);
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
    this.searchChange.emit(input.value);
    this.focusedIndex.set(0);

    if (!this.isOpen() && input.value.length >= this.minChars()) {
      this.open();
    }
  }

  open(): void {
    if (this.isDisabled() || this.isOpen()) return;
    this.isOpen.set(true);
    this.focusedIndex.set(0);
    this.opened.emit();
  }

  close(): void {
    if (!this.isOpen()) return;
    this.isOpen.set(false);
    this.searchQuery.set('');
    this.focusedIndex.set(-1);
    this.closed.emit();
  }

  selectOption(option: DsEntityOption): void {
    if (option.disabled || this.isDisabled()) return;

    if (this.multiple()) {
      // Mode multi-sélection
      const current = (this.internalValue() as string[]) || [];
      const newValues = [...current, option.value];

      this.internalValue.set(newValues);
      this.onChange(newValues);

      // Émettre les options complètes
      const selectedOpts = this.options().filter(o => newValues.includes(o.value));
      this.selectionChange.emit(selectedOpts);

      // Reset recherche mais garde le panel ouvert
      this.searchQuery.set('');
      this.inputElement?.nativeElement?.focus();
    } else {
      // Mode sélection simple
      this.internalValue.set(option.value);
      this.onChange(option.value);
      this.selectionChange.emit(option);
      this.close();
    }
  }

  removeOption(option: DsEntityOption): void {
    if (!this.multiple() || this.isDisabled()) return;

    const current = (this.internalValue() as string[]) || [];
    const newValues = current.filter(v => v !== option.value);

    this.internalValue.set(newValues.length > 0 ? newValues : null);
    this.onChange(newValues.length > 0 ? newValues : null);

    const selectedOpts = this.options().filter(o => newValues.includes(o.value));
    this.selectionChange.emit(selectedOpts.length > 0 ? selectedOpts : null);
  }

  clear(event?: Event): void {
    event?.stopPropagation();
    event?.preventDefault();

    if (this.isDisabled()) return;

    this.internalValue.set(this.multiple() ? [] : null);
    this.onChange(this.multiple() ? [] : null);
    this.selectionChange.emit(null);
    this.searchQuery.set('');
    this.inputElement?.nativeElement?.focus();
  }

  requestCreate(): void {
    if (!this.canCreate()) return;

    const value = this.searchQuery().trim();
    this.createRequested.emit(value);
    this.searchQuery.set('');
    this.close();
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Keyboard navigation
  // ─────────────────────────────────────────────────────────────────────────────

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.isDisabled()) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) {
          this.open();
        } else {
          this.moveFocus(1);
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (this.isOpen()) {
          this.moveFocus(-1);
        }
        break;

      case 'Enter':
        if (this.isOpen()) {
          event.preventDefault();
          const idx = this.focusedIndex();
          const options = this.filteredOptions();

          if (idx >= 0 && options[idx] && !options[idx].disabled) {
            this.selectOption(options[idx]);
          } else if (this.canCreate()) {
            this.requestCreate();
          }
        }
        break;

      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.close();
        }
        break;

      case 'Backspace':
        // Supprimer le dernier chip si l'input est vide en mode multi
        if (this.multiple() && !this.searchQuery()) {
          const selected = this.selectedOptions();
          if (selected.length > 0) {
            this.removeOption(selected[selected.length - 1]);
          }
        }
        break;

      case 'Tab':
        if (this.isOpen()) {
          this.close();
        }
        break;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Click outside
  // ─────────────────────────────────────────────────────────────────────────────

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.ds-entity-picker')) {
      this.close();
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Helpers
  // ─────────────────────────────────────────────────────────────────────────────

  private moveFocus(delta: number): void {
    const options = this.filteredOptions();
    const canCreateOpt = this.canCreate() ? 1 : 0;
    const total = options.length + canCreateOpt;

    if (total === 0) return;

    let newIndex = this.focusedIndex() + delta;

    // Wrap around
    if (newIndex < 0) newIndex = total - 1;
    if (newIndex >= total) newIndex = 0;

    // Skip disabled options
    let attempts = 0;
    while (newIndex < options.length && options[newIndex]?.disabled && attempts < total) {
      newIndex += delta;
      if (newIndex < 0) newIndex = total - 1;
      if (newIndex >= total) newIndex = 0;
      attempts++;
    }

    this.focusedIndex.set(newIndex);
    this.scrollFocusedOptionIntoView();
  }

  private scrollFocusedOptionIntoView(): void {
    const index = this.focusedIndex();
    if (index < 0) return;

    const optionId = this.getOptionId(index);
    const optionElement = document.getElementById(optionId);

    if (optionElement) {
      optionElement.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }

  protected isOptionFocused(index: number): boolean {
    return this.focusedIndex() === index;
  }

  protected isOptionSelected(option: DsEntityOption): boolean {
    const value = this.internalValue();
    if (value === null) return false;

    if (this.multiple()) {
      return (value as string[]).includes(option.value);
    }
    return value === option.value;
  }

  protected getOptionId(index: number): string {
    return `${this.name() || 'entity-picker'}-option-${index}`;
  }

  protected isCreateFocused(): boolean {
    return this.canCreate() && this.focusedIndex() === this.filteredOptions().length;
  }

  protected trackOption(_: number, option: DsEntityOption): string {
    return option.value;
  }
}
