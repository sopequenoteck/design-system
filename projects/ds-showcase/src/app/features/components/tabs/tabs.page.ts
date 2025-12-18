import { Component, signal } from '@angular/core';
import { DsTabs, TabItem } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsTabsDefinition } from '../../../registry/definitions/ds-tabs.definition';

@Component({
  selector: 'app-tabs-page',
  standalone: true,
  imports: [DsTabs, DemoContainer, PropsTable],
  template: `
    <div class="component-page">
      <header class="component-header">
        <div class="component-header__meta">
          <span class="component-badge">{{ definition.category }}</span>
        </div>
        <h1 class="component-title">{{ definition.name }}</h1>
        <p class="component-desc">{{ definition.description }}</p>
        <code class="component-selector">&lt;{{ definition.selector }}&gt;</code>
      </header>

      <!-- Demo 1: Default -->
      <section class="component-section">
        <h2>Exemples</h2>

        <div class="demo-block">
          <h3 class="demo-block__title">Default</h3>
          <p class="demo-block__desc">Onglets par défaut avec navigation clavier.</p>

          <doc-demo-container [code]="defaultCode">
            <ds-tabs
              [tabs]="basicTabs"
              [activeTabId]="activeTab()"
              (tabChanged)="onTabChanged($event)"
            />
            <div class="tab-content">
              <p>Contenu de l'onglet: <strong>{{ activeTab() }}</strong></p>
            </div>
          </doc-demo-container>
        </div>

        <!-- Demo 2: More tabs -->
        <div class="demo-block">
          <h3 class="demo-block__title">Multiple Tabs</h3>
          <p class="demo-block__desc">Navigation avec plusieurs onglets.</p>

          <doc-demo-container [code]="multipleCode">
            <ds-tabs [tabs]="multipleTabs" />
          </doc-demo-container>
        </div>

        <!-- Demo 3: With disabled -->
        <div class="demo-block">
          <h3 class="demo-block__title">With Disabled Tab</h3>
          <p class="demo-block__desc">Onglet désactivé non sélectionnable.</p>

          <doc-demo-container [code]="disabledCode">
            <ds-tabs [tabs]="tabsWithDisabled" />
          </doc-demo-container>
        </div>
      </section>

      <!-- API Reference -->
      <section class="component-section">
        <h2>API Reference</h2>
        <doc-props-table [props]="definition.props" />
      </section>
    </div>
  `,
  styles: [`
    .component-page {
      max-width: 900px;
    }

    .component-header {
      margin-bottom: 48px;
    }

    .component-header__meta {
      margin-bottom: 12px;
    }

    .component-badge {
      display: inline-block;
      padding: 4px 10px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: var(--color-primary-light, #eff6ff);
      color: var(--color-primary, #3b82f6);
      border-radius: 4px;
    }

    .component-title {
      margin: 0 0 12px 0;
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-default, #1a1a1a);
    }

    .component-desc {
      margin: 0 0 16px 0;
      font-size: 1.125rem;
      color: var(--text-muted, #6b7280);
      line-height: 1.6;
    }

    .component-selector {
      display: inline-block;
      padding: 6px 12px;
      font-family: var(--doc-code-font, monospace);
      font-size: 0.875rem;
      background: var(--background-secondary, #f3f4f6);
      color: var(--text-default, #374151);
      border-radius: 4px;
    }

    .component-section {
      margin-bottom: 48px;

      h2 {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-default, #1a1a1a);
        margin: 0 0 24px 0;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--border-default, #e5e7eb);
      }
    }

    .demo-block {
      margin-bottom: 32px;
    }

    .demo-block__title {
      margin: 0 0 8px 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-default, #1a1a1a);
    }

    .demo-block__desc {
      margin: 0 0 16px 0;
      font-size: 0.875rem;
      color: var(--text-muted, #6b7280);
    }

    .tab-content {
      margin-top: 16px;
      padding: 16px;
      background: var(--background-secondary, #f9fafb);
      border-radius: 8px;
      color: var(--text-default, #374151);
    }
  `]
})
export class TabsPage {
  definition = DsTabsDefinition;

  basicTabs: TabItem[] = [
    { id: 'tab1', label: 'Général' },
    { id: 'tab2', label: 'Paramètres' },
    { id: 'tab3', label: 'Avancé' },
  ];

  multipleTabs: TabItem[] = [
    { id: 'home', label: 'Accueil' },
    { id: 'products', label: 'Produits' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'À propos' },
    { id: 'contact', label: 'Contact' },
  ];

  tabsWithDisabled: TabItem[] = [
    { id: 'active1', label: 'Actif' },
    { id: 'disabled1', label: 'Désactivé', disabled: true },
    { id: 'active2', label: 'Autre actif' },
  ];

  activeTab = signal('tab1');

  defaultCode = `<ds-tabs
  [tabs]="[
    { id: 'tab1', label: 'Général' },
    { id: 'tab2', label: 'Paramètres' },
    { id: 'tab3', label: 'Avancé' }
  ]"
  activeTabId="tab1"
  (tabChanged)="onTabChanged($event)"
></ds-tabs>`;

  multipleCode = `<ds-tabs
  [tabs]="[
    { id: 'home', label: 'Accueil' },
    { id: 'products', label: 'Produits' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'À propos' },
    { id: 'contact', label: 'Contact' }
  ]"
></ds-tabs>`;

  disabledCode = `<ds-tabs
  [tabs]="[
    { id: 'active1', label: 'Actif' },
    { id: 'disabled1', label: 'Désactivé', disabled: true },
    { id: 'active2', label: 'Autre actif' }
  ]"
></ds-tabs>`;

  onTabChanged(tab: TabItem): void {
    this.activeTab.set(tab.id);
  }
}
