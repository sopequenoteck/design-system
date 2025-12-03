import { Component, input, output, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type TextareaState = 'default' | 'success' | 'warning' | 'error';
export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaAppearance = 'default' | 'outline' | 'ghost';
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

@Component({
  selector: 'primitive-textarea',
  imports: [CommonModule, FormsModule, FaIconComponent],
  templateUrl: './primitive-textarea.html',
  styleUrl: './primitive-textarea.scss',
})
export class PrimitiveTextarea {
  // Props
  id = input<string | undefined>(undefined);
  name = input<string | undefined>(undefined);
  placeholder = input<string>('');
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  required = input<boolean>(false);
  state = input<TextareaState>('default');
  size = input<TextareaSize>('md');
  appearance = input<TextareaAppearance>('default');
  resize = input<TextareaResize>('vertical');
  rows = input<number | undefined>(undefined);
  cols = input<number | undefined>(undefined);
  maxlength = input<number | undefined>(undefined);
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
    const target = event.target as HTMLTextAreaElement;
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
