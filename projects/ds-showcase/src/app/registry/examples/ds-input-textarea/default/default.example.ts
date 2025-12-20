import { Component, input } from '@angular/core';
import { DsInputTextarea } from 'ds-angular';

@Component({
  selector: 'example-ds-input-textarea-default',
  standalone: true,
  imports: [DsInputTextarea],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsInputTextareaDefaultExample {
  label = input<string>('Description');
  placeholder = input<string>('Entrez votre description...');
  rows = input<number>(4);
  disabled = input<boolean>(false);
}
