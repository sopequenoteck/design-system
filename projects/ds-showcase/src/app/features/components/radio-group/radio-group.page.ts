import { Component, signal, computed } from '@angular/core';
import { DsRadioGroup, RadioOption, RadioGroupLayout, RadioSize } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsRadioGroupDefinition } from '../../../registry/definitions/ds-radio-group.definition';
import { ControlValues } from '../../../registry/types';

@Component({
  selector: 'app-radio-group-page',
  standalone: true,
  imports: [DsRadioGroup, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Radio group avec contrôles interactifs.</p>

          <doc-demo-container
            [sources]="definition.demos[0].sources ?? []"
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-radio-group
              [label]="demoLabel()"
              [options]="defaultOptions"
              [layout]="demoLayout()"
              [size]="demoSize()"
              [required]="demoRequired()"
              [disabled]="demoDisabled()"
            />
          </doc-demo-container>
        </div>

        <!-- Demo 2: Horizontal -->
        <div class="demo-block">
          <h3 class="demo-block__title">Horizontal</h3>
          <p class="demo-block__desc">Layout horizontal pour options courtes.</p>

          <doc-demo-container [code]="definition.demos[1].code">
            <ds-radio-group
              label="Taille"
              [options]="sizeOptions"
              layout="horizontal"
            />
          </doc-demo-container>
        </div>

        <!-- Demo 3: With Disabled Option -->
        <div class="demo-block">
          <h3 class="demo-block__title">With Disabled Option</h3>
          <p class="demo-block__desc">Options individuellement désactivées.</p>

          <doc-demo-container [code]="definition.demos[2].code">
            <ds-radio-group
              label="Plan tarifaire"
              [options]="planOptions"
            />
          </doc-demo-container>
        </div>

        <!-- Demo 4: Sizes -->
        <div class="demo-block">
          <h3 class="demo-block__title">Sizes</h3>
          <p class="demo-block__desc">Les trois tailles disponibles.</p>

          <doc-demo-container [code]="definition.demos[3].code">
            <div class="demo-column">
              <ds-radio-group size="sm" label="Small" [options]="abOptions" />
              <ds-radio-group size="md" label="Medium" [options]="abOptions" />
              <ds-radio-group size="lg" label="Large" [options]="abOptions" />
            </div>
          </doc-demo-container>
        </div>

        <!-- Demo 5: With Error -->
        <div class="demo-block">
          <h3 class="demo-block__title">With Error</h3>
          <p class="demo-block__desc">Radio group en état d'erreur.</p>

          <doc-demo-container [code]="definition.demos[4].code">
            <ds-radio-group
              label="Type de contrat"
              [required]="true"
              error="Vous devez sélectionner un type de contrat"
              [options]="contractOptions"
            />
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

    .demo-column {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
  `]
})
export class RadioGroupPage {
  definition = DsRadioGroupDefinition;

  // Options de démo
  defaultOptions: RadioOption[] = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
  ];

  sizeOptions: RadioOption[] = [
    { label: 'S', value: 'sm' },
    { label: 'M', value: 'md' },
    { label: 'L', value: 'lg' },
    { label: 'XL', value: 'xl' },
  ];

  planOptions: RadioOption[] = [
    { label: 'Gratuit', value: 'free' },
    { label: 'Pro', value: 'pro' },
    { label: 'Enterprise (bientôt)', value: 'enterprise', disabled: true },
  ];

  abOptions: RadioOption[] = [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
  ];

  contractOptions: RadioOption[] = [
    { label: 'CDI', value: 'cdi' },
    { label: 'CDD', value: 'cdd' },
    { label: 'Freelance', value: 'freelance' },
  ];

  // Valeurs du premier contrôle (Default)
  defaultValues = signal<ControlValues>({
    label: 'Choisissez une option',
    layout: 'vertical',
    size: 'md',
    required: false,
    disabled: false,
  });

  // Computed signals typés pour le template
  demoLabel = computed(() => this.defaultValues()['label'] as string);
  demoLayout = computed(() => this.defaultValues()['layout'] as RadioGroupLayout);
  demoSize = computed(() => this.defaultValues()['size'] as RadioSize);
  demoRequired = computed(() => this.defaultValues()['required'] as boolean);
  demoDisabled = computed(() => this.defaultValues()['disabled'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }
}
