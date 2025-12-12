import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsNotificationItemComponent } from './ds-notification-item.component';
import { NotificationItem } from './ds-notification.types';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

describe('DsNotificationItemComponent', () => {
  let component: DsNotificationItemComponent;
  let fixture: ComponentFixture<DsNotificationItemComponent>;

  const mockNotification: NotificationItem = {
    id: 'test-1',
    title: 'Test Notification',
    message: 'Test message',
    type: 'info',
    timestamp: Date.now(),
    closable: true
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsNotificationItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DsNotificationItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('notification', mockNotification);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('template rendering', () => {
    it('should render notification title', () => {
      const title = fixture.nativeElement.querySelector('.ds-notification__title');
      expect(title.textContent).toContain('Test Notification');
    });

    it('should render notification message', () => {
      const message = fixture.nativeElement.querySelector('.ds-notification__message');
      expect(message.textContent).toContain('Test message');
    });

    it('should render icon if provided', () => {
      fixture.componentRef.setInput('notification', {
        ...mockNotification,
        icon: faCircleInfo
      });
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('.ds-notification__icon');
      expect(icon).toBeTruthy();
    });

    it('should not render icon if not provided', () => {
      fixture.componentRef.setInput('notification', {
        ...mockNotification,
        icon: undefined
      });
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('.ds-notification__icon');
      expect(icon).toBeFalsy();
    });

    it('should render close button if closable', () => {
      const closeButton = fixture.nativeElement.querySelector('.ds-notification__close');
      expect(closeButton).toBeTruthy();
    });

    it('should not render close button if not closable', () => {
      fixture.componentRef.setInput('notification', {
        ...mockNotification,
        closable: false
      });
      fixture.detectChanges();

      const closeButton = fixture.nativeElement.querySelector('.ds-notification__close');
      expect(closeButton).toBeFalsy();
    });

    it('should render actions if provided', () => {
      fixture.componentRef.setInput('notification', {
        ...mockNotification,
        actions: [
          { label: 'Confirm', handler: () => {}, variant: 'primary' },
          { label: 'Cancel', handler: () => {}, variant: 'secondary' }
        ]
      });
      fixture.detectChanges();

      const actions = fixture.nativeElement.querySelectorAll('.ds-notification__action');
      expect(actions.length).toBe(2);
      expect(actions[0].textContent.trim()).toBe('Confirm');
      expect(actions[1].textContent.trim()).toBe('Cancel');
    });

    it('should not render actions section if no actions', () => {
      const actionsSection = fixture.nativeElement.querySelector('.ds-notification__actions');
      expect(actionsSection).toBeFalsy();
    });
  });

  describe('CSS classes', () => {
    it('should have base class', () => {
      const notification = fixture.nativeElement.querySelector('.ds-notification');
      expect(notification).toBeTruthy();
    });

    it('should have type class for info', () => {
      const notification = fixture.nativeElement.querySelector('.ds-notification--info');
      expect(notification).toBeTruthy();
    });

    it('should have type class for success', () => {
      fixture.componentRef.setInput('notification', {
        ...mockNotification,
        type: 'success'
      });
      fixture.detectChanges();

      const notification = fixture.nativeElement.querySelector('.ds-notification--success');
      expect(notification).toBeTruthy();
    });

    it('should have type class for warning', () => {
      fixture.componentRef.setInput('notification', {
        ...mockNotification,
        type: 'warning'
      });
      fixture.detectChanges();

      const notification = fixture.nativeElement.querySelector('.ds-notification--warning');
      expect(notification).toBeTruthy();
    });

    it('should have type class for error', () => {
      fixture.componentRef.setInput('notification', {
        ...mockNotification,
        type: 'error'
      });
      fixture.detectChanges();

      const notification = fixture.nativeElement.querySelector('.ds-notification--error');
      expect(notification).toBeTruthy();
    });
  });

  describe('ARIA attributes', () => {
    it('should have role="alert"', () => {
      const notification = fixture.nativeElement.querySelector('[role="alert"]');
      expect(notification).toBeTruthy();
    });

    it('should have aria-live="polite" for non-error notifications', () => {
      const notification = fixture.nativeElement.querySelector('.ds-notification');
      expect(notification.getAttribute('aria-live')).toBe('polite');
    });

    it('should have aria-live="assertive" for error notifications', () => {
      fixture.componentRef.setInput('notification', {
        ...mockNotification,
        type: 'error'
      });
      fixture.detectChanges();

      const notification = fixture.nativeElement.querySelector('.ds-notification');
      expect(notification.getAttribute('aria-live')).toBe('assertive');
    });

    it('should have aria-atomic="true"', () => {
      const notification = fixture.nativeElement.querySelector('.ds-notification');
      expect(notification.getAttribute('aria-atomic')).toBe('true');
    });

    it('should have aria-label on close button', () => {
      const closeButton = fixture.nativeElement.querySelector('.ds-notification__close');
      expect(closeButton.getAttribute('aria-label')).toBe('Fermer la notification');
    });

    it('should have aria-hidden on icon', () => {
      fixture.componentRef.setInput('notification', {
        ...mockNotification,
        icon: faCircleInfo
      });
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('.ds-notification__icon');
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('interactions', () => {
    it('should emit closeClick when close button clicked', () => {
      const closeSpy = jasmine.createSpy('closeClick');
      component.closeClick.subscribe(closeSpy);

      const closeButton = fixture.nativeElement.querySelector('.ds-notification__close');
      closeButton.click();

      expect(closeSpy).toHaveBeenCalledWith('test-1');
    });

    it('should call action handler when action button clicked', () => {
      const handler = jasmine.createSpy('handler');
      fixture.componentRef.setInput('notification', {
        ...mockNotification,
        actions: [
          { label: 'Confirm', handler, variant: 'primary' }
        ]
      });
      fixture.detectChanges();

      const actionButton = fixture.nativeElement.querySelector('.ds-notification__action');
      actionButton.click();

      expect(handler).toHaveBeenCalled();
    });

    it('should emit actionClick when action button clicked', () => {
      const handler = jasmine.createSpy('handler');
      const actionClickSpy = jasmine.createSpy('actionClick');
      component.actionClick.subscribe(actionClickSpy);

      fixture.componentRef.setInput('notification', {
        ...mockNotification,
        actions: [
          { label: 'Confirm', handler, variant: 'primary' }
        ]
      });
      fixture.detectChanges();

      const actionButton = fixture.nativeElement.querySelector('.ds-notification__action');
      actionButton.click();

      expect(actionClickSpy).toHaveBeenCalledWith({
        id: 'test-1',
        actionIndex: 0
      });
    });

    it('should handle multiple actions correctly', () => {
      const handler1 = jasmine.createSpy('handler1');
      const handler2 = jasmine.createSpy('handler2');

      fixture.componentRef.setInput('notification', {
        ...mockNotification,
        actions: [
          { label: 'Confirm', handler: handler1, variant: 'primary' },
          { label: 'Cancel', handler: handler2, variant: 'secondary' }
        ]
      });
      fixture.detectChanges();

      const actionButtons = fixture.nativeElement.querySelectorAll('.ds-notification__action');

      actionButtons[0].click();
      expect(handler1).toHaveBeenCalled();
      expect(handler2).not.toHaveBeenCalled();

      actionButtons[1].click();
      expect(handler2).toHaveBeenCalled();
    });
  });

  describe('action variants', () => {
    it('should apply primary variant class', () => {
      fixture.componentRef.setInput('notification', {
        ...mockNotification,
        actions: [
          { label: 'Confirm', handler: () => {}, variant: 'primary' }
        ]
      });
      fixture.detectChanges();

      const action = fixture.nativeElement.querySelector('.ds-notification__action--primary');
      expect(action).toBeTruthy();
    });

    it('should apply secondary variant class', () => {
      fixture.componentRef.setInput('notification', {
        ...mockNotification,
        actions: [
          { label: 'Cancel', handler: () => {}, variant: 'secondary' }
        ]
      });
      fixture.detectChanges();

      const action = fixture.nativeElement.querySelector('.ds-notification__action--secondary');
      expect(action).toBeTruthy();
    });

    it('should apply ghost variant class', () => {
      fixture.componentRef.setInput('notification', {
        ...mockNotification,
        actions: [
          { label: 'Dismiss', handler: () => {}, variant: 'ghost' }
        ]
      });
      fixture.detectChanges();

      const action = fixture.nativeElement.querySelector('.ds-notification__action--ghost');
      expect(action).toBeTruthy();
    });

    it('should default to secondary variant if not specified', () => {
      fixture.componentRef.setInput('notification', {
        ...mockNotification,
        actions: [
          { label: 'Action', handler: () => {} }
        ]
      });
      fixture.detectChanges();

      const action = fixture.nativeElement.querySelector('.ds-notification__action--secondary');
      expect(action).toBeTruthy();
    });
  });
});
