# Plan d'implémentation - Composants DS List

## Contexte

Migration des composants `PlannerContent` et `PlannerItemCard` d'Assist-AI vers des composants génériques du Design System pour une meilleure réutilisabilité.

---

## Avancement

| Phase | Composant | Statut |
|-------|-----------|--------|
| 1 | `DsListItem` | **Terminé** |
| 2 | `DsList` | **Terminé** |
| 3 | `DsListGroup` | À faire |
| 4 | Migration `PlannerItemCard` | À faire |
| 5 | Migration `PlannerContent` | À faire |

---

## Phase 1 : Composant `DsListItem` ✅ TERMINÉ

### Fichiers créés

```
ds-angular/src/lib/components/ds-list-item/
├── ds-list-item.ts           ✅
├── ds-list-item.html         ✅
├── ds-list-item.scss         ✅
├── ds-list-item.spec.ts      ✅
├── ds-list-item.stories.ts   ✅
└── ds-list-item.types.ts     ✅
```

### API implémentée

```typescript
@Component({ selector: 'ds-list-item' })
export class DsListItem {
  // Contenu
  title = input.required<string>();
  subtitle = input<string>();

  // Indicateur visuel
  indicator = input<'none' | 'priority' | 'dot' | 'status'>('none');
  indicatorColor = input<'high' | 'medium' | 'low' | 'success' | 'warning' | 'error' | 'info' | string>('medium');

  // Checkbox
  checkable = input<boolean>(false);
  checked = input<boolean>(false);
  indeterminate = input<boolean>(false);

  // États
  completed = input<boolean>(false);
  disabled = input<boolean>(false);
  selected = input<boolean>(false);
  clickable = input<boolean>(true);

  // Apparence
  size = input<'sm' | 'md' | 'lg'>('md');

  // Événements
  checkedChange = output<ListItemCheckEvent>();
  clicked = output<ListItemClickEvent>();
}
```

### Slots disponibles

- `[inline]` - Contenu inline (tags, badges)
- `[meta]` - Métadonnées à droite (time, duration)
- `[actions]` - Actions visibles au hover

---

## Phase 2 : Composant `DsList` (conteneur) ✅ TERMINÉ

### Fichiers créés

```
ds-angular/src/lib/components/ds-list/
├── ds-list.ts           ✅
├── ds-list.html         ✅
├── ds-list.scss         ✅
├── ds-list.spec.ts      ✅
├── ds-list.stories.ts   ✅
└── ds-list.types.ts     ✅
```

### API du composant

```typescript
// ds-list.types.ts
export type ListVariant = 'default' | 'divided' | 'card';
export type ListSize = 'sm' | 'md' | 'lg';

export interface ListDragEvent<T = unknown> {
  item: T;
  previousIndex: number;
  currentIndex: number;
}

export interface ListSelectionChangeEvent<T = unknown> {
  selected: T[];
}
```

```typescript
// ds-list.ts
@Component({
  selector: 'ds-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsList<T = unknown> {
  // === Apparence ===
  variant = input<ListVariant>('default');
  size = input<ListSize>('md');

  // === États ===
  loading = input<boolean>(false);
  loadingCount = input<number>(3);

  // === État vide ===
  empty = input<boolean>(false);
  emptyTitle = input<string>('Aucun élément');
  emptyDescription = input<string>();
  emptyIcon = input<IconDefinition>();

  // === Drag & Drop (CDK) ===
  draggable = input<boolean>(false);
  dragDisabled = input<boolean>(false);
  dragData = input<T[]>([]);
  dropped = output<ListDragEvent<T>>();

  // === Virtualisation (CDK) ===
  virtual = input<boolean>(false);
  itemSize = input<number>(40);  // Hauteur en px

  // === Sélection multiple ===
  selectable = input<boolean>(false);
  selectedItems = input<T[]>([]);
  selectionChange = output<ListSelectionChangeEvent<T>>();
}
```

### Template HTML avec CDK

```html
<!-- ds-list.html -->
<div
  class="ds-list"
  [class.ds-list--default]="variant() === 'default'"
  [class.ds-list--divided]="variant() === 'divided'"
  [class.ds-list--card]="variant() === 'card'"
  [class.ds-list--sm]="size() === 'sm'"
  [class.ds-list--md]="size() === 'md'"
  [class.ds-list--lg]="size() === 'lg'"
  role="list"
>
  @if (loading()) {
    <!-- État de chargement -->
    @for (i of skeletonArray(); track i) {
      <div class="ds-list__skeleton">
        <ds-skeleton variant="circle" [size]="size()" />
        <div class="ds-list__skeleton-content">
          <ds-skeleton variant="text" width="60%" />
          <ds-skeleton variant="text" width="40%" />
        </div>
      </div>
    }
  } @else if (empty()) {
    <!-- État vide -->
    <ds-empty
      [title]="emptyTitle()"
      [description]="emptyDescription()"
      [icon]="emptyIcon()"
      [size]="size()"
    />
  } @else if (virtual()) {
    <!-- Mode virtualisé -->
    <cdk-virtual-scroll-viewport
      [itemSize]="itemSize()"
      class="ds-list__viewport"
    >
      <ng-content />
    </cdk-virtual-scroll-viewport>
  } @else if (draggable()) {
    <!-- Mode Drag & Drop -->
    <div
      cdkDropList
      [cdkDropListData]="dragData()"
      [cdkDropListDisabled]="dragDisabled()"
      (cdkDropListDropped)="onDrop($event)"
      class="ds-list__drop-zone"
    >
      <ng-content />
    </div>
  } @else {
    <!-- Mode standard -->
    <ng-content />
  }
</div>
```

