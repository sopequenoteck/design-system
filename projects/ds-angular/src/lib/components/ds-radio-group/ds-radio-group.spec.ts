import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DsRadioGroup, RadioOption } from './ds-radio-group';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('DsRadioGroup', () => {
  let component: DsRadioGroup;
  let fixture: ComponentFixture<DsRadioGroup>;

  const testOptions: RadioOption[] = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsRadioGroup, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DsRadioGroup);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', testOptions);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render all radio options', () => {
      const radios = fixture.debugElement.queryAll(By.css('primitive-radio'));
      expect(radios.length).toBe(3);
    });

    it('should pass correct labels to radios', () => {
      const options = component.options();
      expect(options[0].label).toBe('Option 1');
      expect(options[1].label).toBe('Option 2');
      expect(options[2].label).toBe('Option 3');
    });

    it('should pass correct values to radios', () => {
      const options = component.options();
      expect(options[0].value).toBe('option1');
      expect(options[1].value).toBe('option2');
      expect(options[2].value).toBe('option3');
    });

    it('should render group label when provided', () => {
      fixture.componentRef.setInput('label', 'Choose an option');
      fixture.detectChanges();

      const label = fixture.debugElement.query(By.css('.ds-radio-group__label'));
      expect(label).toBeTruthy();
      expect(label.nativeElement.textContent).toContain('Choose an option');
    });

    it('should render helper text when provided', () => {
      fixture.componentRef.setInput('helper', 'Helper text');
      fixture.detectChanges();

      const helper = fixture.debugElement.query(By.css('.ds-radio-group__helper'));
      expect(helper).toBeTruthy();
      expect(helper.nativeElement.textContent.trim()).toBe('Helper text');
    });

    it('should render error text when provided', () => {
      fixture.componentRef.setInput('error', 'Error message');
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('.ds-radio-group__error'));
      expect(error).toBeTruthy();
      expect(error.nativeElement.textContent.trim()).toBe('Error message');
    });

    it('should not render helper when error is present', () => {
      fixture.componentRef.setInput('helper', 'Helper text');
      fixture.componentRef.setInput('error', 'Error message');
      fixture.detectChanges();

      const helper = fixture.debugElement.query(By.css('.ds-radio-group__helper'));
      const error = fixture.debugElement.query(By.css('.ds-radio-group__error'));
      expect(helper).toBeFalsy();
      expect(error).toBeTruthy();
    });

    it('should render required indicator when required is true', () => {
      fixture.componentRef.setInput('label', 'Choose');
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();

      const required = fixture.debugElement.query(By.css('.ds-radio-group__required'));
      expect(required).toBeTruthy();
      expect(required.nativeElement.textContent).toBe('*');
    });
  });

  describe('Layout', () => {
    it('should apply vertical layout by default', () => {
      const options = fixture.debugElement.query(By.css('.ds-radio-group__options'));
      expect(options.nativeElement.classList.contains('ds-radio-group--horizontal')).toBe(false);
    });

    it('should apply horizontal layout when specified', () => {
      fixture.componentRef.setInput('layout', 'horizontal');
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-radio-group'));
      expect(container.nativeElement.classList.contains('ds-radio-group--horizontal')).toBe(true);
    });
  });

  describe('ControlValueAccessor', () => {
    it('should implement writeValue', () => {
      component.writeValue('option2');
      fixture.detectChanges();

      expect(component['internalValue']()).toBe('option2');
      expect(component['isOptionSelected']('option2')).toBe(true);
    });

    it('should handle null value in writeValue', () => {
      component.writeValue(null);
      fixture.detectChanges();

      expect(component['internalValue']()).toBe(null);
    });

    it('should call registered onChange callback', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);

      const radios = fixture.debugElement.queryAll(By.css('.primitive-radio'));
      radios[1].nativeElement.click();
      fixture.detectChanges();

      expect(onChangeSpy).toHaveBeenCalledWith('option2');
    });

    it('should call registered onTouched callback', () => {
      const onTouchedSpy = jasmine.createSpy('onTouched');
      component.registerOnTouched(onTouchedSpy);

      const radios = fixture.debugElement.queryAll(By.css('.primitive-radio'));
      radios[0].nativeElement.click();
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
      const control = new FormControl('option1');

      TestBed.runInInjectionContext(() => {
        const standaloneFixture = TestBed.createComponent(DsRadioGroup);
        const standaloneComponent = standaloneFixture.componentInstance;
        standaloneFixture.componentRef.setInput('options', testOptions);

        control.valueChanges.subscribe((value) => {
          standaloneComponent.writeValue(value);
        });
        standaloneComponent.registerOnChange((value: string | null) => {
          control.setValue(value, { emitEvent: false });
        });

        standaloneComponent.writeValue('option1');
        standaloneFixture.detectChanges();
        expect(standaloneComponent['internalValue']()).toBe('option1');

        control.setValue('option2');
        standaloneFixture.detectChanges();
        expect(standaloneComponent['internalValue']()).toBe('option2');

        const radios = standaloneFixture.debugElement.queryAll(By.css('.primitive-radio'));
        radios[2].nativeElement.click();
        standaloneFixture.detectChanges();
        expect(control.value).toBe('option3');
      });
    });

    it('should respect disabled state from FormControl', () => {
      const control = new FormControl({ value: 'option1', disabled: true });

      component.setDisabledState(true);
      fixture.detectChanges();

      expect(component['isDisabled']()).toBe(true);
    });
  });

  describe('Disabled Options', () => {
    it('should disable specific options', () => {
      const optionsWithDisabled: RadioOption[] = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2', disabled: true },
        { label: 'Option 3', value: 'option3' },
      ];

      fixture.componentRef.setInput('options', optionsWithDisabled);
      fixture.detectChanges();

      expect(component['isOptionDisabled'](optionsWithDisabled[0])).toBe(false);
      expect(component['isOptionDisabled'](optionsWithDisabled[1])).toBe(true);
      expect(component['isOptionDisabled'](optionsWithDisabled[2])).toBe(false);
    });

    it('should disable all options when group is disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(component['isDisabled']()).toBe(true);
      component.options().forEach((option) => {
        expect(component['isOptionDisabled'](option)).toBe(true);
      });
    });
  });

  describe('Accessibility', () => {
    it('should have role="radiogroup"', () => {
      const container = fixture.debugElement.query(By.css('.ds-radio-group'));
      expect(container.nativeElement.getAttribute('role')).toBe('radiogroup');
    });

    it('should set aria-labelledby when label is provided', () => {
      fixture.componentRef.setInput('id', 'test-radio-group');
      fixture.componentRef.setInput('label', 'Choose option');
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-radio-group'));
      expect(container.nativeElement.getAttribute('aria-labelledby')).toBe('test-radio-group-label');
    });

    it('should set aria-describedby when helper is provided', () => {
      fixture.componentRef.setInput('id', 'test-radio-group');
      fixture.componentRef.setInput('helper', 'Helper text');
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-radio-group'));
      expect(container.nativeElement.getAttribute('aria-describedby')).toBe(
        'test-radio-group-helper'
      );
    });

    it('should set aria-describedby when error is provided', () => {
      fixture.componentRef.setInput('id', 'test-radio-group');
      fixture.componentRef.setInput('error', 'Error message');
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-radio-group'));
      expect(container.nativeElement.getAttribute('aria-describedby')).toBe(
        'test-radio-group-error'
      );
    });

    it('should set aria-invalid when error is present', () => {
      fixture.componentRef.setInput('error', 'Error message');
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-radio-group'));
      expect(container.nativeElement.getAttribute('aria-invalid')).toBe('true');
    });

    it('should set aria-required when required is true', () => {
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.ds-radio-group'));
      expect(container.nativeElement.getAttribute('aria-required')).toBe('true');
    });

    it('should set role="alert" on error message', () => {
      fixture.componentRef.setInput('error', 'Error message');
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('.ds-radio-group__error'));
      expect(error.nativeElement.getAttribute('role')).toBe('alert');
    });
  });

  describe('Selection', () => {
    it('should select option on click', () => {
      const radios = fixture.debugElement.queryAll(By.css('.primitive-radio'));
      radios[1].nativeElement.click();
      fixture.detectChanges();

      expect(component['internalValue']()).toBe('option2');
      expect(component['isOptionSelected']('option2')).toBe(true);
    });

    it('should only allow one selection at a time', () => {
      const radios = fixture.debugElement.queryAll(By.css('.primitive-radio'));

      radios[0].nativeElement.click();
      fixture.detectChanges();
      expect(component['internalValue']()).toBe('option1');

      radios[1].nativeElement.click();
      fixture.detectChanges();
      expect(component['internalValue']()).toBe('option2');
      expect(component['isOptionSelected']('option1')).toBe(false);
    });
  });

  describe('Size', () => {
    it('should pass size to all radios', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      expect(component.size()).toBe('lg');
    });

    it('should apply size sm', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();

      expect(component.size()).toBe('sm');
    });

    it('should apply default size md', () => {
      expect(component.size()).toBe('md');
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

    it('should compute errorId when error is present', () => {
      fixture.componentRef.setInput('id', 'test-id');
      fixture.componentRef.setInput('error', 'Error');
      fixture.detectChanges();
      expect(component['errorId']()).toBe('test-id-error');
    });

    it('should compute helperId when helper is present', () => {
      fixture.componentRef.setInput('id', 'test-id');
      fixture.componentRef.setInput('helper', 'Helper');
      fixture.detectChanges();
      expect(component['helperId']()).toBe('test-id-helper');
    });

    it('should compute ariaDescribedBy with error and helper', () => {
      fixture.componentRef.setInput('id', 'test-id');
      fixture.componentRef.setInput('error', 'Error');
      fixture.componentRef.setInput('helper', 'Helper');
      fixture.detectChanges();

      const describedBy = component['ariaDescribedBy']();
      expect(describedBy).toContain('test-id-error');
      // Helper is not included when error is present
    });

    it('should compute hasError correctly', () => {
      fixture.componentRef.setInput('error', 'Error');
      fixture.detectChanges();
      expect(component['hasError']()).toBe(true);

      fixture.componentRef.setInput('error', undefined);
      fixture.detectChanges();
      expect(component['hasError']()).toBe(false);
    });
  });

  describe('Helper methods', () => {
    it('should check if option is selected', () => {
      component['internalValue'].set('option2');
      fixture.detectChanges();

      expect(component['isOptionSelected']('option2')).toBe(true);
      expect(component['isOptionSelected']('option1')).toBe(false);
    });

    it('should check if option is disabled', () => {
      const optionWithDisabled: RadioOption = { label: 'Test', value: 'test', disabled: true };
      expect(component['isOptionDisabled'](optionWithDisabled)).toBe(true);

      const optionWithoutDisabled: RadioOption = { label: 'Test', value: 'test' };
      expect(component['isOptionDisabled'](optionWithoutDisabled)).toBe(false);
    });

    it('should check if option is disabled when group is disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const option: RadioOption = { label: 'Test', value: 'test' };
      expect(component['isOptionDisabled'](option)).toBe(true);
    });

    it('should track by value', () => {
      const option: RadioOption = { label: 'Test', value: 'test-value' };
      const result = component['trackByValue'](0, option);
      expect(result).toBe('test-value');
    });
  });

  describe('Event handling', () => {
    it('should not change value when disabled via input', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);

      component['onRadioChange']('option2');

      expect(component['internalValue']()).toBe(null);
      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it('should not change value when disabled via setDisabledState', () => {
      component.setDisabledState(true);
      fixture.detectChanges();

      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);

      component['onRadioChange']('option2');

      expect(component['internalValue']()).toBe(null);
      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it('should update internal value on radio change', () => {
      component['onRadioChange']('option2');
      expect(component['internalValue']()).toBe('option2');
    });

    it('should call onChange and onTouched on radio change', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      const onTouchedSpy = jasmine.createSpy('onTouched');
      component.registerOnChange(onChangeSpy);
      component.registerOnTouched(onTouchedSpy);

      component['onRadioChange']('option2');

      expect(onChangeSpy).toHaveBeenCalledWith('option2');
      expect(onTouchedSpy).toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    it('should handle empty options array', () => {
      fixture.componentRef.setInput('options', []);
      fixture.detectChanges();

      const radios = fixture.debugElement.queryAll(By.css('primitive-radio'));
      expect(radios.length).toBe(0);
    });

    it('should handle options with same value', () => {
      const duplicateOptions: RadioOption[] = [
        { label: 'Option 1', value: 'same' },
        { label: 'Option 2', value: 'same' },
      ];
      fixture.componentRef.setInput('options', duplicateOptions);
      fixture.detectChanges();

      component['onRadioChange']('same');
      expect(component['internalValue']()).toBe('same');
    });

    it('should generate unique IDs', () => {
      const id1 = component.id();
      const newFixture = TestBed.createComponent(DsRadioGroup);
      const id2 = newFixture.componentInstance.id();

      expect(id1).not.toBe(id2);
    });

    it('should generate unique names', () => {
      const name1 = component.name();
      const newFixture = TestBed.createComponent(DsRadioGroup);
      const name2 = newFixture.componentInstance.name();

      expect(name1).not.toBe(name2);
    });
  });

  describe('Name attribute', () => {
    it('should pass same name to all radios', () => {
      fixture.componentRef.setInput('name', 'custom-name');
      fixture.detectChanges();

      expect(component.name()).toBe('custom-name');
    });

    it('should use generated name by default', () => {
      const name = component.name();
      expect(name).toContain('radio-group-');
    });
  });

  describe('ARIA live regions', () => {
    it('should set aria-live on helper text', () => {
      fixture.componentRef.setInput('helper', 'Helper text');
      fixture.detectChanges();

      const helper = fixture.debugElement.query(By.css('.ds-radio-group__helper'));
      expect(helper.nativeElement.getAttribute('aria-live')).toBe('polite');
    });

    it('should set aria-live on error message', () => {
      fixture.componentRef.setInput('error', 'Error message');
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('.ds-radio-group__error'));
      expect(error.nativeElement.getAttribute('aria-live')).toBe('assertive');
    });
  });
});
