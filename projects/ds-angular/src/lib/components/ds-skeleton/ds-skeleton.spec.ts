import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsSkeleton, SkeletonVariant, SkeletonSize } from './ds-skeleton';

describe('DsSkeleton', () => {
  let component: DsSkeleton;
  let fixture: ComponentFixture<DsSkeleton>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(DsSkeleton);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render skeleton element', () => {
      const skeleton = compiled.querySelector('.ds-skeleton');
      expect(skeleton).toBeTruthy();
    });

    it('should default to text variant', () => {
      expect(component.variant()).toBe('text');
    });

    it('should default to md size', () => {
      expect(component.size()).toBe('md');
    });

    it('should default to 1 line for text', () => {
      expect(component.lines()).toBe(1);
    });

    it('should have animation by default', () => {
      const skeleton = compiled.querySelector('.ds-skeleton');
      expect(skeleton?.classList.contains('ds-skeleton--animated')).toBe(true);
    });
  });

  describe('Variants', () => {
    const variants: SkeletonVariant[] = ['text', 'circle', 'rectangle', 'card'];

    variants.forEach((variant) => {
      it(`should apply ${variant} variant class`, () => {
        fixture.componentRef.setInput('variant', variant);
        fixture.detectChanges();
        const skeleton = compiled.querySelector(`.ds-skeleton--${variant}`);
        expect(skeleton).toBeTruthy();
      });
    });

    it('should render text container for text variant', () => {
      fixture.componentRef.setInput('variant', 'text');
      fixture.detectChanges();
      const container = compiled.querySelector('.ds-skeleton-text-container');
      expect(container).toBeTruthy();
    });

    it('should render card structure for card variant', () => {
      fixture.componentRef.setInput('variant', 'card');
      fixture.detectChanges();
      const card = compiled.querySelector('.ds-skeleton-card');
      const header = compiled.querySelector('.ds-skeleton-card__header');
      const content = compiled.querySelector('.ds-skeleton-card__content');
      expect(card).toBeTruthy();
      expect(header).toBeTruthy();
      expect(content).toBeTruthy();
    });
  });

  describe('Sizes', () => {
    const sizes: SkeletonSize[] = ['sm', 'md', 'lg'];

    sizes.forEach((size) => {
      it(`should apply ${size} size class for circle`, () => {
        fixture.componentRef.setInput('variant', 'circle');
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();
        const skeleton = compiled.querySelector('.ds-skeleton');
        expect(skeleton?.classList.contains(`ds-skeleton--${size}`)).toBe(true);
      });

      it(`should apply ${size} size class for rectangle`, () => {
        fixture.componentRef.setInput('variant', 'rectangle');
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();
        const skeleton = compiled.querySelector('.ds-skeleton');
        expect(skeleton?.classList.contains(`ds-skeleton--${size}`)).toBe(true);
      });
    });
  });

  describe('Text Lines', () => {
    it('should render 1 line by default', () => {
      fixture.componentRef.setInput('variant', 'text');
      fixture.detectChanges();
      const lines = compiled.querySelectorAll('.ds-skeleton--text');
      expect(lines.length).toBe(1);
    });

    it('should render multiple lines when lines prop is set', () => {
      fixture.componentRef.setInput('variant', 'text');
      fixture.componentRef.setInput('lines', 5);
      fixture.detectChanges();
      const lines = compiled.querySelectorAll('.ds-skeleton--text');
      expect(lines.length).toBe(5);
    });

    it('should generate correct textLines array', () => {
      fixture.componentRef.setInput('lines', 3);
      fixture.detectChanges();
      expect(component.textLines().length).toBe(3);
    });
  });

  describe('Custom Dimensions', () => {
    it('should apply custom width', () => {
      fixture.componentRef.setInput('variant', 'rectangle');
      fixture.componentRef.setInput('width', '300px');
      fixture.detectChanges();
      const skeleton = compiled.querySelector('.ds-skeleton') as HTMLElement;
      expect(skeleton.style.width).toBe('300px');
    });

    it('should apply custom height', () => {
      fixture.componentRef.setInput('variant', 'rectangle');
      fixture.componentRef.setInput('height', '200px');
      fixture.detectChanges();
      const skeleton = compiled.querySelector('.ds-skeleton') as HTMLElement;
      expect(skeleton.style.height).toBe('200px');
    });

    it('should apply both width and height', () => {
      fixture.componentRef.setInput('variant', 'rectangle');
      fixture.componentRef.setInput('width', '400px');
      fixture.componentRef.setInput('height', '250px');
      fixture.detectChanges();
      const skeleton = compiled.querySelector('.ds-skeleton') as HTMLElement;
      expect(skeleton.style.width).toBe('400px');
      expect(skeleton.style.height).toBe('250px');
    });
  });

  describe('Animation', () => {
    it('should have animation class by default', () => {
      const skeleton = compiled.querySelector('.ds-skeleton');
      expect(skeleton?.classList.contains('ds-skeleton--animated')).toBe(true);
    });

    it('should not have animation class when noAnimation is true', () => {
      fixture.componentRef.setInput('noAnimation', true);
      fixture.detectChanges();
      const skeleton = compiled.querySelector('.ds-skeleton');
      expect(skeleton?.classList.contains('ds-skeleton--animated')).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('should have aria-busy="true"', () => {
      const element = compiled.querySelector('[aria-busy="true"]');
      expect(element).toBeTruthy();
    });

    it('should have role="status"', () => {
      const element = compiled.querySelector('[role="status"]');
      expect(element).toBeTruthy();
    });

    it('should have default aria-label', () => {
      const element = compiled.querySelector('[aria-label]');
      expect(element?.getAttribute('aria-label')).toBe('Chargement en cours...');
    });

    it('should use custom aria-label when provided', () => {
      fixture.componentRef.setInput('ariaLabel', 'Chargement des données');
      fixture.detectChanges();
      const element = compiled.querySelector('[aria-label]');
      expect(element?.getAttribute('aria-label')).toBe('Chargement des données');
    });
  });

  describe('CSS Classes Computation', () => {
    it('should compute correct classes for text variant', () => {
      fixture.componentRef.setInput('variant', 'text');
      fixture.detectChanges();
      const classes = component.skeletonClasses();
      expect(classes).toContain('ds-skeleton');
      expect(classes).toContain('ds-skeleton--text');
      expect(classes).toContain('ds-skeleton--animated');
    });

    it('should compute correct classes for circle with size', () => {
      fixture.componentRef.setInput('variant', 'circle');
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();
      const classes = component.skeletonClasses();
      expect(classes).toContain('ds-skeleton');
      expect(classes).toContain('ds-skeleton--circle');
      expect(classes).toContain('ds-skeleton--lg');
    });

    it('should not include animated class when noAnimation is true', () => {
      fixture.componentRef.setInput('noAnimation', true);
      fixture.detectChanges();
      const classes = component.skeletonClasses();
      expect(classes).not.toContain('ds-skeleton--animated');
    });
  });

  describe('Custom Style Computation', () => {
    it('should return empty object when no custom dimensions', () => {
      const style = component.customStyle();
      expect(Object.keys(style).length).toBe(0);
    });

    it('should return width when set', () => {
      fixture.componentRef.setInput('width', '250px');
      fixture.detectChanges();
      const style = component.customStyle();
      expect(style.width).toBe('250px');
    });

    it('should return height when set', () => {
      fixture.componentRef.setInput('height', '150px');
      fixture.detectChanges();
      const style = component.customStyle();
      expect(style.height).toBe('150px');
    });
  });
});
