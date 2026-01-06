import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Overlay } from '@angular/cdk/overlay';
import { DsPopover } from './ds-popover.directive';
import { DsPopoverComponent } from './ds-popover.component';

@Component({
  standalone: true,
  imports: [DsPopover, DsPopoverComponent],
  template: `
    <button [dsPopover]="popoverTemplate">Open Popover</button>

    <ng-template #popoverTemplate>
      <ds-popover [header]="'Popover Header'" [closeable]="true">
        <p>Popover content goes here</p>
      </ds-popover>
    </ng-template>
  `,
})
class TestHostComponent {
  @ViewChild('popoverTemplate', { static: true })
  popoverTemplate!: TemplateRef<unknown>;
}

describe('DsPopover', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;
  let buttonElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, DsPopover, DsPopoverComponent],
      providers: [Overlay],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
  });

  afterEach(() => {
    // Clean up any popovers/overlays left in the DOM to prevent memory leaks
    document.querySelectorAll('.ds-popover').forEach((el) => el.remove());
    document.querySelectorAll('.ds-popover-backdrop').forEach((el) => el.remove());
    document.querySelectorAll('.cdk-overlay-container').forEach((el) => {
      el.innerHTML = '';
    });
    fixture?.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open popover on click', (done) => {
    buttonElement.click();
    fixture.detectChanges();

    setTimeout(() => {
      const popover = document.querySelector('.ds-popover');
      expect(popover).toBeTruthy();
      done();
    }, 100);
  });

  it('should close popover on second click', (done) => {
    buttonElement.click();
    fixture.detectChanges();

    setTimeout(() => {
      let popover = document.querySelector('.ds-popover');
      expect(popover).toBeTruthy();

      buttonElement.click();
      fixture.detectChanges();

      setTimeout(() => {
        popover = document.querySelector('.ds-popover');
        expect(popover).toBeFalsy();
        done();
      }, 100);
    }, 100);
  });

  it('should close popover on Escape key', (done) => {
    buttonElement.click();
    fixture.detectChanges();

    setTimeout(() => {
      let popover = document.querySelector('.ds-popover');
      expect(popover).toBeTruthy();

      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escapeEvent);
      fixture.detectChanges();

      setTimeout(() => {
        popover = document.querySelector('.ds-popover');
        expect(popover).toBeFalsy();
        done();
      }, 100);
    }, 100);
  });

  it('should close popover on backdrop click when closeOnBackdrop is true', (done) => {
    buttonElement.click();
    fixture.detectChanges();

    setTimeout(() => {
      const popover = document.querySelector('.ds-popover');
      expect(popover).toBeTruthy();

      const backdrop = document.querySelector('.ds-popover-backdrop') as HTMLElement;
      if (backdrop) {
        backdrop.click();
        fixture.detectChanges();

        setTimeout(() => {
          const popoverAfter = document.querySelector('.ds-popover');
          expect(popoverAfter).toBeFalsy();
          done();
        }, 100);
      } else {
        done();
      }
    }, 100);
  });

  it('should render popover with header and content', (done) => {
    buttonElement.click();
    fixture.detectChanges();

    setTimeout(() => {
      const header = document.querySelector('.ds-popover__header-title');
      expect(header?.textContent).toContain('Popover Header');

      const body = document.querySelector('.ds-popover__body');
      expect(body?.textContent).toContain('Popover content goes here');
      done();
    }, 100);
  });

  it('should render close button when closeable is true', (done) => {
    buttonElement.click();
    fixture.detectChanges();

    setTimeout(() => {
      const closeButton = document.querySelector('.ds-popover__close');
      expect(closeButton).toBeTruthy();
      done();
    }, 100);
  });
});

// ============================================
// TESTS DsPopoverComponent EN ISOLATION
// Ajoutés par ds-component-review
// ============================================

