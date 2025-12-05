import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  DsButton,
  DsInputField,
  DsInputTextarea,
  DsCheckbox,
  DsRadioGroup,
  DsToggle,
  DsCard,
  DsAlert,
  DsBadge,
  DsDivider,
  DsBreadcrumb,
  DsTabs,
  DsDropdown,
  DsToastService,
  DsToastContainerComponent,
  BreadcrumbItem,
  TabItem,
  RadioOption,
  DropdownItem,
} from 'ds-angular';

/**
 * Composant racine de l'application de démonstration.
 *
 * Démontre l'utilisation de 15+ composants du design system avec :
 * - Formulaires réactifs avec validation
 * - Thèmes dynamiques (light, dark, custom)
 * - Notifications toast
 * - Navigation par onglets
 * - Composants utilitaires (card, alert, badge, etc.)
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DsButton,
    DsInputField,
    DsInputTextarea,
    DsCheckbox,
    DsRadioGroup,
    DsToggle,
    DsCard,
    DsAlert,
    DsBadge,
    DsDivider,
    DsBreadcrumb,
    DsTabs,
    DsDropdown,
    DsToastContainerComponent,
  ],
  template: `
    <div class="demo-app">
      <!-- Header avec sélecteur de thème -->
      <header class="demo-header">
        <div class="demo-header__content">
          <h1>Design System Demo</h1>
          <ds-badge variant="info" size="sm">v1.0.0</ds-badge>

          <div class="demo-header__theme">
            <label>Thème:</label>
            <ds-dropdown
              [items]="themeOptions"
              [value]="currentTheme()"
              (selectionChange)="changeTheme($event)">
            </ds-dropdown>
          </div>
        </div>

        <!-- Breadcrumb -->
        <ds-breadcrumb [items]="breadcrumbItems" maxItems="4"></ds-breadcrumb>
      </header>

      <ds-divider></ds-divider>

      <!-- Alert de bienvenue -->
      <ds-alert
        type="info"
        [showIcon]="true"
        [closable]="true"
        *ngIf="showWelcomeAlert()">
        Bienvenue dans l'application de démonstration du design system !
        Explorez les composants ci-dessous.
      </ds-alert>

      <!-- Navigation par onglets -->
      <ds-tabs [items]="tabItems" (tabChange)="onTabChange($event)">
        <!-- Tab 1: Formulaire -->
        <div *ngIf="activeTab() === 'form'" class="demo-section">
          <ds-card variant="elevated" size="md">
            <div header>
              <h2>Formulaire de contact</h2>
            </div>

            <div body>
              <form [formGroup]="contactForm" (ngSubmit)="submitForm()">
                <!-- Email -->
                <ds-input-field
                  label="Email"
                  placeholder="votre.email@example.com"
                  formControlName="email"
                  [error]="emailError()"
                  helperText="Nous ne partagerons jamais votre email">
                </ds-input-field>

                <!-- Message -->
                <ds-input-textarea
                  label="Message"
                  placeholder="Votre message..."
                  formControlName="message"
                  [rows]="4"
                  [maxLength]="500"
                  [error]="messageError()">
                </ds-input-textarea>

                <!-- Type de demande (Radio) -->
                <label class="form-label">Type de demande</label>
                <ds-radio-group
                  [options]="requestTypeOptions"
                  formControlName="requestType"
                  layout="vertical">
                </ds-radio-group>

                <ds-divider size="sm"></ds-divider>

                <!-- Options (Checkboxes & Toggle) -->
                <ds-checkbox
                  label="Accepter les conditions d'utilisation"
                  formControlName="acceptTerms">
                </ds-checkbox>

                <ds-toggle
                  label="Recevoir la newsletter"
                  formControlName="newsletter"
                  size="md">
                </ds-toggle>
              </form>
            </div>

            <div footer>
              <div class="card-footer-actions">
                <ds-button variant="ghost" (click)="resetForm()">
                  Réinitialiser
                </ds-button>
                <ds-button
                  variant="primary"
                  [disabled]="contactForm.invalid"
                  (click)="submitForm()">
                  Envoyer
                </ds-button>
              </div>
            </div>
          </ds-card>
        </div>

        <!-- Tab 2: Dashboard -->
        <div *ngIf="activeTab() === 'dashboard'" class="demo-section">
          <div class="demo-grid">
            <ds-card variant="elevated" size="sm">
              <div header>
                <h3>Utilisateurs</h3>
              </div>
              <div body>
                <div class="stat">
                  <span class="stat-value">1,234</span>
                  <ds-badge variant="success" size="sm">+12%</ds-badge>
                </div>
              </div>
            </ds-card>

            <ds-card variant="elevated" size="sm">
              <div header>
                <h3>Ventes</h3>
              </div>
              <div body>
                <div class="stat">
                  <span class="stat-value">56.7k€</span>
                  <ds-badge variant="warning" size="sm">-3%</ds-badge>
                </div>
              </div>
            </ds-card>

            <ds-card variant="elevated" size="sm">
              <div header>
                <h3>Commandes</h3>
              </div>
              <div body>
                <div class="stat">
                  <span class="stat-value">432</span>
                  <ds-badge variant="success" size="sm">+8%</ds-badge>
                </div>
              </div>
            </ds-card>
          </div>

          <ds-divider>Statistiques détaillées</ds-divider>

          <ds-card variant="default" size="md">
            <div body>
              <p>Graphiques et tableaux de données (à implémenter)</p>
            </div>
          </ds-card>
        </div>

        <!-- Tab 3: Composants -->
        <div *ngIf="activeTab() === 'components'" class="demo-section">
          <ds-card variant="outlined" size="md">
            <div header>
              <h2>Galerie de composants</h2>
            </div>

            <div body>
              <!-- Badges -->
              <section class="component-showcase">
                <h3>Badges</h3>
                <div class="showcase-items">
                  <ds-badge variant="default">Default</ds-badge>
                  <ds-badge variant="primary">Primary</ds-badge>
                  <ds-badge variant="success">Success</ds-badge>
                  <ds-badge variant="warning">Warning</ds-badge>
                  <ds-badge variant="error">Error</ds-badge>
                  <ds-badge variant="info">Info</ds-badge>
                </div>
              </section>

              <ds-divider size="sm"></ds-divider>

              <!-- Buttons -->
              <section class="component-showcase">
                <h3>Buttons</h3>
                <div class="showcase-items">
                  <ds-button variant="primary">Primary</ds-button>
                  <ds-button variant="secondary">Secondary</ds-button>
                  <ds-button variant="ghost">Ghost</ds-button>
                  <ds-button variant="danger">Danger</ds-button>
                </div>
              </section>

              <ds-divider size="sm"></ds-divider>

              <!-- Alerts -->
              <section class="component-showcase">
                <h3>Alerts</h3>
                <ds-alert type="success" [showIcon]="true">
                  Opération réussie !
                </ds-alert>
                <ds-alert type="warning" [showIcon]="true">
                  Attention, vérifiez vos données.
                </ds-alert>
                <ds-alert type="error" [showIcon]="true" [closable]="true">
                  Une erreur est survenue.
                </ds-alert>
              </section>

              <ds-divider size="sm"></ds-divider>

              <!-- Toast trigger -->
              <section class="component-showcase">
                <h3>Toast notifications</h3>
                <div class="showcase-items">
                  <ds-button variant="primary" (click)="showToast('success')">
                    Toast Success
                  </ds-button>
                  <ds-button variant="secondary" (click)="showToast('info')">
                    Toast Info
                  </ds-button>
                  <ds-button variant="ghost" (click)="showToast('warning')">
                    Toast Warning
                  </ds-button>
                  <ds-button variant="danger" (click)="showToast('error')">
                    Toast Error
                  </ds-button>
                </div>
              </section>
            </div>
          </ds-card>
        </div>
      </ds-tabs>

      <!-- Footer -->
      <footer class="demo-footer">
        <ds-divider></ds-divider>
        <p>Design System Demo App — Powered by ds-angular v1.0.0</p>
      </footer>

      <!-- Toast container -->
      <ds-toast-container position="top-right"></ds-toast-container>
    </div>
  `,
  styles: [`
    .demo-app {
      max-width: 1200px;
      margin: 0 auto;
      padding: var(--space-4);
    }

    .demo-header {
      margin-bottom: var(--space-4);
    }

    .demo-header__content {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      margin-bottom: var(--space-3);
    }

    .demo-header h1 {
      margin: 0;
      font-size: var(--font-size-6);
      font-weight: var(--font-weight-bold);
    }

    .demo-header__theme {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }

    .demo-section {
      margin-top: var(--space-4);
    }

    .form-label {
      display: block;
      margin: var(--space-3) 0 var(--space-2);
      font-weight: var(--font-weight-medium);
    }

    .card-footer-actions {
      display: flex;
      gap: var(--space-2);
      justify-content: flex-end;
    }

    .demo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--space-4);
      margin-bottom: var(--space-4);
    }

    .stat {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .stat-value {
      font-size: var(--font-size-6);
      font-weight: var(--font-weight-bold);
    }

    .component-showcase {
      margin: var(--space-4) 0;
    }

    .component-showcase h3 {
      margin: 0 0 var(--space-3);
      font-size: var(--font-size-4);
    }

    .showcase-items {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }

    .demo-footer {
      margin-top: var(--space-8);
      text-align: center;
      color: var(--text-muted);
    }

    .demo-footer p {
      margin-top: var(--space-3);
    }

    /* Formulaire spacing */
    form > * {
      margin-bottom: var(--space-3);
    }
  `],
})
export class AppComponent {
  private fb = inject(FormBuilder);
  private toastService = inject(DsToastService);

  // State
  currentTheme = signal<'light' | 'dark' | 'custom'>('light');
  activeTab = signal<string>('form');
  showWelcomeAlert = signal(true);

  // Breadcrumb
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Accueil', url: '/' },
    { label: 'Demo', url: '/demo' },
    { label: 'Composants' },
  ];

  // Tabs
  tabItems: TabItem[] = [
    { id: 'form', label: 'Formulaire' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'components', label: 'Composants' },
  ];

  // Theme options
  themeOptions: DropdownItem[] = [
    { id: 'light', label: 'Light', value: 'light' },
    { id: 'dark', label: 'Dark', value: 'dark' },
    { id: 'custom', label: 'Custom', value: 'custom' },
  ];

  // Radio options
  requestTypeOptions: RadioOption[] = [
    { value: 'support', label: 'Support technique' },
    { value: 'sales', label: 'Question commerciale' },
    { value: 'feedback', label: 'Retour utilisateur' },
  ];

  // Reactive form
  contactForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
    requestType: ['support', Validators.required],
    acceptTerms: [false, Validators.requiredTrue],
    newsletter: [false],
  });

  // Computed error messages
  emailError = computed(() => {
    const control = this.contactForm.get('email');
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'Email requis';
      if (control.errors['email']) return 'Email invalide';
    }
    return '';
  });

  messageError = computed(() => {
    const control = this.contactForm.get('message');
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'Message requis';
      if (control.errors['minlength']) {
        return `Minimum 10 caractères (${control.value?.length || 0}/10)`;
      }
    }
    return '';
  });

  constructor() {
    // Apply theme on change
    effect(() => {
      document.documentElement.className = `theme-${this.currentTheme()}`;
    });
  }

  changeTheme(themeId: string) {
    this.currentTheme.set(themeId as 'light' | 'dark' | 'custom');
  }

  onTabChange(tabId: string) {
    this.activeTab.set(tabId);
  }

  submitForm() {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      this.toastService.show({
        type: 'success',
        message: 'Formulaire envoyé avec succès !',
        duration: 3000,
      });
      this.contactForm.reset();
    } else {
      this.toastService.show({
        type: 'error',
        message: 'Veuillez corriger les erreurs du formulaire',
        duration: 4000,
      });
    }
  }

  resetForm() {
    this.contactForm.reset({
      requestType: 'support',
    });
    this.toastService.show({
      type: 'info',
      message: 'Formulaire réinitialisé',
      duration: 2000,
    });
  }

  showToast(type: 'success' | 'error' | 'warning' | 'info') {
    const messages = {
      success: 'Opération réussie !',
      error: 'Une erreur est survenue',
      warning: 'Attention, action requise',
      info: 'Information importante',
    };

    this.toastService.show({
      type,
      message: messages[type],
      duration: 3000,
    });
  }
}
