import { Component, input, computed } from '@angular/core';

/**
 * Icônes SVG disponibles dans le Showcase
 */
export type DocIconName =
  // Navigation
  | 'home'
  | 'book'
  | 'chevron-right'
  | 'chevron-down'
  | 'chevron-left'
  | 'menu'
  | 'close'
  | 'search'
  | 'external-link'
  // Actions
  | 'zap'
  | 'copy'
  | 'check'
  | 'expand'
  | 'collapse'
  | 'fullscreen'
  | 'code'
  | 'eye'
  // Categories
  | 'grid'
  | 'forms'
  | 'layout'
  | 'data'
  | 'feedback'
  | 'navigation'
  | 'overlays'
  | 'components'
  | 'primitives'
  // Theme
  | 'sun'
  | 'moon'
  | 'palette'
  // Devices
  | 'desktop'
  | 'tablet'
  | 'mobile'
  // Misc
  | 'github'
  | 'npm'
  | 'arrow-right'
  | 'info'
  | 'warning'
  | 'error'
  | 'success';

/** Tailles d'icônes */
export type DocIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Map taille → pixels */
const SIZE_MAP: Record<DocIconSize, number> = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32
};

/** Paths SVG pour chaque icône */
const ICON_PATHS: Record<DocIconName, string> = {
  // Navigation
  'home': 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  'book': 'M6 2h15v16H6a3 3 0 01-3-3V5a3 3 0 013-3zm0 13a1 1 0 00-1 1v1a1 1 0 001 1h13V2H6a1 1 0 00-1 1v11a3 3 0 011 1zm2-8h9v2H8V7zm0 4h6v2H8v-2z',
  'chevron-right': 'M9 18l6-6-6-6',
  'chevron-down': 'M6 9l6 6 6-6',
  'chevron-left': 'M15 18l-6-6 6-6',
  'menu': 'M3 12h18M3 6h18M3 18h18',
  'close': 'M18 6L6 18M6 6l12 12',
  'search': 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  'external-link': 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14',

  // Actions
  'zap': 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  'copy': 'M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2v-2M8 16H6a2 2 0 01-2-2V4a2 2 0 012-2h8a2 2 0 012 2v2M8 8h8v8H8V8z',
  'check': 'M5 13l4 4L19 7',
  'expand': 'M4 8V4h4M4 16v4h4M16 4h4v4M16 20h4v-4',
  'collapse': 'M4 14h6v6M4 10V4h6M20 10h-6V4M14 14h6v6',
  'fullscreen': 'M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3',
  'code': 'M16 18l6-6-6-6M8 6l-6 6 6 6',
  'eye': 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z',

  // Categories
  'grid': 'M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z',
  'forms': 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  'layout': 'M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z',
  'data': 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
  'feedback': 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
  'navigation': 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
  'overlays': 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
  'components': 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
  'primitives': 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',

  // Theme
  'sun': 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
  'moon': 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
  'palette': 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',

  // Devices
  'desktop': 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  'tablet': 'M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
  'mobile': 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',

  // Misc
  'github': 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
  'npm': 'M2 20V4h20v16H2zm2-2h4v-8h3v8h9V6H4v12z',
  'arrow-right': 'M14 5l7 7m0 0l-7 7m7-7H3',
  'info': 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  'warning': 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  'error': 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  'success': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
};

@Component({
  selector: 'doc-icon',
  standalone: true,
  template: `
    <svg
      [attr.width]="sizeValue()"
      [attr.height]="sizeValue()"
      viewBox="0 0 24 24"
      fill="none"
      [attr.stroke]="stroke()"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round"
      stroke-linejoin="round"
      [class]="'doc-icon doc-icon--' + size()"
      [attr.aria-hidden]="ariaHidden()"
      [attr.aria-label]="ariaLabel()"
      role="img"
    >
      <path [attr.d]="path()" />
    </svg>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .doc-icon {
      transition: transform var(--doc-transition-fast, 150ms),
                  stroke var(--doc-transition-fast, 150ms);
    }
  `]
})
export class DocIcon {
  /** Nom de l'icône */
  name = input.required<DocIconName>();

  /** Taille de l'icône */
  size = input<DocIconSize>('md');

  /** Couleur du stroke (par défaut: currentColor) */
  stroke = input<string>('currentColor');

  /** Épaisseur du stroke */
  strokeWidth = input<number>(2);

  /** Masquer pour les lecteurs d'écran */
  ariaHidden = input<boolean>(true);

  /** Label accessible */
  ariaLabel = input<string | null>(null);

  /** Valeur en pixels */
  sizeValue = computed(() => SIZE_MAP[this.size()]);

  /** Path SVG */
  path = computed(() => ICON_PATHS[this.name()] || '');
}
