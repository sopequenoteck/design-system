import { Meta, StoryObj, moduleMetadata, applicationConfig } from '@storybook/angular';
import { Component, signal, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';

import { DsButton } from './components/ds-button/ds-button';
import { DsInputField } from './components/ds-input-field/ds-input-field';
import { DsInputTextarea } from './components/ds-input-textarea/ds-input-textarea';
import { DsCheckbox } from './components/ds-checkbox/ds-checkbox';
import { DsRadioGroup, RadioOption } from './components/ds-radio-group/ds-radio-group';
import { DsToggle } from './components/ds-toggle/ds-toggle';
import { DsCard } from './components/ds-card/ds-card';
import { DsAlert } from './components/ds-alert/ds-alert';
import { DsBadge } from './components/ds-badge/ds-badge';
import { DsDivider } from './components/ds-divider/ds-divider';
import { DsBreadcrumb, BreadcrumbItem } from './components/ds-breadcrumb/ds-breadcrumb';
import { DsTabs, TabItem } from './components/ds-tabs/ds-tabs';
import { DsDropdown, DropdownItem } from './components/ds-dropdown/ds-dropdown';
import { DsToastService, DsToastContainerComponent } from './components/ds-toast/ds-toast';

/**
 * # Stories d'intégration
 *
 * Ces stories démontrent l'utilisation combinée de plusieurs composants
 * dans des scénarios réels : formulaires, dashboards, navigation.
 *
 * Elles servent de référence pour les développeurs intégrant le Design System.
 */
const meta: Meta = {
  title: 'Patterns/Integration',
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
};

export default meta;

// =============================================================================
// STORY 1: ContactForm - Formulaire réactif complet
// =============================================================================

@Component({
  selector: 'story-contact-form',
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
    DsDivider,
    DsToastContainerComponent,
  ],
  template: `
    <ds-card variant="elevated" size="md">
      <div header>
        <h2 style="margin: 0; font-size: var(--font-size-5);">Formulaire de contact</h2>
      </div>

      <div body>
        <form [formGroup]="contactForm" (ngSubmit)="submitForm()">
          <ds-input-field
            label="Email"
            placeholder="votre.email@example.com"
            formControlName="email"
            [error]="emailError()"
            helperText="Nous ne partagerons jamais votre email">
          </ds-input-field>

          <ds-input-textarea
            label="Message"
            placeholder="Votre message..."
            formControlName="message"
            [rows]="4"
            [maxLength]="500"
            [error]="messageError()">
          </ds-input-textarea>

          <label style="display: block; margin: var(--space-3) 0 var(--space-2); font-weight: 500;">
            Type de demande
          </label>
          <ds-radio-group
            [options]="requestTypeOptions"
            formControlName="requestType"
            layout="vertical">
          </ds-radio-group>

          <ds-divider size="sm"></ds-divider>

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
        <div style="display: flex; gap: var(--space-2); justify-content: flex-end;">
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

    <ds-toast-container position="top-right"></ds-toast-container>
  `,
  styles: [`
    :host { display: block; max-width: 600px; }
    form > * { margin-bottom: var(--space-3); }
  `],
})
class ContactFormComponent {
  private fb = inject(FormBuilder);
  private toastService = inject(DsToastService);

  requestTypeOptions: RadioOption[] = [
    { value: 'support', label: 'Support technique' },
    { value: 'sales', label: 'Question commerciale' },
    { value: 'feedback', label: 'Retour utilisateur' },
  ];

  contactForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
    requestType: ['support', Validators.required],
    acceptTerms: [false, Validators.requiredTrue],
    newsletter: [false],
  });

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

  submitForm() {
    if (this.contactForm.valid) {
      this.toastService.show({
        type: 'success',
        message: 'Formulaire envoyé avec succès !',
        duration: 3000,
      });
      this.contactForm.reset({ requestType: 'support' });
    } else {
      this.toastService.show({
        type: 'error',
        message: 'Veuillez corriger les erreurs du formulaire',
        duration: 4000,
      });
    }
  }

  resetForm() {
    this.contactForm.reset({ requestType: 'support' });
    this.toastService.show({
      type: 'info',
      message: 'Formulaire réinitialisé',
      duration: 2000,
    });
  }
}

export const ContactForm: StoryObj = {
  render: () => ({
    component: ContactFormComponent,
  }),
  parameters: {
    docs: {
      description: {
        story: `
**Formulaire réactif complet** démontrant :
- \`DsInputField\` et \`DsInputTextarea\` avec validation
- \`DsRadioGroup\` pour choix exclusif
- \`DsCheckbox\` et \`DsToggle\` pour options
- \`DsCard\` avec header/body/footer
- \`DsToastService\` pour feedback utilisateur
- Signals Angular (\`computed\`) pour erreurs dynamiques
        `,
      },
    },
  },
};

// =============================================================================
// STORY 2: Dashboard - Layout cards statistiques
// =============================================================================

