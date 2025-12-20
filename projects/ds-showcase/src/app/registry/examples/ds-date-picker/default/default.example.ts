import { Component, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DsDatePicker } from 'ds-angular';

@Component({
  selector: 'example-ds-date-picker-default',
  standalone: true,
  imports: [DsDatePicker, FormsModule],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsDatePickerDefaultExample {
  size = input<'sm' | 'md' | 'lg'>('md');
  showTodayButton = input<boolean>(true);
  showClearButton = input<boolean>(true);
  disabled = input<boolean>(false);

  date = signal<Date | null>(null);
}
