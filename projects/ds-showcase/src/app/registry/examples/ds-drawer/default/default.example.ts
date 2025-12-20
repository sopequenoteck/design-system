import { Component, input } from '@angular/core';
import { DsDrawer, DsButton } from 'ds-angular';

@Component({
  selector: 'example-ds-drawer-default',
  standalone: true,
  imports: [DsDrawer, DsButton],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsDrawerDefaultExample {
  position = input<'left' | 'right'>('right');
  size = input<'sm' | 'md' | 'lg' | 'full'>('md');
  closable = input<boolean>(true);

  isOpen = false;

  open(): void {
    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
  }
}
