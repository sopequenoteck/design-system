import { Component, input } from '@angular/core';
import { DsInputNumber } from 'ds-angular';

@Component({
  selector: 'example-ds-input-number-default',
  standalone: true,
  imports: [DsInputNumber],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsInputNumberDefaultExample {
  min = input<number>(0);
  max = input<number>(100);
  step = input<number>(1);
  disabled = input<boolean>(false);
}
