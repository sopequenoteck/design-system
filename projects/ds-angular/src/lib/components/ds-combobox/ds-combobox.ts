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
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface DsComboboxOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  description?: string;
}

export type DsComboboxSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ds-combobox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ds-combobox.html',
  styleUrls: ['./ds-combobox.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsCombobox),
      multi: true,
    },
  ],
})
export class DsCombobox implements ControlValueAccessor {
  // Inputs
  readonly options = input<DsComboboxOption[]>([]);
  readonly placeholder = input<string>('Rechercher...');
  readonly size = input<DsComboboxSize>('md');
  readonly disabled = input<boolean>(false);
  readonly error = input<string>('');
  readonly helper = input<string>('');
  readonly label = input<string>('');
  readonly name = input<string>('');
  readonly required = input<boolean>(false);
  readonly clearable = input<boolean>(true);
  readonly allowCustom = input<boolean>(false);
  readonly minChars = input<number>(0);
  readonly maxResults = input<number>(50);
  readonly noResultsText = input<string>('Aucun résultat');
  readonly loadingText = input<string>('Chargement...');
  readonly loading = input<boolean>(false);

  // Outputs
  readonly selectionChange = output<DsComboboxOption | null>();
  readonly inputChange = output<string>();
  readonly opened = output<void>();
  readonly closed = output<void>();

  // Internal state
  protected readonly isOpen = signal(false);
  protected readonly inputValue = signal('');
  protected readonly focusedIndex = signal(-1);
  private readonly internalValue = signal<string | number | null>(null);
  private readonly cvaDisabled = signal(false);

  @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;
  @ViewChild('listbox') listbox!: ElementRef<HTMLUListElement>;

  private onChange: (value: string | number | null) => void = () => {};
  private onTouched: () => void = () => {};

  // Computed
  protected readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled());

  protected readonly selectedOption = computed(() => {
    const value = this.internalValue();
    if (value === null) return null;
    return this.options().find(opt => opt.value === value) || null;
  });

  protected readonly filteredOptions = computed(() => {
    const query = this.inputValue().toLowerCase();
    const minLength = this.minChars();

    if (query.length < minLength) return [];

    let results = this.options().filter(opt =>
      opt.label.toLowerCase().includes(query) ||
      (opt.description && opt.description.toLowerCase().includes(query))
    );

    return results.slice(0, this.maxResults());
  });

  protected readonly shouldShowDropdown = computed(() => {
    if (!this.isOpen()) return false;
    if (this.loading()) return true;
    if (this.inputValue().length < this.minChars()) return false;
    return this.filteredOptions().length > 0 || this.inputValue().length >= this.minChars();
  });

  protected readonly containerClasses = computed(() => ({
    'ds-combobox': true,
    'ds-combobox--open': this.isOpen(),
    'ds-combobox--disabled': this.isDisabled(),
    'ds-combobox--error': !!this.error(),
    [`ds-combobox--${this.size()}`]: true,
  }));

  protected readonly inputClasses = computed(() => ({
    'ds-combobox__input': true,
    'ds-combobox__input--has-value': !!this.inputValue(),
  }));

  // ControlValueAccessor
  writeValue(value: string | number | null): void {
    this.internalValue.set(value);
    const option = this.options().find(opt => opt.value === value);
    if (option) {
      this.inputValue.set(option.label);
    } else if (value === null) {
      this.inputValue.set('');
    }
  }

  registerOnChange(fn: (value: string | number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }

  // Methods
  onInputFocus(): void {
    if (this.isDisabled()) return;
    this.open();
  }

  onInputBlur(): void {
    this.onTouched();
    // Delayed close to allow click on option
    setTimeout(() => {
      if (!this.isOpen()) return;
      this.close();

      // If no valid selection, handle based on allowCustom
      const selected = this.selectedOption();
      if (!selected && !this.allowCustom()) {
        this.inputValue.set('');
        this.internalValue.set(null);
        this.onChange(null);
      } else if (!selected && this.allowCustom() && this.inputValue()) {
        // Allow custom value
        const customValue = this.inputValue();
        this.internalValue.set(customValue);
        this.onChange(customValue);
      }
    }, 200);
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.inputValue.set(input.value);
    this.inputChange.emit(input.value);
    this.focusedIndex.set(-1);

    if (!this.isOpen() && input.value.length >= this.minChars()) {
      this.open();
    }
  }

  open(): void {
    if (this.isDisabled() || this.isOpen()) return;
    this.isOpen.set(true);
    this.opened.emit();
  }

  close(): void {
    if (!this.isOpen()) return;
    this.isOpen.set(false);
    this.focusedIndex.set(-1);
    this.closed.emit();
  }

  selectOption(option: DsComboboxOption): void {
    if (option.disabled) return;

    this.internalValue.set(option.value);
    this.inputValue.set(option.label);
    this.onChange(option.value);
    this.selectionChange.emit(option);
    this.close();
  }

  clear(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.inputValue.set('');
    this.internalValue.set(null);
    this.onChange(null);
    this.selectionChange.emit(null);
    this.inputElement?.nativeElement?.focus();
  }

  // Keyboard navigation
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
        if (this.isOpen() && this.focusedIndex() >= 0) {
          event.preventDefault();
          const option = this.filteredOptions()[this.focusedIndex()];
          if (option && !option.disabled) {
            this.selectOption(option);
          }
        }
        break;

      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.close();
        }
        break;

      case 'Tab':
        if (this.isOpen()) {
          this.close();
        }
        break;
    }
  }

  // Helpers
  private moveFocus(delta: number): void {
    const options = this.filteredOptions();
    if (options.length === 0) return;

    let newIndex = this.focusedIndex() + delta;

    // Wrap around
    if (newIndex < 0) newIndex = options.length - 1;
    if (newIndex >= options.length) newIndex = 0;

    // Skip disabled options
    let attempts = 0;
    while (options[newIndex]?.disabled && attempts < options.length) {
      newIndex += delta;
      if (newIndex < 0) newIndex = options.length - 1;
      if (newIndex >= options.length) newIndex = 0;
      attempts++;
    }

    this.focusedIndex.set(newIndex);
  }

  protected isOptionFocused(index: number): boolean {
    return this.focusedIndex() === index;
  }

  protected isOptionSelected(option: DsComboboxOption): boolean {
    return option.value === this.internalValue();
  }

  protected getOptionId(index: number): string {
    return `${this.name() || 'combobox'}-option-${index}`;
  }

  protected readonly listboxId = computed(() => `${this.name() || 'combobox'}-listbox`);
  protected readonly inputId = computed(() => `${this.name() || 'combobox'}-input`);
}
