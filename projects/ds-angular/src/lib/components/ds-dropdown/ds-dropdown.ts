import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewChildren,
  QueryList,
  computed,
  effect,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  PrimitiveButton,
  ButtonVariant,
  ButtonSize,
  ButtonType,
  ButtonAppearance,
} from '../../primitives/primitive-button/primitive-button';
import { DropdownItem } from './model/dropdown-item.model';
import { Subscription } from 'rxjs';
import { DROPDOWN_POSITIONS } from '../../utils/overlay-positions';
import { generateId } from '../../utils/id-generator';

@Component({
  selector: 'ds-dropdown',
  imports: [
    CommonModule,
    PrimitiveButton,
    FaIconComponent,
    CdkConnectedOverlay,
    CdkOverlayOrigin,
  ],
  templateUrl: './ds-dropdown.html',
  styleUrl: './ds-dropdown.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsDropdown),
      multi: true,
    },
  ],
})
export class DsDropdown implements ControlValueAccessor, AfterViewInit, OnDestroy {
  // Inputs
  /** Identifiant du menu déroulant pour l'accessibilité. */
  readonly id = input<string>(generateId());
  /** Variante du bouton déclencheur. */
  readonly type = input<ButtonVariant>('primary');
  /** Apparence du bouton déclencheur (plein ou outline). */
  readonly variant = input<ButtonAppearance>('solid');
  /** Taille du bouton déclencheur. */
  readonly size = input<ButtonSize>('md');
  /** Utilise le bouton comme submit dans un formulaire. */
  readonly submit = input<boolean>(false);
  /** Désactive l'interaction du dropdown. */
  readonly disabled = input<boolean>(false);
  /** Affiche l'état de chargement et bloque l'ouverture. */
  readonly loading = input<boolean>(false);
  /** Étend le bouton sur toute la largeur disponible. */
  readonly block = input<boolean>(false);
  /** Icône affichée avant le libellé du bouton. */
  readonly dropdownStartIcon = input<IconDefinition | null>(null);
  /** Icône affichée après le libellé du bouton. */
  readonly dropdownEndIcon = input<IconDefinition | null>(null);
  /** Liste des options proposées dans le menu. */
  readonly dropdownItems = input<DropdownItem[]>([]);
  /** Code de l'option actuellement sélectionnée. */
  readonly selectedItem = input<string | null | undefined>(undefined);
  /** Libellé ARIA alternatif pour le bouton. */
  readonly ariaLabel = input<string | null | undefined>(undefined);
  /** Référence ARIA vers un élément existant décrivant le bouton. */
  readonly ariaLabelledBy = input<string | null | undefined>(undefined);
  /** Ferme le menu automatiquement lors de la sélection. */
  readonly closeOnSelect = input<boolean>(true);
  /** Classes CSS supplémentaires appliquées au panneau. */
  readonly overlayPanelClass = input<string | string[] | undefined>(undefined);

  // Outputs
  /** Émis lorsqu'un élément est sélectionné. */
  readonly selectedItemChanged = output<string>();
  /** Émis lors de l'ouverture du menu. */
  readonly opened = output<void>();
  /** Émis lors de la fermeture du menu. */
  readonly closed = output<void>();

  // Template refs
  @ViewChild('triggerButton', { read: ElementRef }) triggerButton?: ElementRef<HTMLElement>;
  @ViewChildren('menuItemRef') menuItems?: QueryList<ElementRef<HTMLButtonElement>>;

