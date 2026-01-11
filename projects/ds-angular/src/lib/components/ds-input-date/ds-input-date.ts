import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  signal,
  forwardRef,
  effect,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendar, faTimes, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import { DsDatePicker } from '../ds-date-picker/ds-date-picker';

export type InputDateSize = 'sm' | 'md' | 'lg';

export interface DateParseResult {
  valid: boolean;
  date: Date | null;
  error?: 'invalid_format' | 'invalid_date' | 'out_of_range';
}

/** Positions pour le popup overlay */
const INPUT_DATE_POSITIONS: ConnectedPosition[] = [
  {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
    offsetY: 4,
  },
  {
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
    offsetY: -4,
  },
  {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'top',
    offsetY: 4,
  },
  {
    originX: 'end',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'bottom',
    offsetY: -4,
  },
];

/**
 * Parse une chaîne de date au format dd/MM/yyyy, dd-MM-yyyy, dd.MM.yyyy ou dd MM yyyy
 */
function parseDate(input: string): DateParseResult {
  if (!input || !input.trim()) {
    return { valid: true, date: null };
  }

  const trimmed = input.trim();

  // Regex multi-format: dd/MM/yyyy, dd-MM-yyyy, dd.MM.yyyy, dd MM yyyy
  const regex = /^(\d{1,2})[\/\-\.\s](\d{1,2})[\/\-\.\s](\d{4})$/;
  const match = trimmed.match(regex);

  if (!match) {
    return { valid: false, date: null, error: 'invalid_format' };
  }

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);

  // Validation des valeurs
  if (month < 1 || month > 12) {
    return { valid: false, date: null, error: 'invalid_date' };
  }

  if (day < 1 || day > 31) {
    return { valid: false, date: null, error: 'invalid_date' };
  }

  // Créer la date en heure locale (pas UTC)
  const date = new Date(year, month - 1, day, 0, 0, 0, 0);

  // Vérifier que la date est valide (ex: 31/02 créera une date en mars)
  if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
    return { valid: false, date: null, error: 'invalid_date' };
  }

  return { valid: true, date };
}

/**
 * Formate une date au format dd/MM/yyyy
 */
function formatDate(date: Date | null): string {
  if (!date) return '';

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

/**
 * DsInputDate - Composant de saisie de date avec calendrier popup
 *
 * @description
 * Input textuel avec icône calendrier et popup DsDatePicker pour la sélection
 * de date dans les formulaires. Supporte la saisie manuelle et les contraintes min/max.
 *
 * @example
 * ```html
 * <ds-input-date
 *   [(ngModel)]="selectedDate"
 *   label="Date de naissance"
 *   placeholder="jj/mm/aaaa">
 * </ds-input-date>
 * ```
 */
@Component({
  selector: 'ds-input-date',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    CdkConnectedOverlay,
    CdkOverlayOrigin,
    DsDatePicker,
  ],
  templateUrl: './ds-input-date.html',
  styleUrl: './ds-input-date.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsInputDate),
      multi: true,
    },
  ],
})
export class DsInputDate implements ControlValueAccessor {
  // ViewChild - référence à l'élément input pour le focus
  @ViewChild('inputElement') inputElementRef?: ElementRef<HTMLInputElement>;

  // Inputs
  readonly value = input<Date | null>(null);
  readonly size = input<InputDateSize>('md');
  readonly disabled = input(false);
  readonly readonly = input(false);
  readonly placeholder = input('dd/mm/yyyy');
  readonly label = input<string | undefined>(undefined);
  readonly error = input<string | undefined>(undefined);
  readonly helper = input<string | undefined>(undefined);
  readonly minDate = input<Date | null>(null);
  readonly maxDate = input<Date | null>(null);
  readonly clearable = input(true);

  // Outputs
  readonly dateChange = output<Date | null>();

  // Icons
  readonly calendarIcon = faCalendar;
  readonly clearIcon = faTimes;
  readonly errorIcon = faExclamationCircle;

  // Overlay positions
  readonly overlayPositions = INPUT_DATE_POSITIONS;

  // Unique ID for aria-controls
  readonly panelId = `ds-input-date-panel-${Math.random().toString(36).substr(2, 9)}`;

  // State
  readonly isOpen = signal(false);
  readonly internalValue = signal<Date | null>(null);
  readonly isFocused = signal(false);
  readonly inputText = signal('');
  readonly hasParseError = signal(false);

  // ControlValueAccessor
  private onChange: (value: Date | null) => void = () => {};
  private onTouched: () => void = () => {};
  private hasExternalValue = signal(false);

