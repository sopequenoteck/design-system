import { Component, signal, computed } from '@angular/core';
import { PrimitiveButton, ButtonVariant, ButtonSize, ButtonAppearance } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { PrimitiveButtonDefinition } from '../../../registry/definitions/primitive-button.definition';
import { ControlValues } from '../../../registry/types';

@Component({
  selector: 'app-primitive-button-page',
  standalone: true,
  imports: [PrimitiveButton, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Bouton avec contrôles interactifs.</p>
          <doc-demo-container
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <primitive-button
              [variant]="demoVariant()"
              [size]="demoSize()"
              [appearance]="demoAppearance()"
              [disabled]="demoDisabled()"
              [block]="demoBlock()"
            >Cliquez ici</primitive-button>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">All Variants</h3>
          <p class="demo-block__desc">Toutes les variantes de couleur.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <div class="demo-row">
              <primitive-button variant="primary">Primary</primitive-button>
              <primitive-button variant="secondary">Secondary</primitive-button>
              <primitive-button variant="ghost">Ghost</primitive-button>
              <primitive-button variant="success">Success</primitive-button>
              <primitive-button variant="warning">Warning</primitive-button>
              <primitive-button variant="error">Error</primitive-button>
              <primitive-button variant="info">Info</primitive-button>
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Sizes</h3>
          <p class="demo-block__desc">Les trois tailles disponibles.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <div class="demo-row">
              <primitive-button size="sm">Small</primitive-button>
              <primitive-button size="md">Medium</primitive-button>
              <primitive-button size="lg">Large</primitive-button>
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Outline Variants</h3>
          <p class="demo-block__desc">Boutons avec bordure et fond transparent.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <div class="demo-row">
              <primitive-button variant="primary" appearance="outline">Primary</primitive-button>
              <primitive-button variant="success" appearance="outline">Success</primitive-button>
              <primitive-button variant="error" appearance="outline">Error</primitive-button>
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Disabled</h3>
          <p class="demo-block__desc">Boutons désactivés.</p>
          <doc-demo-container [code]="definition.demos[4].code">
            <div class="demo-row">
              <primitive-button [disabled]="true">Désactivé</primitive-button>
              <primitive-button variant="error" [disabled]="true">Supprimé (désactivé)</primitive-button>
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Block Mode</h3>
          <p class="demo-block__desc">Bouton en pleine largeur.</p>
          <doc-demo-container [code]="definition.demos[5].code">
            <primitive-button [block]="true">Bouton pleine largeur</primitive-button>
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
    .demo-row { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
  `]
})
export class PrimitiveButtonPage {
  definition = PrimitiveButtonDefinition;

  defaultValues = signal<ControlValues>({
    variant: 'primary',
    size: 'md',
    appearance: 'solid',
    disabled: false,
    block: false,
  });

  demoVariant = computed(() => this.defaultValues()['variant'] as ButtonVariant);
  demoSize = computed(() => this.defaultValues()['size'] as ButtonSize);
  demoAppearance = computed(() => this.defaultValues()['appearance'] as ButtonAppearance);
  demoDisabled = computed(() => this.defaultValues()['disabled'] as boolean);
  demoBlock = computed(() => this.defaultValues()['block'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }
}