### Styles avec support Drag & Drop

```scss
// ds-list.scss
:host {
  display: block;
}

.ds-list {
  display: flex;
  flex-direction: column;

  // === Variantes ===
  &--divided {
    ::ng-deep ds-list-item:not(:last-child) {
      border-bottom: 1px solid var(--border-default);
    }
  }

  &--card {
    background: var(--background-surface);
    border: 1px solid var(--border-default);
    border-radius: var(--radius-2);
    overflow: hidden;
  }

  // === Skeleton ===
  &__skeleton {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-2) var(--space-3);
  }

  &__skeleton-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  // === Virtualisation ===
  &__viewport {
    height: 100%;
    min-height: 200px;
  }

  // === Drag & Drop ===
  &__drop-zone {
    min-height: 50px;
  }
}

// === CDK Drag & Drop styles ===
.cdk-drag-preview {
  box-sizing: border-box;
  border-radius: var(--radius-1);
  box-shadow: var(--shadow-lg);
  background: var(--background-surface);
}

.cdk-drag-placeholder {
  opacity: 0.3;
}

.cdk-drag-animating {
  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
}

.ds-list__drop-zone.cdk-drop-list-dragging .ds-list-item:not(.cdk-drag-placeholder) {
  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
}
```

---

## Phase 3 : Composant `DsListGroup` (nouveau)

### Structure des fichiers

```
ds-angular/src/lib/components/ds-list-group/
├── ds-list-group.ts
├── ds-list-group.html
├── ds-list-group.scss
├── ds-list-group.spec.ts
└── ds-list-group.types.ts
```

### API du composant

```typescript
// ds-list-group.types.ts
export type ListGroupVariant = 'default' | 'collapsible';

export interface ListGroupToggleEvent {
  expanded: boolean;
}
```

```typescript
// ds-list-group.ts
@Component({
  selector: 'ds-list-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsListGroup {
  // === Contenu ===
  title = input.required<string>();
  subtitle = input<string>();
  count = input<number>();  // Badge avec nombre d'éléments

  // === Comportement ===
  variant = input<ListGroupVariant>('default');
  expanded = input<boolean>(true);
  expandedChange = output<ListGroupToggleEvent>();

  // === Apparence ===
  sticky = input<boolean>(false);  // Header sticky au scroll
}
```

### Template HTML

```html
<!-- ds-list-group.html -->
<div
  class="ds-list-group"
  [class.ds-list-group--collapsible]="variant() === 'collapsible'"
  [class.ds-list-group--collapsed]="!expanded()"
  [class.ds-list-group--sticky]="sticky()"
>
  <!-- Header du groupe -->
  <div
    class="ds-list-group__header"
    [attr.role]="variant() === 'collapsible' ? 'button' : null"
    [attr.tabindex]="variant() === 'collapsible' ? 0 : null"
    [attr.aria-expanded]="variant() === 'collapsible' ? expanded() : null"
    (click)="toggle()"
    (keydown.enter)="toggle()"
    (keydown.space)="toggle()"
  >
    @if (variant() === 'collapsible') {
      <fa-icon
        [icon]="expanded() ? faChevronDown : faChevronRight"
        class="ds-list-group__chevron"
      />
    }

    <span class="ds-list-group__title">{{ title() }}</span>

    @if (subtitle()) {
      <span class="ds-list-group__subtitle">{{ subtitle() }}</span>
    }

    @if (count() !== undefined) {
      <ds-badge type="neutral" size="sm">{{ count() }}</ds-badge>
    }
  </div>

  <!-- Contenu du groupe -->
  @if (expanded()) {
    <div class="ds-list-group__content" role="group" [attr.aria-label]="title()">
      <ng-content />
    </div>
  }
</div>
```

### Exemple d'utilisation

```html
<!-- Groupement par date -->
<ds-list [loading]="isLoading()" [empty]="items().length === 0">
  <ds-list-group title="Aujourd'hui" [count]="todayItems().length" variant="collapsible">
    @for (item of todayItems(); track item.id) {
      <ds-list-item [title]="item.title" />
    }
  </ds-list-group>

  <ds-list-group title="Cette semaine" [count]="weekItems().length" variant="collapsible">
    @for (item of weekItems(); track item.id) {
      <ds-list-item [title]="item.title" />
    }
  </ds-list-group>

  <ds-list-group title="Plus tard" [count]="laterItems().length" variant="collapsible" [expanded]="false">
    @for (item of laterItems(); track item.id) {
      <ds-list-item [title]="item.title" />
    }
  </ds-list-group>
</ds-list>
```

---

