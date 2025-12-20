import { Component, input, signal, computed } from '@angular/core';
import { CodePreview } from './code-preview';
import { CodeSource } from '../../registry/types';

type TabType = 'html' | 'typescript' | 'scss';

@Component({
  selector: 'doc-code-tabs',
  standalone: true,
  imports: [CodePreview],
  template: `
    <div class="code-tabs">
      <!-- Onglets -->
      @if (availableTabs().length > 1) {
        <div class="code-tabs__header">
          @for (tab of availableTabs(); track tab.language) {
            <button
              type="button"
              class="code-tabs__tab"
              [class.active]="activeTab() === tab.language"
              (click)="setActiveTab(tab.language)"
            >
              {{ getTabLabel(tab.language) }}
            </button>
          }
        </div>
      }

      <!-- Contenu -->
      <div class="code-tabs__content">
        @if (activeSource()) {
          <doc-code-preview
            [code]="activeSource()!.content"
            [language]="activeSource()!.language"
          />
        }
      </div>
    </div>
  `,
  styles: [`
    .code-tabs {
      border-radius: var(--radius-2, 8px);
      overflow: hidden;
    }

    .code-tabs__header {
      display: flex;
      background: #1e1e1e;
      border-bottom: 1px solid #3d3d3d;
      padding: 0 8px;
    }

    .code-tabs__tab {
      padding: 10px 16px;
      border: none;
      background: transparent;
      color: #9ca3af;
      font-size: 0.8125rem;
      font-weight: 500;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: all 0.15s;
      margin-bottom: -1px;

      &:hover {
        color: #e5e7eb;
      }

      &.active {
        color: #ffffff;
        border-bottom-color: var(--doc-accent-primary, #6366f1);
      }
    }

    .code-tabs__content {
      :host ::ng-deep .code-preview {
        border-radius: 0;
      }

      :host ::ng-deep .code-preview__header {
        display: none;
      }
    }
  `]
})
export class CodeTabs {
  /** Sources de code à afficher */
  sources = input.required<CodeSource[]>();

  /** Onglet actif */
  activeTab = signal<TabType>('html');

  /** Onglets disponibles (filtrés selon les sources) */
  availableTabs = computed(() => {
    const order: TabType[] = ['html', 'typescript', 'scss'];
    const sourcesValue = this.sources();

    return order
      .filter(lang => sourcesValue.some(s => s.language === lang))
      .map(lang => sourcesValue.find(s => s.language === lang)!);
  });

  /** Source active */
  activeSource = computed(() => {
    const sourcesValue = this.sources();
    const active = this.activeTab();

    // Chercher la source active
    let source = sourcesValue.find(s => s.language === active);

    // Fallback sur la première source disponible
    if (!source && sourcesValue.length > 0) {
      source = sourcesValue[0];
      // Mettre à jour l'onglet actif
      this.activeTab.set(source.language as TabType);
    }

    return source;
  });

  setActiveTab(tab: TabType): void {
    this.activeTab.set(tab);
  }

  getTabLabel(language: TabType): string {
    const labels: Record<TabType, string> = {
      html: 'HTML',
      typescript: 'TypeScript',
      scss: 'SCSS'
    };
    return labels[language];
  }
}
