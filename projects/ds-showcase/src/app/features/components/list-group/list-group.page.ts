import { Component, signal, computed } from '@angular/core';
import { DsList, DsListItem, DsListGroup } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsListGroupDefinition } from '../../../registry/definitions/ds-list-group.definition';
import { ControlValues } from '../../../registry/types';

type ListGroupVariant = 'default' | 'collapsible';

@Component({
  selector: 'app-list-group-page',
  standalone: true,
  imports: [DsList, DsListItem, DsListGroup, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Groupe de liste simple.</p>
          <doc-demo-container
            [sources]="definition.demos[0].sources ?? []"
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-list-group
              title="Aujourd'hui"
              [variant]="demoVariant()"
              [sticky]="demoSticky()"
            >
              <ds-list-item title="Réunion d'équipe" />
              <ds-list-item title="Revue de code" />
            </ds-list-group>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Count</h3>
          <p class="demo-block__desc">Groupe avec compteur.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <ds-list-group title="Messages" [count]="5">
              <ds-list-item title="Message de Jean" />
              <ds-list-item title="Message de Marie" />
            </ds-list-group>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Collapsible</h3>
          <p class="demo-block__desc">Groupe collapsible.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <ds-list-group
              title="Cette semaine"
              [count]="3"
              variant="collapsible"
              [expanded]="weekExpanded()"
              (expandedChange)="onWeekToggle($event)"
            >
              <ds-list-item title="Tâche 1" />
              <ds-list-item title="Tâche 2" />
              <ds-list-item title="Tâche 3" />
            </ds-list-group>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Multiple Groups</h3>
          <p class="demo-block__desc">Plusieurs groupes dans une liste.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <ds-list>
              <ds-list-group title="Haute priorité" [count]="2" variant="collapsible">
                <ds-list-item title="Urgent : Correction bug production" />
                <ds-list-item title="Urgent : Mise à jour sécurité" />
              </ds-list-group>
              <ds-list-group title="Normale" [count]="3" variant="collapsible">
                <ds-list-item title="Refactoring module auth" />
                <ds-list-item title="Ajout tests unitaires" />
                <ds-list-item title="Documentation API" />
              </ds-list-group>
              <ds-list-group title="Basse priorité" [count]="1" variant="collapsible">
                <ds-list-item title="Amélioration UI dashboard" />
              </ds-list-group>
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
export class ListGroupPage {
  definition = DsListGroupDefinition;

  weekExpanded = signal(true);

  defaultValues = signal<ControlValues>({
    variant: 'default',
    sticky: false,
  });

  demoVariant = computed(() => this.defaultValues()['variant'] as ListGroupVariant);
  demoSticky = computed(() => this.defaultValues()['sticky'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  onWeekToggle(event: { expanded: boolean }): void {
    this.weekExpanded.set(event.expanded);
  }
}
