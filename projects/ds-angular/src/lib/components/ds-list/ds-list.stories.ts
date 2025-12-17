import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DsList } from './ds-list';
import { DsListItem } from '../ds-list-item/ds-list-item';
import { DsChip } from '../ds-chip/ds-chip';

const meta: Meta<DsList> = {
  title: 'Components/Data/List',
  component: DsList,
  decorators: [
    moduleMetadata({
      imports: [DsList, DsListItem, DsChip, DragDropModule, ScrollingModule],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'divided', 'card'],
      description: 'Variante visuelle',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille de la liste',
    },
    loading: {
      control: 'boolean',
      description: 'Affiche les skeletons',
    },
    loadingCount: {
      control: 'number',
      description: 'Nombre de skeletons',
    },
    empty: {
      control: 'boolean',
      description: 'Affiche l\'état vide',
    },
    emptyTitle: {
      control: 'text',
      description: 'Titre de l\'état vide',
    },
    emptyDescription: {
      control: 'text',
      description: 'Description de l\'état vide',
    },
    draggable: {
      control: 'boolean',
      description: 'Active le Drag & Drop',
    },
    virtual: {
      control: 'boolean',
      description: 'Active la virtualisation',
    },
    itemSize: {
      control: 'number',
      description: 'Hauteur d\'un item (virtualisation)',
    },
    viewportHeight: {
      control: 'number',
      description: 'Hauteur du viewport (virtualisation)',
    },
    dropped: {
      action: 'dropped',
      description: 'Événement de drop',
    },
    selectionChange: {
      action: 'selectionChange',
      description: 'Événement de changement de sélection',
    },
  },
};

export default meta;
type Story = StoryObj<DsList>;

/**
 * Liste par défaut
 */
export const Default: Story = {
  render: () => ({
    template: `
      <ds-list style="max-width: 450px;">
        <ds-list-item title="Premier élément" [checkable]="true" />
        <ds-list-item title="Deuxième élément" [checkable]="true" />
        <ds-list-item title="Troisième élément" [checkable]="true" />
      </ds-list>
    `,
  }),
};

/**
 * Variante divided (avec séparateurs)
 */
export const Divided: Story = {
  render: () => ({
    template: `
      <ds-list variant="divided" style="max-width: 450px;">
        <ds-list-item title="Premier élément" [checkable]="true" indicator="priority" indicatorColor="high" />
        <ds-list-item title="Deuxième élément" [checkable]="true" indicator="priority" indicatorColor="medium" />
        <ds-list-item title="Troisième élément" [checkable]="true" indicator="priority" indicatorColor="low" />
      </ds-list>
    `,
  }),
};

/**
 * Variante card (dans un conteneur)
 */
export const Card: Story = {
  render: () => ({
    template: `
      <ds-list variant="card" style="max-width: 450px;">
        <ds-list-item title="Premier élément" [checkable]="true" />
        <ds-list-item title="Deuxième élément" [checkable]="true" />
        <ds-list-item title="Troisième élément" [checkable]="true" />
      </ds-list>
    `,
  }),
};

/**
 * État de chargement
 */
export const Loading: Story = {
  args: {
    loading: true,
    loadingCount: 5,
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-list [loading]="loading" [loadingCount]="loadingCount" style="max-width: 450px;">
        <ds-list-item title="Élément" />
      </ds-list>
    `,
  }),
};

/**
 * État vide
 */
export const Empty: Story = {
  args: {
    empty: true,
    emptyTitle: 'Aucune tâche',
    emptyDescription: 'Commencez par créer une nouvelle tâche.',
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-list
        [empty]="empty"
        [emptyTitle]="emptyTitle"
        [emptyDescription]="emptyDescription"
        style="max-width: 450px;"
      />
    `,
  }),
};

