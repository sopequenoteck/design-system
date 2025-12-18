import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHome,
  faUsers,
  faChartBar,
  faCog,
  faArrowUp,
  faArrowDown,
  faEllipsisVertical,
  faPlus,
  faSearch,
  faBell,
} from '@fortawesome/free-solid-svg-icons';

// Import des composants DS
import { DsCard } from '../../components/ds-card/ds-card';
import { DsBadge } from '../../components/ds-badge/ds-badge';
import { DsButton } from '../../components/ds-button/ds-button';
import { DsAvatar } from '../../components/ds-avatar/ds-avatar';
import { DsProgressBar } from '../../components/ds-progress-bar/ds-progress-bar';
import { DsTable } from '../../components/ds-table/ds-table';
import { DsDropdown } from '../../components/ds-dropdown/ds-dropdown';
import { DsPagination } from '../../components/ds-pagination/ds-pagination';
import { DsSearchInput } from '../../components/ds-search-input/ds-search-input';
import { DsSkeleton } from '../../components/ds-skeleton/ds-skeleton';
import { DsSidebar } from '../../components/ds-sidebar/ds-sidebar';

// =============================================================================
// DASHBOARD COMPONENT
// =============================================================================

@Component({
  selector: 'example-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    DsCard,
    DsBadge,
    DsButton,
    DsAvatar,
    DsProgressBar,
    DsTable,
    DsDropdown,
    DsPagination,
    DsSearchInput,
    DsSkeleton,
    DsSidebar,
  ],
  template: `
    <div class="dashboard-layout" [class.sidebar-collapsed]="sidebarCollapsed()">
      <!-- Sidebar -->
      <aside class="dashboard-sidebar">
        <div class="sidebar-header">
          <div class="logo">
            @if (!sidebarCollapsed()) {
              <span class="logo-text">DS Admin</span>
            }
            <span class="logo-icon">DS</span>
          </div>
        </div>

        <nav class="sidebar-nav">
          @for (item of navItems; track item.id) {
            <a
              class="nav-item"
              [class.active]="activeNav() === item.id"
              (click)="setActiveNav(item.id)"
            >
              <fa-icon [icon]="item.icon" class="nav-icon" />
              @if (!sidebarCollapsed()) {
                <span class="nav-label">{{ item.label }}</span>
                @if (item.badge) {
                  <ds-badge variant="primary" size="sm">{{ item.badge }}</ds-badge>
                }
              }
            </a>
          }
        </nav>

        <div class="sidebar-footer">
          <button class="collapse-btn" (click)="toggleSidebar()">
            {{ sidebarCollapsed() ? '→' : '←' }}
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="dashboard-main">
        <!-- Header -->
        <header class="dashboard-header">
          <div class="header-left">
            <h1>Dashboard</h1>
            <ds-badge variant="success" size="sm">Live</ds-badge>
          </div>

          <div class="header-right">
            <ds-search-input
              placeholder="Rechercher..."
              size="sm"
              [showClearButton]="true"
            />

            <ds-button variant="ghost" size="sm">
              <fa-icon [icon]="faBell" />
            </ds-button>

            <ds-dropdown [items]="userMenuItems" (itemSelect)="onUserAction($event)">
              <div class="user-menu-trigger">
                <ds-avatar name="John Doe" size="sm" />
                @if (!sidebarCollapsed()) {
                  <span class="user-name">John Doe</span>
                }
              </div>
            </ds-dropdown>
          </div>
        </header>

        <!-- Stats Cards -->
        <section class="stats-section">
          <div class="stats-grid">
            @for (stat of stats(); track stat.id) {
              <ds-card variant="elevated" size="sm" class="stat-card">
                <div class="stat-content">
                  <div class="stat-header">
                    <span class="stat-label">{{ stat.label }}</span>
                    <ds-badge
                      [variant]="stat.trend > 0 ? 'success' : 'error'"
                      size="sm"
                    >
                      <fa-icon [icon]="stat.trend > 0 ? faArrowUp : faArrowDown" />
                      {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
                    </ds-badge>
                  </div>
                  <div class="stat-value">{{ stat.value | number }}</div>
                  <ds-progress-bar
                    [value]="stat.progress"
                    [max]="100"
                    size="sm"
                    [variant]="stat.variant"
                  />
                  <span class="stat-footer">{{ stat.footer }}</span>
                </div>
              </ds-card>
            }
          </div>
        </section>

        <!-- Table Section -->
        <section class="table-section">
          <ds-card variant="default">
            <div class="table-header" slot="header">
              <h2>Activité récente</h2>
              <div class="table-actions">
                <ds-dropdown [items]="filterOptions" (itemSelect)="onFilterChange($event)">
                  <ds-button variant="outline" size="sm">
                    Filtrer
                  </ds-button>
                </ds-dropdown>
                <ds-button variant="primary" size="sm">
                  <fa-icon [icon]="faPlus" /> Ajouter
                </ds-button>
              </div>
            </div>

            @if (loading()) {
              <ds-skeleton variant="rectangle" [lines]="5" />
            } @else {
              <ds-table
                [columns]="tableColumns"
                [data]="tableData()"
                [selectable]="true"
                variant="striped"
                (sortChange)="onSort($event)"
                (rowClick)="onRowClick($event)"
              />
            }

            <div class="table-footer" slot="footer">
              <span class="table-info">Affichage 1-10 sur {{ totalItems() }}</span>
              <ds-pagination
                [currentPage]="currentPage()"
                [totalPages]="totalPages()"
                [showFirstLast]="true"
                size="sm"
                (pageChange)="onPageChange($event)"
              />
            </div>
          </ds-card>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-layout {
      display: flex;
      min-height: 100vh;
      background: var(--background-secondary);
    }

    /* Sidebar */
    .dashboard-sidebar {
      width: 260px;
      background: var(--background-panel);
      border-right: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      transition: width 0.2s ease;
    }

    .sidebar-collapsed .dashboard-sidebar {
      width: 72px;
    }

    .sidebar-header {
      padding: var(--space-4);
      border-bottom: 1px solid var(--border-color);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }

    .logo-icon {
      width: 36px;
      height: 36px;
      background: var(--color-primary);
      color: white;
      border-radius: var(--radius-2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 14px;
    }

    .logo-text {
      font-weight: 600;
      font-size: var(--font-size-lg);
      color: var(--text-default);
    }

    .sidebar-nav {
      flex: 1;
      padding: var(--space-4) var(--space-2);
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-3) var(--space-3);
      border-radius: var(--radius-2);
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.15s ease;
      text-decoration: none;
    }

    .nav-item:hover {
      background: var(--background-hover);
      color: var(--text-default);
    }

    .nav-item.active {
      background: var(--color-primary-light, rgba(99, 102, 241, 0.1));
      color: var(--color-primary);
    }

    .nav-icon {
      width: 20px;
      text-align: center;
    }

    .nav-label {
      flex: 1;
    }

    .sidebar-footer {
      padding: var(--space-4);
      border-top: 1px solid var(--border-color);
    }

    .collapse-btn {
      width: 100%;
      padding: var(--space-2);
      background: var(--background-hover);
      border: none;
      border-radius: var(--radius-2);
      cursor: pointer;
      color: var(--text-secondary);
    }

    /* Main Content */
    .dashboard-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-4) var(--space-6);
      background: var(--background-main);
      border-bottom: 1px solid var(--border-color);
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }

    .header-left h1 {
      margin: 0;
      font-size: var(--font-size-xl);
      font-weight: 600;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }

    .user-menu-trigger {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      cursor: pointer;
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius-2);
      transition: background 0.15s ease;
    }

    .user-menu-trigger:hover {
      background: var(--background-hover);
    }

    .user-name {
      font-size: var(--font-size-sm);
      font-weight: 500;
    }

    /* Stats Section */
    .stats-section {
      padding: var(--space-6);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: var(--space-4);
    }

    .stat-card {
      --card-padding: var(--space-4);
    }

    .stat-content {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .stat-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .stat-label {
      font-size: var(--font-size-sm);
      color: var(--text-secondary);
      font-weight: 500;
    }

    .stat-value {
      font-size: var(--font-size-2xl);
      font-weight: 700;
      color: var(--text-default);
    }

    .stat-footer {
      font-size: var(--font-size-xs);
      color: var(--text-tertiary);
    }

    /* Table Section */
    .table-section {
      flex: 1;
      padding: 0 var(--space-6) var(--space-6);
      overflow: hidden;
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .table-header h2 {
      margin: 0;
      font-size: var(--font-size-lg);
      font-weight: 600;
    }

    .table-actions {
      display: flex;
      gap: var(--space-2);
    }

    .table-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: var(--space-4);
    }

    .table-info {
      font-size: var(--font-size-sm);
      color: var(--text-secondary);
    }
  `],
})
class DashboardExampleComponent {
  // Icons
  faHome = faHome;
  faUsers = faUsers;
  faChartBar = faChartBar;
  faCog = faCog;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faEllipsisVertical = faEllipsisVertical;
  faPlus = faPlus;
  faSearch = faSearch;
  faBell = faBell;

