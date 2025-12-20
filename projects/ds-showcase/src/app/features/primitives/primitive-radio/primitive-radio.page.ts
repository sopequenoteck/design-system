import { Component, signal, computed } from '@angular/core';
import { PrimitiveRadio, RadioSize } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { PrimitiveRadioDefinition } from '../../../registry/definitions/primitive-radio.definition';
import { ControlValues } from '../../../registry/types';

@Component({
  selector: 'app-primitive-radio-page',
  standalone: true,
  imports: [PrimitiveRadio, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Radio avec contrôles interactifs.</p>
          <doc-demo-container
            [sources]="definition.demos[0].sources ?? []"
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <primitive-radio
              [label]="demoLabel()"
              [size]="demoSize()"
              [disabled]="demoDisabled()"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">States</h3>
          <p class="demo-block__desc">Les différents états.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <div class="demo-column">
              <primitive-radio label="Non sélectionné" />
              <primitive-radio [checked]="true" label="Sélectionné" />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Sizes</h3>
          <p class="demo-block__desc">Les trois tailles disponibles.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <div class="demo-column">
              <primitive-radio size="sm" label="Small" />
              <primitive-radio size="md" label="Medium" />
              <primitive-radio size="lg" label="Large" />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Disabled</h3>
          <p class="demo-block__desc">Radios désactivés.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <div class="demo-column">
              <primitive-radio [disabled]="true" label="Désactivé" />
              <primitive-radio [disabled]="true" [checked]="true" label="Désactivé (sélectionné)" />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Radio Group</h3>
          <p class="demo-block__desc">Groupe de radios avec sélection exclusive.</p>
          <doc-demo-container [code]="definition.demos[4].code">
            <div class="demo-column">
              <primitive-radio name="size" value="small" label="Petit" />
              <primitive-radio name="size" value="medium" label="Moyen" [checked]="true" />
              <primitive-radio name="size" value="large" label="Grand" />
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
export class PrimitiveRadioPage {
  definition = PrimitiveRadioDefinition;

  defaultValues = signal<ControlValues>({
    label: 'Option A',
    size: 'md',
    disabled: false,
  });

  demoLabel = computed(() => this.defaultValues()['label'] as string);
  demoSize = computed(() => this.defaultValues()['size'] as RadioSize);
  demoDisabled = computed(() => this.defaultValues()['disabled'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }
}
