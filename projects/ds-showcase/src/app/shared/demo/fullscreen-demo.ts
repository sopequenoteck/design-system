import {
  Component,
  input,
  output,
  signal,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { ThemeSwitcher } from '../theme/theme-switcher';

@Component({
  selector: 'doc-fullscreen-demo',
  standalone: true,
  imports: [ThemeSwitcher],
  template: `
    @if (isOpen()) {
      <div
        class="fullscreen-demo"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="'Démo ' + title() + ' en plein écran'"
      >
        <!-- Header -->
        <header class="fullscreen-demo__header">
          <h2 class="fullscreen-demo__title">{{ title() }}</h2>
          <div class="fullscreen-demo__actions">
            <doc-theme-switcher />
            <button
              type="button"
              class="fullscreen-demo__close"
              aria-label="Fermer le plein écran"
              (click)="close()"
            >
              ✕
            </button>
          </div>
        </header>

        <!-- Content -->
        <main class="fullscreen-demo__content">
          <ng-content />
        </main>
      </div>
    }
  `,
  styles: [`
    .fullscreen-demo {
      position: fixed;
      inset: 0;
      z-index: 9998;
      background: var(--background-main, #ffffff);
      display: flex;
      flex-direction: column;
      animation: fullscreenFadeIn 0.2s ease;
    }

    @keyframes fullscreenFadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .fullscreen-demo__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 24px;
      border-bottom: 1px solid var(--border-default, #e5e7eb);
      background: var(--background-panel, #ffffff);
    }

    .fullscreen-demo__title {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-default, #1a1a1a);
    }

    .fullscreen-demo__actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .fullscreen-demo__close {
      width: 40px;
      height: 40px;
      padding: 0;
      border: none;
      border-radius: var(--radius-2, 8px);
      background: var(--background-secondary, #f3f4f6);
      color: var(--text-default, #1a1a1a);
      font-size: 1.25rem;
      cursor: pointer;
      transition: all 0.15s ease;

      &:hover {
        background: var(--background-main, #e5e7eb);
      }

      &:focus-visible {
        outline: 2px solid var(--color-primary, #3b82f6);
        outline-offset: 2px;
      }
    }

    .fullscreen-demo__content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px;
      overflow: auto;
    }
  `],
})
export class FullscreenDemo implements OnDestroy {
  /** Titre de la démo */
  title = input<string>('Preview');

  /** État ouvert/fermé */
  isOpen = signal(false);

  /** Événement de fermeture */
  closed = output<void>();

  /** Fermeture via Escape */
  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.isOpen()) {
      this.close();
    }
  }

  /** Ouvrir le fullscreen */
  open(): void {
    this.isOpen.set(true);
    document.body.classList.add('fullscreen-open');
  }

  /** Fermer le fullscreen */
  close(): void {
    this.isOpen.set(false);
    document.body.classList.remove('fullscreen-open');
    this.closed.emit();
  }

  ngOnDestroy(): void {
    document.body.classList.remove('fullscreen-open');
  }
}
