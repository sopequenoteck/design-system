import { Component, signal, computed } from '@angular/core';
import { DsMenu, MenuItem, MenuSize, MenuTrigger } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsMenuDefinition } from '../../../registry/definitions/ds-menu.definition';
import { ControlValues } from '../../../registry/types';
import { faEdit, faTrash, faCopy, faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [DsMenu, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Menu avec contrôles interactifs.</p>
          <doc-demo-container
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-menu
              [items]="menuItems"
              [size]="demoSize()"
              [trigger]="demoTrigger()"
              (itemSelected)="onItemSelect($event)"
            >
              <button class="demo-btn">Ouvrir le menu</button>
            </ds-menu>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Icons</h3>
          <p class="demo-block__desc">Items avec icônes FontAwesome.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <ds-menu
              [items]="menuItemsWithIcons"
              (itemSelected)="onItemSelect($event)"
            >
              <button class="demo-btn">Actions</button>
            </ds-menu>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Dividers</h3>
          <p class="demo-block__desc">Menu avec séparateurs.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <ds-menu
              [items]="menuItemsWithDividers"
              (itemSelected)="onItemSelect($event)"
            >
              <button class="demo-btn">Options</button>
            </ds-menu>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Context Menu</h3>
          <p class="demo-block__desc">Menu clic droit.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <ds-menu
              [items]="menuItems"
              trigger="contextmenu"
              (itemSelected)="onItemSelect($event)"
            >
              <div class="context-area">Clic droit ici</div>
            </ds-menu>
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
    .context-area {
      padding: 40px; background: var(--background-secondary, #f3f4f6);
      border: 2px dashed var(--border-default, #e5e7eb); border-radius: 8px;
      text-align: center; color: var(--text-muted, #6b7280);
    }
  `]
})
export class MenuPage {
  definition = DsMenuDefinition;

  menuItems: MenuItem[] = [
    { id: 'edit', label: 'Modifier' },
    { id: 'duplicate', label: 'Dupliquer' },
    { id: 'delete', label: 'Supprimer' },
  ];

  menuItemsWithIcons: MenuItem[] = [
    { id: 'edit', label: 'Modifier', icon: faEdit },
    { id: 'copy', label: 'Copier', icon: faCopy },
    { id: 'download', label: 'Télécharger', icon: faDownload },
    { id: 'delete', label: 'Supprimer', icon: faTrash },
  ];

  menuItemsWithDividers: MenuItem[] = [
    { id: 'edit', label: 'Modifier' },
    { id: 'duplicate', label: 'Dupliquer' },
    { id: 'delete', label: 'Supprimer', dividerBefore: true },
  ];

  defaultValues = signal<ControlValues>({
    size: 'md',
    trigger: 'click',
  });

  demoSize = computed(() => this.defaultValues()['size'] as MenuSize);
  demoTrigger = computed(() => this.defaultValues()['trigger'] as MenuTrigger);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  onItemSelect(item: MenuItem): void {
    console.log('Item selected:', item);
  }
}
