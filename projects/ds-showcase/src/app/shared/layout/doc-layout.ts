import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeSwitcher } from '../theme/theme-switcher';
import { GlobalSearch } from '../search/global-search';
import { DynamicBreadcrumb } from '../breadcrumb/dynamic-breadcrumb';
import { NavItem } from '../../registry/types';

@Component({
  selector: 'doc-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ThemeSwitcher, GlobalSearch, DynamicBreadcrumb],
  template: `
    <div class="doc-layout" [class.sidebar-collapsed]="sidebarCollapsed()">
      <!-- Sidebar -->
      <aside class="doc-sidebar">
        <div class="doc-sidebar__header">
          <a routerLink="/" class="doc-sidebar__logo">
            @if (!sidebarCollapsed()) {
              <span class="doc-sidebar__title">DS Showcase</span>
            } @else {
              <span class="doc-sidebar__title-short">DS</span>
            }
          </a>
          <button
            type="button"
            class="doc-sidebar__toggle"
            [attr.aria-expanded]="!sidebarCollapsed()"
            aria-label="Toggle sidebar"
            (click)="toggleSidebar()"
          >
            {{ sidebarCollapsed() ? '→' : '←' }}
          </button>
        </div>

        <nav class="doc-sidebar__nav" aria-label="Navigation principale">
          @for (item of navigation; track item.id) {
            <!-- Niveau 1 : Item simple (sans children) -->
            @if (!item.children) {
              <a
                class="doc-nav-item doc-nav-item--top"
                [routerLink]="item.path"
                routerLinkActive="active"
              >
                @if (!sidebarCollapsed()) {
                  {{ item.label }}
                } @else {
                  <span [title]="item.label">{{ item.icon || '📄' }}</span>
                }
              </a>
            } @else {
              <!-- Niveau 1 : Groupe avec children -->
              <div class="doc-nav-group">
                <button
                  type="button"
                  class="doc-nav-group__header"
                  [attr.aria-expanded]="isExpanded(item.id)"
                  (click)="toggleGroup(item.id)"
                >
                  @if (!sidebarCollapsed()) {
                    <span>{{ item.label }}</span>
                    <span class="doc-nav-group__arrow">
                      {{ isExpanded(item.id) ? '▼' : '▶' }}
                    </span>
                  } @else {
                    <span [title]="item.label">{{ item.icon || '📁' }}</span>
                  }
                </button>

                @if (isExpanded(item.id) && !sidebarCollapsed()) {
                  <div class="doc-nav-group__items">
                    @for (child of item.children; track child.id) {
                      <!-- Niveau 2 : Item simple -->
                      @if (!child.children) {
                        <a
                          class="doc-nav-item"
                          [routerLink]="child.path"
                          routerLinkActive="active"
                        >
                          {{ child.label }}
                        </a>
                      } @else {
                        <!-- Niveau 2 : Sous-groupe avec children (niveau 3) -->
                        <div class="doc-nav-subgroup">
                          <button
                            type="button"
                            class="doc-nav-subgroup__header"
                            [attr.aria-expanded]="isExpanded(child.id)"
                            (click)="toggleGroup(child.id)"
                          >
                            <span>{{ child.label }}</span>
                            <span class="doc-nav-subgroup__arrow">
                              {{ isExpanded(child.id) ? '▼' : '▶' }}
                            </span>
                          </button>

                          @if (isExpanded(child.id)) {
                            <div class="doc-nav-subgroup__items">
                              @for (subChild of child.children; track subChild.id) {
                                <a
                                  class="doc-nav-item doc-nav-item--level3"
                                  [routerLink]="subChild.path"
                                  routerLinkActive="active"
                                >
                                  {{ subChild.label }}
                                </a>
                              }
                            </div>
                          }
                        </div>
                      }
                    }
                  </div>
                }
              </div>
            }
          }
        </nav>
      </aside>

      <!-- Main content -->
      <main class="doc-main">
        <header class="doc-header">
          <div class="doc-header__left">
            <doc-breadcrumb />
          </div>
          <div class="doc-header__right">
            <doc-global-search />
            <doc-theme-switcher />
          </div>
        </header>

        <div class="doc-content">
          <router-outlet />
        </div>
      </main>
    </div>
  `,
  styles: [`
    .doc-layout {
      display: flex;
      min-height: 100vh;
    }

    // ==========================================================================
    // Sidebar
    // ==========================================================================
    .doc-sidebar {
      width: var(--doc-sidebar-width);
      background: var(--background-panel, #ffffff);
      border-right: 1px solid var(--border-default, #e5e7eb);
      display: flex;
      flex-direction: column;
      transition: width 0.2s ease;
      overflow: hidden;

      .sidebar-collapsed & {
        width: var(--doc-sidebar-collapsed-width);
      }
    }

    .doc-sidebar__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      border-bottom: 1px solid var(--border-default, #e5e7eb);
      min-height: var(--doc-header-height);
    }

    .doc-sidebar__logo {
      text-decoration: none;
      color: var(--text-default, #1a1a1a);
      font-weight: 600;
      font-size: 1.125rem;
    }

    .doc-sidebar__title-short {
      font-size: 1rem;
    }

    .doc-sidebar__toggle {
      width: 28px;
      height: 28px;
      padding: 0;
      border: none;
      border-radius: var(--radius-1, 4px);
      background: var(--background-secondary, #f3f4f6);
      color: var(--text-muted, #6b7280);
      cursor: pointer;
      font-size: 12px;

      &:hover {
        background: var(--background-main, #e5e7eb);
      }

      .sidebar-collapsed & {
        margin: 0 auto;
      }
    }

    .doc-sidebar__nav {
      flex: 1;
      overflow-y: auto;
      padding: 8px;
    }

    // ==========================================================================
    // Navigation items - Niveau 1
    // ==========================================================================
    .doc-nav-group {
      margin-bottom: 4px;
    }

    .doc-nav-group__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 8px 12px;
      border: none;
      border-radius: var(--radius-1, 4px);
      background: transparent;
      color: var(--text-default, #1a1a1a);
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      cursor: pointer;
      text-align: left;

      &:hover {
        background: var(--background-secondary, #f3f4f6);
      }

      .sidebar-collapsed & {
        justify-content: center;
        padding: 8px;
      }
    }

    .doc-nav-group__arrow {
      font-size: 10px;
      color: var(--text-muted, #9ca3af);
    }

    .doc-nav-group__items {
      padding-left: 8px;
    }

    // ==========================================================================
    // Navigation items - Niveau 2 (sous-groupes)
    // ==========================================================================
    .doc-nav-subgroup {
      margin-bottom: 2px;
    }

    .doc-nav-subgroup__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 6px 12px;
      border: none;
      border-radius: var(--radius-1, 4px);
      background: transparent;
      color: var(--text-default, #374151);
      font-size: 0.8125rem;
      font-weight: 500;
      cursor: pointer;
      text-align: left;

      &:hover {
        background: var(--background-secondary, #f3f4f6);
      }
    }

    .doc-nav-subgroup__arrow {
      font-size: 9px;
      color: var(--text-muted, #9ca3af);
    }

    .doc-nav-subgroup__items {
      padding-left: 12px;
    }

    // ==========================================================================
    // Navigation items - Items
    // ==========================================================================
    .doc-nav-item {
      display: block;
      padding: 8px 12px;
      border-radius: var(--radius-1, 4px);
      color: var(--text-muted, #6b7280);
      text-decoration: none;
      font-size: 0.875rem;
      transition: all 0.15s ease;

      &:hover {
        background: var(--background-secondary, #f3f4f6);
        color: var(--text-default, #1a1a1a);
      }

      &.active {
        background: var(--color-primary-light, #eff6ff);
        color: var(--color-primary, #3b82f6);
        font-weight: 500;
      }
    }

    .doc-nav-item--top {
      font-weight: 500;

      .sidebar-collapsed & {
        text-align: center;
        padding: 8px;
      }
    }

    .doc-nav-item--level3 {
      padding: 6px 12px;
      font-size: 0.8125rem;
    }

    // ==========================================================================
    // Main content
    // ==========================================================================
    .doc-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .doc-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: var(--doc-header-height);
      padding: 0 24px;
      background: var(--background-panel, #ffffff);
      border-bottom: 1px solid var(--border-default, #e5e7eb);
    }

    .doc-header__right {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .doc-content {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
    }
  `]
})
export class DocLayout {
  /** État collapsed de la sidebar */
  sidebarCollapsed = signal(false);

