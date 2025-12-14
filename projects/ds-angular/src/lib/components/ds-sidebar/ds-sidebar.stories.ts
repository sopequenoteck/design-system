import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RouterTestingModule } from '@angular/router/testing';
import {
  faHome,
  faCog,
  faUsers,
  faChartBar,
  faBell,
  faInbox,
  faCalendar,
  faFolder,
  faFile,
  faHeart,
  faShoppingCart,
  faCreditCard,
  faTruck,
  faHeadphones,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';
import { DsSidebar } from './ds-sidebar';
import { SidebarItem } from './ds-sidebar.types';

const meta: Meta<DsSidebar> = {
  title: 'Components/Navigation/DsSidebar',
  component: DsSidebar,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## DsSidebar

Composant de navigation verticale avec support multi-niveaux, modes responsive et intégration Router Angular.

### Modes
- **full** : Largeur complète avec labels visibles
- **collapsed** : Icônes uniquement avec tooltips
- **overlay** : Panneau glissant avec backdrop (mobile)

### Fonctionnalités
- Navigation hiérarchique multi-niveaux
- Icônes FontAwesome
- Badges/compteurs
- Dividers entre sections
- Intégration Router Angular
- Navigation clavier complète
- ARIA WCAG 2.1 AA
        `,
      },
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['full', 'collapsed', 'overlay'],
      description: 'Mode d\'affichage de la sidebar',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille (largeur) de la sidebar',
    },
    position: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position de la sidebar',
    },
    collapsible: {
      control: 'boolean',
      description: 'Permet le toggle entre full et collapsed',
    },
    ariaLabel: {
      control: 'text',
      description: 'Label ARIA pour l\'accessibilité',
    },
    responsiveBreakpoint: {
      control: 'number',
      description: 'Breakpoint pour le mode responsive (px)',
    },
    autoCollapseOnMobile: {
      control: 'boolean',
      description: 'Active le switch automatique vers overlay sur mobile',
    },
  },
};

export default meta;
type Story = StoryObj<DsSidebar>;

// Sample data
const basicItems: SidebarItem[] = [
  { id: '1', label: 'Dashboard', icon: faHome, routerLink: '/dashboard' },
  { id: '2', label: 'Inbox', icon: faInbox, routerLink: '/inbox', badge: 12, badgeVariant: 'primary' },
  { id: '3', label: 'Calendar', icon: faCalendar, routerLink: '/calendar' },
  { id: '4', label: 'Analytics', icon: faChartBar, routerLink: '/analytics', dividerAfter: true },
  { id: '5', label: 'Settings', icon: faCog, routerLink: '/settings' },
];

const hierarchicalItems: SidebarItem[] = [
  { id: '1', label: 'Dashboard', icon: faHome, routerLink: '/dashboard' },
  {
    id: '2',
    label: 'Users',
    icon: faUsers,
    expanded: true,
    children: [
      { id: '2-1', label: 'All Users', routerLink: '/users' },
      { id: '2-2', label: 'Roles & Permissions', routerLink: '/users/roles' },
      { id: '2-3', label: 'Teams', routerLink: '/users/teams' },
    ],
  },
  {
    id: '3',
    label: 'Documents',
    icon: faFolder,
    children: [
      { id: '3-1', label: 'Recent', routerLink: '/docs/recent' },
      { id: '3-2', label: 'Shared with me', routerLink: '/docs/shared' },
      {
        id: '3-3',
        label: 'Projects',
        children: [
          { id: '3-3-1', label: 'Project A', routerLink: '/docs/projects/a' },
          { id: '3-3-2', label: 'Project B', routerLink: '/docs/projects/b' },
        ],
      },
    ],
  },
  { id: '4', label: 'Reports', icon: faFile, routerLink: '/reports', dividerAfter: true },
  { id: '5', label: 'Settings', icon: faCog, routerLink: '/settings' },
];

const ecommerceItems: SidebarItem[] = [
  { id: '1', label: 'Overview', icon: faHome, routerLink: '/overview' },
  {
    id: '2',
    label: 'Products',
    icon: faShoppingCart,
    badge: 'NEW',
    badgeVariant: 'success',
    children: [
      { id: '2-1', label: 'All Products', routerLink: '/products' },
      { id: '2-2', label: 'Categories', routerLink: '/products/categories' },
      { id: '2-3', label: 'Inventory', routerLink: '/products/inventory', badge: 3, badgeVariant: 'warning' },
    ],
  },
  {
    id: '3',
    label: 'Orders',
    icon: faTruck,
    badge: 24,
    badgeVariant: 'error',
    children: [
      { id: '3-1', label: 'Pending', routerLink: '/orders/pending', badge: 18, badgeVariant: 'error' },
      { id: '3-2', label: 'Processing', routerLink: '/orders/processing', badge: 6, badgeVariant: 'warning' },
      { id: '3-3', label: 'Completed', routerLink: '/orders/completed' },
    ],
  },
  { id: '4', label: 'Payments', icon: faCreditCard, routerLink: '/payments', dividerAfter: true },
  { id: '5', label: 'Customers', icon: faUsers, routerLink: '/customers' },
  { id: '6', label: 'Support', icon: faHeadphones, routerLink: '/support' },
];

const itemsWithExternal: SidebarItem[] = [
  { id: '1', label: 'Dashboard', icon: faHome, routerLink: '/dashboard' },
  { id: '2', label: 'Analytics', icon: faChartBar, routerLink: '/analytics', dividerAfter: true },
  { id: '3', label: 'Documentation', icon: faFile, href: 'https://docs.example.com', external: true },
  { id: '4', label: 'Support', icon: faHeadphones, href: 'https://support.example.com', external: true },
  { id: '5', label: 'GitHub', icon: faExternalLinkAlt, href: 'https://github.com', external: true },
];

const disabledItems: SidebarItem[] = [
  { id: '1', label: 'Dashboard', icon: faHome, routerLink: '/dashboard' },
  { id: '2', label: 'Analytics', icon: faChartBar, routerLink: '/analytics' },
  { id: '3', label: 'Reports', icon: faFile, routerLink: '/reports', disabled: true },
  { id: '4', label: 'Settings', icon: faCog, routerLink: '/settings', disabled: true },
  { id: '5', label: 'Notifications', icon: faBell, routerLink: '/notifications' },
];

// Stories
export const Default: Story = {
  args: {
    items: basicItems,
    mode: 'full',
    size: 'md',
    position: 'left',
    collapsible: true,
    ariaLabel: 'Navigation principale',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; height: 100vh;">
        <ds-sidebar
          [items]="items"
          [mode]="mode"
          [size]="size"
          [position]="position"
          [collapsible]="collapsible"
          [ariaLabel]="ariaLabel">
        </ds-sidebar>
        <div style="flex: 1; padding: 2rem; background: var(--background-main);">
          <h1 style="color: var(--text-default);">Contenu principal</h1>
          <p style="color: var(--text-muted);">
            La sidebar est en mode <strong>{{ mode }}</strong>, taille <strong>{{ size }}</strong>.
          </p>
        </div>
      </div>
    `,
  }),
};

