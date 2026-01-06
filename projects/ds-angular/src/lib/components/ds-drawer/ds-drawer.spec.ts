import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DsDrawer } from './ds-drawer';
import { FocusTrapFactory } from '@angular/cdk/a11y';

describe('DsDrawer', () => {
  let component: DsDrawer;
  let fixture: ComponentFixture<DsDrawer>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsDrawer],
      providers: [FocusTrapFactory],
    }).compileComponents();

    fixture = TestBed.createComponent(DsDrawer);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture?.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Default state', () => {
    it('should not be visible by default', () => {
      expect(component.visible()).toBe(false);
    });

    it('should have position right by default', () => {
      expect(component.position()).toBe('right');
    });

    it('should have size md by default', () => {
      expect(component.size()).toBe('md');
    });

    it('should be closable by default', () => {
      expect(component.closable()).toBe(true);
    });

    it('should be maskClosable by default', () => {
      expect(component.maskClosable()).toBe(true);
    });

    it('should not render drawer when visible is false', () => {
      const drawer = compiled.querySelector('.ds-drawer');
      expect(drawer).toBeNull();
    });
  });

  describe('Visibility', () => {
    it('should render drawer when visible is true', fakeAsync(() => {
      fixture.componentRef.setInput('visible', true);
      fixture.detectChanges();
      tick(350);

      const drawer = compiled.querySelector('.ds-drawer');
      expect(drawer).toBeTruthy();
    }));

    it('should render backdrop when visible is true', fakeAsync(() => {
      fixture.componentRef.setInput('visible', true);
      fixture.detectChanges();
      tick(350);

      const backdrop = compiled.querySelector('.ds-drawer__backdrop');
      expect(backdrop).toBeTruthy();
    }));

    it('should have open class when visible', fakeAsync(() => {
      fixture.componentRef.setInput('visible', true);
      fixture.detectChanges();
      tick(350);

      const drawer = compiled.querySelector('.ds-drawer--open');
      expect(drawer).toBeTruthy();
    }));
  });

  describe('Position', () => {
    it('should apply left position class', fakeAsync(() => {
      fixture.componentRef.setInput('visible', true);
      fixture.componentRef.setInput('position', 'left');
      fixture.detectChanges();
      tick(350);

      const drawer = compiled.querySelector('.ds-drawer--left');
      expect(drawer).toBeTruthy();
    }));

    it('should apply right position class', fakeAsync(() => {
      fixture.componentRef.setInput('visible', true);
      fixture.componentRef.setInput('position', 'right');
      fixture.detectChanges();
      tick(350);

      const drawer = compiled.querySelector('.ds-drawer--right');
      expect(drawer).toBeTruthy();
    }));
  });

  describe('Size', () => {
    it('should apply sm size class', fakeAsync(() => {
      fixture.componentRef.setInput('visible', true);
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();
      tick(350);

      const drawer = compiled.querySelector('.ds-drawer--sm');
      expect(drawer).toBeTruthy();
    }));

    it('should apply md size class', fakeAsync(() => {
      fixture.componentRef.setInput('visible', true);
      fixture.componentRef.setInput('size', 'md');
      fixture.detectChanges();
      tick(350);

      const drawer = compiled.querySelector('.ds-drawer--md');
      expect(drawer).toBeTruthy();
    }));

    it('should apply lg size class', fakeAsync(() => {
      fixture.componentRef.setInput('visible', true);
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();
      tick(350);

      const drawer = compiled.querySelector('.ds-drawer--lg');
      expect(drawer).toBeTruthy();
    }));

    it('should apply full size class', fakeAsync(() => {
      fixture.componentRef.setInput('visible', true);
      fixture.componentRef.setInput('size', 'full');
      fixture.detectChanges();
      tick(350);

      const drawer = compiled.querySelector('.ds-drawer--full');
      expect(drawer).toBeTruthy();
    }));
  });

  describe('Title', () => {
    it('should render title when provided', fakeAsync(() => {
      fixture.componentRef.setInput('visible', true);
      fixture.componentRef.setInput('title', 'Mon Drawer');
      fixture.detectChanges();
      tick(350);

      const title = compiled.querySelector('.ds-drawer__title');
      expect(title?.textContent?.trim()).toBe('Mon Drawer');
    }));

    it('should have aria-labelledby when title is present', fakeAsync(() => {
      fixture.componentRef.setInput('visible', true);
      fixture.componentRef.setInput('title', 'Mon Drawer');
      fixture.detectChanges();
      tick(350);

      const drawer = compiled.querySelector('.ds-drawer');
      expect(drawer?.getAttribute('aria-labelledby')).toBeTruthy();
    }));

    it('should not render title when empty', fakeAsync(() => {
      fixture.componentRef.setInput('visible', true);
      fixture.componentRef.setInput('title', '');
      fixture.detectChanges();
      tick(350);

      const title = compiled.querySelector('.ds-drawer__title');
      expect(title).toBeNull();
    }));
  });

  describe('Close button', () => {
    it('should render close button when closable is true', fakeAsync(() => {
      fixture.componentRef.setInput('visible', true);
      fixture.componentRef.setInput('closable', true);
      fixture.detectChanges();
      tick(350);

      const closeBtn = compiled.querySelector('.ds-drawer__close');
      expect(closeBtn).toBeTruthy();
    }));

    it('should not render close button when closable is false', fakeAsync(() => {
      fixture.componentRef.setInput('visible', true);
      fixture.componentRef.setInput('closable', false);
      fixture.detectChanges();
      tick(350);

      const closeBtn = compiled.querySelector('.ds-drawer__close');
      expect(closeBtn).toBeNull();
    }));

    it('should emit closed event when close button is clicked', fakeAsync(() => {
      const spy = jasmine.createSpy('closed');
      component.closed.subscribe(spy);

      fixture.componentRef.setInput('visible', true);
      fixture.detectChanges();
      tick(350);

      const closeBtn = compiled.querySelector('.ds-drawer__close') as HTMLButtonElement;
      closeBtn.click();
      tick(350);

      expect(spy).toHaveBeenCalled();
    }));
  });

  describe('Backdrop', () => {
    it('should close drawer on backdrop click when maskClosable is true', fakeAsync(() => {
      const spy = jasmine.createSpy('visibleChange');
      component.visibleChange.subscribe(spy);

      fixture.componentRef.setInput('visible', true);
      fixture.componentRef.setInput('maskClosable', true);
      fixture.detectChanges();
      tick(350);

      const backdrop = compiled.querySelector('.ds-drawer__backdrop') as HTMLElement;
      backdrop.click();
      tick(350);

      expect(spy).toHaveBeenCalledWith(false);
    }));

    it('should not close drawer on backdrop click when maskClosable is false', fakeAsync(() => {
      const spy = jasmine.createSpy('visibleChange');
      component.visibleChange.subscribe(spy);

      fixture.componentRef.setInput('visible', true);
      fixture.componentRef.setInput('maskClosable', false);
      fixture.detectChanges();
      tick(350);

      const backdrop = compiled.querySelector('.ds-drawer__backdrop') as HTMLElement;
      backdrop.click();
      tick(350);

      expect(spy).not.toHaveBeenCalled();
    }));
  });

  describe('Keyboard navigation', () => {
    it('should close drawer on Escape when closable is true', fakeAsync(() => {
      const spy = jasmine.createSpy('visibleChange');
      component.visibleChange.subscribe(spy);

      fixture.componentRef.setInput('visible', true);
      fixture.componentRef.setInput('closable', true);
      fixture.detectChanges();
      tick(350);

      const drawer = compiled.querySelector('.ds-drawer') as HTMLElement;
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      drawer.dispatchEvent(event);
      tick(350);

      expect(spy).toHaveBeenCalledWith(false);
    }));

    it('should not close drawer on Escape when closable is false', fakeAsync(() => {
      const spy = jasmine.createSpy('visibleChange');
      component.visibleChange.subscribe(spy);

      fixture.componentRef.setInput('visible', true);
      fixture.componentRef.setInput('closable', false);
      fixture.detectChanges();
      tick(350);

      const drawer = compiled.querySelector('.ds-drawer') as HTMLElement;
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      drawer.dispatchEvent(event);
      tick(350);

      expect(spy).not.toHaveBeenCalled();
    }));
  });

  describe('Content projection', () => {
    it('should render body content', fakeAsync(() => {
      fixture.componentRef.setInput('visible', true);
      fixture.detectChanges();
      tick(350);

      const body = compiled.querySelector('.ds-drawer__body');
      expect(body).toBeTruthy();
    }));

    it('should hide footer when empty', fakeAsync(() => {
      fixture.componentRef.setInput('visible', true);
      fixture.detectChanges();
      tick(350);

      const footer = compiled.querySelector('.ds-drawer__footer');
      const footerContent = footer?.querySelector('[drawer-footer]');
      expect(footerContent).toBeNull();
    }));
  });

  describe('Accessibility', () => {
    it('should have role="dialog"', fakeAsync(() => {
      fixture.componentRef.setInput('visible', true);
      fixture.detectChanges();
      tick(350);

      const drawer = compiled.querySelector('.ds-drawer');
      expect(drawer?.getAttribute('role')).toBe('dialog');
    }));

    it('should have aria-modal="true"', fakeAsync(() => {
      fixture.componentRef.setInput('visible', true);
      fixture.detectChanges();
      tick(350);

      const drawer = compiled.querySelector('.ds-drawer');
      expect(drawer?.getAttribute('aria-modal')).toBe('true');
    }));

    it('should have aria-label on close button', fakeAsync(() => {
      fixture.componentRef.setInput('visible', true);
      fixture.detectChanges();
      tick(350);

      const closeBtn = compiled.querySelector('.ds-drawer__close');
      expect(closeBtn?.getAttribute('aria-label')).toBe('Fermer');
    }));

    it('should have aria-hidden on backdrop', fakeAsync(() => {
      fixture.componentRef.setInput('visible', true);
      fixture.detectChanges();
      tick(350);

      const backdrop = compiled.querySelector('.ds-drawer__backdrop');
      expect(backdrop?.getAttribute('aria-hidden')).toBe('true');
    }));
  });
});
