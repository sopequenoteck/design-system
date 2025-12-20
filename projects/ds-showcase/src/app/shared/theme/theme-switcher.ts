import { Component, inject } from '@angular/core';
import { ThemeService, Theme } from '../../core/theme.service';
import { DocIcon, DocIconName } from '../icon/doc-icon';
import { DsTooltip } from 'ds-angular';

@Component({
  selector: 'doc-theme-switcher',
  standalone: true,
  imports: [DocIcon, DsTooltip],
  template: `
    <div class="theme-switcher" role="radiogroup" aria-label="Sélection du thème">
      @for (theme of themes; track theme.value) {
        <button
          type="button"
          class="theme-switcher__btn"
          [class.active]="themeService.currentTheme() === theme.value"
          [attr.aria-pressed]="themeService.currentTheme() === theme.value"
          [dsTooltip]="theme.label"
          (click)="themeService.setTheme(theme.value)"
        >
          <doc-icon [name]="theme.icon" size="sm" />
          <span class="sr-only">{{ theme.label }}</span>
        </button>
      }
    </div>
  `,
  styles: [`
    .theme-switcher {
      display: inline-flex;
      gap: 2px;
      padding: var(--doc-space-xs, 4px);
      background: var(--doc-surface-elevated, #ffffff);
      border: 1px solid var(--doc-border-subtle, #f1f5f9);
      border-radius: var(--doc-radius-md, 10px);
    }

    .theme-switcher__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      padding: 0;
      border: none;
      border-radius: var(--doc-radius-sm, 6px);
      background: transparent;
      color: var(--doc-text-tertiary, #94a3b8);
      cursor: pointer;
      transition: all var(--doc-transition-fast, 150ms);

      &:hover:not(.active) {
        background: var(--doc-surface-sunken, #f1f5f9);
        color: var(--doc-text-secondary, #475569);
      }

      &.active {
        background: var(--doc-accent-primary-light, #eef2ff);
        color: var(--doc-accent-primary, #6366f1);
      }

      &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 2px var(--doc-accent-primary-light, #eef2ff),
                    0 0 0 4px var(--doc-accent-primary, #6366f1);
      }
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

  protected readonly themes: { value: Theme; label: string; icon: DocIconName }[] = [
    { value: 'light', label: 'Thème clair', icon: 'sun' },
    { value: 'dark', label: 'Thème sombre', icon: 'moon' },
    { value: 'custom', label: 'Thème personnalisé', icon: 'palette' },
  ];
}
