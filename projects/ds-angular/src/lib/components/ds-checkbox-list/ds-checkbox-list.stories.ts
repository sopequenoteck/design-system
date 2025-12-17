import type { Meta, StoryObj } from '@storybook/angular';
import { DsCheckboxList } from './ds-checkbox-list';
import { CheckboxListItem } from './ds-checkbox-list.types';
import {
  faCalendarDay,
  faCalendarWeek,
  faList,
  faCheckSquare,
  faTrash,
  faSun,
  faInbox,
  faStar,
  faClock,
} from '@fortawesome/free-solid-svg-icons';

// =============================================================================
// MOCK DATA
// =============================================================================

const smartListItems: CheckboxListItem[] = [
  { id: 'today', label: "Aujourd'hui", icon: faSun, checked: true },
  { id: 'tomorrow', label: 'Demain', icon: faCalendarDay, checked: true },
  { id: 'week', label: '7 prochains jours', icon: faCalendarWeek, checked: true },
  { id: 'all', label: 'Tout', icon: faList, checked: false },
  { id: 'inbox', label: 'Boîte de réception', icon: faInbox, checked: true },
  { id: 'completed', label: 'Terminées', icon: faCheckSquare, checked: false },
  { id: 'trash', label: 'Corbeille', icon: faTrash, checked: false },
  { id: 'no-date', label: 'Sans date', icon: faClock, checked: true },
];

const emojiItems: CheckboxListItem[] = [
  { id: 'personal', label: 'Personnel', emoji: '👤', checked: true },
  { id: 'work', label: 'Travail', emoji: '💼', checked: true },
  { id: 'studies', label: 'Études', emoji: '🎓', checked: false },
  { id: 'health', label: 'Santé', emoji: '❤️', checked: true },
  { id: 'family', label: 'Famille', emoji: '👨‍👩‍👧', checked: false },
  { id: 'finance', label: 'Finance', emoji: '💰', checked: true },
];

const preferencesItems: CheckboxListItem[] = [
  {
    id: 'notifications',
    label: 'Notifications push',
    icon: faStar,
    checked: true,
    helper: 'Recevoir des notifications sur votre appareil',
  },
  {
    id: 'email',
    label: 'Notifications email',
    icon: faInbox,
    checked: false,
    helper: 'Recevoir un résumé quotidien par email',
  },
  {
    id: 'reminders',
    label: 'Rappels automatiques',
    icon: faClock,
    checked: true,
    helper: 'Rappels 30 min avant chaque tâche',
  },
  {
    id: 'sounds',
    label: 'Sons',
    icon: faStar,
    checked: true,
    disabled: true,
    helper: 'Option temporairement indisponible',
  },
];

const disabledItems: CheckboxListItem[] = [
  { id: '1', label: 'Option active', icon: faList, checked: true },
  { id: '2', label: 'Option désactivée', icon: faList, checked: false, disabled: true },
  { id: '3', label: 'Autre option active', icon: faList, checked: false },
];

// =============================================================================
// META
// =============================================================================

const meta: Meta<DsCheckboxList> = {
  title: 'Forms/Input Controls/Checkbox List',
  component: DsCheckboxList,
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
    showSelectAll: {
      control: 'boolean',
      description: 'Afficher le checkbox "Tout sélectionner"',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    selectAllLabel: {
      control: 'text',
      description: 'Label du checkbox "Tout sélectionner"',
      table: {
        defaultValue: { summary: 'Tout sélectionner' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Désactiver toute la liste',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Label ARIA pour accessibilité',
      table: {
        defaultValue: { summary: 'Liste de sélection' },
      },
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# DsCheckboxList

Composant de liste de checkboxes avec support d'icônes/emojis.
Idéal pour les listes de préférences, filtres, ou sélections multiples.

## Fonctionnalités

- **Icône OU Emoji** : Support des deux formats pour chaque item
- **Sélection/désélection** : Individuelle ou globale
- **Helper text** : Description optionnelle par item
- **États désactivés** : Par item ou pour toute la liste
- **Two-way binding** : Sur la liste d'items

## Cas d'usage

- Paramètres de préférences utilisateur
- Filtres de smart lists
- Sélection de catégories/sources
- Checklist de configuration
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<DsCheckboxList>;

// =============================================================================
// STORIES
// =============================================================================

/**
 * Exemple avec les smart lists du Planner.
 * Permet d'activer/désactiver les vues disponibles.
 */
export const SmartLists: Story = {
  args: {
    items: smartListItems,
    size: 'md',
    showSelectAll: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration des smart lists visibles dans le Planner.',
      },
    },
  },
};

/**
 * Avec le checkbox "Tout sélectionner".
 */
export const WithSelectAll: Story = {
  args: {
    items: smartListItems,
    size: 'md',
    showSelectAll: true,
    selectAllLabel: 'Activer toutes les listes',
  },
  parameters: {
    docs: {
      description: {
        story: 'Option pour sélectionner/désélectionner tous les items d\'un coup.',
      },
    },
  },
};

/**
 * Items avec emojis au lieu d'icônes.
 */
export const WithEmojis: Story = {
  args: {
    items: emojiItems,
    size: 'md',
    showSelectAll: true,
    selectAllLabel: 'Toutes les sources',
  },
  parameters: {
    docs: {
      description: {
        story: 'Utilisation d\'emojis pour une personnalisation visuelle.',
      },
    },
  },
};

/**
 * Préférences avec helper text.
 */
export const Preferences: Story = {
  args: {
    items: preferencesItems,
    size: 'md',
    ariaLabel: 'Préférences de notification',
  },
  parameters: {
    docs: {
      description: {
        story: 'Items avec texte d\'aide pour expliquer chaque option.',
      },
    },
  },
};

/**
 * Taille small pour interfaces compactes.
 */
export const SizeSmall: Story = {
  args: {
    items: smartListItems,
    size: 'sm',
  },
};

/**
 * Taille large pour meilleure lisibilité.
 */
export const SizeLarge: Story = {
  args: {
    items: smartListItems,
    size: 'lg',
  },
};

/**
 * Avec items désactivés.
 */
export const WithDisabledItems: Story = {
  args: {
    items: disabledItems,
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Certains items peuvent être désactivés individuellement.',
      },
    },
  },
};

/**
 * Liste entièrement désactivée.
 */
export const DisabledList: Story = {
  args: {
    items: smartListItems,
    size: 'md',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Toute la liste peut être désactivée via la prop disabled.',
      },
    },
  },
};

/**
 * Liste vide.
 */
export const EmptyList: Story = {
  args: {
    items: [],
    size: 'md',
    showSelectAll: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Comportement avec une liste vide.',
      },
    },
  },
};

/**
 * Tous les items cochés.
 */
export const AllChecked: Story = {
  args: {
    items: smartListItems.map(item => ({ ...item, checked: true })),
    size: 'md',
    showSelectAll: true,
  },
};

/**
 * Aucun item coché.
 */
export const NoneChecked: Story = {
  args: {
    items: smartListItems.map(item => ({ ...item, checked: false })),
    size: 'md',
    showSelectAll: true,
  },
};
