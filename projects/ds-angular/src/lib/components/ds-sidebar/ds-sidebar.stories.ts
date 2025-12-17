import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { within, expect, userEvent } from '@storybook/test';
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
  faShoppingCart,
  faCreditCard,
  faTruck,
  faHeadphones,
  faExternalLinkAlt,
  faKeyboard,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { DsSidebar } from './ds-sidebar';
import { SidebarItem } from './ds-sidebar.types';

const meta: Meta<DsSidebar> = {
  title: 'Components/Navigation/Sidebar',
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

Composant de navigation verticale moderne avec support multi-niveaux, modes responsive et intégration Router Angular.

### Quand utiliser ?

| Situation | Recommandation |
|-----------|----------------|
| Navigation principale app | \`mode="full"\` avec \`collapsible\` |
| Dashboard admin | \`mode="full"\` avec hiérarchie |
| Application mobile | \`mode="overlay"\` avec \`autoCollapseOnMobile\` |
| Interface compacte | \`mode="collapsed"\` (icônes seules) |

### Modes d'affichage

| Mode | Description | Cas d'usage |
|------|-------------|-------------|
| \`full\` | Largeur complète, labels visibles | Desktop, navigation principale |
| \`collapsed\` | Icônes uniquement, tooltips au hover | Gagner de l'espace, mode compact |
| \`overlay\` | Panneau glissant avec backdrop | Mobile, tablette, menus temporaires |

### Fonctionnalités clés
- **Navigation hiérarchique** : Niveaux illimités avec expand/collapse
- **Badges** : 6 variantes (default, primary, success, warning, error, info)
- **Items désactivés** : État \`disabled\` pour items non accessibles
- **Dividers** : Séparation visuelle entre sections
- **Content projection** : Header et footer personnalisables
- **Responsive** : Auto-collapse sous breakpoint configurable
- **Navigation clavier** : ArrowUp/Down, Home/End, Enter, Escape
- **ARIA complet** : WCAG 2.1 AA, rôles navigation/menu
        `,
      },
    },
  },
  argTypes: {
    items: {
      description: 'Liste des items de navigation (SidebarItem[])',
      table: {
        type: { summary: 'SidebarItem[]' },
        category: 'Data',
      },
    },
    mode: {
      control: 'select',
      options: ['full', 'collapsed', 'overlay'],
      description: 'Mode d\'affichage de la sidebar',
      table: {
        type: { summary: "'full' | 'collapsed' | 'overlay'" },
        defaultValue: { summary: 'full' },
        category: 'Appearance',
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille (largeur) : sm=200px, md=240px, lg=280px',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' },
        category: 'Appearance',
      },
    },
    position: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position de la sidebar dans le layout',
      table: {
        type: { summary: "'left' | 'right'" },
        defaultValue: { summary: 'left' },
        category: 'Appearance',
      },
    },
    collapsible: {
      control: 'boolean',
      description: 'Affiche le bouton toggle full/collapsed',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Behavior',
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Label ARIA pour l\'accessibilité (lecteurs d\'écran)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Navigation' },
        category: 'Accessibility',
      },
    },
    responsiveBreakpoint: {
      control: 'number',
      description: 'Breakpoint (px) pour switch automatique vers overlay',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '768' },
        category: 'Responsive',
      },
    },
    autoCollapseOnMobile: {
      control: 'boolean',
      description: 'Active le switch automatique vers overlay sous le breakpoint',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Responsive',
      },
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

// ============================================================================
// STORIES AVEC TESTS D'INTERACTION
// ============================================================================

/**
 * Story avec test d'interaction automatisé.
 * Vérifie le comportement de navigation et d'expansion des items.
 */
export const WithInteractionTest: Story = {
  args: {
    items: hierarchicalItems,
    mode: 'full',
    size: 'md',
    position: 'left',
    collapsible: true,
  },
  render: Default.render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Vérifier que la sidebar est rendue
    const sidebar = canvasElement.querySelector('ds-sidebar');
    await expect(sidebar).toBeInTheDocument();

    // Vérifier que les items sont présents
    const dashboardItem = canvas.getByText('Dashboard');
    await expect(dashboardItem).toBeInTheDocument();

    // Cliquer sur un item avec enfants pour expand
    const usersItem = canvas.getByText('Users');
    await userEvent.click(usersItem);

    // Vérifier que les enfants sont visibles (Users est déjà expanded par défaut)
    const allUsersItem = canvas.getByText('All Users');
    await expect(allUsersItem).toBeInTheDocument();

    // Tester le collapse du groupe Documents
    const documentsItem = canvas.getByText('Documents');
    await userEvent.click(documentsItem);

    // Attendre un peu pour l'animation
    await new Promise(resolve => setTimeout(resolve, 300));

    // Vérifier que Recent est maintenant visible
    const recentItem = canvas.getByText('Recent');
    await expect(recentItem).toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: `
**Test d'interaction automatisé**

Cette story inclut un \`play\` function qui teste automatiquement :
1. Le rendu initial de la sidebar
2. La présence des items de navigation
3. L'expansion/collapse des groupes hiérarchiques
4. La visibilité des items enfants après expansion

\`\`\`typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const usersItem = canvas.getByText('Users');
  await userEvent.click(usersItem);
  // ...
}
\`\`\`
        `,
      },
    },
  },
};

