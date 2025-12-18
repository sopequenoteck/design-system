import { Component, signal, computed } from '@angular/core';
import { DsButton, ButtonVariant, ButtonAppearance, ButtonSize } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsButtonDefinition } from '../../../registry/definitions/ds-button.definition';
import { ControlValues } from '../../../registry/types';

@Component({
  selector: 'app-button-page',
  standalone: true,
  imports: [DsButton, DemoContainer, PropsTable],
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

      <!-- Demo 1: Default avec controls -->
      <section class="component-section">
        <h2>Exemples</h2>

        <div class="demo-block">
          <h3 class="demo-block__title">Default</h3>
          <p class="demo-block__desc">Bouton par défaut avec contrôles interactifs.</p>

          <doc-demo-container
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-button
              [variant]="demoVariant()"
              [appearance]="demoAppearance()"
              [size]="demoSize()"
              [disabled]="demoDisabled()"
              [loading]="demoLoading()"
            >
              Click me
            </ds-button>
          </doc-demo-container>
        </div>

        <!-- Demo 2: All Variants -->
        <div class="demo-block">
          <h3 class="demo-block__title">All Variants</h3>
          <p class="demo-block__desc">Toutes les variantes de couleur disponibles.</p>

          <doc-demo-container [code]="definition.demos[1].code">
            <div class="demo-row">
              <ds-button variant="primary">Primary</ds-button>
              <ds-button variant="secondary">Secondary</ds-button>
              <ds-button variant="ghost">Ghost</ds-button>
              <ds-button variant="success">Success</ds-button>
              <ds-button variant="warning">Warning</ds-button>
              <ds-button variant="error">Error</ds-button>
              <ds-button variant="info">Info</ds-button>
            </div>
          </doc-demo-container>
        </div>

        <!-- Demo 3: Sizes -->
        <div class="demo-block">
          <h3 class="demo-block__title">Sizes</h3>
          <p class="demo-block__desc">Les trois tailles disponibles.</p>

          <doc-demo-container [code]="definition.demos[2].code">
            <div class="demo-row demo-row--align-center">
              <ds-button size="sm">Small</ds-button>
              <ds-button size="md">Medium</ds-button>
              <ds-button size="lg">Large</ds-button>
            </div>
          </doc-demo-container>
        </div>

        <!-- Demo 4: Outline -->
        <div class="demo-block">
          <h3 class="demo-block__title">Outline Appearance</h3>
          <p class="demo-block__desc">Boutons avec apparence outline.</p>

          <doc-demo-container [code]="definition.demos[3].code">
            <div class="demo-row">
              <ds-button variant="primary" appearance="outline">Primary</ds-button>
              <ds-button variant="secondary" appearance="outline">Secondary</ds-button>
              <ds-button variant="success" appearance="outline">Success</ds-button>
            </div>
          </doc-demo-container>
        </div>

        <!-- Demo 5: States -->
        <div class="demo-block">
          <h3 class="demo-block__title">States</h3>
          <p class="demo-block__desc">États disabled et loading.</p>

          <doc-demo-container [code]="definition.demos[4].code">
            <div class="demo-row">
              <ds-button [disabled]="true">Disabled</ds-button>
              <ds-button [loading]="true">Loading</ds-button>
            </div>
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

    .demo-row {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .demo-row--align-center {
      align-items: center;
    }
  `]
})
export class ButtonPage {
  definition = DsButtonDefinition;

  // Valeurs du premier contrôle (Default)
  defaultValues = signal<ControlValues>({
    variant: 'primary',
    appearance: 'solid',
    size: 'md',
    disabled: false,
    loading: false,
  });

  // Computed signals typés pour le template
  demoVariant = computed(() => this.defaultValues()['variant'] as ButtonVariant);
  demoAppearance = computed(() => this.defaultValues()['appearance'] as ButtonAppearance);
  demoSize = computed(() => this.defaultValues()['size'] as ButtonSize);
  demoDisabled = computed(() => this.defaultValues()['disabled'] as boolean);
  demoLoading = computed(() => this.defaultValues()['loading'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }
}
