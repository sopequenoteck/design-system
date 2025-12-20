import { Component, signal } from '@angular/core';
import { DsTabs } from 'ds-angular';

/**
 * Page de test isolée pour ds-tabs.
 * Utilisée par les tests e2e Playwright.
 */
@Component({
  selector: 'app-tabs-test',
  standalone: true,
  imports: [DsTabs],
  template: `
    <!-- Test: Default Tabs -->
    <div class="test-section" data-testid="tabs-default">
      <ds-tabs
        [tabs]="defaultTabs"
        [activeTabId]="activeTab()"
        (tabChanged)="activeTab.set($event.id)"
      />
      <div class="tab-content">
        @switch (activeTab()) {
          @case ('tab1') { <p>Contenu de l'onglet 1</p> }
          @case ('tab2') { <p>Contenu de l'onglet 2</p> }
          @case ('tab3') { <p>Contenu de l'onglet 3</p> }
        }
      </div>
    </div>

    <!-- Test: With Icons -->
    <div class="test-section" data-testid="tabs-icons">
      <ds-tabs
        [tabs]="tabsWithIcons"
        [activeTabId]="activeIconTab()"
        (tabChanged)="activeIconTab.set($event.id)"
      />
    </div>

    <!-- Test: Disabled Tab -->
    <div class="test-section" data-testid="tabs-disabled">
      <ds-tabs
        [tabs]="tabsWithDisabled"
        [activeTabId]="activeDisabledTab()"
        (tabChanged)="activeDisabledTab.set($event.id)"
      />
    </div>

    <!-- Test: Sizes -->
    <div class="test-section" data-testid="tabs-sizes">
      <h4>Small</h4>
      <ds-tabs [tabs]="defaultTabs" size="sm" />
      <h4>Medium</h4>
      <ds-tabs [tabs]="defaultTabs" size="md" />
      <h4>Large</h4>
      <ds-tabs [tabs]="defaultTabs" size="lg" />
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 24px;
    }
    .test-section {
      margin-bottom: 32px;
      padding: 16px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
    }
    .tab-content {
      margin-top: 16px;
      padding: 16px;
      background: #f9fafb;
      border-radius: 4px;
    }
    h4 {
      margin: 16px 0 8px 0;
      font-size: 0.875rem;
      color: #6b7280;
    }
  `]
})
export class TabsTestPage {
  activeTab = signal('tab1');
  activeIconTab = signal('home');
  activeDisabledTab = signal('active');

  defaultTabs = [
    { id: 'tab1', label: 'Onglet 1' },
    { id: 'tab2', label: 'Onglet 2' },
    { id: 'tab3', label: 'Onglet 3' },
  ];

  tabsWithIcons = [
    { id: 'home', label: 'Accueil', icon: 'home' },
    { id: 'profile', label: 'Profil', icon: 'user' },
    { id: 'settings', label: 'Paramètres', icon: 'cog' },
  ];

  tabsWithDisabled = [
    { id: 'active', label: 'Actif' },
    { id: 'disabled', label: 'Désactivé', disabled: true },
    { id: 'other', label: 'Autre' },
  ];
}
