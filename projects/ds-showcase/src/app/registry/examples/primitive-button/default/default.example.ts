import { Component, input } from '@angular/core';
import { PrimitiveButton, ButtonVariant, ButtonSize, ButtonAppearance } from 'ds-angular';

@Component({
  selector: 'example-primitive-button-default',
  standalone: true,
  imports: [PrimitiveButton],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class PrimitiveButtonDefaultExample {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  appearance = input<ButtonAppearance>('solid');
  disabled = input<boolean>(false);
  block = input<boolean>(false);
}
