import { Component, signal } from '@angular/core';
import { DsDivider, DsButton, DsCard, DsBadge } from 'ds-angular';

interface ThemeInfo {
  id: string;
  name: string;
  icon: string;
  cssClass: string;
  description: string;
  previewStyle: Record<string, string>;
}

@Component({
  selector: 'app-theming-page',
  standalone: true,
  imports: [DsDivider, DsButton, DsCard, DsBadge],
  template: `
    <div class="doc-page">
      <header class="doc-header">
        <span class="doc-badge">Customize</span>
        <h1 class="doc-title">Theming</h1>
        <p class="doc-desc">
          Guide complet pour utiliser et créer des thèmes dans DS-Angular.
        </p>
      </header>

      <!-- Section: Thèmes disponibles -->
      <section class="doc-section">
        <h2>Thèmes disponibles</h2>
        <p class="section-desc">Le design system propose 3 thèmes prêts à l'emploi.</p>

        <div class="themes-grid">
          @for (theme of themes; track theme.id) {
            <div
              class="theme-card"
              [style.background]="theme.previewStyle['background']"
              [style.border-color]="theme.previewStyle['border']"
              [class.active]="activeTheme() === theme.id"
              (click)="setActiveTheme(theme.id)"
            >
              <span class="theme-icon">{{ theme.icon }}</span>
              <strong [style.color]="theme.previewStyle['text']">{{ theme.name }}</strong>
              <code [style.color]="theme.previewStyle['muted']">{{ theme.cssClass }}</code>
            </div>
          }
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Activation -->
      <section class="doc-section">
        <h2>Activation d'un thème</h2>

        <h3>Via classe CSS</h3>
        <div class="code-block">
          <pre><code>{{ activationCodeCss }}</code></pre>
        </div>

        <h3>Service de thème (recommandé)</h3>
        <p class="section-desc">Créez un service Angular pour gérer le thème avec persistance.</p>
        <div class="code-block">
          <pre><code>{{ themeServiceCode }}</code></pre>
        </div>

        <h3>Détection automatique du système</h3>
        <div class="code-block">
          <pre><code>{{ autoDetectCode }}</code></pre>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Créer un thème personnalisé -->
      <section class="doc-section">
        <h2>Créer un thème personnalisé</h2>

        <h3>1. Créer le fichier de thème</h3>
        <div class="code-block">
          <pre><code>{{ customThemeCode }}</code></pre>
        </div>

        <h3>2. Importer le thème</h3>
        <div class="code-block">
          <pre><code>{{ importThemeCode }}</code></pre>
        </div>

        <h3>3. Activer le thème</h3>
        <div class="code-block">
          <pre><code>document.documentElement.className = 'theme-my-brand';</code></pre>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Variables thématiques -->
      <section class="doc-section">
        <h2>Variables thématiques</h2>

        <h3>Essentielles (obligatoires)</h3>
        <div class="code-block">
          <pre><code>{{ essentialVarsCode }}</code></pre>
        </div>

        <h3>Composants (optionnelles)</h3>
        <div class="code-block">
          <pre><code>{{ componentVarsCode }}</code></pre>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Exemple Ocean -->
      <section class="doc-section">
        <h2>Exemple : Thème "Ocean"</h2>
        <p class="section-desc">Un thème clair avec une palette bleue marine.</p>

        <div class="theme-preview ocean-preview">
          <div class="preview-header">
            <span>Preview</span>
            <ds-badge type="info">theme-ocean</ds-badge>
          </div>
          <div class="preview-content">
            <ds-card variant="elevated">
              <h4>Ocean Theme</h4>
              <p>Un thème inspiré des profondeurs marines.</p>
              <ds-button variant="primary">Action</ds-button>
            </ds-card>
          </div>
        </div>

        <div class="code-block">
          <pre><code>{{ oceanThemeCode }}</code></pre>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Exemple Midnight -->
      <section class="doc-section">
        <h2>Exemple : Thème "Midnight"</h2>
        <p class="section-desc">Un thème sombre avec des accents néon.</p>

        <div class="theme-preview midnight-preview">
          <div class="preview-header">
            <span>Preview</span>
            <ds-badge type="accent">theme-midnight</ds-badge>
          </div>
          <div class="preview-content">
            <ds-card variant="elevated">
              <h4>Midnight Theme</h4>
              <p>Un thème sombre pour les noctambules.</p>
              <ds-button variant="primary">Action</ds-button>
            </ds-card>
          </div>
        </div>

        <div class="code-block">
          <pre><code>{{ midnightThemeCode }}</code></pre>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Composant ThemeSwitcher -->
      <section class="doc-section">
        <h2>Composant ThemeSwitcher</h2>
        <p class="section-desc">Exemple de composant Angular pour changer de thème.</p>

        <div class="code-block">
          <pre><code>{{ themeSwitcherCode }}</code></pre>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Bonnes pratiques -->
      <section class="doc-section">
        <h2>Bonnes pratiques</h2>

        <div class="tips-grid">
          <div class="tip-card">
            <span class="tip-icon">&#x2705;</span>
            <h4>Testez l'accessibilité</h4>
            <p>Vérifiez les contrastes WCAG 2.1 AA pour tous les thèmes.</p>
          </div>

          <div class="tip-card">
            <span class="tip-icon">&#x1F3A8;</span>
            <h4>Cohérence</h4>
            <p>Gardez une logique entre les couleurs (succès = vert, erreur = rouge).</p>
          </div>

          <div class="tip-card">
            <span class="tip-icon">&#x1F6E1;</span>
            <h4>Fallbacks</h4>
            <p>Fournissez des valeurs par défaut pour la rétrocompatibilité.</p>
          </div>

          <div class="tip-card">
            <span class="tip-icon">&#x26A1;</span>
            <h4>Performance</h4>
            <p>Évitez trop de variables sur les composants enfants.</p>
          </div>

          <div class="tip-card">
            <span class="tip-icon">&#x1F4DD;</span>
            <h4>Documentation</h4>
            <p>Documentez vos choix de couleurs et leur signification.</p>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .doc-page {
      max-width: 900px;
    }

    .doc-header {
      margin-bottom: 48px;
    }

    .doc-badge {
      display: inline-block;
      padding: 4px 10px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: var(--color-primary-light, #eff6ff);
      color: var(--color-primary, #3b82f6);
      border-radius: 4px;
      margin-bottom: 12px;
    }

    .doc-title {
      margin: 0 0 12px 0;
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-default, #1a1a1a);
    }

    .doc-desc {
      margin: 0;
      font-size: 1.125rem;
      color: var(--text-muted, #6b7280);
      line-height: 1.6;
    }

    .doc-section {
      margin-bottom: 32px;

      h2 {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-default, #1a1a1a);
        margin: 0 0 8px 0;
      }

      h3 {
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-default, #374151);
        margin: 24px 0 12px 0;
      }
    }

    .section-desc {
      margin: 0 0 20px 0;
      font-size: 0.875rem;
      color: var(--text-muted, #6b7280);
    }

    // ==========================================================================
    // Themes grid
    // ==========================================================================
    .themes-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    .theme-card {
      padding: 24px;
      border-radius: 12px;
      text-align: center;
      border: 2px solid;
      cursor: pointer;
      transition: transform 0.15s ease, box-shadow 0.15s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      &.active {
        box-shadow: 0 0 0 3px var(--color-primary, #3b82f6);
      }

      .theme-icon {
        font-size: 32px;
        display: block;
        margin-bottom: 8px;
      }

      strong {
        display: block;
        margin-bottom: 4px;
      }

      code {
        font-size: 0.6875rem;
      }
    }

    // ==========================================================================
    // Code blocks
    // ==========================================================================
    .code-block {
      background: var(--gray-900, #111827);
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 16px;

      pre {
        margin: 0;
        padding: 16px;
        overflow-x: auto;
      }

      code {
        font-family: 'SF Mono', Monaco, monospace;
        font-size: 0.8125rem;
        line-height: 1.6;
        color: #e5e7eb;
        white-space: pre;
      }
    }

    // ==========================================================================
    // Theme previews
    // ==========================================================================
    .theme-preview {
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 16px;
      border: 1px solid var(--border-default, #e5e7eb);
    }

    .preview-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: var(--background-secondary, #f3f4f6);
      border-bottom: 1px solid var(--border-default, #e5e7eb);

      span {
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--text-muted, #6b7280);
      }
    }

    .preview-content {
      padding: 24px;

      h4 {
        margin: 0 0 8px 0;
      }

      p {
        margin: 0 0 16px 0;
        font-size: 0.875rem;
      }
    }

    .ocean-preview .preview-content {
      background: #f0f9ff;

      h4 {
        color: #0c4a6e;
      }

      p {
        color: #0369a1;
      }
    }

    .midnight-preview .preview-content {
      background: #0f172a;

      h4 {
        color: #f1f5f9;
      }

      p {
        color: #94a3b8;
      }
    }

    // ==========================================================================
    // Tips grid
    // ==========================================================================
    .tips-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
    }

    .tip-card {
      padding: 20px;
      background: var(--background-secondary, #f3f4f6);
      border-radius: 8px;

      .tip-icon {
        font-size: 24px;
        display: block;
        margin-bottom: 8px;
      }

      h4 {
        margin: 0 0 8px 0;
        font-size: 0.9375rem;
        font-weight: 600;
      }

      p {
        margin: 0;
        font-size: 0.8125rem;
        color: var(--text-muted, #6b7280);
        line-height: 1.5;
      }
    }
  `]
})
export class ThemingPage {
  // État du thème actif (pour la démo)
  activeTheme = signal('light');

