import { Component, signal } from '@angular/core';
import { DsDivider, DsBadge, DsButton, DsCard } from 'ds-angular';

interface ExampleItem {
  id: string;
  title: string;
  description: string;
  components: string[];
  features: string[];
  codeLines: number;
  code: string;
}

@Component({
  selector: 'app-examples-page',
  standalone: true,
  imports: [DsDivider, DsBadge, DsButton, DsCard],
  template: `
    <div class="doc-page">
      <header class="doc-header">
        <span class="doc-badge">Guides</span>
        <h1 class="doc-title">Exemples de Compositions</h1>
        <p class="doc-desc">
          Exemples concrets d'utilisation des composants DS Angular dans des contextes réels.
          Chaque exemple montre comment combiner plusieurs composants pour créer des interfaces complètes.
        </p>
      </header>

      <!-- Liste des exemples -->
      @for (example of examples; track example.id) {
        <section class="example-section" [id]="example.id">
          <div class="example-header">
            <div class="example-info">
              <h2>{{ example.title }}</h2>
              <p class="example-desc">{{ example.description }}</p>
            </div>
            <div class="example-meta">
              <ds-badge type="info">~{{ example.codeLines }} lignes</ds-badge>
            </div>
          </div>

          <!-- Composants utilisés -->
          <div class="example-components">
            <span class="components-label">Composants utilisés :</span>
            <div class="components-list">
              @for (comp of example.components; track comp) {
                <code class="component-tag">{{ comp }}</code>
              }
            </div>
          </div>

          <!-- Features -->
          <div class="example-features">
            <span class="features-label">Features :</span>
            <ul class="features-list">
              @for (feature of example.features; track feature) {
                <li>{{ feature }}</li>
              }
            </ul>
          </div>

          <!-- Code toggle -->
          <div class="code-section">
            <div class="code-header">
              <span>Code source</span>
              <ds-button
                variant="ghost"
                size="sm"
                (click)="toggleCode(example.id)"
              >
                {{ isCodeVisible(example.id) ? 'Masquer' : 'Afficher' }}
              </ds-button>
            </div>

            @if (isCodeVisible(example.id)) {
              <div class="code-block">
                <div class="code-actions">
                  <ds-button
                    variant="ghost"
                    size="sm"
                    (click)="copyCode(example.code)"
                  >
                    {{ copied() === example.id ? '&#x2713; Copié' : 'Copier' }}
                  </ds-button>
                </div>
                <pre><code>{{ example.code }}</code></pre>
              </div>
            }
          </div>

          <ds-divider spacing="lg" />
        </section>
      }

      <!-- Ressources -->
      <section class="doc-section">
        <h2>Ressources</h2>
        <div class="resources-grid">
          <ds-card variant="outlined">
            <h4>Storybook</h4>
            <p>Explorez chaque composant individuellement avec des contrôles interactifs.</p>
          </ds-card>
          <ds-card variant="outlined">
            <h4>Design Tokens</h4>
            <p>Consultez les variables CSS disponibles pour personnaliser les composants.</p>
          </ds-card>
          <ds-card variant="outlined">
            <h4>Accessibilité</h4>
            <p>Bonnes pratiques WCAG et navigation clavier.</p>
          </ds-card>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .doc-page {
      max-width: 900px;
    }

    .doc-header {
      margin-bottom: 48px;
    }

    .doc-badge {
      display: inline-block;
      padding: 4px 10px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: var(--color-primary-light, #eff6ff);
      color: var(--color-primary, #3b82f6);
      border-radius: 4px;
      margin-bottom: 12px;
    }

    .doc-title {
      margin: 0 0 12px 0;
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-default, #1a1a1a);
    }

    .doc-desc {
      margin: 0;
      font-size: 1.125rem;
      color: var(--text-muted, #6b7280);
      line-height: 1.6;
    }

    .doc-section {
      margin-bottom: 32px;

      h2 {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-default, #1a1a1a);
        margin: 0 0 16px 0;
      }
    }

    // ==========================================================================
    // Example section
    // ==========================================================================
    .example-section {
      margin-bottom: 24px;
    }

    .example-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;

      h2 {
        margin: 0 0 8px 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-default, #1a1a1a);
      }
    }

    .example-desc {
      margin: 0;
      font-size: 0.9375rem;
      color: var(--text-muted, #6b7280);
    }

    // ==========================================================================
    // Components list
    // ==========================================================================
    .example-components {
      margin-bottom: 16px;
    }

    .components-label,
    .features-label {
      display: block;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted, #6b7280);
      margin-bottom: 8px;
    }

    .components-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .component-tag {
      padding: 4px 8px;
      font-size: 0.75rem;
      background: var(--background-secondary, #f3f4f6);
      color: var(--color-primary, #3b82f6);
      border-radius: 4px;
      font-family: var(--doc-code-font, monospace);
    }

    // ==========================================================================
    // Features list
    // ==========================================================================
    .example-features {
      margin-bottom: 20px;
    }

    .features-list {
      margin: 0;
      padding-left: 20px;

      li {
        font-size: 0.875rem;
        color: var(--text-default, #374151);
        margin-bottom: 4px;
      }
    }

    // ==========================================================================
    // Code section
    // ==========================================================================
    .code-section {
      border: 1px solid var(--border-default, #e5e7eb);
      border-radius: 8px;
      overflow: hidden;
    }

    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: var(--background-secondary, #f3f4f6);
      border-bottom: 1px solid var(--border-default, #e5e7eb);

      span {
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--text-muted, #6b7280);
      }
    }

    .code-block {
      position: relative;
      background: var(--gray-900, #111827);

      .code-actions {
        position: absolute;
        top: 8px;
        right: 8px;
      }

      pre {
        margin: 0;
        padding: 16px;
        overflow-x: auto;
        max-height: 500px;
      }

      code {
        font-family: 'SF Mono', Monaco, monospace;
        font-size: 0.8125rem;
        line-height: 1.6;
        color: #e5e7eb;
        white-space: pre;
      }
    }

    // ==========================================================================
    // Resources
    // ==========================================================================
    .resources-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;

      h4 {
        margin: 0 0 8px 0;
        font-size: 1rem;
      }

      p {
        margin: 0;
        font-size: 0.875rem;
        color: var(--text-muted, #6b7280);
      }
    }
  `]
})
export class ExamplesPage {
  // État pour afficher/masquer le code
  private visibleCodes = signal<Set<string>>(new Set());
  copied = signal<string | null>(null);

