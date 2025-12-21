import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NonNullableFormBuilder } from '@angular/forms';
import { DsInputField, DsButton, DsCard, DsCheckbox, DsDivider, DsAvatar, DsAlert } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { CodeSource } from '../../../registry/types';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

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
    ReactiveFormsModule,
    DsInputField,
    DsButton,
    DsCard,
    DsCheckbox,
    DsDivider,
    DsAvatar,
    DsAlert,
    DemoContainer,
    FaIconComponent,
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
          <div class="login-wrapper">
            <ds-card class="login-card">
              <div class="login-header">
                <ds-avatar
                  size="lg"
                  initials="DS"
                  variant="primary"
                />
                <h2>Bon retour !</h2>
                <p>Connectez-vous pour accéder à votre espace</p>
              </div>

              @if (successMessage()) {
                <ds-alert type="success" class="login-alert">
                  {{ successMessage() }}
                </ds-alert>
              }

              <form class="login-form" [formGroup]="form" (ngSubmit)="onSubmit()">
                <ds-input-field
                  label="Email"
                  type="email"
                  placeholder="nom@exemple.com"
                  formControlName="email"
                  [iconStart]="faEnvelope"
                  [error]="emailError"
                />

                <ds-input-field
                  label="Mot de passe"
                  type="password"
                  placeholder="••••••••"
                  formControlName="password"
                  [iconStart]="faLock"
                  [togglePassword]="true"
                  [error]="passwordError"
                />

                <div class="login-options">
                  <ds-checkbox label="Se souvenir de moi" formControlName="rememberMe" />
                  <a href="#" class="forgot-link">Mot de passe oublié ?</a>
                </div>

                <ds-button variant="primary" [block]="true" [submit]="true" [loading]="isSubmitting()">
                  Se connecter
                </ds-button>

                <ds-divider label="ou continuer avec" />

                <ds-button variant="secondary" appearance="outline" [block]="true" (clicked)="loginWithGoogle()">
                  <fa-icon [icon]="faGoogle" class="google-icon" />
                  Google
                </ds-button>
              </form>

              <div class="login-footer">
                <p>Pas encore de compte ? <a href="#">Créer un compte</a></p>
              </div>
            </ds-card>
          </div>
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

    .login-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 500px;
      padding: var(--doc-space-lg, 24px);
    }

    .login-card {
      width: 100%;
      max-width: 420px;
      padding: var(--doc-space-2xl, 40px);
    }

    .login-header {
      text-align: center;
      margin-bottom: var(--doc-space-xl, 32px);

      ds-avatar {
        margin-bottom: var(--doc-space-md, 16px);
      }

      h2 {
        font-size: 1.75rem;
        font-weight: 700;
        margin: 0 0 var(--doc-space-xs, 4px);
        color: var(--doc-text-primary);
      }

      p {
        color: var(--doc-text-secondary);
        margin: 0;
        font-size: 0.9375rem;
      }
    }

    .login-alert {
      margin-bottom: var(--doc-space-lg, 24px);
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-lg, 20px);
    }

    .login-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: calc(-1 * var(--doc-space-xs, 4px));
    }

    .forgot-link {
      font-size: 0.875rem;
      color: var(--doc-accent-primary);
      text-decoration: none;
      font-weight: 500;
      transition: color 150ms;

      &:hover {
        text-decoration: underline;
      }
    }

    .google-icon {
      margin-right: var(--doc-space-sm, 8px);
      font-size: 1.125rem;
    }

    .login-footer {
      margin-top: var(--doc-space-xl, 32px);
      padding-top: var(--doc-space-lg, 24px);
      border-top: 1px solid var(--doc-border-default);
      text-align: center;
      font-size: 0.875rem;
      color: var(--doc-text-secondary);

      p {
        margin: 0;
      }

      a {
        color: var(--doc-accent-primary);
        text-decoration: none;
        font-weight: 500;

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
  // Icons
  faEnvelope = faEnvelope;
  faLock = faLock;
  faGoogle = faGoogle;

  // Form state
  private fb = inject(NonNullableFormBuilder);
  isSubmitting = signal(false);
  successMessage = signal<string | null>(null);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    rememberMe: [false]
  });

  get emailError(): string | undefined {
    const ctrl = this.form.get('email');
    if (ctrl?.touched && ctrl?.errors) {
      if (ctrl.errors['required']) return 'L\'email est requis';
      if (ctrl.errors['email']) return 'Format d\'email invalide';
    }
    return undefined;
  }

  get passwordError(): string | undefined {
    const ctrl = this.form.get('password');
    if (ctrl?.touched && ctrl?.errors) {
      if (ctrl.errors['required']) return 'Le mot de passe est requis';
      if (ctrl.errors['minlength']) return 'Minimum 8 caractères';
    }
    return undefined;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.isSubmitting.set(true);
      this.successMessage.set(null);

      // Simulation d'appel API
      setTimeout(() => {
        this.isSubmitting.set(false);
        this.successMessage.set('Connexion réussie ! Redirection...');
        this.form.reset();
      }, 1500);
    }
  }

  loginWithGoogle(): void {
    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.successMessage.set('Connexion Google réussie !');
    }, 1000);
  }

  usedComponents: UsedComponent[] = [
    { id: 'ds-card', label: 'Card', path: '/components/data-display/ds-card' },
    { id: 'ds-avatar', label: 'Avatar', path: '/components/data-display/ds-avatar' },
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
    <ds-avatar size="lg" initials="DS" variant="primary" />
    <h2>Bon retour !</h2>
    <p>Connectez-vous pour accéder à votre espace</p>
  </div>

  <form [formGroup]="form" (ngSubmit)="onSubmit()">
    <ds-input-field
      label="Email"
      type="email"
      formControlName="email"
      placeholder="nom@exemple.com"
      [iconStart]="faEnvelope"
      [error]="emailError"
    />

    <ds-input-field
      label="Mot de passe"
      type="password"
      formControlName="password"
      placeholder="••••••••"
      [iconStart]="faLock"
      [togglePassword]="true"
      [error]="passwordError"
    />

    <div class="login-options">
      <ds-checkbox label="Se souvenir de moi" formControlName="rememberMe" />
      <a routerLink="/forgot-password">Mot de passe oublié ?</a>
    </div>

    <ds-button variant="primary" [block]="true" [submit]="true" [loading]="isSubmitting">
      Se connecter
    </ds-button>

    <ds-divider label="ou continuer avec" />

    <ds-button variant="secondary" appearance="outline" [block]="true" (clicked)="loginWithGoogle()">
      <fa-icon [icon]="faGoogle" />
      Google
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
      content: `import { Component, computed } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DsInputField, DsButton, DsCard, DsCheckbox, DsDivider, DsAvatar } from 'ds-angular';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FaIconComponent,
    DsInputField,
    DsButton,
    DsCard,
    DsCheckbox,
    DsDivider,
    DsAvatar
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // Icons
  faEnvelope = faEnvelope;
  faLock = faLock;
  faGoogle = faGoogle;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    rememberMe: [false]
  });

  isSubmitting = false;

  constructor(private fb: FormBuilder) {}

  get emailError(): string | undefined {
    const ctrl = this.form.get('email');
    if (ctrl?.touched && ctrl?.errors) {
      if (ctrl.errors['required']) return 'L\\'email est requis';
      if (ctrl.errors['email']) return 'Format d\\'email invalide';
    }
    return undefined;
  }

  get passwordError(): string | undefined {
    const ctrl = this.form.get('password');
    if (ctrl?.touched && ctrl?.errors) {
      if (ctrl.errors['required']) return 'Le mot de passe est requis';
      if (ctrl.errors['minlength']) return 'Minimum 8 caractères';
    }
    return undefined;
  }

  onSubmit() {
    this.form.markAllAsTouched();
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
  max-width: 420px;
  padding: var(--space-10);
}

.login-header {
  text-align: center;
  margin-bottom: var(--space-8);

  ds-avatar {
    margin-bottom: var(--space-4);
  }

  h2 {
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0 0 var(--space-1);
  }

  p {
    color: var(--text-secondary);
    margin: 0;
  }
}

form {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-primary);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.login-footer {
  margin-top: var(--space-8);
  padding-top: var(--space-6);
  border-top: 1px solid var(--border-default);
  text-align: center;
  font-size: 0.875rem;
  color: var(--text-secondary);

  a {
    color: var(--color-primary);
    font-weight: 500;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}`
    }
  ];
}
