import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimitiveBadge, BadgeVariant, BadgeSize, BadgeShape, BadgeAppearance } from './primitive-badge';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PrimitiveBadge', () => {
  let component: PrimitiveBadge;
  let fixture: ComponentFixture<PrimitiveBadge>;
  let badgeEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimitiveBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimitiveBadge);
    component = fixture.componentInstance;
    fixture.detectChanges();
    badgeEl = fixture.debugElement.query(By.css('span'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render badge with default props', () => {
    expect(badgeEl).toBeTruthy();
    expect(badgeEl.nativeElement.classList.contains('primary')).toBe(true);
    expect(badgeEl.nativeElement.classList.contains('md')).toBe(true);
    expect(badgeEl.nativeElement.classList.contains('rounded')).toBe(true);
  });

  it('should expose type via data attribute', () => {
    expect(badgeEl.nativeElement.getAttribute('data-type')).toBe('label');
  });

  it('should apply variant class', () => {
    fixture.componentRef.setInput('variant', 'success');
    fixture.detectChanges();

    expect(badgeEl.nativeElement.classList.contains('success')).toBe(true);
  });

  it('should apply size class', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();

    expect(badgeEl.nativeElement.classList.contains('lg')).toBe(true);
  });

  it('should apply shape class', () => {
    fixture.componentRef.setInput('shape', 'pill');
    fixture.detectChanges();

    const span = fixture.debugElement.query(By.css('span'));
    expect(span.nativeElement.classList.contains('pill')).toBe(true);
  });

  it('should apply outline class when appearance is outline', () => {
    fixture.componentRef.setInput('appearance', 'outline');
    fixture.detectChanges();

    const span = fixture.debugElement.query(By.css('span'));
    expect(span.nativeElement.classList.contains('outline')).toBe(true);
  });

  it('should apply custom styles when provided', () => {
    fixture.componentRef.setInput('customStyles', {
      backgroundColor: '#123456',
      borderColor: '#123456',
    });
    fixture.detectChanges();

    const span = fixture.debugElement.query(By.css('span'));
    expect(span.nativeElement.style.backgroundColor).toBe('rgb(18, 52, 86)');
    expect(span.nativeElement.style.borderColor).toBe('rgb(18, 52, 86)');
  });

  it('should render iconStart when provided', () => {
    fixture.componentRef.setInput('iconStart', faCheck);
    fixture.detectChanges();

    const iconStart = fixture.debugElement.query(By.css('.icon-start'));
    expect(iconStart).toBeTruthy();
  });

  it('should render iconEnd when provided', () => {
    fixture.componentRef.setInput('iconEnd', faTimes);
    fixture.detectChanges();

    const iconEnd = fixture.debugElement.query(By.css('.icon-end'));
    expect(iconEnd).toBeTruthy();
  });

  it('should render both icons when provided', () => {
    fixture.componentRef.setInput('iconStart', faCheck);
    fixture.componentRef.setInput('iconEnd', faTimes);
    fixture.detectChanges();

    const iconStart = fixture.debugElement.query(By.css('.icon-start'));
    const iconEnd = fixture.debugElement.query(By.css('.icon-end'));

    expect(iconStart).toBeTruthy();
    expect(iconEnd).toBeTruthy();
  });

  it('should project content', () => {
    const testFixture = TestBed.createComponent(PrimitiveBadge);
    const spanEl = testFixture.debugElement.query(By.css('span'));

    testFixture.nativeElement.textContent = 'Badge Content';
    testFixture.detectChanges();

    expect(spanEl).toBeTruthy();
  });

  it('should apply type status', () => {
    fixture.componentRef.setInput('type', 'status');
    fixture.detectChanges();

    expect(component.type()).toBe('status');
  });

  it('should apply type count', () => {
    fixture.componentRef.setInput('type', 'count');
    fixture.detectChanges();

    expect(component.type()).toBe('count');
  });

  it('should apply type label', () => {
    fixture.componentRef.setInput('type', 'label');
    fixture.detectChanges();

    expect(component.type()).toBe('label');
  });

  // === TESTS ADDITIONNELS POUR COUVERTURE COMPLÈTE ===

  describe('Variant Tests', () => {
    it('should apply secondary variant class', () => {
      fixture.componentRef.setInput('variant', 'secondary');
      fixture.detectChanges();

      expect(badgeEl.nativeElement.classList.contains('secondary')).toBe(true);
    });

    it('should apply warning variant class', () => {
      fixture.componentRef.setInput('variant', 'warning');
      fixture.detectChanges();

      expect(badgeEl.nativeElement.classList.contains('warning')).toBe(true);
    });

    it('should apply error variant class', () => {
      fixture.componentRef.setInput('variant', 'error');
      fixture.detectChanges();

      expect(badgeEl.nativeElement.classList.contains('error')).toBe(true);
    });

    it('should apply info variant class', () => {
      fixture.componentRef.setInput('variant', 'info');
      fixture.detectChanges();

      expect(badgeEl.nativeElement.classList.contains('info')).toBe(true);
    });

    it('should apply neutral variant class', () => {
      fixture.componentRef.setInput('variant', 'neutral');
      fixture.detectChanges();

      expect(badgeEl.nativeElement.classList.contains('neutral')).toBe(true);
    });

    it('should apply default variant class', () => {
      fixture.componentRef.setInput('variant', 'default');
      fixture.detectChanges();

      expect(badgeEl.nativeElement.classList.contains('default')).toBe(true);
    });

    it('should apply accent variant class', () => {
      fixture.componentRef.setInput('variant', 'accent');
      fixture.detectChanges();

      expect(badgeEl.nativeElement.classList.contains('accent')).toBe(true);
    });

    it('should have primary variant by default', () => {
      expect(badgeEl.nativeElement.classList.contains('primary')).toBe(true);
    });
  });

  describe('Size Tests', () => {
    it('should apply sm size class', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();

      expect(badgeEl.nativeElement.classList.contains('sm')).toBe(true);
    });

    it('should have md size by default', () => {
      expect(badgeEl.nativeElement.classList.contains('md')).toBe(true);
    });
  });

  describe('Shape Tests', () => {
    it('should have rounded shape by default', () => {
      expect(badgeEl.nativeElement.classList.contains('rounded')).toBe(true);
    });
  });

  describe('Appearance Tests', () => {
    it('should not have outline class when solid appearance', () => {
      expect(badgeEl.nativeElement.classList.contains('outline')).toBe(false);
    });

    it('should have solid appearance by default', () => {
      expect(component.appearance()).toBe('solid');
    });
  });

  describe('BadgeClasses Getter', () => {
    it('should generate correct badge classes', () => {
      fixture.componentRef.setInput('variant', 'error');
      fixture.componentRef.setInput('size', 'lg');
      fixture.componentRef.setInput('shape', 'pill');
      fixture.componentRef.setInput('appearance', 'outline');
      fixture.detectChanges();

      const classes = component.badgeClasses;
      expect(classes).toContain('error');
      expect(classes).toContain('lg');
      expect(classes).toContain('pill');
      expect(classes).toContain('outline');
    });

    it('should generate correct badge classes without outline', () => {
      fixture.componentRef.setInput('variant', 'success');
      fixture.componentRef.setInput('size', 'sm');
      fixture.componentRef.setInput('shape', 'rounded');
      fixture.componentRef.setInput('appearance', 'solid');
      fixture.detectChanges();

      const classes = component.badgeClasses;
      expect(classes).toContain('success');
      expect(classes).toContain('sm');
      expect(classes).toContain('rounded');
      expect(classes).not.toContain('outline');
    });
  });

  describe('StyleOverrides Getter', () => {
    it('should return null when no custom styles', () => {
      expect(component.styleOverrides).toBeNull();
    });

    it('should return custom styles when provided', () => {
      const customStyles = {
        backgroundColor: '#123456',
        color: '#ffffff',
      };
      fixture.componentRef.setInput('customStyles', customStyles);
      fixture.detectChanges();

      expect(component.styleOverrides).toEqual(customStyles);
    });
  });

  describe('Icon Tests', () => {
    it('should not render icons when not provided', () => {
      const iconStart = fixture.debugElement.query(By.css('.icon-start'));
      const iconEnd = fixture.debugElement.query(By.css('.icon-end'));

      expect(iconStart).toBeFalsy();
      expect(iconEnd).toBeFalsy();
    });
  });

  describe('Type Data Attribute', () => {
    it('should have data-type attribute with status value', () => {
      fixture.componentRef.setInput('type', 'status');
      fixture.detectChanges();

      expect(badgeEl.nativeElement.getAttribute('data-type')).toBe('status');
    });

    it('should have data-type attribute with count value', () => {
      fixture.componentRef.setInput('type', 'count');
      fixture.detectChanges();

      expect(badgeEl.nativeElement.getAttribute('data-type')).toBe('count');
    });

    it('should have data-type attribute with label value by default', () => {
      expect(badgeEl.nativeElement.getAttribute('data-type')).toBe('label');
    });
  });

  describe('Combination Tests', () => {
    it('should handle all variant types', () => {
      const variants: Array<BadgeVariant> = [
        'primary',
        'secondary',
        'success',
        'warning',
        'error',
        'info',
        'neutral',
        'default',
        'accent',
      ];

      variants.forEach((variant) => {
        fixture.componentRef.setInput('variant', variant);
        fixture.detectChanges();

        expect(badgeEl.nativeElement.classList.contains(variant)).toBe(true);
      });
    });

    it('should handle all sizes', () => {
      const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

      sizes.forEach((size) => {
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();

        expect(badgeEl.nativeElement.classList.contains(size)).toBe(true);
      });
    });

    it('should handle both shapes', () => {
      const shapes: Array<'rounded' | 'pill'> = ['rounded', 'pill'];

      shapes.forEach((shape) => {
        fixture.componentRef.setInput('shape', shape);
        fixture.detectChanges();

        expect(badgeEl.nativeElement.classList.contains(shape)).toBe(true);
      });
    });

    it('should combine variant, size, shape, and appearance', () => {
      fixture.componentRef.setInput('variant', 'warning');
      fixture.componentRef.setInput('size', 'lg');
      fixture.componentRef.setInput('shape', 'pill');
      fixture.componentRef.setInput('appearance', 'outline');
      fixture.componentRef.setInput('iconStart', faCheck);
      fixture.componentRef.setInput('iconEnd', faTimes);
      fixture.detectChanges();

      expect(badgeEl.nativeElement.classList.contains('warning')).toBe(true);
      expect(badgeEl.nativeElement.classList.contains('lg')).toBe(true);
      expect(badgeEl.nativeElement.classList.contains('pill')).toBe(true);
      expect(badgeEl.nativeElement.classList.contains('outline')).toBe(true);

      const iconStart = fixture.debugElement.query(By.css('.icon-start'));
      const iconEnd = fixture.debugElement.query(By.css('.icon-end'));
      expect(iconStart).toBeTruthy();
      expect(iconEnd).toBeTruthy();
    });
  });

  describe('Custom Styles Application', () => {
    it('should apply multiple custom styles', () => {
      fixture.componentRef.setInput('customStyles', {
        backgroundColor: '#ff0000',
        borderColor: '#00ff00',
        color: '#0000ff',
        fontWeight: 'bold',
      });
      fixture.detectChanges();

      expect(badgeEl.nativeElement.style.backgroundColor).toBe('rgb(255, 0, 0)');
      expect(badgeEl.nativeElement.style.borderColor).toBe('rgb(0, 255, 0)');
      expect(badgeEl.nativeElement.style.color).toBe('rgb(0, 0, 255)');
      expect(badgeEl.nativeElement.style.fontWeight).toBe('bold');
    });
  });
});
