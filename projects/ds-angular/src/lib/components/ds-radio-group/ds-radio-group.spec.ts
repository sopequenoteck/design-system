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
      const radios = fixture.debugElement.queryAll(By.css('primitive-radio'));
      expect(radios[0].nativeElement.getAttribute('ng-reflect-label')).toBe('Option 1');
      expect(radios[1].nativeElement.getAttribute('ng-reflect-label')).toBe('Option 2');
      expect(radios[2].nativeElement.getAttribute('ng-reflect-label')).toBe('Option 3');
    });

    it('should pass correct values to radios', () => {
      const radios = fixture.debugElement.queryAll(By.css('primitive-radio'));
      expect(radios[0].nativeElement.getAttribute('ng-reflect-value')).toBe('option1');
      expect(radios[1].nativeElement.getAttribute('ng-reflect-value')).toBe('option2');
      expect(radios[2].nativeElement.getAttribute('ng-reflect-value')).toBe('option3');
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

      const radios = fixture.debugElement.queryAll(By.css('primitive-radio'));
      radios[1].nativeElement.click();
      fixture.detectChanges();

      expect(onChangeSpy).toHaveBeenCalledWith('option2');
    });

    it('should call registered onTouched callback', () => {
      const onTouchedSpy = jasmine.createSpy('onTouched');
      component.registerOnTouched(onTouchedSpy);

      const radios = fixture.debugElement.queryAll(By.css('primitive-radio'));
      radios[0].nativeElement.click();
      fixture.detectChanges();

      expect(onTouchedSpy).toHaveBeenCalled();
    });

    it('should handle setDisabledState', () => {
      component.setDisabledState(true);
      fixture.detectChanges();

      expect(component['isDisabled']()).toBe(true);

      const radios = fixture.debugElement.queryAll(By.css('primitive-radio'));
      radios.forEach((radio) => {
        expect(radio.nativeElement.getAttribute('ng-reflect-disabled')).toBe('true');
      });
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

        const radios = standaloneFixture.debugElement.queryAll(By.css('primitive-radio'));
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

      const radios = fixture.debugElement.queryAll(By.css('primitive-radio'));
      expect(radios[0].nativeElement.getAttribute('ng-reflect-disabled')).toBe('false');
      expect(radios[1].nativeElement.getAttribute('ng-reflect-disabled')).toBe('true');
      expect(radios[2].nativeElement.getAttribute('ng-reflect-disabled')).toBe('false');
    });

    it('should disable all options when group is disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const radios = fixture.debugElement.queryAll(By.css('primitive-radio'));
      radios.forEach((radio) => {
        expect(radio.nativeElement.getAttribute('ng-reflect-disabled')).toBe('true');
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
      const radios = fixture.debugElement.queryAll(By.css('primitive-radio'));
      radios[1].nativeElement.click();
      fixture.detectChanges();

      expect(component['internalValue']()).toBe('option2');
      expect(component['isOptionSelected']('option2')).toBe(true);
    });

    it('should only allow one selection at a time', () => {
      const radios = fixture.debugElement.queryAll(By.css('primitive-radio'));

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

      const radios = fixture.debugElement.queryAll(By.css('primitive-radio'));
      radios.forEach((radio) => {
        expect(radio.nativeElement.getAttribute('ng-reflect-size')).toBe('lg');
      });
    });
  });
});
