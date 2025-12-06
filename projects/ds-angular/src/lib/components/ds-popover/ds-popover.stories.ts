import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DsPopover } from './ds-popover.directive';
import { DsButton } from '../ds-button/ds-button';

const meta: Meta = {
  title: 'Components/Overlays/DsPopover',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DsPopover, DsButton],
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => ({
    template: `
      <ng-template #popoverContent>
        <div style="padding: 12px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); max-width: 250px;">
          <h4 style="margin: 0 0 8px;">Titre du popover</h4>
          <p style="margin: 0; color: #6b7280; font-size: 14px;">Contenu du popover avec des informations supplémentaires.</p>
        </div>
      </ng-template>

      <ds-button [dsPopover]="popoverContent">Cliquez-moi</ds-button>
    `,
  }),
};

export const HoverTrigger: Story = {
  render: () => ({
    template: `
      <ng-template #hoverContent>
        <div style="padding: 12px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          <p style="margin: 0; font-size: 14px;">Ce popover s'affiche au survol</p>
        </div>
      </ng-template>

      <ds-button [dsPopover]="hoverContent" dsPopoverTrigger="hover">Survolez-moi</ds-button>
    `,
  }),
};

export const UserMenu: Story = {
  render: () => ({
    template: `
      <ng-template #userMenu>
        <div style="padding: 8px 0; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); min-width: 180px;">
          <button style="display: block; width: 100%; padding: 8px 16px; text-align: left; background: none; border: none; cursor: pointer; font-size: 14px;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='none'">Mon profil</button>
          <button style="display: block; width: 100%; padding: 8px 16px; text-align: left; background: none; border: none; cursor: pointer; font-size: 14px;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='none'">Paramètres</button>
          <button style="display: block; width: 100%; padding: 8px 16px; text-align: left; background: none; border: none; cursor: pointer; font-size: 14px;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='none'">Facturation</button>
          <hr style="margin: 8px 0; border: none; border-top: 1px solid #e5e7eb;">
          <button style="display: block; width: 100%; padding: 8px 16px; text-align: left; background: none; border: none; cursor: pointer; font-size: 14px; color: #ef4444;" onmouseover="this.style.background='#fef2f2'" onmouseout="this.style.background='none'">Déconnexion</button>
        </div>
      </ng-template>

      <ds-button [dsPopover]="userMenu" variant="secondary">John Doe</ds-button>
    `,
  }),
};

export const InfoPopover: Story = {
  render: () => ({
    template: `
      <ng-template #infoContent>
        <div style="padding: 16px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); max-width: 300px;">
          <h4 style="margin: 0 0 8px; display: flex; align-items: center; gap: 8px;">
            <span style="color: #3b82f6;">ℹ️</span> Informations
          </h4>
          <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
            Ce champ est utilisé pour identifier l'utilisateur de manière unique dans le système.
            Il doit contenir entre 3 et 20 caractères alphanumériques.
          </p>
        </div>
      </ng-template>

      <div style="display: flex; align-items: center; gap: 8px;">
        <span>Identifiant</span>
        <button [dsPopover]="infoContent" dsPopoverTrigger="hover" style="background: none; border: none; cursor: pointer; color: #6b7280; font-size: 16px;">ℹ️</button>
      </div>
    `,
  }),
};

export const ConfirmAction: Story = {
  render: () => ({
    template: `
      <ng-template #confirmContent>
        <div style="padding: 16px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); max-width: 250px;">
          <p style="margin: 0 0 12px; font-weight: 500;">Supprimer cet élément ?</p>
          <p style="margin: 0 0 16px; color: #6b7280; font-size: 14px;">Cette action est irréversible.</p>
          <div style="display: flex; gap: 8px; justify-content: flex-end;">
            <ds-button variant="ghost" size="sm">Annuler</ds-button>
            <ds-button variant="error" size="sm">Supprimer</ds-button>
          </div>
        </div>
      </ng-template>

      <ds-button variant="error" [dsPopover]="confirmContent">Supprimer</ds-button>
    `,
  }),
};

export const NoCloseOnBackdrop: Story = {
  render: () => ({
    template: `
      <ng-template #persistentContent>
        <div style="padding: 12px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          <p style="margin: 0; font-size: 14px;">Ce popover ne se ferme pas au clic extérieur. Utilisez Escape ou cliquez à nouveau sur le bouton.</p>
        </div>
      </ng-template>

      <ds-button [dsPopover]="persistentContent" [dsPopoverCloseOnBackdrop]="false">Popover persistant</ds-button>
    `,
  }),
};
