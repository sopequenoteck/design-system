import { Component, input } from '@angular/core';
import { DsList, DsListItem } from 'ds-angular';

@Component({
  selector: 'example-ds-list-default',
  standalone: true,
  imports: [DsList, DsListItem],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsListDefaultExample {
  variant = input<'default' | 'divided' | 'card'>('default');
  size = input<'sm' | 'md' | 'lg'>('md');
}
