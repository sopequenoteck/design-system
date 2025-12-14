import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DsPopover } from './ds-popover.directive';
import { DsPopoverComponent } from './ds-popover.component';
import { DsButton } from '../ds-button/ds-button';

const meta: Meta = {
  title: 'Overlays/Popover',
  decorators: [
    moduleMetadata({
      imports: [DsPopover, DsPopoverComponent, DsButton],
    }),
  ],
  argTypes: {
    header: {
      control: 'text',
      description: 'Titre du popover (affiche un header)',
    },
    footer: {
      control: 'text',
      description: 'Texte du footer',
    },
    closeable: {
      control: 'boolean',
      description: 'Affiche le bouton de fermeture (dans le header)',
    },
    ariaLabel: {
      control: 'text',
      description: 'Label ARIA (utilisé quand pas de header)',
    },
    dsPopoverTrigger: {
      control: 'select',
      options: ['click', 'hover'],
      description: 'Mode de déclenchement : click (défaut) ou hover.',
    },
    dsPopoverCloseOnBackdrop: {
      control: 'boolean',
      description: 'Ferme le popover au clic extérieur (défaut: true).',
    },
  },
};

export default meta;
type Story = StoryObj;

// ============================================
// STORIES DE BASE
// ============================================

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Popover standard avec header et bouton de fermeture. Déclenché au clic.',
      },
    },
  },
  render: () => ({
    template: `
      <ng-template #popoverContent>
        <ds-popover header="Informations du projet" [closeable]="true">
          <p style="margin: 0; color: var(--text-muted); font-size: 14px;">
            Dernière modification le 5 décembre 2025 par Jean Dupont.
          </p>
        </ds-popover>
      </ng-template>

      <ds-button [dsPopover]="popoverContent">Voir les détails</ds-button>
    `,
  }),
};

export const WithoutHeader: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Popover sans header, avec aria-label personnalisé pour l\'accessibilité.',
      },
    },
  },
  render: () => ({
    template: `
      <ng-template #simpleContent>
        <ds-popover ariaLabel="Information rapide">
          <p style="margin: 0; font-size: 14px;">
            Contenu simple sans header ni footer.
          </p>
        </ds-popover>
      </ng-template>

      <ds-button [dsPopover]="simpleContent" variant="secondary">Info rapide</ds-button>
    `,
  }),
};

export const WithFooter: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Popover avec header et footer pour des actions ou informations complémentaires.',
      },
    },
  },
  render: () => ({
    template: `
      <ng-template #footerContent>
        <ds-popover header="Notification" footer="Dernière mise à jour: il y a 5 min">
          <p style="margin: 0; font-size: 14px;">
            Vous avez 3 nouveaux messages non lus.
          </p>
        </ds-popover>
      </ng-template>

      <ds-button [dsPopover]="footerContent">Messages</ds-button>
    `,
  }),
};

// ============================================
// TRIGGERS
// ============================================

export const HoverTrigger: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Popover déclenché au survol (hover). Idéal pour des aperçus rapides.',
      },
    },
  },
  render: () => ({
    template: `
      <ng-template #hoverContent>
        <ds-popover ariaLabel="Aperçu">
          <p style="margin: 0; font-size: 14px;">Aperçu du contenu au survol</p>
        </ds-popover>
      </ng-template>

      <ds-button [dsPopover]="hoverContent" dsPopoverTrigger="hover">Survolez-moi</ds-button>
    `,
  }),
};

export const NoCloseOnBackdrop: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Popover persistant qui ne se ferme pas au clic extérieur. Utile pour les formulaires.',
      },
    },
  },
  render: () => ({
    template: `
      <ng-template #persistentContent>
        <ds-popover header="Formulaire" [closeable]="true">
          <p style="margin: 0; font-size: 14px;">
            Ce popover reste ouvert au clic extérieur.<br>
            Fermez-le avec Escape ou le bouton ×.
          </p>
        </ds-popover>
      </ng-template>

      <ds-button [dsPopover]="persistentContent" [dsPopoverCloseOnBackdrop]="false">
        Popover persistant
      </ds-button>
    `,
  }),
};

// ============================================
// CAS D'USAGE
// ============================================

