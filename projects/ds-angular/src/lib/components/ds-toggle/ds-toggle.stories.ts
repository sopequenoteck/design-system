import type { Meta, StoryObj } from '@storybook/angular';
import { DsToggle } from './ds-toggle';

const meta: Meta<DsToggle> = {
  title: 'Form/Selection/DsToggle',
  component: DsToggle,
  argTypes: {
    label: {
      control: 'text',
      description: 'Label',
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position du label',
    },
    helper: {
      control: 'text',
      description: 'Texte d\'aide',
    },
    disabled: {
      control: 'boolean',
      description: 'Désactivé',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille',
    },
  },
};

export default meta;
type Story = StoryObj<DsToggle>;

export const Default: Story = {
  args: {
    label: 'Activer la fonctionnalité',
    labelPosition: 'right',
    disabled: false,
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: `<ds-toggle [label]="label" [labelPosition]="labelPosition" [disabled]="disabled" [size]="size"></ds-toggle>`,
  }),
};

export const WithHelper: Story = {
  render: () => ({
    template: `
      <ds-toggle
        label="Notifications push"
        helper="Recevez des alertes en temps réel sur votre appareil">
      </ds-toggle>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <ds-toggle size="sm" label="Small"></ds-toggle>
        <ds-toggle size="md" label="Medium"></ds-toggle>
        <ds-toggle size="lg" label="Large"></ds-toggle>
      </div>
    `,
  }),
};

export const LabelPositions: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <ds-toggle labelPosition="left" label="Label à gauche"></ds-toggle>
        <ds-toggle labelPosition="right" label="Label à droite"></ds-toggle>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <ds-toggle [disabled]="true" label="Désactivé (off)"></ds-toggle>
      </div>
    `,
  }),
};

export const SettingsPanel: Story = {
  render: () => ({
    template: `
      <div style="max-width: 400px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h3 style="margin: 0 0 16px 0;">Paramètres de notification</h3>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <ds-toggle
            label="Notifications par email"
            helper="Recevez un résumé quotidien par email">
          </ds-toggle>
          <ds-toggle
            label="Notifications push"
            helper="Alertes en temps réel">
          </ds-toggle>
          <ds-toggle
            label="Newsletter"
            helper="Actualités et mises à jour mensuelles">
          </ds-toggle>
          <ds-toggle
            label="Mode marketing"
            [disabled]="true"
            helper="Indisponible pour ce type de compte">
          </ds-toggle>
        </div>
      </div>
    `,
  }),
};

export const CheckedUnchecked: Story = {
  render: () => ({
    props: {
      isChecked: true,
      toggle: function() {
        this["isChecked"] = !this["isChecked"];
      },
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <p style="margin: 0 0 8px; font-size: 14px; color: #666;">État contrôlé programmatiquement :</p>
          <ds-toggle
            label="Mode sombre"
            [(ngModel)]="isChecked">
          </ds-toggle>
          <p style="margin: 8px 0 0; font-size: 12px; color: #999;">
            Valeur actuelle : <strong>{{ isChecked ? 'Activé' : 'Désactivé' }}</strong>
          </p>
          <button
            (click)="toggle()"
            style="margin-top: 8px; padding: 6px 12px; border: 1px solid #d1d5db; border-radius: 4px; background: white; cursor: pointer;">
            Basculer l'état
          </button>
        </div>
        <div style="border-top: 1px solid #e5e7eb; padding-top: 16px;">
          <p style="margin: 0 0 8px; font-size: 14px; color: #666;">États par défaut :</p>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <ds-toggle label="Toggle coché par défaut" [checked]="true"></ds-toggle>
            <ds-toggle label="Toggle décoché par défaut"></ds-toggle>
          </div>
        </div>
      </div>
    `,
  }),
};

export const InReactiveForm: Story = {
  render: () => ({
    props: {
      formValue: {
        notifications: false,
        autoSave: true,
        darkMode: false,
        betaFeatures: false,
      },
      onSubmit: function() {
        console.log('Form submitted:', this["formValue"]);
        alert('Formulaire soumis ! Vérifiez la console.');
      },
    },
    template: `
      <form (submit)="onSubmit(); $event.preventDefault()" style="max-width: 500px;">
        <h3 style="margin: 0 0 16px;">Préférences utilisateur</h3>
        <div style="display: flex; flex-direction: column; gap: 16px; padding: 16px; background: #f9fafb; border-radius: 8px;">
          <ds-toggle
            label="Notifications"
            [(ngModel)]="formValue.notifications"
            name="notifications"
            helper="Recevoir des notifications par email">
          </ds-toggle>
          <ds-toggle
            label="Sauvegarde automatique"
            [(ngModel)]="formValue.autoSave"
            name="autoSave"
            helper="Sauvegarder automatiquement vos modifications">
          </ds-toggle>
          <ds-toggle
            label="Mode sombre"
            [(ngModel)]="formValue.darkMode"
            name="darkMode"
            helper="Activer le thème sombre">
          </ds-toggle>
          <ds-toggle
            label="Fonctionnalités bêta"
            [(ngModel)]="formValue.betaFeatures"
            name="betaFeatures"
            helper="Accéder aux nouvelles fonctionnalités (peut être instable)">
          </ds-toggle>
        </div>
        <div style="margin-top: 16px; padding: 12px; background: #f3f4f6; border-radius: 6px; font-size: 12px; font-family: monospace;">
          <strong>Valeurs du formulaire :</strong>
          <pre style="margin: 4px 0 0;">{{ formValue | json }}</pre>
        </div>
        <button
          type="submit"
          style="margin-top: 16px; padding: 8px 16px; border: none; border-radius: 4px; background: #7d4bc0; color: white; cursor: pointer;">
          Enregistrer les préférences
        </button>
      </form>
    `,
  }),
};

export const Themed: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div class="theme-light" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Light</h4>
          <ds-toggle label="Enable feature"></ds-toggle>
        </div>
        <div class="theme-dark" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Dark</h4>
          <ds-toggle label="Enable feature"></ds-toggle>
        </div>
        <div class="theme-custom" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Custom</h4>
          <ds-toggle label="Enable feature"></ds-toggle>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Affiche le composant dans les 3 thèmes (Light, Dark, Custom) pour vérifier la thématisation.',
      },
    },
  },
};
