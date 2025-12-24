import { Component, signal, computed, model } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe, NgTemplateOutlet } from '@angular/common';
import {
  DsList,
  DsListItem,
  DsAccordion,
  DsAccordionItem,
  DsChip,
  DsCard,
  DsEmpty,
  DsButton,
  DsToggle,
} from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { CodeSource } from '../../../registry/types';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';

/**
 * Types d'éléments planifiables
 */
type PlannerItemType = 'task' | 'objective' | 'routine';

interface Tag {
  code: string;
  label: string;
  color: string;
}

interface PlannerItem {
  id: string;
  type: PlannerItemType;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low' | null;
  duration?: string;
  time?: string;
  targetDate?: string;
  tags: Tag[];
}

interface PlannerGroup {
  key: string;
  label: string;
  items: PlannerItem[];
}

interface UsedComponent {
  id: string;
  label: string;
  path: string;
}

/**
 * Couleurs par type d'item (barre latérale)
 */
const TYPE_COLORS: Record<PlannerItemType, string> = {
  task: 'var(--color-info, #3b82f6)',
  objective: 'var(--color-warning, #f59e0b)',
  routine: 'var(--color-success, #22c55e)',
};

/**
 * Couleurs de priorité (point)
 */
const PRIORITY_COLORS: Record<string, string> = {
  high: 'var(--color-error, #ef4444)',
  medium: 'var(--color-warning, #f59e0b)',
  low: 'var(--text-muted, #6b7280)',
};

