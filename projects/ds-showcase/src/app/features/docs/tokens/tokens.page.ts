import { Component } from '@angular/core';
import { DsDivider } from 'ds-angular';

interface TokenItem {
  name: string;
  cssVar: string;
  value?: string;
  description?: string;
}

interface TokenGroup {
  title: string;
  description?: string;
  tokens: TokenItem[];
}

@Component({
  selector: 'app-tokens-page',
  standalone: true,
  imports: [DsDivider],
  template: `
    <div class="doc-page">
      <header class="doc-header">
        <span class="doc-badge">Customize</span>
        <h1 class="doc-title">Design Tokens</h1>
        <p class="doc-desc">
          Variables CSS disponibles dans le design system. Ces tokens garantissent
          la cohérence visuelle à travers tous les composants.
        </p>
      </header>

      <!-- Section: Couleurs principales -->
      <section class="doc-section">
        <h2>Couleurs principales</h2>
        <p class="section-desc">Les couleurs de base utilisées dans toute l'application.</p>

        <div class="color-grid">
          @for (color of primaryColors; track color.name) {
            <div class="color-swatch">
              <div
                class="color-preview"
                [style.background]="'var(' + color.cssVar + ')'"
              ></div>
              <div class="color-info">
                <code class="color-var">{{ color.cssVar }}</code>
                <span class="color-name">{{ color.name }}</span>
              </div>
            </div>
          }
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Couleurs sémantiques -->
      <section class="doc-section">
        <h2>Couleurs sémantiques</h2>
        <p class="section-desc">Couleurs avec signification contextuelle (succès, erreur, etc.).</p>

        <div class="color-grid">
          @for (color of semanticColors; track color.name) {
            <div class="color-swatch">
              <div
                class="color-preview"
                [style.background]="'var(' + color.cssVar + ')'"
              ></div>
              <div class="color-info">
                <code class="color-var">{{ color.cssVar }}</code>
                <span class="color-name">{{ color.name }}</span>
              </div>
            </div>
          }
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Palette de gris -->
      <section class="doc-section">
        <h2>Palette de gris</h2>
        <p class="section-desc">Échelle de nuances de gris pour textes, bordures et backgrounds.</p>

        <div class="gray-scale">
          @for (gray of grayScale; track gray.name) {
            <div class="gray-swatch">
              <div
                class="gray-preview"
                [style.background]="'var(' + gray.cssVar + ')'"
                [class.light-border]="gray.name === '50'"
              ></div>
              <code class="gray-label">{{ gray.name }}</code>
            </div>
          }
        </div>

        <div class="token-table-wrapper">
          <table class="token-table">
            <thead>
              <tr>
                <th>Token</th>
                <th>Valeur</th>
                <th>Usage</th>
              </tr>
            </thead>
            <tbody>
              @for (gray of grayScale; track gray.name) {
                <tr>
                  <td><code>{{ gray.cssVar }}</code></td>
                  <td>{{ gray.value }}</td>
                  <td>{{ gray.description }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Typographie -->
      <section class="doc-section">
        <h2>Typographie</h2>

        <h3>Famille de police</h3>
        <div class="font-demo">
          <p class="font-sample" [style.font-family]="'var(--font-family-base)'">
            The quick brown fox jumps over the lazy dog
          </p>
          <code>--font-family-base</code>
        </div>

        <h3>Tailles de police</h3>
        <div class="font-sizes">
          @for (size of fontSizes; track size.name) {
            <div class="font-size-row">
              <span
                class="font-size-sample"
                [style.font-size]="'var(' + size.cssVar + ')'"
              >
                {{ size.name }} ({{ size.value }})
              </span>
              <code>{{ size.cssVar }}</code>
            </div>
          }
        </div>

        <h3>Alias de taille</h3>
        <div class="font-aliases">
          @for (alias of fontAliases; track alias.name) {
            <div class="font-alias-item">
              <span [style.font-size]="'var(' + alias.cssVar + ')'">{{ alias.name }}</span>
              <code>{{ alias.cssVar }}</code>
            </div>
          }
        </div>

        <h3>Graisses</h3>
        <div class="font-weights">
          @for (weight of fontWeights; track weight.name) {
            <div class="font-weight-item">
              <span [style.font-weight]="'var(' + weight.cssVar + ')'">{{ weight.name }} ({{ weight.value }})</span>
              <code>{{ weight.cssVar }}</code>
            </div>
          }
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Espacements -->
      <section class="doc-section">
        <h2>Espacements</h2>
        <p class="section-desc">Échelle d'espacement cohérente basée sur des multiples de 4px.</p>

        <div class="spacing-grid">
          @for (space of spacings; track space.name) {
            <div class="spacing-item">
              <div
                class="spacing-box"
                [style.width]="'var(' + space.cssVar + ')'"
                [style.height]="'var(' + space.cssVar + ')'"
              ></div>
              <code>{{ space.cssVar }}</code>
              <span class="spacing-value">{{ space.value }}</span>
            </div>
          }
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Rayons -->
      <section class="doc-section">
        <h2>Rayons (Border Radius)</h2>
        <p class="section-desc">Coins arrondis pour les différents niveaux d'interface.</p>

        <div class="radius-grid">
          @for (radius of radiuses; track radius.name) {
            <div class="radius-item">
              <div
                class="radius-box"
                [style.border-radius]="'var(' + radius.cssVar + ')'"
              ></div>
              <code>{{ radius.cssVar }}</code>
              <span class="radius-value">{{ radius.value }}</span>
            </div>
          }
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Ombres -->
      <section class="doc-section">
        <h2>Ombres</h2>
        <p class="section-desc">Niveaux d'élévation pour créer de la profondeur.</p>

        <div class="shadow-grid">
          @for (shadow of shadows; track shadow.name) {
            <div class="shadow-item">
              <div
                class="shadow-box"
                [style.box-shadow]="'var(' + shadow.cssVar + ')'"
              ></div>
              <div class="shadow-info">
                <code>{{ shadow.cssVar }}</code>
                <span>{{ shadow.name }}</span>
              </div>
            </div>
          }
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Breakpoints -->
      <section class="doc-section">
        <h2>Breakpoints</h2>
        <p class="section-desc">Points de rupture pour le responsive design.</p>

        <div class="breakpoints-list">
          @for (bp of breakpoints; track bp.name) {
            <div class="breakpoint-row">
              <code>{{ bp.cssVar }}</code>
              <div class="breakpoint-bar">
                <div
                  class="breakpoint-fill"
                  [style.width]="'calc(' + bp.value + ' / 14)'"
                ></div>
              </div>
              <span class="breakpoint-value">{{ bp.value }}</span>
              <span class="breakpoint-desc">{{ bp.description }}</span>
            </div>
          }
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Tokens thématiques -->
      <section class="doc-section">
        <h2>Tokens thématiques</h2>
        <p class="section-desc">Ces tokens s'adaptent automatiquement au thème actif (Light, Dark, Custom).</p>

        <div class="theme-tokens-grid">
          @for (token of themeTokens; track token.name) {
            <div
              class="theme-token-item"
              [style.background]="token.isBackground ? 'var(' + token.cssVar + ')' : 'var(--background-secondary)'"
              [style.color]="token.isText ? 'var(' + token.cssVar + ')' : 'inherit'"
              [style.border-color]="token.isBorder ? 'var(' + token.cssVar + ')' : 'transparent'"
            >
              <span class="theme-token-label">{{ token.name }}</span>
              <code>{{ token.cssVar }}</code>
            </div>
          }
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Tables de référence par composant -->
      <section class="doc-section">
        <h2>Tokens par composant</h2>
        <p class="section-desc">Chaque composant possède ses propres tokens pour une personnalisation fine.</p>

        @for (group of componentTokenGroups; track group.title) {
          <div class="component-tokens">
            <h3>{{ group.title }}</h3>
            @if (group.description) {
              <p class="component-desc">{{ group.description }}</p>
            }
            <div class="token-table-wrapper">
              <table class="token-table">
                <thead>
                  <tr>
                    <th>Token</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  @for (token of group.tokens; track token.name) {
                    <tr>
                      <td><code>{{ token.cssVar }}</code></td>
                      <td>{{ token.description }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        }
      </section>

      <!-- Footer -->
      <footer class="doc-footer">
        <div class="doc-footer-content">
          <span class="doc-footer-icon">&#x1F3A8;</span>
          <strong>100+ tokens CSS</strong>
          <p>Tous personnalisables via CSS custom properties pour une thématisation complète.</p>
        </div>
      </footer>
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
    // Couleurs
    // ==========================================================================
    .color-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 16px;
    }

    .color-swatch {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .color-preview {
      width: 100%;
      height: 48px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .color-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .color-var {
      font-size: 0.75rem;
      color: var(--text-muted, #6b7280);
    }

    .color-name {
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--text-default, #374151);
    }

    // ==========================================================================
    // Gray scale
    // ==========================================================================
    .gray-scale {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
      margin-bottom: 24px;
    }

    .gray-swatch {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .gray-preview {
      width: 56px;
      height: 56px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);

      &.light-border {
        border: 1px solid var(--gray-200, #e5e7eb);
      }
    }

    .gray-label {
      font-size: 0.625rem;
      color: var(--text-muted, #6b7280);
    }

    // ==========================================================================
    // Typographie
    // ==========================================================================
    .font-demo {
      padding: 16px;
      background: var(--background-secondary, #f3f4f6);
      border-radius: 8px;
      margin-bottom: 24px;

      .font-sample {
        font-size: 1.125rem;
        margin: 0 0 8px 0;
      }

      code {
        font-size: 0.75rem;
        color: var(--text-muted, #6b7280);
      }
    }

    .font-sizes {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 24px;
    }

    .font-size-row {
      display: flex;
      align-items: baseline;
      gap: 16px;
      padding: 12px;
      background: var(--background-secondary, #f3f4f6);
      border-radius: 8px;

      .font-size-sample {
        min-width: 200px;
      }

      code {
        font-size: 0.6875rem;
        color: var(--text-muted, #6b7280);
      }
    }

    .font-aliases {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 12px;
      margin-bottom: 24px;
    }

    .font-alias-item {
      padding: 12px;
      background: var(--background-secondary, #f3f4f6);
      border-radius: 8px;
      text-align: center;

      span {
        display: block;
        margin-bottom: 4px;
      }

      code {
        font-size: 0.625rem;
        color: var(--text-muted, #6b7280);
      }
    }

    .font-weights {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 12px;
    }

    .font-weight-item {
      padding: 16px;
      background: var(--background-secondary, #f3f4f6);
      border-radius: 8px;

      span {
        display: block;
        font-size: 1rem;
        margin-bottom: 8px;
      }

      code {
        font-size: 0.625rem;
        color: var(--text-muted, #6b7280);
      }
    }

    // ==========================================================================
    // Espacements
    // ==========================================================================
    .spacing-grid {
      display: flex;
      align-items: flex-end;
      gap: 24px;
      flex-wrap: wrap;
    }

    .spacing-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .spacing-box {
      background: var(--color-primary, #3b82f6);
      border-radius: 4px;
      min-width: 4px;
      min-height: 4px;
    }

    .spacing-value {
      font-size: 0.625rem;
      color: var(--text-muted, #6b7280);
    }

    // ==========================================================================
    // Rayons
    // ==========================================================================
    .radius-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 16px;
    }

    .radius-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .radius-box {
      width: 64px;
      height: 64px;
      background: var(--color-primary, #3b82f6);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .radius-value {
      font-size: 0.625rem;
      color: var(--text-muted, #6b7280);
    }

    // ==========================================================================
    // Ombres
    // ==========================================================================
    .shadow-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 24px;
    }

    .shadow-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }

    .shadow-box {
      width: 100%;
      height: 80px;
      background: var(--background-main, #ffffff);
      border-radius: 8px;
    }

    .shadow-info {
      text-align: center;

      code {
        display: block;
        font-size: 0.6875rem;
        color: var(--text-muted, #6b7280);
        margin-bottom: 4px;
      }

      span {
        font-size: 0.75rem;
        color: var(--text-muted, #9ca3af);
      }
    }

    // ==========================================================================
    // Breakpoints
    // ==========================================================================
    .breakpoints-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .breakpoint-row {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px 16px;
      background: var(--background-secondary, #f3f4f6);
      border-radius: 8px;

      code {
        font-size: 0.75rem;
        min-width: 140px;
      }
    }

    .breakpoint-bar {
      flex: 1;
      max-width: 200px;
      height: 8px;
      background: var(--gray-200, #e5e7eb);
      border-radius: 4px;
      overflow: hidden;
    }

    .breakpoint-fill {
      height: 100%;
      background: var(--color-primary, #3b82f6);
      border-radius: 4px;
      min-width: 20px;
    }

    .breakpoint-value {
      font-size: 0.75rem;
      font-weight: 600;
      min-width: 60px;
    }

    .breakpoint-desc {
      font-size: 0.6875rem;
      color: var(--text-muted, #6b7280);
    }

    // ==========================================================================
    // Theme tokens
    // ==========================================================================
    .theme-tokens-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 12px;
    }

    .theme-token-item {
      padding: 16px;
      border-radius: 8px;
      border: 2px solid transparent;

      .theme-token-label {
        display: block;
        font-size: 0.75rem;
        font-weight: 600;
        margin-bottom: 4px;
      }

      code {
        font-size: 0.625rem;
        opacity: 0.7;
      }
    }

    // ==========================================================================
    // Token tables
    // ==========================================================================
    .token-table-wrapper {
      overflow-x: auto;
      margin-top: 16px;
    }

    .token-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;

      th, td {
        text-align: left;
        padding: 12px 16px;
        border-bottom: 1px solid var(--border-default, #e5e7eb);
      }

      th {
        font-weight: 600;
        color: var(--text-default, #374151);
        background: var(--background-secondary, #f9fafb);
      }

      td code {
        font-size: 0.75rem;
        padding: 2px 6px;
        background: var(--background-secondary, #f3f4f6);
        border-radius: 4px;
      }
    }

    .component-tokens {
      margin-bottom: 32px;

      h3 {
        margin-bottom: 8px;
      }

      .component-desc {
        font-size: 0.8125rem;
        color: var(--text-muted, #6b7280);
        margin: 0 0 12px 0;
      }
    }

    // ==========================================================================
    // Footer
    // ==========================================================================
    .doc-footer {
      margin-top: 48px;
    }

    .doc-footer-content {
      padding: 24px;
      background: var(--background-secondary, #f3f4f6);
      border-radius: 12px;
      text-align: center;

      .doc-footer-icon {
        font-size: 24px;
        display: block;
        margin-bottom: 8px;
      }

      strong {
        display: block;
        font-size: 1rem;
        margin-bottom: 4px;
      }

      p {
        margin: 0;
        font-size: 0.875rem;
        color: var(--text-muted, #6b7280);
      }
    }

    code {
      font-family: var(--doc-code-font, 'SF Mono', Monaco, monospace);
    }
  `]
})
export class TokensPage {
  // Couleurs principales
  primaryColors: TokenItem[] = [
    { name: 'Primary', cssVar: '--color-primary' },
    { name: 'Secondary', cssVar: '--color-secondary' },
    { name: 'Alt', cssVar: '--color-alt' },
  ];

