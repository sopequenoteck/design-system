import { Injectable, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { NavItem } from '../registry/types';

/** Item du breadcrumb */
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private router = inject(Router);

  /** Breadcrumb actuel */
  readonly breadcrumb = signal<BreadcrumbItem[]>([]);

  /** Structure de navigation (même que doc-layout) */
  private readonly navigation: NavItem[] = [
    {
      id: 'documentation',
      label: 'Documentation',
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
      children: [
        { id: 'ds-button', label: 'Button', path: '/components/actions/ds-button' },
      ],
    },
    {
      id: 'data-display',
      label: 'Data Display',
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
      children: [
        { id: 'ds-container', label: 'Container', path: '/components/layout/ds-container' },
        { id: 'ds-divider', label: 'Divider', path: '/components/layout/ds-divider' },
      ],
    },
    {
      id: 'forms',
      label: 'Forms',
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

  constructor() {
    // Écouter les changements de route
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateBreadcrumb(event.urlAfterRedirects);
      });

    // Initialiser avec la route actuelle
    this.updateBreadcrumb(this.router.url);
  }

  /**
   * Met à jour le breadcrumb en fonction de l'URL
   */
  private updateBreadcrumb(url: string): void {
    const items: BreadcrumbItem[] = [{ label: 'Accueil', href: '/' }];

    // Page d'accueil
    if (url === '/') {
      this.breadcrumb.set([]);
      return;
    }

    // Recherche dans la navigation
    const found = this.findInNavigation(url, this.navigation, []);

    if (found) {
      // Ajouter les parents
      for (const parent of found.parents) {
        items.push({ label: parent.label, href: parent.path });
      }
      // Ajouter l'item courant (sans href car c'est la page actuelle)
      items.push({ label: found.item.label });
    }

    this.breadcrumb.set(items);
  }

  /**
   * Recherche récursive dans la navigation
   */
  private findInNavigation(
    url: string,
    items: NavItem[],
    parents: NavItem[]
  ): { item: NavItem; parents: NavItem[] } | null {
    for (const item of items) {
      if (item.path === url) {
        return { item, parents };
      }

      if (item.children) {
        const found = this.findInNavigation(url, item.children, [
          ...parents,
          item,
        ]);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }
}
