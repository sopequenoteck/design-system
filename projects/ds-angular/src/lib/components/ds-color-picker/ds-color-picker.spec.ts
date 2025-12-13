import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsColorPicker } from './ds-color-picker';
import { Overlay } from '@angular/cdk/overlay';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('DsColorPicker', () => {
  let component: DsColorPicker;
  let fixture: ComponentFixture<DsColorPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsColorPicker],
      providers: [Overlay, provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(DsColorPicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // === Props par défaut ===
  it('should have default size md', () => {
    expect(component.size()).toBe('md');
  });

  it('should have default format hex', () => {
    expect(component.format()).toBe('hex');
  });

  it('should have empty value by default', () => {
    expect(component.value()).toBe('');
  });

  it('should not show alpha by default', () => {
    expect(component.showAlpha()).toBe(false);
  });

  it('should allow clear by default', () => {
    expect(component.allowClear()).toBe(true);
  });

  it('should show recent colors by default', () => {
    expect(component.showRecentColors()).toBe(true);
  });

  // === Classes CSS ===
  it('should apply size class', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();

    const classes = component.containerClasses();
    expect(classes).toContain('ds-color-picker--lg');
  });

  it('should apply disabled class when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const classes = component.containerClasses();
    expect(classes).toContain('ds-color-picker--disabled');
  });

  it('should apply focused class when focused', () => {
    component.isFocused.set(true);
    fixture.detectChanges();

    const classes = component.containerClasses();
    expect(classes).toContain('ds-color-picker--focused');
  });

  it('should apply open class when open', () => {
    component.isOpen.set(true);
    fixture.detectChanges();

    const classes = component.containerClasses();
    expect(classes).toContain('ds-color-picker--open');
  });

  // === Valeur et format ===
  it('should display hex value', () => {
    fixture.componentRef.setInput('value', '#ff0000');
    fixture.detectChanges();

    expect(component.displayValue()).toBe('#ff0000');
  });

  it('should convert to RGB format', () => {
    fixture.componentRef.setInput('value', '#ff0000');
    fixture.componentRef.setInput('format', 'rgb');
    fixture.detectChanges();

    const display = component.displayValue();
    expect(display).toBe('rgb(255, 0, 0)');
  });

  it('should convert to HSL format', () => {
    fixture.componentRef.setInput('value', '#ff0000');
    fixture.componentRef.setInput('format', 'hsl');
    fixture.detectChanges();

    const display = component.displayValue();
    expect(display).toBe('hsl(0, 100%, 50%)');
  });

  // === Preview ===
  it('should show transparent preview when no value', () => {
    expect(component.previewColor()).toBe('transparent');
  });

  it('should show color preview when value is set', () => {
    fixture.componentRef.setInput('value', '#3b82f6');
    fixture.detectChanges();

    expect(component.previewColor()).toBe('#3b82f6');
  });

  // === Focus / Blur ===
  it('should set focused on focus', () => {
    component.onFocus();
    expect(component.isFocused()).toBe(true);
  });

  it('should clear focused on blur', () => {
    component.isFocused.set(true);
    component.onBlur();
    expect(component.isFocused()).toBe(false);
  });

  it('should not focus when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    component.onFocus();
    expect(component.isFocused()).toBe(false);
  });

  // === Open / Close ===
  it('should open picker', () => {
    component.open();
    expect(component.isOpen()).toBe(true);
  });

  it('should close picker', () => {
    component.isOpen.set(true);
    component.close();
    expect(component.isOpen()).toBe(false);
  });

  it('should toggle picker', () => {
    component.toggle();
    expect(component.isOpen()).toBe(true);

    component.toggle();
    expect(component.isOpen()).toBe(false);
  });

  it('should not open when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    component.open();
    expect(component.isOpen()).toBe(false);
  });

  it('should not toggle when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    component.toggle();
    expect(component.isOpen()).toBe(false);
  });

  // === Clear ===
  it('should clear value', () => {
    component.internalValue.set('#ff0000');
    component.clear();

    expect(component.internalValue()).toBe('');
  });

  it('should emit colorChange on clear', (done) => {
    component.internalValue.set('#ff0000');

    component.colorChange.subscribe((color) => {
      expect(color).toBe('');
      done();
    });

    component.clear();
  });

  it('should not clear when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    component.internalValue.set('#ff0000');
    component.clear();

    expect(component.internalValue()).toBe('#ff0000');
  });

  // === Couleurs prédéfinies ===
  it('should use custom preset colors', () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff'];
    fixture.componentRef.setInput('presetColors', colors);
    fixture.detectChanges();

    expect(component.effectivePresets()).toEqual(colors);
  });

  it('should use default preset colors when none provided', () => {
    const presets = component.effectivePresets();
    expect(presets.length).toBeGreaterThan(0);
    expect(presets[0]).toBe('#000000');
  });

  // === Sélection de couleur ===
  it('should update value on color selected', () => {
    component.onColorSelected('#3b82f6');
    expect(component.internalValue()).toBe('#3b82f6');
  });

  it('should emit colorChange on color selected', (done) => {
    component.colorChange.subscribe((color) => {
      expect(color).toBe('#3b82f6');
      done();
    });

    component.onColorSelected('#3b82f6');
  });

  // === Couleurs récentes ===
  it('should add color to recent colors', () => {
    component.onColorSelected('#ff0000');
    const recent = component.recentColors();

    expect(recent).toContain('#ff0000');
  });

  it('should limit recent colors to maxRecentColors', () => {
    fixture.componentRef.setInput('maxRecentColors', 3);
    fixture.detectChanges();

    component.onColorSelected('#ff0000');
    component.onColorSelected('#00ff00');
    component.onColorSelected('#0000ff');
    component.onColorSelected('#ffff00');

    const recent = component.recentColors();
    expect(recent.length).toBe(3);
    expect(recent[0]).toBe('#ffff00'); // Le plus récent
  });

  it('should not duplicate colors in recent', () => {
    component.onColorSelected('#ff0000');
    component.onColorSelected('#00ff00');
    component.onColorSelected('#ff0000'); // Duplicate

    const recent = component.recentColors();
    const count = recent.filter(c => c === '#ff0000').length;
    expect(count).toBe(1);
  });

  // === ControlValueAccessor ===
  it('should write value via CVA', () => {
    component.writeValue('#3b82f6');
    expect(component.internalValue()).toBe('#3b82f6');
  });

  it('should clear value on null writeValue', () => {
    component.internalValue.set('#ff0000');
    component.writeValue('');
    expect(component.internalValue()).toBe('');
  });

  it('should register onChange callback', () => {
    const fn = jasmine.createSpy('onChange');
    component.registerOnChange(fn);

    component.onColorSelected('#ff0000');
    expect(fn).toHaveBeenCalledWith('#ff0000');
  });

  it('should register onTouched callback', () => {
    const fn = jasmine.createSpy('onTouched');
    component.registerOnTouched(fn);

    component.onBlur();
    expect(fn).toHaveBeenCalled();
  });

  // === Conversions de couleurs ===
  it('should convert hex to RGB', () => {
    // Via la méthode privée exposée par le component
    fixture.componentRef.setInput('value', '#ff0000');
    fixture.componentRef.setInput('format', 'rgb');
    fixture.detectChanges();

    expect(component.displayValue()).toBe('rgb(255, 0, 0)');
  });

  it('should parse RGB color', () => {
    fixture.componentRef.setInput('value', 'rgb(255, 0, 0)');
    fixture.componentRef.setInput('format', 'hex');
    fixture.detectChanges();

    expect(component.displayValue()).toBe('#ff0000');
  });

  // === DOM ===
  it('should render preview element', () => {
    const preview = fixture.nativeElement.querySelector('.ds-color-picker__preview');
    expect(preview).toBeTruthy();
  });

  it('should render input element', () => {
    const input = fixture.nativeElement.querySelector('.ds-color-picker__input');
    expect(input).toBeTruthy();
  });

  it('should show clear button when allowClear and has value', () => {
    fixture.componentRef.setInput('value', '#ff0000');
    fixture.componentRef.setInput('allowClear', true);
    fixture.detectChanges();

    const clearBtn = fixture.nativeElement.querySelector('.ds-color-picker__action--clear');
    expect(clearBtn).toBeTruthy();
  });

  it('should not show clear button when no value', () => {
    fixture.componentRef.setInput('allowClear', true);
    fixture.detectChanges();

    const clearBtn = fixture.nativeElement.querySelector('.ds-color-picker__action--clear');
    expect(clearBtn).toBeFalsy();
  });

  it('should show picker button', () => {
    const pickerBtn = fixture.nativeElement.querySelector('.ds-color-picker__action--picker');
    expect(pickerBtn).toBeTruthy();
  });

  it('should apply background color to preview', () => {
    fixture.componentRef.setInput('value', '#3b82f6');
    fixture.detectChanges();

    const preview = fixture.nativeElement.querySelector('.ds-color-picker__preview') as HTMLElement;
    expect(preview.style.backgroundColor).toBe('rgb(59, 130, 246)');
  });
});
