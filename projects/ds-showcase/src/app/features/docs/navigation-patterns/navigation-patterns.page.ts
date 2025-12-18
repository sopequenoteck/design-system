import { Component } from '@angular/core';
import { DsDivider, DsCard } from 'ds-angular';

@Component({
  selector: 'app-navigation-patterns-page',
  standalone: true,
  imports: [DsDivider, DsCard],
  template: `
    <div class="doc-page">
      <header class="doc-header">
        <span class="doc-badge">Patterns</span>
        <h1 class="doc-title">Navigation Patterns</h1>
        <p class="doc-desc">
          Patterns et bonnes pratiques pour créer des interfaces de navigation efficaces.
        </p>
      </header>

      <!-- Section: Sidebar + Content -->
      <section class="doc-section">
        <h2>1. Sidebar + Content Layout</h2>
        <p class="section-desc">
          Layout classique avec navigation latérale et contenu principal.
        </p>

        <div class="code-block">
          <pre><code>{{ sidebarLayoutCode }}</code></pre>
        </div>

        <h3>Styles recommandés</h3>
        <div class="code-block">
          <pre><code>{{ sidebarLayoutStyles }}</code></pre>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Tabs Navigation -->
      <section class="doc-section">
        <h2>2. Tabs Navigation</h2>
        <p class="section-desc">
          Navigation par onglets pour organiser le contenu en sections.
        </p>

        <div class="code-block">
          <pre><code>{{ tabsNavigationCode }}</code></pre>
        </div>

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

      <!-- Section: Breadcrumb + Routing -->
      <section class="doc-section">
        <h2>3. Breadcrumb avec Routing</h2>
        <p class="section-desc">
          Fil d'Ariane dynamique basé sur le routeur Angular.
        </p>

        <div class="code-block">
          <pre><code>{{ breadcrumbRoutingCode }}</code></pre>
        </div>

        <h3>Configuration des routes</h3>
        <div class="code-block">
          <pre><code>{{ breadcrumbRoutesCode }}</code></pre>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Pagination Data -->
      <section class="doc-section">
        <h2>4. Pagination avec données</h2>
        <p class="section-desc">
          Intégration de la pagination avec une liste de données.
        </p>

        <div class="code-block">
          <pre><code>{{ paginationDataCode }}</code></pre>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Stepper Wizard -->
      <section class="doc-section">
        <h2>5. Stepper Wizard</h2>
        <p class="section-desc">
          Navigation multi-étapes pour les processus complexes.
        </p>

        <div class="code-block">
          <pre><code>{{ stepperWizardCode }}</code></pre>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Composants navigation -->
      <section class="doc-section">
        <h2>Composants de navigation disponibles</h2>

        <div class="components-grid">
          <ds-card variant="outlined">
            <h4>ds-sidebar</h4>
            <p>Navigation verticale avec mode collapsed, groupes et badges.</p>
            <code>/components/navigation/ds-sidebar</code>
          </ds-card>

          <ds-card variant="outlined">
            <h4>ds-tabs</h4>
            <p>Onglets horizontaux avec indicateur animé.</p>
            <code>/components/navigation/ds-tabs</code>
          </ds-card>

          <ds-card variant="outlined">
            <h4>ds-breadcrumb</h4>
            <p>Fil d'Ariane avec séparateurs personnalisables.</p>
            <code>/components/navigation/ds-breadcrumb</code>
          </ds-card>

          <ds-card variant="outlined">
            <h4>ds-pagination</h4>
            <p>Pagination avec tailles de page et navigation rapide.</p>
            <code>/components/navigation/ds-pagination</code>
          </ds-card>

          <ds-card variant="outlined">
            <h4>ds-stepper</h4>
            <p>Étapes horizontal/vertical avec validation.</p>
            <code>/components/navigation/ds-stepper</code>
          </ds-card>

          <ds-card variant="outlined">
            <h4>ds-accordion</h4>
            <p>Sections collapsibles avec mode single/multi.</p>
            <code>/components/navigation/ds-accordion</code>
          </ds-card>

          <ds-card variant="outlined">
            <h4>ds-nav-list</h4>
            <p>Liste de navigation avec groupes et icônes.</p>
            <code>/components/navigation/ds-nav-list</code>
          </ds-card>

          <ds-card variant="outlined">
            <h4>ds-menu</h4>
            <p>Menu contextuel avec sous-menus et raccourcis.</p>
            <code>/components/navigation/ds-menu</code>
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

    .code-block {
      background: var(--gray-900, #111827);
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 16px;

      pre {
        margin: 0;
        padding: 16px;
        overflow-x: auto;
      }

      code {
        font-family: 'SF Mono', Monaco, monospace;
        font-size: 0.8125rem;
        line-height: 1.6;
        color: #e5e7eb;
        white-space: pre;
      }
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

      code {
        font-size: 0.6875rem;
        color: var(--text-muted, #9ca3af);
      }
    }
  `]
})
export class NavigationPatternsPage {
  sidebarLayoutCode = `import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DsSidebar } from '@kksdev/ds-angular';

@Component({
  standalone: true,
  imports: [RouterOutlet, DsSidebar],
  template: \`
    <div class="app-layout">
      <ds-sidebar
        [items]="sidebarItems"
        [collapsible]="true"
        [collapsed]="isCollapsed()"
        [activeItemId]="activeItem()"
        (itemClick)="onNavigate($event)"
        (collapsedChange)="isCollapsed.set($event)"
      />

      <main class="app-content">
        <router-outlet />
      </main>
    </div>
  \`
})
export class AppLayoutComponent {
  isCollapsed = signal(false);
  activeItem = signal('dashboard');

  sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home', path: '/dashboard' },
    { id: 'users', label: 'Utilisateurs', icon: 'users', path: '/users', badge: 5 },
    { id: 'settings', label: 'Paramètres', icon: 'cog', path: '/settings' },
  ];

  onNavigate(item: any) {
    this.activeItem.set(item.id);
    // router.navigate([item.path]);
  }
}`;

