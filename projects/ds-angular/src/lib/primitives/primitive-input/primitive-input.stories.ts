import type { Meta, StoryObj } from '@storybook/angular';
import { PrimitiveInput, InputType, InputState, InputSize, InputAppearance } from './primitive-input';
import { faSearch, faEye, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<PrimitiveInput> = {
  title: 'Primitives/Input',
  component: PrimitiveInput,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search', 'date'] as InputType[],
      description: 'Type d\'input HTML',
    },
    state: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'] as InputState[],
      description: 'État de validation',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] as InputSize[],
      description: 'Taille de l\'input',
    },
    appearance: {
      control: 'select',
      options: ['default', 'outline', 'ghost'] as InputAppearance[],
      description: 'Apparence de l\'input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder',
    },
    disabled: {
      control: 'boolean',
      description: 'État désactivé',
    },
    readonly: {
      control: 'boolean',
      description: 'Lecture seule',
    },
    required: {
      control: 'boolean',
      description: 'Champ requis',
    },
  },
};

export default meta;
type Story = StoryObj<PrimitiveInput>;

export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Entrez du texte...',
    state: 'default',
    size: 'md',
    appearance: 'default',
    disabled: false,
    readonly: false,
  },
  render: (args) => ({
    props: args,
    template: `<primitive-input [type]="type" [placeholder]="placeholder" [state]="state" [size]="size" [appearance]="appearance" [disabled]="disabled" [readonly]="readonly"></primitive-input>`,
  }),
};

export const AllStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 300px;">
        <primitive-input placeholder="Default" state="default"></primitive-input>
        <primitive-input placeholder="Success" state="success"></primitive-input>
        <primitive-input placeholder="Warning" state="warning"></primitive-input>
        <primitive-input placeholder="Error" state="error"></primitive-input>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 300px;">
        <primitive-input placeholder="Small" size="sm"></primitive-input>
        <primitive-input placeholder="Medium" size="md"></primitive-input>
        <primitive-input placeholder="Large" size="lg"></primitive-input>
      </div>
    `,
  }),
};

export const InputTypes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 300px;">
        <primitive-input type="text" placeholder="Text"></primitive-input>
        <primitive-input type="email" placeholder="Email"></primitive-input>
        <primitive-input type="password" placeholder="Password"></primitive-input>
        <primitive-input type="number" placeholder="Number"></primitive-input>
        <primitive-input type="date"></primitive-input>
        <primitive-input type="search" placeholder="Search"></primitive-input>
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  render: () => ({
    props: {
      faSearch,
      faEye,
      faEnvelope,
      faLock,
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 300px;">
        <primitive-input [iconStart]="faSearch" placeholder="Rechercher..."></primitive-input>
        <primitive-input [iconStart]="faEnvelope" placeholder="Email"></primitive-input>
        <primitive-input [iconStart]="faLock" [iconEnd]="faEye" type="password" placeholder="Mot de passe"></primitive-input>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 300px;">
        <primitive-input [disabled]="true" placeholder="Désactivé"></primitive-input>
        <primitive-input [disabled]="true" value="Valeur désactivée"></primitive-input>
      </div>
    `,
  }),
};

export const Readonly: Story = {
  render: () => ({
    template: `
      <primitive-input [readonly]="true" value="Lecture seule"></primitive-input>
    `,
  }),
};
