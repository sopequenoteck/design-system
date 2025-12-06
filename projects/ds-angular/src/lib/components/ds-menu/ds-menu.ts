import {
  Component,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  computed,
  input,
  output,
  signal,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { DROPDOWN_POSITIONS } from '../../utils/overlay-positions';

export interface MenuItem {
  /** Identifiant unique de l'item */
  id: string;
  /** Label affiché */
  label: string;
  /** Icône FontAwesome optionnelle */
  icon?: IconDefinition;
  /** Item désactivé */
  disabled?: boolean;
  /** Séparateur avant cet item */
  dividerBefore?: boolean;
}

export type MenuTrigger = 'click' | 'contextmenu';
export type MenuSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ds-menu',
  standalone: true,
  imports: [CommonModule, FaIconComponent, CdkConnectedOverlay, CdkOverlayOrigin],
  templateUrl: './ds-menu.html',
  styleUrls: ['./ds-menu.scss'],
})
export class DsMenu implements OnDestroy {
  /** Liste des items du menu */
  readonly items = input.required<MenuItem[]>();

  /** Taille du menu */
  readonly size = input<MenuSize>('md');

  /** Événement déclencheur */
  readonly trigger = input<MenuTrigger>('click');

  /** Fermer le menu après sélection */
  readonly closeOnSelect = input<boolean>(true);

  /** Label ARIA pour l'accessibilité */
  readonly ariaLabel = input<string | undefined>(undefined);

  /** Événement émis lors de la sélection d'un item */
  readonly itemSelected = output<MenuItem>();

  /** Événement émis à l'ouverture du menu */
  readonly opened = output<void>();

  /** Événement émis à la fermeture du menu */
  readonly closed = output<void>();

  @ViewChild('menuTrigger', { read: ElementRef }) triggerElement?: ElementRef;
  @ViewChildren('menuItemRef') menuItemsRef?: QueryList<ElementRef<HTMLButtonElement>>;

  /** État interne d'ouverture */
  private readonly menuOpen = signal<boolean>(false);

  /** Index de l'item actif pour la navigation clavier */
  private readonly internalActiveIndex = signal<number>(-1);

  /** Exposition en lecture seule de l'index actif */
  readonly activeIndex = computed(() => this.internalActiveIndex());

  /** État d'ouverture du menu (lecture seule) */
  readonly isOpen = computed(() => this.menuOpen());

  /** Positions pour l'overlay CDK */
  readonly overlayPositions = DROPDOWN_POSITIONS;

  /** Classes CSS du panel menu */
  readonly menuClasses = computed(() => ({
    'ds-menu__panel': true,
    [`ds-menu__panel--${this.size()}`]: true,
  }));

  /** ID de l'item actif pour aria-activedescendant */
  readonly activeDescendantId = computed(() => {
    const items = this.items();
    const index = this.internalActiveIndex();
    if (index < 0 || index >= items.length) return undefined;
    return `menu-item-${items[index].id}`;
  });

  /** Ouvre le menu */
  open(): void {
    if (this.isOpen()) return;
    this.menuOpen.set(true);
    this.internalActiveIndex.set(this.findFirstEnabledIndex());
    this.opened.emit();
    queueMicrotask(() => this.focusActiveItem());
  }

  /** Ferme le menu */
  close(refocusTrigger = true): void {
    if (!this.isOpen()) return;
    this.menuOpen.set(false);
    this.internalActiveIndex.set(-1);
    if (refocusTrigger) {
      this.triggerElement?.nativeElement?.focus();
    }
    this.closed.emit();
  }

  /** Bascule l'état du menu */
  toggle(): void {
    this.isOpen() ? this.close() : this.open();
  }

  /** Sélectionne un item */
  selectItem(item: MenuItem): void {
    if (item.disabled) return;
    this.itemSelected.emit(item);
    if (this.closeOnSelect()) {
      this.close();
    }
  }

  /** Gestionnaire de clic sur le trigger */
  onTriggerClick(event: MouseEvent): void {
    if (this.trigger() === 'click') {
      event.preventDefault();
      this.toggle();
    }
  }

  /** Gestionnaire de clic droit sur le trigger */
  onTriggerContextMenu(event: MouseEvent): void {
    if (this.trigger() === 'contextmenu') {
      event.preventDefault();
      this.open();
    }
  }

  /** Gestionnaire de clavier sur le trigger */
  onTriggerKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.open();
        break;
      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.close();
        }
        break;
    }
  }

  /** Gestionnaire de clavier dans le menu */
  onMenuKeydown(event: KeyboardEvent): void {
    if (!this.isOpen()) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.moveToNextEnabled(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveToNextEnabled(-1);
        break;
      case 'Home':
        event.preventDefault();
        this.setActiveIndex(this.findFirstEnabledIndex());
        break;
      case 'End':
        event.preventDefault();
        this.setActiveIndex(this.findLastEnabledIndex());
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.selectActiveItem();
        break;
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
      case 'Tab':
        this.close(false);
        break;
    }
  }

  /** Met à jour l'index actif au survol */
  onItemMouseEnter(index: number): void {
    if (!this.isOpen()) return;
    const item = this.items()[index];
    if (!item?.disabled) {
      this.internalActiveIndex.set(index);
    }
  }

  /** Gestionnaire de clic sur le backdrop */
  onBackdropClick(): void {
    this.close();
  }

  ngOnDestroy(): void {
    this.close(false);
  }

  /** Trouve l'index du premier item activable */
  private findFirstEnabledIndex(): number {
    return this.items().findIndex(item => !item.disabled);
  }

  /** Trouve l'index du dernier item activable */
  private findLastEnabledIndex(): number {
    const items = this.items();
    for (let i = items.length - 1; i >= 0; i--) {
      if (!items[i].disabled) return i;
    }
    return -1;
  }

  /** Navigue vers le prochain item activable */
  private moveToNextEnabled(direction: 1 | -1): void {
    const items = this.items();
    if (!items.length) return;

    let index = this.internalActiveIndex();
    const startIndex = index;

    do {
      index += direction;
      if (index < 0) index = items.length - 1;
      if (index >= items.length) index = 0;
      if (!items[index].disabled) {
        this.setActiveIndex(index);
        return;
      }
    } while (index !== startIndex);
  }

  /** Définit l'index actif et focus l'élément */
  private setActiveIndex(index: number): void {
    this.internalActiveIndex.set(index);
    this.focusActiveItem();
  }

  /** Focus l'item actif */
  private focusActiveItem(): void {
    const items = this.menuItemsRef?.toArray();
    const index = this.internalActiveIndex();
    if (items && index >= 0 && index < items.length) {
      items[index].nativeElement.focus();
    }
  }

  /** Sélectionne l'item actuellement actif */
  private selectActiveItem(): void {
    const items = this.items();
    const index = this.internalActiveIndex();
    if (index >= 0 && index < items.length) {
      this.selectItem(items[index]);
    }
  }
}
