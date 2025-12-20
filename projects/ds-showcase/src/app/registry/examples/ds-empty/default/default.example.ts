import { Component, input } from '@angular/core';
import { DsEmpty } from 'ds-angular';

@Component({
  selector: 'example-ds-empty-default',
  standalone: true,
  imports: [DsEmpty],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsEmptyDefaultExample {
  title = input<string>('Aucun résultat');
  description = input<string>('Aucune donnée à afficher pour le moment.');
  size = input<'sm' | 'md' | 'lg'>('md');
}
