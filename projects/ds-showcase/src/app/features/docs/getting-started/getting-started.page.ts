import { Component } from '@angular/core';
import { DsDivider, DsCard, DsButton } from 'ds-angular';

@Component({
  selector: 'app-getting-started-page',
  standalone: true,
  imports: [DsDivider, DsCard, DsButton],
  template: `
    <div class="doc-page">
      <header class="doc-header">
        <span class="doc-badge">Guide</span>
        <h1 class="doc-title">Getting Started</h1>
        <p class="doc-desc">
          Guide complet pour installer et utiliser DS-Angular dans vos projets.
        </p>
      </header>

      <!-- Section: Pourquoi DS-Angular -->
      <section class="doc-section">
        <h2>Pourquoi DS-Angular ?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <span class="feature-icon">&#x1F3A8;</span>
            <h4>Design System complet</h4>
            <p>53 composants prêts à l'emploi, des primitives aux composants complexes.</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">&#x2699;&#xFE0F;</span>
            <h4>Personnalisable</h4>
            <p>Tokens CSS, thèmes light/dark/custom, architecture à 3 couches.</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">&#x267F;</span>
            <h4>Accessible</h4>
            <p>WCAG 2.1 AA, navigation clavier, ARIA complet sur tous les composants.</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">&#x26A1;</span>
            <h4>Performant</h4>
            <p>Tree-shaking, lazy-loading, Angular 20 standalone components.</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">&#x1F4DD;</span>
            <h4>Documenté</h4>
            <p>Storybook interactif, guides d'utilisation, exemples de code.</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">&#x1F527;</span>
            <h4>TypeScript natif</h4>
            <p>Types complets, IntelliSense, refactoring sûr.</p>
          </div>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Architecture -->
      <section class="doc-section">
        <h2>Architecture à 3 couches</h2>
        <p class="section-desc">Le design system est organisé en 3 niveaux pour une flexibilité maximale.</p>

        <div class="architecture-diagram">
          <div class="arch-layer arch-layer--primitives">
            <strong>Primitives</strong>
            <span>Composants atomiques sans logique métier</span>
            <code>primitive-button, primitive-input, primitive-checkbox...</code>
          </div>
          <div class="arch-arrow">&#x2193;</div>
          <div class="arch-layer arch-layer--components">
            <strong>Components</strong>
            <span>Composants DS complets avec features</span>
            <code>ds-button, ds-input-field, ds-modal, ds-table...</code>
          </div>
          <div class="arch-arrow">&#x2193;</div>
          <div class="arch-layer arch-layer--compositions">
            <strong>Compositions</strong>
            <span>Assemblages de composants (votre app)</span>
            <code>Dashboard, Forms, Settings...</code>
          </div>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Installation -->
      <section class="doc-section">
        <h2>Installation</h2>

        <h3>1. Installer le package</h3>
        <div class="code-tabs">
          <div class="code-tab active">npm</div>
          <div class="code-tab">yarn</div>
          <div class="code-tab">pnpm</div>
        </div>
        <div class="code-block">
          <pre><code>{{ installNpm }}</code></pre>
        </div>

        <h3>2. Importer les styles</h3>
        <p class="section-desc">Ajoutez les styles dans votre fichier <code>styles.scss</code> :</p>
        <div class="code-block">
          <pre><code>{{ stylesImport }}</code></pre>
        </div>

        <h3>3. Configurer FontAwesome (optionnel)</h3>
        <p class="section-desc">Pour les icônes, installez FontAwesome :</p>
        <div class="code-block">
          <pre><code>{{ fontawesomeInstall }}</code></pre>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Premier composant -->
      <section class="doc-section">
        <h2>Premier composant</h2>
        <p class="section-desc">Utilisez votre premier composant DS en 3 étapes.</p>

        <h3>1. Importer le composant</h3>
        <div class="code-block">
          <pre><code>{{ firstComponentImport }}</code></pre>
        </div>

        <h3>2. Utiliser dans le template</h3>
        <div class="code-block">
          <pre><code>{{ firstComponentTemplate }}</code></pre>
        </div>

        <h3>Resultat</h3>
        <div class="demo-box">
          <ds-button variant="primary">Mon premier bouton</ds-button>
          <ds-button variant="secondary">Bouton secondary</ds-button>
          <ds-button variant="ghost">Bouton ghost</ds-button>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Exemple formulaire -->
      <section class="doc-section">
        <h2>Exemple : Formulaire de connexion</h2>
        <p class="section-desc">Un exemple complet avec validation.</p>

        <div class="code-block">
          <pre><code>{{ loginFormCode }}</code></pre>
        </div>

        <h3>Apercu</h3>
        <div class="demo-box demo-box--form">
          <ds-card variant="elevated" class="login-card-demo">
            <h3>Connexion</h3>
            <div class="form-field-demo">
              <label>Email</label>
              <input type="email" placeholder="votre@email.com" class="input-demo" />
            </div>
            <div class="form-field-demo">
              <label>Mot de passe</label>
              <input type="password" placeholder="********" class="input-demo" />
            </div>
            <ds-button variant="primary" class="full-width">Se connecter</ds-button>
          </ds-card>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Exemple modal -->
      <section class="doc-section">
        <h2>Exemple : Modal de confirmation</h2>
        <p class="section-desc">Utilisation des slots header/footer.</p>

        <div class="code-block">
          <pre><code>{{ modalExampleCode }}</code></pre>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Prochaines étapes -->
      <section class="doc-section">
        <h2>Prochaines étapes</h2>
        <div class="next-steps-grid">
          <ds-card variant="outlined" class="next-step-card">
            <h4>&#x1F3A8; Design Tokens</h4>
            <p>Découvrez les variables CSS pour personnaliser les composants.</p>
            <ds-button variant="ghost" size="sm">Voir les tokens</ds-button>
          </ds-card>
          <ds-card variant="outlined" class="next-step-card">
            <h4>&#x1F319; Theming</h4>
            <p>Apprenez à créer vos propres thèmes light/dark/custom.</p>
            <ds-button variant="ghost" size="sm">Guide theming</ds-button>
          </ds-card>
          <ds-card variant="outlined" class="next-step-card">
            <h4>&#x1F4DD; Examples</h4>
            <p>Explorez des compositions complètes : Dashboard, Forms, Todo...</p>
            <ds-button variant="ghost" size="sm">Voir les exemples</ds-button>
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
      margin: 0 0 16px 0;
      font-size: 0.875rem;
      color: var(--text-muted, #6b7280);

      code {
        background: var(--background-secondary, #f3f4f6);
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 0.8125rem;
      }
    }

    // ==========================================================================
    // Features grid
    // ==========================================================================
    .features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    .feature-card {
      padding: 20px;
      background: var(--background-secondary, #f3f4f6);
      border-radius: 8px;

      .feature-icon {
        font-size: 28px;
        display: block;
        margin-bottom: 12px;
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

    // ==========================================================================
    // Architecture diagram
    // ==========================================================================
    .architecture-diagram {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .arch-layer {
      width: 100%;
      padding: 20px;
      border-radius: 8px;
      text-align: center;

      strong {
        display: block;
        font-size: 1rem;
        margin-bottom: 4px;
      }

      span {
        display: block;
        font-size: 0.8125rem;
        margin-bottom: 8px;
      }

      code {
        font-size: 0.75rem;
        opacity: 0.8;
      }
    }

    .arch-layer--primitives {
      background: #fef3c7;
      color: #92400e;
    }

    .arch-layer--components {
      background: #dbeafe;
      color: #1e40af;
    }

    .arch-layer--compositions {
      background: #d1fae5;
      color: #065f46;
    }

    .arch-arrow {
      font-size: 24px;
      color: var(--text-muted, #9ca3af);
    }

    // ==========================================================================
    // Code blocks
    // ==========================================================================
    .code-tabs {
      display: flex;
      gap: 0;
      margin-bottom: 0;
    }

    .code-tab {
      padding: 8px 16px;
      font-size: 0.75rem;
      font-weight: 500;
      background: var(--gray-800, #1f2937);
      color: var(--gray-400, #9ca3af);
      cursor: pointer;
      border-radius: 8px 8px 0 0;

      &.active {
        background: var(--gray-900, #111827);
        color: #ffffff;
      }
    }

    .code-block {
      background: var(--gray-900, #111827);
      border-radius: 0 8px 8px 8px;
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
    // Demo box
    // ==========================================================================
    .demo-box {
      padding: 24px;
      background: var(--background-secondary, #f3f4f6);
      border-radius: 8px;
      display: flex;
      gap: 12px;
      align-items: center;
      flex-wrap: wrap;
    }

    .demo-box--form {
      justify-content: center;
    }

    .login-card-demo {
      width: 320px;
      padding: 24px;

      h3 {
        margin: 0 0 20px 0;
        text-align: center;
      }
    }

    .form-field-demo {
      margin-bottom: 16px;

      label {
        display: block;
        font-size: 0.875rem;
        font-weight: 500;
        margin-bottom: 6px;
        color: var(--text-default, #374151);
      }
    }

    .input-demo {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid var(--border-default, #d1d5db);
      border-radius: 6px;
      font-size: 0.875rem;
      background: var(--background-main, #ffffff);

      &:focus {
        outline: none;
        border-color: var(--color-primary, #3b82f6);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
    }

    .full-width {
      width: 100%;
    }

    // ==========================================================================
    // Next steps
    // ==========================================================================
    .next-steps-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    .next-step-card {
      h4 {
        margin: 0 0 8px 0;
        font-size: 1rem;
      }

      p {
        margin: 0 0 16px 0;
        font-size: 0.875rem;
        color: var(--text-muted, #6b7280);
      }
    }
  `]
})
export class GettingStartedPage {
  // Code examples
  installNpm = `npm install @kksdev/ds-angular`;

