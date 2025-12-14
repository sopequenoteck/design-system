import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Import des composants via les barrels
import { PrimitiveButton } from '../primitives/primitive-button/primitive-button';
import { PrimitiveInput } from '../primitives/primitive-input/primitive-input';
import { PrimitiveCheckbox } from '../primitives/primitive-checkbox/primitive-checkbox';
import { PrimitiveRadio } from '../primitives/primitive-radio/primitive-radio';
import { PrimitiveToggle } from '../primitives/primitive-toggle/primitive-toggle';
import { PrimitiveBadge } from '../primitives/primitive-badge/primitive-badge';
import { DsCard } from '../components/ds-card/ds-card';
import { DsAlert } from '../components/ds-alert/ds-alert';
import { DsProgressBar } from '../components/ds-progress-bar/ds-progress-bar';
import { DsChip } from '../components/ds-chip/ds-chip';
import { DsAccordion } from '../components/ds-accordion/ds-accordion';
import { DsTabs } from '../components/ds-tabs/ds-tabs';

/**
 * Showcase du nouveau design moderne/minimaliste applique au Design System
 *
 * Phases d'amelioration:
 * - Phase 1: Tokens primitifs (couleurs, ombres, radius)
 * - Phase 2: Primitives (button, input, checkbox, radio, toggle)
 * - Phase 3: Composants formulaires (input-field, textarea, select, combobox, search-input, date-picker)
 * - Phase 4: Composants navigation (tabs, breadcrumb, pagination, stepper, menu, dropdown)
 * - Phase 5: Composants feedback (alert, toast, modal, tooltip, popover, progress-bar)
 * - Phase 6: Composants donnees (table, accordion, card, chip, skeleton, avatar)
 */
