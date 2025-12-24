import {
  Component,
  computed,
  effect,
  input,
  output,
  signal,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

/**
 * Interface pour les événements du calendrier
 */
export interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  type?: 'default' | 'success' | 'warning' | 'error';
  /** Couleur custom (hex, rgb, etc.) - prioritaire sur type */
  color?: string;
}

/**
 * Mode d'affichage du calendrier
 */
export type CalendarMode = 'month' | 'year';

/**
 * Tailles du calendrier
 */
export type CalendarSize = 'sm' | 'md' | 'lg';

/**
 * Représentation d'un jour dans le calendrier
 */
interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isDisabled: boolean;
  events: CalendarEvent[];
}

/**
 * Représentation d'un mois dans la vue année
 */
interface CalendarMonth {
  monthIndex: number;
  label: string;
  isCurrentMonth: boolean;
}

/**
 * DsCalendar - Composant calendrier mensuel/annuel avec gestion d'événements
 *
 * @example
 * ```html
 * <ds-calendar
 *   [value]="currentDate"
 *   [events]="calendarEvents"
 *   (dateSelect)="onDateSelect($event)"
 *   (eventClick)="onEventClick($event)">
 * </ds-calendar>
 * ```
 */
@Component({
  selector: 'ds-calendar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './ds-calendar.html',
  styleUrl: './ds-calendar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ds-calendar',
    '[class]': 'hostClasses()',
  },
})
export class DsCalendar {
  // =========================================================================
  // INPUTS (Signals Angular 20)
  // =========================================================================

  /**
   * Date courante affichée
   */
  value = input<Date>(new Date());

  /**
   * Mode d'affichage (month ou year)
   */
  mode = input<CalendarMode>('month');

  /**
   * Événements à afficher dans le calendrier
   */
  events = input<CalendarEvent[]>([]);

  /**
   * Taille du calendrier
   */
  size = input<CalendarSize>('md');

  /**
   * Locale pour les noms de jours et mois
   */
  locale = input<string>('fr-FR');

  /**
   * Premier jour de la semaine (0=dimanche, 1=lundi)
   */
  firstDayOfWeek = input<number>(1);

  /**
   * Fonction pour désactiver certaines dates
   */
  disabledDate = input<((date: Date) => boolean) | undefined>(undefined);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /**
   * Émis lors de la sélection d'une date
   */
  dateSelect = output<Date>();

  /**
   * Émis lors du changement de mois
   */
  monthChange = output<Date>();

  /**
   * Émis lors du changement de mode
   */
  modeChange = output<CalendarMode>();

  /**
   * Émis lors du clic sur un événement
   */
  eventClick = output<CalendarEvent>();

  // =========================================================================
  // ÉTAT INTERNE
  // =========================================================================

  /**
   * Date actuellement affichée (mois/année)
   */
  readonly displayDate = signal<Date>(new Date());

  /**
   * Mode actuel (interne)
   */
  readonly currentMode = signal<CalendarMode>('month');

  // =========================================================================
  // ICÔNES FONTAWESOME
  // =========================================================================

  readonly icons = {
    chevronLeft: faChevronLeft,
    chevronRight: faChevronRight,
  } as const;

  // =========================================================================
  // COMPUTED SIGNALS
  // =========================================================================

  /**
   * Classes CSS de l'hôte
   */
  readonly hostClasses = computed(() => {
    const classes = ['ds-calendar'];
    classes.push(`ds-calendar--${this.size()}`);
    classes.push(`ds-calendar--${this.currentMode()}`);
    return classes.join(' ');
  });

  /**
   * Titre du calendrier (mois + année)
   */
  readonly calendarTitle = computed(() => {
    const date = this.displayDate();
    const locale = this.locale();

    if (this.currentMode() === 'year') {
      return date.getFullYear().toString();
    }

    const monthName = date.toLocaleDateString(locale, { month: 'long' });
    const year = date.getFullYear();
    return `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`;
  });

  /**
   * Noms des jours de la semaine
   */
  readonly weekDays = computed(() => {
    const locale = this.locale();
    const firstDay = this.firstDayOfWeek();
    const days: string[] = [];

    // Générer les noms des jours à partir du premier jour de la semaine
    for (let i = 0; i < 7; i++) {
      const date = new Date(2024, 0, firstDay + i); // Année 2024 (lundi = 1er janvier)
      const dayName = date.toLocaleDateString(locale, { weekday: 'short' });
      days.push(dayName.charAt(0).toUpperCase() + dayName.slice(1));
    }

    return days;
  });

