import { Component, input } from '@angular/core';
import { DsCheckbox } from 'ds-angular';

@Component({
  selector: 'example-ds-checkbox-default',
  standalone: true,
  imports: [DsCheckbox],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsCheckboxDefaultExample {
  label = input<string>("J'accepte les conditions");
  size = input<'sm' | 'md' | 'lg'>('md');
  required = input<boolean>(false);
  disabled = input<boolean>(false);
  indeterminate = input<boolean>(false);
}
