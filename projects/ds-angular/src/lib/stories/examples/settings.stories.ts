import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUser,
  faBell,
  faPalette,
  faShield,
  faCamera,
  faSignOutAlt,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

// Import des composants DS
import { DsCard } from '../../components/ds-card/ds-card';
import { DsTabs } from '../../components/ds-tabs/ds-tabs';
import { DsToggle } from '../../components/ds-toggle/ds-toggle';
import { DsSelect } from '../../components/ds-select/ds-select';
import { DsInputField } from '../../components/ds-input-field/ds-input-field';
import { DsAvatar } from '../../components/ds-avatar/ds-avatar';
import { DsButton } from '../../components/ds-button/ds-button';
import { DsDivider } from '../../components/ds-divider/ds-divider';
import { DsAlert } from '../../components/ds-alert/ds-alert';
import { DsRadioGroup } from '../../components/ds-radio-group/ds-radio-group';

// =============================================================================
// SETTINGS PAGE COMPONENT
// =============================================================================

@Component({
  selector: 'example-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    DsCard,
    DsTabs,
    DsToggle,
    DsSelect,
    DsInputField,
    DsAvatar,
    DsButton,
    DsDivider,
    DsAlert,
    DsRadioGroup,
  ],
  template: `
    <div class="settings-container">
      <header class="settings-header">
        <h1>Paramètres</h1>
        <p class="settings-subtitle">Gérez vos préférences et votre compte</p>
      </header>

      <div class="settings-layout">
        <!-- Tabs Navigation -->
        <ds-tabs
          [tabs]="tabs"
          [activeTabId]="activeTab()"
          orientation="vertical"
          (tabChange)="setActiveTab($event)"
          class="settings-tabs"
        />

        <!-- Content -->
        <div class="settings-content">
          <!-- Profile Tab -->
          @if (activeTab() === 'profile') {
            <ds-card variant="default" class="settings-card">
              <h2 class="card-title">Informations du profil</h2>
              <p class="card-description">Mettez à jour vos informations personnelles</p>

              <div class="profile-header-section">
                <div class="avatar-section">
                  <ds-avatar
                    [name]="profile().firstName + ' ' + profile().lastName"
                    size="xl"
                    [showStatus]="true"
                    status="online"
                  />
                  <ds-button variant="outline" size="sm">
                    <fa-icon [icon]="faCamera" /> Changer
                  </ds-button>
                </div>
              </div>

              <ds-divider spacing="lg" />

              <form class="settings-form">
                <div class="form-row">
                  <ds-input-field
                    label="Prénom"
                    [(ngModel)]="profile().firstName"
                    name="firstName"
                  />
                  <ds-input-field
                    label="Nom"
                    [(ngModel)]="profile().lastName"
                    name="lastName"
                  />
                </div>

                <ds-input-field
                  label="Email"
                  type="email"
                  [(ngModel)]="profile().email"
                  name="email"
                  helper="Cet email sera utilisé pour les communications importantes"
                />

                <ds-input-field
                  label="Bio"
                  [(ngModel)]="profile().bio"
                  name="bio"
                  [maxLength]="200"
                  helper="Décrivez-vous en quelques mots"
                />

                <ds-select
                  label="Poste"
                  [(ngModel)]="profile().role"
                  name="role"
                  [options]="roleOptions"
                />
              </form>
            </ds-card>
          }

          <!-- Notifications Tab -->
          @if (activeTab() === 'notifications') {
            <ds-card variant="default" class="settings-card">
              <h2 class="card-title">Préférences de notifications</h2>
              <p class="card-description">Contrôlez comment et quand vous êtes notifié</p>

              <div class="toggle-section">
                <div class="toggle-item">
                  <div class="toggle-info">
                    <span class="toggle-label">Notifications par email</span>
                    <span class="toggle-description">Recevez des mises à jour importantes par email</span>
                  </div>
                  <ds-toggle [(ngModel)]="notifications().email" name="emailNotif" />
                </div>

                <ds-divider />

                <div class="toggle-item">
                  <div class="toggle-info">
                    <span class="toggle-label">Notifications push</span>
                    <span class="toggle-description">Notifications sur votre appareil</span>
                  </div>
                  <ds-toggle [(ngModel)]="notifications().push" name="pushNotif" />
                </div>

                <ds-divider />

                <div class="toggle-item">
                  <div class="toggle-info">
                    <span class="toggle-label">Notifications SMS</span>
                    <span class="toggle-description">Messages texte pour les alertes urgentes</span>
                  </div>
                  <ds-toggle [(ngModel)]="notifications().sms" name="smsNotif" />
                </div>

                <ds-divider />

                <div class="toggle-item">
                  <div class="toggle-info">
                    <span class="toggle-label">Newsletter hebdomadaire</span>
                    <span class="toggle-description">Résumé des activités de la semaine</span>
                  </div>
                  <ds-toggle [(ngModel)]="notifications().newsletter" name="newsletter" />
                </div>
              </div>

              <ds-divider spacing="lg" />

              <h3 class="section-title">Fréquence des emails</h3>
              <ds-radio-group
                [options]="frequencyOptions"
                [(ngModel)]="notifications().frequency"
                name="frequency"
              />
            </ds-card>
          }

          <!-- Appearance Tab -->
          @if (activeTab() === 'appearance') {
            <ds-card variant="default" class="settings-card">
              <h2 class="card-title">Apparence</h2>
              <p class="card-description">Personnalisez l'interface selon vos préférences</p>

              <div class="setting-row">
                <div class="setting-info">
                  <span class="setting-label">Thème</span>
                  <span class="setting-description">Choisissez l'apparence de l'interface</span>
                </div>
                <ds-select
                  [(ngModel)]="appearance().theme"
                  name="theme"
                  [options]="themeOptions"
                  size="sm"
                />
              </div>

              <ds-divider />

              <div class="setting-row">
                <div class="setting-info">
                  <span class="setting-label">Densité d'affichage</span>
                  <span class="setting-description">Ajustez l'espacement des éléments</span>
                </div>
                <ds-select
                  [(ngModel)]="appearance().density"
                  name="density"
                  [options]="densityOptions"
                  size="sm"
                />
              </div>

              <ds-divider />

              <div class="setting-row">
                <div class="setting-info">
                  <span class="setting-label">Taille de police</span>
                  <span class="setting-description">Ajustez la taille du texte</span>
                </div>
                <ds-select
                  [(ngModel)]="appearance().fontSize"
                  name="fontSize"
                  [options]="fontSizeOptions"
                  size="sm"
                />
              </div>

              <ds-divider />

              <div class="toggle-item">
                <div class="toggle-info">
                  <span class="toggle-label">Sidebar compacte</span>
                  <span class="toggle-description">Réduire automatiquement la sidebar</span>
                </div>
                <ds-toggle [(ngModel)]="appearance().compactSidebar" name="compactSidebar" />
              </div>

              <ds-divider />

              <div class="toggle-item">
                <div class="toggle-info">
                  <span class="toggle-label">Animations</span>
                  <span class="toggle-description">Activer les animations de l'interface</span>
                </div>
                <ds-toggle [(ngModel)]="appearance().animations" name="animations" />
              </div>
            </ds-card>
          }

          <!-- Security Tab -->
          @if (activeTab() === 'security') {
            <ds-card variant="default" class="settings-card">
              <h2 class="card-title">Sécurité</h2>
              <p class="card-description">Protégez votre compte</p>

              <ds-alert type="info" [showIcon]="true" class="security-alert">
                Dernière connexion : aujourd'hui à 14h32 depuis Paris, France
              </ds-alert>

              <ds-divider spacing="lg" />

              <div class="toggle-item">
                <div class="toggle-info">
                  <span class="toggle-label">Authentification à deux facteurs</span>
                  <span class="toggle-description">Sécurisez votre compte avec un code supplémentaire</span>
                </div>
                <ds-toggle [(ngModel)]="security().twoFactor" name="twoFactor" />
              </div>

              <ds-divider />

              <div class="toggle-item">
                <div class="toggle-info">
                  <span class="toggle-label">Alertes de connexion</span>
                  <span class="toggle-description">Email lors d'une nouvelle connexion</span>
                </div>
                <ds-toggle [(ngModel)]="security().loginAlerts" name="loginAlerts" />
              </div>

              <ds-divider />

              <div class="setting-row">
                <div class="setting-info">
                  <span class="setting-label">Changer le mot de passe</span>
                  <span class="setting-description">Dernière modification il y a 3 mois</span>
                </div>
                <ds-button variant="outline" size="sm">Modifier</ds-button>
              </div>

              <ds-divider />

              <div class="setting-row">
                <div class="setting-info">
                  <span class="setting-label">Sessions actives</span>
                  <span class="setting-description">3 appareils connectés</span>
                </div>
                <ds-button variant="outline" size="sm">Gérer</ds-button>
              </div>

              <ds-divider spacing="lg" />

              <h3 class="section-title danger">Zone de danger</h3>

              <div class="danger-actions">
                <div class="setting-row">
                  <div class="setting-info">
                    <span class="setting-label">Déconnexion</span>
                    <span class="setting-description">Se déconnecter de cet appareil</span>
                  </div>
                  <ds-button variant="outline" size="sm">
                    <fa-icon [icon]="faSignOutAlt" /> Déconnexion
                  </ds-button>
                </div>

                <ds-divider />

                <div class="setting-row">
                  <div class="setting-info">
                    <span class="setting-label danger-text">Supprimer le compte</span>
                    <span class="setting-description">Cette action est irréversible</span>
                  </div>
                  <ds-button variant="danger" size="sm">
                    <fa-icon [icon]="faTrash" /> Supprimer
                  </ds-button>
                </div>
              </div>
            </ds-card>
          }

          <!-- Save Button -->
          <div class="settings-actions">
            <ds-button variant="outline" (click)="resetChanges()">
              Annuler les modifications
            </ds-button>
            <ds-button variant="primary" (click)="saveSettings()">
              Enregistrer
            </ds-button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .settings-container {
      min-height: 100vh;
      padding: var(--space-6);
      background: var(--background-secondary);
    }

    .settings-header {
      max-width: 1000px;
      margin: 0 auto var(--space-6) auto;
    }

    .settings-header h1 {
      margin: 0 0 var(--space-2) 0;
      font-size: var(--font-size-2xl);
      font-weight: 700;
    }

    .settings-subtitle {
      margin: 0;
      color: var(--text-secondary);
    }

    .settings-layout {
      max-width: 1000px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 220px 1fr;
      gap: var(--space-6);
    }

    .settings-tabs {
      position: sticky;
      top: var(--space-6);
      height: fit-content;
    }

    .settings-content {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }

    .settings-card {
      --card-padding: var(--space-6);
    }

    .card-title {
      margin: 0 0 var(--space-1) 0;
      font-size: var(--font-size-lg);
      font-weight: 600;
    }

    .card-description {
      margin: 0 0 var(--space-6) 0;
      color: var(--text-secondary);
      font-size: var(--font-size-sm);
    }

    .profile-header-section {
      display: flex;
      justify-content: center;
    }

    .avatar-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-3);
    }

    .settings-form {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-4);
    }

    .toggle-section {
      display: flex;
      flex-direction: column;
    }

    .toggle-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-4) 0;
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

    .setting-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-4) 0;
    }

    .setting-info {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
    }

    .setting-label {
      font-weight: 500;
      color: var(--text-default);
    }

    .setting-description {
      font-size: var(--font-size-sm);
      color: var(--text-secondary);
    }

    .section-title {
      margin: 0 0 var(--space-4) 0;
      font-size: var(--font-size-base);
      font-weight: 600;
      color: var(--text-default);
    }

    .section-title.danger {
      color: var(--error);
    }

    .danger-text {
      color: var(--error);
    }

    .security-alert {
      margin-bottom: var(--space-4);
    }

    .danger-actions {
      background: rgba(var(--error-rgb, 239, 68, 68), 0.05);
      border-radius: var(--radius-2);
      padding: 0 var(--space-4);
      margin-top: var(--space-2);
    }

    .settings-actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--space-3);
      padding-top: var(--space-4);
      border-top: 1px solid var(--border-color);
      margin-top: var(--space-2);
    }
  `],
})
class SettingsExampleComponent {
  // Icons
  faUser = faUser;
  faBell = faBell;
  faPalette = faPalette;
  faShield = faShield;
  faCamera = faCamera;
  faSignOutAlt = faSignOutAlt;
  faTrash = faTrash;

