import { Component, forwardRef, input, signal, computed } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PrimitiveCheckbox, CheckboxSize } from '../../primitives/primitive-checkbox/primitive-checkbox';

/**
 * DS Checkbox
 *
 * Composant checkbox du design system avec ControlValueAccessor pour intégration formulaires réactifs.
 * Encapsule primitive-checkbox avec gestion label, helper, error et validation visuelle.
 *
 * @example
 * // Formulaire réactif
 * <ds-checkbox
 *   formControlName="acceptTerms"
 *   label="J'accepte les conditions d'utilisation"
 *   [required]="true"
 *   helper="Vous devez accepter pour continuer"
 * />
 *
 * @example
 * // Template-driven
 * <ds-checkbox
 *   [(ngModel)]="isAccepted"
 *   label="Activer les notifications"
 * />
 */
@Component({
  selector: 'ds-checkbox',
  standalone: true,
  imports: [CommonModule, PrimitiveCheckbox],
  templateUrl: './ds-checkbox.html',
  styleUrl: './ds-checkbox.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsCheckbox),
      multi: true,
    },
  ],
})
export class DsCheckbox implements ControlValueAccessor {
  /**
   * ID unique du checkbox (généré automatiquement)
   */
  id = input<string>(`ds-checkbox-${crypto.randomUUID()}`);

  /**
   * Label affiché à côté du checkbox
   */
  label = input<string>('');

  /**
   * Texte d'aide affiché sous le checkbox
   */
  helper = input<string | undefined>(undefined);

  /**
   * Message d'erreur affiché en rouge sous le checkbox
   */
  error = input<string | undefined>(undefined);

  /**
   * Indique si le champ est requis (affiche astérisque sur label)
   */
  required = input<boolean>(false);

  /**
   * État désactivé du checkbox
   */
  disabled = input<boolean>(false);

  /**
   * État indéterminé du checkbox (prioritaire sur checked)
   */
  indeterminate = input<boolean>(false);

  /**
   * Taille du checkbox (sm, md, lg)
   */
  size = input<CheckboxSize>('md');

  /**
   * Nom du contrôle (pour formulaires)
   */
  name = input<string | undefined>(undefined);

  // Internal state
  private readonly disabledState = signal<boolean>(false);
  protected readonly internalValue = signal<boolean>(false);

  // Computed properties
  protected readonly isDisabled = computed<boolean>(() => this.disabled() || this.disabledState());

  protected readonly errorId = computed<string | undefined>(() =>
    this.error() ? `${this.id()}-error` : undefined
  );

  protected readonly helperId = computed<string | undefined>(() =>
    this.helper() ? `${this.id()}-helper` : undefined
  );

  protected readonly ariaDescribedBy = computed<string | undefined>(() => {
    const refs = [this.errorId(), this.helperId()].filter(Boolean) as string[];
    return refs.length ? refs.join(' ') : undefined;
  });

  protected readonly hasError = computed<boolean>(() => !!this.error());

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