  sidebarLayoutStyles = `.app-layout {
  display: flex;
  min-height: 100vh;
}

.app-content {
  flex: 1;
  padding: var(--space-6);
  overflow-y: auto;
}

/* Responsive: sidebar en overlay sur mobile */
@media (max-width: 768px) {
  .app-layout {
    flex-direction: column;
  }

  ds-sidebar {
    position: fixed;
    z-index: 100;
    height: 100vh;
  }
}`;

  tabsNavigationCode = `import { Component, signal } from '@angular/core';
import { DsTabs, DsCard } from '@kksdev/ds-angular';

@Component({
  standalone: true,
  imports: [DsTabs, DsCard],
  template: \`
    <ds-card>
      <ds-tabs
        [tabs]="tabs"
        [activeTabId]="activeTab()"
        (tabChange)="onTabChange($event)"
      >
        <!-- Contenu Overview -->
        @if (activeTab() === 'overview') {
          <div class="tab-content">
            <h3>Vue d'ensemble</h3>
            <p>Statistiques et métriques principales.</p>
          </div>
        }

        <!-- Contenu Analytics -->
        @if (activeTab() === 'analytics') {
          <div class="tab-content">
            <h3>Analytics</h3>
            <p>Graphiques et tendances.</p>
          </div>
        }

        <!-- Contenu Reports -->
        @if (activeTab() === 'reports') {
          <div class="tab-content">
            <h3>Rapports</h3>
            <p>Exports et historique.</p>
          </div>
        }
      </ds-tabs>
    </ds-card>
  \`
})
export class DashboardTabsComponent {
  activeTab = signal('overview');

  tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'reports', label: 'Reports' },
  ];

  onTabChange(tabId: string) {
    this.activeTab.set(tabId);
  }
}`;

  breadcrumbRoutingCode = `import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DsBreadcrumb, BreadcrumbItem } from '@kksdev/ds-angular';
import { filter, map } from 'rxjs/operators';

@Component({
  standalone: true,
  imports: [DsBreadcrumb],
  template: \`
    <ds-breadcrumb
      [items]="breadcrumbs()"
      [separator]="'/'"
      (itemClick)="onNavigate($event)"
    />
  \`
})
export class DynamicBreadcrumbComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  breadcrumbs = signal<BreadcrumbItem[]>([]);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.buildBreadcrumbs(this.route.root))
    ).subscribe(items => this.breadcrumbs.set(items));
  }

  private buildBreadcrumbs(route: ActivatedRoute, path = ''): BreadcrumbItem[] {
    const items: BreadcrumbItem[] = [];

    while (route) {
      const routeConfig = route.routeConfig;
      if (routeConfig?.data?.['breadcrumb']) {
        path += '/' + routeConfig.path;
        items.push({
          label: routeConfig.data['breadcrumb'],
          path: path,
          active: !route.firstChild
        });
      }
      route = route.firstChild!;
    }

    return [{ label: 'Accueil', path: '/' }, ...items];
  }

  onNavigate(item: BreadcrumbItem) {
    if (!item.active) {
      this.router.navigate([item.path]);
    }
  }
}`;

