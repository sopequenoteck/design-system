import { Component, signal } from '@angular/core';
import { DsTransfer, TransferItem, TransferChangeEvent } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsTransferDefinition } from '../../../registry/definitions/ds-transfer.definition';

@Component({
  selector: 'app-transfer-page',
  standalone: true,
  imports: [DsTransfer, DemoContainer, PropsTable],
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

      <section class="component-section">
        <h2>Exemples</h2>

        <div class="demo-block">
          <h3 class="demo-block__title">Default</h3>
          <p class="demo-block__desc">Transfer basique avec recherche.</p>
          <doc-demo-container [code]="definition.demos[0].code">
            <ds-transfer
              [source]="sourceItems()"
              [target]="targetItems()"
              sourceTitle="Disponibles"
              targetTitle="Sélectionnés"
              (transferChange)="onTransfer($event)"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Without Search</h3>
          <p class="demo-block__desc">Transfer sans barre de recherche.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <ds-transfer
              [source]="sourceItemsSimple"
              [target]="[]"
              [showSearch]="false"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Sizes</h3>
          <p class="demo-block__desc">Différentes tailles.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <div class="demo-stack">
              <div class="demo-item">
                <span class="demo-label">Small</span>
                <ds-transfer size="sm" [source]="sourceItemsSimple" />
              </div>
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Disabled</h3>
          <p class="demo-block__desc">État désactivé.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <ds-transfer
              [disabled]="true"
              [source]="sourceItemsSimple"
              [target]="targetItemsSimple"
            />
          </doc-demo-container>
        </div>
      </section>

      <section class="component-section">
        <h2>API Reference</h2>
        <doc-props-table [props]="definition.props" />
      </section>
    </div>
  `,
  styles: [`
    .component-page { max-width: 900px; }
    .component-header { margin-bottom: 48px; }
    .component-header__meta { margin-bottom: 12px; }
    .component-badge {
      display: inline-block; padding: 4px 10px; font-size: 0.75rem; font-weight: 500;
      text-transform: uppercase; letter-spacing: 0.05em;
      background: var(--color-primary-light, #eff6ff); color: var(--color-primary, #3b82f6); border-radius: 4px;
    }
    .component-title { margin: 0 0 12px 0; font-size: 2rem; font-weight: 700; color: var(--text-default, #1a1a1a); }
    .component-desc { margin: 0 0 16px 0; font-size: 1.125rem; color: var(--text-muted, #6b7280); line-height: 1.6; }
    .component-selector {
      display: inline-block; padding: 6px 12px; font-family: var(--doc-code-font, monospace); font-size: 0.875rem;
      background: var(--background-secondary, #f3f4f6); color: var(--text-default, #374151); border-radius: 4px;
    }
    .component-section {
      margin-bottom: 48px;
      h2 { font-size: 1.25rem; font-weight: 600; color: var(--text-default, #1a1a1a); margin: 0 0 24px 0; padding-bottom: 12px; border-bottom: 1px solid var(--border-default, #e5e7eb); }
    }
    .demo-block { margin-bottom: 32px; }
    .demo-block__title { margin: 0 0 8px 0; font-size: 1rem; font-weight: 600; color: var(--text-default, #1a1a1a); }
    .demo-block__desc { margin: 0 0 16px 0; font-size: 0.875rem; color: var(--text-muted, #6b7280); }
    .demo-stack { display: flex; flex-direction: column; gap: 24px; }
    .demo-item { display: flex; flex-direction: column; gap: 8px; }
    .demo-label { font-size: 0.75rem; color: var(--text-muted, #6b7280); text-transform: uppercase; font-weight: 600; }
  `]
})
export class TransferPage {
  definition = DsTransferDefinition;

  sourceItems = signal<TransferItem[]>([
    { key: '1', label: 'Option 1', description: 'Description de l\'option 1' },
    { key: '2', label: 'Option 2', description: 'Description de l\'option 2' },
    { key: '3', label: 'Option 3', description: 'Description de l\'option 3' },
    { key: '4', label: 'Option 4', description: 'Description de l\'option 4' },
    { key: '5', label: 'Option 5', description: 'Description de l\'option 5' },
  ]);

  targetItems = signal<TransferItem[]>([]);

  sourceItemsSimple: TransferItem[] = [
    { key: 'a', label: 'Item A' },
    { key: 'b', label: 'Item B' },
    { key: 'c', label: 'Item C' },
  ];

  targetItemsSimple: TransferItem[] = [
    { key: 'd', label: 'Item D' },
  ];

  onTransfer(event: TransferChangeEvent): void {
    this.sourceItems.set(event.source);
    this.targetItems.set(event.target);
  }
}
