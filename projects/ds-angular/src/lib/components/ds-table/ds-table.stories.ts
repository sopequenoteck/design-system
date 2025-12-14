import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { expect, userEvent, within } from '@storybook/test';
import { DsTable, DsTableColumn } from './ds-table';
import { DsPagination } from '../ds-pagination/ds-pagination';

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  age: number;
  [key: string]: unknown;
};

const mockUsers: User[] = [
  { id: 1, name: 'Alice Martin', email: 'alice@example.com', role: 'Admin', status: 'active', age: 28 },
  { id: 2, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'active', age: 35 },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'inactive', age: 42 },
  { id: 4, name: 'Diana Ross', email: 'diana@example.com', role: 'Editor', status: 'active', age: 31 },
  { id: 5, name: 'Edward King', email: 'edward@example.com', role: 'Admin', status: 'inactive', age: 45 },
];

const defaultColumns: DsTableColumn<User>[] = [
  { key: 'name', label: 'Nom', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Rôle', sortable: true },
  { key: 'status', label: 'Statut' },
  { key: 'age', label: 'Âge', sortable: true, align: 'right' },
];

const meta: Meta<DsTable<User>> = {
  title: 'Components/Data/Table',
  component: DsTable,
  decorators: [
    moduleMetadata({
      imports: [DsTable, DsPagination],
    }),
  ],
  argTypes: {
    data: {
      control: 'object',
      description: 'Données du tableau',
    },
    columns: {
      control: 'object',
      description: 'Configuration des colonnes',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du tableau',
    },
    variant: {
      control: 'select',
      options: ['default', 'striped', 'bordered'],
      description: 'Variante visuelle',
    },
    selectable: {
      control: 'boolean',
      description: 'Activer la sélection de lignes',
    },
    hoverable: {
      control: 'boolean',
      description: 'Effet hover sur les lignes',
    },
    loading: {
      control: 'boolean',
      description: 'État de chargement',
    },
    emptyText: {
      control: 'text',
      description: 'Texte affiché quand le tableau est vide',
    },
    showHeader: {
      control: 'boolean',
      description: 'Afficher l\'en-tête',
    },
    stickyHeader: {
      control: 'boolean',
      description: 'En-tête sticky',
    },
  },
};

export default meta;
type Story = StoryObj<DsTable<User>>;

export const Default: Story = {
  args: {
    data: mockUsers,
    columns: defaultColumns,
    size: 'md',
    variant: 'default',
    selectable: false,
    hoverable: true,
    loading: false,
    emptyText: 'Aucune donnée',
  },
};

export const Striped: Story = {
  args: {
    ...Default.args,
    variant: 'striped',
  },
};

export const Bordered: Story = {
  args: {
    ...Default.args,
    variant: 'bordered',
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

export const Selectable: Story = {
  args: {
    ...Default.args,
    selectable: true,
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    data: [],
    emptyText: 'Aucun utilisateur trouvé',
  },
};

export const WithCustomFormat: Story = {
  args: {
    data: mockUsers,
    columns: [
      { key: 'name', label: 'Nom', sortable: true },
      { key: 'email', label: 'Email' },
      {
        key: 'status',
        label: 'Statut',
        format: (value) => value === 'active' ? 'Actif' : 'Inactif',
      },
      {
        key: 'age',
        label: 'Âge',
        sortable: true,
        align: 'right',
        format: (value) => `${value} ans`,
      },
    ],
    size: 'md',
    variant: 'default',
  },
};

export const WithColumnWidths: Story = {
  args: {
    data: mockUsers,
    columns: [
      { key: 'name', label: 'Nom', sortable: true, width: '200px' },
      { key: 'email', label: 'Email', width: '250px' },
      { key: 'role', label: 'Rôle', width: '100px' },
      { key: 'status', label: 'Statut', width: '100px' },
      { key: 'age', label: 'Âge', align: 'right', width: '80px' },
    ],
    size: 'md',
  },
};

export const WithoutHover: Story = {
  args: {
    ...Default.args,
    hoverable: false,
  },
};

export const StickyHeader: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 200px; overflow-y: auto;">
        <ds-table
          [data]="data"
          [columns]="columns"
          [size]="size"
          [stickyHeader]="true">
        </ds-table>
      </div>
    `,
  }),
  args: {
    ...Default.args,
    data: [...mockUsers, ...mockUsers, ...mockUsers], // More data for scrolling
  },
};

export const Themed: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div class="theme-light" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Light</h4>
          <ds-table [data]="data" [columns]="columns" [size]="size" variant="striped"></ds-table>
        </div>
        <div class="theme-dark" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Dark</h4>
          <ds-table [data]="data" [columns]="columns" [size]="size" variant="striped"></ds-table>
        </div>
        <div class="theme-custom" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Custom</h4>
          <ds-table [data]="data" [columns]="columns" [size]="size" variant="striped"></ds-table>
        </div>
      </div>
    `,
  }),
  args: Default.args,
  parameters: {
    docs: {
      description: {
        story: 'Affiche le composant dans les 3 thèmes (Light, Dark, Custom) pour vérifier la thématisation.',
      },
    },
  },
};

