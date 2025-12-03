import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimitiveTextarea } from './primitive-textarea';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { faFeather, faPenNib } from '@fortawesome/free-solid-svg-icons';

describe('PrimitiveTextarea', () => {
  let fixture: ComponentFixture<PrimitiveTextarea>;
  let component: PrimitiveTextarea;
  let textareaEl: DebugElement;
  let wrapperEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimitiveTextarea],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimitiveTextarea);
    component = fixture.componentInstance;
    fixture.detectChanges();
    textareaEl = fixture.debugElement.query(By.css('textarea'));
    wrapperEl = fixture.debugElement.query(By.css('.textarea-wrapper'));
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render textarea with default attributes', () => {
    expect(textareaEl).toBeTruthy();
    expect(textareaEl.nativeElement.disabled).toBeFalse();
    expect(wrapperEl.nativeElement.classList.contains('md')).toBeTrue();
    expect(wrapperEl.nativeElement.classList.contains('default')).toBeTrue();
  });

  it('should bind placeholder', () => {
    fixture.componentRef.setInput('placeholder', 'Saisir un texte');
    fixture.detectChanges();

    expect(textareaEl.nativeElement.placeholder).toBe('Saisir un texte');
  });

  it('should bind rows and cols', () => {
    fixture.componentRef.setInput('rows', 4);
    fixture.componentRef.setInput('cols', 40);
    fixture.detectChanges();

    expect(textareaEl.nativeElement.getAttribute('rows')).toBe('4');
    expect(textareaEl.nativeElement.getAttribute('cols')).toBe('40');
  });

  it('should enforce maxlength attribute', () => {
    fixture.componentRef.setInput('maxlength', 120);
    fixture.detectChanges();

    expect(textareaEl.nativeElement.getAttribute('maxlength')).toBe('120');
  });

  it('should toggle disabled state', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    expect(textareaEl.nativeElement.disabled).toBeTrue();
    expect(wrapperEl.nativeElement.classList.contains('disabled')).toBeTrue();
  });

  it('should toggle readonly state', () => {
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();

    expect(textareaEl.nativeElement.readOnly).toBeTrue();
    expect(wrapperEl.nativeElement.classList.contains('readonly')).toBeTrue();
  });

  it('should set required attribute when provided', () => {
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();

    expect(textareaEl.nativeElement.required).toBeTrue();
  });

  it('should set aria-label when provided', () => {
    fixture.componentRef.setInput('ariaLabel', 'Custom label');
    fixture.detectChanges();

    expect(textareaEl.nativeElement.getAttribute('aria-label')).toBe('Custom label');
  });

  it('should apply state class', () => {
    fixture.componentRef.setInput('state', 'error');
    fixture.detectChanges();

    expect(wrapperEl.nativeElement.classList.contains('error')).toBeTrue();
  });

  it('should apply size class', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();

    expect(wrapperEl.nativeElement.classList.contains('lg')).toBeTrue();
  });

  it('should apply appearance class when outline', () => {
    fixture.componentRef.setInput('appearance', 'outline');
    fixture.detectChanges();

    expect(wrapperEl.nativeElement.classList.contains('outline')).toBeTrue();
  });

  it('should emit inputChanged on value change', () => {
    spyOn(component.inputChanged, 'emit');

    textareaEl.nativeElement.value = 'nouvelle valeur';
    textareaEl.nativeElement.dispatchEvent(new Event('input'));

    expect(component.inputChanged.emit).toHaveBeenCalledWith('nouvelle valeur');
  });

  it('should update model value on input', () => {
    textareaEl.nativeElement.value = 'mise à jour';
    textareaEl.nativeElement.dispatchEvent(new Event('input'));

    expect(component.value()).toBe('mise à jour');
  });

  it('should emit focus and blur events', () => {
    spyOn(component.inputFocused, 'emit');
    spyOn(component.inputBlurred, 'emit');

    textareaEl.nativeElement.dispatchEvent(new Event('focus'));
    textareaEl.nativeElement.dispatchEvent(new Event('blur'));

    expect(component.inputFocused.emit).toHaveBeenCalled();
    expect(component.inputBlurred.emit).toHaveBeenCalled();
  });

  it('should render iconStart when provided', () => {
    fixture.componentRef.setInput('iconStart', faFeather);
    fixture.detectChanges();

    const iconStart = fixture.debugElement.query(By.css('.icon-start'));
    expect(iconStart).toBeTruthy();
  });

  it('should render iconEnd when provided', () => {
    fixture.componentRef.setInput('iconEnd', faPenNib);
    fixture.detectChanges();

    const iconEnd = fixture.debugElement.query(By.css('.icon-end'));
    expect(iconEnd).toBeTruthy();
  });

  it('should respect value input binding', () => {
    component.value.set('valeur initiale');
    fixture.detectChanges();

    expect(textareaEl.nativeElement.value).toBe('valeur initiale');
  });

  it('should apply resize style', () => {
    fixture.componentRef.setInput('resize', 'none');
    fixture.detectChanges();

    expect(textareaEl.nativeElement.style.resize).toBe('none');
  });
});