  // State
  sidebarCollapsed = signal(false);
  activeNav = signal('dashboard');
  loading = signal(false);
  currentPage = signal(1);
  totalItems = signal(156);
  totalPages = computed(() => Math.ceil(this.totalItems() / 10));

  // Navigation
  navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: faHome },
    { id: 'users', label: 'Utilisateurs', icon: faUsers, badge: 12 },
    { id: 'analytics', label: 'Analytics', icon: faChartBar },
    { id: 'settings', label: 'Paramètres', icon: faCog },
  ];

  // User Menu
  userMenuItems = [
    { id: 'profile', label: 'Mon profil' },
    { id: 'settings', label: 'Paramètres' },
    { id: 'divider', divider: true },
    { id: 'logout', label: 'Déconnexion' },
  ];

  // Stats
  stats = signal([
    { id: 1, label: 'Utilisateurs', value: 12453, trend: 12.5, progress: 78, variant: 'success' as const, footer: 'vs mois dernier' },
    { id: 2, label: 'Revenus', value: 84320, trend: -3.2, progress: 62, variant: 'warning' as const, footer: 'Objectif: 100k' },
    { id: 3, label: 'Conversions', value: 2341, trend: 8.1, progress: 89, variant: 'success' as const, footer: 'Taux: 4.2%' },
    { id: 4, label: 'Sessions', value: 45678, trend: 15.3, progress: 94, variant: 'default' as const, footer: 'Durée moy: 4m32s' },
  ]);

  // Table
  tableColumns = [
    { key: 'user', label: 'Utilisateur', sortable: true },
    { key: 'action', label: 'Action' },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'status', label: 'Statut' },
  ];

  tableData = signal([
    { user: 'Alice Martin', action: 'Connexion', date: '17 déc. 2025', status: 'Succès' },
    { user: 'Bob Dupont', action: 'Achat #1234', date: '17 déc. 2025', status: 'Succès' },
    { user: 'Claire Bernard', action: 'Inscription', date: '16 déc. 2025', status: 'En attente' },
    { user: 'David Leroy', action: 'Modification profil', date: '16 déc. 2025', status: 'Succès' },
    { user: 'Emma Petit', action: 'Déconnexion', date: '15 déc. 2025', status: 'Succès' },
  ]);

  filterOptions = [
    { id: 'all', label: 'Tous' },
    { id: 'success', label: 'Succès' },
    { id: 'pending', label: 'En attente' },
    { id: 'error', label: 'Erreur' },
  ];

  // Actions
  toggleSidebar() {
    this.sidebarCollapsed.set(!this.sidebarCollapsed());
  }

  setActiveNav(id: string) {
    this.activeNav.set(id);
  }

  onUserAction(item: any) {
    console.log('User action:', item);
  }

  onSort(event: any) {
    console.log('Sort:', event);
  }

  onRowClick(row: any) {
    console.log('Row clicked:', row);
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  onFilterChange(item: any) {
    console.log('Filter:', item);
  }
}

