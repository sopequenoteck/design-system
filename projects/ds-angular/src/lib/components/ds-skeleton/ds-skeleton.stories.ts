import { Meta, StoryObj, argsToTemplate } from '@storybook/angular';
import { DsSkeleton } from './ds-skeleton';

const meta: Meta<DsSkeleton> = {
  title: 'Components/DsSkeleton',
  component: DsSkeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circle', 'rectangle', 'card'],
      description: 'Type de skeleton',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille (pour circle et rectangle)',
    },
    lines: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Nombre de lignes (pour text)',
    },
    width: {
      control: 'text',
      description: 'Largeur personnalisée',
    },
    height: {
      control: 'text',
      description: 'Hauteur personnalisée',
    },
    noAnimation: {
      control: 'boolean',
      description: 'Désactiver l\'animation pulse',
    },
    ariaLabel: {
      control: 'text',
      description: 'Label accessible',
    },
  },
};

export default meta;
type Story = StoryObj<DsSkeleton>;

export const TextSingle: Story = {
  args: {
    variant: 'text',
    lines: 1,
  },
  render: (args) => ({
    props: args,
    template: `<ds-skeleton ${argsToTemplate(args)}></ds-skeleton>`,
  }),
};

export const TextMultiple: Story = {
  args: {
    variant: 'text',
    lines: 5,
  },
  render: (args) => ({
    props: args,
    template: `<ds-skeleton ${argsToTemplate(args)}></ds-skeleton>`,
  }),
};

export const Circle: Story = {
  args: {
    variant: 'circle',
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: `<ds-skeleton ${argsToTemplate(args)}></ds-skeleton>`,
  }),
};

export const CircleSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 2rem;">
        <div>
          <p style="margin-bottom: 0.5rem; font-weight: 600; font-size: 0.875rem;">Small</p>
          <ds-skeleton variant="circle" size="sm"></ds-skeleton>
        </div>
        <div>
          <p style="margin-bottom: 0.5rem; font-weight: 600; font-size: 0.875rem;">Medium</p>
          <ds-skeleton variant="circle" size="md"></ds-skeleton>
        </div>
        <div>
          <p style="margin-bottom: 0.5rem; font-weight: 600; font-size: 0.875rem;">Large</p>
          <ds-skeleton variant="circle" size="lg"></ds-skeleton>
        </div>
      </div>
    `,
  }),
};

export const Rectangle: Story = {
  args: {
    variant: 'rectangle',
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: `<ds-skeleton ${argsToTemplate(args)}></ds-skeleton>`,
  }),
};

export const RectangleCustom: Story = {
  args: {
    variant: 'rectangle',
    width: '400px',
    height: '250px',
  },
  render: (args) => ({
    props: args,
    template: `<ds-skeleton ${argsToTemplate(args)}></ds-skeleton>`,
  }),
};

export const Card: Story = {
  args: {
    variant: 'card',
  },
  render: (args) => ({
    props: args,
    template: `<ds-skeleton ${argsToTemplate(args)}></ds-skeleton>`,
  }),
};

export const NoAnimation: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <p style="margin-bottom: 0.5rem; font-weight: 600;">Avec animation (par défaut)</p>
          <ds-skeleton variant="text" [lines]="3"></ds-skeleton>
        </div>
        <div>
          <p style="margin-bottom: 0.5rem; font-weight: 600;">Sans animation</p>
          <ds-skeleton variant="text" [lines]="3" [noAnimation]="true"></ds-skeleton>
        </div>
      </div>
    `,
  }),
};

export const ArticleLoading: Story = {
  render: () => ({
    template: `
      <article style="max-width: 600px; padding: 1.5rem; border: 1px solid var(--border-default); border-radius: var(--radius-2);">
        <!-- Header avec avatar et titre -->
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
          <ds-skeleton variant="circle" size="md"></ds-skeleton>
          <div style="flex: 1;">
            <ds-skeleton variant="text" [lines]="2"></ds-skeleton>
          </div>
        </div>

        <!-- Image principale -->
        <ds-skeleton variant="rectangle" [width]="'100%'" [height]="'300px'"></ds-skeleton>

        <!-- Contenu textuel -->
        <div style="margin-top: 1.5rem;">
          <ds-skeleton variant="text" [lines]="6"></ds-skeleton>
        </div>
      </article>
    `,
  }),
};

export const UserListLoading: Story = {
  render: () => ({
    template: `
      <div style="max-width: 400px;">
        <h4 style="margin-bottom: 1rem;">Utilisateurs</h4>

        @for (item of [1,2,3,4,5]; track item) {
          <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border-bottom: 1px solid var(--border-subtle);">
            <ds-skeleton variant="circle" size="sm"></ds-skeleton>
            <div style="flex: 1;">
              <ds-skeleton variant="text" [lines]="2"></ds-skeleton>
            </div>
          </div>
        }
      </div>
    `,
  }),
};

export const CardGridLoading: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
        @for (item of [1,2,3]; track item) {
          <ds-skeleton variant="card"></ds-skeleton>
        }
      </div>
    `,
  }),
};
