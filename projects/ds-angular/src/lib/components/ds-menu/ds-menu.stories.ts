import type { Meta, StoryObj } from '@storybook/angular';
import { DsMenu, MenuItem } from './ds-menu';
import {
  faEdit,
  faTrash,
  faCopy,
  faDownload,
  faShare,
  faStar,
  faArchive,
  faPrint,
  faEnvelope,
  faLink,
} from '@fortawesome/free-solid-svg-icons';

const defaultItems: MenuItem[] = [
  { id: 'edit', label: 'Modifier', icon: faEdit },
  { id: 'copy', label: 'Copier', icon: faCopy },
  { id: 'delete', label: 'Supprimer', icon: faTrash },
];

const itemsWithDividers: MenuItem[] = [
  { id: 'edit', label: 'Modifier', icon: faEdit },
  { id: 'copy', label: 'Copier', icon: faCopy },
  { id: 'share', label: 'Partager', icon: faShare, dividerBefore: true },
  { id: 'download', label: 'Télécharger', icon: faDownload },
  { id: 'delete', label: 'Supprimer', icon: faTrash, dividerBefore: true },
];

const itemsWithDisabled: MenuItem[] = [
  { id: 'edit', label: 'Modifier', icon: faEdit },
  { id: 'copy', label: 'Copier', icon: faCopy },
  { id: 'archive', label: 'Archiver', icon: faArchive, disabled: true },
  { id: 'delete', label: 'Supprimer', icon: faTrash, disabled: true },
];

const meta: Meta<DsMenu> = {
  title: 'Components/Navigation/Menu',
  component: DsMenu,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du menu',
    },
    trigger: {
      control: 'select',
      options: ['click', 'contextmenu'],
      description: 'Événement déclencheur',
    },
    closeOnSelect: {
      control: 'boolean',
      description: 'Fermer après sélection',
    },
    ariaLabel: {
      control: 'text',
      description: 'Label ARIA',
    },
  },
};

export default meta;
type Story = StoryObj<DsMenu>;

// === DEFAULT ===

export const Default: Story = {
  render: () => ({
    props: {
      items: defaultItems,
      onItemSelected: (item: MenuItem) => console.log('Selected:', item),
    },
    template: `
      <ds-menu
        [items]="items"
        (itemSelected)="onItemSelected($event)"
      >
        <button dsMenuTrigger style="padding: 8px 16px; border-radius: 4px; border: 1px solid #ccc; cursor: pointer;">
          Ouvrir le menu
        </button>
      </ds-menu>
    `,
  }),
};

// === AVEC ICÔNES ===

export const WithIcons: Story = {
  render: () => ({
    props: {
      items: [
        { id: 'star', label: 'Ajouter aux favoris', icon: faStar },
        { id: 'share', label: 'Partager', icon: faShare },
        { id: 'print', label: 'Imprimer', icon: faPrint },
        { id: 'email', label: 'Envoyer par email', icon: faEnvelope },
        { id: 'link', label: 'Copier le lien', icon: faLink },
      ],
      onItemSelected: (item: MenuItem) => console.log('Selected:', item),
    },
    template: `
      <ds-menu
        [items]="items"
        ariaLabel="Actions document"
        (itemSelected)="onItemSelected($event)"
      >
        <button dsMenuTrigger style="padding: 8px 16px; border-radius: 4px; background: #7d4bc0; color: white; border: none; cursor: pointer;">
          Actions
        </button>
      </ds-menu>
    `,
  }),
};

// === AVEC SÉPARATEURS ===

export const WithDividers: Story = {
  render: () => ({
    props: {
      items: itemsWithDividers,
      onItemSelected: (item: MenuItem) => console.log('Selected:', item),
    },
    template: `
      <ds-menu
        [items]="items"
        (itemSelected)="onItemSelected($event)"
      >
        <button dsMenuTrigger style="padding: 8px 16px; border-radius: 4px; border: 1px solid #ccc; cursor: pointer;">
          Menu avec séparateurs
        </button>
      </ds-menu>
    `,
  }),
};

// === TOUTES LES TAILLES ===

export const AllSizes: Story = {
  render: () => ({
    props: {
      items: defaultItems,
    },
    template: `
      <div style="display: flex; gap: 24px; align-items: flex-start;">
        <div>
          <p style="margin-bottom: 8px; font-size: 12px; color: #666;">Small</p>
          <ds-menu [items]="items" size="sm">
            <button dsMenuTrigger style="padding: 6px 12px; font-size: 12px; border-radius: 4px; border: 1px solid #ccc; cursor: pointer;">
              Menu SM
            </button>
          </ds-menu>
        </div>
        <div>
          <p style="margin-bottom: 8px; font-size: 12px; color: #666;">Medium (défaut)</p>
          <ds-menu [items]="items" size="md">
            <button dsMenuTrigger style="padding: 8px 16px; border-radius: 4px; border: 1px solid #ccc; cursor: pointer;">
              Menu MD
            </button>
          </ds-menu>
        </div>
        <div>
          <p style="margin-bottom: 8px; font-size: 12px; color: #666;">Large</p>
          <ds-menu [items]="items" size="lg">
            <button dsMenuTrigger style="padding: 10px 20px; font-size: 16px; border-radius: 4px; border: 1px solid #ccc; cursor: pointer;">
              Menu LG
            </button>
          </ds-menu>
        </div>
      </div>
    `,
  }),
};