export const UserMenu: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Menu utilisateur avec popover. Pattern classique pour les actions de compte.',
      },
    },
  },
  render: () => ({
    template: `
      <ng-template #userMenu>
        <ds-popover header="Marie Martin" ariaLabel="Menu utilisateur">
          <div style="display: flex; flex-direction: column; gap: 4px; min-width: 160px;">
            <button class="menu-item">Mon profil</button>
            <button class="menu-item">Paramètres</button>
            <button class="menu-item">Facturation</button>
            <hr style="margin: 8px 0; border: none; border-top: 1px solid var(--border-default);">
            <button class="menu-item menu-item--danger">Déconnexion</button>
          </div>
        </ds-popover>
      </ng-template>

      <style>
        .menu-item {
          display: block;
          width: 100%;
          padding: 8px 12px;
          text-align: left;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          border-radius: 4px;
          color: var(--text-default);
        }
        .menu-item:hover {
          background: var(--surface-hover);
        }
        .menu-item--danger {
          color: var(--error);
        }
        .menu-item--danger:hover {
          background: var(--error-surface);
        }
      </style>

      <ds-button [dsPopover]="userMenu" variant="secondary">Marie Martin</ds-button>
    `,
  }),
};

export const InfoPopover: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Popover d\'information contextuelle. Plus riche qu\'un tooltip.',
      },
    },
  },
  render: () => ({
    template: `
      <ng-template #infoContent>
        <ds-popover header="Format requis" ariaLabel="Information sur le format">
          <p style="margin: 0; color: var(--text-muted); font-size: 14px; line-height: 1.5;">
            L'identifiant doit contenir entre 3 et 20 caractères alphanumériques.
            Les caractères spéciaux ne sont pas autorisés (sauf - et _).
          </p>
        </ds-popover>
      </ng-template>

      <div style="display: flex; align-items: center; gap: 8px;">
        <span>Identifiant utilisateur</span>
        <button
          [dsPopover]="infoContent"
          dsPopoverTrigger="hover"
          style="background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: 16px;">
          ℹ️
        </button>
      </div>
    `,
  }),
};

export const ConfirmAction: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Popover de confirmation d\'action destructive. Alternative légère à une modal.',
      },
    },
  },
  render: () => ({
    template: `
      <ng-template #confirmContent>
        <ds-popover header="Supprimer ce fichier ?" [closeable]="false">
          <p style="margin: 0 0 16px; color: var(--text-muted); font-size: 14px;">
            Le fichier rapport-2025.pdf sera supprimé définitivement.
          </p>
          <div style="display: flex; gap: 8px; justify-content: flex-end;">
            <ds-button variant="ghost" size="sm">Annuler</ds-button>
            <ds-button variant="error" size="sm">Supprimer</ds-button>
          </div>
        </ds-popover>
      </ng-template>

      <ds-button variant="error" [dsPopover]="confirmContent">Supprimer</ds-button>
    `,
  }),
};

export const SettingsPanel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Panneau de paramètres rapides dans un popover.',
      },
    },
  },
  render: () => ({
    template: `
      <ng-template #settingsContent>
        <ds-popover header="Paramètres rapides" footer="Appliquer automatiquement">
          <div style="display: flex; flex-direction: column; gap: 12px; min-width: 200px;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input type="checkbox" checked> Notifications
            </label>
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input type="checkbox"> Mode sombre
            </label>
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input type="checkbox" checked> Sauvegarde auto
            </label>
          </div>
        </ds-popover>
      </ng-template>

      <ds-button [dsPopover]="settingsContent" [dsPopoverCloseOnBackdrop]="false">
        ⚙️ Paramètres
      </ds-button>
    `,
  }),
};

// ============================================
// THÈMES
// ============================================

export const Themed: Story = {
  render: () => ({
    template: `
      <ng-template #popoverContent>
        <ds-popover header="Popover thématisé">
          <p style="margin: 0; font-size: 14px;">
            Contenu adapté au thème actif.
          </p>
        </ds-popover>
      </ng-template>

      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div class="theme-light" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Light</h4>
          <ds-button [dsPopover]="popoverContent">Ouvrir</ds-button>
        </div>
        <div class="theme-dark" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Dark</h4>
          <ds-button [dsPopover]="popoverContent">Ouvrir</ds-button>
        </div>
        <div class="theme-custom" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Custom</h4>
          <ds-button [dsPopover]="popoverContent">Ouvrir</ds-button>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Le composant s\'adapte automatiquement aux tokens du thème actif.',
      },
    },
  },
};

// ============================================
// ACCESSIBILITÉ
// ============================================

export const Accessibility: Story = {
  render: () => ({
    template: `
      <ng-template #accessiblePopover>
        <ds-popover header="Informations accessibles" [closeable]="true">
          <p style="margin: 0; font-size: 14px;">
            Ce popover utilise les bonnes pratiques d'accessibilité :
          </p>
          <ul style="margin: 8px 0 0; padding-left: 20px; font-size: 13px; color: var(--text-muted);">
            <li>role="dialog" avec aria-modal</li>
            <li>aria-labelledby vers le header</li>
            <li>Fermeture via Escape</li>
            <li>Bouton close avec label descriptif</li>
          </ul>
        </ds-popover>
      </ng-template>

      <ds-button [dsPopover]="accessiblePopover">Popover accessible</ds-button>
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
- \`role="dialog"\` avec \`aria-modal="true"\`
- \`aria-labelledby\` pointe vers le header (quand présent)
- \`aria-label\` utilisé si pas de header
- Bouton close avec label dynamique "Fermer {header}"

### Bonnes pratiques
- Toujours fournir un header ou ariaLabel pour identifier le popover
- Utiliser closeable pour permettre la fermeture explicite
- Préférer trigger="click" pour le contenu interactif
        `,
      },
    },
  },
};

