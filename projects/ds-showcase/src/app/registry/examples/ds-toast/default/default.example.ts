import { Component, input, inject } from '@angular/core';
import { DsToastContainerComponent, DsToastService, ToastType, ToastPosition } from 'ds-angular';

@Component({
  selector: 'example-ds-toast-default',
  standalone: true,
  imports: [DsToastContainerComponent],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsToastDefaultExample {
  type = input<ToastType>('info');
  position = input<ToastPosition>('top-right');
  duration = input<number>(3000);

  private toastService = inject(DsToastService);

  showToast(): void {
    this.toastService.show({
      message: 'Action effectuée avec succès',
      type: this.type(),
      position: this.position(),
      duration: this.duration(),
    });
  }
}
