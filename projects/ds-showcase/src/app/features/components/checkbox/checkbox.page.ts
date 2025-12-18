import { Component, signal, computed } from '@angular/core';
import { DsCheckbox, CheckboxSize } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsCheckboxDefinition } from '../../../registry/definitions/ds-checkbox.definition';
import { ControlValues } from '../../../registry/types';

@Component({
  selector: 'app-checkbox-page',
  standalone: true,
  imports: [DsCheckbox, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Checkbox avec contrôles interactifs.</p>

          <doc-demo-container
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-checkbox
              [label]="demoLabel()"
              [size]="demoSize()"
              [required]="demoRequired()"
              [disabled]="demoDisabled()"
              [indeterminate]="demoIndeterminate()"
            />
          </doc-demo-container>
        </div>

        <!-- Demo 2: With Helper -->
        <div class="demo-block">
          <h3 class="demo-block__title">With Helper</h3>
          <p class="demo-block__desc">Checkbox avec texte d'aide.</p>

          <doc-demo-container [code]="definition.demos[1].code">
            <ds-checkbox
              label="Newsletter"
              helper="Recevez nos dernières actualités par email"
            />
          </doc-demo-container>
        </div>

        <!-- Demo 3: With Error -->
        <div class="demo-block">
          <h3 class="demo-block__title">With Error</h3>
          <p class="demo-block__desc">Checkbox en état d'erreur avec message de validation.</p>

          <doc-demo-container [code]="definition.demos[2].code">
            <ds-checkbox
              label="J'accepte les conditions d'utilisation"
              [required]="true"
              error="Vous devez accepter les conditions pour continuer"
            />
          </doc-demo-container>
        </div>

        <!-- Demo 4: Sizes -->
        <div class="demo-block">
          <h3 class="demo-block__title">Sizes</h3>
          <p class="demo-block__desc">Les trois tailles disponibles.</p>

          <doc-demo-container [code]="definition.demos[3].code">
            <div class="demo-column">
              <ds-checkbox size="sm" label="Small" />
              <ds-checkbox size="md" label="Medium" />
              <ds-checkbox size="lg" label="Large" />
            </div>
          </doc-demo-container>
        </div>

        <!-- Demo 5: States -->
        <div class="demo-block">
          <h3 class="demo-block__title">States</h3>
          <p class="demo-block__desc">États normal et indéterminé.</p>

          <doc-demo-container [code]="definition.demos[4].code">
            <div class="demo-column">
              <ds-checkbox label="Non coché" />
              <ds-checkbox [indeterminate]="true" label="Indéterminé" />
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

    .demo-column {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  `]
})
export class CheckboxPage {
  definition = DsCheckboxDefinition;

  // Valeurs du premier contrôle (Default)
  defaultValues = signal<ControlValues>({
    label: "J'accepte les conditions",
    size: 'md',
    required: false,
    disabled: false,
    indeterminate: false,
  });

  // Computed signals typés pour le template
  demoLabel = computed(() => this.defaultValues()['label'] as string);
  demoSize = computed(() => this.defaultValues()['size'] as CheckboxSize);
  demoRequired = computed(() => this.defaultValues()['required'] as boolean);
  demoDisabled = computed(() => this.defaultValues()['disabled'] as boolean);
  demoIndeterminate = computed(() => this.defaultValues()['indeterminate'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }
}
