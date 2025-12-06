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

      expect(component.label()).toBe('Toggle Label');
    });

    it('should pass labelPosition to primitive', () => {
      fixture.componentRef.setInput('labelPosition', 'left');
      fixture.detectChanges();

      expect(component.labelPosition()).toBe('left');
    });

    it('should pass size to primitive', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(component.size()).toBe('lg');
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
    it('should compute helperId when helper is provided', () => {
      fixture.componentRef.setInput('id', 'test-toggle');
      fixture.componentRef.setInput('helper', 'Helper text');
      fixture.detectChanges();

      expect(component['helperId']()).toBe('test-toggle-helper');
    });

    it('should not set helperId when helper is not provided', () => {
      expect(component['helperId']()).toBeUndefined();
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

      expect(component.size()).toBe('sm');
    });

    it('should pass md size to primitive (default)', () => {
      expect(component.size()).toBe('md');
    });

    it('should pass lg size to primitive', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(component.size()).toBe('lg');
    });
  });

  describe('Label Position', () => {
    it('should pass right label position by default', () => {
      expect(component.labelPosition()).toBe('right');
    });

    it('should pass left label position when specified', () => {
      fixture.componentRef.setInput('labelPosition', 'left');
      fixture.detectChanges();

      expect(component.labelPosition()).toBe('left');
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

    it('should update internal value when checked changes', () => {
      component['onCheckedChange'](true);
      expect(component['internalValue']()).toBe(true);

      component['onCheckedChange'](false);
      expect(component['internalValue']()).toBe(false);
    });

    it('should call onChange with correct value', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);

      component['onCheckedChange'](true);
      expect(onChangeSpy).toHaveBeenCalledWith(true);

      component['onCheckedChange'](false);
      expect(onChangeSpy).toHaveBeenCalledWith(false);
    });
  });

  describe('Computed properties', () => {
    it('should compute isDisabled from disabled input', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(component['isDisabled']()).toBe(true);
    });

    it('should compute isDisabled from disabledState', () => {
      component['disabledState'].set(true);
      fixture.detectChanges();
      expect(component['isDisabled']()).toBe(true);
    });

    it('should compute isDisabled from both sources', () => {
      fixture.componentRef.setInput('disabled', true);
      component['disabledState'].set(true);
      fixture.detectChanges();
      expect(component['isDisabled']()).toBe(true);
    });

    it('should compute helperId when helper is present', () => {
      fixture.componentRef.setInput('id', 'test-id');
      fixture.componentRef.setInput('helper', 'Helper');
      fixture.detectChanges();
      expect(component['helperId']()).toBe('test-id-helper');
    });

    it('should return undefined for helperId when helper is not present', () => {
      fixture.componentRef.setInput('id', 'test-id');
      fixture.detectChanges();
      expect(component['helperId']()).toBeUndefined();
    });
  });

  describe('Name attribute', () => {
    it('should pass name to primitive when provided', () => {
      fixture.componentRef.setInput('name', 'toggle-name');
      fixture.detectChanges();

      expect(component.name()).toBe('toggle-name');
    });

    it('should handle undefined name', () => {
      fixture.componentRef.setInput('name', undefined);
      fixture.detectChanges();

      expect(component.name()).toBeUndefined();
    });
  });

  describe('ID generation', () => {
    it('should generate unique IDs', () => {
      const id1 = component.id();
      const newFixture = TestBed.createComponent(DsToggle);
      const id2 = newFixture.componentInstance.id();

      expect(id1).not.toBe(id2);
      expect(id1).toContain('ds-toggle-');
      expect(id2).toContain('ds-toggle-');
    });

    it('should use provided ID', () => {
      fixture.componentRef.setInput('id', 'custom-id');
      fixture.detectChanges();

      expect(component.id()).toBe('custom-id');
    });
  });

  describe('Event handler edge cases', () => {
    it('should not change value when onCheckedChange is called while disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const initialValue = component['internalValue']();
      component['onCheckedChange'](true);

      expect(component['internalValue']()).toBe(initialValue);
    });

    it('should call both onChange and onTouched on checked change', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      const onTouchedSpy = jasmine.createSpy('onTouched');
      component.registerOnChange(onChangeSpy);
      component.registerOnTouched(onTouchedSpy);

      component['onCheckedChange'](true);

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onTouchedSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Value propagation', () => {
    it('should propagate checked state to primitive', () => {
      component.writeValue(true);
      fixture.detectChanges();

      expect(component['internalValue']()).toBe(true);
    });

    it('should propagate unchecked state to primitive', () => {
      component.writeValue(false);
      fixture.detectChanges();

      expect(component['internalValue']()).toBe(false);
    });

    it('should handle null as false', () => {
      component.writeValue(null);
      fixture.detectChanges();

      expect(component['internalValue']()).toBe(false);
    });
  });

  describe('Multiple toggles', () => {
    it('should work with multiple instances', () => {
      const fixture2 = TestBed.createComponent(DsToggle);
      const component2 = fixture2.componentInstance;
      fixture2.detectChanges();

      component.writeValue(true);
      component2.writeValue(false);
      fixture.detectChanges();
      fixture2.detectChanges();

      expect(component['internalValue']()).toBe(true);
      expect(component2['internalValue']()).toBe(false);
    });
  });
});
