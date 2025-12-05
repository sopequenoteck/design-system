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
  parameters: {
    docs: {
      description: {
        story: 'Bouton par défaut avec toutes les options configurables via les controls.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: 'Toutes les variantes disponibles : primary, secondary, ghost et les variantes sémantiques (success, warning, error, info).',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: 'État de chargement avec spinner. Le bouton est automatiquement désactivé pendant le chargement.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: 'Boutons avec icônes FontAwesome. Utilisez iconStart pour une icône à gauche, iconEnd pour une icône à droite.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: 'Trois tailles disponibles : sm (32px), md (40px) et lg (48px).',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: 'Bouton en mode block : occupe 100% de la largeur du conteneur parent.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="width: 300px;">
        <ds-button [block]="true">Bouton pleine largeur</ds-button>
      </div>
    `,
  }),
};

export const Accessibility: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Démonstration des fonctionnalités d\'accessibilité : focus visible, navigation clavier (Tab/Enter/Space), états désactivés.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <p style="margin: 0; color: #6b7280; font-size: 14px;">
          Utilisez Tab pour naviguer, Enter ou Space pour activer.
        </p>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <ds-button>Focus visible</ds-button>
          <ds-button variant="secondary">Deuxième</ds-button>
          <ds-button variant="ghost">Troisième</ds-button>
          <ds-button [disabled]="true">Désactivé (ignoré)</ds-button>
          <ds-button variant="success">Dernier</ds-button>
        </div>
        <p style="margin: 0; color: #6b7280; font-size: 12px;">
          Les boutons désactivés sont exclus de la navigation clavier.
        </p>
      </div>
    `,
  }),
};
