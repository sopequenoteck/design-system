import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { expect, userEvent, within } from '@storybook/test';
import { DsPagination } from './ds-pagination';

const meta: Meta<DsPagination> = {
  title: 'Navigation/DsPagination',
  component: DsPagination,
  decorators: [
    moduleMetadata({
      imports: [DsPagination],
    }),
  ],
  argTypes: {
    totalItems: {
      control: { type: 'number', min: 0 },
      description: 'Nombre total d\'éléments',
    },
    pageSize: {
      control: { type: 'number', min: 1 },
      description: 'Nombre d\'éléments par page',
    },
    currentPage: {
      control: { type: 'number', min: 1 },
      description: 'Page courante (1-indexed)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du composant',
    },
    showFirstLast: {
      control: 'boolean',
      description: 'Afficher boutons première/dernière page',
    },
    showPageSizeSelector: {
      control: 'boolean',
      description: 'Afficher sélecteur de taille de page',
    },
    showInfo: {
      control: 'boolean',
      description: 'Afficher info "X - Y sur Z"',
    },
    disabled: {
      control: 'boolean',
      description: 'Désactiver le composant',
    },
    maxVisiblePages: {
      control: { type: 'number', min: 3, max: 10 },
      description: 'Nombre max de pages visibles',
    },
  },
};

export default meta;
type Story = StoryObj<DsPagination>;

export const Default: Story = {
  args: {
    totalItems: 100,
    pageSize: 10,
    currentPage: 1,
    size: 'md',
    showFirstLast: true,
    showPageSizeSelector: false,
    showInfo: true,
    disabled: false,
    maxVisiblePages: 5,
  },
};

export const WithPageSizeSelector: Story = {
  args: {
    ...Default.args,
    showPageSizeSelector: true,
    pageSizeOptions: [10, 25, 50, 100],
  },
};

export const SmallSize: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};

export const MiddlePage: Story = {
  args: {
    ...Default.args,
    currentPage: 5,
  },
};

export const LastPage: Story = {
  args: {
    ...Default.args,
    currentPage: 10,
  },
};

export const FewPages: Story = {
  args: {
    ...Default.args,
    totalItems: 25,
    pageSize: 10,
  },
};

export const ManyPages: Story = {
  args: {
    ...Default.args,
    totalItems: 500,
    pageSize: 10,
    maxVisiblePages: 7,
  },
};

export const WithoutFirstLast: Story = {
  args: {
    ...Default.args,
    showFirstLast: false,
  },
};

export const WithoutInfo: Story = {
  args: {
    ...Default.args,
    showInfo: false,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const Minimal: Story = {
  args: {
    totalItems: 50,
    pageSize: 10,
    showFirstLast: false,
    showInfo: false,
    showPageSizeSelector: false,
    maxVisiblePages: 5,
  },
};

export const FullFeatured: Story = {
  args: {
    totalItems: 250,
    pageSize: 25,
    currentPage: 5,
    size: 'md',
    showFirstLast: true,
    showPageSizeSelector: true,
    pageSizeOptions: [10, 25, 50, 100],
    showInfo: true,
    maxVisiblePages: 7,
  },
};

export const SinglePage: Story = {
  args: {
    totalItems: 5,
    pageSize: 10,
  },
};

export const Themed: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div class="theme-light" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Light</h4>
          <ds-pagination
            [totalItems]="100"
            [pageSize]="10"
            [currentPage]="5"
            [showFirstLast]="true"
            [showInfo]="true">
          </ds-pagination>
        </div>
        <div class="theme-dark" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Dark</h4>
          <ds-pagination
            [totalItems]="100"
            [pageSize]="10"
            [currentPage]="5"
            [showFirstLast]="true"
            [showInfo]="true">
          </ds-pagination>
        </div>
        <div class="theme-custom" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Custom</h4>
          <ds-pagination
            [totalItems]="100"
            [pageSize]="10"
            [currentPage]="5"
            [showFirstLast]="true"
            [showInfo]="true">
          </ds-pagination>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Affiche le composant dans les 3 thèmes (Light, Dark, Custom) pour vérifier la thématisation.',
      },
    },
  },
};

export const Accessibility: Story = {
  args: {
    ...Default.args,
    showPageSizeSelector: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
### Accessibilité clavier

| Touche | Action |
|--------|--------|
| Tab | Navigue entre les boutons de pagination |
| Enter/Space | Active le bouton focalisé |
| Arrow Left/Right | Navigation rapide (optionnelle) |

### Attributs ARIA
- \`role="navigation"\`: Identifie la navigation
- \`aria-label="Pagination"\`: Décrit la navigation
- \`aria-current="page"\`: Indique la page courante
- \`aria-disabled\`: Boutons désactivés (prev/next)

### Bonnes pratiques
- Boutons first/last pour navigation rapide
- Info "X - Y sur Z" pour le contexte
- Sélecteur de taille de page accessible
- maxVisiblePages pour gérer les longues listes
        `,
      },
    },
  },
};

export const WithInteractionTest: Story = {
  args: {
    totalItems: 100,
    pageSize: 10,
    currentPage: 1,
    showFirstLast: true,
  },
  render: (args) => ({
    props: { ...args, currentPageState: 1 },
    template: `<ds-pagination [totalItems]="totalItems" [pageSize]="pageSize" [currentPage]="currentPageState" [showFirstLast]="showFirstLast" (pageChange)="currentPageState = $event" data-testid="test-pagination"></ds-pagination>`,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const paginationContainer = canvas.getByTestId('test-pagination');

    // Vérifier que la pagination est dans le DOM
    await expect(paginationContainer).toBeInTheDocument();

    // Trouver le bouton "Next"
    const nextButton = Array.from(paginationContainer.querySelectorAll('button')).find(
      btn => btn.getAttribute('aria-label') === 'Page suivante'
    ) as HTMLButtonElement;

    if (nextButton) {
      // Cliquer sur next
      await userEvent.click(nextButton);

      await new Promise(resolve => setTimeout(resolve, 200));

      // Vérifier que la page 2 est maintenant active
      const page2Button = Array.from(paginationContainer.querySelectorAll('button')).find(
        btn => btn.textContent?.trim() === '2' && btn.getAttribute('aria-current') === 'page'
      );
      await expect(page2Button).toBeInTheDocument();
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Test d\'interaction automatisé : vérifie la navigation entre les pages.',
      },
    },
  },
};
