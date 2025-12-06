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

export interface DsSelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export type DsSelectSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ds-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ds-select.html',
  styleUrls: ['./ds-select.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsSelect),
      multi: true,
    },
  ],
})
export class DsSelect implements ControlValueAccessor {
  // Inputs
  readonly options = input<DsSelectOption[]>([]);
  readonly placeholder = input<string>('Sélectionner...');
  readonly size = input<DsSelectSize>('md');
  readonly disabled = input<boolean>(false);
  readonly error = input<string>('');
  readonly helper = input<string>('');
  readonly label = input<string>('');
  readonly name = input<string>('');
  readonly required = input<boolean>(false);
  readonly clearable = input<boolean>(false);
  readonly searchable = input<boolean>(false);

  // Outputs
  readonly selectionChange = output<DsSelectOption | null>();
  readonly opened = output<void>();
  readonly closed = output<void>();

  // Internal state
  protected readonly isOpen = signal(false);
  protected readonly searchQuery = signal('');
  protected readonly focusedIndex = signal(-1);
  private readonly internalValue = signal<string | number | null>(null);
  private readonly cvaDisabled = signal(false);

  @ViewChild('selectTrigger') selectTrigger!: ElementRef<HTMLButtonElement>;
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
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

  protected readonly displayValue = computed(() => {
    const selected = this.selectedOption();
    return selected ? selected.label : this.placeholder();
  });

  protected readonly filteredOptions = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.options();
    return this.options().filter(opt =>
      opt.label.toLowerCase().includes(query)
    );
  });

  protected readonly containerClasses = computed(() => ({
    'ds-select': true,
    'ds-select--open': this.isOpen(),
    'ds-select--disabled': this.isDisabled(),
    'ds-select--error': !!this.error(),
    [`ds-select--${this.size()}`]: true,
  }));

  protected readonly triggerClasses = computed(() => ({
    'ds-select__trigger': true,
    'ds-select__trigger--placeholder': !this.selectedOption(),
  }));

  // ControlValueAccessor
  writeValue(value: string | number | null): void {
    this.internalValue.set(value);
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

  // Public methods
  toggle(): void {
    if (this.isDisabled()) return;
    this.isOpen() ? this.close() : this.open();
  }

  open(): void {
    if (this.isDisabled() || this.isOpen()) return;
    this.isOpen.set(true);
    this.focusedIndex.set(this.getSelectedIndex());
    this.opened.emit();

    if (this.searchable()) {
      setTimeout(() => this.searchInput?.nativeElement?.focus(), 0);
    }
  }

  close(): void {
    if (!this.isOpen()) return;
    this.isOpen.set(false);
    this.searchQuery.set('');
    this.focusedIndex.set(-1);
    this.closed.emit();
    this.onTouched();
  }

  selectOption(option: DsSelectOption): void {
    if (option.disabled) return;

    this.internalValue.set(option.value);
    this.onChange(option.value);
    this.selectionChange.emit(option);
    this.close();
  }

  clear(event: Event): void {
    event.stopPropagation();
    this.internalValue.set(null);
    this.onChange(null);
    this.selectionChange.emit(null);
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
    this.focusedIndex.set(0);
  }

  // Keyboard navigation
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.isDisabled()) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        if (!this.isOpen()) {
          event.preventDefault();
          this.open();
        } else if (this.focusedIndex() >= 0) {
          event.preventDefault();
          const option = this.filteredOptions()[this.focusedIndex()];
          if (option && !option.disabled) {
            this.selectOption(option);
          }
        }
        break;

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

      case 'Home':
        if (this.isOpen()) {
          event.preventDefault();
          this.focusedIndex.set(0);
        }
        break;

      case 'End':
        if (this.isOpen()) {
          event.preventDefault();
          this.focusedIndex.set(this.filteredOptions().length - 1);
        }
        break;

      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.close();
          this.selectTrigger?.nativeElement?.focus();
        }
        break;

      case 'Tab':
        if (this.isOpen()) {
          this.close();
        }
        break;
    }
  }

  // Click outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.ds-select')) {
      this.close();
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

  private getSelectedIndex(): number {
    const value = this.internalValue();
    if (value === null) return 0;
    return this.options().findIndex(opt => opt.value === value);
  }

  protected isOptionFocused(index: number): boolean {
    return this.focusedIndex() === index;
  }

  protected isOptionSelected(option: DsSelectOption): boolean {
    return option.value === this.internalValue();
  }

  protected getOptionId(index: number): string {
    return `${this.name() || 'select'}-option-${index}`;
  }

  protected readonly listboxId = computed(() => `${this.name() || 'select'}-listbox`);
}
