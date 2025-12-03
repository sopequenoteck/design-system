import { Component, input, output } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { PrimitiveButton, ButtonVariant, ButtonSize, ButtonType, ButtonAppearance } from '../../primitives/primitive-button/primitive-button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-button',
  imports: [CommonModule, PrimitiveButton],
  templateUrl: './ds-button.html',
  styleUrl: './ds-button.scss',
})
export class DsButton {
  // Props de base (délégués à primitive-button)
  variant = input<ButtonVariant>('primary');
  appearance = input<ButtonAppearance>('solid');
  size = input<ButtonSize>('md');
  submit = input<boolean>(false);
  disabled = input<boolean>(false);
  iconStart = input<IconDefinition | null>(null);
  iconEnd = input<IconDefinition | null>(null);

  // Props spécifiques DS
  loading = input<boolean>(false);
  block = input<boolean>(false);

  // Events
  clicked = output<void>();

  get buttonType(): ButtonType {
    return this.submit() ? 'submit' : 'button';
  }

  get isDisabled(): boolean {
    return this.disabled() || this.loading();
  }

  handleClick(): void {
    if (!this.isDisabled) {
      this.clicked.emit();
    }
  }
}
