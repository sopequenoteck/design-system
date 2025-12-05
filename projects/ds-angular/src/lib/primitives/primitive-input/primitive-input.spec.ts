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

  // === TESTS DES TYPES ===

  it('should apply email type', () => {
    fixture.componentRef.setInput('type', 'email');
    fixture.detectChanges();

    expect(inputEl.nativeElement.type).toBe('email');
  });

  it('should apply number type', () => {
    fixture.componentRef.setInput('type', 'number');
    fixture.detectChanges();

    expect(inputEl.nativeElement.type).toBe('number');
  });

  it('should apply tel type', () => {
    fixture.componentRef.setInput('type', 'tel');
    fixture.detectChanges();

    expect(inputEl.nativeElement.type).toBe('tel');
  });

  it('should apply url type', () => {
    fixture.componentRef.setInput('type', 'url');
    fixture.detectChanges();

    expect(inputEl.nativeElement.type).toBe('url');
  });

  it('should apply search type', () => {
    fixture.componentRef.setInput('type', 'search');
    fixture.detectChanges();

    expect(inputEl.nativeElement.type).toBe('search');
  });

  it('should apply date type', () => {
    fixture.componentRef.setInput('type', 'date');
    fixture.detectChanges();

    expect(inputEl.nativeElement.type).toBe('date');
  });

  // === TESTS DES STATES ===

  it('should apply success state class', () => {
    fixture.componentRef.setInput('state', 'success');
    fixture.detectChanges();

    expect(wrapperEl.nativeElement.classList.contains('success')).toBe(true);
  });

  it('should apply warning state class', () => {
    fixture.componentRef.setInput('state', 'warning');
    fixture.detectChanges();

    expect(wrapperEl.nativeElement.classList.contains('warning')).toBe(true);
  });

  it('should have default state by default', () => {
    expect(wrapperEl.nativeElement.classList.contains('default')).toBe(true);
  });

  // === TESTS DES SIZES ===

  it('should apply sm size class', () => {
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();

    expect(wrapperEl.nativeElement.classList.contains('sm')).toBe(true);
  });

  it('should have md size by default', () => {
    expect(wrapperEl.nativeElement.classList.contains('md')).toBe(true);
  });

  // === TESTS DES APPEARANCES ===

  it('should apply outline appearance class', () => {
    fixture.componentRef.setInput('appearance', 'outline');
    fixture.detectChanges();

    expect(wrapperEl.nativeElement.classList.contains('outline')).toBe(true);
  });

  it('should apply ghost appearance class', () => {
    fixture.componentRef.setInput('appearance', 'ghost');
    fixture.detectChanges();

    expect(wrapperEl.nativeElement.classList.contains('ghost')).toBe(true);
  });

  it('should not add appearance class when default', () => {
    // appearance='default' is default, should not add extra class
    expect(wrapperEl.nativeElement.classList.contains('default')).toBe(true);
    expect(wrapperEl.nativeElement.classList.contains('outline')).toBe(false);
    expect(wrapperEl.nativeElement.classList.contains('ghost')).toBe(false);
  });

  // === TESTS DES CLASSES WRAPPER ===

  it('should add has-icon-start class when iconStart is provided', () => {
    fixture.componentRef.setInput('iconStart', faUser);
    fixture.detectChanges();

    expect(wrapperEl.nativeElement.classList.contains('has-icon-start')).toBe(true);
  });

  it('should add has-icon-end class when iconEnd is provided', () => {
    fixture.componentRef.setInput('iconEnd', faSearch);
    fixture.detectChanges();

    expect(wrapperEl.nativeElement.classList.contains('has-icon-end')).toBe(true);
  });

  it('should add disabled class when disabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    expect(wrapperEl.nativeElement.classList.contains('disabled')).toBe(true);
  });

  // === TESTS DES ATTRIBUTS HTML ===

  it('should bind id attribute', () => {
    fixture.componentRef.setInput('id', 'test-input');
    fixture.detectChanges();

    expect(inputEl.nativeElement.id).toBe('test-input');
  });

  it('should bind name attribute', () => {
    fixture.componentRef.setInput('name', 'username');
    fixture.detectChanges();

    expect(inputEl.nativeElement.name).toBe('username');
  });

  it('should bind autocomplete attribute', () => {
    fixture.componentRef.setInput('autocomplete', 'email');
    fixture.detectChanges();

    expect(inputEl.nativeElement.getAttribute('autocomplete')).toBe('email');
  });

  it('should bind aria-describedby attribute', () => {
    fixture.componentRef.setInput('ariaDescribedBy', 'help-text');
    fixture.detectChanges();

    expect(inputEl.nativeElement.getAttribute('aria-describedby')).toBe('help-text');
  });

  // === TESTS DE LA MÉTHODE wrapperClasses ===

  it('should generate correct wrapper classes', () => {
    fixture.componentRef.setInput('state', 'error');
    fixture.componentRef.setInput('size', 'lg');
    fixture.componentRef.setInput('appearance', 'outline');
    fixture.componentRef.setInput('disabled', true);
    fixture.componentRef.setInput('iconStart', faUser);
    fixture.componentRef.setInput('iconEnd', faSearch);
    fixture.detectChanges();

    const classes = component.wrapperClasses;
    expect(classes).toContain('error');
    expect(classes).toContain('lg');
    expect(classes).toContain('outline');
    expect(classes).toContain('disabled');
    expect(classes).toContain('has-icon-start');
    expect(classes).toContain('has-icon-end');
  });

  it('should generate correct wrapper classes without optional props', () => {
    fixture.componentRef.setInput('state', 'success');
    fixture.componentRef.setInput('size', 'sm');
    fixture.componentRef.setInput('appearance', 'default');
    fixture.detectChanges();

    const classes = component.wrapperClasses;
    expect(classes).toContain('success');
    expect(classes).toContain('sm');
    expect(classes).not.toContain('outline');
    expect(classes).not.toContain('ghost');
    expect(classes).not.toContain('disabled');
    expect(classes).not.toContain('readonly');
    expect(classes).not.toContain('has-icon-start');
    expect(classes).not.toContain('has-icon-end');
  });

  // === TESTS DE COMBINAISONS ===

  it('should handle all props together', () => {
    fixture.componentRef.setInput('type', 'email');
    fixture.componentRef.setInput('placeholder', 'Enter email');
    fixture.componentRef.setInput('state', 'warning');
    fixture.componentRef.setInput('size', 'lg');
    fixture.componentRef.setInput('appearance', 'outline');
    fixture.componentRef.setInput('disabled', false);
    fixture.componentRef.setInput('readonly', true);
    fixture.componentRef.setInput('required', true);
    fixture.componentRef.setInput('maxlength', 100);
    fixture.componentRef.setInput('iconStart', faUser);
    fixture.componentRef.setInput('iconEnd', faSearch);
    fixture.componentRef.setInput('id', 'email-input');
    fixture.componentRef.setInput('name', 'email');
    fixture.componentRef.setInput('ariaLabel', 'Email address');
    fixture.detectChanges();

    expect(inputEl.nativeElement.type).toBe('email');
    expect(inputEl.nativeElement.placeholder).toBe('Enter email');
    expect(wrapperEl.nativeElement.classList.contains('warning')).toBe(true);
    expect(wrapperEl.nativeElement.classList.contains('lg')).toBe(true);
    expect(wrapperEl.nativeElement.classList.contains('outline')).toBe(true);
    expect(wrapperEl.nativeElement.classList.contains('readonly')).toBe(true);
    expect(inputEl.nativeElement.readOnly).toBe(true);
    expect(inputEl.nativeElement.required).toBe(true);
    expect(inputEl.nativeElement.getAttribute('maxlength')).toBe('100');
    expect(inputEl.nativeElement.id).toBe('email-input');
    expect(inputEl.nativeElement.name).toBe('email');
    expect(inputEl.nativeElement.getAttribute('aria-label')).toBe('Email address');

    const iconStart = fixture.debugElement.query(By.css('.icon-start'));
    const iconEnd = fixture.debugElement.query(By.css('.icon-end'));
    expect(iconStart).toBeTruthy();
    expect(iconEnd).toBeTruthy();
  });

  // === TESTS DES GESTIONNAIRES D'ÉVÉNEMENTS ===

  it('should call handleInput method on input event', () => {
    spyOn(component, 'handleInput');

    inputEl.nativeElement.dispatchEvent(new Event('input'));

    expect(component.handleInput).toHaveBeenCalled();
  });

  it('should call handleBlur method on blur event', () => {
    spyOn(component, 'handleBlur');

    inputEl.nativeElement.dispatchEvent(new Event('blur'));

    expect(component.handleBlur).toHaveBeenCalled();
  });

  it('should call handleFocus method on focus event', () => {
    spyOn(component, 'handleFocus');

    inputEl.nativeElement.dispatchEvent(new Event('focus'));

    expect(component.handleFocus).toHaveBeenCalled();
  });
});
