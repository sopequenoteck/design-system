import {
  Directive,
  ElementRef,
  HostListener,
  input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Overlay, OverlayRef, ConnectedPosition } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { POPOVER_POSITIONS } from '../../utils/overlay-positions';

/**
 * Type de déclenchement du popover.
 * - `click` : ouverture au clic, fermeture au second clic ou clic extérieur
 * - `hover` : ouverture au survol, fermeture au mouseleave (avec délai de 150ms)
 */
export type PopoverTrigger = 'click' | 'hover';

/**
 * Directive pour afficher un popover flottant positionné automatiquement.
 *
 * Utilise Angular CDK Overlay pour le positionnement intelligent
 * et la gestion du backdrop/scroll.
 *
 * @example
 * ```html
 * <ng-template #popoverContent>
 *   <ds-popover header="Informations">
 *     <p>Contenu du popover</p>
 *   </ds-popover>
 * </ng-template>
 *
 * <button [dsPopover]="popoverContent">Ouvrir</button>
 * ```
 *
 * @example
 * ```html
 * <!-- Trigger hover -->
 * <button [dsPopover]="content" dsPopoverTrigger="hover">Survoler</button>
 *
 * <!-- Sans fermeture au clic extérieur -->
 * <button [dsPopover]="content" [dsPopoverCloseOnBackdrop]="false">Persistant</button>
 * ```
 *
 * @usageNotes
 * ### Accessibilité
 * - Fermeture via touche Escape
 * - Focus trap recommandé pour les popovers avec contenu interactif
 * - Utiliser `<ds-popover>` avec header pour un aria-labelledby automatique
 */
@Directive({
  selector: '[dsPopover]',
  standalone: true,
})
export class DsPopover implements OnDestroy {
  // ============================================
  // INPUTS
  // ============================================

  /**
   * Template contenant le contenu du popover.
   * Généralement un `<ng-template>` contenant un `<ds-popover>`.
   */
  dsPopover = input.required<TemplateRef<unknown>>();

  /**
   * Mode de déclenchement du popover.
   * - `click` (défaut) : clic pour ouvrir/fermer
   * - `hover` : survol pour ouvrir, mouseleave pour fermer
   * @default 'click'
   */
  dsPopoverTrigger = input<PopoverTrigger>('click');

  /**
   * Fermer le popover lors d'un clic sur le backdrop (zone extérieure).
   * Quand `false`, seul Escape ou un nouveau clic sur le trigger ferme le popover.
   * @default true
   */
  dsPopoverCloseOnBackdrop = input<boolean>(true);

  private overlayRef: OverlayRef | null = null;
  private isOpen = false;

  constructor(
    private elementRef: ElementRef,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {}

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    if (this.dsPopoverTrigger() === 'click') {
      event.stopPropagation();
      this.toggle();
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.dsPopoverTrigger() === 'hover') {
      this.open();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.dsPopoverTrigger() === 'hover') {
      setTimeout(() => this.close(), 150);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen) {
      this.close();
    }
  }

  private toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  private open(): void {
    if (this.isOpen || !this.dsPopover()) return;

    this.overlayRef = this.createOverlay();

    const portal = new TemplatePortal(this.dsPopover(), this.viewContainerRef);
    this.overlayRef.attach(portal);

    this.isOpen = true;

    if (this.dsPopoverCloseOnBackdrop()) {
      this.overlayRef.backdropClick().subscribe(() => this.close());
    }
  }

  private close(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
    this.isOpen = false;
  }

  private createOverlay(): OverlayRef {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions(POPOVER_POSITIONS as ConnectedPosition[]);

    const scrollStrategy = this.overlay.scrollStrategies.reposition();

    return this.overlay.create({
      positionStrategy,
      scrollStrategy,
      hasBackdrop: this.dsPopoverCloseOnBackdrop(),
      backdropClass: 'ds-popover-backdrop',
      panelClass: 'ds-popover-overlay',
    });
  }

  ngOnDestroy(): void {
    this.close();
  }
}
