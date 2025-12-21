import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { DsListItem, DsChip, DsCard } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { CodeSource } from '../../../registry/types';

interface Tag {
  code: string;
  label: string;
  color: string;
}

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low' | null;
  duration?: string;
  time?: string;
  targetDate?: string;
  tags: Tag[];
}

interface UsedComponent {
  id: string;
  label: string;
  path: string;
}

@Component({
  selector: 'demo-task-list-page',
  standalone: true,
  imports: [RouterLink, TitleCasePipe, DsListItem, DsChip, DsCard, DemoContainer],
  template: `
    <div class="demo-page">
      <header class="demo-header">
        <h1>Task List</h1>
        <p class="demo-description">Liste de tâches interactive avec priorités, métadonnées et tags - style TickTick/Todoist.</p>
      </header>

      <section class="demo-section">
        <doc-demo-container [sources]="sources">
          <ds-card class="task-container">
            <h2 class="task-header">Mes tâches</h2>

            @for (task of tasks(); track task.id) {
              <ds-list-item
                [title]="task.title | titlecase"
                [checkable]="true"
                [checked]="task.completed"
                [completed]="task.completed"
                [indicator]="task.priority ? 'priority' : 'none'"
                [indicatorColor]="getIndicatorColor(task.priority)"
                (clicked)="handleClick(task)"
                (checkedChange)="handleCheckedChange(task, $event.checked)"
              >
                <!-- Point de priorité (métadonnées) -->
                @if (task.priority && !task.completed) {
                  <span
                    meta
                    class="priority-dot"
                    [style.background-color]="getPriorityDotColor(task.priority)"
                  ></span>
                }

                <!-- Durée estimée -->
                @if (task.duration) {
                  <span meta class="task-duration">{{ task.duration }}</span>
                }

                <!-- Heure planifiée -->
                @if (task.time) {
                  <span meta class="task-time">{{ task.time }}</span>
                }

                <!-- Date cible -->
                @if (task.targetDate) {
                  <span meta class="task-date">{{ task.targetDate }}</span>
                }

                <!-- Ligne secondaire : Tags -->
                @if (task.tags.length > 0) {
                  <div secondary class="task-tags">
                    @for (tag of getDisplayTags(task); track tag.code) {
                      <ds-chip
                        size="sm"
                        variant="outlined"
                        [label]="tag.label"
                        [style.--chip-border]="tag.color"
                        [style.--chip-text]="tag.color"
                      />
                    }
                    @if (getExtraTagsCount(task) > 0) {
                      <span class="extra-tags">+{{ getExtraTagsCount(task) }}</span>
                    }
                  </div>
                }
              </ds-list-item>
            }

            @if (completedCount() > 0) {
              <p class="task-summary">{{ completedCount() }} / {{ tasks().length }} tâches terminées</p>
            }
          </ds-card>
        </doc-demo-container>
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
    .demo-page { max-width: 800px; margin: 0 auto; }
    .demo-header { margin-bottom: 32px; }
    .demo-header h1 { font-size: 2rem; font-weight: 700; margin: 0 0 8px; }
    .demo-description { font-size: 1.125rem; color: var(--doc-text-secondary); margin: 0; }
    .demo-section { margin-bottom: 32px; }

    .task-container { padding: 16px; }
    .task-header {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0 0 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--doc-border-default);
    }

    .priority-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .task-duration,
    .task-time,
    .task-date {
      font-size: 0.75rem;
      color: var(--doc-text-secondary);
      white-space: nowrap;
    }

    .task-time {
      font-weight: 500;
      color: var(--color-info, #3b82f6);
    }

    .task-date {
      color: var(--color-warning, #f59e0b);
    }

    .task-tags {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-wrap: wrap;
    }

    .extra-tags {
      font-size: 0.75rem;
      color: var(--doc-text-secondary);
      padding: 2px 6px;
      background: var(--doc-surface-elevated);
      border-radius: 4px;
    }

    .task-summary {
      margin: 16px 0 0;
      padding-top: 12px;
      border-top: 1px solid var(--doc-border-default);
      font-size: 0.875rem;
      color: var(--doc-text-secondary);
      text-align: center;
    }

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
export class TaskListDemoPage {
  private readonly MAX_VISIBLE_TAGS = 2;

  tasks = signal<Task[]>([
    {
      id: 1,
      title: 'revoir la maquette figma',
      completed: false,
      priority: 'high',
      duration: '2h',
      time: '09:00',
      tags: [
        { code: 'design', label: 'Design', color: '#8b5cf6' },
        { code: 'urgent', label: 'Urgent', color: '#ef4444' }
      ]
    },
    {
      id: 2,
      title: 'implémenter le composant modal',
      completed: false,
      priority: 'high',
      duration: '4h',
      tags: [
        { code: 'dev', label: 'Dev', color: '#3b82f6' },
        { code: 'frontend', label: 'Frontend', color: '#06b6d4' },
        { code: 'ds', label: 'Design System', color: '#8b5cf6' }
      ]
    },
    {
      id: 3,
      title: 'écrire les tests unitaires',
      completed: false,
      priority: 'medium',
      duration: '1h30',
      tags: [
        { code: 'test', label: 'Test', color: '#22c55e' }
      ]
    },
    {
      id: 4,
      title: 'réunion sprint planning',
      completed: false,
      priority: 'medium',
      time: '14:00',
      tags: [
        { code: 'meeting', label: 'Meeting', color: '#f59e0b' }
      ]
    },
    {
      id: 5,
      title: 'mettre à jour la documentation',
      completed: true,
      priority: 'low',
      duration: '30min',
      tags: [
        { code: 'docs', label: 'Docs', color: '#64748b' }
      ]
    },
    {
      id: 6,
      title: 'code review PR #42',
      completed: false,
      priority: null,
      tags: []
    },
    {
      id: 7,
      title: 'objectif Q1 : livrer la v2',
      completed: false,
      priority: 'high',
      targetDate: '31 mars',
      tags: [
        { code: 'goal', label: 'Objectif', color: '#ec4899' }
      ]
    }
  ]);

  completedCount = computed(() => this.tasks().filter(t => t.completed).length);

  usedComponents: UsedComponent[] = [
    { id: 'ds-list-item', label: 'List Item', path: '/components/data-display/ds-list-item' },
    { id: 'ds-chip', label: 'Chip', path: '/components/data-display/ds-chip' },
    { id: 'ds-card', label: 'Card', path: '/components/data-display/ds-card' },
  ];

  sources: CodeSource[] = [
    {
      language: 'html',
      filename: 'task-list.component.html',
      content: `<ds-card class="task-container">
  <h2>Mes tâches</h2>

  @for (task of tasks(); track task.id) {
    <ds-list-item
      [title]="task.title | titlecase"
      [checkable]="true"
      [checked]="task.completed"
      [completed]="task.completed"
      [indicator]="task.priority ? 'priority' : 'none'"
      [indicatorColor]="getIndicatorColor(task.priority)"
      (checkedChange)="toggleTask(task, $event.checked)"
    >
      <!-- Point de priorité -->
      @if (task.priority && !task.completed) {
        <span meta class="priority-dot" [style.background-color]="getPriorityColor(task.priority)"></span>
      }

      <!-- Durée estimée -->
      @if (task.duration) {
        <span meta class="task-duration">{{ task.duration }}</span>
      }

      <!-- Heure planifiée -->
      @if (task.time) {
        <span meta class="task-time">{{ task.time }}</span>
      }

      <!-- Ligne secondaire : Tags -->
      @if (task.tags.length > 0) {
        <div secondary class="task-tags">
          @for (tag of task.tags; track tag.code) {
            <ds-chip
              size="sm"
              variant="outlined"
              [label]="tag.label"
              [style.--chip-border]="tag.color"
            />
          }
        </div>
      }
    </ds-list-item>
  }
</ds-card>`
    },
    {
      language: 'typescript',
      filename: 'task-list.component.ts',
      content: `import { Component, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { DsListItem, DsChip, DsCard } from 'ds-angular';

interface Tag {
  code: string;
  label: string;
  color: string;
}

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low' | null;
  duration?: string;
  time?: string;
  tags: Tag[];
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TitleCasePipe, DsListItem, DsChip, DsCard],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  tasks = signal<Task[]>([
    {
      id: 1,
      title: 'revoir la maquette figma',
      completed: false,
      priority: 'high',
      duration: '2h',
      time: '09:00',
      tags: [
        { code: 'design', label: 'Design', color: '#8b5cf6' }
      ]
    },
    // ... more tasks
  ]);

  getIndicatorColor(priority: string | null): string {
    const colors: Record<string, string> = {
      high: 'high',
      medium: 'medium',
      low: 'low'
    };
    return priority ? colors[priority] : 'medium';
  }

  toggleTask(task: Task, completed: boolean): void {
    this.tasks.update(tasks =>
      tasks.map(t => t.id === task.id ? { ...t, completed } : t)
    );
  }
}`
    },
    {
      language: 'scss',
      filename: 'task-list.component.scss',
      content: `.task-container {
  padding: var(--space-4);
}

.priority-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.task-duration,
.task-time {
  font-size: var(--font-size-1);
  color: var(--text-secondary);
}

.task-time {
  font-weight: 500;
  color: var(--color-info);
}

.task-tags {
  display: flex;
  gap: var(--space-1);
  flex-wrap: wrap;
}`
    }
  ];

  getIndicatorColor(priority: 'high' | 'medium' | 'low' | null): string {
    if (!priority) return 'medium';
    return priority;
  }

  getPriorityDotColor(priority: 'high' | 'medium' | 'low' | null): string {
    const colors: Record<string, string> = {
      high: 'var(--color-error, #ef4444)',
      medium: 'var(--color-warning, #f59e0b)',
      low: 'var(--color-info, #3b82f6)'
    };
    return priority ? colors[priority] : '';
  }

  getDisplayTags(task: Task): Tag[] {
    return task.tags.slice(0, this.MAX_VISIBLE_TAGS);
  }

  getExtraTagsCount(task: Task): number {
    return Math.max(0, task.tags.length - this.MAX_VISIBLE_TAGS);
  }

  handleClick(task: Task): void {
    console.log('Task clicked:', task.title);
  }

  handleCheckedChange(task: Task, checked: boolean): void {
    this.tasks.update(tasks =>
      tasks.map(t => t.id === task.id ? { ...t, completed: checked } : t)
    );
  }
}
