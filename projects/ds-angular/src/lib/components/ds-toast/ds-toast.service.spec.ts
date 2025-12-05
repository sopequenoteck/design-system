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

  it('should set type to success', () => {
    service.show({ message: 'Success toast', type: 'success', duration: 0 });

    expect(service.toasts()[0].type).toBe('success');
  });

  it('should set type to warning', () => {
    service.show({ message: 'Warning toast', type: 'warning', duration: 0 });

    expect(service.toasts()[0].type).toBe('warning');
  });

  it('should set type to error', () => {
    service.show({ message: 'Error toast', type: 'error', duration: 0 });

    expect(service.toasts()[0].type).toBe('error');
  });

  it('should set type to info by default', () => {
    service.show({ message: 'Info toast', duration: 0 });

    expect(service.toasts()[0].type).toBe('info');
  });

  it('should set custom duration', () => {
    service.show({ message: 'Custom duration', duration: 5000 });

    expect(service.toasts()[0].duration).toBe(5000);
  });

  it('should use default duration when not specified', () => {
    service.show({ message: 'Default duration' });

    expect(service.toasts()[0].duration).toBe(3000);
  });

  it('should set closable to false', () => {
    service.show({ message: 'Not closable', closable: false, duration: 0 });

    expect(service.toasts()[0].closable).toBe(false);
  });

  it('should set closable to true by default', () => {
    service.show({ message: 'Default closable', duration: 0 });

    expect(service.toasts()[0].closable).toBe(true);
  });

  it('should set position to top-left', () => {
    service.show({ message: 'Top left', position: 'top-left', duration: 0 });

    expect(service.toasts()[0].position).toBe('top-left');
  });

  it('should set position to bottom-left', () => {
    service.show({ message: 'Bottom left', position: 'bottom-left', duration: 0 });

    expect(service.toasts()[0].position).toBe('bottom-left');
  });

  it('should set position to bottom-right', () => {
    service.show({ message: 'Bottom right', position: 'bottom-right', duration: 0 });

    expect(service.toasts()[0].position).toBe('bottom-right');
  });

  it('should use top-right as default position', () => {
    service.show({ message: 'Default position', duration: 0 });

    expect(service.toasts()[0].position).toBe('top-right');
  });

  it('should clear all toasts when no position specified', () => {
    service.show({ message: 'Toast 1', position: 'top-right', duration: 0 });
    service.show({ message: 'Toast 2', position: 'bottom-left', duration: 0 });
    service.show({ message: 'Toast 3', position: 'top-left', duration: 0 });

    service.clear();

    expect(service.toasts().length).toBe(0);
  });

  it('should not dismiss non-existent toast', () => {
    service.show({ message: 'Toast', duration: 0 });

    service.dismiss('non-existent-id');

    expect(service.toasts().length).toBe(1);
  });

  it('should not trigger action for non-existent toast', () => {
    const actionSpy = jasmine.createSpy('action');
    service.show({ message: 'Toast', onAction: actionSpy, duration: 0 });

    service.triggerAction('non-existent-id');

    expect(actionSpy).not.toHaveBeenCalled();
    expect(service.toasts().length).toBe(1);
  });

  it('should respect pauseOnHover true', () => {
    service.show({ message: 'Pause on hover', pauseOnHover: true, duration: 0 });

    expect(service.toasts()[0].pauseOnHover).toBe(true);
  });

  it('should respect pauseOnHover false', () => {
    service.show({ message: 'No pause', pauseOnHover: false, duration: 0 });

    expect(service.toasts()[0].pauseOnHover).toBe(false);
  });

  it('should use default maxStack of 4', () => {
    service.show({ message: '1', position: 'top-right', duration: 0 });
    service.show({ message: '2', position: 'top-right', duration: 0 });
    service.show({ message: '3', position: 'top-right', duration: 0 });
    service.show({ message: '4', position: 'top-right', duration: 0 });
    service.show({ message: '5', position: 'top-right', duration: 0 });

    expect(service.toasts().length).toBe(4);
  });

  it('should limit stack to different positions independently', () => {
    service.show({ message: 'TR1', position: 'top-right', duration: 0, maxStack: 2 });
    service.show({ message: 'TR2', position: 'top-right', duration: 0, maxStack: 2 });
    service.show({ message: 'BL1', position: 'bottom-left', duration: 0, maxStack: 2 });
    service.show({ message: 'TR3', position: 'top-right', duration: 0, maxStack: 2 });

    const topRight = service.toasts().filter(t => t.position === 'top-right');
    const bottomLeft = service.toasts().filter(t => t.position === 'bottom-left');

    expect(topRight.length).toBe(2);
    expect(bottomLeft.length).toBe(1);
  });

  it('should not auto-dismiss when duration is 0', fakeAsync(() => {
    service.show({ message: 'No auto-dismiss', duration: 0 });

    tick(5000);

    expect(service.toasts().length).toBe(1);
  }));

  it('should preserve action label and callback', () => {
    const callback = jasmine.createSpy('callback');
    service.show({
      message: 'With action',
      actionLabel: 'Undo',
      onAction: callback,
      duration: 0
    });

    expect(service.toasts()[0].actionLabel).toBe('Undo');
    expect(service.toasts()[0].onAction).toBe(callback);
  });

  it('should generate unique ids for each toast', () => {
    const id1 = service.show({ message: 'Toast 1', duration: 0 });
    const id2 = service.show({ message: 'Toast 2', duration: 0 });

    expect(id1).not.toBe(id2);
  });

  it('should return correct toast signal as readonly', () => {
    const toastsSignal = service.toasts;

    expect(typeof toastsSignal).toBe('function');
  });

  it('should handle multiple toasts with different durations', fakeAsync(() => {
    service.show({ message: 'Fast', duration: 50 });
    service.show({ message: 'Slow', duration: 150 });

    expect(service.toasts().length).toBe(2);

    tick(75);
    expect(service.toasts().length).toBe(1);
    expect(service.toasts()[0].message).toBe('Slow');

    tick(100);
    expect(service.toasts().length).toBe(0);
  }));
});
