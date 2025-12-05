import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DsPagination } from './ds-pagination';

const meta: Meta<DsPagination> = {
  title: 'Components/DsPagination',
  component: DsPagination,
  decorators: [
    moduleMetadata({
      imports: [DsPagination],
    }),
  ],
  tags: ['autodocs'],
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
