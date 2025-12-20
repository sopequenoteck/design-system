import { Component, input } from '@angular/core';
import { DsSkeleton } from 'ds-angular';

@Component({
  selector: 'example-ds-skeleton-default',
  standalone: true,
  imports: [DsSkeleton],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsSkeletonDefaultExample {
  variant = input<'text' | 'circle' | 'rectangle' | 'card'>('text');
  size = input<'sm' | 'md' | 'lg'>('md');
  lines = input<number>(1);
}
