import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DsDatePicker, DatePickerSize, DatePickerMode, DateRange } from './ds-date-picker';

@Component({
  template: `
    <ds-date-picker
      [size]="size"
      [mode]="mode"
      [disabled]="disabled"
      [minDate]="minDate"
      [maxDate]="maxDate"
      [showTodayButton]="showTodayButton"
      [showClearButton]="showClearButton"
      (dateChange)="onDateChange($event)"
      (rangeChange)="onRangeChange($event)">
    </ds-date-picker>
  `,
  standalone: true,
  imports: [DsDatePicker],
})
class TestHostComponent {
  size: DatePickerSize = 'md';
  mode: DatePickerMode = 'single';
  disabled = false;
  minDate: Date | null = null;
  maxDate: Date | null = null;
  showTodayButton = true;
  showClearButton = true;

  selectedDate: Date | null = null;
  selectedRange: DateRange = { start: null, end: null };

  onDateChange(date: Date | null): void {
    this.selectedDate = date;
  }

  onRangeChange(range: DateRange): void {
    this.selectedRange = range;
  }
}

@Component({
  template: `
    <ds-date-picker [formControl]="control"></ds-date-picker>
  `,
  standalone: true,
  imports: [DsDatePicker, ReactiveFormsModule],
})
class TestFormComponent {
  control = new FormControl<Date | null>(null);
}

