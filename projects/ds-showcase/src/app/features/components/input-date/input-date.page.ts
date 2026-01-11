import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DsInputDate, InputDateSize } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { ControlValues, ControlConfig, PropDefinition } from '../../../registry/types';

@Component({
  selector: 'app-input-date-page',
  standalone: true,
  imports: [FormsModule, DatePipe, DsInputDate, DemoContainer, PropsTable],
  template: `
    <div class="component-page">
      <header class="component-header">
        <div class="component-header__meta">
          <span class="component-badge">Input</span>
        </div>
        <h1 class="component-title">Input Date</h1>
        <p class="component-desc">Composant de saisie de date avec calendrier popup, saisie manuelle et intégration formulaires Angular.</p>
        <code class="component-selector">&lt;ds-input-date&gt;</code>
      </header>

      <section class="component-section">
        <h2>Exemples</h2>

        <div class="demo-block">
          <h3 class="demo-block__title">Default</h3>
          <p class="demo-block__desc">Input date avec contrôles interactifs.</p>
          <doc-demo-container
            [code]="defaultCode"
            [controls]="defaultControls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-input-date
              [(ngModel)]="selectedDate"
              [size]="demoSize()"
              [disabled]="demoDisabled()"
              [clearable]="demoClearable()"
              [label]="demoLabel()"
              [placeholder]="demoPlaceholder()"
            />
            <p class="demo-value">Date: {{ selectedDate | date:'dd/MM/yyyy' }}</p>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Label and Helper</h3>
          <p class="demo-block__desc">Label et texte d'aide sous l'input.</p>
          <doc-demo-container [code]="labelHelperCode">
            <ds-input-date
              [(ngModel)]="dateWithLabel"
              label="Date de naissance"
              helper="Format: jj/mm/aaaa"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Constraints</h3>
          <p class="demo-block__desc">Dates limitées à une plage min/max.</p>
          <doc-demo-container [code]="constraintsCode">
            <ds-input-date
              [(ngModel)]="constrainedDate"
              label="Réservation"
              [minDate]="today"
              [maxDate]="maxDate"
              helper="Sélectionnez une date dans les 30 prochains jours"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Sizes</h3>
          <p class="demo-block__desc">Les trois tailles disponibles.</p>
          <doc-demo-container [code]="sizesCode">
            <div class="demo-row">
              <ds-input-date size="sm" placeholder="Small" />
              <ds-input-date size="md" placeholder="Medium" />
              <ds-input-date size="lg" placeholder="Large" />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">States</h3>
          <p class="demo-block__desc">États disabled, readonly et erreur.</p>
          <doc-demo-container [code]="statesCode">
            <div class="demo-col">
              <ds-input-date
                [value]="fixedDate"
                [disabled]="true"
                label="Disabled"
              />
              <ds-input-date
                [value]="fixedDate"
                [readonly]="true"
                label="Readonly"
              />
              <ds-input-date
                label="With Error"
                error="Date invalide"
              />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Without Clear Button</h3>
          <p class="demo-block__desc">Sans bouton de suppression.</p>
          <doc-demo-container [code]="noClearCode">
            <ds-input-date
              [(ngModel)]="mandatoryDate"
              [clearable]="false"
              label="Date obligatoire"
            />
          </doc-demo-container>
        </div>
      </section>

      <section class="component-section">
        <h2>API Reference</h2>
        <doc-props-table [props]="props" />
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
    .demo-row { display: flex; gap: 16px; flex-wrap: wrap; align-items: flex-start; }
    .demo-col { display: flex; flex-direction: column; gap: 16px; }
    .demo-value { margin-top: 8px; font-size: 0.875rem; color: var(--text-muted); }
  `]
})
export class InputDatePage {
  // Demo values
  selectedDate: Date | null = new Date();
  dateWithLabel: Date | null = null;
  constrainedDate: Date | null = null;
  mandatoryDate: Date | null = new Date();
  fixedDate = new Date(2025, 0, 15);
  today = new Date();
  maxDate = new Date(new Date().setDate(new Date().getDate() + 30));

