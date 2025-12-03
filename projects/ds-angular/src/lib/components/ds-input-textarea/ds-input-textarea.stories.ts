import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DsInputField } from '../ds-input-field/ds-input-field';

// Note: Using DsInputField with textarea type if available, or creating basic textarea story
const meta: Meta = {
  title: 'Components/InputTextarea',
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
