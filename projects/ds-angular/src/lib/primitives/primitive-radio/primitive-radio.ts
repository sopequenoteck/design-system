import {
  Component,
  input,
  output,
  model,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type RadioSize = 'sm' | 'md' | 'lg';

/**
 * Primitive Radio
 *
 * Composant de bouton radio primitive standalone conforme au design system.
 * Utilise les tokens de design system pour l'apparence.
 *
 * @example
 * <primitive-radio
 *   [checked]="true"
 *   [disabled]="false"
 *   [name]="'options'"
 *   [value]="'option1'"
 *   size="md"
 *   (checkedChange)="onRadioChange($event)"
 * />
 */
@Component({
  selector: 'primitive-radio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './primitive-radio.html',
  styleUrl: './primitive-radio.scss',
})
export class PrimitiveRadio {
  /**
   * État coché du radio
   */
  checked = model<boolean>(false);

  /**
   * État désactivé du radio
   */
  disabled = input<boolean>(false);

  /**
   * Taille du radio (sm, md, lg)
   */
  size = input<RadioSize>('md');

  /**
   * Label associé au radio (optionnel)
   */
  label = input<string>('');

  /**
   * Nom du groupe de radios (pour comportement exclusif)
   */
  name = input<string>('');

  /**
   * Valeur du radio (utile pour les groupes)
   */
  value = input<string>('');

  /**
   * ID unique pour accessibilité
   */
  radioId = input<string>(`radio-${Math.random().toString(36).slice(2, 11)}`);

  /**
   * Événement émis lors du changement d'état
   */
  checkedChange = output<boolean>();

  /**
   * État focus du radio
   */
  protected focused = signal<boolean>(false);

  /**
   * Classes CSS calculées
   */
  protected cssClasses = computed(() => ({
    'primitive-radio': true,
    [`primitive-radio--${this.size()}`]: true,
    'primitive-radio--checked': this.checked(),
    'primitive-radio--disabled': this.disabled(),
    'primitive-radio--focused': this.focused(),
  }));

  /**
   * Gère le changement d'état du radio
   */
  protected onSelect(): void {
    if (this.disabled() || this.checked()) return;

    this.checked.set(true);
    this.checkedChange.emit(true);
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
      this.onSelect();
    }
  }
}
