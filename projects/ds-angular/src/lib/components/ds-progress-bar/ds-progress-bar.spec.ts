import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsProgressBar, ProgressBarVariant, ProgressBarSize, ProgressBarMode } from './ds-progress-bar';

describe('DsProgressBar', () => {
  let component: DsProgressBar;
  let fixture: ComponentFixture<DsProgressBar>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsProgressBar],
    }).compileComponents();

    fixture = TestBed.createComponent(DsProgressBar);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render progress bar container', () => {
      const container = compiled.querySelector('.ds-progress-bar');
      expect(container).toBeTruthy();
    });

    it('should render track and fill elements', () => {
      const track = compiled.querySelector('.ds-progress-bar__track');
      const fill = compiled.querySelector('.ds-progress-bar__fill');
      expect(track).toBeTruthy();
      expect(fill).toBeTruthy();
    });

    it('should not show label by default', () => {
      const label = compiled.querySelector('.ds-progress-bar__label');
      expect(label).toBeFalsy();
    });

    it('should show label when showLabel is true', () => {
      fixture.componentRef.setInput('showLabel', true);
      fixture.detectChanges();
      const label = compiled.querySelector('.ds-progress-bar__label');
      expect(label).toBeTruthy();
      expect(label?.textContent).toContain('0%');
    });
  });

  describe('Value', () => {
    it('should default to 0', () => {
      expect(component.value()).toBe(0);
    });

    it('should accept value prop', () => {
      fixture.componentRef.setInput('value', 50);
      fixture.detectChanges();
      expect(component.value()).toBe(50);
    });

    it('should normalize value to 0-100 range', () => {
      fixture.componentRef.setInput('value', 150);
      fixture.detectChanges();
      expect(component.normalizedValue()).toBe(100);

      fixture.componentRef.setInput('value', -20);
      fixture.detectChanges();
      expect(component.normalizedValue()).toBe(0);
    });

    it('should update fill width based on value', () => {
      fixture.componentRef.setInput('value', 75);
      fixture.detectChanges();
      const fill = compiled.querySelector('.ds-progress-bar__fill') as HTMLElement;
      expect(fill.style.width).toBe('75%');
    });

    it('should display correct percentage in label', () => {
      fixture.componentRef.setInput('value', 42);
      fixture.componentRef.setInput('showLabel', true);
      fixture.detectChanges();
      const label = compiled.querySelector('.ds-progress-bar__label');
      expect(label?.textContent).toContain('42%');
    });
  });

  describe('Variants', () => {
    const variants: ProgressBarVariant[] = ['default', 'success', 'warning', 'error'];

    variants.forEach((variant) => {
      it(`should apply ${variant} variant class`, () => {
        fixture.componentRef.setInput('variant', variant);
        fixture.detectChanges();
        const container = compiled.querySelector('.ds-progress-bar');
        expect(container?.classList.contains(`ds-progress-bar--${variant}`)).toBe(true);
      });
    });

    it('should default to default variant', () => {
      expect(component.variant()).toBe('default');
    });
  });

  describe('Sizes', () => {
    const sizes: ProgressBarSize[] = ['sm', 'md', 'lg'];

    sizes.forEach((size) => {
      it(`should apply ${size} size class`, () => {
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();
        const container = compiled.querySelector('.ds-progress-bar');
        expect(container?.classList.contains(`ds-progress-bar--${size}`)).toBe(true);
      });
    });

    it('should default to md size', () => {
      expect(component.size()).toBe('md');
    });
  });

  describe('Mode', () => {
    it('should default to determinate mode', () => {
      expect(component.mode()).toBe('determinate');
    });

    it('should apply indeterminate class when mode is indeterminate', () => {
      fixture.componentRef.setInput('mode', 'indeterminate');
      fixture.detectChanges();
      const container = compiled.querySelector('.ds-progress-bar');
      expect(container?.classList.contains('ds-progress-bar--indeterminate')).toBe(true);
    });

    it('should not apply width style in indeterminate mode', () => {
      fixture.componentRef.setInput('mode', 'indeterminate');
      fixture.componentRef.setInput('value', 50);
      fixture.detectChanges();
      const style = component.progressStyle();
      expect(Object.keys(style).length).toBe(0);
    });

    it('should not show label in indeterminate mode', () => {
      fixture.componentRef.setInput('mode', 'indeterminate');
      fixture.componentRef.setInput('showLabel', true);
      fixture.detectChanges();
      const label = compiled.querySelector('.ds-progress-bar__label');
      expect(label).toBeFalsy();
    });
  });

  describe('Accessibility', () => {
    it('should have role="progressbar"', () => {
      const container = compiled.querySelector('[role="progressbar"]');
      expect(container).toBeTruthy();
    });

    it('should have aria-valuenow in determinate mode', () => {
      fixture.componentRef.setInput('value', 60);
      fixture.detectChanges();
      const container = compiled.querySelector('[role="progressbar"]');
      expect(container?.getAttribute('aria-valuenow')).toBe('60');
    });

    it('should have aria-valuemin and aria-valuemax in determinate mode', () => {
      const container = compiled.querySelector('[role="progressbar"]');
      expect(container?.getAttribute('aria-valuemin')).toBe('0');
      expect(container?.getAttribute('aria-valuemax')).toBe('100');
    });

    it('should not have aria-value attributes in indeterminate mode', () => {
      fixture.componentRef.setInput('mode', 'indeterminate');
      fixture.detectChanges();
      const container = compiled.querySelector('[role="progressbar"]');
      expect(container?.getAttribute('aria-valuenow')).toBeNull();
      expect(container?.getAttribute('aria-valuemin')).toBeNull();
      expect(container?.getAttribute('aria-valuemax')).toBeNull();
    });

    it('should use custom aria-label when provided', () => {
      fixture.componentRef.setInput('ariaLabel', 'Téléchargement en cours');
      fixture.detectChanges();
      const container = compiled.querySelector('[role="progressbar"]');
      expect(container?.getAttribute('aria-label')).toBe('Téléchargement en cours');
    });

    it('should generate default aria-label for determinate mode', () => {
      fixture.componentRef.setInput('value', 45);
      fixture.detectChanges();
      const container = compiled.querySelector('[role="progressbar"]');
      expect(container?.getAttribute('aria-label')).toBe('Progression : 45%');
    });

    it('should generate default aria-label for indeterminate mode', () => {
      fixture.componentRef.setInput('mode', 'indeterminate');
      fixture.detectChanges();
      const container = compiled.querySelector('[role="progressbar"]');
      expect(container?.getAttribute('aria-label')).toBe('Chargement en cours');
    });
  });

  describe('CSS Classes', () => {
    it('should compute correct container classes', () => {
      fixture.componentRef.setInput('variant', 'success');
      fixture.componentRef.setInput('size', 'lg');
      fixture.componentRef.setInput('mode', 'determinate');
      fixture.detectChanges();

      const classes = component.containerClasses();
      expect(classes).toContain('ds-progress-bar');
      expect(classes).toContain('ds-progress-bar--success');
      expect(classes).toContain('ds-progress-bar--lg');
      expect(classes).not.toContain('ds-progress-bar--indeterminate');
    });

    it('should include indeterminate class when mode is indeterminate', () => {
      fixture.componentRef.setInput('mode', 'indeterminate');
      fixture.detectChanges();

      const classes = component.containerClasses();
      expect(classes).toContain('ds-progress-bar--indeterminate');
    });
  });
});
