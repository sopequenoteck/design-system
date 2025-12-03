import { TestBed } from '@angular/core/testing';
import { DsToastService } from './ds-toast.service';
import { fakeAsync, tick } from '@angular/core/testing';

describe('DsToastService', () => {
  let service: DsToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DsToastService);
  });

  it('should add toast with defaults', () => {
    const id = service.show({ message: 'Hello world' });

    expect(id).toBeTruthy();
    expect(service.toasts().length).toBe(1);
    expect(service.toasts()[0].message).toBe('Hello world');
  });

  it('should dismiss toast manually', () => {
    const id = service.show({ message: 'Dismiss me' });

    service.dismiss(id);

    expect(service.toasts().length).toBe(0);
  });

  it('should auto-dismiss toast after duration', fakeAsync(() => {
    service.show({ message: 'Timed toast', duration: 50 });
    expect(service.toasts().length).toBe(1);

    tick(100);

    expect(service.toasts().length).toBe(0);
  }));

  it('should clear only the selected position', () => {
    service.show({ message: 'Top right', position: 'top-right', duration: 0 });
    service.show({ message: 'Bottom left', position: 'bottom-left', duration: 0 });

    service.clear('top-right');

    expect(service.toasts().length).toBe(1);
    expect(service.toasts()[0].position).toBe('bottom-left');
  });

  it('should limit stack per position', () => {
    service.show({ message: 'First', position: 'top-right', duration: 0, maxStack: 2 });
    service.show({ message: 'Second', position: 'top-right', duration: 0, maxStack: 2 });
    service.show({ message: 'Third', position: 'top-right', duration: 0, maxStack: 2 });

    expect(service.toasts().length).toBe(2);
    expect(service.toasts()[0].message).toBe('Second');
    expect(service.toasts()[1].message).toBe('Third');
  });

  it('should trigger toast action and dismiss', () => {
    const actionSpy = jasmine.createSpy('action');
    const id = service.show({ message: 'Action toast', onAction: actionSpy, actionLabel: 'Undo', duration: 0 });

    service.triggerAction(id);

    expect(actionSpy).toHaveBeenCalled();
    expect(service.toasts().length).toBe(0);
  });
});