  stylesImport = `// styles.scss
@use '@kksdev/ds-angular/styles';

// Optionnel : importer un thème spécifique
// @use '@kksdev/ds-angular/styles/themes/dark';`;

  fontawesomeInstall = `npm install @fortawesome/fontawesome-svg-core \\
  @fortawesome/free-solid-svg-icons \\
  @fortawesome/angular-fontawesome`;

  firstComponentImport = `import { Component } from '@angular/core';
import { DsButton } from '@kksdev/ds-angular';

@Component({
  standalone: true,
  imports: [DsButton],
  template: \`
    <ds-button variant="primary">Mon premier bouton</ds-button>
  \`
})
export class MyComponent {}`;

  firstComponentTemplate = `<!-- Variantes disponibles -->
<ds-button variant="primary">Primary</ds-button>
<ds-button variant="secondary">Secondary</ds-button>
<ds-button variant="ghost">Ghost</ds-button>
<ds-button variant="success">Success</ds-button>
<ds-button variant="warning">Warning</ds-button>
<ds-button variant="error">Error</ds-button>
<ds-button variant="info">Info</ds-button>

<!-- Tailles -->
<ds-button size="sm">Small</ds-button>
<ds-button size="md">Medium (défaut)</ds-button>
<ds-button size="lg">Large</ds-button>

<!-- États -->
<ds-button [disabled]="true">Désactivé</ds-button>
<ds-button [loading]="true">Chargement...</ds-button>`;

