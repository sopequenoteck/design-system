import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsNotificationContainerComponent } from './ds-notification-container.component';
import { DsNotificationService } from './ds-notification.service';

describe('DsNotificationContainerComponent', () => {
  let component: DsNotificationContainerComponent;
  let fixture: ComponentFixture<DsNotificationContainerComponent>;
  let service: DsNotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsNotificationContainerComponent]
    }).compileComponents();

    service = TestBed.inject(DsNotificationService);
    fixture = TestBed.createComponent(DsNotificationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    service.closeAll();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('placement', () => {
    it('should default to topRight', () => {
      expect(component.placement()).toBe('topRight');
    });

    it('should apply topRight class', () => {
      const container = fixture.nativeElement.querySelector('.ds-notification-container--topRight');
      expect(container).toBeTruthy();
    });

    it('should apply topLeft class', () => {
      fixture.componentRef.setInput('placement', 'topLeft');
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-notification-container--topLeft');
      expect(container).toBeTruthy();
    });

    it('should apply bottomRight class', () => {
      fixture.componentRef.setInput('placement', 'bottomRight');
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-notification-container--bottomRight');
      expect(container).toBeTruthy();
    });

    it('should apply bottomLeft class', () => {
      fixture.componentRef.setInput('placement', 'bottomLeft');
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-notification-container--bottomLeft');
      expect(container).toBeTruthy();
    });
  });

  describe('maxStack', () => {
    it('should default to 5', () => {
      expect(component.maxStack()).toBe(5);
    });

    it('should respect custom maxStack', () => {
      fixture.componentRef.setInput('maxStack', 3);
      expect(component.maxStack()).toBe(3);
    });

    it('should limit visible notifications to maxStack', () => {
      fixture.componentRef.setInput('maxStack', 3);

      service.open({ title: 'N1', message: 'M1', duration: 0 });
      service.open({ title: 'N2', message: 'M2', duration: 0 });
      service.open({ title: 'N3', message: 'M3', duration: 0 });
      service.open({ title: 'N4', message: 'M4', duration: 0 });
      service.open({ title: 'N5', message: 'M5', duration: 0 });

      fixture.detectChanges();

      const items = fixture.nativeElement.querySelectorAll('ds-notification-item');
      expect(items.length).toBe(3);
    });

    it('should show most recent notifications when exceeding maxStack', () => {
      fixture.componentRef.setInput('maxStack', 2);

      service.open({ id: 'n1', title: 'N1', message: 'M1', duration: 0 });
      service.open({ id: 'n2', title: 'N2', message: 'M2', duration: 0 });
      service.open({ id: 'n3', title: 'N3', message: 'M3', duration: 0 });

      fixture.detectChanges();

      const visible = component.visibleNotifications();
      expect(visible.length).toBe(2);
      expect(visible[0].id).toBe('n2');
      expect(visible[1].id).toBe('n3');
    });
  });

  describe('notification rendering', () => {
    it('should render notification from service', () => {
      service.open({
        title: 'Test Notification',
        message: 'Test message',
        duration: 0
      });

      fixture.detectChanges();

      const item = fixture.nativeElement.querySelector('ds-notification-item');
      expect(item).toBeTruthy();
    });

    it('should render multiple notifications', () => {
      service.open({ title: 'N1', message: 'M1', duration: 0 });
      service.open({ title: 'N2', message: 'M2', duration: 0 });
      service.open({ title: 'N3', message: 'M3', duration: 0 });

      fixture.detectChanges();

      const items = fixture.nativeElement.querySelectorAll('ds-notification-item');
      expect(items.length).toBe(3);
    });

    it('should update when notifications added', () => {
      expect(fixture.nativeElement.querySelectorAll('ds-notification-item').length).toBe(0);

      service.open({ title: 'Test', message: 'Test', duration: 0 });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('ds-notification-item').length).toBe(1);
    });

    it('should update when notifications removed', () => {
      const id = service.open({ title: 'Test', message: 'Test', duration: 0 });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('ds-notification-item').length).toBe(1);

      service.close(id);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('ds-notification-item').length).toBe(0);
    });
  });

  describe('onClose()', () => {
    it('should call service.close() with notification id', () => {
      const spy = spyOn(service, 'close');
      component.onClose('test-id');
      expect(spy).toHaveBeenCalledWith('test-id');
    });
  });

  describe('computed signals', () => {
    it('should compute visibleNotifications correctly', () => {
      service.open({ id: 'n1', title: 'N1', message: 'M1', duration: 0 });
      service.open({ id: 'n2', title: 'N2', message: 'M2', duration: 0 });

      const visible = component.visibleNotifications();
      expect(visible.length).toBe(2);
      expect(visible[0].id).toBe('n1');
      expect(visible[1].id).toBe('n2');
    });

    it('should compute containerClasses correctly', () => {
      fixture.componentRef.setInput('placement', 'bottomLeft');

      const classes = component.containerClasses();
      expect(classes).toContain('ds-notification-container');
      expect(classes).toContain('ds-notification-container--bottomLeft');
    });
  });

  describe('integration', () => {
    it('should handle complete notification lifecycle', () => {
      // Open notification
      const id = service.open({
        title: 'Test',
        message: 'Test message',
        type: 'info',
        duration: 0
      });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('ds-notification-item').length).toBe(1);

      // Close notification
      service.close(id);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('ds-notification-item').length).toBe(0);
    });

    it('should handle closeAll', () => {
      service.open({ title: 'N1', message: 'M1', duration: 0 });
      service.open({ title: 'N2', message: 'M2', duration: 0 });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('ds-notification-item').length).toBe(2);

      service.closeAll();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('ds-notification-item').length).toBe(0);
    });
  });
});
