import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsTimePickerPanelComponent } from './ds-time-picker-panel.component';

describe('DsTimePickerPanelComponent', () => {
  let component: DsTimePickerPanelComponent;
  let fixture: ComponentFixture<DsTimePickerPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsTimePickerPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DsTimePickerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Hours column', () => {
    it('should display 24 hours options (0-23) in 24h format', () => {
      fixture.componentRef.setInput('format', '24h');
      fixture.detectChanges();

      const options = component.hoursOptions();
      expect(options.length).toBe(24);
      expect(options[0].value).toBe(0);
      expect(options[0].label).toBe('00');
      expect(options[23].value).toBe(23);
      expect(options[23].label).toBe('23');
    });

    it('should display 12 hours options (1-12) in 12h format', () => {
      fixture.componentRef.setInput('format', '12h');
      fixture.detectChanges();

      const options = component.hoursOptions();
      expect(options.length).toBe(12);
      expect(options[0].value).toBe(1);
      expect(options[0].label).toBe('01');
      expect(options[11].value).toBe(12);
      expect(options[11].label).toBe('12');
    });

    it('should respect hourStep', () => {
      fixture.componentRef.setInput('format', '24h');
      fixture.componentRef.setInput('hourStep', 2);
      fixture.detectChanges();

      const options = component.hoursOptions();
      expect(options.length).toBe(12); // 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22
      expect(options[0].value).toBe(0);
      expect(options[1].value).toBe(2);
      expect(options[11].value).toBe(22);
    });
  });

  describe('Minutes column', () => {
    it('should display 60 minutes options by default', () => {
      const options = component.minutesOptions();
      expect(options.length).toBe(60);
      expect(options[0].value).toBe(0);
      expect(options[0].label).toBe('00');
      expect(options[59].value).toBe(59);
      expect(options[59].label).toBe('59');
    });

    it('should respect minuteStep', () => {
      fixture.componentRef.setInput('minuteStep', 15);
      fixture.detectChanges();

      const options = component.minutesOptions();
      expect(options.length).toBe(4); // 0, 15, 30, 45
      expect(options[0].value).toBe(0);
      expect(options[1].value).toBe(15);
      expect(options[2].value).toBe(30);
      expect(options[3].value).toBe(45);
    });
  });

  describe('Seconds column', () => {
    it('should display seconds column when showSeconds is true', () => {
      fixture.componentRef.setInput('showSeconds', true);
      fixture.detectChanges();

      const options = component.secondsOptions();
      expect(options.length).toBe(60);

      const secondsColumn = fixture.nativeElement.querySelector('[aria-label="Seconds"]');
      expect(secondsColumn).toBeTruthy();
    });

    it('should not display seconds column when showSeconds is false', () => {
      fixture.componentRef.setInput('showSeconds', false);
      fixture.detectChanges();

      const secondsColumn = fixture.nativeElement.querySelector('[aria-label="Seconds"]');
      expect(secondsColumn).toBeFalsy();
    });
  });

  describe('AM/PM column', () => {
    it('should display AM/PM column in 12h format', () => {
      fixture.componentRef.setInput('format', '12h');
      fixture.detectChanges();

      const periodColumn = fixture.nativeElement.querySelector('[aria-label="Period"]');
      expect(periodColumn).toBeTruthy();

      const buttons = periodColumn.querySelectorAll('button');
      expect(buttons.length).toBe(2);
      expect(buttons[0].textContent.trim()).toBe('AM');
      expect(buttons[1].textContent.trim()).toBe('PM');
    });

    it('should not display AM/PM column in 24h format', () => {
      fixture.componentRef.setInput('format', '24h');
      fixture.detectChanges();

      const periodColumn = fixture.nativeElement.querySelector('[aria-label="Period"]');
      expect(periodColumn).toBeFalsy();
    });
  });

  describe('Selection', () => {
    it('should select hour on click', () => {
      component.selectHours(14);
      expect(component.selectedHours()).toBe(14);
    });

    it('should select minute on click', () => {
      component.selectMinutes(30);
      expect(component.selectedMinutes()).toBe(30);
    });

    it('should select second on click', () => {
      component.selectSeconds(45);
      expect(component.selectedSeconds()).toBe(45);
    });

    it('should toggle AM/PM on click', () => {
      fixture.componentRef.setInput('format', '12h');
      fixture.detectChanges();

      expect(component.selectedPeriod()).toBe('AM');

      component.selectPeriod('PM');
      expect(component.selectedPeriod()).toBe('PM');

      component.selectPeriod('AM');
      expect(component.selectedPeriod()).toBe('AM');
    });
  });

  describe('Time emission', () => {
    it('should emit time string on selection', () => {
      let emittedTime: string | undefined;
      component.timeSelected.subscribe((time) => (emittedTime = time));

      component.selectHours(14);
      expect(emittedTime).toBe('14:00');

      component.selectMinutes(30);
      expect(emittedTime).toBe('14:30');
    });

    it('should emit time with seconds when showSeconds is true', () => {
      fixture.componentRef.setInput('showSeconds', true);
      fixture.detectChanges();

      let emittedTime: string | undefined;
      component.timeSelected.subscribe((time) => (emittedTime = time));

      component.selectHours(14);
      component.selectMinutes(30);
      component.selectSeconds(45);

      expect(emittedTime).toBe('14:30:45');
    });

    it('should convert 12h PM to 24h on emit', () => {
      fixture.componentRef.setInput('format', '12h');
      fixture.detectChanges();

      let emittedTime: string | undefined;
      component.timeSelected.subscribe((time) => (emittedTime = time));

      component.selectHours(2);
      component.selectPeriod('PM');

      expect(emittedTime).toBe('14:00'); // 2 PM = 14:00
    });

    it('should convert 12h AM to 24h on emit', () => {
      fixture.componentRef.setInput('format', '12h');
      fixture.detectChanges();

      let emittedTime: string | undefined;
      component.timeSelected.subscribe((time) => (emittedTime = time));

      component.selectHours(12);
      component.selectPeriod('AM');

      expect(emittedTime).toBe('00:00'); // 12 AM = 00:00 (midnight)
    });
  });

  describe('Initial value parsing', () => {
    it('should parse initial value correctly in 24h format', () => {
      fixture.componentRef.setInput('value', '14:30');
      fixture.componentRef.setInput('format', '24h');
      fixture.detectChanges();

      // Wait for effect to run
      expect(component.selectedHours()).toBe(14);
      expect(component.selectedMinutes()).toBe(30);
    });

    it('should parse initial value correctly in 12h format', () => {
      fixture.componentRef.setInput('value', '14:30');
      fixture.componentRef.setInput('format', '12h');
      fixture.detectChanges();

      expect(component.selectedHours()).toBe(2); // 14:00 = 2 PM
      expect(component.selectedMinutes()).toBe(30);
      expect(component.selectedPeriod()).toBe('PM');
    });

    it('should parse midnight correctly in 12h format', () => {
      fixture.componentRef.setInput('value', '00:00');
      fixture.componentRef.setInput('format', '12h');
      fixture.detectChanges();

      expect(component.selectedHours()).toBe(12); // Midnight = 12 AM
      expect(component.selectedPeriod()).toBe('AM');
    });
  });

  describe('MinTime/MaxTime constraints', () => {
    it('should disable hours before minTime', () => {
      component.minTime = '09:00';
      fixture.detectChanges();

      const options = component.hoursOptions();
      // Hours 0-8 should be disabled
      expect(options.find(o => o.value === 0)?.disabled).toBe(true);
      expect(options.find(o => o.value === 8)?.disabled).toBe(true);
      // Hours 9+ should be enabled
      expect(options.find(o => o.value === 9)?.disabled).toBe(false);
      expect(options.find(o => o.value === 10)?.disabled).toBe(false);
    });

    it('should disable hours after maxTime', () => {
      component.maxTime = '17:00';
      fixture.detectChanges();

      const options = component.hoursOptions();
      // Hours up to 17 should be enabled
      expect(options.find(o => o.value === 16)?.disabled).toBe(false);
      expect(options.find(o => o.value === 17)?.disabled).toBe(false);
      // Hours 18+ should be disabled
      expect(options.find(o => o.value === 18)?.disabled).toBe(true);
      expect(options.find(o => o.value === 23)?.disabled).toBe(true);
    });

    it('should disable hours outside min-max range', () => {
      component.minTime = '09:00';
      component.maxTime = '17:00';
      fixture.detectChanges();

      const options = component.hoursOptions();
      // Hours 0-8 disabled
      expect(options.find(o => o.value === 8)?.disabled).toBe(true);
      // Hours 9-17 enabled
      expect(options.find(o => o.value === 9)?.disabled).toBe(false);
      expect(options.find(o => o.value === 12)?.disabled).toBe(false);
      expect(options.find(o => o.value === 17)?.disabled).toBe(false);
      // Hours 18+ disabled
      expect(options.find(o => o.value === 18)?.disabled).toBe(true);
    });

    it('should disable minutes below minTime when on min hour', () => {
      component.minTime = '09:30';
      component.selectHours(9); // Select the min hour
      fixture.detectChanges();

      const options = component.minutesOptions();
      // Minutes 0-29 should be disabled
      expect(options.find(o => o.value === 0)?.disabled).toBe(true);
      expect(options.find(o => o.value === 29)?.disabled).toBe(true);
      // Minutes 30+ should be enabled
      expect(options.find(o => o.value === 30)?.disabled).toBe(false);
      expect(options.find(o => o.value === 45)?.disabled).toBe(false);
    });

    it('should disable minutes above maxTime when on max hour', () => {
      component.maxTime = '17:30';
      component.selectHours(17); // Select the max hour
      fixture.detectChanges();

      const options = component.minutesOptions();
      // Minutes 0-30 should be enabled
      expect(options.find(o => o.value === 0)?.disabled).toBe(false);
      expect(options.find(o => o.value === 30)?.disabled).toBe(false);
      // Minutes 31+ should be disabled
      expect(options.find(o => o.value === 31)?.disabled).toBe(true);
      expect(options.find(o => o.value === 59)?.disabled).toBe(true);
    });

    it('should not disable minutes when not on boundary hour', () => {
      component.minTime = '09:30';
      component.maxTime = '17:30';
      component.selectHours(12); // Select a middle hour
      fixture.detectChanges();

      const options = component.minutesOptions();
      // All minutes should be enabled for middle hours
      expect(options.every(o => !o.disabled)).toBe(true);
    });

    it('should handle null minTime/maxTime', () => {
      component.minTime = null;
      component.maxTime = null;
      fixture.detectChanges();

      const hourOptions = component.hoursOptions();
      const minuteOptions = component.minutesOptions();

      // All should be enabled
      expect(hourOptions.every(o => !o.disabled)).toBe(true);
      expect(minuteOptions.every(o => !o.disabled)).toBe(true);
    });
  });

  describe('ARIA attributes', () => {
    it('should have role dialog on panel', () => {
      const panel = fixture.nativeElement.querySelector('.ds-time-picker-panel');
      expect(panel.getAttribute('role')).toBe('dialog');
    });

    it('should have role listbox on columns', () => {
      const columns = fixture.nativeElement.querySelectorAll('[role="listbox"]');
      expect(columns.length).toBeGreaterThanOrEqual(2); // Hours + Minutes
    });

    it('should have role option on buttons', () => {
      const options = fixture.nativeElement.querySelectorAll('[role="option"]');
      expect(options.length).toBeGreaterThan(0);
    });

    it('should mark selected option with aria-selected', () => {
      component.selectHours(10);
      fixture.detectChanges();

      const hoursColumn = fixture.nativeElement.querySelector('[aria-label="Hours"]');
      const selectedOption = hoursColumn.querySelector('[aria-selected="true"]');
      expect(selectedOption).toBeTruthy();
      expect(selectedOption.textContent.trim()).toBe('10');
    });

    it('should have unique IDs on options', () => {
      const hourOption = fixture.nativeElement.querySelector('#hour-0');
      const minuteOption = fixture.nativeElement.querySelector('#minute-0');
      expect(hourOption).toBeTruthy();
      expect(minuteOption).toBeTruthy();
    });

    it('should have aria-disabled on disabled options', () => {
      component.minTime = '09:00';
      fixture.detectChanges();

      const disabledOption = fixture.nativeElement.querySelector('#hour-0');
      expect(disabledOption.getAttribute('aria-disabled')).toBe('true');
    });

    it('should have tabindex on listbox columns', () => {
      const hoursColumn = fixture.nativeElement.querySelector('[aria-label="Hours"]');
      expect(hoursColumn.getAttribute('tabindex')).toBe('0');
    });
  });

  describe('Keyboard navigation', () => {
    it('should set active column on focus', () => {
      component.setActiveColumn('minutes');
      expect(component.activeColumn()).toBe('minutes');
    });

    it('should get active option ID for hours', () => {
      component.selectHours(14);
      expect(component.getActiveOptionId('hours')).toBe('hour-14');
    });

    it('should get active option ID for minutes', () => {
      component.selectMinutes(30);
      expect(component.getActiveOptionId('minutes')).toBe('minute-30');
    });

    it('should get active option ID for period', () => {
      component.selectPeriod('PM');
      expect(component.getActiveOptionId('period')).toBe('period-PM');
    });

    it('should navigate hours with arrow down', () => {
      fixture.componentRef.setInput('format', '24h');
      fixture.detectChanges();

      component.selectHours(10);
      component.navigateOption('hours', 1);
      expect(component.selectedHours()).toBe(11);
    });

    it('should navigate hours with arrow up', () => {
      fixture.componentRef.setInput('format', '24h');
      fixture.detectChanges();

      component.selectHours(10);
      component.navigateOption('hours', -1);
      expect(component.selectedHours()).toBe(9);
    });

    it('should navigate minutes with arrow down', () => {
      component.selectMinutes(30);
      component.navigateOption('minutes', 1);
      expect(component.selectedMinutes()).toBe(31);
    });

    it('should skip disabled options when navigating', () => {
      component.minTime = '09:00';
      fixture.detectChanges();

      component.selectHours(9);
      component.navigateOption('hours', -1);
      // Should stay at 9 since 8 and below are disabled
      expect(component.selectedHours()).toBe(9);
    });

    it('should toggle period with arrow keys', () => {
      fixture.componentRef.setInput('format', '12h');
      fixture.detectChanges();

      component.selectPeriod('AM');
      component.navigateOption('period', 1);
      expect(component.selectedPeriod()).toBe('PM');

      component.navigateOption('period', -1);
      expect(component.selectedPeriod()).toBe('AM');
    });
  });
});
