import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DsCheckbox, CheckboxSize, DsButton, DsCard, DsBadge, PrimitiveCheckbox } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { ComponentPageHeader } from '../../../shared/page/component-page-header';
import { DocIcon } from '../../../shared/icon/doc-icon';
import { DsCheckboxDefinition } from '../../../registry/definitions/ds-checkbox.definition';
import { ControlValues } from '../../../registry/types';

interface Task {
  id: string;
  label: string;
  completed: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  features: string[];
  selected: boolean;
}

@Component({
  selector: 'app-checkbox-page',
  standalone: true,
  imports: [FormsModule, DsCheckbox, DsButton, DsBadge, PrimitiveCheckbox, DemoContainer, PropsTable, ComponentPageHeader, DocIcon],
  template: `
    <div class="component-page">
      <doc-component-page-header
        category="forms"
        [name]="definition.name"
        [description]="definition.description"
        [selector]="definition.selector"
        version="1.7.0"
        status="stable"
        sourceLink="https://github.com/anthropics/design-system/tree/main/projects/ds-angular/src/lib/components/ds-checkbox"
      />

      <!-- Section 1: Playground -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="eye" size="sm" />
            Playground
          </h2>
          <p class="section-desc">Explorez les différentes options du composant de manière interactive.</p>
        </div>

        <doc-demo-container
          [sources]="definition.demos[0].sources ?? []"
          [code]="definition.demos[0].code"
          [controls]="definition.demos[0].controls"
          [initialValues]="defaultValues()"
          (controlChange)="onDefaultChange($event)"
        >
          <ds-checkbox
            [label]="demoLabel()"
            [size]="demoSize()"
            [required]="demoRequired()"
            [disabled]="demoDisabled()"
            [indeterminate]="demoIndeterminate()"
          />
        </doc-demo-container>
      </section>

      <!-- Section 2: Tailles -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Tailles</h2>
          <p class="section-desc">Trois tailles pour s'adapter à différents contextes.</p>
        </div>

        <doc-demo-container [code]="definition.demos[3].code">
          <div class="demo-column">
            <ds-checkbox size="sm" label="Small" />
            <ds-checkbox size="md" label="Medium" />
            <ds-checkbox size="lg" label="Large" />
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 3: États -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">États</h2>
          <p class="section-desc">Différents états visuels : coché, indéterminé, disabled, error.</p>
        </div>

        <doc-demo-container [code]="statesCode">
          <div class="demo-column">
            <ds-checkbox label="Non coché" />
            <ds-checkbox [(ngModel)]="checkedDemo" label="Coché" />
            <ds-checkbox [indeterminate]="true" label="Indéterminé" />
            <ds-checkbox [disabled]="true" label="Disabled" />
            <ds-checkbox
              label="Avec erreur"
              [required]="true"
              error="Ce champ est requis"
            />
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 4: Avec helper -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Avec aide</h2>
          <p class="section-desc">Texte d'aide pour plus de contexte.</p>
        </div>

        <doc-demo-container [code]="definition.demos[1].code">
          <ds-checkbox
            label="Newsletter"
            helper="Recevez nos dernières actualités par email"
          />
        </doc-demo-container>
      </section>

      <!-- Section 5: Use Cases -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="zap" size="sm" />
            Use Cases
          </h2>
          <p class="section-desc">Scénarios d'utilisation concrets dans une application.</p>
        </div>

        <!-- Use Case 1: Conditions CGU -->
        <div class="use-case">
          <h3 class="use-case__title">Conditions générales</h3>
          <p class="use-case__desc">Acceptation obligatoire avant inscription.</p>
          <doc-demo-container [code]="termsCode">
            <div class="terms-form">
              <ds-checkbox
                label="J'accepte les conditions générales d'utilisation"
                [(ngModel)]="termsAccepted"
                [required]="true"
                [error]="termsError()"
              />
              <ds-checkbox
                label="J'accepte de recevoir des communications marketing"
                [(ngModel)]="marketingAccepted"
                helper="Vous pouvez vous désinscrire à tout moment"
              />
              <ds-button
                variant="primary"
                [disabled]="!termsAccepted()"
              >
                Créer mon compte
              </ds-button>
            </div>
          </doc-demo-container>
        </div>

        <!-- Use Case 2: Liste de tâches -->
        <div class="use-case">
          <h3 class="use-case__title">Liste de tâches</h3>
          <p class="use-case__desc">Todo list avec progression.</p>
          <doc-demo-container [code]="todoCode">
            <div class="todo-list">
              <div class="todo-header">
                <span class="todo-title">Tâches du jour</span>
                <ds-badge [type]="allTasksCompleted() ? 'success' : 'default'">
                  {{ completedCount() }}/{{ tasks().length }}
                </ds-badge>
              </div>
              @for (task of tasks(); track task.id) {
                <primitive-checkbox
                  [label]="task.label"
                  [checked]="task.completed"
                  (checkedChange)="toggleTask(task.id)"
                />
              }
              @if (allTasksCompleted()) {
                <p class="todo-success">Bravo, toutes les tâches sont terminées !</p>
              }
            </div>
          </doc-demo-container>
        </div>

        <!-- Use Case 3: Filtres multiples -->
        <div class="use-case">
          <h3 class="use-case__title">Filtres multiples</h3>
          <p class="use-case__desc">Sélection de plusieurs catégories.</p>
          <doc-demo-container [code]="filterCode">
            <div class="filter-panel">
              <div class="filter-header">
                <span class="filter-title">Catégories</span>
                <button class="filter-action" (click)="toggleAllCategories()">
                  {{ allCategoriesSelected() ? 'Tout désélectionner' : 'Tout sélectionner' }}
                </button>
              </div>
              @for (category of categories(); track category.id) {
                <primitive-checkbox
                  [label]="category.label"
                  [checked]="category.selected"
                  (checkedChange)="toggleCategory(category.id)"
                />
              }
              <div class="filter-summary">
                {{ selectedCategoriesCount() }} catégorie(s) sélectionnée(s)
              </div>
            </div>
          </doc-demo-container>
        </div>
      </section>

      <!-- Section 6: Composition -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="grid" size="sm" />
            Composition
          </h2>
          <p class="section-desc">Combinaisons avec d'autres composants du Design System.</p>
        </div>

        <!-- Composition 1: Checkbox dans liste -->
        <div class="use-case">
          <h3 class="use-case__title">Liste avec sélection</h3>
          <p class="use-case__desc">Sélection multiple d'items dans une liste.</p>
          <doc-demo-container [code]="listCode">
            <div class="selectable-list">
              <div class="list-header">
                <primitive-checkbox
                  label="Tout sélectionner"
                  [checked]="allItemsSelected()"
                  [indeterminate]="someItemsSelected()"
                  (checkedChange)="toggleAllItems()"
                />
                @if (selectedItemsCount() > 0) {
                  <ds-button variant="ghost" size="sm">
                    Supprimer ({{ selectedItemsCount() }})
                  </ds-button>
                }
              </div>
              @for (item of listItems(); track item.id) {
                <div class="list-item" [class.list-item--selected]="item.selected">
                  <primitive-checkbox
                    [label]="item.name"
                    [checked]="item.selected"
                    (checkedChange)="toggleItem(item.id)"
                  />
                  <span class="list-item__meta">{{ item.date }}</span>
                </div>
              }
            </div>
          </doc-demo-container>
        </div>

        <!-- Composition 2: Card selection -->
        <div class="use-case">
          <h3 class="use-case__title">Sélection de plan</h3>
          <p class="use-case__desc">Cards avec checkbox pour choisir une option.</p>
          <doc-demo-container [code]="cardCode">
            <div class="plan-grid">
              @for (plan of plans(); track plan.id) {
                <div
                  class="plan-card"
                  [class.plan-card--selected]="plan.selected"
                  (click)="selectPlan(plan.id)"
                >
                  <div class="plan-card__header">
                    <primitive-checkbox
                      [checked]="plan.selected"
                      (checkedChange)="selectPlan(plan.id)"
                    />
                    <span class="plan-card__name">{{ plan.name }}</span>
                  </div>
                  <div class="plan-card__price">{{ plan.price }}</div>
                  <ul class="plan-card__features">
                    @for (feature of plan.features; track feature) {
                      <li>{{ feature }}</li>
                    }
                  </ul>
                </div>
              }
            </div>
          </doc-demo-container>
        </div>
      </section>

      <!-- Section 7: API Reference -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="code" size="sm" />
            API Reference
          </h2>
          <p class="section-desc">Documentation complète des propriétés et événements.</p>
        </div>

        <doc-props-table [props]="definition.props" />
      </section>
    </div>
  `,
  styles: [`
    .component-page {
      max-width: 900px;
    }

    .page-section {
      margin-bottom: var(--doc-space-2xl, 48px);
      animation: doc-fade-in-up 300ms ease-out;
      animation-fill-mode: both;

      &:nth-child(2) { animation-delay: 50ms; }
      &:nth-child(3) { animation-delay: 100ms; }
      &:nth-child(4) { animation-delay: 150ms; }
      &:nth-child(5) { animation-delay: 200ms; }
      &:nth-child(6) { animation-delay: 250ms; }
      &:nth-child(7) { animation-delay: 300ms; }
      &:nth-child(8) { animation-delay: 350ms; }
    }

    .section-header {
      margin-bottom: var(--doc-space-lg, 24px);
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
      margin: 0 0 var(--doc-space-sm, 8px) 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--doc-text-primary, #0f172a);
    }

    .section-desc {
      margin: 0;
      font-size: 0.9375rem;
      color: var(--doc-text-secondary, #475569);
      line-height: 1.6;
    }

    .demo-column {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-md, 16px);
    }

    /* Use Cases */
    .use-case {
      margin-bottom: var(--doc-space-xl, 32px);

      &:last-child {
        margin-bottom: 0;
      }
    }

    .use-case__title {
      margin: 0 0 var(--doc-space-xs, 4px) 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--doc-text-primary, #0f172a);
    }

    .use-case__desc {
      margin: 0 0 var(--doc-space-md, 16px) 0;
      font-size: 0.875rem;
      color: var(--doc-text-secondary, #64748b);
    }

    /* Terms form */
    .terms-form {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-md, 16px);
      max-width: 400px;
    }

    /* Todo list */
    .todo-list {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-sm, 8px);
      max-width: 320px;
    }

    .todo-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: var(--doc-space-sm, 8px);
      border-bottom: 1px solid var(--doc-border-default, #e2e8f0);
      margin-bottom: var(--doc-space-xs, 4px);
    }

    .todo-title {
      font-weight: 600;
      color: var(--doc-text-primary, #0f172a);
    }

    .todo-success {
      margin: var(--doc-space-sm, 8px) 0 0 0;
      padding: var(--doc-space-sm, 8px);
      background: var(--color-success-light, #ecfdf5);
      color: var(--color-success, #10b981);
      border-radius: var(--doc-radius-md, 8px);
      font-size: 0.875rem;
      text-align: center;
    }

    /* Filter panel */
    .filter-panel {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-sm, 8px);
      max-width: 280px;
      padding: var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #f8fafc);
      border-radius: var(--doc-radius-lg, 12px);
    }

    .filter-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--doc-space-xs, 4px);
    }

    .filter-title {
      font-weight: 600;
      font-size: 0.875rem;
      color: var(--doc-text-primary, #0f172a);
    }

    .filter-action {
      background: none;
      border: none;
      font-size: 0.75rem;
      color: var(--color-primary, #3b82f6);
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    .filter-summary {
      margin-top: var(--doc-space-xs, 4px);
      padding-top: var(--doc-space-sm, 8px);
      border-top: 1px solid var(--doc-border-default, #e2e8f0);
      font-size: 0.75rem;
      color: var(--doc-text-secondary, #64748b);
    }

    /* Selectable list */
    .selectable-list {
      max-width: 400px;
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-lg, 12px);
      overflow: hidden;
    }

    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #f8fafc);
      border-bottom: 1px solid var(--doc-border-default, #e2e8f0);
    }

    .list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--doc-space-sm, 12px) var(--doc-space-md, 16px);
      border-bottom: 1px solid var(--doc-border-default, #e2e8f0);
      transition: background 150ms ease;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background: var(--doc-surface-elevated, #f8fafc);
      }

      &--selected {
        background: var(--color-primary-light, #eff6ff);
      }
    }

    .list-item__meta {
      font-size: 0.75rem;
      color: var(--doc-text-secondary, #64748b);
    }

    /* Plan cards */
    .plan-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--doc-space-md, 16px);
      max-width: 700px;
    }

    .plan-card {
      padding: var(--doc-space-md, 16px);
      border: 2px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-lg, 12px);
      cursor: pointer;
      transition: all 150ms ease;

      &:hover {
        border-color: var(--color-primary-light, #bfdbfe);
      }

      &--selected {
        border-color: var(--color-primary, #3b82f6);
        background: var(--color-primary-light, #eff6ff);
      }
    }

    .plan-card__header {
      display: flex;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
      margin-bottom: var(--doc-space-sm, 8px);
    }

    .plan-card__name {
      font-weight: 600;
      color: var(--doc-text-primary, #0f172a);
    }

    .plan-card__price {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-primary, #3b82f6);
      margin-bottom: var(--doc-space-sm, 8px);
    }

    .plan-card__features {
      margin: 0;
      padding-left: var(--doc-space-md, 16px);
      font-size: 0.875rem;
      color: var(--doc-text-secondary, #64748b);

      li {
        margin-bottom: var(--doc-space-xs, 4px);
      }
    }
  `]
})
export class CheckboxPage {
  definition = DsCheckboxDefinition;

