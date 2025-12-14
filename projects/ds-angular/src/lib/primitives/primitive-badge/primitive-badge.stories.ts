import type { Meta, StoryObj } from '@storybook/angular';
import { PrimitiveBadge, BadgeVariant, BadgeSize, BadgeShape, BadgeAppearance } from './primitive-badge';
import { faCheck, faStar, faCircle } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<PrimitiveBadge> = {
  title: 'Foundation/Primitives/Badge',
  component: PrimitiveBadge,
  argTypes: {
    type: {
      control: 'select',
      options: ['status', 'count', 'label'],
      description: 'Type de badge',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral', 'default', 'accent'] as BadgeVariant[],
      description: 'Variante visuelle',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] as BadgeSize[],
      description: 'Taille du badge',
    },
    shape: {
      control: 'select',
      options: ['rounded', 'pill'] as BadgeShape[],
      description: 'Forme du badge',
    },
    appearance: {
      control: 'select',
      options: ['solid', 'outline'] as BadgeAppearance[],
      description: 'Apparence du badge',
    },
  },
};

export default meta;
type Story = StoryObj<PrimitiveBadge>;

export const Default: Story = {
  args: {
    type: 'label',
    variant: 'primary',
    size: 'md',
    shape: 'rounded',
    appearance: 'solid',
  },
  render: (args) => ({
    props: args,
    template: `<primitive-badge [type]="type" [variant]="variant" [size]="size" [shape]="shape" [appearance]="appearance">Badge</primitive-badge>`,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <primitive-badge variant="primary">Primary</primitive-badge>
        <primitive-badge variant="secondary">Secondary</primitive-badge>
        <primitive-badge variant="success">Success</primitive-badge>
        <primitive-badge variant="warning">Warning</primitive-badge>
        <primitive-badge variant="error">Error</primitive-badge>
        <primitive-badge variant="info">Info</primitive-badge>
        <primitive-badge variant="neutral">Neutral</primitive-badge>
        <primitive-badge variant="accent">Accent</primitive-badge>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <primitive-badge size="sm">Small</primitive-badge>
        <primitive-badge size="md">Medium</primitive-badge>
        <primitive-badge size="lg">Large</primitive-badge>
      </div>
    `,
  }),
};

export const Shapes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <primitive-badge shape="rounded">Rounded</primitive-badge>
        <primitive-badge shape="pill">Pill</primitive-badge>
      </div>
    `,
  }),
};

export const OutlineVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <primitive-badge variant="primary" appearance="outline">Primary</primitive-badge>
        <primitive-badge variant="secondary" appearance="outline">Secondary</primitive-badge>
        <primitive-badge variant="success" appearance="outline">Success</primitive-badge>
        <primitive-badge variant="warning" appearance="outline">Warning</primitive-badge>
        <primitive-badge variant="error" appearance="outline">Error</primitive-badge>
        <primitive-badge variant="info" appearance="outline">Info</primitive-badge>
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  render: () => ({
    props: {
      faCheck,
      faStar,
      faCircle,
    },
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <primitive-badge [iconStart]="faCheck" variant="success">Validé</primitive-badge>
        <primitive-badge [iconStart]="faStar" variant="warning">Favori</primitive-badge>
        <primitive-badge [iconStart]="faCircle" variant="info">Status</primitive-badge>
      </div>
    `,
  }),
};

export const CountBadges: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <primitive-badge type="count" variant="error" shape="pill">3</primitive-badge>
        <primitive-badge type="count" variant="primary" shape="pill">12</primitive-badge>
        <primitive-badge type="count" variant="info" shape="pill">99+</primitive-badge>
      </div>
    `,
  }),
};
