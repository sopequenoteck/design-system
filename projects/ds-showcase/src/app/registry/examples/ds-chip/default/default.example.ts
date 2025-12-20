import { Component, input } from '@angular/core';
import { DsChip } from 'ds-angular';

@Component({
  selector: 'example-ds-chip-default',
  standalone: true,
  imports: [DsChip],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsChipDefaultExample {
  variant = input<'filled' | 'outlined'>('filled');
  size = input<'sm' | 'md' | 'lg'>('md');
  color = input<'default' | 'primary' | 'success' | 'warning' | 'error'>('default');
  removable = input<boolean>(false);
  clickable = input<boolean>(false);
}
