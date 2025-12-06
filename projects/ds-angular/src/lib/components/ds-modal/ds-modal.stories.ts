import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DsModalComponent } from './ds-modal.component';
import { DsButton } from '../ds-button/ds-button';

const meta: Meta<DsModalComponent> = {
  title: 'Components/Overlays/DsModal',
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
  parameters: {
    docs: {
      description: {
        story: 'Modale contenant un formulaire complet. Idéale pour la création ou modification d\'entités.',
      },
    },
  },
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

export const SuccessWithIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Modale de type success avec icône. Utilisée pour confirmer le succès d\'une opération.',
      },
    },
  },
  render: () => ({
    props: {
      isOpen: false,
    },
    template: `
      <ds-button variant="success" (clicked)="isOpen = true">Afficher succès</ds-button>
      <ds-modal [open]="isOpen" title="Opération réussie" type="success" [showIcon]="true" size="sm" (closed)="isOpen = false">
        <p>Votre compte a été créé avec succès. Un email de confirmation vous a été envoyé.</p>
        <div style="display: flex; justify-content: flex-end; margin-top: 16px;">
          <ds-button variant="success" (clicked)="isOpen = false">Continuer</ds-button>
        </div>
      </ds-modal>
    `,
  }),
};

export const ErrorWithIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Modale de type error avec icône. Affiche un message d\'erreur critique.',
      },
    },
  },
  render: () => ({
    props: {
      isOpen: false,
    },
    template: `
      <ds-button variant="error" (clicked)="isOpen = true">Afficher erreur</ds-button>
      <ds-modal [open]="isOpen" title="Échec de l'opération" type="error" [showIcon]="true" size="sm" (closed)="isOpen = false">
        <p>Une erreur s'est produite lors de la connexion au serveur. Veuillez réessayer dans quelques instants.</p>
        <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: 16px;">
          <ds-button variant="ghost" (clicked)="isOpen = false">Fermer</ds-button>
          <ds-button variant="error" (clicked)="isOpen = false">Réessayer</ds-button>
        </div>
      </ds-modal>
    `,
  }),
};

export const WarningWithIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Modale de type warning avec icône. Avertit l\'utilisateur avant une action potentiellement dangereuse.',
      },
    },
  },
  render: () => ({
    props: {
      isOpen: false,
    },
    template: `
      <ds-button variant="warning" (clicked)="isOpen = true">Afficher avertissement</ds-button>
      <ds-modal [open]="isOpen" title="Attention requise" type="warning" [showIcon]="true" size="md" (closed)="isOpen = false">
        <p>Les modifications non enregistrées seront perdues si vous quittez cette page maintenant.</p>
        <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: 16px;">
          <ds-button variant="ghost" (clicked)="isOpen = false">Rester sur la page</ds-button>
          <ds-button variant="warning" (clicked)="isOpen = false">Quitter sans enregistrer</ds-button>
        </div>
      </ds-modal>
    `,
  }),
};

export const InfoWithIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Modale de type info avec icône. Présente des informations importantes à l\'utilisateur.',
      },
    },
  },
  render: () => ({
    props: {
      isOpen: false,
    },
    template: `
      <ds-button variant="info" (clicked)="isOpen = true">Afficher info</ds-button>
      <ds-modal [open]="isOpen" title="Mise à jour disponible" type="info" [showIcon]="true" size="md" (closed)="isOpen = false">
        <p>Une nouvelle version de l'application est disponible. Elle inclut des améliorations de performance et de nouvelles fonctionnalités.</p>
        <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: 16px;">
          <ds-button variant="ghost" (clicked)="isOpen = false">Plus tard</ds-button>
          <ds-button variant="info" (clicked)="isOpen = false">Mettre à jour maintenant</ds-button>
        </div>
      </ds-modal>
    `,
  }),
};

export const WithoutIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Modales de différents types sans icône. L\'icône peut être masquée en définissant showIcon à false.',
      },
    },
  },
  render: () => ({
    props: {
      openSuccess: false,
      openWarning: false,
    },
    template: `
      <div style="display: flex; gap: 8px;">
        <ds-button variant="success" (clicked)="openSuccess = true">Success sans icône</ds-button>
        <ds-button variant="warning" (clicked)="openWarning = true">Warning sans icône</ds-button>
      </div>

      <ds-modal [open]="openSuccess" title="Succès" type="success" [showIcon]="false" (closed)="openSuccess = false">
        <p>Opération effectuée sans afficher l'icône de succès.</p>
      </ds-modal>

      <ds-modal [open]="openWarning" title="Attention" type="warning" [showIcon]="false" (closed)="openWarning = false">
        <p>Message d'avertissement sans icône visuelle.</p>
      </ds-modal>
    `,
  }),
};

