import { Component, signal, computed } from '@angular/core';
import { DsCard, CardVariant, CardSize } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsCardDefinition } from '../../../registry/definitions/ds-card.definition';
import { ControlValues } from '../../../registry/types';

@Component({
  selector: 'app-card-page',
  standalone: true,
  imports: [DsCard, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Card avec contrôles interactifs.</p>
          <doc-demo-container
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-card
              [variant]="demoVariant()"
              [size]="demoSize()"
              [clickable]="demoClickable()"
              [disabled]="demoDisabled()"
            >
              <div header>Titre de la carte</div>
              <p>Contenu principal de la carte avec du texte d'exemple.</p>
              <div footer>Actions</div>
            </ds-card>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Variants</h3>
          <p class="demo-block__desc">Les trois variantes visuelles.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <div class="demo-grid">
              <ds-card variant="default">
                <div header>Default</div>
                <p>Carte avec bordure simple.</p>
              </ds-card>

              <ds-card variant="elevated">
                <div header>Elevated</div>
                <p>Carte avec ombre portée.</p>
              </ds-card>

              <ds-card variant="outlined">
                <div header>Outlined</div>
                <p>Carte avec bordure accentuée.</p>
              </ds-card>
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Sizes</h3>
          <p class="demo-block__desc">Les trois tailles disponibles.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <div class="demo-grid">
              <ds-card size="sm">
                <div header>Small</div>
                <p>Padding réduit.</p>
              </ds-card>

              <ds-card size="md">
                <div header>Medium</div>
                <p>Padding standard.</p>
              </ds-card>

              <ds-card size="lg">
                <div header>Large</div>
                <p>Padding étendu.</p>
              </ds-card>
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Clickable</h3>
          <p class="demo-block__desc">Carte interactive avec effet hover.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <ds-card [clickable]="true" variant="elevated">
              <div header>Carte cliquable</div>
              <p>Survolez pour voir l'effet hover.</p>
            </ds-card>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Rich Content</h3>
          <p class="demo-block__desc">Carte avec contenu riche.</p>
          <doc-demo-container [code]="definition.demos[4].code">
            <ds-card variant="elevated" size="lg">
              <div header class="rich-header">
                <h3>Article Title</h3>
                <span class="badge">New</span>
              </div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <div footer class="rich-footer">
                <button class="btn-ghost">Cancel</button>
                <button class="btn-primary">Read More</button>
              </div>
            </ds-card>
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
    .demo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
    .rich-header { display: flex; align-items: center; gap: 12px; }
    .rich-header h3 { margin: 0; font-size: 1.125rem; }
    .badge { background: #10b981; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; }
    .rich-footer { display: flex; gap: 8px; justify-content: flex-end; }
    .btn-ghost { background: transparent; border: 1px solid var(--border-default); padding: 6px 12px; border-radius: 4px; cursor: pointer; }
    .btn-primary { background: var(--color-primary, #3b82f6); color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; }
  `]
})
export class CardPage {
  definition = DsCardDefinition;

  defaultValues = signal<ControlValues>({
    variant: 'default',
    size: 'md',
    clickable: false,
    disabled: false,
  });

  demoVariant = computed(() => this.defaultValues()['variant'] as CardVariant);
  demoSize = computed(() => this.defaultValues()['size'] as CardSize);
  demoClickable = computed(() => this.defaultValues()['clickable'] as boolean);
  demoDisabled = computed(() => this.defaultValues()['disabled'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }
}
