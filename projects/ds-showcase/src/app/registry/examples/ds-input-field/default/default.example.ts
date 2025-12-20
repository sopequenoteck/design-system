import { Component, input } from '@angular/core';
import { DsInputField } from 'ds-angular';

@Component({
  selector: 'example-ds-input-field-default',
  standalone: true,
  imports: [DsInputField],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsInputFieldDefaultExample {
  label = input<string>('Email');
  placeholder = input<string>('Entrez votre email');
  size = input<'sm' | 'md' | 'lg'>('md');
  disabled = input<boolean>(false);
  required = input<boolean>(false);
}
