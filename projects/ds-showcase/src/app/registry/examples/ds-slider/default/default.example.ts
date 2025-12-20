import { Component, input } from '@angular/core';
import { DsSlider } from 'ds-angular';

@Component({
  selector: 'example-ds-slider-default',
  standalone: true,
  imports: [DsSlider],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsSliderDefaultExample {
  min = input<number>(0);
  max = input<number>(100);
  step = input<number>(1);
  size = input<'sm' | 'md' | 'lg'>('md');
  disabled = input<boolean>(false);
  showLabels = input<boolean>(false);
}
