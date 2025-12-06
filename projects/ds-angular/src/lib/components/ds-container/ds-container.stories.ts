import { Meta, StoryObj } from '@storybook/angular';
import { DsContainer } from './ds-container';

const meta: Meta<DsContainer> = {
  title: 'Components/Layout/DsContainer',
  component: DsContainer,
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['fluid', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Largeur maximale du conteneur',
    },
    center: {
      control: 'boolean',
      description: 'Centrer le conteneur horizontalement',
    },
    gutter: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Padding horizontal (gutter)',
    },
    paddingY: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Padding vertical',
    },
    customClass: {
      control: 'text',
      description: 'Classe CSS additionnelle',
    },
  },
  decorators: [
    (story) => ({
      template: `<div style="background: var(--background-subtle, #f5f5f5); min-height: 200px;">${story().template}</div>`,
    }),
  ],
};

export default meta;
type Story = StoryObj<DsContainer>;

const sampleContent = `
  <div style="background: var(--color-primary, #3b82f6); color: white; padding: 24px; border-radius: 8px;">
    <h3 style="margin: 0 0 8px;">Contenu du conteneur</h3>
    <p style="margin: 0;">Ce conteneur s'adapte automatiquement selon les paramètres choisis.</p>
  </div>
`;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-container
        [maxWidth]="maxWidth"
        [center]="center"
        [gutter]="gutter"
        [paddingY]="paddingY">
        ${sampleContent}
      </ds-container>
    `,
  }),
  args: {
    maxWidth: 'lg',
    center: true,
    gutter: 'md',
    paddingY: 'none',
  },
};

export const Fluid: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-container maxWidth="fluid" gutter="md">
        ${sampleContent}
      </ds-container>
    `,
  }),
};

export const Small: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-container maxWidth="sm" gutter="md">
        ${sampleContent}
      </ds-container>
    `,
  }),
};

export const ExtraLarge: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-container maxWidth="2xl" gutter="lg">
        ${sampleContent}
      </ds-container>
    `,
  }),
};

export const WithPaddingY: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-container maxWidth="lg" gutter="md" paddingY="lg">
        ${sampleContent}
      </ds-container>
    `,
  }),
};

export const NotCentered: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-container maxWidth="md" [center]="false" gutter="md">
        ${sampleContent}
      </ds-container>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <p style="margin: 0 0 8px; color: var(--text-muted);">fluid (100%)</p>
          <ds-container maxWidth="fluid" gutter="sm">
            <div style="background: var(--color-primary); color: white; padding: 16px; border-radius: 4px; text-align: center;">fluid</div>
          </ds-container>
        </div>
        <div>
          <p style="margin: 0 0 8px; color: var(--text-muted);">sm (540px)</p>
          <ds-container maxWidth="sm" gutter="sm">
            <div style="background: var(--color-primary); color: white; padding: 16px; border-radius: 4px; text-align: center;">sm</div>
          </ds-container>
        </div>
        <div>
          <p style="margin: 0 0 8px; color: var(--text-muted);">md (720px)</p>
          <ds-container maxWidth="md" gutter="sm">
            <div style="background: var(--color-primary); color: white; padding: 16px; border-radius: 4px; text-align: center;">md</div>
          </ds-container>
        </div>
        <div>
          <p style="margin: 0 0 8px; color: var(--text-muted);">lg (960px)</p>
          <ds-container maxWidth="lg" gutter="sm">
            <div style="background: var(--color-primary); color: white; padding: 16px; border-radius: 4px; text-align: center;">lg</div>
          </ds-container>
        </div>
        <div>
          <p style="margin: 0 0 8px; color: var(--text-muted);">xl (1140px)</p>
          <ds-container maxWidth="xl" gutter="sm">
            <div style="background: var(--color-primary); color: white; padding: 16px; border-radius: 4px; text-align: center;">xl</div>
          </ds-container>
        </div>
        <div>
          <p style="margin: 0 0 8px; color: var(--text-muted);">2xl (1320px)</p>
          <ds-container maxWidth="2xl" gutter="sm">
            <div style="background: var(--color-primary); color: white; padding: 16px; border-radius: 4px; text-align: center;">2xl</div>
          </ds-container>
        </div>
      </div>
    `,
  }),
};

export const NestedContainers: Story = {
  render: () => ({
    template: `
      <ds-container maxWidth="xl" gutter="md" paddingY="md">
        <div style="background: var(--background-main, white); padding: 24px; border-radius: 8px; border: 1px solid var(--border-default, #e5e7eb);">
          <h2 style="margin: 0 0 16px;">Conteneur parent (xl)</h2>
          <ds-container maxWidth="md" gutter="sm" [center]="false">
            <div style="background: var(--color-primary); color: white; padding: 16px; border-radius: 4px;">
              Conteneur enfant (md, non centré)
            </div>
          </ds-container>
        </div>
      </ds-container>
    `,
  }),
};