## Phase 4 : Migration de PlannerItemCard

### Avant (code actuel)

```html
<div class="planner-item" [class.planner-item--completed]="...">
  <span class="planner-item__priority"></span>
  <ds-checkbox (checkedChange)="completePlannerItem()" />
  <div class="planner-item__content">
    <span class="planner-item__title">{{ taskTitle }}</span>
    @if (plannerTag) {
      <span class="planner-item__tag">{{ plannerTag }}</span>
    }
  </div>
  <div class="planner-item__meta">...</div>
</div>
```

### Après (avec DS)

```html
<ds-list-item
  [title]="displayTitle()"
  [checkable]="true"
  [checked]="isCompleted()"
  [completed]="isCompleted()"
  [indicator]="plannerPriority ? 'priority' : 'none'"
  [indicatorColor]="plannerPriority"
  (checkedChange)="completePlannerItem()"
  (clicked)="onItemClick()"
>
  @if (plannerTag) {
    <ds-chip inline size="sm" variant="outlined">{{ plannerTag }}</ds-chip>
  }

  @if (taskEstimatedDurationMinutes) {
    <span meta class="planner-duration">{{ taskEstimatedDurationMinutes }}'</span>
  }
  @if (displayTime()) {
    <span meta class="planner-time">{{ displayTime() }}</span>
  }
</ds-list-item>
```

### Simplification TS

```typescript
@Component({
  selector: 'planner-item-card',
  imports: [DsListItem, DsChip],
  template: `...`
})
export class PlannerItemCard {
  item = input.required<PlannerItem>();

  displayTitle = computed(() =>
    this.item().taskTitle || this.item().routineTitle || this.item().objectiveName
  );

  isCompleted = computed(() =>
    this.item().taskIsCompleted || this.item().objectiveIsCompleted
  );
}
```

---

## Phase 5 : Migration de PlannerContent

### Après migration complète

```html
<ds-list
  [loading]="isLoading()"
  [loadingCount]="5"
  [empty]="sortedItems().length === 0"
  emptyTitle="Aucun élément"
  emptyDescription="Commencez par créer une tâche, un objectif ou une routine."
  [draggable]="true"
  [dragData]="sortedItems()"
  (dropped)="onReorder($event)"
>
  <!-- Groupement par date (optionnel) -->
  <ds-list-group title="Aujourd'hui" [count]="todayItems().length">
    @for (item of todayItems(); track item.id) {
      <planner-item-card
        [item]="item"
        cdkDrag
        [cdkDragData]="item"
        (click)="setSelectedPlannerItem(item)"
      />
    }
  </ds-list-group>
</ds-list>
```

---

## Ordre d'exécution mis à jour

| Étape | Tâche | Statut | Priorité |
|-------|-------|--------|----------|
| 1 | Créer `DsListItem` | ✅ Terminé | Haute |
| 2 | Créer `ds-list.types.ts` | ✅ Terminé | Haute |
| 3 | Créer `ds-list.ts` | ✅ Terminé | Haute |
| 4 | Créer `ds-list.html` | ✅ Terminé | Haute |
| 5 | Créer `ds-list.scss` | ✅ Terminé | Haute |
| 6 | Créer `ds-list.spec.ts` | ✅ Terminé | Haute |
| 7 | Exporter `DsList` | ✅ Terminé | Haute |
| 8 | Stories Storybook (DsListItem, DsList) | ✅ Terminé | Haute |
| 9 | Créer `DsListGroup` (types, ts, html, scss, spec) | À faire | Moyenne |
| 10 | Exporter `DsListGroup` | À faire | Moyenne |
| 11 | Migrer `PlannerItemCard` | À faire | Basse |
| 12 | Migrer `PlannerContent` | À faire | Basse |

---

## Dépendances

```
DsListItem ✅
├── DsCheckbox (existant) ✅
└── (optionnel) DsChip pour les tags ✅

DsList ✅
├── DsSkeleton (existant) ✅
├── DsEmpty (existant) ✅
├── @angular/cdk/drag-drop (pour Drag & Drop) ✅
├── @angular/cdk/scrolling (pour Virtualisation) ✅
└── DsListItem ✅

DsListGroup (à faire)
├── DsBadge (existant) ✅
├── FontAwesome icons (existant) ✅
└── DsListItem ✅
```

---

## Notes techniques

### Drag & Drop avec CDK

```typescript
// Installation requise
npm install @angular/cdk

// Import dans le composant
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

// Gestion du drop
onDrop(event: CdkDragDrop<T[]>): void {
  moveItemInArray(this.dragData(), event.previousIndex, event.currentIndex);
  this.dropped.emit({
    item: event.item.data,
    previousIndex: event.previousIndex,
    currentIndex: event.currentIndex,
  });
}
```

### Virtualisation avec CDK

```typescript
// Import
import { ScrollingModule } from '@angular/cdk/scrolling';

// Usage avec *cdkVirtualFor
<cdk-virtual-scroll-viewport [itemSize]="40" class="viewport">
  <ds-list-item *cdkVirtualFor="let item of items" [title]="item.title" />
</cdk-virtual-scroll-viewport>
```
