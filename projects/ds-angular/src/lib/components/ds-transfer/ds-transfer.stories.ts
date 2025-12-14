import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DsTransfer, TransferItem } from './ds-transfer';

const sampleSourceItems: TransferItem[] = [
  { key: '1', label: 'JavaScript', description: 'Langage de programmation' },
  { key: '2', label: 'TypeScript', description: 'JavaScript avec typage statique' },
  { key: '3', label: 'Python', description: 'Langage polyvalent' },
  { key: '4', label: 'Java', description: 'Langage orienté objet' },
  { key: '5', label: 'C#', description: 'Langage .NET' },
  { key: '6', label: 'Ruby', description: 'Langage dynamique' },
  { key: '7', label: 'Go', description: 'Langage concurrent', disabled: true },
  { key: '8', label: 'Rust', description: 'Langage système' },
  { key: '9', label: 'Swift', description: 'Langage iOS' },
  { key: '10', label: 'Kotlin', description: 'Langage Android' },
];

const sampleTargetItems: TransferItem[] = [
  { key: '11', label: 'PHP', description: 'Langage web' },
  { key: '12', label: 'C++', description: 'Langage performant', disabled: true },
];

const meta: Meta<DsTransfer> = {
  title: 'Overlays/Transfer',
  component: DsTransfer,
  decorators: [
    moduleMetadata({
      imports: [DsTransfer],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    source: { control: 'object' },
    target: { control: 'object' },
    sourceTitle: { control: 'text' },
    targetTitle: { control: 'text' },
    showSearch: { control: 'boolean' },
    showSelectAll: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<DsTransfer>;

export const Default: Story = {
  args: {
    source: sampleSourceItems,
    target: sampleTargetItems,
    sourceTitle: 'Available',
    targetTitle: 'Selected',
    showSearch: true,
    showSelectAll: true,
    disabled: false,
    size: 'md',
  },
};

export const WithCustomTitles: Story = {
  args: {
    source: sampleSourceItems,
    target: [],
    sourceTitle: 'Langages disponibles',
    targetTitle: 'Mes favoris',
    showSearch: true,
    showSelectAll: true,
    size: 'md',
  },
};

export const WithoutSearch: Story = {
  args: {
    source: sampleSourceItems,
    target: sampleTargetItems,
    sourceTitle: 'Source',
    targetTitle: 'Target',
    showSearch: false,
    showSelectAll: true,
    size: 'md',
  },
};

export const WithoutSelectAll: Story = {
  args: {
    source: sampleSourceItems,
    target: sampleTargetItems,
    sourceTitle: 'Source',
    targetTitle: 'Target',
    showSearch: true,
    showSelectAll: false,
    size: 'md',
  },
};

export const Minimal: Story = {
  args: {
    source: sampleSourceItems,
    target: sampleTargetItems,
    sourceTitle: 'Source',
    targetTitle: 'Target',
    showSearch: false,
    showSelectAll: false,
    size: 'md',
  },
};

export const Disabled: Story = {
  args: {
    source: sampleSourceItems,
    target: sampleTargetItems,
    sourceTitle: 'Source',
    targetTitle: 'Target',
    showSearch: true,
    showSelectAll: true,
    disabled: true,
    size: 'md',
  },
};

export const SmallSize: Story = {
  args: {
    source: sampleSourceItems.slice(0, 5),
    target: [],
    sourceTitle: 'Available',
    targetTitle: 'Selected',
    showSearch: true,
    showSelectAll: true,
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    source: sampleSourceItems,
    target: sampleTargetItems,
    sourceTitle: 'Available',
    targetTitle: 'Selected',
    showSearch: true,
    showSelectAll: true,
    size: 'lg',
  },
};

export const EmptyLists: Story = {
  args: {
    source: [],
    target: [],
    sourceTitle: 'Available',
    targetTitle: 'Selected',
    showSearch: true,
    showSelectAll: true,
    size: 'md',
  },
};

export const WithDisabledItems: Story = {
  args: {
    source: [
      { key: '1', label: 'Item 1', description: 'Enabled item' },
      { key: '2', label: 'Item 2', description: 'Disabled item', disabled: true },
      { key: '3', label: 'Item 3', description: 'Enabled item' },
      { key: '4', label: 'Item 4', description: 'Disabled item', disabled: true },
    ],
    target: [
      { key: '5', label: 'Item 5', description: 'Enabled item' },
      { key: '6', label: 'Item 6', description: 'Disabled item', disabled: true },
    ],
    sourceTitle: 'Source',
    targetTitle: 'Target',
    showSearch: true,
    showSelectAll: true,
    size: 'md',
  },
};

export const LongLabels: Story = {
  args: {
    source: [
      {
        key: '1',
        label: 'This is a very long label that should be truncated with ellipsis',
        description: 'This is also a very long description that should be truncated with ellipsis in the UI',
      },
      {
        key: '2',
        label: 'Another extremely long label to test text overflow behavior',
        description: 'Description with lots of text to see how it handles overflow and truncation',
      },
      { key: '3', label: 'Short', description: 'Short desc' },
    ],
    target: [],
    sourceTitle: 'Source',
    targetTitle: 'Target',
    showSearch: true,
    showSelectAll: true,
    size: 'md',
  },
};

export const UserPermissions: Story = {
  args: {
    source: [
      { key: 'read', label: 'Read', description: 'View content' },
      { key: 'write', label: 'Write', description: 'Create and edit content' },
      { key: 'delete', label: 'Delete', description: 'Remove content' },
      { key: 'admin', label: 'Admin', description: 'Full access', disabled: true },
    ],
    target: [
      { key: 'share', label: 'Share', description: 'Share with others' },
    ],
    sourceTitle: 'Available Permissions',
    targetTitle: 'Assigned Permissions',
    showSearch: true,
    showSelectAll: true,
    size: 'md',
  },
};

export const ProductSelection: Story = {
  args: {
    source: [
      { key: 'p1', label: 'Laptop', description: '€999' },
      { key: 'p2', label: 'Mouse', description: '€29' },
      { key: 'p3', label: 'Keyboard', description: '€79' },
      { key: 'p4', label: 'Monitor', description: '€299' },
      { key: 'p5', label: 'Headphones', description: '€149' },
    ],
    target: [
      { key: 'p6', label: 'USB Cable', description: '€9' },
    ],
    sourceTitle: 'Available Products',
    targetTitle: 'Shopping Cart',
    showSearch: true,
    showSelectAll: true,
    size: 'md',
  },
};

export const TeamAssignment: Story = {
  args: {
    source: [
      { key: 'u1', label: 'Alice Johnson', description: 'Frontend Developer' },
      { key: 'u2', label: 'Bob Smith', description: 'Backend Developer' },
      { key: 'u3', label: 'Carol White', description: 'UX Designer' },
      { key: 'u4', label: 'David Brown', description: 'Product Manager' },
      { key: 'u5', label: 'Eve Wilson', description: 'QA Engineer' },
    ],
    target: [
      { key: 'u6', label: 'Frank Davis', description: 'Tech Lead' },
      { key: 'u7', label: 'Grace Lee', description: 'Scrum Master' },
    ],
    sourceTitle: 'Available Team Members',
    targetTitle: 'Project Team',
    showSearch: true,
    showSelectAll: true,
    size: 'md',
  },
};
