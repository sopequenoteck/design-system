import { Component, input } from '@angular/core';
import { PrimitiveRadio } from 'ds-angular';

@Component({
  selector: 'example-primitive-radio-default',
  standalone: true,
  imports: [PrimitiveRadio],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class PrimitiveRadioDefaultExample {
  label = input<string>('Option A');
  size = input<'sm' | 'md' | 'lg'>('md');
  disabled = input<boolean>(false);
}
