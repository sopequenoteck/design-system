import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimitiveRadio } from './primitive-radio';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PrimitiveRadio', () => {
  let component: PrimitiveRadio;
  let fixture: ComponentFixture<PrimitiveRadio>;
  let radioElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimitiveRadio],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimitiveRadio);
    component = fixture.componentInstance;
    fixture.detectChanges();
    radioElement = fixture.debugElement.query(By.css('.primitive-radio'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render with default unchecked state', () => {
      expect(component.checked()).toBe(false);
      expect(radioElement.nativeElement.getAttribute('aria-checked')).toBe('false');
    });

    it('should render checked state when checked is true', () => {
      fixture.componentRef.setInput('checked', true);
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
      expect(radioElement.nativeElement.getAttribute('aria-checked')).toBe('true');
      const dot = fixture.debugElement.query(By.css('.primitive-radio__dot'));
      expect(dot).toBeTruthy();
    });

    it('should not render dot when unchecked', () => {
      const dot = fixture.debugElement.query(By.css('.primitive-radio__dot'));
      expect(dot).toBeFalsy();
    });

    it('should render label when provided', () => {
      fixture.componentRef.setInput('label', 'Option 1');
      fixture.detectChanges();

      const label = fixture.debugElement.query(By.css('.primitive-radio__label'));
      expect(label).toBeTruthy();
      expect(label.nativeElement.textContent.trim()).toBe('Option 1');
    });

    it('should not render label when not provided', () => {
      const label = fixture.debugElement.query(By.css('.primitive-radio__label'));
      expect(label).toBeFalsy();
    });
  });

  describe('Size Variants', () => {
    it('should apply sm size class', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();

      expect(radioElement.nativeElement.classList.contains('primitive-radio--sm')).toBe(true);
    });

    it('should apply md size class by default', () => {
      expect(radioElement.nativeElement.classList.contains('primitive-radio--md')).toBe(true);
    });

    it('should apply lg size class', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(radioElement.nativeElement.classList.contains('primitive-radio--lg')).toBe(true);
    });
  });

  describe('Disabled State', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
    });

    it('should apply disabled class', () => {
      expect(radioElement.nativeElement.classList.contains('primitive-radio--disabled')).toBe(true);
    });

    it('should set aria-disabled attribute', () => {
      expect(radioElement.nativeElement.getAttribute('aria-disabled')).toBe('true');
    });

    it('should set tabindex to -1', () => {
      expect(radioElement.nativeElement.getAttribute('tabindex')).toBe('-1');
    });

    it('should not select when clicked', () => {
      expect(component.checked()).toBe(false);

      radioElement.nativeElement.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(false);
    });

    it('should not select when already checked and clicked', () => {
      fixture.componentRef.setInput('checked', true);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      radioElement.nativeElement.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
    });
  });

  describe('User Interactions', () => {
    it('should select on click when unchecked', () => {
      expect(component.checked()).toBe(false);

      radioElement.nativeElement.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
    });

    it('should NOT uncheck on click when already checked (radio behavior)', () => {
      fixture.componentRef.setInput('checked', true);
      fixture.detectChanges();

      radioElement.nativeElement.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
    });

    it('should emit checkedChange event on selection', () => {
      const checkedChangeSpy = jasmine.createSpy('checkedChange');
      component.checkedChange.subscribe(checkedChangeSpy);

      radioElement.nativeElement.click();
      fixture.detectChanges();

      expect(checkedChangeSpy).toHaveBeenCalledWith(true);
    });

    it('should NOT emit checkedChange when already checked', () => {
      fixture.componentRef.setInput('checked', true);
      fixture.detectChanges();

      const checkedChangeSpy = jasmine.createSpy('checkedChange');
      component.checkedChange.subscribe(checkedChangeSpy);

      radioElement.nativeElement.click();
      fixture.detectChanges();

      expect(checkedChangeSpy).not.toHaveBeenCalled();
    });

    it('should select on Space key press', () => {
      const event = new KeyboardEvent('keydown', { key: ' ' });
      radioElement.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
    });

    it('should select on Enter key press', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      radioElement.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
    });

    it('should not select on other key press', () => {
      const event = new KeyboardEvent('keydown', { key: 'a' });
      radioElement.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.checked()).toBe(false);
    });
  });

  describe('Focus State', () => {
    it('should apply focused class on focus', () => {
      radioElement.nativeElement.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();

      expect(radioElement.nativeElement.classList.contains('primitive-radio--focused')).toBe(true);
    });

    it('should remove focused class on blur', () => {
      radioElement.nativeElement.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      expect(radioElement.nativeElement.classList.contains('primitive-radio--focused')).toBe(true);

      radioElement.nativeElement.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();

      expect(radioElement.nativeElement.classList.contains('primitive-radio--focused')).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('should have role="radio"', () => {
      expect(radioElement.nativeElement.getAttribute('role')).toBe('radio');
    });

    it('should have tabindex="0" when not disabled', () => {
      expect(radioElement.nativeElement.getAttribute('tabindex')).toBe('0');
    });

    it('should update aria-checked based on state', () => {
      expect(radioElement.nativeElement.getAttribute('aria-checked')).toBe('false');

      fixture.componentRef.setInput('checked', true);
      fixture.detectChanges();
      expect(radioElement.nativeElement.getAttribute('aria-checked')).toBe('true');
    });

    it('should associate label with radio via aria-labelledby when label is provided', () => {
      fixture.componentRef.setInput('label', 'Option 1');
      fixture.componentRef.setInput('radioId', 'test-radio');
      fixture.detectChanges();

      expect(radioElement.nativeElement.getAttribute('aria-labelledby')).toBe('test-radio-label');
      const label = fixture.debugElement.query(By.css('.primitive-radio__label'));
      expect(label.nativeElement.getAttribute('id')).toBe('test-radio-label');
    });

    it('should not have aria-labelledby when no label is provided', () => {
      expect(radioElement.nativeElement.getAttribute('aria-labelledby')).toBeFalsy();
    });
  });

  describe('CSS Classes', () => {
    it('should always have base class', () => {
      expect(radioElement.nativeElement.classList.contains('primitive-radio')).toBe(true);
    });

    it('should apply checked class when checked', () => {
      fixture.componentRef.setInput('checked', true);
      fixture.detectChanges();

      expect(radioElement.nativeElement.classList.contains('primitive-radio--checked')).toBe(true);
    });

    it('should apply disabled class when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(radioElement.nativeElement.classList.contains('primitive-radio--disabled')).toBe(true);
    });
  });

  describe('Name and Value Inputs', () => {
    it('should accept name input', () => {
      fixture.componentRef.setInput('name', 'test-group');
      fixture.detectChanges();

      expect(component.name()).toBe('test-group');
    });

    it('should accept value input', () => {
      fixture.componentRef.setInput('value', 'option-1');
      fixture.detectChanges();

      expect(component.value()).toBe('option-1');
    });
  });

  // === TESTS ADDITIONNELS POUR COUVERTURE COMPLÈTE ===

  describe('Model Two-Way Binding', () => {
    it('should support two-way binding with model', () => {
      component.checked.set(true);
      fixture.detectChanges();

      expect(radioElement.nativeElement.getAttribute('aria-checked')).toBe('true');

      radioElement.nativeElement.click();
      fixture.detectChanges();

      // Radio stays checked (native behavior)
      expect(component.checked()).toBe(true);
    });

    it('should update checked state programmatically', () => {
      expect(component.checked()).toBe(false);

      component.checked.set(true);
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
      expect(radioElement.nativeElement.classList.contains('primitive-radio--checked')).toBe(true);
    });
  });

  describe('RadioId Input', () => {
    it('should generate random radioId by default', () => {
      expect(component.radioId()).toContain('radio-');
      expect(component.radioId().length).toBeGreaterThan(6);
    });

    it('should accept custom radioId', () => {
      fixture.componentRef.setInput('radioId', 'custom-radio-id');
      fixture.detectChanges();

      expect(component.radioId()).toBe('custom-radio-id');
    });
  });

  describe('Keyboard Navigation Edge Cases', () => {
    it('should not select on Space when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: ' ' });
      radioElement.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.checked()).toBe(false);
    });

    it('should not select on Enter when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      radioElement.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.checked()).toBe(false);
    });

    it('should not select on Space when already checked', () => {
      fixture.componentRef.setInput('checked', true);
      fixture.detectChanges();

      const checkedChangeSpy = jasmine.createSpy('checkedChange');
      component.checkedChange.subscribe(checkedChangeSpy);

      const event = new KeyboardEvent('keydown', { key: ' ' });
      radioElement.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(checkedChangeSpy).not.toHaveBeenCalled();
      expect(component.checked()).toBe(true);
    });

    it('should prevent default behavior on Space key', () => {
      const event = new KeyboardEvent('keydown', { key: ' ' });
      spyOn(event, 'preventDefault');

      radioElement.nativeElement.dispatchEvent(event);

      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should prevent default behavior on Enter key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      spyOn(event, 'preventDefault');

      radioElement.nativeElement.dispatchEvent(event);

      expect(event.preventDefault).toHaveBeenCalled();
    });
  });

  describe('Label Interaction', () => {
    it('should select radio when label is clicked', () => {
      fixture.componentRef.setInput('label', 'Clickable Label');
      fixture.detectChanges();

      const label = fixture.debugElement.query(By.css('.primitive-radio__label'));
      expect(component.checked()).toBe(false);

      label.nativeElement.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
    });

    it('should not change state when label is clicked on checked radio', () => {
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.componentRef.setInput('checked', true);
      fixture.detectChanges();

      const checkedChangeSpy = jasmine.createSpy('checkedChange');
      component.checkedChange.subscribe(checkedChangeSpy);

      const label = fixture.debugElement.query(By.css('.primitive-radio__label'));
      label.nativeElement.click();
      fixture.detectChanges();

      expect(checkedChangeSpy).not.toHaveBeenCalled();
      expect(component.checked()).toBe(true);
    });
  });

  describe('CSS Classes Computed Signal', () => {
    it('should compute correct classes for all states', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.componentRef.setInput('checked', true);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const classes = component['cssClasses']();

      expect(classes['primitive-radio']).toBe(true);
      expect(classes['primitive-radio--lg']).toBe(true);
      expect(classes['primitive-radio--checked']).toBe(true);
      expect(classes['primitive-radio--disabled']).toBe(true);
    });

    it('should compute focused class when focused', () => {
      radioElement.nativeElement.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();

      const classes = component['cssClasses']();
      expect(classes['primitive-radio--focused']).toBe(true);
    });

    it('should not have checked class when unchecked', () => {
      const classes = component['cssClasses']();
      expect(classes['primitive-radio--checked']).toBe(false);
    });
  });

  describe('Focus State Management', () => {
    it('should set focused signal to true on focus', () => {
      expect(component['focused']()).toBe(false);

      radioElement.nativeElement.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();

      expect(component['focused']()).toBe(true);
    });

    it('should set focused signal to false on blur', () => {
      radioElement.nativeElement.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      expect(component['focused']()).toBe(true);

      radioElement.nativeElement.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();

      expect(component['focused']()).toBe(false);
    });
  });

  describe('Radio-Specific Behavior', () => {
    it('should not uncheck on click when already checked (radio native behavior)', () => {
      fixture.componentRef.setInput('checked', true);
      fixture.detectChanges();

      radioElement.nativeElement.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
    });

    it('should emit checkedChange only when transitioning from unchecked to checked', () => {
      const checkedChangeSpy = jasmine.createSpy('checkedChange');
      component.checkedChange.subscribe(checkedChangeSpy);

      radioElement.nativeElement.click();
      fixture.detectChanges();

      expect(checkedChangeSpy).toHaveBeenCalledWith(true);
      expect(checkedChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('should always emit true when checkedChange is emitted', () => {
      const checkedChangeSpy = jasmine.createSpy('checkedChange');
      component.checkedChange.subscribe(checkedChangeSpy);

      radioElement.nativeElement.click();
      fixture.detectChanges();

      expect(checkedChangeSpy).toHaveBeenCalledWith(true);
      // Radio can never emit false
    });
  });

  describe('Combination Tests', () => {
    it('should handle all size variants correctly', () => {
      const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

      sizes.forEach((size) => {
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();

        expect(radioElement.nativeElement.classList.contains(`primitive-radio--${size}`)).toBe(true);
      });
    });

    it('should handle label with different sizes', () => {
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();

      const label = fixture.debugElement.query(By.css('.primitive-radio__label'));
      expect(label).toBeTruthy();
      expect(radioElement.nativeElement.classList.contains('primitive-radio--sm')).toBe(true);
    });

    it('should handle name and value together', () => {
      fixture.componentRef.setInput('name', 'payment-method');
      fixture.componentRef.setInput('value', 'credit-card');
      fixture.detectChanges();

      expect(component.name()).toBe('payment-method');
      expect(component.value()).toBe('credit-card');
    });

    it('should handle checked with disabled state', () => {
      fixture.componentRef.setInput('checked', true);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(radioElement.nativeElement.classList.contains('primitive-radio--checked')).toBe(true);
      expect(radioElement.nativeElement.classList.contains('primitive-radio--disabled')).toBe(true);
    });
  });

  describe('Event Emission Edge Cases', () => {
    it('should not emit when disabled and clicked', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const checkedChangeSpy = jasmine.createSpy('checkedChange');
      component.checkedChange.subscribe(checkedChangeSpy);

      radioElement.nativeElement.click();
      fixture.detectChanges();

      expect(checkedChangeSpy).not.toHaveBeenCalled();
    });

    it('should not emit when already checked and clicked', () => {
      fixture.componentRef.setInput('checked', true);
      fixture.detectChanges();

      const checkedChangeSpy = jasmine.createSpy('checkedChange');
      component.checkedChange.subscribe(checkedChangeSpy);

      radioElement.nativeElement.click();
      fixture.detectChanges();

      expect(checkedChangeSpy).not.toHaveBeenCalled();
    });
  });
});
