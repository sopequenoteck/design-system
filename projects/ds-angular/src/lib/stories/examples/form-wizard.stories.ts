import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUser,
  faLock,
  faCog,
  faCheck,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';

// Import des composants DS
import { DsCard } from '../../components/ds-card/ds-card';
import { DsStepper } from '../../components/ds-stepper/ds-stepper';
import { DsInputField } from '../../components/ds-input-field/ds-input-field';
import { DsSelect } from '../../components/ds-select/ds-select';
import { DsCheckbox } from '../../components/ds-checkbox/ds-checkbox';
import { DsRadioGroup } from '../../components/ds-radio-group/ds-radio-group';
import { DsButton } from '../../components/ds-button/ds-button';
import { DsAlert } from '../../components/ds-alert/ds-alert';
import { DsToggle } from '../../components/ds-toggle/ds-toggle';
import { DsDivider } from '../../components/ds-divider/ds-divider';
import { DsPasswordStrength } from '../../components/ds-password-strength/ds-password-strength';

// =============================================================================
// FORM WIZARD COMPONENT
// =============================================================================

@Component({
  selector: 'example-form-wizard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    DsCard,
    DsStepper,
    DsInputField,
    DsSelect,
    DsCheckbox,
    DsRadioGroup,
    DsButton,
    DsAlert,
    DsToggle,
    DsDivider,
    DsPasswordStrength,
  ],
  template: `
    <div class="wizard-container">
      <ds-card variant="elevated" class="wizard-card">
        <!-- Header -->
        <div class="wizard-header">
          <h1>Créer un compte</h1>
          <p class="wizard-subtitle">Complétez les étapes ci-dessous pour finaliser votre inscription</p>
        </div>

        <!-- Stepper -->
        <ds-stepper
          [steps]="steps"
          [activeStep]="currentStep()"
          [linear]="true"
          orientation="horizontal"
        />

        <ds-divider spacing="lg" />

        <!-- Step Content -->
        <div class="wizard-content">
          <!-- Step 1: Personal Info -->
          @if (currentStep() === 0) {
            <div class="step-section">
              <h2 class="step-title">
                <fa-icon [icon]="faUser" class="step-icon" />
                Informations personnelles
              </h2>
              <p class="step-description">Renseignez vos informations de base</p>

              <form [formGroup]="personalForm" class="form-grid">
                <div class="form-row">
                  <ds-input-field
                    label="Prénom"
                    formControlName="firstName"
                    placeholder="Votre prénom"
                    [required]="true"
                    [error]="getError('firstName', personalForm)"
                  />
                  <ds-input-field
                    label="Nom"
                    formControlName="lastName"
                    placeholder="Votre nom"
                    [required]="true"
                    [error]="getError('lastName', personalForm)"
                  />
                </div>

                <ds-input-field
                  label="Email"
                  type="email"
                  formControlName="email"
                  placeholder="votre@email.com"
                  [required]="true"
                  [error]="getError('email', personalForm)"
                />

                <ds-input-field
                  label="Téléphone"
                  type="tel"
                  formControlName="phone"
                  placeholder="+33 6 12 34 56 78"
                  helper="Optionnel - pour la vérification en 2 étapes"
                />

                <ds-select
                  label="Pays"
                  formControlName="country"
                  [options]="countryOptions"
                  placeholder="Sélectionnez votre pays"
                  [required]="true"
                />
              </form>
            </div>
          }

          <!-- Step 2: Security -->
          @if (currentStep() === 1) {
            <div class="step-section">
              <h2 class="step-title">
                <fa-icon [icon]="faLock" class="step-icon" />
                Sécurité du compte
              </h2>
              <p class="step-description">Créez un mot de passe sécurisé</p>

              <form [formGroup]="securityForm" class="form-grid">
                <ds-input-field
                  label="Mot de passe"
                  type="password"
                  formControlName="password"
                  placeholder="Minimum 8 caractères"
                  [required]="true"
                  [error]="getError('password', securityForm)"
                />

                <ds-password-strength
                  [password]="securityForm.get('password')?.value || ''"
                  [showRequirements]="true"
                />

                <ds-input-field
                  label="Confirmer le mot de passe"
                  type="password"
                  formControlName="confirmPassword"
                  placeholder="Retapez votre mot de passe"
                  [required]="true"
                  [error]="passwordMismatchError()"
                />

                <ds-divider spacing="md" />

                <div class="security-options">
                  <h3>Options de sécurité</h3>

                  <div class="toggle-item">
                    <div class="toggle-info">
                      <span class="toggle-label">Authentification à deux facteurs</span>
                      <span class="toggle-description">Sécurisez votre compte avec un code SMS</span>
                    </div>
                    <ds-toggle formControlName="twoFactor" />
                  </div>

                  <div class="toggle-item">
                    <div class="toggle-info">
                      <span class="toggle-label">Alertes de connexion</span>
                      <span class="toggle-description">Recevez un email lors d'une nouvelle connexion</span>
                    </div>
                    <ds-toggle formControlName="loginAlerts" />
                  </div>
                </div>
              </form>
            </div>
          }

          <!-- Step 3: Preferences -->
          @if (currentStep() === 2) {
            <div class="step-section">
              <h2 class="step-title">
                <fa-icon [icon]="faCog" class="step-icon" />
                Préférences
              </h2>
              <p class="step-description">Personnalisez votre expérience</p>

              <form [formGroup]="preferencesForm" class="form-grid">
                <ds-select
                  label="Langue"
                  formControlName="language"
                  [options]="languageOptions"
                  placeholder="Sélectionnez une langue"
                />

                <ds-select
                  label="Fuseau horaire"
                  formControlName="timezone"
                  [options]="timezoneOptions"
                  placeholder="Sélectionnez un fuseau"
                />

                <ds-divider spacing="md" />

                <div class="radio-section">
                  <h3>Thème préféré</h3>
                  <ds-radio-group
                    formControlName="theme"
                    [options]="themeOptions"
                    direction="horizontal"
                  />
                </div>

                <ds-divider spacing="md" />

                <div class="checkbox-section">
                  <h3>Notifications</h3>
                  <div class="checkbox-grid">
                    <ds-checkbox formControlName="emailNotifs">
                      Notifications par email
                    </ds-checkbox>
                    <ds-checkbox formControlName="pushNotifs">
                      Notifications push
                    </ds-checkbox>
                    <ds-checkbox formControlName="smsNotifs">
                      Notifications SMS
                    </ds-checkbox>
                    <ds-checkbox formControlName="newsletter">
                      Newsletter hebdomadaire
                    </ds-checkbox>
                  </div>
                </div>

                <ds-divider spacing="md" />

                <ds-checkbox formControlName="terms" [required]="true">
                  J'accepte les <a href="#" class="link">conditions d'utilisation</a>
                  et la <a href="#" class="link">politique de confidentialité</a>
                </ds-checkbox>
              </form>
            </div>
          }

          <!-- Step 4: Confirmation -->
          @if (currentStep() === 3) {
            <div class="step-section">
              <h2 class="step-title">
                <fa-icon [icon]="faCheck" class="step-icon success" />
                Confirmation
              </h2>

              <ds-alert type="success" [showIcon]="true" class="success-alert">
                <strong>Félicitations !</strong> Votre compte a été créé avec succès.
              </ds-alert>

              <div class="summary-section">
                <h3>Récapitulatif</h3>
                <ds-card variant="outlined" class="summary-card">
                  <dl class="summary-list">
                    <div class="summary-item">
                      <dt>Nom complet</dt>
                      <dd>{{ fullName() }}</dd>
                    </div>
                    <div class="summary-item">
                      <dt>Email</dt>
                      <dd>{{ personalForm.get('email')?.value }}</dd>
                    </div>
                    <div class="summary-item">
                      <dt>Pays</dt>
                      <dd>{{ getCountryLabel() }}</dd>
                    </div>
                    <div class="summary-item">
                      <dt>Langue</dt>
                      <dd>{{ getLanguageLabel() }}</dd>
                    </div>
                    <div class="summary-item">
                      <dt>Thème</dt>
                      <dd>{{ preferencesForm.get('theme')?.value }}</dd>
                    </div>
                    <div class="summary-item">
                      <dt>2FA</dt>
                      <dd>{{ securityForm.get('twoFactor')?.value ? 'Activé' : 'Désactivé' }}</dd>
                    </div>
                  </dl>
                </ds-card>
              </div>
            </div>
          }
        </div>

        <!-- Navigation -->
        <div class="wizard-footer">
          @if (currentStep() > 0 && currentStep() < 3) {
            <ds-button variant="outline" (click)="previousStep()">
              Précédent
            </ds-button>
          }
          @if (currentStep() === 0) {
            <div></div>
          }

          @if (currentStep() < 2) {
            <ds-button
              variant="primary"
              [disabled]="!canProceed()"
              (click)="nextStep()"
            >
              Suivant
            </ds-button>
          }
          @if (currentStep() === 2) {
            <ds-button
              variant="primary"
              [disabled]="!canSubmit()"
              (click)="submit()"
            >
              Créer mon compte
            </ds-button>
          }
          @if (currentStep() === 3) {
            <ds-button variant="primary" (click)="goToDashboard()">
              Accéder au tableau de bord
            </ds-button>
          }
        </div>
      </ds-card>
    </div>
  `,
  styles: [`
    .wizard-container {
      min-height: 100vh;
      padding: var(--space-6);
      background: var(--background-secondary);
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }

    .wizard-card {
      width: 100%;
      max-width: 700px;
      margin-top: var(--space-6);
    }

    .wizard-header {
      text-align: center;
      margin-bottom: var(--space-6);
    }

    .wizard-header h1 {
      margin: 0 0 var(--space-2) 0;
      font-size: var(--font-size-2xl);
      font-weight: 700;
      color: var(--text-default);
    }

    .wizard-subtitle {
      margin: 0;
      color: var(--text-secondary);
      font-size: var(--font-size-sm);
    }

    .wizard-content {
      min-height: 400px;
    }

    .step-section {
      padding: var(--space-4) 0;
    }

    .step-title {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      margin: 0 0 var(--space-2) 0;
      font-size: var(--font-size-lg);
      font-weight: 600;
      color: var(--text-default);
    }

    .step-icon {
      color: var(--color-primary);
    }

    .step-icon.success {
      color: var(--success);
    }

    .step-description {
      margin: 0 0 var(--space-6) 0;
      color: var(--text-secondary);
      font-size: var(--font-size-sm);
    }

    .form-grid {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-4);
    }

    .security-options h3,
    .radio-section h3,
    .checkbox-section h3,
    .summary-section h3 {
      margin: 0 0 var(--space-3) 0;
      font-size: var(--font-size-base);
      font-weight: 600;
      color: var(--text-default);
    }

    .toggle-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-3) 0;
      border-bottom: 1px solid var(--border-color);
    }

    .toggle-item:last-child {
      border-bottom: none;
    }

    .toggle-info {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
    }

    .toggle-label {
      font-weight: 500;
      color: var(--text-default);
    }

    .toggle-description {
      font-size: var(--font-size-sm);
      color: var(--text-secondary);
    }

    .checkbox-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-3);
    }

    .link {
      color: var(--color-primary);
      text-decoration: none;
    }

    .link:hover {
      text-decoration: underline;
    }

    .success-alert {
      margin-bottom: var(--space-6);
    }

    .summary-card {
      margin-top: var(--space-4);
    }

    .summary-list {
      margin: 0;
      display: grid;
      gap: var(--space-3);
    }

    .summary-item {
      display: flex;
      justify-content: space-between;
      padding: var(--space-2) 0;
      border-bottom: 1px solid var(--border-color);
    }

    .summary-item:last-child {
      border-bottom: none;
    }

    .summary-item dt {
      font-weight: 500;
      color: var(--text-secondary);
    }

    .summary-item dd {
      margin: 0;
      color: var(--text-default);
    }

    .wizard-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: var(--space-6);
      border-top: 1px solid var(--border-color);
      margin-top: var(--space-6);
    }
  `],
})
class FormWizardExampleComponent {
  // Icons
  faUser = faUser;
  faLock = faLock;
  faCog = faCog;
  faCheck = faCheck;
  faUpload = faUpload;

