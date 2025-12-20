import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  DsDivider,
  DsCard,
  DsSidebar,
  SidebarItem,
  SidebarMode,
  SidebarSize,
  SidebarItemClickEvent,
  DsTabs,
  TabItem,
  DsBreadcrumb,
  BreadcrumbItem,
  DsPagination,
  PaginationSize,
  DsStepper,
  Step,
  StepperOrientation,
  StepChangeEvent,
  DsButton
} from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { ControlConfig, ControlValues } from '../../../registry/types';
import { faHome, faUsers, faChartBar, faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation-patterns-page',
  standalone: true,
  imports: [
    RouterLink,
    DsDivider,
    DsCard,
    DsSidebar,
    DsTabs,
    DsBreadcrumb,
    DsPagination,
    DsStepper,
    DsButton,
    DemoContainer
  ],
  template: `
    <div class="doc-page">
      <header class="doc-header">
        <span class="doc-badge">Patterns</span>
        <h1 class="doc-title">Navigation Patterns</h1>
        <p class="doc-desc">
          Patterns et bonnes pratiques pour créer des interfaces de navigation efficaces.
        </p>
      </header>

      <!-- Section 1: Sidebar + Content -->
      <section class="doc-section">
        <h2>1. Sidebar + Content Layout</h2>
        <p class="section-desc">
          Layout classique avec navigation latérale et contenu principal.
        </p>

        <doc-demo-container
          [code]="sidebarLayoutCode"
          [controls]="sidebarControls"
          [initialValues]="sidebarValues()"
          (controlChange)="onSidebarChange($event)"
        >
          <div class="sidebar-demo">
            <ds-sidebar
              [items]="sidebarItems"
              [mode]="sidebarMode()"
              [size]="sidebarSize()"
              [collapsible]="sidebarCollapsible()"
              [initialActiveItemId]="activeItem()"
              (itemClick)="onSidebarItemClick($event)"
            />
            <div class="sidebar-content">
              <h4>Contenu : {{ activeItem() }}</h4>
              <p>Zone de contenu principal correspondant à l'item sélectionné.</p>
            </div>
          </div>
        </doc-demo-container>

        <ds-card variant="outlined" class="tip-card">
          <h4>Bonnes pratiques Sidebar</h4>
          <ul>
            <li>Utilisez le mode collapsed sur mobile pour économiser l'espace</li>
            <li>Limitez la profondeur d'imbrication à 2-3 niveaux maximum</li>
            <li>Ajoutez des badges pour les notifications importantes</li>
          </ul>
        </ds-card>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section 2: Tabs Navigation -->
      <section class="doc-section">
        <h2>2. Tabs Navigation</h2>
        <p class="section-desc">
          Navigation par onglets pour organiser le contenu en sections.
        </p>

        <doc-demo-container [code]="tabsNavigationCode">
          <div class="tabs-demo">
            <ds-tabs
              [tabs]="tabItems"
              [activeTabId]="activeTab()"
              (tabChanged)="onTabChange($event)"
            />
            <div class="tabs-content">
              @switch (activeTab()) {
                @case ('overview') {
                  <h4>Vue d'ensemble</h4>
                  <p>Statistiques et métriques principales du tableau de bord.</p>
                }
                @case ('analytics') {
                  <h4>Analytics</h4>
                  <p>Graphiques de tendances et analyses détaillées.</p>
                }
                @case ('reports') {
                  <h4>Rapports</h4>
                  <p>Exports personnalisés et historique des rapports.</p>
                }
              }
            </div>
          </div>
        </doc-demo-container>

        <ds-card variant="outlined" class="tip-card">
          <h4>Bonnes pratiques Tabs</h4>
          <ul>
            <li>Limitez à 5-7 onglets maximum</li>
            <li>Utilisez des labels courts et explicites</li>
            <li>Préservez l'état des onglets lors de la navigation</li>
            <li>Supportez la navigation clavier (flèches gauche/droite)</li>
          </ul>
        </ds-card>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section 3: Breadcrumb + Routing -->
      <section class="doc-section">
        <h2>3. Breadcrumb avec Routing</h2>
        <p class="section-desc">
          Fil d'Ariane dynamique pour la navigation hiérarchique.
        </p>

        <doc-demo-container
          [code]="breadcrumbRoutingCode"
          [controls]="breadcrumbControls"
          [initialValues]="breadcrumbValues()"
          (controlChange)="onBreadcrumbChange($event)"
        >
          <ds-breadcrumb
            [items]="breadcrumbItems"
            [separator]="breadcrumbSeparator()"
            [maxItems]="breadcrumbMaxItems()"
            (itemClicked)="onBreadcrumbClick($event)"
          />
        </doc-demo-container>

        <h3>Configuration des routes</h3>
        <doc-demo-container [code]="breadcrumbRoutesCode">
          <div class="code-example">
            <p>Le breadcrumb s'alimente automatiquement depuis les data des routes Angular.</p>
          </div>
        </doc-demo-container>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section 4: Pagination avec données -->
      <section class="doc-section">
        <h2>4. Pagination avec données</h2>
        <p class="section-desc">
          Intégration de la pagination avec une liste de données.
        </p>

        <doc-demo-container
          [code]="paginationDataCode"
          [controls]="paginationControls"
          [initialValues]="paginationValues()"
          (controlChange)="onPaginationChange($event)"
        >
          <div class="pagination-demo">
            <ul class="user-list">
              @for (user of paginatedUsers(); track user.id) {
                <li class="user-item">
                  <span class="user-name">{{ user.name }}</span>
                  <span class="user-status" [class]="'status--' + user.status.toLowerCase()">
                    {{ user.status }}
                  </span>
                </li>
              }
            </ul>
            <ds-pagination
              [totalItems]="allUsers.length"
              [pageSize]="paginationPageSize()"
              [currentPage]="currentPage()"
              [size]="paginationSize()"
              [showInfo]="paginationShowInfo()"
              (pageChange)="onPageChange($event)"
            />
          </div>
        </doc-demo-container>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section 5: Stepper Wizard -->
      <section class="doc-section">
        <h2>5. Stepper Wizard</h2>
        <p class="section-desc">
          Navigation multi-étapes pour les processus complexes.
        </p>

        <doc-demo-container
          [code]="stepperWizardCode"
          [controls]="stepperControls"
          [initialValues]="stepperValues()"
          (controlChange)="onStepperChange($event)"
        >
          <div class="stepper-demo" [class.stepper-demo--vertical]="stepperOrientation() === 'vertical'">
            <ds-stepper
              [steps]="steps"
              [activeStep]="activeStep()"
              [orientation]="stepperOrientation()"
              [linear]="stepperLinear()"
              (stepChange)="onStepChange($event)"
            />
            <div class="stepper-content">
              @switch (activeStep()) {
                @case (0) {
                  <h4>Étape 1 : Informations</h4>
                  <p>Renseignez vos données personnelles.</p>
                }
                @case (1) {
                  <h4>Étape 2 : Vérification</h4>
                  <p>Vérifiez les informations saisies.</p>
                }
                @case (2) {
                  <h4>Étape 3 : Confirmation</h4>
                  <p>Validez pour terminer le processus.</p>
                }
              }
            </div>
            <div class="stepper-actions">
              <ds-button
                variant="ghost"
                [disabled]="activeStep() === 0"
                (clicked)="previousStep()"
              >Précédent</ds-button>
              @if (activeStep() < steps.length - 1) {
                <ds-button
                  variant="primary"
                  (clicked)="nextStep()"
                >Suivant</ds-button>
              } @else {
                <ds-button
                  variant="primary"
                  appearance="solid"
                  (clicked)="finishWizard()"
                >Terminer</ds-button>
              }
            </div>
          </div>
        </doc-demo-container>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section 6: Composants navigation -->
      <section class="doc-section">
        <h2>Composants de navigation disponibles</h2>

        <div class="components-grid">
          @for (comp of navigationComponents; track comp.id) {
            <a [routerLink]="comp.path" class="component-link">
              <ds-card variant="outlined" class="component-card">
                <h4>{{ comp.selector }}</h4>
                <p>{{ comp.description }}</p>
                <span class="component-path">Voir la documentation →</span>
              </ds-card>
            </a>
          }
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
        margin: 0 0 8px 0;
      }

      h3 {
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-default, #374151);
        margin: 24px 0 12px 0;
      }
    }

    .section-desc {
      margin: 0 0 20px 0;
      font-size: 0.875rem;
      color: var(--text-muted, #6b7280);
    }

    .tip-card {
      margin-top: 16px;

      h4 {
        margin: 0 0 12px 0;
        font-size: 1rem;
      }

      ul {
        margin: 0;
        padding-left: 20px;

        li {
          font-size: 0.875rem;
          color: var(--text-muted, #6b7280);
          margin-bottom: 4px;
        }
      }
    }

    .components-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .component-link {
      text-decoration: none;
      display: block;
      border-radius: 8px;
      transition: transform 150ms ease, box-shadow 150ms ease;

      &:hover {
        transform: translateY(-2px);

        .component-card {
          border-color: var(--color-primary, #3b82f6);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
        }

        .component-path {
          color: var(--color-primary, #3b82f6);
        }
      }

      &:focus-visible {
        outline: 2px solid var(--color-primary, #3b82f6);
        outline-offset: 2px;
      }
    }

    .component-card {
      height: 100%;
      transition: border-color 150ms ease, box-shadow 150ms ease;

      h4 {
        margin: 0 0 8px 0;
        font-size: 1rem;
        color: var(--color-primary, #3b82f6);
      }

      p {
        margin: 0 0 12px 0;
        font-size: 0.8125rem;
        color: var(--text-muted, #6b7280);
      }
    }

    .component-path {
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--text-muted, #9ca3af);
      transition: color 150ms ease;
    }

    // ==========================================================================
    // Demo containers
    // ==========================================================================

    .sidebar-demo {
      display: flex;
      width: 100%;
      height: 350px;
      border: 1px solid var(--border-default, #e5e7eb);
      border-radius: 8px;
      overflow: hidden;
    }

    .sidebar-content {
      flex: 1;
      padding: 24px;
      background: var(--background-main, #ffffff);

      h4 {
        margin: 0 0 8px 0;
        font-size: 1rem;
        color: var(--text-default, #1a1a1a);
        text-transform: capitalize;
      }

      p {
        margin: 0;
        font-size: 0.875rem;
        color: var(--text-muted, #6b7280);
      }
    }

    .tabs-demo {
      width: 100%;
      border: 1px solid var(--border-default, #e5e7eb);
      border-radius: 8px;
      overflow: hidden;
    }

    .tabs-content {
      padding: 24px;
      background: var(--background-main, #ffffff);

      h4 {
        margin: 0 0 8px 0;
        font-size: 1rem;
        color: var(--text-default, #1a1a1a);
      }

      p {
        margin: 0;
        font-size: 0.875rem;
        color: var(--text-muted, #6b7280);
      }
    }

    .code-example {
      padding: 16px;
      background: var(--background-secondary, #f9fafb);
      border-radius: 6px;

      p {
        margin: 0;
        font-size: 0.875rem;
        color: var(--text-muted, #6b7280);
      }
    }

    .pagination-demo {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .user-list {
      list-style: none;
      padding: 0;
      margin: 0;
      border: 1px solid var(--border-default, #e5e7eb);
      border-radius: 8px;
      overflow: hidden;
    }

    .user-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      border-bottom: 1px solid var(--border-subtle, #f3f4f6);
      background: var(--background-main, #ffffff);

      &:last-child {
        border-bottom: none;
      }
    }

    .user-name {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-default, #1a1a1a);
    }

    .user-status {
      font-size: 0.75rem;
      font-weight: 500;
      padding: 2px 8px;
      border-radius: 4px;

      &.status--actif {
        background: var(--success-light, #dcfce7);
        color: var(--success, #16a34a);
      }

      &.status--inactif {
        background: var(--gray-100, #f3f4f6);
        color: var(--gray-600, #4b5563);
      }

      &.status--en\ attente {
        background: var(--warning-light, #fef3c7);
        color: var(--warning, #d97706);
      }
    }

    .stepper-demo {
      width: 100%;
      border: 1px solid var(--border-default, #e5e7eb);
      border-radius: 8px;
      overflow: hidden;

      &.stepper-demo--vertical {
        display: flex;

        ds-stepper {
          width: 280px;
          border-right: 1px solid var(--border-default, #e5e7eb);
        }

        .stepper-content {
          flex: 1;
        }
      }
    }

    .stepper-content {
      padding: 24px;
      background: var(--background-main, #ffffff);

      h4 {
        margin: 0 0 8px 0;
        font-size: 1rem;
        color: var(--text-default, #1a1a1a);
      }

      p {
        margin: 0;
        font-size: 0.875rem;
        color: var(--text-muted, #6b7280);
      }
    }

    .stepper-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding: 16px 24px;
      border-top: 1px solid var(--border-default, #e5e7eb);
      background: var(--background-secondary, #f9fafb);
    }
  `]
})
export class NavigationPatternsPage {
  // ==========================================================================
  // Navigation Components (Section 6)
  // ==========================================================================

