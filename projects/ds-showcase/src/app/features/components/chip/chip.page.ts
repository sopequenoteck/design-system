import { Component, signal, computed } from '@angular/core';
import { DsChip, ChipVariant, ChipSize, ChipColor } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsChipDefinition } from '../../../registry/definitions/ds-chip.definition';
import { ControlValues } from '../../../registry/types';

@Component({
  selector: 'app-chip-page',
  standalone: true,
  imports: [DsChip, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Chip avec contrôles interactifs.</p>
          <doc-demo-container
            [sources]="definition.demos[0].sources ?? []"
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-chip
              label="Chip"
              [variant]="demoVariant()"
              [size]="demoSize()"
              [color]="demoColor()"
              [removable]="demoRemovable()"
              [clickable]="demoClickable()"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Colors</h3>
          <p class="demo-block__desc">Les différentes couleurs.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <div class="demo-row">
              <ds-chip label="Default" color="default" />
              <ds-chip label="Primary" color="primary" />
              <ds-chip label="Success" color="success" />
              <ds-chip label="Warning" color="warning" />
              <ds-chip label="Error" color="error" />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Removable</h3>
          <p class="demo-block__desc">Chips avec bouton de suppression.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <div class="demo-row">
              @for (tag of tags(); track tag) {
                <ds-chip
                  [label]="tag"
                  [removable]="true"
                  (removed)="removeTag(tag)"
                />
              }
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Selectable</h3>
          <p class="demo-block__desc">Chips sélectionnables.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <div class="demo-row">
              <ds-chip
                label="Option A"
                [clickable]="true"
                [selected]="selectedA()"
                (clicked)="toggleA()"
              />
              <ds-chip
                label="Option B"
                [clickable]="true"
                [selected]="selectedB()"
                (clicked)="toggleB()"
              />
              <ds-chip
                label="Option C"
                [clickable]="true"
                [selected]="selectedC()"
                (clicked)="toggleC()"
              />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Sizes</h3>
          <p class="demo-block__desc">Les trois tailles disponibles.</p>
          <doc-demo-container [code]="definition.demos[4].code">
            <div class="demo-row">
              <ds-chip label="Small" size="sm" />
              <ds-chip label="Medium" size="md" />
              <ds-chip label="Large" size="lg" />
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
    .demo-row { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
  `]
})
export class ChipPage {
  definition = DsChipDefinition;

  tags = signal(['Vue', 'React', 'Angular', 'Svelte']);
  selectedA = signal(false);
  selectedB = signal(true);
  selectedC = signal(false);

  defaultValues = signal<ControlValues>({
    variant: 'filled',
    size: 'md',
    color: 'default',
    removable: false,
    clickable: false,
  });

  demoVariant = computed(() => this.defaultValues()['variant'] as ChipVariant);
  demoSize = computed(() => this.defaultValues()['size'] as ChipSize);
  demoColor = computed(() => this.defaultValues()['color'] as ChipColor);
  demoRemovable = computed(() => this.defaultValues()['removable'] as boolean);
  demoClickable = computed(() => this.defaultValues()['clickable'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  removeTag(tag: string): void {
    this.tags.update(t => t.filter(x => x !== tag));
  }

  toggleA(): void { this.selectedA.update(v => !v); }
  toggleB(): void { this.selectedB.update(v => !v); }
  toggleC(): void { this.selectedC.update(v => !v); }
}
