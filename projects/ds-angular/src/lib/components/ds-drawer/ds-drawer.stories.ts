import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { signal } from '@angular/core';
import { DsDrawer } from './ds-drawer';
import { DsButton } from '../ds-button/ds-button';

const meta: Meta<DsDrawer> = {
  title: 'Overlays/Drawer',
  component: DsDrawer,
  parameters: {
    docs: {
      description: {
        component: `
**DsDrawer** est un composant de panneau latéral coulissant (overlay) avec animation slide-in/out, focus trap via CDK Overlay, et support de la navigation clavier.

### Caractéristiques principales
- Positions multiples (left, right, top, bottom)
- Tailles configurables (sm, md, lg, full)
- Animation slide-in/out fluide
- Focus trap automatique (piège le focus dans le drawer)
- Fermeture par ESC, backdrop ou bouton close
- Header avec titre et footer personnalisables via content projection
- Attributs ARIA complets (role="dialog", aria-modal, aria-labelledby)

### Utilisation
\`\`\`html
<ds-drawer
  [(visible)]="isDrawerOpen"
  position="right"
  size="md"
  title="Détails"
  [closable]="true"
  [maskClosable]="true"
  (closed)="onDrawerClose()">
  <p>Contenu du drawer</p>

  <div drawer-footer>
    <button ds-button variant="primary">Valider</button>
  </div>
</ds-drawer>
\`\`\`
        `,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [DsDrawer, DsButton],
    }),
  ],
  argTypes: {
    visible: {
      control: 'boolean',
      description: 'Visibilité du drawer',
    },
    position: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position du drawer',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
      description: 'Taille du drawer',
    },
    title: {
      control: 'text',
      description: 'Titre affiché dans le header',
    },
    closable: {
      control: 'boolean',
      description: 'Affiche le bouton de fermeture',
    },
    maskClosable: {
      control: 'boolean',
      description: 'Ferme le drawer au clic sur le backdrop',
    },
  },
};

export default meta;
type Story = StoryObj<DsDrawer>;

/**
 * Drawer par défaut (fermé).
 */
export const Default: Story = {
  args: {
    visible: false,
    position: 'right',
    size: 'md',
    title: 'Drawer',
    closable: true,
    maskClosable: true,
  },
};

/**
 * Drawer ouvert avec titre.
 */
export const WithTitle: Story = {
  render: () => {
    const isOpen = signal(true);
    return {
      props: {
        isOpen,
        handleClose() {
          isOpen.set(false);
        },
      },
      template: `
        <ds-drawer
          [visible]="isOpen()"
          (visibleChange)="isOpen.set($event)"
          title="Détails du produit"
          position="right"
          size="md">
          <p>Contenu du drawer avec titre.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </ds-drawer>
      `,
    };
  },
};

/**
 * Drawer avec bouton d'ouverture.
 */
export const WithOpenButton: Story = {
  render: () => {
    const isOpen = signal(false);
    return {
      props: {
        isOpen,
        openDrawer() {
          isOpen.set(true);
        },
      },
      template: `
        <button ds-button variant="primary" (click)="openDrawer()">
          Ouvrir le drawer
        </button>

        <ds-drawer
          [visible]="isOpen()"
          (visibleChange)="isOpen.set($event)"
          title="Mon Drawer"
          position="right"
          size="md">
          <p>Ceci est le contenu du drawer.</p>
          <p>Vous pouvez le fermer en cliquant sur la croix, en appuyant sur Escape, ou en cliquant sur le backdrop.</p>
        </ds-drawer>
      `,
    };
  },
};

/**
 * Position gauche.
 */
export const PositionLeft: Story = {
  render: () => {
    const isOpen = signal(false);
    return {
      props: {
        isOpen,
        openDrawer() {
          isOpen.set(true);
        },
      },
      template: `
        <button ds-button variant="primary" (click)="openDrawer()">
          Ouvrir à gauche
        </button>

        <ds-drawer
          [visible]="isOpen()"
          (visibleChange)="isOpen.set($event)"
          title="Drawer Left"
          position="left"
          size="md">
          <p>Le drawer s'ouvre depuis la gauche.</p>
        </ds-drawer>
      `,
    };
  },
};

/**
 * Position droite.
 */
export const PositionRight: Story = {
  render: () => {
    const isOpen = signal(false);
    return {
      props: {
        isOpen,
        openDrawer() {
          isOpen.set(true);
        },
      },
      template: `
        <button ds-button variant="primary" (click)="openDrawer()">
          Ouvrir à droite
        </button>

        <ds-drawer
          [visible]="isOpen()"
          (visibleChange)="isOpen.set($event)"
          title="Drawer Right"
          position="right"
          size="md">
          <p>Le drawer s'ouvre depuis la droite.</p>
        </ds-drawer>
      `,
    };
  },
};

