import { Component, input } from '@angular/core';
import { DsAlert } from 'ds-angular';

@Component({
  selector: 'example-ds-alert-default',
  standalone: true,
  imports: [DsAlert],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsAlertDefaultExample {
  type = input<'success' | 'warning' | 'error' | 'info'>('info');
  size = input<'sm' | 'md' | 'lg'>('md');
  showIcon = input<boolean>(true);
  closable = input<boolean>(false);

  onClose(): void {
    console.log('Alert closed');
  }
}
