import { Component, forwardRef, input, output, signal, computed, effect, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

export type SliderSize = 'sm' | 'md' | 'lg';
export type SliderValue = number | [number, number];
export type SliderOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'ds-slider',
  imports: [CommonModule],
  templateUrl: './ds-slider.html',
  styleUrl: './ds-slider.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsSlider),
      multi: true,
    },
  ],
})
export class DsSlider implements ControlValueAccessor {
  // Config
  min = input<number>(0);
  max = input<number>(100);
  step = input<number>(1);
  disabled = input<boolean>(false);
  size = input<SliderSize>('md');
  range = input<boolean>(false);
  orientation = input<SliderOrientation>('horizontal');

  // Display
  showLabels = input<boolean>(false);
  showTicks = input<boolean>(false);
  tickInterval = input<number | undefined>(undefined);
  formatLabel = input<((value: number) => string) | undefined>(undefined);

  // Events
  valueChange = output<SliderValue>();

  // ViewChild
  @ViewChild('track', { static: false }) trackElement?: ElementRef<HTMLDivElement>;
  @ViewChild('thumb1', { static: false }) thumb1Element?: ElementRef<HTMLDivElement>;
  @ViewChild('thumb2', { static: false }) thumb2Element?: ElementRef<HTMLDivElement>;

  // Internal state
  private readonly disabledState = signal<boolean>(false);
  readonly internalValue = signal<SliderValue>(0);
  readonly dragging = signal<number | null>(null); // null, 0 (first thumb), 1 (second thumb)
  readonly focusedThumb = signal<number>(0); // 0 or 1

  constructor() {
    // Effect pour synchroniser la valeur initiale
    effect(() => {
      const currentValue = this.internalValue();
      const isRange = this.range();
      const minVal = this.min();

      // Initialisation par défaut
      if (typeof currentValue === 'number' && isRange) {
        this.internalValue.set([minVal, currentValue]);
      } else if (Array.isArray(currentValue) && !isRange) {
        this.internalValue.set(currentValue[0]);
      }
    });
  }

  readonly isDisabled = computed<boolean>(() => this.disabled() || this.disabledState());
  readonly isRange = computed<boolean>(() => this.range());
  readonly isVertical = computed<boolean>(() => this.orientation() === 'vertical');

  readonly containerClasses = computed<string>(() => {
    const classes: string[] = ['ds-slider'];
    classes.push(`ds-slider--${this.size()}`);
    if (this.isDisabled()) classes.push('ds-slider--disabled');
    if (this.isVertical()) classes.push('ds-slider--vertical');
    return classes.join(' ');
  });

  readonly value1 = computed<number>(() => {
    const val = this.internalValue();
    return Array.isArray(val) ? val[0] : val;
  });

  readonly value2 = computed<number>(() => {
    const val = this.internalValue();
    return Array.isArray(val) ? val[1] : this.max();
  });

  readonly percentage1 = computed<number>(() => {
    return this.valueToPercentage(this.value1());
  });

  readonly percentage2 = computed<number>(() => {
    return this.valueToPercentage(this.value2());
  });

  readonly thumb1Style = computed(() => {
    if (this.isVertical()) {
      return { bottom: `${this.percentage1()}%` };
    }
    return { left: `${this.percentage1()}%` };
  });

  readonly thumb2Style = computed(() => {
    if (!this.isRange()) return {};
    if (this.isVertical()) {
      return { bottom: `${this.percentage2()}%` };
    }
    return { left: `${this.percentage2()}%` };
  });

  readonly fillStyle = computed(() => {
    const p1 = this.percentage1();
    const p2 = this.percentage2();

    if (this.isVertical()) {
      if (this.isRange()) {
        return {
          bottom: `${p1}%`,
          height: `${p2 - p1}%`,
        };
      }
      return {
        bottom: '0%',
        height: `${p1}%`,
      };
    }

    if (this.isRange()) {
      return {
        left: `${p1}%`,
        width: `${p2 - p1}%`,
      };
    }
    return {
      left: '0%',
      width: `${p1}%`,
    };
  });

  readonly ticks = computed<number[]>(() => {
    if (!this.showTicks()) return [];

    const interval = this.tickInterval() ?? this.step();
    const minVal = this.min();
    const maxVal = this.max();
    const ticks: number[] = [];

    for (let val = minVal; val <= maxVal; val += interval) {
      ticks.push(val);
    }

    return ticks;
  });

  readonly label1 = computed<string>(() => {
    const formatter = this.formatLabel();
    const val = this.value1();
    return formatter ? formatter(val) : val.toString();
  });

  readonly label2 = computed<string>(() => {
    if (!this.isRange()) return '';
    const formatter = this.formatLabel();
    const val = this.value2();
    return formatter ? formatter(val) : val.toString();
  });

