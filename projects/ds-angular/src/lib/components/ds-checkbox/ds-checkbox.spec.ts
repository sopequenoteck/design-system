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

      expect(primitiveCheckbox.nativeElement.getAttribute('ng-reflect-label')).toBe('Test Label');
    });

    it('should pass size to primitive', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(primitiveCheckbox.nativeElement.getAttribute('ng-reflect-size')).toBe('lg');
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

      primitiveCheckbox.nativeElement.click();
      fixture.detectChanges();

      expect(onChangeSpy).toHaveBeenCalledWith(true);
    });

    it('should call registered onTouched callback', () => {
      const onTouchedSpy = jasmine.createSpy('onTouched');
      component.registerOnTouched(onTouchedSpy);

      primitiveCheckbox.nativeElement.click();
      fixture.detectChanges();

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

        const primitiveEl = standaloneFixture.debugElement.query(By.css('primitive-checkbox'));
        primitiveEl.nativeElement.click();
        standaloneFixture.detectChanges();
        expect(control.value).toBe(false);
      });
    });

    it('should respect disabled state from FormControl', () => {
      const control = new FormControl({ value: false, disabled: true });

      component.setDisabledState(true);
      fixture.detectChanges();

      expect(component['isDisabled']()).toBe(true);
      expect(primitiveCheckbox.nativeElement.getAttribute('ng-reflect-disabled')).toBe('true');
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

      primitiveCheckbox.nativeElement.click();
      fixture.detectChanges();

      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it('should not call onChange when disabled via setDisabledState', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);

      component.setDisabledState(true);
      fixture.detectChanges();

      primitiveCheckbox.nativeElement.click();
      fixture.detectChanges();

      expect(onChangeSpy).not.toHaveBeenCalled();
    });
  });

  describe('Indeterminate State', () => {
    it('should pass indeterminate to primitive', () => {
      fixture.componentRef.setInput('indeterminate', true);
      fixture.detectChanges();

      expect(primitiveCheckbox.nativeElement.getAttribute('ng-reflect-indeterminate')).toBe('true');
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
});