@Component({
  selector: 'demo-task-planner-page',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    TitleCasePipe,
    NgTemplateOutlet,
    DsList,
    DsListItem,
    DsAccordion,
    DsAccordionItem,
    DsChip,
    DsCard,
    DsEmpty,
    DsButton,
    DsToggle,
    DemoContainer,
  ],
  template: `
    <div class="demo-page">
      <header class="demo-header">
        <h1>Task Planner</h1>
        <p class="demo-description">
          Gestionnaire de tâches avancé avec vue groupée (Accordion), états loading/empty,
          et support multi-types (tâches, objectifs, routines).
        </p>
      </header>

      <section class="demo-section">
        <doc-demo-container [sources]="sources">
          <ds-card class="planner-container">
            <!-- Toolbar -->
            <div class="planner-toolbar">
              <h2 class="planner-title">Mes éléments</h2>
              <div class="planner-controls">
                <ds-toggle
                  [(ngModel)]="groupedMode"
                  label="Grouper par type"
                  size="sm"
                />
                <ds-button variant="ghost" size="sm" (click)="toggleLoading()">
                  {{ isLoading() ? 'Stop loading' : 'Simulate loading' }}
                </ds-button>
                <ds-button variant="ghost" size="sm" (click)="toggleEmpty()">
                  {{ showEmpty() ? 'Show items' : 'Show empty' }}
                </ds-button>
              </div>
            </div>

            <!-- Liste avec loading géré par DsList -->
            <ds-list
              class="planner-list"
              [loading]="isLoading()"
              [loadingCount]="5"
              size="sm"
            >
              @if (showEmpty()) {
                <!-- État vide -->
                <ds-empty
                  title="Aucun élément"
                  description="Commencez par créer une tâche, un objectif ou une routine."
                  [icon]="faClipboardList"
                  size="md"
                />
              } @else if (groupedMode) {
                <!-- Mode groupé avec Accordion -->
                <ds-accordion [multiple]="true" variant="separated" [expandedIds]="expandedGroups">
                  @for (group of groupedItems(); track group.key) {
                    <ds-accordion-item
                      [header]="group.label"
                      [badge]="group.items.length"
                      [id]="'group-' + group.key"
                    >
                      <div class="planner-group-items">
                        @for (item of group.items; track item.id) {
                          <ng-container
                            *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"
                          />
                        }
                      </div>
                    </ds-accordion-item>
                  }
                </ds-accordion>
              } @else {
                <!-- Mode liste plate -->
                @for (item of items(); track item.id) {
                  <ng-container
                    *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"
                  />
                }
              }
            </ds-list>

            @if (!showEmpty() && !isLoading()) {
              <p class="planner-summary">
                {{ completedCount() }} / {{ items().length }} éléments terminés
              </p>
            }
          </ds-card>
        </doc-demo-container>

        <!-- Template réutilisable pour les items -->
        <ng-template #itemTemplate let-item>
          <ds-list-item
            [title]="item.title | titlecase"
            [checkable]="true"
            [checked]="item.completed"
            [completed]="item.completed"
            indicator="priority"
            [indicatorColor]="getTypeColor(item.type)"
            (clicked)="handleClick(item)"
            (checkedChange)="handleCheckedChange(item, $event.checked)"
          >
            <!-- Point de priorité -->
            @if (item.priority && !item.completed) {
              <span
                meta
                class="planner-item__priority"
                [style.background-color]="getPriorityColor(item.priority)"
              ></span>
            }

            <!-- Durée estimée -->
            @if (item.duration) {
              <span meta class="planner-item__duration">{{ item.duration }}</span>
            }

            <!-- Heure planifiée -->
            @if (item.time) {
              <span meta class="planner-item__time">{{ item.time }}</span>
            }

            <!-- Date cible -->
            @if (item.targetDate) {
              <span meta class="planner-item__date">{{ item.targetDate }}</span>
            }

            <!-- Tags (ligne secondaire) -->
            @if (item.tags.length > 0) {
              <div secondary class="planner-item__tags">
                @for (tag of getDisplayTags(item); track tag.code) {
                  <ds-chip
                    size="sm"
                    variant="outlined"
                    [label]="tag.label"
                    [style.--chip-border]="tag.color"
                    [style.--chip-text]="tag.color"
                  />
                }
                @if (getExtraTagsCount(item) > 0) {
                  <span class="planner-item__extra-tags">+{{ getExtraTagsCount(item) }}</span>
                }
              </div>
            }
          </ds-list-item>
        </ng-template>
      </section>

      <section class="demo-features">
        <h2>Fonctionnalités démontrées</h2>
        <ul class="feature-list">
          <li><strong>Vue groupée</strong> : DsAccordion + DsAccordionItem avec badge compteur</li>
          <li><strong>Vue liste</strong> : DsListItem avec checkbox, indicateur de type, métadonnées</li>
          <li><strong>État loading</strong> : DsList avec skeletons automatiques</li>
          <li><strong>État vide</strong> : DsEmpty avec icône et description</li>
          <li><strong>Multi-types</strong> : Tâches (bleu), Objectifs (orange), Routines (vert)</li>
          <li><strong>Tags colorés</strong> : DsChip avec couleurs personnalisées</li>
        </ul>
      </section>

      <section class="demo-components">
        <h2>Composants utilisés</h2>
        <div class="component-list">
          @for (comp of usedComponents; track comp.id) {
            <a [routerLink]="comp.path" class="component-chip">{{ comp.label }}</a>
          }
        </div>
      </section>
    </div>
  `,
  styles: [`
    .demo-page { max-width: 900px; margin: 0 auto; }
    .demo-header { margin-bottom: 32px; }
    .demo-header h1 { font-size: 2rem; font-weight: 700; margin: 0 0 8px; }
    .demo-description { font-size: 1.125rem; color: var(--doc-text-secondary); margin: 0; }
    .demo-section { margin-bottom: 32px; }

    .planner-container { padding: 0; overflow: hidden; }

    .planner-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid var(--doc-border-default);
      flex-wrap: wrap;
      gap: 12px;
    }

    .planner-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
    }

    .planner-controls {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .planner-list {
      padding: 16px;
      min-height: 300px;
    }

    .planner-group-items {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .planner-summary {
      margin: 0;
      padding: 16px;
      border-top: 1px solid var(--doc-border-default);
      font-size: 0.875rem;
      color: var(--doc-text-secondary);
      text-align: center;
    }

    /* Item styles */
    .planner-item__priority {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .planner-item__duration,
    .planner-item__date {
      font-size: 0.75rem;
      color: var(--doc-text-secondary);
    }

    .planner-item__time {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-info, #3b82f6);
    }

    .planner-item__date {
      color: var(--color-warning, #f59e0b);
    }

    .planner-item__tags {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-wrap: wrap;
    }

    .planner-item__extra-tags {
      font-size: 0.75rem;
      color: var(--doc-text-secondary);
      font-weight: 500;
    }

    /* Features section */
    .demo-features {
      margin-bottom: 32px;
      padding: 20px;
      background: var(--doc-surface-elevated);
      border-radius: 8px;
    }

    .demo-features h2 {
      font-size: 1.25rem;
      margin: 0 0 16px;
    }

    .feature-list {
      margin: 0;
      padding-left: 20px;
      display: grid;
      gap: 8px;
    }

    .feature-list li {
      font-size: 0.875rem;
      color: var(--doc-text-secondary);
    }

    .feature-list strong {
      color: var(--doc-text-primary);
    }

    /* Components section */
    .demo-components h2 { font-size: 1.25rem; margin: 0 0 16px; }
    .component-list { display: flex; flex-wrap: wrap; gap: 8px; }
    .component-chip {
      padding: 4px 16px;
      background: var(--doc-surface-elevated);
      border: 1px solid var(--doc-border-default);
      border-radius: 9999px;
      color: var(--doc-text-primary);
      font-size: 0.875rem;
      text-decoration: none;
    }
    .component-chip:hover {
      border-color: var(--doc-accent-primary);
      color: var(--doc-accent-primary);
    }
  `]
})
export class TaskPlannerDemoPage {
  private readonly MAX_VISIBLE_TAGS = 2;

