import { Component, signal, computed } from '@angular/core';
import { DsSearchInput, SearchInputSize } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsSearchInputDefinition } from '../../../registry/definitions/ds-search-input.definition';
import { ControlValues } from '../../../registry/types';

@Component({
  selector: 'app-search-input-page',
  standalone: true,
  imports: [DsSearchInput, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Search input avec contrôles interactifs.</p>
          <doc-demo-container
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-search-input
              [placeholder]="demoPlaceholder()"
              [size]="demoSize()"
              [disabled]="demoDisabled()"
              [loading]="demoLoading()"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Debounce</h3>
          <p class="demo-block__desc">Debounce personnalisé de 500ms.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <ds-search-input
              placeholder="Recherche avec délai..."
              [debounceMs]="500"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Loading State</h3>
          <p class="demo-block__desc">Affichage du spinner pendant la recherche.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <ds-search-input
              placeholder="Recherche en cours..."
              [loading]="true"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Sizes</h3>
          <p class="demo-block__desc">Les trois tailles disponibles.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <div class="demo-column">
              <ds-search-input size="sm" placeholder="Small" />
              <ds-search-input size="md" placeholder="Medium" />
              <ds-search-input size="lg" placeholder="Large" />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Minimum Characters</h3>
          <p class="demo-block__desc">Recherche déclenchée après 3 caractères.</p>
          <doc-demo-container [code]="definition.demos[4].code">
            <ds-search-input
              placeholder="Tapez au moins 3 caractères..."
              [minChars]="3"
            />
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
    .demo-column { display: flex; flex-direction: column; gap: 12px; }
  `]
})
export class SearchInputPage {
  definition = DsSearchInputDefinition;

  defaultValues = signal<ControlValues>({
    placeholder: 'Rechercher...',
    size: 'md',
    disabled: false,
    loading: false,
  });

  demoPlaceholder = computed(() => this.defaultValues()['placeholder'] as string);
  demoSize = computed(() => this.defaultValues()['size'] as SearchInputSize);
  demoDisabled = computed(() => this.defaultValues()['disabled'] as boolean);
  demoLoading = computed(() => this.defaultValues()['loading'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }
}
