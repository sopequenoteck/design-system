import {
  Component,
  input,
  output,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { DsEntityOption, DsEntityPickerSize } from './ds-entity-picker.types';

/**
 * Chip coloré pour afficher une entité sélectionnée dans ds-entity-picker
 *
 * @example
 * ```html
 * <ds-entity-chip
 *   [option]="{ value: '1', label: 'Important', color: '#ef4444', emoji: '🏷️' }"
 *   [removable]="true"
 *   (removed)="onRemove()"
 * />
 * ```
 */
@Component({
  selector: 'ds-entity-chip',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <div
      class="ds-entity-chip"
      [class.ds-entity-chip--sm]="size() === 'sm'"
      [class.ds-entity-chip--md]="size() === 'md'"
      [class.ds-entity-chip--lg]="size() === 'lg'"
      [class.ds-entity-chip--disabled]="disabled()"
      [style.--chip-color]="chipColor()"
      [style.background-color]="backgroundColor()"
      [style.border-color]="chipColor()"
      [attr.tabindex]="disabled() ? -1 : 0"
      (keydown)="handleKeyDown($event)"
    >
      @if (option().emoji) {
        <span class="ds-entity-chip__emoji">{{ option().emoji }}</span>
      } @else if (option().icon) {
        <fa-icon
          class="ds-entity-chip__icon"
          [icon]="option().icon!"
          [fixedWidth]="true"
          [style.color]="chipColor()"
        />
      }

      <span class="ds-entity-chip__label">{{ option().label }}</span>

      @if (removable() && !disabled()) {
        <button
          type="button"
          class="ds-entity-chip__remove"
          [attr.aria-label]="'Supprimer ' + option().label"
          (click)="handleRemove($event)"
        >
          <fa-icon [icon]="closeIcon" [fixedWidth]="true" />
        </button>
      }
    </div>
  `,
  styles: [`
    .ds-entity-chip {
      display: inline-flex;
      align-items: center;
      gap: var(--space-1, 0.25rem);
      padding: var(--space-1, 0.25rem) var(--space-2, 0.5rem);
      border-radius: var(--radius-md, 6px);
      font-family: var(--font-family-base, sans-serif);
      font-size: var(--font-size-sm, 0.875rem);
      font-weight: 500;
      line-height: 1.4;
      border: 1px solid var(--chip-color, var(--gray-300));
      background-color: color-mix(in srgb, var(--chip-color, var(--gray-300)) 10%, transparent);
      color: var(--text-default, #1a1a1a);
      transition:
        background-color var(--duration-fast, 150ms) var(--easing-default, ease),
        transform var(--duration-fast, 150ms) var(--easing-default, ease);
      user-select: none;
      outline: none;
      max-width: 200px;
    }

    .ds-entity-chip:focus-visible {
      box-shadow: 0 0 0 2px var(--background-main, #fff), 0 0 0 4px var(--chip-color, var(--color-primary));
    }

    .ds-entity-chip__emoji {
      flex-shrink: 0;
      font-size: 1em;
    }

    .ds-entity-chip__icon {
      flex-shrink: 0;
      font-size: 0.875em;
    }

    .ds-entity-chip__label {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 0;
    }

    .ds-entity-chip__remove {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-0-5, 0.125rem);
      margin: 0;
      margin-left: var(--space-1, 0.25rem);
      background: none;
      border: none;
      border-radius: var(--radius-sm, 4px);
      cursor: pointer;
      color: var(--chip-color, var(--gray-600));
      opacity: 0.7;
      transition:
        opacity var(--duration-fast, 150ms) var(--easing-default, ease),
        background-color var(--duration-fast, 150ms) var(--easing-default, ease),
        transform var(--duration-fast, 150ms) var(--easing-default, ease);
      flex-shrink: 0;
    }

    .ds-entity-chip__remove:hover {
      opacity: 1;
      background-color: color-mix(in srgb, var(--chip-color, var(--gray-300)) 20%, transparent);
    }

    .ds-entity-chip__remove:active {
      transform: scale(0.9);
    }

    .ds-entity-chip__remove:focus-visible {
      outline: none;
      opacity: 1;
      box-shadow: 0 0 0 2px var(--chip-color, var(--color-primary));
    }

    .ds-entity-chip__remove fa-icon {
      font-size: 0.75rem;
    }

    /* Sizes */
    .ds-entity-chip--sm {
      padding: var(--space-0-5, 0.125rem) var(--space-1-5, 0.375rem);
      font-size: var(--font-size-xs, 0.75rem);
      gap: var(--space-0-5, 0.125rem);
      max-width: 150px;
    }

    .ds-entity-chip--sm .ds-entity-chip__remove {
      padding: 0.0625rem;
    }

    .ds-entity-chip--sm .ds-entity-chip__remove fa-icon {
      font-size: 0.625rem;
    }

    .ds-entity-chip--lg {
      padding: var(--space-1-5, 0.375rem) var(--space-3, 0.75rem);
      font-size: var(--font-size-base, 1rem);
      gap: var(--space-2, 0.5rem);
      max-width: 250px;
    }

    .ds-entity-chip--lg .ds-entity-chip__remove fa-icon {
      font-size: 0.875rem;
    }

    /* Disabled */
    .ds-entity-chip--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsEntityChip {
  /** Option à afficher */
  readonly option = input.required<DsEntityOption>();

  /** Taille du chip */
  readonly size = input<DsEntityPickerSize>('md');

  /** Afficher le bouton de suppression */
  readonly removable = input<boolean>(true);

  /** Chip désactivé */
  readonly disabled = input<boolean>(false);

  /** Événement de suppression */
  readonly removed = output<DsEntityOption>();

  /** Icône de fermeture */
  readonly closeIcon: IconDefinition = faXmark;

  /** Couleur du chip (depuis l'option ou fallback) */
  readonly chipColor = computed(() => {
    return this.option().color || 'var(--gray-400)';
  });

  /** Couleur de fond (10% opacity) */
  readonly backgroundColor = computed(() => {
    const color = this.option().color;
    if (!color) {
      return 'var(--gray-100)';
    }
    // Utilise color-mix pour créer une version transparente
    return `color-mix(in srgb, ${color} 12%, transparent)`;
  });

  /** Gestion du clic sur le bouton supprimer */
  handleRemove(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    if (this.disabled()) {
      return;
    }

    this.removed.emit(this.option());
  }

  /** Gestion du clavier */
  handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    if (this.removable() && (event.key === 'Delete' || event.key === 'Backspace')) {
      event.preventDefault();
      this.removed.emit(this.option());
    }
  }
}
