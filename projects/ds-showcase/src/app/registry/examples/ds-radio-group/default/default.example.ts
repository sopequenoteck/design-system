import { Component, input } from '@angular/core';
import { DsRadioGroup } from 'ds-angular';

@Component({
  selector: 'example-ds-radio-group-default',
  standalone: true,
  imports: [DsRadioGroup],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsRadioGroupDefaultExample {
  label = input<string>('Choisissez une option');
  size = input<'sm' | 'md' | 'lg'>('md');
  layout = input<'vertical' | 'horizontal'>('vertical');
  disabled = input<boolean>(false);
  required = input<boolean>(false);

  options = [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
    { label: 'Option C', value: 'c' }
  ];
}
