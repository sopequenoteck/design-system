import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DsTimeline, TimelineItem } from './ds-timeline';
import {
  faCheckCircle,
  faExclamationTriangle,
  faInfoCircle,
  faTimes,
  faStar,
  faRocket,
  faUser,
  faCode,
} from '@fortawesome/free-solid-svg-icons';

const meta: Meta<DsTimeline> = {
  title: 'Components/Data/Timeline',
  component: DsTimeline,
  decorators: [
    moduleMetadata({
      imports: [DsTimeline],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Liste des événements à afficher',
    },
    mode: {
      control: 'select',
      options: ['left', 'right', 'alternate'],
      description: 'Position du contenu par rapport à la ligne',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du composant',
    },
    pending: {
      control: 'boolean',
      description: 'Affiche un indicateur "en cours" à la fin',
    },
    pendingContent: {
      control: 'text',
      description: 'Texte de l\'indicateur pending',
    },
    reverse: {
      control: 'boolean',
      description: 'Inverse l\'ordre des événements',
    },
    itemClick: {
      action: 'itemClick',
      description: 'Événement émis au clic sur un item',
    },
  },
};

export default meta;
type Story = StoryObj<DsTimeline>;

// Items de base pour les stories
const basicItems: TimelineItem[] = [
  {
    content: 'Commande créée et confirmée',
    date: '12 Dec 2025, 14:30',
    color: 'primary',
  },
  {
    content: 'Paiement validé',
    date: '12 Dec 2025, 14:35',
    color: 'success',
    icon: faCheckCircle,
  },
  {
    content: 'Commande en préparation',
    date: '12 Dec 2025, 15:00',
    color: 'info',
  },
  {
    content: 'Expédition en cours',
    date: '13 Dec 2025, 09:00',
    color: 'warning',
  },
];

const projectItems: TimelineItem[] = [
  {
    content: 'Lancement du projet "Design System"',
    date: '1 Jan 2025',
    color: 'primary',
    icon: faRocket,
  },
  {
    content: 'Sprint 1 terminé : composants de base',
    date: '15 Jan 2025',
    color: 'success',
    icon: faCheckCircle,
  },
  {
    content: 'Revue de code et corrections',
    date: '20 Jan 2025',
    color: 'info',
    icon: faCode,
  },
  {
    content: 'Sprint 2 en cours : composants avancés',
    date: '25 Jan 2025',
    color: 'warning',
  },
];

const errorItems: TimelineItem[] = [
  {
    content: 'Connexion établie',
    date: '12 Dec 2025, 10:00',
    color: 'success',
    icon: faCheckCircle,
  },
  {
    content: 'Traitement des données',
    date: '12 Dec 2025, 10:15',
    color: 'info',
  },
  {
    content: 'Erreur de validation détectée',
    date: '12 Dec 2025, 10:20',
    color: 'error',
    icon: faTimes,
  },
  {
    content: 'Correction en attente',
    date: '12 Dec 2025, 10:25',
    color: 'warning',
    icon: faExclamationTriangle,
  },
];

/**
 * Timeline par défaut avec mode "left".
 */
export const Default: Story = {
  args: {
    items: basicItems,
    mode: 'left',
    size: 'md',
    pending: false,
    reverse: false,
  },
};

/**
 * Timeline avec mode "alternate" (contenu alterné gauche/droite).
 */
export const ModeAlternate: Story = {
  args: {
    items: projectItems,
    mode: 'alternate',
    size: 'md',
    pending: false,
    reverse: false,
  },
};

/**
 * Timeline avec mode "right" (contenu à gauche).
 */
export const ModeRight: Story = {
  args: {
    items: basicItems,
    mode: 'right',
    size: 'md',
    pending: false,
    reverse: false,
  },
};

/**
 * Timeline avec taille "sm".
 */
export const SizeSmall: Story = {
  args: {
    items: basicItems,
    mode: 'left',
    size: 'sm',
    pending: false,
    reverse: false,
  },
};

/**
 * Timeline avec taille "lg".
 */
export const SizeLarge: Story = {
  args: {
    items: basicItems,
    mode: 'left',
    size: 'lg',
    pending: false,
    reverse: false,
  },
};

/**
 * Timeline avec indicateur "pending" (en cours).
 */
export const WithPending: Story = {
  args: {
    items: projectItems,
    mode: 'left',
    size: 'md',
    pending: true,
    pendingContent: 'Traitement en cours...',
    reverse: false,
  },
};

/**
 * Timeline avec ordre inversé (plus récent en haut).
 */
export const Reversed: Story = {
  args: {
    items: basicItems,
    mode: 'left',
    size: 'md',
    pending: false,
    reverse: true,
  },
};

/**
 * Timeline avec toutes les couleurs disponibles.
 */
export const AllColors: Story = {
  args: {
    items: [
      {
        content: 'Couleur par défaut (gris)',
        date: '12 Dec 2025',
        color: 'default',
      },
      {
        content: 'Couleur primaire',
        date: '11 Dec 2025',
        color: 'primary',
      },
      {
        content: 'Couleur succès (vert)',
        date: '10 Dec 2025',
        color: 'success',
        icon: faCheckCircle,
      },
      {
        content: 'Couleur avertissement (orange)',
        date: '9 Dec 2025',
        color: 'warning',
        icon: faExclamationTriangle,
      },
      {
        content: 'Couleur erreur (rouge)',
        date: '8 Dec 2025',
        color: 'error',
        icon: faTimes,
      },
      {
        content: 'Couleur info (bleu)',
        date: '7 Dec 2025',
        color: 'info',
        icon: faInfoCircle,
      },
    ],
    mode: 'left',
    size: 'md',
    pending: false,
    reverse: false,
  },
};

/**
 * Timeline avec icônes personnalisées.
 */
export const WithCustomIcons: Story = {
  args: {
    items: [
      {
        content: 'Inscription utilisateur',
        date: '1 Dec 2025',
        color: 'primary',
        icon: faUser,
      },
      {
        content: 'Premier commit',
        date: '5 Dec 2025',
        color: 'info',
        icon: faCode,
      },
      {
        content: 'Revue de code validée',
        date: '8 Dec 2025',
        color: 'success',
        icon: faCheckCircle,
      },
      {
        content: 'Mise en production',
        date: '12 Dec 2025',
        color: 'success',
        icon: faRocket,
      },
      {
        content: 'Retour client excellent',
        date: '15 Dec 2025',
        color: 'success',
        icon: faStar,
      },
    ],
    mode: 'left',
    size: 'md',
    pending: false,
    reverse: false,
  },
};

/**
 * Timeline sans dates.
 */
export const WithoutDates: Story = {
  args: {
    items: [
      {
        content: 'Étape 1 : Planification du projet',
        color: 'success',
        icon: faCheckCircle,
      },
      {
        content: 'Étape 2 : Développement des fonctionnalités',
        color: 'success',
        icon: faCheckCircle,
      },
      {
        content: 'Étape 3 : Tests et validation',
        color: 'info',
      },
      {
        content: 'Étape 4 : Déploiement en production',
        color: 'default',
      },
    ],
    mode: 'left',
    size: 'md',
    pending: false,
    reverse: false,
  },
};

/**
 * Timeline avec événements d'erreur.
 */
export const WithErrors: Story = {
  args: {
    items: errorItems,
    mode: 'left',
    size: 'md',
    pending: false,
    reverse: false,
  },
};

/**
 * Timeline complète avec pending et reverse.
 */
export const CompleteExample: Story = {
  args: {
    items: projectItems,
    mode: 'alternate',
    size: 'lg',
    pending: true,
    pendingContent: 'Sprint 3 en cours de planification...',
    reverse: true,
  },
};

/**
 * Timeline thématique : affichage sur les 3 thèmes (Light/Dark/Custom).
 */
export const Themed: Story = {
  args: {
    items: basicItems,
    mode: 'left',
    size: 'md',
    pending: true,
    pendingContent: 'Livraison prévue demain',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
        <div class="theme-light" style="padding: 24px; background: #f5f5f5; border-radius: 8px;">
          <h3 style="margin-top: 0; margin-bottom: 16px; font-size: 14px; font-weight: 600; color: #1a1c22;">Light Theme</h3>
          <ds-timeline
            [items]="items"
            [mode]="mode"
            [size]="size"
            [pending]="pending"
            [pendingContent]="pendingContent">
          </ds-timeline>
        </div>

        <div class="theme-dark" style="padding: 24px; background: #1a1c22; border-radius: 8px;">
          <h3 style="margin-top: 0; margin-bottom: 16px; font-size: 14px; font-weight: 600; color: #f5f5f5;">Dark Theme</h3>
          <ds-timeline
            [items]="items"
            [mode]="mode"
            [size]="size"
            [pending]="pending"
            [pendingContent]="pendingContent">
          </ds-timeline>
        </div>

        <div class="theme-custom" style="padding: 24px; background: #e8f4f8; border-radius: 8px;">
          <h3 style="margin-top: 0; margin-bottom: 16px; font-size: 14px; font-weight: 600; color: #2c2f36;">Custom Theme</h3>
          <ds-timeline
            [items]="items"
            [mode]="mode"
            [size]="size"
            [pending]="pending"
            [pendingContent]="pendingContent">
          </ds-timeline>
        </div>
      </div>
    `,
  }),
};
