import { Component, signal, computed } from '@angular/core';
import { DsAccordion, DsAccordionItem, AccordionItem, AccordionSize, AccordionVariant, DsChip } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsAccordionDefinition } from '../../../registry/definitions/ds-accordion.definition';
import { ControlValues } from '../../../registry/types';

interface TaskItem {
  id: string;
  name: string;
  status: 'pending' | 'completed';
}

interface TaskGroup {
  key: string;
  label: string;
  items: TaskItem[];
}

@Component({
  selector: 'app-accordion-page',
  standalone: true,
  imports: [DsAccordion, DsAccordionItem, DsChip, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Accordion avec contrôles interactifs.</p>
          <doc-demo-container
            [sources]="definition.demos[0].sources ?? []"
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-accordion
              [items]="accordionItems"
              [multiple]="demoMultiple()"
              [size]="demoSize()"
              [variant]="demoVariant()"
              (itemChange)="onItemChange($event)"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Multiple</h3>
          <p class="demo-block__desc">Plusieurs items ouverts simultanément.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <ds-accordion
              [items]="accordionItems"
              [multiple]="true"
              [expandedIds]="['item-1', 'item-2']"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Bordered</h3>
          <p class="demo-block__desc">Variant avec bordures.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <ds-accordion
              [items]="accordionItems"
              variant="bordered"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Separated</h3>
          <p class="demo-block__desc">Items séparés visuellement.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <ds-accordion
              [items]="accordionItems"
              variant="separated"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Template-Driven (Rich Content)</h3>
          <p class="demo-block__desc">Mode template-driven avec contenu riche. Utilise &lt;ds-accordion-item&gt; pour projeter des composants Angular.</p>
          <doc-demo-container
            [sources]="definition.demos[4]?.sources ?? []"
            [code]="definition.demos[4]?.code"
          >
            <ds-accordion [multiple]="true" variant="separated">
              @for (group of taskGroups; track group.key) {
                <ds-accordion-item [header]="group.label" [badge]="group.items.length" [id]="group.key">
                  <div class="task-list">
                    @for (task of group.items; track task.id) {
                      <div class="task-item" [class.task-item--completed]="task.status === 'completed'">
                        <ds-chip
                          [label]="task.status === 'completed' ? 'Done' : 'Pending'"
                          [color]="task.status === 'completed' ? 'success' : 'warning'"
                          size="sm"
                        />
                        <span class="task-name">{{ task.name }}</span>
                      </div>
                    }
                  </div>
                </ds-accordion-item>
              }
            </ds-accordion>
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
    .task-list { display: flex; flex-direction: column; gap: 8px; }
    .task-item {
      display: flex; align-items: center; gap: 12px; padding: 8px 12px;
      background: var(--surface-secondary, #f9fafb); border-radius: 6px;
    }
    .task-item--completed { opacity: 0.7; }
    .task-item--completed .task-name { text-decoration: line-through; color: var(--text-muted, #6b7280); }
    .task-name { font-size: 0.875rem; color: var(--text-default, #374151); }
  `]
})
export class AccordionPage {
  definition = DsAccordionDefinition;

  accordionItems: AccordionItem[] = [
    { id: 'item-1', header: 'Section 1', content: 'Contenu de la section 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 'item-2', header: 'Section 2', content: 'Contenu de la section 2. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { id: 'item-3', header: 'Section 3', content: 'Contenu de la section 3. Ut enim ad minim veniam, quis nostrud exercitation.' },
  ];

  // Données pour l'exemple template-driven
  taskGroups: TaskGroup[] = [
    {
      key: 'pending',
      label: 'En attente',
      items: [
        { id: '1', name: 'Revue de code', status: 'pending' },
        { id: '2', name: 'Tests unitaires', status: 'pending' },
        { id: '3', name: 'Documentation', status: 'pending' },
      ],
    },
    {
      key: 'completed',
      label: 'Terminées',
      items: [
        { id: '4', name: 'Setup projet', status: 'completed' },
        { id: '5', name: 'Design system', status: 'completed' },
      ],
    },
  ];

  defaultValues = signal<ControlValues>({
    multiple: false,
    size: 'md',
    variant: 'default',
  });

  demoMultiple = computed(() => this.defaultValues()['multiple'] as boolean);
  demoSize = computed(() => this.defaultValues()['size'] as AccordionSize);
  demoVariant = computed(() => this.defaultValues()['variant'] as AccordionVariant);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  onItemChange(event: any): void {
    console.log('Item changed:', event);
  }
}
