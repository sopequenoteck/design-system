import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  signal,
  forwardRef,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { OverlayModule, OverlayRef, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DsTimePickerPanelComponent } from './ds-time-picker-panel.component';

export type TimePickerSize = 'sm' | 'md' | 'lg';
export type TimeFormat = '12h' | '24h';

export interface TimeValue {
  hours: number;
  minutes: number;
  seconds?: number;
}

/**
 * DsTimePicker - Composant de sélection d'heure
 *
 * @description
 * Sélecteur d'heure avec dropdown scrollable, support 12h/24h,
 * et intégration formulaires via ControlValueAccessor.
 *
 * @example
 * ```html
 * <ds-time-picker
 *   [format]="'24h'"
 *   [showSeconds]="true"
 *   (timeChange)="onTimeChange($event)">
 * </ds-time-picker>
 * ```
 */
@Component({
  selector: 'ds-time-picker',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, OverlayModule],
  templateUrl: './ds-time-picker.html',
  styleUrl: './ds-time-picker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsTimePicker),
      multi: true,
    },
  ],
})
export class DsTimePicker implements ControlValueAccessor {
  // Inputs
  readonly value = input<string>('');
  readonly format = input<TimeFormat>('24h');
  readonly showSeconds = input(false);
  readonly minuteStep = input(1);
  readonly hourStep = input(1);
  readonly size = input<TimePickerSize>('md');
  readonly disabled = input(false);
  readonly readonly = input(false);
  readonly placeholder = input('Select time');
  readonly minTime = input<string | null>(null);
  readonly maxTime = input<string | null>(null);

  // Outputs
  readonly timeChange = output<string>();

  // Icons
  readonly clockIcon = faClock;
  readonly upIcon = faChevronUp;
  readonly downIcon = faChevronDown;

  // State
  readonly isOpen = signal(false);
  readonly internalValue = signal<string>('');
  readonly isFocused = signal(false);

  // Overlay
  private overlayRef: OverlayRef | null = null;

  // Computed
  readonly containerClasses = computed(() => {
    const classes = ['ds-time-picker'];
    classes.push(`ds-time-picker--${this.size()}`);
    if (this.disabled()) classes.push('ds-time-picker--disabled');
    if (this.readonly()) classes.push('ds-time-picker--readonly');
    if (this.isFocused()) classes.push('ds-time-picker--focused');
    if (this.isOpen()) classes.push('ds-time-picker--open');
    return classes.join(' ');
  });

  readonly displayValue = computed(() => {
    const val = this.internalValue();
    if (!val) return '';

    const time = this.parseTime(val);
    if (!time) return val;

    return this.formatTimeForDisplay(time);
  });

  readonly isDisabled = computed(() => this.disabled() || this.readonly());

  // ControlValueAccessor
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private overlay: Overlay) {
    // Sync external value with internal
    effect(() => {
      const val = this.value();
      if (val !== this.internalValue()) {
        this.internalValue.set(val);
      }
    });
  }

  writeValue(value: string): void {
    this.internalValue.set(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Géré par input disabled
  }

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
    this.createOverlay();
  }

  close(): void {
    if (!this.isOpen()) return;

    this.isOpen.set(false);
    this.destroyOverlay();
    this.onTouched();
  }

  onFocus(): void {
    if (!this.disabled()) {
      this.isFocused.set(true);
    }
  }

  onBlur(): void {
    this.isFocused.set(false);
    if (!this.isOpen()) {
      this.onTouched();
    }
  }

  onTimeSelected(timeString: string): void {
    this.updateValue(timeString);
    this.close();
  }

  private updateValue(value: string): void {
    this.internalValue.set(value);
    this.onChange(value);
    this.timeChange.emit(value);
  }

  private createOverlay(): void {
    if (this.overlayRef) return;

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(document.querySelector('.ds-time-picker__input') as HTMLElement)
      .withPositions([
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
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });

    const portal = new ComponentPortal(DsTimePickerPanelComponent);
    const componentRef = this.overlayRef.attach(portal);

    // Pass config to panel
    componentRef.instance.value = this.internalValue();
    componentRef.instance.format = this.format();
    componentRef.instance.showSeconds = this.showSeconds();
    componentRef.instance.minuteStep = this.minuteStep();
    componentRef.instance.hourStep = this.hourStep();
    componentRef.instance.minTime = this.minTime();
    componentRef.instance.maxTime = this.maxTime();
    componentRef.instance.timeSelected.subscribe((time: string) => {
      this.onTimeSelected(time);
    });

    this.overlayRef.backdropClick().subscribe(() => this.close());
  }

  private destroyOverlay(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  private parseTime(timeString: string): TimeValue | null {
    if (!timeString) return null;

    const parts = timeString.split(':');
    if (parts.length < 2) return null;

    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parts[2] ? parseInt(parts[2], 10) : undefined;

    if (isNaN(hours) || isNaN(minutes)) return null;
    if (seconds !== undefined && isNaN(seconds)) return null;

    return { hours, minutes, seconds };
  }

  private formatTimeForDisplay(time: TimeValue): string {
    const { hours, minutes, seconds } = time;

    if (this.format() === '12h') {
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
      const formattedMinutes = minutes.toString().padStart(2, '0');

      if (this.showSeconds() && seconds !== undefined) {
        const formattedSeconds = seconds.toString().padStart(2, '0');
        return `${displayHours}:${formattedMinutes}:${formattedSeconds} ${period}`;
      }

      return `${displayHours}:${formattedMinutes} ${period}`;
    } else {
      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');

      if (this.showSeconds() && seconds !== undefined) {
        const formattedSeconds = seconds.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
      }

      return `${formattedHours}:${formattedMinutes}`;
    }
  }
}
