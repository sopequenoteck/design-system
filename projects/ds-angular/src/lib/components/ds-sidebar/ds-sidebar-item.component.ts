import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  inject,
  ElementRef,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChevronRight,
  faChevronDown,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedPosition,
} from '@angular/cdk/overlay';
import { DsTooltip } from '../ds-tooltip/ds-tooltip.directive';
import {
  SidebarItem,
  SidebarMode,
  SidebarPosition,
  SidebarCollapsedTrigger,
  SidebarItemClickEvent,
} from './ds-sidebar.types';
import {
  SIDEBAR_POPOVER_POSITIONS_RIGHT,
  SIDEBAR_POPOVER_POSITIONS_LEFT,
} from '../../utils/overlay-positions';

/**
 * Composant récursif pour afficher un item de sidebar.
 * Gère l'affichage, l'expansion des enfants et la navigation.
 *
 * @internal Utilisé par DsSidebar
 */
@Component({
  selector: 'ds-sidebar-item',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, DsTooltip, CdkConnectedOverlay, CdkOverlayOrigin],
  template: `
    <!-- Item container -->
    <div
      #itemTrigger="cdkOverlayOrigin"
      cdkOverlayOrigin
      class="ds-sidebar-item"
      [class.ds-sidebar-item--active]="isActive()"
      [class.ds-sidebar-item--disabled]="item().disabled"
      [class.ds-sidebar-item--has-children]="hasChildren()"
      [class.ds-sidebar-item--expanded]="isExpanded()"
      [class.ds-sidebar-item--collapsed-mode]="mode() === 'collapsed'"
      [class.ds-sidebar-item--popover-open]="isPopoverOpen()"
      [style.padding-left.px]="mode() === 'collapsed' ? null : indentPadding()"
      [attr.tabindex]="item().disabled ? -1 : 0"
      role="menuitem"
      [attr.aria-haspopup]="hasChildren() && mode() === 'collapsed' ? 'menu' : null"
      [attr.aria-expanded]="hasChildren() ? (mode() === 'collapsed' ? isPopoverOpen() : isExpanded()) : null"
      [attr.aria-selected]="isActive()"
      [attr.aria-disabled]="item().disabled"
      [attr.data-item-id]="item().id"
      (click)="handleClick($event)"
      (keydown)="handleKeydown($event)"
      (mouseenter)="handleMouseEnter()"
      (mouseleave)="handleMouseLeave()"
      [dsTooltip]="mode() === 'collapsed' && showTooltip() && !isPopoverOpen() && !hasChildren() ? item().label : ''"
      tooltipPosition="right"
      #itemElement>

      <!-- Toggle chevron (si enfants) - masqué en mode collapsed -->
      @if (hasChildren() && mode() !== 'collapsed') {
        <button
          type="button"
          class="ds-sidebar-item__toggle"
          [attr.aria-label]="isExpanded() ? 'Réduire' : 'Développer'"
          (click)="handleToggleClick($event)">
          <fa-icon [icon]="isExpanded() ? chevronDownIcon : chevronRightIcon" />
        </button>
      } @else if (mode() !== 'collapsed') {
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
    </div>

    <!-- Divider -->
    @if (item().dividerAfter) {
      <div class="ds-sidebar-item__divider" role="separator"></div>
    }

    <!-- Popover pour enfants en mode collapsed -->
    @if (hasChildren() && mode() === 'collapsed') {
      <ng-template
        cdkConnectedOverlay
        [cdkConnectedOverlayOrigin]="itemTrigger"
        [cdkConnectedOverlayOpen]="isPopoverOpen()"
        [cdkConnectedOverlayPositions]="popoverPositions()"
        [cdkConnectedOverlayHasBackdrop]="true"
        [cdkConnectedOverlayBackdropClass]="'ds-sidebar-popover-backdrop'"
        [cdkConnectedOverlayPanelClass]="'ds-sidebar-popover-panel'"
        (backdropClick)="closePopover()"
        (detach)="closePopover()">

        <div
          class="ds-sidebar-popover"
          role="menu"
          [attr.aria-label]="'Sous-menu de ' + item().label"
          (keydown)="handlePopoverKeydown($event)"
          (mouseenter)="handlePopoverMouseEnter()"
          (mouseleave)="handlePopoverMouseLeave()">

          <!-- Header du popover avec le label parent -->
          <div class="ds-sidebar-popover__header">
            @if (item().icon) {
              <fa-icon [icon]="item().icon!" class="ds-sidebar-popover__header-icon" />
            }
            <span class="ds-sidebar-popover__header-label">{{ item().label }}</span>
          </div>

          <!-- Liste des enfants -->
          <div class="ds-sidebar-popover__body">
            @for (child of item().children; track child.id; let i = $index) {
              <div
                class="ds-sidebar-popover__item"
                [class.ds-sidebar-popover__item--active]="getActiveChildIndex() === i"
                [class.ds-sidebar-popover__item--disabled]="child.disabled"
                [attr.tabindex]="child.disabled ? -1 : 0"
                role="menuitem"
                [attr.aria-disabled]="child.disabled"
                (click)="handleChildClick(child, $event)"
                (mouseenter)="setActiveChildIndex(i)">

                @if (child.icon) {
                  <fa-icon [icon]="child.icon" class="ds-sidebar-popover__item-icon" />
                }

                <span class="ds-sidebar-popover__item-label">{{ child.label }}</span>

                @if (child.badge !== undefined && child.badge !== null) {
                  <span
                    class="ds-sidebar-popover__item-badge"
                    [class]="'ds-sidebar-popover__item-badge--' + (child.badgeVariant || 'default')">
                    {{ child.badge }}
                  </span>
                }

                @if (child.children && child.children.length > 0) {
                  <fa-icon [icon]="chevronRightIcon" class="ds-sidebar-popover__item-chevron" />
                }
              </div>

              @if (child.dividerAfter) {
                <div class="ds-sidebar-popover__divider" role="separator"></div>
              }
            }
          </div>
        </div>
      </ng-template>
    }

    <!-- Enfants (récursif) -->
    @if (hasChildren() && isExpanded() && mode() !== 'collapsed') {
      <div
        class="ds-sidebar-item__children"
        role="menu"
        [attr.aria-label]="'Sous-menu de ' + item().label">
        @for (child of item().children; track child.id) {
          <ds-sidebar-item
            [item]="child"
            [level]="level() + 1"
            [mode]="mode()"
            [showTooltip]="showTooltip()"
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
      gap: 0;
    }

    .ds-sidebar-item--collapsed-mode .ds-sidebar-item__icon {
      margin: 0;
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

    .ds-sidebar-item__divider {
      height: 1px;
      margin: var(--space-2, 0.5rem) var(--space-4, 1rem);
      background: var(--sidebar-border, rgba(0, 0, 0, 0.1));
    }

    .ds-sidebar-item__children {
      /* L'indentation est gérée par padding-left sur chaque item enfant */
    }

    /* ============================================
       POPOVER (mode collapsed)
       ============================================ */
    .ds-sidebar-popover {
      background: var(--popover-bg, var(--sidebar-bg, #ffffff));
      border: 1px solid var(--popover-border, var(--sidebar-border, #e5e7eb));
      border-radius: var(--popover-radius, 8px);
      box-shadow: var(--popover-shadow, var(--shadow-2, 0 4px 6px -1px rgba(0, 0, 0, 0.1)));
      min-width: 200px;
      max-width: 280px;
      overflow: hidden;
      animation: popoverSlideIn 150ms ease-out;
    }

    @keyframes popoverSlideIn {
      from {
        opacity: 0;
        transform: translateX(-8px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .ds-sidebar-popover__header {
      display: flex;
      align-items: center;
      gap: var(--space-2, 0.5rem);
      padding: var(--space-3, 0.75rem) var(--space-4, 1rem);
      background: var(--sidebar-item-hover-bg, rgba(0, 0, 0, 0.03));
      border-bottom: 1px solid var(--sidebar-border, rgba(0, 0, 0, 0.1));
      font-weight: 600;
      font-size: var(--font-size-sm, 0.875rem);
      color: var(--sidebar-text, inherit);
    }

    .ds-sidebar-popover__header-icon {
      font-size: var(--icon-size-md, 1rem);
      opacity: 0.8;
    }

    .ds-sidebar-popover__header-label {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ds-sidebar-popover__body {
      padding: var(--space-1, 0.25rem) 0;
      max-height: 300px;
      overflow-y: auto;
    }

    .ds-sidebar-popover__item {
      display: flex;
      align-items: center;
      gap: var(--space-2, 0.5rem);
      padding: var(--space-2, 0.5rem) var(--space-4, 1rem);
      cursor: pointer;
      color: var(--sidebar-text, inherit);
      transition: background-color 0.15s ease;
      outline: none;
      font-size: var(--font-size-sm, 0.875rem);
    }

    .ds-sidebar-popover__item:hover,
    .ds-sidebar-popover__item--active {
      background: var(--sidebar-item-hover-bg, rgba(0, 0, 0, 0.05));
    }

    .ds-sidebar-popover__item:focus-visible {
      outline: 2px solid var(--color-primary, #3b82f6);
      outline-offset: -2px;
    }

    .ds-sidebar-popover__item--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    .ds-sidebar-popover__item-icon {
      flex-shrink: 0;
      font-size: var(--icon-size-md, 1rem);
      opacity: 0.8;
    }

    .ds-sidebar-popover__item-label {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ds-sidebar-popover__item-badge {
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

    .ds-sidebar-popover__item-badge--default {
      background: var(--gray-200, #e5e7eb);
      color: var(--gray-800, #1f2937);
    }

    .ds-sidebar-popover__item-badge--primary {
      background: var(--color-primary, #3b82f6);
      color: white;
    }

    .ds-sidebar-popover__item-badge--success {
      background: var(--success, #10b981);
      color: white;
    }

    .ds-sidebar-popover__item-badge--warning {
      background: var(--warning, #f59e0b);
      color: white;
    }

    .ds-sidebar-popover__item-badge--error {
      background: var(--error, #ef4444);
      color: white;
    }

    .ds-sidebar-popover__item-badge--info {
      background: var(--info, #06b6d4);
      color: white;
    }

    .ds-sidebar-popover__item-chevron {
      font-size: 0.75rem;
      opacity: 0.5;
      flex-shrink: 0;
    }

    .ds-sidebar-popover__divider {
      height: 1px;
      margin: var(--space-1, 0.25rem) var(--space-4, 1rem);
      background: var(--sidebar-border, rgba(0, 0, 0, 0.1));
    }

    /* Style pour l'item avec popover ouvert */
    .ds-sidebar-item--popover-open {
      background: var(--sidebar-item-hover-bg, rgba(0, 0, 0, 0.05));
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsSidebarItemComponent {
  // Inputs
  readonly item = input.required<SidebarItem>();
  readonly level = input<number>(0);
  readonly mode = input<SidebarMode>('full');
  readonly showTooltip = input<boolean>(true);
  readonly expandedItemIds = input<Set<string | number>>(new Set());
  readonly activeItemId = input<string | number | null>(null);
  readonly sidebarPosition = input<SidebarPosition>('left');
  readonly collapsedTrigger = input<SidebarCollapsedTrigger>('hover');

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
  private readonly router = inject(Router);

  // État du popover (mode collapsed)
  private readonly popoverOpen = signal<boolean>(false);
  readonly isPopoverOpen = computed(() => this.popoverOpen());
  private readonly activeChildIndex = signal<number>(-1);
  isHoveringPopover = false;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;

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

  /** Positions du popover selon la position de la sidebar */
  readonly popoverPositions = computed<ConnectedPosition[]>(() => {
    return this.sidebarPosition() === 'left'
      ? SIDEBAR_POPOVER_POSITIONS_RIGHT
      : SIDEBAR_POPOVER_POSITIONS_LEFT;
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

    // En mode collapsed avec trigger click, toggle le popover pour les items avec enfants
    if (this.mode() === 'collapsed' && this.hasChildren() && this.collapsedTrigger() === 'click') {
      event.preventDefault();
      event.stopPropagation();
      this.togglePopover();
      return;
    }

    // Si l'item a des enfants et pas de lien, toggle expand
    if (this.hasChildren() && !this.item().routerLink && !this.item().href) {
      this.itemToggle.emit(this.item());
    }

    // En mode collapsed, naviguer programmatiquement car le <a> n'est pas rendu
    if (this.mode() === 'collapsed' && this.item().routerLink) {
      const link = this.item().routerLink;
      if (Array.isArray(link)) {
        void this.router.navigate(link);
      } else {
        void this.router.navigate([link]);
      }
    }

    // Gérer href externe en mode collapsed
    if (this.mode() === 'collapsed' && this.item().href) {
      const target = this.item().external ? '_blank' : '_self';
      window.open(this.item().href, target);
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

  // ============================================
  // GESTION DU POPOVER (mode collapsed)
  // ============================================

  /**
   * Ouvre le popover (mode collapsed + hasChildren).
   */
  openPopover(): void {
    if (this.mode() !== 'collapsed' || !this.hasChildren()) return;
    this.clearHideTimeout();
    this.popoverOpen.set(true);
    this.activeChildIndex.set(0);
  }

  /**
   * Ferme le popover.
   */
  closePopover(): void {
    this.popoverOpen.set(false);
    this.activeChildIndex.set(-1);
  }

  /**
   * Ferme le popover avec un délai.
   */
  closePopoverWithDelay(): void {
    this.hideTimeout = setTimeout(() => {
      if (!this.isHoveringPopover) {
        this.closePopover();
      }
    }, 150);
  }

  /**
   * Annule le timeout de fermeture.
   */
  private clearHideTimeout(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }

  /**
   * Gestion du mouseenter sur l'item (ouvre le popover en mode collapsed + trigger hover).
   */
  handleMouseEnter(): void {
    if (this.mode() === 'collapsed' && this.hasChildren() && this.collapsedTrigger() === 'hover') {
      this.openPopover();
    }
  }

  /**
   * Gestion du mouseleave sur l'item.
   */
  handleMouseLeave(): void {
    if (this.mode() === 'collapsed' && this.isPopoverOpen() && this.collapsedTrigger() === 'hover') {
      this.closePopoverWithDelay();
    }
  }

  /**
   * Toggle le popover (pour le mode click).
   */
  togglePopover(): void {
    if (this.isPopoverOpen()) {
      this.closePopover();
    } else {
      this.openPopover();
    }
  }

  /**
   * Gestion du mouseenter sur le popover.
   */
  handlePopoverMouseEnter(): void {
    this.isHoveringPopover = true;
    this.clearHideTimeout();
  }

  /**
   * Gestion du mouseleave sur le popover.
   */
  handlePopoverMouseLeave(): void {
    this.isHoveringPopover = false;
    if (this.collapsedTrigger() === 'hover') {
      this.closePopoverWithDelay();
    }
  }

  /**
   * Navigation clavier dans le popover.
   */
  handlePopoverKeydown(event: KeyboardEvent): void {
    const children = this.item().children || [];

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.moveChildIndex(1, children.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveChildIndex(-1, children.length);
        break;
      case 'Escape':
        event.preventDefault();
        this.closePopover();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.selectActiveChild();
        break;
    }
  }

  /**
   * Déplace l'index actif dans le popover.
   */
  private moveChildIndex(direction: 1 | -1, total: number): void {
    let newIndex = this.activeChildIndex() + direction;

    // Boucle circulaire
    if (newIndex < 0) newIndex = total - 1;
    if (newIndex >= total) newIndex = 0;

    // Skip les items désactivés
    const children = this.item().children || [];
    let attempts = 0;
    while (children[newIndex]?.disabled && attempts < total) {
      newIndex += direction;
      if (newIndex < 0) newIndex = total - 1;
      if (newIndex >= total) newIndex = 0;
      attempts++;
    }

    this.activeChildIndex.set(newIndex);
  }

  /**
   * Sélectionne l'enfant actif dans le popover.
   */
  private selectActiveChild(): void {
    const children = this.item().children || [];
    const index = this.activeChildIndex();
    if (index >= 0 && index < children.length) {
      const child = children[index];
      if (!child.disabled) {
        this.handleChildClick(child, new MouseEvent('click'));
      }
    }
  }

  /**
   * Gère le clic sur un enfant dans le popover.
   */
  handleChildClick(child: SidebarItem, event: MouseEvent): void {
    if (child.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Navigation programmatique pour routerLink
    if (child.routerLink) {
      const link = child.routerLink;
      if (Array.isArray(link)) {
        void this.router.navigate(link);
      } else {
        void this.router.navigate([link]);
      }
    }

    // Navigation href externe
    if (child.href) {
      const target = child.external ? '_blank' : '_self';
      window.open(child.href, target);
    }

    this.itemClick.emit({ item: child, event });
    this.closePopover();
  }

  /**
   * Met à jour l'index actif au hover.
   */
  setActiveChildIndex(index: number): void {
    this.activeChildIndex.set(index);
  }

  /**
   * Retourne l'index actif du popover.
   */
  getActiveChildIndex(): number {
    return this.activeChildIndex();
  }
}