  /**
   * Grille des jours du mois (6 semaines)
   */
  readonly calendarGrid = computed(() => {
    const date = this.displayDate();
    const firstDay = this.firstDayOfWeek();
    const events = this.events();
    const disabledFn = this.disabledDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const year = date.getFullYear();
    const month = date.getMonth();

    // Premier jour du mois
    const firstDayOfMonth = new Date(year, month, 1);
    let startDay = firstDayOfMonth.getDay() - firstDay;
    if (startDay < 0) startDay += 7;

    // Calculer la date de début de la grille (peut être dans le mois précédent)
    const startDate = new Date(year, month, 1 - startDay);

    const days: CalendarDay[] = [];

    // Générer 42 jours (6 semaines x 7 jours)
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      currentDate.setHours(0, 0, 0, 0);

      const isCurrentMonth = currentDate.getMonth() === month;
      const isToday = currentDate.getTime() === today.getTime();
      const isDisabled = disabledFn ? disabledFn(currentDate) : false;

      // Trouver les événements pour ce jour
      const dayEvents = events.filter((event) => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate.getTime() === currentDate.getTime();
      });

      days.push({
        date: currentDate,
        isCurrentMonth,
        isToday,
        isDisabled,
        events: dayEvents,
      });
    }

    return days;
  });

  /**
   * Grille des mois (vue année)
   */
  readonly monthGrid = computed(() => {
    const date = this.displayDate();
    const locale = this.locale();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const displayYear = date.getFullYear();

    const months: CalendarMonth[] = [];

    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(displayYear, i, 1);
      const monthName = monthDate.toLocaleDateString(locale, { month: 'long' });

      months.push({
        monthIndex: i,
        label: monthName.charAt(0).toUpperCase() + monthName.slice(1),
        isCurrentMonth: i === currentMonth && displayYear === currentYear,
      });
    }

    return months;
  });

  // =========================================================================
  // EFFECTS
  // =========================================================================

  constructor() {
    // Synchroniser displayDate avec value au démarrage
    effect(
      () => {
        const value = this.value();
        this.displayDate.set(new Date(value));
      },
    );

    // Synchroniser currentMode avec mode
    effect(
      () => {
        this.currentMode.set(this.mode());
      },
    );
  }

  // =========================================================================
  // MÉTHODES PUBLIQUES
  // =========================================================================

  /**
   * Navigue vers le mois précédent
   */
  previousMonth(): void {
    const current = this.displayDate();
    const newDate = new Date(current.getFullYear(), current.getMonth() - 1, 1);
    this.displayDate.set(newDate);
    this.monthChange.emit(newDate);
  }

  /**
   * Navigue vers le mois suivant
   */
  nextMonth(): void {
    const current = this.displayDate();
    const newDate = new Date(current.getFullYear(), current.getMonth() + 1, 1);
    this.displayDate.set(newDate);
    this.monthChange.emit(newDate);
  }

  /**
   * Navigue vers l'année précédente
   */
  previousYear(): void {
    const current = this.displayDate();
    const newDate = new Date(current.getFullYear() - 1, current.getMonth(), 1);
    this.displayDate.set(newDate);
    this.monthChange.emit(newDate);
  }

  /**
   * Navigue vers l'année suivante
   */
  nextYear(): void {
    const current = this.displayDate();
    const newDate = new Date(current.getFullYear() + 1, current.getMonth(), 1);
    this.displayDate.set(newDate);
    this.monthChange.emit(newDate);
  }

  /**
   * Sélectionne une date
   */
  selectDate(day: CalendarDay): void {
    if (day.isDisabled) return;
    this.dateSelect.emit(new Date(day.date));
  }

  /**
   * Sélectionne un mois (en mode année)
   */
  selectMonth(month: CalendarMonth): void {
    const current = this.displayDate();
    const newDate = new Date(current.getFullYear(), month.monthIndex, 1);
    this.displayDate.set(newDate);
    this.currentMode.set('month');
    this.modeChange.emit('month');
  }

  /**
   * Toggle entre mode mois et année
   */
  toggleMode(): void {
    const newMode = this.currentMode() === 'month' ? 'year' : 'month';
    this.currentMode.set(newMode);
    this.modeChange.emit(newMode);
  }

  /**
   * Gère le clic sur un événement
   */
  onEventClick(event: CalendarEvent, mouseEvent: MouseEvent): void {
    mouseEvent.stopPropagation();
    this.eventClick.emit(event);
  }

  /**
   * Retourne les classes CSS d'un jour
   */
  getDayClasses(day: CalendarDay): string {
    const classes = ['ds-calendar__day'];

    if (!day.isCurrentMonth) {
      classes.push('ds-calendar__day--other-month');
    }

    if (day.isToday) {
      classes.push('ds-calendar__day--today');
    }

    if (day.isDisabled) {
      classes.push('ds-calendar__day--disabled');
    }

    if (day.events.length > 0) {
      classes.push('ds-calendar__day--has-events');
    }

    return classes.join(' ');
  }

  /**
   * Retourne les classes CSS d'un mois
   */
  getMonthClasses(month: CalendarMonth): string {
    const classes = ['ds-calendar__month'];

    if (month.isCurrentMonth) {
      classes.push('ds-calendar__month--current');
    }

    return classes.join(' ');
  }

  /**
   * Retourne les classes CSS d'un événement
   */
  getEventClasses(event: CalendarEvent): string {
    const classes = ['ds-calendar__event'];

    if (event.type) {
      classes.push(`ds-calendar__event--${event.type}`);
    }

    return classes.join(' ');
  }
}