  navigationComponents = [
    {
      id: 'ds-sidebar',
      selector: 'ds-sidebar',
      description: 'Navigation verticale avec mode collapsed, groupes et badges.',
      path: '/components/navigation/ds-sidebar'
    },
    {
      id: 'ds-tabs',
      selector: 'ds-tabs',
      description: 'Onglets horizontaux avec indicateur animé.',
      path: '/components/navigation/ds-tabs'
    },
    {
      id: 'ds-breadcrumb',
      selector: 'ds-breadcrumb',
      description: "Fil d'Ariane avec séparateurs personnalisables.",
      path: '/components/navigation/ds-breadcrumb'
    },
    {
      id: 'ds-pagination',
      selector: 'ds-pagination',
      description: 'Pagination avec tailles de page et navigation rapide.',
      path: '/components/navigation/ds-pagination'
    },
    {
      id: 'ds-stepper',
      selector: 'ds-stepper',
      description: 'Étapes horizontal/vertical avec validation.',
      path: '/components/navigation/ds-stepper'
    },
    {
      id: 'ds-accordion',
      selector: 'ds-accordion',
      description: 'Sections collapsibles avec mode single/multi.',
      path: '/components/navigation/ds-accordion'
    },
    {
      id: 'ds-nav-list',
      selector: 'ds-nav-list',
      description: 'Liste de navigation avec groupes et icônes.',
      path: '/components/navigation/ds-nav-list'
    },
    {
      id: 'ds-menu',
      selector: 'ds-menu',
      description: 'Menu contextuel avec sous-menus et raccourcis.',
      path: '/components/navigation/ds-menu'
    }
  ];