  readonly faClipboardList = faClipboardList;

  // État UI
  isLoading = signal(false);
  groupedMode = true;
  showEmpty = signal(false);
  expandedGroups = ['group-task', 'group-objective'];

  // Données
  items = signal<PlannerItem[]>([
    {
      id: '1',
      type: 'task',
      title: 'revoir la maquette figma',
      completed: false,
      priority: 'high',
      duration: '2h',
      time: '09:00',
      tags: [
        { code: 'design', label: 'Design', color: '#8b5cf6' },
        { code: 'urgent', label: 'Urgent', color: '#ef4444' },
      ],
    },
    {
      id: '2',
      type: 'task',
      title: 'implémenter le composant modal',
      completed: false,
      priority: 'high',
      duration: '4h',
      tags: [
        { code: 'dev', label: 'Dev', color: '#3b82f6' },
        { code: 'frontend', label: 'Frontend', color: '#06b6d4' },
        { code: 'ds', label: 'Design System', color: '#8b5cf6' },
      ],
    },
    {
      id: '3',
      type: 'task',
      title: 'écrire les tests unitaires',
      completed: true,
      priority: 'medium',
      duration: '1h30',
      tags: [{ code: 'test', label: 'Test', color: '#22c55e' }],
    },
    {
      id: '4',
      type: 'objective',
      title: 'livrer la v2 du design system',
      completed: false,
      priority: 'high',
      targetDate: '31 mars',
      tags: [{ code: 'goal', label: 'Q1', color: '#ec4899' }],
    },
    {
      id: '5',
      type: 'objective',
      title: 'atteindre 80% de couverture de tests',
      completed: false,
      priority: 'medium',
      targetDate: '15 avril',
      tags: [{ code: 'quality', label: 'Qualité', color: '#14b8a6' }],
    },
    {
      id: '6',
      type: 'routine',
      title: 'daily standup',
      completed: false,
      priority: null,
      time: '09:30',
      tags: [{ code: 'meeting', label: 'Meeting', color: '#f59e0b' }],
    },
    {
      id: '7',
      type: 'routine',
      title: 'revue de code hebdomadaire',
      completed: true,
      priority: null,
      time: '14:00',
      tags: [{ code: 'review', label: 'Review', color: '#6366f1' }],
    }
  ]);

  // Computed
  completedCount = computed(() => this.items().filter(i => i.completed).length);

  groupedItems = computed<PlannerGroup[]>(() => {
    const groups: Record<PlannerItemType, PlannerItem[]> = {
      task: [],
      objective: [],
      routine: [],
    };

    for (const item of this.items()) {
      groups[item.type].push(item);
    }

    const labels: Record<PlannerItemType, string> = {
      task: 'Tâches',
      objective: 'Objectifs',
      routine: 'Routines',
    };

    return (['task', 'objective', 'routine'] as PlannerItemType[])
      .filter(type => groups[type].length > 0)
      .map(type => ({
        key: type,
        label: labels[type],
        items: groups[type],
      }));
  });

  usedComponents: UsedComponent[] = [
    { id: 'ds-list', label: 'List', path: '/components/data-display/ds-list' },
    { id: 'ds-list-item', label: 'List Item', path: '/components/data-display/ds-list-item' },
    { id: 'ds-accordion', label: 'Accordion', path: '/components/navigation/ds-accordion' },
    { id: 'ds-chip', label: 'Chip', path: '/components/data-display/ds-chip' },
    { id: 'ds-empty', label: 'Empty', path: '/components/feedback/ds-empty' },
    { id: 'ds-card', label: 'Card', path: '/components/data-display/ds-card' },
    { id: 'ds-toggle', label: 'Toggle', path: '/components/forms/ds-toggle' },
    { id: 'ds-button', label: 'Button', path: '/components/actions/ds-button' },
  ];

