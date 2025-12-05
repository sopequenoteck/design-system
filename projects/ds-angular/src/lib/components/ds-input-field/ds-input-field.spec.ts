import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsInputField } from './ds-input-field';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { faUser } from '@fortawesome/free-solid-svg-icons';

describe('DsInputField', () => {
  let component: DsInputField;
  let fixture: ComponentFixture<DsInputField>;
  let inputElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsInputField],
    }).compileComponents();

    fixture = TestBed.createComponent(DsInputField);
    component = fixture.componentInstance;
    fixture.detectChanges();
    inputElement = fixture.debugElement.query(By.css('input'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input element', () => {
    expect(inputElement).toBeTruthy();
  });

  it('should bind name attribute', () => {
    fixture.componentRef.setInput('name', 'custom-name');
    fixture.detectChanges();

    expect(inputElement.nativeElement.getAttribute('name')).toBe('custom-name');
  });

  it('should have default type text', () => {
    expect(component.type()).toBe('text');
  });

  it('should have default size md', () => {
    expect(component.size()).toBe('md');
  });

  it('should have default variant default', () => {
    expect(component.variant()).toBe('default');
  });

  it('should write value via writeValue', () => {
    component.writeValue('test value');
    expect(component.internalValue()).toBe('test value');
  });

  it('should handle null value in writeValue', () => {
    component.writeValue(null);
    expect(component.internalValue()).toBe('');
  });

  it('should call onChange when input changes', () => {
    const onChangeSpy = jasmine.createSpy('onChange');
    component.registerOnChange(onChangeSpy);

    component.onPrimitiveValueChange('new value');

    expect(onChangeSpy).toHaveBeenCalledWith('new value');
    expect(component.internalValue()).toBe('new value');
  });

  it('should call onTouched when input blurs', () => {
    const onTouchedSpy = jasmine.createSpy('onTouched');
    component.registerOnTouched(onTouchedSpy);

    component.onInputBlur();

    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should render label when provided', () => {
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.detectChanges();

    const label = fixture.debugElement.query(By.css('label'));
    expect(label).toBeTruthy();
    expect(label.nativeElement.textContent).toContain('Test Label');
  });

  it('should render helper text when provided without error', () => {
    fixture.componentRef.setInput('helper', 'Helper text');
    fixture.detectChanges();

    const helper = fixture.debugElement.query(By.css('.helper'));
    expect(helper).toBeTruthy();
    expect(helper.nativeElement.textContent).toContain('Helper text');
  });

  it('should hide helper when error is present', () => {
    fixture.componentRef.setInput('helper', 'Helper text');
    fixture.componentRef.setInput('error', 'Error found');
    fixture.detectChanges();

    const helper = fixture.debugElement.query(By.css('.helper'));
    expect(helper).toBeFalsy();
  });

  it('should render error message when provided', () => {
    fixture.componentRef.setInput('error', 'Error message');
    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css('.error'));
    expect(error).toBeTruthy();
    expect(error.nativeElement.textContent).toContain('Error message');
  });

  it('should compute inputState as success when no error', () => {
    fixture.componentRef.setInput('state', 'success');
    fixture.detectChanges();

    expect(component.inputState()).toBe('success');
  });

  it('should compute inputState as error when error is provided', () => {
    fixture.componentRef.setInput('state', 'success');
    fixture.componentRef.setInput('error', 'Some error');
    fixture.detectChanges();

    expect(component.inputState()).toBe('error');
  });

  it('should render counter when maxlength is provided', () => {
    fixture.componentRef.setInput('maxlength', 100);
    component.internalValue.set('test');
    fixture.detectChanges();

    const counter = fixture.debugElement.query(By.css('.counter'));
    expect(counter).toBeTruthy();
    expect(counter.nativeElement.textContent).toContain('4/100');
  });

  it('should show clear button when clearable and value exists', () => {
    fixture.componentRef.setInput('clearable', true);
    component.internalValue.set('some value');
    fixture.detectChanges();

    const clearBtn = fixture.debugElement.query(By.css('.icon-btn.clear'));
    expect(clearBtn).toBeTruthy();
  });

  it('should not show clear button when value is empty', () => {
    fixture.componentRef.setInput('clearable', true);
    component.internalValue .set('');
    fixture.detectChanges();

    const clearBtn = fixture.debugElement.query(By.css('.icon-btn.clear'));
    expect(clearBtn).toBeFalsy();
  });

  it('should clear value when clear button is clicked', () => {
    const onChangeSpy = jasmine.createSpy('onChange');
    component.registerOnChange(onChangeSpy);

    fixture.componentRef.setInput('clearable', true);
    component.internalValue.set('some value');
    fixture.detectChanges();

    const clearBtn = fixture.debugElement.query(By.css('.icon-btn.clear'));
    clearBtn.nativeElement.click();

    expect(component.internalValue()).toBe('');
    expect(onChangeSpy).toHaveBeenCalledWith('');
  });

  it('should show toggle password button when togglePassword is true and type is password', () => {
    fixture.componentRef.setInput('togglePassword', true);
    fixture.componentRef.setInput('type', 'password');
    fixture.detectChanges();

    const toggleBtn = fixture.debugElement.query(By.css('.icon-btn.toggle'));
    expect(toggleBtn).toBeTruthy();
  });

  it('should toggle password visibility', () => {
    fixture.componentRef.setInput('togglePassword', true);
    fixture.componentRef.setInput('type', 'password');
    fixture.detectChanges();

    expect(component.passwordVisible()).toBe(false);
    expect(component.actualType()).toBe('password');

    component.togglePasswordVisibility();

    expect(component.passwordVisible()).toBe(true);
    expect(component.actualType()).toBe('text');
  });

  it('should pass iconStart to primitive-input', () => {
    fixture.componentRef.setInput('iconStart', faUser);
    fixture.detectChanges();

    const iconStart = fixture.debugElement.query(By.css('.icon-start'));
    expect(iconStart).toBeTruthy();
  });

  it('should apply variant class', () => {
    fixture.componentRef.setInput('variant', 'outline');
    fixture.detectChanges();

    const container = fixture.debugElement.query(By.css('.ds-input-field'));
    expect(container.nativeElement.classList.contains('outline')).toBe(true);
  });

  it('should apply disabled state via ControlValueAccessor', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    const container = fixture.debugElement.query(By.css('.ds-input-field'));
    expect(container.nativeElement.classList.contains('is-disabled')).toBeTrue();
  });

  describe('Size variants', () => {
    it('should apply size sm', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();
      expect(component.size()).toBe('sm');
    });

    it('should apply size lg', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();
      expect(component.size()).toBe('lg');
    });
  });

  describe('Type variants', () => {
    it('should support type email', () => {
      fixture.componentRef.setInput('type', 'email');
      fixture.detectChanges();
      expect(component.type()).toBe('email');
    });

    it('should support type password', () => {
      fixture.componentRef.setInput('type', 'password');
      fixture.detectChanges();
      expect(component.type()).toBe('password');
    });

    it('should support type number', () => {
      fixture.componentRef.setInput('type', 'number');
      fixture.detectChanges();
      expect(component.type()).toBe('number');
    });

    it('should support type tel', () => {
      fixture.componentRef.setInput('type', 'tel');
      fixture.detectChanges();
      expect(component.type()).toBe('tel');
    });

    it('should support type url', () => {
      fixture.componentRef.setInput('type', 'url');
      fixture.detectChanges();
      expect(component.type()).toBe('url');
    });
  });

  describe('Disabled and readonly states', () => {
    it('should apply disabled state from input', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(component.isDisabled()).toBeTrue();
    });

    it('should apply readonly state', () => {
      fixture.componentRef.setInput('readonly', true);
      fixture.detectChanges();
      expect(component.readonly()).toBeTrue();
    });

    it('should not clear value when disabled', () => {
      fixture.componentRef.setInput('clearable', true);
      fixture.componentRef.setInput('disabled', true);
      component.internalValue.set('test');
      fixture.detectChanges();

      component.clearValue();
      expect(component.internalValue()).toBe('test');
    });

    it('should not toggle password visibility when disabled', () => {
      fixture.componentRef.setInput('togglePassword', true);
      fixture.componentRef.setInput('type', 'password');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      component.togglePasswordVisibility();
      expect(component.passwordVisible()).toBe(false);
    });

    it('should not change value via onPrimitiveValueChange when disabled', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);
      component.setDisabledState(true);
      fixture.detectChanges();

      component.onPrimitiveValueChange('new value');

      expect(onChangeSpy).not.toHaveBeenCalled();
      expect(component.internalValue()).toBe('');
    });
  });

  describe('Placeholder', () => {
    it('should render placeholder', () => {
      fixture.componentRef.setInput('placeholder', 'Enter text here');
      fixture.detectChanges();
      expect(component.placeholder()).toBe('Enter text here');
    });
  });

  describe('IconEnd', () => {
    it('should pass iconEnd to primitive-input', () => {
      fixture.componentRef.setInput('iconEnd', faUser);
      fixture.detectChanges();

      const iconEnd = fixture.debugElement.query(By.css('.icon-end'));
      expect(iconEnd).toBeTruthy();
    });
  });

  describe('ARIA attributes', () => {
    it('should compute errorId when error is present', () => {
      fixture.componentRef.setInput('error', 'Test error');
      fixture.detectChanges();
      expect(component.errorId()).toBeDefined();
      expect(component.errorId()).toContain('-error');
    });

    it('should compute helperId when helper is present', () => {
      fixture.componentRef.setInput('helper', 'Test helper');
      fixture.detectChanges();
      expect(component.helperId()).toBeDefined();
      expect(component.helperId()).toContain('-helper');
    });

    it('should compute counterId when maxlength is present', () => {
      fixture.componentRef.setInput('maxlength', 50);
      fixture.detectChanges();
      expect(component.counterId()).toBeDefined();
      expect(component.counterId()).toContain('-counter');
    });

    it('should compute ariaDescribedBy with multiple IDs', () => {
      fixture.componentRef.setInput('error', 'Error');
      fixture.componentRef.setInput('maxlength', 50);
      fixture.detectChanges();

      const describedBy = component.ariaDescribedBy();
      expect(describedBy).toBeDefined();
      expect(describedBy).toContain('-error');
      expect(describedBy).toContain('-counter');
    });

    it('should return undefined for ariaDescribedBy when no descriptors', () => {
      fixture.detectChanges();
      expect(component.ariaDescribedBy()).toBeUndefined();
    });
  });

  describe('State variants', () => {
    it('should apply state warning', () => {
      fixture.componentRef.setInput('state', 'warning');
      fixture.detectChanges();
      expect(component.inputState()).toBe('warning');
    });

    it('should apply state default', () => {
      fixture.componentRef.setInput('state', 'default');
      fixture.detectChanges();
      expect(component.inputState()).toBe('default');
    });
  });

  describe('ExternalValue', () => {
    it('should set internalValue from externalValue on init', () => {
      const newFixture = TestBed.createComponent(DsInputField);
      newFixture.componentRef.setInput('externalValue', 'external');
      newFixture.detectChanges();

      expect(newFixture.componentInstance.internalValue()).toBe('external');
    });

    it('should handle null externalValue', () => {
      const newFixture = TestBed.createComponent(DsInputField);
      newFixture.componentRef.setInput('externalValue', null);
      newFixture.detectChanges();

      expect(newFixture.componentInstance.internalValue()).toBe('');
    });

    it('should ignore externalValue changes after first write', () => {
      component.writeValue('initial');
      fixture.detectChanges();

      fixture.componentRef.setInput('externalValue', 'should not update');
      fixture.detectChanges();

      expect(component.internalValue()).toBe('initial');
    });
  });

  describe('Character count', () => {
    it('should compute characterCount correctly', () => {
      component.internalValue.set('hello');
      expect(component.characterCount()).toBe(5);
    });

    it('should update characterCount when value changes', () => {
      component.internalValue.set('test');
      expect(component.characterCount()).toBe(4);

      component.internalValue.set('longer text');
      expect(component.characterCount()).toBe(11);
    });
  });

  describe('Clear button visibility', () => {
    it('should not show clear button when readonly', () => {
      fixture.componentRef.setInput('clearable', true);
      fixture.componentRef.setInput('readonly', true);
      component.internalValue.set('text');
      fixture.detectChanges();

      expect(component.showClearButton()).toBe(false);
    });
  });

  describe('Required attribute', () => {
    it('should apply required attribute', () => {
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();
      expect(component.required()).toBeTrue();
    });
  });

  describe('Autocomplete attribute', () => {
    it('should apply autocomplete attribute', () => {
      fixture.componentRef.setInput('autocomplete', 'email');
      fixture.detectChanges();
      expect(component.autocomplete()).toBe('email');
    });
  });

  describe('AriaLabel attribute', () => {
    it('should apply ariaLabel attribute', () => {
      fixture.componentRef.setInput('ariaLabel', 'Custom label');
      fixture.detectChanges();
      expect(component.ariaLabel()).toBe('Custom label');
    });
  });
});
