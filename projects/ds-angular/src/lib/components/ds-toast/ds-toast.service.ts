import { DestroyRef, Injectable, inject, signal } from '@angular/core';

export type ToastType = 'success' | 'warning' | 'error' | 'info';
export type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
  closable?: boolean;
  position?: ToastPosition;
  actionLabel?: string;
  onAction?: () => void;
  pauseOnHover?: boolean;
  maxStack?: number;
}

export interface ToastInstance {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
  closable: boolean;
  position: ToastPosition;
  actionLabel?: string;
  onAction?: () => void;
  pauseOnHover: boolean;
}

const DEFAULT_DURATION = 3000;
const DEFAULT_POSITION: ToastPosition = 'top-right';
const DEFAULT_TYPE: ToastType = 'info';
const DEFAULT_MAX_STACK = 4;

@Injectable({ providedIn: 'root' })
export class DsToastService {
  private readonly toastsSignal = signal<ToastInstance[]>([]);
  private readonly timers = new Map<string, ReturnType<typeof setTimeout>>();
  private readonly defaultMaxStack = DEFAULT_MAX_STACK;
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.destroyRef.onDestroy(() => this.clearTimers());
  }

  readonly toasts = this.toastsSignal.asReadonly();

  show(options: ToastOptions): string {
    const id = crypto.randomUUID();
    const toast: ToastInstance = {
      id,
      message: options.message,
      type: options.type ?? DEFAULT_TYPE,
      duration: options.duration ?? DEFAULT_DURATION,
      closable: options.closable ?? true,
      position: options.position ?? DEFAULT_POSITION,
      actionLabel: options.actionLabel,
      onAction: options.onAction,
      pauseOnHover: options.pauseOnHover ?? true,
    };

    const maxStack = options.maxStack ?? this.defaultMaxStack;

    this.toastsSignal.update(list => {
      const next = [...list];
      if (maxStack > 0) {
        let sameCount = next.filter(item => item.position === toast.position).length;
        while (sameCount >= maxStack) {
          const index = next.findIndex(item => item.position === toast.position);
          if (index === -1) {
            break;
          }
          const removed = next.splice(index, 1)[0];
          this.clearTimer(removed.id);
          sameCount--;
        }
      }
      next.push(toast);
      return next;
    });

    if (toast.duration > 0) {
      const timer = setTimeout(() => this.dismiss(id), toast.duration);
      this.timers.set(id, timer);
    }

    return id;
  }

  dismiss(id: string): void {
    this.clearTimer(id);
    this.toastsSignal.update(list => list.filter(toast => toast.id !== id));
  }

  clear(position?: ToastPosition): void {
    if (!position) {
      this.toastsSignal().forEach(toast => this.clearTimer(toast.id));
      this.toastsSignal.set([]);
      return;
    }

    const remaining = this.toastsSignal().filter(toast => {
      const match = toast.position === position;
      if (match) {
        this.clearTimer(toast.id);
      }
      return !match;
    });
    this.toastsSignal.set(remaining);
  }

  triggerAction(id: string): void {
    const toast = this.toastsSignal().find(item => item.id === id);
    toast?.onAction?.();
    if (toast) {
      this.dismiss(id);
    }
  }

  private clearTimers(): void {
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers.clear();
  }

  private clearTimer(id: string): void {
    const timer = this.timers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(id);
    }
  }
}