  // Internal state
  private readonly internalValue = signal<string | null>(null);
  private readonly disabledState = signal<boolean>(false);
  private readonly menuOpen = signal<boolean>(false);
  private readonly activeIndex = signal<number>(-1);

  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};
  private menuItemsChanges?: Subscription;

  constructor() {
    effect(() => {
      const items = this.dropdownItems();
      const current = this.currentValue();
      if (!items.length) {
        this.activeIndex.set(-1);
        return;
      }
      if (!current) {
        this.activeIndex.set(0);
        return;
      }
      const index = items.findIndex(item => item.code === current);
      this.activeIndex.set(index >= 0 ? index : 0);
    });

    effect(() => {
      if (this.isMenuOpen()) {
        queueMicrotask(() => this.focusActiveItem());
      }
    });

  }

  readonly overlayPositions = DROPDOWN_POSITIONS;

  // Computed helpers
  readonly isMenuOpen = computed<boolean>(() => this.menuOpen());
  readonly buttonType = computed<ButtonType>(() => (this.submit() ? 'submit' : 'button'));
  readonly isDisabled = computed<boolean>(() => this.disabled() || this.disabledState() || this.loading());
  readonly effectiveStartIcon = computed<IconDefinition | null>(() =>
    this.loading() ? null : this.dropdownStartIcon(),
  );
  readonly effectiveEndIcon = computed<IconDefinition | null>(() =>
    this.loading() ? null : this.dropdownEndIcon(),
  );
  readonly overlayPanelClasses = computed<string[]>(() => {
    const base = ['ds-dropdown-panel'];
    const custom = this.overlayPanelClass();
    if (Array.isArray(custom)) {
      base.push(...custom.filter(Boolean) as string[]);
    } else if (typeof custom === 'string' && custom.trim().length) {
      base.push(custom);
    }
    return base;
  });

  private readonly currentValue = computed<string | null>(() => {
    const external = this.selectedItem();
    if (external !== undefined) {
      return external;
    }
    return this.internalValue();
  });

  readonly activeItem = computed<DropdownItem | undefined>(() => {
    const code = this.currentValue();
    if (!code) {
      return undefined;
    }
    return this.dropdownItems().find(item => item.code === code);
  });

  readonly activeDescendantId = computed<string | undefined>(() => {
    const items = this.dropdownItems();
    const index = this.activeIndex();
    if (index < 0 || index >= items.length) {
      return undefined;
    }
    return `${this.id()}-option-${items[index].code}`;
  });

  ngAfterViewInit(): void {
    this.menuItemsChanges = this.menuItems?.changes.subscribe(() => {
      if (this.isMenuOpen()) {
        queueMicrotask(() => this.focusActiveItem());
      }
    });
  }

  ngOnDestroy(): void {
    this.menuItemsChanges?.unsubscribe();
  }

  toggleMenu(): void {
    if (this.isDisabled()) {
      return;
    }

    if (this.isMenuOpen()) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  closeMenu(refocusTrigger = true): void {
    if (!this.isMenuOpen()) {
      return;
    }
    this.menuOpen.set(false);
    if (refocusTrigger) {
      this.focusTriggerButton();
    }
    this.closed.emit();
  }

  onOverlayDetach(): void {
    this.closeMenu();
  }

  setSelectedItem(code: string): void {
    if (this.isDisabled()) {
      return;
    }

    this.onTouched();
    this.internalValue.set(code);
    this.onChange(code);
    this.selectedItemChanged.emit(code);
    if (this.closeOnSelect()) {
      this.closeMenu();
    }
  }

  isItemActive(code: string): boolean {
    return this.currentValue() === code;
  }

  getSelectedItem(): DropdownItem | undefined {
    return this.activeItem();
  }

  onTriggerKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isMenuOpen()) {
          this.openMenu();
        } else {
          this.moveActiveIndex(1);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!this.isMenuOpen()) {
          this.openMenu();
        } else {
          this.moveActiveIndex(-1);
        }
        break;
      case 'Enter':
      case ' ': {
        event.preventDefault();
        if (!this.isMenuOpen()) {
          this.openMenu();
        } else {
          this.commitActiveSelection();
        }
        break;
      }
      case 'Escape':
        if (this.isMenuOpen()) {
          event.preventDefault();
          this.closeMenu();
        }
        break;
      default:
        break;
    }
  }

  onMenuKeydown(event: KeyboardEvent, _index: number): void {
    if (!this.isMenuOpen()) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.moveActiveIndex(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveActiveIndex(-1);
        break;
      case 'Home':
        event.preventDefault();
        this.setActiveIndex(0);
        break;
      case 'End':
        event.preventDefault();
        this.setActiveIndex(this.dropdownItems().length - 1);
        break;
      case 'Enter':
      case ' ': {
        event.preventDefault();
        this.commitActiveSelection();
        break;
      }
      case 'Escape':
        event.preventDefault();
        this.closeMenu();
        break;
      case 'Tab':
        this.closeMenu(false);
        break;
      default:
        break;
    }
  }

  onMenuMouseEnter(index: number): void {
    if (!this.isMenuOpen()) {
      return;
    }
    this.setActiveIndex(index, false);
  }

  // ControlValueAccessor implementation
  writeValue(value: string | null): void {
    this.internalValue.set(value ?? null);
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledState.set(isDisabled);
    if (isDisabled) {
      this.closeMenu();
    }
  }

  private openMenu(): void {
    if (this.isDisabled() || this.isMenuOpen()) {
      return;
    }
    this.menuOpen.set(true);
    this.opened.emit();
  }

  private moveActiveIndex(offset: number): void {
    const items = this.dropdownItems();
    if (!items.length) {
      this.activeIndex.set(-1);
      return;
    }

    const nextIndex = this.wrapIndex(this.activeIndex() + offset, items.length);
    this.activeIndex.set(nextIndex);
    this.focusActiveItem();
  }

  private setActiveIndex(index: number, focus = true): void {
    const items = this.dropdownItems();
    if (!items.length) {
      this.activeIndex.set(-1);
      return;
    }

    const nextIndex = Math.min(Math.max(index, 0), items.length - 1);
    this.activeIndex.set(nextIndex);
    if (focus) {
      this.focusActiveItem();
    }
  }

  private commitActiveSelection(): void {
    const items = this.dropdownItems();
    const index = this.activeIndex();
    if (index < 0 || index >= items.length) {
      return;
    }
    this.setSelectedItem(items[index].code);
  }

  private wrapIndex(index: number, length: number): number {
    if (length === 0) {
      return -1;
    }
    if (index < 0) {
      return length - 1;
    }
    if (index >= length) {
      return 0;
    }
    return index;
  }

  private focusActiveItem(): void {
    const element = this.getMenuItemElement(this.activeIndex());
    element?.focus();
  }

  private focusTriggerButton(): void {
    const host = this.triggerButton?.nativeElement as HTMLElement | undefined;
    const button = host?.querySelector('button') as HTMLButtonElement | null;
    button?.focus();
  }

  private getMenuItemElement(index: number): HTMLButtonElement | null {
    if (!this.menuItems) {
      return null;
    }
    const items = this.menuItems.toArray();
    if (index < 0 || index >= items.length) {
      return null;
    }
    return items[index]?.nativeElement ?? null;
  }
}
