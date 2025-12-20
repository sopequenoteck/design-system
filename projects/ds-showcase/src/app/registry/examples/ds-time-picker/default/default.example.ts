import { Component, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DsTimePicker } from 'ds-angular';

@Component({
  selector: 'example-ds-time-picker-default',
  standalone: true,
  imports: [DsTimePicker, FormsModule],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsTimePickerDefaultExample {
  size = input<'sm' | 'md' | 'lg'>('md');
  showSeconds = input<boolean>(false);
  disabled = input<boolean>(false);

  time = signal('');
}
