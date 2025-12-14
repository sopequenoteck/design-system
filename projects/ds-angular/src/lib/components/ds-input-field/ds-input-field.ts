import { Component, forwardRef, input, signal, computed, effect } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faClose, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {
  PrimitiveInput,
  InputType,
  InputState,
  InputSize,
  InputAppearance,
} from '../../primitives/primitive-input/primitive-input';
import { generateId } from '../../utils/id-generator';

@Component({
  selector: 'ds-input-field',
  imports: [CommonModule, FormsModule, FaIconComponent, PrimitiveInput],
  templateUrl: './ds-input-field.html',
  styleUrl: './ds-input-field.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsInputField),
      multi: true,
    },
  ],
})
export class DsInputField implements ControlValueAccessor {
  // Props de base
  id = input<string>(generateId());
  label = input<string | undefined>(undefined);
  name = input<string | undefined>(undefined);
  autocomplete = input<string | undefined>(undefined);
  ariaLabel = input<string | undefined>(undefined);
  placeholder = input<string>('');
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  required = input<boolean>(false);
  type = input<InputType>('text');
  size = input<InputSize>('md');
  state = input<InputState>('default');
  variant = input<InputAppearance>('default');
  iconStart = input<IconDefinition | null>(null);
  iconEnd = input<IconDefinition | null>(null);
  externalValue = input<string | null | undefined>(undefined);

  // Props DS spécifiques
  error = input<string | undefined>(undefined);
  helper = input<string | undefined>(undefined);
  maxlength = input<number | undefined>(undefined);
  clearable = input<boolean>(false);
  togglePassword = input<boolean>(false);

  // Icons
  protected readonly faEye = faEye;
  protected readonly faEyeSlash = faEyeSlash;
  protected readonly faClose = faClose;

  // Internal state
  private readonly disabledState = signal<boolean>(false);
  private readonly hasExternalValue = signal<boolean>(false);
  readonly internalValue = signal<string>('');
  readonly passwordVisible = signal<boolean>(false);

  constructor() {
    effect(() => {
      const provided = this.externalValue();
      if (provided === undefined) {
        return;
      }
      if (this.hasExternalValue()) {
        return;
      }
      this.internalValue.set(provided ?? '');
    });
  }

  readonly isDisabled = computed<boolean>(() => this.disabled() || this.disabledState());

  readonly errorId = computed<string | undefined>(() => (this.error() ? `${this.id()}-error` : undefined));
  readonly helperId = computed<string | undefined>(() => (this.helper() ? `${this.id()}-helper` : undefined));
  readonly counterId = computed<string | undefined>(() => (this.maxlength() ? `${this.id()}-counter` : undefined));
  readonly ariaDescribedBy = computed<string | undefined>(() => {
    const refs = [this.errorId(), this.helperId(), this.counterId()].filter(Boolean) as string[];
    return refs.length ? refs.join(' ') : undefined;
  });

  readonly inputState = computed<InputState>(() => {
    if (this.error()) {
      return 'error';
    }
    return this.state();
  });

  readonly actualType = computed<InputType>(() => {
    const baseType = this.type();
    if (baseType === 'password' && this.passwordVisible()) {
      return 'text';
    }
    return baseType;
  });

  readonly showClearButton = computed<boolean>(() => {
    return this.clearable() && !this.isDisabled() && !this.readonly() && this.internalValue().length > 0;
  });

  readonly showTogglePassword = computed<boolean>(() => {
    return this.togglePassword() && this.type() === 'password';
  });

  readonly characterCount = computed<number>(() => this.internalValue().length);

  // ControlValueAccessor
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this.hasExternalValue.set(true);
    this.internalValue.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledState.set(isDisabled);
  }

  // Event handlers
  onPrimitiveValueChange(newValue: string): void {
    if (this.isDisabled()) {
      return;
    }
    this.hasExternalValue.set(true);
    this.internalValue.set(newValue);
    this.onChange(newValue);
  }

  onInputBlur(): void {
    this.onTouched();
  }

  clearValue(): void {
    if (!this.showClearButton()) {
      return;
    }
    this.hasExternalValue.set(true);
    this.internalValue.set('');
    this.onChange('');
    this.onTouched();
  }

  togglePasswordVisibility(): void {
    if (this.isDisabled()) {
      return;
    }
    this.passwordVisible.update(v => !v);
  }
}
