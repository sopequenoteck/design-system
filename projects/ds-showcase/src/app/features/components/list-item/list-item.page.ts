import { Component, signal, computed } from '@angular/core';
import { DsListItem } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsListItemDefinition } from '../../../registry/definitions/ds-list-item.definition';
import { ControlValues } from '../../../registry/types';

type IndicatorType = 'none' | 'priority' | 'dot' | 'status';
type SizeType = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-list-item-page',
  standalone: true,
  imports: [DsListItem, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">List item avec contrôles interactifs.</p>
          <doc-demo-container
            [sources]="definition.demos[0].sources ?? []"
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-list-item
              title="Ma tâche"
              [checkable]="demoCheckable()"
              [indicator]="demoIndicator()"
              [size]="demoSize()"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Checkbox</h3>
          <p class="demo-block__desc">Item avec checkbox pour liste de tâches.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <ds-list-item
              title="Tâche à faire"
              [checkable]="true"
              [checked]="isChecked()"
              (checkedChange)="onCheck($event)"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Priority</h3>
          <p class="demo-block__desc">Item avec indicateur de priorité.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <div class="demo-stack">
              <ds-list-item
                title="Tâche urgente"
                indicator="priority"
                indicatorColor="high"
              />
              <ds-list-item
                title="Tâche normale"
                indicator="priority"
                indicatorColor="medium"
              />
              <ds-list-item
                title="Tâche basse priorité"
                indicator="priority"
                indicatorColor="low"
              />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Completed State</h3>
          <p class="demo-block__desc">Item avec état complété.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <ds-list-item
              title="Tâche terminée"
              [checkable]="true"
              [checked]="true"
              [completed]="true"
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
    .demo-stack { display: flex; flex-direction: column; gap: 8px; }
  `]
})
export class ListItemPage {
  definition = DsListItemDefinition;

  isChecked = signal(false);

  defaultValues = signal<ControlValues>({
    checkable: false,
    indicator: 'none',
    size: 'md',
  });

  demoCheckable = computed(() => this.defaultValues()['checkable'] as boolean);
  demoIndicator = computed(() => this.defaultValues()['indicator'] as IndicatorType);
  demoSize = computed(() => this.defaultValues()['size'] as SizeType);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  onCheck(event: { checked: boolean }): void {
    this.isChecked.set(event.checked);
  }
}