/**
 * Taille small.
 */
export const SizeSmall: Story = {
  render: () => {
    const isOpen = signal(false);
    return {
      props: {
        isOpen,
        openDrawer() {
          isOpen.set(true);
        },
      },
      template: `
        <button ds-button variant="primary" (click)="openDrawer()">
          Drawer Small
        </button>

        <ds-drawer
          [visible]="isOpen()"
          (visibleChange)="isOpen.set($event)"
          title="Small Drawer"
          position="right"
          size="sm">
          <p>Drawer de taille small (320px).</p>
        </ds-drawer>
      `,
    };
  },
};

/**
 * Taille medium.
 */
export const SizeMedium: Story = {
  render: () => {
    const isOpen = signal(false);
    return {
      props: {
        isOpen,
        openDrawer() {
          isOpen.set(true);
        },
      },
      template: `
        <button ds-button variant="primary" (click)="openDrawer()">
          Drawer Medium
        </button>

        <ds-drawer
          [visible]="isOpen()"
          (visibleChange)="isOpen.set($event)"
          title="Medium Drawer"
          position="right"
          size="md">
          <p>Drawer de taille medium (480px).</p>
        </ds-drawer>
      `,
    };
  },
};

/**
 * Taille large.
 */
export const SizeLarge: Story = {
  render: () => {
    const isOpen = signal(false);
    return {
      props: {
        isOpen,
        openDrawer() {
          isOpen.set(true);
        },
      },
      template: `
        <button ds-button variant="primary" (click)="openDrawer()">
          Drawer Large
        </button>

        <ds-drawer
          [visible]="isOpen()"
          (visibleChange)="isOpen.set($event)"
          title="Large Drawer"
          position="right"
          size="lg">
          <p>Drawer de taille large (640px).</p>
        </ds-drawer>
      `,
    };
  },
};

/**
 * Taille full (plein écran).
 */
export const SizeFull: Story = {
  render: () => {
    const isOpen = signal(false);
    return {
      props: {
        isOpen,
        openDrawer() {
          isOpen.set(true);
        },
      },
      template: `
        <button ds-button variant="primary" (click)="openDrawer()">
          Drawer Full
        </button>

        <ds-drawer
          [visible]="isOpen()"
          (visibleChange)="isOpen.set($event)"
          title="Full Drawer"
          position="right"
          size="full">
          <p>Drawer plein écran.</p>
        </ds-drawer>
      `,
    };
  },
};

/**
 * Sans bouton de fermeture.
 */
export const NotClosable: Story = {
  render: () => {
    const isOpen = signal(false);
    return {
      props: {
        isOpen,
        openDrawer() {
          isOpen.set(true);
        },
        closeDrawer() {
          isOpen.set(false);
        },
      },
      template: `
        <button ds-button variant="primary" (click)="openDrawer()">
          Ouvrir drawer
        </button>

        <ds-drawer
          [visible]="isOpen()"
          (visibleChange)="isOpen.set($event)"
          title="Drawer non fermable"
          position="right"
          size="md"
          [closable]="false">
          <p>Ce drawer n'a pas de bouton de fermeture et ne peut pas être fermé avec Escape.</p>
          <p>Utilisez un bouton personnalisé pour le fermer.</p>

          <div drawer-footer>
            <button ds-button variant="primary" (click)="closeDrawer()">
              Fermer
            </button>
          </div>
        </ds-drawer>
      `,
    };
  },
};

/**
 * Avec header et footer personnalisés.
 */
export const WithHeaderAndFooter: Story = {
  render: () => {
    const isOpen = signal(false);
    return {
      props: {
        isOpen,
        openDrawer() {
          isOpen.set(true);
        },
        closeDrawer() {
          isOpen.set(false);
        },
      },
      template: `
        <button ds-button variant="primary" (click)="openDrawer()">
          Ouvrir avec header/footer
        </button>

        <ds-drawer
          [visible]="isOpen()"
          (visibleChange)="isOpen.set($event)"
          title="Formulaire"
          position="right"
          size="md">

          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Nom</label>
            <input
              type="text"
              style="width: 100%; padding: 0.5rem; border: 1px solid var(--border-color); border-radius: var(--radius-2);"
              placeholder="Votre nom" />
          </div>

          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Email</label>
            <input
              type="email"
              style="width: 100%; padding: 0.5rem; border: 1px solid var(--border-color); border-radius: var(--radius-2);"
              placeholder="votre@email.com" />
          </div>

          <div drawer-footer style="display: flex; gap: 0.5rem; justify-content: flex-end;">
            <button ds-button variant="ghost" (click)="closeDrawer()">
              Annuler
            </button>
            <button ds-button variant="primary" (click)="closeDrawer()">
              Enregistrer
            </button>
          </div>
        </ds-drawer>
      `,
    };
  },
};

