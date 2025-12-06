import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  signal,
  forwardRef,
  OnDestroy,
  ElementRef,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';

export type SearchInputSize = 'sm' | 'md' | 'lg';

/**
 * DsSearchInput - Composant de recherche avec debounce
 *
 * @description
 * Input de recherche avec icône, bouton clear, debounce configurable
 * et intégration formulaires via ControlValueAccessor.
 *
 * @example
 * ```html
 * <ds-search-input
 *   placeholder="Rechercher..."
 *   [debounceTime]="300"
 *   (search)="onSearch($event)">
 * </ds-search-input>
 * ```
 */
@Component({
  selector: 'ds-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  template: `
    <div [class]="containerClasses()">
      <fa-icon
        class="ds-search-input__icon ds-search-input__icon--search"
        [icon]="searchIcon"
        aria-hidden="true">
      </fa-icon>

      <input
        #inputRef
        type="text"
        class="ds-search-input__input"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [attr.aria-label]="ariaLabel() || placeholder()"
        [attr.aria-describedby]="ariaDescribedBy()"
        [ngModel]="internalValue()"
        (ngModelChange)="onInputChange($event)"
        (keydown.enter)="onEnter()"
        (keydown.escape)="onClear()"
      />

      @if (loading()) {
        <fa-icon
          class="ds-search-input__icon ds-search-input__icon--loading ds-search-input__icon--spin"
          [icon]="spinnerIcon"
          aria-hidden="true">
        </fa-icon>
      } @else if (showClearButton()) {
        <button
          type="button"
          class="ds-search-input__clear"
          [attr.aria-label]="clearLabel()"
          (click)="onClear()">
          <fa-icon [icon]="clearIcon" aria-hidden="true"></fa-icon>
        </button>
      }
    </div>
  `,
  styleUrls: ['./ds-search-input.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsSearchInput),
      multi: true,
    },
  ],
})
export class DsSearchInput implements ControlValueAccessor, OnDestroy {
  /** Taille du composant */
  readonly size = input<SearchInputSize>('md');

  /** Placeholder du champ */
  readonly placeholder = input<string>('Rechercher...');

  /** Délai de debounce en ms */
  readonly debounceMs = input<number>(300);

  /** État désactivé */
  readonly disabled = input<boolean>(false);

  /** État de chargement */
  readonly loading = input<boolean>(false);

  /** Afficher le bouton clear */
  readonly clearable = input<boolean>(true);

  /** Caractères minimum avant recherche */
  readonly minChars = input<number>(0);

  /** Label du bouton clear */
  readonly clearLabel = input<string>('Effacer la recherche');

  /** Label ARIA */
  readonly ariaLabel = input<string>('');

  /** ID de l'élément décrit par ce champ */
  readonly ariaDescribedBy = input<string>('');

  /** Événement de recherche (après debounce) */
  readonly search = output<string>();

  /** Événement de recherche immédiate (touche Entrée) */
  readonly searchImmediate = output<string>();

  /** Événement d'effacement */
  readonly cleared = output<void>();

  /** Référence à l'input */
  private readonly inputRef = viewChild<ElementRef<HTMLInputElement>>('inputRef');

  /** Icônes */
  readonly searchIcon = faSearch;
  readonly clearIcon = faXmark;
  readonly spinnerIcon = faSpinner;

  /** Valeur interne (signal pour réactivité) */
  readonly internalValue = signal('');

  /** Subject pour debounce */
  private readonly searchSubject = new Subject<string>();
  private readonly destroy$ = new Subject<void>();

  /** Callbacks CVA */
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  readonly containerClasses = computed(() => {
    const classes = ['ds-search-input'];
    classes.push(`ds-search-input--${this.size()}`);

    if (this.disabled()) {
      classes.push('ds-search-input--disabled');
    }

    if (this.loading()) {
      classes.push('ds-search-input--loading');
    }

    return classes.join(' ');
  });

  readonly showClearButton = computed(() => {
    return this.clearable() && this.internalValue().length > 0 && !this.disabled();
  });

  constructor() {
    this.searchSubject
      .pipe(
        debounceTime(this.debounceMs()),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        if (value.length >= this.minChars()) {
          this.search.emit(value);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onInputChange(value: string): void {
    this.internalValue.set(value);
    this.onChange(value);
    this.searchSubject.next(value);
  }

  onClear(): void {
    this.internalValue.set('');
    // Force la valeur de l'input natif pour synchronisation immédiate
    const input = this.inputRef();
    if (input) {
      input.nativeElement.value = '';
    }
    this.onChange('');
    this.search.emit('');
    this.cleared.emit();
    this.focus();
  }

  onEnter(): void {
    if (this.internalValue().length >= this.minChars()) {
      this.searchImmediate.emit(this.internalValue());
    }
  }

  /** Focus sur l'input */
  focus(): void {
    const input = this.inputRef();
    if (input) {
      input.nativeElement.focus();
    }
  }

  /** Sélectionner tout le texte */
  selectAll(): void {
    const input = this.inputRef();
    if (input) {
      input.nativeElement.select();
    }
  }

  // === ControlValueAccessor ===

  writeValue(value: string): void {
    this.internalValue.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Le disabled est géré via l'input signal
  }
}
