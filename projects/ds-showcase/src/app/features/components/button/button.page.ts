import { Component, signal, computed } from '@angular/core';
import { DsButton, ButtonVariant, ButtonAppearance, ButtonSize } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { ComponentPageHeader } from '../../../shared/page/component-page-header';
import { DocIcon } from '../../../shared/icon/doc-icon';
import { UsedInSection } from '../../../shared/used-in/used-in-section';
import { DsButtonDefinition } from '../../../registry/definitions/ds-button.definition';
import { ControlValues } from '../../../registry/types';

@Component({
  selector: 'app-button-page',
  standalone: true,
  imports: [DsButton, DemoContainer, PropsTable, ComponentPageHeader, DocIcon, UsedInSection],
  template: `
    <div class="component-page">
      <doc-component-page-header
        category="actions"
        [name]="definition.name"
        [description]="definition.description"
        [selector]="definition.selector"
        version="1.7.0"
        status="stable"
        sourceLink="https://github.com/kksdev/ds-angular/blob/main/projects/ds-angular/src/lib/components/ds-button"
      />

      <!-- Demo 1: Default avec controls -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="eye" size="sm" />
            Playground
          </h2>
          <p class="section-desc">Explorez les différentes options du composant de manière interactive.</p>
        </div>

        <doc-demo-container
          [sources]="definition.demos[0].sources ?? []"
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
      </section>

      <!-- Demo 2: All Variants -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Variantes</h2>
          <p class="section-desc">Toutes les variantes de couleur disponibles.</p>
        </div>

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
      </section>

      <!-- Demo 3: Sizes -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Tailles</h2>
          <p class="section-desc">Les trois tailles disponibles : small, medium et large.</p>
        </div>

        <doc-demo-container [code]="definition.demos[2].code">
          <div class="demo-row demo-row--align-center">
            <ds-button size="sm">Small</ds-button>
            <ds-button size="md">Medium</ds-button>
            <ds-button size="lg">Large</ds-button>
          </div>
        </doc-demo-container>
      </section>

      <!-- Demo 4: Outline -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Apparence Outline</h2>
          <p class="section-desc">Boutons avec bordure et fond transparent.</p>
        </div>

        <doc-demo-container [code]="definition.demos[3].code">
          <div class="demo-row">
            <ds-button variant="primary" appearance="outline">Primary</ds-button>
            <ds-button variant="secondary" appearance="outline">Secondary</ds-button>
            <ds-button variant="success" appearance="outline">Success</ds-button>
          </div>
        </doc-demo-container>
      </section>

      <!-- Demo 5: States -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">États</h2>
          <p class="section-desc">États disabled et loading.</p>
        </div>

        <doc-demo-container [code]="definition.demos[4].code">
          <div class="demo-row">
            <ds-button [disabled]="true">Disabled</ds-button>
            <ds-button [loading]="true">Loading</ds-button>
          </div>
        </doc-demo-container>
      </section>

      <!-- API Reference -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="code" size="sm" />
            API Reference
          </h2>
          <p class="section-desc">Documentation complète des propriétés, événements et slots.</p>
        </div>

        <doc-props-table [props]="definition.props" />
      </section>

      <!-- Utilisé dans -->
      <doc-used-in-section [componentId]="definition.id" />
    </div>
  `,
  styles: [`
    .component-page {
      max-width: 900px;
    }

    .page-section {
      margin-bottom: var(--doc-space-2xl, 48px);
      animation: doc-fade-in-up 300ms ease-out;
      animation-fill-mode: both;

      &:nth-child(2) { animation-delay: 50ms; }
      &:nth-child(3) { animation-delay: 100ms; }
      &:nth-child(4) { animation-delay: 150ms; }
      &:nth-child(5) { animation-delay: 200ms; }
      &:nth-child(6) { animation-delay: 250ms; }
      &:nth-child(7) { animation-delay: 300ms; }
    }

    .section-header {
      margin-bottom: var(--doc-space-lg, 24px);
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
      margin: 0 0 var(--doc-space-sm, 8px) 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--doc-text-primary, #0f172a);
    }

    .section-desc {
      margin: 0;
      font-size: 0.9375rem;
      color: var(--doc-text-secondary, #475569);
      line-height: 1.6;
    }

    .demo-row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--doc-space-md, 16px);
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
