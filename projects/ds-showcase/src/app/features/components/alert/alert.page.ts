import { Component, signal, computed } from '@angular/core';
import { DsAlert } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsAlertDefinition } from '../../../registry/definitions/ds-alert.definition';
import { ControlValues } from '../../../registry/types';

type AlertType = 'success' | 'warning' | 'error' | 'info';
type SizeType = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-alert-page',
  standalone: true,
  imports: [DsAlert, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Alerte avec contrôles interactifs.</p>
          <doc-demo-container
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-alert
              [type]="demoType()"
              [size]="demoSize()"
              [showIcon]="demoShowIcon()"
              [closable]="demoClosable()"
              (closed)="onClose()"
            >
              Ceci est un message d'alerte.
            </ds-alert>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">All Types</h3>
          <p class="demo-block__desc">Les 4 types de feedback.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <div class="demo-stack">
              <ds-alert type="success">Opération réussie !</ds-alert>
              <ds-alert type="warning">Attention à cette action.</ds-alert>
              <ds-alert type="error">Une erreur est survenue.</ds-alert>
              <ds-alert type="info">Information importante.</ds-alert>
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Closable</h3>
          <p class="demo-block__desc">Alerte avec bouton de fermeture.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            @if (!alertClosed()) {
              <ds-alert
                type="warning"
                [closable]="true"
                (closed)="alertClosed.set(true)"
              >
                Cette alerte peut être fermée.
              </ds-alert>
            } @else {
              <button class="reset-btn" (click)="alertClosed.set(false)">Réafficher</button>
            }
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Sizes</h3>
          <p class="demo-block__desc">Différentes tailles.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <div class="demo-stack">
              <ds-alert type="info" size="sm">Petite alerte</ds-alert>
              <ds-alert type="info" size="md">Alerte moyenne</ds-alert>
              <ds-alert type="info" size="lg">Grande alerte</ds-alert>
            </div>
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
    .demo-stack { display: flex; flex-direction: column; gap: 12px; }
    .reset-btn {
      padding: 8px 16px; border: 1px solid var(--border-default, #e5e7eb); border-radius: 4px;
      background: var(--background-secondary, #f3f4f6); cursor: pointer;
      &:hover { background: var(--background-main, #e5e7eb); }
    }
  `]
})
export class AlertPage {
  definition = DsAlertDefinition;

  alertClosed = signal(false);

  defaultValues = signal<ControlValues>({
    type: 'info',
    size: 'md',
    showIcon: true,
    closable: false,
  });

  demoType = computed(() => this.defaultValues()['type'] as AlertType);
  demoSize = computed(() => this.defaultValues()['size'] as SizeType);
  demoShowIcon = computed(() => this.defaultValues()['showIcon'] as boolean);
  demoClosable = computed(() => this.defaultValues()['closable'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  onClose(): void {
    console.log('Alert closed');
  }
}
