import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  Output,
  ViewChild,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import {NgClass} from '@angular/common';
import {IconDefinition, faCheckCircle, faExclamationTriangle, faInfoCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {FocusTrap, FocusTrapFactory} from '@angular/cdk/a11y';
import {PrimitiveButton} from '../../primitives/primitive-button/primitive-button';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'ds-modal',
  imports: [
    NgClass,
    FaIconComponent,
    PrimitiveButton
  ],
  templateUrl: './ds-modal.component.html',
  styleUrl: './ds-modal.component.scss'
})
export class DsModalComponent implements AfterContentInit, AfterViewInit, OnDestroy {
  open = input<boolean>(false);
  title = input<string>('');
  closable = input<boolean>(true);
  closeOnBackdrop = input<boolean>(true);
  showIcon = input<boolean>(false);
  type = input<'success' | 'warning' | 'error' | 'info' | null>(null);
  size = input<'sm' | 'md' | 'lg'>('md');

  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  @ContentChild('icon') projectedIcon: ElementRef | undefined;
  @ViewChild('modalContainer') modalContainer?: ElementRef<HTMLElement>;

  private readonly hasProjectedIcon = signal<boolean>(false);
  private readonly viewReady = signal<boolean>(false);
  private focusTrap: FocusTrap | null = null;
  private readonly documentRef = inject(DOCUMENT);
  private readonly focusTrapFactory = inject(FocusTrapFactory);

  readonly modalClasses = computed(() => {
    const classes: string[] = [];
    const currentType = this.type();
    if (currentType) {
      classes.push(`modal-${currentType}`);
    }
    classes.push(`modal-${this.size()}`);
    return classes;
  });

  @ViewChild('closeButton', { read: ElementRef }) closeButton?: ElementRef<HTMLElement>;

  readonly resolvedIcon = computed<IconDefinition | null>(() => {
    switch (this.type()) {
      case 'success':
        return faCheckCircle;
      case 'warning':
        return faExclamationTriangle;
      case 'error':
        return faTimesCircle;
      case 'info':
        return faInfoCircle;
      default:
        return null;
    }
  });

  readonly shouldRenderDefaultIcon = computed(() => this.showIcon() && !this.hasProjectedIcon() && !!this.resolvedIcon());
  readonly shouldRenderOverlay = computed(() => this.open());

  private readonly modalBaseId = crypto.randomUUID();
  readonly modalTitleId = `${this.modalBaseId}-title`;
  readonly modalDescId = `${this.modalBaseId}-desc`;

  readonly isScrolled = signal<boolean>(false);

  constructor() {
    effect(() => {
      if (!this.viewReady()) {
        return;
      }
      if (this.open()) {
        this.attachFocusTrap();
        queueMicrotask(() => this.focusInitialElement());
      } else {
        this.destroyFocusTrap();
      }
    });

    effect(() => {
      if (this.open()) {
        this.opened.emit();
        this.lockBodyScroll();
      } else {
        this.unlockBodyScroll();
      }
    });
  }

  ngAfterContentInit(): void {
    this.hasProjectedIcon.set(!!this.projectedIcon);
  }

  ngAfterViewInit(): void {
    this.viewReady.set(true);
    if (this.open()) {
      this.attachFocusTrap();
    }
  }

  ngOnDestroy(): void {
    this.destroyFocusTrap();
    this.unlockBodyScroll();
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: Event): void {
    if (this.open() && this.closable()) {
      event.preventDefault();
      this.close();
    }
  }

  close(): void {
    if (this.closable()) {
      this.closed.emit();
    }
  }

  onBackdropClick(): void {
    if (!this.open() || !this.closeOnBackdrop()) {
      return;
    }
    this.close();
  }

  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    this.isScrolled.set(target.scrollHeight > target.clientHeight &&
      target.scrollTop + target.clientHeight < target.scrollHeight);
  }

  private attachFocusTrap(): void {
    if (!this.modalContainer) {
      return;
    }
    this.focusTrap?.destroy();
    this.focusTrap = this.focusTrapFactory.create(this.modalContainer.nativeElement);
    this.focusTrap.focusInitialElementWhenReady().catch(() => { /* aucun élément focusable */ });
  }

  private destroyFocusTrap(): void {
    this.focusTrap?.destroy();
    this.focusTrap = null;
  }

  private focusInitialElement(): void {
    if (!this.open() || !this.closable() || !this.closeButton) {
      return;
    }
    const element = this.closeButton.nativeElement;
    queueMicrotask(() => element.focus());
  }

  private lockBodyScroll(): void {
    const body = this.documentRef?.body;
    if (!body) {
      return;
    }
    body.classList.add('modal-open');
  }

  private unlockBodyScroll(): void {
    const body = this.documentRef?.body;
    if (!body) {
      return;
    }
    body.classList.remove('modal-open');
  }
}
