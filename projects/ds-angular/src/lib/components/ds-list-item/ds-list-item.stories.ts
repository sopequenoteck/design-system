import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DsListItem } from './ds-list-item';
import { DsChip } from '../ds-chip/ds-chip';

const meta: Meta<DsListItem> = {
  title: 'Components/Data Display/ListItem',
  component: DsListItem,
  decorators: [
    moduleMetadata({
      imports: [DsListItem, DsChip],
    }),
  ],
  argTypes: {
    title: {
      control: 'text',
      description: 'Titre principal (requis)',
    },
    subtitle: {
      control: 'text',
      description: 'Sous-titre optionnel',
    },
    indicator: {
      control: 'select',
      options: ['none', 'priority', 'dot', 'status'],
      description: 'Type d\'indicateur visuel',
    },
    indicatorColor: {
      control: 'select',
      options: ['high', 'medium', 'low', 'success', 'warning', 'error', 'info'],
      description: 'Couleur de l\'indicateur',
    },
    checkable: {
      control: 'boolean',
      description: 'Affiche une checkbox',
    },
    checked: {
      control: 'boolean',
      description: 'État coché',
    },
    indeterminate: {
      control: 'boolean',
      description: 'État indéterminé',
    },
    completed: {
      control: 'boolean',
      description: 'Style complété (texte barré)',
    },
    disabled: {
      control: 'boolean',
      description: 'Désactive l\'interaction',
    },
    selected: {
      control: 'boolean',
      description: 'Style de sélection',
    },
    clickable: {
      control: 'boolean',
      description: 'Rend l\'élément cliquable',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille de l\'élément',
    },
    checkedChange: {
      action: 'checkedChange',
      description: 'Événement de changement checkbox',
    },
    clicked: {
      action: 'clicked',
      description: 'Événement de clic',
    },
  },
};

export default meta;
type Story = StoryObj<DsListItem>;

/**
 * Item de liste par défaut
 */
export const Default: Story = {
  args: {
    title: 'Ma tâche',
    clickable: true,
    size: 'md',
  },
};

/**
 * Avec sous-titre
 */
export const WithSubtitle: Story = {
  args: {
    title: 'Réunion d\'équipe',
    subtitle: 'Salle de conférence A',
    clickable: true,
  },
};

/**
 * Avec checkbox
 */
export const WithCheckbox: Story = {
  args: {
    title: 'Tâche à compléter',
    checkable: true,
    checked: false,
  },
};

/**
 * Avec indicateur de priorité haute
 */
export const HighPriority: Story = {
  args: {
    title: 'Tâche urgente',
    indicator: 'priority',
    indicatorColor: 'high',
    checkable: true,
  },
};

/**
 * Avec indicateur de priorité moyenne
 */
export const MediumPriority: Story = {
  args: {
    title: 'Tâche normale',
    indicator: 'priority',
    indicatorColor: 'medium',
    checkable: true,
  },
};

/**
 * Avec indicateur de priorité basse
 */
export const LowPriority: Story = {
  args: {
    title: 'Tâche à faible priorité',
    indicator: 'priority',
    indicatorColor: 'low',
    checkable: true,
  },
};

/**
 * Avec indicateur dot
 */
export const WithDotIndicator: Story = {
  args: {
    title: 'Statut actif',
    indicator: 'dot',
    indicatorColor: 'success',
  },
};

/**
 * État complété
 */
export const Completed: Story = {
  args: {
    title: 'Tâche terminée',
    checkable: true,
    checked: true,
    completed: true,
  },
};

/**
 * État désactivé
 */
export const Disabled: Story = {
  args: {
    title: 'Élément désactivé',
    disabled: true,
    checkable: true,
  },
};

/**
 * État sélectionné
 */
export const Selected: Story = {
  args: {
    title: 'Élément sélectionné',
    selected: true,
    clickable: true,
  },
};

/**
 * Toutes les tailles
 */
