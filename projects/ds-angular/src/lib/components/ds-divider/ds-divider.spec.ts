import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsDivider } from './ds-divider';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('DsDivider', () => {
  let component: DsDivider;
  let fixture: ComponentFixture<DsDivider>;
  let dividerElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsDivider],
    }).compileComponents();

    fixture = TestBed.createComponent(DsDivider);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dividerElement = fixture.debugElement.query(By.css('.ds-divider'));
  });

  describe('Component creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render divider element with role="separator"', () => {
      expect(dividerElement).toBeTruthy();
      expect(dividerElement.nativeElement.getAttribute('role')).toBe('separator');
    });
  });

  describe('Default values', () => {
    it('should have default orientation as horizontal', () => {
      expect(component.orientation()).toBe('horizontal');
    });

    it('should have default variant as solid', () => {
      expect(component.variant()).toBe('solid');
    });

    it('should have default size as md', () => {
      expect(component.size()).toBe('md');
    });

    it('should have default labelPosition as center', () => {
      expect(component.labelPosition()).toBe('center');
    });

    it('should have default spacing as md', () => {
      expect(component.spacing()).toBe('md');
    });
  });

  describe('Input bindings', () => {
    it('should apply orientation vertical correctly', () => {
      fixture.componentRef.setInput('orientation', 'vertical');
      fixture.detectChanges();
      expect(component.orientation()).toBe('vertical');
    });

    it('should apply variant dashed correctly', () => {
      fixture.componentRef.setInput('variant', 'dashed');
      fixture.detectChanges();
      expect(component.variant()).toBe('dashed');
    });

    it('should apply variant dotted correctly', () => {
      fixture.componentRef.setInput('variant', 'dotted');
      fixture.detectChanges();
      expect(component.variant()).toBe('dotted');
    });

    it('should apply size sm correctly', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();
      expect(component.size()).toBe('sm');
    });

    it('should apply size lg correctly', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();
      expect(component.size()).toBe('lg');
    });

    it('should apply labelPosition left correctly', () => {
      fixture.componentRef.setInput('labelPosition', 'left');
      fixture.detectChanges();
      expect(component.labelPosition()).toBe('left');
    });

    it('should apply labelPosition right correctly', () => {
      fixture.componentRef.setInput('labelPosition', 'right');
      fixture.detectChanges();
      expect(component.labelPosition()).toBe('right');
    });

    it('should apply spacing none correctly', () => {
      fixture.componentRef.setInput('spacing', 'none');
      fixture.detectChanges();
      expect(component.spacing()).toBe('none');
    });

    it('should apply spacing sm correctly', () => {
      fixture.componentRef.setInput('spacing', 'sm');
      fixture.detectChanges();
      expect(component.spacing()).toBe('sm');
    });

    it('should apply spacing lg correctly', () => {
      fixture.componentRef.setInput('spacing', 'lg');
      fixture.detectChanges();
      expect(component.spacing()).toBe('lg');
    });
  });

  describe('CSS classes', () => {
    it('should have base ds-divider class', () => {
      const classes = component.dividerClasses;
      expect(classes).toContain('ds-divider');
    });

    it('should include orientation class', () => {
      fixture.componentRef.setInput('orientation', 'vertical');
      fixture.detectChanges();
      const classes = component.dividerClasses;
      expect(classes).toContain('ds-divider--vertical');
    });

    it('should include variant class', () => {
      fixture.componentRef.setInput('variant', 'dashed');
      fixture.detectChanges();
      const classes = component.dividerClasses;
      expect(classes).toContain('ds-divider--dashed');
    });

    it('should include size class', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();
      const classes = component.dividerClasses;
      expect(classes).toContain('ds-divider--lg');
    });

    it('should include spacing class', () => {
      fixture.componentRef.setInput('spacing', 'lg');
      fixture.detectChanges();
      const classes = component.dividerClasses;
      expect(classes).toContain('ds-divider--spacing-lg');
    });

    it('should include labelPosition class for horizontal orientation', () => {
      fixture.componentRef.setInput('orientation', 'horizontal');
      fixture.componentRef.setInput('labelPosition', 'left');
      fixture.detectChanges();
      const classes = component.dividerClasses;
      expect(classes).toContain('ds-divider--label-left');
    });

    it('should not include labelPosition class for vertical orientation', () => {
      fixture.componentRef.setInput('orientation', 'vertical');
      fixture.componentRef.setInput('labelPosition', 'left');
      fixture.detectChanges();
      const classes = component.dividerClasses;
      expect(classes.some(c => c.includes('label'))).toBe(false);
    });

    it('should filter out empty strings from classes', () => {
      const classes = component.dividerClasses;
      expect(classes.every(c => c.length > 0)).toBe(true);
    });
  });

  describe('ARIA attributes', () => {
    it('should have role="separator"', () => {
      expect(dividerElement.nativeElement.getAttribute('role')).toBe('separator');
    });

    it('should set aria-orientation to horizontal', () => {
      fixture.componentRef.setInput('orientation', 'horizontal');
      fixture.detectChanges();
      expect(dividerElement.nativeElement.getAttribute('aria-orientation')).toBe('horizontal');
    });

    it('should set aria-orientation to vertical', () => {
      fixture.componentRef.setInput('orientation', 'vertical');
      fixture.detectChanges();
      expect(dividerElement.nativeElement.getAttribute('aria-orientation')).toBe('vertical');
    });
  });

  describe('Edge cases', () => {
    it('should handle all variant combinations', () => {
      const variants: Array<'solid' | 'dashed' | 'dotted'> = ['solid', 'dashed', 'dotted'];

      variants.forEach(variant => {
        fixture.componentRef.setInput('variant', variant);
        fixture.detectChanges();
        const classes = component.dividerClasses;
        expect(classes).toContain(`ds-divider--${variant}`);
      });
    });

    it('should handle all size combinations', () => {
      const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

      sizes.forEach(size => {
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();
        const classes = component.dividerClasses;
        expect(classes).toContain(`ds-divider--${size}`);
      });
    });

    it('should handle all spacing combinations', () => {
      const spacings: Array<'none' | 'sm' | 'md' | 'lg'> = ['none', 'sm', 'md', 'lg'];

      spacings.forEach(spacing => {
        fixture.componentRef.setInput('spacing', spacing);
        fixture.detectChanges();
        const classes = component.dividerClasses;
        expect(classes).toContain(`ds-divider--spacing-${spacing}`);
      });
    });

    it('should handle multiple property combinations', () => {
      fixture.componentRef.setInput('orientation', 'horizontal');
      fixture.componentRef.setInput('variant', 'dotted');
      fixture.componentRef.setInput('size', 'sm');
      fixture.componentRef.setInput('labelPosition', 'right');
      fixture.componentRef.setInput('spacing', 'none');
      fixture.detectChanges();

      const classes = component.dividerClasses;
      expect(classes).toContain('ds-divider');
      expect(classes).toContain('ds-divider--horizontal');
      expect(classes).toContain('ds-divider--dotted');
      expect(classes).toContain('ds-divider--sm');
      expect(classes).toContain('ds-divider--label-right');
      expect(classes).toContain('ds-divider--spacing-none');
    });
  });
});
