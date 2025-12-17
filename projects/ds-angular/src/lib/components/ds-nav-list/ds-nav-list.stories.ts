import type { Meta, StoryObj } from '@storybook/angular';
import { DsNavList } from './ds-nav-list';
import { NavListGroup } from './ds-nav-list.types';
import {
  faHome,
  faCalendarDay,
  faCalendarWeek,
  faList,
  faFilter,
  faCheckSquare,
  faTrash,
  faSun,
} from '@fortawesome/free-solid-svg-icons';

// =============================================================================
// MOCK DATA
// =============================================================================

const plannerGroups: NavListGroup[] = [
  {
    id: 'smart-lists',
    items: [
      { id: 'all', label: 'Tout', icon: faList, badge: 42 },
      { id: 'today', label: "Aujourd'hui", icon: faSun, badge: 8 },
      { id: 'tomorrow', label: 'Demain', icon: faCalendarDay, badge: 3 },
      { id: 'week', label: '7 prochains jours', icon: faCalendarWeek, badge: 15 },
    ],
  },
  {
    id: 'sources',
    title: 'Sources',
    items: [
      { id: 'personal', label: 'Personnel', emoji: '👤', dotColor: '#3b82f6', badge: 12 },
      { id: 'work', label: 'Travail', emoji: '💼', dotColor: '#ef4444', badge: 8 },
      { id: 'studies', label: 'Études', emoji: '🎓', dotColor: '#22c55e', badge: 5 },
      { id: 'health', label: 'Santé', emoji: '❤️', dotColor: '#f59e0b', badge: 2 },
      { id: 'family', label: 'Famille', emoji: '👨‍👩‍👧', dotColor: '#06b6d4', badge: 3 },
      { id: 'user', label: 'Utilisateur', emoji: '👤', dotColor: '#8b5cf6', badge: 0 },
      { id: 'stoic', label: 'Coach Stoïque', emoji: '🏛️', dotColor: '#f59e0b', badge: 0 },
      { id: 'dev', label: 'Assistant Dev', emoji: '💻', dotColor: '#3b82f6', badge: 0 },
      { id: 'orchestrator', label: 'Orchestrateur', emoji: '🎭', dotColor: '#ef4444', badge: 0 },
      { id: 'finance', label: 'Finance', emoji: '💰', dotColor: '#22c55e', badge: 0 },
    ],
  },
  {
    id: 'filters',
    title: 'Filtres',
    items: [
      { id: 'no-date', label: 'Sans Dates', icon: faFilter, badge: 7 },
    ],
  },
  {
    id: 'labels',
    title: 'Étiquettes',
    items: [
      { id: 'completed', label: 'Terminées', icon: faCheckSquare },
      { id: 'trash', label: 'Corbeille', icon: faTrash },
    ],
  },
];

const collapsibleGroups: NavListGroup[] = [
  {
    id: 'main',
    items: [
      { id: 'home', label: 'Accueil', icon: faHome, badge: 5 },
    ],
  },
  {
    id: 'sources',
    title: 'Sources',
    collapsible: true,
    collapsed: false,
    items: [
      { id: 'personal', label: 'Personnel', emoji: '👤', dotColor: '#3b82f6', badge: 12 },
      { id: 'work', label: 'Travail', emoji: '💼', dotColor: '#ef4444', badge: 8 },
    ],
  },
  {
    id: 'archive',
    title: 'Archives',
    collapsible: true,
    collapsed: true,
    items: [
      { id: 'old1', label: 'Ancien projet', icon: faList },
      { id: 'old2', label: 'Backup', icon: faList },
    ],
  },
];

const disabledGroups: NavListGroup[] = [
  {
    id: 'main',
    title: 'Navigation',
    items: [
      { id: 'active', label: 'Actif', icon: faHome },
      { id: 'disabled', label: 'Désactivé', icon: faList, disabled: true },
      { id: 'active2', label: 'Autre actif', icon: faCalendarDay },
    ],
  },
];

// =============================================================================
// META
// =============================================================================