@Component({
  selector: 'story-dashboard',
  standalone: true,
  imports: [CommonModule, DsCard, DsBadge, DsDivider],
  template: `
    <div class="dashboard-grid">
      <ds-card variant="elevated" size="sm">
        <div header><h3>Utilisateurs</h3></div>
        <div body>
          <div class="stat">
            <span class="stat-value">1,234</span>
            <ds-badge variant="success" size="sm">+12%</ds-badge>
          </div>
        </div>
      </ds-card>

      <ds-card variant="elevated" size="sm">
        <div header><h3>Ventes</h3></div>
        <div body>
          <div class="stat">
            <span class="stat-value">56.7k€</span>
            <ds-badge variant="warning" size="sm">-3%</ds-badge>
          </div>
        </div>
      </ds-card>

      <ds-card variant="elevated" size="sm">
        <div header><h3>Commandes</h3></div>
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
        <p style="color: var(--text-muted); text-align: center;">
          Zone pour graphiques et tableaux de données
        </p>
      </div>
    </ds-card>
  `,
  styles: [`
    :host { display: block; }
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--space-4);
      margin-bottom: var(--space-4);
    }
    h3 { margin: 0; font-size: var(--font-size-3); }
    .stat {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .stat-value {
      font-size: var(--font-size-6);
      font-weight: var(--font-weight-bold);
    }
  `],
})
class DashboardComponent {}

export const Dashboard: StoryObj = {
  render: () => ({
    component: DashboardComponent,
  }),
  parameters: {
    docs: {
      description: {
        story: `
**Layout Dashboard** démontrant :
- Grid responsive avec \`auto-fit\`
- \`DsCard\` en variante elevated
- \`DsBadge\` pour indicateurs de tendance (+/-)
- \`DsDivider\` avec label central
        `,
      },
    },
  },
};

// =============================================================================
// STORY 3: ThemeSwitcher - Navigation avec changement de thème
// =============================================================================

@Component({
  selector: 'story-theme-switcher',
  standalone: true,
  imports: [
    CommonModule,
    DsDropdown,
    DsBreadcrumb,
    DsTabs,
    DsAlert,
    DsBadge,
    DsDivider,
  ],
  template: `
    <header class="header">
      <div class="header-content">
        <h1>Design System</h1>
        <ds-badge variant="info" size="sm">v1.3.0</ds-badge>

        <div class="theme-selector">
          <label>Thème:</label>
          <ds-dropdown
            [items]="themeOptions"
            [value]="currentTheme()"
            (selectionChange)="changeTheme($event)">
          </ds-dropdown>
        </div>
      </div>

      <ds-breadcrumb [items]="breadcrumbItems" maxItems="4"></ds-breadcrumb>
    </header>

    <ds-divider></ds-divider>

    <ds-alert
      type="info"
      [showIcon]="true"
      [closable]="true">
      Changez le thème ci-dessus pour voir l'effet sur tous les composants.
    </ds-alert>

    <ds-tabs [items]="tabItems" (tabChange)="onTabChange($event)">
      <div *ngIf="activeTab() === 'overview'" class="tab-content">
        <p>Contenu de l'onglet Vue d'ensemble</p>
      </div>
      <div *ngIf="activeTab() === 'components'" class="tab-content">
        <p>Contenu de l'onglet Composants</p>
      </div>
      <div *ngIf="activeTab() === 'tokens'" class="tab-content">
        <p>Contenu de l'onglet Tokens</p>
      </div>
    </ds-tabs>
  `,
  styles: [`
    :host { display: block; }
    .header { margin-bottom: var(--space-4); }
    .header-content {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      margin-bottom: var(--space-3);
    }
    h1 {
      margin: 0;
      font-size: var(--font-size-6);
      font-weight: var(--font-weight-bold);
    }
    .theme-selector {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }
    .tab-content {
      padding: var(--space-4);
      background: var(--background-subtle);
      border-radius: var(--radius-2);
      margin-top: var(--space-4);
    }
  `],
})
class ThemeSwitcherComponent {
  currentTheme = signal<'light' | 'dark' | 'custom'>('light');
  activeTab = signal<string>('overview');

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Accueil', url: '/' },
    { label: 'Documentation', url: '/docs' },
    { label: 'Thèmes' },
  ];

  tabItems: TabItem[] = [
    { id: 'overview', label: 'Vue d\'ensemble' },
    { id: 'components', label: 'Composants' },
    { id: 'tokens', label: 'Tokens' },
  ];

  themeOptions: DropdownItem[] = [
    { id: 'light', label: 'Light', value: 'light' },
    { id: 'dark', label: 'Dark', value: 'dark' },
    { id: 'custom', label: 'Custom', value: 'custom' },
  ];

  constructor() {
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
}

export const ThemeSwitcher: StoryObj = {
  render: () => ({
    component: ThemeSwitcherComponent,
  }),
  parameters: {
    docs: {
      description: {
        story: `
**Navigation avec changement de thème** démontrant :
- \`DsDropdown\` pour sélection du thème
- \`effect()\` Angular pour appliquer le thème dynamiquement
- \`DsBreadcrumb\` pour navigation fil d'Ariane
- \`DsTabs\` pour navigation par onglets
- \`DsAlert\` avec icône et fermeture
- Signals (\`signal\`) pour état réactif
        `,
      },
    },
  },
};
