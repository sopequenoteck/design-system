import type { Meta, StoryObj } from '@storybook/angular';
import { DsCheckbox } from './ds-checkbox';

const meta: Meta<DsCheckbox> = {
  title: 'Components/Forms/DsCheckbox',
  component: DsCheckbox,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label',
    },
    helper: {
      control: 'text',
      description: 'Texte d\'aide',
    },
    error: {
      control: 'text',
      description: 'Message d\'erreur',
    },
    required: {
      control: 'boolean',
      description: 'Requis',
    },
    disabled: {
      control: 'boolean',
      description: 'Désactivé',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indéterminé',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille',
    },
  },
};

export default meta;
type Story = StoryObj<DsCheckbox>;

export const Default: Story = {
  args: {
    label: 'J\'accepte les conditions',
    disabled: false,
    required: false,
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: `<ds-checkbox [label]="label" [disabled]="disabled" [required]="required" [size]="size"></ds-checkbox>`,
  }),
};

export const WithHelper: Story = {
  render: () => ({
    template: `
      <ds-checkbox
        label="Newsletter"
        helper="Recevez nos dernières actualités par email">
      </ds-checkbox>
    `,
  }),
};

export const WithError: Story = {
  render: () => ({
    template: `
      <ds-checkbox
        label="J'accepte les conditions d'utilisation"
        [required]="true"
        error="Vous devez accepter les conditions pour continuer">
      </ds-checkbox>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <ds-checkbox size="sm" label="Small"></ds-checkbox>
        <ds-checkbox size="md" label="Medium"></ds-checkbox>
        <ds-checkbox size="lg" label="Large"></ds-checkbox>
      </div>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <ds-checkbox label="Non coché"></ds-checkbox>
        <ds-checkbox [indeterminate]="true" label="Indéterminé"></ds-checkbox>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <ds-checkbox [disabled]="true" label="Désactivé"></ds-checkbox>
      </div>
    `,
  }),
};

export const Required: Story = {
  render: () => ({
    template: `
      <ds-checkbox
        [required]="true"
        label="Champ obligatoire">
      </ds-checkbox>
    `,
  }),
};

export const FormExample: Story = {
  render: () => ({
    template: `
      <div style="max-width: 400px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h3 style="margin: 0 0 16px;">Préférences</h3>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <ds-checkbox label="Notifications par email" helper="Résumé quotidien"></ds-checkbox>
          <ds-checkbox label="Notifications SMS" helper="Alertes importantes uniquement"></ds-checkbox>
          <ds-checkbox label="Newsletter mensuelle"></ds-checkbox>
          <ds-checkbox [disabled]="true" label="Offres partenaires" helper="Indisponible"></ds-checkbox>
        </div>
      </div>
    `,
  }),
};
