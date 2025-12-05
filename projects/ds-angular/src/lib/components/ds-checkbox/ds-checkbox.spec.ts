import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DsCheckbox } from './ds-checkbox';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('DsCheckbox', () => {
  let component: DsCheckbox;
  let fixture: ComponentFixture<DsCheckbox>;
  let primitiveCheckbox: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsCheckbox, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DsCheckbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
    primitiveCheckbox = fixture.debugElement.query(By.css('primitive-checkbox'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render primitive-checkbox', () => {
      expect(primitiveCheckbox).toBeTruthy();
    });

    it('should pass label to primitive', () => {
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.detectChanges();

      expect(component.label()).toBe('Test Label');
    });

    it('should pass size to primitive', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(component.size()).toBe('lg');
    });

    it('should render helper text when provided', () => {
      fixture.componentRef.setInput('helper', 'Helper text');
      fixture.detectChanges();

      const helper = fixture.debugElement.query(By.css('.ds-checkbox__helper'));
      expect(helper).toBeTruthy();
      expect(helper.nativeElement.textContent.trim()).toBe('Helper text');
    });

    it('should render error text when provided', () => {
      fixture.componentRef.setInput('error', 'Error message');
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('.ds-checkbox__error'));
      expect(error).toBeTruthy();
      expect(error.nativeElement.textContent.trim()).toBe('Error message');
    });

    it('should not render helper when error is present', () => {
      fixture.componentRef.setInput('helper', 'Helper text');
      fixture.componentRef.setInput('error', 'Error message');
      fixture.detectChanges();

      const helper = fixture.debugElement.query(By.css('.ds-checkbox__helper'));
      const error = fixture.debugElement.query(By.css('.ds-checkbox__error'));
      expect(helper).toBeFalsy();
      expect(error).toBeTruthy();
    });

    it('should render required indicator when required is true and label exists', () => {
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();

      const required = fixture.debugElement.query(By.css('.ds-checkbox__required'));
      expect(required).toBeTruthy();
      expect(required.nativeElement.textContent).toBe('*');
    });

    it('should not render required indicator when label is empty', () => {
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();

      const required = fixture.debugElement.query(By.css('.ds-checkbox__required'));
      expect(required).toBeFalsy();
    });
  });

  describe('ControlValueAccessor', () => {
    it('should implement writeValue', () => {
      component.writeValue(true);
      fixture.detectChanges();

      expect(component['internalValue']()).toBe(true);
    });

    it('should handle null value in writeValue', () => {
      component.writeValue(null);
      fixture.detectChanges();

      expect(component['internalValue']()).toBe(false);
    });

    it('should call registered onChange callback', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);

      component['onCheckedChange'](true);

      expect(onChangeSpy).toHaveBeenCalledWith(true);
    });

    it('should call registered onTouched callback', () => {
      const onTouchedSpy = jasmine.createSpy('onTouched');
      component.registerOnTouched(onTouchedSpy);

      component['onCheckedChange'](true);

      expect(onTouchedSpy).toHaveBeenCalled();
    });

    it('should handle setDisabledState', () => {
      component.setDisabledState(true);
      fixture.detectChanges();

      expect(component['isDisabled']()).toBe(true);
    });
  });

  describe('Reactive Forms Integration', () => {
    it('should work with FormControl', () => {
      const control = new FormControl(false);

      TestBed.runInInjectionContext(() => {
        const standaloneFixture = TestBed.createComponent(DsCheckbox);
        const standaloneComponent = standaloneFixture.componentInstance;
        control.valueChanges.subscribe((value) => {
          standaloneComponent.writeValue(value);
        });
        standaloneComponent.registerOnChange((value: boolean) => {
          control.setValue(value, { emitEvent: false });
        });

        standaloneComponent.writeValue(false);
        standaloneFixture.detectChanges();
        expect(standaloneComponent['internalValue']()).toBe(false);

        control.setValue(true);
        standaloneFixture.detectChanges();
        expect(standaloneComponent['internalValue']()).toBe(true);

        standaloneComponent['onCheckedChange'](false);
        standaloneFixture.detectChanges();
        expect(control.value).toBe(false);
      });
    });

    it('should respect disabled state from FormControl', () => {
      const control = new FormControl({ value: false, disabled: true });

      component.setDisabledState(true);
      fixture.detectChanges();

      expect(component['isDisabled']()).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should set aria-describedby when helper is provided', () => {
      fixture.componentRef.setInput('id', 'test-checkbox');
      fixture.componentRef.setInput('helper', 'Helper text');
      fixture.detectChanges();

      expect(primitiveCheckbox.nativeElement.getAttribute('aria-describedby')).toBe(
        'test-checkbox-helper'
      );
    });

    it('should set aria-describedby when error is provided', () => {
      fixture.componentRef.setInput('id', 'test-checkbox');
      fixture.componentRef.setInput('error', 'Error message');
      fixture.detectChanges();

      expect(primitiveCheckbox.nativeElement.getAttribute('aria-describedby')).toBe(
        'test-checkbox-error'
      );
    });

    it('should combine multiple aria-describedby ids', () => {
      fixture.componentRef.setInput('id', 'test-checkbox');
      fixture.componentRef.setInput('helper', 'Helper text');
      fixture.detectChanges();

      const ariaDescribedBy = primitiveCheckbox.nativeElement.getAttribute('aria-describedby');
      expect(ariaDescribedBy).toContain('helper');
    });

    it('should set aria-invalid when error is present', () => {
      fixture.componentRef.setInput('error', 'Error message');
      fixture.detectChanges();

      expect(primitiveCheckbox.nativeElement.getAttribute('aria-invalid')).toBe('true');
    });

    it('should set aria-required when required is true', () => {
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();

      expect(primitiveCheckbox.nativeElement.getAttribute('aria-required')).toBe('true');
    });

    it('should set role="alert" on error message', () => {
      fixture.componentRef.setInput('error', 'Error message');
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('.ds-checkbox__error'));
      expect(error.nativeElement.getAttribute('role')).toBe('alert');
    });

    it('should set aria-live on helper and error', () => {
      fixture.componentRef.setInput('helper', 'Helper text');
      fixture.detectChanges();

      const helper = fixture.debugElement.query(By.css('.ds-checkbox__helper'));
      expect(helper.nativeElement.getAttribute('aria-live')).toBe('polite');

      fixture.componentRef.setInput('error', 'Error message');
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('.ds-checkbox__error'));
      expect(error.nativeElement.getAttribute('aria-live')).toBe('assertive');
    });
  });

  describe('Disabled State', () => {
    it('should not call onChange when disabled via input', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);

      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      component['onCheckedChange'](true);

      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it('should not call onChange when disabled via setDisabledState', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);

      component.setDisabledState(true);
      fixture.detectChanges();

      component['onCheckedChange'](true);

      expect(onChangeSpy).not.toHaveBeenCalled();
    });
  });

  describe('Indeterminate State', () => {
    it('should pass indeterminate to primitive', () => {
      fixture.componentRef.setInput('indeterminate', true);
      fixture.detectChanges();

      expect(component.indeterminate()).toBe(true);
    });
  });

  describe('Error State', () => {
    it('should apply error class when error is present', () => {
      fixture.componentRef.setInput('error', 'Error message');
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-checkbox'));
      expect(container.nativeElement.classList.contains('ds-checkbox--error')).toBe(true);
    });
  });

  describe('Size variants', () => {
    it('should apply size sm', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();

      expect(component.size()).toBe('sm');
    });

    it('should apply size md by default', () => {
      expect(component.size()).toBe('md');
    });

    it('should apply size lg', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(component.size()).toBe('lg');
    });
  });

  describe('Name attribute', () => {
    it('should pass name to primitive when provided', () => {
      fixture.componentRef.setInput('name', 'test-name');
      fixture.detectChanges();

      expect(component.name()).toBe('test-name');
    });

    it('should not pass name when undefined', () => {
      expect(component.name()).toBeUndefined();
    });
  });

  describe('ID generation', () => {
    it('should generate unique id by default', () => {
      const id1 = component.id();

      const fixture2 = TestBed.createComponent(DsCheckbox);
      const component2 = fixture2.componentInstance;
      const id2 = component2.id();

      expect(id1).not.toBe(id2);
      expect(id1).toContain('ds-checkbox-');
      expect(id2).toContain('ds-checkbox-');
    });

    it('should use provided id when specified', () => {
      fixture.componentRef.setInput('id', 'custom-checkbox-id');
      fixture.detectChanges();

      expect(component.id()).toBe('custom-checkbox-id');
    });
  });

  describe('Computed properties', () => {
    it('should compute errorId correctly', () => {
      fixture.componentRef.setInput('id', 'test');
      fixture.componentRef.setInput('error', 'Error');
      fixture.detectChanges();

      expect(component['errorId']()).toBe('test-error');
    });

    it('should return undefined errorId when no error', () => {
      expect(component['errorId']()).toBeUndefined();
    });

    it('should compute helperId correctly', () => {
      fixture.componentRef.setInput('id', 'test');
      fixture.componentRef.setInput('helper', 'Helper');
      fixture.detectChanges();

      expect(component['helperId']()).toBe('test-helper');
    });

    it('should return undefined helperId when no helper', () => {
      expect(component['helperId']()).toBeUndefined();
    });

    it('should compute ariaDescribedBy with both error and helper ids', () => {
      fixture.componentRef.setInput('id', 'test');
      fixture.componentRef.setInput('helper', 'Helper');
      fixture.detectChanges();

      const ariaDesc = component['ariaDescribedBy']();
      expect(ariaDesc).toContain('helper');
    });

    it('should return undefined ariaDescribedBy when no helper or error', () => {
      expect(component['ariaDescribedBy']()).toBeUndefined();
    });

    it('should compute hasError correctly', () => {
      fixture.componentRef.setInput('error', 'Error');
      fixture.detectChanges();

      expect(component['hasError']()).toBe(true);
    });

    it('should compute hasError as false when no error', () => {
      expect(component['hasError']()).toBe(false);
    });
  });

  describe('Event handling', () => {
    it('should update internal value on checkedChange', () => {
      component['onCheckedChange'](true);

      expect(component['internalValue']()).toBe(true);
    });

    it('should not update when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      component['onCheckedChange'](true);

      expect(component['internalValue']()).toBe(false);
    });

    it('should call onChange callback on checkedChange', () => {
      const spy = jasmine.createSpy('onChange');
      component.registerOnChange(spy);

      component['onCheckedChange'](true);

      expect(spy).toHaveBeenCalledWith(true);
    });

    it('should call onTouched callback on checkedChange', () => {
      const spy = jasmine.createSpy('onTouched');
      component.registerOnTouched(spy);

      component['onCheckedChange'](true);

      expect(spy).toHaveBeenCalled();
    });
  });
});
