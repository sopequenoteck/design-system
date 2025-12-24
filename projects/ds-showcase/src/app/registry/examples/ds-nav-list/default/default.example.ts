import { Component, input, signal } from '@angular/core';
import { DsNavList, NavListGroup, NavListItemClickEvent, NavListGroupToggleEvent, NavListGroupActionEvent } from 'ds-angular';
import { faInbox, faArchive, faStar, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'example-ds-nav-list-default',
  standalone: true,
  imports: [DsNavList],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsNavListDefaultExample {
  size = input<'sm' | 'md' | 'lg'>('md');

  activeItemId = signal<string | number>('all');

  groups: NavListGroup[] = [
    {
      id: 'filters',
      items: [
        { id: 'all', label: 'Tous', icon: faInbox, badge: 24 },
        { id: 'starred', label: 'Favoris', icon: faStar, badge: 3, badgeVariant: 'warning' },
        { id: 'archived', label: 'Archivés', icon: faArchive }
      ]
    },
    {
      id: 'sources',
      title: 'Sources',
      collapsible: true,
      headerAction: {
        icon: faPlus,
        ariaLabel: 'Ajouter une source',
        tooltip: 'Ajouter une source'
      },
      items: [
        { id: 'personal', label: 'Personnel', emoji: '👤', dotColor: '#3b82f6', badge: 12 },
        { id: 'work', label: 'Travail', emoji: '💼', dotColor: '#ef4444', badge: 5, badgeVariant: 'error' },
        { id: 'family', label: 'Famille', emoji: '👨‍👩‍👧', dotColor: '#10b981' }
      ]
    },
    {
      id: 'tags',
      title: 'Tags',
      collapsible: true,
      collapsed: true,
      items: [
        { id: 'urgent', label: 'Urgent', dotColor: '#ef4444' },
        { id: 'later', label: 'Plus tard', dotColor: '#f59e0b' },
        { id: 'done', label: 'Terminé', dotColor: '#10b981', disabled: true }
      ]
    }
  ];

  onItemClick(event: NavListItemClickEvent): void {
    this.activeItemId.set(event.item.id);
  }

  onGroupToggle(_event: NavListGroupToggleEvent): void {
    // Handle group toggle
  }

  onGroupAction(_event: NavListGroupActionEvent): void {
    // Handle group action
  }
}
