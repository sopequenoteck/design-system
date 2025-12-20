import { Component, input } from '@angular/core';
import { DsStepper, Step } from 'ds-angular';

@Component({
  selector: 'example-ds-stepper-default',
  standalone: true,
  imports: [DsStepper],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsStepperDefaultExample {
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  size = input<'sm' | 'md' | 'lg'>('md');
  clickable = input<boolean>(true);

  steps: Step[] = [
    { label: 'Information' },
    { label: 'Paiement' },
    { label: 'Confirmation' }
  ];
}
