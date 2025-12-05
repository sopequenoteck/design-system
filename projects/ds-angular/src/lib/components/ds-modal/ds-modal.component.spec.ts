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

  it('should apply size class sm', () => {
    fixture.componentRef.setInput('open', true);
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();

    const modal = fixture.debugElement.query(By.css('.modal'));
    expect(modal.nativeElement.classList.contains('modal-sm')).toBeTrue();
  });

  it('should apply size class md', () => {
    fixture.componentRef.setInput('open', true);
    fixture.componentRef.setInput('size', 'md');
    fixture.detectChanges();

    const modal = fixture.debugElement.query(By.css('.modal'));
    expect(modal.nativeElement.classList.contains('modal-md')).toBeTrue();
  });

  it('should apply size class lg', () => {
    fixture.componentRef.setInput('open', true);
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();

    const modal = fixture.debugElement.query(By.css('.modal'));
    expect(modal.nativeElement.classList.contains('modal-lg')).toBeTrue();
  });

  it('should apply type class success', () => {
    fixture.componentRef.setInput('open', true);
    fixture.componentRef.setInput('type', 'success');
    fixture.detectChanges();

    const modal = fixture.debugElement.query(By.css('.modal'));
    expect(modal.nativeElement.classList.contains('modal-success')).toBeTrue();
  });

  it('should apply type class warning', () => {
    fixture.componentRef.setInput('open', true);
    fixture.componentRef.setInput('type', 'warning');
    fixture.detectChanges();

    const modal = fixture.debugElement.query(By.css('.modal'));
    expect(modal.nativeElement.classList.contains('modal-warning')).toBeTrue();
  });

  it('should apply type class error', () => {
    fixture.componentRef.setInput('open', true);
    fixture.componentRef.setInput('type', 'error');
    fixture.detectChanges();

    const modal = fixture.debugElement.query(By.css('.modal'));
    expect(modal.nativeElement.classList.contains('modal-error')).toBeTrue();
  });

  it('should apply type class info', () => {
    fixture.componentRef.setInput('open', true);
    fixture.componentRef.setInput('type', 'info');
    fixture.detectChanges();

    const modal = fixture.debugElement.query(By.css('.modal'));
    expect(modal.nativeElement.classList.contains('modal-info')).toBeTrue();
  });

  it('should emit opened when modal opens', () => {
    const spy = spyOn(component.opened, 'emit');
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should emit closed when closed', () => {
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();

    const spy = spyOn(component.closed, 'emit');
    component.close();

    expect(spy).toHaveBeenCalled();
  });

  it('should close on ESC key when closable is true', () => {
    fixture.componentRef.setInput('open', true);
    fixture.componentRef.setInput('closable', true);
    fixture.detectChanges();

    const spy = spyOn(component.closed, 'emit');
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    spyOn(event, 'preventDefault');

    component.handleEscape(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

  it('should not close on ESC key when closable is false', () => {
    fixture.componentRef.setInput('open', true);
    fixture.componentRef.setInput('closable', false);
    fixture.detectChanges();

    const spy = spyOn(component.closed, 'emit');
    const event = new KeyboardEvent('keydown', { key: 'Escape' });

    component.handleEscape(event);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should close on backdrop click when closeOnBackdrop is true', () => {
    fixture.componentRef.setInput('open', true);
    fixture.componentRef.setInput('closeOnBackdrop', true);
    fixture.detectChanges();

    const spy = spyOn(component.closed, 'emit');
    const overlay = fixture.debugElement.query(By.css('.overlay'));
    overlay.triggerEventHandler('click');

    expect(spy).toHaveBeenCalled();
  });

  it('should not close on backdrop click when closeOnBackdrop is false', () => {
    fixture.componentRef.setInput('open', true);
    fixture.componentRef.setInput('closeOnBackdrop', false);
    fixture.detectChanges();

    const spy = spyOn(component.closed, 'emit');
    const overlay = fixture.debugElement.query(By.css('.overlay'));
    overlay.triggerEventHandler('click');

    expect(spy).not.toHaveBeenCalled();
  });

  it('should not close when closable is false', () => {
    fixture.componentRef.setInput('open', true);
    fixture.componentRef.setInput('closable', false);
    fixture.detectChanges();

    const spy = spyOn(component.closed, 'emit');
    component.close();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should hide close button when closable is false', () => {
    fixture.componentRef.setInput('open', true);
    fixture.componentRef.setInput('closable', false);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.close-btn'));
    expect(button).toBeNull();
  });

  it('should show close button when closable is true', () => {
    fixture.componentRef.setInput('open', true);
    fixture.componentRef.setInput('closable', true);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.close-btn'));
    expect(button).toBeTruthy();
  });

  it('should render warning icon when type is warning and showIcon is true', () => {
    fixture.componentRef.setInput('open', true);
    fixture.componentRef.setInput('type', 'warning');
    fixture.componentRef.setInput('showIcon', true);
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('.modal-icon fa-icon'));
    expect(icon).toBeTruthy();
  });

  it('should render error icon when type is error and showIcon is true', () => {
    fixture.componentRef.setInput('open', true);
    fixture.componentRef.setInput('type', 'error');
    fixture.componentRef.setInput('showIcon', true);
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('.modal-icon fa-icon'));
    expect(icon).toBeTruthy();
  });

  it('should render info icon when type is info and showIcon is true', () => {
    fixture.componentRef.setInput('open', true);
    fixture.componentRef.setInput('type', 'info');
    fixture.componentRef.setInput('showIcon', true);
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('.modal-icon fa-icon'));
    expect(icon).toBeTruthy();
  });

  it('should not render icon when showIcon is false', () => {
    fixture.componentRef.setInput('open', true);
    fixture.componentRef.setInput('type', 'success');
    fixture.componentRef.setInput('showIcon', false);
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('.modal-icon fa-icon'));
    expect(icon).toBeNull();
  });

  it('should unlock body scroll on destroy', () => {
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();
    expect(document.body.classList.contains('modal-open')).toBeTrue();

    fixture.destroy();
    expect(document.body.classList.contains('modal-open')).toBeFalse();
  });

  it('should not render when open is false', () => {
    fixture.componentRef.setInput('open', false);
    fixture.detectChanges();

    const overlay = fixture.debugElement.query(By.css('.overlay'));
    expect(overlay).toBeNull();
  });

  it('should have unique modal title id', () => {
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();

    expect(component.modalTitleId).toContain('-title');
    expect(component.modalDescId).toContain('-desc');
  });

  it('should update isScrolled signal on scroll', () => {
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();

    const mockEvent = {
      target: {
        scrollHeight: 1000,
        clientHeight: 500,
        scrollTop: 100
      }
    } as any;

    component.onScroll(mockEvent);
    expect(component.isScrolled()).toBeTrue();
  });

  it('should not be scrolled when content fits', () => {
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();

    const mockEvent = {
      target: {
        scrollHeight: 500,
        clientHeight: 500,
        scrollTop: 0
      }
    } as any;

    component.onScroll(mockEvent);
    expect(component.isScrolled()).toBeFalse();
  });
});
