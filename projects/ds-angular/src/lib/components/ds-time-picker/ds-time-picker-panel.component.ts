import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  output,
  effect,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TimeColumn {
  value: number;
  label: string;
  disabled: boolean;
}

@Component({
  selector: 'ds-time-picker-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ds-time-picker-panel" role="dialog" aria-label="Time picker">
      <div class="ds-time-picker-panel__columns">
        <!-- Hours column -->
        <div class="ds-time-picker-panel__column" role="listbox" aria-label="Hours">
          <div
            #hoursColumn
            class="ds-time-picker-panel__column-scroll"
            (scroll)="onScroll('hours', $event)">
            @for (hour of hoursOptions(); track hour.value) {
              <button
                type="button"
                class="ds-time-picker-panel__option"
                [class.ds-time-picker-panel__option--selected]="hour.value === selectedHours()"
                [class.ds-time-picker-panel__option--disabled]="hour.disabled"
                [disabled]="hour.disabled"
                [attr.role]="'option'"
                [attr.aria-selected]="hour.value === selectedHours()"
                (click)="selectHours(hour.value)">
                {{ hour.label }}
              </button>
            }
          </div>
        </div>

        <!-- Minutes column -->
        <div class="ds-time-picker-panel__column" role="listbox" aria-label="Minutes">
          <div
            #minutesColumn
            class="ds-time-picker-panel__column-scroll"
            (scroll)="onScroll('minutes', $event)">
            @for (minute of minutesOptions(); track minute.value) {
              <button
                type="button"
                class="ds-time-picker-panel__option"
                [class.ds-time-picker-panel__option--selected]="minute.value === selectedMinutes()"
                [class.ds-time-picker-panel__option--disabled]="minute.disabled"
                [disabled]="minute.disabled"
                [attr.role]="'option'"
                [attr.aria-selected]="minute.value === selectedMinutes()"
                (click)="selectMinutes(minute.value)">
                {{ minute.label }}
              </button>
            }
          </div>
        </div>

        <!-- Seconds column (conditional) -->
        @if (showSeconds) {
          <div class="ds-time-picker-panel__column" role="listbox" aria-label="Seconds">
            <div
              #secondsColumn
              class="ds-time-picker-panel__column-scroll"
              (scroll)="onScroll('seconds', $event)">
              @for (second of secondsOptions(); track second.value) {
                <button
                  type="button"
                  class="ds-time-picker-panel__option"
                  [class.ds-time-picker-panel__option--selected]="second.value === selectedSeconds()"
                  [class.ds-time-picker-panel__option--disabled]="second.disabled"
                  [disabled]="second.disabled"
                  [attr.role]="'option'"
                  [attr.aria-selected]="second.value === selectedSeconds()"
                  (click)="selectSeconds(second.value)">
                  {{ second.label }}
                </button>
              }
            </div>
          </div>
        }

        <!-- AM/PM column (12h format) -->
        @if (format === '12h') {
          <div class="ds-time-picker-panel__column ds-time-picker-panel__column--period" role="listbox" aria-label="Period">
            <div class="ds-time-picker-panel__column-scroll">
              <button
                type="button"
                class="ds-time-picker-panel__option"
                [class.ds-time-picker-panel__option--selected]="selectedPeriod() === 'AM'"
                [attr.role]="'option'"
                [attr.aria-selected]="selectedPeriod() === 'AM'"
                (click)="selectPeriod('AM')">
                AM
              </button>
              <button
                type="button"
                class="ds-time-picker-panel__option"
                [class.ds-time-picker-panel__option--selected]="selectedPeriod() === 'PM'"
                [attr.role]="'option'"
                [attr.aria-selected]="selectedPeriod() === 'PM'"
                (click)="selectPeriod('PM')">
                PM
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styleUrl: './ds-time-picker-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsTimePickerPanelComponent implements AfterViewInit {
  @ViewChild('hoursColumn') hoursColumn?: ElementRef<HTMLDivElement>;
  @ViewChild('minutesColumn') minutesColumn?: ElementRef<HTMLDivElement>;
  @ViewChild('secondsColumn') secondsColumn?: ElementRef<HTMLDivElement>;

  // Config (set by parent)
  value = '';
  format: '12h' | '24h' = '24h';
  showSeconds = false;
  minuteStep = 1;
  hourStep = 1;
  minTime: string | null = null;
  maxTime: string | null = null;

  // Outputs
  readonly timeSelected = output<string>();

  // State
  readonly selectedHours = signal(0);
  readonly selectedMinutes = signal(0);
  readonly selectedSeconds = signal(0);
  readonly selectedPeriod = signal<'AM' | 'PM'>('AM');

  // Computed
  readonly hoursOptions = computed(() => {
    const options: TimeColumn[] = [];
    const max = this.format === '12h' ? 12 : 23;
    const start = this.format === '12h' ? 1 : 0;

    for (let i = start; i <= max; i += this.hourStep) {
      options.push({
        value: i,
        label: i.toString().padStart(2, '0'),
        disabled: this.isHourDisabled(i),
      });
    }

    return options;
  });

  readonly minutesOptions = computed(() => {
    const options: TimeColumn[] = [];

    for (let i = 0; i < 60; i += this.minuteStep) {
      options.push({
        value: i,
        label: i.toString().padStart(2, '0'),
        disabled: this.isMinuteDisabled(i),
      });
    }

    return options;
  });

  readonly secondsOptions = computed(() => {
    const options: TimeColumn[] = [];

    for (let i = 0; i < 60; i++) {
      options.push({
        value: i,
        label: i.toString().padStart(2, '0'),
        disabled: false,
      });
    }

    return options;
  });

  constructor() {
    // Parse initial value
    effect(() => {
      this.parseAndSetValue();
    }, { allowSignalWrites: true });

    // Emit when values change
    effect(() => {
      const hours = this.selectedHours();
      const minutes = this.selectedMinutes();
      const seconds = this.selectedSeconds();
      const period = this.selectedPeriod();

      this.emitTime(hours, minutes, seconds, period);
    });
  }

  ngAfterViewInit(): void {
    // Scroll to selected values
    setTimeout(() => {
      this.scrollToSelected();
    }, 0);
  }

  selectHours(hours: number): void {
    this.selectedHours.set(hours);
  }

  selectMinutes(minutes: number): void {
    this.selectedMinutes.set(minutes);
  }

  selectSeconds(seconds: number): void {
    this.selectedSeconds.set(seconds);
  }

  selectPeriod(period: 'AM' | 'PM'): void {
    this.selectedPeriod.set(period);
  }

  onScroll(column: 'hours' | 'minutes' | 'seconds', event: Event): void {
    // Optional: could implement snap-to-value on scroll end
  }

  private parseAndSetValue(): void {
    if (!this.value) {
      this.selectedHours.set(this.format === '12h' ? 12 : 0);
      this.selectedMinutes.set(0);
      this.selectedSeconds.set(0);
      this.selectedPeriod.set('AM');
      return;
    }

    const parts = this.value.split(':');
    if (parts.length < 2) return;

    let hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parts[2] ? parseInt(parts[2], 10) : 0;

    if (this.format === '12h') {
      const period = hours >= 12 ? 'PM' : 'AM';
      hours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
      this.selectedPeriod.set(period);
    }

    this.selectedHours.set(hours);
    this.selectedMinutes.set(minutes);
    this.selectedSeconds.set(seconds);
  }

  private emitTime(hours: number, minutes: number, seconds: number, period: 'AM' | 'PM'): void {
    let finalHours = hours;

    if (this.format === '12h') {
      if (period === 'PM' && hours !== 12) {
        finalHours = hours + 12;
      } else if (period === 'AM' && hours === 12) {
        finalHours = 0;
      }
    }

    const hoursStr = finalHours.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = seconds.toString().padStart(2, '0');

    const timeString = this.showSeconds
      ? `${hoursStr}:${minutesStr}:${secondsStr}`
      : `${hoursStr}:${minutesStr}`;

    this.timeSelected.emit(timeString);
  }

  private isHourDisabled(hour: number): boolean {
    // TODO: implement minTime/maxTime validation
    return false;
  }

  private isMinuteDisabled(minute: number): boolean {
    // TODO: implement minTime/maxTime validation
    return false;
  }

  private scrollToSelected(): void {
    this.scrollColumnToValue(this.hoursColumn, this.selectedHours());
    this.scrollColumnToValue(this.minutesColumn, this.selectedMinutes());
    if (this.showSeconds && this.secondsColumn) {
      this.scrollColumnToValue(this.secondsColumn, this.selectedSeconds());
    }
  }

  private scrollColumnToValue(column: ElementRef<HTMLDivElement> | undefined, value: number): void {
    if (!column) return;

    const element = column.nativeElement;
    const options = element.querySelectorAll('.ds-time-picker-panel__option');
    const selectedOption = Array.from(options).find(
      (option) => option.textContent?.trim() === value.toString().padStart(2, '0')
    );

    if (selectedOption) {
      const optionElement = selectedOption as HTMLElement;
      element.scrollTop = optionElement.offsetTop - element.offsetHeight / 2 + optionElement.offsetHeight / 2;
    }
  }
}
