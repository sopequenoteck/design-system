import { Component, input } from '@angular/core';
import { DsButton, ButtonVariant, ButtonAppearance, ButtonSize } from 'ds-angular';

@Component({
  selector: 'example-button-default',
  standalone: true,
  imports: [DsButton],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class ButtonDefaultExample {
  variant = input<ButtonVariant>('primary');
  appearance = input<ButtonAppearance>('solid');
  size = input<ButtonSize>('md');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
}
