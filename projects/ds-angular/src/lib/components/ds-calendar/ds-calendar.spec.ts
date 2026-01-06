import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DsCalendar, CalendarEvent, CalendarMode, CalendarSize } from './ds-calendar';

describe('DsCalendar', () => {
  let component: DsCalendar;
  let fixture: ComponentFixture<DsCalendar>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsCalendar],
    }).compileComponents();

    fixture = TestBed.createComponent(DsCalendar);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture?.destroy();
  });

  // =========================================================================
  // CRÉATION ET RENDU DE BASE
  // =========================================================================

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render calendar container', () => {
    const container = debugElement.query(By.css('.ds-calendar__container'));
    expect(container).toBeTruthy();
  });

  it('should render header with navigation', () => {
    const header = debugElement.query(By.css('.ds-calendar__header'));
    expect(header).toBeTruthy();

    const navBtns = debugElement.queryAll(By.css('.ds-calendar__nav-btn'));
    expect(navBtns.length).toBe(2);
  });

  it('should render month view by default', () => {
    const monthView = debugElement.query(By.css('.ds-calendar__month-view'));
    expect(monthView).toBeTruthy();
  });

  it('should render weekdays', () => {
    const weekdays = debugElement.queryAll(By.css('.ds-calendar__weekday'));
    expect(weekdays.length).toBe(7);
  });

  it('should render 42 days (6 weeks)', () => {
    const days = debugElement.queryAll(By.css('.ds-calendar__day'));
    expect(days.length).toBe(42);
  });

  // =========================================================================
  // INPUTS
  // =========================================================================

  it('should accept value input', () => {
    const testDate = new Date(2025, 5, 15); // 15 juin 2025
    fixture.componentRef.setInput('value', testDate);
    fixture.detectChanges();

    expect(component.value()).toEqual(testDate);
    expect(component.displayDate().getMonth()).toBe(5);
  });

  it('should accept mode input', () => {
    fixture.componentRef.setInput('mode', 'year');
    fixture.detectChanges();

    expect(component.mode()).toBe('year');
    expect(component.currentMode()).toBe('year');
  });

  it('should accept events input', () => {
    const events: CalendarEvent[] = [
      { id: '1', date: new Date(), title: 'Event 1', type: 'success' },
      { id: '2', date: new Date(), title: 'Event 2', type: 'warning' },
    ];

    fixture.componentRef.setInput('events', events);
    fixture.detectChanges();

    expect(component.events()).toEqual(events);
  });

  it('should accept size input', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();

    expect(component.size()).toBe('lg');
    // Host element has the ds-calendar class
    expect(debugElement.nativeElement.className).toContain('ds-calendar--lg');
  });

  it('should accept locale input', () => {
    fixture.componentRef.setInput('locale', 'en-US');
    fixture.detectChanges();

    expect(component.locale()).toBe('en-US');
  });

  it('should accept firstDayOfWeek input', () => {
    fixture.componentRef.setInput('firstDayOfWeek', 0); // Dimanche
    fixture.detectChanges();

    expect(component.firstDayOfWeek()).toBe(0);
  });

  it('should accept disabledDate function', () => {
    const disableFn = (date: Date) => date.getDay() === 0; // Disable sundays
    fixture.componentRef.setInput('disabledDate', disableFn);
    fixture.detectChanges();

    expect(component.disabledDate()).toBe(disableFn);
  });

  // =========================================================================
  // TAILLES
  // =========================================================================

  it('should apply size class sm', () => {
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();

    // Host element has the ds-calendar class
    expect(debugElement.nativeElement.className).toContain('ds-calendar--sm');
  });

  it('should apply size class md', () => {
    fixture.componentRef.setInput('size', 'md');
    fixture.detectChanges();

    // Host element has the ds-calendar class
    expect(debugElement.nativeElement.className).toContain('ds-calendar--md');
  });

  it('should apply size class lg', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();

    // Host element has the ds-calendar class
    expect(debugElement.nativeElement.className).toContain('ds-calendar--lg');
  });

  // =========================================================================
  // NAVIGATION MOIS
  // =========================================================================

  it('should navigate to previous month', () => {
    const initialDate = new Date(2025, 5, 1); // Juin 2025
    component.displayDate.set(initialDate);
    fixture.detectChanges();

    component.previousMonth();
    fixture.detectChanges();

    expect(component.displayDate().getMonth()).toBe(4); // Mai
  });

  it('should navigate to next month', () => {
    const initialDate = new Date(2025, 5, 1); // Juin 2025
    component.displayDate.set(initialDate);
    fixture.detectChanges();

    component.nextMonth();
    fixture.detectChanges();

    expect(component.displayDate().getMonth()).toBe(6); // Juillet
  });

  it('should emit monthChange on navigation', () => {
    spyOn(component.monthChange, 'emit');
    component.nextMonth();

    expect(component.monthChange.emit).toHaveBeenCalledWith(
      jasmine.any(Date)
    );
  });

  it('should handle year transition when navigating months', () => {
    const initialDate = new Date(2025, 11, 1); // Décembre 2025
    component.displayDate.set(initialDate);
    fixture.detectChanges();

    component.nextMonth();
    fixture.detectChanges();

    expect(component.displayDate().getMonth()).toBe(0); // Janvier
    expect(component.displayDate().getFullYear()).toBe(2026);
  });

  // =========================================================================
  // NAVIGATION ANNÉE
  // =========================================================================

  it('should navigate to previous year', () => {
    const initialDate = new Date(2025, 5, 1);
    component.displayDate.set(initialDate);
    fixture.detectChanges();

    component.previousYear();
    fixture.detectChanges();

    expect(component.displayDate().getFullYear()).toBe(2024);
  });

  it('should navigate to next year', () => {
    const initialDate = new Date(2025, 5, 1);
    component.displayDate.set(initialDate);
    fixture.detectChanges();

    component.nextYear();
    fixture.detectChanges();

    expect(component.displayDate().getFullYear()).toBe(2026);
  });

  // =========================================================================
  // MODE CALENDRIER
  // =========================================================================

  it('should toggle between month and year mode', () => {
    expect(component.currentMode()).toBe('month');

    component.toggleMode();
    fixture.detectChanges();

    expect(component.currentMode()).toBe('year');

    component.toggleMode();
    fixture.detectChanges();

    expect(component.currentMode()).toBe('month');
  });

  it('should emit modeChange on toggle', () => {
    spyOn(component.modeChange, 'emit');

    component.toggleMode();

    expect(component.modeChange.emit).toHaveBeenCalledWith('year');
  });

  it('should render year view when mode is year', () => {
    component.currentMode.set('year');
    fixture.detectChanges();

    const yearView = debugElement.query(By.css('.ds-calendar__year-view'));
    expect(yearView).toBeTruthy();

    const monthView = debugElement.query(By.css('.ds-calendar__month-view'));
    expect(monthView).toBeFalsy();
  });

  it('should render 12 months in year view', () => {
    component.currentMode.set('year');
    fixture.detectChanges();

    const months = debugElement.queryAll(By.css('.ds-calendar__month'));
    expect(months.length).toBe(12);
  });

  // =========================================================================
  // SÉLECTION DATE
  // =========================================================================

  it('should emit dateSelect on day click', () => {
    spyOn(component.dateSelect, 'emit');

    const days = debugElement.queryAll(By.css('.ds-calendar__day'));
    const firstDay = days[0];
    firstDay.nativeElement.click();

    expect(component.dateSelect.emit).toHaveBeenCalledWith(jasmine.any(Date));
  });

  it('should not emit dateSelect for disabled dates', () => {
    const disableFn = () => true; // Disable all
    fixture.componentRef.setInput('disabledDate', disableFn);
    fixture.detectChanges();

    spyOn(component.dateSelect, 'emit');

    const days = debugElement.queryAll(By.css('.ds-calendar__day'));
    const firstDay = days[0];
    firstDay.nativeElement.click();

    expect(component.dateSelect.emit).not.toHaveBeenCalled();
  });

  // =========================================================================
  // SÉLECTION MOIS (VUE ANNÉE)
  // =========================================================================

  it('should select month and switch to month view', () => {
    component.currentMode.set('year');
    const initialDate = new Date(2025, 5, 1);
    component.displayDate.set(initialDate);
    fixture.detectChanges();

    const month = { monthIndex: 8, label: 'Septembre', isCurrentMonth: false };
    component.selectMonth(month);
    fixture.detectChanges();

    expect(component.displayDate().getMonth()).toBe(8);
    expect(component.currentMode()).toBe('month');
  });

  it('should emit modeChange when selecting month', () => {
    component.currentMode.set('year');
    spyOn(component.modeChange, 'emit');

    const month = { monthIndex: 3, label: 'Avril', isCurrentMonth: false };
    component.selectMonth(month);

    expect(component.modeChange.emit).toHaveBeenCalledWith('month');
  });

  // =========================================================================
  // ÉVÉNEMENTS
  // =========================================================================

  it('should display events on days', () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events: CalendarEvent[] = [
      { id: '1', date: today, title: 'Meeting', type: 'success' },
    ];

    fixture.componentRef.setInput('value', today);
    fixture.componentRef.setInput('events', events);
    fixture.detectChanges();

    const eventElements = debugElement.queryAll(
      By.css('.ds-calendar__event')
    );
    expect(eventElements.length).toBeGreaterThan(0);
  });

  it('should emit eventClick on event click', () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events: CalendarEvent[] = [
      { id: '1', date: today, title: 'Meeting', type: 'success' },
    ];

    fixture.componentRef.setInput('value', today);
    fixture.componentRef.setInput('events', events);
    fixture.detectChanges();

    spyOn(component.eventClick, 'emit');

    const eventElement = debugElement.query(By.css('.ds-calendar__event'));
    eventElement.nativeElement.click();

    expect(component.eventClick.emit).toHaveBeenCalledWith(events[0]);
  });

  it('should apply event type classes', () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events: CalendarEvent[] = [
      { id: '1', date: today, title: 'Success', type: 'success' },
      { id: '2', date: today, title: 'Warning', type: 'warning' },
      { id: '3', date: today, title: 'Error', type: 'error' },
    ];

    fixture.componentRef.setInput('value', today);
    fixture.componentRef.setInput('events', events);
    fixture.detectChanges();

    const successEvent = debugElement.query(
      By.css('.ds-calendar__event--success')
    );
    expect(successEvent).toBeTruthy();

    const warningEvent = debugElement.query(
      By.css('.ds-calendar__event--warning')
    );
    expect(warningEvent).toBeTruthy();

    const errorEvent = debugElement.query(
      By.css('.ds-calendar__event--error')
    );
    expect(errorEvent).toBeTruthy();
  });

  // =========================================================================
  // CLASSES CSS
  // =========================================================================

  it('should apply today class to current date', () => {
    const todayBtn = debugElement.query(
      By.css('.ds-calendar__day--today')
    );
    expect(todayBtn).toBeTruthy();
  });

  it('should apply other-month class to days outside current month', () => {
    const otherMonthDays = debugElement.queryAll(
      By.css('.ds-calendar__day--other-month')
    );
    expect(otherMonthDays.length).toBeGreaterThan(0);
  });

  it('should apply disabled class to disabled dates', () => {
    const disableFn = (date: Date) => date.getDay() === 0;
    fixture.componentRef.setInput('disabledDate', disableFn);
    fixture.detectChanges();

    const disabledDays = debugElement.queryAll(
      By.css('.ds-calendar__day--disabled')
    );
    expect(disabledDays.length).toBeGreaterThan(0);
  });

  it('should apply has-events class to days with events', () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events: CalendarEvent[] = [
      { id: '1', date: today, title: 'Event', type: 'default' },
    ];

    fixture.componentRef.setInput('value', today);
    fixture.componentRef.setInput('events', events);
    fixture.detectChanges();

    const hasEventsDays = debugElement.queryAll(
      By.css('.ds-calendar__day--has-events')
    );
    expect(hasEventsDays.length).toBeGreaterThan(0);
  });

  // =========================================================================
  // COMPUTED SIGNALS
  // =========================================================================

  it('should compute calendar title for month mode', () => {
    const date = new Date(2025, 5, 15);
    component.displayDate.set(date);
    component.currentMode.set('month');
    fixture.detectChanges();

    const title = component.calendarTitle();
    expect(title).toContain('2025');
    expect(title.toLowerCase()).toContain('juin');
  });

  it('should compute calendar title for year mode', () => {
    const date = new Date(2025, 5, 15);
    component.displayDate.set(date);
    component.currentMode.set('year');
    fixture.detectChanges();

    const title = component.calendarTitle();
    expect(title).toBe('2025');
  });

  it('should compute weekdays based on locale', () => {
    fixture.componentRef.setInput('locale', 'en-US');
    fixture.detectChanges();

    const weekDays = component.weekDays();
    expect(weekDays.length).toBe(7);
    expect(weekDays[0]).toBeTruthy(); // Should have capitalized first letter
  });

  it('should compute weekdays based on firstDayOfWeek', () => {
    fixture.componentRef.setInput('firstDayOfWeek', 0); // Sunday
    fixture.detectChanges();

    const weekDays = component.weekDays();
    expect(weekDays.length).toBe(7);
  });

  it('should compute calendar grid with correct number of days', () => {
    const grid = component.calendarGrid();
    expect(grid.length).toBe(42);
  });

  it('should compute month grid with 12 months', () => {
    const months = component.monthGrid();
    expect(months.length).toBe(12);
  });

  // =========================================================================
  // MÉTHODES UTILITAIRES
  // =========================================================================

  it('should generate correct day classes', () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const day = {
      date: today,
      isCurrentMonth: true,
      isToday: true,
      isDisabled: false,
      events: [],
    };

    const classes = component.getDayClasses(day);
    expect(classes).toContain('ds-calendar__day');
    expect(classes).toContain('ds-calendar__day--today');
  });

  it('should generate correct month classes', () => {
    const month = {
      monthIndex: 5,
      label: 'Juin',
      isCurrentMonth: true,
    };

    const classes = component.getMonthClasses(month);
    expect(classes).toContain('ds-calendar__month');
    expect(classes).toContain('ds-calendar__month--current');
  });

  it('should generate correct event classes', () => {
    const event: CalendarEvent = {
      id: '1',
      date: new Date(),
      title: 'Test',
      type: 'success',
    };

    const classes = component.getEventClasses(event);
    expect(classes).toContain('ds-calendar__event');
    expect(classes).toContain('ds-calendar__event--success');
  });

  // =========================================================================
  // ACCESSIBILITÉ
  // =========================================================================

  it('should have aria-label on day buttons', () => {
    const days = debugElement.queryAll(By.css('.ds-calendar__day'));
    const firstDay = days[0];

    expect(firstDay.nativeElement.getAttribute('aria-label')).toBeTruthy();
  });

  it('should have aria-current on today', () => {
    const todayBtn = debugElement.query(
      By.css('.ds-calendar__day--today')
    );

    expect(todayBtn.nativeElement.getAttribute('aria-current')).toBe('date');
  });

  it('should have aria-label on navigation buttons', () => {
    const navBtns = debugElement.queryAll(By.css('.ds-calendar__nav-btn'));

    navBtns.forEach((btn) => {
      expect(btn.nativeElement.getAttribute('aria-label')).toBeTruthy();
    });
  });

  it('should have aria-label on month buttons in year view', () => {
    component.currentMode.set('year');
    fixture.detectChanges();

    const months = debugElement.queryAll(By.css('.ds-calendar__month'));
    months.forEach((month) => {
      expect(month.nativeElement.getAttribute('aria-label')).toBeTruthy();
    });
  });

  // =========================================================================
  // EDGE CASES
  // =========================================================================

  it('should handle leap year correctly', () => {
    const leapYearDate = new Date(2024, 1, 15); // Février 2024 (leap year)
    component.displayDate.set(leapYearDate);
    fixture.detectChanges();

    const grid = component.calendarGrid();
    const februaryDays = grid.filter(
      (day) => day.isCurrentMonth && day.date.getMonth() === 1
    );

    expect(februaryDays.length).toBe(29);
  });

  it('should handle non-leap year correctly', () => {
    const nonLeapYearDate = new Date(2025, 1, 15); // Février 2025 (non-leap year)
    component.displayDate.set(nonLeapYearDate);
    fixture.detectChanges();

    const grid = component.calendarGrid();
    const februaryDays = grid.filter(
      (day) => day.isCurrentMonth && day.date.getMonth() === 1
    );

    expect(februaryDays.length).toBe(28);
  });

  it('should handle multiple events on same day', () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events: CalendarEvent[] = [
      { id: '1', date: today, title: 'Event 1', type: 'success' },
      { id: '2', date: today, title: 'Event 2', type: 'warning' },
      { id: '3', date: today, title: 'Event 3', type: 'error' },
    ];

    fixture.componentRef.setInput('value', today);
    fixture.componentRef.setInput('events', events);
    fixture.detectChanges();

    const eventElements = debugElement.queryAll(
      By.css('.ds-calendar__event')
    );
    expect(eventElements.length).toBe(3);
  });
});
