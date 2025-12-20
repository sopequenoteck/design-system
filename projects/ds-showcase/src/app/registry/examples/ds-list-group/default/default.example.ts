import { Component, input } from '@angular/core';
import { DsListGroup, DsListItem } from 'ds-angular';

@Component({
  selector: 'example-ds-list-group-default',
  standalone: true,
  imports: [DsListGroup, DsListItem],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsListGroupDefaultExample {
  variant = input<'default' | 'collapsible'>('default');
  sticky = input<boolean>(false);
}
