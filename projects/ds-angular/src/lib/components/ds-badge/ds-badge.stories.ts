import { Meta, StoryObj } from '@storybook/angular';
import { DsBadge } from './ds-badge';

const meta: Meta<DsBadge> = {
  title: 'Components/DsBadge',
  component: DsBadge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Variant du badge'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du badge'
    }
  }
};

export default meta;
type Story = StoryObj<DsBadge>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md'
  },
  render: (args) => ({
    props: args,
    template: `<ds-badge [variant]="variant" [size]="size">Status</ds-badge>`
  })
};

export const StatusBadges: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; padding: 1rem;">
        <ds-badge variant="success">Active</ds-badge>
        <ds-badge variant="warning">Pending</ds-badge>
        <ds-badge variant="error">Error</ds-badge>
        <ds-badge variant="info">Info</ds-badge>
        <ds-badge variant="default">Draft</ds-badge>
      </div>
    `
  })
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem; align-items: center; padding: 1rem;">
        <ds-badge size="sm" variant="primary">Small</ds-badge>
        <ds-badge size="md" variant="primary">Medium</ds-badge>
        <ds-badge size="lg" variant="primary">Large</ds-badge>
      </div>
    `
  })
};
