import { Component, signal, computed } from '@angular/core';
import { DsAvatar, AvatarShape, AvatarSize } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsAvatarDefinition } from '../../../registry/definitions/ds-avatar.definition';
import { ControlValues } from '../../../registry/types';

@Component({
  selector: 'app-avatar-page',
  standalone: true,
  imports: [DsAvatar, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Avatar avec contrôles interactifs.</p>
          <doc-demo-container
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <div class="demo-row">
              <ds-avatar
                src="https://i.pravatar.cc/150?img=1"
                name="John Doe"
                [shape]="demoShape()"
                [size]="demoSize()"
                [autoColor]="demoAutoColor()"
              />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Image</h3>
          <p class="demo-block__desc">Avatar avec image d'utilisateur.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <div class="demo-row">
              <ds-avatar
                src="https://i.pravatar.cc/150?img=1"
                alt="John Doe"
              />
              <ds-avatar
                src="https://i.pravatar.cc/150?img=5"
                alt="Jane Doe"
              />
              <ds-avatar
                src="https://i.pravatar.cc/150?img=12"
                alt="Bob Smith"
              />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Initials</h3>
          <p class="demo-block__desc">Avatar affichant des initiales.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <div class="demo-row">
              <ds-avatar name="John Doe" />
              <ds-avatar initials="AB" />
              <ds-avatar name="Marie Claire Dupont" />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Shapes</h3>
          <p class="demo-block__desc">Les trois formes disponibles.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <div class="demo-row">
              <ds-avatar name="Circle" shape="circle" />
              <ds-avatar name="Rounded" shape="rounded" />
              <ds-avatar name="Square" shape="square" />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Sizes</h3>
          <p class="demo-block__desc">Les quatre tailles disponibles.</p>
          <doc-demo-container [code]="definition.demos[4].code">
            <div class="demo-row">
              <ds-avatar name="SM" size="sm" />
              <ds-avatar name="MD" size="md" />
              <ds-avatar name="LG" size="lg" />
              <ds-avatar name="XL" size="xl" />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Auto Color</h3>
          <p class="demo-block__desc">Couleur de fond générée automatiquement.</p>
          <doc-demo-container [code]="definition.demos[5].code">
            <div class="demo-row">
              <ds-avatar name="Alice" [autoColor]="true" />
              <ds-avatar name="Bob" [autoColor]="true" />
              <ds-avatar name="Charlie" [autoColor]="true" />
              <ds-avatar name="Diana" [autoColor]="true" />
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
    .demo-row { display: flex; gap: 16px; flex-wrap: wrap; align-items: center; }
  `]
})
export class AvatarPage {
  definition = DsAvatarDefinition;

  defaultValues = signal<ControlValues>({
    shape: 'circle',
    size: 'md',
    autoColor: false,
  });

  demoShape = computed(() => this.defaultValues()['shape'] as AvatarShape);
  demoSize = computed(() => this.defaultValues()['size'] as AvatarSize);
  demoAutoColor = computed(() => this.defaultValues()['autoColor'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }
}
