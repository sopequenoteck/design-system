import { Component, forwardRef, input, signal, computed, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

/**
 * Option pour un segment
 */
export interface SegmentOption {
  value: string;
  label: string;
  icon?: string;
  disabled?: boolean;
}

/**
 * Taille du segmented control
 */
export type SegmentedControlSize = 'sm' | 'md' | 'lg';

/**
 * Orientation du segmented control
 */
export type SegmentedControlOrientation = 'horizontal' | 'vertical';

/**
 * Couleur du segment actif
 */
export type SegmentedControlColor = 'primary' | 'neutral';

/**
 * DS Segmented Control
 *
 * Composant groupe de boutons mutuellement exclusifs visuellement connectés.
 * Alternative stylisée aux boutons radio pour basculer entre vues, modes ou options.
 *
 * @example
 * // Formulaire réactif
 * <ds-segmented-control
 *   formControlName="view"
 *   [options]="viewOptions"
 *   size="md"
 *   fullWidth
 * />
 *
 * @example
 * // Template-driven
 * <ds-segmented-control
 *   [(ngModel)]="selectedView"
 *   [options]="[
 *     { value: 'list', label: 'Liste', icon: 'fas-list' },
 *     { value: 'grid', label: 'Grille', icon: 'fas-grid' },
 *     { value: 'map', label: 'Carte', icon: 'fas-map' }
 *   ]"
 *   color="neutral"
 * />
 */
@Component({
  selector: 'ds-segmented-control',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './ds-segmented-control.html',
  styleUrl: './ds-segmented-control.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsSegmentedControl),
      multi: true,
    },
  ],
})
export class DsSegmentedControl implements ControlValueAccessor {
  /**
   * Liste des options du segmented control
   */
  options = input.required<SegmentOption[]>();

  /**
   * Taille du segmented control (sm, md, lg)
   */
  size = input<SegmentedControlSize>('md');

  /**
   * État désactivé global
   */
  disabled = input<boolean>(false);

  /**
   * Prend toute la largeur du conteneur
   */
  fullWidth = input<boolean>(false);

  /**
   * Orientation (horizontal, vertical)
   */
  orientation = input<SegmentedControlOrientation>('horizontal');

  /**
   * Couleur du segment actif (primary, neutral)
   */
  color = input<SegmentedControlColor>('primary');

  // Internal state
  private readonly disabledState = signal<boolean>(false);
  protected readonly internalValue = signal<string | null>(null);

  // Computed properties
  protected readonly isDisabled = computed<boolean>(() => this.disabled() || this.disabledState());

  protected readonly containerClasses = computed<Record<string, boolean>>(() => ({
    'ds-segmented-control': true,
    [`ds-segmented-control--${this.size()}`]: true,
    [`ds-segmented-control--${this.orientation()}`]: true,
    [`ds-segmented-control--${this.color()}`]: true,
    'ds-segmented-control--full-width': this.fullWidth(),
    'ds-segmented-control--disabled': this.isDisabled(),
  }));

  readonly activeIndex = computed<number>(() => {
    const value = this.internalValue();
    if (!value) return -1;
    return this.options().findIndex((opt) => opt.value === value);
  });

  /**
   * Vérifie si une option est sélectionnée
   */
  protected isOptionSelected(option: SegmentOption): boolean {
    return this.internalValue() === option.value;
  }

  /**
   * Vérifie si une option est désactivée
   */
  protected isOptionDisabled(option: SegmentOption): boolean {
    return this.isDisabled() || !!option.disabled;
  }

  /**
   * Classes CSS pour un segment
   */
  protected getSegmentClasses(option: SegmentOption): Record<string, boolean> {
    return {
      'ds-segmented-control__segment': true,
      'ds-segmented-control__segment--active': this.isOptionSelected(option),
      'ds-segmented-control__segment--disabled': this.isOptionDisabled(option),
    };
  }

  // ControlValueAccessor implementation
  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this.internalValue.set(value);
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledState.set(isDisabled);
  }

  // Event handlers
  protected onSegmentClick(option: SegmentOption): void {
    if (this.isOptionDisabled(option)) {
      return;
    }
    this.internalValue.set(option.value);
    this.onChange(option.value);
    this.onTouched();
  }

  @HostListener('keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    if (target.getAttribute('role') !== 'radio') return;

    const currentIndex = this.activeIndex();
    const optionsArray = this.options();
    const isHorizontal = this.orientation() === 'horizontal';
    let nextIndex = currentIndex;

    switch (event.key) {
      case 'ArrowLeft':
        if (!isHorizontal) return;
        event.preventDefault();
        nextIndex = this.findPreviousEnabledOption(currentIndex);
        break;
      case 'ArrowRight':
        if (!isHorizontal) return;
        event.preventDefault();
        nextIndex = this.findNextEnabledOption(currentIndex);
        break;
      case 'ArrowUp':
        if (isHorizontal) return;
        event.preventDefault();
        nextIndex = this.findPreviousEnabledOption(currentIndex);
        break;
      case 'ArrowDown':
        if (isHorizontal) return;
        event.preventDefault();
        nextIndex = this.findNextEnabledOption(currentIndex);
        break;
      case 'Home':
        event.preventDefault();
        nextIndex = this.findNextEnabledOption(-1);
        break;
      case 'End':
        event.preventDefault();
        nextIndex = this.findPreviousEnabledOption(optionsArray.length);
        break;
      default:
        return;
    }

    if (nextIndex !== currentIndex && nextIndex !== -1) {
      this.onSegmentClick(optionsArray[nextIndex]);
      this.focusSegment(nextIndex);
    }
  }

  private findNextEnabledOption(startIndex: number): number {
    const optionsArray = this.options();
    for (let i = startIndex + 1; i < optionsArray.length; i++) {
      if (!optionsArray[i].disabled) return i;
    }
    return startIndex === -1 ? 0 : startIndex;
  }

  private findPreviousEnabledOption(startIndex: number): number {
    const optionsArray = this.options();
    for (let i = startIndex - 1; i >= 0; i--) {
      if (!optionsArray[i].disabled) return i;
    }
    return startIndex === optionsArray.length ? optionsArray.length - 1 : startIndex;
  }

  private focusSegment(index: number): void {
    setTimeout(() => {
      const segment = document.querySelector(
        `.ds-segmented-control__segment[data-index="${index}"]`
      ) as HTMLElement;
      segment?.focus();
    }, 0);
  }

  // Track function for @for
  protected trackByValue(_index: number, option: SegmentOption): string {
    return option.value;
  }
}
