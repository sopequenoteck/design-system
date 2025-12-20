import { Component, input } from '@angular/core';
import { DsCard } from 'ds-angular';

@Component({
  selector: 'example-ds-card-default',
  standalone: true,
  imports: [DsCard],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsCardDefaultExample {
  variant = input<'default' | 'elevated' | 'outlined'>('default');
  size = input<'sm' | 'md' | 'lg'>('md');
  clickable = input<boolean>(false);
  disabled = input<boolean>(false);
}
