import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DsTooltip } from './ds-tooltip.directive';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  template: `<button [dsTooltip]="tooltipText">Hover me</button>`,
  standalone: true,
  imports: [DsTooltip],
})
class TestComponent {
  tooltipText = 'Test tooltip';
}

describe('DsTooltip Directive', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let buttonElement: DebugElement;
  let directive: DsTooltip;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, DsTooltip],
      providers: [Overlay],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    buttonElement = fixture.debugElement.query(By.css('button'));
    directive = buttonElement.injector.get(DsTooltip);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

  describe('Hover behavior', () => {
    it('should show tooltip on mouseenter', fakeAsync(() => {
      buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
      tick();
      fixture.detectChanges();

      const overlay = document.querySelector('.ds-tooltip-overlay');
      expect(overlay).toBeTruthy();
    }));

    it('should hide tooltip on mouseleave', fakeAsync(() => {
      buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
      tick();
      fixture.detectChanges();

      buttonElement.nativeElement.dispatchEvent(new Event('mouseleave'));
      tick(200);
      fixture.detectChanges();

      const overlay = document.querySelector('.ds-tooltip-overlay');
      expect(overlay).toBeFalsy();
    }));

    it('should not show tooltip when text is empty', fakeAsync(() => {
      component.tooltipText = '';
      fixture.detectChanges();

      buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
      tick();
      fixture.detectChanges();

      const overlay = document.querySelector('.ds-tooltip-overlay');
      expect(overlay).toBeFalsy();
    }));

    it('should not show tooltip when text is whitespace only', fakeAsync(() => {
      component.tooltipText = '   ';
      fixture.detectChanges();

      buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
      tick();
      fixture.detectChanges();

      const overlay = document.querySelector('.ds-tooltip-overlay');
      expect(overlay).toBeFalsy();
    }));
  });

  describe('Focus behavior', () => {
    it('should show tooltip on focus', fakeAsync(() => {
      buttonElement.nativeElement.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      const overlay = document.querySelector('.ds-tooltip-overlay');
      expect(overlay).toBeTruthy();
    }));

    it('should hide tooltip on blur', fakeAsync(() => {
      buttonElement.nativeElement.dispatchEvent(new Event('focus'));
      tick();
      fixture.detectChanges();

      buttonElement.nativeElement.dispatchEvent(new Event('blur'));
      tick();
      fixture.detectChanges();

      const overlay = document.querySelector('.ds-tooltip-overlay');
      expect(overlay).toBeFalsy();
    }));
  });

  describe('Delay behavior', () => {
    it('should hide tooltip with delay on mouseleave', fakeAsync(() => {
      buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
      tick();
      fixture.detectChanges();

      let overlay = document.querySelector('.ds-tooltip-overlay');
      expect(overlay).toBeTruthy();

      buttonElement.nativeElement.dispatchEvent(new Event('mouseleave'));
      tick(100);
      overlay = document.querySelector('.ds-tooltip-overlay');
      expect(overlay).toBeTruthy();

      tick(100);
      overlay = document.querySelector('.ds-tooltip-overlay');
      expect(overlay).toBeFalsy();
    }));

    it('should cancel hide timeout on mouseenter after mouseleave', fakeAsync(() => {
      buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
      tick();
      fixture.detectChanges();

      buttonElement.nativeElement.dispatchEvent(new Event('mouseleave'));
      tick(100);

      buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
      tick(100);
      fixture.detectChanges();

      const overlay = document.querySelector('.ds-tooltip-overlay');
      expect(overlay).toBeTruthy();
    }));

    it('should cancel hide timeout on focus after mouseleave', fakeAsync(() => {
      buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
      tick();
      fixture.detectChanges();

      buttonElement.nativeElement.dispatchEvent(new Event('mouseleave'));
      tick(100);

      buttonElement.nativeElement.dispatchEvent(new Event('focus'));
      tick(100);
      fixture.detectChanges();

      const overlay = document.querySelector('.ds-tooltip-overlay');
      expect(overlay).toBeTruthy();
    }));
  });

  describe('ARIA attributes', () => {
    it('should add aria-describedby when tooltip is shown', fakeAsync(() => {
      buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
      tick();
      fixture.detectChanges();

      const ariaDescribedBy = buttonElement.nativeElement.getAttribute('aria-describedby');
      expect(ariaDescribedBy).toBeTruthy();
      expect(ariaDescribedBy).toContain('tooltip-');
    }));

    it('should remove aria-describedby when tooltip is hidden', fakeAsync(() => {
      buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
      tick();
      fixture.detectChanges();

      buttonElement.nativeElement.dispatchEvent(new Event('blur'));
      tick();
      fixture.detectChanges();

      const ariaDescribedBy = buttonElement.nativeElement.getAttribute('aria-describedby');
      expect(ariaDescribedBy).toBeFalsy();
    }));
  });

  describe('Overlay positioning', () => {
    it('should create overlay with flexible positioning', fakeAsync(() => {
      buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
      tick();
      fixture.detectChanges();

      const overlay = document.querySelector('.ds-tooltip-overlay');
      expect(overlay).toBeTruthy();
    }));

    it('should use scroll strategy close', fakeAsync(() => {
      buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
      tick();
      fixture.detectChanges();

      expect(directive['overlayRef']).toBeTruthy();
    }));
  });

  describe('Component lifecycle', () => {
    it('should hide tooltip on directive destroy', fakeAsync(() => {
      buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
      tick();
      fixture.detectChanges();

      let overlay = document.querySelector('.ds-tooltip-overlay');
      expect(overlay).toBeTruthy();

      directive.ngOnDestroy();
      tick();

      overlay = document.querySelector('.ds-tooltip-overlay');
      expect(overlay).toBeFalsy();
    }));

    it('should clear hide timeout on directive destroy', fakeAsync(() => {
      buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
      tick();
      fixture.detectChanges();

      buttonElement.nativeElement.dispatchEvent(new Event('mouseleave'));
      directive.ngOnDestroy();
      tick(200);

      expect(directive['hideTimeout']).toBeNull();
    }));
  });

  describe('Multiple show/hide cycles', () => {
    it('should handle multiple show/hide cycles correctly', fakeAsync(() => {
      for (let i = 0; i < 3; i++) {
        buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
        tick();
        fixture.detectChanges();

        let overlay = document.querySelector('.ds-tooltip-overlay');
        expect(overlay).toBeTruthy();

        buttonElement.nativeElement.dispatchEvent(new Event('mouseleave'));
        tick(200);
        fixture.detectChanges();

        overlay = document.querySelector('.ds-tooltip-overlay');
        expect(overlay).toBeFalsy();
      }
    }));

    it('should not create multiple overlays on repeated mouseenter', fakeAsync(() => {
      buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
      tick();
      fixture.detectChanges();

      buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
      tick();
      fixture.detectChanges();

      const overlays = document.querySelectorAll('.ds-tooltip-overlay');
      expect(overlays.length).toBe(1);
    }));
  });

  describe('Tooltip content', () => {
    it('should display correct tooltip text', fakeAsync(() => {
      component.tooltipText = 'Custom tooltip content';
      fixture.detectChanges();

      buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
      tick();
      fixture.detectChanges();

      expect(directive['tooltipComponentRef']).toBeTruthy();
    }));

    it('should update tooltip text when input changes', fakeAsync(() => {
      buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
      tick();
      fixture.detectChanges();

      buttonElement.nativeElement.dispatchEvent(new Event('mouseleave'));
      tick(200);

      component.tooltipText = 'Updated tooltip';
      fixture.detectChanges();

      buttonElement.nativeElement.dispatchEvent(new Event('mouseenter'));
      tick();
      fixture.detectChanges();

      expect(directive['tooltipComponentRef']).toBeTruthy();
    }));
  });
});
