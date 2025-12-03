import type { Meta, StoryObj } from '@storybook/angular';
import { PrimitiveButton, ButtonVariant, ButtonSize, ButtonAppearance } from './primitive-button';
import { faPlus, faCheck, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<PrimitiveButton> = {
  title: 'Primitives/Button',
  component: PrimitiveButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'success', 'warning', 'error', 'info'] as ButtonVariant[],
      description: 'Variante visuelle du bouton',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] as ButtonSize[],
      description: 'Taille du bouton',
    },
    appearance: {
      control: 'select',
      options: ['solid', 'outline'] as ButtonAppearance[],
      description: 'Apparence du bouton',
    },
    disabled: {
      control: 'boolean',
      description: 'État désactivé',
    },
    block: {
      control: 'boolean',
      description: 'Bouton pleine largeur',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Type HTML du bouton',
    },
  },
};

export default meta;
type Story = StoryObj<PrimitiveButton>;

export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    appearance: 'solid',
    disabled: false,
    block: false,
  },
  render: (args) => ({
    props: args,
    template: `<primitive-button [variant]="variant" [size]="size" [appearance]="appearance" [disabled]="disabled" [block]="block">Bouton</primitive-button>`,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <primitive-button variant="primary">Primary</primitive-button>
        <primitive-button variant="secondary">Secondary</primitive-button>
        <primitive-button variant="ghost">Ghost</primitive-button>
        <primitive-button variant="success">Success</primitive-button>
        <primitive-button variant="warning">Warning</primitive-button>
        <primitive-button variant="error">Error</primitive-button>
        <primitive-button variant="info">Info</primitive-button>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <primitive-button size="sm">Small</primitive-button>
        <primitive-button size="md">Medium</primitive-button>
        <primitive-button size="lg">Large</primitive-button>
      </div>
    `,
  }),
};

export const OutlineVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <primitive-button variant="primary" appearance="outline">Primary</primitive-button>
        <primitive-button variant="secondary" appearance="outline">Secondary</primitive-button>
        <primitive-button variant="success" appearance="outline">Success</primitive-button>
        <primitive-button variant="warning" appearance="outline">Warning</primitive-button>
        <primitive-button variant="error" appearance="outline">Error</primitive-button>
        <primitive-button variant="info" appearance="outline">Info</primitive-button>
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  render: () => ({
    props: {
      faPlus,
      faCheck,
      faArrowRight,
    },
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <primitive-button [iconStart]="faPlus">Ajouter</primitive-button>
        <primitive-button [iconEnd]="faArrowRight">Suivant</primitive-button>
        <primitive-button [iconStart]="faCheck" [iconEnd]="faArrowRight">Valider</primitive-button>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <primitive-button [disabled]="true">Désactivé</primitive-button>
        <primitive-button variant="secondary" [disabled]="true">Désactivé</primitive-button>
        <primitive-button appearance="outline" [disabled]="true">Désactivé</primitive-button>
      </div>
    `,
  }),
};

export const Block: Story = {
  render: () => ({
    template: `
      <div style="width: 300px;">
        <primitive-button [block]="true">Bouton pleine largeur</primitive-button>
      </div>
    `,
  }),
};
