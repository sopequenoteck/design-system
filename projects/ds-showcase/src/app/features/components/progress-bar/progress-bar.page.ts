import { Component, signal, computed } from '@angular/core';
import { DsProgressBar } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsProgressBarDefinition } from '../../../registry/definitions/ds-progress-bar.definition';
import { ControlValues } from '../../../registry/types';

type ProgressBarVariant = 'default' | 'success' | 'warning' | 'error';
type SizeType = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-progress-bar-page',
  standalone: true,
  imports: [DsProgressBar, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Barre de progression avec contrôles.</p>
          <doc-demo-container
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-progress-bar
              [value]="demoValue()"
              [variant]="demoVariant()"
              [size]="demoSize()"
              [showLabel]="demoShowLabel()"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Indeterminate</h3>
          <p class="demo-block__desc">Mode indéterminé pour chargement.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <ds-progress-bar mode="indeterminate" variant="default" />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Variants</h3>
          <p class="demo-block__desc">Différentes variantes de couleur.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <div class="demo-stack">
              <ds-progress-bar [value]="75" variant="default" />
              <ds-progress-bar [value]="75" variant="success" />
              <ds-progress-bar [value]="75" variant="warning" />
              <ds-progress-bar [value]="75" variant="error" />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Label</h3>
          <p class="demo-block__desc">Affichage du pourcentage.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <ds-progress-bar [value]="65" [showLabel]="true" variant="success" />
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
    .demo-stack { display: flex; flex-direction: column; gap: 16px; }
  `]
})
export class ProgressBarPage {
  definition = DsProgressBarDefinition;

  defaultValues = signal<ControlValues>({
    value: 50,
    variant: 'default',
    size: 'md',
    showLabel: false,
  });

  demoValue = computed(() => this.defaultValues()['value'] as number);
  demoVariant = computed(() => this.defaultValues()['variant'] as ProgressBarVariant);
  demoSize = computed(() => this.defaultValues()['size'] as SizeType);
  demoShowLabel = computed(() => this.defaultValues()['showLabel'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }
}
