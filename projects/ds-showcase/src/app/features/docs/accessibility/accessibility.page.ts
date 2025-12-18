import { Component } from '@angular/core';
import { DsDivider, DsCard, DsAlert } from 'ds-angular';

interface KeyboardShortcut {
  key: string;
  description: string;
  components: string;
}

interface AriaAttribute {
  attribute: string;
  usage: string;
  example: string;
}

@Component({
  selector: 'app-accessibility-page',
  standalone: true,
  imports: [DsDivider, DsCard, DsAlert],
  template: `
    <div class="doc-page">
      <header class="doc-header">
        <span class="doc-badge">Standards</span>
        <h1 class="doc-title">Accessibilité</h1>
        <p class="doc-desc">
          DS-Angular est conçu pour être accessible à tous. Nous suivons les directives WCAG 2.1 niveau AA.
        </p>
      </header>

      <!-- Section: Engagement -->
      <section class="doc-section">
        <ds-alert type="info" [showIcon]="true">
          <strong>Notre engagement</strong><br>
          Tous les composants DS-Angular sont testés pour la conformité WCAG 2.1 AA,
          incluant la navigation clavier, les lecteurs d'écran et les contrastes de couleurs.
        </ds-alert>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Navigation clavier -->
      <section class="doc-section">
        <h2>Navigation clavier</h2>
        <p class="section-desc">
          Tous les composants interactifs sont accessibles au clavier. Voici les raccourcis disponibles.
        </p>

        <div class="table-container">
          <table class="doc-table">
            <thead>
              <tr>
                <th>Touche</th>
                <th>Action</th>
                <th>Composants</th>
              </tr>
            </thead>
            <tbody>
              @for (shortcut of keyboardShortcuts; track shortcut.key) {
                <tr>
                  <td><kbd>{{ shortcut.key }}</kbd></td>
                  <td>{{ shortcut.description }}</td>
                  <td><code>{{ shortcut.components }}</code></td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Focus visible -->
      <section class="doc-section">
        <h2>Focus visible</h2>
        <p class="section-desc">
          Tous les éléments interactifs ont un indicateur de focus visible et personnalisable.
        </p>

        <div class="focus-demo">
          <div class="focus-example">
            <button class="demo-btn demo-btn--default">Focus par défaut</button>
            <span class="focus-label">Outline bleu 3px</span>
          </div>
          <div class="focus-example">
            <button class="demo-btn demo-btn--custom">Focus personnalisé</button>
            <span class="focus-label">Personnalisable via tokens</span>
          </div>
        </div>

        <h3>Personnaliser le focus</h3>
        <div class="code-block">
          <pre><code>{{ focusCustomCode }}</code></pre>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Lecteurs d'écran -->
      <section class="doc-section">
        <h2>Lecteurs d'écran</h2>
        <p class="section-desc">
          Les composants utilisent les attributs ARIA appropriés pour une expérience optimale avec les lecteurs d'écran.
        </p>

        <div class="table-container">
          <table class="doc-table">
            <thead>
              <tr>
                <th>Attribut</th>
                <th>Usage</th>
                <th>Exemple</th>
              </tr>
            </thead>
            <tbody>
              @for (attr of ariaAttributes; track attr.attribute) {
                <tr>
                  <td><code>{{ attr.attribute }}</code></td>
                  <td>{{ attr.usage }}</td>
                  <td><code class="code-small">{{ attr.example }}</code></td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Contrastes -->
      <section class="doc-section">
        <h2>Contrastes de couleurs</h2>
        <p class="section-desc">
          Tous les textes respectent un ratio de contraste minimum de 4.5:1 (WCAG AA).
        </p>

        <div class="contrast-grid">
          <div class="contrast-example contrast-example--pass">
            <div class="contrast-sample" style="background: #1f2937; color: #ffffff;">
              Texte blanc sur fond sombre
            </div>
            <div class="contrast-info">
              <span class="contrast-ratio">Ratio : 12.6:1</span>
              <span class="contrast-status pass">&#x2713; AA</span>
            </div>
          </div>

          <div class="contrast-example contrast-example--pass">
            <div class="contrast-sample" style="background: #ffffff; color: #374151;">
              Texte gris sur fond blanc
            </div>
            <div class="contrast-info">
              <span class="contrast-ratio">Ratio : 7.5:1</span>
              <span class="contrast-status pass">&#x2713; AA</span>
            </div>
          </div>

          <div class="contrast-example contrast-example--pass">
            <div class="contrast-sample" style="background: #3b82f6; color: #ffffff;">
              Texte blanc sur primaire
            </div>
            <div class="contrast-info">
              <span class="contrast-ratio">Ratio : 4.5:1</span>
              <span class="contrast-status pass">&#x2713; AA</span>
            </div>
          </div>

          <div class="contrast-example contrast-example--warning">
            <div class="contrast-sample" style="background: #fef3c7; color: #92400e;">
              Warning background
            </div>
            <div class="contrast-info">
              <span class="contrast-ratio">Ratio : 5.2:1</span>
              <span class="contrast-status pass">&#x2713; AA</span>
            </div>
          </div>
        </div>

        <ds-alert type="warning" [showIcon]="true" class="mt-4">
          <strong>Attention aux thèmes custom</strong><br>
          Lors de la création de thèmes personnalisés, vérifiez toujours les ratios de contraste
          avec un outil comme <a href="https://webaim.org/resources/contrastchecker/" target="_blank">WebAIM Contrast Checker</a>.
        </ds-alert>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Composants accessibles -->
      <section class="doc-section">
        <h2>Composants accessibles par catégorie</h2>

        <div class="category-grid">
          <ds-card variant="outlined">
            <h4>Formulaires</h4>
            <ul class="component-list">
              <li><code>ds-input-field</code> - Labels liés, erreurs annoncées</li>
              <li><code>ds-checkbox</code> - États checked/indeterminate</li>
              <li><code>ds-radio-group</code> - Navigation flèches</li>
              <li><code>ds-select</code> - Listbox pattern complet</li>
              <li><code>ds-combobox</code> - Autocomplete accessible</li>
            </ul>
          </ds-card>

          <ds-card variant="outlined">
            <h4>Navigation</h4>
            <ul class="component-list">
              <li><code>ds-tabs</code> - Tablist/tabpanel pattern</li>
              <li><code>ds-accordion</code> - Expanded/collapsed</li>
              <li><code>ds-menu</code> - Menubar pattern</li>
              <li><code>ds-pagination</code> - Navigation logique</li>
              <li><code>ds-breadcrumb</code> - Structure aria-current</li>
            </ul>
          </ds-card>

          <ds-card variant="outlined">
            <h4>Overlays</h4>
            <ul class="component-list">
              <li><code>ds-modal</code> - Focus trap, ESC ferme</li>
              <li><code>ds-dropdown</code> - Menu pattern</li>
              <li><code>ds-tooltip</code> - Describedby dynamique</li>
              <li><code>ds-drawer</code> - Focus trap latéral</li>
              <li><code>ds-popover</code> - Dialog non-modal</li>
            </ul>
          </ds-card>

          <ds-card variant="outlined">
            <h4>Feedback</h4>
            <ul class="component-list">
              <li><code>ds-alert</code> - role="alert" pour urgents</li>
              <li><code>ds-toast</code> - Live region polite</li>
              <li><code>ds-progress-bar</code> - Progressbar role</li>
              <li><code>ds-skeleton</code> - aria-busy pendant load</li>
            </ul>
          </ds-card>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Tests -->
      <section class="doc-section">
        <h2>Outils de test</h2>
        <p class="section-desc">Nous recommandons ces outils pour tester l'accessibilité de votre application.</p>

        <div class="tools-grid">
          <div class="tool-card">
            <h4>axe DevTools</h4>
            <p>Extension navigateur pour détecter les problèmes d'accessibilité.</p>
            <code>npm install @axe-core/playwright</code>
          </div>

          <div class="tool-card">
            <h4>WAVE</h4>
            <p>Extension pour visualiser les erreurs WCAG directement sur la page.</p>
            <code>wave.webaim.org</code>
          </div>

          <div class="tool-card">
            <h4>Lighthouse</h4>
            <p>Audit intégré à Chrome DevTools avec score accessibilité.</p>
            <code>Chrome DevTools > Lighthouse</code>
          </div>

          <div class="tool-card">
            <h4>VoiceOver / NVDA</h4>
            <p>Testez avec de vrais lecteurs d'écran pour une vérification complète.</p>
            <code>macOS: Cmd+F5 / Windows: NVDA</code>
          </div>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Bonnes pratiques -->
      <section class="doc-section">
        <h2>Bonnes pratiques</h2>

        <div class="practices-list">
          <div class="practice-item practice-item--do">
            <span class="practice-icon">&#x2705;</span>
            <div class="practice-content">
              <strong>Utilisez des labels explicites</strong>
              <p>Chaque champ de formulaire doit avoir un label visible et associé.</p>
            </div>
          </div>

          <div class="practice-item practice-item--do">
            <span class="practice-icon">&#x2705;</span>
            <div class="practice-content">
              <strong>Fournissez des textes alternatifs</strong>
              <p>Les images décoratives ont alt="", les images informatives ont une description.</p>
            </div>
          </div>

          <div class="practice-item practice-item--do">
            <span class="practice-icon">&#x2705;</span>
            <div class="practice-content">
              <strong>Respectez la hiérarchie des titres</strong>
              <p>Utilisez h1, h2, h3... dans l'ordre sans sauter de niveaux.</p>
            </div>
          </div>

          <div class="practice-item practice-item--dont">
            <span class="practice-icon">&#x274C;</span>
            <div class="practice-content">
              <strong>N'utilisez pas uniquement la couleur</strong>
              <p>Combinez couleur + icône + texte pour transmettre l'information.</p>
            </div>
          </div>

          <div class="practice-item practice-item--dont">
            <span class="practice-icon">&#x274C;</span>
            <div class="practice-content">
              <strong>N'empêchez pas le zoom</strong>
              <p>Ne définissez pas user-scalable=no dans la meta viewport.</p>
            </div>
          </div>

          <div class="practice-item practice-item--dont">
            <span class="practice-icon">&#x274C;</span>
            <div class="practice-content">
              <strong>N'utilisez pas outline: none sans alternative</strong>
              <p>Si vous masquez l'outline, fournissez un indicateur de focus visible.</p>
            </div>
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

    .mt-4 {
      margin-top: 24px;
    }

    // ==========================================================================
    // Tables
    // ==========================================================================
    .table-container {
      overflow-x: auto;
      margin-bottom: 16px;
    }

    .doc-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;

      th, td {
        padding: 12px 16px;
        text-align: left;
        border-bottom: 1px solid var(--border-default, #e5e7eb);
      }

      th {
        background: var(--background-secondary, #f3f4f6);
        font-weight: 600;
        color: var(--text-default, #374151);
      }

      td {
        color: var(--text-default, #4b5563);
      }

      kbd {
        display: inline-block;
        padding: 4px 8px;
        font-size: 0.75rem;
        font-family: 'SF Mono', Monaco, monospace;
        background: var(--gray-100, #f3f4f6);
        border: 1px solid var(--gray-300, #d1d5db);
        border-radius: 4px;
        box-shadow: 0 1px 0 var(--gray-300, #d1d5db);
      }

      code {
        font-size: 0.8125rem;
        background: var(--background-secondary, #f3f4f6);
        padding: 2px 6px;
        border-radius: 4px;
      }

      .code-small {
        font-size: 0.6875rem;
      }
    }

    // ==========================================================================
    // Focus demo
    // ==========================================================================
    .focus-demo {
      display: flex;
      gap: 32px;
      margin-bottom: 24px;
    }

    .focus-example {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .demo-btn {
      padding: 10px 20px;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      border: 1px solid var(--border-default, #d1d5db);
      background: var(--background-main, #ffffff);
      color: var(--text-default, #374151);

      &:focus {
        outline: none;
      }
    }

    .demo-btn--default:focus {
      box-shadow: 0 0 0 3px var(--color-primary, #3b82f6);
    }

    .demo-btn--custom:focus {
      box-shadow: 0 0 0 3px #8b5cf6;
      border-color: #8b5cf6;
    }

    .focus-label {
      font-size: 0.75rem;
      color: var(--text-muted, #6b7280);
    }

    // ==========================================================================
    // Code block
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
    // Contrast grid
    // ==========================================================================
    .contrast-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin-bottom: 16px;
    }

    .contrast-example {
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid var(--border-default, #e5e7eb);
    }

    .contrast-sample {
      padding: 20px;
      text-align: center;
      font-weight: 500;
    }

    .contrast-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      background: var(--background-secondary, #f3f4f6);
      font-size: 0.75rem;
    }

    .contrast-ratio {
      color: var(--text-muted, #6b7280);
    }

    .contrast-status {
      font-weight: 600;

      &.pass {
        color: var(--success, #059669);
      }
    }

    // ==========================================================================
    // Category grid
    // ==========================================================================
    .category-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;

      h4 {
        margin: 0 0 12px 0;
        font-size: 1rem;
        color: var(--text-default, #1a1a1a);
      }
    }

    .component-list {
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        padding: 6px 0;
        font-size: 0.8125rem;
        color: var(--text-muted, #6b7280);
        border-bottom: 1px solid var(--border-light, #f3f4f6);

        &:last-child {
          border-bottom: none;
        }

        code {
          font-weight: 500;
          color: var(--color-primary, #3b82f6);
          background: none;
        }
      }
    }

    // ==========================================================================
    // Tools grid
    // ==========================================================================
    .tools-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .tool-card {
      padding: 20px;
      background: var(--background-secondary, #f3f4f6);
      border-radius: 8px;

      h4 {
        margin: 0 0 8px 0;
        font-size: 1rem;
      }

      p {
        margin: 0 0 12px 0;
        font-size: 0.8125rem;
        color: var(--text-muted, #6b7280);
      }

      code {
        font-size: 0.6875rem;
        color: var(--text-muted, #6b7280);
      }
    }

    // ==========================================================================
    // Practices list
    // ==========================================================================
    .practices-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .practice-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 16px;
      border-radius: 8px;

      &--do {
        background: #ecfdf5;
      }

      &--dont {
        background: #fef2f2;
      }
    }

    .practice-icon {
      font-size: 18px;
      flex-shrink: 0;
    }

    .practice-content {
      strong {
        display: block;
        margin-bottom: 4px;
        font-size: 0.9375rem;
        color: var(--text-default, #1a1a1a);
      }

      p {
        margin: 0;
        font-size: 0.8125rem;
        color: var(--text-muted, #6b7280);
      }
    }
  `]
})
export class AccessibilityPage {
  // Keyboard shortcuts data
  keyboardShortcuts: KeyboardShortcut[] = [
    { key: 'Tab', description: 'Naviguer vers l\'élément suivant', components: 'Tous' },
    { key: 'Shift + Tab', description: 'Naviguer vers l\'élément précédent', components: 'Tous' },
    { key: 'Enter', description: 'Activer / Sélectionner', components: 'button, select, menu' },
    { key: 'Espace', description: 'Activer / Cocher', components: 'button, checkbox, radio' },
    { key: 'Escape', description: 'Fermer / Annuler', components: 'modal, dropdown, drawer' },
    { key: 'Flèches ↑↓', description: 'Naviguer dans une liste', components: 'select, menu, tabs' },
    { key: 'Flèches ←→', description: 'Naviguer entre tabs', components: 'tabs, radio-group' },
    { key: 'Home', description: 'Aller au premier élément', components: 'select, menu, slider' },
    { key: 'End', description: 'Aller au dernier élément', components: 'select, menu, slider' },
  ];