  // État coché demo
  checkedDemo = signal(true);

  // Playground state
  defaultValues = signal<ControlValues>({
    label: "J'accepte les conditions",
    size: 'md',
    required: false,
    disabled: false,
    indeterminate: false,
  });

  demoLabel = computed(() => this.defaultValues()['label'] as string);
  demoSize = computed(() => this.defaultValues()['size'] as CheckboxSize);
  demoRequired = computed(() => this.defaultValues()['required'] as boolean);
  demoDisabled = computed(() => this.defaultValues()['disabled'] as boolean);
  demoIndeterminate = computed(() => this.defaultValues()['indeterminate'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  // Use Case 1: Terms
  termsAccepted = signal(false);
  marketingAccepted = signal(false);
  termsError = computed(() => !this.termsAccepted() ? '' : '');

  // Use Case 2: Todo list
  tasks = signal<Task[]>([
    { id: '1', label: 'Répondre aux emails', completed: true },
    { id: '2', label: 'Préparer la réunion', completed: false },
    { id: '3', label: 'Réviser le code', completed: false },
    { id: '4', label: 'Mettre à jour la documentation', completed: false },
  ]);

  completedCount = computed(() => this.tasks().filter(t => t.completed).length);
  allTasksCompleted = computed(() => this.completedCount() === this.tasks().length);

  toggleTask(taskId: string): void {
    this.tasks.update(tasks =>
      tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
    );
  }

  // Use Case 3: Filters
  categories = signal([
    { id: '1', label: 'Électronique', selected: true },
    { id: '2', label: 'Mode', selected: false },
    { id: '3', label: 'Maison', selected: true },
    { id: '4', label: 'Sport', selected: false },
    { id: '5', label: 'Livres', selected: false },
  ]);

  selectedCategoriesCount = computed(() => this.categories().filter(c => c.selected).length);
  allCategoriesSelected = computed(() => this.selectedCategoriesCount() === this.categories().length);

  toggleCategory(categoryId: string): void {
    this.categories.update(categories =>
      categories.map(c => c.id === categoryId ? { ...c, selected: !c.selected } : c)
    );
  }

  toggleAllCategories(): void {
    const allSelected = this.allCategoriesSelected();
    this.categories.update(categories =>
      categories.map(c => ({ ...c, selected: !allSelected }))
    );
  }

  // Composition 1: Selectable list
  listItems = signal([
    { id: '1', name: 'Document A.pdf', date: 'Hier', selected: false },
    { id: '2', name: 'Image B.png', date: 'Lun', selected: true },
    { id: '3', name: 'Fichier C.docx', date: 'Mar', selected: false },
    { id: '4', name: 'Rapport D.xlsx', date: 'Mer', selected: true },
  ]);

  selectedItemsCount = computed(() => this.listItems().filter(i => i.selected).length);
  allItemsSelected = computed(() => this.selectedItemsCount() === this.listItems().length);
  someItemsSelected = computed(() => this.selectedItemsCount() > 0 && !this.allItemsSelected());

  toggleItem(itemId: string): void {
    this.listItems.update(items =>
      items.map(i => i.id === itemId ? { ...i, selected: !i.selected } : i)
    );
  }

  toggleAllItems(): void {
    const allSelected = this.allItemsSelected();
    this.listItems.update(items =>
      items.map(i => ({ ...i, selected: !allSelected }))
    );
  }

  // Composition 2: Plans
  plans = signal<Plan[]>([
    { id: 'free', name: 'Gratuit', price: '0€', features: ['1 projet', '100 MB'], selected: false },
    { id: 'pro', name: 'Pro', price: '9€/mois', features: ['10 projets', '10 GB', 'Support'], selected: true },
    { id: 'team', name: 'Team', price: '29€/mois', features: ['Illimité', '100 GB', 'Support prioritaire'], selected: false },
  ]);

  selectPlan(planId: string): void {
    this.plans.update(plans =>
      plans.map(p => ({ ...p, selected: p.id === planId }))
    );
  }

  // Code snippets
  statesCode = `<ds-checkbox label="Non coché" />
<ds-checkbox [checked]="true" label="Coché" />
<ds-checkbox [indeterminate]="true" label="Indéterminé" />
<ds-checkbox [disabled]="true" label="Disabled" />
<ds-checkbox label="Avec erreur" [required]="true" error="Ce champ est requis" />`;

  termsCode = `<ds-checkbox
  label="J'accepte les conditions générales d'utilisation"
  [(ngModel)]="termsAccepted"
  [required]="true"
/>
<ds-checkbox
  label="J'accepte de recevoir des communications marketing"
  [(ngModel)]="marketingAccepted"
  helper="Vous pouvez vous désinscrire à tout moment"
/>
<ds-button variant="primary" [disabled]="!termsAccepted()">
  Créer mon compte
</ds-button>`;

  todoCode = `// Composant
tasks = signal<Task[]>([...]);

toggleTask(taskId: string): void {
  this.tasks.update(tasks =>
    tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
  );
}

// Template
@for (task of tasks(); track task.id) {
  <ds-checkbox
    [label]="task.label"
    [checked]="task.completed"
    (checkedChange)="toggleTask(task.id)"
  />
}`;

  filterCode = `<ds-checkbox
  [label]="category.label"
  [checked]="category.selected"
  (checkedChange)="toggleCategory(category.id)"
/>

toggleAllCategories(): void {
  const allSelected = this.allCategoriesSelected();
  this.categories.update(categories =>
    categories.map(c => ({ ...c, selected: !allSelected }))
  );
}`;

  listCode = `<!-- Header avec sélection globale et état indeterminate -->
<ds-checkbox
  label="Tout sélectionner"
  [checked]="allItemsSelected()"
  [indeterminate]="someItemsSelected()"
  (checkedChange)="toggleAllItems()"
/>

<!-- Items -->
@for (item of listItems(); track item.id) {
  <ds-checkbox
    [label]="item.name"
    [checked]="item.selected"
    (checkedChange)="toggleItem(item.id)"
  />
}`;

  cardCode = `<div class="plan-card" [class.selected]="plan.selected" (click)="selectPlan(plan.id)">
  <ds-checkbox
    [checked]="plan.selected"
    (checkedChange)="selectPlan(plan.id)"
  />
  <span>{{ plan.name }}</span>
  <span>{{ plan.price }}</span>
</div>

selectPlan(planId: string): void {
  this.plans.update(plans =>
    plans.map(p => ({ ...p, selected: p.id === planId }))
  );
}`;
}
