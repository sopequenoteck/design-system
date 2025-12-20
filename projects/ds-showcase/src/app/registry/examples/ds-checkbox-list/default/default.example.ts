import { Component, input, signal } from '@angular/core';
import { DsCheckboxList } from 'ds-angular';

@Component({
  selector: 'example-ds-checkbox-list-default',
  standalone: true,
  imports: [DsCheckboxList],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsCheckboxListDefaultExample {
  size = input<'sm' | 'md' | 'lg'>('md');
  showSelectAll = input<boolean>(false);
  disabled = input<boolean>(false);

  items = signal([
    { id: '1', label: 'Option A', checked: false },
    { id: '2', label: 'Option B', checked: true },
    { id: '3', label: 'Option C', checked: false }
  ]);
}
