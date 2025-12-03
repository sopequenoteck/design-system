import type { Meta, StoryObj } from '@storybook/angular';
import { DsButton } from './ds-button';
import { faPlus, faCheck, faArrowRight, faSpinner } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<DsButton> = {
  title: 'Components/Button',
  component: DsButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'success', 'warning', 'error', 'info'],
      description: 'Variante visuelle',
    },
    appearance: {
      control: 'select',
      options: ['solid', 'outline'],
      description: 'Apparence',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille',
    },
    disabled: {
      control: 'boolean',
      description: 'Désactivé',
    },
    loading: {
      control: 'boolean',
      description: 'En chargement',
    },
    block: {
      control: 'boolean',
      description: 'Pleine largeur',
    },
  },
};

export default meta;
type Story = StoryObj<DsButton>;

export const Default: Story = {
  args: {
    variant: 'primary',
    appearance: 'solid',
    size: 'md',
    disabled: false,
    loading: false,
    block: false,
  },
  render: (args) => ({
    props: args,
    template: `<ds-button [variant]="variant" [appearance]="appearance" [size]="size" [disabled]="disabled" [loading]="loading" [block]="block">Bouton</ds-button>`,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <ds-button variant="primary">Primary</ds-button>
        <ds-button variant="secondary">Secondary</ds-button>
        <ds-button variant="ghost">Ghost</ds-button>
        <ds-button variant="success">Success</ds-button>
        <ds-button variant="warning">Warning</ds-button>
        <ds-button variant="error">Error</ds-button>
        <ds-button variant="info">Info</ds-button>
      </div>
    `,
  }),
};

export const Loading: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <ds-button [loading]="true">Chargement...</ds-button>
        <ds-button variant="secondary" [loading]="true">Chargement...</ds-button>
        <ds-button appearance="outline" [loading]="true">Chargement...</ds-button>
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
        <ds-button [iconStart]="faPlus">Ajouter</ds-button>
        <ds-button [iconEnd]="faArrowRight">Suivant</ds-button>
        <ds-button [iconStart]="faCheck" variant="success">Valider</ds-button>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <ds-button size="sm">Small</ds-button>
        <ds-button size="md">Medium</ds-button>
        <ds-button size="lg">Large</ds-button>
      </div>
    `,
  }),
};

export const Block: Story = {
  render: () => ({
    template: `
      <div style="width: 300px;">
        <ds-button [block]="true">Bouton pleine largeur</ds-button>
      </div>
    `,
  }),
};
