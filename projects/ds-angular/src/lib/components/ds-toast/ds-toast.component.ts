import {CommonModule} from '@angular/common';
import {Component, DestroyRef, computed, effect, inject, input, output, signal} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {IconDefinition, faCircleCheck, faCircleExclamation, faCircleInfo, faCircleXmark, faClose} from '@fortawesome/free-solid-svg-icons';
import {ToastPosition, ToastType} from './ds-toast.service';

@Component({
  selector: 'ds-toast',
  standalone: true,
  imports: [CommonModule, FaIconComponent],
  templateUrl: './ds-toast.component.html',
  styleUrl: './ds-toast.component.scss'
})
export class DsToastComponent {
  message = input.required<string>();
  type = input<ToastType>('info');
  duration = input<number>(3000);
  closable = input<boolean>(true);
  position = input<ToastPosition>('top-right');
  actionLabel = input<string | undefined>(undefined);
  pauseOnHover = input<boolean>(true);

  readonly closed = output<void>();
  readonly action = output<void>();

  private readonly destroyRef = inject(DestroyRef);
  private timerHandle: ReturnType<typeof setTimeout> | null = null;
  private readonly isPaused = signal<boolean>(false);

  private readonly icons: Record<ToastType, IconDefinition> = {
    success: faCircleCheck,
    warning: faCircleExclamation,
    error: faCircleXmark,
    info: faCircleInfo,
  };

  readonly currentIcon = computed(() => this.icons[this.type()]);

  private readonly autoDismissEffect = effect(() => {
    const duration = this.duration();
    const paused = this.isPaused();
    this.clearTimer();
    if (duration <= 0 || paused) {
      return;
    }
    this.timerHandle = setTimeout(() => this.close(), duration);
  });

  constructor() {
    this.destroyRef.onDestroy(() => this.clearTimer());
  }

  close(): void {
    this.clearTimer();
    this.closed.emit();
  }

  onMouseEnter(): void {
    if (!this.pauseOnHover()) {
      return;
    }
    this.isPaused.set(true);
    this.clearTimer();
  }

  onMouseLeave(): void {
    if (!this.pauseOnHover()) {
      return;
    }
    this.isPaused.set(false);
  }

  handleAction(): void {
    this.action.emit();
  }

  protected readonly faClose = faClose;

  private clearTimer(): void {
    if (this.timerHandle) {
      clearTimeout(this.timerHandle);
      this.timerHandle = null;
    }
  }
}