export const Collapsed: Story = {
  args: {
    ...Default.args,
    mode: 'collapsed',
  },
  render: Default.render,
};

export const Overlay: Story = {
  args: {
    ...Default.args,
    mode: 'overlay',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 100vh; background: var(--background-main); padding: 2rem;">
        <ds-sidebar
          [items]="items"
          [mode]="mode"
          [size]="size"
          [position]="position"
          [collapsible]="collapsible"
          [ariaLabel]="ariaLabel">
        </ds-sidebar>
        <div style="max-width: 800px; margin: 0 auto;">
          <h1 style="color: var(--text-default);">Mode Overlay</h1>
          <p style="color: var(--text-muted);">
            Cliquez sur le bouton hamburger pour ouvrir la sidebar en mode overlay.
            Ce mode est idéal pour les écrans mobiles.
          </p>
        </div>
      </div>
    `,
  }),
};

export const WithBadges: Story = {
  args: {
    items: ecommerceItems,
    mode: 'full',
    size: 'md',
    position: 'left',
    collapsible: true,
  },
  render: Default.render,
  parameters: {
    docs: {
      description: {
        story: 'Sidebar avec badges/compteurs sur les items. Les badges supportent différentes couleurs via `badgeVariant`.',
      },
    },
  },
};

export const Hierarchical: Story = {
  args: {
    items: hierarchicalItems,
    mode: 'full',
    size: 'md',
    position: 'left',
    collapsible: true,
  },
  render: Default.render,
  parameters: {
    docs: {
      description: {
        story: 'Navigation hiérarchique avec plusieurs niveaux d\'imbrication. Cliquez sur les chevrons pour expand/collapse.',
      },
    },
  },
};

export const ExternalLinks: Story = {
  args: {
    items: itemsWithExternal,
    mode: 'full',
    size: 'md',
    position: 'left',
    collapsible: true,
  },
  render: Default.render,
  parameters: {
    docs: {
      description: {
        story: 'Items avec liens externes (href). Une icône indique qu\'ils s\'ouvrent dans un nouvel onglet.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => ({
    props: {
      items: basicItems,
    },
    template: `
      <div style="display: flex; gap: 1rem; height: 100vh;">
        <ds-sidebar [items]="items" size="sm" [collapsible]="false">
        </ds-sidebar>
        <ds-sidebar [items]="items" size="md" [collapsible]="false">
        </ds-sidebar>
        <ds-sidebar [items]="items" size="lg" [collapsible]="false">
        </ds-sidebar>
        <div style="flex: 1; padding: 2rem; background: var(--background-main);">
          <h1 style="color: var(--text-default);">Comparaison des tailles</h1>
          <p style="color: var(--text-muted);">
            De gauche à droite : <strong>sm</strong> (200px), <strong>md</strong> (240px), <strong>lg</strong> (280px).
          </p>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Comparaison des trois tailles disponibles.',
      },
    },
  },
};

