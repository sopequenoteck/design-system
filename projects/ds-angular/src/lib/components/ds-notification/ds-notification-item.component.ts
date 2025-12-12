import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { NotificationItem } from './ds-notification.types';

@Component({
  selector: 'ds-notification-item',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './ds-notification-item.component.html',
  styleUrls: ['./ds-notification.component.scss']
})
export class DsNotificationItemComponent {
  notification = input.required<NotificationItem>();

  readonly closeClick = output<string>();
  readonly actionClick = output<{ id: string; actionIndex: number }>();

  readonly closeIcon = faXmark;

  readonly notificationClasses = (): string[] => {
    const classes = ['ds-notification'];

    const notification = this.notification();
    if (notification.type) {
      classes.push(`ds-notification--${notification.type}`);
    }

    return classes;
  };

  onClose(): void {
    this.closeClick.emit(this.notification().id);
  }

  onActionClick(index: number): void {
    const notification = this.notification();
    if (notification.actions && notification.actions[index]) {
      notification.actions[index].handler();
      this.actionClick.emit({ id: notification.id, actionIndex: index });
    }
  }
}
