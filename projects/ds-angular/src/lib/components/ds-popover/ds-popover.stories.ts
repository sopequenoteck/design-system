import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DsPopover } from './ds-popover.directive';
import { DsButton } from '../ds-button/ds-button';

const meta: Meta = {
  title: 'Overlays/DsPopover',
  decorators: [
    moduleMetadata({
      imports: [DsPopover, DsButton],
    }),
  ],
  argTypes: {
    dsPopover: {
      control: 'object',
      description: 'Template Angular contenant le contenu du popover.',
    },
    dsPopoverTrigger: {
      control: 'select',
      options: ['click', 'hover'],
      description: 'Mode de déclenchement : click (défaut) ou hover.',
    },
    dsPopoverPosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position du popover par rapport à l\'élément déclencheur.',
    },
    dsPopoverCloseOnBackdrop: {
      control: 'boolean',
      description: 'Ferme le popover au clic extérieur (défaut: true).',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Popover standard déclenché au clic. Contient un titre et un contenu personnalisable.',
      },
    },
  },
  render: () => ({
    template: `
      <ng-template #popoverContent>
        <div style="padding: 12px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); max-width: 250px;">
          <h4 style="margin: 0 0 8px;">Informations du projet</h4>
          <p style="margin: 0; color: #6b7280; font-size: 14px;">Dernière modification le 5 décembre 2025 par Jean Dupont.</p>
        </div>
      </ng-template>

      <ds-button [dsPopover]="popoverContent">Voir les détails</ds-button>
    `,
  }),
};

export const Positions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Les 4 positions disponibles pour le popover. Utile pour s\'adapter à la mise en page.',
      },
    },
  },
  render: () => ({
    template: `
      <ng-template #posContent>
        <div style="padding: 12px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          <p style="margin: 0; font-size: 14px;">Contenu du popover</p>
        </div>
      </ng-template>

      <div style="display: flex; gap: 24px; justify-content: center; padding: 100px 60px;">
        <ds-button [dsPopover]="posContent" dsPopoverPosition="top">Position Top</ds-button>
        <ds-button [dsPopover]="posContent" dsPopoverPosition="bottom">Position Bottom</ds-button>
        <ds-button [dsPopover]="posContent" dsPopoverPosition="left">Position Left</ds-button>
        <ds-button [dsPopover]="posContent" dsPopoverPosition="right">Position Right</ds-button>
      </div>
    `,
  }),
};

export const HoverTrigger: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Popover déclenché au survol (hover). Idéal pour des aperçus rapides sans clic.',
      },
    },
  },
  render: () => ({
    template: `
      <ng-template #hoverContent>
        <div style="padding: 12px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          <p style="margin: 0; font-size: 14px;">Aperçu du contenu au survol</p>
        </div>
      </ng-template>

      <ds-button [dsPopover]="hoverContent" dsPopoverTrigger="hover">Survolez-moi</ds-button>
    `,
  }),
};

export const UserMenu: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Menu utilisateur avec popover. Pattern classique pour les actions de compte dans une navbar.',
      },
    },
  },
  render: () => ({
    template: `
      <ng-template #userMenu>
        <div style="padding: 8px 0; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); min-width: 180px;">
          <button style="display: block; width: 100%; padding: 8px 16px; text-align: left; background: none; border: none; cursor: pointer; font-size: 14px;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='none'">Mon profil</button>
          <button style="display: block; width: 100%; padding: 8px 16px; text-align: left; background: none; border: none; cursor: pointer; font-size: 14px;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='none'">Paramètres</button>
          <button style="display: block; width: 100%; padding: 8px 16px; text-align: left; background: none; border: none; cursor: pointer; font-size: 14px;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='none'">Facturation</button>
          <hr style="margin: 8px 0; border: none; border-top: 1px solid #e5e7eb;">
          <button style="display: block; width: 100%; padding: 8px 16px; text-align: left; background: none; border: none; cursor: pointer; font-size: 14px; color: #ef4444;" onmouseover="this.style.background='#fef2f2'" onmouseout="this.style.background='none'">Déconnexion</button>
        </div>
      </ng-template>

      <ds-button [dsPopover]="userMenu" variant="secondary">Marie Martin</ds-button>
    `,
  }),
};

