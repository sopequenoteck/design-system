import { Component, signal, computed } from '@angular/core';
import { PrimitiveTextarea, TextareaState, TextareaSize, TextareaResize } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { PrimitiveTextareaDefinition } from '../../../registry/definitions/primitive-textarea.definition';
import { ControlValues } from '../../../registry/types';

@Component({
  selector: 'app-primitive-textarea-page',
  standalone: true,
  imports: [PrimitiveTextarea, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Textarea avec contrôles interactifs.</p>
          <doc-demo-container
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <primitive-textarea
              [state]="demoState()"
              [size]="demoSize()"
              [resize]="demoResize()"
              placeholder="Saisissez votre commentaire..."
              [disabled]="demoDisabled()"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">States</h3>
          <p class="demo-block__desc">Les quatre états visuels.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <div class="demo-column">
              <primitive-textarea state="default" placeholder="Default" />
              <primitive-textarea state="success" placeholder="Success" />
              <primitive-textarea state="warning" placeholder="Warning" />
              <primitive-textarea state="error" placeholder="Error" />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Sizes</h3>
          <p class="demo-block__desc">Les trois tailles disponibles.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <div class="demo-column">
              <primitive-textarea size="sm" placeholder="Small" />
              <primitive-textarea size="md" placeholder="Medium" />
              <primitive-textarea size="lg" placeholder="Large" />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Resize Modes</h3>
          <p class="demo-block__desc">Les quatre modes de redimensionnement.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <div class="demo-column">
              <primitive-textarea resize="none" placeholder="No resize" />
              <primitive-textarea resize="vertical" placeholder="Vertical only" />
              <primitive-textarea resize="horizontal" placeholder="Horizontal only" />
              <primitive-textarea resize="both" placeholder="Both directions" />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Rows</h3>
          <p class="demo-block__desc">Textarea avec nombre de lignes défini.</p>
          <doc-demo-container [code]="definition.demos[4].code">
            <div class="demo-column">
              <primitive-textarea [rows]="3" placeholder="3 lignes" />
              <primitive-textarea [rows]="6" placeholder="6 lignes" />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Maxlength</h3>
          <p class="demo-block__desc">Textarea avec limite de caractères.</p>
          <doc-demo-container [code]="definition.demos[5].code">
            <primitive-textarea [maxlength]="100" placeholder="Max 100 caractères" />
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
    .demo-column { display: flex; flex-direction: column; gap: 12px; max-width: 400px; }
  `]
})
export class PrimitiveTextareaPage {
  definition = PrimitiveTextareaDefinition;

  defaultValues = signal<ControlValues>({
    state: 'default',
    size: 'md',
    resize: 'vertical',
    disabled: false,
  });

  demoState = computed(() => this.defaultValues()['state'] as TextareaState);
  demoSize = computed(() => this.defaultValues()['size'] as TextareaSize);
  demoResize = computed(() => this.defaultValues()['resize'] as TextareaResize);
  demoDisabled = computed(() => this.defaultValues()['disabled'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }
}
