import { Component, inject } from '@angular/core';
import { ThemeService, Theme } from '../../core/theme.service';

@Component({
  selector: 'doc-theme-switcher',
  standalone: true,
  template: `
    <div class="theme-switcher">
      @for (theme of themes; track theme.value) {
        <button
          type="button"
          class="theme-switcher__btn"
          [class.active]="themeService.currentTheme() === theme.value"
          [attr.aria-pressed]="themeService.currentTheme() === theme.value"
          [attr.title]="theme.label"
          (click)="themeService.setTheme(theme.value)"
        >
          <span class="theme-switcher__icon">{{ theme.icon }}</span>
          <span class="sr-only">{{ theme.label }}</span>
        </button>
      }
    </div>
  `,
  styles: [`
    .theme-switcher {
      display: inline-flex;
      gap: 4px;
      padding: 4px;
      background: var(--background-secondary, #f0f0f0);
      border-radius: var(--radius-2, 8px);
    }

    .theme-switcher__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      padding: 0;
      border: none;
      border-radius: var(--radius-1, 4px);
      background: transparent;
      color: var(--text-muted, #6b7280);
      cursor: pointer;
      transition: all 0.15s ease;

      &:hover {
        background: var(--background-main, #ffffff);
        color: var(--text-default, #1a1a1a);
      }

      &.active {
        background: var(--background-main, #ffffff);
        color: var(--color-primary, #3b82f6);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
    }

    .theme-switcher__icon {
      font-size: 16px;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }
  `]
})
export class ThemeSwitcher {
  protected readonly themeService = inject(ThemeService);

  protected readonly themes: { value: Theme; label: string; icon: string }[] = [
    { value: 'light', label: 'Thème clair', icon: '☀️' },
    { value: 'dark', label: 'Thème sombre', icon: '🌙' },
    { value: 'custom', label: 'Thème personnalisé', icon: '🎨' },
  ];
}
