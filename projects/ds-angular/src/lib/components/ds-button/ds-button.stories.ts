import type { Meta, StoryObj } from '@storybook/angular';
import { DsButton } from './ds-button';
import { faPlus, faCheck, faArrowRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import {
  buildButtonArgTypes,
  buildButtonArgs,
  createVariantRender,
  createSizeRender,
} from '../../utils/storybook-controls';

const meta: Meta<DsButton> = {
  title: 'Components/Button',
  component: DsButton,
  tags: ['autodocs'],
  argTypes: buildButtonArgTypes(),
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
  args: buildButtonArgs(),
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
  args: buildButtonArgs(),
  render: createVariantRender('ds-button', {
    variant: 'variant',
    appearance: 'appearance',
    size: 'size',
    disabled: 'disabled',
    loading: 'loading',
    block: 'block',
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
  args: { ...buildButtonArgs(), loading: true },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
        <ds-button [loading]="loading" [variant]="variant" [appearance]="appearance" [size]="size">Chargement...</ds-button>
        <ds-button [loading]="loading" variant="secondary" [size]="size">Chargement secondaire</ds-button>
        <ds-button [loading]="loading" appearance="outline" [size]="size">Chargement outline</ds-button>
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
  args: buildButtonArgs(),
  render: createSizeRender('ds-button', {
    variant: 'variant',
    appearance: 'appearance',
    size: 'size',
    disabled: 'disabled',
    loading: 'loading',
    block: 'block',
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
  args: { ...buildButtonArgs(), block: true },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 300px;">
        <ds-button [block]="block" [variant]="variant" [appearance]="appearance" [size]="size">Bouton pleine largeur</ds-button>
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

export const OutlineVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Toutes les variantes en mode outline (apparence avec bordure uniquement).',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <ds-button appearance="outline" variant="primary">Primary Outline</ds-button>
        <ds-button appearance="outline" variant="secondary">Secondary Outline</ds-button>
        <ds-button appearance="outline" variant="success">Success Outline</ds-button>
        <ds-button appearance="outline" variant="warning">Warning Outline</ds-button>
        <ds-button appearance="outline" variant="error">Error Outline</ds-button>
        <ds-button appearance="outline" variant="info">Info Outline</ds-button>
        <ds-button appearance="outline" variant="ghost">Ghost Outline</ds-button>
      </div>
    `,
  }),
};

export const IconOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Boutons avec icônes uniquement (sans texte). Utilisez aria-label pour l\'accessibilité.',
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
        <ds-button [iconStart]="faPlus" aria-label="Ajouter"></ds-button>
        <ds-button [iconStart]="faCheck" variant="success" aria-label="Valider"></ds-button>
        <ds-button [iconStart]="faArrowRight" variant="secondary" aria-label="Suivant"></ds-button>
        <ds-button [iconStart]="faPlus" size="sm" aria-label="Ajouter (petit)"></ds-button>
        <ds-button [iconStart]="faPlus" size="lg" aria-label="Ajouter (grand)"></ds-button>
      </div>
    `,
  }),
};

export const ButtonGroups: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Groupes de boutons côte à côte pour créer des toolbars ou des contrôles multiples.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <!-- Groupe de boutons basique -->
        <div style="display: flex; gap: 0;">
          <ds-button variant="secondary" style="border-radius: 4px 0 0 4px;">Annuler</ds-button>
          <ds-button variant="primary" style="border-radius: 0 4px 4px 0; margin-left: -1px;">Valider</ds-button>
        </div>

        <!-- Groupe de 3 boutons -->
        <div style="display: flex; gap: 0;">
          <ds-button variant="ghost" size="sm" style="border-radius: 4px 0 0 4px;">Précédent</ds-button>
          <ds-button variant="ghost" size="sm" style="border-radius: 0; margin-left: -1px;">Pause</ds-button>
          <ds-button variant="ghost" size="sm" style="border-radius: 0 4px 4px 0; margin-left: -1px;">Suivant</ds-button>
        </div>

        <!-- Groupe avec outline -->
        <div style="display: flex; gap: 0;">
          <ds-button appearance="outline" size="sm" style="border-radius: 4px 0 0 4px;">Jour</ds-button>
          <ds-button appearance="outline" size="sm" style="border-radius: 0; margin-left: -1px;">Semaine</ds-button>
          <ds-button appearance="outline" size="sm" style="border-radius: 0 4px 4px 0; margin-left: -1px;">Mois</ds-button>
        </div>
      </div>
    `,
  }),
};

export const SubmitButton: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Bouton de type submit dans un formulaire. Le type est automatiquement "submit" quand l\'attribut submit est true.',
      },
    },
  },
  render: () => ({
    template: `
      <form (ngSubmit)="console.log('Formulaire soumis')" style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <input type="text" placeholder="Nom" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;" required />
        <input type="email" placeholder="Email" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;" required />

        <div style="display: flex; gap: 8px; justify-content: flex-end;">
          <ds-button variant="ghost" type="button">Annuler</ds-button>
          <ds-button variant="primary" [submit]="true">Soumettre</ds-button>
        </div>
      </form>
    `,
  }),
};

export const DisabledStates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'États désactivés pour toutes les variantes. Les boutons désactivés ne sont pas cliquables et sont visuellement atténués.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <ds-button variant="primary" [disabled]="true">Primary Disabled</ds-button>
        <ds-button variant="secondary" [disabled]="true">Secondary Disabled</ds-button>
        <ds-button variant="success" [disabled]="true">Success Disabled</ds-button>
        <ds-button variant="warning" [disabled]="true">Warning Disabled</ds-button>
        <ds-button variant="error" [disabled]="true">Error Disabled</ds-button>
        <ds-button variant="info" [disabled]="true">Info Disabled</ds-button>
        <ds-button variant="ghost" [disabled]="true">Ghost Disabled</ds-button>
        <ds-button appearance="outline" [disabled]="true">Outline Disabled</ds-button>
      </div>
    `,
  }),
};

export const LoadingStates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'États de chargement pour différentes variantes et tailles. Le spinner s\'adapte automatiquement à la taille du bouton.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <!-- Variantes -->
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <ds-button variant="primary" [loading]="true">Chargement Primary</ds-button>
          <ds-button variant="secondary" [loading]="true">Chargement Secondary</ds-button>
          <ds-button variant="success" [loading]="true">Chargement Success</ds-button>
          <ds-button appearance="outline" [loading]="true">Chargement Outline</ds-button>
        </div>

        <!-- Tailles -->
        <div style="display: flex; gap: 8px; align-items: center;">
          <ds-button size="sm" [loading]="true">Small</ds-button>
          <ds-button size="md" [loading]="true">Medium</ds-button>
          <ds-button size="lg" [loading]="true">Large</ds-button>
        </div>
      </div>
    `,
  }),
};

export const IconPositions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Positions des icônes : à gauche (iconStart), à droite (iconEnd), ou les deux.',
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
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <ds-button [iconStart]="faPlus">Icône gauche</ds-button>
        <ds-button [iconEnd]="faArrowRight">Icône droite</ds-button>
        <ds-button [iconStart]="faCheck" [iconEnd]="faArrowRight">Les deux</ds-button>
        <ds-button [iconStart]="faPlus" size="sm">Small gauche</ds-button>
        <ds-button [iconEnd]="faArrowRight" size="lg">Large droite</ds-button>
      </div>
    `,
  }),
};
