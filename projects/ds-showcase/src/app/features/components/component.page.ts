import { Component, inject, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ComponentRegistry } from '../../registry/component.registry';
import { DemoContainer } from '../../shared/demo/demo-container';
import { PropsTable } from '../../shared/props/props-table';
import { ControlValues, DemoConfig } from '../../registry/types';

@Component({
  selector: 'app-component-page',
  standalone: true,
  imports: [DemoContainer, PropsTable],
  template: `
    <div class="component-page">
      @if (definition()) {
        <header class="component-header">
          <div class="component-header__meta">
            <span class="component-badge">{{ definition()!.category }}</span>
          </div>
          <h1 class="component-title">{{ definition()!.name }}</h1>
          <p class="component-desc">{{ definition()!.description }}</p>
          <code class="component-selector">&lt;{{ definition()!.selector }}&gt;</code>
        </header>

        <!-- Demos -->
        <section class="component-section">
          <h2>Exemples</h2>

          @for (demo of definition()!.demos; track demo.id) {
            <div class="demo-block">
              <h3 class="demo-block__title">{{ demo.name }}</h3>
              <p class="demo-block__desc">{{ demo.description }}</p>

              <doc-demo-container
                [code]="demo.code"
                [controls]="demo.controls"
                [initialValues]="getInitialValues(demo)"
                (controlChange)="onControlChange(demo.id, $event)"
              >
                <!-- Preview dynamique basée sur le composant -->
                <div class="preview-placeholder">
                  <p>Preview de <strong>{{ definition()!.selector }}</strong></p>
                  <p class="preview-hint">
                    Les previews dynamiques seront implémentées<br/>
                    avec les composants DS importés.
                  </p>
                </div>
              </doc-demo-container>
            </div>
          }

          @if (definition()!.demos.length === 0) {
            <p class="no-demos">Aucune démo configurée pour ce composant.</p>
          }
        </section>

        <!-- API Reference -->
        <section class="component-section">
          <h2>API Reference</h2>
          <doc-props-table [props]="definition()!.props" />
        </section>
      } @else {
        <div class="not-found">
          <h1>Composant non trouvé</h1>
          <p>Le composant <code>{{ componentId() }}</code> n'existe pas dans le registry.</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .component-page {
      max-width: 900px;
    }

    // ==========================================================================
    // Header
    // ==========================================================================
    .component-header {
      margin-bottom: 48px;
    }

    .component-header__meta {
      margin-bottom: 12px;
    }

    .component-badge {
      display: inline-block;
      padding: 4px 10px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: var(--color-primary-light, #eff6ff);
      color: var(--color-primary, #3b82f6);
      border-radius: 4px;
    }

    .component-title {
      margin: 0 0 12px 0;
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-default, #1a1a1a);
    }

    .component-desc {
      margin: 0 0 16px 0;
      font-size: 1.125rem;
      color: var(--text-muted, #6b7280);
      line-height: 1.6;
    }

    .component-selector {
      display: inline-block;
      padding: 6px 12px;
      font-family: var(--doc-code-font, monospace);
      font-size: 0.875rem;
      background: var(--background-secondary, #f3f4f6);
      color: var(--text-default, #374151);
      border-radius: 4px;
    }

    // ==========================================================================
    // Sections
    // ==========================================================================
    .component-section {
      margin-bottom: 48px;

      h2 {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-default, #1a1a1a);
        margin: 0 0 24px 0;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--border-default, #e5e7eb);
      }
    }

    // ==========================================================================
    // Demo blocks
    // ==========================================================================
    .demo-block {
      margin-bottom: 32px;
    }

    .demo-block__title {
      margin: 0 0 8px 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-default, #1a1a1a);
    }

    .demo-block__desc {
      margin: 0 0 16px 0;
      font-size: 0.875rem;
      color: var(--text-muted, #6b7280);
    }

    .no-demos {
      padding: 32px;
      text-align: center;
      color: var(--text-muted, #9ca3af);
      background: var(--background-secondary, #f9fafb);
      border-radius: var(--radius-2, 8px);
    }

    // ==========================================================================
    // Preview placeholder
    // ==========================================================================
    .preview-placeholder {
      text-align: center;
      color: var(--text-muted, #9ca3af);

      p {
        margin: 0;
      }

      strong {
        color: var(--color-primary, #3b82f6);
      }
    }

    .preview-hint {
      margin-top: 8px !important;
      font-size: 0.75rem;
      opacity: 0.7;
    }

    // ==========================================================================
    // Not found
    // ==========================================================================
    .not-found {
      text-align: center;
      padding: 64px 32px;

      h1 {
        font-size: 1.5rem;
        color: var(--text-default, #1a1a1a);
        margin: 0 0 16px 0;
      }

      p {
        color: var(--text-muted, #6b7280);
        margin: 0;
      }

      code {
        padding: 2px 6px;
        background: var(--background-secondary, #f3f4f6);
        border-radius: 4px;
      }
    }
  `]
})
export class ComponentPage {
  private route = inject(ActivatedRoute);
  private registry = inject(ComponentRegistry);

  /** ID du composant depuis l'URL */
  componentId = toSignal(
    this.route.paramMap.pipe(map(params => params.get('componentId') || ''))
  );

  /** Définition du composant */
  definition = computed(() => {
    const id = this.componentId();
    return id ? this.registry.get(id) : undefined;
  });

  /** Valeurs des contrôles par démo */
  private demoValues = signal<Record<string, ControlValues>>({});

  getInitialValues(demo: DemoConfig): ControlValues {
    const values: ControlValues = {};
    demo.controls.forEach(ctrl => {
      values[ctrl.name] = ctrl.defaultValue;
    });
    return values;
  }

  onControlChange(demoId: string, values: ControlValues): void {
    this.demoValues.update(current => ({
      ...current,
      [demoId]: values,
    }));
  }
}
