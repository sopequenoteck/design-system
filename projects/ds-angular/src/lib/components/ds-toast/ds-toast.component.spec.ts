import {ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {DsToastComponent} from './ds-toast.component';
import {By} from '@angular/platform-browser';

describe('DsToastComponent', () => {
  let component: DsToastComponent;
  let fixture: ComponentFixture<DsToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsToastComponent],
    }).compileComponents();
  });

  function createComponent(): void {
    fixture = TestBed.createComponent(DsToastComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('message', 'Hello world');
    fixture.detectChanges();
  }

  it('should render message and icon', () => {
    createComponent();
    const message = fixture.debugElement.query(By.css('.message'));
    expect(message.nativeElement.textContent).toContain('Hello world');
    expect(fixture.debugElement.query(By.css('.icon'))).toBeTruthy();
  });

  it('should emit closed when close button clicked', () => {
    createComponent();
    const spy = spyOn(component.closed, 'emit');
    const button = fixture.debugElement.query(By.css('.close-btn'));
    button.nativeElement.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should auto dismiss after duration', fakeAsync(() => {
    createComponent();
    const spy = spyOn(component.closed, 'emit');
    fixture.componentRef.setInput('duration', 10);
    fixture.detectChanges();

    tick(10);
    expect(spy).toHaveBeenCalled();
  }));

  it('should pause dismissal on hover when enabled', fakeAsync(() => {
    fixture = TestBed.createComponent(DsToastComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('message', 'Hello world');

    const timers = new Map<number, () => void>();
    let nextId = 1;
    const timeoutSpy = spyOn(window, 'setTimeout').and.callFake(
      ((handler: TimerHandler, timeout?: number, ...args: unknown[]) => {
        const id = nextId++;
        const callback = typeof handler === 'function' ? handler : () => {};
        timers.set(id, () => callback(...args));
        return id;
      }) as typeof setTimeout,
    );
    const clearTimeoutSpy = spyOn(window, 'clearTimeout').and.callFake(((id?: number | string) => {
      if (typeof id === 'number') {
        timers.delete(id);
      }
    }) as typeof clearTimeout);

    fixture.componentRef.setInput('duration', 20);
    fixture.componentRef.setInput('pauseOnHover', true);
    fixture.detectChanges();

    expect(timeoutSpy).toHaveBeenCalled();

    component.onMouseEnter();
    expect(clearTimeoutSpy).toHaveBeenCalled();

    component.onMouseLeave();
    expect(timeoutSpy.calls.count()).toBeGreaterThan(1);
  }));

  it('should emit action when action button clicked', () => {
    createComponent();
    const spy = spyOn(component.action, 'emit');
    fixture.componentRef.setInput('actionLabel', 'Undo');
    fixture.detectChanges();

    const actionBtn = fixture.debugElement.query(By.css('.action-btn'));
    actionBtn.nativeElement.click();

    expect(spy).toHaveBeenCalled();
  });
});
