import { Component } from '@angular/core';
import { DsDivider } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsDividerDefinition } from '../../../registry/definitions/ds-divider.definition';

@Component({
  selector: 'app-divider-page',
  standalone: true,
  imports: [DsDivider, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Divider horizontal basique.</p>
          <doc-demo-container [sources]="definition.demos[0].sources ?? []" [code]="definition.demos[0].code">
            <div class="demo-box">
              <p>Contenu au-dessus</p>
              <ds-divider />
              <p>Contenu en-dessous</p>
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Label</h3>
          <p class="demo-block__desc">Divider avec texte central.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <div class="demo-box">
              <p>Première section</p>
              <ds-divider>Section suivante</ds-divider>
              <p>Deuxième section</p>
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Variants</h3>
          <p class="demo-block__desc">Différentes variantes visuelles.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <div class="demo-box">
              <ds-divider variant="solid">Solid</ds-divider>
              <ds-divider variant="dashed">Dashed</ds-divider>
              <ds-divider variant="dotted">Dotted</ds-divider>
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Vertical</h3>
          <p class="demo-block__desc">Divider vertical.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <div class="demo-row-vertical">
              <span>Gauche</span>
              <ds-divider orientation="vertical" />
              <span>Centre</span>
              <ds-divider orientation="vertical" />
              <span>Droite</span>
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Label Positions</h3>
          <p class="demo-block__desc">Différentes positions du label.</p>
          <doc-demo-container [code]="definition.demos[4].code">
            <div class="demo-box">
              <ds-divider labelPosition="left">Gauche</ds-divider>
              <ds-divider labelPosition="center">Centre</ds-divider>
              <ds-divider labelPosition="right">Droite</ds-divider>
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
    .demo-box {
      padding: 16px;
      background: var(--background-panel, #ffffff);
      border: 1px solid var(--border-default, #e5e7eb);
      border-radius: 8px;
      p { margin: 8px 0; color: var(--text-muted, #6b7280); }
    }
    .demo-row-vertical {
      display: flex;
      align-items: center;
      height: 60px;
      gap: 16px;
      padding: 16px;
      background: var(--background-panel, #ffffff);
      border: 1px solid var(--border-default, #e5e7eb);
      border-radius: 8px;
      span { color: var(--text-default, #374151); }
    }
  `]
})
export class DividerPage {
  definition = DsDividerDefinition;
}
