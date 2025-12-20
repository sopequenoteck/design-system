import { Component, input } from '@angular/core';
import { PrimitiveInput } from 'ds-angular';

@Component({
  selector: 'example-primitive-input-default',
  standalone: true,
  imports: [PrimitiveInput],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class PrimitiveInputDefaultExample {
  type = input<'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date'>('text');
  state = input<'default' | 'success' | 'warning' | 'error'>('default');
  size = input<'sm' | 'md' | 'lg'>('md');
  disabled = input<boolean>(false);
}
