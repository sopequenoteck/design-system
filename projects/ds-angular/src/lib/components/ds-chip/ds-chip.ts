import {
  Component,
  input,
  output,
  computed,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export type ChipVariant = 'filled' | 'outlined';
export type ChipSize = 'sm' | 'md' | 'lg';
export type ChipColor = 'default' | 'primary' | 'success' | 'warning' | 'error';

/**
 * Design System Chip component
 *
 * @example
 * ```html
 * <ds-chip label="Tag" />
 * <ds-chip label="Removable" [removable]="true" (removed)="onRemove()" />
 * <ds-chip label="Clickable" [clickable]="true" (clicked)="onClick()" />
 * <ds-chip label="With icon" icon="fas-star" />
 * ```
 */
@Component({
  selector: 'ds-chip',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './ds-chip.html',
  styleUrls: ['./ds-chip.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsChip {
  // Inputs
  readonly label = input.required<string>();
  readonly variant = input<ChipVariant>('filled');
  readonly size = input<ChipSize>('md');
  readonly color = input<ChipColor>('default');
  readonly removable = input<boolean>(false);
  readonly clickable = input<boolean>(false);
  readonly selected = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly icon = input<string>('');
  readonly avatar = input<string>('');

  // Outputs
  readonly removed = output<void>();
  readonly clicked = output<void>();
  readonly selectedChange = output<boolean>();

  // Internal state
  readonly isSelected = signal(false);

  // Icons
  readonly closeIcon: IconDefinition = faXmark;

  // Computed classes
  readonly chipClasses = computed(() => {
    const classes: string[] = ['ds-chip'];

    classes.push(`ds-chip--${this.variant()}`);
    classes.push(`ds-chip--${this.size()}`);
    classes.push(`ds-chip--${this.color()}`);

    if (this.clickable() && !this.disabled()) {
      classes.push('ds-chip--clickable');
    }

    if (this.selected()) {
      classes.push('ds-chip--selected');
    }

    if (this.disabled()) {
      classes.push('ds-chip--disabled');
    }

    return classes.join(' ');
  });

  // Computed role
  readonly role = computed(() => {
    return this.clickable() ? 'button' : null;
  });

  // Computed tabindex
  readonly tabindex = computed(() => {
    if (this.disabled()) return -1;
    if (this.clickable() || this.removable()) return 0;
    return null;
  });

  // Computed aria-selected
  readonly ariaSelected = computed(() => {
    return this.clickable() ? this.selected() : null;
  });

  // Computed aria-disabled
  readonly ariaDisabled = computed(() => {
    return this.disabled() ? true : null;
  });

  /**
   * Handle chip click
   */
  handleClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }

    if (this.clickable()) {
      this.isSelected.set(!this.selected());
      this.clicked.emit();
      this.selectedChange.emit(!this.selected());
    }
  }

  /**
   * Handle remove button click
   */
  handleRemove(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();

    if (this.disabled()) {
      return;
    }

    this.removed.emit();
  }

  /**
   * Handle keyboard events
   */
  handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    // Handle Enter or Space for clickable chips
    if (this.clickable() && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.handleClick(event as any);
    }

    // Handle Delete or Backspace for removable chips
    if (
      this.removable() &&
      (event.key === 'Delete' || event.key === 'Backspace')
    ) {
      event.preventDefault();
      this.handleRemove(event as any);
    }
  }
}
