import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DsModalComponent } from './ds-modal.component';
import { DsButton } from '../ds-button/ds-button';

const meta: Meta<DsModalComponent> = {
  title: 'Components/Modal',
  component: DsModalComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DsButton],
    }),
  ],
  argTypes: {
    title: {
      control: 'text',
      description: 'Titre de la modale',
    },
    type: {
      control: 'select',
      options: [null, 'success', 'warning', 'error', 'info'],
      description: 'Type sémantique',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille',
    },
    closable: {
      control: 'boolean',
      description: 'Bouton fermer visible',
    },
    closeOnBackdrop: {
      control: 'boolean',
      description: 'Fermer au clic sur le backdrop',
    },
    showIcon: {
      control: 'boolean',
      description: 'Afficher l\'icône',
    },
  },
};

export default meta;
type Story = StoryObj<DsModalComponent>;

export const Default: Story = {
  render: () => ({
    props: {
      isOpen: false,
    },
    template: `
      <ds-button (clicked)="isOpen = true">Ouvrir la modale</ds-button>
      <ds-modal [open]="isOpen" title="Titre de la modale" (closed)="isOpen = false">
        <p>Contenu de la modale. Vous pouvez y placer n'importe quel contenu.</p>
        <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: 16px;">
          <ds-button variant="ghost" (clicked)="isOpen = false">Annuler</ds-button>
          <ds-button (clicked)="isOpen = false">Confirmer</ds-button>
        </div>
      </ds-modal>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    props: {
      openSm: false,
      openMd: false,
      openLg: false,
    },
    template: `
      <div style="display: flex; gap: 8px;">
        <ds-button (clicked)="openSm = true">Small</ds-button>
        <ds-button (clicked)="openMd = true">Medium</ds-button>
        <ds-button (clicked)="openLg = true">Large</ds-button>
      </div>

      <ds-modal [open]="openSm" title="Modale Small" size="sm" (closed)="openSm = false">
        <p>Petite modale pour des messages courts.</p>
      </ds-modal>

      <ds-modal [open]="openMd" title="Modale Medium" size="md" (closed)="openMd = false">
        <p>Modale de taille moyenne, idéale pour la plupart des cas d'usage.</p>
      </ds-modal>

      <ds-modal [open]="openLg" title="Modale Large" size="lg" (closed)="openLg = false">
        <p>Grande modale pour du contenu plus complexe ou des formulaires.</p>
      </ds-modal>
    `,
  }),
};

export const Types: Story = {
  render: () => ({
    props: {
      openSuccess: false,
      openWarning: false,
      openError: false,
      openInfo: false,
    },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <ds-button variant="success" (clicked)="openSuccess = true">Success</ds-button>
        <ds-button variant="warning" (clicked)="openWarning = true">Warning</ds-button>
        <ds-button variant="error" (clicked)="openError = true">Error</ds-button>
        <ds-button variant="info" (clicked)="openInfo = true">Info</ds-button>
      </div>

      <ds-modal [open]="openSuccess" title="Succès !" type="success" [showIcon]="true" (closed)="openSuccess = false">
        <p>L'opération a été effectuée avec succès.</p>
      </ds-modal>

      <ds-modal [open]="openWarning" title="Attention" type="warning" [showIcon]="true" (closed)="openWarning = false">
        <p>Cette action peut avoir des conséquences importantes.</p>
      </ds-modal>

      <ds-modal [open]="openError" title="Erreur" type="error" [showIcon]="true" (closed)="openError = false">
        <p>Une erreur s'est produite. Veuillez réessayer.</p>
      </ds-modal>

      <ds-modal [open]="openInfo" title="Information" type="info" [showIcon]="true" (closed)="openInfo = false">
        <p>Voici une information importante à connaître.</p>
      </ds-modal>
    `,
  }),
};

export const ConfirmDialog: Story = {
  render: () => ({
    props: {
      isOpen: false,
    },
    template: `
      <ds-button variant="error" (clicked)="isOpen = true">Supprimer l'élément</ds-button>
      <ds-modal [open]="isOpen" title="Confirmer la suppression" type="warning" [showIcon]="true" size="sm" (closed)="isOpen = false">
        <p>Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.</p>
        <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: 16px;">
          <ds-button variant="ghost" (clicked)="isOpen = false">Annuler</ds-button>
          <ds-button variant="error" (clicked)="isOpen = false">Supprimer</ds-button>
        </div>
      </ds-modal>
    `,
  }),
};

export const NotClosable: Story = {
  render: () => ({
    props: {
      isOpen: false,
    },
    template: `
      <ds-button (clicked)="isOpen = true">Ouvrir</ds-button>
      <ds-modal [open]="isOpen" title="Action requise" [closable]="false" [closeOnBackdrop]="false">
        <p>Vous devez accepter les conditions pour continuer.</p>
        <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: 16px;">
          <ds-button (clicked)="isOpen = false">J'accepte</ds-button>
        </div>
      </ds-modal>
    `,
  }),
};

export const FormModal: Story = {
  args: {
    title: "bonjour",
    type: "success",
    size: "sm"
  },

  render: () => ({
    props: {
      isOpen: false,
    },
    template: `
      <ds-button (clicked)="isOpen = true">Créer un compte</ds-button>
      <ds-modal [open]="isOpen" title="Nouveau compte" size="md" (closed)="isOpen = false">
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 500;">Nom</label>
            <input type="text" placeholder="Votre nom" style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px;">
          </div>
          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 500;">Email</label>
            <input type="email" placeholder="email@exemple.com" style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px;">
          </div>
          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 500;">Mot de passe</label>
            <input type="password" placeholder="••••••••" style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px;">
          </div>
        </div>
        <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: 24px;">
          <ds-button variant="ghost" (clicked)="isOpen = false">Annuler</ds-button>
          <ds-button (clicked)="isOpen = false">Créer le compte</ds-button>
        </div>
      </ds-modal>
    `,
  })
};