  breadcrumbRoutesCode = `// app.routes.ts
export const routes: Routes = [
  {
    path: 'products',
    data: { breadcrumb: 'Produits' },
    children: [
      {
        path: ':id',
        data: { breadcrumb: 'Détail produit' },
        component: ProductDetailComponent
      },
      {
        path: ':id/edit',
        data: { breadcrumb: 'Modifier' },
        component: ProductEditComponent
      }
    ]
  }
];

// Résultat: Accueil / Produits / Détail produit / Modifier`;

  paginationDataCode = `import { Component, signal, computed } from '@angular/core';
import { DsPagination, DsTable } from '@kksdev/ds-angular';

@Component({
  standalone: true,
  imports: [DsPagination, DsTable],
  template: \`
    <ds-table
      [columns]="columns"
      [data]="paginatedData()"
      [loading]="loading()"
    />

    <ds-pagination
      [page]="currentPage()"
      [pageSize]="pageSize()"
      [total]="totalItems()"
      [pageSizeOptions]="[10, 25, 50, 100]"
      (pageChange)="onPageChange($event)"
      (pageSizeChange)="onPageSizeChange($event)"
    />
  \`
})
export class PaginatedTableComponent {
  // État
  currentPage = signal(1);
  pageSize = signal(10);
  totalItems = signal(0);
  loading = signal(false);
  allData = signal<any[]>([]);

  // Données paginées (computed)
  paginatedData = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.allData().slice(start, end);
  });

  columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nom' },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Statut' }
  ];

  onPageChange(page: number) {
    this.currentPage.set(page);
    // Si données serveur: this.loadData(page);
  }

  onPageSizeChange(size: number) {
    this.pageSize.set(size);
    this.currentPage.set(1); // Reset à la première page
  }

  // Chargement initial
  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.loading.set(true);
    // API call...
    this.allData.set([/* data */]);
    this.totalItems.set(this.allData().length);
    this.loading.set(false);
  }
}`;

  stepperWizardCode = `import { Component, signal, computed } from '@angular/core';
import { DsStepper, DsCard, DsButton } from '@kksdev/ds-angular';

@Component({
  standalone: true,
  imports: [DsStepper, DsCard, DsButton],
  template: \`
    <ds-card>
      <ds-stepper
        [steps]="steps"
        [activeStep]="currentStep()"
        [linear]="true"
        orientation="horizontal"
      />

      <div class="step-content">
        @switch (currentStep()) {
          @case (0) {
            <h3>Étape 1 : Informations</h3>
            <!-- Formulaire étape 1 -->
          }
          @case (1) {
            <h3>Étape 2 : Vérification</h3>
            <!-- Formulaire étape 2 -->
          }
          @case (2) {
            <h3>Étape 3 : Confirmation</h3>
            <!-- Récapitulatif -->
          }
        }
      </div>

      <footer class="step-actions">
        @if (currentStep() > 0) {
          <ds-button variant="secondary" (click)="previousStep()">
            Précédent
          </ds-button>
        }

        @if (currentStep() < steps.length - 1) {
          <ds-button
            variant="primary"
            [disabled]="!isStepValid()"
            (click)="nextStep()"
          >
            Suivant
          </ds-button>
        } @else {
          <ds-button variant="success" (click)="submit()">
            Terminer
          </ds-button>
        }
      </footer>
    </ds-card>
  \`
})
export class WizardComponent {
  currentStep = signal(0);

  steps = [
    { label: 'Informations', description: 'Données de base' },
    { label: 'Vérification', description: 'Contrôle des données' },
    { label: 'Confirmation', description: 'Validation finale' }
  ];

  // Validation par étape
  stepValidation = signal([false, false, true]);

  isStepValid(): boolean {
    return this.stepValidation()[this.currentStep()];
  }

  nextStep() {
    if (this.isStepValid() && this.currentStep() < this.steps.length - 1) {
      this.currentStep.update(s => s + 1);
    }
  }

  previousStep() {
    if (this.currentStep() > 0) {
      this.currentStep.update(s => s - 1);
    }
  }

  submit() {
    console.log('Wizard completed!');
  }
}`;
}
