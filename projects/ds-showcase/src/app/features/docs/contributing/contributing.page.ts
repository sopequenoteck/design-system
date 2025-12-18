import { Component } from '@angular/core';
import { DsDivider, DsCard, DsAlert } from 'ds-angular';

@Component({
  selector: 'app-contributing-page',
  standalone: true,
  imports: [DsDivider, DsCard, DsAlert],
  template: `
    <div class="doc-page">
      <header class="doc-header">
        <span class="doc-badge">Guide</span>
        <h1 class="doc-title">Contributing</h1>
        <p class="doc-desc">
          Guide pour contribuer au design system DS-Angular.
        </p>
      </header>

      <!-- Section: Structure projet -->
      <section class="doc-section">
        <h2>1. Structure du projet</h2>
        <p class="section-desc">
          Organisation des fichiers et dossiers du design system.
        </p>

        <div class="code-block">
          <pre><code>{{ projectStructure }}</code></pre>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Créer un composant -->
      <section class="doc-section">
        <h2>2. Créer un nouveau composant</h2>
        <p class="section-desc">
          Étapes pour ajouter un nouveau composant au design system.
        </p>

        <h3>Étape 1 : Créer les fichiers</h3>
        <div class="code-block">
          <pre><code>{{ createFilesCode }}</code></pre>
        </div>

        <h3>Étape 2 : Implémenter le composant</h3>
        <div class="code-block">
          <pre><code>{{ componentTemplateCode }}</code></pre>
        </div>

        <h3>Étape 3 : Créer les tests</h3>
        <div class="code-block">
          <pre><code>{{ testTemplateCode }}</code></pre>
        </div>

        <h3>Étape 4 : Créer les stories</h3>
        <div class="code-block">
          <pre><code>{{ storiesTemplateCode }}</code></pre>
        </div>

        <h3>Étape 5 : Exporter le composant</h3>
        <div class="code-block">
          <pre><code>{{ exportCode }}</code></pre>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Conventions -->
      <section class="doc-section">
        <h2>3. Conventions de code</h2>

        <div class="conventions-grid">
          <ds-card variant="outlined">
            <h4>Nommage des composants</h4>
            <ul>
              <li>Prefix <code>ds-</code> pour les composants</li>
              <li>Prefix <code>primitive-</code> pour les primitives</li>
              <li>Nom en kebab-case : <code>ds-my-component</code></li>
              <li>Classe en PascalCase : <code>DsMyComponent</code></li>
            </ul>
          </ds-card>

          <ds-card variant="outlined">
            <h4>Nommage des tokens</h4>
            <ul>
              <li>SCSS : <code>$component-property-variant</code></li>
              <li>CSS : <code>--component-property-variant</code></li>
              <li>Exemple : <code>$btn-height-md</code></li>
              <li>Exemple : <code>--btn-height-md</code></li>
            </ul>
          </ds-card>

          <ds-card variant="outlined">
            <h4>Classes CSS (BEM)</h4>
            <ul>
              <li>Block : <code>.ds-button</code></li>
              <li>Element : <code>.ds-button__icon</code></li>
              <li>Modifier : <code>.ds-button--primary</code></li>
              <li>State : <code>.ds-button--disabled</code></li>
            </ul>
          </ds-card>

          <ds-card variant="outlined">
            <h4>TypeScript</h4>
            <ul>
              <li>Signals pour l'état : <code>signal()</code></li>
              <li>Inputs typés : <code>input&lt;Type&gt;()</code></li>
              <li>Outputs typés : <code>output&lt;Type&gt;()</code></li>
              <li>Standalone components uniquement</li>
            </ul>
          </ds-card>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Tokens -->
      <section class="doc-section">
        <h2>4. Ajouter des tokens</h2>
        <p class="section-desc">
          Comment ajouter des tokens sémantiques pour un nouveau composant.
        </p>

        <h3>1. Tokens sémantiques (_semantic.scss)</h3>
        <div class="code-block">
          <pre><code>{{ semanticTokensCode }}</code></pre>
        </div>

        <h3>2. Exposition CSS (_tokens.scss)</h3>
        <div class="code-block">
          <pre><code>{{ cssTokensCode }}</code></pre>
        </div>

        <h3>3. Thèmes (_light.scss, _dark.scss)</h3>
        <div class="code-block">
          <pre><code>{{ themeTokensCode }}</code></pre>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Pull Request -->
      <section class="doc-section">
        <h2>5. Pull Request workflow</h2>

        <div class="workflow-steps">
          <div class="workflow-step">
            <span class="step-number">1</span>
            <div class="step-content">
              <strong>Fork & Clone</strong>
              <p>Forkez le repo et clonez-le localement.</p>
            </div>
          </div>

          <div class="workflow-step">
            <span class="step-number">2</span>
            <div class="step-content">
              <strong>Créer une branche</strong>
              <code>git checkout -b feat/ds-my-component</code>
            </div>
          </div>

          <div class="workflow-step">
            <span class="step-number">3</span>
            <div class="step-content">
              <strong>Développer</strong>
              <p>Implémentez le composant avec tests et stories.</p>
            </div>
          </div>

          <div class="workflow-step">
            <span class="step-number">4</span>
            <div class="step-content">
              <strong>Tests & Lint</strong>
              <code>npm run test:headless && npm run lint</code>
            </div>
          </div>

          <div class="workflow-step">
            <span class="step-number">5</span>
            <div class="step-content">
              <strong>Commit (Conventional)</strong>
              <code>git commit -m "feat(ds-my-component): add new component"</code>
            </div>
          </div>

          <div class="workflow-step">
            <span class="step-number">6</span>
            <div class="step-content">
              <strong>Push & PR</strong>
              <p>Créez une PR avec description et screenshots.</p>
            </div>
          </div>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Checklist -->
      <section class="doc-section">
        <h2>6. Checklist PR</h2>

        <ds-alert type="info" [showIcon]="true">
          Avant de soumettre votre PR, vérifiez que vous avez :
        </ds-alert>

        <div class="checklist">
          <label class="checklist-item">
            <input type="checkbox" disabled />
            <span>Créé le composant avec types TypeScript</span>
          </label>
          <label class="checklist-item">
            <input type="checkbox" disabled />
            <span>Ajouté les tokens sémantiques</span>
          </label>
          <label class="checklist-item">
            <input type="checkbox" disabled />
            <span>Ajouté les tokens aux thèmes light/dark</span>
          </label>
          <label class="checklist-item">
            <input type="checkbox" disabled />
            <span>Écrit les tests unitaires (couverture ≥ 80%)</span>
          </label>
          <label class="checklist-item">
            <input type="checkbox" disabled />
            <span>Créé les stories Storybook</span>
          </label>
          <label class="checklist-item">
            <input type="checkbox" disabled />
            <span>Vérifié l'accessibilité (WCAG 2.1 AA)</span>
          </label>
          <label class="checklist-item">
            <input type="checkbox" disabled />
            <span>Exporté le composant dans index.ts</span>
          </label>
          <label class="checklist-item">
            <input type="checkbox" disabled />
            <span>Utilisé le format Conventional Commits</span>
          </label>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Commandes -->
      <section class="doc-section">
        <h2>7. Commandes utiles</h2>

        <div class="commands-table">
          <table class="doc-table">
            <thead>
              <tr>
                <th>Commande</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>npm run build:lib</code></td>
                <td>Build de la bibliothèque</td>
              </tr>
              <tr>
                <td><code>npm run test:headless</code></td>
                <td>Tests en mode headless</td>
              </tr>
              <tr>
                <td><code>npm run test:coverage</code></td>
                <td>Tests avec couverture</td>
              </tr>
              <tr>
                <td><code>npm run storybook</code></td>
                <td>Lancer Storybook (port 6006)</td>
              </tr>
              <tr>
                <td><code>npm run lint</code></td>
                <td>Linter le code</td>
              </tr>
              <tr>
                <td><code>npm run showcase</code></td>
                <td>Lancer ds-showcase (port 4200)</td>
              </tr>
            </tbody>
          </table>
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

    .conventions-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;

      h4 {
        margin: 0 0 12px 0;
        font-size: 1rem;
      }

      ul {
        margin: 0;
        padding-left: 20px;

        li {
          font-size: 0.8125rem;
          color: var(--text-muted, #6b7280);
          margin-bottom: 4px;

          code {
            background: var(--background-secondary, #f3f4f6);
            padding: 1px 4px;
            border-radius: 3px;
            font-size: 0.75rem;
          }
        }
      }
    }

    .workflow-steps {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .workflow-step {
      display: flex;
      align-items: flex-start;
      gap: 16px;
    }

    .step-number {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-primary, #3b82f6);
      color: white;
      border-radius: 50%;
      font-weight: 600;
      font-size: 0.875rem;
      flex-shrink: 0;
    }

    .step-content {
      strong {
        display: block;
        margin-bottom: 4px;
        color: var(--text-default, #1a1a1a);
      }

      p {
        margin: 0;
        font-size: 0.875rem;
        color: var(--text-muted, #6b7280);
      }

      code {
        display: inline-block;
        margin-top: 4px;
        padding: 4px 8px;
        background: var(--gray-100, #f3f4f6);
        border-radius: 4px;
        font-size: 0.75rem;
      }
    }

    .checklist {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 16px;
    }

    .checklist-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: var(--background-secondary, #f3f4f6);
      border-radius: 6px;
      cursor: default;

      input {
        width: 18px;
        height: 18px;
      }

      span {
        font-size: 0.875rem;
        color: var(--text-default, #374151);
      }
    }

    .commands-table {
      overflow-x: auto;
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
        background: var(--gray-100, #f3f4f6);
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 0.8125rem;
      }
    }
  `]
})
export class ContributingPage {
  projectStructure = `projects/ds-angular/src/lib/
├── primitives/              # Composants atomiques
│   ├── primitive-button/
│   ├── primitive-input/
│   └── ...
├── components/              # Composants DS complets
│   ├── ds-button/
│   │   ├── ds-button.ts
│   │   ├── ds-button.html
│   │   ├── ds-button.scss
│   │   ├── ds-button.spec.ts
│   │   └── ds-button.stories.ts
│   ├── ds-modal/
│   └── ...
├── utils/                   # Utilitaires partagés
├── styles/
│   ├── tokens/
│   │   ├── _primitives.scss   # Variables SCSS brutes
│   │   ├── _semantic.scss     # Variables sémantiques
│   │   └── _tokens.scss       # CSS custom properties
│   └── themes/
│       ├── _light.scss
│       ├── _dark.scss
│       └── _custom.scss
└── public-api.ts            # Exports publics`;