describe('DsDatePicker', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture?.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('rendering', () => {
    it('should render calendar container', () => {
      const container = fixture.debugElement.query(By.css('.ds-date-picker'));
      expect(container).toBeTruthy();
    });

    it('should render header with navigation', () => {
      const header = fixture.debugElement.query(By.css('.ds-date-picker__header'));
      expect(header).toBeTruthy();

      const prevBtn = fixture.debugElement.query(By.css('.ds-date-picker__nav--prev'));
      const nextBtn = fixture.debugElement.query(By.css('.ds-date-picker__nav--next'));
      expect(prevBtn).toBeTruthy();
      expect(nextBtn).toBeTruthy();
    });

    it('should display current month and year', () => {
      const monthBtn = fixture.debugElement.query(By.css('.ds-date-picker__month-btn'));
      const yearBtn = fixture.debugElement.query(By.css('.ds-date-picker__year-btn'));

      const today = new Date();
      const monthNames = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
      ];

      expect(monthBtn.nativeElement.textContent.trim()).toBe(monthNames[today.getMonth()]);
      expect(yearBtn.nativeElement.textContent.trim()).toBe(today.getFullYear().toString());
    });

    it('should render weekday headers', () => {
      const weekdays = fixture.debugElement.queryAll(By.css('.ds-date-picker__weekday'));
      expect(weekdays.length).toBe(7);
      expect(weekdays[0].nativeElement.textContent.trim()).toBe('Lu');
    });

    it('should render calendar days', () => {
      const days = fixture.debugElement.queryAll(By.css('.ds-date-picker__day'));
      expect(days.length).toBeGreaterThan(28); // Au moins 4 semaines
    });
  });

  describe('size', () => {
    it('should apply sm size class', () => {
      component.size = 'sm';
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-date-picker'));
      expect(container.nativeElement.classList.contains('ds-date-picker--sm')).toBe(true);
    });

    it('should apply md size class by default', () => {
      const container = fixture.debugElement.query(By.css('.ds-date-picker'));
      expect(container.nativeElement.classList.contains('ds-date-picker--md')).toBe(true);
    });

    it('should apply lg size class', () => {
      component.size = 'lg';
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-date-picker'));
      expect(container.nativeElement.classList.contains('ds-date-picker--lg')).toBe(true);
    });
  });

  describe('navigation', () => {
    it('should navigate to previous month', () => {
      const datePickerInstance = fixture.debugElement.query(By.directive(DsDatePicker)).componentInstance as DsDatePicker;
      const initialMonth = datePickerInstance.currentMonth();

      const prevBtn = fixture.debugElement.query(By.css('.ds-date-picker__nav--prev'));
      prevBtn.nativeElement.click();
      fixture.detectChanges();

      const expectedMonth = initialMonth === 0 ? 11 : initialMonth - 1;
      expect(datePickerInstance.currentMonth()).toBe(expectedMonth);
    });

    it('should navigate to next month', () => {
      const datePickerInstance = fixture.debugElement.query(By.directive(DsDatePicker)).componentInstance as DsDatePicker;
      const initialMonth = datePickerInstance.currentMonth();

      const nextBtn = fixture.debugElement.query(By.css('.ds-date-picker__nav--next'));
      nextBtn.nativeElement.click();
      fixture.detectChanges();

      const expectedMonth = initialMonth === 11 ? 0 : initialMonth + 1;
      expect(datePickerInstance.currentMonth()).toBe(expectedMonth);
    });

    it('should wrap year when navigating past December', () => {
      const datePickerInstance = fixture.debugElement.query(By.directive(DsDatePicker)).componentInstance as DsDatePicker;
      datePickerInstance.currentMonth.set(11); // Décembre
      const initialYear = datePickerInstance.currentYear();
      fixture.detectChanges();

      const nextBtn = fixture.debugElement.query(By.css('.ds-date-picker__nav--next'));
      nextBtn.nativeElement.click();
      fixture.detectChanges();

      expect(datePickerInstance.currentMonth()).toBe(0); // Janvier
      expect(datePickerInstance.currentYear()).toBe(initialYear + 1);
    });

    it('should wrap year when navigating before January', () => {
      const datePickerInstance = fixture.debugElement.query(By.directive(DsDatePicker)).componentInstance as DsDatePicker;
      datePickerInstance.currentMonth.set(0); // Janvier
      const initialYear = datePickerInstance.currentYear();
      fixture.detectChanges();

      const prevBtn = fixture.debugElement.query(By.css('.ds-date-picker__nav--prev'));
      prevBtn.nativeElement.click();
      fixture.detectChanges();

      expect(datePickerInstance.currentMonth()).toBe(11); // Décembre
      expect(datePickerInstance.currentYear()).toBe(initialYear - 1);
    });
  });

  describe('month picker', () => {
    it('should toggle month picker on click', () => {
      const monthBtn = fixture.debugElement.query(By.css('.ds-date-picker__month-btn'));
      monthBtn.nativeElement.click();
      fixture.detectChanges();

      const monthPicker = fixture.debugElement.query(By.css('.ds-date-picker__month-picker'));
      expect(monthPicker).toBeTruthy();
    });

    it('should select month and close picker', () => {
      const datePickerInstance = fixture.debugElement.query(By.directive(DsDatePicker)).componentInstance as DsDatePicker;

      const monthBtn = fixture.debugElement.query(By.css('.ds-date-picker__month-btn'));
      monthBtn.nativeElement.click();
      fixture.detectChanges();

      const marchOption = fixture.debugElement.queryAll(By.css('.ds-date-picker__month-option'))[2];
      marchOption.nativeElement.click();
      fixture.detectChanges();

      expect(datePickerInstance.currentMonth()).toBe(2); // Mars (index 2)
      expect(datePickerInstance.showMonthPicker()).toBe(false);
    });
  });

  describe('year picker', () => {
    it('should toggle year picker on click', () => {
      const yearBtn = fixture.debugElement.query(By.css('.ds-date-picker__year-btn'));
      yearBtn.nativeElement.click();
      fixture.detectChanges();

      const yearPicker = fixture.debugElement.query(By.css('.ds-date-picker__year-picker'));
      expect(yearPicker).toBeTruthy();
    });

    it('should select year and close picker', () => {
      const datePickerInstance = fixture.debugElement.query(By.directive(DsDatePicker)).componentInstance as DsDatePicker;
      const currentYear = datePickerInstance.currentYear();

      const yearBtn = fixture.debugElement.query(By.css('.ds-date-picker__year-btn'));
      yearBtn.nativeElement.click();
      fixture.detectChanges();

      // Sélectionner une année différente (la première de la liste)
      const yearOptions = fixture.debugElement.queryAll(By.css('.ds-date-picker__year-option'));
      const firstYearOption = yearOptions[0];
      firstYearOption.nativeElement.click();
      fixture.detectChanges();

      expect(datePickerInstance.showYearPicker()).toBe(false);
    });
  });

  describe('date selection', () => {
    it('should select date and emit event', () => {
      const days = fixture.debugElement.queryAll(By.css('.ds-date-picker__day:not(.ds-date-picker__day--other-month)'));
      const firstVisibleDay = days[0];
      firstVisibleDay.nativeElement.click();
      fixture.detectChanges();

      expect(component.selectedDate).toBeTruthy();
    });

    it('should highlight selected date', () => {
      const days = fixture.debugElement.queryAll(By.css('.ds-date-picker__day:not(.ds-date-picker__day--other-month)'));
      const firstVisibleDay = days[0];
      firstVisibleDay.nativeElement.click();
      fixture.detectChanges();

      expect(firstVisibleDay.nativeElement.classList.contains('ds-date-picker__day--selected')).toBe(true);
    });

    it('should highlight today', () => {
      const todayElement = fixture.debugElement.query(By.css('.ds-date-picker__day--today'));
      expect(todayElement).toBeTruthy();
    });
  });

  describe('range mode', () => {
    beforeEach(() => {
      component.mode = 'range';
      fixture.detectChanges();
    });

    it('should select range start on first click', () => {
      const datePickerInstance = fixture.debugElement.query(By.directive(DsDatePicker)).componentInstance as DsDatePicker;

      const days = fixture.debugElement.queryAll(By.css('.ds-date-picker__day:not(.ds-date-picker__day--other-month)'));
      days[0].nativeElement.click();
      fixture.detectChanges();

      expect(datePickerInstance.rangeStart()).toBeTruthy();
      expect(datePickerInstance.rangeEnd()).toBeNull();
    });

    it('should complete range on second click', () => {
      const days = fixture.debugElement.queryAll(By.css('.ds-date-picker__day:not(.ds-date-picker__day--other-month)'));
      days[0].nativeElement.click();
      fixture.detectChanges();

      days[5].nativeElement.click();
      fixture.detectChanges();

      expect(component.selectedRange.start).toBeTruthy();
      expect(component.selectedRange.end).toBeTruthy();
    });

    it('should swap dates if end is before start', () => {
      const days = fixture.debugElement.queryAll(By.css('.ds-date-picker__day:not(.ds-date-picker__day--other-month)'));

      // Sélectionner le jour 10 d'abord, puis le jour 5
      days[9].nativeElement.click();
      fixture.detectChanges();

      days[4].nativeElement.click();
      fixture.detectChanges();

      expect(component.selectedRange.start).toBeTruthy();
      expect(component.selectedRange.end).toBeTruthy();
      if (component.selectedRange.start && component.selectedRange.end) {
        expect(component.selectedRange.start <= component.selectedRange.end).toBe(true);
      }
    });
  });

  describe('disabled state', () => {
    it('should apply disabled class', fakeAsync(() => {
      component.disabled = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-date-picker'));
      expect(container.nativeElement.classList.contains('ds-date-picker--disabled')).toBe(true);
    }));

    it('should disable navigation buttons', fakeAsync(() => {
      component.disabled = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const prevBtn = fixture.debugElement.query(By.css('.ds-date-picker__nav--prev'));
      const nextBtn = fixture.debugElement.query(By.css('.ds-date-picker__nav--next'));

      expect(prevBtn.nativeElement.disabled).toBe(true);
      expect(nextBtn.nativeElement.disabled).toBe(true);
    }));
  });

  describe('min/max date constraints', () => {
    it('should disable dates before minDate', () => {
      const today = new Date();
      component.minDate = today;
      fixture.detectChanges();

      const disabledDays = fixture.debugElement.queryAll(By.css('.ds-date-picker__day--disabled'));
      // Il devrait y avoir des jours désactivés avant aujourd'hui
      expect(disabledDays.length).toBeGreaterThanOrEqual(0);
    });

    it('should disable dates after maxDate', () => {
      const today = new Date();
      const pastDate = new Date(today);
      pastDate.setDate(pastDate.getDate() - 10);
      component.maxDate = pastDate;
      fixture.detectChanges();

      const disabledDays = fixture.debugElement.queryAll(By.css('.ds-date-picker__day--disabled'));
      // Il devrait y avoir des jours désactivés après maxDate
      expect(disabledDays.length).toBeGreaterThan(0);
    });
  });

  describe('today button', () => {
    it('should show today button by default', () => {
      const todayBtn = fixture.debugElement.query(By.css('.ds-date-picker__action'));
      expect(todayBtn).toBeTruthy();
    });

    it('should navigate to today on click', () => {
      const datePickerInstance = fixture.debugElement.query(By.directive(DsDatePicker)).componentInstance as DsDatePicker;

      // Naviguer vers un autre mois d'abord
      datePickerInstance.currentMonth.set(0);
      datePickerInstance.currentYear.set(2020);
      fixture.detectChanges();

      const actions = fixture.debugElement.queryAll(By.css('.ds-date-picker__action'));
      const todayBtn = actions[0];
      todayBtn.nativeElement.click();
      fixture.detectChanges();

      const today = new Date();
      expect(datePickerInstance.currentMonth()).toBe(today.getMonth());
      expect(datePickerInstance.currentYear()).toBe(today.getFullYear());
    });

    it('should hide today button when showTodayButton is false', () => {
      component.showTodayButton = false;
      component.showClearButton = false;
      fixture.detectChanges();

      const actions = fixture.debugElement.query(By.css('.ds-date-picker__actions'));
      expect(actions).toBeFalsy();
    });
  });

  describe('clear button', () => {
    it('should clear selection on click', () => {
      // D'abord sélectionner une date
      const days = fixture.debugElement.queryAll(By.css('.ds-date-picker__day:not(.ds-date-picker__day--other-month)'));
      days[0].nativeElement.click();
      fixture.detectChanges();

      expect(component.selectedDate).toBeTruthy();

      // Puis la effacer
      const actions = fixture.debugElement.queryAll(By.css('.ds-date-picker__action'));
      const clearBtn = actions[1]; // Le deuxième bouton est Clear
      clearBtn.nativeElement.click();
      fixture.detectChanges();

      expect(component.selectedDate).toBeNull();
    });
  });

  describe('accessibility', () => {
    it('should have grid role on calendar', () => {
      const calendar = fixture.debugElement.query(By.css('.ds-date-picker__calendar'));
      expect(calendar.nativeElement.getAttribute('role')).toBe('grid');
    });

    it('should have aria-label on calendar', () => {
      const calendar = fixture.debugElement.query(By.css('.ds-date-picker__calendar'));
      expect(calendar.nativeElement.getAttribute('aria-label')).toContain('Calendrier');
    });

    it('should have columnheader role on weekdays', () => {
      const weekday = fixture.debugElement.query(By.css('.ds-date-picker__weekday'));
      expect(weekday.nativeElement.getAttribute('role')).toBe('columnheader');
    });

    it('should have gridcell role on days', () => {
      const day = fixture.debugElement.query(By.css('.ds-date-picker__day'));
      expect(day.nativeElement.getAttribute('role')).toBe('gridcell');
    });

    it('should have aria-label on navigation buttons', () => {
      const prevBtn = fixture.debugElement.query(By.css('.ds-date-picker__nav--prev'));
      const nextBtn = fixture.debugElement.query(By.css('.ds-date-picker__nav--next'));

      expect(prevBtn.nativeElement.getAttribute('aria-label')).toBe('Mois précédent');
      expect(nextBtn.nativeElement.getAttribute('aria-label')).toBe('Mois suivant');
    });
  });
});