  // Couleurs sémantiques
  semanticColors: TokenItem[] = [
    { name: 'Success', cssVar: '--success' },
    { name: 'Warning', cssVar: '--warning' },
    { name: 'Error', cssVar: '--error' },
    { name: 'Info', cssVar: '--info' },
  ];

  // Palette de gris
  grayScale: TokenItem[] = [
    { name: '50', cssVar: '--gray-50', value: '#f9fafb', description: 'Backgrounds très légers' },
    { name: '100', cssVar: '--gray-100', value: '#f3f4f6', description: 'Backgrounds légers' },
    { name: '200', cssVar: '--gray-200', value: '#e5e7eb', description: 'Bordures légères' },
    { name: '300', cssVar: '--gray-300', value: '#d1d5db', description: 'Bordures' },
    { name: '400', cssVar: '--gray-400', value: '#9ca3af', description: 'Texte désactivé' },
    { name: '500', cssVar: '--gray-500', value: '#6b7280', description: 'Texte secondaire' },
    { name: '600', cssVar: '--gray-600', value: '#4b5563', description: 'Texte muted' },
    { name: '700', cssVar: '--gray-700', value: '#374151', description: 'Texte par défaut' },
    { name: '800', cssVar: '--gray-800', value: '#1f2937', description: 'Titres' },
    { name: '900', cssVar: '--gray-900', value: '#111827', description: 'Texte foncé' },
  ];

