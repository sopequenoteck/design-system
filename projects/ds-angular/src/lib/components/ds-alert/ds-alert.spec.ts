import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsAlert } from './ds-alert';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('DsAlert', () => {
  let component: DsAlert;
  let fixture: ComponentFixture<DsAlert>;
  let alertElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsAlert, FontAwesomeModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DsAlert);
    component = fixture.componentInstance;
    fixture.detectChanges();
    alertElement = fixture.debugElement.query(By.css('.ds-alert'));
  });

  describe('Component creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render alert element with role="alert"', () => {
      expect(alertElement).toBeTruthy();
      expect(alertElement.nativeElement.getAttribute('role')).toBe('alert');
    });
  });

  describe('Default values', () => {
    it('should have default type as info', () => {
      expect(component.type()).toBe('info');
    });

    it('should have default size as md', () => {
      expect(component.size()).toBe('md');
    });

    it('should show icon by default', () => {
      expect(component.showIcon()).toBe(true);
    });

    it('should not be closable by default', () => {
      expect(component.closable()).toBe(false);
    });

    it('should not be hidden by default', () => {
      expect(component.hidden()).toBe(false);
    });
  });

  describe('Input bindings', () => {
    it('should apply type success correctly', () => {
      fixture.componentRef.setInput('type', 'success');
      fixture.detectChanges();
      expect(component.type()).toBe('success');
    });

    it('should apply type warning correctly', () => {
      fixture.componentRef.setInput('type', 'warning');
      fixture.detectChanges();
      expect(component.type()).toBe('warning');
    });

    it('should apply type error correctly', () => {
      fixture.componentRef.setInput('type', 'error');
      fixture.detectChanges();
      expect(component.type()).toBe('error');
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

    it('should hide icon when showIcon is false', () => {
      fixture.componentRef.setInput('showIcon', false);
      fixture.detectChanges();
      expect(component.showIcon()).toBe(false);
    });

    it('should set closable when closable input is true', () => {
      fixture.componentRef.setInput('closable', true);
      fixture.detectChanges();
      expect(component.closable()).toBe(true);
    });

    it('should set hidden when hidden input is true', () => {
      fixture.componentRef.setInput('hidden', true);
      fixture.detectChanges();
      expect(component.hidden()).toBe(true);
    });
  });

  describe('CSS classes', () => {
    it('should have base ds-alert class', () => {
      const classes = component.alertClasses;
      expect(classes).toContain('ds-alert');
    });

    it('should include type class', () => {
      fixture.componentRef.setInput('type', 'success');
      fixture.detectChanges();
      const classes = component.alertClasses;
      expect(classes).toContain('ds-alert--success');
    });

    it('should include size class', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();
      const classes = component.alertClasses;
      expect(classes).toContain('ds-alert--lg');
    });

    it('should include hidden class when hidden', () => {
      fixture.componentRef.setInput('hidden', true);
      fixture.detectChanges();
      const classes = component.alertClasses;
      expect(classes).toContain('ds-alert--hidden');
    });

    it('should filter out empty strings from classes', () => {
      const classes = component.alertClasses;
      expect(classes.every(c => c.length > 0)).toBe(true);
    });
  });

  describe('Icons', () => {
    it('should display icon when showIcon is true', () => {
      const icon = fixture.debugElement.query(By.css('.ds-alert__icon'));
      expect(icon).toBeTruthy();
    });

    it('should not display icon when showIcon is false', () => {
      fixture.componentRef.setInput('showIcon', false);
      fixture.detectChanges();
      const icon = fixture.debugElement.query(By.css('.ds-alert__icon'));
      expect(icon).toBeFalsy();
    });

    it('should return correct icon for success type', () => {
      fixture.componentRef.setInput('type', 'success');
      fixture.detectChanges();
      expect(component.currentIcon).toBeTruthy();
      expect(component.currentIcon).toBe(component.icons['success']);
    });

    it('should return correct icon for warning type', () => {
      fixture.componentRef.setInput('type', 'warning');
      fixture.detectChanges();
      expect(component.currentIcon).toBe(component.icons['warning']);
    });

    it('should return correct icon for error type', () => {
      fixture.componentRef.setInput('type', 'error');
      fixture.detectChanges();
      expect(component.currentIcon).toBe(component.icons['error']);
    });

    it('should return correct icon for info type', () => {
      fixture.componentRef.setInput('type', 'info');
      fixture.detectChanges();
      expect(component.currentIcon).toBe(component.icons['info']);
    });

    it('should have aria-hidden on icon element', () => {
      const icon = fixture.debugElement.query(By.css('.ds-alert__icon'));
      expect(icon.nativeElement.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('Close button', () => {
    it('should not display close button when closable is false', () => {
      const closeButton = fixture.debugElement.query(By.css('.ds-alert__close'));
      expect(closeButton).toBeFalsy();
    });

    it('should display close button when closable is true', () => {
      fixture.componentRef.setInput('closable', true);
      fixture.detectChanges();
      const closeButton = fixture.debugElement.query(By.css('.ds-alert__close'));
      expect(closeButton).toBeTruthy();
    });

    it('should have aria-label on close button', () => {
      fixture.componentRef.setInput('closable', true);
      fixture.detectChanges();
      const closeButton = fixture.debugElement.query(By.css('.ds-alert__close'));
      expect(closeButton.nativeElement.getAttribute('aria-label')).toBe('Fermer l\'alerte');
    });

    it('should emit closed event when close button is clicked', () => {
      fixture.componentRef.setInput('closable', true);
      fixture.detectChanges();

      spyOn(component.closed, 'emit');
      const closeButton = fixture.debugElement.query(By.css('.ds-alert__close'));
      closeButton.nativeElement.click();

      expect(component.closed.emit).toHaveBeenCalled();
    });

    it('should call handleClose when close button is clicked', () => {
      fixture.componentRef.setInput('closable', true);
      fixture.detectChanges();

      spyOn(component, 'handleClose');
      const closeButton = fixture.debugElement.query(By.css('.ds-alert__close'));
      closeButton.nativeElement.click();

      expect(component.handleClose).toHaveBeenCalled();
    });
  });

  describe('ARIA attributes', () => {
    it('should have role="alert"', () => {
      expect(alertElement.nativeElement.getAttribute('role')).toBe('alert');
    });

    it('should set aria-hidden when hidden', () => {
      fixture.componentRef.setInput('hidden', true);
      fixture.detectChanges();
      expect(alertElement.nativeElement.getAttribute('aria-hidden')).toBe('true');
    });

    it('should not have aria-hidden when not hidden', () => {
      expect(alertElement.nativeElement.getAttribute('aria-hidden')).toBeNull();
    });
  });

  describe('Content projection', () => {
    it('should project content correctly', () => {
      const content = fixture.debugElement.query(By.css('.ds-alert__content'));
      expect(content).toBeTruthy();
    });
  });

  describe('Edge cases', () => {
    it('should handle all type combinations', () => {
      const types: Array<'success' | 'warning' | 'error' | 'info'> = ['success', 'warning', 'error', 'info'];

      types.forEach(type => {
        fixture.componentRef.setInput('type', type);
        fixture.detectChanges();
        const classes = component.alertClasses;
        expect(classes).toContain(`ds-alert--${type}`);
      });
    });

    it('should handle all size combinations', () => {
      const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

      sizes.forEach(size => {
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();
        const classes = component.alertClasses;
        expect(classes).toContain(`ds-alert--${size}`);
      });
    });

    it('should handle multiple state combinations', () => {
      fixture.componentRef.setInput('type', 'warning');
      fixture.componentRef.setInput('size', 'sm');
      fixture.componentRef.setInput('closable', true);
      fixture.componentRef.setInput('showIcon', false);
      fixture.detectChanges();

      const classes = component.alertClasses;
      expect(classes).toContain('ds-alert');
      expect(classes).toContain('ds-alert--warning');
      expect(classes).toContain('ds-alert--sm');
      expect(component.closable()).toBe(true);
      expect(component.showIcon()).toBe(false);
    });

    it('should render all structural elements', () => {
      fixture.componentRef.setInput('closable', true);
      fixture.detectChanges();

      const icon = fixture.debugElement.query(By.css('.ds-alert__icon'));
      const content = fixture.debugElement.query(By.css('.ds-alert__content'));
      const closeButton = fixture.debugElement.query(By.css('.ds-alert__close'));

      expect(icon).toBeTruthy();
      expect(content).toBeTruthy();
      expect(closeButton).toBeTruthy();
    });
  });
});