// === ITEMS DÉSACTIVÉS ===

export const DisabledItems: Story = {
  render: () => ({
    props: {
      items: itemsWithDisabled,
      onItemSelected: (item: MenuItem) => console.log('Selected:', item),
    },
    template: `
      <ds-menu
        [items]="items"
        (itemSelected)="onItemSelected($event)"
      >
        <button dsMenuTrigger style="padding: 8px 16px; border-radius: 4px; border: 1px solid #ccc; cursor: pointer;">
          Menu avec items désactivés
        </button>
      </ds-menu>
    `,
  }),
};

// === DÉCLENCHEMENT PAR CLIC DROIT ===

export const ContextMenuTrigger: Story = {
  render: () => ({
    props: {
      items: defaultItems,
      onItemSelected: (item: MenuItem) => console.log('Selected:', item),
    },
    template: `
      <div style="padding: 40px; border: 2px dashed #ccc; border-radius: 8px; text-align: center;">
        <ds-menu
          [items]="items"
          trigger="contextmenu"
          (itemSelected)="onItemSelected($event)"
        >
          <div dsMenuTrigger style="padding: 20px; background: #f5f5f5; border-radius: 4px; cursor: context-menu;">
            <p style="margin: 0; color: #666;">Clic droit pour ouvrir le menu contextuel</p>
          </div>
        </ds-menu>
      </div>
    `,
  }),
};

// === NAVIGATION CLAVIER (DOCUMENTATION) ===

export const KeyboardNavigation: Story = {
  render: () => ({
    props: {
      items: itemsWithDividers,
    },
    template: `
      <div style="display: flex; gap: 40px;">
        <ds-menu
          [items]="items"
          ariaLabel="Menu de démonstration clavier"
        >
          <button dsMenuTrigger style="padding: 8px 16px; border-radius: 4px; border: 1px solid #ccc; cursor: pointer;">
            Ouvrir le menu (utiliser les flèches)
          </button>
        </ds-menu>

        <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; font-size: 14px;">
          <p style="margin: 0 0 8px; font-weight: 600;">Raccourcis clavier :</p>
          <ul style="margin: 0; padding-left: 20px; color: #666;">
            <li><kbd>↓</kbd> / <kbd>↑</kbd> : Naviguer entre les items</li>
            <li><kbd>Home</kbd> : Premier item</li>
            <li><kbd>End</kbd> : Dernier item</li>
            <li><kbd>Enter</kbd> / <kbd>Space</kbd> : Sélectionner</li>
            <li><kbd>Escape</kbd> : Fermer le menu</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

// === THEMED (LIGHT/DARK) ===

export const Themed: Story = {
  render: () => ({
    props: {
      items: defaultItems,
    },
    template: `
      <div style="display: flex; gap: 32px;">
        <div class="theme-light" style="padding: 24px; background: #fafafa; border-radius: 8px;">
          <p style="margin-bottom: 12px; font-weight: 600;">Light Theme</p>
          <ds-menu [items]="items">
            <button dsMenuTrigger style="padding: 8px 16px; border-radius: 4px; border: 1px solid #ccc; cursor: pointer;">
              Menu Light
            </button>
          </ds-menu>
        </div>
        <div class="theme-dark" style="padding: 24px; background: #171717; border-radius: 8px;">
          <p style="margin-bottom: 12px; font-weight: 600; color: #fafafa;">Dark Theme</p>
          <ds-menu [items]="items">
            <button dsMenuTrigger style="padding: 8px 16px; border-radius: 4px; background: #333; color: white; border: 1px solid #555; cursor: pointer;">
              Menu Dark
            </button>
          </ds-menu>
        </div>
      </div>
    `,
  }),
};

export const Accessibility: Story = {
  render: () => ({
    props: {
      items: itemsWithDividers,
    },
    template: `
      <ds-menu [items]="items" ariaLabel="Menu accessible">
        <button dsMenuTrigger style="padding: 8px 16px; border-radius: 4px; border: 1px solid #ccc; cursor: pointer;">
          Ouvrir le menu
        </button>
      </ds-menu>
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
| Enter/Space | Ouvre le menu |
| Arrow Up/Down | Navigue dans les items |
| Home/End | Premier/dernier item |
| Escape | Ferme le menu |

### Attributs ARIA
- \`role="menu"\`: Identifie le menu
- \`role="menuitem"\`: Chaque item
- \`aria-disabled\`: Items désactivés
- \`aria-label\`: Décrit le menu

### Bonnes pratiques
- Trigger click ou contextmenu
- Navigation fluide au clavier
- Items avec icônes et dividers
        `,
      },
    },
  },
};
