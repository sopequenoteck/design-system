import { Component, input, output, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date';
export type InputState = 'default' | 'success' | 'warning' | 'error';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputAppearance = 'default' | 'outline' | 'ghost';

@Component({
  selector: 'primitive-input',
  imports: [CommonModule, FormsModule, FaIconComponent],
  templateUrl: './primitive-input.html',
  styleUrl: './primitive-input.scss',
})
export class PrimitiveInput {
  // Props
  id = input<string | undefined>(undefined);
  name = input<string | undefined>(undefined);
  autocomplete = input<string | undefined>(undefined);
  placeholder = input<string>('');
  type = input<InputType>('text');
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  required = input<boolean>(false);
  maxlength = input<number | undefined>(undefined);
  state = input<InputState>('default');
  size = input<InputSize>('md');
  appearance = input<InputAppearance>('default');
  iconStart = input<IconDefinition | null>(null);
  iconEnd = input<IconDefinition | null>(null);
  ariaLabel = input<string | undefined>(undefined);
  ariaDescribedBy = input<string | undefined>(undefined);

  // Two-way binding for value
  value = model<string>('');

  // Events
  inputChanged = output<string>();
  inputBlurred = output<void>();
  inputFocused = output<void>();

  get wrapperClasses(): string {
    const classes: string[] = [this.state(), this.size()];
    if (this.appearance() !== 'default') {
      classes.push(this.appearance());
    }
    if (this.disabled()) {
      classes.push('disabled');
    }
    if (this.readonly()) {
      classes.push('readonly');
    }
    if (this.iconStart()) {
      classes.push('has-icon-start');
    }
    if (this.iconEnd()) {
      classes.push('has-icon-end');
    }
    return classes.filter(Boolean).join(' ');
  }

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
    this.inputChanged.emit(target.value);
  }

  handleBlur(): void {
    this.inputBlurred.emit();
  }

  handleFocus(): void {
    this.inputFocused.emit();
  }
}
