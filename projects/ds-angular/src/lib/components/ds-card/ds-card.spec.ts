import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsCard } from './ds-card';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

describe('DsCard', () => {
  let component: DsCard;
  let fixture: ComponentFixture<DsCard>;
  let cardElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsCard],
    }).compileComponents();

    fixture = TestBed.createComponent(DsCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
    cardElement = fixture.debugElement.query(By.css('article'));
  });

  describe('Component creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render article element', () => {
      expect(cardElement).toBeTruthy();
      expect(cardElement.nativeElement.tagName).toBe('ARTICLE');
    });
  });

  describe('Default values', () => {
    it('should have default variant as default', () => {
      expect(component.variant()).toBe('default');
    });

    it('should have default size as md', () => {
      expect(component.size()).toBe('md');
    });

    it('should have disabled as false by default', () => {
      expect(component.disabled()).toBe(false);
    });

    it('should have clickable as false by default', () => {
      expect(component.clickable()).toBe(false);
    });
  });

  describe('Input bindings', () => {
    it('should apply variant input correctly', () => {
      fixture.componentRef.setInput('variant', 'elevated');
      fixture.detectChanges();
      expect(component.variant()).toBe('elevated');
    });

    it('should apply outlined variant correctly', () => {
      fixture.componentRef.setInput('variant', 'outlined');
      fixture.detectChanges();
      expect(component.variant()).toBe('outlined');
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

    it('should set disabled state when disabled input is true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(component.disabled()).toBe(true);
    });

    it('should set clickable state when clickable input is true', () => {
      fixture.componentRef.setInput('clickable', true);
      fixture.detectChanges();
      expect(component.clickable()).toBe(true);
    });
  });

  describe('CSS classes', () => {
    it('should have base ds-card class', () => {
      const classes = component.cardClasses;
      expect(classes).toContain('ds-card');
    });

    it('should include variant class', () => {
      fixture.componentRef.setInput('variant', 'elevated');
      fixture.detectChanges();
      const classes = component.cardClasses;
      expect(classes).toContain('ds-card--elevated');
    });

    it('should include size class', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();
      const classes = component.cardClasses;
      expect(classes).toContain('ds-card--lg');
    });

    it('should include disabled class when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const classes = component.cardClasses;
      expect(classes).toContain('ds-card--disabled');
    });

    it('should include clickable class when clickable', () => {
      fixture.componentRef.setInput('clickable', true);
      fixture.detectChanges();
      const classes = component.cardClasses;
      expect(classes).toContain('ds-card--clickable');
    });

    it('should filter out empty strings from classes', () => {
      const classes = component.cardClasses;
      expect(classes.every(c => c.length > 0)).toBe(true);
    });
  });

  describe('ARIA attributes', () => {
    it('should set aria-disabled when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(cardElement.nativeElement.getAttribute('aria-disabled')).toBe('true');
    });

    it('should not have aria-disabled when not disabled', () => {
      expect(cardElement.nativeElement.getAttribute('aria-disabled')).toBeNull();
    });
  });

  describe('Content projection', () => {
    @Component({
      template: `
        <ds-card>
          <div header>Header content</div>
          <div>Body content</div>
          <div footer>Footer content</div>
        </ds-card>
      `,
      imports: [DsCard],
    })
    class TestHostComponent {}

    it('should project header content', () => {
      const hostFixture = TestBed.createComponent(TestHostComponent);
      hostFixture.detectChanges();

      const header = hostFixture.debugElement.query(By.css('.ds-card__header'));
      expect(header).toBeTruthy();
      expect(header.nativeElement.textContent.trim()).toBe('Header content');
    });

    it('should project body content', () => {
      const hostFixture = TestBed.createComponent(TestHostComponent);
      hostFixture.detectChanges();

      const body = hostFixture.debugElement.query(By.css('.ds-card__body'));
      expect(body).toBeTruthy();
      expect(body.nativeElement.textContent.trim()).toBe('Body content');
    });

    it('should project footer content', () => {
      const hostFixture = TestBed.createComponent(TestHostComponent);
      hostFixture.detectChanges();

      const footer = hostFixture.debugElement.query(By.css('.ds-card__footer'));
      expect(footer).toBeTruthy();
      expect(footer.nativeElement.textContent.trim()).toBe('Footer content');
    });
  });

  describe('Edge cases', () => {
    it('should handle multiple class combinations', () => {
      fixture.componentRef.setInput('variant', 'outlined');
      fixture.componentRef.setInput('size', 'sm');
      fixture.componentRef.setInput('disabled', true);
      fixture.componentRef.setInput('clickable', true);
      fixture.detectChanges();

      const classes = component.cardClasses;
      expect(classes).toContain('ds-card');
      expect(classes).toContain('ds-card--outlined');
      expect(classes).toContain('ds-card--sm');
      expect(classes).toContain('ds-card--disabled');
      expect(classes).toContain('ds-card--clickable');
    });

    it('should render all structural elements', () => {
      const header = fixture.debugElement.query(By.css('.ds-card__header'));
      const body = fixture.debugElement.query(By.css('.ds-card__body'));
      const footer = fixture.debugElement.query(By.css('.ds-card__footer'));

      expect(header).toBeTruthy();
      expect(body).toBeTruthy();
      expect(footer).toBeTruthy();
    });
  });
});
