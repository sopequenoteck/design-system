import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AvatarShape = 'circle' | 'rounded' | 'square';
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'ds-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ds-avatar.html',
  styleUrls: ['./ds-avatar.scss'],
})
export class DsAvatar {
  /** URL de l'image avatar */
  readonly src = input<string | undefined>(undefined);

  /** Texte alternatif pour l'image */
  readonly alt = input<string>('');

  /** Nom complet pour générer les initiales */
  readonly name = input<string>('');

  /** Initiales personnalisées (priorité sur name) */
  readonly initials = input<string | undefined>(undefined);

  /** Forme de l'avatar */
  readonly shape = input<AvatarShape>('circle');

  /** Taille de l'avatar */
  readonly size = input<AvatarSize>('md');

  /** Générer automatiquement une couleur de fond à partir des initiales */
  readonly autoColor = input<boolean>(false);

  /** État interne pour l'erreur de chargement d'image */
  private readonly imageError = signal<boolean>(false);

  /** Indique si l'image doit être affichée */
  readonly showImage = computed(() => !!this.src() && !this.imageError());

  /** Initiales à afficher (générées ou fournies) */
  readonly displayInitials = computed(() => {
    const customInitials = this.initials();
    if (customInitials) {
      return customInitials.substring(0, 2).toUpperCase();
    }

    const name = this.name();
    if (!name) return '';

    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  });

  /** Classes CSS du conteneur */
  readonly containerClasses = computed(() => ({
    'ds-avatar': true,
    [`ds-avatar--${this.shape()}`]: true,
    [`ds-avatar--${this.size()}`]: true,
    'ds-avatar--has-image': this.showImage(),
    'ds-avatar--initials': !this.showImage(),
  }));

  /** Couleur de fond auto-générée */
  readonly generatedBgColor = computed(() => {
    // Ne pas appliquer de couleur si une image est affichée
    if (this.showImage()) return null;
    if (!this.autoColor()) return null;
    const initials = this.displayInitials();
    if (!initials) return null;

    // Algorithme de hash simple vers couleur HSL
    let hash = 0;
    for (let i = 0; i < initials.length; i++) {
      hash = initials.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 65%, 45%)`;
  });

  /** Label ARIA pour l'accessibilité */
  readonly ariaLabel = computed(() => {
    const alt = this.alt();
    if (alt) return alt;
    const name = this.name();
    if (name) return `Avatar de ${name}`;
    return 'Avatar';
  });

  /** Gestionnaire d'erreur de chargement d'image */
  onImageError(): void {
    this.imageError.set(true);
  }

  /** Gestionnaire de chargement réussi d'image */
  onImageLoad(): void {
    this.imageError.set(false);
  }
}
