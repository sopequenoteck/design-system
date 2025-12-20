import { Component, input, computed, signal } from '@angular/core';
import { DocIcon, DocIconName } from '../icon/doc-icon';
import { DsBadge, DsTooltip } from 'ds-angular';

export type ComponentCategory = 'actions' | 'forms' | 'navigation' | 'data-display' | 'feedback' | 'overlays' | 'layout' | 'primitives';
export type ComponentStatus = 'stable' | 'beta' | 'new' | 'deprecated' | 'experimental';

interface CategoryConfig {
  label: string;
  icon: DocIconName;
  color: string;
  bgColor: string;
}

type BadgeType = 'success' | 'warning' | 'error' | 'info' | 'primary' | 'neutral';

interface StatusConfig {
  label: string;
  badgeType: BadgeType;
  tooltip: string;
}

const CATEGORY_CONFIG: Record<ComponentCategory, CategoryConfig> = {
  'actions': { label: 'Actions', icon: 'zap', color: '#6366f1', bgColor: '#eef2ff' },
  'forms': { label: 'Forms', icon: 'forms', color: '#10b981', bgColor: '#ecfdf5' },
  'navigation': { label: 'Navigation', icon: 'navigation', color: '#f59e0b', bgColor: '#fffbeb' },
  'data-display': { label: 'Data Display', icon: 'data', color: '#3b82f6', bgColor: '#eff6ff' },
  'feedback': { label: 'Feedback', icon: 'feedback', color: '#ef4444', bgColor: '#fef2f2' },
  'overlays': { label: 'Overlays', icon: 'overlays', color: '#8b5cf6', bgColor: '#f5f3ff' },
  'layout': { label: 'Layout', icon: 'layout', color: '#64748b', bgColor: '#f8fafc' },
  'primitives': { label: 'Primitives', icon: 'primitives', color: '#0ea5e9', bgColor: '#f0f9ff' },
};

const STATUS_CONFIG: Record<ComponentStatus, StatusConfig> = {
  'stable': { label: 'Stable', badgeType: 'success', tooltip: 'Ce composant est stable et prêt pour la production' },
  'beta': { label: 'Beta', badgeType: 'warning', tooltip: 'Ce composant est en beta, son API peut changer' },
  'new': { label: 'New', badgeType: 'primary', tooltip: 'Nouveau composant ajouté récemment' },
  'deprecated': { label: 'Deprecated', badgeType: 'error', tooltip: 'Ce composant est déprécié et sera supprimé' },
  'experimental': { label: 'Experimental', badgeType: 'info', tooltip: 'Composant expérimental, utiliser avec prudence' },
};

