import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DsTooltip } from './ds-tooltip.directive';
import { DsButton } from '../ds-button/ds-button';

const meta: Meta = {
  title: 'Components/Overlays/DsTooltip',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DsTooltip, DsButton],
    }),
  ],
  argTypes: {
    dsTooltip: {
      control: 'text',
      description: 'Texte affiché dans le tooltip. Requis pour l\'accessibilité.',
    },
    dsTooltipPosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position du tooltip par rapport à l\'élément déclencheur.',
    },
    dsTooltipDelay: {
      control: 'number',
      description: 'Délai en millisecondes avant l\'affichage du tooltip (défaut: 200ms).',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tooltip standard affiché au survol d\'un bouton. Position par défaut : haut.',
      },
    },
  },
  render: () => ({
    template: `
      <ds-button dsTooltip="Cliquez pour créer un nouvel élément">Survolez-moi</ds-button>
    `,
  }),
};

export const Positions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Les 4 positions disponibles pour le tooltip : top (défaut), bottom, left, right.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; justify-content: center; padding: 60px;">
        <ds-button dsTooltip="Position haute" dsTooltipPosition="top">Top</ds-button>
        <ds-button dsTooltip="Position basse" dsTooltipPosition="bottom">Bottom</ds-button>
        <ds-button dsTooltip="Position gauche" dsTooltipPosition="left">Left</ds-button>
        <ds-button dsTooltip="Position droite" dsTooltipPosition="right">Right</ds-button>
      </div>
    `,
  }),
};

export const DelayVariations: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Contrôle du délai d\'apparition : instantané (0ms), standard (200ms), lent (500ms).',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px;">
        <ds-button dsTooltip="Apparition instantanée" [dsTooltipDelay]="0">Délai 0ms</ds-button>
        <ds-button dsTooltip="Délai standard" [dsTooltipDelay]="200">Délai 200ms</ds-button>
        <ds-button dsTooltip="Apparition lente" [dsTooltipDelay]="500">Délai 500ms</ds-button>
      </div>
    `,
  }),
};

export const OnText: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tooltip sur un terme textuel. Utile pour expliquer des termes techniques ou des abréviations.',
      },
    },
  },
  render: () => ({
    template: `
      <p>
        Survolez ce
        <span dsTooltip="Application Programming Interface - Interface de programmation" style="text-decoration: underline; cursor: help;">terme API</span>
        pour voir l'explication.
      </p>
    `,
  }),
};

export const OnIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tooltips sur des boutons icônes. Essentiel pour l\'accessibilité des interfaces icon-only.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px;">
        <button dsTooltip="Ouvrir les paramètres de l'application" style="background: none; border: none; cursor: pointer; font-size: 20px;">⚙️</button>
        <button dsTooltip="3 nouvelles notifications" style="background: none; border: none; cursor: pointer; font-size: 20px;">🔔</button>
        <button dsTooltip="Voir mon profil utilisateur" style="background: none; border: none; cursor: pointer; font-size: 20px;">👤</button>
        <button dsTooltip="Accéder au centre d'aide" style="background: none; border: none; cursor: pointer; font-size: 20px;">❓</button>
      </div>
    `,
  }),
};

export const LongText: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tooltip avec texte long. Le tooltip s\'adapte automatiquement avec une largeur maximale.',
      },
    },
  },
  render: () => ({
    template: `
      <ds-button dsTooltip="Cette action va exporter toutes vos données utilisateur au format CSV, incluant l'historique des 12 derniers mois.">
        Exporter les données
      </ds-button>
    `,
  }),
};

export const WithButtons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tooltips sur les variantes de boutons DS. Chaque action est clarifiée par son tooltip.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px;">
        <ds-button dsTooltip="Créer un nouveau document">Nouveau</ds-button>
        <ds-button variant="secondary" dsTooltip="Modifier le document sélectionné">Modifier</ds-button>
        <ds-button variant="error" dsTooltip="Supprimer définitivement (irréversible)">Supprimer</ds-button>
      </div>
    `,
  }),
};

export const DisabledButton: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tooltip sur un bouton désactivé. Le tooltip est placé sur un wrapper car les éléments désactivés ne reçoivent pas les événements.',
      },
    },
  },
  render: () => ({
    template: `
      <span dsTooltip="Vous devez être administrateur pour effectuer cette action">
        <ds-button [disabled]="true">Action restreinte</ds-button>
      </span>
    `,
  }),
};

export const FormHelp: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Icône d\'aide avec tooltip dans un formulaire. Pattern courant pour expliquer les règles de saisie.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="max-width: 300px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <label style="font-weight: 500;">Email professionnel</label>
          <span dsTooltip="Utilisé uniquement pour la récupération de mot de passe et les alertes de sécurité" style="cursor: help; color: #6b7280;">ℹ️</span>
        </div>
        <input type="email" placeholder="prenom.nom@entreprise.com" style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px;">
      </div>
    `,
  }),
};

export const Toolbar: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Barre d\'outils d\'éditeur avec tooltips et raccourcis clavier. Les tooltips incluent les shortcuts pour une meilleure UX.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: 4px; padding: 8px; background: #f3f4f6; border-radius: 8px; width: fit-content;">
        <button dsTooltip="Gras (Ctrl+B)" style="padding: 8px; background: white; border: 1px solid #e5e7eb; border-radius: 4px; cursor: pointer; font-weight: bold;">B</button>
        <button dsTooltip="Italique (Ctrl+I)" style="padding: 8px; background: white; border: 1px solid #e5e7eb; border-radius: 4px; cursor: pointer; font-style: italic;">I</button>
        <button dsTooltip="Souligné (Ctrl+U)" style="padding: 8px; background: white; border: 1px solid #e5e7eb; border-radius: 4px; cursor: pointer; text-decoration: underline;">U</button>
        <div style="width: 1px; background: #e5e7eb; margin: 0 4px;"></div>
        <button dsTooltip="Aligner à gauche (Ctrl+Shift+L)" style="padding: 8px; background: white; border: 1px solid #e5e7eb; border-radius: 4px; cursor: pointer;">⬅️</button>
        <button dsTooltip="Centrer (Ctrl+Shift+E)" style="padding: 8px; background: white; border: 1px solid #e5e7eb; border-radius: 4px; cursor: pointer;">↔️</button>
        <button dsTooltip="Aligner à droite (Ctrl+Shift+R)" style="padding: 8px; background: white; border: 1px solid #e5e7eb; border-radius: 4px; cursor: pointer;">➡️</button>
      </div>
    `,
  }),
};
