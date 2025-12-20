import { Component, input } from '@angular/core';
import { DsColorPicker } from 'ds-angular';

@Component({
  selector: 'example-ds-color-picker-default',
  standalone: true,
  imports: [DsColorPicker],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsColorPickerDefaultExample {
  size = input<'sm' | 'md' | 'lg'>('md');
  showAlpha = input<boolean>(false);
  disabled = input<boolean>(false);
  format = input<'hex' | 'rgb' | 'hsl'>('hex');
}
