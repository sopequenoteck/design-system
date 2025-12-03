import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type BadgeType = 'status' | 'count' | 'label';
export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'default' | 'accent';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeShape = 'rounded' | 'pill';
export type BadgeAppearance = 'solid' | 'outline';

@Component({
  selector: 'primitive-badge',
  imports: [CommonModule, FaIconComponent],
  templateUrl: './primitive-badge.html',
  styleUrl: './primitive-badge.scss',
})
export class PrimitiveBadge {
  // Props
  type = input<BadgeType>('label');
  variant = input<BadgeVariant>('primary');
  size = input<BadgeSize>('md');
  shape = input<BadgeShape>('rounded');
  appearance = input<BadgeAppearance>('solid');
  iconStart = input<IconDefinition | null>(null);
  iconEnd = input<IconDefinition | null>(null);
  customStyles = input<Record<string, string> | null>(null);

  get badgeClasses(): string {
    const classes: string[] = [this.variant(), this.size(), this.shape()];
    if (this.appearance() === 'outline') {
      classes.push('outline');
    }
    return classes.filter(Boolean).join(' ');
  }

  get styleOverrides(): Record<string, string> | null {
    return this.customStyles();
  }
}