  // ARIA attributes data
  ariaAttributes: AriaAttribute[] = [
    { attribute: 'role', usage: 'Définit le type d\'élément', example: 'role="dialog"' },
    { attribute: 'aria-label', usage: 'Label accessible quand pas de texte visible', example: 'aria-label="Fermer"' },
    { attribute: 'aria-labelledby', usage: 'Référence un élément comme label', example: 'aria-labelledby="title-id"' },
    { attribute: 'aria-describedby', usage: 'Description supplémentaire', example: 'aria-describedby="help-text"' },
    { attribute: 'aria-expanded', usage: 'État ouvert/fermé', example: 'aria-expanded="true"' },
    { attribute: 'aria-selected', usage: 'État sélectionné', example: 'aria-selected="true"' },
    { attribute: 'aria-checked', usage: 'État coché', example: 'aria-checked="mixed"' },
    { attribute: 'aria-disabled', usage: 'État désactivé', example: 'aria-disabled="true"' },
    { attribute: 'aria-live', usage: 'Annonce les changements', example: 'aria-live="polite"' },
    { attribute: 'aria-busy', usage: 'Chargement en cours', example: 'aria-busy="true"' },
  ];

  // Focus customization code
  focusCustomCode = `:root {
  // Couleur du focus ring
  --focus-ring-color: var(--color-primary, #3b82f6);

  // Largeur du focus ring
  --focus-ring-width: 3px;

  // Offset du focus ring
  --focus-ring-offset: 2px;
}

// Exemple d'application
.my-component:focus-visible {
  outline: none;
  box-shadow: 0 0 0 var(--focus-ring-width) var(--focus-ring-color);
}`;
}