// =============================================================================
// META & STORIES
// =============================================================================

const meta: Meta<DashboardExampleComponent> = {
  title: 'Examples/Dashboard Admin',
  component: DashboardExampleComponent,
  decorators: [
    moduleMetadata({
      imports: [DashboardExampleComponent],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Dashboard Admin

Exemple de composition complexe montrant un dashboard d'administration complet.

## Composants utilisés
- **DsSidebar** : Navigation latérale avec collapse
- **DsCard** : Cards de statistiques et conteneur table
- **DsBadge** : Indicateurs de tendance et compteurs
- **DsAvatar** : Photo de profil utilisateur
- **DsProgressBar** : Barres de progression des stats
- **DsTable** : Tableau de données avec tri
- **DsDropdown** : Menus contextuels
- **DsPagination** : Navigation dans les données
- **DsSearchInput** : Barre de recherche
- **DsSkeleton** : États de chargement

## Fonctionnalités
- Sidebar collapsible
- Cards de statistiques avec tendances
- Tableau avec tri et pagination
- Menu utilisateur avec dropdown
- Thème responsive
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<DashboardExampleComponent>;

/**
 * Vue complète du dashboard avec sidebar étendue.
 */
export const Default: Story = {};

/**
 * Dashboard avec sidebar fermée pour plus d'espace.
 */
export const CollapsedSidebar: Story = {
  render: () => ({
    template: `<example-dashboard />`,
    moduleMetadata: {
      imports: [DashboardExampleComponent],
    },
  }),
  play: async ({ canvasElement }) => {
    // Auto-collapse sidebar on mount
    const collapseBtn = canvasElement.querySelector('.collapse-btn') as HTMLButtonElement;
    if (collapseBtn) {
      collapseBtn.click();
    }
  },
};

/**
 * Dashboard en état de chargement avec skeletons.
 */
export const Loading: Story = {
  render: () => ({
    template: `
      <div class="dashboard-layout">
        <aside class="dashboard-sidebar" style="width: 260px; background: var(--background-panel); border-right: 1px solid var(--border-color); padding: var(--space-4);">
          <ds-skeleton variant="rectangle" style="height: 40px; margin-bottom: var(--space-4);" />
          <ds-skeleton variant="text" [lines]="4" style="margin-bottom: var(--space-2);" />
        </aside>
        <main style="flex: 1; padding: var(--space-6);">
          <ds-skeleton variant="text" style="width: 200px; height: 32px; margin-bottom: var(--space-6);" />
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-4); margin-bottom: var(--space-6);">
            <ds-skeleton variant="card" />
            <ds-skeleton variant="card" />
            <ds-skeleton variant="card" />
            <ds-skeleton variant="card" />
          </div>
          <ds-skeleton variant="rectangle" style="height: 300px;" />
        </main>
      </div>
    `,
    styles: [`
      .dashboard-layout {
        display: flex;
        min-height: 100vh;
        background: var(--background-secondary);
      }
    `],
    moduleMetadata: {
      imports: [DsSkeleton],
    },
  }),
  parameters: {
    layout: 'fullscreen',
  },
};
