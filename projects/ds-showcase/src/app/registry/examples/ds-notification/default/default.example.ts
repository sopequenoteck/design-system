import { Component, input, inject } from '@angular/core';
import { DsNotificationContainerComponent, DsNotificationService } from 'ds-angular';

@Component({
  selector: 'example-ds-notification-default',
  standalone: true,
  imports: [DsNotificationContainerComponent],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsNotificationDefaultExample {
  type = input<'info' | 'success' | 'warning' | 'error'>('info');
  duration = input<number>(4500);

  private notificationService = inject(DsNotificationService);

  showNotification(): void {
    this.notificationService.open({
      title: 'Notification',
      message: 'Ceci est un message de notification.',
      type: this.type(),
      duration: this.duration(),
    });
  }
}