  loginFormCode = `import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DsCard, DsInputField, DsButton, DsAlert } from '@kksdev/ds-angular';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, DsCard, DsInputField, DsButton, DsAlert],
  template: \`
    <ds-card variant="elevated" class="login-card">
      <h2>Connexion</h2>

      @if (error) {
        <ds-alert type="error" [closable]="true" (closed)="error = null">
          {{ error }}
        </ds-alert>
      }

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <ds-input-field
          label="Email"
          type="email"
          formControlName="email"
          [required]="true"
          placeholder="votre@email.com"
        />

        <ds-input-field
          label="Mot de passe"
          type="password"
          formControlName="password"
          [required]="true"
          placeholder="********"
        />

        <ds-button
          type="submit"
          variant="primary"
          [loading]="isLoading"
          [disabled]="form.invalid"
          class="full-width"
        >
          Se connecter
        </ds-button>
      </form>
    </ds-card>
  \`
})
export class LoginComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  isLoading = false;
  error: string | null = null;

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      // ... login logic
    }
  }
}`;

  modalExampleCode = `import { Component, signal } from '@angular/core';
import { DsModal, DsButton } from '@kksdev/ds-angular';

@Component({
  standalone: true,
  imports: [DsModal, DsButton],
  template: \`
    <ds-button (click)="isOpen.set(true)">
      Ouvrir la modal
    </ds-button>

    <ds-modal
      [open]="isOpen()"
      title="Confirmer la suppression"
      (close)="isOpen.set(false)"
    >
      <p>Êtes-vous sûr de vouloir supprimer cet élément ?</p>
      <p>Cette action est irréversible.</p>

      <footer slot="footer">
        <ds-button variant="secondary" (click)="isOpen.set(false)">
          Annuler
        </ds-button>
        <ds-button variant="error" (click)="onConfirm()">
          Supprimer
        </ds-button>
      </footer>
    </ds-modal>
  \`
})
export class ConfirmModalComponent {
  isOpen = signal(false);

  onConfirm() {
    // ... delete logic
    this.isOpen.set(false);
  }
}`;
}