  // Tailles de police
  fontSizes: TokenItem[] = [
    { name: 'Font Size 1', cssVar: '--font-size-1', value: '12px' },
    { name: 'Font Size 2', cssVar: '--font-size-2', value: '14px' },
    { name: 'Font Size 3', cssVar: '--font-size-3', value: '16px' },
    { name: 'Font Size 4', cssVar: '--font-size-4', value: '18px' },
  ];

  // Alias de taille
  fontAliases: TokenItem[] = [
    { name: 'Extra Small', cssVar: '--font-size-xs' },
    { name: 'Small', cssVar: '--font-size-sm' },
    { name: 'Base', cssVar: '--font-size-base' },
    { name: 'Large', cssVar: '--font-size-lg' },
  ];

  // Graisses
  fontWeights: TokenItem[] = [
    { name: 'Normal', cssVar: '--font-weight-normal', value: '400' },
    { name: 'Medium', cssVar: '--font-weight-medium', value: '500' },
    { name: 'Semibold', cssVar: '--font-weight-semibold', value: '600' },
    { name: 'Bold', cssVar: '--font-weight-bold', value: '700' },
  ];

  // Espacements
  spacings: TokenItem[] = [
    { name: 'space-1', cssVar: '--space-1', value: '4px' },
    { name: 'space-2', cssVar: '--space-2', value: '8px' },
    { name: 'space-3', cssVar: '--space-3', value: '12px' },
    { name: 'space-4', cssVar: '--space-4', value: '16px' },
    { name: 'space-5', cssVar: '--space-5', value: '20px' },
    { name: 'space-6', cssVar: '--space-6', value: '24px' },
    { name: 'space-8', cssVar: '--space-8', value: '32px' },
  ];

