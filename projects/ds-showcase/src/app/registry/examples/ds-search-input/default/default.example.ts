import { Component, input } from '@angular/core';
import { DsSearchInput } from 'ds-angular';

@Component({
  selector: 'example-ds-search-input-default',
  standalone: true,
  imports: [DsSearchInput],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsSearchInputDefaultExample {
  placeholder = input<string>('Rechercher...');
  size = input<'sm' | 'md' | 'lg'>('md');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
}
