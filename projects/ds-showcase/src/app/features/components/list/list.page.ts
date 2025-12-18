import { Component, signal, computed } from '@angular/core';
import { DsList, DsListItem, ListVariant, ListSize } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsListDefinition } from '../../../registry/definitions/ds-list.definition';
import { ControlValues } from '../../../registry/types';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [DsList, DsListItem, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Liste simple avec items.</p>
          <doc-demo-container
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-list [variant]="demoVariant()" [size]="demoSize()">
              <ds-list-item title="Premier élément" />
              <ds-list-item title="Deuxième élément" />
              <ds-list-item title="Troisième élément" />
            </ds-list>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Loading State</h3>
          <p class="demo-block__desc">Liste en état de chargement.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <ds-list [loading]="true" [loadingCount]="5" />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Empty State</h3>
          <p class="demo-block__desc">Liste vide avec message.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <ds-list
              [empty]="true"
              emptyTitle="Aucun élément"
              emptyDescription="Ajoutez des éléments pour commencer"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Descriptions</h3>
          <p class="demo-block__desc">Items avec descriptions.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <ds-list>
              <ds-list-item
                title="Tâche importante"
                description="À terminer avant vendredi"
              />
              <ds-list-item
                title="Réunion d'équipe"
                description="Lundi à 10h en salle A"
              />
              <ds-list-item
                title="Revue de code"
                description="PR #123 à relire"
              />
            </ds-list>
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
  `]
})
export class ListPage {
  definition = DsListDefinition;

  defaultValues = signal<ControlValues>({
    variant: 'default',
    size: 'md',
  });

  demoVariant = computed(() => this.defaultValues()['variant'] as ListVariant);
  demoSize = computed(() => this.defaultValues()['size'] as ListSize);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }
}
