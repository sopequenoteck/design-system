import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsInputTextarea } from './ds-input-textarea';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('DsInputTextarea', () => {
  let component: DsInputTextarea;
  let fixture: ComponentFixture<DsInputTextarea>;
  let textareaEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsInputTextarea],
    }).compileComponents();

    fixture = TestBed.createComponent(DsInputTextarea);
    component = fixture.componentInstance;
    fixture.detectChanges();
    textareaEl = fixture.debugElement.query(By.css('textarea'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render textarea element', () => {
    expect(textareaEl).toBeTruthy();
  });

  it('should write value via writeValue', () => {
    component.writeValue('test value');
    expect(component.internalValue()).toBe('test value');
  });

  it('should handle null value in writeValue', () => {
    component.writeValue(null);
    expect(component.internalValue()).toBe('');
  });

  it('should call onChange when primitive emits value', () => {
    const onChangeSpy = jasmine.createSpy('onChange');
    component.registerOnChange(onChangeSpy);

    component.onPrimitiveValueChange('new value');

    expect(onChangeSpy).toHaveBeenCalledWith('new value');
    expect(component.internalValue()).toBe('new value');
  });

  it('should emit valueChange when primitive value updates', () => {
    const spy = spyOn(component.valueChange, 'emit');

    component.onPrimitiveValueChange('signal');

    expect(spy).toHaveBeenCalledWith('signal');
  });

  it('should call onTouched when blur occurs', () => {
    const onTouchedSpy = jasmine.createSpy('onTouched');
    component.registerOnTouched(onTouchedSpy);

    component.onInputBlur();

    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should set disabled state via ControlValueAccessor', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    const container = fixture.debugElement.query(By.css('.ds-input-textarea'));
    expect(container.nativeElement.classList.contains('is-disabled')).toBeTrue();
  });

  it('should render label when provided', () => {
    fixture.componentRef.setInput('label', 'Textarea label');
    fixture.detectChanges();

    const label = fixture.debugElement.query(By.css('label'));
    expect(label).toBeTruthy();
    expect(label.nativeElement.textContent).toContain('Textarea label');
  });

  it('should render helper when provided without error', () => {
    fixture.componentRef.setInput('helper', 'Helper text');
    fixture.detectChanges();

    const helper = fixture.debugElement.query(By.css('.helper'));
    expect(helper).toBeTruthy();
  });

  it('should hide helper when error exists', () => {
    fixture.componentRef.setInput('helper', 'Helper text');
    fixture.componentRef.setInput('error', 'Error text');
    fixture.detectChanges();

    const helper = fixture.debugElement.query(By.css('.helper'));
    expect(helper).toBeFalsy();
  });

  it('should render error when provided', () => {
    fixture.componentRef.setInput('error', 'Error text');
    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css('.error'));
    expect(error).toBeTruthy();
    expect(error.nativeElement.textContent).toContain('Error text');
  });

  it('should render counter when maxlength is provided', () => {
    fixture.componentRef.setInput('maxlength', 200);
    component.internalValue.set('value');
    fixture.detectChanges();

    const counter = fixture.debugElement.query(By.css('.counter'));
    expect(counter).toBeTruthy();
    expect(counter.nativeElement.textContent).toContain('5/200');
  });

  it('should show clear button when clearable and value exists', () => {
    fixture.componentRef.setInput('clearable', true);
    component.internalValue.set('long text');
    fixture.detectChanges();

    const clearBtn = fixture.debugElement.query(By.css('.icon-btn.clear'));
    expect(clearBtn).toBeTruthy();
  });

  it('should clear value when clear button clicked', () => {
    const onChangeSpy = jasmine.createSpy('onChange');
    component.registerOnChange(onChangeSpy);

    fixture.componentRef.setInput('clearable', true);
    component.internalValue.set('long text');
    fixture.detectChanges();

    const clearBtn = fixture.debugElement.query(By.css('.icon-btn.clear'));
    clearBtn.nativeElement.click();

    expect(component.internalValue()).toBe('');
    expect(onChangeSpy).toHaveBeenCalledWith('');
  });

  it('should emit valueChange when clearing value', () => {
    fixture.componentRef.setInput('clearable', true);
    component.internalValue.set('content');
    fixture.detectChanges();

    const spy = spyOn(component.valueChange, 'emit');
    const clearBtn = fixture.debugElement.query(By.css('.icon-btn.clear'));
    clearBtn.nativeElement.click();

    expect(spy).toHaveBeenCalledWith('');
  });
});