const meta: Meta<DsNavList> = {
  title: 'Components/Navigation/Nav List',
  component: DsNavList,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du composant',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    activeItemId: {
      control: 'text',
      description: "ID de l'item actif",
    },
    ariaLabel: {
      control: 'text',
      description: 'Label ARIA pour accessibilité',
      table: {
        defaultValue: { summary: 'Navigation' },
      },
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# DsNavList

Composant de liste de navigation/filtrage avec support de groupes, icônes/emojis, badges et indicateurs colorés.

## Fonctionnalités

- **Groupes avec titres** : Organisation en sections (Sources, Filtres, etc.)
- **Icône OU Emoji** : Support des deux formats
- **Badge compteur** : Avec variantes de couleur
- **Indicateur dot** : Point coloré pour catégorisation visuelle
- **Groupes repliables** : Collapse/expand optionnel
- **Accessibilité** : Navigation clavier complète

## Cas d'usage

- Sidebar de filtrage (Planner, Tasks)
- Menu de navigation secondaire
- Liste de catégories avec compteurs
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<DsNavList>;

// =============================================================================
// STORIES
// =============================================================================

/**
 * Version complète simulant la sidebar du Planner avec smart lists,
 * sources (avec emoji et dot coloré), filtres et étiquettes.
 */
export const PlannerSidebar: Story = {
  args: {
    groups: plannerGroups,
    activeItemId: 'today',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemple complet simulant la sidebar du Planner avec tous les types d\'items.',
      },
    },
  },
};

/**
 * Version avec groupes repliables.
 */
export const CollapsibleGroups: Story = {
  args: {
    groups: collapsibleGroups,
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Groupes avec option collapsible pour économiser l\'espace vertical.',
      },
    },
  },
};

/**
 * Taille small pour interfaces compactes.
 */
export const SizeSmall: Story = {
  args: {
    groups: plannerGroups,
    activeItemId: 'all',
    size: 'sm',
  },
};

/**
 * Taille large pour meilleure lisibilité.
 */
export const SizeLarge: Story = {
  args: {
    groups: plannerGroups,
    activeItemId: 'all',
    size: 'lg',
  },
};

/**
 * Items désactivés.
 */
export const WithDisabledItems: Story = {
  args: {
    groups: disabledGroups,
    activeItemId: 'active',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Certains items peuvent être désactivés et non-cliquables.',
      },
    },
  },
};

/**
 * Sans item actif.
 */
export const NoActiveItem: Story = {
  args: {
    groups: plannerGroups,
    activeItemId: null,
    size: 'md',
  },
};

/**
 * Groupe simple sans titre.
 */
export const SimpleList: Story = {
  args: {
    groups: [
      {
        id: 'simple',
        items: [
          { id: '1', label: 'Option 1', icon: faHome },
          { id: '2', label: 'Option 2', icon: faList },
          { id: '3', label: 'Option 3', icon: faCalendarDay },
        ],
      },
    ],
    activeItemId: '1',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Liste simple sans groupes ni titres de section.',
      },
    },
  },
};

/**
 * Avec badges de différentes variantes.
 */
export const BadgeVariants: Story = {
  args: {
    groups: [
      {
        id: 'badges',
        title: 'Variantes de badges',
        items: [
          { id: '1', label: 'Default', icon: faList, badge: 5, badgeVariant: 'default' },
          { id: '2', label: 'Primary', icon: faList, badge: 12, badgeVariant: 'primary' },
          { id: '3', label: 'Success', icon: faList, badge: 3, badgeVariant: 'success' },
          { id: '4', label: 'Warning', icon: faList, badge: 8, badgeVariant: 'warning' },
          { id: '5', label: 'Error', icon: faList, badge: 2, badgeVariant: 'error' },
          { id: '6', label: 'Info', icon: faList, badge: 99, badgeVariant: 'info' },
        ],
      },
    ],
    size: 'md',
  },
};

/**
 * Items avec uniquement des emojis (sans icônes).
 */
export const EmojiOnly: Story = {
  args: {
    groups: [
      {
        id: 'emojis',
        title: 'Catégories',
        items: [
          { id: '1', label: 'Personnel', emoji: '👤', badge: 15 },
          { id: '2', label: 'Travail', emoji: '💼', badge: 8 },
          { id: '3', label: 'Études', emoji: '🎓', badge: 3 },
          { id: '4', label: 'Sport', emoji: '🏃', badge: 2 },
          { id: '5', label: 'Loisirs', emoji: '🎮', badge: 0 },
        ],
      },
    ],
    activeItemId: '1',
    size: 'md',
  },
};

/**
 * Items avec dots colorés (indicateurs de catégorie).
 */
export const WithColorDots: Story = {
  args: {
    groups: [
      {
        id: 'colors',
        title: 'Par couleur',
        items: [
          { id: '1', label: 'Bleu', dotColor: '#3b82f6', badge: 5 },
          { id: '2', label: 'Rouge', dotColor: '#ef4444', badge: 3 },
          { id: '3', label: 'Vert', dotColor: '#22c55e', badge: 8 },
          { id: '4', label: 'Orange', dotColor: '#f59e0b', badge: 2 },
          { id: '5', label: 'Violet', dotColor: '#8b5cf6', badge: 1 },
        ],
      },
    ],
    size: 'md',
  },
};
