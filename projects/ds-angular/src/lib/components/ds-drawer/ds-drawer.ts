import {
  Component,
  input,
  output,
  computed,
  signal,
  effect,
  inject,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';

/**
 * Position du drawer (gauche ou droite).
 */
export type DrawerPosition = 'left' | 'right';

/**
 * Tailles disponibles pour le drawer.
 */
export type DrawerSize = 'sm' | 'md' | 'lg' | 'full';

/**
 * # DsDrawer
 *
 * Composant de panneau latéral overlay avec animation slide-in/out.
 * Utilise CDK Overlay pour le backdrop et le focus trap.
 *
 * ## Usage
 *
 * ```html
 * <ds-drawer
 *   [(visible)]="isDrawerOpen"
 *   position="right"
 *   size="md"
 *   title="Détails"
 *   [closable]="true"
 *   (closed)="onDrawerClose()">
 *   <!-- Header -->
 *   <ng-template #header>
 *     <h3>Mon en-tête personnalisé</h3>
 *   </ng-template>
 *
 *   <!-- Body -->
 *   <p>Contenu du drawer</p>
 *
 *   <!-- Footer -->
 *   <ng-template #footer>
 *     <button>Annuler</button>
 *     <button>Valider</button>
 *   </ng-template>
 * </ds-drawer>
 * ```
 *
 * ## Accessibilité
 *
 * - Focus trap : le focus reste dans le drawer
 * - Navigation clavier : Escape pour fermer
 * - Attributs ARIA : role, aria-labelledby, aria-modal
 *
 * @component
 */
@Component({
  selector: 'ds-drawer',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './ds-drawer.html',
  styleUrl: './ds-drawer.scss',
})
export class DsDrawer implements AfterViewInit, OnDestroy {
  /**
   * Visibilité du drawer.
   * @default false
   */
  visible = input<boolean>(false);

  /**
   * Position du drawer (left/right).
   * @default 'right'
   */
  position = input<DrawerPosition>('right');

  /**
   * Taille du drawer.
   * @default 'md'
   */
  size = input<DrawerSize>('md');

  /**
   * Titre affiché dans le header (optionnel).
   */
  title = input<string>('');

  /**
   * Affiche le bouton de fermeture.
   * @default true
   */
  closable = input<boolean>(true);

  /**
   * Ferme le drawer au clic sur le backdrop.
   * @default true
   */
  maskClosable = input<boolean>(true);

  /**
   * Émis lorsque la visibilité change.
   */
  visibleChange = output<boolean>();

  /**
   * Émis lorsque le drawer est fermé.
   */
  closed = output<void>();

  /**
   * Référence au conteneur du drawer.
   */
  @ViewChild('drawerContainer') drawerContainer?: ElementRef<HTMLElement>;

  /**
   * État interne de visibilité pour gérer l'animation.
   */
  protected isOpen = signal<boolean>(false);
  protected isAnimating = signal<boolean>(false);

  /**
   * Indique si la vue est prête.
   */
  private viewReady = signal<boolean>(false);

  /**
   * Focus trap pour confiner la navigation clavier.
   */
  private focusTrap: FocusTrap | null = null;

  /**
   * Services injectés.
   */
  private readonly documentRef = inject(DOCUMENT);
  private readonly focusTrapFactory = inject(FocusTrapFactory);

  /**
   * Icône de fermeture.
   */
  protected readonly closeIcon = faTimes;

  /**
   * ID unique pour l'accessibilité.
   */
  private readonly drawerId = crypto.randomUUID();
  readonly drawerTitleId = `drawer-${this.drawerId}-title`;

  /**
   * Classes CSS calculées pour le conteneur.
   */
  readonly containerClasses = computed(() => {
    return [
      'ds-drawer',
      `ds-drawer--${this.position()}`,
      `ds-drawer--${this.size()}`,
      this.isOpen() ? 'ds-drawer--open' : '',
    ].filter(Boolean).join(' ');
  });

  /**
   * Classes CSS calculées pour le backdrop.
   */
  readonly backdropClasses = computed(() => {
    return [
      'ds-drawer__backdrop',
      this.isOpen() ? 'ds-drawer__backdrop--visible' : '',
    ].filter(Boolean).join(' ');
  });

  constructor() {
    // Effet pour synchroniser l'état visible avec l'animation
    effect(() => {
      if (!this.viewReady()) return;

      if (this.visible()) {
        this.openDrawer();
      } else {
        this.closeDrawer();
      }
    });
  }

  ngAfterViewInit(): void {
    this.viewReady.set(true);
  }

  ngOnDestroy(): void {
    this.detachFocusTrap();
  }

  /**
   * Ouvre le drawer avec animation.
   */
  private openDrawer(): void {
    this.isAnimating.set(true);
    this.isOpen.set(true);

    // Empêche le scroll du body
    this.documentRef.body.style.overflow = 'hidden';

    // Attache le focus trap après l'animation
    setTimeout(() => {
      this.attachFocusTrap();
      this.focusInitialElement();
      this.isAnimating.set(false);
    }, 300);
  }

  /**
   * Ferme le drawer avec animation.
   */
  private closeDrawer(): void {
    this.isAnimating.set(true);
    this.detachFocusTrap();

    setTimeout(() => {
      this.isOpen.set(false);
      this.isAnimating.set(false);

      // Restaure le scroll du body
      this.documentRef.body.style.overflow = '';

      this.closed.emit();
    }, 300);
  }

  /**
   * Gère la fermeture du drawer.
   */
  handleClose(): void {
    if (!this.closable()) return;

    this.visibleChange.emit(false);
  }

  /**
   * Gère le clic sur le backdrop.
   */
  handleBackdropClick(): void {
    if (!this.maskClosable()) return;

    this.handleClose();
  }

  /**
   * Gère la touche Escape.
   */
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.closable()) {
      event.preventDefault();
      this.handleClose();
    }
  }

  /**
   * Attache le focus trap.
   */
  private attachFocusTrap(): void {
    if (this.focusTrap || !this.drawerContainer) return;

    const element = this.drawerContainer.nativeElement;
    this.focusTrap = this.focusTrapFactory.create(element);
    this.focusTrap.attachAnchors();
  }

  /**
   * Détache le focus trap.
   */
  private detachFocusTrap(): void {
    if (this.focusTrap) {
      this.focusTrap.destroy();
      this.focusTrap = null;
    }
  }

  /**
   * Place le focus sur le premier élément focusable.
   */
  private focusInitialElement(): void {
    if (!this.drawerContainer) return;

    const firstFocusable = this.drawerContainer.nativeElement.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (firstFocusable) {
      firstFocusable.focus();
    }
  }
}
