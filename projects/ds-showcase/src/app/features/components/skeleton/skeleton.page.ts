import { Component, signal, computed } from '@angular/core';
import { DsSkeleton } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsSkeletonDefinition } from '../../../registry/definitions/ds-skeleton.definition';
import { ControlValues } from '../../../registry/types';

type SkeletonVariant = 'text' | 'circle' | 'rectangle' | 'card';
type SizeType = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-skeleton-page',
  standalone: true,
  imports: [DsSkeleton, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Skeleton avec contrôles.</p>
          <doc-demo-container
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-skeleton
              [variant]="demoVariant()"
              [size]="demoSize()"
              [lines]="demoLines()"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Text Lines</h3>
          <p class="demo-block__desc">Plusieurs lignes de texte.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <ds-skeleton variant="text" [lines]="3" />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Avatar</h3>
          <p class="demo-block__desc">Skeleton circulaire pour avatar.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <ds-skeleton variant="circle" size="lg" />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Card</h3>
          <p class="demo-block__desc">Skeleton de carte.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <ds-skeleton variant="card" />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Custom Size</h3>
          <p class="demo-block__desc">Taille personnalisée.</p>
          <doc-demo-container [code]="definition.demos[4].code">
            <ds-skeleton variant="rectangle" width="300px" height="200px" />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">User List Loading</h3>
          <p class="demo-block__desc">Exemple de liste utilisateurs.</p>
          <doc-demo-container [code]="definition.demos[5].code">
            <div class="user-skeleton-list">
              @for (i of [1, 2, 3]; track i) {
                <div class="user-skeleton">
                  <ds-skeleton variant="circle" size="md" />
                  <div class="user-skeleton__content">
                    <ds-skeleton variant="text" width="150px" />
                    <ds-skeleton variant="text" width="100px" />
                  </div>
                </div>
              }
            </div>
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
    .user-skeleton-list { display: flex; flex-direction: column; gap: 16px; }
    .user-skeleton {
      display: flex; align-items: center; gap: 12px;
      padding: 12px; background: var(--background-secondary, #f9fafb); border-radius: 8px;
    }
    .user-skeleton__content { display: flex; flex-direction: column; gap: 8px; }
  `]
})
export class SkeletonPage {
  definition = DsSkeletonDefinition;

  defaultValues = signal<ControlValues>({
    variant: 'text',
    size: 'md',
    lines: 1,
  });

  demoVariant = computed(() => this.defaultValues()['variant'] as SkeletonVariant);
  demoSize = computed(() => this.defaultValues()['size'] as SizeType);
  demoLines = computed(() => this.defaultValues()['lines'] as number);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }
}
