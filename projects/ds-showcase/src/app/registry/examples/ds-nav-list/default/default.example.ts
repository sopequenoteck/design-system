import { Component, input } from '@angular/core';
import { DsNavList, NavListGroup } from 'ds-angular';

@Component({
  selector: 'example-ds-nav-list-default',
  standalone: true,
  imports: [DsNavList],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsNavListDefaultExample {
  size = input<'sm' | 'md' | 'lg'>('md');

  groups: NavListGroup[] = [
    {
      id: 'main',
      title: 'Navigation',
      items: [
        { id: 'all', label: 'Tous' },
        { id: 'active', label: 'Actifs' },
        { id: 'archived', label: 'Archivés' }
      ]
    }
  ];
}
