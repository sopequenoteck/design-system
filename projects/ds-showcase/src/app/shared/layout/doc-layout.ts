import { Component, signal, computed, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeSwitcher } from '../theme/theme-switcher';
import { GlobalSearch } from '../search/global-search';
import { DynamicBreadcrumb } from '../breadcrumb/dynamic-breadcrumb';
import { DocIcon, DocIconName } from '../icon/doc-icon';
import { NavItem } from '../../registry/types';

@Component({
  selector: 'doc-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ThemeSwitcher, GlobalSearch, DynamicBreadcrumb, DocIcon],
  template: `
    <div class="doc-layout" [class.sidebar-collapsed]="sidebarCollapsed()" [class.mobile-open]="mobileMenuOpen()">
      <!-- Mobile overlay -->
      @if (mobileMenuOpen()) {
        <div class="doc-overlay" (click)="closeMobileMenu()"></div>
      }

      <!-- Sidebar -->
      <aside class="doc-sidebar">
        <div class="doc-sidebar__header">
          <a routerLink="/" class="doc-sidebar__logo" (click)="closeMobileMenu()">
            <div class="doc-sidebar__logo-icon">
              <doc-icon name="components" size="sm" />
            </div>
            @if (!sidebarCollapsed()) {
              <span class="doc-sidebar__logo-text">DS Showcase</span>
            }
          </a>
          <button
            type="button"
            class="doc-sidebar__toggle"
            [attr.aria-expanded]="!sidebarCollapsed()"
            aria-label="Toggle sidebar"
            (click)="toggleSidebar()"
          >
            <doc-icon [name]="sidebarCollapsed() ? 'chevron-right' : 'chevron-left'" size="sm" />
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
                [routerLinkActiveOptions]="{ exact: item.path === '/' }"
                (click)="closeMobileMenu()"
              >
                <doc-icon [name]="item.icon!" size="sm" />
                @if (!sidebarCollapsed()) {
                  <span class="doc-nav-item__label">{{ item.label }}</span>
                }
              </a>
            } @else {
              <!-- Niveau 1 : Groupe avec children -->
              <div class="doc-nav-group" [class.expanded]="isExpanded(item.id)">
                <button
                  type="button"
                  class="doc-nav-group__header"
                  [attr.aria-expanded]="isExpanded(item.id)"
                  (click)="toggleGroup(item.id)"
                >
                  <div class="doc-nav-group__left">
                    <doc-icon [name]="item.icon!" size="sm" />
                    @if (!sidebarCollapsed()) {
                      <span>{{ item.label }}</span>
                    }
                  </div>
                  @if (!sidebarCollapsed()) {
                    <doc-icon
                      class="doc-nav-group__arrow"
                      [name]="isExpanded(item.id) ? 'chevron-down' : 'chevron-right'"
                      size="xs"
                    />
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
                          (click)="closeMobileMenu()"
                        >
                          <span class="doc-nav-item__dot"></span>
                          <span class="doc-nav-item__label">{{ child.label }}</span>
                        </a>
                      } @else {
                        <!-- Niveau 2 : Sous-groupe avec children (niveau 3) -->
                        <div class="doc-nav-subgroup" [class.expanded]="isExpanded(child.id)">
                          <button
                            type="button"
                            class="doc-nav-subgroup__header"
                            [attr.aria-expanded]="isExpanded(child.id)"
                            (click)="toggleGroup(child.id)"
                          >
                            <span>{{ child.label }}</span>
                            <doc-icon
                              class="doc-nav-subgroup__arrow"
                              [name]="isExpanded(child.id) ? 'chevron-down' : 'chevron-right'"
                              size="xs"
                            />
                          </button>

                          @if (isExpanded(child.id)) {
                            <div class="doc-nav-subgroup__items">
                              @for (subChild of child.children; track subChild.id) {
                                <a
                                  class="doc-nav-item doc-nav-item--level3"
                                  [routerLink]="subChild.path"
                                  routerLinkActive="active"
                                  (click)="closeMobileMenu()"
                                >
                                  <span class="doc-nav-item__dot"></span>
                                  <span class="doc-nav-item__label">{{ subChild.label }}</span>
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

        <!-- Sidebar footer -->
        <div class="doc-sidebar__footer">
          @if (!sidebarCollapsed()) {
            <a href="https://github.com/kksdev/ds-angular" target="_blank" class="doc-sidebar__link">
              <doc-icon name="github" size="sm" />
              <span>GitHub</span>
            </a>
            <a href="https://npmjs.com/package/@kksdev/ds-angular" target="_blank" class="doc-sidebar__link">
              <doc-icon name="npm" size="sm" />
              <span>npm</span>
            </a>
          } @else {
            <a href="https://github.com/kksdev/ds-angular" target="_blank" class="doc-sidebar__link doc-sidebar__link--icon-only" title="GitHub">
              <doc-icon name="github" size="sm" />
            </a>
          }
        </div>
      </aside>

      <!-- Main content -->
      <main class="doc-main">
        <header class="doc-header">
          <div class="doc-header__left">
            <!-- Mobile menu button -->
            <button
              type="button"
              class="doc-header__menu-btn"
              aria-label="Ouvrir le menu"
              (click)="toggleMobileMenu()"
            >
              <doc-icon name="menu" size="md" />
            </button>
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
    // ==========================================================================
    // Layout principal
    // ==========================================================================
    .doc-layout {
      display: flex;
      min-height: 100vh;
      background: var(--doc-surface-page, #f8fafc);
    }

    .doc-overlay {
      display: none;
    }

    // ==========================================================================
    // Sidebar
    // ==========================================================================
    .doc-sidebar {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      width: var(--doc-sidebar-width);
      background: var(--doc-surface-elevated, #ffffff);
      border-right: 1px solid var(--doc-border-default, #e2e8f0);
      display: flex;
      flex-direction: column;
      transition: width var(--doc-transition-slow, 300ms),
                  transform var(--doc-transition-slow, 300ms);
      overflow: hidden;
      z-index: var(--doc-z-sticky, 200);

      .sidebar-collapsed & {
        width: var(--doc-sidebar-collapsed-width);
      }
    }

    .doc-sidebar__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--doc-space-md, 16px);
      border-bottom: 1px solid var(--doc-border-default, #e2e8f0);
      min-height: var(--doc-header-height, 60px);
      gap: var(--doc-space-sm, 8px);
    }

    .doc-sidebar__logo {
      display: flex;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
      text-decoration: none;
      color: var(--doc-text-primary, #0f172a);
      font-weight: 600;
      font-size: 1rem;
      white-space: nowrap;
      overflow: hidden;

      &:hover .doc-sidebar__logo-icon {
        transform: scale(1.05);
      }
    }

    .doc-sidebar__logo-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, var(--doc-accent-primary, #6366f1), var(--doc-accent-info, #3b82f6));
      border-radius: var(--doc-radius-md, 10px);
      color: white;
      flex-shrink: 0;
      transition: transform var(--doc-transition-fast, 150ms);
    }

    .doc-sidebar__logo-text {
      animation: doc-fade-in 200ms ease-out;
    }

    .doc-sidebar__toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      padding: 0;
      border: none;
      border-radius: var(--doc-radius-sm, 6px);
      background: var(--doc-surface-sunken, #f1f5f9);
      color: var(--doc-text-secondary, #475569);
      cursor: pointer;
      transition: all var(--doc-transition-fast, 150ms);
      flex-shrink: 0;

      &:hover {
        background: var(--doc-border-default, #e2e8f0);
        color: var(--doc-text-primary, #0f172a);
      }

      &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 2px var(--doc-accent-primary-light, #eef2ff),
                    0 0 0 4px var(--doc-accent-primary, #6366f1);
      }

      .sidebar-collapsed & {
        margin: 0 auto;
      }
    }

    .doc-sidebar__nav {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: var(--doc-space-sm, 8px);

      // Custom scrollbar
      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background: var(--doc-border-default, #e2e8f0);
        border-radius: 2px;
      }
    }

    .doc-sidebar__footer {
      padding: var(--doc-space-md, 16px);
      border-top: 1px solid var(--doc-border-default, #e2e8f0);
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-xs, 4px);

      .sidebar-collapsed & {
        align-items: center;
      }
    }

    .doc-sidebar__link {
      display: flex;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
      padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
      border-radius: var(--doc-radius-sm, 6px);
      color: var(--doc-text-secondary, #475569);
      text-decoration: none;
      font-size: 0.875rem;
      transition: all var(--doc-transition-fast, 150ms);

      &:hover {
        background: var(--doc-surface-sunken, #f1f5f9);
        color: var(--doc-text-primary, #0f172a);
      }

      &--icon-only {
        padding: var(--doc-space-sm, 8px);
        justify-content: center;
      }
    }

    // ==========================================================================
    // Navigation items - Niveau 1
    // ==========================================================================
    .doc-nav-group {
      margin-bottom: var(--doc-space-xs, 4px);
    }

    .doc-nav-group__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
      border: none;
      border-radius: var(--doc-radius-sm, 6px);
      background: transparent;
      color: var(--doc-text-secondary, #475569);
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      cursor: pointer;
      text-align: left;
      transition: all var(--doc-transition-fast, 150ms);

      &:hover {
        background: var(--doc-surface-sunken, #f1f5f9);
        color: var(--doc-text-primary, #0f172a);
      }

      .sidebar-collapsed & {
        justify-content: center;
        padding: var(--doc-space-sm, 8px);
      }

      .doc-nav-group.expanded & {
        color: var(--doc-accent-primary, #6366f1);
      }
    }

    .doc-nav-group__left {
      display: flex;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
    }

    .doc-nav-group__arrow {
      color: var(--doc-text-tertiary, #94a3b8);
      transition: transform var(--doc-transition-fast, 150ms);

      .doc-nav-group.expanded & {
        color: var(--doc-accent-primary, #6366f1);
      }
    }

    .doc-nav-group__items {
      padding-left: var(--doc-space-lg, 24px);
      margin-top: var(--doc-space-xs, 4px);
      animation: doc-fade-in-down 200ms ease-out;
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
      padding: var(--doc-space-xs, 4px) var(--doc-space-sm, 8px);
      border: none;
      border-radius: var(--doc-radius-sm, 6px);
      background: transparent;
      color: var(--doc-text-secondary, #475569);
      font-size: 0.8125rem;
      font-weight: 500;
      cursor: pointer;
      text-align: left;
      transition: all var(--doc-transition-fast, 150ms);

      &:hover {
        background: var(--doc-surface-sunken, #f1f5f9);
        color: var(--doc-text-primary, #0f172a);
      }

      .doc-nav-subgroup.expanded & {
        color: var(--doc-accent-primary, #6366f1);
      }
    }

    .doc-nav-subgroup__arrow {
      color: var(--doc-text-tertiary, #94a3b8);
      transition: transform var(--doc-transition-fast, 150ms);

      .doc-nav-subgroup.expanded & {
        color: var(--doc-accent-primary, #6366f1);
      }
    }

    .doc-nav-subgroup__items {
      padding-left: var(--doc-space-md, 16px);
      margin-top: 2px;
      animation: doc-fade-in-down 150ms ease-out;
    }

    // ==========================================================================
    // Navigation items - Items
    // ==========================================================================
    .doc-nav-item {
      display: flex;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
      padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
      border-radius: var(--doc-radius-sm, 6px);
      color: var(--doc-text-secondary, #475569);
      text-decoration: none;
      font-size: 0.875rem;
      transition: all var(--doc-transition-fast, 150ms);
      position: relative;

      &:hover {
        background: var(--doc-surface-sunken, #f1f5f9);
        color: var(--doc-text-primary, #0f172a);
      }

      &.active {
        background: var(--doc-accent-primary-light, #eef2ff);
        color: var(--doc-accent-primary, #6366f1);
        font-weight: 500;

        .doc-nav-item__dot {
          background: var(--doc-accent-primary, #6366f1);
          transform: scale(1.2);
        }
      }
    }

    .doc-nav-item__dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--doc-border-strong, #cbd5e1);
      flex-shrink: 0;
      transition: all var(--doc-transition-fast, 150ms);
    }

    .doc-nav-item__label {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .doc-nav-item--top {
      font-weight: 500;

      .sidebar-collapsed & {
        justify-content: center;
        padding: var(--doc-space-sm, 8px);
      }
    }

    .doc-nav-item--level3 {
      padding: var(--doc-space-xs, 4px) var(--doc-space-sm, 8px);
      font-size: 0.8125rem;
    }

    // ==========================================================================
    // Main content
    // ==========================================================================
    .doc-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: var(--doc-sidebar-width);
      transition: margin-left var(--doc-transition-slow, 300ms);
      min-width: 0;

      .sidebar-collapsed & {
        margin-left: var(--doc-sidebar-collapsed-width);
      }
    }

    .doc-header {
      position: sticky;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: var(--doc-header-height, 60px);
      padding: 0 var(--doc-space-lg, 24px);
      background: var(--doc-surface-elevated, #ffffff);
      border-bottom: 1px solid var(--doc-border-default, #e2e8f0);
      z-index: var(--doc-z-sticky, 200);
      gap: var(--doc-space-md, 16px);
    }

    .doc-header__left {
      display: flex;
      align-items: center;
      gap: var(--doc-space-md, 16px);
      min-width: 0;
      flex: 1;
    }

    .doc-header__menu-btn {
      display: none;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      padding: 0;
      border: none;
      border-radius: var(--doc-radius-sm, 6px);
      background: transparent;
      color: var(--doc-text-secondary, #475569);
      cursor: pointer;
      transition: all var(--doc-transition-fast, 150ms);

      &:hover {
        background: var(--doc-surface-sunken, #f1f5f9);
        color: var(--doc-text-primary, #0f172a);
      }
    }

    .doc-header__right {
      display: flex;
      align-items: center;
      gap: var(--doc-space-md, 16px);
      flex-shrink: 0;
    }

    .doc-content {
      flex: 1;
      padding: var(--doc-space-lg, 24px);
      overflow-y: auto;
      animation: doc-fade-in 300ms ease-out;
    }

    // ==========================================================================
    // Responsive - Mobile
    // ==========================================================================
    @media (max-width: 768px) {
      .doc-overlay {
        display: block;
        position: fixed;
        inset: 0;
        background: var(--doc-surface-overlay, rgba(0, 0, 0, 0.5));
        z-index: calc(var(--doc-z-sticky) - 1);
        animation: doc-fade-in 200ms ease-out;
      }

      .doc-sidebar {
        transform: translateX(-100%);
        box-shadow: var(--doc-shadow-xl);

        .mobile-open & {
          transform: translateX(0);
        }
      }

      .doc-main {
        margin-left: 0;

        .sidebar-collapsed & {
          margin-left: 0;
        }
      }

      .doc-header__menu-btn {
        display: flex;
      }

      .doc-sidebar__toggle {
        display: none;
      }

      .doc-content {
        padding: var(--doc-space-md, 16px);
      }
    }
  `]
})
export class DocLayout {
  /** État collapsed de la sidebar */
  sidebarCollapsed = signal(false);

  /** Menu mobile ouvert */
  mobileMenuOpen = signal(false);

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

  /** Ferme le menu mobile sur Escape */
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.mobileMenuOpen()) {
      this.closeMobileMenu();
    }
  }

  /** Navigation items */
  navigation: (NavItem & { icon?: DocIconName })[] = [
    {
      id: 'home',
      label: 'Accueil',
      icon: 'home',
      path: '/',
    },
    {
      id: 'documentation',
      label: 'Documentation',
      icon: 'book',
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
      icon: 'zap',
      children: [
        { id: 'ds-button', label: 'Button', path: '/components/actions/ds-button' },
      ],
    },
    {
      id: 'data-display',
      label: 'Data Display',
      icon: 'data',
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
      icon: 'feedback',
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
      icon: 'navigation',
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
      icon: 'overlays',
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
      icon: 'layout',
      children: [
        { id: 'ds-container', label: 'Container', path: '/components/layout/ds-container' },
        { id: 'ds-divider', label: 'Divider', path: '/components/layout/ds-divider' },
      ],
    },
    {
      id: 'forms',
      label: 'Forms',
      icon: 'forms',
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

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
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