  // Controls
  defaultValues = signal<ControlValues>({
    size: 'md',
    disabled: false,
    clearable: true,
    label: 'Date',
    placeholder: 'dd/mm/yyyy',
  });

  demoSize = computed(() => this.defaultValues()['size'] as InputDateSize);
  demoDisabled = computed(() => this.defaultValues()['disabled'] as boolean);
  demoClearable = computed(() => this.defaultValues()['clearable'] as boolean);
  demoLabel = computed(() => this.defaultValues()['label'] as string);
  demoPlaceholder = computed(() => this.defaultValues()['placeholder'] as string);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  defaultControls: ControlConfig[] = [
    { name: 'size', type: 'select', options: ['sm', 'md', 'lg'], defaultValue: 'md' },
    { name: 'disabled', type: 'boolean', defaultValue: false },
    { name: 'clearable', type: 'boolean', defaultValue: true },
    { name: 'label', type: 'text', defaultValue: 'Date' },
    { name: 'placeholder', type: 'text', defaultValue: 'dd/mm/yyyy' },
  ];

  // Code snippets
  defaultCode = `<ds-input-date
  [(ngModel)]="selectedDate"
  label="Date"
  placeholder="dd/mm/yyyy"
/>`;

  labelHelperCode = `<ds-input-date
  [(ngModel)]="birthDate"
  label="Date de naissance"
  helper="Format: jj/mm/aaaa"
/>`;

  constraintsCode = `<ds-input-date
  [(ngModel)]="reservationDate"
  label="Réservation"
  [minDate]="today"
  [maxDate]="maxDate"
  helper="Sélectionnez une date dans les 30 prochains jours"
/>`;

  sizesCode = `<ds-input-date size="sm" placeholder="Small" />
<ds-input-date size="md" placeholder="Medium" />
<ds-input-date size="lg" placeholder="Large" />`;

  statesCode = `<!-- Disabled -->
<ds-input-date [disabled]="true" label="Disabled" />

<!-- Readonly -->
<ds-input-date [readonly]="true" label="Readonly" />

<!-- With Error -->
<ds-input-date label="With Error" error="Date invalide" />`;

  noClearCode = `<ds-input-date
  [(ngModel)]="mandatoryDate"
  [clearable]="false"
  label="Date obligatoire"
/>`;

  // Props table
  props: PropDefinition[] = [
    { name: 'value', kind: 'input', type: 'Date | null', defaultValue: 'null', description: 'Valeur de la date sélectionnée' },
    { name: 'size', kind: 'input', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Taille du composant' },
    { name: 'disabled', kind: 'input', type: 'boolean', defaultValue: 'false', description: 'État désactivé' },
    { name: 'readonly', kind: 'input', type: 'boolean', defaultValue: 'false', description: 'État lecture seule' },
    { name: 'placeholder', kind: 'input', type: 'string', defaultValue: "'dd/mm/yyyy'", description: 'Placeholder de l\'input' },
    { name: 'label', kind: 'input', type: 'string', defaultValue: 'undefined', description: 'Label affiché au-dessus' },
    { name: 'error', kind: 'input', type: 'string', defaultValue: 'undefined', description: 'Message d\'erreur' },
    { name: 'helper', kind: 'input', type: 'string', defaultValue: 'undefined', description: 'Texte d\'aide' },
    { name: 'minDate', kind: 'input', type: 'Date | null', defaultValue: 'null', description: 'Date minimum sélectionnable' },
    { name: 'maxDate', kind: 'input', type: 'Date | null', defaultValue: 'null', description: 'Date maximum sélectionnable' },
    { name: 'clearable', kind: 'input', type: 'boolean', defaultValue: 'true', description: 'Affiche le bouton clear' },
    { name: 'dateChange', kind: 'output', type: 'EventEmitter<Date | null>', description: 'Émis quand la date change' },
  ];
}
