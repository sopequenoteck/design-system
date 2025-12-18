import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DsCombobox, DsComboboxOption, DsComboboxSize } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsComboboxDefinition } from '../../../registry/definitions/ds-combobox.definition';
import { ControlValues } from '../../../registry/types';

@Component({
  selector: 'app-combobox-page',
  standalone: true,
  imports: [FormsModule, DsCombobox, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Combobox avec contrôles interactifs.</p>
          <doc-demo-container
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-combobox
              [options]="countryOptions"
              [size]="demoSize()"
              [clearable]="demoClearable()"
              [disabled]="demoDisabled()"
              placeholder="Rechercher un pays..."
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Descriptions</h3>
          <p class="demo-block__desc">Options avec descriptions détaillées.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <ds-combobox
              [options]="optionsWithDesc"
              placeholder="Rechercher un framework..."
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Allow Custom Values</h3>
          <p class="demo-block__desc">Permet de saisir des valeurs personnalisées.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <ds-combobox
              [options]="countryOptions"
              [allowCustom]="true"
              placeholder="Tapez ou sélectionnez..."
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Minimum Characters</h3>
          <p class="demo-block__desc">Filtrage déclenché après 2 caractères.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <ds-combobox
              [options]="countryOptions"
              [minChars]="2"
              placeholder="Tapez au moins 2 caractères..."
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Sizes</h3>
          <p class="demo-block__desc">Les trois tailles disponibles.</p>
          <doc-demo-container [code]="definition.demos[4].code">
            <div class="demo-column">
              <ds-combobox [options]="countryOptions" size="sm" placeholder="Small" />
              <ds-combobox [options]="countryOptions" size="md" placeholder="Medium" />
              <ds-combobox [options]="countryOptions" size="lg" placeholder="Large" />
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
    .demo-column { display: flex; flex-direction: column; gap: 16px; }
  `]
})
export class ComboboxPage {
  definition = DsComboboxDefinition;

  countryOptions: DsComboboxOption[] = [
    { value: 'fr', label: 'France' },
    { value: 'de', label: 'Allemagne' },
    { value: 'es', label: 'Espagne' },
    { value: 'it', label: 'Italie' },
    { value: 'uk', label: 'Royaume-Uni' },
    { value: 'us', label: 'États-Unis' },
    { value: 'ca', label: 'Canada' },
    { value: 'jp', label: 'Japon' },
    { value: 'cn', label: 'Chine' },
    { value: 'br', label: 'Brésil' },
  ];

  optionsWithDesc: DsComboboxOption[] = [
    { value: 'react', label: 'React', description: 'Bibliothèque UI de Facebook' },
    { value: 'angular', label: 'Angular', description: 'Framework complet de Google' },
    { value: 'vue', label: 'Vue.js', description: 'Framework progressif' },
    { value: 'svelte', label: 'Svelte', description: 'Compilateur réactif' },
  ];

  defaultValues = signal<ControlValues>({
    size: 'md',
    clearable: true,
    disabled: false,
  });

  demoSize = computed(() => this.defaultValues()['size'] as DsComboboxSize);
  demoClearable = computed(() => this.defaultValues()['clearable'] as boolean);
  demoDisabled = computed(() => this.defaultValues()['disabled'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }
}
