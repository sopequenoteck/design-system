import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimitiveToggle } from './primitive-toggle';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PrimitiveToggle', () => {
  let component: PrimitiveToggle;
  let fixture: ComponentFixture<PrimitiveToggle>;
  let toggleElement: DebugElement;
  let switchElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimitiveToggle],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimitiveToggle);
    component = fixture.componentInstance;
    fixture.detectChanges();
    toggleElement = fixture.debugElement.query(By.css('.primitive-toggle'));
    switchElement = fixture.debugElement.query(By.css('.primitive-toggle__switch'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render with default unchecked state', () => {
      expect(component.checked()).toBe(false);
      expect(switchElement.nativeElement.getAttribute('aria-checked')).toBe('false');
    });

    it('should render checked state when checked is true', () => {
      component.checked.set(true);
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
      expect(switchElement.nativeElement.getAttribute('aria-checked')).toBe('true');
      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--checked')).toBe(true);
    });

    it('should render label when provided', () => {
      fixture.componentRef.setInput('label', 'Enable feature');
      fixture.detectChanges();

      const label = fixture.debugElement.query(By.css('.primitive-toggle__label'));
      expect(label).toBeTruthy();
      expect(label.nativeElement.textContent.trim()).toBe('Enable feature');
    });

    it('should not render label when not provided', () => {
      const label = fixture.debugElement.query(By.css('.primitive-toggle__label'));
      expect(label).toBeFalsy();
    });

    it('should render track and thumb', () => {
      const track = fixture.debugElement.query(By.css('.primitive-toggle__track'));
      const thumb = fixture.debugElement.query(By.css('.primitive-toggle__thumb'));
      expect(track).toBeTruthy();
      expect(thumb).toBeTruthy();
    });
  });

  describe('Label Position', () => {
    it('should position label on the right by default', () => {
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.detectChanges();

      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--label-right')).toBe(true);

      const children = toggleElement.nativeElement.children;
      const switchIndex = Array.from(children).findIndex((el: any) =>
        el.classList.contains('primitive-toggle__switch')
      );
      const labelIndex = Array.from(children).findIndex((el: any) =>
        el.classList.contains('primitive-toggle__label')
      );

      expect(switchIndex).toBeLessThan(labelIndex);
    });

    it('should position label on the left when labelPosition is left', () => {
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.componentRef.setInput('labelPosition', 'left');
      fixture.detectChanges();

      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--label-left')).toBe(true);

      const children = toggleElement.nativeElement.children;
      const switchIndex = Array.from(children).findIndex((el: any) =>
        el.classList.contains('primitive-toggle__switch')
      );
      const labelIndex = Array.from(children).findIndex((el: any) =>
        el.classList.contains('primitive-toggle__label')
      );

      expect(labelIndex).toBeLessThan(switchIndex);
    });
  });

  describe('Size Variants', () => {
    it('should apply sm size class', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();

      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--sm')).toBe(true);
    });

    it('should apply md size class by default', () => {
      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--md')).toBe(true);
    });

    it('should apply lg size class', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--lg')).toBe(true);
    });
  });

  describe('Disabled State', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
    });

    it('should apply disabled class', () => {
      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--disabled')).toBe(true);
    });

    it('should set aria-disabled attribute', () => {
      expect(switchElement.nativeElement.getAttribute('aria-disabled')).toBe('true');
    });

    it('should set tabindex to -1', () => {
      expect(switchElement.nativeElement.getAttribute('tabindex')).toBe('-1');
    });

    it('should not toggle when clicked', () => {
      const initialValue = component.checked();
      switchElement.nativeElement.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(initialValue);
    });

    it('should not toggle when label is clicked', () => {
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const initialValue = component.checked();
      const label = fixture.debugElement.query(By.css('.primitive-toggle__label'));
      label.nativeElement.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(initialValue);
    });
  });

  describe('User Interactions', () => {
    it('should toggle checked state on switch click', () => {
      expect(component.checked()).toBe(false);

      switchElement.nativeElement.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(true);

      switchElement.nativeElement.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(false);
    });

    it('should toggle checked state on label click', () => {
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.detectChanges();

      const label = fixture.debugElement.query(By.css('.primitive-toggle__label'));

      expect(component.checked()).toBe(false);

      label.nativeElement.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
    });

    it('should emit checkedChange event on toggle', () => {
      const checkedChangeSpy = jasmine.createSpy('checkedChange');
      component.checkedChange.subscribe(checkedChangeSpy);

      switchElement.nativeElement.click();
      fixture.detectChanges();

      expect(checkedChangeSpy).toHaveBeenCalledWith(true);

      switchElement.nativeElement.click();
      fixture.detectChanges();

      expect(checkedChangeSpy).toHaveBeenCalledWith(false);
    });

    it('should toggle on Space key press', () => {
      const event = new KeyboardEvent('keydown', { key: ' ' });
      switchElement.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
    });

    it('should toggle on Enter key press', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      switchElement.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
    });

    it('should not toggle on other key press', () => {
      const event = new KeyboardEvent('keydown', { key: 'a' });
      switchElement.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.checked()).toBe(false);
    });
  });

  describe('Focus State', () => {
    it('should apply focused class on focus', () => {
      switchElement.nativeElement.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();

      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--focused')).toBe(true);
    });

    it('should remove focused class on blur', () => {
      switchElement.nativeElement.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--focused')).toBe(true);

      switchElement.nativeElement.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();

      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--focused')).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('should have role="switch"', () => {
      expect(switchElement.nativeElement.getAttribute('role')).toBe('switch');
    });

    it('should have tabindex="0" when not disabled', () => {
      expect(switchElement.nativeElement.getAttribute('tabindex')).toBe('0');
    });

    it('should update aria-checked based on state', () => {
      expect(switchElement.nativeElement.getAttribute('aria-checked')).toBe('false');

      component.checked.set(true);
      fixture.detectChanges();
      expect(switchElement.nativeElement.getAttribute('aria-checked')).toBe('true');
    });

    it('should associate label with toggle via aria-labelledby when label is provided', () => {
      fixture.componentRef.setInput('label', 'Enable feature');
      fixture.componentRef.setInput('toggleId', 'test-toggle');
      fixture.detectChanges();

      expect(switchElement.nativeElement.getAttribute('aria-labelledby')).toBe('test-toggle-label');
      const label = fixture.debugElement.query(By.css('.primitive-toggle__label'));
      expect(label.nativeElement.getAttribute('id')).toBe('test-toggle-label');
    });

    it('should not have aria-labelledby when no label is provided', () => {
      expect(switchElement.nativeElement.getAttribute('aria-labelledby')).toBeFalsy();
    });
  });

  describe('CSS Classes', () => {
    it('should always have base class', () => {
      expect(toggleElement.nativeElement.classList.contains('primitive-toggle')).toBe(true);
    });

    it('should apply checked class when checked', () => {
      component.checked.set(true);
      fixture.detectChanges();

      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--checked')).toBe(true);
    });

    it('should apply disabled class when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--disabled')).toBe(true);
    });
  });

  // === TESTS ADDITIONNELS POUR COUVERTURE COMPLÈTE ===

  describe('Model Two-Way Binding', () => {
    it('should support two-way binding with model', () => {
      component.checked.set(true);
      fixture.detectChanges();

      expect(switchElement.nativeElement.getAttribute('aria-checked')).toBe('true');

      switchElement.nativeElement.click();
      fixture.detectChanges();

      expect(component.checked()).toBe(false);
    });

    it('should update checked state programmatically', () => {
      expect(component.checked()).toBe(false);

      component.checked.set(true);
      fixture.detectChanges();

      expect(component.checked()).toBe(true);
      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--checked')).toBe(true);
    });
  });

  describe('ToggleId Input', () => {
    it('should generate random toggleId by default', () => {
      expect(component.toggleId()).toContain('toggle-');
      expect(component.toggleId().length).toBeGreaterThan(7);
    });

    it('should accept custom toggleId', () => {
      fixture.componentRef.setInput('toggleId', 'custom-toggle-id');
      fixture.detectChanges();

      expect(component.toggleId()).toBe('custom-toggle-id');
    });
  });

  describe('Keyboard Navigation Edge Cases', () => {
    it('should not toggle on Space when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: ' ' });
      switchElement.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.checked()).toBe(false);
    });

    it('should not toggle on Enter when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      switchElement.nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.checked()).toBe(false);
    });

    it('should prevent default behavior on Space key', () => {
      const event = new KeyboardEvent('keydown', { key: ' ' });
      spyOn(event, 'preventDefault');

      switchElement.nativeElement.dispatchEvent(event);

      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should prevent default behavior on Enter key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      spyOn(event, 'preventDefault');

      switchElement.nativeElement.dispatchEvent(event);

      expect(event.preventDefault).toHaveBeenCalled();
    });
  });

  describe('CSS Classes Computed Signal', () => {
    it('should compute correct classes for all states', () => {
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.componentRef.setInput('size', 'lg');
      component.checked.set(true);
      fixture.componentRef.setInput('disabled', true);
      fixture.componentRef.setInput('labelPosition', 'left');
      fixture.detectChanges();

      const classes = component['cssClasses']();

      expect(classes['primitive-toggle']).toBe(true);
      expect(classes['primitive-toggle--lg']).toBe(true);
      expect(classes['primitive-toggle--checked']).toBe(true);
      expect(classes['primitive-toggle--disabled']).toBe(true);
      expect(classes['primitive-toggle--label-left']).toBe(true);
    });

    it('should compute focused class when focused', () => {
      switchElement.nativeElement.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();

      const classes = component['cssClasses']();
      expect(classes['primitive-toggle--focused']).toBe(true);
    });

    it('should not add label position class when no label', () => {
      const classes = component['cssClasses']();
      expect(classes['primitive-toggle--label-right']).toBeFalsy();
      expect(classes['primitive-toggle--label-left']).toBeFalsy();
    });

    it('should add label position class when label is present', () => {
      fixture.componentRef.setInput('label', 'Test');
      fixture.componentRef.setInput('labelPosition', 'right');
      fixture.detectChanges();

      const classes = component['cssClasses']();
      expect(classes['primitive-toggle--label-right']).toBe(true);
    });
  });

  describe('Focus State Management', () => {
    it('should set focused signal to true on focus', () => {
      expect(component['focused']()).toBe(false);

      switchElement.nativeElement.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();

      expect(component['focused']()).toBe(true);
    });

    it('should set focused signal to false on blur', () => {
      switchElement.nativeElement.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      expect(component['focused']()).toBe(true);

      switchElement.nativeElement.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();

      expect(component['focused']()).toBe(false);
    });
  });

  describe('Event Emission', () => {
    it('should not emit checkedChange when toggle is disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const checkedChangeSpy = jasmine.createSpy('checkedChange');
      component.checkedChange.subscribe(checkedChangeSpy);

      switchElement.nativeElement.click();
      fixture.detectChanges();

      expect(checkedChangeSpy).not.toHaveBeenCalled();
    });

    it('should emit correct value when toggling from unchecked to checked', () => {
      const checkedChangeSpy = jasmine.createSpy('checkedChange');
      component.checkedChange.subscribe(checkedChangeSpy);

      switchElement.nativeElement.click();
      fixture.detectChanges();

      expect(checkedChangeSpy).toHaveBeenCalledWith(true);
      expect(checkedChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit correct value when toggling from checked to unchecked', () => {
      component.checked.set(true);
      fixture.detectChanges();

      const checkedChangeSpy = jasmine.createSpy('checkedChange');
      component.checkedChange.subscribe(checkedChangeSpy);

      switchElement.nativeElement.click();
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

        expect(toggleElement.nativeElement.classList.contains(`primitive-toggle--${size}`)).toBe(true);
      });
    });

    it('should handle label with different sizes', () => {
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();

      const label = fixture.debugElement.query(By.css('.primitive-toggle__label'));
      expect(label).toBeTruthy();
      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--sm')).toBe(true);
    });

    it('should handle both label positions', () => {
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.componentRef.setInput('labelPosition', 'left');
      fixture.detectChanges();

      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--label-left')).toBe(true);

      fixture.componentRef.setInput('labelPosition', 'right');
      fixture.detectChanges();

      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--label-right')).toBe(true);
    });

    it('should handle checked with disabled state', () => {
      component.checked.set(true);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--checked')).toBe(true);
      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--disabled')).toBe(true);
    });

    it('should have track and thumb elements', () => {
      const track = fixture.debugElement.query(By.css('.primitive-toggle__track'));
      const thumb = fixture.debugElement.query(By.css('.primitive-toggle__thumb'));

      expect(track).toBeTruthy();
      expect(thumb).toBeTruthy();
    });
  });

  describe('Label Position Behavior', () => {
    it('should not apply label position class when label is empty', () => {
      fixture.componentRef.setInput('label', '');
      fixture.componentRef.setInput('labelPosition', 'left');
      fixture.detectChanges();

      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--label-left')).toBe(false);
    });

    it('should apply label position class only when label has value', () => {
      fixture.componentRef.setInput('label', 'Test');
      fixture.componentRef.setInput('labelPosition', 'left');
      fixture.detectChanges();

      expect(toggleElement.nativeElement.classList.contains('primitive-toggle--label-left')).toBe(true);
    });
  });
});
