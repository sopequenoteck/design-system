import type { Meta, StoryObj } from '@storybook/angular';
import { DsInputField } from './ds-input-field';
import { faUser, faEnvelope, faLock, faSearch } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<DsInputField> = {
  title: 'Components/InputField',
  component: DsInputField,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label du champ',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search', 'date'],
      description: 'Type d\'input',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille',
    },
    state: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'État de validation',
    },
    helper: {
      control: 'text',
      description: 'Texte d\'aide',
    },
    error: {
      control: 'text',
      description: 'Message d\'erreur',
    },
    disabled: {
      control: 'boolean',
      description: 'Désactivé',
    },
    required: {
      control: 'boolean',
      description: 'Requis',
    },
    clearable: {
      control: 'boolean',
      description: 'Bouton effacer',
    },
    togglePassword: {
      control: 'boolean',
      description: 'Toggle visibilité mot de passe',
    },
  },
};

export default meta;
type Story = StoryObj<DsInputField>;

export const Default: Story = {
  args: {
    label: 'Nom',
    placeholder: 'Entrez votre nom',
    type: 'text',
    size: 'md',
    state: 'default',
    disabled: false,
    required: false,
  },
  render: (args) => ({
    props: args,
    template: `<ds-input-field [label]="label" [placeholder]="placeholder" [type]="type" [size]="size" [state]="state" [disabled]="disabled" [required]="required" style="max-width: 300px; display: block;"></ds-input-field>`,
  }),
};

export const WithHelper: Story = {
  render: () => ({
    template: `
      <ds-input-field
        label="Email"
        placeholder="exemple@email.com"
        type="email"
        helper="Nous ne partagerons jamais votre email"
        style="max-width: 300px; display: block;">
      </ds-input-field>
    `,
  }),
};

export const WithError: Story = {
  render: () => ({
    template: `
      <ds-input-field
        label="Email"
        placeholder="exemple@email.com"
        type="email"
        error="Veuillez entrer un email valide"
        style="max-width: 300px; display: block;">
      </ds-input-field>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
        <ds-input-field label="Default" placeholder="Default" state="default"></ds-input-field>
        <ds-input-field label="Success" placeholder="Success" state="success"></ds-input-field>
        <ds-input-field label="Warning" placeholder="Warning" state="warning"></ds-input-field>
        <ds-input-field label="Error" placeholder="Error" state="error" error="Message d'erreur"></ds-input-field>
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  render: () => ({
    props: {
      faUser,
      faEnvelope,
      faSearch,
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
        <ds-input-field [iconStart]="faUser" label="Nom" placeholder="John Doe"></ds-input-field>
        <ds-input-field [iconStart]="faEnvelope" label="Email" placeholder="email@exemple.com"></ds-input-field>
        <ds-input-field [iconStart]="faSearch" placeholder="Rechercher..."></ds-input-field>
      </div>
    `,
  }),
};

export const Password: Story = {
  render: () => ({
    props: {
      faLock,
    },
    template: `
      <ds-input-field
        [iconStart]="faLock"
        label="Mot de passe"
        type="password"
        placeholder="••••••••"
        [togglePassword]="true"
        helper="Minimum 8 caractères"
        style="max-width: 300px; display: block;">
      </ds-input-field>
    `,
  }),
};

export const Clearable: Story = {
  render: () => ({
    template: `
      <ds-input-field
        label="Recherche"
        placeholder="Tapez pour rechercher..."
        [clearable]="true"
        externalValue="Texte à effacer"
        style="max-width: 300px; display: block;">
      </ds-input-field>
    `,
  }),
};

export const WithMaxLength: Story = {
  render: () => ({
    template: `
      <ds-input-field
        label="Description courte"
        placeholder="Maximum 50 caractères"
        [maxlength]="50"
        helper="Compteur de caractères affiché"
        style="max-width: 300px; display: block;">
      </ds-input-field>
    `,
  }),
};

export const Required: Story = {
  render: () => ({
    template: `
      <ds-input-field
        label="Champ obligatoire"
        placeholder="Ce champ est requis"
        [required]="true"
        style="max-width: 300px; display: block;">
      </ds-input-field>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <ds-input-field
        label="Champ désactivé"
        placeholder="Non modifiable"
        [disabled]="true"
        externalValue="Valeur fixe"
        style="max-width: 300px; display: block;">
      </ds-input-field>
    `,
  }),
};
