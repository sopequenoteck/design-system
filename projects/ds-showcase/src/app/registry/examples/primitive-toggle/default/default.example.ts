import { Component, input } from '@angular/core';
import { PrimitiveToggle } from 'ds-angular';

@Component({
  selector: 'example-primitive-toggle-default',
  standalone: true,
  imports: [PrimitiveToggle],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class PrimitiveToggleDefaultExample {
  label = input<string>('Activer la fonctionnalité');
  labelPosition = input<'left' | 'right'>('right');
  size = input<'sm' | 'md' | 'lg'>('md');
  disabled = input<boolean>(false);
}
