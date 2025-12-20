import { Component, input } from '@angular/core';
import { DsProgressBar } from 'ds-angular';

@Component({
  selector: 'example-ds-progress-bar-default',
  standalone: true,
  imports: [DsProgressBar],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsProgressBarDefaultExample {
  value = input<number>(50);
  variant = input<'default' | 'success' | 'warning' | 'error'>('default');
  size = input<'sm' | 'md' | 'lg'>('md');
  showLabel = input<boolean>(false);
}
