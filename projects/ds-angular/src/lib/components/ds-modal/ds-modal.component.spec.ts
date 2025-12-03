import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DsModalComponent} from './ds-modal.component';
import {FocusTrapFactory} from '@angular/cdk/a11y';
import {By} from '@angular/platform-browser';

class MockFocusTrap {
  focusInitialElementWhenReady() {
    return Promise.resolve();
  }

  destroy() {}
}

class MockFocusTrapFactory {
  create() {
    return new MockFocusTrap();
  }
}

describe('DsModalComponent', () => {
  let component: DsModalComponent;
  let fixture: ComponentFixture<DsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsModalComponent],
      providers: [
        { provide: FocusTrapFactory, useClass: MockFocusTrapFactory },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    document.body.classList.remove('modal-open');
  });

  it('should render header when open', () => {
    fixture.componentRef.setInput('open', true);
    fixture.componentRef.setInput('title', 'Modal title');
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('h3'));
    expect(title.nativeElement.textContent).toContain('Modal title');
  });

  it('should emit closed when close button clicked', () => {
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();

    const spy = spyOn(component.closed, 'emit');
    const button = fixture.debugElement.query(By.css('primitive-button button'));
    button.nativeElement.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should render default icon when showIcon true', () => {
    fixture.componentRef.setInput('open', true);
    fixture.componentRef.setInput('showIcon', true);
    fixture.componentRef.setInput('type', 'success');
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('.modal-icon fa-icon'));
    expect(icon).toBeTruthy();
  });

  it('should respect closeOnBackdrop input', () => {
    fixture.componentRef.setInput('open', true);
    fixture.componentRef.setInput('closeOnBackdrop', false);
    fixture.detectChanges();

    const overlay = fixture.debugElement.query(By.css('.overlay'));
    overlay.triggerEventHandler('click');
    fixture.detectChanges();

    expect(component.open()).toBeTrue();
  });

  it('should toggle body scroll class based on open state', () => {
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();
    expect(document.body.classList.contains('modal-open')).toBeTrue();

    fixture.componentRef.setInput('open', false);
    fixture.detectChanges();
    expect(document.body.classList.contains('modal-open')).toBeFalse();
  });
});
