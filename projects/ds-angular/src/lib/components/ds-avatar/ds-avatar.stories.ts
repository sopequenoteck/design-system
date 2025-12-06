import type { Meta, StoryObj } from '@storybook/angular';
import { DsAvatar } from './ds-avatar';

const meta: Meta<DsAvatar> = {
  title: 'Components/Data Display/DsAvatar',
  component: DsAvatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Taille de l\'avatar',
    },
    shape: {
      control: 'select',
      options: ['circle', 'rounded', 'square'],
      description: 'Forme de l\'avatar',
    },
    src: {
      control: 'text',
      description: 'URL de l\'image',
    },
    alt: {
      control: 'text',
      description: 'Texte alternatif',
    },
    name: {
      control: 'text',
      description: 'Nom pour générer les initiales',
    },
    initials: {
      control: 'text',
      description: 'Initiales personnalisées',
    },
    autoColor: {
      control: 'boolean',
      description: 'Générer une couleur automatique',
    },
  },
};

export default meta;
type Story = StoryObj<DsAvatar>;

// === DEFAULT ===

export const Default: Story = {
  args: {
    name: 'John Doe',
    size: 'md',
    shape: 'circle',
  },
};

// === AVEC IMAGE ===

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'Avatar utilisateur',
    size: 'md',
    shape: 'circle',
  },
};

// === AVEC INITIALES ===

export const WithInitials: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <ds-avatar name="Alice Martin"></ds-avatar>
        <ds-avatar name="Bob"></ds-avatar>
        <ds-avatar initials="XY"></ds-avatar>
        <ds-avatar name="Jean Pierre Dupont"></ds-avatar>
      </div>
    `,
  }),
};

// === TOUTES LES TAILLES ===

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <ds-avatar size="sm" name="Small"></ds-avatar>
        <ds-avatar size="md" name="Medium"></ds-avatar>
        <ds-avatar size="lg" name="Large"></ds-avatar>
        <ds-avatar size="xl" name="XLarge"></ds-avatar>
      </div>
    `,
  }),
};

// === TOUTES LES FORMES ===

export const AllShapes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <ds-avatar shape="circle" name="Circle" size="lg"></ds-avatar>
        <ds-avatar shape="rounded" name="Rounded" size="lg"></ds-avatar>
        <ds-avatar shape="square" name="Square" size="lg"></ds-avatar>
      </div>
    `,
  }),
};

// === FALLBACK IMAGE ===

export const ImageFallback: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <div>
          <p style="margin-bottom: 8px; font-size: 12px; color: #666;">Image valide</p>
          <ds-avatar
            src="https://i.pravatar.cc/150?img=2"
            name="John Doe"
            size="lg">
          </ds-avatar>
        </div>
        <div>
          <p style="margin-bottom: 8px; font-size: 12px; color: #666;">Image invalide (fallback)</p>
          <ds-avatar
            src="https://invalid-url.com/avatar.jpg"
            name="John Doe"
            size="lg">
          </ds-avatar>
        </div>
      </div>
    `,
  }),
};

// === COULEURS AUTO-GÉNÉRÉES ===

export const AutoColoredInitials: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <ds-avatar name="Alice" [autoColor]="true"></ds-avatar>
        <ds-avatar name="Bob" [autoColor]="true"></ds-avatar>
        <ds-avatar name="Charlie" [autoColor]="true"></ds-avatar>
        <ds-avatar name="Diana" [autoColor]="true"></ds-avatar>
        <ds-avatar name="Edward" [autoColor]="true"></ds-avatar>
        <ds-avatar name="Fiona" [autoColor]="true"></ds-avatar>
        <ds-avatar name="George" [autoColor]="true"></ds-avatar>
        <ds-avatar name="Hannah" [autoColor]="true"></ds-avatar>
      </div>
    `,
  }),
};

// === THEMED (LIGHT/DARK) ===

export const Themed: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 32px;">
        <div class="theme-light" style="padding: 24px; background: #fafafa; border-radius: 8px;">
          <p style="margin-bottom: 12px; font-weight: 600;">Light Theme</p>
          <div style="display: flex; gap: 12px;">
            <ds-avatar name="Light User" size="lg"></ds-avatar>
            <ds-avatar src="https://i.pravatar.cc/150?img=3" size="lg"></ds-avatar>
          </div>
        </div>
        <div class="theme-dark" style="padding: 24px; background: #171717; border-radius: 8px;">
          <p style="margin-bottom: 12px; font-weight: 600; color: #fafafa;">Dark Theme</p>
          <div style="display: flex; gap: 12px;">
            <ds-avatar name="Dark User" size="lg"></ds-avatar>
            <ds-avatar src="https://i.pravatar.cc/150?img=4" size="lg"></ds-avatar>
          </div>
        </div>
      </div>
    `,
  }),
};

// === GROUPE D'AVATARS ===

export const AvatarGroup: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center;">
        <div style="display: flex;">
          <ds-avatar
            src="https://i.pravatar.cc/150?img=1"
            size="md"
            style="margin-left: -8px; border: 2px solid white; box-sizing: content-box;">
          </ds-avatar>
          <ds-avatar
            src="https://i.pravatar.cc/150?img=2"
            size="md"
            style="margin-left: -8px; border: 2px solid white; box-sizing: content-box;">
          </ds-avatar>
          <ds-avatar
            src="https://i.pravatar.cc/150?img=3"
            size="md"
            style="margin-left: -8px; border: 2px solid white; box-sizing: content-box;">
          </ds-avatar>
          <ds-avatar
            initials="+5"
            size="md"
            style="margin-left: -8px; border: 2px solid white; box-sizing: content-box;">
          </ds-avatar>
        </div>
        <span style="margin-left: 12px; color: #666;">8 membres</span>
      </div>
    `,
  }),
};
