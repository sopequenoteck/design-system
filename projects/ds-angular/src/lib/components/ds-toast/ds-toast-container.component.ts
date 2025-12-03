import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsToastComponent } from './ds-toast.component';
import { DsToastService, ToastInstance, ToastPosition } from './ds-toast.service';

@Component({
  selector: 'ds-toast-container',
  standalone: true,
  imports: [CommonModule, DsToastComponent],
  templateUrl: './ds-toast-container.component.html',
  styleUrl: './ds-toast-container.component.scss',
})
export class DsToastContainerComponent {
  private readonly toastService = inject(DsToastService);

  protected readonly positions: ToastPosition[] = ['top-right', 'top-left', 'bottom-right', 'bottom-left'];

  protected readonly groupedToasts = computed<Record<ToastPosition, ToastInstance[]>>(() => {
    const groups: Record<ToastPosition, ToastInstance[]> = {
      'top-left': [],
      'top-right': [],
      'bottom-left': [],
      'bottom-right': [],
    };

    for (const toast of this.toastService.toasts()) {
      groups[toast.position].push(toast);
    }

    return groups;
  });

  dismiss(id: string): void {
    this.toastService.dismiss(id);
  }

  handleAction(toast: ToastInstance): void {
    this.toastService.triggerAction(toast.id);
  }
}
