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

export type PopoverTrigger = 'click' | 'hover';

@Directive({
  selector: '[dsPopover]',
  standalone: true,
})
export class DsPopover implements OnDestroy {
  dsPopover = input.required<TemplateRef<unknown>>();
  dsPopoverTrigger = input<PopoverTrigger>('click');
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