export const AllFeatures: Story = {
  args: {
    data: mockUsers,
    columns: [
      { key: 'name', label: 'Nom', sortable: true, width: '180px' },
      { key: 'email', label: 'Email', width: '220px' },
      { key: 'role', label: 'Rôle', sortable: true, width: '100px' },
      {
        key: 'status',
        label: 'Statut',
        format: (value) => value === 'active' ? 'Actif' : 'Inactif',
        width: '100px',
      },
      {
        key: 'age',
        label: 'Âge',
        sortable: true,
        align: 'right',
        format: (value) => `${value} ans`,
        width: '80px',
      },
    ],
    size: 'md',
    variant: 'striped',
    selectable: true,
    hoverable: true,
  },
};

// Extended mock data for pagination demos
const extendedMockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ['Admin', 'User', 'Editor'][i % 3],
  status: i % 3 === 0 ? 'inactive' : 'active',
  age: 25 + (i % 30),
}));

export const WithPagination: Story = {
  render: () => {
    const state = {
      currentPage: 1,
      pageSize: 10,
    };
    return {
      template: `
        <div>
          <ds-table
            [data]="getPaginatedData()"
            [columns]="columns"
            variant="striped"
            [hoverable]="true">
          </ds-table>
          <div style="margin-top: 16px;">
            <ds-pagination
              [totalItems]="totalItems"
              [pageSize]="state.pageSize"
              [currentPage]="state.currentPage"
              [showInfo]="true"
              (pageChange)="onPageChange($event)">
            </ds-pagination>
          </div>
        </div>
      `,
      props: {
        columns: defaultColumns,
        totalItems: extendedMockUsers.length,
        state,
        getPaginatedData: () => {
          const start = (state.currentPage - 1) * state.pageSize;
          return extendedMockUsers.slice(start, start + state.pageSize);
        },
        onPageChange: (page: number) => {
          state.currentPage = page;
        },
      },
    };
  },
  parameters: {
    docs: {
      description: {
        story: 'Intégration ds-table avec ds-pagination pour paginer les données côté client.',
      },
    },
  },
};

export const WithSortAndPagination: Story = {
  render: () => {
    const state = {
      currentPage: 1,
      pageSize: 10,
      sortKey: null as string | null,
      sortDirection: 'asc' as 'asc' | 'desc',
    };

    const getSortedData = () => {
      if (!state.sortKey) return [...extendedMockUsers];
      return [...extendedMockUsers].sort((a, b) => {
        const aVal = a[state.sortKey!] as string | number;
        const bVal = b[state.sortKey!] as string | number;
        const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return state.sortDirection === 'asc' ? cmp : -cmp;
      });
    };

    const getPaginatedData = () => {
      const start = (state.currentPage - 1) * state.pageSize;
      return getSortedData().slice(start, start + state.pageSize);
    };

    return {
      template: `
        <div>
          <ds-table
            [data]="getPaginatedData()"
            [columns]="columns"
            variant="bordered"
            [hoverable]="true"
            [selectable]="true"
            (sortChange)="onSortChange($event)">
          </ds-table>
          <div style="margin-top: 16px; display: flex; justify-content: space-between; align-items: center;">
            <ds-pagination
              [totalItems]="totalItems"
              [pageSize]="state.pageSize"
              [currentPage]="state.currentPage"
              [showPageSizeSelector]="true"
              [pageSizeOptions]="[5, 10, 25, 50]"
              [showInfo]="true"
              (pageChange)="onPageChange($event)"
              (pageSizeChange)="onPageSizeChange($event)">
            </ds-pagination>
          </div>
        </div>
      `,
      props: {
        columns: defaultColumns,
        totalItems: extendedMockUsers.length,
        state,
        getPaginatedData,
        onPageChange: (page: number) => {
          state.currentPage = page;
        },
        onPageSizeChange: (size: number) => {
          state.pageSize = size;
          state.currentPage = 1;
        },
        onSortChange: (event: { key: string; direction: 'asc' | 'desc' }) => {
          state.sortKey = event.key;
          state.sortDirection = event.direction;
        },
      },
    };
  },
  parameters: {
    docs: {
      description: {
        story: 'Table avec tri et pagination complète. Inclut sélecteur de taille de page et tri sur colonnes.',
      },
    },
  },
};

