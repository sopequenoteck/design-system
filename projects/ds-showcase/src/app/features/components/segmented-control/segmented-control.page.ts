import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DsSegmentedControl, SegmentOption, SegmentedControlSize } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsSegmentedControlDefinition } from '../../../registry/definitions/ds-segmented-control.definition';
import { ControlValues } from '../../../registry/types';

@Component({
  selector: 'app-segmented-control-page',
  standalone: true,
  imports: [FormsModule, DsSegmentedControl, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Segmented control avec contrôles interactifs.</p>
          <doc-demo-container
            [sources]="definition.demos[0].sources ?? []"
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-segmented-control
              [(ngModel)]="selectedValue"
              [options]="basicOptions"
              [size]="demoSize()"
              [fullWidth]="demoFullWidth()"
              [disabled]="demoDisabled()"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Icons</h3>
          <p class="demo-block__desc">Options avec icônes FontAwesome.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <ds-segmented-control
              [(ngModel)]="viewMode"
              [options]="iconOptions"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Vertical Orientation</h3>
          <p class="demo-block__desc">Orientation verticale pour les menus latéraux.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <ds-segmented-control
              [(ngModel)]="section"
              [options]="sectionOptions"
              orientation="vertical"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Full Width</h3>
          <p class="demo-block__desc">Prend toute la largeur disponible.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <ds-segmented-control
              [(ngModel)]="tabValue"
              [options]="tabOptions"
              [fullWidth]="true"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Colors</h3>
          <p class="demo-block__desc">Les deux couleurs disponibles (primary, neutral).</p>
          <doc-demo-container [code]="definition.demos[4].code">
            <div class="demo-column">
              <ds-segmented-control
                [(ngModel)]="colorPrimary"
                [options]="colorOptions"
                color="primary"
              />
              <ds-segmented-control
                [(ngModel)]="colorNeutral"
                [options]="colorOptions"
                color="neutral"
              />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Sizes</h3>
          <p class="demo-block__desc">Les trois tailles disponibles.</p>
          <doc-demo-container [code]="definition.demos[5].code">
            <div class="demo-column">
              <ds-segmented-control [(ngModel)]="sizeSm" [options]="sizeOptions" size="sm" />
              <ds-segmented-control [(ngModel)]="sizeMd" [options]="sizeOptions" size="md" />
              <ds-segmented-control [(ngModel)]="sizeLg" [options]="sizeOptions" size="lg" />
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
export class SegmentedControlPage {
  definition = DsSegmentedControlDefinition;

  // Demo values
  selectedValue = 'option1';
  viewMode = 'list';
  section = 'general';
  tabValue = 'tab1';
  colorPrimary = 'a';
  colorNeutral = 'a';
  sizeSm = 'opt1';
  sizeMd = 'opt1';
  sizeLg = 'opt1';

  // Options
  basicOptions: SegmentOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  iconOptions: SegmentOption[] = [
    { value: 'list', label: 'Liste', icon: 'fas-list' },
    { value: 'grid', label: 'Grille', icon: 'fas-th-large' },
    { value: 'map', label: 'Carte', icon: 'fas-map' },
  ];

  sectionOptions: SegmentOption[] = [
    { value: 'general', label: 'Général' },
    { value: 'security', label: 'Sécurité' },
    { value: 'notifications', label: 'Notifications' },
  ];

  tabOptions: SegmentOption[] = [
    { value: 'tab1', label: 'Onglet 1' },
    { value: 'tab2', label: 'Onglet 2' },
    { value: 'tab3', label: 'Onglet 3' },
  ];

  colorOptions: SegmentOption[] = [
    { value: 'a', label: 'A' },
    { value: 'b', label: 'B' },
    { value: 'c', label: 'C' },
  ];

  sizeOptions: SegmentOption[] = [
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' },
  ];

  defaultValues = signal<ControlValues>({
    size: 'md',
    fullWidth: false,
    disabled: false,
  });

  demoSize = computed(() => this.defaultValues()['size'] as SegmentedControlSize);
  demoFullWidth = computed(() => this.defaultValues()['fullWidth'] as boolean);
  demoDisabled = computed(() => this.defaultValues()['disabled'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }
}
