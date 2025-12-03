import {
  Component,
  input,
  output,
  model,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type ToggleSize = 'sm' | 'md' | 'lg';

/**
 * Primitive Toggle (Switch)
 *
 * Composant de bouton toggle/switch primitive standalone conforme au design system.
 * Utilise les tokens de design system pour l'apparence.
 *
 * @example
 * <primitive-toggle
 *   [checked]="false"
 *   [disabled]="false"
 *   size="md"
 *   (checkedChange)="onToggleChange($event)"
 * />
 */
@Component({
  selector: 'primitive-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './primitive-toggle.html',
  styleUrl: './primitive-toggle.scss',
})
export class PrimitiveToggle {
  /**
   * État activé du toggle
   */
  checked = model<boolean>(false);

  /**
   * État désactivé du toggle
   */
  disabled = input<boolean>(false);

  /**
   * Taille du toggle (sm, md, lg)
   */
  size = input<ToggleSize>('md');

  /**
   * Label associé au toggle (optionnel)
   */
  label = input<string>('');

  /**
   * Position du label (left, right)
   */
  labelPosition = input<'left' | 'right'>('right');

  /**
   * ID unique pour accessibilité
   */
  toggleId = input<string>(`toggle-${Math.random().toString(36).slice(2, 11)}`);

  /**
   * Événement émis lors du changement d'état
   */
  checkedChange = output<boolean>();

  /**
   * État focus du toggle
   */
  protected focused = signal<boolean>(false);

  /**
   * Classes CSS calculées
   */
  protected cssClasses = computed(() => ({
    'primitive-toggle': true,
    [`primitive-toggle--${this.size()}`]: true,
    [`primitive-toggle--label-${this.labelPosition()}`]: !!this.label(),
    'primitive-toggle--checked': this.checked(),
    'primitive-toggle--disabled': this.disabled(),
    'primitive-toggle--focused': this.focused(),
  }));

  /**
   * Gère le changement d'état du toggle
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