export const ServerSidePagination: Story = {
  render: () => {
    const state = {
      currentPage: 1,
      pageSize: 10,
      loading: false,
      displayData: extendedMockUsers.slice(0, 10) as User[],
    };

    const fetchPage = (page: number) => {
      state.loading = true;
      state.currentPage = page;
      // Simulate server delay
      setTimeout(() => {
        const start = (page - 1) * state.pageSize;
        state.displayData = Array.from({ length: state.pageSize }, (_, i) => ({
          id: start + i + 1,
          name: `Server User ${start + i + 1}`,
          email: `server${start + i + 1}@api.com`,
          role: ['Admin', 'User', 'Editor'][(start + i) % 3],
          status: ((start + i) % 4 === 0 ? 'inactive' : 'active') as 'active' | 'inactive',
          age: 20 + ((start + i) % 40),
        }));
        state.loading = false;
      }, 500);
    };

    return {
      template: `
        <div>
          <p style="margin-bottom: 16px; color: var(--text-muted); font-size: 14px;">
            <em>Simulation de pagination serveur - les données sont "chargées" à chaque changement de page</em>
          </p>
          <ds-table
            [data]="state.displayData"
            [columns]="columns"
            variant="striped"
            [hoverable]="true"
            [loading]="state.loading">
          </ds-table>
          <div style="margin-top: 16px;">
            <ds-pagination
              [totalItems]="serverTotalItems"
              [pageSize]="state.pageSize"
              [currentPage]="state.currentPage"
              [showInfo]="true"
              [disabled]="state.loading"
              (pageChange)="fetchPage($event)">
            </ds-pagination>
          </div>
        </div>
      `,
      props: {
        columns: defaultColumns,
        serverTotalItems: 150,
        state,
        fetchPage,
      },
    };
  },
  parameters: {
    docs: {
      description: {
        story: 'Pattern de pagination côté serveur. Le loading state désactive la pagination pendant le chargement.',
      },
    },
  },
};

export const WithInteractionTest: Story = {
  args: {
    data: mockUsers,
    columns: defaultColumns,
    selectable: true,
    hoverable: true,
  },
  render: (args) => ({
    props: args,
    template: `<ds-table [data]="data" [columns]="columns" [selectable]="selectable" [hoverable]="hoverable" data-testid="test-table"></ds-table>`,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const tableContainer = canvas.getByTestId('test-table');
    const table = tableContainer.querySelector('table');

    // Vérifier que le tableau est dans le DOM
    await expect(table).toBeInTheDocument();

    // Trouver le header de la colonne triable "Nom"
    const headers = table?.querySelectorAll('th');
    const nameHeader = Array.from(headers || []).find(th => th.textContent?.includes('Nom')) as HTMLElement;

    if (nameHeader) {
      // Cliquer sur le header pour trier
      await userEvent.click(nameHeader);

      await new Promise(resolve => setTimeout(resolve, 200));

      // Vérifier que le tri a été appliqué (icône de tri visible)
      const sortIcon = nameHeader.querySelector('.ds-table__sort-icon');
      await expect(sortIcon).toBeInTheDocument();
    }

    // Tester la sélection de ligne si selectable
    const firstRowCheckbox = table?.querySelector('tbody tr:first-child input[type="checkbox"]') as HTMLInputElement;
    if (firstRowCheckbox) {
      await userEvent.click(firstRowCheckbox);

      await new Promise(resolve => setTimeout(resolve, 100));

      // Vérifier que la ligne est sélectionnée
      await expect(firstRowCheckbox).toBeChecked();
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Test d\'interaction automatisé : vérifie le tri et la sélection de lignes.',
      },
    },
  },
};
