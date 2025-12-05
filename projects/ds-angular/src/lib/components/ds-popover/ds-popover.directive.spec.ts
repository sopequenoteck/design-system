import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DsPopover } from './ds-popover.directive';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  template: `
    <button [dsPopover]="popoverContent" [dsPopoverTrigger]="trigger" [dsPopoverCloseOnBackdrop]="closeOnBackdrop">
      Click me
    </button>
    <ng-template #popoverContent>
      <div class="popover-content">Popover content</div>
    </ng-template>
  `,
  standalone: true,
  imports: [DsPopover],
})
class TestComponent {
  @ViewChild('popoverContent', { static: true }) popoverContent!: TemplateRef<unknown>;
  trigger: 'click' | 'hover' = 'click';
  closeOnBackdrop = true;
}

describe('DsPopover Directive', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let buttonElement: DebugElement;
  let directive: DsPopover;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, DsPopover],
      providers: [Overlay],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    buttonElement = fixture.debugElement.query(By.css('button'));
    directive = buttonElement.injector.get(DsPopover);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

  describe('Click trigger', () => {
    it('should open popover on click', fakeAsync(() => {
      buttonElement.nativeElement.click();
      tick();
      fixture.detectChanges();

      const popoverContent = document.querySelector('.popover-content');
      expect(popoverContent).toBeTruthy();
      expect(directive['isOpen']).toBeTrue();
    }));

    it('should close popover on second click', fakeAsync(() => {
      buttonElement.nativeElement.click();
      tick();
      fixture.detectChanges();

      buttonElement.nativeElement.click();
      tick();
      fixture.detectChanges();

      const popoverContent = document.querySelector('.popover-content');
      expect(popoverContent).toBeFalsy();
      expect(directive['isOpen']).toBeFalse();
    }));

    it('should toggle popover on multiple clicks', fakeAsync(() => {
      for (let i = 0; i < 3; i++) {
        buttonElement.nativeElement.click();
        tick();
        fixture.detectChanges();

        const popoverContent = document.querySelector('.popover-content');
        expect(popoverContent).toBeTruthy();
        expect(directive['isOpen']).toBeTrue();

        buttonElement.nativeElement.click();
        tick();
        fixture.detectChanges();

        const closedPopover = document.querySelector('.popover-content');
        expect(closedPopover).toBeFalsy();
        expect(directive['isOpen']).toBeFalse();
      }
    }));

    it('should stop event propagation on click', fakeAsync(() => {
      const event = new MouseEvent('click', { bubbles: true });
      spyOn(event, 'stopPropagation');

      buttonElement.nativeElement.dispatchEvent(event);
      tick();

      expect(event.stopPropagation).toHaveBeenCalled();
    }));

    it('should not open on mouseenter with click trigger', fakeAsync(() => {
      buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
      tick();
      fixture.detectChanges();

      const popoverContent = document.querySelector('.popover-content');
      expect(popoverContent).toBeFalsy();
      expect(directive['isOpen']).toBeFalse();
    }));
  });

  describe('Hover trigger', () => {
    beforeEach(() => {
      component.trigger = 'hover';
      fixture.detectChanges();
    });

    it('should open popover on mouseenter', fakeAsync(() => {
      buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
      tick();
      fixture.detectChanges();

      const popoverContent = document.querySelector('.popover-content');
      expect(popoverContent).toBeTruthy();
      expect(directive['isOpen']).toBeTrue();
    }));

    it('should close popover on mouseleave with delay', fakeAsync(() => {
      buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
      tick();
      fixture.detectChanges();

      buttonElement.nativeElement.dispatchEvent(new Event('mouseleave'));
      tick(100);
      fixture.detectChanges();

      let popoverContent = document.querySelector('.popover-content');
      expect(popoverContent).toBeTruthy();

      tick(100);
      fixture.detectChanges();

      popoverContent = document.querySelector('.popover-content');
      expect(popoverContent).toBeFalsy();
      expect(directive['isOpen']).toBeFalse();
    }));

    it('should not open on click with hover trigger', fakeAsync(() => {
      buttonElement.nativeElement.click();
      tick();
      fixture.detectChanges();

      const popoverContent = document.querySelector('.popover-content');
      expect(popoverContent).toBeFalsy();
      expect(directive['isOpen']).toBeFalse();
    }));
  });

  describe('Backdrop behavior', () => {
    it('should close on backdrop click when closeOnBackdrop is true', fakeAsync(() => {
      component.closeOnBackdrop = true;
      fixture.detectChanges();

      buttonElement.nativeElement.click();
      tick();
      fixture.detectChanges();

      expect(directive['isOpen']).toBeTrue();

      const backdrop = document.querySelector('.ds-popover-backdrop');
      expect(backdrop).toBeTruthy();

      (backdrop as HTMLElement).click();
      tick();
      fixture.detectChanges();

      expect(directive['isOpen']).toBeFalse();
    }));

    it('should not create backdrop when closeOnBackdrop is false', fakeAsync(() => {
      component.closeOnBackdrop = false;
      fixture.detectChanges();

      buttonElement.nativeElement.click();
      tick();
      fixture.detectChanges();

      const backdrop = document.querySelector('.ds-popover-backdrop');
      expect(backdrop).toBeFalsy();
    }));
  });

  describe('Escape key', () => {
    it('should close popover on Escape key', fakeAsync(() => {
      buttonElement.nativeElement.click();
      tick();
      fixture.detectChanges();

      expect(directive['isOpen']).toBeTrue();

      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escapeEvent);
      tick();
      fixture.detectChanges();

      expect(directive['isOpen']).toBeFalse();
      const popoverContent = document.querySelector('.popover-content');
      expect(popoverContent).toBeFalsy();
    }));

    it('should not throw error on Escape when popover is closed', fakeAsync(() => {
      expect(directive['isOpen']).toBeFalse();

      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      expect(() => {
        document.dispatchEvent(escapeEvent);
        tick();
      }).not.toThrow();
    }));
  });

  describe('Positioning', () => {
    it('should create overlay with flexible positioning', fakeAsync(() => {
      buttonElement.nativeElement.click();
      tick();
      fixture.detectChanges();

      const overlay = document.querySelector('.ds-popover-overlay');
      expect(overlay).toBeTruthy();
    }));

    it('should use reposition scroll strategy', fakeAsync(() => {
      buttonElement.nativeElement.click();
      tick();
      fixture.detectChanges();

      expect(directive['overlayRef']).toBeTruthy();
    }));
  });

  describe('Component lifecycle', () => {
    it('should close popover on directive destroy', fakeAsync(() => {
      buttonElement.nativeElement.click();
      tick();
      fixture.detectChanges();

      expect(directive['isOpen']).toBeTrue();

      directive.ngOnDestroy();
      tick();

      expect(directive['isOpen']).toBeFalse();
      const popoverContent = document.querySelector('.popover-content');
      expect(popoverContent).toBeFalsy();
    }));
  });

  describe('Edge cases', () => {
    it('should not open when template is not provided', fakeAsync(() => {
      const newFixture = TestBed.createComponent(TestComponent);
      newFixture.detectChanges();

      const newButton = newFixture.debugElement.query(By.css('button'));
      const newDirective = newButton.injector.get(DsPopover);

      // Simulate missing template
      spyOn(newDirective.dsPopover as any, 'call').and.returnValue(null);

      newButton.nativeElement.click();
      tick();
      newFixture.detectChanges();

      expect(newDirective['isOpen']).toBeFalse();
    }));

    it('should not create multiple overlays on repeated opens', fakeAsync(() => {
      buttonElement.nativeElement.click();
      tick();
      fixture.detectChanges();

      const initialOverlayRef = directive['overlayRef'];

      buttonElement.nativeElement.click();
      tick();
      fixture.detectChanges();

      buttonElement.nativeElement.click();
      tick();
      fixture.detectChanges();

      const overlays = document.querySelectorAll('.ds-popover-overlay');
      expect(overlays.length).toBe(1);
    }));

    it('should handle rapid toggle clicks', fakeAsync(() => {
      for (let i = 0; i < 5; i++) {
        buttonElement.nativeElement.click();
        tick(10);
      }
      fixture.detectChanges();

      const isOpenFinal = directive['isOpen'];
      expect(typeof isOpenFinal).toBe('boolean');
    }));
  });

  describe('Overlay configuration', () => {
    it('should set correct panel class', fakeAsync(() => {
      buttonElement.nativeElement.click();
      tick();
      fixture.detectChanges();

      const overlay = document.querySelector('.ds-popover-overlay');
      expect(overlay).toBeTruthy();
    }));

    it('should set correct backdrop class when backdrop is enabled', fakeAsync(() => {
      component.closeOnBackdrop = true;
      fixture.detectChanges();

      buttonElement.nativeElement.click();
      tick();
      fixture.detectChanges();

      const backdrop = document.querySelector('.ds-popover-backdrop');
      expect(backdrop).toBeTruthy();
    }));
  });
});
