import { Component, inject, signal, AfterViewInit, WritableSignal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ComponentRegistry } from '../../registry/component.registry';
import { DocIcon } from '../../shared/icon/doc-icon';
import { DS_VERSION, DS_THEMES_COUNT, DS_TESTS_COUNT } from '../../config/version';

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

interface ComponentCard {
  id: string;
  name: string;
  category: string;
  categoryPath: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, DocIcon],
  template: `
    <div class="home-page">
      <!-- Hero Section -->
      <header class="hero">
        <div class="hero__bg"></div>
        <div class="hero__content">
          <span class="hero__badge doc-animate-fade-in-up">
            <doc-icon name="zap" size="xs" />
            {{ heroBadge() }}
          </span>
          <h1 class="hero__title doc-animate-fade-in-up doc-animate-delay-1">
            <span class="hero__title-line">Design System</span>
            <span class="hero__title-gradient">Angular</span>
          </h1>
          <p class="hero__subtitle doc-animate-fade-in-up doc-animate-delay-2">
            Une bibliothèque de composants moderne, accessible et personnalisable
            pour créer des interfaces utilisateur cohérentes.
          </p>
          <div class="hero__actions doc-animate-fade-in-up doc-animate-delay-3">
            <a routerLink="/docs/getting-started" class="hero__btn hero__btn--primary">
              <doc-icon name="arrow-right" size="sm" />
              Commencer
            </a>
            <a routerLink="/components/actions/ds-button" class="hero__btn hero__btn--secondary">
              <doc-icon name="components" size="sm" />
              Voir les composants
            </a>
          </div>
        </div>
      </header>

      <!-- Quick Start -->
      <section class="section">
        <h2 class="section__title">Démarrage rapide</h2>
        <div class="quick-start">
          @for (step of quickStartSteps; track step.number; let i = $index) {
            <div class="quick-start__step doc-animate-fade-in-up" [style.animation-delay.ms]="i * 100">
              <div class="quick-start__number">{{ step.number }}</div>
              <div class="quick-start__content">
                <h3>{{ step.title }}</h3>
                <div class="quick-start__code">
                  <code>{{ step.code }}</code>
                  <button class="quick-start__copy" (click)="copyToClipboard(step.code)" title="Copier">
                    <doc-icon name="copy" size="sm" />
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- Features -->
      <section class="section">
        <h2 class="section__title">Fonctionnalités</h2>
        <div class="features">
          @for (feature of features(); track feature.title; let i = $index) {
            <div class="feature-card doc-animate-fade-in-up" [style.animation-delay.ms]="i * 80">
              <div class="feature-card__icon" [attr.data-icon]="feature.icon">
                <doc-icon [name]="getIconName(feature.icon)" size="lg" />
              </div>
              <h3 class="feature-card__title">{{ feature.title }}</h3>
              <p class="feature-card__desc">{{ feature.description }}</p>
            </div>
          }
        </div>
      </section>

      <!-- Popular Components -->
      <section class="section">
        <div class="section__header">
          <h2 class="section__title">Composants populaires</h2>
          <a routerLink="/components/actions/ds-button" class="section__link">
            Voir tout
            <doc-icon name="arrow-right" size="xs" />
          </a>
        </div>
        <div class="components-grid">
          @for (component of popularComponents; track component.id; let i = $index) {
            <a
              class="component-card doc-animate-fade-in-up"
              [routerLink]="['/components', component.categoryPath, component.id]"
              [style.animation-delay.ms]="i * 60"
            >
              <div class="component-card__header">
                <div class="component-card__icon">
                  <doc-icon [name]="getIconName(component.icon)" size="md" />
                </div>
                <span class="component-card__badge">{{ component.category }}</span>
              </div>
              <h3 class="component-card__title">{{ component.name }}</h3>
              <p class="component-card__desc">{{ component.description }}</p>
              <div class="component-card__arrow">
                <doc-icon name="arrow-right" size="sm" />
              </div>
            </a>
          }
        </div>
      </section>

      <!-- Stats -->
      <section class="section section--stats">
        <div class="stats-grid">
          @for (stat of stats(); track stat.label; let i = $index) {
            <div class="stat-card doc-animate-scale-in" [style.animation-delay.ms]="i * 100">
              <span class="stat-card__value">{{ stat.displayValue() }}</span>
              <span class="stat-card__label">{{ stat.label }}</span>
            </div>
          }
        </div>
      </section>

      <!-- CTA -->
      <section class="cta">
        <div class="cta__content">
          <h2 class="cta__title">Prêt à démarrer ?</h2>
          <p class="cta__desc">
            Installez le package et commencez à construire des interfaces modernes.
          </p>
          <div class="cta__code">
            <code>npm install &#64;kksdev/ds-angular</code>
            <button class="cta__copy" (click)="copyToClipboard('npm install @kksdev/ds-angular')" title="Copier">
              <doc-icon name="copy" size="sm" />
            </button>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-page {
      max-width: 1000px;
      margin: 0 auto;
    }

    // ==========================================================================
    // Hero
    // ==========================================================================
    .hero {
      position: relative;
      padding: var(--doc-space-3xl, 64px) 0;
      margin-bottom: var(--doc-space-3xl, 64px);
      text-align: center;
      overflow: hidden;
    }

    .hero__bg {
      position: absolute;
      inset: -50%;
      background: radial-gradient(
        ellipse 80% 50% at 50% -20%,
        var(--doc-accent-primary-light, #eef2ff) 0%,
        transparent 70%
      );
      z-index: -1;
      animation: doc-pulse 8s ease-in-out infinite;
    }

    .hero__badge {
      display: inline-flex;
      align-items: center;
      gap: var(--doc-space-xs, 4px);
      padding: var(--doc-space-xs, 4px) var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #ffffff);
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-full, 9999px);
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--doc-accent-primary, #6366f1);
      margin-bottom: var(--doc-space-lg, 24px);
      box-shadow: var(--doc-shadow-sm);
    }

    .hero__title {
      font-size: clamp(2.5rem, 8vw, 4rem);
      font-weight: 800;
      line-height: 1.1;
      margin: 0 0 var(--doc-space-lg, 24px) 0;
      color: var(--doc-text-primary, #0f172a);
    }

    .hero__title-line {
      display: block;
    }

    .hero__title-gradient {
      display: block;
      background: linear-gradient(135deg, var(--doc-accent-primary, #6366f1), var(--doc-accent-info, #3b82f6));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero__subtitle {
      font-size: 1.125rem;
      color: var(--doc-text-secondary, #475569);
      max-width: 600px;
      margin: 0 auto var(--doc-space-xl, 32px);
      line-height: 1.7;
    }

    .hero__actions {
      display: flex;
      gap: var(--doc-space-md, 16px);
      justify-content: center;
      flex-wrap: wrap;
    }

    .hero__btn {
      display: inline-flex;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
      padding: var(--doc-space-sm, 8px) var(--doc-space-lg, 24px);
      border-radius: var(--doc-radius-md, 10px);
      font-weight: 600;
      font-size: 0.9375rem;
      text-decoration: none;
      transition: all var(--doc-transition-fast, 150ms);

      &--primary {
        background: linear-gradient(135deg, var(--doc-accent-primary, #6366f1), var(--doc-accent-primary-dark, #4f46e5));
        color: white;
        box-shadow: var(--doc-shadow-md), 0 0 0 0 rgba(99, 102, 241, 0);

        &:hover {
          transform: translateY(-2px);
          box-shadow: var(--doc-shadow-lg), 0 0 20px rgba(99, 102, 241, 0.3);
        }
      }

      &--secondary {
        background: var(--doc-surface-elevated, #ffffff);
        color: var(--doc-text-primary, #0f172a);
        border: 1px solid var(--doc-border-default, #e2e8f0);

        &:hover {
          background: var(--doc-surface-sunken, #f1f5f9);
          border-color: var(--doc-border-strong, #cbd5e1);
        }
      }
    }

    // ==========================================================================
    // Section
    // ==========================================================================
    .section {
      margin-bottom: var(--doc-space-3xl, 64px);

      &--stats {
        background: var(--doc-surface-sunken, #f1f5f9);
        margin-left: calc(-1 * var(--doc-space-lg, 24px));
        margin-right: calc(-1 * var(--doc-space-lg, 24px));
        padding: var(--doc-space-2xl, 48px) var(--doc-space-lg, 24px);
        border-radius: var(--doc-radius-xl, 20px);
      }
    }

    .section__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--doc-space-lg, 24px);
    }

    .section__title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--doc-text-primary, #0f172a);
      margin: 0 0 var(--doc-space-lg, 24px) 0;

      .section__header & {
        margin-bottom: 0;
      }
    }

    .section__link {
      display: inline-flex;
      align-items: center;
      gap: var(--doc-space-xs, 4px);
      color: var(--doc-accent-primary, #6366f1);
      font-size: 0.875rem;
      font-weight: 500;
      text-decoration: none;
      transition: gap var(--doc-transition-fast, 150ms);

      &:hover {
        gap: var(--doc-space-sm, 8px);
      }
    }

    // ==========================================================================
    // Quick Start
    // ==========================================================================
    .quick-start {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-md, 16px);
    }

    .quick-start__step {
      display: flex;
      align-items: flex-start;
      gap: var(--doc-space-md, 16px);
      padding: var(--doc-space-lg, 24px);
      background: var(--doc-surface-elevated, #ffffff);
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-lg, 14px);
      transition: all var(--doc-transition-fast, 150ms);

      &:hover {
        border-color: var(--doc-accent-primary, #6366f1);
        box-shadow: var(--doc-shadow-md);
      }
    }

    .quick-start__number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, var(--doc-accent-primary, #6366f1), var(--doc-accent-info, #3b82f6));
      color: white;
      border-radius: var(--doc-radius-md, 10px);
      font-weight: 700;
      font-size: 1.125rem;
      flex-shrink: 0;
    }

    .quick-start__content {
      flex: 1;
      min-width: 0;

      h3 {
        margin: 0 0 var(--doc-space-sm, 8px) 0;
        font-size: 0.9375rem;
        font-weight: 600;
        color: var(--doc-text-primary, #0f172a);
      }
    }

    .quick-start__code {
      display: flex;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
      padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
      background: var(--doc-surface-sunken, #f1f5f9);
      border-radius: var(--doc-radius-sm, 6px);
      overflow: hidden;

      code {
        flex: 1;
        font-family: var(--doc-code-font, monospace);
        font-size: 0.875rem;
        color: var(--doc-accent-primary, #6366f1);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .quick-start__copy {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      padding: 0;
      border: none;
      border-radius: var(--doc-radius-sm, 6px);
      background: transparent;
      color: var(--doc-text-tertiary, #94a3b8);
      cursor: pointer;
      transition: all var(--doc-transition-fast, 150ms);
      flex-shrink: 0;

      &:hover {
        background: var(--doc-border-default, #e2e8f0);
        color: var(--doc-text-primary, #0f172a);
      }
    }

    // ==========================================================================
    // Features
    // ==========================================================================
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--doc-space-md, 16px);
    }

    .feature-card {
      padding: var(--doc-space-lg, 24px);
      background: var(--doc-surface-elevated, #ffffff);
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-lg, 14px);
      transition: all var(--doc-transition-fast, 150ms);

      &:hover {
        transform: translateY(-2px);
        box-shadow: var(--doc-shadow-md);
      }
    }

    .feature-card__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: var(--doc-radius-md, 10px);
      margin-bottom: var(--doc-space-md, 16px);
      color: white;

      &[data-icon="components"] { background: linear-gradient(135deg, #6366f1, #4f46e5); }
      &[data-icon="sun"] { background: linear-gradient(135deg, #f59e0b, #d97706); }
      &[data-icon="check"] { background: linear-gradient(135deg, #10b981, #059669); }
      &[data-icon="zap"] { background: linear-gradient(135deg, #3b82f6, #2563eb); }
    }

    .feature-card__title {
      margin: 0 0 var(--doc-space-sm, 8px) 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--doc-text-primary, #0f172a);
    }

    .feature-card__desc {
      margin: 0;
      font-size: 0.875rem;
      color: var(--doc-text-secondary, #475569);
      line-height: 1.6;
    }

    // ==========================================================================
    // Components Grid
    // ==========================================================================
    .components-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--doc-space-md, 16px);
    }

    .component-card {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: var(--doc-space-lg, 24px);
      background: var(--doc-surface-elevated, #ffffff);
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-lg, 14px);
      text-decoration: none;
      transition: all var(--doc-transition-fast, 150ms);
      overflow: hidden;

      &:hover {
        border-color: var(--doc-accent-primary, #6366f1);
        box-shadow: var(--doc-shadow-lg);
        transform: translateY(-2px);

        .component-card__arrow {
          opacity: 1;
          transform: translateX(0);
        }
      }
    }

    .component-card__header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: var(--doc-space-md, 16px);
    }

    .component-card__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      background: var(--doc-accent-primary-light, #eef2ff);
      color: var(--doc-accent-primary, #6366f1);
      border-radius: var(--doc-radius-md, 10px);
    }

    .component-card__badge {
      padding: var(--doc-space-xs, 4px) var(--doc-space-sm, 8px);
      background: var(--doc-surface-sunken, #f1f5f9);
      border-radius: var(--doc-radius-sm, 6px);
      font-size: 0.6875rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--doc-text-secondary, #475569);
    }

    .component-card__title {
      margin: 0 0 var(--doc-space-sm, 8px) 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--doc-text-primary, #0f172a);
    }

    .component-card__desc {
      margin: 0;
      font-size: 0.875rem;
      color: var(--doc-text-secondary, #475569);
      line-height: 1.6;
      flex: 1;
    }

    .component-card__arrow {
      position: absolute;
      bottom: var(--doc-space-lg, 24px);
      right: var(--doc-space-lg, 24px);
      color: var(--doc-accent-primary, #6366f1);
      opacity: 0;
      transform: translateX(-8px);
      transition: all var(--doc-transition-fast, 150ms);
    }

    // ==========================================================================
    // Stats
    // ==========================================================================
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: var(--doc-space-md, 16px);
    }

    .stat-card {
      padding: var(--doc-space-xl, 32px) var(--doc-space-lg, 24px);
      background: var(--doc-surface-elevated, #ffffff);
      border-radius: var(--doc-radius-lg, 14px);
      text-align: center;
      box-shadow: var(--doc-shadow-sm);
    }

    .stat-card__value {
      display: block;
      font-size: 2.5rem;
      font-weight: 800;
      background: linear-gradient(135deg, var(--doc-accent-primary, #6366f1), var(--doc-accent-info, #3b82f6));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
    }

    .stat-card__label {
      display: block;
      margin-top: var(--doc-space-sm, 8px);
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--doc-text-secondary, #475569);
    }

    // ==========================================================================
    // CTA
    // ==========================================================================
    .cta {
      text-align: center;
      padding: var(--doc-space-3xl, 64px) var(--doc-space-lg, 24px);
      background: linear-gradient(135deg, var(--doc-accent-primary, #6366f1), var(--doc-accent-primary-dark, #4f46e5));
      border-radius: var(--doc-radius-xl, 20px);
      margin-bottom: var(--doc-space-lg, 24px);
    }

    .cta__title {
      margin: 0 0 var(--doc-space-sm, 8px) 0;
      font-size: 1.75rem;
      font-weight: 700;
      color: white;
    }

    .cta__desc {
      margin: 0 0 var(--doc-space-lg, 24px) 0;
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.85);
    }

    .cta__code {
      display: inline-flex;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
      padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
      background: rgba(255, 255, 255, 0.15);
      border-radius: var(--doc-radius-md, 10px);
      backdrop-filter: blur(8px);

      code {
        font-family: var(--doc-code-font, monospace);
        font-size: 0.9375rem;
        color: white;
      }
    }

    .cta__copy {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      padding: 0;
      border: none;
      border-radius: var(--doc-radius-sm, 6px);
      background: rgba(255, 255, 255, 0.2);
      color: white;
      cursor: pointer;
      transition: all var(--doc-transition-fast, 150ms);

      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }

    // ==========================================================================
    // Responsive
    // ==========================================================================
    @media (max-width: 640px) {
      .hero {
        padding: var(--doc-space-2xl, 48px) 0;
      }

      .hero__actions {
        flex-direction: column;
        align-items: stretch;
      }

      .hero__btn {
        justify-content: center;
      }

      .quick-start__step {
        flex-direction: column;
      }

      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class HomePage implements AfterViewInit {
  private registry = inject(ComponentRegistry);

  // Computed values dynamiques
  readonly componentCount = computed(() => this.registry.getComponentsCount());
  readonly primitiveCount = computed(() => this.registry.getPrimitivesCount());
  readonly totalCount = computed(() => this.registry.getTotalCount());
  readonly heroBadge = computed(() => `v${DS_VERSION} - ${this.totalCount()} composants`);

  quickStartSteps = [
    { number: 1, title: 'Installation', code: 'npm install @kksdev/ds-angular' },
    { number: 2, title: 'Import des styles', code: "@import '@kksdev/ds-angular/styles';" },
    { number: 3, title: 'Utilisation', code: '<ds-button>Click me</ds-button>' },
  ];

  readonly features = computed<FeatureItem[]>(() => [
    { icon: 'components', title: `${this.totalCount()}+ Composants`, description: 'Une collection complète de composants UI prêts à l\'emploi.' },
    { icon: 'sun', title: `${DS_THEMES_COUNT} Thèmes`, description: 'Light, Dark et Custom avec personnalisation complète.' },
    { icon: 'check', title: 'Accessible', description: 'Conformité WCAG 2.1 AA pour une expérience inclusive.' },
    { icon: 'zap', title: 'Performant', description: 'Tree-shakable et optimisé pour des bundles légers.' },
  ]);

  popularComponents: ComponentCard[] = [
    { id: 'ds-button', name: 'Button', category: 'Actions', categoryPath: 'actions', description: 'Bouton d\'action avec variantes et états.', icon: 'zap' },
    { id: 'ds-modal', name: 'Modal', category: 'Overlays', categoryPath: 'overlays', description: 'Fenêtre modale avec overlay et animations.', icon: 'overlays' },
    { id: 'ds-tabs', name: 'Tabs', category: 'Navigation', categoryPath: 'navigation', description: 'Navigation par onglets accessible.', icon: 'navigation' },
    { id: 'ds-select', name: 'Select', category: 'Forms', categoryPath: 'forms/pickers', description: 'Liste déroulante avec recherche et options.', icon: 'forms' },
    { id: 'ds-table', name: 'Table', category: 'Data', categoryPath: 'data-display', description: 'Tableau de données triable et filtrable.', icon: 'data' },
    { id: 'ds-toast', name: 'Toast', category: 'Feedback', categoryPath: 'feedback', description: 'Notifications temporaires contextuelles.', icon: 'feedback' },
  ];

  // Stats avec valeurs dynamiques depuis le registry
  readonly stats = computed(() => [
    { value: this.componentCount(), label: 'Composants', displayValue: signal(0) },
    { value: this.primitiveCount(), label: 'Primitives', displayValue: signal(0) },
    { value: DS_THEMES_COUNT, label: 'Thèmes', displayValue: signal(0) },
    { value: DS_TESTS_COUNT, label: 'Tests', displayValue: signal(0) },
  ]);

  ngAfterViewInit(): void {
    // Animate stats counters
    this.stats().forEach((stat, index) => {
      setTimeout(() => this.animateValue(stat.displayValue, stat.value), index * 150);
    });
  }

  private animateValue(valueSignal: WritableSignal<number>, target: number): void {
    const duration = 1000;
    const start = 0;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      valueSignal.set(Math.floor(start + (target - start) * eased));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  getIconName(icon: string): any {
    return icon as any;
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text);
  }
}