  sources: CodeSource[] = [
    {
      language: 'html',
      filename: 'task-planner.component.html',
      content: `<ds-card class="planner-container">
  <div class="planner-toolbar">
    <h2>Mes éléments</h2>
    <ds-toggle
      [(ngModel)]="groupedMode"
      label="Grouper par type"
    />
  </div>

  <ds-list [loading]="isLoading()" [loadingCount]="5" size="sm">
    @if (isEmpty()) {
      <ds-empty
        title="Aucun élément"
        description="Commencez par créer une tâche."
        [icon]="faClipboardList"
      />
    } @else if (groupedMode) {
      <!-- Mode groupé -->
      <ds-accordion [multiple]="true" variant="separated" [expandedIds]="expandedGroups">
        @for (group of groupedItems(); track group.key) {
          <ds-accordion-item [header]="group.label" [badge]="group.items.length">
            @for (item of group.items; track item.id) {
              <ds-list-item
                [title]="item.title"
                [checkable]="true"
                [checked]="item.completed"
                indicator="priority"
                [indicatorColor]="getTypeColor(item.type)"
                (checkedChange)="toggleItem(item, $event.checked)"
              >
                @if (item.time) {
                  <span meta class="item-time">{{ item.time }}</span>
                }
                @if (item.tags.length > 0) {
                  <div secondary class="item-tags">
                    @for (tag of item.tags; track tag.code) {
                      <ds-chip size="sm" variant="outlined" [label]="tag.label" />
                    }
                  </div>
                }
              </ds-list-item>
            }
          </ds-accordion-item>
        }
      </ds-accordion>
    } @else {
      <!-- Mode liste plate -->
      @for (item of items(); track item.id) {
        <ds-list-item [title]="item.title" [checkable]="true" ... />
      }
    }
  </ds-list>
</ds-card>`,
    },
    {
      language: 'typescript',
      filename: 'task-planner.component.ts',
      content: `import { Component, signal, computed } from '@angular/core';
import {
  DsList, DsListItem, DsAccordion, DsAccordionItem,
  DsChip, DsCard, DsEmpty, DsToggle
} from 'ds-angular';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';

type PlannerItemType = 'task' | 'objective' | 'routine';

interface PlannerItem {
  id: string;
  type: PlannerItemType;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low' | null;
  time?: string;
  tags: { code: string; label: string; color: string }[];
}

const TYPE_COLORS: Record<PlannerItemType, string> = {
  task: 'var(--color-info)',
  objective: 'var(--color-warning)',
  routine: 'var(--color-success)',
};

@Component({
  selector: 'app-task-planner',
  standalone: true,
  imports: [DsList, DsListItem, DsAccordion, DsAccordionItem, DsChip, DsCard, DsEmpty, DsToggle],
  templateUrl: './task-planner.component.html'
})
export class TaskPlannerComponent {
  faClipboardList = faClipboardList;

  isLoading = signal(false);
  groupedMode = true;
  items = signal<PlannerItem[]>([...]);

  groupedItems = computed(() => {
    const groups = { task: [], objective: [], routine: [] };
    for (const item of this.items()) {
      groups[item.type].push(item);
    }
    return Object.entries(groups)
      .filter(([, items]) => items.length > 0)
      .map(([key, items]) => ({ key, label: this.getLabel(key), items }));
  });

  getTypeColor(type: PlannerItemType): string {
    return TYPE_COLORS[type];
  }

  toggleItem(item: PlannerItem, completed: boolean): void {
    this.items.update(items =>
      items.map(i => i.id === item.id ? { ...i, completed } : i)
    );
  }

  toggleGroupMode(): void {
    this.groupedMode = !this.groupedMode;
  }
}`,
    },
    {
      language: 'scss',
      filename: 'task-planner.component.scss',
      content: `.planner-container {
  padding: 0;
  overflow: hidden;
}

.planner-toolbar {
  display: flex;
  justify-content: space-between;
  padding: var(--space-4);
  border-bottom: 1px solid var(--border-default);
}

.item-time {
  font-size: var(--font-size-2);
  font-weight: 500;
  color: var(--color-info);
}

.item-tags {
  display: flex;
  gap: var(--space-1);
  flex-wrap: wrap;
}`,
    },
  ];

  // Méthodes
  getTypeColor(type: PlannerItemType): string {
    return TYPE_COLORS[type] || TYPE_COLORS.task;
  }

  getPriorityColor(priority: string | null): string {
    return priority ? PRIORITY_COLORS[priority] || PRIORITY_COLORS['low'] : '';
  }

  getDisplayTags(item: PlannerItem): Tag[] {
    return item.tags.slice(0, this.MAX_VISIBLE_TAGS);
  }

  getExtraTagsCount(item: PlannerItem): number {
    return Math.max(0, item.tags.length - this.MAX_VISIBLE_TAGS);
  }

  toggleLoading(): void {
    this.isLoading.update(v => !v);
  }

  toggleGroupMode(): void {
    this.groupedMode = !this.groupedMode;
  }

  toggleEmpty(): void {
    this.showEmpty.update(v => !v);
  }

  handleClick(item: PlannerItem): void {
    console.log('Item clicked:', item.title);
  }

  handleCheckedChange(item: PlannerItem, checked: boolean): void {
    this.items.update(items =>
      items.map(i => (i.id === item.id ? { ...i, completed: checked } : i))
    );
  }
}
