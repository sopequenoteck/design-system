import type { Meta, StoryObj } from '@storybook/angular';
import { DsToggle } from './ds-toggle';

const meta: Meta<DsToggle> = {
  title: 'Components/Toggle',
  component: DsToggle,
  tags: ['autodocs'],
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
