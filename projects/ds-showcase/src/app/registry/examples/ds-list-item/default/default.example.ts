import { Component, input } from '@angular/core';
import { DsListItem } from 'ds-angular';

@Component({
  selector: 'example-ds-list-item-default',
  standalone: true,
  imports: [DsListItem],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsListItemDefaultExample {
  checkable = input<boolean>(false);
  size = input<'sm' | 'md' | 'lg'>('md');
}
