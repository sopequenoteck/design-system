import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DsToggle } from './ds-toggle';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('DsToggle', () => {
  let component: DsToggle;
  let fixture: ComponentFixture<DsToggle>;
  let primitiveToggle: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsToggle, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DsToggle);
    component = fixture.componentInstance;
    fixture.detectChanges();
    primitiveToggle = fixture.debugElement.query(By.css('primitive-toggle'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render primitive-toggle', () => {
      expect(primitiveToggle).toBeTruthy();
    });

    it('should pass label to primitive', () => {
      fixture.componentRef.setInput('label', 'Toggle Label');
      fixture.detectChanges();

      expect(primitiveToggle.nativeElement.getAttribute('ng-reflect-label')).toBe('Toggle Label');
    });

    it('should pass labelPosition to primitive', () => {
      fixture.componentRef.setInput('labelPosition', 'left');
      fixture.detectChanges();

      expect(primitiveToggle.nativeElement.getAttribute('ng-reflect-label-position')).toBe('left');
    });

    it('should pass size to primitive', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(primitiveToggle.nativeElement.getAttribute('ng-reflect-size')).toBe('lg');
    });

    it('should render helper text when provided', () => {
      fixture.componentRef.setInput('helper', 'Helper text');
      fixture.detectChanges();

      const helper = fixture.debugElement.query(By.css('.ds-toggle__helper'));
      expect(helper).toBeTruthy();
      expect(helper.nativeElement.textContent.trim()).toBe('Helper text');
    });

    it('should not render helper when not provided', () => {
      const helper = fixture.debugElement.query(By.css('.ds-toggle__helper'));
      expect(helper).toBeFalsy();
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

      const toggleSwitch = primitiveToggle.query(By.css('.primitive-toggle__switch'));
      toggleSwitch.nativeElement.click();
      fixture.detectChanges();

      expect(onChangeSpy).toHaveBeenCalledWith(true);
    });

    it('should call registered onTouched callback', () => {
      const onTouchedSpy = jasmine.createSpy('onTouched');
      component.registerOnTouched(onTouchedSpy);

      const toggleSwitch = primitiveToggle.query(By.css('.primitive-toggle__switch'));
      toggleSwitch.nativeElement.click();
      fixture.detectChanges();

      expect(onTouchedSpy).toHaveBeenCalled();
    });

    it('should handle setDisabledState', () => {
      component.setDisabledState(true);
      fixture.detectChanges();

      expect(component['isDisabled']()).toBe(true);
      expect(primitiveToggle.nativeElement.getAttribute('ng-reflect-disabled')).toBe('true');
    });
  });

  describe('Reactive Forms Integration', () => {
    it('should work with FormControl', () => {
      const control = new FormControl(false);

      TestBed.runInInjectionContext(() => {
        const standaloneFixture = TestBed.createComponent(DsToggle);
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

        const primitiveEl = standaloneFixture.debugElement.query(By.css('primitive-toggle'));
        const toggleSwitch = primitiveEl.query(By.css('.primitive-toggle__switch'));
        toggleSwitch.nativeElement.click();
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
      fixture.componentRef.setInput('id', 'test-toggle');
      fixture.componentRef.setInput('helper', 'Helper text');
      fixture.detectChanges();

      expect(primitiveToggle.nativeElement.getAttribute('aria-describedby')).toBe(
        'test-toggle-helper'
      );
    });

    it('should not set aria-describedby when helper is not provided', () => {
      expect(primitiveToggle.nativeElement.getAttribute('aria-describedby')).toBeFalsy();
    });

    it('should set aria-live on helper', () => {
      fixture.componentRef.setInput('helper', 'Helper text');
      fixture.detectChanges();

      const helper = fixture.debugElement.query(By.css('.ds-toggle__helper'));
      expect(helper.nativeElement.getAttribute('aria-live')).toBe('polite');
    });
  });

  describe('Disabled State', () => {
    it('should not call onChange when disabled via input', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);

      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const toggleSwitch = primitiveToggle.query(By.css('.primitive-toggle__switch'));
      toggleSwitch.nativeElement.click();
      fixture.detectChanges();

      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it('should not call onChange when disabled via setDisabledState', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);

      component.setDisabledState(true);
      fixture.detectChanges();

      const toggleSwitch = primitiveToggle.query(By.css('.primitive-toggle__switch'));
      toggleSwitch.nativeElement.click();
      fixture.detectChanges();

      expect(onChangeSpy).not.toHaveBeenCalled();
    });
  });

  describe('Size Variants', () => {
    it('should pass sm size to primitive', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();

      expect(primitiveToggle.nativeElement.getAttribute('ng-reflect-size')).toBe('sm');
    });

    it('should pass md size to primitive (default)', () => {
      expect(primitiveToggle.nativeElement.getAttribute('ng-reflect-size')).toBe('md');
    });

    it('should pass lg size to primitive', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(primitiveToggle.nativeElement.getAttribute('ng-reflect-size')).toBe('lg');
    });
  });

  describe('Label Position', () => {
    it('should pass right label position by default', () => {
      expect(primitiveToggle.nativeElement.getAttribute('ng-reflect-label-position')).toBe('right');
    });

    it('should pass left label position when specified', () => {
      fixture.componentRef.setInput('labelPosition', 'left');
      fixture.detectChanges();

      expect(primitiveToggle.nativeElement.getAttribute('ng-reflect-label-position')).toBe('left');
    });
  });

  describe('Toggle Interaction', () => {
    it('should toggle value on click', () => {
      const toggleSwitch = primitiveToggle.query(By.css('.primitive-toggle__switch'));

      expect(component['internalValue']()).toBe(false);

      toggleSwitch.nativeElement.click();
      fixture.detectChanges();
      expect(component['internalValue']()).toBe(true);

      toggleSwitch.nativeElement.click();
      fixture.detectChanges();
      expect(component['internalValue']()).toBe(false);
    });
  });
});
