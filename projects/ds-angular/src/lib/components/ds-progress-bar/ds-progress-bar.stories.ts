import { Meta, StoryObj, argsToTemplate } from '@storybook/angular';
import { DsProgressBar } from './ds-progress-bar';

const meta: Meta<DsProgressBar> = {
  title: 'Components/Display/Progress Bar',
  component: DsProgressBar,
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Valeur de progression (0-100)',
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'Variant de couleur',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille de la barre',
    },
    mode: {
      control: 'select',
      options: ['determinate', 'indeterminate'],
      description: 'Mode de progression',
    },
    showLabel: {
      control: 'boolean',
      description: 'Afficher le pourcentage',
    },
    ariaLabel: {
      control: 'text',
      description: 'Label accessible',
    },
  },
};

export default meta;
type Story = StoryObj<DsProgressBar>;

export const Default: Story = {
  args: {
    value: 50,
    variant: 'default',
    size: 'md',
    mode: 'determinate',
    showLabel: false,
  },
  render: (args) => ({
    props: args,
    template: `<ds-progress-bar ${argsToTemplate(args)}></ds-progress-bar>`,
  }),
};

export const WithLabel: Story = {
  args: {
    value: 75,
    variant: 'default',
    size: 'md',
    showLabel: true,
  },
  render: (args) => ({
    props: args,
    template: `<ds-progress-bar ${argsToTemplate(args)}></ds-progress-bar>`,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <p style="margin-bottom: 0.5rem; font-weight: 600;">Default</p>
          <ds-progress-bar [value]="65" variant="default" [showLabel]="true"></ds-progress-bar>
        </div>
        <div>
          <p style="margin-bottom: 0.5rem; font-weight: 600;">Success</p>
          <ds-progress-bar [value]="100" variant="success" [showLabel]="true"></ds-progress-bar>
        </div>
        <div>
          <p style="margin-bottom: 0.5rem; font-weight: 600;">Warning</p>
          <ds-progress-bar [value]="45" variant="warning" [showLabel]="true"></ds-progress-bar>
        </div>
        <div>
          <p style="margin-bottom: 0.5rem; font-weight: 600;">Error</p>
          <ds-progress-bar [value]="20" variant="error" [showLabel]="true"></ds-progress-bar>
        </div>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <p style="margin-bottom: 0.5rem; font-weight: 600;">Small</p>
          <ds-progress-bar [value]="60" size="sm" variant="success"></ds-progress-bar>
        </div>
        <div>
          <p style="margin-bottom: 0.5rem; font-weight: 600;">Medium (default)</p>
          <ds-progress-bar [value]="60" size="md" variant="success"></ds-progress-bar>
        </div>
        <div>
          <p style="margin-bottom: 0.5rem; font-weight: 600;">Large</p>
          <ds-progress-bar [value]="60" size="lg" variant="success"></ds-progress-bar>
        </div>
      </div>
    `,
  }),
};

export const Indeterminate: Story = {
  args: {
    mode: 'indeterminate',
    variant: 'default',
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: `<ds-progress-bar ${argsToTemplate(args)}></ds-progress-bar>`,
  }),
};

export const IndeterminateVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <p style="margin-bottom: 0.5rem; font-weight: 600;">Default</p>
          <ds-progress-bar mode="indeterminate" variant="default"></ds-progress-bar>
        </div>
        <div>
          <p style="margin-bottom: 0.5rem; font-weight: 600;">Success</p>
          <ds-progress-bar mode="indeterminate" variant="success"></ds-progress-bar>
        </div>
        <div>
          <p style="margin-bottom: 0.5rem; font-weight: 600;">Warning</p>
          <ds-progress-bar mode="indeterminate" variant="warning"></ds-progress-bar>
        </div>
        <div>
          <p style="margin-bottom: 0.5rem; font-weight: 600;">Error</p>
          <ds-progress-bar mode="indeterminate" variant="error"></ds-progress-bar>
        </div>
      </div>
    `,
  }),
};

export const ProgressStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <p style="margin-bottom: 0.5rem; font-weight: 600;">Not started (0%)</p>
          <ds-progress-bar [value]="0" [showLabel]="true"></ds-progress-bar>
        </div>
        <div>
          <p style="margin-bottom: 0.5rem; font-weight: 600;">In progress (25%)</p>
          <ds-progress-bar [value]="25" [showLabel]="true"></ds-progress-bar>
        </div>
        <div>
          <p style="margin-bottom: 0.5rem; font-weight: 600;">Half done (50%)</p>
          <ds-progress-bar [value]="50" variant="warning" [showLabel]="true"></ds-progress-bar>
        </div>
        <div>
          <p style="margin-bottom: 0.5rem; font-weight: 600;">Almost complete (90%)</p>
          <ds-progress-bar [value]="90" variant="success" [showLabel]="true"></ds-progress-bar>
        </div>
        <div>
          <p style="margin-bottom: 0.5rem; font-weight: 600;">Complete (100%)</p>
          <ds-progress-bar [value]="100" variant="success" [showLabel]="true"></ds-progress-bar>
        </div>
      </div>
    `,
  }),
};

export const WithCustomAriaLabel: Story = {
  args: {
    value: 80,
    variant: 'success',
    size: 'md',
    showLabel: true,
    ariaLabel: 'Téléchargement du fichier en cours : 80%',
  },
  render: (args) => ({
    props: args,
    template: `
      <div>
        <p style="margin-bottom: 0.5rem;">Téléchargement en cours...</p>
        <ds-progress-bar ${argsToTemplate(args)}></ds-progress-bar>
      </div>
    `,
  }),
};

export const FileUploadExample: Story = {
  render: () => ({
    template: `
      <div style="max-width: 400px; padding: 1.5rem; border: 1px solid var(--border-default); border-radius: var(--radius-2);">
        <h4 style="margin: 0 0 1rem 0;">Téléchargement de fichiers</h4>

        <div style="margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span style="font-size: 0.875rem;">document.pdf</span>
            <span style="font-size: 0.875rem; color: var(--text-muted);">2.4 MB</span>
          </div>
          <ds-progress-bar [value]="100" variant="success" size="sm" [showLabel]="true"></ds-progress-bar>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span style="font-size: 0.875rem;">image.png</span>
            <span style="font-size: 0.875rem; color: var(--text-muted);">1.8 MB</span>
          </div>
          <ds-progress-bar [value]="67" variant="default" size="sm" [showLabel]="true"></ds-progress-bar>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span style="font-size: 0.875rem;">video.mp4</span>
            <span style="font-size: 0.875rem; color: var(--text-muted);">15.2 MB</span>
          </div>
          <ds-progress-bar [value]="12" variant="default" size="sm" [showLabel]="true"></ds-progress-bar>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span style="font-size: 0.875rem;">archive.zip</span>
            <span style="font-size: 0.875rem; color: var(--text-error);">Erreur</span>
          </div>
          <ds-progress-bar [value]="0" variant="error" size="sm"></ds-progress-bar>
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
          <ds-progress-bar [value]="60" [showLabel]="true"></ds-progress-bar>
        </div>
        <div class="theme-dark" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Dark</h4>
          <ds-progress-bar [value]="60" [showLabel]="true"></ds-progress-bar>
        </div>
        <div class="theme-custom" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Custom</h4>
          <ds-progress-bar [value]="60" [showLabel]="true"></ds-progress-bar>
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
