import { Component, input } from '@angular/core';
import { DsSidebar, SidebarItem } from 'ds-angular';
import { faHome, faUser, faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'example-ds-sidebar-default',
  standalone: true,
  imports: [DsSidebar],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsSidebarDefaultExample {
  mode = input<'full' | 'collapsed'>('full');
  size = input<'sm' | 'md' | 'lg'>('md');
  collapsible = input<boolean>(true);

  items: SidebarItem[] = [
    { id: 'home', label: 'Accueil', icon: faHome },
    { id: 'profile', label: 'Profil', icon: faUser },
    { id: 'settings', label: 'Paramètres', icon: faCog }
  ];
}
