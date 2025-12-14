import { Component, forwardRef, input, output, signal, computed, effect, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { generateId } from '../../utils/id-generator';

export type InputNumberSize = 'sm' | 'md' | 'lg';
export type InputNumberControlsPosition = 'both' | 'right';

@Component({
  selector: 'ds-input-number',
  imports: [CommonModule, FaIconComponent],
  templateUrl: './ds-input-number.html',
  styleUrl: './ds-input-number.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsInputNumber),
      multi: true,
    },
  ],
})
export class DsInputNumber implements ControlValueAccessor {
  // Config
  min = input<number>(-Infinity);
  max = input<number>(Infinity);
  step = input<number>(1);
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  required = input<boolean>(false);
  size = input<InputNumberSize>('md');
  placeholder = input<string>('');
  prefix = input<string | undefined>(undefined);
  suffix = input<string | undefined>(undefined);
  precision = input<number>(0);
  controls = input<boolean>(true);
  controlsPosition = input<InputNumberControlsPosition>('both');

  // Accessibility
  ariaLabel = input<string | undefined>(undefined);
  id = input<string>(generateId());
  name = input<string | undefined>(undefined);

  // Events
  valueChange = output<number>();

  // ViewChild
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef<HTMLInputElement>;

  // Icons
  readonly faMinus = faMinus;
  readonly faPlus = faPlus;

  // Internal state
  private readonly disabledState = signal<boolean>(false);
  readonly internalValue = signal<number | null>(null);
  readonly focused = signal<boolean>(false);
  readonly displayValue = signal<string>('');

  constructor() {
    // Effect pour formater l'affichage
    effect(() => {
      const val = this.internalValue();
      if (val === null) {
        this.displayValue.set('');
        return;
      }
      const formatted = this.formatValue(val);
      this.displayValue.set(formatted);
    });
  }

  readonly isDisabled = computed<boolean>(() => this.disabled() || this.disabledState());
  readonly isReadonly = computed<boolean>(() => this.readonly());
  readonly showControls = computed<boolean>(() => this.controls() && !this.isDisabled() && !this.isReadonly());
  readonly controlsOnRight = computed<boolean>(() => this.controlsPosition() === 'right');
  readonly controlsOnBoth = computed<boolean>(() => this.controlsPosition() === 'both');

  readonly containerClasses = computed<string>(() => {
    const classes: string[] = ['ds-input-number'];
    classes.push(`ds-input-number--${this.size()}`);
    if (this.isDisabled()) classes.push('ds-input-number--disabled');
    if (this.isReadonly()) classes.push('ds-input-number--readonly');
    if (this.focused()) classes.push('ds-input-number--focused');
    if (this.controlsOnRight()) classes.push('ds-input-number--controls-right');
    if (this.controlsOnBoth()) classes.push('ds-input-number--controls-both');
    if (this.prefix()) classes.push('ds-input-number--has-prefix');
    if (this.suffix()) classes.push('ds-input-number--has-suffix');
    return classes.join(' ');
  });

  readonly canDecrement = computed<boolean>(() => {
    if (!this.showControls()) return false;
    const val = this.internalValue();
    if (val === null) return true;
    return val > this.min();
  });

  readonly canIncrement = computed<boolean>(() => {
    if (!this.showControls()) return false;
    const val = this.internalValue();
    if (val === null) return true;
    return val < this.max();
  });

  // ControlValueAccessor
  private onChange: (value: number | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: number | null): void {
    this.internalValue.set(value);
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledState.set(isDisabled);
  }

  // Helpers
  private formatValue(value: number): string {
    const prec = this.precision();
    return prec > 0 ? value.toFixed(prec) : Math.round(value).toString();
  }

  private parseValue(input: string): number | null {
    if (input === '' || input === '-') return null;
    const parsed = parseFloat(input);
    if (isNaN(parsed)) return null;
    return parsed;
  }

  private clampValue(value: number): number {
    return Math.max(this.min(), Math.min(this.max(), value));
  }

  private roundToPrecision(value: number): number {
    const prec = this.precision();
    if (prec === 0) return Math.round(value);
    const multiplier = Math.pow(10, prec);
    return Math.round(value * multiplier) / multiplier;
  }

  private emitValue(value: number | null): void {
    this.onChange(value);
    if (value !== null) {
      this.valueChange.emit(value);
    }
  }

  // Event handlers
  onInputChange(event: Event): void {
    if (this.isDisabled() || this.isReadonly()) return;

    const target = event.target as HTMLInputElement;
    const parsed = this.parseValue(target.value);

    if (parsed === null) {
      this.internalValue.set(null);
      this.emitValue(null);
      return;
    }

    const clamped = this.clampValue(parsed);
    const rounded = this.roundToPrecision(clamped);
    this.internalValue.set(rounded);
    this.emitValue(rounded);
  }

  onInputBlur(): void {
    this.focused.set(false);
    this.onTouched();

    // Formater la valeur au blur
    const val = this.internalValue();
    if (val !== null) {
      const clamped = this.clampValue(val);
      const rounded = this.roundToPrecision(clamped);
      if (rounded !== val) {
        this.internalValue.set(rounded);
        this.emitValue(rounded);
      }
    }
  }

  onInputFocus(): void {
    this.focused.set(true);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.isDisabled() || this.isReadonly()) return;

    const stepVal = this.step();
    let handled = false;

    switch (event.key) {
      case 'ArrowUp':
        this.increment();
        handled = true;
        break;
      case 'ArrowDown':
        this.decrement();
        handled = true;
        break;
      case 'Home':
        this.setToMin();
        handled = true;
        break;
      case 'End':
        this.setToMax();
        handled = true;
        break;
      case 'PageUp':
        this.incrementBy(stepVal * 10);
        handled = true;
        break;
      case 'PageDown':
        this.decrementBy(stepVal * 10);
        handled = true;
        break;
    }

    if (handled) {
      event.preventDefault();
    }
  }

  increment(): void {
    if (!this.canIncrement()) return;
    this.incrementBy(this.step());
  }

  decrement(): void {
    if (!this.canDecrement()) return;
    this.decrementBy(this.step());
  }

  private incrementBy(delta: number): void {
    const current = this.internalValue() ?? this.min();
    const newValue = this.clampValue(this.roundToPrecision(current + delta));
    this.internalValue.set(newValue);
    this.emitValue(newValue);
    this.inputElement?.nativeElement.focus();
  }

  private decrementBy(delta: number): void {
    const current = this.internalValue() ?? this.max();
    const newValue = this.clampValue(this.roundToPrecision(current - delta));
    this.internalValue.set(newValue);
    this.emitValue(newValue);
    this.inputElement?.nativeElement.focus();
  }

  private setToMin(): void {
    const newValue = this.min();
    this.internalValue.set(newValue);
    this.emitValue(newValue);
  }

  private setToMax(): void {
    const newValue = this.max();
    this.internalValue.set(newValue);
    this.emitValue(newValue);
  }

  // ARIA helpers
  readonly ariaValueMin = computed<number>(() => this.min());
  readonly ariaValueMax = computed<number>(() => this.max());
  readonly ariaValueNow = computed<number | undefined>(() => this.internalValue() ?? undefined);
  readonly ariaValueText = computed<string | undefined>(() => {
    const val = this.internalValue();
    if (val === null) return undefined;
    const prefixStr = this.prefix() ?? '';
    const suffixStr = this.suffix() ?? '';
    return `${prefixStr}${this.formatValue(val)}${suffixStr}`;
  });
}
