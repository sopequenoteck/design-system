import { Component, input } from '@angular/core';
import { DsBadge } from 'ds-angular';

@Component({
  selector: 'example-ds-badge-default',
  standalone: true,
  imports: [DsBadge],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsBadgeDefaultExample {
  type = input<'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'>('default');
  size = input<'sm' | 'md' | 'lg'>('md');
  variant = input<'solid' | 'outline'>('solid');
  shape = input<'default' | 'pill' | 'square'>('default');
}
