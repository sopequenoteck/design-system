import { Component, input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { PrimitiveBadge, BadgeVariant, BadgeSize, BadgeShape } from '../../primitives/primitive-badge/primitive-badge';
import { CommonModule } from '@angular/common';

type DsBadgeVariantExtended = BadgeVariant | 'default' | 'accent';

@Component({
  selector: 'ds-badge',
  imports: [CommonModule, PrimitiveBadge],
  templateUrl: './ds-badge.html',
  styleUrl: './ds-badge.scss',
})
export class DsBadge {
  private static readonly supportedColorPattern = /^(#|rgba?\(|hsla?\(|var\()/i;

  // Props de base
  type = input<DsBadgeVariantExtended>('default');
  size = input<BadgeSize>('md');
  iconStart = input<IconDefinition | null>(null);
  iconEnd = input<IconDefinition | null>(null);

  // Props spécifiques DS
  variant = input<'solid' | 'outline'>('solid');
  shape = input<'default' | 'pill' | 'square'>('default');
  color = input<string | undefined>(undefined);

  get badgeVariant(): BadgeVariant {
    const type = this.type();
    if (type === 'default') return 'neutral';
    if (type === 'accent') return 'primary';
    return type as BadgeVariant;
  }

  get badgeShape(): BadgeShape {
    const shape = this.shape();
    if (shape === 'default' || shape === 'square') return 'rounded';
    return 'pill';
  }

  get styleOverrides(): Record<string, string> | null {
    const customColor = this.resolveCustomColor();
    if (!customColor) {
      return null;
    }

    if (this.variant() === 'outline') {
      return {
        borderColor: customColor,
        color: customColor,
        backgroundColor: 'transparent',
      };
    }

    return {
      backgroundColor: customColor,
      borderColor: customColor,
      color: 'var(--badge-text, #fff)',
    };
  }

  private resolveCustomColor(): string | null {
    const value = this.color()?.trim();
    if (!value) {
      return null;
    }

    if (!DsBadge.supportedColorPattern.test(value)) {
      return null;
    }

    return value;
  }
}
