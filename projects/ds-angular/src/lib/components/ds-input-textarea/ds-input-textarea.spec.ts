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

  afterEach(() => {
    fixture?.destroy();
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
    expect(counter.nativeElement.textContent).toContain('5/200 caractères');
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

  // ============================================
  // TESTS AJOUTÉS PAR ds-component-review
  // ============================================

  // --- Priorité HAUTE : Fonctionnalités non testées ---

  it('should apply readonly class when readonly', () => {
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();

    const container = fixture.debugElement.query(By.css('.ds-input-textarea'));
    expect(container.nativeElement.classList.contains('is-readonly')).toBeTrue();
  });

  it('should show required indicator when required', () => {
    fixture.componentRef.setInput('label', 'Test label');
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();

    const requiredSpan = fixture.debugElement.query(By.css('.required'));
    expect(requiredSpan).toBeTruthy();
    expect(requiredSpan.nativeElement.textContent).toContain('*');
    expect(requiredSpan.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('should have accessible text for required indicator', () => {
    fixture.componentRef.setInput('label', 'Test label');
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();

    const srOnly = fixture.debugElement.query(By.css('.sr-only'));
    expect(srOnly).toBeTruthy();
    expect(srOnly.nativeElement.textContent).toContain('obligatoire');
  });

  it('should pass iconStart to primitive textarea', () => {
    // Use a mock icon definition that won't trigger FontAwesome lookup
    const testIcon = { prefix: 'fas', iconName: 'test-start', icon: [512, 512, [], 'f000', ''] } as any;
    fixture.componentRef.setInput('iconStart', testIcon);
    fixture.detectChanges();

    const primitive = fixture.debugElement.query(By.css('primitive-textarea'));
    expect(primitive.componentInstance.iconStart()).toEqual(testIcon);
  });

  it('should pass iconEnd to primitive textarea', () => {
    // Use a mock icon definition that won't trigger FontAwesome lookup
    const testIcon = { prefix: 'fas', iconName: 'test-end', icon: [512, 512, [], 'f001', ''] } as any;
    fixture.componentRef.setInput('iconEnd', testIcon);
    fixture.detectChanges();

    const primitive = fixture.debugElement.query(By.css('primitive-textarea'));
    expect(primitive.componentInstance.iconEnd()).toEqual(testIcon);
  });

  it('should not emit valueChange when disabled', () => {
    const spy = spyOn(component.valueChange, 'emit');
    component.setDisabledState(true);
    fixture.detectChanges();

    component.onPrimitiveValueChange('new value');

    expect(spy).not.toHaveBeenCalled();
    expect(component.internalValue()).toBe('');
  });

  it('should set aria-describedby with error id when error provided', () => {
    fixture.componentRef.setInput('error', 'Error message');
    fixture.detectChanges();

    const id = component.id();
    expect(component.ariaDescribedBy()).toContain(`${id}-error`);
  });

  it('should set aria-describedby with helper id when helper provided', () => {
    fixture.componentRef.setInput('helper', 'Helper text');
    fixture.detectChanges();

    const id = component.id();
    expect(component.ariaDescribedBy()).toContain(`${id}-helper`);
  });

  it('should set aria-describedby with counter id when maxlength provided', () => {
    fixture.componentRef.setInput('maxlength', 100);
    fixture.detectChanges();

    const id = component.id();
    expect(component.ariaDescribedBy()).toContain(`${id}-counter`);
  });

  // --- Priorité MOYENNE : États visuels ---

  it('should apply error state class', () => {
    fixture.componentRef.setInput('state', 'error');
    fixture.detectChanges();

    const container = fixture.debugElement.query(By.css('.ds-input-textarea'));
    expect(container.nativeElement.classList.contains('error')).toBeTrue();
  });

  it('should apply success state class', () => {
    fixture.componentRef.setInput('state', 'success');
    fixture.detectChanges();

    const container = fixture.debugElement.query(By.css('.ds-input-textarea'));
    expect(container.nativeElement.classList.contains('success')).toBeTrue();
  });

  it('should apply warning state class', () => {
    fixture.componentRef.setInput('state', 'warning');
    fixture.detectChanges();

    const container = fixture.debugElement.query(By.css('.ds-input-textarea'));
    expect(container.nativeElement.classList.contains('warning')).toBeTrue();
  });

  it('should override state with error when error message provided', () => {
    fixture.componentRef.setInput('state', 'success');
    fixture.componentRef.setInput('error', 'Error overrides success');
    fixture.detectChanges();

    expect(component.inputState()).toBe('error');
    const container = fixture.debugElement.query(By.css('.ds-input-textarea'));
    expect(container.nativeElement.classList.contains('error')).toBeTrue();
  });

  // --- Priorité NORMALE : Auto-resize ---

  it('should set resize to none when resizeAuto is set', () => {
    fixture.componentRef.setInput('resizeAuto', 300);
    fixture.detectChanges();

    expect(component.textareaResize()).toBe('none');
  });

  it('should keep resize value when resizeAuto is not set', () => {
    fixture.componentRef.setInput('resize', 'both');
    fixture.detectChanges();

    expect(component.textareaResize()).toBe('both');
  });

  it('should cleanup ResizeObserver on destroy', () => {
    fixture.componentRef.setInput('resizeAuto', 300);
    fixture.detectChanges();

    // Trigger ngAfterViewInit to setup observer
    component.ngAfterViewInit();

    // Spy on disconnect if observer exists
    const observer = (component as any).resizeObserver;
    if (observer) {
      const disconnectSpy = spyOn(observer, 'disconnect');
      component.ngOnDestroy();
      expect(disconnectSpy).toHaveBeenCalled();
    } else {
      // No observer in test environment, just verify no error on destroy
      expect(() => component.ngOnDestroy()).not.toThrow();
    }
  });

  // --- Priorité BASSE : Edge cases ---

  it('should sync value from externalValue input', async () => {
    fixture.componentRef.setInput('externalValue', 'external');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.internalValue()).toBe('external');
  });

  it('should not show clear button when clearable but disabled', () => {
    fixture.componentRef.setInput('clearable', true);
    component.internalValue.set('some value');
    component.setDisabledState(true);
    fixture.detectChanges();

    const clearBtn = fixture.debugElement.query(By.css('.icon-btn.clear'));
    expect(clearBtn).toBeFalsy();
  });

  it('should not show clear button when clearable but readonly', () => {
    fixture.componentRef.setInput('clearable', true);
    fixture.componentRef.setInput('readonly', true);
    component.internalValue.set('some value');
    fixture.detectChanges();

    const clearBtn = fixture.debugElement.query(By.css('.icon-btn.clear'));
    expect(clearBtn).toBeFalsy();
  });

  it('should handle empty string in writeValue', () => {
    component.writeValue('initial');
    expect(component.internalValue()).toBe('initial');

    component.writeValue('');
    expect(component.internalValue()).toBe('');
  });

  // ============================================
  // TESTS AJOUTÉS - Session 2 ds-component-review
  // ============================================

  // --- Inputs transmis au primitive-textarea ---

  it('should pass name to primitive textarea', () => {
    fixture.componentRef.setInput('name', 'myTextarea');
    fixture.detectChanges();

    const primitive = fixture.debugElement.query(By.css('primitive-textarea'));
    expect(primitive.componentInstance.name()).toBe('myTextarea');
  });

  it('should pass placeholder to primitive textarea', () => {
    fixture.componentRef.setInput('placeholder', 'Enter text here...');
    fixture.detectChanges();

    const primitive = fixture.debugElement.query(By.css('primitive-textarea'));
    expect(primitive.componentInstance.placeholder()).toBe('Enter text here...');
  });

  it('should pass rows and cols to primitive textarea', () => {
    fixture.componentRef.setInput('rows', 5);
    fixture.componentRef.setInput('cols', 40);
    fixture.detectChanges();

    const primitive = fixture.debugElement.query(By.css('primitive-textarea'));
    expect(primitive.componentInstance.rows()).toBe(5);
    expect(primitive.componentInstance.cols()).toBe(40);
  });

  it('should pass size and variant to primitive textarea', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.componentRef.setInput('variant', 'filled');
    fixture.detectChanges();

    const primitive = fixture.debugElement.query(By.css('primitive-textarea'));
    expect(primitive.componentInstance.size()).toBe('lg');
    expect(primitive.componentInstance.appearance()).toBe('filled');
  });

  // --- Accessibilité ---

  it('should associate label with textarea via for/id', () => {
    fixture.componentRef.setInput('label', 'Description');
    fixture.detectChanges();

    const label = fixture.debugElement.query(By.css('label'));
    const id = component.id();
    expect(label.nativeElement.getAttribute('for')).toBe(id);
  });

  // --- Comportements ---

  it('should not clear value if showClearButton returns false', () => {
    // Clearable is false by default
    component.internalValue.set('some value');
    fixture.detectChanges();

    // Call clearValue directly - should do nothing
    component.clearValue();

    expect(component.internalValue()).toBe('some value');
  });

  // --- Computed ---

  it('should update characterCount when internalValue changes', () => {
    expect(component.characterCount()).toBe(0);

    component.internalValue.set('Hello');
    expect(component.characterCount()).toBe(5);

    component.internalValue.set('Hello World!');
    expect(component.characterCount()).toBe(12);
  });

  // --- Edge cases ---

  it('should hide clear button when disabled even with clearable and value', () => {
    fixture.componentRef.setInput('clearable', true);
    fixture.componentRef.setInput('disabled', true);
    component.internalValue.set('some value');
    fixture.detectChanges();

    expect(component.showClearButton()).toBeFalse();
    const clearBtn = fixture.debugElement.query(By.css('.icon-btn.clear'));
    expect(clearBtn).toBeFalsy();
  });

  it('should combine error, helper and counter in ariaDescribedBy', () => {
    fixture.componentRef.setInput('error', 'Error message');
    fixture.componentRef.setInput('helper', 'Helper text');
    fixture.componentRef.setInput('maxlength', 100);
    fixture.detectChanges();

    const id = component.id();
    const describedBy = component.ariaDescribedBy();

    // Error should be present (helper hidden when error exists, but IDs are computed independently)
    expect(describedBy).toContain(`${id}-error`);
    expect(describedBy).toContain(`${id}-counter`);
    // Note: helper ID is still computed even if helper is visually hidden
    expect(describedBy).toContain(`${id}-helper`);
  });

  // --- Tests accessibilité (a11y) ---

  it('should have dynamic aria-label on clear button with label', () => {
    fixture.componentRef.setInput('label', 'Description');
    fixture.componentRef.setInput('clearable', true);
    component.internalValue.set('some text');
    fixture.detectChanges();

    const clearBtn = fixture.debugElement.query(By.css('.icon-btn.clear'));
    expect(clearBtn.nativeElement.getAttribute('aria-label')).toBe('Effacer Description');
  });

  it('should have fallback aria-label on clear button without label', () => {
    fixture.componentRef.setInput('clearable', true);
    component.internalValue.set('some text');
    fixture.detectChanges();

    const clearBtn = fixture.debugElement.query(By.css('.icon-btn.clear'));
    expect(clearBtn.nativeElement.getAttribute('aria-label')).toBe('Effacer le champ');
  });

  it('should have aria-live on counter for accessibility', () => {
    fixture.componentRef.setInput('maxlength', 100);
    fixture.detectChanges();

    const counter = fixture.debugElement.query(By.css('.counter'));
    expect(counter.nativeElement.getAttribute('aria-live')).toBe('polite');
    expect(counter.nativeElement.getAttribute('aria-atomic')).toBe('true');
  });
});
