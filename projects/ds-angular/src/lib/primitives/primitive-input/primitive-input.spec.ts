import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimitiveInput } from './primitive-input';
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PrimitiveInput', () => {
  let component: PrimitiveInput;
  let fixture: ComponentFixture<PrimitiveInput>;
  let inputEl: DebugElement;
  let wrapperEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimitiveInput],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimitiveInput);
    component = fixture.componentInstance;
    wrapperEl = fixture.debugElement.query(By.css('.input-wrapper'));
    inputEl = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input with default props', () => {
    expect(inputEl).toBeTruthy();
    expect(inputEl.nativeElement.type).toBe('text');
    expect(inputEl.nativeElement.disabled).toBe(false);
    expect(wrapperEl.nativeElement.classList.contains('default')).toBe(true);
    expect(wrapperEl.nativeElement.classList.contains('md')).toBe(true);
  });

  it('should apply input type', () => {
    fixture.componentRef.setInput('type', 'password');
    fixture.detectChanges();

    expect(inputEl.nativeElement.type).toBe('password');
  });

  it('should apply placeholder', () => {
    fixture.componentRef.setInput('placeholder', 'Enter text');
    fixture.detectChanges();

    expect(inputEl.nativeElement.placeholder).toBe('Enter text');
  });

  it('should apply state class', () => {
    fixture.componentRef.setInput('state', 'error');
    fixture.detectChanges();

    expect(wrapperEl.nativeElement.classList.contains('error')).toBe(true);
  });

  it('should apply size class', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();

    expect(wrapperEl.nativeElement.classList.contains('lg')).toBe(true);
  });

  it('should disable input when disabled input is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    expect(inputEl.nativeElement.disabled).toBe(true);
  });

  it('should apply readonly class when readonly is true', () => {
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();

    expect(wrapperEl.nativeElement.classList.contains('readonly')).toBeTrue();
    expect(inputEl.nativeElement.readOnly).toBeTrue();
  });

  it('should bind maxlength attribute', () => {
    fixture.componentRef.setInput('maxlength', 64);
    fixture.detectChanges();

    expect(inputEl.nativeElement.getAttribute('maxlength')).toBe('64');
  });

  it('should bind aria-label attribute when provided', () => {
    fixture.componentRef.setInput('ariaLabel', 'Custom label');
    fixture.detectChanges();

    expect(inputEl.nativeElement.getAttribute('aria-label')).toBe('Custom label');
  });

  it('should set required attribute', () => {
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();

    expect(inputEl.nativeElement.required).toBeTrue();
  });

  it('should emit inputChanged event on input', () => {
    spyOn(component.inputChanged, 'emit');

    inputEl.nativeElement.value = 'test value';
    inputEl.nativeElement.dispatchEvent(new Event('input'));

    expect(component.inputChanged.emit).toHaveBeenCalledWith('test value');
  });

  it('should update value model on input', () => {
    inputEl.nativeElement.value = 'new value';
    inputEl.nativeElement.dispatchEvent(new Event('input'));

    expect(component.value()).toBe('new value');
  });

  it('should emit inputFocused event on focus', () => {
    spyOn(component.inputFocused, 'emit');

    inputEl.nativeElement.dispatchEvent(new Event('focus'));

    expect(component.inputFocused.emit).toHaveBeenCalled();
  });

  it('should emit inputBlurred event on blur', () => {
    spyOn(component.inputBlurred, 'emit');

    inputEl.nativeElement.dispatchEvent(new Event('blur'));

    expect(component.inputBlurred.emit).toHaveBeenCalled();
  });

  it('should render iconStart when provided', () => {
    fixture.componentRef.setInput('iconStart', faUser);
    fixture.detectChanges();

    const iconStart = fixture.debugElement.query(By.css('.icon-start'));
    expect(iconStart).toBeTruthy();
  });

  it('should render iconEnd when provided', () => {
    fixture.componentRef.setInput('iconEnd', faSearch);
    fixture.detectChanges();

    const iconEnd = fixture.debugElement.query(By.css('.icon-end'));
    expect(iconEnd).toBeTruthy();
  });

  it('should render both icons when provided', () => {
    fixture.componentRef.setInput('iconStart', faUser);
    fixture.componentRef.setInput('iconEnd', faSearch);
    fixture.detectChanges();

    const iconStart = fixture.debugElement.query(By.css('.icon-start'));
    const iconEnd = fixture.debugElement.query(By.css('.icon-end'));

    expect(iconStart).toBeTruthy();
    expect(iconEnd).toBeTruthy();
  });

  it('should bind value two-way', () => {
    component.value.set('initial value');
    fixture.detectChanges();

    expect(inputEl.nativeElement.value).toBe('initial value');

    inputEl.nativeElement.value = 'changed value';
    inputEl.nativeElement.dispatchEvent(new Event('input'));

    expect(component.value()).toBe('changed value');
  });
});