/**
 * Avec contenu long (scrollable).
 */
export const WithLongContent: Story = {
  render: () => {
    const isOpen = signal(false);
    return {
      props: {
        isOpen,
        openDrawer() {
          isOpen.set(true);
        },
      },
      template: `
        <button ds-button variant="primary" (click)="openDrawer()">
          Ouvrir avec contenu long
        </button>

        <ds-drawer
          [visible]="isOpen()"
          (visibleChange)="isOpen.set($event)"
          title="Contenu scrollable"
          position="right"
          size="md">

          <h3>Section 1</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

          <h3>Section 2</h3>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

          <h3>Section 3</h3>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>

          <h3>Section 4</h3>
          <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

          <h3>Section 5</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

          <h3>Section 6</h3>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

          <div drawer-footer>
            <button ds-button variant="primary">
              Valider
            </button>
          </div>
        </ds-drawer>
      `,
    };
  },
};

/**
 * Test des 3 thèmes (Light/Dark/Custom).
 */
export const Themed: Story = {
  render: () => {
    const isOpenLight = signal(false);
    const isOpenDark = signal(false);
    const isOpenCustom = signal(false);

    return {
      props: {
        isOpenLight,
        isOpenDark,
        isOpenCustom,
        openLight() {
          isOpenLight.set(true);
        },
        openDark() {
          isOpenDark.set(true);
        },
        openCustom() {
          isOpenCustom.set(true);
        },
      },
      template: `
        <div style="display: flex; gap: 1rem;">
          <button ds-button variant="primary" (click)="openLight()">
            Light Theme
          </button>
          <button ds-button variant="primary" (click)="openDark()">
            Dark Theme
          </button>
          <button ds-button variant="primary" (click)="openCustom()">
            Custom Theme
          </button>
        </div>

        <div class="theme-light">
          <ds-drawer
            [visible]="isOpenLight()"
            (visibleChange)="isOpenLight.set($event)"
            title="Light Theme"
            position="right"
            size="md">
            <p>Drawer en mode Light.</p>
          </ds-drawer>
        </div>

        <div class="theme-dark">
          <ds-drawer
            [visible]="isOpenDark()"
            (visibleChange)="isOpenDark.set($event)"
            title="Dark Theme"
            position="right"
            size="md">
            <p>Drawer en mode Dark.</p>
          </ds-drawer>
        </div>

        <div class="theme-custom">
          <ds-drawer
            [visible]="isOpenCustom()"
            (visibleChange)="isOpenCustom.set($event)"
            title="Custom Theme"
            position="right"
            size="md">
            <p>Drawer en thème Custom.</p>
          </ds-drawer>
        </div>
      `,
    };
  },
};

export const Accessibility: Story = {
  render: () => {
    const isOpen = signal(false);
    return {
      props: {
        isOpen,
        openDrawer() {
          isOpen.set(true);
        },
      },
      template: `
        <button ds-button variant="primary" (click)="openDrawer()">
          Ouvrir le drawer
        </button>

        <ds-drawer
          [visible]="isOpen()"
          (visibleChange)="isOpen.set($event)"
          title="Drawer accessible"
          position="right"
          size="md">
          <p>Ce drawer démontre les fonctionnalités d'accessibilité :</p>
          <ul>
            <li>Focus trap : le focus reste dans le drawer</li>
            <li>ESC ferme le drawer (si closable)</li>
            <li>Focus automatique sur le premier élément</li>
            <li>Restauration du focus à la fermeture</li>
          </ul>
        </ds-drawer>
      `,
    };
  },
  parameters: {
    docs: {
      description: {
        story: `
### Accessibilité clavier

| Touche | Action |
|--------|--------|
| Tab | Navigue entre les éléments focusables |
| Escape | Ferme le drawer (si closable) |
| Enter | Active l'élément focalisé |

### Attributs ARIA
- \`role="dialog"\`: Identifie le drawer
- \`aria-modal="true"\`: Mode modal
- \`aria-labelledby\`: Lie le titre
- \`aria-describedby\`: Lie la description

### Bonnes pratiques
- Focus trap actif
- Positions multiples (left/right/top/bottom)
- Tailles configurables (sm/md/lg/full)
- Backdrop optionnel (maskClosable)
        `,
      },
    },
  },
};