  // State
  currentStep = signal(0);

  // Steps
  steps = [
    { label: 'Informations', description: 'Données personnelles' },
    { label: 'Sécurité', description: 'Mot de passe et 2FA' },
    { label: 'Préférences', description: 'Personnalisation' },
    { label: 'Confirmation', description: 'Récapitulatif' },
  ];

  // Options
  countryOptions = [
    { value: 'fr', label: 'France' },
    { value: 'be', label: 'Belgique' },
    { value: 'ch', label: 'Suisse' },
    { value: 'ca', label: 'Canada' },
    { value: 'lu', label: 'Luxembourg' },
  ];

  languageOptions = [
    { value: 'fr', label: 'Français' },
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'de', label: 'Deutsch' },
  ];

  timezoneOptions = [
    { value: 'Europe/Paris', label: 'Paris (UTC+1)' },
    { value: 'Europe/London', label: 'Londres (UTC+0)' },
    { value: 'America/New_York', label: 'New York (UTC-5)' },
    { value: 'America/Los_Angeles', label: 'Los Angeles (UTC-8)' },
  ];

  themeOptions = [
    { value: 'light', label: 'Clair' },
    { value: 'dark', label: 'Sombre' },
    { value: 'auto', label: 'Automatique' },
  ];

  // Forms
  personalForm: FormGroup;
  securityForm: FormGroup;
  preferencesForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.personalForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      country: ['', Validators.required],
    });

    this.securityForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      twoFactor: [false],
      loginAlerts: [true],
    });

    this.preferencesForm = this.fb.group({
      language: ['fr'],
      timezone: ['Europe/Paris'],
      theme: ['light'],
      emailNotifs: [true],
      pushNotifs: [true],
      smsNotifs: [false],
      newsletter: [false],
      terms: [false, Validators.requiredTrue],
    });
  }

  // Computed
  fullName = computed(() => {
    const first = this.personalForm.get('firstName')?.value || '';
    const last = this.personalForm.get('lastName')?.value || '';
    return `${first} ${last}`.trim();
  });

  passwordMismatchError = computed(() => {
    const password = this.securityForm.get('password')?.value;
    const confirm = this.securityForm.get('confirmPassword')?.value;
    if (confirm && password !== confirm) {
      return 'Les mots de passe ne correspondent pas';
    }
    return '';
  });

  // Helpers
  getError(field: string, form: FormGroup): string {
    const control = form.get(field);
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'Ce champ est requis';
      if (control.errors['email']) return 'Email invalide';
      if (control.errors['minlength']) return `Minimum ${control.errors['minlength'].requiredLength} caractères`;
    }
    return '';
  }

  getCountryLabel(): string {
    const value = this.personalForm.get('country')?.value;
    return this.countryOptions.find(c => c.value === value)?.label || '';
  }

  getLanguageLabel(): string {
    const value = this.preferencesForm.get('language')?.value;
    return this.languageOptions.find(l => l.value === value)?.label || '';
  }

  canProceed(): boolean {
    if (this.currentStep() === 0) {
      return this.personalForm.valid;
    }
    if (this.currentStep() === 1) {
      return this.securityForm.valid && !this.passwordMismatchError();
    }
    return true;
  }

  canSubmit(): boolean {
    return this.preferencesForm.valid;
  }

  // Actions
  nextStep() {
    if (this.canProceed()) {
      this.currentStep.set(this.currentStep() + 1);
    }
  }

  previousStep() {
    if (this.currentStep() > 0) {
      this.currentStep.set(this.currentStep() - 1);
    }
  }

  submit() {
    if (this.canSubmit()) {
      console.log('Form submitted:', {
        personal: this.personalForm.value,
        security: this.securityForm.value,
        preferences: this.preferencesForm.value,
      });
      this.currentStep.set(3);
    }
  }

  goToDashboard() {
    console.log('Navigate to dashboard');
  }
}

