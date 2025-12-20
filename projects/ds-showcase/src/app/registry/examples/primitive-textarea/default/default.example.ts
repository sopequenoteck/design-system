import { Component, input } from '@angular/core';
import { PrimitiveTextarea } from 'ds-angular';

@Component({
  selector: 'example-primitive-textarea-default',
  standalone: true,
  imports: [PrimitiveTextarea],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class PrimitiveTextareaDefaultExample {
  state = input<'default' | 'success' | 'warning' | 'error'>('default');
  size = input<'sm' | 'md' | 'lg'>('md');
  resize = input<'none' | 'vertical' | 'horizontal' | 'both'>('vertical');
  disabled = input<boolean>(false);
}