  // State
  activeTab = signal('profile');

  // Tabs
  tabs = [
    { id: 'profile', label: 'Profil', icon: faUser },
    { id: 'notifications', label: 'Notifications', icon: faBell },
    { id: 'appearance', label: 'Apparence', icon: faPalette },
    { id: 'security', label: 'Sécurité', icon: faShield },
  ];

  // Profile
  profile = signal({
    firstName: 'Marie',
    lastName: 'Dupont',
    email: 'marie.dupont@example.com',
    bio: 'Designer UI/UX passionnée par les interfaces modernes et accessibles.',
    role: 'designer',
  });

  roleOptions = [
    { value: 'designer', label: 'Designer' },
    { value: 'developer', label: 'Développeur' },
    { value: 'manager', label: 'Manager' },
    { value: 'other', label: 'Autre' },
  ];

  // Notifications
  notifications = signal({
    email: true,
    push: true,
    sms: false,
    newsletter: false,
    frequency: 'daily',
  });

  frequencyOptions = [
    { value: 'realtime', label: 'Temps réel' },
    { value: 'daily', label: 'Quotidien' },
    { value: 'weekly', label: 'Hebdomadaire' },
    { value: 'never', label: 'Jamais' },
  ];

  // Appearance
  appearance = signal({
    theme: 'light',
    density: 'cozy',
    fontSize: 'base',
    compactSidebar: false,
    animations: true,
  });