export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 400px;">
        <ds-list-item title="Taille Small" size="sm" [checkable]="true" indicator="priority" indicatorColor="high" />
        <ds-list-item title="Taille Medium" size="md" [checkable]="true" indicator="priority" indicatorColor="medium" />
        <ds-list-item title="Taille Large" size="lg" [checkable]="true" indicator="priority" indicatorColor="low" />
      </div>
    `,
  }),
};

/**
 * Toutes les priorités
 */
export const AllPriorities: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 400px;">
        <ds-list-item title="Priorité haute" indicator="priority" indicatorColor="high" [checkable]="true" />
        <ds-list-item title="Priorité moyenne" indicator="priority" indicatorColor="medium" [checkable]="true" />
        <ds-list-item title="Priorité basse" indicator="priority" indicatorColor="low" [checkable]="true" />
        <ds-list-item title="Statut succès" indicator="dot" indicatorColor="success" />
        <ds-list-item title="Statut warning" indicator="dot" indicatorColor="warning" />
        <ds-list-item title="Statut erreur" indicator="dot" indicatorColor="error" />
        <ds-list-item title="Statut info" indicator="dot" indicatorColor="info" />
      </div>
    `,
  }),
};

/**
 * Avec contenu projeté (tags, métadonnées)
 */
export const WithProjectedContent: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 500px;">
        <ds-list-item
          title="Réunion d'équipe"
          [checkable]="true"
          indicator="priority"
          indicatorColor="high"
        >
          <ds-chip inline size="sm" color="primary">Travail</ds-chip>
          <span meta style="color: var(--color-primary);">09:00</span>
          <span meta style="color: var(--text-muted);">30min</span>
        </ds-list-item>

        <ds-list-item
          title="Faire les courses"
          [checkable]="true"
          indicator="priority"
          indicatorColor="medium"
        >
          <ds-chip inline size="sm" variant="outlined">Personnel</ds-chip>
          <span meta style="color: var(--color-primary);">14:00</span>
          <span meta style="color: var(--text-muted);">45min</span>
        </ds-list-item>

        <ds-list-item
          title="Lire un livre"
          [checkable]="true"
          indicator="priority"
          indicatorColor="low"
        >
          <ds-chip inline size="sm" color="success">Loisir</ds-chip>
          <span meta style="color: var(--text-muted);">1h</span>
        </ds-list-item>
      </div>
    `,
  }),
};

/**
 * Liste de tâches style TickTick
 */
export const TaskListExample: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 0; max-width: 500px; background: var(--background-surface); border-radius: 8px; padding: 0.5rem 0;">
        <ds-list-item
          title="Réviser le code PR #123"
          [checkable]="true"
          [checked]="true"
          [completed]="true"
          indicator="priority"
          indicatorColor="high"
        >
          <ds-chip inline size="sm" color="error">Urgent</ds-chip>
        </ds-list-item>

        <ds-list-item
          title="Préparer la présentation"
          [checkable]="true"
          indicator="priority"
          indicatorColor="high"
        >
          <ds-chip inline size="sm" color="primary">Travail</ds-chip>
          <span meta style="color: var(--color-primary);">10:00</span>
        </ds-list-item>

        <ds-list-item
          title="Appeler le client"
          [checkable]="true"
          indicator="priority"
          indicatorColor="medium"
        >
          <span meta style="color: var(--text-muted);">15min</span>
        </ds-list-item>

        <ds-list-item
          title="Mettre à jour la documentation"
          [checkable]="true"
          indicator="priority"
          indicatorColor="low"
        >
          <ds-chip inline size="sm" variant="outlined">Dev</ds-chip>
        </ds-list-item>

        <ds-list-item
          title="Méditation"
          [checkable]="true"
          [checked]="true"
          [completed]="true"
        >
          <ds-chip inline size="sm" color="success">Bien-être</ds-chip>
          <span meta style="color: var(--text-muted);">20min</span>
        </ds-list-item>
      </div>
    `,
  }),
};

/**
 * États interactifs
 */
