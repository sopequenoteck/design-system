import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { generateId } from '../../utils/id-generator';

/**
 * Composant popover du Design System.
 *
 * Affiche un contenu contextuel dans une fenêtre flottante avec header/footer optionnels.
 * Utilisé conjointement avec la directive `dsPopover` pour le positionnement.
 *
 * @example
 * ```html
 * <ng-template #popoverContent>
 *   <ds-popover header="Mon titre" [closeable]="true" (close)="onClose()">
 *     <p>Contenu du popover</p>
 *   </ds-popover>
 * </ng-template>
 *
 * <button [dsPopover]="popoverContent">Ouvrir</button>
 * ```
 *
 * @usageNotes
 * ### Accessibilité
 * - `role="dialog"` avec `aria-modal="true"` pour les lecteurs d'écran
 * - `aria-labelledby` pointe vers le header quand présent
 * - Bouton de fermeture avec label descriptif
 * - Fermeture via Escape gérée par la directive
 */
@Component({
  selector: 'ds-popover',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="ds-popover"
      role="dialog"
      aria-modal="true"
      [attr.aria-label]="!header() ? ariaLabel() : null"
      [attr.aria-labelledby]="header() ? headerId() : null">
      @if (header()) {
        <div class="ds-popover__header">
          <span class="ds-popover__header-title" [id]="headerId()">{{ header() }}</span>
          @if (closeable()) {
            <button
              type="button"
              class="ds-popover__close"
              (click)="close.emit()"
              [attr.aria-label]="closeButtonLabel()">
              <i class="fa-solid fa-xmark"></i>
            </button>
          }
        </div>
      }

      <div class="ds-popover__body">
        <ng-content></ng-content>
      </div>

      @if (footer()) {
        <div class="ds-popover__footer">
          {{ footer() }}
        </div>
      }
    </div>
  `,
  styleUrl: './ds-popover.component.scss',
})
export class DsPopoverComponent {
  // ============================================
  // INPUTS
  // ============================================

  /**
   * Titre affiché dans le header du popover.
   * Quand présent, active `aria-labelledby` pour l'accessibilité.
   */
  header = input<string | undefined>(undefined);

  /**
   * Texte affiché dans le footer du popover.
   */
  footer = input<string | undefined>(undefined);

  /**
   * Affiche ou masque le bouton de fermeture dans le header.
   * @default true
   */
  closeable = input<boolean>(true);

  /**
   * Label ARIA du popover (utilisé quand pas de header).
   * @default 'Popover'
   */
  ariaLabel = input<string>('Popover');

  /**
   * ID unique pour le popover (génération automatique si non fourni).
   */
  id = input<string>(`ds-popover-${generateId()}`);

  // ============================================
  // OUTPUTS
  // ============================================

  /**
   * Émis quand l'utilisateur clique sur le bouton de fermeture.
   */
  close = output<void>();

  // ============================================
  // COMPUTED
  // ============================================

  /**
   * ID du header pour aria-labelledby.
   */
  protected readonly headerId = computed(() => `${this.id()}-header`);

  /**
   * Label du bouton de fermeture (dynamique selon le header).
   */
  protected readonly closeButtonLabel = computed(() =>
    this.header() ? `Fermer ${this.header()}` : 'Fermer le popover'
  );
}
