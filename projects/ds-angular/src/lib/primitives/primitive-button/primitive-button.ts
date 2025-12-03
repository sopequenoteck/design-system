import { Component, HostBinding, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'success' | 'warning' | 'error' | 'info';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonAppearance = 'solid' | 'outline';

@Component({
  selector: 'primitive-button',
  imports: [CommonModule, FaIconComponent],
  templateUrl: './primitive-button.html',
  styleUrl: './primitive-button.scss',
})
export class PrimitiveButton {
  // Props
  type = input<ButtonType>('button');
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  disabled = input<boolean>(false);
  iconStart = input<IconDefinition | null>(null);
  iconEnd = input<IconDefinition | null>(null);
  appearance = input<ButtonAppearance>('solid');
  block = input<boolean>(false);

  @HostBinding('class.block')
  get hostBlock(): boolean {
    return this.block();
  }

  // Events
  clicked = output<void>();

  get buttonClasses(): string {
    const classes: string[] = [this.variant(), this.size()];
    if (this.appearance() === 'outline') {
      classes.push('outline');
    }
    if (this.block()) {
      classes.push('block');
    }
    return classes.filter(Boolean).join(' ');
  }

  handleClick(): void {
    if (!this.disabled()) {
      this.clicked.emit();
    }
  }
}
