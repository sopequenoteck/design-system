import {
  Component,
  input,
  output,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { DsSkeleton } from '../ds-skeleton/ds-skeleton';
import { DsEmpty } from '../ds-empty/ds-empty';
import {
  ListVariant,
  ListSize,
  ListDragEvent,
  ListSelectionChangeEvent,
} from './ds-list.types';

/**
 * # DsList
 *
 * Composant conteneur pour afficher une liste d'éléments avec support pour :
 * - État de chargement (skeletons)
 * - État vide
 * - Drag & Drop (via CDK)
 * - Virtualisation (via CDK)
 * - Sélection multiple
 *
 * ## Usage
 *
 * ```html
 * <!-- Basique -->
 * <ds-list>
 *   <ds-list-item title="Item 1" />
 *   <ds-list-item title="Item 2" />
 * </ds-list>
 *
 * <!-- Avec loading et empty -->
 * <ds-list
 *   [loading]="isLoading()"
 *   [empty]="items().length === 0"
 *   emptyTitle="Aucun élément"
 * >
 *   @for (item of items(); track item.id) {
 *     <ds-list-item [title]="item.title" />
 *   }
 * </ds-list>
 *
 * <!-- Avec Drag & Drop -->
 * <ds-list [draggable]="true" [dragData]="items()" (dropped)="onReorder($event)">
 *   @for (item of items(); track item.id) {
 *     <ds-list-item [title]="item.title" cdkDrag />
 *   }
 * </ds-list>
 * ```
 */
@Component({
  selector: 'ds-list',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    ScrollingModule,
    DsSkeleton,
    DsEmpty,
  ],
  templateUrl: './ds-list.html',
  styleUrl: './ds-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsList<T = unknown> {
  // === Apparence ===

  /**
   * Variante visuelle de la liste
   * @default 'default'
   */
  readonly variant = input<ListVariant>('default');

  /**
   * Taille de la liste (affecte les skeletons)
   * @default 'md'
   */
  readonly size = input<ListSize>('md');

  // === États ===

  /**
   * Affiche les skeletons de chargement
   * @default false
   */
  readonly loading = input<boolean>(false);

  /**
   * Nombre de skeletons à afficher
   * @default 3
   */
  readonly loadingCount = input<number>(3);

  // === État vide ===

  /**
   * Affiche l'état vide
   * @default false
   */
  readonly empty = input<boolean>(false);

  /**
   * Titre de l'état vide
   * @default 'Aucun élément'
   */
  readonly emptyTitle = input<string>('Aucun élément');

  /**
   * Description de l'état vide
   */
  readonly emptyDescription = input<string>();

  /**
   * Icône de l'état vide
   */
  readonly emptyIcon = input<IconDefinition>();

  // === Drag & Drop ===

  /**
   * Active le mode Drag & Drop
   * @default false
   */
  readonly draggable = input<boolean>(false);

  /**
   * Désactive le Drag & Drop (tout en gardant le mode actif)
   * @default false
   */
  readonly dragDisabled = input<boolean>(false);

  /**
   * Données pour le Drag & Drop
   */
  readonly dragData = input<T[]>([]);

  /**
   * Émis lors d'un drop
   */
  readonly dropped = output<ListDragEvent<T>>();

  // === Virtualisation ===

  /**
   * Active le mode virtualisé pour les longues listes
   * @default false
   */
  readonly virtual = input<boolean>(false);

  /**
   * Hauteur d'un item en pixels (pour la virtualisation)
   * @default 40
   */
  readonly itemSize = input<number>(40);

  /**
   * Hauteur du viewport en pixels (pour la virtualisation)
   * @default 400
   */
  readonly viewportHeight = input<number>(400);

  // === Sélection ===

  /**
   * Active la sélection multiple
   * @default false
   */
  readonly selectable = input<boolean>(false);

  /**
   * Items sélectionnés
   */
  readonly selectedItems = input<T[]>([]);

  /**
   * Émis lors d'un changement de sélection
   */
  readonly selectionChange = output<ListSelectionChangeEvent<T>>();

  // === Computed ===

  /**
   * Classes CSS calculées
   */
  readonly listClasses = computed(() => {
    const classes: string[] = ['ds-list'];

    classes.push(`ds-list--${this.variant()}`);
    classes.push(`ds-list--${this.size()}`);

    if (this.draggable()) classes.push('ds-list--draggable');
    if (this.virtual()) classes.push('ds-list--virtual');

    return classes.join(' ');
  });

  /**
   * Tableau pour générer les skeletons
   */
  readonly skeletonArray = computed(() => {
    return Array.from({ length: this.loadingCount() }, (_, i) => i);
  });

  /**
   * Taille du skeleton basée sur la taille de la liste
   */
  readonly skeletonSize = computed(() => {
    const sizeMap: Record<ListSize, 'sm' | 'md' | 'lg'> = {
      sm: 'sm',
      md: 'md',
      lg: 'lg',
    };
    return sizeMap[this.size()];
  });

  /**
   * Style du viewport pour la virtualisation
   */
  readonly viewportStyle = computed(() => {
    return {
      height: `${this.viewportHeight()}px`,
    };
  });

  // === Méthodes ===

  /**
   * Gère l'événement drop du CDK
   */
  onDrop(event: CdkDragDrop<T[]>): void {
    const data = [...this.dragData()];
    moveItemInArray(data, event.previousIndex, event.currentIndex);

    this.dropped.emit({
      item: event.item.data as T,
      previousIndex: event.previousIndex,
      currentIndex: event.currentIndex,
    });
  }

  /**
   * Toggle la sélection d'un item
   */
  toggleSelection(item: T): void {
    if (!this.selectable()) return;

    const current = [...this.selectedItems()];
    const index = current.indexOf(item);

    if (index === -1) {
      current.push(item);
    } else {
      current.splice(index, 1);
    }

    this.selectionChange.emit({ selected: current });
  }

  /**
   * Vérifie si un item est sélectionné
   */
  isSelected(item: T): boolean {
    return this.selectedItems().includes(item);
  }

  /**
   * Sélectionne tous les items
   */
  selectAll(): void {
    if (!this.selectable()) return;
    this.selectionChange.emit({ selected: [...this.dragData()] });
  }

  /**
   * Désélectionne tous les items
   */
  clearSelection(): void {
    if (!this.selectable()) return;
    this.selectionChange.emit({ selected: [] });
  }
}
