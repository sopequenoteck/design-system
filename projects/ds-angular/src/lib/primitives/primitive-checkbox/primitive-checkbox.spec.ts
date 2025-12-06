import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimitiveCheckbox } from './primitive-checkbox';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PrimitiveCheckbox', () => {
  let component: PrimitiveCheckbox;
  let fixture: ComponentFixture<PrimitiveCheckbox>;
  let checkboxElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimitiveCheckbox],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimitiveCheckbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
    checkboxElement = fixture.debugElement.query(By.css('.primitive-checkbox'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render with default unchecked state', () => {
      expect(component.checked()).toBe(false);
      expect(checkboxElement.nativeElement.getAttribute('aria-checked')).toBe('unchecked');
    });

    it('should render checked state when checked is true', () => {
      component.checked.set(true);
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
      expect(checkboxElement.nativeElement.getAttribute('aria-checked')).toBe('checked');
      const icon = fixture.debugElement.query(By.css('.primitive-checkbox__icon'));
      expect(icon).toBeTruthy();
    });

    it('should render indeterminate state when indeterminate is true', () => {
      fixture.componentRef.setInput('indeterminate', true);
      fixture.detectChanges();

      expect(checkboxElement.nativeElement.getAttribute('aria-checked')).toBe('indeterminate');
      const icon = fixture.debugElement.query(By.css('.primitive-checkbox__icon'));
      expect(icon).toBeTruthy();
    });

    it('should render label when provided', () => {
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.detectChanges();

      const label = fixture.debugElement.query(By.css('.primitive-checkbox__label'));
      expect(label).toBeTruthy();
      expect(label.nativeElement.textContent.trim()).toBe('Test Label');
    });

    it('should not render label when not provided', () => {
      const label = fixture.debugElement.query(By.css('.primitive-checkbox__label'));
      expect(label).toBeFalsy();
    });
  });

  describe('Size Variants', () => {
    it('should apply sm size class', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();

      expect(checkboxElement.nativeElement.classList.contains('primitive-checkbox--sm')).toBe(true);
    });

    it('should apply md size class by default', () => {
      expect(checkboxElement.nativeElement.classList.contains('primitive-checkbox--md')).toBe(true);
    });

    it('should apply lg size class', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(checkboxElement.nativeElement.classList.contains('primitive-checkbox--lg')).toBe(true);
    });
  });

  describe('Disabled State', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
    });

    it('should apply disabled class', () => {
      expect(checkboxElement.nativeElement.classList.contains('primitive-checkbox--disabled')).toBe(true);
    });

    it('should set aria-disabled attribute', () => {
      expect(checkboxElement.nativeElement.getAttribute('aria-disabled')).toBe('true');
    });

    it('should set tabindex to -1', () => {
      expect(checkboxElement.nativeElement.getAttribute('tabindex')).toBe('-1');
    });

    it('should not toggle when clicked', () => {
      const initialValue = component.checked();
      checkboxElement.nativeElement.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(initialValue);
    });
  });

  describe('User Interactions', () => {
    it('should toggle checked state on click', () => {
      expect(component.checked()).toBe(false);

      checkboxElement.nativeElement.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(true);

      checkboxElement.nativeElement.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(false);
    });

    it('should emit checkedChange event on toggle', () => {
      const checkedChangeSpy = jasmine.createSpy('checkedChange');
      component.checkedChange.subscribe(checkedChangeSpy);

      checkboxElement.nativeElement.click();
      fixture.detectChanges();

      expect(checkedChangeSpy).toHaveBeenCalledWith(true);

      checkboxElement.nativeElement.click();
      fixture.detectChanges();

      expect(checkedChangeSpy).toHaveBeenCalledWith(false);
    });

    it('should toggle on Space key press', () => {
      const event = new KeyboardEvent('keydown', { key: ' ' });
      checkboxElement.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
    });

    it('should toggle on Enter key press', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      checkboxElement.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
    });

    it('should not toggle on other key press', () => {
      const event = new KeyboardEvent('keydown', { key: 'a' });
      checkboxElement.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.checked()).toBe(false);
    });
  });

  describe('Focus State', () => {
    it('should apply focused class on focus', () => {
      checkboxElement.nativeElement.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();

      expect(checkboxElement.nativeElement.classList.contains('primitive-checkbox--focused')).toBe(true);
    });

    it('should remove focused class on blur', () => {
      checkboxElement.nativeElement.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      expect(checkboxElement.nativeElement.classList.contains('primitive-checkbox--focused')).toBe(true);

      checkboxElement.nativeElement.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();

      expect(checkboxElement.nativeElement.classList.contains('primitive-checkbox--focused')).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('should have role="checkbox"', () => {
      expect(checkboxElement.nativeElement.getAttribute('role')).toBe('checkbox');
    });

    it('should have tabindex="0" when not disabled', () => {
      expect(checkboxElement.nativeElement.getAttribute('tabindex')).toBe('0');
    });

    it('should update aria-checked based on state', () => {
      expect(checkboxElement.nativeElement.getAttribute('aria-checked')).toBe('unchecked');

      component.checked.set(true);
      fixture.detectChanges();
      expect(checkboxElement.nativeElement.getAttribute('aria-checked')).toBe('checked');

      component.checked.set(false);
      fixture.componentRef.setInput('indeterminate', true);
      fixture.detectChanges();
      expect(checkboxElement.nativeElement.getAttribute('aria-checked')).toBe('indeterminate');
    });

    it('should associate label with checkbox via aria-labelledby when label is provided', () => {
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.componentRef.setInput('checkboxId', 'test-checkbox');
      fixture.detectChanges();

      expect(checkboxElement.nativeElement.getAttribute('aria-labelledby')).toBe('test-checkbox-label');
      const label = fixture.debugElement.query(By.css('.primitive-checkbox__label'));
      expect(label.nativeElement.getAttribute('id')).toBe('test-checkbox-label');
    });

    it('should not have aria-labelledby when no label is provided', () => {
      expect(checkboxElement.nativeElement.getAttribute('aria-labelledby')).toBeFalsy();
    });
  });

  describe('CSS Classes', () => {
    it('should always have base class', () => {
      expect(checkboxElement.nativeElement.classList.contains('primitive-checkbox')).toBe(true);
    });

    it('should apply checked class when checked', () => {
      component.checked.set(true);
      fixture.detectChanges();

      expect(checkboxElement.nativeElement.classList.contains('primitive-checkbox--checked')).toBe(true);
    });

    it('should apply indeterminate class when indeterminate', () => {
      fixture.componentRef.setInput('indeterminate', true);
      fixture.detectChanges();

      expect(checkboxElement.nativeElement.classList.contains('primitive-checkbox--indeterminate')).toBe(true);
    });

    it('should apply disabled class when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(checkboxElement.nativeElement.classList.contains('primitive-checkbox--disabled')).toBe(true);
    });
  });

  describe('Checkbox State Computed Signal', () => {
    it('should compute state as unchecked by default', () => {
      expect(component['checkboxState']()).toBe('unchecked');
    });

    it('should compute state as checked when checked is true', () => {
      component.checked.set(true);
      fixture.detectChanges();

      expect(component['checkboxState']()).toBe('checked');
    });

    it('should compute state as indeterminate when indeterminate is true (priority over checked)', () => {
      component.checked.set(true);
      fixture.componentRef.setInput('indeterminate', true);
      fixture.detectChanges();

      expect(component['checkboxState']()).toBe('indeterminate');
    });
  });

  // === TESTS ADDITIONNELS POUR COUVERTURE COMPLÈTE ===

  describe('Model Two-Way Binding', () => {
    it('should support two-way binding with model', () => {
      component.checked.set(true);
      fixture.detectChanges();

      expect(checkboxElement.nativeElement.getAttribute('aria-checked')).toBe('checked');

      checkboxElement.nativeElement.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(false);
    });

    it('should update checked state programmatically', () => {
      expect(component.checked()).toBe(false);

      component.checked.set(true);
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
      expect(checkboxElement.nativeElement.classList.contains('primitive-checkbox--checked')).toBe(true);
    });
  });

  describe('CheckboxId Input', () => {
    it('should generate random checkboxId by default', () => {
      expect(component.checkboxId()).toContain('checkbox-');
      expect(component.checkboxId().length).toBeGreaterThan(9);
    });

    it('should accept custom checkboxId', () => {
      fixture.componentRef.setInput('checkboxId', 'custom-id');
      fixture.detectChanges();

      expect(component.checkboxId()).toBe('custom-id');
    });
  });

  describe('Keyboard Navigation Edge Cases', () => {
    it('should not toggle on Space when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: ' ' });
      checkboxElement.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.checked()).toBe(false);
    });

    it('should not toggle on Enter when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      checkboxElement.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.checked()).toBe(false);
    });

    it('should prevent default behavior on Space key', () => {
      const event = new KeyboardEvent('keydown', { key: ' ' });
      spyOn(event, 'preventDefault');

      checkboxElement.nativeElement.dispatchEvent(event);

      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should prevent default behavior on Enter key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      spyOn(event, 'preventDefault');

      checkboxElement.nativeElement.dispatchEvent(event);

      expect(event.preventDefault).toHaveBeenCalled();
    });
  });

  describe('Label Interaction', () => {
    it('should toggle checkbox when label is clicked', () => {
      fixture.componentRef.setInput('label', 'Clickable Label');
      fixture.detectChanges();

      const label = fixture.debugElement.query(By.css('.primitive-checkbox__label'));
      expect(component.checked()).toBe(false);

      label.nativeElement.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
    });
  });

  describe('CSS Classes Computed Signal', () => {
    it('should compute correct classes for all states', () => {
      fixture.componentRef.setInput('size', 'lg');
      component.checked.set(true);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const classes = component['cssClasses']();

      expect(classes['primitive-checkbox']).toBe(true);
      expect(classes['primitive-checkbox--lg']).toBe(true);
      expect(classes['primitive-checkbox--checked']).toBe(true);
      expect(classes['primitive-checkbox--disabled']).toBe(true);
    });

    it('should compute focused class when focused', () => {
      checkboxElement.nativeElement.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();

      const classes = component['cssClasses']();
      expect(classes['primitive-checkbox--focused']).toBe(true);
    });

    it('should compute indeterminate class when indeterminate', () => {
      fixture.componentRef.setInput('indeterminate', true);
      fixture.detectChanges();

      const classes = component['cssClasses']();
      expect(classes['primitive-checkbox--indeterminate']).toBe(true);
    });
  });

  describe('Indeterminate State Priority', () => {
    it('should show indeterminate icon even when checked is true', () => {
      component.checked.set(true);
      fixture.componentRef.setInput('indeterminate', true);
      fixture.detectChanges();

      expect(checkboxElement.nativeElement.getAttribute('aria-checked')).toBe('indeterminate');
      expect(component['checkboxState']()).toBe('indeterminate');
    });

    it('should show indeterminate class even when checked is true', () => {
      component.checked.set(true);
      fixture.componentRef.setInput('indeterminate', true);
      fixture.detectChanges();

      expect(checkboxElement.nativeElement.classList.contains('primitive-checkbox--indeterminate')).toBe(true);
      expect(checkboxElement.nativeElement.classList.contains('primitive-checkbox--checked')).toBe(true);
    });
  });

  describe('Focus State Management', () => {
    it('should set focused signal to true on focus', () => {
      expect(component['focused']()).toBe(false);

      checkboxElement.nativeElement.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();

      expect(component['focused']()).toBe(true);
    });

    it('should set focused signal to false on blur', () => {
      checkboxElement.nativeElement.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      expect(component['focused']()).toBe(true);

      checkboxElement.nativeElement.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();

      expect(component['focused']()).toBe(false);
    });
  });

  describe('Event Emission', () => {
    it('should not emit checkedChange when checkbox is disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const checkedChangeSpy = jasmine.createSpy('checkedChange');
      component.checkedChange.subscribe(checkedChangeSpy);

      checkboxElement.nativeElement.click();
      fixture.detectChanges();

      expect(checkedChangeSpy).not.toHaveBeenCalled();
    });

    it('should emit correct value when toggling from unchecked to checked', () => {
      const checkedChangeSpy = jasmine.createSpy('checkedChange');
      component.checkedChange.subscribe(checkedChangeSpy);

      checkboxElement.nativeElement.click();
      fixture.detectChanges();

      expect(checkedChangeSpy).toHaveBeenCalledWith(true);
      expect(checkedChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit correct value when toggling from checked to unchecked', () => {
      component.checked.set(true);
      fixture.detectChanges();

      const checkedChangeSpy = jasmine.createSpy('checkedChange');
      component.checkedChange.subscribe(checkedChangeSpy);

      checkboxElement.nativeElement.click();
      fixture.detectChanges();

      expect(checkedChangeSpy).toHaveBeenCalledWith(false);
      expect(checkedChangeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Combination Tests', () => {
    it('should handle all size variants correctly', () => {
      const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

      sizes.forEach((size) => {
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();

        expect(checkboxElement.nativeElement.classList.contains(`primitive-checkbox--${size}`)).toBe(true);
      });
    });

    it('should handle label with different sizes', () => {
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();

      const label = fixture.debugElement.query(By.css('.primitive-checkbox__label'));
      expect(label).toBeTruthy();
      expect(checkboxElement.nativeElement.classList.contains('primitive-checkbox--sm')).toBe(true);
    });

    it('should handle indeterminate with label', () => {
      fixture.componentRef.setInput('label', 'Select All');
      fixture.componentRef.setInput('indeterminate', true);
      fixture.detectChanges();

      const label = fixture.debugElement.query(By.css('.primitive-checkbox__label'));
      expect(label).toBeTruthy();
      expect(checkboxElement.nativeElement.getAttribute('aria-checked')).toBe('indeterminate');
    });
  });
});
