import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DsInputField } from '../ds-input-field/ds-input-field';

// Note: Using DsInputField with textarea type if available, or creating basic textarea story
const meta: Meta = {
  title: 'Components/Forms/DsInputTextarea',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DsInputField],
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => ({
    template: `
      <div style="max-width: 400px;">
        <label style="display: block; margin-bottom: 4px; font-weight: 500;">Description</label>
        <textarea
          placeholder="Entrez votre description..."
          rows="4"
          style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; resize: vertical; font-family: inherit;">
        </textarea>
      </div>
    `,
  }),
};

export const WithHelper: Story = {
  render: () => ({
    template: `
      <div style="max-width: 400px;">
        <label style="display: block; margin-bottom: 4px; font-weight: 500;">Bio</label>
        <textarea
          placeholder="Parlez-nous de vous..."
          rows="4"
          style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; resize: vertical; font-family: inherit;">
        </textarea>
        <p style="margin: 4px 0 0; font-size: 12px; color: #6b7280;">Maximum 500 caractères</p>
      </div>
    `,
  }),
};

export const WithError: Story = {
  render: () => ({
    template: `
      <div style="max-width: 400px;">
        <label style="display: block; margin-bottom: 4px; font-weight: 500;">Message</label>
        <textarea
          placeholder="Votre message..."
          rows="4"
          style="width: 100%; padding: 8px 12px; border: 1px solid #ef4444; border-radius: 6px; resize: vertical; font-family: inherit;">
        </textarea>
        <p style="margin: 4px 0 0; font-size: 12px; color: #ef4444;">Ce champ est obligatoire</p>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="max-width: 400px;">
        <label style="display: block; margin-bottom: 4px; font-weight: 500; color: #9ca3af;">Notes</label>
        <textarea
          disabled
          rows="4"
          style="width: 100%; padding: 8px 12px; border: 1px solid #e5e7eb; border-radius: 6px; resize: vertical; font-family: inherit; background: #f9fafb; color: #9ca3af; cursor: not-allowed;">Contenu en lecture seule</textarea>
      </div>
    `,
  }),
};

export const ResizeModes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500;">Vertical (défaut)</label>
          <textarea rows="3" style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; resize: vertical; font-family: inherit;" placeholder="Redimensionnable verticalement"></textarea>
        </div>
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500;">Horizontal</label>
          <textarea rows="3" style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; resize: horizontal; font-family: inherit;" placeholder="Redimensionnable horizontalement"></textarea>
        </div>
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500;">Les deux</label>
          <textarea rows="3" style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; resize: both; font-family: inherit;" placeholder="Redimensionnable dans les deux sens"></textarea>
        </div>
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500;">Aucun</label>
          <textarea rows="3" style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; resize: none; font-family: inherit;" placeholder="Non redimensionnable"></textarea>
        </div>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500;">Petit (2 lignes)</label>
          <textarea rows="2" style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; resize: vertical; font-family: inherit;" placeholder="Commentaire court..."></textarea>
        </div>
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500;">Moyen (4 lignes)</label>
          <textarea rows="4" style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; resize: vertical; font-family: inherit;" placeholder="Description..."></textarea>
        </div>
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500;">Grand (8 lignes)</label>
          <textarea rows="8" style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; resize: vertical; font-family: inherit;" placeholder="Contenu détaillé..."></textarea>
        </div>
      </div>
    `,
  }),
};

export const WithMaxLength: Story = {
  render: () => ({
    props: {
      value: '',
      maxLength: 200,
      updateCounter: function(event: Event) {
        this["value"] = (event.target as HTMLTextAreaElement).value;
      },
      getRemaining: function() {
        return this["maxLength"] - this["value"].length;
      },
      getColor: function() {
        const remaining = this["getRemaining"]();
        if (remaining < 20) return '#ef4444';
        if (remaining < 50) return '#f59e0b';
        return '#6b7280';
      },
    },
    template: `
      <div style="max-width: 400px;">
        <label style="display: block; margin-bottom: 4px; font-weight: 500;">Message</label>
        <textarea
          [(ngModel)]="value"
          [maxLength]="maxLength"
          rows="4"
          placeholder="Votre message..."
          style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; resize: vertical; font-family: inherit;">
        </textarea>
        <div style="display: flex; justify-content: space-between; margin-top: 4px; font-size: 12px;">
          <span style="color: #6b7280;">{{ value.length }} / {{ maxLength }} caractères</span>
          <span [style.color]="getColor()">{{ getRemaining() }} restants</span>
        </div>
      </div>
    `,
  }),
};

export const Readonly: Story = {
  render: () => ({
    template: `
      <div style="max-width: 400px;">
        <label style="display: block; margin-bottom: 4px; font-weight: 500;">Conditions d'utilisation</label>
        <textarea
          readonly
          rows="6"
          style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; resize: none; font-family: inherit; background: #f9fafb;">En utilisant ce service, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.

Vos données personnelles seront traitées conformément au RGPD.

Ce contenu est en lecture seule et ne peut pas être modifié.</textarea>
        <p style="margin: 4px 0 0; font-size: 12px; color: #6b7280;">📖 Lecture seule (readonly)</p>
      </div>
    `,
  }),
};

export const WithWarning: Story = {
  render: () => ({
    template: `
      <div style="max-width: 400px;">
        <label style="display: block; margin-bottom: 4px; font-weight: 500;">Commentaire</label>
        <textarea
          placeholder="Votre commentaire..."
          rows="4"
          style="width: 100%; padding: 8px 12px; border: 1px solid #f59e0b; border-radius: 6px; resize: vertical; font-family: inherit; background: #fffbeb;">
        </textarea>
        <p style="margin: 4px 0 0; font-size: 12px; color: #d97706;">
          ⚠️ Ce champ sera visible publiquement
        </p>
      </div>
    `,
  }),
};

export const WithSuccess: Story = {
  render: () => ({
    template: `
      <div style="max-width: 400px;">
        <label style="display: block; margin-bottom: 4px; font-weight: 500;">Feedback</label>
        <textarea
          rows="4"
          style="width: 100%; padding: 8px 12px; border: 1px solid #10b981; border-radius: 6px; resize: vertical; font-family: inherit; background: #f0fdf4;">Merci pour votre retour détaillé ! Nous avons bien pris en compte vos suggestions.</textarea>
        <p style="margin: 4px 0 0; font-size: 12px; color: #059669;">
          ✓ Feedback enregistré avec succès
        </p>
      </div>
    `,
  }),
};
