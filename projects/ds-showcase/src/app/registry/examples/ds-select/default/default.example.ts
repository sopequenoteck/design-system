import { Component, input } from '@angular/core';
import { DsSelect } from 'ds-angular';

@Component({
  selector: 'example-ds-select-default',
  standalone: true,
  imports: [DsSelect],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsSelectDefaultExample {
  size = input<'sm' | 'md' | 'lg'>('md');
  searchable = input<boolean>(false);
  clearable = input<boolean>(false);
  disabled = input<boolean>(false);

  options = [
    { value: 'fr', label: 'France' },
    { value: 'be', label: 'Belgique' },
    { value: 'ch', label: 'Suisse' },
    { value: 'ca', label: 'Canada' }
  ];
}
