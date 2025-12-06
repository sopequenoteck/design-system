import type { Meta, StoryObj } from '@storybook/angular';
import { PrimitiveToggle, ToggleSize } from './primitive-toggle';

const meta: Meta<PrimitiveToggle> = {
  title: 'Primitives/PrimitiveToggle',
  component: PrimitiveToggle,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'État activé',
    },
    disabled: {
      control: 'boolean',
      description: 'État désactivé',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] as ToggleSize[],
      description: 'Taille du toggle',
    },
    label: {
      control: 'text',
      description: 'Label associé',
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position du label',
    },
  },
};

export default meta;
type Story = StoryObj<PrimitiveToggle>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    size: 'md',
    label: 'Activer',
    labelPosition: 'right',
  },
  render: (args) => ({
    props: args,
    template: `<primitive-toggle [checked]="checked" [disabled]="disabled" [size]="size" [label]="label" [labelPosition]="labelPosition"></primitive-toggle>`,
  }),
};

export const AllStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <primitive-toggle label="Désactivé"></primitive-toggle>
        <primitive-toggle [checked]="true" label="Activé"></primitive-toggle>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <primitive-toggle size="sm" label="Small"></primitive-toggle>
        <primitive-toggle size="md" label="Medium"></primitive-toggle>
        <primitive-toggle size="lg" label="Large"></primitive-toggle>
      </div>
    `,
  }),
};

export const LabelPositions: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <primitive-toggle labelPosition="left" label="Label à gauche"></primitive-toggle>
        <primitive-toggle labelPosition="right" label="Label à droite"></primitive-toggle>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <primitive-toggle [disabled]="true" label="Désactivé (off)"></primitive-toggle>
        <primitive-toggle [disabled]="true" [checked]="true" label="Désactivé (on)"></primitive-toggle>
      </div>
    `,
  }),
};

export const WithoutLabel: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px;">
        <primitive-toggle></primitive-toggle>
        <primitive-toggle [checked]="true"></primitive-toggle>
      </div>
    `,
  }),
};

export const SettingsExample: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
        <h4 style="margin: 0;">Paramètres</h4>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>Notifications</span>
          <primitive-toggle [checked]="true"></primitive-toggle>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>Mode sombre</span>
          <primitive-toggle></primitive-toggle>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>Sons</span>
          <primitive-toggle [checked]="true"></primitive-toggle>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>Auto-save</span>
          <primitive-toggle [disabled]="true"></primitive-toggle>
        </div>
      </div>
    `,
  }),
};
