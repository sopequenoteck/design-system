import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Overlay } from '@angular/cdk/overlay';
import { DsTooltip } from './ds-tooltip.directive';
import { DsTooltipComponent } from './ds-tooltip.component';

@Component({
  standalone: true,
  imports: [DsTooltip],
  template: `<button [dsTooltip]="tooltipText">Hover me</button>`,
})
class TestHostComponent {
  tooltipText = 'Test tooltip';
}

describe('DsTooltip', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;
  let buttonElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, DsTooltip, DsTooltipComponent],
      providers: [Overlay],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show tooltip on mouseenter', (done) => {
    buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();

    setTimeout(() => {
      const tooltip = document.querySelector('.ds-tooltip');
      expect(tooltip).toBeTruthy();
      done();
    }, 100);
  });

  it('should hide tooltip on mouseleave', (done) => {
    buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();

    setTimeout(() => {
      let tooltip = document.querySelector('.ds-tooltip');
      expect(tooltip).toBeTruthy();

      buttonElement.dispatchEvent(new MouseEvent('mouseleave'));
      fixture.detectChanges();

      setTimeout(() => {
        tooltip = document.querySelector('.ds-tooltip');
        expect(tooltip).toBeFalsy();
        done();
      }, 200);
    }, 100);
  });

  it('should show tooltip on focus', (done) => {
    buttonElement.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    setTimeout(() => {
      const tooltip = document.querySelector('.ds-tooltip');
      expect(tooltip).toBeTruthy();
      done();
    }, 100);
  });

  it('should hide tooltip on blur', (done) => {
    buttonElement.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    setTimeout(() => {
      buttonElement.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();

      setTimeout(() => {
        const tooltip = document.querySelector('.ds-tooltip');
        expect(tooltip).toBeFalsy();
        done();
      }, 100);
    }, 100);
  });

  it('should set aria-describedby on host element when tooltip is shown', (done) => {
    buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();

    setTimeout(() => {
      const ariaDescribedBy = buttonElement.getAttribute('aria-describedby');
      expect(ariaDescribedBy).toBeTruthy();
      expect(ariaDescribedBy).toContain('tooltip-');
      done();
    }, 100);
  });

  it('should not show tooltip if text is empty', () => {
    component.tooltipText = '';
    fixture.detectChanges();

    buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();

    const tooltip = document.querySelector('.ds-tooltip');
    expect(tooltip).toBeFalsy();
  });
});
