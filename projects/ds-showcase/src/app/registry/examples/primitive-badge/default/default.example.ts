import { Component, input } from '@angular/core';
import { PrimitiveBadge } from 'ds-angular';

@Component({
  selector: 'example-primitive-badge-default',
  standalone: true,
  imports: [PrimitiveBadge],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class PrimitiveBadgeDefaultExample {
  variant = input<'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'>('primary');
  size = input<'sm' | 'md' | 'lg'>('md');
  shape = input<'rounded' | 'pill'>('rounded');
  appearance = input<'solid' | 'outline'>('solid');
}
