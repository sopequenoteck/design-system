import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Import des composants via les barrels
import { PrimitiveButton } from '../primitives/primitive-button/primitive-button';
import { PrimitiveInput } from '../primitives/primitive-input/primitive-input';
import { PrimitiveCheckbox } from '../primitives/primitive-checkbox/primitive-checkbox';
import { PrimitiveToggle } from '../primitives/primitive-toggle/primitive-toggle';
import { PrimitiveBadge } from '../primitives/primitive-badge/primitive-badge';
import { DsCard } from '../components/ds-card/ds-card';
import { DsAlert } from '../components/ds-alert/ds-alert';
import { DsProgressBar } from '../components/ds-progress-bar/ds-progress-bar';

/**
 * Story de preview pour comparer le style actuel vs le nouveau style moderne/minimaliste
 */
@Component({
  selector: 'design-preview-comparison',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PrimitiveButton,
    PrimitiveInput,
    PrimitiveCheckbox,
    PrimitiveToggle,
    PrimitiveBadge,
    DsCard,
    DsAlert,
    DsProgressBar,
  ],
  template: `
    <div class="preview-container">
      <h1 class="preview-title">Design System - Comparaison Visuelle</h1>
      <p class="preview-subtitle">Style actuel vs Moderne/Minimaliste propose</p>

      <div class="comparison-grid">
        <!-- Colonne Actuel -->
        <div class="style-column current">
          <div class="column-header">
            <h2>Style Actuel</h2>
            <span class="tag">v1.6.0</span>
          </div>

          <div class="component-section">
            <!-- Buttons -->
            <h3>Buttons</h3>
            <div class="component-row">
              <primitive-button variant="primary">Primary</primitive-button>
              <primitive-button variant="secondary">Secondary</primitive-button>
              <primitive-button variant="ghost">Ghost</primitive-button>
            </div>
            <div class="component-row">
              <primitive-button variant="success">Success</primitive-button>
              <primitive-button variant="warning">Warning</primitive-button>
              <primitive-button variant="error">Error</primitive-button>
            </div>

            <!-- Inputs -->
            <h3>Inputs</h3>
            <div class="component-row vertical">
              <primitive-input placeholder="Placeholder text..."></primitive-input>
            </div>

            <!-- Checkboxes & Toggles -->
            <h3>Selection</h3>
            <div class="component-row">
              <primitive-checkbox [checked]="true" label="Checked"></primitive-checkbox>
              <primitive-checkbox [checked]="false" label="Unchecked"></primitive-checkbox>
              <primitive-toggle [checked]="true" label="Toggle ON"></primitive-toggle>
            </div>

            <!-- Badges -->
            <h3>Badges</h3>
            <div class="component-row">
              <primitive-badge variant="primary">Primary</primitive-badge>
              <primitive-badge variant="success">Success</primitive-badge>
              <primitive-badge variant="warning">Warning</primitive-badge>
              <primitive-badge variant="error">Error</primitive-badge>
            </div>

            <!-- Cards -->
            <h3>Card</h3>
            <ds-card variant="elevated">
              <ng-container dsCardHeader>Card Header</ng-container>
              <ng-container dsCardBody>
                <p>Card content with the current design style.</p>
              </ng-container>
            </ds-card>

            <!-- Alerts -->
            <h3>Alerts</h3>
            <ds-alert type="info" [showIcon]="true">Information message</ds-alert>
            <ds-alert type="success" [showIcon]="true">Success message</ds-alert>

            <!-- Progress -->
            <h3>Progress</h3>
            <ds-progress-bar [value]="65" [showLabel]="true"></ds-progress-bar>
          </div>
        </div>

        <!-- Colonne Propose -->
        <div class="style-column proposed">
          <div class="column-header">
            <h2>Style Propose</h2>
            <span class="tag new">Moderne</span>
          </div>

          <div class="component-section proposed-styles">
            <!-- Buttons -->
            <h3>Buttons</h3>
            <div class="component-row">
              <primitive-button variant="primary">Primary</primitive-button>
              <primitive-button variant="secondary">Secondary</primitive-button>
              <primitive-button variant="ghost">Ghost</primitive-button>
            </div>
            <div class="component-row">
              <primitive-button variant="success">Success</primitive-button>
              <primitive-button variant="warning">Warning</primitive-button>
              <primitive-button variant="error">Error</primitive-button>
            </div>

            <!-- Inputs -->
            <h3>Inputs</h3>
            <div class="component-row vertical">
              <primitive-input placeholder="Placeholder text..."></primitive-input>
            </div>

            <!-- Checkboxes & Toggles -->
            <h3>Selection</h3>
            <div class="component-row">
              <primitive-checkbox [checked]="true" label="Checked"></primitive-checkbox>
              <primitive-checkbox [checked]="false" label="Unchecked"></primitive-checkbox>
              <primitive-toggle [checked]="true" label="Toggle ON"></primitive-toggle>
            </div>

            <!-- Badges -->
            <h3>Badges</h3>
            <div class="component-row">
              <primitive-badge variant="primary">Primary</primitive-badge>
              <primitive-badge variant="success">Success</primitive-badge>
              <primitive-badge variant="warning">Warning</primitive-badge>
              <primitive-badge variant="error">Error</primitive-badge>
            </div>

            <!-- Cards -->
            <h3>Card</h3>
            <ds-card variant="elevated">
              <ng-container dsCardHeader>Card Header</ng-container>
              <ng-container dsCardBody>
                <p>Card content with the proposed modern style.</p>
              </ng-container>
            </ds-card>

            <!-- Alerts -->
            <h3>Alerts</h3>
            <ds-alert type="info" [showIcon]="true">Information message</ds-alert>
            <ds-alert type="success" [showIcon]="true">Success message</ds-alert>

            <!-- Progress -->
            <h3>Progress</h3>
            <ds-progress-bar [value]="65" [showLabel]="true"></ds-progress-bar>
          </div>
        </div>
      </div>

      <!-- Tokens comparison table -->
      <div class="tokens-comparison">
        <h2>Comparaison des Tokens</h2>
        <table>
          <thead>
            <tr>
              <th>Token</th>
              <th>Actuel</th>
              <th>Propose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Primary</td>
              <td><span class="color-swatch" style="background: #7d4bc0"></span> #7d4bc0</td>
              <td><span class="color-swatch" style="background: #6366f1"></span> #6366f1</td>
            </tr>
            <tr>
              <td>Secondary</td>
              <td><span class="color-swatch" style="background: #fbc224"></span> #fbc224</td>
              <td><span class="color-swatch" style="background: #f59e0b"></span> #f59e0b</td>
            </tr>
            <tr>
              <td>Success</td>
              <td><span class="color-swatch" style="background: #4caf50"></span> #4caf50</td>
              <td><span class="color-swatch" style="background: #22c55e"></span> #22c55e</td>
            </tr>
            <tr>
              <td>Warning</td>
              <td><span class="color-swatch" style="background: #ff9800"></span> #ff9800</td>
              <td><span class="color-swatch" style="background: #f97316"></span> #f97316</td>
            </tr>
            <tr>
              <td>Error</td>
              <td><span class="color-swatch" style="background: #f44336"></span> #f44336</td>
              <td><span class="color-swatch" style="background: #ef4444"></span> #ef4444</td>
            </tr>
            <tr>
              <td>Info</td>
              <td><span class="color-swatch" style="background: #2196f3"></span> #2196f3</td>
              <td><span class="color-swatch" style="background: #3b82f6"></span> #3b82f6</td>
            </tr>
          </tbody>
        </table>

        <h3>Autres changements</h3>
        <ul class="changes-list">
          <li><strong>Ombres</strong>: Opacite reduite (18% vers 8%), plus subtiles</li>
          <li><strong>Transitions</strong>: Plus rapides (150ms vers 120ms)</li>
          <li><strong>Focus ring</strong>: Plus fin (3px vers 2px), moins intrusif</li>
          <li><strong>Easing</strong>: cubic-bezier(0.4, 0, 0.2, 1) pour plus de fluidite</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .preview-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      font-family: var(--font-family-base);
    }

    .preview-title {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: var(--text-default);
    }

    .preview-subtitle {
      color: var(--text-muted);
      margin-bottom: 2rem;
    }

    .comparison-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .style-column {
      background: var(--surface-default);
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid var(--border-color);
    }

    .column-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.5rem;
      background: var(--surface-raised);
      border-bottom: 1px solid var(--border-subtle);
    }

    .column-header h2 {
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0;
    }

    .tag {
      font-size: 0.75rem;
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
      background: var(--gray-200);
      color: var(--gray-700);
    }

    .tag.new {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: white;
    }

    .component-section {
      padding: 1.5rem;
    }

    .component-section h3 {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin: 1.5rem 0 0.75rem;
    }

    .component-section h3:first-child {
      margin-top: 0;
    }

    .component-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      align-items: center;
    }

    .component-row.vertical {
      flex-direction: column;
      align-items: stretch;
    }

    /* Override styles for proposed column */
    .proposed-styles {
      /* New color palette */
      --color-primary: #6366f1;
      --brand-primary: #6366f1;
      --color-secondary: #f59e0b;
      --brand-secondary: #f59e0b;
      --success: #22c55e;
      --warning: #f97316;
      --error: #ef4444;
      --info: #3b82f6;

      /* Refined shadows */
      --shadow-1: 0 1px 2px rgba(0,0,0,.05);
      --shadow-2: 0 4px 12px rgba(0,0,0,.08);
      --shadow-3: 0 12px 32px rgba(0,0,0,.12);
      --card-shadow: 0 4px 12px rgba(0,0,0,.08);

      /* Faster transitions */
      --duration-fast: 120ms;
      --duration-normal: 200ms;

      /* Smoother easing */
      --easing-default: cubic-bezier(0.4, 0, 0.2, 1);

      /* Button tokens */
      --btn-primary-bg: #6366f1;
      --btn-primary-hover-bg: #4f46e5;
      --btn-secondary-bg: #f59e0b;
      --btn-secondary-hover-bg: #d97706;
      --btn-success-bg: #22c55e;
      --btn-success-hover-bg: #16a34a;
      --btn-warning-bg: #f97316;
      --btn-warning-hover-bg: #ea580c;
      --btn-error-bg: #ef4444;
      --btn-error-hover-bg: #dc2626;
      --btn-info-bg: #3b82f6;
      --btn-info-hover-bg: #2563eb;

      /* Input tokens */
      --input-focus-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);

      /* Checkbox tokens */
      --checkbox-checked-bg: #6366f1;
      --checkbox-checked-border: #6366f1;
      --checkbox-focus-ring: 0 0 0 2px rgba(99, 102, 241, 0.2);

      /* Toggle tokens */
      --toggle-track-checked-bg: #6366f1;
      --toggle-hover-track-checked-bg: #4f46e5;
      --toggle-focus-ring: 0 0 0 2px rgba(99, 102, 241, 0.2);

      /* Badge tokens */
      --badge-primary-bg: #6366f1;
      --badge-success-bg: #22c55e;
      --badge-warning-bg: #f97316;
      --badge-error-bg: #ef4444;
      --badge-info-bg: #3b82f6;

      /* Alert tokens */
      --alert-info-border: #3b82f6;
      --alert-info-icon: #3b82f6;
      --alert-success-border: #22c55e;
      --alert-success-icon: #22c55e;

      /* Progress tokens */
      --progress-fill-bg: #6366f1;
    }

    /* Tokens comparison table */
    .tokens-comparison {
      background: var(--surface-default);
      border-radius: 12px;
      padding: 1.5rem;
      border: 1px solid var(--border-color);
    }

    .tokens-comparison h2 {
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }

    .tokens-comparison h3 {
      font-size: 1rem;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
    }

    .tokens-comparison table {
      width: 100%;
      border-collapse: collapse;
    }

    .tokens-comparison th,
    .tokens-comparison td {
      padding: 0.75rem 1rem;
      text-align: left;
      border-bottom: 1px solid var(--border-subtle);
    }

    .tokens-comparison th {
      font-weight: 600;
      color: var(--text-muted);
      font-size: 0.875rem;
    }

    .color-swatch {
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 4px;
      vertical-align: middle;
      margin-right: 0.5rem;
      border: 1px solid rgba(0,0,0,0.1);
    }

    .changes-list {
      margin: 0;
      padding-left: 1.5rem;
      color: var(--text-muted);
    }

    .changes-list li {
      margin-bottom: 0.5rem;
    }

    .changes-list strong {
      color: var(--text-default);
    }

    ds-card {
      display: block;
      margin-bottom: 1rem;
    }

    ds-alert {
      display: block;
      margin-bottom: 0.5rem;
    }

    ds-progress-bar {
      display: block;
    }
  `]
})
class DesignPreviewComparisonComponent {}

const meta: Meta<DesignPreviewComparisonComponent> = {
  title: 'Documentation/Design Preview',
  component: DesignPreviewComparisonComponent,
  decorators: [
    moduleMetadata({
      imports: [DesignPreviewComparisonComponent]
    })
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Preview: Style Actuel vs Moderne/Minimaliste

Cette page permet de comparer visuellement le style actuel du Design System avec la proposition moderne/minimaliste.

## Changements principaux

### Couleurs
- **Primary**: Violet sature vers Indigo moderne (#6366f1)
- **Feedback colors**: Couleurs Material vers Palette Tailwind (plus douce)

### Ombres
- Opacite reduite (18% vers 8%)
- Blur optimise
- Style "floating" subtil

### Animations
- Transitions plus rapides (150ms vers 120ms)
- Easing cubic-bezier pour fluidite

### Focus rings
- Plus fins (3px vers 2px)
- Opacite reduite pour subtilite
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj<DesignPreviewComparisonComponent>;

export const Comparison: Story = {
  name: 'Comparaison Cote a Cote'
};