export const RightPosition: Story = {
  args: {
    items: basicItems,
    mode: 'full',
    size: 'md',
    position: 'right',
    collapsible: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; height: 100vh;">
        <div style="flex: 1; padding: 2rem; background: var(--background-main);">
          <h1 style="color: var(--text-default);">Position droite</h1>
          <p style="color: var(--text-muted);">
            La sidebar peut être positionnée à droite de l'écran.
          </p>
        </div>
        <ds-sidebar
          [items]="items"
          [mode]="mode"
          [size]="size"
          [position]="position"
          [collapsible]="collapsible">
        </ds-sidebar>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    items: disabledItems,
    mode: 'full',
    size: 'md',
    position: 'left',
    collapsible: true,
  },
  render: Default.render,
  parameters: {
    docs: {
      description: {
        story: 'Items désactivés. Ils sont visuellement estompés et non cliquables.',
      },
    },
  },
};

export const WithDividers: Story = {
  args: {
    items: [
      { id: '1', label: 'Home', icon: faHome, routerLink: '/home' },
      { id: '2', label: 'Dashboard', icon: faChartBar, routerLink: '/dashboard', dividerAfter: true },
      { id: '3', label: 'Profile', icon: faUsers, routerLink: '/profile' },
      { id: '4', label: 'Notifications', icon: faBell, routerLink: '/notifications' },
      { id: '5', label: 'Messages', icon: faInbox, routerLink: '/messages', dividerAfter: true },
      { id: '6', label: 'Settings', icon: faCog, routerLink: '/settings' },
      { id: '7', label: 'Help', icon: faHeadphones, routerLink: '/help' },
    ],
    mode: 'full',
    size: 'md',
    position: 'left',
    collapsible: true,
  },
  render: Default.render,
  parameters: {
    docs: {
      description: {
        story: 'Utilisation de `dividerAfter: true` pour créer des sections visuelles.',
      },
    },
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    items: basicItems,
    mode: 'full',
    size: 'md',
    position: 'left',
    collapsible: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; height: 100vh;">
        <ds-sidebar
          [items]="items"
          [mode]="mode"
          [size]="size"
          [position]="position"
          [collapsible]="collapsible">
          <div sidebar-header style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.5rem;">🚀</span>
            <strong style="font-size: 1.125rem; color: var(--text-default);">MyApp</strong>
          </div>
          <div sidebar-footer>
            <button style="width: 100%; padding: 0.75rem 1rem; border: none; border-radius: 6px; background: var(--sidebar-item-hover-bg); color: var(--sidebar-text); cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
              <span>👤</span>
              <span>John Doe</span>
            </button>
          </div>
        </ds-sidebar>
        <div style="flex: 1; padding: 2rem; background: var(--background-main);">
          <h1 style="color: var(--text-default);">Header & Footer personnalisés</h1>
          <p style="color: var(--text-muted);">
            Utilisez les slots <code>sidebar-header</code> et <code>sidebar-footer</code> pour du contenu personnalisé.
          </p>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Personnalisation du header et footer via content projection.',
      },
    },
  },
};

export const Responsive: Story = {
  args: {
    items: ecommerceItems,
    mode: 'full',
    size: 'md',
    position: 'left',
    collapsible: true,
    autoCollapseOnMobile: true,
    responsiveBreakpoint: 768,
  },
  render: Default.render,
  parameters: {
    docs: {
      description: {
        story: 'Avec `autoCollapseOnMobile: true`, la sidebar passe automatiquement en mode overlay sous le breakpoint spécifié.',
      },
    },
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};

export const Themed: Story = {
  render: () => ({
    props: {
      items: ecommerceItems,
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); height: 100vh;">
        <div class="theme-light" style="background: var(--background-main);">
          <ds-sidebar [items]="items" [collapsible]="false">
            <div sidebar-header>
              <strong style="color: var(--text-default);">Light</strong>
            </div>
          </ds-sidebar>
        </div>
        <div class="theme-dark" style="background: var(--background-main);">
          <ds-sidebar [items]="items" [collapsible]="false">
            <div sidebar-header>
              <strong style="color: var(--text-default);">Dark</strong>
            </div>
          </ds-sidebar>
        </div>
        <div class="theme-custom" style="background: var(--background-main);">
          <ds-sidebar [items]="items" [collapsible]="false">
            <div sidebar-header>
              <strong style="color: var(--text-default);">Custom</strong>
            </div>
          </ds-sidebar>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'La sidebar s\'adapte automatiquement aux trois thèmes : Light, Dark et Custom.',
      },
    },
  },
};
