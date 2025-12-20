import { Component, signal } from '@angular/core';
import { DsDropdown } from 'ds-angular';

/**
 * Page de test isolée pour ds-dropdown.
 * Utilisée par les tests e2e Playwright.
 */
@Component({
  selector: 'app-dropdown-test',
  standalone: true,
  imports: [DsDropdown],
  template: `
    <!-- Test: Default Dropdown -->
    <div class="test-section" data-testid="dropdown-default">
      <ds-dropdown
        [dropdownItems]="defaultItems"
        (selectedItemChanged)="onSelect($event)"
      >
        Actions
      </ds-dropdown>
      <p>Sélectionné: {{ selected() }}</p>
    </div>

    <!-- Test: Disabled Items -->
    <div class="test-section" data-testid="dropdown-disabled">
      <ds-dropdown [dropdownItems]="itemsWithDisabled">
        Avec désactivés
      </ds-dropdown>
    </div>

    <!-- Test: With Dividers -->
    <div class="test-section" data-testid="dropdown-dividers">
      <ds-dropdown [dropdownItems]="itemsWithDividers">
        Avec séparateurs
      </ds-dropdown>
    </div>

    <!-- Test: Sizes -->
    <div class="test-section" data-testid="dropdown-sizes">
      <ds-dropdown [dropdownItems]="defaultItems" size="sm">
        Small
      </ds-dropdown>
      <ds-dropdown [dropdownItems]="defaultItems" size="md">
        Medium
      </ds-dropdown>
      <ds-dropdown [dropdownItems]="defaultItems" size="lg">
        Large
      </ds-dropdown>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 24px;
    }
    .test-section {
      margin-bottom: 24px;
      padding: 16px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      display: flex;
      gap: 12px;
      align-items: center;
      flex-wrap: wrap;
    }
  `]
})
export class DropdownTestPage {
  selected = signal('');

  defaultItems = [
    { code: 'edit', label: 'Modifier' },
    { code: 'duplicate', label: 'Dupliquer' },
    { code: 'delete', label: 'Supprimer' },
  ];

  itemsWithDisabled = [
    { code: 'view', label: 'Voir' },
    { code: 'edit', label: 'Modifier' },
    { code: 'delete', label: 'Supprimer' },
  ];

  itemsWithDividers = [
    { code: 'copy', label: 'Copier' },
    { code: 'cut', label: 'Couper' },
    { code: 'paste', label: 'Coller' },
  ];

  onSelect(code: string) {
    const item = this.defaultItems.find(i => i.code === code);
    this.selected.set(item?.label ?? code);
  }
}