// ============================================
// MATRICES VISUELLES
// ============================================

export const MatrixCloseable: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Matrice montrant les variantes closeable true/false avec/sans header.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; max-width: 600px;">
        <!-- Header + Closeable -->
        <div>
          <p style="margin: 0 0 8px; font-size: 12px; color: var(--text-muted);">header + closeable=true</p>
          <ng-template #p1>
            <ds-popover header="Titre" [closeable]="true">
              <p style="margin: 0;">Contenu</p>
            </ds-popover>
          </ng-template>
          <ds-button [dsPopover]="p1" size="sm">Ouvrir</ds-button>
        </div>

        <!-- Header + Not Closeable -->
        <div>
          <p style="margin: 0 0 8px; font-size: 12px; color: var(--text-muted);">header + closeable=false</p>
          <ng-template #p2>
            <ds-popover header="Titre" [closeable]="false">
              <p style="margin: 0;">Contenu</p>
            </ds-popover>
          </ng-template>
          <ds-button [dsPopover]="p2" size="sm">Ouvrir</ds-button>
        </div>

        <!-- No Header -->
        <div>
          <p style="margin: 0 0 8px; font-size: 12px; color: var(--text-muted);">sans header</p>
          <ng-template #p3>
            <ds-popover ariaLabel="Popover simple">
              <p style="margin: 0;">Contenu seul</p>
            </ds-popover>
          </ng-template>
          <ds-button [dsPopover]="p3" size="sm">Ouvrir</ds-button>
        </div>

        <!-- Header + Footer -->
        <div>
          <p style="margin: 0 0 8px; font-size: 12px; color: var(--text-muted);">header + footer</p>
          <ng-template #p4>
            <ds-popover header="Titre" footer="Footer text">
              <p style="margin: 0;">Contenu</p>
            </ds-popover>
          </ng-template>
          <ds-button [dsPopover]="p4" size="sm">Ouvrir</ds-button>
        </div>
      </div>
    `,
  }),
};

export const MatrixTriggers: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Matrice comparant les différents modes de déclenchement.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; flex-wrap: wrap;">
        <!-- Click trigger -->
        <div>
          <p style="margin: 0 0 8px; font-size: 12px; color: var(--text-muted);">trigger="click" (défaut)</p>
          <ng-template #clickPop>
            <ds-popover header="Clic">
              <p style="margin: 0;">Ouvert au clic</p>
            </ds-popover>
          </ng-template>
          <ds-button [dsPopover]="clickPop">Cliquer</ds-button>
        </div>

        <!-- Hover trigger -->
        <div>
          <p style="margin: 0 0 8px; font-size: 12px; color: var(--text-muted);">trigger="hover"</p>
          <ng-template #hoverPop>
            <ds-popover header="Survol">
              <p style="margin: 0;">Ouvert au survol</p>
            </ds-popover>
          </ng-template>
          <ds-button [dsPopover]="hoverPop" dsPopoverTrigger="hover">Survoler</ds-button>
        </div>

        <!-- Click + no backdrop close -->
        <div>
          <p style="margin: 0 0 8px; font-size: 12px; color: var(--text-muted);">closeOnBackdrop=false</p>
          <ng-template #persistPop>
            <ds-popover header="Persistant" [closeable]="true">
              <p style="margin: 0;">Ne se ferme pas au clic extérieur</p>
            </ds-popover>
          </ng-template>
          <ds-button [dsPopover]="persistPop" [dsPopoverCloseOnBackdrop]="false">Persistant</ds-button>
        </div>
      </div>
    `,
  }),
};