  // ControlValueAccessor
  private onChange: (value: SliderValue) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: SliderValue | null): void {
    if (value === null) {
      this.internalValue.set(this.range() ? [this.min(), this.max()] : this.min());
      return;
    }
    this.internalValue.set(value);
  }

  registerOnChange(fn: (value: SliderValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledState.set(isDisabled);
  }

  // Helpers
  private valueToPercentage(value: number): number {
    const minVal = this.min();
    const maxVal = this.max();
    return ((value - minVal) / (maxVal - minVal)) * 100;
  }

  private percentageToValue(percentage: number): number {
    const minVal = this.min();
    const maxVal = this.max();
    const stepVal = this.step();
    const rawValue = minVal + (percentage / 100) * (maxVal - minVal);
    const steppedValue = Math.round(rawValue / stepVal) * stepVal;
    return Math.max(minVal, Math.min(maxVal, steppedValue));
  }

  private clampValue(value: number): number {
    return Math.max(this.min(), Math.min(this.max(), value));
  }

  private emitValue(): void {
    const val = this.internalValue();
    this.onChange(val);
    this.valueChange.emit(val);
  }

  // Event handlers - Keyboard
  onKeyDown(event: KeyboardEvent, thumbIndex: number): void {
    if (this.isDisabled()) return;

    const stepVal = this.step();
    const minVal = this.min();
    const maxVal = this.max();
    let handled = true;
    let newValue: number | undefined;

    const currentValue = thumbIndex === 0 ? this.value1() : this.value2();

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = currentValue + stepVal;
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = currentValue - stepVal;
        break;
      case 'Home':
        newValue = minVal;
        break;
      case 'End':
        newValue = maxVal;
        break;
      case 'PageUp':
        newValue = currentValue + stepVal * 10;
        break;
      case 'PageDown':
        newValue = currentValue - stepVal * 10;
        break;
      default:
        handled = false;
    }

    if (!handled || newValue === undefined) return;

    event.preventDefault();
    newValue = this.clampValue(newValue);

    if (this.isRange()) {
      const val = this.internalValue() as [number, number];
      if (thumbIndex === 0) {
        // Thumb 1: ne peut pas dépasser thumb 2
        newValue = Math.min(newValue, val[1]);
        this.internalValue.set([newValue, val[1]]);
      } else {
        // Thumb 2: ne peut pas être inférieur à thumb 1
        newValue = Math.max(newValue, val[0]);
        this.internalValue.set([val[0], newValue]);
      }
    } else {
      this.internalValue.set(newValue);
    }

    this.emitValue();
  }

  // Event handlers - Mouse/Touch
  onTrackClick(event: MouseEvent): void {
    if (this.isDisabled() || !this.trackElement) return;

    const rect = this.trackElement.nativeElement.getBoundingClientRect();
    let percentage: number;

    if (this.isVertical()) {
      percentage = ((rect.bottom - event.clientY) / rect.height) * 100;
    } else {
      percentage = ((event.clientX - rect.left) / rect.width) * 100;
    }

    const newValue = this.percentageToValue(percentage);

    if (this.isRange()) {
      const val = this.internalValue() as [number, number];
      // Détermine quel thumb est le plus proche
      const dist1 = Math.abs(newValue - val[0]);
      const dist2 = Math.abs(newValue - val[1]);

      if (dist1 < dist2) {
        this.internalValue.set([newValue, val[1]]);
        this.focusedThumb.set(0);
      } else {
        this.internalValue.set([val[0], newValue]);
        this.focusedThumb.set(1);
      }
    } else {
      this.internalValue.set(newValue);
    }

    this.emitValue();
    this.onTouched();
  }

  onThumbMouseDown(event: MouseEvent, thumbIndex: number): void {
    if (this.isDisabled()) return;
    event.preventDefault();
    this.dragging.set(thumbIndex);
    this.focusedThumb.set(thumbIndex);

    const moveHandler = (e: MouseEvent) => this.onMouseMove(e);
    const upHandler = () => {
      this.dragging.set(null);
      this.onTouched();
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseup', upHandler);
    };

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);
  }

  private onMouseMove(event: MouseEvent): void {
    const thumbIndex = this.dragging();
    if (thumbIndex === null || !this.trackElement) return;

    const rect = this.trackElement.nativeElement.getBoundingClientRect();
    let percentage: number;

    if (this.isVertical()) {
      percentage = ((rect.bottom - event.clientY) / rect.height) * 100;
    } else {
      percentage = ((event.clientX - rect.left) / rect.width) * 100;
    }

    const newValue = this.percentageToValue(percentage);

    if (this.isRange()) {
      const val = this.internalValue() as [number, number];
      if (thumbIndex === 0) {
        const clamped = Math.min(newValue, val[1]);
        this.internalValue.set([clamped, val[1]]);
      } else {
        const clamped = Math.max(newValue, val[0]);
        this.internalValue.set([val[0], clamped]);
      }
    } else {
      this.internalValue.set(newValue);
    }

    this.emitValue();
  }

  onThumbFocus(thumbIndex: number): void {
    this.focusedThumb.set(thumbIndex);
  }

  onThumbBlur(): void {
    this.onTouched();
  }

  getTickPosition(value: number): number {
    return this.valueToPercentage(value);
  }

  getTickLabel(value: number): string {
    const formatter = this.formatLabel();
    return formatter ? formatter(value) : value.toString();
  }

  // ARIA helpers
  getAriaValueText(thumbIndex: number): string {
    const val = thumbIndex === 0 ? this.value1() : this.value2();
    const formatter = this.formatLabel();
    return formatter ? formatter(val) : val.toString();
  }
}
