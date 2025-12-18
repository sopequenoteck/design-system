import { Component, signal, computed } from '@angular/core';
import { DsSelect } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsSelectDefinition } from '../../../registry/definitions/ds-select.definition';
import { ControlValues } from '../../../registry/types';

type SelectSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-select-page',
  standalone: true,
  imports: [DsSelect, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Select par défaut avec contrôles interactifs.</p>

          <doc-demo-container
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-select
              label="Pays"
              placeholder="Sélectionner un pays"
              [options]="countryOptions"
              [size]="demoSize()"
              [searchable]="demoSearchable()"
              [clearable]="demoClearable()"
              [disabled]="demoDisabled()"
            />
          </doc-demo-container>
        </div>

        <!-- Demo 2: Searchable -->
        <div class="demo-block">
          <h3 class="demo-block__title">Searchable</h3>
          <p class="demo-block__desc">Select avec recherche intégrée.</p>

          <doc-demo-container [code]="definition.demos[1].code">
            <div class="demo-column">
              <ds-select
                label="Rechercher un pays"
                [options]="allCountries"
                [searchable]="true"
                placeholder="Tapez pour rechercher..."
              />
            </div>
          </doc-demo-container>
        </div>

        <!-- Demo 3: States -->
        <div class="demo-block">
          <h3 class="demo-block__title">States</h3>
          <p class="demo-block__desc">États disabled et error.</p>

          <doc-demo-container [code]="definition.demos[2].code">
            <div class="demo-column">
              <ds-select
                label="Disabled"
                [options]="countryOptions"
                [disabled]="true"
                placeholder="Non modifiable"
              />
              <ds-select
                label="Error"
                [options]="countryOptions"
                error="Veuillez sélectionner une option"
              />
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
      gap: 16px;
      max-width: 320px;
    }
  `]
})
export class SelectPage {
  definition = DsSelectDefinition;

  countryOptions = [
    { value: 'fr', label: 'France' },
    { value: 'be', label: 'Belgique' },
    { value: 'ch', label: 'Suisse' },
    { value: 'ca', label: 'Canada' },
  ];

  allCountries = [
    { value: 'fr', label: 'France' },
    { value: 'be', label: 'Belgique' },
    { value: 'ch', label: 'Suisse' },
    { value: 'ca', label: 'Canada' },
    { value: 'de', label: 'Allemagne' },
    { value: 'es', label: 'Espagne' },
    { value: 'it', label: 'Italie' },
    { value: 'uk', label: 'Royaume-Uni' },
    { value: 'us', label: 'États-Unis' },
    { value: 'jp', label: 'Japon' },
    { value: 'cn', label: 'Chine' },
    { value: 'br', label: 'Brésil' },
  ];

  defaultValues = signal<ControlValues>({
    size: 'md',
    searchable: false,
    clearable: false,
    disabled: false,
  });

  demoSize = computed(() => this.defaultValues()['size'] as SelectSize);
  demoSearchable = computed(() => this.defaultValues()['searchable'] as boolean);
  demoClearable = computed(() => this.defaultValues()['clearable'] as boolean);
  demoDisabled = computed(() => this.defaultValues()['disabled'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }
}
