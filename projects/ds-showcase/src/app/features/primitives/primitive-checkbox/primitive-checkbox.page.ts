import { Component, signal, computed } from '@angular/core';
import { PrimitiveCheckbox, CheckboxSize } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { PrimitiveCheckboxDefinition } from '../../../registry/definitions/primitive-checkbox.definition';
import { ControlValues } from '../../../registry/types';

@Component({
  selector: 'app-primitive-checkbox-page',
  standalone: true,
  imports: [PrimitiveCheckbox, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Checkbox avec contrôles interactifs.</p>
          <doc-demo-container
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <primitive-checkbox
              [label]="demoLabel()"
              [size]="demoSize()"
              [disabled]="demoDisabled()"
              [indeterminate]="demoIndeterminate()"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">All States</h3>
          <p class="demo-block__desc">Les trois états possibles.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <div class="demo-column">
              <primitive-checkbox label="Non coché" />
              <primitive-checkbox [checked]="true" label="Coché" />
              <primitive-checkbox [indeterminate]="true" label="Indéterminé" />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Sizes</h3>
          <p class="demo-block__desc">Les trois tailles disponibles.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <div class="demo-column">
              <primitive-checkbox size="sm" label="Small" />
              <primitive-checkbox size="md" label="Medium" />
              <primitive-checkbox size="lg" label="Large" />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Disabled</h3>
          <p class="demo-block__desc">Checkboxes désactivées.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <div class="demo-column">
              <primitive-checkbox [disabled]="true" label="Désactivé (non coché)" />
              <primitive-checkbox [disabled]="true" [checked]="true" label="Désactivé (coché)" />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Checkbox Group</h3>
          <p class="demo-block__desc">Groupe de checkboxes pour sélection multiple.</p>
          <doc-demo-container [code]="definition.demos[4].code">
            <div class="demo-column">
              <primitive-checkbox label="Option A" />
              <primitive-checkbox label="Option B" />
              <primitive-checkbox label="Option C" />
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
    .component-title { margin: 0 0 12px 0; font-size: 2rem; font-weight: 700; color: var(--text-default, #1a1a1a); }
    .component-desc { margin: 0 0 16px 0; font-size: 1.125rem; color: var(--text-muted, #6b7280); line-height: 1.6; }
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
    .demo-block__title { margin: 0 0 8px 0; font-size: 1rem; font-weight: 600; color: var(--text-default, #1a1a1a); }
    .demo-block__desc { margin: 0 0 16px 0; font-size: 0.875rem; color: var(--text-muted, #6b7280); }
    .demo-column { display: flex; flex-direction: column; gap: 12px; }
  `]
})
export class PrimitiveCheckboxPage {
  definition = PrimitiveCheckboxDefinition;

  defaultValues = signal<ControlValues>({
    label: "J'accepte les conditions",
    size: 'md',
    disabled: false,
    indeterminate: false,
  });

  demoLabel = computed(() => this.defaultValues()['label'] as string);
  demoSize = computed(() => this.defaultValues()['size'] as CheckboxSize);
  demoDisabled = computed(() => this.defaultValues()['disabled'] as boolean);
  demoIndeterminate = computed(() => this.defaultValues()['indeterminate'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }
}
