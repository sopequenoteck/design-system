import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DsTimePicker, TimePickerSize } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsTimePickerDefinition } from '../../../registry/definitions/ds-time-picker.definition';
import { ControlValues } from '../../../registry/types';

@Component({
  selector: 'app-time-picker-page',
  standalone: true,
  imports: [FormsModule, DsTimePicker, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Time picker avec contrôles interactifs.</p>
          <doc-demo-container
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-time-picker
              [(ngModel)]="selectedTime"
              [size]="demoSize()"
              [showSeconds]="demoShowSeconds()"
              [disabled]="demoDisabled()"
            />
            <p class="demo-value">Heure: {{ selectedTime || 'Non définie' }}</p>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">12h Format</h3>
          <p class="demo-block__desc">Format 12 heures avec AM/PM.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <ds-time-picker
              [(ngModel)]="time12h"
              format="12h"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Seconds</h3>
          <p class="demo-block__desc">Affichage des secondes.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <ds-time-picker
              [(ngModel)]="timeWithSeconds"
              [showSeconds]="true"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Custom Steps</h3>
          <p class="demo-block__desc">Incréments personnalisés (15 minutes).</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <ds-time-picker
              [(ngModel)]="time15min"
              [minuteStep]="15"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Sizes</h3>
          <p class="demo-block__desc">Les trois tailles disponibles.</p>
          <doc-demo-container [code]="definition.demos[4].code">
            <div class="demo-row">
              <ds-time-picker size="sm" />
              <ds-time-picker size="md" />
              <ds-time-picker size="lg" />
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
    .demo-row { display: flex; gap: 16px; flex-wrap: wrap; }
    .demo-value { margin-top: 8px; font-size: 0.875rem; color: var(--text-muted); }
  `]
})
export class TimePickerPage {
  definition = DsTimePickerDefinition;

  selectedTime = '14:30';
  time12h = '14:30';
  timeWithSeconds = '14:30:00';
  time15min = '14:30';

  defaultValues = signal<ControlValues>({
    size: 'md',
    showSeconds: false,
    disabled: false,
  });

  demoSize = computed(() => this.defaultValues()['size'] as TimePickerSize);
  demoShowSeconds = computed(() => this.defaultValues()['showSeconds'] as boolean);
  demoDisabled = computed(() => this.defaultValues()['disabled'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }
}