// =============================================================================
// META & STORIES
// =============================================================================

const meta: Meta<FormWizardExampleComponent> = {
  title: 'Examples/Form Wizard',
  component: FormWizardExampleComponent,
  decorators: [
    moduleMetadata({
      imports: [FormWizardExampleComponent],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Form Wizard

Exemple de formulaire multi-étapes avec validation progressive.

## Composants utilisés
- **DsStepper** : Indicateur d'étapes
- **DsCard** : Conteneur principal
- **DsInputField** : Champs de saisie
- **DsSelect** : Sélecteurs
- **DsCheckbox** : Cases à cocher
- **DsRadioGroup** : Boutons radio
- **DsToggle** : Interrupteurs
- **DsButton** : Boutons de navigation
- **DsAlert** : Message de succès
- **DsPasswordStrength** : Indicateur de force du mot de passe
- **DsDivider** : Séparateurs visuels

## Fonctionnalités
- Navigation entre étapes
- Validation par étape
- Indicateur de force du mot de passe
- Récapitulatif final
- Formulaires réactifs Angular
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<FormWizardExampleComponent>;

/**
 * Formulaire complet - Étape 1 : Informations personnelles.
 */
export const Step1_PersonalInfo: Story = {};

/**
 * Étape 2 : Sécurité du compte.
 */
export const Step2_Security: Story = {
  render: () => ({
    template: `<example-form-wizard />`,
    moduleMetadata: {
      imports: [FormWizardExampleComponent],
    },
  }),
  play: async ({ canvasElement }) => {
    // Fill step 1 and go to step 2
    await new Promise(resolve => setTimeout(resolve, 100));
    const nextBtn = canvasElement.querySelector('ds-button[variant="primary"]') as HTMLElement;
    // Note: This would require interaction testing setup
  },
};

/**
 * Étape 3 : Préférences utilisateur.
 */
export const Step3_Preferences: Story = {};

/**
 * Étape 4 : Confirmation et récapitulatif.
 */
export const Step4_Confirmation: Story = {};
