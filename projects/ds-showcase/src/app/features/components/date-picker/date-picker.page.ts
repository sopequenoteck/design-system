import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DsDatePicker, DatePickerSize } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsDatePickerDefinition } from '../../../registry/definitions/ds-date-picker.definition';
import { ControlValues } from '../../../registry/types';

@Component({
  selector: 'app-date-picker-page',
  standalone: true,
  imports: [FormsModule, DsDatePicker, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Date picker avec contrôles interactifs.</p>
          <doc-demo-container
            [sources]="definition.demos[0].sources ?? []"
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-date-picker
              [size]="demoSize()"
              [showTodayButton]="demoShowTodayButton()"
              [showClearButton]="demoShowClearButton()"
              [disabled]="demoDisabled()"
              (dateChange)="onDateChange($event)"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Range Mode</h3>
          <p class="demo-block__desc">Sélection d'une plage de dates.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <ds-date-picker
              mode="range"
              (rangeChange)="onRangeChange($event)"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Presets</h3>
          <p class="demo-block__desc">Presets pour sélection rapide (7 jours, 30 jours, etc.).</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <ds-date-picker
              mode="range"
              [showPresets]="true"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Min/Max Dates</h3>
          <p class="demo-block__desc">Limiter la plage de dates sélectionnables.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <ds-date-picker
              [minDate]="minDate"
              [maxDate]="maxDate"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Sizes</h3>
          <p class="demo-block__desc">Les trois tailles disponibles.</p>
          <doc-demo-container [code]="definition.demos[4].code">
            <div class="demo-row">
              <ds-date-picker size="sm" />
              <ds-date-picker size="md" />
              <ds-date-picker size="lg" />
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
    .demo-row { display: flex; gap: 24px; flex-wrap: wrap; }
  `]
})
export class DatePickerPage {
  definition = DsDatePickerDefinition;

  selectedDate: Date | null = null;

  // Limiter aux 3 prochains mois
  minDate = new Date();
  maxDate = new Date(new Date().setMonth(new Date().getMonth() + 3));

  defaultValues = signal<ControlValues>({
    size: 'md',
    showTodayButton: true,
    showClearButton: true,
    disabled: false,
  });

  demoSize = computed(() => this.defaultValues()['size'] as DatePickerSize);
  demoShowTodayButton = computed(() => this.defaultValues()['showTodayButton'] as boolean);
  demoShowClearButton = computed(() => this.defaultValues()['showClearButton'] as boolean);
  demoDisabled = computed(() => this.defaultValues()['disabled'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  onDateChange(date: Date | null): void {
    this.selectedDate = date;
  }

  onRangeChange(range: { start: Date | null; end: Date | null }): void {
    console.log('Range selected:', range);
  }
}