  // Rayons
  radiuses: TokenItem[] = [
    { name: 'radius-1', cssVar: '--radius-1', value: '4px' },
    { name: 'radius-2', cssVar: '--radius-2', value: '8px' },
    { name: 'radius-3', cssVar: '--radius-3', value: '12px' },
    { name: 'radius-round', cssVar: '--radius-round', value: '50%' },
  ];

  // Ombres
  shadows: TokenItem[] = [
    { name: 'Subtle', cssVar: '--shadow-1' },
    { name: 'Medium', cssVar: '--shadow-2' },
    { name: 'Elevated', cssVar: '--shadow-3' },
  ];

  // Breakpoints
  breakpoints: TokenItem[] = [
    { name: 'xs', cssVar: '--breakpoint-xs', value: '320px', description: 'Mobile petit' },
    { name: 'sm', cssVar: '--breakpoint-sm', value: '576px', description: 'Mobile' },
    { name: 'md', cssVar: '--breakpoint-md', value: '768px', description: 'Tablette' },
    { name: 'lg', cssVar: '--breakpoint-lg', value: '992px', description: 'Desktop' },
    { name: 'xl', cssVar: '--breakpoint-xl', value: '1200px', description: 'Large desktop' },
    { name: '2xl', cssVar: '--breakpoint-2xl', value: '1400px', description: 'Extra large' },
  ];

