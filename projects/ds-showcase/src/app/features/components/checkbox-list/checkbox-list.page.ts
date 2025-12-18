import { Component, signal, computed } from '@angular/core';
import { DsCheckboxList, CheckboxListItem, CheckboxListSize } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsCheckboxListDefinition } from '../../../registry/definitions/ds-checkbox-list.definition';
import { ControlValues } from '../../../registry/types';

@Component({
  selector: 'app-checkbox-list-page',
  standalone: true,
  imports: [DsCheckboxList, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Liste de checkboxes avec contrôles interactifs.</p>
          <doc-demo-container
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-checkbox-list
              [(items)]="demoItems"
              [size]="demoSize()"
              [showSelectAll]="demoShowSelectAll()"
              [disabled]="demoDisabled()"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Select All</h3>
          <p class="demo-block__desc">Checkbox "Tout sélectionner" pour sélectionner/désélectionner tous les items.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <ds-checkbox-list
              [(items)]="selectAllItems"
              [showSelectAll]="true"
              selectAllLabel="Sélectionner tout"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Icons/Emojis</h3>
          <p class="demo-block__desc">Items avec icônes FontAwesome ou emojis.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <ds-checkbox-list [(items)]="emojiItems" />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Helper Text</h3>
          <p class="demo-block__desc">Items avec texte d'aide descriptif.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <ds-checkbox-list [(items)]="helperItems" />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Sizes</h3>
          <p class="demo-block__desc">Les trois tailles disponibles.</p>
          <doc-demo-container [code]="definition.demos[4].code">
            <div class="demo-column">
              <ds-checkbox-list [(items)]="sizeItemsSm" size="sm" />
              <ds-checkbox-list [(items)]="sizeItemsMd" size="md" />
              <ds-checkbox-list [(items)]="sizeItemsLg" size="lg" />
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
    .demo-column { display: flex; flex-direction: column; gap: 24px; }
  `]
})
export class CheckboxListPage {
  definition = DsCheckboxListDefinition;

  // Demo items
  demoItems: CheckboxListItem[] = [
    { id: 1, label: 'Option 1', checked: true },
    { id: 2, label: 'Option 2', checked: false },
    { id: 3, label: 'Option 3', checked: false },
  ];

  selectAllItems: CheckboxListItem[] = [
    { id: 1, label: 'Lundi', checked: true },
    { id: 2, label: 'Mardi', checked: true },
    { id: 3, label: 'Mercredi', checked: false },
    { id: 4, label: 'Jeudi', checked: false },
    { id: 5, label: 'Vendredi', checked: true },
  ];

  emojiItems: CheckboxListItem[] = [
    { id: 1, label: 'Email', emoji: '📧', checked: true },
    { id: 2, label: 'SMS', emoji: '💬', checked: false },
    { id: 3, label: 'Push', emoji: '🔔', checked: true },
  ];

  helperItems: CheckboxListItem[] = [
    { id: 1, label: 'Newsletter', helper: 'Recevez nos actualités hebdomadaires', checked: false },
    { id: 2, label: 'Alertes', helper: 'Notifications pour les événements importants', checked: true },
    { id: 3, label: 'Promotions', helper: 'Offres spéciales et réductions', checked: false },
  ];

  sizeItemsSm: CheckboxListItem[] = [
    { id: 1, label: 'Small 1', checked: true },
    { id: 2, label: 'Small 2', checked: false },
  ];

  sizeItemsMd: CheckboxListItem[] = [
    { id: 1, label: 'Medium 1', checked: true },
    { id: 2, label: 'Medium 2', checked: false },
  ];

  sizeItemsLg: CheckboxListItem[] = [
    { id: 1, label: 'Large 1', checked: true },
    { id: 2, label: 'Large 2', checked: false },
  ];

  defaultValues = signal<ControlValues>({
    size: 'md',
    showSelectAll: false,
    disabled: false,
  });

  demoSize = computed(() => this.defaultValues()['size'] as CheckboxListSize);
  demoShowSelectAll = computed(() => this.defaultValues()['showSelectAll'] as boolean);
  demoDisabled = computed(() => this.defaultValues()['disabled'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }
}