export const InteractiveStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 400px;">
        <p style="color: var(--text-muted); margin-bottom: 0.5rem;">Survolez et cliquez sur les éléments :</p>

        <ds-list-item title="Normal - Hover pour voir l'effet" />
        <ds-list-item title="Sélectionné" [selected]="true" />
        <ds-list-item title="Avec checkbox" [checkable]="true" />
        <ds-list-item title="Complété" [checkable]="true" [checked]="true" [completed]="true" />
        <ds-list-item title="Désactivé" [disabled]="true" />
      </div>
    `,
  }),
};

/**
 * Couleurs d'indicateur personnalisées
 */
export const CustomIndicatorColors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 400px;">
        <p style="color: var(--text-muted); margin-bottom: 0.5rem;">Couleurs personnalisées :</p>

        <ds-list-item title="Couleur hex" indicator="priority" indicatorColor="#9333ea" />
        <ds-list-item title="Couleur rgb" indicator="priority" indicatorColor="rgb(236, 72, 153)" />
        <ds-list-item title="Variable CSS" indicator="priority" indicatorColor="var(--color-primary)" />
        <ds-list-item title="Dot violet" indicator="dot" indicatorColor="#7c3aed" />
      </div>
    `,
  }),
};

/**
 * Showcase complet
 */
export const CompleteShowcase: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <section>
          <h3 style="margin-bottom: 1rem; color: var(--text-default);">Priorités</h3>
          <div style="display: flex; flex-direction: column; gap: 0; max-width: 450px; background: var(--background-surface); border-radius: 8px; padding: 0.5rem 0;">
            <ds-list-item title="Haute priorité" indicator="priority" indicatorColor="high" [checkable]="true" />
            <ds-list-item title="Priorité moyenne" indicator="priority" indicatorColor="medium" [checkable]="true" />
            <ds-list-item title="Basse priorité" indicator="priority" indicatorColor="low" [checkable]="true" />
          </div>
        </section>

        <section>
          <h3 style="margin-bottom: 1rem; color: var(--text-default);">Statuts</h3>
          <div style="display: flex; flex-direction: column; gap: 0; max-width: 450px; background: var(--background-surface); border-radius: 8px; padding: 0.5rem 0;">
            <ds-list-item title="Actif" indicator="dot" indicatorColor="success" />
            <ds-list-item title="En attente" indicator="dot" indicatorColor="warning" />
            <ds-list-item title="Erreur" indicator="dot" indicatorColor="error" />
            <ds-list-item title="Information" indicator="dot" indicatorColor="info" />
          </div>
        </section>

        <section>
          <h3 style="margin-bottom: 1rem; color: var(--text-default);">États</h3>
          <div style="display: flex; flex-direction: column; gap: 0; max-width: 450px; background: var(--background-surface); border-radius: 8px; padding: 0.5rem 0;">
            <ds-list-item title="Normal" [checkable]="true" />
            <ds-list-item title="Sélectionné" [selected]="true" />
            <ds-list-item title="Complété" [checkable]="true" [checked]="true" [completed]="true" />
            <ds-list-item title="Désactivé" [disabled]="true" />
          </div>
        </section>

        <section>
          <h3 style="margin-bottom: 1rem; color: var(--text-default);">Avec métadonnées</h3>
          <div style="display: flex; flex-direction: column; gap: 0; max-width: 500px; background: var(--background-surface); border-radius: 8px; padding: 0.5rem 0;">
            <ds-list-item title="Réunion" [checkable]="true" indicator="priority" indicatorColor="high">
              <ds-chip inline size="sm" color="primary">Travail</ds-chip>
              <span meta style="color: var(--color-primary);">09:00</span>
              <span meta style="color: var(--text-muted);">1h</span>
            </ds-list-item>
            <ds-list-item title="Sport" [checkable]="true" indicator="priority" indicatorColor="medium">
              <ds-chip inline size="sm" color="success">Santé</ds-chip>
              <span meta style="color: var(--text-muted);">45min</span>
            </ds-list-item>
          </div>
        </section>
      </div>
    `,
  }),
};
