import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DsEmpty } from './ds-empty';
import { DsButton } from '../ds-button/ds-button';
import {
  faInbox,
  faSearch,
  faFileAlt,
  faFolderOpen,
  faShoppingCart,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

const meta: Meta<DsEmpty> = {
  title: 'Feedback/DsEmpty',
  component: DsEmpty,
  parameters: {
    docs: {
      description: {
        component: `
**DsEmpty** est un composant d'état vide standardisé permettant d'afficher un message informatif lorsqu'aucune donnée n'est disponible (liste vide, résultats de recherche nuls, panier vide, etc.).

### Caractéristiques principales
- Icône FontAwesome ou image personnalisée (SVG/PNG)
- Titre et description configurables
- Tailles multiples (sm, md, lg) pour s'adapter au contexte
- Slot de contenu pour boutons d'action ou CTA personnalisés
- Support thèmes light/dark/custom

### Utilisation
\`\`\`html
<ds-empty
  title="Aucun résultat"
  description="Essayez de modifier vos filtres"
  [icon]="faSearch"
  size="md">
  <button ds-button variant="primary" (click)="resetFilters()">Réinitialiser</button>
  <button ds-button variant="ghost" (click)="clearSearch()">Effacer</button>
</ds-empty>
\`\`\`

### Cas d'usage courants
- Liste vide ou tableau sans données
- Résultats de recherche nuls
- Panier vide
- Boîte de réception vide
- Dossiers sans fichiers
        `,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [DsEmpty, DsButton],
    }),
  ],
  argTypes: {
    title: {
      control: 'text',
      description: 'Titre principal de l\'état vide',
    },
    description: {
      control: 'text',
      description: 'Description complémentaire optionnelle',
    },
    icon: {
      control: false,
      description: 'Icône FontAwesome à afficher',
    },
    imageUrl: {
      control: 'text',
      description: 'URL d\'une image personnalisée (SVG ou PNG)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du composant',
    },
  },
};

export default meta;
type Story = StoryObj<DsEmpty>;

/**
 * État par défaut avec icône inbox.
 */
export const Default: Story = {
  args: {
    title: 'Aucune donnée',
    description: '',
    icon: faInbox,
    imageUrl: '',
    size: 'md',
  },
};

/**
 * État vide avec description complète.
 */
export const WithDescription: Story = {
  args: {
    title: 'Aucun résultat trouvé',
    description: 'Essayez de modifier vos critères de recherche ou de filtrer différemment.',
    icon: faSearch,
    size: 'md',
  },
};

/**
 * État vide avec bouton d'action.
 */
export const WithAction: Story = {
  args: {
    title: 'Votre panier est vide',
    description: 'Ajoutez des articles pour commencer vos achats.',
    icon: faShoppingCart,
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-empty
        [title]="title"
        [description]="description"
        [icon]="icon"
        [size]="size">
        <button ds-button variant="primary">Commencer mes achats</button>
      </ds-empty>
    `,
  }),
};

/**
 * État vide avec plusieurs actions.
 */
export const WithMultipleActions: Story = {
  args: {
    title: 'Aucun document',
    description: 'Téléchargez un fichier ou créez un nouveau document pour commencer.',
    icon: faFileAlt,
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-empty
        [title]="title"
        [description]="description"
        [icon]="icon"
        [size]="size">
        <button ds-button variant="primary">Télécharger</button>
        <button ds-button variant="ghost">Créer nouveau</button>
      </ds-empty>
    `,
  }),
};

/**
 * Taille small (compacte).
 */
export const SizeSmall: Story = {
  args: {
    title: 'Aucun élément',
    description: 'La liste est actuellement vide.',
    icon: faFolderOpen,
    size: 'sm',
  },
};

/**
 * Taille large (spacieuse).
 */
export const SizeLarge: Story = {
  args: {
    title: 'Aucun utilisateur',
    description: 'Invitez des utilisateurs pour collaborer sur ce projet.',
    icon: faUsers,
    size: 'lg',
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-empty
        [title]="title"
        [description]="description"
        [icon]="icon"
        [size]="size">
        <button ds-button variant="primary" size="lg">Inviter des utilisateurs</button>
      </ds-empty>
    `,
  }),
};

/**
 * Avec image personnalisée (illustration SVG).
 */
export const WithCustomImage: Story = {
  args: {
    title: 'Bienvenue !',
    description: 'Commencez par créer votre premier projet.',
    imageUrl: 'https://via.placeholder.com/200x200/e5e7eb/6b7280?text=Illustration',
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-empty
        [title]="title"
        [description]="description"
        [imageUrl]="imageUrl"
        [size]="size">
        <button ds-button variant="primary">Créer un projet</button>
      </ds-empty>
    `,
  }),
};

/**
 * Différentes icônes contextuelles.
 */
