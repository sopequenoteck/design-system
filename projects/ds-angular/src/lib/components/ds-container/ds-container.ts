import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ContainerMaxWidth = 'fluid' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ContainerGutter = 'none' | 'sm' | 'md' | 'lg';

/**
 * DsContainer - Composant de layout responsive
 *
 * @description
 * Conteneur responsive avec max-width configurable, centrage automatique
 * et gutters (padding horizontal) adaptatifs.
 *
 * @example
 * ```html
 * <ds-container maxWidth="lg" gutter="md">
 *   <p>Contenu centré avec max-width 960px</p>
 * </ds-container>
 * ```
 */
@Component({
  selector: 'ds-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="containerClasses()" [style]="containerStyle()">
      <ng-content />
    </div>
  `,
  styleUrls: ['./ds-container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsContainer {
  /**
   * Largeur maximale du conteneur
   * - fluid: 100% (pas de max-width)
   * - sm: 540px
   * - md: 720px
   * - lg: 960px
   * - xl: 1140px
   * - 2xl: 1320px
   */
  readonly maxWidth = input<ContainerMaxWidth>('lg');

  /**
   * Centrer le conteneur horizontalement
   */
  readonly center = input<boolean>(true);

  /**
   * Padding horizontal (gutter)
   * - none: 0
   * - sm: 16px
   * - md: 24px
   * - lg: 32px
   */
  readonly gutter = input<ContainerGutter>('md');

  /**
   * Padding vertical
   * - none: 0
   * - sm: 16px
   * - md: 24px
   * - lg: 32px
   */
  readonly paddingY = input<ContainerGutter>('none');

  /**
   * Classe CSS additionnelle
   */
  readonly customClass = input<string>('');

  readonly containerClasses = computed(() => {
    const classes = ['ds-container'];
    classes.push(`ds-container--${this.maxWidth()}`);
    classes.push(`ds-container--gutter-${this.gutter()}`);
    classes.push(`ds-container--padding-y-${this.paddingY()}`);

    if (this.center()) {
      classes.push('ds-container--center');
    }

    if (this.customClass()) {
      classes.push(this.customClass());
    }

    return classes.join(' ');
  });

  readonly containerStyle = computed(() => {
    const maxWidthValues: Record<ContainerMaxWidth, string> = {
      fluid: '100%',
      sm: '540px',
      md: '720px',
      lg: '960px',
      xl: '1140px',
      '2xl': '1320px',
    };

    return {
      '--container-max-width': maxWidthValues[this.maxWidth()],
    };
  });
}
