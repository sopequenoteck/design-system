import { Component, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DsSegmentedControl, SegmentOption } from 'ds-angular';

@Component({
  selector: 'example-ds-segmented-control-default',
  standalone: true,
  imports: [DsSegmentedControl, FormsModule],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsSegmentedControlDefaultExample {
  size = input<'sm' | 'md' | 'lg'>('md');
  fullWidth = input<boolean>(false);
  disabled = input<boolean>(false);

  value = signal('option1');

  options: SegmentOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];
}
