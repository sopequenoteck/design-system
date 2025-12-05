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

  // === TESTS ADDITIONNELS POUR COUVERTURE COMPLÈTE ===

  describe('State Variants', () => {
    it('should apply success state class', () => {
      fixture.componentRef.setInput('state', 'success');
      fixture.detectChanges();

      expect(wrapperEl.nativeElement.classList.contains('success')).toBeTrue();
    });

    it('should apply warning state class', () => {
      fixture.componentRef.setInput('state', 'warning');
      fixture.detectChanges();

      expect(wrapperEl.nativeElement.classList.contains('warning')).toBeTrue();
    });

    it('should have default state by default', () => {
      expect(wrapperEl.nativeElement.classList.contains('default')).toBeTrue();
    });
  });

  describe('Size Variants', () => {
    it('should apply sm size class', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();

      expect(wrapperEl.nativeElement.classList.contains('sm')).toBeTrue();
    });

    it('should have md size by default', () => {
      expect(wrapperEl.nativeElement.classList.contains('md')).toBeTrue();
    });
  });

  describe('Appearance Variants', () => {
    it('should apply ghost appearance class', () => {
      fixture.componentRef.setInput('appearance', 'ghost');
      fixture.detectChanges();

      expect(wrapperEl.nativeElement.classList.contains('ghost')).toBeTrue();
    });

    it('should not add appearance class when default', () => {
      expect(wrapperEl.nativeElement.classList.contains('default')).toBeTrue();
      expect(wrapperEl.nativeElement.classList.contains('outline')).toBeFalse();
      expect(wrapperEl.nativeElement.classList.contains('ghost')).toBeFalse();
    });
  });

  describe('Resize Modes', () => {
    it('should apply vertical resize by default', () => {
      expect(textareaEl.nativeElement.style.resize).toBe('vertical');
    });

    it('should apply horizontal resize', () => {
      fixture.componentRef.setInput('resize', 'horizontal');
      fixture.detectChanges();

      expect(textareaEl.nativeElement.style.resize).toBe('horizontal');
    });

    it('should apply both resize', () => {
      fixture.componentRef.setInput('resize', 'both');
      fixture.detectChanges();

      expect(textareaEl.nativeElement.style.resize).toBe('both');
    });
  });

  describe('Model Two-Way Binding', () => {
    it('should support two-way binding with model', () => {
      component.value.set('initial value');
      fixture.detectChanges();

      expect(textareaEl.nativeElement.value).toBe('initial value');

      textareaEl.nativeElement.value = 'changed value';
      textareaEl.nativeElement.dispatchEvent(new Event('input'));

      expect(component.value()).toBe('changed value');
    });

    it('should update value model programmatically', () => {
      component.value.set('programmatic value');
      fixture.detectChanges();

      expect(textareaEl.nativeElement.value).toBe('programmatic value');
    });
  });

  describe('Wrapper Classes Computed', () => {
    it('should compute correct wrapper classes', () => {
      fixture.componentRef.setInput('state', 'error');
      fixture.componentRef.setInput('size', 'lg');
      fixture.componentRef.setInput('appearance', 'outline');
      fixture.componentRef.setInput('disabled', true);
      fixture.componentRef.setInput('iconStart', faFeather);
      fixture.componentRef.setInput('iconEnd', faPenNib);
      fixture.detectChanges();

      const classes = component.wrapperClasses;
      expect(classes).toContain('error');
      expect(classes).toContain('lg');
      expect(classes).toContain('outline');
      expect(classes).toContain('disabled');
      expect(classes).toContain('has-icon-start');
      expect(classes).toContain('has-icon-end');
    });

    it('should add has-icon-start class when iconStart is provided', () => {
      fixture.componentRef.setInput('iconStart', faFeather);
      fixture.detectChanges();

      expect(wrapperEl.nativeElement.classList.contains('has-icon-start')).toBeTrue();
    });

    it('should add has-icon-end class when iconEnd is provided', () => {
      fixture.componentRef.setInput('iconEnd', faPenNib);
      fixture.detectChanges();

      expect(wrapperEl.nativeElement.classList.contains('has-icon-end')).toBeTrue();
    });
  });

  describe('Attribute Bindings', () => {
    it('should bind id attribute', () => {
      fixture.componentRef.setInput('id', 'test-textarea');
      fixture.detectChanges();

      expect(textareaEl.nativeElement.id).toBe('test-textarea');
    });

    it('should bind name attribute', () => {
      fixture.componentRef.setInput('name', 'comment');
      fixture.detectChanges();

      expect(textareaEl.nativeElement.name).toBe('comment');
    });

    it('should bind aria-describedby attribute', () => {
      fixture.componentRef.setInput('ariaDescribedBy', 'help-text');
      fixture.detectChanges();

      expect(textareaEl.nativeElement.getAttribute('aria-describedby')).toBe('help-text');
    });
  });

  describe('Event Handlers', () => {
    it('should call handleInput method on input event', () => {
      spyOn(component, 'handleInput');

      textareaEl.nativeElement.dispatchEvent(new Event('input'));

      expect(component.handleInput).toHaveBeenCalled();
    });

    it('should call handleBlur method on blur event', () => {
      spyOn(component, 'handleBlur');

      textareaEl.nativeElement.dispatchEvent(new Event('blur'));

      expect(component.handleBlur).toHaveBeenCalled();
    });

    it('should call handleFocus method on focus event', () => {
      spyOn(component, 'handleFocus');

      textareaEl.nativeElement.dispatchEvent(new Event('focus'));

      expect(component.handleFocus).toHaveBeenCalled();
    });
  });

  describe('Combination Tests', () => {
    it('should handle all props together', () => {
      fixture.componentRef.setInput('id', 'comment-textarea');
      fixture.componentRef.setInput('name', 'comment');
      fixture.componentRef.setInput('placeholder', 'Enter comment');
      fixture.componentRef.setInput('state', 'warning');
      fixture.componentRef.setInput('size', 'lg');
      fixture.componentRef.setInput('appearance', 'outline');
      fixture.componentRef.setInput('disabled', false);
      fixture.componentRef.setInput('readonly', true);
      fixture.componentRef.setInput('required', true);
      fixture.componentRef.setInput('rows', 6);
      fixture.componentRef.setInput('cols', 50);
      fixture.componentRef.setInput('maxlength', 300);
      fixture.componentRef.setInput('resize', 'both');
      fixture.componentRef.setInput('iconStart', faFeather);
      fixture.componentRef.setInput('iconEnd', faPenNib);
      fixture.componentRef.setInput('ariaLabel', 'Comment field');
      fixture.detectChanges();

      expect(textareaEl.nativeElement.id).toBe('comment-textarea');
      expect(textareaEl.nativeElement.name).toBe('comment');
      expect(textareaEl.nativeElement.placeholder).toBe('Enter comment');
      expect(wrapperEl.nativeElement.classList.contains('warning')).toBeTrue();
      expect(wrapperEl.nativeElement.classList.contains('lg')).toBeTrue();
      expect(wrapperEl.nativeElement.classList.contains('outline')).toBeTrue();
      expect(wrapperEl.nativeElement.classList.contains('readonly')).toBeTrue();
      expect(textareaEl.nativeElement.readOnly).toBeTrue();
      expect(textareaEl.nativeElement.required).toBeTrue();
      expect(textareaEl.nativeElement.getAttribute('rows')).toBe('6');
      expect(textareaEl.nativeElement.getAttribute('cols')).toBe('50');
      expect(textareaEl.nativeElement.getAttribute('maxlength')).toBe('300');
      expect(textareaEl.nativeElement.style.resize).toBe('both');
      expect(textareaEl.nativeElement.getAttribute('aria-label')).toBe('Comment field');

      const iconStart = fixture.debugElement.query(By.css('.icon-start'));
      const iconEnd = fixture.debugElement.query(By.css('.icon-end'));
      expect(iconStart).toBeTruthy();
      expect(iconEnd).toBeTruthy();
    });

    it('should handle all size variants', () => {
      const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

      sizes.forEach((size) => {
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();

        expect(wrapperEl.nativeElement.classList.contains(size)).toBeTrue();
      });
    });

    it('should handle all state variants', () => {
      const states: Array<'default' | 'success' | 'warning' | 'error'> = ['default', 'success', 'warning', 'error'];

      states.forEach((state) => {
        fixture.componentRef.setInput('state', state);
        fixture.detectChanges();

        expect(wrapperEl.nativeElement.classList.contains(state)).toBeTrue();
      });
    });

    it('should handle all appearance variants', () => {
      const appearances: Array<'default' | 'outline' | 'ghost'> = ['default', 'outline', 'ghost'];

      appearances.forEach((appearance) => {
        fixture.componentRef.setInput('appearance', appearance);
        fixture.detectChanges();

        if (appearance !== 'default') {
          expect(wrapperEl.nativeElement.classList.contains(appearance)).toBeTrue();
        }
      });
    });
  });
});