/**
 * Démonstration de l'accessibilité et navigation clavier.
 */
export const Accessibility: Story = {
  args: {
    items: [
      { id: '1', label: 'Accueil', icon: faHome, routerLink: '/home' },
      { id: '2', label: 'Tableau de bord', icon: faChartBar, routerLink: '/dashboard' },
      { id: '3', label: 'Utilisateurs', icon: faUsers, routerLink: '/users' },
      { id: '4', label: 'Paramètres', icon: faCog, routerLink: '/settings' },
      { id: '5', label: 'Aide', icon: faKeyboard, routerLink: '/help' },
    ],
    mode: 'full',
    size: 'md',
    position: 'left',
    collapsible: true,
    ariaLabel: 'Menu principal',
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
          <h1 style="color: var(--text-default); margin-bottom: 1rem;">Accessibilité WCAG 2.1 AA</h1>

          <div style="background: var(--background-secondary); border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem;">
            <h2 style="color: var(--text-default); font-size: 1.125rem; margin-bottom: 1rem;">Navigation clavier</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 0.875rem;">
              <thead>
                <tr style="border-bottom: 1px solid var(--border-default);">
                  <th style="text-align: left; padding: 0.5rem; color: var(--text-muted);">Touche</th>
                  <th style="text-align: left; padding: 0.5rem; color: var(--text-muted);">Action</th>
                </tr>
              </thead>
              <tbody style="color: var(--text-default);">
                <tr><td style="padding: 0.5rem;"><kbd style="background: var(--background-main); padding: 2px 6px; border-radius: 4px; font-family: monospace;">Tab</kbd></td><td style="padding: 0.5rem;">Entrer dans la sidebar / Passer au suivant</td></tr>
                <tr><td style="padding: 0.5rem;"><kbd style="background: var(--background-main); padding: 2px 6px; border-radius: 4px; font-family: monospace;">↑</kbd> <kbd style="background: var(--background-main); padding: 2px 6px; border-radius: 4px; font-family: monospace;">↓</kbd></td><td style="padding: 0.5rem;">Naviguer entre les items</td></tr>
                <tr><td style="padding: 0.5rem;"><kbd style="background: var(--background-main); padding: 2px 6px; border-radius: 4px; font-family: monospace;">Home</kbd></td><td style="padding: 0.5rem;">Aller au premier item</td></tr>
                <tr><td style="padding: 0.5rem;"><kbd style="background: var(--background-main); padding: 2px 6px; border-radius: 4px; font-family: monospace;">End</kbd></td><td style="padding: 0.5rem;">Aller au dernier item</td></tr>
                <tr><td style="padding: 0.5rem;"><kbd style="background: var(--background-main); padding: 2px 6px; border-radius: 4px; font-family: monospace;">Enter</kbd></td><td style="padding: 0.5rem;">Activer l'item / Expand-collapse groupe</td></tr>
                <tr><td style="padding: 0.5rem;"><kbd style="background: var(--background-main); padding: 2px 6px; border-radius: 4px; font-family: monospace;">Escape</kbd></td><td style="padding: 0.5rem;">Fermer overlay (mode overlay)</td></tr>
              </tbody>
            </table>
          </div>

          <div style="background: var(--background-secondary); border-radius: 8px; padding: 1.5rem;">
            <h2 style="color: var(--text-default); font-size: 1.125rem; margin-bottom: 1rem;">Attributs ARIA</h2>
            <ul style="color: var(--text-default); font-size: 0.875rem; line-height: 1.8; padding-left: 1.5rem;">
              <li><code>role="navigation"</code> sur le conteneur principal</li>
              <li><code>aria-label</code> personnalisable (ici: "Menu principal")</li>
              <li><code>role="menuitem"</code> sur chaque item</li>
              <li><code>aria-expanded</code> sur les groupes avec enfants</li>
              <li><code>aria-current="page"</code> sur l'item actif</li>
              <li><code>aria-disabled</code> sur les items désactivés</li>
            </ul>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
**Conformité WCAG 2.1 AA**

DsSidebar respecte les critères d'accessibilité :

- **Perceptible** : Contraste suffisant, indicateurs visuels de focus
- **Utilisable** : Navigation clavier complète, pas de piège au focus
- **Compréhensible** : Structure logique, labels explicites
- **Robuste** : ARIA valide, compatible lecteurs d'écran
        `,
      },
    },
  },
};

/**
 * Démonstration de l'état actif via le Router Angular.
 */
export const ActiveItem: Story = {
  args: {
    items: [
      { id: '1', label: 'Dashboard', icon: faHome, routerLink: '/dashboard' },
      { id: '2', label: 'Analytics', icon: faChartBar, routerLink: '/analytics', routerLinkActiveOptions: { exact: true } },
      { id: '3', label: 'Users', icon: faUsers, routerLink: '/users' },
      { id: '4', label: 'Settings', icon: faCog, routerLink: '/settings' },
    ],
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
        </ds-sidebar>
        <div style="flex: 1; padding: 2rem; background: var(--background-main);">
          <h1 style="color: var(--text-default);">État actif (Router Angular)</h1>
          <p style="color: var(--text-muted);">
            L'état actif est géré automatiquement par le <strong>Router Angular</strong>
            via <code>routerLinkActive</code>.
          </p>
          <p style="color: var(--text-muted); margin-top: 1rem;">
            L'item correspondant à la route courante reçoit la classe <code>.ds-sidebar__item--active</code>
            et un style visuel distinct.
          </p>

          <div style="background: var(--background-secondary); padding: 1rem; border-radius: 8px; margin-top: 1.5rem;">
            <h3 style="color: var(--text-default); font-size: 0.875rem; margin-bottom: 0.5rem;">Configuration</h3>
            <pre style="font-size: 0.8rem; color: var(--text-default); margin: 0; overflow-x: auto;">items = [
  {
    id: '2',
    label: 'Analytics',
    icon: faChartBar,
    routerLink: '/analytics',
    // Match exact pour éviter les faux positifs
    routerLinkActiveOptions: { exact: true }
  }
];</pre>
          </div>

          <div style="background: var(--info); color: white; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
            <strong>Note :</strong> Dans Storybook, le Router n'est pas actif.
            L'état actif sera visible dans votre application Angular réelle.
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
**État actif via Router Angular**

L'état actif est géré automatiquement par le Router Angular :

1. Chaque item avec \`routerLink\` utilise \`routerLinkActive\`
2. L'item correspondant à la route courante reçoit la classe \`.ds-sidebar__item--active\`
3. Utilisez \`routerLinkActiveOptions: { exact: true }\` pour un match exact

\`\`\`typescript
items = [
  {
    routerLink: '/analytics',
    routerLinkActiveOptions: { exact: true }
  }
];
\`\`\`
        `,
      },
    },
  },
};

