import type { Meta, StoryObj } from '@storybook/angular';
import { DsDivider } from './ds-divider';

const meta: Meta<DsDivider> = {
  title: 'Components/Layout/DsDivider',
  component: DsDivider,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation du séparateur',
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
      description: 'Style de ligne',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Épaisseur du séparateur',
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Position du label (horizontal uniquement)',
    },
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Marge autour du divider',
    },
  },
};

export default meta;
type Story = StoryObj<DsDivider>;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    size: 'md',
    labelPosition: 'center',
    spacing: 'md',
  },
  render: (args) => ({
    props: args,
    template: `
      <div>
        <p>Contenu avant le divider</p>
        <ds-divider
          [orientation]="orientation"
          [variant]="variant"
          [size]="size"
          [labelPosition]="labelPosition"
          [spacing]="spacing">
        </ds-divider>
        <p>Contenu après le divider</p>
      </div>
    `,
  }),
};

export const WithLabel: Story = {
  render: () => ({
    template: `
      <div>
        <p>Section 1</p>
        <ds-divider>Section suivante</ds-divider>
        <p>Section 2</p>
        <ds-divider>Encore une section</ds-divider>
        <p>Section 3</p>
      </div>
    `,
  }),
};

export const LabelPositions: Story = {
  render: () => ({
    template: `
      <div>
        <ds-divider labelPosition="left">Gauche</ds-divider>
        <p>Contenu</p>
        <ds-divider labelPosition="center">Centre</ds-divider>
        <p>Contenu</p>
        <ds-divider labelPosition="right">Droite</ds-divider>
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div>
        <ds-divider variant="solid">Solid (ligne continue)</ds-divider>
        <p>Contenu</p>
        <ds-divider variant="dashed">Dashed (tirets)</ds-divider>
        <p>Contenu</p>
        <ds-divider variant="dotted">Dotted (pointillés)</ds-divider>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div>
        <ds-divider size="sm">Small (1px)</ds-divider>
        <p>Contenu</p>
        <ds-divider size="md">Medium (2px)</ds-divider>
        <p>Contenu</p>
        <ds-divider size="lg">Large (3px)</ds-divider>
      </div>
    `,
  }),
};

export const Spacing: Story = {
  render: () => ({
    template: `
      <div>
        <p>Spacing none (pas de marge)</p>
        <ds-divider spacing="none"></ds-divider>
        <p>Contenu collé au divider</p>

        <p style="margin-top: 32px;">Spacing small (8px)</p>
        <ds-divider spacing="sm"></ds-divider>
        <p>Espacement réduit</p>

        <p style="margin-top: 32px;">Spacing medium (16px)</p>
        <ds-divider spacing="md"></ds-divider>
        <p>Espacement standard</p>

        <p style="margin-top: 32px;">Spacing large (24px)</p>
        <ds-divider spacing="lg"></ds-divider>
        <p>Espacement large</p>
      </div>
    `,
  }),
};

export const Vertical: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; height: 200px; gap: 16px;">
        <div style="flex: 1; padding: 16px; background: var(--surface-default); border-radius: 8px;">
          <h3 style="margin: 0 0 8px;">Colonne 1</h3>
          <p style="margin: 0;">Contenu de la première colonne avec du texte d'exemple.</p>
        </div>

        <ds-divider orientation="vertical"></ds-divider>

        <div style="flex: 1; padding: 16px; background: var(--surface-default); border-radius: 8px;">
          <h3 style="margin: 0 0 8px;">Colonne 2</h3>
          <p style="margin: 0;">Contenu de la deuxième colonne avec du texte d'exemple.</p>
        </div>

        <ds-divider orientation="vertical" variant="dashed"></ds-divider>

        <div style="flex: 1; padding: 16px; background: var(--surface-default); border-radius: 8px;">
          <h3 style="margin: 0 0 8px;">Colonne 3</h3>
          <p style="margin: 0;">Contenu de la troisième colonne avec du texte d'exemple.</p>
        </div>
      </div>
    `,
  }),
};

export const VerticalWithSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; height: 150px; gap: 24px;">
        <div>
          <p>Small</p>
          <ds-divider orientation="vertical" size="sm"></ds-divider>
        </div>

        <div>
          <p>Medium</p>
          <ds-divider orientation="vertical" size="md"></ds-divider>
        </div>

        <div>
          <p>Large</p>
          <ds-divider orientation="vertical" size="lg"></ds-divider>
        </div>

        <div>
          <p>Solid</p>
          <ds-divider orientation="vertical" variant="solid"></ds-divider>
        </div>

        <div>
          <p>Dashed</p>
          <ds-divider orientation="vertical" variant="dashed"></ds-divider>
        </div>

        <div>
          <p>Dotted</p>
          <ds-divider orientation="vertical" variant="dotted"></ds-divider>
        </div>
      </div>
    `,
  }),
};

export const InCard: Story = {
  render: () => ({
    template: `
      <div style="max-width: 400px; padding: 24px; border: 1px solid var(--border-color); border-radius: 8px;">
        <h2 style="margin: 0;">Titre de la carte</h2>
        <ds-divider spacing="md"></ds-divider>
        <p style="margin: 0 0 16px;">Premier paragraphe de contenu avec des informations importantes.</p>
        <ds-divider variant="dashed" size="sm">Section 2</ds-divider>
        <p style="margin: 0 0 16px;">Deuxième paragraphe après un divider avec label.</p>
        <ds-divider spacing="md"></ds-divider>
        <div style="display: flex; gap: 8px; justify-content: flex-end;">
          <button style="padding: 8px 16px; border: 1px solid var(--border-color); background: transparent; border-radius: 4px; cursor: pointer;">
            Annuler
          </button>
          <button style="padding: 8px 16px; border: none; background: var(--color-primary); color: white; border-radius: 4px; cursor: pointer;">
            Confirmer
          </button>
        </div>
      </div>
    `,
  }),
};

export const AllCombinations: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;">
        <div>
          <h4 style="margin: 0 0 16px;">Solid</h4>
          <ds-divider variant="solid" size="sm"></ds-divider>
          <p style="margin: 8px 0;">Small</p>
          <ds-divider variant="solid" size="md"></ds-divider>
          <p style="margin: 8px 0;">Medium</p>
          <ds-divider variant="solid" size="lg"></ds-divider>
          <p style="margin: 8px 0;">Large</p>
        </div>

        <div>
          <h4 style="margin: 0 0 16px;">Dashed</h4>
          <ds-divider variant="dashed" size="sm"></ds-divider>
          <p style="margin: 8px 0;">Small</p>
          <ds-divider variant="dashed" size="md"></ds-divider>
          <p style="margin: 8px 0;">Medium</p>
          <ds-divider variant="dashed" size="lg"></ds-divider>
          <p style="margin: 8px 0;">Large</p>
        </div>

        <div>
          <h4 style="margin: 0 0 16px;">Dotted</h4>
          <ds-divider variant="dotted" size="sm"></ds-divider>
          <p style="margin: 8px 0;">Small</p>
          <ds-divider variant="dotted" size="md"></ds-divider>
          <p style="margin: 8px 0;">Medium</p>
          <ds-divider variant="dotted" size="lg"></ds-divider>
          <p style="margin: 8px 0;">Large</p>
        </div>
      </div>
    `,
  }),
};

export const Themed: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div class="theme-light" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Light</h4>
          <ds-divider label="Section"></ds-divider>
        </div>
        <div class="theme-dark" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Dark</h4>
          <ds-divider label="Section"></ds-divider>
        </div>
        <div class="theme-custom" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Custom</h4>
          <ds-divider label="Section"></ds-divider>
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
