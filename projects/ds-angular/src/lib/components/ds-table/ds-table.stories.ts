import { Meta, StoryObj } from '@storybook/angular';
import { DsTable, DsTableColumn } from './ds-table';

interface User extends Record<string, unknown> {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  age: number;
}

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
  title: 'Components/DsTable',
  component: DsTable,
  tags: ['autodocs'],
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
      </div>
    `,
  }),
  args: Default.args,
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
