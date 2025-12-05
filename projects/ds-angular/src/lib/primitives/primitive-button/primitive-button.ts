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
  /** Type HTML du bouton (button, submit ou reset). */
  type = input<ButtonType>('button');
  /** Variante visuelle appliquée au bouton. */
  variant = input<ButtonVariant>('primary');
  /** Taille du bouton. */
  size = input<ButtonSize>('md');
  /** Indique si le bouton est désactivé. */
  disabled = input<boolean>(false);
  /** Icône affichée avant le texte. */
  iconStart = input<IconDefinition | null>(null);
  /** Icône affichée après le texte. */
  iconEnd = input<IconDefinition | null>(null);
  /** Apparence du bouton (plein ou outline). */
  appearance = input<ButtonAppearance>('solid');
  /** Affiche le bouton sur toute la largeur disponible. */
  block = input<boolean>(false);

  @HostBinding('class.block')
  get hostBlock(): boolean {
    return this.block();
  }

  // Events
  /** Émis lorsqu'un clic est effectué sur le bouton actif. */
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
