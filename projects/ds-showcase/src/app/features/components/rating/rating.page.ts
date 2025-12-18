import { Component, signal, computed } from '@angular/core';
import { DsRating, RatingSize } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsRatingDefinition } from '../../../registry/definitions/ds-rating.definition';
import { ControlValues } from '../../../registry/types';

@Component({
  selector: 'app-rating-page',
  standalone: true,
  imports: [DsRating, DemoContainer, PropsTable],
  template: `
    <div class="component-page">
      <header class="component-header">
        <div class="component-header__meta">
          <span class="component-badge">{{ definition.category }}</span>
        </div>
        <h1 class="component-title">{{ definition.name }}</h1>
        <p class="component-desc">{{ definition.description }}</p>
        <code class="component-selector">&lt;{{ definition.selector }}&gt;</code>
      </header>

      <section class="component-section">
        <h2>Exemples</h2>

        <div class="demo-block">
          <h3 class="demo-block__title">Default</h3>
          <p class="demo-block__desc">Rating interactif basique.</p>
          <doc-demo-container
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-rating
              [value]="demoValue()"
              (ratingChange)="onRatingChange($event)"
            />
          </doc-demo-container>
          <p class="demo-note">Valeur actuelle : {{ currentRating() }}</p>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Half Stars</h3>
          <p class="demo-block__desc">Rating avec demi-étoiles.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <ds-rating [allowHalf]="true" [value]="3.5" />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Sizes</h3>
          <p class="demo-block__desc">Différentes tailles.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <div class="demo-row">
              <div class="demo-item">
                <span class="demo-label">Small</span>
                <ds-rating size="sm" [value]="4" [readonly]="true" />
              </div>
              <div class="demo-item">
                <span class="demo-label">Medium</span>
                <ds-rating size="md" [value]="4" [readonly]="true" />
              </div>
              <div class="demo-item">
                <span class="demo-label">Large</span>
                <ds-rating size="lg" [value]="4" [readonly]="true" />
              </div>
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Read Only</h3>
          <p class="demo-block__desc">Mode lecture seule pour affichage.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <ds-rating [readonly]="true" [value]="4.5" [allowHalf]="true" />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Disabled</h3>
          <p class="demo-block__desc">État désactivé.</p>
          <doc-demo-container [code]="definition.demos[4].code">
            <ds-rating [disabled]="true" [value]="3" />
          </doc-demo-container>
        </div>
      </section>

      <section class="component-section">
        <h2>API Reference</h2>
        <doc-props-table [props]="definition.props" />
      </section>
    </div>
  `,
  styles: [`
    .component-page { max-width: 900px; }
    .component-header { margin-bottom: 48px; }
    .component-header__meta { margin-bottom: 12px; }
    .component-badge {
      display: inline-block; padding: 4px 10px; font-size: 0.75rem; font-weight: 500;
      text-transform: uppercase; letter-spacing: 0.05em;
      background: var(--color-primary-light, #eff6ff); color: var(--color-primary, #3b82f6); border-radius: 4px;
    }
    .component-title { margin: 0 0 12px 0; font-size: 2rem; font-weight: 700; color: var(--text-default, #1a1a1a); }
    .component-desc { margin: 0 0 16px 0; font-size: 1.125rem; color: var(--text-muted, #6b7280); line-height: 1.6; }
    .component-selector {
      display: inline-block; padding: 6px 12px; font-family: var(--doc-code-font, monospace); font-size: 0.875rem;
      background: var(--background-secondary, #f3f4f6); color: var(--text-default, #374151); border-radius: 4px;
    }
    .component-section {
      margin-bottom: 48px;
      h2 { font-size: 1.25rem; font-weight: 600; color: var(--text-default, #1a1a1a); margin: 0 0 24px 0; padding-bottom: 12px; border-bottom: 1px solid var(--border-default, #e5e7eb); }
    }
    .demo-block { margin-bottom: 32px; }
    .demo-block__title { margin: 0 0 8px 0; font-size: 1rem; font-weight: 600; color: var(--text-default, #1a1a1a); }
    .demo-block__desc { margin: 0 0 16px 0; font-size: 0.875rem; color: var(--text-muted, #6b7280); }
    .demo-row { display: flex; gap: 32px; flex-wrap: wrap; align-items: flex-end; }
    .demo-item { display: flex; flex-direction: column; gap: 8px; }
    .demo-label { font-size: 0.75rem; color: var(--text-muted, #6b7280); text-transform: uppercase; }
    .demo-note {
      margin-top: 12px;
      padding: 8px 12px;
      background: var(--background-secondary, #f3f4f6);
      border-radius: 4px;
      font-size: 0.875rem;
      color: var(--text-default, #374151);
    }
  `]
})
export class RatingPage {
  definition = DsRatingDefinition;

  currentRating = signal(3);

  defaultValues = signal<ControlValues>({
    value: 3,
  });

  demoValue = computed(() => this.defaultValues()['value'] as number);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  onRatingChange(value: number): void {
    this.currentRating.set(value);
  }
}
