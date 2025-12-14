import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { signal } from '@angular/core';
import { DsPasswordStrength, PasswordStrength } from './ds-password-strength';
import { DsInputField } from '../ds-input-field/ds-input-field';

const meta: Meta<DsPasswordStrength> = {
  title: 'Forms/Specialized/Password Strength',
  component: DsPasswordStrength,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DsPasswordStrength, DsInputField],
    }),
  ],
  argTypes: {
    password: {
      control: 'text',
      description: 'Mot de passe à évaluer',
    },
    minLength: {
      control: { type: 'number', min: 4, max: 16 },
      description: 'Longueur minimale requise',
    },
    showLabel: {
      control: 'boolean',
      description: 'Afficher le label textuel',
    },
    showCriteria: {
      control: 'boolean',
      description: 'Afficher les critères détaillés',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du composant',
    },
    strengthChange: {
      action: 'strengthChange',
      description: 'Événement émis lors du changement de force',
    },
  },
};

export default meta;
type Story = StoryObj<DsPasswordStrength>;

/**
 * Exemple par défaut avec contrôles interactifs.
 */
export const Default: Story = {
  args: {
    password: 'Test123!',
    minLength: 8,
    showLabel: true,
    showCriteria: false,
    size: 'md',
  },
};

/**
 * Démonstration des 4 niveaux de force.
 */
export const StrengthLevels: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h4 style="margin: 0 0 0.5rem 0; color: var(--text-muted); font-size: 0.875rem;">None</h4>
          <ds-password-strength [password]="''" />
        </div>

        <div>
          <h4 style="margin: 0 0 0.5rem 0; color: var(--text-muted); font-size: 0.875rem;">Weak (seulement lettres)</h4>
          <ds-password-strength [password]="'abcdefgh'" />
        </div>

        <div>
          <h4 style="margin: 0 0 0.5rem 0; color: var(--text-muted); font-size: 0.875rem;">Medium (lettres + chiffres)</h4>
          <ds-password-strength [password]="'Test1234'" />
        </div>

        <div>
          <h4 style="margin: 0 0 0.5rem 0; color: var(--text-muted); font-size: 0.875rem;">Strong (maj + min + chiffres + spéciaux)</h4>
          <ds-password-strength [password]="'Test123!@#'" />
        </div>
      </div>
    `,
  }),
};

/**
 * Affichage des critères détaillés de validation.
 */
export const WithCriteria: Story = {
  args: {
    password: 'Test123',
    minLength: 8,
    showLabel: true,
    showCriteria: true,
    size: 'md',
  },
};

/**
 * Comparaison des tailles (sm/md/lg).
 */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h4 style="margin: 0 0 0.5rem 0; color: var(--text-muted); font-size: 0.875rem;">Small</h4>
          <ds-password-strength [password]="'Test123!@#'" [size]="'sm'" [showLabel]="true" />
        </div>

        <div>
          <h4 style="margin: 0 0 0.5rem 0; color: var(--text-muted); font-size: 0.875rem;">Medium</h4>
          <ds-password-strength [password]="'Test123!@#'" [size]="'md'" [showLabel]="true" />
        </div>

        <div>
          <h4 style="margin: 0 0 0.5rem 0; color: var(--text-muted); font-size: 0.875rem;">Large</h4>
          <ds-password-strength [password]="'Test123!@#'" [size]="'lg'" [showLabel]="true" />
        </div>
      </div>
    `,
  }),
};

/**
 * Exemple interactif avec champ de saisie.
 */
export const Interactive: Story = {
  render: () => {
    const password = signal('');

    return {
      props: {
        password,
        onPasswordChange: (value: string) => password.set(value),
      },
      template: `
        <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
          <ds-input-field
            [value]="password()"
            (valueChange)="onPasswordChange($event)"
            type="password"
            label="Mot de passe"
            placeholder="Entrez un mot de passe" />

          <ds-password-strength
            [password]="password()"
            [showLabel]="true"
            [showCriteria]="true" />
        </div>
      `,
    };
  },
};

/**
 * Intégration avec ds-input-field dans un formulaire.
 */
export const InForm: Story = {
  render: () => {
    const password = signal('');
    const strength = signal<PasswordStrength>('none');

    return {
      props: {
        password,
        strength,
        onPasswordChange: (value: string) => password.set(value),
        onStrengthChange: (str: PasswordStrength) => strength.set(str),
      },
      template: `
        <div style="max-width: 400px;">
          <h3 style="margin: 0 0 1rem 0; color: var(--text-default);">Créer un compte</h3>

          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <ds-input-field
              value=""
              label="Nom d'utilisateur"
              placeholder="john.doe" />

            <div>
              <ds-input-field
                [value]="password()"
                (valueChange)="onPasswordChange($event)"
                type="password"
                label="Mot de passe"
                placeholder="Au moins 8 caractères"
                [helperText]="strength() === 'strong' ? 'Excellent mot de passe !' : ''" />

              <div style="margin-top: 0.5rem;">
                <ds-password-strength
                  [password]="password()"
                  [showLabel]="true"
                  [showCriteria]="true"
                  (strengthChange)="onStrengthChange($event)" />
              </div>
            </div>

            <ds-input-field
              value=""
              type="password"
              label="Confirmer le mot de passe"
              placeholder="Répétez le mot de passe" />
          </div>
        </div>
      `,
    };
  },
};

/**
 * Affichage sur les 3 thèmes (Light/Dark/Custom).
 */
export const Themed: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;">
        <!-- Light Theme -->
        <div class="theme-light" style="padding: 1.5rem; border-radius: 8px; background: var(--background-main);">
          <h4 style="margin: 0 0 1rem 0; color: var(--text-default); font-size: 0.875rem;">Light Theme</h4>
          <ds-password-strength
            [password]="'Test123!@#'"
            [showLabel]="true"
            [showCriteria]="true" />
        </div>

        <!-- Dark Theme -->
        <div class="theme-dark" style="padding: 1.5rem; border-radius: 8px; background: var(--background-main);">
          <h4 style="margin: 0 0 1rem 0; color: var(--text-default); font-size: 0.875rem;">Dark Theme</h4>
          <ds-password-strength
            [password]="'Test123!@#'"
            [showLabel]="true"
            [showCriteria]="true" />
        </div>

        <!-- Custom Theme -->
        <div class="theme-custom" style="padding: 1.5rem; border-radius: 8px; background: var(--background-main);">
          <h4 style="margin: 0 0 1rem 0; color: var(--text-default); font-size: 0.875rem;">Custom Theme</h4>
          <ds-password-strength
            [password]="'Test123!@#'"
            [showLabel]="true"
            [showCriteria]="true" />
        </div>
      </div>
    `,
  }),
};

/**
 * Variations de longueur minimale.
 */
export const CustomMinLength: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h4 style="margin: 0 0 0.5rem 0; color: var(--text-muted); font-size: 0.875rem;">Min Length: 6</h4>
          <ds-password-strength [password]="'Test12'" [minLength]="6" [showCriteria]="true" />
        </div>

        <div>
          <h4 style="margin: 0 0 0.5rem 0; color: var(--text-muted); font-size: 0.875rem;">Min Length: 10</h4>
          <ds-password-strength [password]="'Test12'" [minLength]="10" [showCriteria]="true" />
        </div>

        <div>
          <h4 style="margin: 0 0 0.5rem 0; color: var(--text-muted); font-size: 0.875rem;">Min Length: 12</h4>
          <ds-password-strength [password]="'Test123!@#Abc'" [minLength]="12" [showCriteria]="true" />
        </div>
      </div>
    `,
  }),
};
