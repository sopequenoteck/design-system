import { Component, signal, computed } from '@angular/core';
import { DsDropdown, DropdownItem, DropdownPosition, ButtonVariant, ButtonSize } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsDropdownDefinition } from '../../../registry/definitions/ds-dropdown.definition';
import { ControlValues } from '../../../registry/types';
import { faEdit, faTrash, faDownload, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dropdown-page',
  standalone: true,
  imports: [DsDropdown, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Dropdown avec contrôles interactifs.</p>
          <doc-demo-container
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-dropdown
              [dropdownItems]="items"
              [type]="demoType()"
              [size]="demoSize()"
              [position]="demoPosition()"
              (selectedItemChanged)="onSelect($event)"
            >
              Sélectionner
            </ds-dropdown>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Icons</h3>
          <p class="demo-block__desc">Items avec icônes.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <ds-dropdown
              [dropdownItems]="itemsWithIcons"
              [dropdownStartIcon]="faUser"
              (selectedItemChanged)="onSelect($event)"
            >
              Actions
            </ds-dropdown>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Outline Variant</h3>
          <p class="demo-block__desc">Style outline.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <ds-dropdown
              [dropdownItems]="items"
              variant="outline"
              type="secondary"
              (selectedItemChanged)="onSelect($event)"
            >
              Options
            </ds-dropdown>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Different Sizes</h3>
          <p class="demo-block__desc">Les trois tailles disponibles.</p>
          <doc-demo-container [code]="sizesCode">
            <div class="demo-row">
              <ds-dropdown [dropdownItems]="items" size="sm">Small</ds-dropdown>
              <ds-dropdown [dropdownItems]="items" size="md">Medium</ds-dropdown>
              <ds-dropdown [dropdownItems]="items" size="lg">Large</ds-dropdown>
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
    .demo-row { display: flex; gap: 16px; flex-wrap: wrap; align-items: center; }
  `]
})
export class DropdownPage {
  definition = DsDropdownDefinition;

  faUser = faUser;

  items: DropdownItem[] = [
    { code: 'option1', label: 'Option 1' },
    { code: 'option2', label: 'Option 2' },
    { code: 'option3', label: 'Option 3' },
  ];

  itemsWithIcons: DropdownItem[] = [
    { code: 'edit', label: 'Modifier', startIcon: faEdit },
    { code: 'download', label: 'Télécharger', startIcon: faDownload },
    { code: 'delete', label: 'Supprimer', startIcon: faTrash },
  ];

  sizesCode = `<ds-dropdown [dropdownItems]="items" size="sm">Small</ds-dropdown>
<ds-dropdown [dropdownItems]="items" size="md">Medium</ds-dropdown>
<ds-dropdown [dropdownItems]="items" size="lg">Large</ds-dropdown>`;

  defaultValues = signal<ControlValues>({
    type: 'primary',
    size: 'md',
    position: 'bottom',
  });

  demoType = computed(() => this.defaultValues()['type'] as ButtonVariant);
  demoSize = computed(() => this.defaultValues()['size'] as ButtonSize);
  demoPosition = computed(() => this.defaultValues()['position'] as DropdownPosition);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  onSelect(code: string): void {
    console.log('Selected:', code);
  }
}