  createFilesCode = `# Créer le dossier du composant
mkdir -p projects/ds-angular/src/lib/components/ds-my-component

# Créer les fichiers
touch ds-my-component.ts
touch ds-my-component.html
touch ds-my-component.scss
touch ds-my-component.spec.ts
touch ds-my-component.stories.ts`;

  componentTemplateCode = `// ds-my-component.ts
import { Component, input, output } from '@angular/core';

export type MyComponentSize = 'sm' | 'md' | 'lg';
export type MyComponentVariant = 'default' | 'primary' | 'secondary';

@Component({
  selector: 'ds-my-component',
  standalone: true,
  templateUrl: './ds-my-component.html',
  styleUrl: './ds-my-component.scss',
  host: {
    'class': 'ds-my-component',
    '[class.ds-my-component--sm]': 'size() === "sm"',
    '[class.ds-my-component--lg]': 'size() === "lg"',
  }
})
export class DsMyComponent {
  // Inputs
  size = input<MyComponentSize>('md');
  variant = input<MyComponentVariant>('default');
  disabled = input<boolean>(false);

  // Outputs
  clicked = output<void>();

  onClick(): void {
    if (!this.disabled()) {
      this.clicked.emit();
    }
  }
}`;

  testTemplateCode = `// ds-my-component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsMyComponent } from './ds-my-component';

describe('DsMyComponent', () => {
  let component: DsMyComponent;
  let fixture: ComponentFixture<DsMyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsMyComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DsMyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default size md', () => {
    expect(component.size()).toBe('md');
  });

  it('should emit clicked when not disabled', () => {
    const spy = jest.spyOn(component.clicked, 'emit');
    component.onClick();
    expect(spy).toHaveBeenCalled();
  });

  it('should not emit clicked when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    const spy = jest.spyOn(component.clicked, 'emit');
    component.onClick();
    expect(spy).not.toHaveBeenCalled();
  });
});`;

