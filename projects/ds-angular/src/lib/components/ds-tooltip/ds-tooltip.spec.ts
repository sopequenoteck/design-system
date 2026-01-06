import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
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

  afterEach(() => {
    // Clean up any tooltips left in the DOM
    document.querySelectorAll('.ds-tooltip').forEach((el) => el.remove());
    document.querySelectorAll('.ds-tooltip-overlay').forEach((el) => el.remove());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show tooltip on mouseenter', fakeAsync(() => {
    buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    tick();

    const tooltip = document.querySelector('.ds-tooltip');
    expect(tooltip).toBeTruthy();

    flush();
  }));

  it('should hide tooltip on mouseleave', fakeAsync(() => {
    buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    tick();

    let tooltip = document.querySelector('.ds-tooltip');
    expect(tooltip).toBeTruthy();

    buttonElement.dispatchEvent(new MouseEvent('mouseleave'));
    fixture.detectChanges();
    tick(200); // hideWithDelay uses 150ms

    tooltip = document.querySelector('.ds-tooltip');
    expect(tooltip).toBeFalsy();

    flush();
  }));

  it('should show tooltip on focus', fakeAsync(() => {
    buttonElement.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    tick();

    const tooltip = document.querySelector('.ds-tooltip');
    expect(tooltip).toBeTruthy();

    flush();
  }));

  it('should hide tooltip on blur', fakeAsync(() => {
    buttonElement.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    tick();

    buttonElement.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();
    tick();

    const tooltip = document.querySelector('.ds-tooltip');
    expect(tooltip).toBeFalsy();

    flush();
  }));

  it('should set aria-describedby on host element when tooltip is shown', fakeAsync(() => {
    buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    tick();

    const ariaDescribedBy = buttonElement.getAttribute('aria-describedby');
    expect(ariaDescribedBy).toBeTruthy();
    expect(ariaDescribedBy).toContain('tooltip-');

    flush();
  }));

  it('should not show tooltip if text is empty', fakeAsync(() => {
    component.tooltipText = '';
    fixture.detectChanges();

    buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    tick();

    const tooltip = document.querySelector('.ds-tooltip');
    expect(tooltip).toBeFalsy();

    flush();
  }));
});