/**
 * Toutes les variantes
 */
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <section>
          <h3 style="margin-bottom: 1rem; color: var(--text-default);">Default</h3>
          <ds-list variant="default" style="max-width: 400px;">
            <ds-list-item title="Élément 1" [checkable]="true" />
            <ds-list-item title="Élément 2" [checkable]="true" />
            <ds-list-item title="Élément 3" [checkable]="true" />
          </ds-list>
        </section>

        <section>
          <h3 style="margin-bottom: 1rem; color: var(--text-default);">Divided</h3>
          <ds-list variant="divided" style="max-width: 400px;">
            <ds-list-item title="Élément 1" [checkable]="true" />
            <ds-list-item title="Élément 2" [checkable]="true" />
            <ds-list-item title="Élément 3" [checkable]="true" />
          </ds-list>
        </section>

        <section>
          <h3 style="margin-bottom: 1rem; color: var(--text-default);">Card</h3>
          <ds-list variant="card" style="max-width: 400px;">
            <ds-list-item title="Élément 1" [checkable]="true" />
            <ds-list-item title="Élément 2" [checkable]="true" />
            <ds-list-item title="Élément 3" [checkable]="true" />
          </ds-list>
        </section>
      </div>
    `,
  }),
};

/**
 * Toutes les tailles
 */
export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <section>
          <h3 style="margin-bottom: 1rem; color: var(--text-default);">Small</h3>
          <ds-list size="sm" variant="card" style="max-width: 400px;">
            <ds-list-item title="Élément small" size="sm" [checkable]="true" />
            <ds-list-item title="Élément small" size="sm" [checkable]="true" />
          </ds-list>
        </section>

        <section>
          <h3 style="margin-bottom: 1rem; color: var(--text-default);">Medium</h3>
          <ds-list size="md" variant="card" style="max-width: 400px;">
            <ds-list-item title="Élément medium" size="md" [checkable]="true" />
            <ds-list-item title="Élément medium" size="md" [checkable]="true" />
          </ds-list>
        </section>

        <section>
          <h3 style="margin-bottom: 1rem; color: var(--text-default);">Large</h3>
          <ds-list size="lg" variant="card" style="max-width: 400px;">
            <ds-list-item title="Élément large" size="lg" [checkable]="true" />
            <ds-list-item title="Élément large" size="lg" [checkable]="true" />
          </ds-list>
        </section>
      </div>
    `,
  }),
};

/**
 * Avec Drag & Drop
 */
export const WithDragAndDrop: Story = {
  render: () => ({
    template: `
      <div style="max-width: 450px;">
        <p style="color: var(--text-muted); margin-bottom: 1rem;">
          Glissez-déposez les éléments pour les réorganiser :
        </p>
        <ds-list
          variant="card"
          [draggable]="true"
          [dragData]="['task1', 'task2', 'task3', 'task4']"
        >
          <ds-list-item
            cdkDrag
            title="Tâche 1 - Réunion"
            [checkable]="true"
            indicator="priority"
            indicatorColor="high"
          >
            <ds-chip inline size="sm" color="primary">Travail</ds-chip>
          </ds-list-item>

          <ds-list-item
            cdkDrag
            title="Tâche 2 - Sport"
            [checkable]="true"
            indicator="priority"
            indicatorColor="medium"
          >
            <ds-chip inline size="sm" color="success">Santé</ds-chip>
          </ds-list-item>

          <ds-list-item
            cdkDrag
            title="Tâche 3 - Lecture"
            [checkable]="true"
            indicator="priority"
            indicatorColor="low"
          >
            <ds-chip inline size="sm" variant="outlined">Loisir</ds-chip>
          </ds-list-item>

          <ds-list-item
            cdkDrag
            title="Tâche 4 - Courses"
            [checkable]="true"
          >
            <ds-chip inline size="sm" variant="outlined">Personnel</ds-chip>
          </ds-list-item>
        </ds-list>
      </div>
    `,
  }),
};

/**
 * Liste de tâches complète (exemple réel)
 */
export const TaskListExample: Story = {
  render: () => ({
    template: `
      <div style="max-width: 500px;">
        <h2 style="margin-bottom: 1rem; color: var(--text-default);">Mes tâches</h2>

        <ds-list variant="card">
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
            title="Préparer la présentation client"
            [checkable]="true"
            indicator="priority"
            indicatorColor="high"
          >
            <ds-chip inline size="sm" color="primary">Travail</ds-chip>
            <span meta style="color: var(--color-primary);">10:00</span>
            <span meta style="color: var(--text-muted);">2h</span>
          </ds-list-item>

          <ds-list-item
            title="Appeler le fournisseur"
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
            <span meta style="color: var(--text-muted);">1h</span>
          </ds-list-item>

          <ds-list-item
            title="Séance de sport"
            [checkable]="true"
          >
            <ds-chip inline size="sm" color="success">Santé</ds-chip>
            <span meta style="color: var(--color-primary);">18:00</span>
            <span meta style="color: var(--text-muted);">1h</span>
          </ds-list-item>

          <ds-list-item
            title="Méditation du matin"
            [checkable]="true"
            [checked]="true"
            [completed]="true"
          >
            <ds-chip inline size="sm" color="success">Bien-être</ds-chip>
            <span meta style="color: var(--text-muted);">20min</span>
          </ds-list-item>
        </ds-list>
      </div>
    `,
  }),
};

