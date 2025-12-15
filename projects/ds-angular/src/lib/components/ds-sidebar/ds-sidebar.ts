import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  signal,
  effect,
  inject,
  ViewChild,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import { DsSidebarItemComponent } from './ds-sidebar-item.component';
import {
  SidebarItem,
  SidebarMode,
  SidebarSize,
  SidebarPosition,
  SidebarItemClickEvent,
  SidebarItemExpandEvent,
  FlattenedSidebarItem,
} from './ds-sidebar.types';

/**
 * # DsSidebar
 *
 * Composant de navigation verticale avec support multi-niveaux,
 * modes responsive et intégration Router Angular.
 *
 * ## Modes
 * - `full` : Largeur complète avec labels visibles
 * - `collapsed` : Icônes uniquement avec tooltips
 * - `overlay` : Panneau glissant avec backdrop (mobile)
 *
 * ## Usage
 *
 * ```html
 * <ds-sidebar
 *   [items]="menuItems"
 *   [mode]="sidebarMode"
 *   [size]="'md'"
 *   [collapsible]="true"
 *   (itemClick)="onItemClick($event)"
 *   (modeChange)="onModeChange($event)">
 *
 *   <ng-container sidebar-header>
 *     <img src="logo.svg" alt="Logo" />
 *   </ng-container>
 *
 *   <ng-container sidebar-footer>
 *     <button>Déconnexion</button>
 *   </ng-container>
 * </ds-sidebar>
 * ```
 *
 * ## Accessibilité
 * - Navigation clavier complète (Arrow, Home, End, Enter, Escape)
 * - Focus trap en mode overlay
 * - Attributs ARIA complets
 *
 * @component
 */
