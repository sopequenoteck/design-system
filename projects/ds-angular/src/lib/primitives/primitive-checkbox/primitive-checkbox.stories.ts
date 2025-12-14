import type { Meta, StoryObj } from '@storybook/angular';
import { PrimitiveCheckbox, CheckboxSize } from './primitive-checkbox';

const meta: Meta<PrimitiveCheckbox> = {
  title: 'Foundation/Primitives/Checkbox',
  component: PrimitiveCheckbox,
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'État coché',
    },
    indeterminate: {
      control: 'boolean',
      description: 'État indéterminé',
    },
    disabled: {
      control: 'boolean',
      description: 'État désactivé',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] as CheckboxSize[],
      description: 'Taille de la checkbox',
    },
    label: {
      control: 'text',
      description: 'Label associé',
    },
  },
};

export default meta;
type Story = StoryObj<PrimitiveCheckbox>;

export const Default: Story = {
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    size: 'md',
    label: 'Option',
  },
  render: (args) => ({
    props: args,
    template: `<primitive-checkbox [checked]="checked" [indeterminate]="indeterminate" [disabled]="disabled" [size]="size" [label]="label"></primitive-checkbox>`,
  }),
};

export const AllStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <primitive-checkbox label="Non coché"></primitive-checkbox>
        <primitive-checkbox [checked]="true" label="Coché"></primitive-checkbox>
        <primitive-checkbox [indeterminate]="true" label="Indéterminé"></primitive-checkbox>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <primitive-checkbox size="sm" label="Small"></primitive-checkbox>
        <primitive-checkbox size="md" label="Medium"></primitive-checkbox>
        <primitive-checkbox size="lg" label="Large"></primitive-checkbox>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <primitive-checkbox [disabled]="true" label="Désactivé non coché"></primitive-checkbox>
        <primitive-checkbox [disabled]="true" [checked]="true" label="Désactivé coché"></primitive-checkbox>
        <primitive-checkbox [disabled]="true" [indeterminate]="true" label="Désactivé indéterminé"></primitive-checkbox>
      </div>
    `,
  }),
};

export const WithoutLabel: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px;">
        <primitive-checkbox></primitive-checkbox>
        <primitive-checkbox [checked]="true"></primitive-checkbox>
        <primitive-checkbox [indeterminate]="true"></primitive-checkbox>
      </div>
    `,
  }),
};

export const Group: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <h4 style="margin: 0 0 8px 0;">Sélectionnez vos options :</h4>
        <primitive-checkbox [checked]="true" label="Option A"></primitive-checkbox>
        <primitive-checkbox label="Option B"></primitive-checkbox>
        <primitive-checkbox label="Option C"></primitive-checkbox>
        <primitive-checkbox [disabled]="true" label="Option D (désactivée)"></primitive-checkbox>
      </div>
    `,
  }),
};
