import { Component, input, signal } from '@angular/core';
import { DsModalComponent, DsButton } from 'ds-angular';

@Component({
  selector: 'example-ds-modal-default',
  standalone: true,
  imports: [DsModalComponent, DsButton],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsModalDefaultExample {
  size = input<'sm' | 'md' | 'lg'>('md');
  closable = input<boolean>(true);
  closeOnBackdrop = input<boolean>(true);

  isOpen = signal(false);

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }
}
