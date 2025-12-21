import { Component, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getDemosForComponent, DemoInfo } from '../../registry/demos.registry';
import { DocIcon } from '../icon/doc-icon';

@Component({
  selector: 'doc-used-in-section',
  standalone: true,
  imports: [RouterLink, DocIcon],
  template: `
    @if (demos().length > 0) {
      <section class="used-in-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="external-link" size="sm" />
            Utilisé dans
          </h2>
          <p class="section-desc">
            Découvrez ce composant en contexte dans ces démos.
          </p>
        </div>

        <div class="demos-grid">
          @for (demo of demos(); track demo.id) {
            <a [routerLink]="demo.path" class="demo-card">
              <span class="demo-category">{{ getCategoryLabel(demo.category) }}</span>
              <span class="demo-label">{{ demo.label }}</span>
              <doc-icon name="arrow-right" size="xs" class="demo-arrow" />
            </a>
          }
        </div>
      </section>
    }
  `,
  styles: [`
    .used-in-section {
      margin-top: var(--doc-space-2xl, 48px);
      padding-top: var(--doc-space-xl, 32px);
      border-top: 1px solid var(--doc-border-default);
    }

    .section-header {
      margin-bottom: var(--doc-space-lg, 24px);
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
      margin: 0 0 var(--doc-space-sm, 8px) 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--doc-text-primary, #0f172a);
    }

    .section-desc {
      margin: 0;
      font-size: 0.9375rem;
      color: var(--doc-text-secondary, #475569);
    }

    .demos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: var(--doc-space-md, 16px);
    }

    .demo-card {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-xs, 4px);
      padding: var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #ffffff);
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-lg, 12px);
      text-decoration: none;
      transition: all 150ms ease;
      position: relative;

      &:hover {
        border-color: var(--doc-accent-primary, #6366f1);
        box-shadow: var(--doc-shadow-sm);
        transform: translateY(-2px);

        .demo-arrow {
          opacity: 1;
          transform: translateX(4px);
        }
      }
    }

    .demo-category {
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--doc-accent-primary, #6366f1);
    }

    .demo-label {
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--doc-text-primary, #0f172a);
    }

    .demo-arrow {
      position: absolute;
      right: var(--doc-space-md, 16px);
      top: 50%;
      transform: translateY(-50%);
      opacity: 0;
      color: var(--doc-accent-primary, #6366f1);
      transition: all 150ms ease;
    }
  `]
})
export class UsedInSection {
  componentId = input.required<string>();

  demos = computed(() => getDemosForComponent(this.componentId()));

  getCategoryLabel(category: string): string {
    const labels: Record<string, string> = {
      forms: 'Formulaires',
      navigation: 'Navigation',
      data: 'Data',
      feedback: 'Feedback',
    };
    return labels[category] || category;
  }
}
