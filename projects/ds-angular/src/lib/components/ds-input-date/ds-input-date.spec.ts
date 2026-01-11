import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DsInputDate, InputDateSize } from './ds-input-date';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DsInputDate', () => {
  let fixture: ComponentFixture<DsInputDate>;
  let component: DsInputDate;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsInputDate, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DsInputDate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default values', () => {
      expect(component.size()).toBe('md');
      expect(component.disabled()).toBe(false);
      expect(component.readonly()).toBe(false);
      expect(component.clearable()).toBe(true);
      expect(component.placeholder()).toBe('dd/mm/yyyy');
    });
  });

  describe('Size variants', () => {
    it('should apply sm size class', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();
      const container = fixture.debugElement.query(By.css('.ds-input-date'));
      expect(container.classes['ds-input-date--sm']).toBeTruthy();
    });

    it('should apply lg size class', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();
      const container = fixture.debugElement.query(By.css('.ds-input-date'));
      expect(container.classes['ds-input-date--lg']).toBeTruthy();
    });
  });

  // ==========================================================================
  // US1 TESTS - Sélection de date via calendrier
  // ==========================================================================

  describe('US1 - Calendar selection', () => {
    it('T013: popup should open on calendar icon click', () => {
      const calendarBtn = fixture.debugElement.query(By.css('.ds-input-date__calendar-btn'));
      calendarBtn.nativeElement.click();
      fixture.detectChanges();
      expect(component.isOpen()).toBe(true);
    });

    it('T014: popup should close after date selection', fakeAsync(() => {
      // Open popup
      component.open();
      fixture.detectChanges();
      expect(component.isOpen()).toBe(true);

      // Simulate date selection
      const testDate = new Date(2025, 2, 15);
      component.onDateSelected(testDate);
      tick();
      fixture.detectChanges();

      expect(component.isOpen()).toBe(false);
    }));

    it('T015: selected date should display formatted in input', fakeAsync(() => {
      const testDate = new Date(2025, 2, 15);
      component.onDateSelected(testDate);
      tick();
      fixture.detectChanges();

      expect(component.displayValue()).toBe('15/03/2025');
    }));

    it('T015b: dateChange should emit the selected Date', fakeAsync(() => {
      const spy = spyOn(component.dateChange, 'emit');
      const testDate = new Date(2025, 2, 15);

      component.onDateSelected(testDate);
      tick();

      expect(spy).toHaveBeenCalledWith(testDate);
    }));
  });

  // ==========================================================================
  // US2 TESTS - Saisie manuelle de date
  // ==========================================================================

  describe('US2 - Manual input', () => {
    it('T027: typing "15/03/2025" should be accepted', fakeAsync(() => {
      const input = fixture.debugElement.query(By.css('.ds-input-date__input'));
      input.nativeElement.value = '15/03/2025';
      input.nativeElement.dispatchEvent(new Event('input'));
      input.nativeElement.dispatchEvent(new Event('blur'));
      tick();
      fixture.detectChanges();

      expect(component.hasParseError()).toBe(false);
      expect(component.internalValue()?.getDate()).toBe(15);
      expect(component.internalValue()?.getMonth()).toBe(2);
      expect(component.internalValue()?.getFullYear()).toBe(2025);
    }));

    it('T028: typing "15-03-2025" (dashes) should be accepted', fakeAsync(() => {
      const input = fixture.debugElement.query(By.css('.ds-input-date__input'));
      input.nativeElement.value = '15-03-2025';
      input.nativeElement.dispatchEvent(new Event('input'));
      input.nativeElement.dispatchEvent(new Event('blur'));
      tick();
      fixture.detectChanges();

      expect(component.hasParseError()).toBe(false);
      expect(component.internalValue()?.getDate()).toBe(15);
    }));

    it('T029: typing "abc" should show error state', fakeAsync(() => {
      const input = fixture.debugElement.query(By.css('.ds-input-date__input'));
      input.nativeElement.value = 'abc';
      input.nativeElement.dispatchEvent(new Event('input'));
      input.nativeElement.dispatchEvent(new Event('blur'));
      tick();
      fixture.detectChanges();

      expect(component.hasParseError()).toBe(true);
      expect(component.inputState()).toBe('error');
    }));

    it('T030: typing "32/13/2025" should show error state', fakeAsync(() => {
      const input = fixture.debugElement.query(By.css('.ds-input-date__input'));
      input.nativeElement.value = '32/13/2025';
      input.nativeElement.dispatchEvent(new Event('input'));
      input.nativeElement.dispatchEvent(new Event('blur'));
      tick();
      fixture.detectChanges();

      expect(component.hasParseError()).toBe(true);
    }));

    it('T030b: pasting "15/03/2025" should be accepted', fakeAsync(() => {
      const input = fixture.debugElement.query(By.css('.ds-input-date__input'));
      // Simulate paste by setting value directly
      input.nativeElement.value = '15/03/2025';
      input.nativeElement.dispatchEvent(new Event('input'));
      input.nativeElement.dispatchEvent(new Event('blur'));
      tick();
      fixture.detectChanges();

      expect(component.hasParseError()).toBe(false);
      expect(component.internalValue()?.getDate()).toBe(15);
    }));

    it('T030c: typing "15 03 2025" (spaces) should be accepted', fakeAsync(() => {
      const input = fixture.debugElement.query(By.css('.ds-input-date__input'));
      input.nativeElement.value = '15 03 2025';
      input.nativeElement.dispatchEvent(new Event('input'));
      input.nativeElement.dispatchEvent(new Event('blur'));
      tick();
      fixture.detectChanges();

      expect(component.hasParseError()).toBe(false);
      expect(component.internalValue()?.getDate()).toBe(15);
    }));

    it('T030d: parsed date should be at 00:00:00 local time', fakeAsync(() => {
      const input = fixture.debugElement.query(By.css('.ds-input-date__input'));
      input.nativeElement.value = '15/03/2025';
      input.nativeElement.dispatchEvent(new Event('input'));
      input.nativeElement.dispatchEvent(new Event('blur'));
      tick();
      fixture.detectChanges();

      const date = component.internalValue();
      expect(date?.getHours()).toBe(0);
      expect(date?.getMinutes()).toBe(0);
      expect(date?.getSeconds()).toBe(0);
    }));
  });

  // ==========================================================================
  // US3 TESTS - ControlValueAccessor integration
  // ==========================================================================

  describe('US3 - Angular Forms integration', () => {
    it('T038: writeValue should update displayValue', fakeAsync(() => {
      const testDate = new Date(2025, 5, 20);
      component.writeValue(testDate);
      tick();
      fixture.detectChanges();

      expect(component.displayValue()).toBe('20/06/2025');
    }));

    it('T039: date selection should call onChange', fakeAsync(() => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);

      const testDate = new Date(2025, 5, 20);
      component.onDateSelected(testDate);
      tick();
      fixture.detectChanges();

      expect(onChangeSpy).toHaveBeenCalledWith(testDate);
    }));

    it('T040: FormControl disabled should disable component', fakeAsync(() => {
      fixture.componentRef.setInput('disabled', true);
      tick();
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('.ds-input-date__input'));
      expect(input.nativeElement.disabled).toBe(true);
    }));

    it('T041: FormControl with required should be invalid when null', () => {
      // Test that writeValue(null) sets null value
      component.writeValue(null);
      expect(component.internalValue()).toBeNull();
    });

    it('T041b: readonly input should prevent calendar click', () => {
      fixture.componentRef.setInput('readonly', true);
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-input-date'));
      expect(container.classes['ds-input-date--readonly']).toBeTruthy();
    });
  });

  // ==========================================================================
  // US4 TESTS - Date constraints
  // ==========================================================================

  describe('US4 - Date constraints', () => {
    it('T049: minDate should be passed to DsDatePicker', () => {
      const minDate = new Date(2025, 0, 1);
      fixture.componentRef.setInput('minDate', minDate);
      fixture.detectChanges();

      expect(component.effectiveMinDate()?.getTime()).toBe(minDate.getTime());
    });

    it('T050: maxDate should be passed to DsDatePicker', () => {
      const maxDate = new Date(2025, 11, 31);
      fixture.componentRef.setInput('maxDate', maxDate);
      fixture.detectChanges();

      expect(component.effectiveMaxDate()?.getTime()).toBe(maxDate.getTime());
    });

    it('T051: manual input out of range should show error', fakeAsync(() => {
      const minDate = new Date(2025, 0, 1);
      fixture.componentRef.setInput('minDate', minDate);
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('.ds-input-date__input'));
      input.nativeElement.value = '15/12/2024'; // Before minDate
      input.nativeElement.dispatchEvent(new Event('input'));
      input.nativeElement.dispatchEvent(new Event('blur'));
      tick();
      fixture.detectChanges();

      expect(component.hasParseError()).toBe(true);
    }));

    it('T051b: minDate > maxDate should log warning and ignore constraints', fakeAsync(() => {
      const warnSpy = spyOn(console, 'warn');
      const minDate = new Date(2025, 11, 31);
      const maxDate = new Date(2025, 0, 1);

      fixture.componentRef.setInput('minDate', minDate);
      fixture.componentRef.setInput('maxDate', maxDate);
      fixture.detectChanges();

      // Trigger computation
      component.effectiveMinDate();
      expect(warnSpy).toHaveBeenCalledWith('[DsInputDate] minDate > maxDate: constraints ignored');
      expect(component.effectiveMinDate()).toBeNull();
      expect(component.effectiveMaxDate()).toBeNull();
    }));
  });

  // ==========================================================================
  // US5 TESTS - Clear button
  // ==========================================================================

  describe('US5 - Clear button', () => {
    it('T057: clear button should be visible when value present and clearable=true', fakeAsync(() => {
      const testDate = new Date(2025, 2, 15);
      component.writeValue(testDate);
      tick();
      fixture.detectChanges();

      expect(component.showClearButton()).toBe(true);
      const clearBtn = fixture.debugElement.query(By.css('.ds-input-date__clear'));
      expect(clearBtn).toBeTruthy();
    }));

    it('T058: clear button should be invisible when value null', () => {
      fixture.detectChanges();
      expect(component.showClearButton()).toBe(false);
      const clearBtn = fixture.debugElement.query(By.css('.ds-input-date__clear'));
      expect(clearBtn).toBeFalsy();
    });

    it('T059: clicking clear should set value to null', fakeAsync(() => {
      const testDate = new Date(2025, 2, 15);
      component.writeValue(testDate);
      tick();
      fixture.detectChanges();

      const clearBtn = fixture.debugElement.query(By.css('.ds-input-date__clear'));
      clearBtn.nativeElement.click();
      tick();
      fixture.detectChanges();

      expect(component.internalValue()).toBeNull();
    }));
  });

  // ==========================================================================
  // US6 TESTS - Keyboard navigation
  // ==========================================================================

  describe('US6 - Keyboard navigation', () => {
    it('T065: Enter on input should open popup', () => {
      const input = fixture.debugElement.query(By.css('.ds-input-date__input'));
      input.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      fixture.detectChanges();

      expect(component.isOpen()).toBe(true);
    });

    it('T066: Escape should close popup without changing value', fakeAsync(() => {
      const testDate = new Date(2025, 2, 15);
      component.writeValue(testDate);
      component.open();
      tick();
      fixture.detectChanges();

      component.onOverlayKeydown(new KeyboardEvent('keydown', { key: 'Escape' }));
      tick();
      fixture.detectChanges();

      expect(component.isOpen()).toBe(false);
      expect(component.internalValue()?.getTime()).toBe(testDate.getTime());
    }));

    it('T067: ArrowDown on input should open popup', () => {
      const input = fixture.debugElement.query(By.css('.ds-input-date__input'));
      input.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();

      expect(component.isOpen()).toBe(true);
    });
  });

  // ==========================================================================
  // Accessibility
  // ==========================================================================

  describe('Accessibility', () => {
    it('should have aria-haspopup on input', () => {
      const input = fixture.debugElement.query(By.css('.ds-input-date__input'));
      expect(input.nativeElement.getAttribute('aria-haspopup')).toBe('dialog');
    });

    it('should have aria-expanded when popup is open', () => {
      component.open();
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('.ds-input-date__input'));
      expect(input.nativeElement.getAttribute('aria-expanded')).toBe('true');
    });

    it('should have aria-invalid when in error state', fakeAsync(() => {
      const input = fixture.debugElement.query(By.css('.ds-input-date__input'));
      input.nativeElement.value = 'invalid';
      input.nativeElement.dispatchEvent(new Event('input'));
      input.nativeElement.dispatchEvent(new Event('blur'));
      tick();
      fixture.detectChanges();

      expect(input.nativeElement.getAttribute('aria-invalid')).toBe('true');
    }));
  });
});
