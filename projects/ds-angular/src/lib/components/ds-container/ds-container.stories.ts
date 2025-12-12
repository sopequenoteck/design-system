import { Meta, StoryObj } from '@storybook/angular';
import { DsContainer } from './ds-container';

const meta: Meta<DsContainer> = {
  title: 'Foundation/Layout/DsContainer',
  component: DsContainer,
  parameters: {
    docs: {
      description: {
        component: `
**DsContainer** est un composant de mise en page permettant de créer des conteneurs responsive avec largeurs maximales configurables, gutters, et centrage automatique.

### Caractéristiques principales
- Largeurs maximales prédéfinies (fluid, sm, md, lg, xl, 2xl)
- Centrage horizontal automatique (optionnel)
- Gutters configurables (none, sm, md, lg) pour padding horizontal
- PaddingY configurable (none, sm, md, lg) pour padding vertical
- Support des conteneurs imbriqués
- Responsive par design (s'adapte aux breakpoints)

### Utilisation
\`\`\`html
<ds-container maxWidth="lg" gutter="md" paddingY="lg" [center]="true">
  <p>Contenu centré avec largeur maximale de 960px</p>
</ds-container>
\`\`\`

### Largeurs maximales
- \`fluid\`: 100% (pas de limite)
- \`sm\`: 540px
- \`md\`: 720px
- \`lg\`: 960px
- \`xl\`: 1140px
- \`2xl\`: 1320px

### Cas d'usage
- Sections de page centrées
- Layouts responsive
- Grilles avec marges cohérentes
- Conteneurs de contenu éditorial
        `,
      },
    },
  },
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

export const Themed: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div class="theme-light" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Light</h4>
          <ds-container maxWidth="md" gutter="md">
            <p style="color: var(--text-default);">Content in container</p>
          </ds-container>
        </div>
        <div class="theme-dark" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Dark</h4>
          <ds-container maxWidth="md" gutter="md">
            <p style="color: var(--text-default);">Content in container</p>
          </ds-container>
        </div>
        <div class="theme-custom" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Custom</h4>
          <ds-container maxWidth="md" gutter="md">
            <p style="color: var(--text-default);">Content in container</p>
          </ds-container>
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
