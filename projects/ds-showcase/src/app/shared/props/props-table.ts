import { Component, input, signal, computed } from '@angular/core';
import { PropDefinition } from '../../registry/types';

type TabId = 'inputs' | 'outputs';

@Component({
  selector: 'doc-props-table',
  standalone: true,
  template: `
    <div class="props-table">
      <div class="props-table__header">
        <h3 class="props-table__title">API Reference</h3>
        <div class="props-table__tabs">
          <button
            type="button"
            class="props-tab"
            [class.active]="activeTab() === 'inputs'"
            (click)="activeTab.set('inputs')"
          >
            Inputs ({{ inputs().length }})
          </button>
          <button
            type="button"
            class="props-tab"
            [class.active]="activeTab() === 'outputs'"
            (click)="activeTab.set('outputs')"
          >
            Outputs ({{ outputs().length }})
          </button>
        </div>
      </div>

      <div class="props-table__content">
        @if (activeTab() === 'inputs') {
          @if (inputs().length > 0) {
            <table class="props-table__table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                @for (prop of inputs(); track prop.name) {
                  <tr [class.deprecated]="prop.deprecated">
                    <td>
                      <code class="prop-name">{{ prop.name }}</code>
                      @if (prop.required) {
                        <span class="prop-required">*</span>
                      }
                      @if (prop.deprecated) {
                        <span class="prop-deprecated">deprecated</span>
                      }
                    </td>
                    <td><code class="prop-type">{{ prop.type }}</code></td>
                    <td>
                      @if (prop.defaultValue) {
                        <code class="prop-default">{{ prop.defaultValue }}</code>
                      } @else {
                        <span class="prop-empty">-</span>
                      }
                    </td>
                    <td class="prop-desc">{{ prop.description }}</td>
                  </tr>
                }
              </tbody>
            </table>
          } @else {
            <p class="props-table__empty">Aucun input pour ce composant.</p>
          }
        }

        @if (activeTab() === 'outputs') {
          @if (outputs().length > 0) {
            <table class="props-table__table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                @for (prop of outputs(); track prop.name) {
                  <tr [class.deprecated]="prop.deprecated">
                    <td>
                      <code class="prop-name">{{ prop.name }}</code>
                      @if (prop.deprecated) {
                        <span class="prop-deprecated">deprecated</span>
                      }
                    </td>
                    <td><code class="prop-type">{{ prop.type }}</code></td>
                    <td class="prop-desc">{{ prop.description }}</td>
                  </tr>
                }
              </tbody>
            </table>
          } @else {
            <p class="props-table__empty">Aucun output pour ce composant.</p>
          }
        }
      </div>
    </div>
  `,
  styles: [`
    .props-table {
      background: var(--background-panel, #ffffff);
      border: 1px solid var(--border-default, #e5e7eb);
      border-radius: var(--radius-2, 8px);
      overflow: hidden;
    }

    .props-table__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      border-bottom: 1px solid var(--border-default, #e5e7eb);
      background: var(--background-secondary, #f9fafb);
    }

    .props-table__title {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-default, #1a1a1a);
    }

    .props-table__tabs {
      display: flex;
      gap: 4px;
    }

    .props-tab {
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      background: transparent;
      color: var(--text-muted, #6b7280);
      font-size: 0.875rem;
      cursor: pointer;

      &:hover {
        background: var(--background-main, #ffffff);
      }

      &.active {
        background: var(--background-main, #ffffff);
        color: var(--color-primary, #3b82f6);
        font-weight: 500;
      }
    }

    .props-table__content {
      padding: 0;
    }

    .props-table__empty {
      padding: 24px;
      margin: 0;
      text-align: center;
      color: var(--text-muted, #9ca3af);
      font-style: italic;
    }

    // ==========================================================================
    // Table
    // ==========================================================================
    .props-table__table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;

      th, td {
        padding: 12px 16px;
        text-align: left;
        border-bottom: 1px solid var(--border-default, #e5e7eb);
      }

      th {
        background: var(--background-secondary, #f9fafb);
        font-weight: 600;
        color: var(--text-default, #374151);
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      tr:last-child td {
        border-bottom: none;
      }

      tr.deprecated {
        opacity: 0.6;
      }
    }

    .prop-name {
      font-family: var(--doc-code-font, monospace);
      font-size: 0.875rem;
      color: var(--color-primary, #3b82f6);
      background: var(--color-primary-light, #eff6ff);
      padding: 2px 6px;
      border-radius: 3px;
    }

    .prop-required {
      color: var(--error, #ef4444);
      margin-left: 2px;
    }

    .prop-deprecated {
      display: inline-block;
      margin-left: 8px;
      padding: 2px 6px;
      font-size: 0.625rem;
      font-weight: 500;
      text-transform: uppercase;
      background: var(--warning-light, #fef3c7);
      color: var(--warning, #d97706);
      border-radius: 3px;
    }

    .prop-type {
      font-family: var(--doc-code-font, monospace);
      font-size: 0.8125rem;
      color: var(--text-muted, #6b7280);
    }

    .prop-default {
      font-family: var(--doc-code-font, monospace);
      font-size: 0.8125rem;
      color: var(--success, #22c55e);
    }

    .prop-empty {
      color: var(--text-muted, #9ca3af);
    }

    .prop-desc {
      color: var(--text-default, #374151);
      max-width: 400px;
    }
  `]
})
export class PropsTable {
  /** Définitions des props */
  props = input<PropDefinition[]>([]);

  /** Onglet actif */
  activeTab = signal<TabId>('inputs');

  /** Inputs filtrés */
  inputs = computed(() =>
    this.props().filter(p => p.kind === 'input' || p.kind === 'model')
  );

  /** Outputs filtrés */
  outputs = computed(() =>
    this.props().filter(p => p.kind === 'output')
  );
}