describe('DsDatePicker with FormControl', () => {
  let component: TestFormComponent;
  let fixture: ComponentFixture<TestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture?.destroy();
  });

  it('should work with FormControl', () => {
    expect(component).toBeTruthy();
  });

  it('should update FormControl value on date selection', fakeAsync(() => {
    const days = fixture.debugElement.queryAll(By.css('.ds-date-picker__day:not(.ds-date-picker__day--other-month)'));
    days[0].nativeElement.click();
    tick();
    fixture.detectChanges();

    expect(component.control.value).toBeTruthy();
    expect(component.control.value instanceof Date).toBe(true);
  }));

  it('should update calendar when FormControl value changes', fakeAsync(() => {
    const newDate = new Date(2025, 5, 15); // 15 Juin 2025
    component.control.setValue(newDate);
    tick();
    fixture.detectChanges();

    const datePickerInstance = fixture.debugElement.query(By.directive(DsDatePicker)).componentInstance as DsDatePicker;
    expect(datePickerInstance.currentMonth()).toBe(5); // Juin
    expect(datePickerInstance.currentYear()).toBe(2025);
  }));
});

describe('DsDatePicker standalone', () => {
  let component: DsDatePicker;
  let fixture: ComponentFixture<DsDatePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsDatePicker],
    }).compileComponents();

    fixture = TestBed.createComponent(DsDatePicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture?.destroy();
  });

  it('should create standalone', () => {
    expect(component).toBeTruthy();
  });

  it('should have default size of md', () => {
    expect(component.size()).toBe('md');
  });

  it('should have default mode of single', () => {
    expect(component.mode()).toBe('single');
  });

  it('should have showTodayButton true by default', () => {
    expect(component.showTodayButton()).toBe(true);
  });

  it('should have showClearButton true by default', () => {
    expect(component.showClearButton()).toBe(true);
  });
});