  // Computed
  readonly displayValue = computed(() => {
    const text = this.inputText();
    if (text) return text;
    return formatDate(this.internalValue());
  });

  readonly containerClasses = computed(() => {
    const classes = ['ds-input-date'];
    classes.push(`ds-input-date--${this.size()}`);
    if (this.disabled()) classes.push('ds-input-date--disabled');
    if (this.readonly()) classes.push('ds-input-date--readonly');
    if (this.isFocused()) classes.push('ds-input-date--focused');
    if (this.isOpen()) classes.push('ds-input-date--open');
    if (this.inputState() === 'error') classes.push('ds-input-date--error');
    return classes.join(' ');
  });

  readonly isDisabled = computed(() => this.disabled() || this.readonly());

  readonly inputState = computed(() => {
    if (this.hasParseError() || this.error()) return 'error';
    return 'default';
  });

  readonly showClearButton = computed(() => {
    return this.clearable() && this.internalValue() !== null && !this.isDisabled();
  });

  readonly effectiveMinDate = computed(() => {
    const min = this.minDate();
    const max = this.maxDate();
    // Si minDate > maxDate (config invalide), ignorer les contraintes
    if (min && max && min > max) {
      console.warn('[DsInputDate] minDate > maxDate: constraints ignored');
      return null;
    }
    return min;
  });

  readonly effectiveMaxDate = computed(() => {
    const min = this.minDate();
    const max = this.maxDate();
    // Si minDate > maxDate (config invalide), ignorer les contraintes
    if (min && max && min > max) {
      return null;
    }
    return max;
  });

  constructor() {
    // Sync external value with internal
    effect(() => {
      const val = this.value();
      if (!this.hasExternalValue() && val !== this.internalValue()) {
        this.internalValue.set(val);
        this.inputText.set(formatDate(val));
      }
    });
  }

  // ControlValueAccessor implementation
  writeValue(value: Date | null): void {
    this.hasExternalValue.set(true);
    this.internalValue.set(value);
    this.inputText.set(formatDate(value));
    this.hasParseError.set(false);
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Géré par input disabled
  }

  // Event handlers
  toggle(): void {
    if (this.isDisabled()) return;
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  open(): void {
    if (this.isDisabled() || this.isOpen()) return;
    this.isOpen.set(true);
  }

  close(): void {
    if (!this.isOpen()) return;
    this.isOpen.set(false);
  }

  onInputFocus(): void {
    if (!this.disabled()) {
      this.isFocused.set(true);
    }
  }

  onInputBlur(): void {
    this.isFocused.set(false);
    this.onTouched();

    // Parse et valide la saisie
    const text = this.inputText();
    if (!text) {
      // Champ vidé
      if (this.internalValue() !== null) {
        this.updateValue(null);
      }
      this.hasParseError.set(false);
      return;
    }

    const result = parseDate(text);
    if (!result.valid) {
      this.hasParseError.set(true);
      return;
    }

    // Validation des contraintes min/max
    if (result.date) {
      const min = this.effectiveMinDate();
      const max = this.effectiveMaxDate();

      if (min && result.date < min) {
        this.hasParseError.set(true);
        return;
      }

      if (max && result.date > max) {
        this.hasParseError.set(true);
        return;
      }
    }

    this.hasParseError.set(false);
    if (result.date !== this.internalValue()) {
      this.updateValue(result.date);
    }
    // Reformatter la saisie
    this.inputText.set(formatDate(result.date));
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.inputText.set(input.value);
    // Le parsing/validation se fait uniquement au blur
  }

  onInputKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) return;

    switch (event.key) {
      case 'Enter':
      case 'ArrowDown':
        event.preventDefault();
        this.open();
        break;
      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.close();
        }
        break;
    }
  }

  onCalendarIconClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.toggle();
  }

  onDateSelected(date: Date | null): void {
    this.updateValue(date);
    this.inputText.set(formatDate(date));
    this.hasParseError.set(false);
    this.close();
    this.inputElementRef?.nativeElement.focus();
  }

  onBackdropClick(): void {
    this.close();
  }

  onOverlayKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.close();
      this.inputElementRef?.nativeElement.focus();
    }
  }

  clearValue(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.updateValue(null);
    this.inputText.set('');
    this.hasParseError.set(false);
    this.inputElementRef?.nativeElement.focus();
  }

  private updateValue(value: Date | null): void {
    this.hasExternalValue.set(true);
    this.internalValue.set(value);
    this.onChange(value);
    this.dateChange.emit(value);
  }
}