  isCodeVisible(id: string): boolean {
    return this.visibleCodes().has(id);
  }

  toggleCode(id: string): void {
    this.visibleCodes.update(codes => {
      const newCodes = new Set(codes);
      if (newCodes.has(id)) {
        newCodes.delete(id);
      } else {
        newCodes.add(id);
      }
      return newCodes;
    });
  }

  copyCode(code: string): void {
    navigator.clipboard.writeText(code);
    // Feedback visuel temporaire géré par le template
  }

  // Exemples
  examples: ExampleItem[] = [
    {
      id: 'dashboard',
      title: '1. Dashboard Analytics',
      description: 'Un tableau de bord complet avec sidebar, cartes statistiques et tableau de données.',
      components: ['DsSidebar', 'DsCard', 'DsBadge', 'DsButton', 'DsAvatar', 'DsProgressBar', 'DsTable', 'DsDropdown'],
      features: [
        'Sidebar navigation avec icônes',
        'Cartes statistiques avec tendances',
        'Tableau de données avec tri',
        'Dropdown pour filtres',
      ],
      codeLines: 160,
      code: `import { Component, signal } from '@angular/core';
import {
  DsSidebar, DsCard, DsBadge, DsButton, DsAvatar,
  DsProgressBar, DsTable, DsDropdown
} from '@kksdev/ds-angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DsSidebar, DsCard, DsBadge, DsButton, DsAvatar,
            DsProgressBar, DsTable, DsDropdown],
  template: \`
    <div class="dashboard-layout">
      <!-- Sidebar Navigation -->
      <ds-sidebar
        [items]="sidebarItems"
        [collapsible]="true"
        [activeItemId]="'dashboard'"
        (itemClick)="onNavigate($event)"
      />

      <!-- Main Content -->
      <main class="dashboard-content">
        <!-- Header -->
        <header class="dashboard-header">
          <h1>Dashboard</h1>
          <div class="header-actions">
            <ds-dropdown [items]="periodOptions">
              <ds-button variant="outline">
                {{ selectedPeriod() }}
              </ds-button>
            </ds-dropdown>
            <ds-avatar [src]="user.avatar" [name]="user.name" size="md" />
          </div>
        </header>

        <!-- Stats Cards -->
        <section class="stats-grid">
          @for (stat of stats(); track stat.id) {
            <ds-card variant="elevated" size="md">
              <div class="stat-card">
                <div class="stat-header">
                  <span class="stat-label">{{ stat.label }}</span>
                  <ds-badge [variant]="stat.trend > 0 ? 'success' : 'error'">
                    {{ stat.trend }}%
                  </ds-badge>
                </div>
                <div class="stat-value">{{ stat.value | number }}</div>
                <ds-progress-bar
                  [value]="stat.progress"
                  [max]="100"
                  size="sm"
                />
              </div>
            </ds-card>
          }
        </section>

        <!-- Data Table -->
        <ds-card variant="default">
          <h2 slot="header">Activité récente</h2>
          <ds-table
            [columns]="tableColumns"
            [data]="tableData()"
            [selectable]="true"
            variant="striped"
          />
        </ds-card>
      </main>
    </div>
  \`,
  styles: [\`
    .dashboard-layout { display: flex; min-height: 100vh; }
    .dashboard-content { flex: 1; padding: var(--space-6); }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: var(--space-4);
      margin-bottom: var(--space-6);
    }
  \`]
})
export class DashboardComponent {
  sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'analytics', label: 'Analytics', icon: 'chart', badge: 3 },
    { id: 'users', label: 'Utilisateurs', icon: 'users' },
    { id: 'settings', label: 'Paramètres', icon: 'cog' }
  ];

  stats = signal([
    { id: 1, label: 'Utilisateurs', value: 12453, trend: 12, progress: 78 },
    { id: 2, label: 'Revenus', value: 84320, trend: -3, progress: 62 },
    { id: 3, label: 'Conversions', value: 2341, trend: 8, progress: 89 },
    { id: 4, label: 'Sessions', value: 45678, trend: 15, progress: 94 }
  ]);
}`,
    },
    {
      id: 'registration',
      title: '2. Formulaire Multi-étapes',
      description: 'Un formulaire d\'inscription avec stepper, validation et feedback visuel.',
      components: ['DsCard', 'DsStepper', 'DsInputField', 'DsSelect', 'DsCheckbox', 'DsRadioGroup', 'DsButton', 'DsAlert', 'DsPasswordStrength', 'DsDatePicker', 'DsFileUpload'],
      features: [
        '4 étapes (Infos, Sécurité, Préférences, Confirmation)',
        'Validation en temps réel',
        'Indicateur de force mot de passe',
        'Récapitulatif final',
      ],
      codeLines: 470,
      code: `import { Component, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  DsCard, DsStepper, DsInputField, DsSelect, DsCheckbox,
  DsRadioGroup, DsButton, DsAlert, DsPasswordStrength,
  DsDatePicker, DsFileUpload
} from '@kksdev/ds-angular';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule, DsCard, DsStepper, DsInputField, DsSelect,
    DsCheckbox, DsRadioGroup, DsButton, DsAlert, DsPasswordStrength,
    DsDatePicker, DsFileUpload
  ],
  template: \`
    <ds-card variant="elevated" class="registration-card">
      <h1 slot="header">Créer un compte</h1>

      <!-- Stepper -->
      <ds-stepper
        [steps]="steps"
        [activeStep]="currentStep()"
        [linear]="true"
      />

      <!-- Step 1: Informations personnelles -->
      @if (currentStep() === 0) {
        <form [formGroup]="personalForm" class="form-section">
          <div class="form-row">
            <ds-input-field
              label="Prénom"
              formControlName="firstName"
              [required]="true"
            />
            <ds-input-field
              label="Nom"
              formControlName="lastName"
              [required]="true"
            />
          </div>

          <ds-input-field
            label="Email"
            type="email"
            formControlName="email"
            [required]="true"
          />

          <ds-date-picker
            label="Date de naissance"
            formControlName="birthDate"
          />

          <ds-file-upload
            label="Photo de profil"
            accept="image/*"
            [maxSize]="5 * 1024 * 1024"
          />
        </form>
      }

      <!-- Step 2: Sécurité -->
      @if (currentStep() === 1) {
        <form [formGroup]="securityForm" class="form-section">
          <ds-input-field
            label="Mot de passe"
            type="password"
            formControlName="password"
            [required]="true"
          />

          <ds-password-strength
            [password]="securityForm.get('password')?.value"
            [showRequirements]="true"
          />

          <ds-input-field
            label="Confirmer le mot de passe"
            type="password"
            formControlName="confirmPassword"
            [required]="true"
          />

          <ds-checkbox formControlName="twoFactor">
            Activer l'authentification à deux facteurs
          </ds-checkbox>
        </form>
      }

      <!-- Step 3: Préférences -->
      @if (currentStep() === 2) {
        <form [formGroup]="preferencesForm" class="form-section">
          <ds-select
            label="Langue"
            formControlName="language"
            [options]="languageOptions"
          />

          <ds-radio-group
            label="Thème préféré"
            formControlName="theme"
            [options]="themeOptions"
            direction="horizontal"
          />

          <ds-checkbox formControlName="terms" [required]="true">
            J'accepte les conditions d'utilisation
          </ds-checkbox>
        </form>
      }

      <!-- Step 4: Confirmation -->
      @if (currentStep() === 3) {
        <ds-alert type="success" [showIcon]="true">
          Votre compte a été créé avec succès !
        </ds-alert>
      }

      <!-- Navigation -->
      <footer slot="footer" class="form-actions">
        @if (currentStep() > 0 && currentStep() < 3) {
          <ds-button variant="outline" (click)="previousStep()">
            Précédent
          </ds-button>
        }
        @if (currentStep() < 2) {
          <ds-button variant="primary" (click)="nextStep()">
            Suivant
          </ds-button>
        }
        @if (currentStep() === 2) {
          <ds-button variant="primary" (click)="submit()">
            Créer mon compte
          </ds-button>
        }
      </footer>
    </ds-card>
  \`
})
export class RegistrationComponent {
  steps = [
    { label: 'Informations', description: 'Vos données personnelles' },
    { label: 'Sécurité', description: 'Mot de passe et 2FA' },
    { label: 'Préférences', description: 'Personnalisation' },
    { label: 'Confirmation', description: 'Récapitulatif' }
  ];

  currentStep = signal(0);

  languageOptions = [
    { value: 'fr', label: 'Français' },
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' }
  ];

  themeOptions = [
    { value: 'light', label: 'Clair' },
    { value: 'dark', label: 'Sombre' },
    { value: 'auto', label: 'Automatique' }
  ];

  nextStep() { this.currentStep.update(s => s + 1); }
  previousStep() { this.currentStep.update(s => s - 1); }
}`,
    },
    {
      id: 'todo',
      title: '3. Todo App',
      description: 'Application de gestion de tâches avec listes, groupes et filtres.',
      components: ['DsSidebar', 'DsNavList', 'DsList', 'DsListItem', 'DsListGroup', 'DsCheckboxList', 'DsSearchInput', 'DsButton', 'DsModal', 'DsInputField', 'DsSelect', 'DsDatePicker', 'DsChip', 'DsDropdown', 'DsEmpty'],
      features: [
        'Sidebar avec listes personnalisées',
        'Filtres par tags et priorité',
        'Groupement par date',
        'Modal de création de tâche',
      ],
      codeLines: 760,
      code: `import { Component, signal, computed } from '@angular/core';
import {
  DsSidebar, DsNavList, DsList, DsListItem, DsListGroup,
  DsCheckboxList, DsSearchInput, DsButton, DsModal,
  DsInputField, DsSelect, DsDatePicker, DsChip, DsDropdown, DsEmpty
} from '@kksdev/ds-angular';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: Date;
  tags: string[];
  listId: string;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    DsSidebar, DsNavList, DsList, DsListItem, DsListGroup,
    DsCheckboxList, DsSearchInput, DsButton, DsModal,
    DsInputField, DsSelect, DsDatePicker, DsChip, DsDropdown, DsEmpty
  ],
  template: \`
    <div class="todo-layout">
      <!-- Sidebar avec listes -->
      <aside class="todo-sidebar">
        <div class="sidebar-header">
          <h2>Mes listes</h2>
          <ds-button variant="ghost" size="sm" (click)="openNewListModal()">
            +
          </ds-button>
        </div>

        <ds-nav-list
          [groups]="navGroups()"
          [selectedId]="selectedListId()"
          (itemClick)="selectList($event)"
        />

        <div class="sidebar-section">
          <h3>Filtres rapides</h3>
          <ds-checkbox-list
            [items]="filterItems"
            size="sm"
            (selectionChange)="onFilterChange($event)"
          />
        </div>
      </aside>

      <!-- Contenu principal -->
      <main class="todo-content">
        <!-- Header -->
        <header class="content-header">
          <h1>{{ currentListName() }}</h1>
          <div class="header-actions">
            <ds-search-input
              placeholder="Rechercher une tâche..."
              [debounce]="300"
              (search)="onSearch($event)"
            />
            <ds-button variant="primary" (click)="openNewTaskModal()">
              + Nouvelle tâche
            </ds-button>
          </div>
        </header>

        <!-- Liste de tâches -->
        @if (groupedTasks().length > 0) {
          <ds-list variant="divided">
            @for (group of groupedTasks(); track group.date) {
              <ds-list-group
                [title]="group.label"
                [count]="group.tasks.length"
                [expanded]="true"
              >
                @for (task of group.tasks; track task.id) {
                  <ds-list-item
                    [title]="task.title"
                    [checkable]="true"
                    [checked]="task.completed"
                    (checkedChange)="toggleTask(task, $event)"
                  >
                    @for (tag of task.tags; track tag) {
                      <ds-chip size="sm" variant="outlined">
                        {{ tag }}
                      </ds-chip>
                    }
                  </ds-list-item>
                }
              </ds-list-group>
            }
          </ds-list>
        } @else {
          <ds-empty
            title="Aucune tâche"
            description="Créez votre première tâche pour commencer"
          >
            <ds-button variant="primary" (click)="openNewTaskModal()">
              Créer une tâche
            </ds-button>
          </ds-empty>
        }
      </main>
    </div>

    <!-- Modal nouvelle tâche -->
    <ds-modal
      [open]="isTaskModalOpen()"
      title="Nouvelle tâche"
      (close)="closeTaskModal()"
    >
      <form class="task-form">
        <ds-input-field
          label="Titre"
          [(ngModel)]="newTask.title"
          [required]="true"
        />

        <ds-select
          label="Priorité"
          [(ngModel)]="newTask.priority"
          [options]="priorityOptions"
        />

        <ds-date-picker
          label="Date d'échéance"
          [(ngModel)]="newTask.dueDate"
        />
      </form>

      <footer slot="footer">
        <ds-button variant="outline" (click)="closeTaskModal()">
          Annuler
        </ds-button>
        <ds-button variant="primary" (click)="createTask()">
          Créer
        </ds-button>
      </footer>
    </ds-modal>
  \`,
  styles: [\`
    .todo-layout { display: flex; min-height: 100vh; }
    .todo-sidebar { width: 280px; padding: var(--space-4); }
    .todo-content { flex: 1; padding: var(--space-6); }
  \`]
})
export class TodoAppComponent {
  isTaskModalOpen = signal(false);
  selectedListId = signal('inbox');

  priorityOptions = [
    { value: 'high', label: 'Haute' },
    { value: 'medium', label: 'Moyenne' },
    { value: 'low', label: 'Basse' }
  ];

  openNewTaskModal() { this.isTaskModalOpen.set(true); }
  closeTaskModal() { this.isTaskModalOpen.set(false); }
}`,
    },
    {
      id: 'settings',
      title: '4. Page Settings',
      description: 'Interface de paramètres avec tabs, toggles et sections organisées.',
      components: ['DsCard', 'DsTabs', 'DsToggle', 'DsSelect', 'DsInputField', 'DsButton', 'DsAvatar', 'DsFileUpload', 'DsDivider', 'DsAlert', 'DsRadioGroup'],
      features: [
        '4 tabs (Profil, Notifications, Apparence, Sécurité)',
        'Toggles pour préférences',
        'Upload avatar',
        'Gestion mot de passe',
      ],
      codeLines: 450,
      code: `import { Component, signal } from '@angular/core';
import {
  DsCard, DsTabs, DsToggle, DsSelect, DsInputField,
  DsButton, DsAvatar, DsFileUpload, DsDivider, DsAlert, DsRadioGroup
} from '@kksdev/ds-angular';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    DsCard, DsTabs, DsToggle, DsSelect, DsInputField,
    DsButton, DsAvatar, DsFileUpload, DsDivider, DsAlert, DsRadioGroup
  ],
  template: \`
    <div class="settings-page">
      <h1>Paramètres</h1>

      <ds-tabs
        [tabs]="settingsTabs"
        [activeTabId]="activeTab()"
        (tabChange)="onTabChange($event)"
      >
        <!-- Profil -->
        <div *dsTabContent="'profile'" class="settings-section">
          <ds-card>
            <h2>Informations du profil</h2>

            <div class="profile-header">
              <ds-avatar
                [src]="user().avatar"
                [name]="user().name"
                size="xl"
              />
              <ds-file-upload
                accept="image/*"
                variant="button"
                (fileSelect)="onAvatarChange($event)"
              >
                Changer la photo
              </ds-file-upload>
            </div>

            <ds-divider spacing="lg" />

            <form class="settings-form">
              <div class="form-row">
                <ds-input-field label="Prénom" [value]="user().firstName" />
                <ds-input-field label="Nom" [value]="user().lastName" />
              </div>
              <ds-input-field label="Email" type="email" [value]="user().email" />
            </form>
          </ds-card>
        </div>

        <!-- Notifications -->
        <div *dsTabContent="'notifications'" class="settings-section">
          <ds-card>
            <h2>Préférences de notifications</h2>

            <div class="setting-item">
              <div class="setting-info">
                <h4>Notifications par email</h4>
                <p>Recevoir des mises à jour par email</p>
              </div>
              <ds-toggle [checked]="notifications().email" />
            </div>

            <ds-divider />

            <div class="setting-item">
              <div class="setting-info">
                <h4>Notifications push</h4>
                <p>Recevoir des notifications sur votre appareil</p>
              </div>
              <ds-toggle [checked]="notifications().push" />
            </div>

            <ds-divider spacing="lg" />

            <h3>Fréquence des emails</h3>
            <ds-radio-group
              [options]="frequencyOptions"
              [value]="notifications().frequency"
            />
          </ds-card>
        </div>

        <!-- Apparence -->
        <div *dsTabContent="'appearance'" class="settings-section">
          <ds-card>
            <h2>Apparence</h2>

            <div class="setting-item">
              <div class="setting-info">
                <h4>Thème</h4>
                <p>Choisissez l'apparence de l'interface</p>
              </div>
              <ds-select [options]="themeOptions" [value]="appearance().theme" />
            </div>

            <ds-divider />

            <div class="setting-item">
              <div class="setting-info">
                <h4>Mode compact sidebar</h4>
                <p>Réduire automatiquement la sidebar</p>
              </div>
              <ds-toggle [checked]="appearance().compactSidebar" />
            </div>
          </ds-card>
        </div>

        <!-- Sécurité -->
        <div *dsTabContent="'security'" class="settings-section">
          <ds-card>
            <h2>Sécurité</h2>

            <ds-alert type="info" [showIcon]="true">
              Dernière connexion : il y a 2 heures
            </ds-alert>

            <ds-divider spacing="lg" />

            <div class="setting-item">
              <div class="setting-info">
                <h4>Authentification à deux facteurs</h4>
                <p>Ajouter une couche de sécurité supplémentaire</p>
              </div>
              <ds-toggle [checked]="security().twoFactor" />
            </div>

            <ds-divider />

            <div class="setting-item">
              <div class="setting-info">
                <h4>Changer le mot de passe</h4>
                <p>Dernière modification : il y a 3 mois</p>
              </div>
              <ds-button variant="outline">Modifier</ds-button>
            </div>

            <ds-divider />

            <div class="setting-item danger">
              <div class="setting-info">
                <h4>Supprimer le compte</h4>
                <p>Cette action est irréversible</p>
              </div>
              <ds-button variant="danger">Supprimer</ds-button>
            </div>
          </ds-card>
        </div>
      </ds-tabs>

      <!-- Save button -->
      <div class="settings-actions">
        <ds-button variant="outline">Annuler</ds-button>
        <ds-button variant="primary">Enregistrer</ds-button>
      </div>
    </div>
  \`,
  styles: [\`
    .settings-page { max-width: 800px; margin: 0 auto; padding: var(--space-6); }
    .setting-item { display: flex; justify-content: space-between; align-items: center; padding: var(--space-3) 0; }
    .settings-actions { display: flex; justify-content: flex-end; gap: var(--space-3); margin-top: var(--space-6); }
  \`]
})
export class SettingsPageComponent {
  settingsTabs = [
    { id: 'profile', label: 'Profil' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'appearance', label: 'Apparence' },
    { id: 'security', label: 'Sécurité' }
  ];

  activeTab = signal('profile');

  themeOptions = [
    { value: 'light', label: 'Clair' },
    { value: 'dark', label: 'Sombre' },
    { value: 'auto', label: 'Système' }
  ];

  frequencyOptions = [
    { value: 'realtime', label: 'Temps réel' },
    { value: 'daily', label: 'Quotidien' },
    { value: 'weekly', label: 'Hebdomadaire' }
  ];

  user = signal({ firstName: 'John', lastName: 'Doe', email: 'john@example.com', avatar: '' });
  notifications = signal({ email: true, push: false, frequency: 'daily' });
  appearance = signal({ theme: 'light', compactSidebar: false });
  security = signal({ twoFactor: false });
}`,
    },
  ];
}