  // Définitions des thèmes
  themes: ThemeInfo[] = [
    {
      id: 'light',
      name: 'Light',
      icon: '&#x2600;&#xFE0F;',
      cssClass: 'theme-light',
      description: 'Thème clair par défaut',
      previewStyle: {
        background: '#ffffff',
        border: '#e5e7eb',
        text: '#1f2937',
        muted: '#6b7280',
      },
    },
    {
      id: 'dark',
      name: 'Dark',
      icon: '&#x1F319;',
      cssClass: 'theme-dark',
      description: 'Thème sombre',
      previewStyle: {
        background: '#1f2937',
        border: '#374151',
        text: '#f9fafb',
        muted: '#9ca3af',
      },
    },
    {
      id: 'custom',
      name: 'Custom',
      icon: '&#x1F3A8;',
      cssClass: 'theme-custom',
      description: 'Thème personnalisable',
      previewStyle: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: '#7c3aed',
        text: '#ffffff',
        muted: '#e0e7ff',
      },
    },
  ];

  setActiveTheme(themeId: string): void {
    this.activeTheme.set(themeId);
  }

  // Code examples
  activationCodeCss = `// Dans app.component.ts ou main.ts
document.documentElement.className = 'theme-light';
document.documentElement.className = 'theme-dark';
document.documentElement.className = 'theme-custom';`;

  themeServiceCode = `import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private currentTheme = signal<'light' | 'dark' | 'custom'>('light');

  readonly theme = this.currentTheme.asReadonly();

  setTheme(theme: 'light' | 'dark' | 'custom') {
    this.currentTheme.set(theme);
    document.documentElement.className = \`theme-\${theme}\`;
    localStorage.setItem('ds-theme', theme);
  }

  initTheme() {
    const saved = localStorage.getItem('ds-theme') as 'light' | 'dark' | 'custom';
    if (saved) {
      this.setTheme(saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setTheme('dark');
    }
  }
}`;

  autoDetectCode = `// Écoute les changements de préférence système
window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => {
    this.themeService.setTheme(e.matches ? 'dark' : 'light');
  });`;

  customThemeCode = `// src/styles/themes/_my-brand.scss
:root.theme-my-brand {
  // Couleurs principales
  --color-primary: #your-brand-color;
  --color-secondary: #your-secondary;
  --color-alt: #your-accent;

  // Backgrounds
  --background-main: #ffffff;
  --background-secondary: #f8f9fa;
  --background-tertiary: #e9ecef;

  // Textes
  --text-default: #212529;
  --text-muted: #6c757d;

  // Bordures
  --border-color: #dee2e6;

  // Composants (optionnel)
  --btn-radius: 4px;
  --card-radius: 8px;
  --input-border-radius: 4px;
}`;

  importThemeCode = `// src/styles.scss
@use '@kksdev/ds-angular/styles';
@use './styles/themes/my-brand';`;

  essentialVarsCode = `:root.theme-* {
  // Backgrounds
  --background-main: ...;
  --background-secondary: ...;

  // Textes
  --text-default: ...;
  --text-muted: ...;

  // Bordures
  --border-color: ...;
}`;

  componentVarsCode = `:root.theme-* {
  // Inputs
  --input-bg: ...;
  --input-border-color: ...;
  --input-text: ...;
  --input-placeholder: ...;

  // Cards
  --card-bg: ...;
  --card-border: ...;
  --card-shadow: ...;

  // Modals
  --modal-bg: ...;
  --modal-overlay-bg: ...;

  // Tables
  --table-bg: ...;
  --table-header-bg: ...;
  --table-row-hover: ...;
  --table-border: ...;
}`;

  oceanThemeCode = `:root.theme-ocean {
  // Palette océan
  --color-primary: #0077b6;
  --color-secondary: #00b4d8;
  --color-alt: #90e0ef;

  // Backgrounds avec teinte bleue
  --background-main: #f0f9ff;
  --background-secondary: #e0f2fe;
  --background-tertiary: #bae6fd;

  // Textes
  --text-default: #0c4a6e;
  --text-muted: #0369a1;

  // Bordures
  --border-color: #7dd3fc;

  // Couleurs sémantiques
  --success: #059669;
  --warning: #d97706;
  --error: #dc2626;
  --info: #0284c7;

  // Composants
  --btn-radius: 24px;
  --card-radius: 16px;
  --card-shadow: 0 4px 20px rgba(0, 119, 182, 0.15);
}`;

  midnightThemeCode = `:root.theme-midnight {
  // Backgrounds sombres
  --background-main: #0f172a;
  --background-secondary: #1e293b;
  --background-tertiary: #334155;

  // Textes clairs
  --text-default: #f1f5f9;
  --text-muted: #94a3b8;

  // Accent néon
  --color-primary: #22d3ee;
  --color-secondary: #a78bfa;
  --color-alt: #f472b6;

  // Bordures subtiles
  --border-color: #475569;

  // Ombres pour dark mode
  --shadow-1: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-2: 0 4px 6px rgba(0, 0, 0, 0.4);
  --shadow-3: 0 10px 25px rgba(0, 0, 0, 0.5);
}`;

  themeSwitcherCode = `import { Component, inject } from '@angular/core';
import { DsSegmentedControl } from '@kksdev/ds-angular';
import { ThemeService } from './theme.service';

@Component({
  standalone: true,
  imports: [DsSegmentedControl],
  template: \`
    <ds-segmented-control
      [ngModel]="themeService.theme()"
      [options]="options"
      (ngModelChange)="themeService.setTheme($event)"
    />
  \`
})
export class ThemeSwitcherComponent {
  themeService = inject(ThemeService);

  options = [
    { value: 'light', label: '&#x2600;&#xFE0F; Light' },
    { value: 'dark', label: '&#x1F319; Dark' },
    { value: 'custom', label: '&#x1F3A8; Custom' },
  ];
}`;
}