  themeOptions = [
    { value: 'light', label: 'Clair' },
    { value: 'dark', label: 'Sombre' },
    { value: 'auto', label: 'Système' },
  ];

  densityOptions = [
    { value: 'compact', label: 'Compact' },
    { value: 'cozy', label: 'Confortable' },
    { value: 'comfortable', label: 'Spacieux' },
  ];

  fontSizeOptions = [
    { value: 'small', label: 'Petit' },
    { value: 'base', label: 'Normal' },
    { value: 'large', label: 'Grand' },
  ];

  // Security
  security = signal({
    twoFactor: false,
    loginAlerts: true,
  });

  // Actions
  setActiveTab(tabId: string) {
    this.activeTab.set(tabId);
  }

  resetChanges() {
    console.log('Reset changes');
  }

  saveSettings() {
    console.log('Save settings:', {
      profile: this.profile(),
      notifications: this.notifications(),
      appearance: this.appearance(),
      security: this.security(),
    });
  }
}

// =============================================================================
// META & STORIES
// =============================================================================

const meta: Meta<SettingsExampleComponent> = {
  title: 'Examples/Settings Page',
  component: SettingsExampleComponent,
  decorators: [
    moduleMetadata({
      imports: [SettingsExampleComponent],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Settings Page

Exemple de page de paramètres avec tabs verticaux et sections organisées.

## Composants utilisés
- **DsTabs** : Navigation verticale entre sections
- **DsCard** : Conteneurs de sections
- **DsToggle** : Interrupteurs on/off
- **DsSelect** : Sélecteurs d'options
- **DsInputField** : Champs de saisie
- **DsAvatar** : Photo de profil
- **DsButton** : Actions
- **DsDivider** : Séparateurs
- **DsAlert** : Messages d'information
- **DsRadioGroup** : Choix exclusifs

## Fonctionnalités
- Navigation par tabs verticaux
- Édition du profil
- Gestion des notifications
- Personnalisation de l'apparence
- Options de sécurité
- Zone de danger avec actions critiques
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<SettingsExampleComponent>;

/**
 * Onglet Profil - Informations personnelles.
 */
export const ProfileTab: Story = {};

/**
 * Onglet Notifications - Préférences de notifications.
 */
export const NotificationsTab: Story = {
  render: () => ({
    template: `<example-settings />`,
    moduleMetadata: {
      imports: [SettingsExampleComponent],
    },
  }),
  play: async ({ canvasElement }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const tabs = canvasElement.querySelectorAll('.ds-tabs__tab');
    const notifTab = Array.from(tabs).find(t => t.textContent?.includes('Notifications')) as HTMLElement;
    if (notifTab) notifTab.click();
  },
};

/**
 * Onglet Apparence - Personnalisation visuelle.
 */
export const AppearanceTab: Story = {
  render: () => ({
    template: `<example-settings />`,
    moduleMetadata: {
      imports: [SettingsExampleComponent],
    },
  }),
  play: async ({ canvasElement }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const tabs = canvasElement.querySelectorAll('.ds-tabs__tab');
    const appearanceTab = Array.from(tabs).find(t => t.textContent?.includes('Apparence')) as HTMLElement;
    if (appearanceTab) appearanceTab.click();
  },
};

/**
 * Onglet Sécurité - Protection du compte.
 */
export const SecurityTab: Story = {
  render: () => ({
    template: `<example-settings />`,
    moduleMetadata: {
      imports: [SettingsExampleComponent],
    },
  }),
  play: async ({ canvasElement }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const tabs = canvasElement.querySelectorAll('.ds-tabs__tab');
    const securityTab = Array.from(tabs).find(t => t.textContent?.includes('Sécurité')) as HTMLElement;
    if (securityTab) securityTab.click();
  },
};