  storiesTemplateCode = `// ds-my-component.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { DsMyComponent } from './ds-my-component';

const meta: Meta<DsMyComponent> = {
  title: 'Components/MyComponent',
  component: DsMyComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary']
    }
  }
};

export default meta;
type Story = StoryObj<DsMyComponent>;

export const Default: Story = {};

export const Primary: Story = {
  args: { variant: 'primary' }
};

export const Small: Story = {
  args: { size: 'sm' }
};

export const Disabled: Story = {
  args: { disabled: true }
};`;

  exportCode = `// components/index.ts
export * from './ds-my-component/ds-my-component';

// public-api.ts
export * from './lib/components';`;

  semanticTokensCode = `// styles/tokens/_semantic.scss

// ==========================================================================
// My Component tokens
// ==========================================================================
$my-component-height-sm: 32px;
$my-component-height-md: 40px;
$my-component-height-lg: 48px;

$my-component-padding-x: $space-4;
$my-component-border-radius: $radius-2;

$my-component-font-size-sm: $font-size-sm;
$my-component-font-size-md: $font-size-base;
$my-component-font-size-lg: $font-size-lg;`;

  cssTokensCode = `// styles/tokens/_tokens.scss

:root {
  // My Component
  --my-component-height-sm: 32px;
  --my-component-height-md: 40px;
  --my-component-height-lg: 48px;

  --my-component-padding-x: var(--space-4);
  --my-component-border-radius: var(--radius-2);
}`;

  themeTokensCode = `// styles/themes/_light.scss
:root.theme-light {
  --my-component-bg: var(--background-main);
  --my-component-text: var(--text-default);
  --my-component-border: var(--border-default);
  --my-component-hover-bg: var(--background-secondary);
}

// styles/themes/_dark.scss
:root.theme-dark {
  --my-component-bg: var(--gray-800);
  --my-component-text: var(--gray-100);
  --my-component-border: var(--gray-700);
  --my-component-hover-bg: var(--gray-700);
}`;
}
