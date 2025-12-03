import { Meta, StoryObj } from '@storybook/angular';
import { PrimitiveBadge } from './primitive-badge';

const meta: Meta<PrimitiveBadge> = {
  title: 'Primitives/PrimitiveBadge',
  component: PrimitiveBadge,
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
type Story = StoryObj<PrimitiveBadge>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md'
  },
  render: (args) => ({
    props: args,
    template: `<primitive-badge [variant]="variant" [size]="size">Badge</primitive-badge>`
  })
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; padding: 1rem;">
        <primitive-badge variant="default">Default</primitive-badge>
        <primitive-badge variant="primary">Primary</primitive-badge>
        <primitive-badge variant="secondary">Secondary</primitive-badge>
        <primitive-badge variant="success">Success</primitive-badge>
        <primitive-badge variant="warning">Warning</primitive-badge>
        <primitive-badge variant="error">Error</primitive-badge>
        <primitive-badge variant="info">Info</primitive-badge>
      </div>
    `
  })
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem; align-items: center; padding: 1rem;">
        <primitive-badge size="sm">Small</primitive-badge>
        <primitive-badge size="md">Medium</primitive-badge>
        <primitive-badge size="lg">Large</primitive-badge>
      </div>
    `
  })
};
