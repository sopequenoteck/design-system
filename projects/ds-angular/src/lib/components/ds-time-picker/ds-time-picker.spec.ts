import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsTimePicker } from './ds-time-picker';
import { OverlayModule } from '@angular/cdk/overlay';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DsTimePicker', () => {
  let component: DsTimePicker;
  let fixture: ComponentFixture<DsTimePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsTimePicker, OverlayModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DsTimePicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Clean up any overlays left in the DOM to prevent memory leaks
    document.querySelectorAll('.cdk-overlay-container').forEach((el) => {
      el.innerHTML = '';
    });
    fixture?.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render with default size (md)', () => {
      const container = fixture.nativeElement.querySelector('.ds-time-picker');
      expect(container.classList.contains('ds-time-picker--md')).toBe(true);
    });

    it('should render with small size', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-time-picker');
      expect(container.classList.contains('ds-time-picker--sm')).toBe(true);
    });

    it('should render with large size', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-time-picker');
      expect(container.classList.contains('ds-time-picker--lg')).toBe(true);
    });

    it('should display placeholder when no value', () => {
      fixture.componentRef.setInput('placeholder', 'Select time');
      fixture.detectChanges();

      const placeholder = fixture.nativeElement.querySelector('.ds-time-picker__placeholder');
      expect(placeholder.textContent.trim()).toBe('Select time');
    });

    it('should display formatted time when value is set', () => {
      fixture.componentRef.setInput('value', '14:30');
      fixture.detectChanges();

      const display = fixture.nativeElement.querySelector('.ds-time-picker__display');
      expect(display.textContent.trim()).toBe('14:30');
    });

    it('should display 12h format', () => {
      fixture.componentRef.setInput('value', '14:30');
      fixture.componentRef.setInput('format', '12h');
      fixture.detectChanges();

      const display = fixture.nativeElement.querySelector('.ds-time-picker__display');
      expect(display.textContent.trim()).toBe('2:30 PM');
    });

    it('should display seconds when showSeconds is true', () => {
      fixture.componentRef.setInput('value', '14:30:45');
      fixture.componentRef.setInput('showSeconds', true);
      fixture.detectChanges();

      const display = fixture.nativeElement.querySelector('.ds-time-picker__display');
      expect(display.textContent.trim()).toBe('14:30:45');
    });
  });

  describe('States', () => {
    it('should apply disabled class', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-time-picker');
      expect(container.classList.contains('ds-time-picker--disabled')).toBe(true);
    });

    it('should apply readonly class', () => {
      fixture.componentRef.setInput('readonly', true);
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-time-picker');
      expect(container.classList.contains('ds-time-picker--readonly')).toBe(true);
    });

    it('should apply focused class on focus', () => {
      const input = fixture.nativeElement.querySelector('.ds-time-picker__input');
      input.dispatchEvent(new Event('focus'));
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-time-picker');
      expect(container.classList.contains('ds-time-picker--focused')).toBe(true);
    });

    it('should remove focused class on blur', () => {
      const input = fixture.nativeElement.querySelector('.ds-time-picker__input');
      input.dispatchEvent(new Event('focus'));
      fixture.detectChanges();
      input.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-time-picker');
      expect(container.classList.contains('ds-time-picker--focused')).toBe(false);
    });
  });

  describe('Interactions', () => {
    it('should open panel on click', () => {
      const input = fixture.nativeElement.querySelector('.ds-time-picker__input');
      input.click();
      fixture.detectChanges();

      expect(component.isOpen()).toBe(true);
    });

    it('should close panel on backdrop click', () => {
      const input = fixture.nativeElement.querySelector('.ds-time-picker__input');
      input.click();
      fixture.detectChanges();

      // Simulate backdrop click
      const backdrop = document.querySelector('.cdk-overlay-backdrop');
      if (backdrop) {
        (backdrop as HTMLElement).click();
        fixture.detectChanges();
      }

      expect(component.isOpen()).toBe(false);
    });

    it('should toggle panel on Enter key', () => {
      const input = fixture.nativeElement.querySelector('.ds-time-picker__input');
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      input.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.isOpen()).toBe(true);
    });

    it('should toggle panel on Space key', () => {
      const input = fixture.nativeElement.querySelector('.ds-time-picker__input');
      const event = new KeyboardEvent('keydown', { key: ' ' });
      input.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.isOpen()).toBe(true);
    });

    it('should not open when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('.ds-time-picker__input');
      input.click();
      fixture.detectChanges();

      expect(component.isOpen()).toBe(false);
    });

    it('should not open when readonly', () => {
      fixture.componentRef.setInput('readonly', true);
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('.ds-time-picker__input');
      input.click();
      fixture.detectChanges();

      expect(component.isOpen()).toBe(false);
    });

    it('should close panel on Escape key', () => {
      const input = fixture.nativeElement.querySelector('.ds-time-picker__input');
      input.click();
      fixture.detectChanges();
      expect(component.isOpen()).toBe(true);

      const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
      input.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.isOpen()).toBe(false);
    });
  });

  describe('ControlValueAccessor', () => {
    it('should write value', () => {
      component.writeValue('10:30');
      fixture.detectChanges();

      expect(component.internalValue()).toBe('10:30');
    });

    it('should register onChange callback', () => {
      const fn = jasmine.createSpy('onChange');
      component.registerOnChange(fn);

      component.writeValue('10:30');
      component['updateValue']('11:45');

      expect(fn).toHaveBeenCalledWith('11:45');
    });

    it('should register onTouched callback', () => {
      const fn = jasmine.createSpy('onTouched');
      component.registerOnTouched(fn);

      component.onBlur();

      expect(fn).toHaveBeenCalled();
    });

    it('should emit timeChange event', () => {
      let emittedValue: string | undefined;
      component.timeChange.subscribe((value) => (emittedValue = value));

      component['updateValue']('12:00');

      expect(emittedValue).toBe('12:00');
    });
  });

  describe('Time formatting', () => {
    it('should parse time string correctly', () => {
      const time = component['parseTime']('14:30');
      expect(time).toEqual({ hours: 14, minutes: 30, seconds: undefined });
    });

    it('should parse time with seconds', () => {
      const time = component['parseTime']('14:30:45');
      expect(time).toEqual({ hours: 14, minutes: 30, seconds: 45 });
    });

    it('should return null for invalid time', () => {
      const time = component['parseTime']('invalid');
      expect(time).toBeNull();
    });

    it('should format 24h time correctly', () => {
      const formatted = component['formatTimeForDisplay']({ hours: 14, minutes: 30 });
      expect(formatted).toBe('14:30');
    });

    it('should format 12h time correctly (PM)', () => {
      fixture.componentRef.setInput('format', '12h');
      fixture.detectChanges();

      const formatted = component['formatTimeForDisplay']({ hours: 14, minutes: 30 });
      expect(formatted).toBe('2:30 PM');
    });

    it('should format 12h time correctly (AM)', () => {
      fixture.componentRef.setInput('format', '12h');
      fixture.detectChanges();

      const formatted = component['formatTimeForDisplay']({ hours: 9, minutes: 15 });
      expect(formatted).toBe('9:15 AM');
    });

    it('should format midnight as 12:00 AM', () => {
      fixture.componentRef.setInput('format', '12h');
      fixture.detectChanges();

      const formatted = component['formatTimeForDisplay']({ hours: 0, minutes: 0 });
      expect(formatted).toBe('12:00 AM');
    });

    it('should format noon as 12:00 PM', () => {
      fixture.componentRef.setInput('format', '12h');
      fixture.detectChanges();

      const formatted = component['formatTimeForDisplay']({ hours: 12, minutes: 0 });
      expect(formatted).toBe('12:00 PM');
    });

    it('should format time with seconds in 24h', () => {
      fixture.componentRef.setInput('showSeconds', true);
      fixture.detectChanges();

      const formatted = component['formatTimeForDisplay']({ hours: 14, minutes: 30, seconds: 45 });
      expect(formatted).toBe('14:30:45');
    });

    it('should format time with seconds in 12h', () => {
      fixture.componentRef.setInput('format', '12h');
      fixture.componentRef.setInput('showSeconds', true);
      fixture.detectChanges();

      const formatted = component['formatTimeForDisplay']({ hours: 14, minutes: 30, seconds: 45 });
      expect(formatted).toBe('2:30:45 PM');
    });
  });

  describe('Additional behaviors', () => {
    it('should respect hourStep input', () => {
      fixture.componentRef.setInput('hourStep', 2);
      fixture.detectChanges();

      // hourStep is passed to the panel - verify input is set
      expect(component.hourStep()).toBe(2);
    });

    it('should handle empty string value', () => {
      component.writeValue('');
      fixture.detectChanges();

      expect(component.internalValue()).toBe('');
      expect(component.displayValue()).toBe('');
    });

    it('should handle null value in writeValue', () => {
      component.writeValue(null as unknown as string);
      fixture.detectChanges();

      expect(component.internalValue()).toBe('');
    });

    it('should close panel and update value on time selection', () => {
      const changeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(changeSpy);

      component.open();
      fixture.detectChanges();
      expect(component.isOpen()).toBe(true);

      component.onTimeSelected('15:45');
      fixture.detectChanges();

      expect(component.isOpen()).toBe(false);
      expect(component.internalValue()).toBe('15:45');
      expect(changeSpy).toHaveBeenCalledWith('15:45');
    });

    it('should apply open class when panel is open', () => {
      component.open();
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-time-picker');
      expect(container.classList.contains('ds-time-picker--open')).toBe(true);
    });
  });

  describe('ARIA attributes', () => {
    it('should have role combobox', () => {
      const input = fixture.nativeElement.querySelector('.ds-time-picker__input');
      expect(input.getAttribute('role')).toBe('combobox');
    });

    it('should have aria-expanded false by default', () => {
      const input = fixture.nativeElement.querySelector('.ds-time-picker__input');
      expect(input.getAttribute('aria-expanded')).toBe('false');
    });

    it('should update aria-expanded when opened', () => {
      component.open();
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('.ds-time-picker__input');
      expect(input.getAttribute('aria-expanded')).toBe('true');
    });

    it('should have aria-haspopup dialog', () => {
      const input = fixture.nativeElement.querySelector('.ds-time-picker__input');
      expect(input.getAttribute('aria-haspopup')).toBe('dialog');
    });

    it('should have aria-label from placeholder', () => {
      fixture.componentRef.setInput('placeholder', 'Select time');
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('.ds-time-picker__input');
      expect(input.getAttribute('aria-label')).toBe('Select time');
    });

    it('should have tabindex 0 when enabled', () => {
      const input = fixture.nativeElement.querySelector('.ds-time-picker__input');
      expect(input.getAttribute('tabindex')).toBe('0');
    });

    it('should have tabindex -1 when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('.ds-time-picker__input');
      expect(input.getAttribute('tabindex')).toBe('-1');
    });

    it('should have aria-controls when open', () => {
      const input = fixture.nativeElement.querySelector('.ds-time-picker__input');

      // Should not have aria-controls when closed
      expect(input.getAttribute('aria-controls')).toBeNull();

      // Open the picker
      component.open();
      fixture.detectChanges();

      // Should have aria-controls pointing to panel ID
      expect(input.getAttribute('aria-controls')).toBe(component.panelId);
    });
  });
});