@Component({
  selector: 'doc-component-page-header',
  standalone: true,
  imports: [DocIcon, DsBadge, DsTooltip],
  template: `
    <header class="page-header doc-animate-fade-in-up">
      <!-- Category & Status badges -->
      <div class="page-header__badges">
        <div class="page-header__category" [style.color]="categoryConfig().color" [style.background]="categoryConfig().bgColor">
          <doc-icon [name]="categoryConfig().icon" size="xs" />
          <span>{{ categoryConfig().label }}</span>
        </div>
        @if (status()) {
          <ds-badge
            size="sm"
            [type]="statusConfig()!.badgeType"
            shape="pill"
            [dsTooltip]="statusConfig()!.tooltip"
          >
            {{ statusConfig()!.label }}
          </ds-badge>
        }
      </div>

      <!-- Title with optional icon -->
      <h1 class="page-header__title">
        <span class="page-header__title-text">{{ name() }}</span>
        @if (status() === 'new') {
          <span class="page-header__sparkle">✨</span>
        }
      </h1>

      <!-- Description -->
      <p class="page-header__desc">{{ description() }}</p>

      <!-- Meta info: selector + version + links -->
      <div class="page-header__meta">
        <div class="page-header__selector-wrap">
          <code class="page-header__selector">&lt;{{ selector() }}&gt;</code>
          <button
            type="button"
            class="page-header__copy"
            [dsTooltip]="'Copier le sélecteur'"
            (click)="copySelector()"
          >
            <doc-icon [name]="selectorCopied() ? 'check' : 'copy'" size="xs" />
          </button>
        </div>
        @if (version()) {
          <ds-badge type="success" size="sm" shape="pill">
            v{{ version() }}
          </ds-badge>
        }
        @if (apiLink()) {
          <a [href]="apiLink()" class="page-header__link" target="_blank">
            <doc-icon name="external-link" size="xs" />
            API Docs
          </a>
        }
        @if (sourceLink()) {
          <a [href]="sourceLink()" class="page-header__link" target="_blank">
            <doc-icon name="github" size="xs" />
            Source
          </a>
        }
      </div>
    </header>
  `,
  styles: [`
    .page-header {
      margin-bottom: var(--doc-space-2xl, 48px);
    }

    // ==========================================================================
    // Badges row
    // ==========================================================================
    .page-header__badges {
      display: flex;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
      margin-bottom: var(--doc-space-md, 16px);
      flex-wrap: wrap;
    }

    .page-header__category {
      display: inline-flex;
      align-items: center;
      gap: var(--doc-space-xs, 4px);
      padding: var(--doc-space-xs, 4px) var(--doc-space-sm, 8px);
      border-radius: var(--doc-radius-full, 9999px);
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    // ==========================================================================
    // Title
    // ==========================================================================
    .page-header__title {
      display: flex;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
      margin: 0 0 var(--doc-space-sm, 8px) 0;
    }

    .page-header__title-text {
      font-size: 2.25rem;
      font-weight: 800;
      color: var(--doc-text-primary, #0f172a);
      letter-spacing: -0.025em;
      background: linear-gradient(135deg, var(--doc-text-primary, #0f172a) 0%, var(--doc-accent-primary, #6366f1) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .page-header__sparkle {
      font-size: 1.5rem;
      animation: sparkle 1.5s ease-in-out infinite;
    }

    @keyframes sparkle {
      0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
      50% { transform: scale(1.2) rotate(15deg); opacity: 0.8; }
    }

    // ==========================================================================
    // Description
    // ==========================================================================
    .page-header__desc {
      margin: 0 0 var(--doc-space-lg, 24px) 0;
      font-size: 1.125rem;
      color: var(--doc-text-secondary, #475569);
      line-height: 1.7;
      max-width: 650px;
    }

    // ==========================================================================
    // Meta
    // ==========================================================================
    .page-header__meta {
      display: flex;
      align-items: center;
      gap: var(--doc-space-md, 16px);
      flex-wrap: wrap;
    }

    .page-header__selector-wrap {
      display: inline-flex;
      align-items: center;
      gap: 0;
      background: var(--doc-surface-sunken, #f1f5f9);
      border-radius: var(--doc-radius-md, 10px);
      overflow: hidden;
      transition: box-shadow var(--doc-transition-fast, 150ms);

      &:hover {
        box-shadow: var(--doc-shadow-sm);
      }
    }

    .page-header__selector {
      display: inline-block;
      padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
      font-family: var(--doc-code-font, monospace);
      font-size: 0.875rem;
      color: var(--doc-text-primary, #0f172a);
    }

    .page-header__copy {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 100%;
      padding: 0;
      border: none;
      border-left: 1px solid var(--doc-border-subtle, #e2e8f0);
      background: transparent;
      color: var(--doc-text-tertiary, #94a3b8);
      cursor: pointer;
      transition: all var(--doc-transition-fast, 150ms);

      &:hover {
        background: var(--doc-border-subtle, #e2e8f0);
        color: var(--doc-text-primary, #0f172a);
      }
    }

    .page-header__link {
      display: inline-flex;
      align-items: center;
      gap: var(--doc-space-xs, 4px);
      padding: var(--doc-space-xs, 4px) var(--doc-space-sm, 8px);
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--doc-text-secondary, #475569);
      text-decoration: none;
      border-radius: var(--doc-radius-sm, 6px);
      transition: all var(--doc-transition-fast, 150ms);

      &:hover {
        background: var(--doc-surface-sunken, #f1f5f9);
        color: var(--doc-accent-primary, #6366f1);
      }
    }
  `]
})
export class ComponentPageHeader {
  /** Catégorie du composant */
  category = input.required<ComponentCategory>();

  /** Nom du composant */
  name = input.required<string>();

  /** Description du composant */
  description = input.required<string>();

  /** Sélecteur HTML */
  selector = input.required<string>();

  /** Version (optionnel) */
  version = input<string | null>(null);

  /** Status du composant */
  status = input<ComponentStatus | null>(null);

  /** Lien vers la documentation API */
  apiLink = input<string | null>(null);

  /** Lien vers le code source */
  sourceLink = input<string | null>(null);

  /** État du copier-coller du sélecteur (signal interne) */
  selectorCopied = signal(false);

  /** Configuration de la catégorie */
  categoryConfig = computed(() => CATEGORY_CONFIG[this.category()]);

  /** Configuration du status */
  statusConfig = computed(() => {
    const s = this.status();
    return s ? STATUS_CONFIG[s] : null;
  });

  /** Copie le sélecteur dans le presse-papier */
  copySelector(): void {
    const selector = `<${this.selector()}>`;
    navigator.clipboard.writeText(selector);
    this.selectorCopied.set(true);
    setTimeout(() => this.selectorCopied.set(false), 2000);
  }
}