describe('DsPopoverComponent', () => {
  let component: DsPopoverComponent;
  let fixture: ComponentFixture<DsPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsPopoverComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DsPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture?.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render ds-popover container with role="dialog"', () => {
      const popover = fixture.debugElement.query(By.css('.ds-popover'));
      expect(popover).toBeTruthy();
      expect(popover.nativeElement.getAttribute('role')).toBe('dialog');
    });

    it('should have aria-modal="true"', () => {
      const popover = fixture.debugElement.query(By.css('.ds-popover'));
      expect(popover.nativeElement.getAttribute('aria-modal')).toBe('true');
    });

    it('should set aria-label when no header provided', () => {
      const popover = fixture.debugElement.query(By.css('.ds-popover'));
      expect(popover.nativeElement.getAttribute('aria-label')).toBe('Popover');
      expect(popover.nativeElement.getAttribute('aria-labelledby')).toBeNull();
    });

    it('should use custom aria-label when provided (no header)', () => {
      fixture.componentRef.setInput('ariaLabel', 'Menu utilisateur');
      fixture.detectChanges();

      const popover = fixture.debugElement.query(By.css('.ds-popover'));
      expect(popover.nativeElement.getAttribute('aria-label')).toBe('Menu utilisateur');
    });

    it('should use aria-labelledby when header is provided', () => {
      fixture.componentRef.setInput('header', 'Mon titre');
      fixture.detectChanges();

      const popover = fixture.debugElement.query(By.css('.ds-popover'));
      expect(popover.nativeElement.getAttribute('aria-label')).toBeNull();
      expect(popover.nativeElement.getAttribute('aria-labelledby')).toContain('-header');
    });

    it('should always render body for content projection', () => {
      const body = fixture.debugElement.query(By.css('.ds-popover__body'));
      expect(body).toBeTruthy();
    });
  });

  describe('Header', () => {
    it('should not render header when not provided', () => {
      const header = fixture.debugElement.query(By.css('.ds-popover__header'));
      expect(header).toBeFalsy();
    });

    it('should render header when provided', () => {
      fixture.componentRef.setInput('header', 'Mon titre');
      fixture.detectChanges();

      const header = fixture.debugElement.query(By.css('.ds-popover__header'));
      expect(header).toBeTruthy();
    });

    it('should display header title text', () => {
      fixture.componentRef.setInput('header', 'Titre du popover');
      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('.ds-popover__header-title'));
      expect(title.nativeElement.textContent).toBe('Titre du popover');
    });
  });

  describe('Close button', () => {
    it('should render close button when header and closeable are true', () => {
      fixture.componentRef.setInput('header', 'Titre');
      fixture.componentRef.setInput('closeable', true);
      fixture.detectChanges();

      const closeBtn = fixture.debugElement.query(By.css('.ds-popover__close'));
      expect(closeBtn).toBeTruthy();
    });

    it('should not render close button when closeable is false', () => {
      fixture.componentRef.setInput('header', 'Titre');
      fixture.componentRef.setInput('closeable', false);
      fixture.detectChanges();

      const closeBtn = fixture.debugElement.query(By.css('.ds-popover__close'));
      expect(closeBtn).toBeFalsy();
    });

    it('should not render close button when header is missing', () => {
      fixture.componentRef.setInput('closeable', true);
      fixture.detectChanges();

      const closeBtn = fixture.debugElement.query(By.css('.ds-popover__close'));
      expect(closeBtn).toBeFalsy();
    });

    it('should have dynamic aria-label on close button with header', () => {
      fixture.componentRef.setInput('header', 'Mon popover');
      fixture.componentRef.setInput('closeable', true);
      fixture.detectChanges();

      const closeBtn = fixture.debugElement.query(By.css('.ds-popover__close'));
      expect(closeBtn.nativeElement.getAttribute('aria-label')).toBe('Fermer Mon popover');
    });

    it('should set header title id for aria-labelledby', () => {
      fixture.componentRef.setInput('header', 'Titre');
      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('.ds-popover__header-title'));
      expect(title.nativeElement.id).toContain('-header');
    });

    it('should emit close event when close button clicked', () => {
      fixture.componentRef.setInput('header', 'Titre');
      fixture.componentRef.setInput('closeable', true);
      fixture.detectChanges();

      const closeSpy = spyOn(component.close, 'emit');
      const closeBtn = fixture.debugElement.query(By.css('.ds-popover__close'));
      closeBtn.nativeElement.click();

      expect(closeSpy).toHaveBeenCalled();
    });
  });

  describe('Footer', () => {
    it('should not render footer when not provided', () => {
      const footer = fixture.debugElement.query(By.css('.ds-popover__footer'));
      expect(footer).toBeFalsy();
    });

    it('should render footer when provided', () => {
      fixture.componentRef.setInput('footer', 'Texte du footer');
      fixture.detectChanges();

      const footer = fixture.debugElement.query(By.css('.ds-popover__footer'));
      expect(footer).toBeTruthy();
      expect(footer.nativeElement.textContent.trim()).toBe('Texte du footer');
    });
  });

  describe('Default values', () => {
    it('should have closeable true by default', () => {
      expect(component.closeable()).toBe(true);
    });

    it('should have ariaLabel "Popover" by default', () => {
      expect(component.ariaLabel()).toBe('Popover');
    });

    it('should have header undefined by default', () => {
      expect(component.header()).toBeUndefined();
    });

    it('should have footer undefined by default', () => {
      expect(component.footer()).toBeUndefined();
    });
  });

  describe('Combined scenarios', () => {
    it('should render header and footer together', () => {
      fixture.componentRef.setInput('header', 'Titre');
      fixture.componentRef.setInput('footer', 'Footer');
      fixture.detectChanges();

      const header = fixture.debugElement.query(By.css('.ds-popover__header'));
      const footer = fixture.debugElement.query(By.css('.ds-popover__footer'));

      expect(header).toBeTruthy();
      expect(footer).toBeTruthy();
    });

    it('should render only body when no header or footer', () => {
      const header = fixture.debugElement.query(By.css('.ds-popover__header'));
      const footer = fixture.debugElement.query(By.css('.ds-popover__footer'));
      const body = fixture.debugElement.query(By.css('.ds-popover__body'));

      expect(header).toBeFalsy();
      expect(footer).toBeFalsy();
      expect(body).toBeTruthy();
    });
  });
});
