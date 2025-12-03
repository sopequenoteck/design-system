import {
  Directive,
  ElementRef,
  HostListener,
  input,
  OnDestroy,
  ComponentRef,
  ViewContainerRef,
  Injector,
  EnvironmentInjector,
  createComponent,
} from '@angular/core';
import { Overlay, OverlayRef, ConnectedPosition } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DsTooltipComponent } from './ds-tooltip.component';
import { TOOLTIP_POSITIONS } from '../../utils/overlay-positions';

@Directive({
  selector: '[dsTooltip]',
  standalone: true,
})
export class DsTooltip implements OnDestroy {
  dsTooltip = input.required<string>();

  private overlayRef: OverlayRef | null = null;
  private tooltipComponentRef: ComponentRef<DsTooltipComponent> | null = null;
  private hideTimeout: number | null = null;

  constructor(
    private elementRef: ElementRef,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector,
    private environmentInjector: EnvironmentInjector
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.clearHideTimeout();
    if (!this.overlayRef) {
      this.show();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.hideWithDelay(150);
  }

  @HostListener('focus')
  onFocus(): void {
    this.clearHideTimeout();
    if (!this.overlayRef) {
      this.show();
    }
  }

  @HostListener('blur')
  onBlur(): void {
    this.hide();
  }

  private show(): void {
    const tooltipText = this.dsTooltip();
    if (!tooltipText || tooltipText.trim() === '') return;

    this.overlayRef = this.createOverlay();

    this.tooltipComponentRef = createComponent(DsTooltipComponent, {
      environmentInjector: this.environmentInjector,
      elementInjector: this.injector,
    });

    this.tooltipComponentRef.setInput('text', tooltipText);

    this.overlayRef.overlayElement.appendChild(this.tooltipComponentRef.location.nativeElement);
    this.tooltipComponentRef.changeDetectorRef.detectChanges();

    // Set aria-describedby on host element
    const tooltipId = `tooltip-${Math.random().toString(36).substring(2, 11)}`;
    this.elementRef.nativeElement.setAttribute('aria-describedby', tooltipId);
  }

  private hide(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }

    if (this.tooltipComponentRef) {
      this.tooltipComponentRef.destroy();
      this.tooltipComponentRef = null;
    }

    this.elementRef.nativeElement.removeAttribute('aria-describedby');
  }

  private hideWithDelay(delayMs: number): void {
    this.hideTimeout = window.setTimeout(() => {
      this.hide();
    }, delayMs);
  }

  private clearHideTimeout(): void {
    if (this.hideTimeout !== null) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }

  private createOverlay(): OverlayRef {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions(TOOLTIP_POSITIONS as ConnectedPosition[]);

    return this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
      panelClass: 'ds-tooltip-overlay',
    });
  }

  ngOnDestroy(): void {
    this.clearHideTimeout();
    this.hide();
  }
}
