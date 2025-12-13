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
  input,
  Input,
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
    <div
      class="ds-time-picker-panel"
      role="dialog"
      aria-label="Time picker"
      [attr.id]="panelId"
      (keydown)="onPanelKeydown($event)">
      <div class="ds-time-picker-panel__columns">
        <!-- Hours column -->
        <div
          class="ds-time-picker-panel__column"
          role="listbox"
          aria-label="Hours"
          [attr.aria-activedescendant]="activeColumn() === 'hours' ? getActiveOptionId('hours') : null"
          [attr.tabindex]="0"
          (focus)="setActiveColumn('hours')"
          (keydown.arrowDown)="navigateOption('hours', 1); $event.preventDefault()"
          (keydown.arrowUp)="navigateOption('hours', -1); $event.preventDefault()">
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
                [attr.id]="'hour-' + hour.value"
                [attr.role]="'option'"
                [attr.aria-selected]="hour.value === selectedHours()"
                [attr.aria-disabled]="hour.disabled"
                (click)="selectHours(hour.value)">
                {{ hour.label }}
              </button>
            }
          </div>
        </div>

        <!-- Minutes column -->
        <div
          class="ds-time-picker-panel__column"
          role="listbox"
          aria-label="Minutes"
          [attr.aria-activedescendant]="activeColumn() === 'minutes' ? getActiveOptionId('minutes') : null"
          [attr.tabindex]="0"
          (focus)="setActiveColumn('minutes')"
          (keydown.arrowDown)="navigateOption('minutes', 1); $event.preventDefault()"
          (keydown.arrowUp)="navigateOption('minutes', -1); $event.preventDefault()">
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
                [attr.id]="'minute-' + minute.value"
                [attr.role]="'option'"
                [attr.aria-selected]="minute.value === selectedMinutes()"
                [attr.aria-disabled]="minute.disabled"
                (click)="selectMinutes(minute.value)">
                {{ minute.label }}
              </button>
            }
          </div>
        </div>

        <!-- Seconds column (conditional) -->
        @if (showSeconds()) {
          <div
            class="ds-time-picker-panel__column"
            role="listbox"
            aria-label="Seconds"
            [attr.aria-activedescendant]="activeColumn() === 'seconds' ? getActiveOptionId('seconds') : null"
            [attr.tabindex]="0"
            (focus)="setActiveColumn('seconds')"
            (keydown.arrowDown)="navigateOption('seconds', 1); $event.preventDefault()"
            (keydown.arrowUp)="navigateOption('seconds', -1); $event.preventDefault()">
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
                  [attr.id]="'second-' + second.value"
                  [attr.role]="'option'"
                  [attr.aria-selected]="second.value === selectedSeconds()"
                  [attr.aria-disabled]="second.disabled"
                  (click)="selectSeconds(second.value)">
                  {{ second.label }}
                </button>
              }
            </div>
          </div>
        }

        <!-- AM/PM column (12h format) -->
        @if (format() === '12h') {
          <div
            class="ds-time-picker-panel__column ds-time-picker-panel__column--period"
            role="listbox"
            aria-label="Period"
            [attr.aria-activedescendant]="activeColumn() === 'period' ? getActiveOptionId('period') : null"
            [attr.tabindex]="0"
            (focus)="setActiveColumn('period')"
            (keydown.arrowDown)="navigateOption('period', 1); $event.preventDefault()"
            (keydown.arrowUp)="navigateOption('period', -1); $event.preventDefault()">
            <div class="ds-time-picker-panel__column-scroll">
              <button
                type="button"
                class="ds-time-picker-panel__option"
                [class.ds-time-picker-panel__option--selected]="selectedPeriod() === 'AM'"
                [attr.id]="'period-AM'"
                [attr.role]="'option'"
                [attr.aria-selected]="selectedPeriod() === 'AM'"
                (click)="selectPeriod('AM')">
                AM
              </button>
              <button
                type="button"
                class="ds-time-picker-panel__option"
                [class.ds-time-picker-panel__option--selected]="selectedPeriod() === 'PM'"
                [attr.id]="'period-PM'"
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

  // Panel ID for aria-controls (passed from parent or auto-generated)
  @Input() panelId = `ds-time-picker-panel-${Math.random().toString(36).substr(2, 9)}`;

  // Active column for keyboard navigation
  readonly activeColumn = signal<'hours' | 'minutes' | 'seconds' | 'period'>('hours');

  // Inputs (signal-based)
  readonly value = input<string>('');
  readonly format = input<'12h' | '24h'>('24h');
  readonly showSeconds = input(false);
  readonly minuteStep = input(1);
  readonly hourStep = input(1);

  // Inputs (decorator-based for Storybook JIT compatibility)
  // Using setters to update internal signals for reactivity
  @Input()
  set minTime(value: string | null) {
    this._minTime.set(value);
  }
  get minTime(): string | null {
    return this._minTime();
  }

  @Input()
  set maxTime(value: string | null) {
    this._maxTime.set(value);
  }
  get maxTime(): string | null {
    return this._maxTime();
  }

  // Internal signals for minTime/maxTime (for computed reactivity)
  private readonly _minTime = signal<string | null>(null);
  private readonly _maxTime = signal<string | null>(null);

  // Parsed min/max time values (computed)
  private readonly parsedMinTime = computed(() => this.parseTimeConstraint(this._minTime()));
  private readonly parsedMaxTime = computed(() => this.parseTimeConstraint(this._maxTime()));

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
    const fmt = this.format();
    const step = this.hourStep();
    const max = fmt === '12h' ? 12 : 23;
    const start = fmt === '12h' ? 1 : 0;

    for (let i = start; i <= max; i += step) {
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
    const step = this.minuteStep();

    for (let i = 0; i < 60; i += step) {
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

  private initialized = false;

  constructor() {
    // Parse initial value when it changes
    effect(() => {
      const val = this.value();
      const fmt = this.format();
      this.parseAndSetValue(val, fmt);
    }, { allowSignalWrites: true });
  }

  ngAfterViewInit(): void {
    this.initialized = true;
    // Scroll to selected values
    setTimeout(() => {
      this.scrollToSelected();
    }, 0);
  }

  selectHours(hours: number): void {
    this.selectedHours.set(hours);
    this.emitCurrentTime();
  }

  selectMinutes(minutes: number): void {
    this.selectedMinutes.set(minutes);
    this.emitCurrentTime();
  }

  selectSeconds(seconds: number): void {
    this.selectedSeconds.set(seconds);
    this.emitCurrentTime();
  }

  selectPeriod(period: 'AM' | 'PM'): void {
    this.selectedPeriod.set(period);
    this.emitCurrentTime();
  }

  onScroll(column: 'hours' | 'minutes' | 'seconds', event: Event): void {
    // Optional: could implement snap-to-value on scroll end
  }

  /**
   * Set the active column for keyboard navigation
   */
  setActiveColumn(column: 'hours' | 'minutes' | 'seconds' | 'period'): void {
    this.activeColumn.set(column);
  }

  /**
   * Get the ID of the currently active option in a column
   */
  getActiveOptionId(column: 'hours' | 'minutes' | 'seconds' | 'period'): string {
    switch (column) {
      case 'hours':
        return `hour-${this.selectedHours()}`;
      case 'minutes':
        return `minute-${this.selectedMinutes()}`;
      case 'seconds':
        return `second-${this.selectedSeconds()}`;
      case 'period':
        return `period-${this.selectedPeriod()}`;
    }
  }

  /**
   * Navigate options with arrow keys
   */
  navigateOption(column: 'hours' | 'minutes' | 'seconds' | 'period', direction: 1 | -1): void {
    switch (column) {
      case 'hours': {
        const options = this.hoursOptions();
        const currentIndex = options.findIndex(o => o.value === this.selectedHours());
        const newIndex = this.findNextEnabledIndex(options, currentIndex, direction);
        if (newIndex !== -1) {
          this.selectHours(options[newIndex].value);
          this.scrollOptionIntoView('hours', options[newIndex].value);
        }
        break;
      }
      case 'minutes': {
        const options = this.minutesOptions();
        const currentIndex = options.findIndex(o => o.value === this.selectedMinutes());
        const newIndex = this.findNextEnabledIndex(options, currentIndex, direction);
        if (newIndex !== -1) {
          this.selectMinutes(options[newIndex].value);
          this.scrollOptionIntoView('minutes', options[newIndex].value);
        }
        break;
      }
      case 'seconds': {
        const options = this.secondsOptions();
        const currentIndex = options.findIndex(o => o.value === this.selectedSeconds());
        const newIndex = this.findNextEnabledIndex(options, currentIndex, direction);
        if (newIndex !== -1) {
          this.selectSeconds(options[newIndex].value);
          this.scrollOptionIntoView('seconds', options[newIndex].value);
        }
        break;
      }
      case 'period': {
        const newPeriod = this.selectedPeriod() === 'AM' ? 'PM' : 'AM';
        this.selectPeriod(newPeriod);
        break;
      }
    }
  }

  /**
   * Handle global panel keyboard events
   */
  onPanelKeydown(event: KeyboardEvent): void {
    // Tab between columns
    if (event.key === 'Tab') {
      // Let default tab behavior work with focusable listbox columns
      return;
    }
  }

  /**
   * Focus the hours column (called from parent on panel open)
   */
  focusFirstColumn(): void {
    const hoursListbox = document.querySelector(`#${this.panelId} [aria-label="Hours"]`) as HTMLElement;
    if (hoursListbox) {
      hoursListbox.focus();
    }
  }

  /**
   * Find the next enabled option index in a direction
   */
  private findNextEnabledIndex(options: TimeColumn[], currentIndex: number, direction: 1 | -1): number {
    let newIndex = currentIndex + direction;
    while (newIndex >= 0 && newIndex < options.length) {
      if (!options[newIndex].disabled) {
        return newIndex;
      }
      newIndex += direction;
    }
    return -1; // No enabled option found
  }

  /**
   * Scroll an option into view in its column
   */
  private scrollOptionIntoView(column: 'hours' | 'minutes' | 'seconds', value: number): void {
    const columnRef = column === 'hours' ? this.hoursColumn :
                      column === 'minutes' ? this.minutesColumn :
                      this.secondsColumn;
    this.scrollColumnToValue(columnRef, value);
  }

  private parseAndSetValue(val: string, fmt: '12h' | '24h'): void {
    if (!val) {
      this.selectedHours.set(fmt === '12h' ? 12 : 0);
      this.selectedMinutes.set(0);
      this.selectedSeconds.set(0);
      this.selectedPeriod.set('AM');
      return;
    }

    const parts = val.split(':');
    if (parts.length < 2) return;

    let hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parts[2] ? parseInt(parts[2], 10) : 0;

    if (fmt === '12h') {
      const period = hours >= 12 ? 'PM' : 'AM';
      hours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
      this.selectedPeriod.set(period);
    }

    this.selectedHours.set(hours);
    this.selectedMinutes.set(minutes);
    this.selectedSeconds.set(seconds);
  }

  private emitCurrentTime(): void {
    const hours = this.selectedHours();
    const minutes = this.selectedMinutes();
    const seconds = this.selectedSeconds();
    const period = this.selectedPeriod();

    let finalHours = hours;

    if (this.format() === '12h') {
      if (period === 'PM' && hours !== 12) {
        finalHours = hours + 12;
      } else if (period === 'AM' && hours === 12) {
        finalHours = 0;
      }
    }

    const hoursStr = finalHours.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = seconds.toString().padStart(2, '0');

    const timeString = this.showSeconds()
      ? `${hoursStr}:${minutesStr}:${secondsStr}`
      : `${hoursStr}:${minutesStr}`;

    this.timeSelected.emit(timeString);
  }

  /**
   * Parse a time constraint string (HH:mm or HH:mm:ss) into components
   */
  private parseTimeConstraint(timeStr: string | null): { hours: number; minutes: number; seconds: number } | null {
    if (!timeStr) return null;

    const parts = timeStr.split(':');
    if (parts.length < 2) return null;

    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parts[2] ? parseInt(parts[2], 10) : 0;

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return null;

    return { hours, minutes, seconds };
  }

  /**
   * Convert 12h hour to 24h for comparison
   */
  private to24Hour(hour: number): number {
    if (this.format() === '12h') {
      const period = this.selectedPeriod();
      if (period === 'PM' && hour !== 12) {
        return hour + 12;
      } else if (period === 'AM' && hour === 12) {
        return 0;
      }
    }
    return hour;
  }

  /**
   * Check if an hour is disabled based on minTime/maxTime constraints
   */
  private isHourDisabled(hour: number): boolean {
    const min = this.parsedMinTime();
    const max = this.parsedMaxTime();

    // Convert hour to 24h format for comparison
    const hour24 = this.format() === '12h' ? this.convert12hTo24h(hour) : hour;

    if (min && hour24 < min.hours) {
      return true;
    }
    if (max && hour24 > max.hours) {
      return true;
    }

    return false;
  }

  /**
   * Check if a minute is disabled based on minTime/maxTime and selected hour
   */
  private isMinuteDisabled(minute: number): boolean {
    const min = this.parsedMinTime();
    const max = this.parsedMaxTime();
    const selectedHour24 = this.to24Hour(this.selectedHours());

    // If selected hour equals min hour, disable minutes below min minutes
    if (min && selectedHour24 === min.hours && minute < min.minutes) {
      return true;
    }

    // If selected hour equals max hour, disable minutes above max minutes
    if (max && selectedHour24 === max.hours && minute > max.minutes) {
      return true;
    }

    return false;
  }

  /**
   * Convert a 12h hour value to 24h based on current period selection
   * Used for constraint comparison when in 12h format
   */
  private convert12hTo24h(hour: number): number {
    const period = this.selectedPeriod();
    if (period === 'PM' && hour !== 12) {
      return hour + 12;
    } else if (period === 'AM' && hour === 12) {
      return 0;
    }
    return hour;
  }

  private scrollToSelected(): void {
    this.scrollColumnToValue(this.hoursColumn, this.selectedHours());
    this.scrollColumnToValue(this.minutesColumn, this.selectedMinutes());
    if (this.showSeconds() && this.secondsColumn) {
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