@Component({
  selector: 'design-showcase',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PrimitiveButton,
    PrimitiveInput,
    PrimitiveCheckbox,
    PrimitiveRadio,
    PrimitiveToggle,
    PrimitiveBadge,
    DsCard,
    DsAlert,
    DsProgressBar,
    DsChip,
    DsAccordion,
    DsTabs,
  ],
  template: `
    <div class="showcase-container">
      <header class="showcase-header">
        <h1>Design System</h1>
        <p class="subtitle">Style moderne et minimaliste - 6 phases d'amelioration</p>
        <div class="phase-badges">
          <span class="phase-badge completed">Phase 1: Tokens</span>
          <span class="phase-badge completed">Phase 2: Primitives</span>
          <span class="phase-badge completed">Phase 3: Formulaires</span>
          <span class="phase-badge completed">Phase 4: Navigation</span>
          <span class="phase-badge completed">Phase 5: Feedback</span>
          <span class="phase-badge completed">Phase 6: Donnees</span>
        </div>
      </header>

      <!-- Color Palette -->
      <section class="section">
        <h2>Palette de couleurs</h2>
        <p class="section-desc">Couleurs Tailwind-inspired pour un rendu moderne et harmonieux</p>

        <div class="color-grid">
          <div class="color-card">
            <div class="color-swatch primary"></div>
            <div class="color-info">
              <span class="color-name">Primary</span>
              <span class="color-value">#6366f1</span>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch secondary"></div>
            <div class="color-info">
              <span class="color-name">Secondary</span>
              <span class="color-value">#f59e0b</span>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch success"></div>
            <div class="color-info">
              <span class="color-name">Success</span>
              <span class="color-value">#22c55e</span>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch warning"></div>
            <div class="color-info">
              <span class="color-name">Warning</span>
              <span class="color-value">#f97316</span>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch error"></div>
            <div class="color-info">
              <span class="color-name">Error</span>
              <span class="color-value">#ef4444</span>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch info"></div>
            <div class="color-info">
              <span class="color-name">Info</span>
              <span class="color-value">#3b82f6</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Buttons -->
      <section class="section">
        <h2>Boutons <span class="phase-tag">Phase 2</span></h2>
        <p class="section-desc">Transitions fluides (120ms), effet scale au clic, focus ring moderne</p>

        <div class="demo-card">
          <h3>Variants</h3>
          <div class="button-row">
            <primitive-button variant="primary">Primary</primitive-button>
            <primitive-button variant="secondary">Secondary</primitive-button>
            <primitive-button variant="ghost">Ghost</primitive-button>
          </div>

          <h3>Feedback</h3>
          <div class="button-row">
            <primitive-button variant="success">Success</primitive-button>
            <primitive-button variant="warning">Warning</primitive-button>
            <primitive-button variant="error">Error</primitive-button>
            <primitive-button variant="info">Info</primitive-button>
          </div>

          <h3>Tailles</h3>
          <div class="button-row align-end">
            <primitive-button variant="primary" size="sm">Small</primitive-button>
            <primitive-button variant="primary" size="md">Medium</primitive-button>
            <primitive-button variant="primary" size="lg">Large</primitive-button>
          </div>

          <div class="interaction-hint">
            <span class="hint-icon">👆</span>
            Cliquez pour voir l'effet scale(0.98) et survolez pour les transitions
          </div>
        </div>
      </section>

      <!-- Form Elements -->
      <section class="section">
        <h2>Formulaires <span class="phase-tag">Phase 2 & 3</span></h2>
        <p class="section-desc">Focus rings subtils (2px), transitions granulaires par propriete</p>

        <div class="demo-card">
          <div class="form-grid">
            <div class="form-group">
              <h3>Input</h3>
              <primitive-input placeholder="Tapez quelque chose..."></primitive-input>
              <primitive-input placeholder="Avec valeur" value="Design System"></primitive-input>
            </div>

            <div class="form-group">
              <h3>Checkbox</h3>
              <div class="checkbox-group">
                <primitive-checkbox [checked]="true" label="Option activee"></primitive-checkbox>
                <primitive-checkbox [checked]="false" label="Option desactivee"></primitive-checkbox>
                <primitive-checkbox [checked]="true" [indeterminate]="true" label="Indeterminate"></primitive-checkbox>
              </div>
            </div>

            <div class="form-group">
              <h3>Radio</h3>
              <div class="radio-group">
                <primitive-radio name="demo" value="1" [checked]="true" label="Option 1"></primitive-radio>
                <primitive-radio name="demo" value="2" label="Option 2"></primitive-radio>
                <primitive-radio name="demo" value="3" label="Option 3"></primitive-radio>
              </div>
            </div>

            <div class="form-group">
              <h3>Toggle</h3>
              <div class="toggle-group">
                <primitive-toggle [checked]="true" label="Notifications"></primitive-toggle>
                <primitive-toggle [checked]="false" label="Mode sombre"></primitive-toggle>
              </div>
            </div>
          </div>

          <div class="interaction-hint">
            <span class="hint-icon">⌨️</span>
            Naviguez avec Tab pour voir les focus rings modernes (double-ring effect)
          </div>
        </div>
      </section>

      <!-- Chips -->
      <section class="section">
        <h2>Chips <span class="phase-tag">Phase 6</span></h2>
        <p class="section-desc">Transitions granulaires, effet scale au clic, bouton remove interactif</p>

        <div class="demo-card">
          <h3>Variants</h3>
          <div class="chip-row">
            <ds-chip [label]="'Default'">Default</ds-chip>
            <ds-chip [label]="'Primary'" color="primary">Primary</ds-chip>
            <ds-chip [label]="'Success'" color="success">Success</ds-chip>
            <ds-chip [label]="'Warning'" color="warning">Warning</ds-chip>
            <ds-chip [label]="'Error'" color="error">Error</ds-chip>
          </div>

          <h3>Outlined</h3>
          <div class="chip-row">
            <ds-chip [label]="'Default'"  variant="outlined">Default</ds-chip>
            <ds-chip [label]="'Primary'"  variant="outlined" color="primary">Primary</ds-chip>
            <ds-chip [label]="'Success'"  variant="outlined" color="success">Success</ds-chip>
          </div>

          <h3>Removable</h3>
          <div class="chip-row">
            <ds-chip [label]="'Removable'"  [removable]="true">Removable</ds-chip>
            <ds-chip [label]="'Primary'"  [removable]="true" color="primary">Primary</ds-chip>
            <ds-chip [label]="'Error'"  [removable]="true" color="error">Error</ds-chip>
          </div>

          <div class="interaction-hint">
            <span class="hint-icon">✕</span>
            Cliquez sur le bouton X pour voir l'effet scale(0.9) du bouton remove
          </div>
        </div>
      </section>

      <!-- Navigation - Tabs -->
      <section class="section">
        <h2>Tabs <span class="phase-tag">Phase 4</span></h2>
        <p class="section-desc">Indicateur anime, transitions smooth, navigation clavier</p>

        <div class="demo-card">
          <ds-tabs [tabs]="tabItems" [(activeTabId)]="activeTab">
            @if (activeTab === 'overview') {
              <div class="tab-content">
                <h4>Vue d'ensemble</h4>
                <p>Contenu de l'onglet Overview avec transitions fluides.</p>
              </div>
            }
            @if (activeTab === 'features') {
              <div class="tab-content">
                <h4>Fonctionnalités</h4>
                <p>Les tabs supportent la navigation au clavier (fleches, Home, End).</p>
              </div>
            }
            @if (activeTab === 'settings') {
              <div class="tab-content">
                <h4>Parameters</h4>
                <p>Focus ring inset pour une meilleure accessibility.</p>
              </div>
            }
          </ds-tabs>

          <div class="interaction-hint">
            <span class="hint-icon">←→</span>
            Utilisez les fleches gauche/droite pour naviguer entre les onglets
          </div>
        </div>
      </section>

      <!-- Accordion -->
      <section class="section">
        <h2>Accordion <span class="phase-tag">Phase 6</span></h2>
        <p class="section-desc">Animation d'expansion fluide, rotation de l'icone, effet scale subtil</p>

        <div class="demo-card">
          <ds-accordion [items]="accordionItems" variant="bordered"></ds-accordion>

          <div class="interaction-hint">
            <span class="hint-icon">🔽</span>
            Cliquez sur un header pour voir l'animation d'expansion et la rotation de l'icone
          </div>
        </div>
      </section>

      <!-- Badges -->
      <section class="section">
        <h2>Badges <span class="phase-tag">Phase 1</span></h2>
        <p class="section-desc">Couleurs coherentes avec la palette globale</p>

        <div class="demo-card">
          <div class="badge-row">
            <primitive-badge variant="primary">Primary</primitive-badge>
            <primitive-badge variant="secondary">Secondary</primitive-badge>
            <primitive-badge variant="success">Success</primitive-badge>
            <primitive-badge variant="warning">Warning</primitive-badge>
            <primitive-badge variant="error">Error</primitive-badge>
            <primitive-badge variant="info">Info</primitive-badge>
          </div>
        </div>
      </section>

      <!-- Cards & Alerts -->
      <section class="section">
        <h2>Cards & Alerts <span class="phase-tag">Phase 5 & 6</span></h2>
        <p class="section-desc">Ombres subtiles, transitions granulaires, focus ring sur cards clickable</p>

        <div class="cards-grid">
          <ds-card variant="default">
            <ng-container dsCardHeader>Card Default</ng-container>
            <ng-container dsCardBody>
              <p>Ombre legere avec shadow-1 pour les elements de base.</p>
            </ng-container>
          </ds-card>

          <ds-card variant="elevated">
            <ng-container dsCardHeader>Card Elevated</ng-container>
            <ng-container dsCardBody>
              <p>Ombre moyenne avec shadow-2 pour la mise en avant.</p>
            </ng-container>
          </ds-card>

          <ds-card variant="elevated" [clickable]="true">
            <ng-container dsCardHeader>Card Clickable</ng-container>
            <ng-container dsCardBody>
              <p>Hover: translateY(-2px), Active: scale(0.995), Focus: double-ring</p>
            </ng-container>
          </ds-card>
        </div>

        <div class="alerts-stack">
          <ds-alert type="info" [showIcon]="true" [closable]="true">Information: Bouton close avec effet scale(0.92)
          </ds-alert>
          <ds-alert type="success" [showIcon]="true" [closable]="true">Succes: Transitions granulaires sur close
          </ds-alert>
          <ds-alert type="warning" [showIcon]="true">Attention: Focus ring double-ring effect</ds-alert>
          <ds-alert type="error" [showIcon]="true">Erreur: Exemple de message d'erreur</ds-alert>
        </div>
      </section>

      <!-- Progress -->
      <section class="section">
        <h2>Progress <span class="phase-tag">Phase 5</span></h2>
        <p class="section-desc">Transitions smooth avec easing cubic-bezier</p>

        <div class="demo-card">
          <div class="progress-stack">
            <div class="progress-item">
              <span class="progress-label">Default</span>
              <ds-progress-bar [value]="75" [showLabel]="true"></ds-progress-bar>
            </div>
            <div class="progress-item">
              <span class="progress-label">Success</span>
              <ds-progress-bar [value]="100" variant="success" [showLabel]="true"></ds-progress-bar>
            </div>
            <div class="progress-item">
              <span class="progress-label">Warning</span>
              <ds-progress-bar [value]="45" variant="warning" [showLabel]="true"></ds-progress-bar>
            </div>
            <div class="progress-item">
              <span class="progress-label">Error</span>
              <ds-progress-bar [value]="20" variant="error" [showLabel]="true"></ds-progress-bar>
            </div>
          </div>
        </div>
      </section>

      <!-- Design Tokens Summary -->
      <section class="section tokens-section">
        <h2>Tokens Design</h2>
        <p class="section-desc">Resume des ameliorations appliquees sur ~30 composants</p>

        <div class="tokens-grid">
          <div class="token-card">
            <div class="token-icon">🎨</div>
            <h3>Couleurs</h3>
            <ul>
              <li>Palette Tailwind-inspired</li>
              <li>Primary: Indigo #6366f1</li>
              <li>Contraste WCAG AA</li>
            </ul>
          </div>

          <div class="token-card">
            <div class="token-icon">💨</div>
            <h3>Animations</h3>
            <ul>
              <li>Fast: 120ms</li>
              <li>Normal: 200ms</li>
              <li>Slow: 400ms</li>
              <li>Easing: cubic-bezier</li>
            </ul>
          </div>

          <div class="token-card">
            <div class="token-icon">🌑</div>
            <h3>Ombres</h3>
            <ul>
              <li>Shadow-1: 5% opacity</li>
              <li>Shadow-2: 8% opacity</li>
              <li>Shadow-3: 12% opacity</li>
            </ul>
          </div>

          <div class="token-card">
            <div class="token-icon">🎯</div>
            <h3>Focus</h3>
            <ul>
              <li>Ring: 2px width</li>
              <li>Double-ring effect</li>
              <li>Inset pour elements inline</li>
            </ul>
          </div>

          <div class="token-card">
            <div class="token-icon">👆</div>
            <h3>Interactions</h3>
            <ul>
              <li>Hover: subtil</li>
              <li>Active: scale(0.92-0.98)</li>
              <li>Transitions granulaires</li>
            </ul>
          </div>

          <div class="token-card">
            <div class="token-icon">📐</div>
            <h3>Transitions</h3>
            <ul>
              <li>Pas de "all"</li>
              <li>Proprietes specifiques</li>
              <li>var(--easing-default)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .showcase-container {
      padding: 3rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
      font-family: var(--font-family-base);
    }

    .showcase-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .showcase-header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      font-size: 1.125rem;
      color: var(--text-muted);
      margin-bottom: 1.5rem;
    }

    .phase-badges {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.5rem;
    }

    .phase-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
      background: var(--surface-secondary);
      color: var(--text-muted);
      border: 1px solid var(--border-subtle);
    }

    .phase-badge.completed {
      background: color-mix(in oklab, var(--success) 15%, transparent);
      color: var(--success);
      border-color: var(--success);
    }

    .phase-tag {
      font-size: 0.625rem;
      padding: 0.125rem 0.5rem;
      border-radius: 4px;
      background: var(--color-primary);
      color: white;
      vertical-align: middle;
      margin-left: 0.5rem;
      font-weight: 500;
    }

    .section {
      margin-bottom: 4rem;
    }

    .section h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-default);
      margin-bottom: 0.5rem;
    }

    .section-desc {
      color: var(--text-muted);
      margin-bottom: 1.5rem;
    }

    .demo-card {
      background: var(--surface-default);
      border-radius: 12px;
      padding: 1.5rem;
      border: 1px solid var(--border-subtle);
    }

    .demo-card h3 {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin: 1.5rem 0 0.75rem;
    }

    .demo-card h3:first-child {
      margin-top: 0;
    }

    /* Color Grid */
    .color-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
    }

    .color-card {
      background: var(--surface-default);
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid var(--border-subtle);
      transition: transform 200ms var(--easing-default), box-shadow 200ms var(--easing-default);
    }

    .color-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-2);
    }

    .color-swatch {
      height: 80px;
    }

    .color-swatch.primary { background: #6366f1; }
    .color-swatch.secondary { background: #f59e0b; }
    .color-swatch.success { background: #22c55e; }
    .color-swatch.warning { background: #f97316; }
    .color-swatch.error { background: #ef4444; }
    .color-swatch.info { background: #3b82f6; }

    .color-info {
      padding: 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .color-name {
      font-weight: 600;
      font-size: 0.875rem;
    }

    .color-value {
      font-family: monospace;
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    /* Buttons */
    .button-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      align-items: center;
    }

    .button-row.align-end {
      align-items: flex-end;
    }

    /* Chips */
    .chip-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      align-items: center;
    }

    /* Forms */
    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .form-group h3 {
      margin-top: 0 !important;
    }

    .checkbox-group,
    .radio-group,
    .toggle-group {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    /* Tab content */
    .tab-content {
      padding: 1rem 0;
    }

    .tab-content h4 {
      margin: 0 0 0.5rem;
      font-size: 1rem;
      font-weight: 600;
    }

    .tab-content p {
      margin: 0;
      color: var(--text-muted);
    }

    /* Badges */
    .badge-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    /* Cards */
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    ds-card {
      display: block;
    }

    ds-card p {
      margin: 0;
      color: var(--text-muted);
      font-size: 0.875rem;
    }

    /* Alerts */
    .alerts-stack {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    ds-alert {
      display: block;
    }

    /* Progress */
    .progress-stack {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .progress-item {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .progress-label {
      font-size: 0.875rem;
      font-weight: 500;
      width: 70px;
      flex-shrink: 0;
    }

    ds-progress-bar {
      flex: 1;
    }

    /* Tokens Section */
    .tokens-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1rem;
    }

    .token-card {
      background: var(--surface-default);
      border-radius: 12px;
      padding: 1.5rem;
      border: 1px solid var(--border-subtle);
      transition: transform 200ms var(--easing-default), box-shadow 200ms var(--easing-default);
    }

    .token-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-2);
    }

    .token-icon {
      font-size: 2rem;
      margin-bottom: 0.75rem;
    }

    .token-card h3 {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
    }

    .token-card ul {
      margin: 0;
      padding-left: 1.25rem;
      font-size: 0.875rem;
      color: var(--text-muted);
    }

    .token-card li {
      margin-bottom: 0.25rem;
    }

    /* Interaction hints */
    .interaction-hint {
      margin-top: 1.5rem;
      padding: 0.75rem 1rem;
      background: var(--surface-raised);
      border-radius: 8px;
      font-size: 0.875rem;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .hint-icon {
      font-size: 1.25rem;
    }
  `]
})
class DesignShowcaseComponent {
  activeTab = 'overview';

  tabItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'settings', label: 'Settings' }
  ];

  accordionItems = [
    {
      id: '1',
      title: 'Transitions granulaires',
      content: 'Chaque propriete CSS a sa propre transition au lieu d\'utiliser "all". Cela permet un controle precis et de meilleures performances.'
    },
    {
      id: '2',
      title: 'Focus ring double-ring',
      content: 'Le focus visible utilise un box-shadow avec deux anneaux: un blanc (2px) et un de couleur primaire (4px) pour une visibilite optimale sur tous les fonds.'
    },
    {
      id: '3',
      title: 'Easing cubic-bezier',
      content: 'Toutes les animations utilisent var(--easing-default) qui correspond a cubic-bezier(0.4, 0, 0.2, 1) pour des mouvements naturels.'
    }
  ];
}

const meta: Meta<DesignShowcaseComponent> = {
  title: 'Documentation/Design Preview',
  component: DesignShowcaseComponent,
  decorators: [
    moduleMetadata({
      imports: [DesignShowcaseComponent]
    })
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Design System - Style Moderne/Minimaliste

Cette page presente le nouveau design applique au Design System en **6 phases**, inspire des tendances modernes (Tailwind, Radix, shadcn/ui).

## Phases d'amelioration

| Phase | Composants | Statut |
|-------|------------|--------|
| 1 | Tokens primitifs (couleurs, ombres, radius) | ✅ Complete |
| 2 | Primitives (button, input, checkbox, radio, toggle) | ✅ Complete |
| 3 | Formulaires (input-field, textarea, select, combobox, search-input, date-picker) | ✅ Complete |
| 4 | Navigation (tabs, breadcrumb, pagination, stepper, menu, dropdown) | ✅ Complete |
| 5 | Feedback (alert, toast, modal, tooltip, popover, progress-bar) | ✅ Complete |
| 6 | Donnees (table, accordion, card, chip, skeleton, avatar) | ✅ Complete |

## Ameliorations appliquees

### Transitions granulaires
\`\`\`scss
// Avant
transition: all 150ms ease;

// Apres
transition:
  background-color var(--duration-fast) var(--easing-default),
  color var(--duration-fast) var(--easing-default),
  transform var(--duration-fast) var(--easing-default);
\`\`\`

### Focus ring double-ring
\`\`\`scss
&:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--background-main, #fff), 0 0 0 4px var(--color-primary);
}
\`\`\`

### Active state avec scale
\`\`\`scss
&:active:not(:disabled) {
  transform: scale(0.92); // Boutons close
  transform: scale(0.96); // Chips
  transform: scale(0.98); // Boutons principaux
}
\`\`\`

### Easing moderne
\`\`\`scss
// Variable globale
--easing-default: cubic-bezier(0.4, 0, 0.2, 1);
\`\`\`

## Palette de couleurs

| Token | Valeur | Description |
|-------|--------|-------------|
| Primary | \`#6366f1\` | Indigo moderne |
| Secondary | \`#f59e0b\` | Amber chaleureux |
| Success | \`#22c55e\` | Vert emeraude |
| Warning | \`#f97316\` | Orange vif |
| Error | \`#ef4444\` | Rouge moderne |
| Info | \`#3b82f6\` | Bleu clair |
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj<DesignShowcaseComponent>;

export const Showcase: Story = {
  name: 'Design Moderne - 6 Phases'
};
