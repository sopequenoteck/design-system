import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

import { PrimitiveCheckbox } from '../../primitives/primitive-checkbox/primitive-checkbox';
import { generateId } from '../../utils/id-generator';

import {
  CheckboxListItem,
  CheckboxListSize,
  CheckboxListItemChangeEvent,
  CheckboxListChangeEvent,
} from './ds-checkbox-list.types';

/**
 * # DsCheckboxList
 *
 * Composant de liste de checkboxes avec support d'icônes/emojis.
 * Idéal pour les listes de préférences, filtres, ou sélections multiples.
 *
 * ## Fonctionnalités
 * - Items avec icône FontAwesome OU emoji
 * - Sélection/désélection individuelle
 * - Sélection globale (tout cocher/décocher)
 * - Helper text par item
 * - Navigation clavier
 * - Two-way binding sur items
 *
 * ## Usage
 *
 * ```html
 * <ds-checkbox-list
 *   [(items)]="preferences"
 *   [size]="'md'"
 *   [showSelectAll]="true"
 *   (itemChange)="onItemChange($event)"
 *   (change)="onListChange($event)">
 * </ds-checkbox-list>
 * ```
 *
 * ## Accessibilité
 * - Rôle group avec aria-label
 * - Navigation clavier (Tab, Space)
 * - États aria-checked
 *
 * @component
 */
@Component({
  selector: 'ds-checkbox-list',
  standalone: true,
  imports: [
    CommonModule,
    FaIconComponent,
    PrimitiveCheckbox,
  ],
  templateUrl: './ds-checkbox-list.html',
  styleUrl: './ds-checkbox-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsCheckboxList {
  // ============ INPUTS ============

  /** Liste des items (two-way binding) */
  readonly items = model.required<CheckboxListItem[]>();

  /** Taille du composant */
  readonly size = input<CheckboxListSize>('md');

  /** Afficher le checkbox "Tout sélectionner" */
  readonly showSelectAll = input<boolean>(false);

  /** Label du checkbox "Tout sélectionner" */
  readonly selectAllLabel = input<string>('Tout sélectionner');

  /** Label ARIA pour l'accessibilité */
  readonly ariaLabel = input<string>('Liste de sélection');

  /** Désactiver toute la liste */
  readonly disabled = input<boolean>(false);

  // ============ OUTPUTS ============

  /** Émis lors du changement d'un item */
  readonly itemChange = output<CheckboxListItemChangeEvent>();

  /** Émis lors de tout changement (liste complète) */
  readonly change = output<CheckboxListChangeEvent>();

  // ============ INTERNAL ============

  /** ID unique pour le composant */
  protected readonly componentId = `ds-checkbox-list-${generateId()}`;

  // ============ COMPUTED ============

  /** Classes CSS du conteneur */
  readonly containerClasses = computed(() => {
    return [
      'ds-checkbox-list',
      `ds-checkbox-list--${this.size()}`,
      this.disabled() ? 'ds-checkbox-list--disabled' : '',
    ].filter(Boolean).join(' ');
  });

  /** Tous les items sont cochés */
  readonly allChecked = computed(() => {
    const list = this.items();
    if (!list.length) return false;
    return list.every(item => item.checked || item.disabled);
  });

  /** Certains items sont cochés (état indéterminé) */
  readonly someChecked = computed(() => {
    const list = this.items();
    const checkedCount = list.filter(item => item.checked).length;
    return checkedCount > 0 && checkedCount < list.filter(item => !item.disabled).length;
  });

  /** IDs des items cochés */
  readonly checkedIds = computed(() => {
    return this.items()
      .filter(item => item.checked)
      .map(item => item.id);
  });

  // ============ METHODS ============

  /**
   * Génère un ID unique pour un item
   */
  getItemId(item: CheckboxListItem, index: number): string {
    return `${this.componentId}-item-${item.id ?? index}`;
  }

  /**
   * Gère le changement d'état d'un item
   */
  onItemCheckedChange(item: CheckboxListItem, checked: boolean, index: number): void {
    if (this.disabled() || item.disabled) return;

    // Mettre à jour l'item
    const updatedItems = this.items().map((i, idx) =>
      idx === index ? { ...i, checked } : i
    );

    this.items.set(updatedItems);

    // Émettre les événements
    this.itemChange.emit({
      item: { ...item, checked },
      checked,
      index,
    });

    this.emitChangeEvent(updatedItems);
  }

  /**
   * Gère le clic sur "Tout sélectionner"
   */
  onSelectAllChange(checked: boolean): void {
    if (this.disabled()) return;

    const updatedItems = this.items().map(item =>
      item.disabled ? item : { ...item, checked }
    );

    this.items.set(updatedItems);
    this.emitChangeEvent(updatedItems);
  }

  /**
   * Émet l'événement change avec l'état complet
   */
  private emitChangeEvent(items: CheckboxListItem[]): void {
    this.change.emit({
      items,
      checkedIds: items.filter(i => i.checked).map(i => i.id),
    });
  }

  /**
   * Retourne les classes CSS pour un item
   */
  getItemClasses(item: CheckboxListItem): string {
    const classes = ['checkbox-list-item'];

    if (item.checked) {
      classes.push('checkbox-list-item--checked');
    }

    if (item.disabled || this.disabled()) {
      classes.push('checkbox-list-item--disabled');
    }

    return classes.join(' ');
  }
}
