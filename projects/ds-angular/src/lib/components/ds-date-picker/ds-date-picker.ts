import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  signal,
  forwardRef,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons';

export type DatePickerSize = 'sm' | 'md' | 'lg';
export type DatePickerMode = 'single' | 'range';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

/**
 * DsDatePicker - Composant de sélection de date
 *
 * @description
 * Calendrier avec navigation mensuelle, sélection simple ou range,
 * et intégration formulaires via ControlValueAccessor.
 *
 * @example
 * ```html
 * <ds-date-picker
 *   [mode]="'single'"
 *   (dateChange)="onDateChange($event)">
 * </ds-date-picker>
 * ```
 */
@Component({
  selector: 'ds-date-picker',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <div [class]="containerClasses()">
      <!-- Header avec navigation -->
      <div class="ds-date-picker__header">
        <button
          type="button"
          class="ds-date-picker__nav ds-date-picker__nav--prev"
          [attr.aria-label]="prevMonthLabel()"
          [disabled]="disabled()"
          (click)="navigateMonth(-1)">
          <fa-icon [icon]="prevIcon" aria-hidden="true"></fa-icon>
        </button>

        <div class="ds-date-picker__title">
          <button
            type="button"
            class="ds-date-picker__month-btn"
            [disabled]="disabled()"
            (click)="toggleMonthPicker()">
            {{ currentMonthName() }}
          </button>
          <button
            type="button"
            class="ds-date-picker__year-btn"
            [disabled]="disabled()"
            (click)="toggleYearPicker()">
            {{ currentYear() }}
          </button>
        </div>

        <button
          type="button"
          class="ds-date-picker__nav ds-date-picker__nav--next"
          [attr.aria-label]="nextMonthLabel()"
          [disabled]="disabled()"
          (click)="navigateMonth(1)">
          <fa-icon [icon]="nextIcon" aria-hidden="true"></fa-icon>
        </button>
      </div>

      <!-- Sélecteur de mois -->
      @if (showMonthPicker()) {
        <div class="ds-date-picker__month-picker" role="listbox">
          @for (month of monthNames; track month; let i = $index) {
            <button
              type="button"
              class="ds-date-picker__month-option"
              [class.ds-date-picker__month-option--selected]="i === currentMonth()"
              [disabled]="disabled()"
              role="option"
              [attr.aria-selected]="i === currentMonth()"
              (click)="selectMonth(i)">
              {{ month }}
            </button>
          }
        </div>
      }

      <!-- Sélecteur d'année -->
      @if (showYearPicker()) {
        <div class="ds-date-picker__year-picker" role="listbox">
          @for (year of yearRange(); track year) {
            <button
              type="button"
              class="ds-date-picker__year-option"
              [class.ds-date-picker__year-option--selected]="year === currentYear()"
              [disabled]="disabled()"
              role="option"
              [attr.aria-selected]="year === currentYear()"
              (click)="selectYear(year)">
              {{ year }}
            </button>
          }
        </div>
      }

      <!-- Calendrier -->
      @if (!showMonthPicker() && !showYearPicker()) {
        <div class="ds-date-picker__calendar" role="grid" [attr.aria-label]="calendarLabel()">
          <!-- En-têtes jours -->
          <div class="ds-date-picker__weekdays" role="row">
            @for (day of weekDays; track day) {
              <div class="ds-date-picker__weekday" role="columnheader">{{ day }}</div>
            }
          </div>

          <!-- Grille des jours -->
          <div class="ds-date-picker__days">
            @for (week of calendarWeeks(); track $index) {
              <div class="ds-date-picker__week" role="row">
                @for (day of week; track day.date?.getTime() ?? $index) {
                  <button
                    type="button"
                    class="ds-date-picker__day"
                    [class.ds-date-picker__day--other-month]="!day.isCurrentMonth"
                    [class.ds-date-picker__day--today]="day.isToday"
                    [class.ds-date-picker__day--selected]="day.isSelected"
                    [class.ds-date-picker__day--range-start]="day.isRangeStart"
                    [class.ds-date-picker__day--range-end]="day.isRangeEnd"
                    [class.ds-date-picker__day--in-range]="day.isInRange"
                    [class.ds-date-picker__day--disabled]="day.isDisabled"
                    [disabled]="disabled() || day.isDisabled"
                    role="gridcell"
                    [attr.aria-selected]="day.isSelected"
                    [attr.aria-label]="day.ariaLabel"
                    (click)="selectDate(day.date)"
                    (keydown)="onDayKeydown($event, day.date)">
                    {{ day.dayNumber }}
                  </button>
                }
              </div>
            }
          </div>
        </div>

        <!-- Actions -->
        @if (showTodayButton() || showClearButton()) {
          <div class="ds-date-picker__actions">
            @if (showTodayButton()) {
              <button
                type="button"
                class="ds-date-picker__action"
                [disabled]="disabled()"
                (click)="goToToday()">
                {{ todayLabel() }}
              </button>
            }
            @if (showClearButton()) {
              <button
                type="button"
                class="ds-date-picker__action"
                [disabled]="disabled()"
                (click)="clearSelection()">
                {{ clearLabel() }}
              </button>
            }
          </div>
        }
      }
    </div>
  `,
  styleUrls: ['./ds-date-picker.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsDatePicker),
      multi: true,
    },
  ],
})
export class DsDatePicker implements ControlValueAccessor, OnInit {
  /** Taille du composant */
  readonly size = input<DatePickerSize>('md');

  /** Mode de sélection */
  readonly mode = input<DatePickerMode>('single');

  /** État désactivé */
  readonly disabled = input<boolean>(false);

  /** Date minimum sélectionnable */
  readonly minDate = input<Date | null>(null);

  /** Date maximum sélectionnable */
  readonly maxDate = input<Date | null>(null);

  /** Afficher le bouton "Aujourd'hui" */
  readonly showTodayButton = input<boolean>(true);

  /** Afficher le bouton "Effacer" */
  readonly showClearButton = input<boolean>(true);

  /** Label du bouton "Aujourd'hui" */
  readonly todayLabel = input<string>("Aujourd'hui");

  /** Label du bouton "Effacer" */
  readonly clearLabel = input<string>('Effacer');

  /** Label bouton mois précédent */
  readonly prevMonthLabel = input<string>('Mois précédent');

  /** Label bouton mois suivant */
  readonly nextMonthLabel = input<string>('Mois suivant');

  /** Événement de changement de date (mode single) */
  readonly dateChange = output<Date | null>();

  /** Événement de changement de range */
  readonly rangeChange = output<DateRange>();

  /** Icônes */
  readonly prevIcon = faChevronLeft;
  readonly nextIcon = faChevronRight;
  readonly calendarIcon = faCalendar;

  /** Jours de la semaine */
  readonly weekDays = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];

  /** Noms des mois */
  readonly monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  /** État interne */
  readonly currentMonth = signal(new Date().getMonth());
  readonly currentYear = signal(new Date().getFullYear());
  readonly selectedDate = signal<Date | null>(null);
  readonly rangeStart = signal<Date | null>(null);
  readonly rangeEnd = signal<Date | null>(null);
  readonly showMonthPicker = signal(false);
  readonly showYearPicker = signal(false);

  /** Callbacks CVA */
  private onChange: (value: Date | DateRange | null) => void = () => {};
  private onTouched: () => void = () => {};

  readonly containerClasses = computed(() => {
    const classes = ['ds-date-picker'];
    classes.push(`ds-date-picker--${this.size()}`);

    if (this.disabled()) {
      classes.push('ds-date-picker--disabled');
    }

    return classes.join(' ');
  });

  readonly currentMonthName = computed(() => {
    return this.monthNames[this.currentMonth()];
  });

  readonly calendarLabel = computed(() => {
    return `Calendrier ${this.currentMonthName()} ${this.currentYear()}`;
  });

  readonly yearRange = computed(() => {
    const currentYear = this.currentYear();
    const years: number[] = [];
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      years.push(i);
    }
    return years;
  });

  readonly calendarWeeks = computed(() => {
    const year = this.currentYear();
    const month = this.currentMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Trouver le premier lundi avant ou égal au premier jour du mois
    const startDate = new Date(firstDay);
    const dayOfWeek = startDate.getDay();
    const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Ajuster pour commencer lundi
    startDate.setDate(startDate.getDate() - diff);

    const weeks: CalendarDay[][] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let currentDate = new Date(startDate);

    for (let w = 0; w < 6; w++) {
      const week: CalendarDay[] = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(currentDate);
        date.setHours(0, 0, 0, 0);

        const isCurrentMonth = date.getMonth() === month;
        const isToday = date.getTime() === today.getTime();
        const isSelected = this.isDateSelected(date);
        const isRangeStart = this.isRangeStartDate(date);
        const isRangeEnd = this.isRangeEndDate(date);
        const isInRange = this.isDateInRange(date);
        const isDisabled = this.isDateDisabled(date);

        week.push({
          date,
          dayNumber: date.getDate(),
          isCurrentMonth,
          isToday,
          isSelected,
          isRangeStart,
          isRangeEnd,
          isInRange,
          isDisabled,
          ariaLabel: this.formatDateForAria(date),
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }
      weeks.push(week);

      // Arrêter si on a dépassé le mois
      if (currentDate.getMonth() > month && currentDate.getFullYear() >= year) {
        break;
      }
    }

    return weeks;
  });

  ngOnInit(): void {
    // Initialiser avec la date actuelle si aucune valeur
  }

  navigateMonth(delta: number): void {
    let newMonth = this.currentMonth() + delta;
    let newYear = this.currentYear();

    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }

    this.currentMonth.set(newMonth);
    this.currentYear.set(newYear);
    this.showMonthPicker.set(false);
    this.showYearPicker.set(false);
  }

  toggleMonthPicker(): void {
    this.showMonthPicker.update(v => !v);
    this.showYearPicker.set(false);
  }

  toggleYearPicker(): void {
    this.showYearPicker.update(v => !v);
    this.showMonthPicker.set(false);
  }

  selectMonth(month: number): void {
    this.currentMonth.set(month);
    this.showMonthPicker.set(false);
  }

  selectYear(year: number): void {
    this.currentYear.set(year);
    this.showYearPicker.set(false);
  }

  selectDate(date: Date | null): void {
    if (!date || this.disabled() || this.isDateDisabled(date)) {
      return;
    }

    if (this.mode() === 'single') {
      this.selectedDate.set(date);
      this.dateChange.emit(date);
      this.onChange(date);
    } else {
      // Mode range
      const start = this.rangeStart();
      const end = this.rangeEnd();

      if (!start || (start && end)) {
        // Nouvelle sélection
        this.rangeStart.set(date);
        this.rangeEnd.set(null);
      } else {
        // Compléter la sélection
        if (date < start) {
          this.rangeStart.set(date);
          this.rangeEnd.set(start);
        } else {
          this.rangeEnd.set(date);
        }
        const range: DateRange = {
          start: this.rangeStart(),
          end: this.rangeEnd(),
        };
        this.rangeChange.emit(range);
        this.onChange(range);
      }
    }

    this.onTouched();
  }

  goToToday(): void {
    const today = new Date();
    this.currentMonth.set(today.getMonth());
    this.currentYear.set(today.getFullYear());
    this.showMonthPicker.set(false);
    this.showYearPicker.set(false);
  }

  clearSelection(): void {
    if (this.mode() === 'single') {
      this.selectedDate.set(null);
      this.dateChange.emit(null);
      this.onChange(null);
    } else {
      this.rangeStart.set(null);
      this.rangeEnd.set(null);
      const range: DateRange = { start: null, end: null };
      this.rangeChange.emit(range);
      this.onChange(range);
    }
  }

  onDayKeydown(event: KeyboardEvent, date: Date | null): void {
    if (!date) return;

    let newDate: Date | null = null;

    switch (event.key) {
      case 'ArrowLeft':
        newDate = new Date(date);
        newDate.setDate(newDate.getDate() - 1);
        break;
      case 'ArrowRight':
        newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        break;
      case 'ArrowUp':
        newDate = new Date(date);
        newDate.setDate(newDate.getDate() - 7);
        break;
      case 'ArrowDown':
        newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 7);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.selectDate(date);
        return;
      default:
        return;
    }

    if (newDate) {
      event.preventDefault();
      // Naviguer vers le mois si nécessaire
      if (newDate.getMonth() !== this.currentMonth() ||
          newDate.getFullYear() !== this.currentYear()) {
        this.currentMonth.set(newDate.getMonth());
        this.currentYear.set(newDate.getFullYear());
      }
    }
  }

  private isDateSelected(date: Date): boolean {
    if (this.mode() === 'single') {
      const selected = this.selectedDate();
      return selected ? this.isSameDay(date, selected) : false;
    }
    return this.isRangeStartDate(date) || this.isRangeEndDate(date);
  }

  private isRangeStartDate(date: Date): boolean {
    const start = this.rangeStart();
    return start ? this.isSameDay(date, start) : false;
  }

  private isRangeEndDate(date: Date): boolean {
    const end = this.rangeEnd();
    return end ? this.isSameDay(date, end) : false;
  }

  private isDateInRange(date: Date): boolean {
    if (this.mode() !== 'range') return false;
    const start = this.rangeStart();
    const end = this.rangeEnd();
    if (!start || !end) return false;
    return date > start && date < end;
  }

  private isDateDisabled(date: Date): boolean {
    const min = this.minDate();
    const max = this.maxDate();
    if (min && date < min) return true;
    if (max && date > max) return true;
    return false;
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  private formatDateForAria(date: Date): string {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  // === ControlValueAccessor ===

  writeValue(value: Date | DateRange | null): void {
    if (!value) {
      this.selectedDate.set(null);
      this.rangeStart.set(null);
      this.rangeEnd.set(null);
      return;
    }

    if (value instanceof Date) {
      this.selectedDate.set(value);
      this.currentMonth.set(value.getMonth());
      this.currentYear.set(value.getFullYear());
    } else if ('start' in value && 'end' in value) {
      this.rangeStart.set(value.start);
      this.rangeEnd.set(value.end);
      if (value.start) {
        this.currentMonth.set(value.start.getMonth());
        this.currentYear.set(value.start.getFullYear());
      }
    }
  }

  registerOnChange(fn: (value: Date | DateRange | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Géré via l'input signal
  }
}

interface CalendarDay {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  isDisabled: boolean;
  ariaLabel: string;
}