/**
 * États de chargement avec différentes tailles
 */
export const LoadingStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
        <div>
          <h4 style="margin-bottom: 1rem; color: var(--text-default);">3 skeletons</h4>
          <ds-list [loading]="true" [loadingCount]="3" variant="card" style="width: 300px;" />
        </div>

        <div>
          <h4 style="margin-bottom: 1rem; color: var(--text-default);">5 skeletons</h4>
          <ds-list [loading]="true" [loadingCount]="5" variant="card" style="width: 300px;" />
        </div>

        <div>
          <h4 style="margin-bottom: 1rem; color: var(--text-default);">Small size</h4>
          <ds-list [loading]="true" [loadingCount]="3" size="sm" variant="card" style="width: 300px;" />
        </div>

        <div>
          <h4 style="margin-bottom: 1rem; color: var(--text-default);">Large size</h4>
          <ds-list [loading]="true" [loadingCount]="3" size="lg" variant="card" style="width: 300px;" />
        </div>
      </div>
    `,
  }),
};

/**
 * États vides personnalisés
 */
export const EmptyStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
        <div>
          <h4 style="margin-bottom: 1rem; color: var(--text-default);">Tâches</h4>
          <ds-list
            [empty]="true"
            emptyTitle="Aucune tâche"
            emptyDescription="Créez votre première tâche pour commencer."
            variant="card"
            style="width: 300px; min-height: 200px;"
          />
        </div>

        <div>
          <h4 style="margin-bottom: 1rem; color: var(--text-default);">Recherche</h4>
          <ds-list
            [empty]="true"
            emptyTitle="Aucun résultat"
            emptyDescription="Essayez avec d'autres mots-clés."
            variant="card"
            style="width: 300px; min-height: 200px;"
          />
        </div>

        <div>
          <h4 style="margin-bottom: 1rem; color: var(--text-default);">Notifications</h4>
          <ds-list
            [empty]="true"
            emptyTitle="Tout est lu"
            emptyDescription="Vous n'avez aucune notification."
            variant="card"
            style="width: 300px; min-height: 200px;"
          />
        </div>
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
      <div style="display: flex; flex-direction: column; gap: 3rem;">
        <section>
          <h3 style="margin-bottom: 1rem; color: var(--text-default);">Liste avec tâches et priorités</h3>
          <ds-list variant="card" style="max-width: 500px;">
            <ds-list-item
              title="Tâche urgente"
              [checkable]="true"
              indicator="priority"
              indicatorColor="high"
            >
              <ds-chip inline size="sm" color="error">Urgent</ds-chip>
              <span meta style="color: var(--color-primary);">09:00</span>
            </ds-list-item>
            <ds-list-item
              title="Tâche normale"
              [checkable]="true"
              indicator="priority"
              indicatorColor="medium"
            >
              <span meta style="color: var(--text-muted);">30min</span>
            </ds-list-item>
            <ds-list-item
              title="Tâche terminée"
              [checkable]="true"
              [checked]="true"
              [completed]="true"
            />
          </ds-list>
        </section>

        <section>
          <h3 style="margin-bottom: 1rem; color: var(--text-default);">État de chargement</h3>
          <ds-list [loading]="true" [loadingCount]="3" variant="card" style="max-width: 500px;" />
        </section>

        <section>
          <h3 style="margin-bottom: 1rem; color: var(--text-default);">État vide</h3>
          <ds-list
            [empty]="true"
            emptyTitle="Liste vide"
            emptyDescription="Aucun élément à afficher."
            variant="card"
            style="max-width: 500px; min-height: 150px;"
          />
        </section>

        <section>
          <h3 style="margin-bottom: 1rem; color: var(--text-default);">Variantes</h3>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <div>
              <p style="margin-bottom: 0.5rem; color: var(--text-muted);">Default</p>
              <ds-list variant="default" style="width: 200px;">
                <ds-list-item title="Item 1" />
                <ds-list-item title="Item 2" />
              </ds-list>
            </div>
            <div>
              <p style="margin-bottom: 0.5rem; color: var(--text-muted);">Divided</p>
              <ds-list variant="divided" style="width: 200px;">
                <ds-list-item title="Item 1" />
                <ds-list-item title="Item 2" />
              </ds-list>
            </div>
            <div>
              <p style="margin-bottom: 0.5rem; color: var(--text-muted);">Card</p>
              <ds-list variant="card" style="width: 200px;">
                <ds-list-item title="Item 1" />
                <ds-list-item title="Item 2" />
              </ds-list>
            </div>
          </div>
        </section>
      </div>
    `,
  }),
};
