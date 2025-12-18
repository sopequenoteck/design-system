import { Component, signal, computed } from '@angular/core';
import { DsEmpty, EmptySize } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsEmptyDefinition } from '../../../registry/definitions/ds-empty.definition';
import { ControlValues } from '../../../registry/types';

@Component({
  selector: 'app-empty-page',
  standalone: true,
  imports: [DsEmpty, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">État vide avec contrôles interactifs.</p>
          <doc-demo-container
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-empty
              title="Aucun résultat"
              description="Essayez de modifier vos filtres"
              [size]="demoSize()"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Action</h3>
          <p class="demo-block__desc">État vide avec bouton d'action.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <ds-empty
              title="Aucun projet"
              description="Créez votre premier projet pour commencer"
            >
              <button class="demo-button">Créer un projet</button>
            </ds-empty>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Different Contexts</h3>
          <p class="demo-block__desc">États vides pour différents contextes.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <div class="demo-grid">
              <ds-empty
                title="Aucun message"
                description="Votre boîte de réception est vide"
                size="sm"
              />
              <ds-empty
                title="Aucune notification"
                description="Vous êtes à jour !"
                size="sm"
              />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Sizes</h3>
          <p class="demo-block__desc">Les trois tailles disponibles.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <div class="demo-column">
              <ds-empty title="Small" size="sm" />
              <ds-empty title="Medium" size="md" />
              <ds-empty title="Large" size="lg" />
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
    .demo-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
    .demo-column { display: flex; flex-direction: column; gap: 24px; }
    .demo-button {
      padding: 8px 16px; background: var(--color-primary, #3b82f6); color: white;
      border: none; border-radius: 4px; cursor: pointer; font-size: 0.875rem;
    }
  `]
})
export class EmptyPage {
  definition = DsEmptyDefinition;

  defaultValues = signal<ControlValues>({
    size: 'md',
  });

  demoSize = computed(() => this.defaultValues()['size'] as EmptySize);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }
}
