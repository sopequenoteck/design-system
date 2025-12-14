import { Component, forwardRef, input, signal, computed } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PrimitiveRadio, RadioSize } from '../../primitives/primitive-radio/primitive-radio';
import { generateId } from '../../utils/id-generator';

/**
 * Option pour un groupe de radios
 */
export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

/**
 * Layout du groupe de radios
 */
export type RadioGroupLayout = 'vertical' | 'horizontal';

/**
 * DS Radio Group
 *
 * Composant groupe de radios du design system avec ControlValueAccessor pour formulaires réactifs.
 * Génère des primitive-radio pour chaque option avec gestion exclusive de la sélection.
 *
 * @example
 * // Formulaire réactif
 * <ds-radio-group
 *   formControlName="plan"
 *   label="Choisissez votre forfait"
 *   [options]="planOptions"
 *   layout="vertical"
 *   [required]="true"
 * />
 *
 * @example
 * // Template-driven
 * <ds-radio-group
 *   [(ngModel)]="selectedPlan"
 *   label="Forfait"
 *   [options]="[
 *     { label: 'Gratuit', value: 'free' },
 *     { label: 'Pro', value: 'pro' },
 *     { label: 'Enterprise', value: 'enterprise' }
 *   ]"
 * />
 */
@Component({
  selector: 'ds-radio-group',
  standalone: true,
  imports: [CommonModule, PrimitiveRadio],
  templateUrl: './ds-radio-group.html',
  styleUrl: './ds-radio-group.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsRadioGroup),
      multi: true,
    },
  ],
})
export class DsRadioGroup implements ControlValueAccessor {
  /**
   * ID unique du radio group (généré automatiquement)
   */
  id = input<string>(`ds-radio-group-${generateId()}`);

  /**
   * Label principal du groupe
   */
  label = input<string>('');

  /**
   * Options du groupe de radios
   */
  options = input<RadioOption[]>([]);

  /**
   * Texte d'aide affiché sous le groupe
   */
  helper = input<string | undefined>(undefined);

  /**
   * Message d'erreur affiché en rouge sous le groupe
   */
  error = input<string | undefined>(undefined);

  /**
   * Indique si le champ est requis (affiche astérisque sur label)
   */
  required = input<boolean>(false);

  /**
   * État désactivé du groupe (désactive toutes les options)
   */
  disabled = input<boolean>(false);

  /**
   * Taille des radios (sm, md, lg)
   */
  size = input<RadioSize>('md');

  /**
   * Layout du groupe (vertical, horizontal)
   */
  layout = input<RadioGroupLayout>('vertical');

  /**
   * Nom du groupe (pour formulaires, généré automatiquement)
   */
  name = input<string>(`radio-group-${generateId()}`);

  // Internal state
  private readonly disabledState = signal<boolean>(false);
  protected readonly internalValue = signal<string | null>(null);

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

  /**
   * Vérifie si une option est sélectionnée
   */
  protected isOptionSelected(value: string): boolean {
    return this.internalValue() === value;
  }

  /**
   * Vérifie si une option est désactivée
   */
  protected isOptionDisabled(option: RadioOption): boolean {
    return this.isDisabled() || !!option.disabled;
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
  protected onRadioChange(value: string): void {
    if (this.isDisabled()) {
      return;
    }
    this.internalValue.set(value);
    this.onChange(value);
    this.onTouched();
  }

  // Track function for @for
  protected trackByValue(_index: number, option: RadioOption): string {
    return option.value;
  }
}
