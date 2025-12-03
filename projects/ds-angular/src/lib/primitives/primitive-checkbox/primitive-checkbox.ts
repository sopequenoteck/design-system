import {
  Component,
  input,
  output,
  model,
  signal,
  computed,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxState = 'unchecked' | 'checked' | 'indeterminate';

/**
 * Primitive Checkbox
 *
 * Composant de case à cocher primitive standalone conforme au design system.
 * Utilise les tokens de design system pour l'apparence et supporte trois états.
 *
 * @example
 * <primitive-checkbox
 *   [checked]="true"
 *   [disabled]="false"
 *   [indeterminate]="false"
 *   size="md"
 *   (checkedChange)="onCheckChange($event)"
 * />
 */
@Component({
  selector: 'primitive-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './primitive-checkbox.html',
  styleUrl: './primitive-checkbox.scss',
})
export class PrimitiveCheckbox {
  /**
   * État coché de la checkbox
   */
  checked = model<boolean>(false);

  /**
   * État indéterminé de la checkbox (prioritaire sur checked)
   */
  indeterminate = input<boolean>(false);

  /**
   * État désactivé de la checkbox
   */
  disabled = input<boolean>(false);

  /**
   * Taille de la checkbox (sm, md, lg)
   */
  size = input<CheckboxSize>('md');

  /**
   * Label associé à la checkbox (optionnel)
   */
  label = input<string>('');

  /**
   * ID unique pour accessibilité
   */
  checkboxId = input<string>(`checkbox-${Math.random().toString(36).slice(2, 11)}`);

  /**
   * Événement émis lors du changement d'état
   */
  checkedChange = output<boolean>();

  /**
   * État focus de la checkbox
   */
  protected focused = signal<boolean>(false);

  /**
   * État calculé de la checkbox
   */
  protected checkboxState = computed<CheckboxState>(() => {
    if (this.indeterminate()) return 'indeterminate';
    return this.checked() ? 'checked' : 'unchecked';
  });

  /**
   * Classes CSS calculées
   */
  protected cssClasses = computed(() => ({
    'primitive-checkbox': true,
    [`primitive-checkbox--${this.size()}`]: true,
    'primitive-checkbox--checked': this.checked(),
    'primitive-checkbox--indeterminate': this.indeterminate(),
    'primitive-checkbox--disabled': this.disabled(),
    'primitive-checkbox--focused': this.focused(),
  }));

  /**
   * Gère le changement d'état de la checkbox
   */
  protected onToggle(): void {
    if (this.disabled()) return;

    const newValue = !this.checked();
    this.checked.set(newValue);
    this.checkedChange.emit(newValue);
  }

  /**
   * Gère le focus
   */
  protected onFocus(): void {
    this.focused.set(true);
  }

  /**
   * Gère le blur
   */
  protected onBlur(): void {
    this.focused.set(false);
  }

  /**
   * Gère les événements clavier (Space, Enter)
   */
  protected onKeyDown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.onToggle();
    }
  }
}
