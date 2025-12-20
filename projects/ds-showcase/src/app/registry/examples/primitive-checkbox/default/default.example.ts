import { Component, input } from '@angular/core';
import { PrimitiveCheckbox } from 'ds-angular';

@Component({
  selector: 'example-primitive-checkbox-default',
  standalone: true,
  imports: [PrimitiveCheckbox],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class PrimitiveCheckboxDefaultExample {
  label = input<string>("J'accepte les conditions");
  size = input<'sm' | 'md' | 'lg'>('md');
  disabled = input<boolean>(false);
  indeterminate = input<boolean>(false);
}
