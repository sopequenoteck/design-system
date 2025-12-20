import { Component, signal, computed } from '@angular/core';
import { PrimitiveBadge, BadgeVariant, BadgeSize, BadgeShape, BadgeAppearance } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { PrimitiveBadgeDefinition } from '../../../registry/definitions/primitive-badge.definition';
import { ControlValues } from '../../../registry/types';

@Component({
  selector: 'app-primitive-badge-page',
  standalone: true,
  imports: [PrimitiveBadge, DemoContainer, PropsTable],
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

        <!-- Demo 1: Default -->
        <div class="demo-block">
          <h3 class="demo-block__title">Default</h3>
          <p class="demo-block__desc">Badge avec contrôles interactifs.</p>
          <doc-demo-container
            [sources]="definition.demos[0].sources ?? []"
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <primitive-badge
              [variant]="demoVariant()"
              [size]="demoSize()"
              [shape]="demoShape()"
              [appearance]="demoAppearance()"
            >Badge</primitive-badge>
          </doc-demo-container>
        </div>

        <!-- Demo 2: Variants -->
        <div class="demo-block">
          <h3 class="demo-block__title">All Variants</h3>
          <p class="demo-block__desc">Toutes les variantes de couleur.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <div class="demo-row">
              <primitive-badge variant="primary">Primary</primitive-badge>
              <primitive-badge variant="secondary">Secondary</primitive-badge>
              <primitive-badge variant="success">Success</primitive-badge>
              <primitive-badge variant="warning">Warning</primitive-badge>
              <primitive-badge variant="error">Error</primitive-badge>
              <primitive-badge variant="info">Info</primitive-badge>
              <primitive-badge variant="neutral">Neutral</primitive-badge>
            </div>
          </doc-demo-container>
        </div>

        <!-- Demo 3: Sizes -->
        <div class="demo-block">
          <h3 class="demo-block__title">Sizes</h3>
          <p class="demo-block__desc">Les trois tailles disponibles.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <div class="demo-row">
              <primitive-badge size="sm">Small</primitive-badge>
              <primitive-badge size="md">Medium</primitive-badge>
              <primitive-badge size="lg">Large</primitive-badge>
            </div>
          </doc-demo-container>
        </div>

        <!-- Demo 4: Shapes -->
        <div class="demo-block">
          <h3 class="demo-block__title">Shapes</h3>
          <p class="demo-block__desc">Formes arrondie et capsule.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <div class="demo-row">
              <primitive-badge shape="rounded">Rounded</primitive-badge>
              <primitive-badge shape="pill">Pill</primitive-badge>
            </div>
          </doc-demo-container>
        </div>

        <!-- Demo 5: Outline -->
        <div class="demo-block">
          <h3 class="demo-block__title">Outline Variants</h3>
          <p class="demo-block__desc">Badges avec bordure et fond transparent.</p>
          <doc-demo-container [code]="definition.demos[4].code">
            <div class="demo-row">
              <primitive-badge variant="primary" appearance="outline">Primary</primitive-badge>
              <primitive-badge variant="success" appearance="outline">Success</primitive-badge>
              <primitive-badge variant="error" appearance="outline">Error</primitive-badge>
            </div>
          </doc-demo-container>
        </div>

        <!-- Demo 6: Count -->
        <div class="demo-block">
          <h3 class="demo-block__title">Count Badges</h3>
          <p class="demo-block__desc">Badges de compteur (notifications).</p>
          <doc-demo-container [code]="definition.demos[5].code">
            <div class="demo-row">
              <primitive-badge type="count" variant="error" shape="pill">5</primitive-badge>
              <primitive-badge type="count" variant="primary" shape="pill">99+</primitive-badge>
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
    .demo-block { margin-bottom: 32px; }
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
    .demo-row {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
    }
  `]
})
export class PrimitiveBadgePage {
  definition = PrimitiveBadgeDefinition;

  defaultValues = signal<ControlValues>({
    variant: 'primary',
    size: 'md',
    shape: 'rounded',
    appearance: 'solid',
  });

  demoVariant = computed(() => this.defaultValues()['variant'] as BadgeVariant);
  demoSize = computed(() => this.defaultValues()['size'] as BadgeSize);
  demoShape = computed(() => this.defaultValues()['shape'] as BadgeShape);
  demoAppearance = computed(() => this.defaultValues()['appearance'] as BadgeAppearance);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }
}
