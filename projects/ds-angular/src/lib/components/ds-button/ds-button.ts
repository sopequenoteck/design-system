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
  /** Variante visuelle appliquée au bouton. */
  variant = input<ButtonVariant>('primary');
  /** Apparence du bouton (plein ou outline). */
  appearance = input<ButtonAppearance>('solid');
  /** Taille du bouton. */
  size = input<ButtonSize>('md');
  /** Définit le type submit pour les formulaires. */
  submit = input<boolean>(false);
  /** Désactive le bouton. */
  disabled = input<boolean>(false);
  /** Icône affichée à gauche du libellé. */
  iconStart = input<IconDefinition | null>(null);
  /** Icône affichée à droite du libellé. */
  iconEnd = input<IconDefinition | null>(null);

  // Props spécifiques DS
  /** Active l'état de chargement avec spinner et désactive le clic. */
  loading = input<boolean>(false);
  /** Étend le bouton sur toute la largeur du conteneur. */
  block = input<boolean>(false);

  // Events
  /** Émis lorsque l'utilisateur clique sur le bouton actif. */
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