  // ==========================================================================
  // Section 1: Sidebar
  // ==========================================================================

  sidebarValues = signal<ControlValues>({
    mode: 'full',
    size: 'md',
    collapsible: true
  });

  sidebarMode = computed(() => this.sidebarValues()['mode'] as SidebarMode);
  sidebarSize = computed(() => this.sidebarValues()['size'] as SidebarSize);
  sidebarCollapsible = computed(() => this.sidebarValues()['collapsible'] as boolean);

  activeItem = signal<string | number>('dashboard');

  sidebarItems: SidebarItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: faHome },
    { id: 'users', label: 'Utilisateurs', icon: faUsers, badge: 5 },
    { id: 'analytics', label: 'Analytiques', icon: faChartBar },
    { id: 'settings', label: 'Paramètres', icon: faCog }
  ];

  sidebarControls: ControlConfig[] = [
    {
      name: 'mode',
      type: 'select',
      defaultValue: 'full',
      options: ['full', 'collapsed'],
      description: "Mode d'affichage de la sidebar"
    },
    {
      name: 'size',
      type: 'select',
      defaultValue: 'md',
      options: ['sm', 'md', 'lg'],
      description: 'Taille des éléments'
    },
    {
      name: 'collapsible',
      type: 'boolean',
      defaultValue: true,
      description: 'Permet de replier la sidebar'
    }
  ];

  sidebarLayoutCode = `<div class="app-layout">
  <ds-sidebar
    [items]="sidebarItems"
    [mode]="'full'"
    [collapsible]="true"
    [initialActiveItemId]="'dashboard'"
    (itemClick)="onNavigate($event)"
  />
  <main class="app-content">
    <router-outlet />
  </main>
</div>`;

  onSidebarChange(values: ControlValues): void {
    this.sidebarValues.set(values);
  }

  onSidebarItemClick(event: SidebarItemClickEvent): void {
    this.activeItem.set(event.item.id);
  }

  // ==========================================================================
  // Section 2: Tabs
  // ==========================================================================

  activeTab = signal('overview');

  tabItems: TabItem[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'reports', label: 'Reports' }
  ];

  tabsNavigationCode = `<ds-tabs
  [tabs]="tabs"
  [activeTabId]="activeTab()"
  (tabChanged)="onTabChange($event)"
/>

@switch (activeTab()) {
  @case ('overview') { <overview-content /> }
  @case ('analytics') { <analytics-content /> }
  @case ('reports') { <reports-content /> }
}`;

  onTabChange(tab: TabItem): void {
    this.activeTab.set(tab.id);
  }

  // ==========================================================================
  // Section 3: Breadcrumb
  // ==========================================================================

  breadcrumbValues = signal<ControlValues>({
    separator: '/',
    maxItems: 5
  });

  breadcrumbSeparator = computed(() => this.breadcrumbValues()['separator'] as string);
  breadcrumbMaxItems = computed(() => this.breadcrumbValues()['maxItems'] as number);

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Accueil', href: '/' },
    { label: 'Produits', href: '/products' },
    { label: 'Catégorie', href: '/products/category' },
    { label: 'Sous-catégorie', href: '/products/category/sub' },
    { label: 'Article actuel' }
  ];

  breadcrumbControls: ControlConfig[] = [
    {
      name: 'separator',
      type: 'select',
      defaultValue: '/',
      options: ['/', '>', '|', '→'],
      description: 'Séparateur entre les items'
    },
    {
      name: 'maxItems',
      type: 'number',
      defaultValue: 5,
      min: 2,
      max: 6,
      description: "Nombre maximum d'items affichés"
    }
  ];

  breadcrumbRoutingCode = `<ds-breadcrumb
  [items]="breadcrumbs()"
  [separator]="'/'"
  [maxItems]="4"
  (itemClicked)="onNavigate($event)"
/>`;

  breadcrumbRoutesCode = `// app.routes.ts
const routes: Routes = [
  {
    path: 'products',
    data: { breadcrumb: 'Produits' },
    children: [
      {
        path: ':id',
        data: { breadcrumb: 'Détail produit' },
        component: ProductDetailComponent
      }
    ]
  }
];

// Résultat: Accueil / Produits / Détail produit`;

  onBreadcrumbChange(values: ControlValues): void {
    this.breadcrumbValues.set(values);
  }

  onBreadcrumbClick(item: BreadcrumbItem): void {
    console.log('Navigate to:', item.href);
  }

  // ==========================================================================
  // Section 4: Pagination
  // ==========================================================================

  paginationValues = signal<ControlValues>({
    pageSize: 5,
    size: 'md',
    showInfo: true
  });

  paginationPageSize = computed(() => this.paginationValues()['pageSize'] as number);
  paginationSize = computed(() => this.paginationValues()['size'] as PaginationSize);
  paginationShowInfo = computed(() => this.paginationValues()['showInfo'] as boolean);

  currentPage = signal(1);

  allUsers = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: ['Alice Martin', 'Bob Dupont', 'Claire Bernard', 'David Petit', 'Emma Robert'][i % 5],
    status: ['Actif', 'Inactif', 'En attente'][i % 3]
  }));

  paginatedUsers = computed(() => {
    const start = (this.currentPage() - 1) * this.paginationPageSize();
    return this.allUsers.slice(start, start + this.paginationPageSize());
  });

  paginationControls: ControlConfig[] = [
    {
      name: 'pageSize',
      type: 'select',
      defaultValue: '5',
      options: ['5', '10', '25'],
      description: 'Éléments par page'
    },
    {
      name: 'size',
      type: 'select',
      defaultValue: 'md',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du composant'
    },
    {
      name: 'showInfo',
      type: 'boolean',
      defaultValue: true,
      description: 'Affiche les informations de pagination'
    }
  ];

  paginationDataCode = `<ul class="user-list">
  @for (user of paginatedUsers(); track user.id) {
    <li>{{ user.name }} - {{ user.status }}</li>
  }
</ul>

<ds-pagination
  [totalItems]="allUsers.length"
  [pageSize]="10"
  [currentPage]="currentPage()"
  (pageChange)="onPageChange($event)"
/>`;

  onPaginationChange(values: ControlValues): void {
    // Convert pageSize string to number
    const newValues = {
      ...values,
      pageSize: typeof values['pageSize'] === 'string'
        ? parseInt(values['pageSize'] as string, 10)
        : values['pageSize']
    };
    this.paginationValues.set(newValues);
    this.currentPage.set(1); // Reset to page 1 when changing settings
  }

  onPageChange(event: { page: number }): void {
    this.currentPage.set(event.page);
  }

  // ==========================================================================
  // Section 5: Stepper
  // ==========================================================================

  stepperValues = signal<ControlValues>({
    orientation: 'horizontal',
    linear: false
  });

  stepperOrientation = computed(() => this.stepperValues()['orientation'] as StepperOrientation);
  stepperLinear = computed(() => this.stepperValues()['linear'] as boolean);

  activeStep = signal(0);

  steps: Step[] = [
    { label: 'Informations', description: 'Données personnelles' },
    { label: 'Vérification', description: 'Contrôle des données' },
    { label: 'Confirmation', description: 'Validation finale' }
  ];

  stepperControls: ControlConfig[] = [
    {
      name: 'orientation',
      type: 'select',
      defaultValue: 'horizontal',
      options: ['horizontal', 'vertical'],
      description: 'Orientation du stepper'
    },
    {
      name: 'linear',
      type: 'boolean',
      defaultValue: false,
      description: 'Navigation linéaire obligatoire'
    }
  ];

  stepperWizardCode = `<ds-stepper
  [steps]="steps"
  [activeStep]="activeStep()"
  [orientation]="'horizontal'"
  [linear]="true"
  (stepChange)="onStepChange($event)"
/>

<div class="step-content">
  @switch (activeStep()) {
    @case (0) { <step-1-form /> }
    @case (1) { <step-2-verify /> }
    @case (2) { <step-3-confirm /> }
  }
</div>

<footer>
  <ds-button (clicked)="previousStep()">Précédent</ds-button>
  <ds-button (clicked)="nextStep()">Suivant</ds-button>
</footer>`;

  onStepperChange(values: ControlValues): void {
    this.stepperValues.set(values);
  }

  onStepChange(event: StepChangeEvent): void {
    this.activeStep.set(event.currentIndex);
  }

  previousStep(): void {
    if (this.activeStep() > 0) {
      this.activeStep.update(s => s - 1);
    }
  }

  nextStep(): void {
    if (this.activeStep() < this.steps.length - 1) {
      this.activeStep.update(s => s + 1);
    }
  }

  finishWizard(): void {
    console.log('Wizard completed!');
    this.activeStep.set(0);
  }
}
