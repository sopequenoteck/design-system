import { Injectable, signal } from '@angular/core';
import { NotificationConfig, NotificationItem } from './ds-notification.types';
import { faCircleInfo, faCircleCheck, faTriangleExclamation, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class DsNotificationService {
  private readonly notifications = signal<NotificationItem[]>([]);
  private nextId = 1;

  readonly notifications$ = this.notifications.asReadonly();

  open(config: NotificationConfig): string {
    const id = config.id || `notification-${this.nextId++}`;

    const notification: NotificationItem = {
      ...config,
      id,
      timestamp: Date.now(),
      closable: config.closable ?? true,
      duration: config.duration ?? 4500
    };

    // Set default icons based on type
    if (!notification.icon && notification.type) {
      notification.icon = this.getDefaultIcon(notification.type);
    }

    this.notifications.update(items => [...items, notification]);

    // Auto-dismiss if duration > 0
    if (notification.duration && notification.duration > 0) {
      setTimeout(() => {
        this.close(id);
      }, notification.duration);
    }

    return id;
  }

  info(title: string, message: string, config?: Partial<NotificationConfig>): string {
    return this.open({
      ...config,
      title,
      message,
      type: 'info'
    });
  }

  success(title: string, message: string, config?: Partial<NotificationConfig>): string {
    return this.open({
      ...config,
      title,
      message,
      type: 'success'
    });
  }

  warning(title: string, message: string, config?: Partial<NotificationConfig>): string {
    return this.open({
      ...config,
      title,
      message,
      type: 'warning'
    });
  }

  error(title: string, message: string, config?: Partial<NotificationConfig>): string {
    return this.open({
      ...config,
      title,
      message,
      type: 'error'
    });
  }

  close(id: string): void {
    this.notifications.update(items => items.filter(item => item.id !== id));
  }

  closeAll(): void {
    this.notifications.set([]);
  }

  private getDefaultIcon(type: string) {
    switch (type) {
      case 'info':
        return faCircleInfo;
      case 'success':
        return faCircleCheck;
      case 'warning':
        return faTriangleExclamation;
      case 'error':
        return faCircleXmark;
      default:
        return faCircleInfo;
    }
  }
}