  /** Groupes ouverts */
  private expandedGroups = signal<Set<string>>(new Set([
    'documentation',
    'actions',
    'forms',
    'text-inputs',
    'selection',
    'pickers',
    'advanced',
    'data-display',
    'feedback',
    'navigation',
    'overlays',
    'layout',
  ]));

  /** Navigation items */
  navigation: NavItem[] = [
    {
      id: 'home',
      label: 'Accueil',
      icon: '🏠',
      path: '/',
    },
    {
      id: 'documentation',
      label: 'Documentation',
      icon: '📚',
      children: [
        { id: 'doc-getting-started', label: 'Getting Started', path: '/docs/getting-started' },
        { id: 'doc-tokens', label: 'Design Tokens', path: '/docs/tokens' },
        { id: 'doc-theming', label: 'Theming', path: '/docs/theming' },
        { id: 'doc-accessibility', label: 'Accessibility', path: '/docs/accessibility' },
        { id: 'doc-forms-patterns', label: 'Forms Patterns', path: '/docs/forms-patterns' },
        { id: 'doc-navigation-patterns', label: 'Navigation Patterns', path: '/docs/navigation-patterns' },
        { id: 'doc-overlays-patterns', label: 'Overlays Patterns', path: '/docs/overlays-patterns' },
        { id: 'doc-examples', label: 'Examples', path: '/docs/examples' },
        { id: 'doc-contributing', label: 'Contributing', path: '/docs/contributing' },
        { id: 'doc-migration', label: 'Migration', path: '/docs/migration' },
      ],
    },
    {
      id: 'actions',
      label: 'Actions',
      icon: '⚡',
      children: [
        { id: 'ds-button', label: 'Button', path: '/components/actions/ds-button' },
      ],
    },
    {
      id: 'data-display',
      label: 'Data Display',
      icon: '📊',
      children: [
        { id: 'ds-avatar', label: 'Avatar', path: '/components/data-display/ds-avatar' },
        { id: 'ds-badge', label: 'Badge', path: '/components/data-display/ds-badge' },
        { id: 'ds-calendar', label: 'Calendar', path: '/components/data-display/ds-calendar' },
        { id: 'ds-card', label: 'Card', path: '/components/data-display/ds-card' },
        { id: 'ds-carousel', label: 'Carousel', path: '/components/data-display/ds-carousel' },
        { id: 'ds-chip', label: 'Chip', path: '/components/data-display/ds-chip' },
        { id: 'ds-empty', label: 'Empty', path: '/components/data-display/ds-empty' },
        { id: 'ds-list', label: 'List', path: '/components/data-display/ds-list' },
        { id: 'ds-list-group', label: 'List Group', path: '/components/data-display/ds-list-group' },
        { id: 'ds-list-item', label: 'List Item', path: '/components/data-display/ds-list-item' },
        { id: 'ds-rating', label: 'Rating', path: '/components/data-display/ds-rating' },
        { id: 'ds-table', label: 'Table', path: '/components/data-display/ds-table' },
        { id: 'ds-timeline', label: 'Timeline', path: '/components/data-display/ds-timeline' },
        { id: 'ds-tree', label: 'Tree', path: '/components/data-display/ds-tree' },
      ],
    },
    {
      id: 'feedback',
      label: 'Feedback',
      icon: '🔔',
      children: [
        { id: 'ds-alert', label: 'Alert', path: '/components/feedback/ds-alert' },
        { id: 'ds-notification', label: 'Notification', path: '/components/feedback/ds-notification' },
        { id: 'ds-progress-bar', label: 'Progress Bar', path: '/components/feedback/ds-progress-bar' },
        { id: 'ds-skeleton', label: 'Skeleton', path: '/components/feedback/ds-skeleton' },
        { id: 'ds-toast', label: 'Toast', path: '/components/feedback/ds-toast' },
      ],
    },
    {
      id: 'navigation',
      label: 'Navigation',
      icon: '🧭',
      children: [
        { id: 'ds-accordion', label: 'Accordion', path: '/components/navigation/ds-accordion' },
        { id: 'ds-breadcrumb', label: 'Breadcrumb', path: '/components/navigation/ds-breadcrumb' },
        { id: 'ds-menu', label: 'Menu', path: '/components/navigation/ds-menu' },
        { id: 'ds-nav-list', label: 'Nav List', path: '/components/navigation/ds-nav-list' },
        { id: 'ds-pagination', label: 'Pagination', path: '/components/navigation/ds-pagination' },
        { id: 'ds-sidebar', label: 'Sidebar', path: '/components/navigation/ds-sidebar' },
        { id: 'ds-stepper', label: 'Stepper', path: '/components/navigation/ds-stepper' },
        { id: 'ds-tabs', label: 'Tabs', path: '/components/navigation/ds-tabs' },
      ],
    },
    {
      id: 'overlays',
      label: 'Overlays',
      icon: '🪟',
      children: [
        { id: 'ds-drawer', label: 'Drawer', path: '/components/overlays/ds-drawer' },
        { id: 'ds-dropdown', label: 'Dropdown', path: '/components/overlays/ds-dropdown' },
        { id: 'ds-modal', label: 'Modal', path: '/components/overlays/ds-modal' },
        { id: 'ds-popover', label: 'Popover', path: '/components/overlays/ds-popover' },
        { id: 'ds-tooltip', label: 'Tooltip', path: '/components/overlays/ds-tooltip' },
      ],
    },
    {
      id: 'layout',
      label: 'Layout',
      icon: '📐',
      children: [
        { id: 'ds-container', label: 'Container', path: '/components/layout/ds-container' },
        { id: 'ds-divider', label: 'Divider', path: '/components/layout/ds-divider' },
      ],
    },
    {
      id: 'forms',
      label: 'Forms',
      icon: '📝',
      children: [
        {
          id: 'text-inputs',
          label: 'Text Inputs',
          children: [
            { id: 'ds-input-field', label: 'Input Field', path: '/components/forms/text-inputs/ds-input-field' },
            { id: 'ds-input-number', label: 'Input Number', path: '/components/forms/text-inputs/ds-input-number' },
            { id: 'ds-input-textarea', label: 'Input Textarea', path: '/components/forms/text-inputs/ds-input-textarea' },
            { id: 'ds-search-input', label: 'Search Input', path: '/components/forms/text-inputs/ds-search-input' },
            { id: 'ds-password-strength', label: 'Password Strength', path: '/components/forms/text-inputs/ds-password-strength' },
          ],
        },
        {
          id: 'selection',
          label: 'Selection',
          children: [
            { id: 'ds-checkbox', label: 'Checkbox', path: '/components/forms/selection/ds-checkbox' },
            { id: 'ds-checkbox-list', label: 'Checkbox List', path: '/components/forms/selection/ds-checkbox-list' },
            { id: 'ds-radio-group', label: 'Radio Group', path: '/components/forms/selection/ds-radio-group' },
            { id: 'ds-toggle', label: 'Toggle', path: '/components/forms/selection/ds-toggle' },
            { id: 'ds-segmented-control', label: 'Segmented Control', path: '/components/forms/selection/ds-segmented-control' },
          ],
        },
        {
          id: 'pickers',
          label: 'Pickers',
          children: [
            { id: 'ds-select', label: 'Select', path: '/components/forms/pickers/ds-select' },
            { id: 'ds-combobox', label: 'Combobox', path: '/components/forms/pickers/ds-combobox' },
            { id: 'ds-date-picker', label: 'Date Picker', path: '/components/forms/pickers/ds-date-picker' },
            { id: 'ds-time-picker', label: 'Time Picker', path: '/components/forms/pickers/ds-time-picker' },
            { id: 'ds-color-picker', label: 'Color Picker', path: '/components/forms/pickers/ds-color-picker' },
          ],
        },
        {
          id: 'advanced',
          label: 'Advanced',
          children: [
            { id: 'ds-file-upload', label: 'File Upload', path: '/components/forms/advanced/ds-file-upload' },
            { id: 'ds-slider', label: 'Slider', path: '/components/forms/advanced/ds-slider' },
            { id: 'ds-transfer', label: 'Transfer', path: '/components/forms/advanced/ds-transfer' },
          ],
        },
      ],
    },
  ];

  toggleSidebar(): void {
    this.sidebarCollapsed.update(v => !v);
  }

  isExpanded(groupId: string): boolean {
    return this.expandedGroups().has(groupId);
  }

  toggleGroup(groupId: string): void {
    this.expandedGroups.update(groups => {
      const newGroups = new Set(groups);
      if (newGroups.has(groupId)) {
        newGroups.delete(groupId);
      } else {
        newGroups.add(groupId);
      }
      return newGroups;
    });
  }
}
