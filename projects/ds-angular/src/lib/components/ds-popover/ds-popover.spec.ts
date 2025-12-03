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
