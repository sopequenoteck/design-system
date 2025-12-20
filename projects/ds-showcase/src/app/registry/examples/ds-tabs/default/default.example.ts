import { Component, input, signal } from '@angular/core';
import { DsTabs, TabItem } from 'ds-angular';

@Component({
  selector: 'example-ds-tabs-default',
  standalone: true,
  imports: [DsTabs],
  templateUrl: './default.example.html',
  styleUrl: './default.example.scss'
})
export class DsTabsDefaultExample {
  activeTab = signal('tab1');

  tabs: TabItem[] = [
    { id: 'tab1', label: 'Général' },
    { id: 'tab2', label: 'Préférences' },
    { id: 'tab3', label: 'Avancé' }
  ];

  onTabChange(tab: TabItem): void {
    this.activeTab.set(tab.id);
  }
}
