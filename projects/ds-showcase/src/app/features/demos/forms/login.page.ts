import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DsInputField, DsButton, DsCard, DsCheckbox, DsDivider } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { CodeSource } from '../../../registry/types';

interface UsedComponent {
  id: string;
  label: string;
  path: string;
}

@Component({
  selector: 'demo-login-page',
  standalone: true,
  imports: [
    RouterLink,
    DsInputField,
    DsButton,
    DsCard,
    DsCheckbox,
    DsDivider,
    DemoContainer,
  ],
  template: `
    <div class="demo-page">
      <header class="demo-header">
        <h1>Login</h1>
        <p class="demo-description">
          Formulaire de connexion complet avec validation, options de connexion et liens utiles.
        </p>
      </header>

      <!-- Démo avec code -->
      <section class="demo-section">
        <doc-demo-container [sources]="sources">
          <ds-card class="login-card">
            <div class="login-header">
              <h2>Connexion</h2>
              <p>Entrez vos identifiants pour accéder à votre compte</p>
            </div>

            <form class="login-form">
              <ds-input-field
                label="Email"
                type="email"
                placeholder="nom@exemple.com"
              />

              <ds-input-field
                label="Mot de passe"
                type="password"
                placeholder="••••••••"
              />

              <div class="login-options">
                <ds-checkbox label="Se souvenir de moi" />
                <a href="#" class="forgot-link">Mot de passe oublié ?</a>
              </div>

              <ds-button variant="primary" [block]="true">
                Se connecter
              </ds-button>

              <ds-divider label="ou" />

              <ds-button variant="secondary" [block]="true">
                Continuer avec Google
              </ds-button>
            </form>

            <div class="login-footer">
              <p>Pas encore de compte ? <a href="#">Créer un compte</a></p>
            </div>
          </ds-card>
        </doc-demo-container>
      </section>

      <!-- Composants utilisés -->
      <section class="demo-components">
        <h2>Composants utilisés</h2>
        <div class="component-list">
          @for (comp of usedComponents; track comp.id) {
            <a [routerLink]="comp.path" class="component-chip">
              {{ comp.label }}
            </a>
          }
        </div>
      </section>
    </div>
  `,
  styles: [`
    .demo-page {
      max-width: 1200px;
      margin: 0 auto;
    }

    .demo-header {
      margin-bottom: var(--doc-space-xl, 32px);

      h1 {
        font-size: 2rem;
        font-weight: 700;
        color: var(--doc-text-primary);
        margin: 0 0 var(--doc-space-sm, 8px);
      }

      .demo-description {
        font-size: 1.125rem;
        color: var(--doc-text-secondary);
        margin: 0;
      }
    }

    .demo-section {
      margin-bottom: var(--doc-space-xl, 32px);
    }

    .login-card {
      width: 100%;
      max-width: 400px;
      padding: var(--doc-space-xl, 32px);
    }

    .login-header {
      text-align: center;
      margin-bottom: var(--doc-space-lg, 24px);

      h2 {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0 0 var(--doc-space-xs, 4px);
      }

      p {
        color: var(--doc-text-secondary);
        margin: 0;
      }
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-md, 16px);
    }

    .login-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .forgot-link {
      font-size: 0.875rem;
      color: var(--doc-accent-primary);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    .login-footer {
      margin-top: var(--doc-space-lg, 24px);
      text-align: center;
      font-size: 0.875rem;
      color: var(--doc-text-secondary);

      a {
        color: var(--doc-accent-primary);
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .demo-components {
      h2 {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0 0 var(--doc-space-md, 16px);
      }
    }

    .component-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--doc-space-sm, 8px);
    }

    .component-chip {
      display: inline-flex;
      align-items: center;
      padding: var(--doc-space-xs, 4px) var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated);
      border: 1px solid var(--doc-border-default);
      border-radius: var(--doc-radius-full, 9999px);
      color: var(--doc-text-primary);
      font-size: 0.875rem;
      text-decoration: none;
      transition: all 150ms;

      &:hover {
        border-color: var(--doc-accent-primary);
        color: var(--doc-accent-primary);
        background: var(--doc-accent-primary-light);
      }
    }
  `]
})
export class LoginDemoPage {
  usedComponents: UsedComponent[] = [
    { id: 'ds-card', label: 'Card', path: '/components/data-display/ds-card' },
    { id: 'ds-input-field', label: 'Input Field', path: '/components/forms/text-inputs/ds-input-field' },
    { id: 'ds-button', label: 'Button', path: '/components/actions/ds-button' },
    { id: 'ds-checkbox', label: 'Checkbox', path: '/components/forms/selection/ds-checkbox' },
    { id: 'ds-divider', label: 'Divider', path: '/components/layout/ds-divider' },
  ];

  sources: CodeSource[] = [
    {
      language: 'html',
      filename: 'login.component.html',
      content: `<ds-card class="login-card">
  <div class="login-header">
    <h2>Connexion</h2>
    <p>Entrez vos identifiants pour accéder à votre compte</p>
  </div>

  <form [formGroup]="form" (ngSubmit)="onSubmit()">
    <ds-input-field
      label="Email"
      type="email"
      formControlName="email"
      placeholder="nom@exemple.com"
    />

    <ds-input-field
      label="Mot de passe"
      type="password"
      formControlName="password"
      placeholder="••••••••"
    />

    <div class="login-options">
      <ds-checkbox label="Se souvenir de moi" formControlName="rememberMe" />
      <a routerLink="/forgot-password">Mot de passe oublié ?</a>
    </div>

    <ds-button variant="primary" [block]="true" type="submit" [loading]="isSubmitting">
      Se connecter
    </ds-button>

    <ds-divider label="ou" />

    <ds-button variant="secondary" [block]="true" (click)="loginWithGoogle()">
      Continuer avec Google
    </ds-button>
  </form>

  <div class="login-footer">
    <p>Pas encore de compte ? <a routerLink="/register">Créer un compte</a></p>
  </div>
</ds-card>`
    },
    {
      language: 'typescript',
      filename: 'login.component.ts',
      content: `import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DsInputField, DsButton, DsCard, DsCheckbox, DsDivider } from 'ds-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, DsInputField, DsButton, DsCard, DsCheckbox, DsDivider],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    rememberMe: [false]
  });

  isSubmitting = false;

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitting = true;
      // Appel API...
    }
  }

  loginWithGoogle() {
    // OAuth flow...
  }
}`
    },
    {
      language: 'scss',
      filename: 'login.component.scss',
      content: `.login-card {
  width: 100%;
  max-width: 400px;
  padding: var(--space-8);
}

.login-header {
  text-align: center;
  margin-bottom: var(--space-6);

  h2 { margin: 0 0 var(--space-1); }
  p { color: var(--text-secondary); margin: 0; }
}

form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.login-footer {
  margin-top: var(--space-6);
  text-align: center;
  font-size: 0.875rem;
}`
    }
  ];
}
