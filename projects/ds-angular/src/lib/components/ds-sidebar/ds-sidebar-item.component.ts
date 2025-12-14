import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  inject,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChevronRight,
  faChevronDown,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';
import { DsTooltip } from '../ds-tooltip/ds-tooltip.directive';
import {
  SidebarItem,
  SidebarMode,
  SidebarItemClickEvent,
} from './ds-sidebar.types';

/**
 * Composant récursif pour afficher un item de sidebar.
 * Gère l'affichage, l'expansion des enfants et la navigation.
 *
 * @internal Utilisé par DsSidebar
 */
@Component({
  selector: 'ds-sidebar-item',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, DsTooltip],
  template: `
    <!-- Item container -->
    <div
      class="ds-sidebar-item"
      [class.ds-sidebar-item--active]="isActive()"
      [class.ds-sidebar-item--disabled]="item().disabled"
      [class.ds-sidebar-item--has-children]="hasChildren()"
      [class.ds-sidebar-item--expanded]="isExpanded()"
      [class.ds-sidebar-item--collapsed-mode]="mode() === 'collapsed'"
      [style.padding-left.px]="indentPadding()"
      [attr.tabindex]="item().disabled ? -1 : 0"
      [attr.role]="'treeitem'"
      [attr.aria-expanded]="hasChildren() ? isExpanded() : null"
      [attr.aria-selected]="isActive()"
      [attr.aria-disabled]="item().disabled"
      [attr.data-item-id]="item().id"
      (click)="handleClick($event)"
      (keydown)="handleKeydown($event)"
      #itemElement>

      <!-- Toggle chevron (si enfants) -->
      @if (hasChildren()) {
        <button
          type="button"
          class="ds-sidebar-item__toggle"
          [attr.aria-label]="isExpanded() ? 'Réduire' : 'Développer'"
          (click)="handleToggleClick($event)">
          <fa-icon [icon]="isExpanded() ? chevronDownIcon : chevronRightIcon" />
        </button>
      } @else {
        <span class="ds-sidebar-item__toggle-placeholder"></span>
      }

      <!-- Icône -->
      @if (item().icon) {
        <fa-icon [icon]="item().icon!" class="ds-sidebar-item__icon" />
      }

      <!-- Label avec routerLink -->
      @if (item().routerLink && mode() !== 'collapsed') {
        <a
          [routerLink]="item().routerLink"
          routerLinkActive="ds-sidebar-item__label--router-active"
          [routerLinkActiveOptions]="item().routerLinkActiveOptions || { exact: false }"
          class="ds-sidebar-item__label"
          (click)="handleLinkClick($event)">
          {{ item().label }}
        </a>
      } @else if (item().href && mode() !== 'collapsed') {
        <!-- Label avec href externe -->
        <a
          [href]="item().href"
          [target]="item().external ? '_blank' : '_self'"
          [rel]="item().external ? 'noopener noreferrer' : null"
          class="ds-sidebar-item__label"
          (click)="handleLinkClick($event)">
          {{ item().label }}
          @if (item().external) {
            <fa-icon [icon]="externalLinkIcon" class="ds-sidebar-item__external-icon" />
          }
        </a>
      } @else if (mode() !== 'collapsed') {
        <!-- Label simple -->
        <span class="ds-sidebar-item__label">
          {{ item().label }}
        </span>
      }

      <!-- Badge -->
      @if (item().badge !== undefined && item().badge !== null && mode() !== 'collapsed') {
        <span
          class="ds-sidebar-item__badge"
          [class]="'ds-sidebar-item__badge--' + (item().badgeVariant || 'default')">
          {{ item().badge }}
        </span>
      }

      <!-- Tooltip en mode collapsed -->
      @if (mode() === 'collapsed') {
        <span
          class="ds-sidebar-item__tooltip-trigger"
          [dsTooltip]="item().label"
          tooltipPosition="right">
        </span>
      }
    </div>

    <!-- Divider -->
    @if (item().dividerAfter) {
      <div class="ds-sidebar-item__divider" role="separator"></div>
    }

    <!-- Enfants (récursif) -->
    @if (hasChildren() && isExpanded() && mode() !== 'collapsed') {
      <div
        class="ds-sidebar-item__children"
        role="group"
        [attr.aria-label]="'Sous-menu de ' + item().label">
        @for (child of item().children; track child.id) {
          <ds-sidebar-item
            [item]="child"
            [level]="level() + 1"
            [mode]="mode()"
            [expandedItemIds]="expandedItemIds()"
            [activeItemId]="activeItemId()"
            (itemClick)="itemClick.emit($event)"
            (itemToggle)="itemToggle.emit($event)"
            (itemKeydown)="itemKeydown.emit($event)" />
        }
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
    }

    .ds-sidebar-item {
      display: flex;
      align-items: center;
      gap: var(--space-2, 0.5rem);
      min-height: var(--sidebar-item-height, 44px);
      padding: var(--sidebar-item-padding, 0.5rem 1rem);
      border-radius: var(--sidebar-item-radius, 6px);
      cursor: pointer;
      color: var(--sidebar-text, inherit);
      text-decoration: none;
      transition: background-color 0.15s ease, color 0.15s ease;
      outline: none;
      user-select: none;
    }

    .ds-sidebar-item:hover:not(.ds-sidebar-item--disabled) {
      background: var(--sidebar-item-hover-bg, rgba(0, 0, 0, 0.05));
    }

    .ds-sidebar-item:focus-visible {
      outline: 2px solid var(--color-primary, #3b82f6);
      outline-offset: -2px;
    }

    .ds-sidebar-item--active {
      background: var(--sidebar-item-active-bg, rgba(59, 130, 246, 0.1));
      color: var(--sidebar-item-active-text, #3b82f6);
    }

    .ds-sidebar-item--active .ds-sidebar-item__icon {
      color: var(--sidebar-item-active-text, #3b82f6);
    }

    .ds-sidebar-item--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    .ds-sidebar-item--collapsed-mode {
      justify-content: center;
      padding: var(--space-2, 0.5rem);
    }

    .ds-sidebar-item__toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      padding: 0;
      border: none;
      background: transparent;
      color: inherit;
      cursor: pointer;
      flex-shrink: 0;
      transition: transform 0.2s ease;
    }

    .ds-sidebar-item__toggle:hover {
      color: var(--color-primary, #3b82f6);
    }

    .ds-sidebar-item__toggle-placeholder {
      width: 20px;
      flex-shrink: 0;
    }

    .ds-sidebar-item__icon {
      flex-shrink: 0;
      font-size: var(--icon-size-md, 1rem);
      color: var(--sidebar-icon-color, currentColor);
      opacity: 0.8;
    }

    .ds-sidebar-item__label {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-decoration: none;
      color: inherit;
      font-size: var(--font-size-sm, 0.875rem);
      line-height: 1.4;
    }

    .ds-sidebar-item__label--router-active {
      font-weight: 600;
    }

    .ds-sidebar-item__external-icon {
      margin-left: var(--space-1, 0.25rem);
      font-size: 0.75em;
      opacity: 0.6;
    }

    .ds-sidebar-item__badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: var(--sidebar-badge-size, 20px);
      height: var(--sidebar-badge-size, 20px);
      padding: 0 var(--space-1-5, 0.375rem);
      border-radius: var(--radius-round, 9999px);
      font-size: var(--font-size-xs, 0.75rem);
      font-weight: 600;
      flex-shrink: 0;
    }

    .ds-sidebar-item__badge--default {
      background: var(--gray-200, #e5e7eb);
      color: var(--gray-800, #1f2937);
    }

    .ds-sidebar-item__badge--primary {
      background: var(--color-primary, #3b82f6);
      color: white;
    }

    .ds-sidebar-item__badge--success {
      background: var(--success, #10b981);
      color: white;
    }

    .ds-sidebar-item__badge--warning {
      background: var(--warning, #f59e0b);
      color: white;
    }

    .ds-sidebar-item__badge--error {
      background: var(--error, #ef4444);
      color: white;
    }

    .ds-sidebar-item__badge--info {
      background: var(--info, #06b6d4);
      color: white;
    }

    .ds-sidebar-item__tooltip-trigger {
      position: absolute;
      inset: 0;
      cursor: pointer;
    }

    .ds-sidebar-item__divider {
      height: 1px;
      margin: var(--space-2, 0.5rem) var(--space-4, 1rem);
      background: var(--sidebar-border, rgba(0, 0, 0, 0.1));
    }

    .ds-sidebar-item__children {
      /* L'indentation est gérée par padding-left sur chaque item enfant */
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsSidebarItemComponent {
  // Inputs
  readonly item = input.required<SidebarItem>();
  readonly level = input<number>(0);
  readonly mode = input<SidebarMode>('full');
  readonly expandedItemIds = input<Set<string | number>>(new Set());
  readonly activeItemId = input<string | number | null>(null);

  // Outputs
  readonly itemClick = output<SidebarItemClickEvent>();
  readonly itemToggle = output<SidebarItem>();
  readonly itemKeydown = output<KeyboardEvent>();

  // Icônes
  readonly chevronRightIcon = faChevronRight;
  readonly chevronDownIcon = faChevronDown;
  readonly externalLinkIcon = faExternalLinkAlt;

  // Injection
  private readonly elementRef = inject(ElementRef);

  // Computed
  readonly hasChildren = computed(() => {
    const children = this.item().children;
    return children !== undefined && children !== null && children.length > 0;
  });

  readonly isExpanded = computed(() => {
    return this.expandedItemIds().has(this.item().id);
  });

  readonly isActive = computed(() => {
    return this.activeItemId() === this.item().id;
  });

  readonly indentPadding = computed(() => {
    const baseIndent = 16; // padding de base
    const levelIndent = 20; // indent par niveau
    return baseIndent + this.level() * levelIndent;
  });

  /**
   * Gère le clic sur l'item.
   */
  handleClick(event: MouseEvent): void {
    if (this.item().disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Si l'item a des enfants et pas de lien, toggle expand
    if (this.hasChildren() && !this.item().routerLink && !this.item().href) {
      this.itemToggle.emit(this.item());
    }

    this.itemClick.emit({ item: this.item(), event });
  }

  /**
   * Gère le clic sur le bouton toggle (chevron).
   */
  handleToggleClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (!this.item().disabled) {
      this.itemToggle.emit(this.item());
    }
  }

  /**
   * Gère le clic sur un lien (routerLink ou href).
   */
  handleLinkClick(event: MouseEvent): void {
    // Ne pas stopper la propagation pour permettre le tracking du clic
    if (this.item().disabled) {
      event.preventDefault();
    }
  }

  /**
   * Gère les événements clavier.
   */
  handleKeydown(event: KeyboardEvent): void {
    // Propager l'événement au parent pour la navigation globale
    this.itemKeydown.emit(event);
  }

  /**
   * Donne le focus à cet élément.
   */
  focus(): void {
    const element = this.elementRef.nativeElement.querySelector('.ds-sidebar-item');
    if (element) {
      element.focus();
    }
  }
}
