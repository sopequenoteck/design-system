import { Component, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DsPasswordStrength, DsInputField } from 'ds-angular';

@Component({
  selector: 'example-ds-password-strength-default',
  standalone: true,
  imports: [DsPasswordStrength, DsInputField, FormsModule],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsPasswordStrengthDefaultExample {
  size = input<'sm' | 'md' | 'lg'>('md');
  showLabel = input<boolean>(true);
  showCriteria = input<boolean>(false);

  password = signal('');
}
