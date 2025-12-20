import { Component, input } from '@angular/core';
import { DsCombobox, DsComboboxOption } from 'ds-angular';

@Component({
  selector: 'example-ds-combobox-default',
  standalone: true,
  imports: [DsCombobox],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsComboboxDefaultExample {
  size = input<'sm' | 'md' | 'lg'>('md');
  clearable = input<boolean>(true);
  disabled = input<boolean>(false);

  options: DsComboboxOption[] = [
    { value: 'fr', label: 'France' },
    { value: 'de', label: 'Allemagne' },
    { value: 'es', label: 'Espagne' },
    { value: 'it', label: 'Italie' },
    { value: 'pt', label: 'Portugal' }
  ];
}
