import type { Meta, StoryObj } from '@storybook/angular';
import { DsBadge } from './ds-badge';
import { faCheck, faStar, faCircle } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<DsBadge> = {
  title: 'Data Display/DsBadge',
  component: DsBadge,
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral', 'accent'],
      description: 'Type/Variante',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille',
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline'],
      description: 'Apparence',
    },
    shape: {
      control: 'select',
      options: ['default', 'pill', 'square'],
      description: 'Forme',
    },
    color: {
      control: 'color',
      description: 'Couleur personnalisée',
    },
  },
};

export default meta;
type Story = StoryObj<DsBadge>;

export const Default: Story = {
  args: {
    type: 'default',
    size: 'md',
    variant: 'solid',
    shape: 'default',
  },
  render: (args) => ({
    props: args,
    template: `<ds-badge [type]="type" [size]="size" [variant]="variant" [shape]="shape">Badge</ds-badge>`,
  }),
};

export const AllTypes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <ds-badge type="default">Default</ds-badge>
        <ds-badge type="primary">Primary</ds-badge>
        <ds-badge type="secondary">Secondary</ds-badge>
        <ds-badge type="success">Success</ds-badge>
        <ds-badge type="warning">Warning</ds-badge>
        <ds-badge type="error">Error</ds-badge>
        <ds-badge type="info">Info</ds-badge>
        <ds-badge type="accent">Accent</ds-badge>
      </div>
    `,
  }),
};

export const Outline: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <ds-badge type="primary" variant="outline">Primary</ds-badge>
        <ds-badge type="success" variant="outline">Success</ds-badge>
        <ds-badge type="warning" variant="outline">Warning</ds-badge>
        <ds-badge type="error" variant="outline">Error</ds-badge>
        <ds-badge type="info" variant="outline">Info</ds-badge>
      </div>
    `,
  }),
};

export const Shapes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <ds-badge shape="default">Default</ds-badge>
        <ds-badge shape="pill">Pill</ds-badge>
        <ds-badge shape="square">Square</ds-badge>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <ds-badge size="sm">Small</ds-badge>
        <ds-badge size="md">Medium</ds-badge>
        <ds-badge size="lg">Large</ds-badge>
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
        <ds-badge [iconStart]="faCheck" type="success">Validé</ds-badge>
        <ds-badge [iconStart]="faStar" type="warning">Favori</ds-badge>
        <ds-badge [iconStart]="faCircle" type="info">Status</ds-badge>
      </div>
    `,
  }),
};

export const CustomColor: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <ds-badge color="#9333ea">Violet</ds-badge>
        <ds-badge color="#f97316" variant="outline">Orange</ds-badge>
        <ds-badge color="rgb(14, 165, 233)">Cyan</ds-badge>
      </div>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <p style="margin: 0 0 8px; font-weight: 600;">Status States</p>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <ds-badge type="success">Actif</ds-badge>
            <ds-badge type="warning">En attente</ds-badge>
            <ds-badge type="error">Désactivé</ds-badge>
            <ds-badge type="info">En cours</ds-badge>
            <ds-badge type="default">Brouillon</ds-badge>
          </div>
        </div>
        <div>
          <p style="margin: 0 0 8px; font-weight: 600;">Notification Count</p>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
            <ds-badge type="error" shape="pill" size="sm">3</ds-badge>
            <ds-badge type="primary" shape="pill" size="sm">12</ds-badge>
            <ds-badge type="warning" shape="pill" size="sm">99+</ds-badge>
          </div>
        </div>
        <div>
          <p style="margin: 0 0 8px; font-weight: 600;">Roles & Permissions</p>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <ds-badge type="primary" variant="outline">Admin</ds-badge>
            <ds-badge type="success" variant="outline">Editeur</ds-badge>
            <ds-badge type="default" variant="outline">Lecteur</ds-badge>
          </div>
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
          <ds-badge variant="primary">Badge</ds-badge>
        </div>
        <div class="theme-dark" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Dark</h4>
          <ds-badge variant="primary">Badge</ds-badge>
        </div>
        <div class="theme-custom" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Custom</h4>
          <ds-badge variant="primary">Badge</ds-badge>
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