export const DifferentIcons: Story = {
  render: () => ({
    props: {
      faInbox,
      faSearch,
      faFileAlt,
      faShoppingCart,
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;">
        <ds-empty
          title="Boîte de réception vide"
          description="Vous n'avez aucun message"
          [icon]="faInbox"
          size="sm" />

        <ds-empty
          title="Aucun résultat"
          description="Affinez votre recherche"
          [icon]="faSearch"
          size="sm" />

        <ds-empty
          title="Aucun document"
          description="Téléchargez un fichier"
          [icon]="faFileAlt"
          size="sm" />

        <ds-empty
          title="Panier vide"
          description="Ajoutez des articles"
          [icon]="faShoppingCart"
          size="sm" />
      </div>
    `,
  }),
};

/**
 * États vides dans un contexte de tableau.
 */
export const InTableContext: Story = {
  render: () => ({
    props: { faSearch },
    template: `
      <div style="border: 1px solid var(--border-default); border-radius: var(--radius-2); padding: var(--space-4);">
        <ds-empty
          title="Aucun résultat"
          description="Aucun élément ne correspond à vos critères de recherche."
          [icon]="faSearch"
          size="sm">
          <button ds-button variant="ghost" size="sm">Réinitialiser les filtres</button>
        </ds-empty>
      </div>
    `,
  }),
};

/**
 * Affichage des 3 tailles côte à côte.
 */
export const AllSizes: Story = {
  render: () => ({
    props: { faInbox },
    template: `
      <div style="display: flex; gap: 2rem; align-items: start;">
        <div style="flex: 1; border: 1px solid var(--border-default); padding: var(--space-4);">
          <ds-empty
            title="Small"
            description="Taille compacte"
            [icon]="faInbox"
            size="sm" />
        </div>

        <div style="flex: 1; border: 1px solid var(--border-default); padding: var(--space-4);">
          <ds-empty
            title="Medium"
            description="Taille par défaut"
            [icon]="faInbox"
            size="md" />
        </div>

        <div style="flex: 1; border: 1px solid var(--border-default); padding: var(--space-4);">
          <ds-empty
            title="Large"
            description="Taille spacieuse"
            [icon]="faInbox"
            size="lg" />
        </div>
      </div>
    `,
  }),
};

/**
 * Variantes d'illustrations (icône vs image personnalisée)
 */
export const IllustrationVariants: Story = {
  render: () => ({
    props: { faInbox, faSearch },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;">
        <!-- Icône FontAwesome -->
        <div>
          <h4 style="margin-bottom: 1rem; text-align: center;">Icône FontAwesome</h4>
          <ds-empty
            title="Aucun message"
            description="Votre boîte de réception est vide"
            [icon]="faInbox"
            size="md" />
        </div>

        <!-- Image SVG personnalisée -->
        <div>
          <h4 style="margin-bottom: 1rem; text-align: center;">Image SVG personnalisée</h4>
          <ds-empty
            title="Aucun résultat"
            description="Essayez une autre recherche"
            imageUrl="https://via.placeholder.com/200x200/e5e7eb/6b7280?text=SVG+Illustration"
            size="md" />
        </div>

        <!-- Icône grande taille -->
        <div>
          <h4 style="margin-bottom: 1rem; text-align: center;">Icône grande taille</h4>
          <ds-empty
            title="Aucun document"
            description="Téléchargez vos fichiers"
            [icon]="faSearch"
            size="lg" />
        </div>

        <!-- Image PNG personnalisée -->
        <div>
          <h4 style="margin-bottom: 1rem; text-align: center;">Image PNG personnalisée</h4>
          <ds-empty
            title="Bienvenue"
            description="Commencez par créer votre premier projet"
            imageUrl="https://via.placeholder.com/250x250/f3f4f6/9ca3af?text=Custom+PNG"
            size="lg">
            <button ds-button variant="primary">Créer un projet</button>
          </ds-empty>
        </div>
      </div>
    `,
  }),
};

/**
 * Test des 3 thèmes (Light/Dark/Custom) côte à côte.
 */
export const Themed: Story = {
  render: () => ({
    props: { faInbox },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
        <div class="theme-light" style="padding: var(--space-6); background: var(--background-main); border: 1px solid var(--border-default); border-radius: var(--radius-2);">
          <h4 style="margin: 0 0 var(--space-4); text-align: center; color: var(--text-default);">Light Theme</h4>
          <ds-empty
            title="Aucune donnée"
            description="État vide en mode clair"
            [icon]="faInbox"
            size="sm">
            <button ds-button variant="primary" size="sm">Action</button>
          </ds-empty>
        </div>

        <div class="theme-dark" style="padding: var(--space-6); background: var(--background-main); border: 1px solid var(--border-default); border-radius: var(--radius-2);">
          <h4 style="margin: 0 0 var(--space-4); text-align: center; color: var(--text-default);">Dark Theme</h4>
          <ds-empty
            title="Aucune donnée"
            description="État vide en mode sombre"
            [icon]="faInbox"
            size="sm">
            <button ds-button variant="primary" size="sm">Action</button>
          </ds-empty>
        </div>

        <div class="theme-custom" style="padding: var(--space-6); background: var(--background-main); border: 1px solid var(--border-default); border-radius: var(--radius-2);">
          <h4 style="margin: 0 0 var(--space-4); text-align: center; color: var(--text-default);">Custom Theme</h4>
          <ds-empty
            title="Aucune donnée"
            description="État vide en thème personnalisé"
            [icon]="faInbox"
            size="sm">
            <button ds-button variant="primary" size="sm">Action</button>
          </ds-empty>
        </div>
      </div>
    `,
  }),
};
