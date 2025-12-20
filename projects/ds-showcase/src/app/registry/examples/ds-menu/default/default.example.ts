import { Component, input } from '@angular/core';
import { DsMenu, MenuItem } from 'ds-angular';

@Component({
  selector: 'example-ds-menu-default',
  standalone: true,
  imports: [DsMenu],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsMenuDefaultExample {
  size = input<'sm' | 'md' | 'lg'>('md');
  trigger = input<'click' | 'contextmenu'>('click');

  items: MenuItem[] = [
    { id: 'edit', label: 'Modifier' },
    { id: 'duplicate', label: 'Dupliquer' },
    { id: 'delete', label: 'Supprimer' }
  ];
}
