import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsNotificationService } from './ds-notification.service';
import { DsNotificationItemComponent } from './ds-notification-item.component';
import { NotificationPlacement } from './ds-notification.types';

@Component({
  selector: 'ds-notification-container',
  standalone: true,
  imports: [CommonModule, DsNotificationItemComponent],
  template: `
    <div [class]="containerClasses()">
      @for (notification of visibleNotifications(); track notification.id) {
        <ds-notification-item
          [notification]="notification"
          (closeClick)="onClose($event)"
          class="ds-notification-wrapper"
        />
      }
    </div>
  `,
  styleUrls: ['./ds-notification.component.scss']
})
export class DsNotificationContainerComponent {
  private readonly notificationService = inject(DsNotificationService);

  placement = input<NotificationPlacement>('topRight');
  maxStack = input<number>(5);

  readonly notifications = this.notificationService.notifications$;

  readonly visibleNotifications = computed(() => {
    const all = this.notifications();
    const max = this.maxStack();
    return all.slice(-max);
  });

  readonly containerClasses = computed(() => {
    const classes = ['ds-notification-container'];
    classes.push(`ds-notification-container--${this.placement()}`);
    return classes.join(' ');
  });

  onClose(id: string): void {
    this.notificationService.close(id);
  }
}
