import { Component, input } from '@angular/core';
import { DsToggle } from 'ds-angular';

@Component({
  selector: 'example-ds-toggle-default',
  standalone: true,
  imports: [DsToggle],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsToggleDefaultExample {
  label = input<string>('Activer la fonctionnalité');
  labelPosition = input<'left' | 'right'>('right');
  size = input<'sm' | 'md' | 'lg'>('md');
  disabled = input<boolean>(false);
}
