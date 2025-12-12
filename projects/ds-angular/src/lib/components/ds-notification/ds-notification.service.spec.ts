import { TestBed } from '@angular/core/testing';
import { DsNotificationService } from './ds-notification.service';
import { faCircleInfo, faCircleCheck, faTriangleExclamation, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

describe('DsNotificationService', () => {
  let service: DsNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DsNotificationService);
  });

  afterEach(() => {
    service.closeAll();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('open()', () => {
    it('should add notification to stack', () => {
      const id = service.open({
        title: 'Test',
        message: 'Test message',
        duration: 0
      });

      expect(service.notifications$().length).toBe(1);
      expect(service.notifications$()[0].id).toBe(id);
      expect(service.notifications$()[0].title).toBe('Test');
    });

    it('should use custom id if provided', () => {
      service.open({
        id: 'custom-id',
        title: 'Test',
        message: 'Test message',
        duration: 0
      });

      expect(service.notifications$()[0].id).toBe('custom-id');
    });

    it('should generate unique id if not provided', () => {
      const id1 = service.open({ title: 'Test 1', message: 'Message 1', duration: 0 });
      const id2 = service.open({ title: 'Test 2', message: 'Message 2', duration: 0 });

      expect(id1).not.toBe(id2);
    });

    it('should set closable to true by default', () => {
      service.open({ title: 'Test', message: 'Test message', duration: 0 });
      expect(service.notifications$()[0].closable).toBe(true);
    });

    it('should set duration to 4500ms by default', () => {
      service.open({ title: 'Test', message: 'Test message' });
      expect(service.notifications$()[0].duration).toBe(4500);
    });

    it('should respect custom duration', () => {
      service.open({ title: 'Test', message: 'Test message', duration: 10000 });
      expect(service.notifications$()[0].duration).toBe(10000);
    });

    it('should auto-dismiss after duration', (done) => {
      service.open({
        title: 'Test',
        message: 'Test message',
        duration: 100
      });

      expect(service.notifications$().length).toBe(1);

      setTimeout(() => {
        expect(service.notifications$().length).toBe(0);
        done();
      }, 150);
    });

    it('should not auto-dismiss if duration is 0', (done) => {
      service.open({
        title: 'Test',
        message: 'Test message',
        duration: 0
      });

      expect(service.notifications$().length).toBe(1);

      setTimeout(() => {
        expect(service.notifications$().length).toBe(1);
        done();
      }, 150);
    });

    it('should set default icon for info type', () => {
      service.open({
        title: 'Test',
        message: 'Test message',
        type: 'info',
        duration: 0
      });

      expect(service.notifications$()[0].icon).toBe(faCircleInfo);
    });

    it('should set default icon for success type', () => {
      service.open({
        title: 'Test',
        message: 'Test message',
        type: 'success',
        duration: 0
      });

      expect(service.notifications$()[0].icon).toBe(faCircleCheck);
    });

    it('should set default icon for warning type', () => {
      service.open({
        title: 'Test',
        message: 'Test message',
        type: 'warning',
        duration: 0
      });

      expect(service.notifications$()[0].icon).toBe(faTriangleExclamation);
    });

    it('should set default icon for error type', () => {
      service.open({
        title: 'Test',
        message: 'Test message',
        type: 'error',
        duration: 0
      });

      expect(service.notifications$()[0].icon).toBe(faCircleXmark);
    });

    it('should use custom icon if provided', () => {
      const customIcon = faCircleInfo;
      service.open({
        title: 'Test',
        message: 'Test message',
        type: 'success',
        icon: customIcon,
        duration: 0
      });

      expect(service.notifications$()[0].icon).toBe(customIcon);
    });

    it('should add timestamp to notification', () => {
      const before = Date.now();
      service.open({ title: 'Test', message: 'Test message', duration: 0 });
      const after = Date.now();

      const timestamp = service.notifications$()[0].timestamp;
      expect(timestamp).toBeGreaterThanOrEqual(before);
      expect(timestamp).toBeLessThanOrEqual(after);
    });
  });

  describe('info()', () => {
    it('should create info notification', () => {
      service.info('Info Title', 'Info message', { duration: 0 });

      expect(service.notifications$().length).toBe(1);
      expect(service.notifications$()[0].title).toBe('Info Title');
      expect(service.notifications$()[0].message).toBe('Info message');
      expect(service.notifications$()[0].type).toBe('info');
      expect(service.notifications$()[0].icon).toBe(faCircleInfo);
    });
  });

  describe('success()', () => {
    it('should create success notification', () => {
      service.success('Success Title', 'Success message', { duration: 0 });

      expect(service.notifications$().length).toBe(1);
      expect(service.notifications$()[0].title).toBe('Success Title');
      expect(service.notifications$()[0].message).toBe('Success message');
      expect(service.notifications$()[0].type).toBe('success');
      expect(service.notifications$()[0].icon).toBe(faCircleCheck);
    });
  });

  describe('warning()', () => {
    it('should create warning notification', () => {
      service.warning('Warning Title', 'Warning message', { duration: 0 });

      expect(service.notifications$().length).toBe(1);
      expect(service.notifications$()[0].title).toBe('Warning Title');
      expect(service.notifications$()[0].message).toBe('Warning message');
      expect(service.notifications$()[0].type).toBe('warning');
      expect(service.notifications$()[0].icon).toBe(faTriangleExclamation);
    });
  });

  describe('error()', () => {
    it('should create error notification', () => {
      service.error('Error Title', 'Error message', { duration: 0 });

      expect(service.notifications$().length).toBe(1);
      expect(service.notifications$()[0].title).toBe('Error Title');
      expect(service.notifications$()[0].message).toBe('Error message');
      expect(service.notifications$()[0].type).toBe('error');
      expect(service.notifications$()[0].icon).toBe(faCircleXmark);
    });
  });

  describe('close()', () => {
    it('should remove notification by id', () => {
      const id1 = service.open({ title: 'Test 1', message: 'Message 1', duration: 0 });
      const id2 = service.open({ title: 'Test 2', message: 'Message 2', duration: 0 });

      expect(service.notifications$().length).toBe(2);

      service.close(id1);

      expect(service.notifications$().length).toBe(1);
      expect(service.notifications$()[0].id).toBe(id2);
    });

    it('should do nothing if id not found', () => {
      service.open({ title: 'Test', message: 'Message', duration: 0 });
      expect(service.notifications$().length).toBe(1);

      service.close('non-existent-id');

      expect(service.notifications$().length).toBe(1);
    });
  });

  describe('closeAll()', () => {
    it('should remove all notifications', () => {
      service.open({ title: 'Test 1', message: 'Message 1', duration: 0 });
      service.open({ title: 'Test 2', message: 'Message 2', duration: 0 });
      service.open({ title: 'Test 3', message: 'Message 3', duration: 0 });

      expect(service.notifications$().length).toBe(3);

      service.closeAll();

      expect(service.notifications$().length).toBe(0);
    });

    it('should do nothing if no notifications', () => {
      expect(service.notifications$().length).toBe(0);
      service.closeAll();
      expect(service.notifications$().length).toBe(0);
    });
  });

  describe('actions', () => {
    it('should include actions in notification config', () => {
      const handler = jasmine.createSpy('handler');
      service.open({
        title: 'Test',
        message: 'Test message',
        duration: 0,
        actions: [
          { label: 'Confirm', handler, variant: 'primary' },
          { label: 'Cancel', handler: () => {}, variant: 'secondary' }
        ]
      });

      const notification = service.notifications$()[0];
      expect(notification.actions).toBeDefined();
      expect(notification.actions!.length).toBe(2);
      expect(notification.actions![0].label).toBe('Confirm');
      expect(notification.actions![0].variant).toBe('primary');
    });
  });
});
