import { Component, forwardRef, input, signal, computed } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PrimitiveToggle, ToggleSize } from '../../primitives/primitive-toggle/primitive-toggle';
import { generateId } from '../../utils/id-generator';

/**
 * DS Toggle (Switch)
 *
 * Composant toggle/switch du design system avec ControlValueAccessor pour formulaires réactifs.
 * Encapsule primitive-toggle avec gestion label inline, helper et validation visuelle.
 *
 * @example
 * // Formulaire réactif
 * <ds-toggle
 *   formControlName="notifications"
 *   label="Activer les notifications"
 *   helper="Vous recevrez des alertes email"
 * />
 *
 * @example
 * // Template-driven
 * <ds-toggle
 *   [(ngModel)]="notificationsEnabled"
 *   label="Notifications"
 *   labelPosition="left"
 * />
 */
@Component({
  selector: 'ds-toggle',
  standalone: true,
  imports: [CommonModule, PrimitiveToggle],
  templateUrl: './ds-toggle.html',
  styleUrl: './ds-toggle.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsToggle),
      multi: true,
    },
  ],
})
export class DsToggle implements ControlValueAccessor {
  /**
   * ID unique du toggle (généré automatiquement)
   */
  id = input<string>(`ds-toggle-${generateId()}`);

  /**
   * Label affiché à côté du toggle
   */
  label = input<string>('');

  /**
   * Position du label (left, right)
   */
  labelPosition = input<'left' | 'right'>('right');

  /**
   * Texte d'aide affiché sous le toggle
   */
  helper = input<string | undefined>(undefined);

  /**
   * État désactivé du toggle
   */
  disabled = input<boolean>(false);

  /**
   * Taille du toggle (sm, md, lg)
   */
  size = input<ToggleSize>('md');

  /**
   * Nom du contrôle (pour formulaires)
   */
  name = input<string | undefined>(undefined);

  // Internal state
  private readonly disabledState = signal<boolean>(false);
  protected readonly internalValue = signal<boolean>(false);

  // Computed properties
  protected readonly isDisabled = computed<boolean>(() => this.disabled() || this.disabledState());

  protected readonly helperId = computed<string | undefined>(() =>
    this.helper() ? `${this.id()}-helper` : undefined
  );

  // ControlValueAccessor implementation
  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: boolean | null): void {
    this.internalValue.set(value ?? false);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledState.set(isDisabled);
  }

  // Event handlers
  protected onCheckedChange(checked: boolean): void {
    if (this.isDisabled()) {
      return;
    }
    this.internalValue.set(checked);
    this.onChange(checked);
    this.onTouched();
  }
}
