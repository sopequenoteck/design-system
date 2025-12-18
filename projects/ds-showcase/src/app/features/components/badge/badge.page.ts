import { Component, signal, computed } from '@angular/core';
import { DsBadge } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsBadgeDefinition } from '../../../registry/definitions/ds-badge.definition';
import { ControlValues } from '../../../registry/types';

type BadgeType = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
type BadgeSize = 'sm' | 'md' | 'lg';
type BadgeVariant = 'solid' | 'outline';
type BadgeShape = 'default' | 'pill' | 'square';

@Component({
  selector: 'app-badge-page',
  standalone: true,
  imports: [DsBadge, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Badge avec contrôles interactifs.</p>
          <doc-demo-container
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-badge
              [type]="demoType()"
              [size]="demoSize()"
              [variant]="demoVariant()"
              [shape]="demoShape()"
            >
              Badge
            </ds-badge>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Types</h3>
          <p class="demo-block__desc">Les différents types de badges.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <div class="demo-row">
              <ds-badge type="default">Default</ds-badge>
              <ds-badge type="primary">Primary</ds-badge>
              <ds-badge type="success">Success</ds-badge>
              <ds-badge type="warning">Warning</ds-badge>
              <ds-badge type="error">Error</ds-badge>
              <ds-badge type="info">Info</ds-badge>
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Variants</h3>
          <p class="demo-block__desc">Solid vs Outline.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <div class="demo-row">
              <ds-badge type="primary" variant="solid">Solid</ds-badge>
              <ds-badge type="primary" variant="outline">Outline</ds-badge>
              <ds-badge type="success" variant="solid">Solid</ds-badge>
              <ds-badge type="success" variant="outline">Outline</ds-badge>
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Shapes</h3>
          <p class="demo-block__desc">Les différentes formes.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <div class="demo-row">
              <ds-badge shape="default">Default</ds-badge>
              <ds-badge shape="pill">Pill</ds-badge>
              <ds-badge shape="square">Square</ds-badge>
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Sizes</h3>
          <p class="demo-block__desc">Les trois tailles disponibles.</p>
          <doc-demo-container [code]="definition.demos[4].code">
            <div class="demo-row">
              <ds-badge size="sm">Small</ds-badge>
              <ds-badge size="md">Medium</ds-badge>
              <ds-badge size="lg">Large</ds-badge>
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Custom Color</h3>
          <p class="demo-block__desc">Badge avec couleur personnalisée.</p>
          <doc-demo-container [code]="definition.demos[5].code">
            <div class="demo-row">
              <ds-badge color="#8b5cf6">Custom Purple</ds-badge>
              <ds-badge color="rgb(236, 72, 153)" variant="outline">Custom Pink</ds-badge>
              <ds-badge color="#059669">Custom Green</ds-badge>
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
    .demo-row { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
  `]
})
export class BadgePage {
  definition = DsBadgeDefinition;

  defaultValues = signal<ControlValues>({
    type: 'default',
    size: 'md',
    variant: 'solid',
    shape: 'default',
  });

  demoType = computed(() => this.defaultValues()['type'] as BadgeType);
  demoSize = computed(() => this.defaultValues()['size'] as BadgeSize);
  demoVariant = computed(() => this.defaultValues()['variant'] as BadgeVariant);
  demoShape = computed(() => this.defaultValues()['shape'] as BadgeShape);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }
}
