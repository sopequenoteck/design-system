import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DsPasswordStrength, PasswordStrengthSize } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsPasswordStrengthDefinition } from '../../../registry/definitions/ds-password-strength.definition';
import { ControlValues } from '../../../registry/types';

@Component({
  selector: 'app-password-strength-page',
  standalone: true,
  imports: [FormsModule, DsPasswordStrength, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Password strength avec contrôles interactifs.</p>
          <doc-demo-container
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <div class="password-demo">
              <input
                type="password"
                [(ngModel)]="password"
                placeholder="Tapez un mot de passe"
                class="demo-input"
              />
              <ds-password-strength
                [password]="password"
                [size]="demoSize()"
                [showLabel]="demoShowLabel()"
                [showCriteria]="demoShowCriteria()"
              />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Criteria</h3>
          <p class="demo-block__desc">Affichage des critères de validation.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <div class="password-demo">
              <input
                type="password"
                [(ngModel)]="passwordCriteria"
                placeholder="Tapez un mot de passe"
                class="demo-input"
              />
              <ds-password-strength
                [password]="passwordCriteria"
                [showCriteria]="true"
              />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Custom Min Length</h3>
          <p class="demo-block__desc">Longueur minimale personnalisée (12 caractères).</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <div class="password-demo">
              <input
                type="password"
                [(ngModel)]="passwordMinLength"
                placeholder="Min 12 caractères"
                class="demo-input"
              />
              <ds-password-strength
                [password]="passwordMinLength"
                [minLength]="12"
                [showCriteria]="true"
              />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">All States</h3>
          <p class="demo-block__desc">Démonstration des différents niveaux de force.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <div class="demo-column">
              <div class="state-demo">
                <span class="state-label">None:</span>
                <ds-password-strength [password]="''" />
              </div>
              <div class="state-demo">
                <span class="state-label">Weak:</span>
                <ds-password-strength [password]="'abc'" />
              </div>
              <div class="state-demo">
                <span class="state-label">Medium:</span>
                <ds-password-strength [password]="'Password1'" />
              </div>
              <div class="state-demo">
                <span class="state-label">Strong:</span>
                <ds-password-strength [password]="'Password1!'" />
              </div>
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Sizes</h3>
          <p class="demo-block__desc">Les trois tailles disponibles.</p>
          <doc-demo-container [code]="definition.demos[4].code">
            <div class="demo-column">
              <ds-password-strength [password]="'Test123!'" size="sm" />
              <ds-password-strength [password]="'Test123!'" size="md" />
              <ds-password-strength [password]="'Test123!'" size="lg" />
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
    .demo-column { display: flex; flex-direction: column; gap: 16px; }
    .password-demo { display: flex; flex-direction: column; gap: 12px; max-width: 300px; }
    .demo-input {
      padding: 8px 12px; border: 1px solid var(--border-default, #e5e7eb); border-radius: 4px;
      font-size: 0.875rem;
    }
    .state-demo {
      display: flex; align-items: center; gap: 12px;
    }
    .state-label { width: 80px; font-size: 0.875rem; color: var(--text-muted); }
  `]
})
export class PasswordStrengthPage {
  definition = DsPasswordStrengthDefinition;

  password = '';
  passwordCriteria = '';
  passwordMinLength = '';

  defaultValues = signal<ControlValues>({
    size: 'md',
    showLabel: true,
    showCriteria: false,
  });

  demoSize = computed(() => this.defaultValues()['size'] as PasswordStrengthSize);
  demoShowLabel = computed(() => this.defaultValues()['showLabel'] as boolean);
  demoShowCriteria = computed(() => this.defaultValues()['showCriteria'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }
}
