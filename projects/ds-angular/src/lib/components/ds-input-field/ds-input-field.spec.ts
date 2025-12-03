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
});