export const InfoPopover: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Popover d\'information contextuelle. Plus riche qu\'un tooltip, idéal pour des explications détaillées.',
      },
    },
  },
  render: () => ({
    template: `
      <ng-template #infoContent>
        <div style="padding: 16px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); max-width: 300px;">
          <h4 style="margin: 0 0 8px; display: flex; align-items: center; gap: 8px;">
            <span style="color: #3b82f6;">ℹ️</span> Format requis
          </h4>
          <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
            L'identifiant doit contenir entre 3 et 20 caractères alphanumériques.
            Les caractères spéciaux ne sont pas autorisés (sauf - et _).
          </p>
        </div>
      </ng-template>

      <div style="display: flex; align-items: center; gap: 8px;">
        <span>Identifiant utilisateur</span>
        <button [dsPopover]="infoContent" dsPopoverTrigger="hover" style="background: none; border: none; cursor: pointer; color: #6b7280; font-size: 16px;">ℹ️</button>
      </div>
    `,
  }),
};

export const ConfirmAction: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Popover de confirmation d\'action destructive. Alternative légère à une modal pour les confirmations simples.',
      },
    },
  },
  render: () => ({
    template: `
      <ng-template #confirmContent>
        <div style="padding: 16px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); max-width: 250px;">
          <p style="margin: 0 0 12px; font-weight: 500;">Supprimer ce fichier ?</p>
          <p style="margin: 0 0 16px; color: #6b7280; font-size: 14px;">Le fichier rapport-2025.pdf sera supprimé définitivement.</p>
          <div style="display: flex; gap: 8px; justify-content: flex-end;">
            <ds-button variant="ghost" size="sm">Annuler</ds-button>
            <ds-button variant="error" size="sm">Supprimer</ds-button>
          </div>
        </div>
      </ng-template>

      <ds-button variant="error" [dsPopover]="confirmContent">Supprimer</ds-button>
    `,
  }),
};

export const NoCloseOnBackdrop: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Popover persistant qui ne se ferme pas au clic extérieur. Utile pour les formulaires ou contenus interactifs.',
      },
    },
  },
  render: () => ({
    template: `
      <ng-template #persistentContent>
        <div style="padding: 12px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          <p style="margin: 0; font-size: 14px;">Ce popover reste ouvert au clic extérieur. Fermez-le avec Escape ou en recliquant le bouton.</p>
        </div>
      </ng-template>

      <ds-button [dsPopover]="persistentContent" [dsPopoverCloseOnBackdrop]="false">Popover persistant</ds-button>
    `,
  }),
};

export const Themed: Story = {
  render: () => ({
    template: `
      <ng-template #popoverContent>
        <div style="padding: 12px; background: var(--background-main); border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          <p style="margin: 0; font-size: 14px; color: var(--text-default);">Popover content</p>
        </div>
      </ng-template>

      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div class="theme-light" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Light</h4>
          <button [dsPopover]="popoverContent" popoverTitle="Info" style="padding: 8px 16px; background: var(--color-primary); color: white; border: none; border-radius: 6px; cursor: pointer;">Hover me</button>
        </div>
        <div class="theme-dark" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Dark</h4>
          <button [dsPopover]="popoverContent" popoverTitle="Info" style="padding: 8px 16px; background: var(--color-primary); color: white; border: none; border-radius: 6px; cursor: pointer;">Hover me</button>
        </div>
        <div class="theme-custom" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Custom</h4>
          <button [dsPopover]="popoverContent" popoverTitle="Info" style="padding: 8px 16px; background: var(--color-primary); color: white; border: none; border-radius: 6px; cursor: pointer;">Hover me</button>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Affiche le composant dans les 3 thèmes (Light, Dark, Custom) pour vérifier la thématisation.',
      },
    },
  },
};

export const Accessibility: Story = {
  render: () => ({
    template: `
      <ng-template #accessiblePopover>
        <div style="padding: 12px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          <p style="margin: 0; font-size: 14px;">Popover accessible avec contenu riche</p>
        </div>
      </ng-template>
      <ds-button [dsPopover]="accessiblePopover" dsPopoverTrigger="click">Cliquez-moi</ds-button>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
### Accessibilité clavier

| Touche | Action |
|--------|--------|
| Tab | Focus le trigger |
| Enter/Space | Ouvre le popover (trigger click) |
| Escape | Ferme le popover |

### Attributs ARIA
- \`role="tooltip"\` ou \`role="dialog"\`: Selon le contenu
- \`aria-describedby\`: Lie le popover au trigger
- \`aria-hidden\`: État fermé

### Bonnes pratiques
- Trigger click ou hover
- Positions configurables (top/bottom/left/right)
- closeOnBackdrop optionnel
        `,
      },
    },
  },
};
