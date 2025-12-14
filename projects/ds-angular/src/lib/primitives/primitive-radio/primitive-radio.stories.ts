import type { Meta, StoryObj } from '@storybook/angular';
import { PrimitiveRadio, RadioSize } from './primitive-radio';

const meta: Meta<PrimitiveRadio> = {
  title: 'Foundation/Primitives/Radio',
  component: PrimitiveRadio,
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'État sélectionné',
    },
    disabled: {
      control: 'boolean',
      description: 'État désactivé',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] as RadioSize[],
      description: 'Taille du radio',
    },
    label: {
      control: 'text',
      description: 'Label associé',
    },
    name: {
      control: 'text',
      description: 'Nom du groupe',
    },
    value: {
      control: 'text',
      description: 'Valeur du radio',
    },
  },
};

export default meta;
type Story = StoryObj<PrimitiveRadio>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    size: 'md',
    label: 'Option',
    name: 'demo',
    value: 'option1',
  },
  render: (args) => ({
    props: args,
    template: `<primitive-radio [checked]="checked" [disabled]="disabled" [size]="size" [label]="label" [name]="name" [value]="value"></primitive-radio>`,
  }),
};

export const AllStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <primitive-radio label="Non sélectionné" name="states" value="1"></primitive-radio>
        <primitive-radio [checked]="true" label="Sélectionné" name="states" value="2"></primitive-radio>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <primitive-radio size="sm" label="Small" name="sizes" value="sm"></primitive-radio>
        <primitive-radio size="md" label="Medium" name="sizes" value="md"></primitive-radio>
        <primitive-radio size="lg" label="Large" name="sizes" value="lg"></primitive-radio>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <primitive-radio [disabled]="true" label="Désactivé non sélectionné" name="disabled" value="1"></primitive-radio>
        <primitive-radio [disabled]="true" [checked]="true" label="Désactivé sélectionné" name="disabled" value="2"></primitive-radio>
      </div>
    `,
  }),
};

export const WithoutLabel: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px;">
        <primitive-radio name="nolabel" value="1"></primitive-radio>
        <primitive-radio [checked]="true" name="nolabel" value="2"></primitive-radio>
      </div>
    `,
  }),
};

export const RadioGroup: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <h4 style="margin: 0 0 8px 0;">Choisissez une option :</h4>
        <primitive-radio [checked]="true" label="Option A" name="group" value="a"></primitive-radio>
        <primitive-radio label="Option B" name="group" value="b"></primitive-radio>
        <primitive-radio label="Option C" name="group" value="c"></primitive-radio>
        <primitive-radio [disabled]="true" label="Option D (désactivée)" name="group" value="d"></primitive-radio>
      </div>
    `,
  }),
};