/**
 * Vue d'ensemble de tous les variants pour référence rapide.
 */
export const AllVariants: Story = {
  render: () => ({
    props: {
      basicItems,
      badgeItems: [
        { id: '1', label: 'Inbox', icon: faInbox, badge: 12, badgeVariant: 'primary' },
        { id: '2', label: 'Alerts', icon: faBell, badge: 3, badgeVariant: 'error' },
        { id: '3', label: 'Tasks', icon: faCircleCheck, badge: 'NEW', badgeVariant: 'success' },
      ],
      disabledItems: [
        { id: '1', label: 'Active', icon: faHome },
        { id: '2', label: 'Disabled', icon: faCog, disabled: true },
        { id: '3', label: 'Another', icon: faUsers, disabled: true },
      ],
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; height: 100vh;">
        <!-- Full -->
        <div style="border-right: 1px solid var(--border-default);">
          <div style="background: var(--background-secondary); padding: 0.5rem 1rem; font-size: 0.75rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">
            Mode: Full
          </div>
          <ds-sidebar [items]="basicItems" mode="full" [collapsible]="false" size="sm">
          </ds-sidebar>
        </div>

        <!-- Collapsed -->
        <div style="border-right: 1px solid var(--border-default);">
          <div style="background: var(--background-secondary); padding: 0.5rem 1rem; font-size: 0.75rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">
            Mode: Collapsed
          </div>
          <ds-sidebar [items]="basicItems" mode="collapsed" [collapsible]="false">
          </ds-sidebar>
        </div>

        <!-- With Badges -->
        <div style="border-right: 1px solid var(--border-default);">
          <div style="background: var(--background-secondary); padding: 0.5rem 1rem; font-size: 0.75rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">
            Avec Badges
          </div>
          <ds-sidebar [items]="badgeItems" mode="full" [collapsible]="false" size="sm">
          </ds-sidebar>
        </div>

        <!-- Disabled -->
        <div>
          <div style="background: var(--background-secondary); padding: 0.5rem 1rem; font-size: 0.75rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">
            Disabled Items
          </div>
          <ds-sidebar [items]="disabledItems" mode="full" [collapsible]="false" size="sm">
          </ds-sidebar>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Vue d\'ensemble rapide des principaux variants de la sidebar.',
      },
    },
  },
};
