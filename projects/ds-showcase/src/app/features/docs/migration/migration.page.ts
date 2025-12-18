import { Component } from '@angular/core';
import { DsDivider, DsCard, DsAlert } from 'ds-angular';

@Component({
  selector: 'app-migration-page',
  standalone: true,
  imports: [DsDivider, DsCard, DsAlert],
  template: `
    <div class="doc-page">
      <header class="doc-header">
        <span class="doc-badge">Guide</span>
        <h1 class="doc-title">Migration</h1>
        <p class="doc-desc">
          Guide de migration vers les nouvelles versions de DS-Angular.
        </p>
      </header>

      <!-- Section: Version actuelle -->
      <section class="doc-section">
        <ds-alert type="success" [showIcon]="true">
          <strong>Version actuelle : v1.7.0</strong><br>
          53 composants DS, 7 primitives, Angular 20 compatible.
        </ds-alert>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Politique de versioning -->
      <section class="doc-section">
        <h2>Politique de versioning</h2>
        <p class="section-desc">
          DS-Angular suit le Semantic Versioning (SemVer).
        </p>

        <div class="versioning-grid">
          <ds-card variant="outlined">
            <h4>MAJOR (x.0.0)</h4>
            <p>Breaking changes qui nécessitent des modifications de code.</p>
            <ul>
              <li>Suppression d'API</li>
              <li>Changement de comportement</li>
              <li>Renommage de propriétés</li>
            </ul>
          </ds-card>

          <ds-card variant="outlined">
            <h4>MINOR (0.x.0)</h4>
            <p>Nouvelles fonctionnalités rétrocompatibles.</p>
            <ul>
              <li>Nouveaux composants</li>
              <li>Nouvelles propriétés</li>
              <li>Nouveaux tokens</li>
            </ul>
          </ds-card>

          <ds-card variant="outlined">
            <h4>PATCH (0.0.x)</h4>
            <p>Corrections de bugs rétrocompatibles.</p>
            <ul>
              <li>Fixes de bugs</li>
              <li>Corrections de typos</li>
              <li>Améliorations de performance</li>
            </ul>
          </ds-card>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: v1.7.0 -->
      <section class="doc-section">
        <h2>v1.7.0 (Décembre 2024)</h2>
        <p class="section-desc">Composants navigation et listes.</p>

        <h3>Nouveaux composants</h3>
        <ul class="changelog-list">
          <li><code>ds-sidebar</code> - Navigation verticale avec mode collapsed</li>
          <li><code>ds-nav-list</code> - Liste de navigation avec items</li>
          <li><code>ds-checkbox-list</code> - Liste de checkboxes groupées</li>
          <li><code>ds-list</code>, <code>ds-list-item</code>, <code>ds-list-group</code> - Système de listes</li>
        </ul>

        <h3>Améliorations</h3>
        <ul class="changelog-list">
          <li>Réorganisation Storybook avec structure CoreUI à 3 niveaux</li>
          <li>Amélioration qualité documentation MDX</li>
        </ul>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: v1.6.0 -->
      <section class="doc-section">
        <h2>v1.6.0 (Décembre 2024)</h2>
        <p class="section-desc">Composants formulaires avancés.</p>

        <h3>Nouveaux composants</h3>
        <ul class="changelog-list">
          <li><code>ds-input-number</code> - Input numérique avec stepper +/-</li>
          <li><code>ds-segmented-control</code> - Boutons radio visuels groupés</li>
          <li><code>ds-color-picker</code> - Sélecteur de couleur complet</li>
        </ul>

        <h3>Tokens</h3>
        <ul class="changelog-list">
          <li>54 nouveaux tokens sémantiques pour les 3 composants</li>
          <li>Harmonisation tokens thématiques light/dark/custom</li>
        </ul>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Breaking changes v1.x -->
      <section class="doc-section">
        <h2>Breaking changes v1.x</h2>

        <ds-alert type="warning" [showIcon]="true">
          Ces changements nécessitent des modifications dans votre code.
        </ds-alert>

        <h3>Renommage du package (v1.1.0)</h3>
        <div class="code-block">
          <pre><code>{{ packageRenameCode }}</code></pre>
        </div>

        <h3>Tokens dépréciés supprimés (v1.0.0)</h3>
        <div class="migration-table">
          <table class="doc-table">
            <thead>
              <tr>
                <th>Ancien token</th>
                <th>Nouveau token</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>--badge-bg-color</code></td>
                <td><code>--badge-bg</code></td>
              </tr>
              <tr>
                <td><code>--badge-text-color</code></td>
                <td><code>--badge-text</code></td>
              </tr>
              <tr>
                <td><code>--modal-border</code></td>
                <td><code>--modal-border-color</code></td>
              </tr>
              <tr>
                <td><code>--input-border</code></td>
                <td><code>--input-border-color</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Guide de migration -->
      <section class="doc-section">
        <h2>Guide de migration v0.x → v1.0</h2>

        <h3>Étape 1 : Mettre à jour le package</h3>
        <div class="code-block">
          <pre><code>{{ updatePackageCode }}</code></pre>
        </div>

        <h3>Étape 2 : Mettre à jour les imports</h3>
        <div class="code-block">
          <pre><code>{{ updateImportsCode }}</code></pre>
        </div>

        <h3>Étape 3 : Remplacer les tokens dépréciés</h3>
        <div class="code-block">
          <pre><code>{{ replaceTokensCode }}</code></pre>
        </div>

        <h3>Étape 4 : Vérifier les tests</h3>
        <div class="code-block">
          <pre><code>npm run test:headless</code></pre>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Changelog complet -->
      <section class="doc-section">
        <h2>Changelog complet</h2>

        <div class="changelog-summary">
          <div class="changelog-item">
            <span class="version">v1.7.0</span>
            <span class="date">Déc 2024</span>
            <span class="changes">+6 composants (Sidebar, NavList, Lists)</span>
          </div>
          <div class="changelog-item">
            <span class="version">v1.6.0</span>
            <span class="date">Déc 2024</span>
            <span class="changes">+3 composants (InputNumber, SegmentedControl, ColorPicker)</span>
          </div>
          <div class="changelog-item">
            <span class="version">v1.5.0</span>
            <span class="date">Déc 2024</span>
            <span class="changes">+5 composants (Transfer, Timeline, Notification, Calendar, Carousel)</span>
          </div>
          <div class="changelog-item">
            <span class="version">v1.4.0</span>
            <span class="date">Déc 2024</span>
            <span class="changes">+5 composants (Empty, Rating, Drawer, TimePicker, Tree)</span>
          </div>
          <div class="changelog-item">
            <span class="version">v1.3.0</span>
            <span class="date">Déc 2024</span>
            <span class="changes">+3 composants (Chip, Slider, FileUpload)</span>
          </div>
          <div class="changelog-item">
            <span class="version">v1.2.0</span>
            <span class="date">Déc 2024</span>
            <span class="changes">FontAwesome v7, tokens thématiques</span>
          </div>
          <div class="changelog-item">
            <span class="version">v1.1.0</span>
            <span class="date">Déc 2024</span>
            <span class="changes">Renommage package, Docker, Avatar, Menu</span>
          </div>
          <div class="changelog-item">
            <span class="version">v1.0.0</span>
            <span class="date">Déc 2024</span>
            <span class="changes">Release stable initiale</span>
          </div>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Support -->
      <section class="doc-section">
        <h2>Support</h2>

        <div class="support-grid">
          <ds-card variant="outlined">
            <h4>Signaler un problème</h4>
            <p>Ouvrez une issue sur GitHub avec les détails du problème.</p>
            <code>github.com/kksdev/ds-angular/issues</code>
          </ds-card>

          <ds-card variant="outlined">
            <h4>Demander une fonctionnalité</h4>
            <p>Proposez des améliorations via les feature requests.</p>
            <code>github.com/kksdev/ds-angular/issues/new</code>
          </ds-card>
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

    .versioning-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;

      h4 {
        margin: 0 0 8px 0;
        font-size: 1rem;
        color: var(--color-primary, #3b82f6);
      }

      p {
        margin: 0 0 12px 0;
        font-size: 0.8125rem;
        color: var(--text-muted, #6b7280);
      }

      ul {
        margin: 0;
        padding-left: 16px;

        li {
          font-size: 0.75rem;
          color: var(--text-muted, #9ca3af);
        }
      }
    }

    .changelog-list {
      margin: 0 0 16px 0;
      padding-left: 20px;

      li {
        font-size: 0.875rem;
        color: var(--text-default, #4b5563);
        margin-bottom: 6px;

        code {
          background: var(--background-secondary, #f3f4f6);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.8125rem;
          color: var(--color-primary, #3b82f6);
        }
      }
    }

    .migration-table {
      overflow-x: auto;
      margin-top: 16px;
    }

    .doc-table {
      width: 100%;
      border-collapse: collapse;

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

      td code {
        font-size: 0.8125rem;
      }

      td:first-child code {
        color: var(--error, #dc2626);
        text-decoration: line-through;
      }

      td:last-child code {
        color: var(--success, #059669);
      }
    }

    .changelog-summary {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .changelog-item {
      display: grid;
      grid-template-columns: 80px 100px 1fr;
      gap: 16px;
      padding: 12px 16px;
      background: var(--background-secondary, #f3f4f6);
      border-radius: 6px;
      align-items: center;

      .version {
        font-weight: 600;
        color: var(--color-primary, #3b82f6);
      }

      .date {
        font-size: 0.8125rem;
        color: var(--text-muted, #6b7280);
      }

      .changes {
        font-size: 0.8125rem;
        color: var(--text-default, #4b5563);
      }
    }

    .support-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;

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
        color: var(--text-muted, #9ca3af);
      }
    }
  `]
})
export class MigrationPage {
  packageRenameCode = `# Avant (v1.0.0)
npm install ds-angular

# Après (v1.1.0+)
npm install @kksdev/ds-angular

# Mettre à jour les imports
// Avant
import { DsButton } from 'ds-angular';

// Après
import { DsButton } from '@kksdev/ds-angular';`;

  updatePackageCode = `# Mettre à jour vers la dernière version
npm install @kksdev/ds-angular@latest

# Ou une version spécifique
npm install @kksdev/ds-angular@1.7.0`;

  updateImportsCode = `// Avant (ancienne structure)
import { DsButton } from 'ds-angular/lib/components/ds-button';
import { DsModal } from 'ds-angular/lib/components/ds-modal';

// Après (nouvelle structure)
import { DsButton, DsModal } from '@kksdev/ds-angular';`;

  replaceTokensCode = `/* Rechercher et remplacer dans vos fichiers SCSS */

/* Tokens dépréciés → Nouveaux tokens */
--badge-bg-color    →  --badge-bg
--badge-text-color  →  --badge-text
--modal-border      →  --modal-border-color
--input-border      →  --input-border-color

/* Commande de recherche/remplacement */
# Linux/macOS
find . -name "*.scss" -exec sed -i '' \\
  -e 's/--badge-bg-color/--badge-bg/g' \\
  -e 's/--badge-text-color/--badge-text/g' \\
  {} \\;`;
}
