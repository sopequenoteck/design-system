import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DsTooltip } from './ds-tooltip.directive';
import { DsButton } from '../ds-button/ds-button';

const meta: Meta = {
  title: 'Components/Overlays/DsTooltip',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DsTooltip, DsButton],
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => ({
    template: `
      <ds-button dsTooltip="Ceci est un tooltip">Survolez-moi</ds-button>
    `,
  }),
};

export const OnText: Story = {
  render: () => ({
    template: `
      <p>
        Survolez ce
        <span dsTooltip="Explication du terme technique" style="text-decoration: underline; cursor: help;">terme technique</span>
        pour voir l'explication.
      </p>
    `,
  }),
};

export const OnIcons: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px;">
        <button dsTooltip="Paramètres" style="background: none; border: none; cursor: pointer; font-size: 20px;">⚙️</button>
        <button dsTooltip="Notifications" style="background: none; border: none; cursor: pointer; font-size: 20px;">🔔</button>
        <button dsTooltip="Profil" style="background: none; border: none; cursor: pointer; font-size: 20px;">👤</button>
        <button dsTooltip="Aide" style="background: none; border: none; cursor: pointer; font-size: 20px;">❓</button>
      </div>
    `,
  }),
};

export const LongText: Story = {
  render: () => ({
    template: `
      <ds-button dsTooltip="Ceci est un tooltip avec un texte plus long qui explique en détail la fonctionnalité de ce bouton">
        Tooltip long
      </ds-button>
    `,
  }),
};

export const WithButtons: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px;">
        <ds-button dsTooltip="Créer un nouvel élément">Nouveau</ds-button>
        <ds-button variant="secondary" dsTooltip="Modifier l'élément sélectionné">Modifier</ds-button>
        <ds-button variant="error" dsTooltip="Supprimer définitivement">Supprimer</ds-button>
      </div>
    `,
  }),
};

export const DisabledButton: Story = {
  render: () => ({
    template: `
      <span dsTooltip="Ce bouton est désactivé car vous n'avez pas les permissions nécessaires">
        <ds-button [disabled]="true">Action restreinte</ds-button>
      </span>
    `,
  }),
};

export const FormHelp: Story = {
  render: () => ({
    template: `
      <div style="max-width: 300px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <label style="font-weight: 500;">Email</label>
          <span dsTooltip="Nous utiliserons cet email uniquement pour vous contacter en cas de besoin" style="cursor: help; color: #6b7280;">ℹ️</span>
        </div>
        <input type="email" placeholder="email@exemple.com" style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px;">
      </div>
    `,
  }),
};

export const Toolbar: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 4px; padding: 8px; background: #f3f4f6; border-radius: 8px; width: fit-content;">
        <button dsTooltip="Gras (Ctrl+B)" style="padding: 8px; background: white; border: 1px solid #e5e7eb; border-radius: 4px; cursor: pointer; font-weight: bold;">B</button>
        <button dsTooltip="Italique (Ctrl+I)" style="padding: 8px; background: white; border: 1px solid #e5e7eb; border-radius: 4px; cursor: pointer; font-style: italic;">I</button>
        <button dsTooltip="Souligné (Ctrl+U)" style="padding: 8px; background: white; border: 1px solid #e5e7eb; border-radius: 4px; cursor: pointer; text-decoration: underline;">U</button>
        <div style="width: 1px; background: #e5e7eb; margin: 0 4px;"></div>
        <button dsTooltip="Aligner à gauche" style="padding: 8px; background: white; border: 1px solid #e5e7eb; border-radius: 4px; cursor: pointer;">⬅️</button>
        <button dsTooltip="Centrer" style="padding: 8px; background: white; border: 1px solid #e5e7eb; border-radius: 4px; cursor: pointer;">↔️</button>
        <button dsTooltip="Aligner à droite" style="padding: 8px; background: white; border: 1px solid #e5e7eb; border-radius: 4px; cursor: pointer;">➡️</button>
      </div>
    `,
  }),
};