  // Tokens thématiques
  themeTokens: Array<TokenItem & { isBackground?: boolean; isText?: boolean; isBorder?: boolean }> = [
    { name: 'Background Main', cssVar: '--background-main', isBackground: true },
    { name: 'Background Secondary', cssVar: '--background-secondary', isBackground: true },
    { name: 'Text Default', cssVar: '--text-default', isText: true },
    { name: 'Text Muted', cssVar: '--text-muted', isText: true },
    { name: 'Border Color', cssVar: '--border-color', isBorder: true },
  ];

  // Tokens par composant
  componentTokenGroups: TokenGroup[] = [
    {
      title: 'Button',
      description: 'Tokens pour le composant DsButton',
      tokens: [
        { name: 'btn-height-sm', cssVar: '--btn-height-sm', description: 'Hauteur bouton small' },
        { name: 'btn-height-md', cssVar: '--btn-height-md', description: 'Hauteur bouton medium' },
        { name: 'btn-height-lg', cssVar: '--btn-height-lg', description: 'Hauteur bouton large' },
        { name: 'btn-padding-sm', cssVar: '--btn-padding-sm', description: 'Padding bouton small' },
        { name: 'btn-padding-md', cssVar: '--btn-padding-md', description: 'Padding bouton medium' },
        { name: 'btn-radius', cssVar: '--btn-radius', description: 'Border radius bouton' },
      ],
    },
    {
      title: 'Input',
      description: 'Tokens pour les champs de formulaire',
      tokens: [
        { name: 'input-height-sm', cssVar: '--input-height-sm', description: 'Hauteur input small' },
        { name: 'input-height-md', cssVar: '--input-height-md', description: 'Hauteur input medium' },
        { name: 'input-height-lg', cssVar: '--input-height-lg', description: 'Hauteur input large' },
        { name: 'input-bg', cssVar: '--input-bg', description: 'Couleur fond input' },
        { name: 'input-border-color', cssVar: '--input-border-color', description: 'Couleur bordure input' },
        { name: 'input-border-radius', cssVar: '--input-border-radius', description: 'Border radius input' },
      ],
    },
    {
      title: 'Modal',
      description: 'Tokens pour le composant DsModal',
      tokens: [
        { name: 'modal-bg', cssVar: '--modal-bg', description: 'Couleur fond modal' },
        { name: 'modal-border-radius', cssVar: '--modal-border-radius', description: 'Border radius modal' },
        { name: 'modal-shadow', cssVar: '--modal-shadow', description: 'Ombre modal' },
        { name: 'modal-overlay-bg', cssVar: '--modal-overlay-bg', description: 'Couleur overlay' },
      ],
    },
    {
      title: 'Card',
      description: 'Tokens pour le composant DsCard',
      tokens: [
        { name: 'card-bg', cssVar: '--card-bg', description: 'Couleur fond card' },
        { name: 'card-border', cssVar: '--card-border', description: 'Bordure card' },
        { name: 'card-shadow', cssVar: '--card-shadow', description: 'Ombre card' },
        { name: 'card-radius', cssVar: '--card-radius', description: 'Border radius card' },
      ],
    },
    {
      title: 'Table',
      description: 'Tokens pour le composant DsTable',
      tokens: [
        { name: 'table-bg', cssVar: '--table-bg', description: 'Couleur fond table' },
        { name: 'table-header-bg', cssVar: '--table-header-bg', description: 'Couleur fond header' },
        { name: 'table-row-hover', cssVar: '--table-row-hover', description: 'Couleur hover ligne' },
        { name: 'table-border', cssVar: '--table-border', description: 'Couleur bordure' },
      ],
    },
    {
      title: 'Select',
      description: 'Tokens pour le composant DsSelect',
      tokens: [
        { name: 'select-dropdown-bg', cssVar: '--select-dropdown-bg', description: 'Couleur fond dropdown' },
        { name: 'select-option-hover', cssVar: '--select-option-hover', description: 'Couleur hover option' },
        { name: 'select-option-selected', cssVar: '--select-option-selected', description: 'Couleur option sélectionnée' },
      ],
    },
  ];
}