export const ScrollableContent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Modale avec contenu scrollable. Lorsque le contenu dépasse la hauteur maximale, un scroll vertical apparaît automatiquement.',
      },
    },
  },
  render: () => ({
    props: {
      isOpen: false,
    },
    template: `
      <ds-button (clicked)="isOpen = true">Ouvrir contenu long</ds-button>
      <ds-modal [open]="isOpen" title="Conditions générales d'utilisation" size="lg" (closed)="isOpen = false">
        <div style="line-height: 1.6;">
          <h3 style="margin-top: 0;">1. Acceptation des conditions</h3>
          <p>En accédant et en utilisant ce service, vous acceptez d'être lié par ces conditions générales d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce service.</p>

          <h3>2. Description du service</h3>
          <p>Notre plateforme offre des services de gestion de projets, de collaboration en équipe et de suivi des tâches. Nous nous réservons le droit de modifier ou d'interrompre le service à tout moment.</p>

          <h3>3. Compte utilisateur</h3>
          <p>Vous êtes responsable de maintenir la confidentialité de votre compte et de votre mot de passe. Vous acceptez de nous notifier immédiatement en cas d'utilisation non autorisée de votre compte.</p>

          <h3>4. Propriété intellectuelle</h3>
          <p>Tout le contenu présent sur cette plateforme, incluant mais ne se limitant pas aux textes, graphiques, logos, icônes, images, clips audio et vidéo, est la propriété de notre société ou de nos partenaires.</p>

          <h3>5. Utilisation acceptable</h3>
          <p>Vous vous engagez à ne pas utiliser le service pour toute activité illégale ou interdite par ces conditions. Vous ne devez pas utiliser le service de manière à endommager, désactiver, surcharger ou altérer le service.</p>

          <h3>6. Protection des données</h3>
          <p>Nous nous engageons à protéger vos données personnelles conformément à notre politique de confidentialité et aux réglementations applicables comme le RGPD.</p>

          <h3>7. Limitation de responsabilité</h3>
          <p>Dans la mesure maximale permise par la loi, nous ne serons pas responsables des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs résultant de votre utilisation du service.</p>
        </div>
        <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: 24px;">
          <ds-button variant="ghost" (clicked)="isOpen = false">Refuser</ds-button>
          <ds-button (clicked)="isOpen = false">J'accepte</ds-button>
        </div>
      </ds-modal>
    `,
  }),
};

export const NoBackdropClose: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Modale qui ne se ferme pas au clic sur le backdrop. L\'utilisateur doit utiliser le bouton de fermeture ou un bouton d\'action.',
      },
    },
  },
  render: () => ({
    props: {
      isOpen: false,
    },
    template: `
      <ds-button (clicked)="isOpen = true">Ouvrir</ds-button>
      <ds-modal [open]="isOpen" title="Confirmation requise" [closeOnBackdrop]="false" size="sm" (closed)="isOpen = false">
        <p>Cette modale ne se ferme pas au clic sur le fond. Utilisez le bouton X ou le bouton Fermer.</p>
        <div style="display: flex; justify-content: flex-end; margin-top: 16px;">
          <ds-button (clicked)="isOpen = false">Fermer</ds-button>
        </div>
      </ds-modal>
    `,
  }),
};

export const SmallSize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Modale en taille small. Idéale pour les messages courts et les confirmations simples.',
      },
    },
  },
  render: () => ({
    props: {
      isOpen: false,
    },
    template: `
      <ds-button (clicked)="isOpen = true">Small Modal</ds-button>
      <ds-modal [open]="isOpen" title="Notification" size="sm" (closed)="isOpen = false">
        <p>Votre session expire dans 5 minutes.</p>
        <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: 16px;">
          <ds-button variant="ghost" (clicked)="isOpen = false">Ignorer</ds-button>
          <ds-button (clicked)="isOpen = false">Prolonger</ds-button>
        </div>
      </ds-modal>
    `,
  }),
};

export const LargeSize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Modale en taille large. Parfaite pour afficher des formulaires complexes ou du contenu détaillé.',
      },
    },
  },
  render: () => ({
    props: {
      isOpen: false,
    },
    template: `
      <ds-button (clicked)="isOpen = true">Large Modal</ds-button>
      <ds-modal [open]="isOpen" title="Configuration avancée" size="lg" (closed)="isOpen = false">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <h4 style="margin-top: 0;">Paramètres généraux</h4>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <label><input type="checkbox" checked> Notifications activées</label>
              <label><input type="checkbox"> Mode sombre</label>
              <label><input type="checkbox" checked> Sauvegarde automatique</label>
            </div>
          </div>
          <div>
            <h4 style="margin-top: 0;">Préférences</h4>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <label>
                Langue:
                <select style="width: 100%; padding: 6px; margin-top: 4px;">
                  <option>Français</option>
                  <option>English</option>
                  <option>Español</option>
                </select>
              </label>
              <label>
                Fuseau horaire:
                <select style="width: 100%; padding: 6px; margin-top: 4px;">
                  <option>UTC+1 (Paris)</option>
                  <option>UTC+0 (London)</option>
                  <option>UTC-5 (New York)</option>
                </select>
              </label>
            </div>
          </div>
        </div>
        <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: 24px;">
          <ds-button variant="ghost" (clicked)="isOpen = false">Annuler</ds-button>
          <ds-button (clicked)="isOpen = false">Enregistrer</ds-button>
        </div>
      </ds-modal>
    `,
  }),
};
