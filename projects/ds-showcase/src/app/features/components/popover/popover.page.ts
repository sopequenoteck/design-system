import { Component, signal, computed } from '@angular/core';
import { DsPopover, DsPopoverComponent, PopoverTrigger } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsPopoverDefinition } from '../../../registry/definitions/ds-popover.definition';
import { ControlValues } from '../../../registry/types';

@Component({
  selector: 'app-popover-page',
  standalone: true,
  imports: [DsPopover, DsPopoverComponent, DemoContainer, PropsTable],
  template: `
    <div class="component-page">
      <header class="component-header">
        <div class="component-header__meta">
          <span class="component-badge">{{ definition.category }}</span>
        </div>
        <h1 class="component-title">{{ definition.name }}</h1>
        <p class="component-desc">{{ definition.description }}</p>
        <code class="component-selector">{{ definition.selector }}</code>
      </header>

      <section class="component-section">
        <h2>Exemples</h2>

        <div class="demo-block">
          <h3 class="demo-block__title">Default</h3>
          <p class="demo-block__desc">Popover au clic.</p>
          <doc-demo-container
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ng-template #popoverContent>
              <ds-popover header="Informations">
                <p>Contenu du popover avec des détails supplémentaires.</p>
              </ds-popover>
            </ng-template>

            <button
              class="demo-btn"
              [dsPopover]="popoverContent"
              [dsPopoverTrigger]="demoTrigger()"
              [dsPopoverCloseOnBackdrop]="demoCloseOnBackdrop()"
            >
              Ouvrir le popover
            </button>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Hover Trigger</h3>
          <p class="demo-block__desc">Popover au survol.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <ng-template #hoverContent>
              <ds-popover header="Aide">
                <p>Cette information contextuelle apparaît au survol.</p>
              </ds-popover>
            </ng-template>

            <button
              class="demo-btn"
              [dsPopover]="hoverContent"
              dsPopoverTrigger="hover"
            >
              Survoler pour aide
            </button>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Persistent</h3>
          <p class="demo-block__desc">Popover sans fermeture au clic extérieur.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <ng-template #persistentContent>
              <ds-popover header="Actions">
                <div class="popover-actions">
                  <button class="demo-btn demo-btn--sm">Action 1</button>
                  <button class="demo-btn demo-btn--sm">Action 2</button>
                </div>
              </ds-popover>
            </ng-template>

            <button
              class="demo-btn"
              [dsPopover]="persistentContent"
              [dsPopoverCloseOnBackdrop]="false"
            >
              Menu persistant
            </button>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Form</h3>
          <p class="demo-block__desc">Popover avec formulaire.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <ng-template #formContent>
              <ds-popover header="Filtre rapide">
                <div class="popover-form">
                  <input type="text" placeholder="Rechercher..." class="popover-input" />
                  <button class="demo-btn demo-btn--sm">Appliquer</button>
                </div>
              </ds-popover>
            </ng-template>

            <button
              class="demo-btn"
              [dsPopover]="formContent"
            >
              Filtrer
            </button>
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
    .demo-btn {
      padding: 8px 16px; border: none; border-radius: 4px;
      background: var(--color-primary, #3b82f6); color: white; cursor: pointer;
      font-size: 0.875rem;
      &:hover { opacity: 0.9; }
    }
    .demo-btn--sm {
      padding: 6px 12px;
      font-size: 0.8125rem;
    }
    .popover-actions {
      display: flex;
      gap: 8px;
    }
    .popover-form {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .popover-input {
      padding: 6px 10px;
      border: 1px solid var(--border-default, #e5e7eb);
      border-radius: 4px;
      font-size: 0.875rem;
    }
  `]
})
export class PopoverPage {
  definition = DsPopoverDefinition;

  defaultValues = signal<ControlValues>({
    dsPopoverTrigger: 'click',
    dsPopoverCloseOnBackdrop: true,
  });

  demoTrigger = computed(() => this.defaultValues()['dsPopoverTrigger'] as PopoverTrigger);
  demoCloseOnBackdrop = computed(() => this.defaultValues()['dsPopoverCloseOnBackdrop'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }
}