@Component({
  selector: 'ds-sidebar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, DsSidebarItemComponent],
  templateUrl: './ds-sidebar.html',
  styleUrls: ['./ds-sidebar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsSidebar implements OnInit, AfterViewInit, OnDestroy {
  // ============ INPUTS ============

  /** Liste des items de navigation */
  readonly items = input.required<SidebarItem[]>();

  /** Mode d'affichage */
  readonly mode = input<SidebarMode>('full');

  /** Taille (largeur) */
  readonly size = input<SidebarSize>('md');

  /** Position */
  readonly position = input<SidebarPosition>('left');

  /** Permet le toggle entre full et collapsed */
  readonly collapsible = input<boolean>(true);

  /** Label ARIA pour l'accessibilité */
  readonly ariaLabel = input<string>('Navigation principale');

  /** Breakpoint pour le mode responsive (px) */
  readonly responsiveBreakpoint = input<number>(768);

  /** Active le switch automatique vers overlay sur mobile */
  readonly autoCollapseOnMobile = input<boolean>(true);

  /** Affiche les tooltips en mode collapsed (désactivable) */
  readonly showTooltips = input<boolean>(true);

  /** ID de l'item actif (contrôlé depuis l'extérieur) */
  readonly initialActiveItemId = input<string | number | null>(null);

  // ============ OUTPUTS ============

  /** Émis lors du clic sur un item */
  readonly itemClick = output<SidebarItemClickEvent>();

  /** Émis lors de l'expansion/collapse d'un item */
  readonly itemExpand = output<SidebarItemExpandEvent>();

  /** Émis lors du changement de mode */
  readonly modeChange = output<SidebarMode>();

  /** Émis à l'ouverture de l'overlay */
  readonly overlayOpened = output<void>();

  /** Émis à la fermeture de l'overlay */
  readonly overlayClosed = output<void>();

  // ============ VIEW QUERIES ============

  @ViewChild('sidebarContainer') sidebarContainer?: ElementRef<HTMLElement>;
  @ViewChildren(DsSidebarItemComponent) itemComponents?: QueryList<DsSidebarItemComponent>;

  // ============ INTERNAL STATE ============

  /** Mode interne (peut différer du mode input en responsive) */
  protected readonly internalMode = signal<SidebarMode>('full');

  /** IDs des items expandés */
  readonly expandedItemIds = signal<Set<string | number>>(new Set());

  /** ID de l'item actif */
  readonly activeItemId = signal<string | number | null>(null);

  /** Index de l'item focusé (pour navigation clavier) */
  private readonly focusedIndex = signal<number>(-1);

  /** État d'ouverture de l'overlay */
  readonly isOverlayOpen = signal<boolean>(false);

  /** Indique si la vue est prête */
  private viewReady = signal<boolean>(false);

  /** Indique si l'état expanded a été initialisé */
  private expandedStateInitialized = false;

  // ============ ICONS ============

  readonly menuIcon = faBars;
  readonly collapseIcon = faAngleLeft;
  readonly expandIcon = faAngleRight;

  // ============ PRIVATE ============

  private focusTrap: FocusTrap | null = null;
  private mediaQueryListener: (() => void) | null = null;
  private readonly documentRef = inject(DOCUMENT);
  private readonly focusTrapFactory = inject(FocusTrapFactory);

  // ============ COMPUTED ============

  /** Classes CSS du conteneur */
  readonly containerClasses = computed(() => {
    const mode = this.internalMode();
    const size = this.size();
    const position = this.position();

    const classes = ['ds-sidebar'];
    classes.push(`ds-sidebar--${mode}`);
    classes.push(`ds-sidebar--${size}`);
    classes.push(`ds-sidebar--${position}`);

    if (mode === 'overlay' && this.isOverlayOpen()) {
      classes.push('ds-sidebar--overlay-open');
    }

    return classes.join(' ');
  });

  /** Liste aplatie des items pour navigation clavier */
  readonly flattenedItems = computed((): FlattenedSidebarItem[] => {
    const result: FlattenedSidebarItem[] = [];
    let flatIndex = 0;

    const flatten = (
      items: SidebarItem[],
      level: number,
      parentId: string | number | null
    ): void => {
      items.forEach((item) => {
        result.push({ item, level, flatIndex: flatIndex++, parentId });

        if (item.children && this.expandedItemIds().has(item.id)) {
          flatten(item.children, level + 1, item.id);
        }
      });
    };

    flatten(this.items(), 0, null);
    return result;
  });

  /** Nombre total d'items visibles */
  readonly visibleItemCount = computed(() => this.flattenedItems().length);

  // ============ LIFECYCLE ============

  constructor() {
    // Sync mode input → internalMode
    effect(() => {
      this.internalMode.set(this.mode());
    });

    // Sync initialActiveItemId input → activeItemId
    effect(() => {
      const externalId = this.initialActiveItemId();
      if (externalId !== null) {
        this.activeItemId.set(externalId);
      }
    });

    // Initialize expanded state from items
    effect(() => {
      const items = this.items();
      if (items.length > 0) {
        this.initializeExpandedState(items);
      }
    });
  }

  ngOnInit(): void {
    // Setup responsive listener si autoCollapseOnMobile
    if (this.autoCollapseOnMobile()) {
      this.setupResponsiveListener();
    }
  }

  ngAfterViewInit(): void {
    this.viewReady.set(true);
  }

  ngOnDestroy(): void {
    this.cleanupListeners();
    this.detachFocusTrap();
  }

  // ============ PUBLIC METHODS ============

  /**
   * Bascule entre les modes full et collapsed.
   */
  toggleMode(): void {
    const current = this.internalMode();

    if (current === 'full') {
      this.internalMode.set('collapsed');
    } else if (current === 'collapsed') {
      this.internalMode.set('full');
    }

    this.modeChange.emit(this.internalMode());
  }

  /**
   * Ouvre l'overlay (mode overlay uniquement).
   */
  openOverlay(): void {
    if (this.internalMode() !== 'overlay') return;

    this.isOverlayOpen.set(true);
    this.documentRef.body.style.overflow = 'hidden';

    // Focus trap après animation
    setTimeout(() => {
      this.attachFocusTrap();
      this.focusFirstItem();
    }, 300);

    this.overlayOpened.emit();
  }

  /**
   * Ferme l'overlay.
   */
  closeOverlay(): void {
    this.isOverlayOpen.set(false);
    this.detachFocusTrap();
    this.documentRef.body.style.overflow = '';
    this.overlayClosed.emit();
  }

  /**
   * Définit l'item actif par son ID.
   */
  setActiveItem(itemId: string | number): void {
    this.activeItemId.set(itemId);

    // Expand parents si nécessaire
    this.expandParentsOfItem(itemId);
  }

  /**
   * Expand ou collapse un item.
   */
  toggleExpand(item: SidebarItem): void {
    if (!item.children || item.children.length === 0 || item.disabled) return;

    const expanded = !this.expandedItemIds().has(item.id);
    const newExpandedIds = new Set(this.expandedItemIds());

    if (expanded) {
      newExpandedIds.add(item.id);
    } else {
      newExpandedIds.delete(item.id);
    }

    this.expandedItemIds.set(newExpandedIds);
    this.itemExpand.emit({ item, expanded });
  }

  /**
   * Expand tous les items avec enfants.
   */
  expandAll(): void {
    const expandedIds = new Set<string | number>();

    const expandRecursive = (items: SidebarItem[]): void => {
      items.forEach((item) => {
        if (item.children && item.children.length > 0) {
          expandedIds.add(item.id);
          expandRecursive(item.children);
        }
      });
    };

    expandRecursive(this.items());
    this.expandedItemIds.set(expandedIds);
  }

  /**
   * Collapse tous les items.
   */
  collapseAll(): void {
    this.expandedItemIds.set(new Set());
  }

  // ============ EVENT HANDLERS ============

  /**
   * Gère le clic sur un item.
   */
  handleItemClick(event: SidebarItemClickEvent): void {
    const { item } = event;

    if (item.disabled) return;

    // Set active
    this.activeItemId.set(item.id);

    // Emit event
    this.itemClick.emit(event);

    // Close overlay si mobile
    if (this.internalMode() === 'overlay' && this.isOverlayOpen()) {
      // Ne fermer que si l'item a un lien (pas un parent)
      if (item.routerLink || item.href) {
        this.closeOverlay();
      }
    }
  }

  /**
   * Gère le toggle d'un item (expand/collapse).
   */
  handleItemToggle(item: SidebarItem): void {
    this.toggleExpand(item);
  }

  /**
   * Gère le clic sur le backdrop.
   */
  handleBackdropClick(): void {
    this.closeOverlay();
  }

  /**
   * Gère la navigation clavier globale.
   */
  handleKeyDown(event: KeyboardEvent): void {
    const items = this.flattenedItems();
    if (items.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.moveFocus(1);
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.moveFocus(-1);
        break;

      case 'ArrowRight':
        event.preventDefault();
        this.expandFocusedItem();
        break;

      case 'ArrowLeft':
        event.preventDefault();
        this.collapseOrMoveFocus();
        break;

      case 'Home':
        event.preventDefault();
        this.focusedIndex.set(0);
        this.focusCurrentItem();
        break;

      case 'End':
        event.preventDefault();
        this.focusedIndex.set(items.length - 1);
        this.focusCurrentItem();
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        this.activateFocusedItem();
        break;

      case 'Escape':
        if (this.internalMode() === 'overlay' && this.isOverlayOpen()) {
          event.preventDefault();
          this.closeOverlay();
        }
        break;
    }
  }

  /**
   * Gère les événements clavier d'un item enfant.
   */
  handleItemKeydown(event: KeyboardEvent): void {
    // Propager au handler global
    this.handleKeyDown(event);
  }

  // ============ PRIVATE METHODS ============

  /**
   * Initialise l'état expanded depuis les items.
   */
  private initializeExpandedState(items: SidebarItem[]): void {
    // Ne s'exécute qu'une seule fois
    if (this.expandedStateInitialized) return;
    this.expandedStateInitialized = true;

    const expandedIds = new Set<string | number>();

    const findExpanded = (nodes: SidebarItem[]): void => {
      nodes.forEach((node) => {
        if (node.expanded) {
          expandedIds.add(node.id);
        }
        if (node.children) {
          findExpanded(node.children);
        }
      });
    };

    findExpanded(items);

    if (expandedIds.size > 0) {
      this.expandedItemIds.set(expandedIds);
    }
  }

  /**
   * Expand les parents d'un item.
   */
  private expandParentsOfItem(itemId: string | number): void {
    const flatItems = this.flattenedItems();
    const targetItem = flatItems.find((fi) => fi.item.id === itemId);

    if (!targetItem || targetItem.parentId === null) return;

    const newExpandedIds = new Set(this.expandedItemIds());

    // Remonter la hiérarchie
    let currentParentId: string | number | null = targetItem.parentId;
    while (currentParentId !== null) {
      newExpandedIds.add(currentParentId);
      const parent = flatItems.find((fi) => fi.item.id === currentParentId);
      currentParentId = parent?.parentId ?? null;
    }

    this.expandedItemIds.set(newExpandedIds);
  }

  /**
   * Déplace le focus vers l'item suivant/précédent.
   */
  private moveFocus(direction: 1 | -1): void {
    const items = this.flattenedItems();
    if (items.length === 0) return;

    let newIndex = this.focusedIndex() + direction;

    // Skip disabled items
    while (newIndex >= 0 && newIndex < items.length && items[newIndex].item.disabled) {
      newIndex += direction;
    }

    // Bounds check
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= items.length) newIndex = items.length - 1;

    this.focusedIndex.set(newIndex);
    this.focusCurrentItem();
  }

  /**
   * Expand l'item focusé s'il a des enfants.
   */
  private expandFocusedItem(): void {
    const items = this.flattenedItems();
    const current = items[this.focusedIndex()];

    if (!current) return;

    if (current.item.children && current.item.children.length > 0) {
      if (!this.expandedItemIds().has(current.item.id)) {
        this.toggleExpand(current.item);
      } else {
        // Déjà expanded → focus premier enfant
        this.moveFocus(1);
      }
    }
  }

  /**
   * Collapse l'item focusé ou remonte au parent.
   */
  private collapseOrMoveFocus(): void {
    const items = this.flattenedItems();
    const current = items[this.focusedIndex()];

    if (!current) return;

    // Si expanded → collapse
    if (current.item.children && this.expandedItemIds().has(current.item.id)) {
      this.toggleExpand(current.item);
    } else if (current.parentId !== null) {
      // Remonter au parent
      const parentIndex = items.findIndex((fi) => fi.item.id === current.parentId);
      if (parentIndex >= 0) {
        this.focusedIndex.set(parentIndex);
        this.focusCurrentItem();
      }
    }
  }

  /**
   * Active (clic) l'item focusé.
   */
  private activateFocusedItem(): void {
    const items = this.flattenedItems();
    const current = items[this.focusedIndex()];

    if (!current || current.item.disabled) return;

    // Toggle expand si a des enfants sans lien
    if (current.item.children && !current.item.routerLink && !current.item.href) {
      this.toggleExpand(current.item);
    } else {
      // Émettre click
      this.activeItemId.set(current.item.id);
      this.itemClick.emit({
        item: current.item,
        event: new MouseEvent('click'),
      });
    }
  }

  /**
   * Focus l'item à l'index courant.
   */
  private focusCurrentItem(): void {
    const items = this.flattenedItems();
    const index = this.focusedIndex();

    if (index < 0 || index >= items.length) return;

    const targetId = items[index].item.id;

    // Trouver le composant correspondant
    const components = this.itemComponents?.toArray() ?? [];

    // Chercher récursivement
    const findAndFocus = (comps: DsSidebarItemComponent[]): boolean => {
      for (const comp of comps) {
        if (comp.item().id === targetId) {
          comp.focus();
          return true;
        }
      }
      return false;
    };

    findAndFocus(components);
  }

  /**
   * Focus le premier item.
   */
  private focusFirstItem(): void {
    const items = this.flattenedItems();
    if (items.length === 0) return;

    // Trouver le premier item non disabled
    const firstEnabled = items.findIndex((fi) => !fi.item.disabled);
    if (firstEnabled >= 0) {
      this.focusedIndex.set(firstEnabled);
      this.focusCurrentItem();
    }
  }

  /**
   * Configure le listener responsive.
   */
  private setupResponsiveListener(): void {
    const breakpoint = this.responsiveBreakpoint();
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    const handleChange = (e: MediaQueryListEvent | MediaQueryList): void => {
      if (e.matches) {
        // Mobile → overlay mode
        this.internalMode.set('overlay');
        this.isOverlayOpen.set(false);
      } else {
        // Desktop → full mode
        this.internalMode.set('full');
        this.isOverlayOpen.set(false);
        this.detachFocusTrap();
        this.documentRef.body.style.overflow = '';
      }
    };

    // Initial check
    handleChange(mediaQuery);

    // Listen to changes
    mediaQuery.addEventListener('change', handleChange);
    this.mediaQueryListener = () => mediaQuery.removeEventListener('change', handleChange);
  }

  /**
   * Attache le focus trap.
   */
  private attachFocusTrap(): void {
    if (this.focusTrap || !this.sidebarContainer) return;

    const element = this.sidebarContainer.nativeElement;
    this.focusTrap = this.focusTrapFactory.create(element);
    this.focusTrap.attachAnchors();
  }

  /**
   * Détache le focus trap.
   */
  private detachFocusTrap(): void {
    if (this.focusTrap) {
      this.focusTrap.destroy();
      this.focusTrap = null;
    }
  }

  /**
   * Nettoie les listeners.
   */
  private cleanupListeners(): void {
    if (this.mediaQueryListener) {
      this.mediaQueryListener();
      this.mediaQueryListener = null;
    }
  }
}
