import type { Meta, StoryObj } from '@storybook/angular';
import { PrimitiveTextarea, TextareaState, TextareaSize, TextareaAppearance, TextareaResize } from './primitive-textarea';

const meta: Meta<PrimitiveTextarea> = {
  title: 'Foundation/Primitives/Textarea',
  component: PrimitiveTextarea,
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'] as TextareaState[],
      description: 'État de validation',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] as TextareaSize[],
      description: 'Taille du textarea',
    },
    appearance: {
      control: 'select',
      options: ['default', 'outline', 'ghost'] as TextareaAppearance[],
      description: 'Apparence du textarea',
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'] as TextareaResize[],
      description: 'Mode de redimensionnement',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder',
    },
    disabled: {
      control: 'boolean',
      description: 'État désactivé',
    },
    readonly: {
      control: 'boolean',
      description: 'Lecture seule',
    },
    rows: {
      control: 'number',
      description: 'Nombre de lignes',
    },
  },
};

export default meta;
type Story = StoryObj<PrimitiveTextarea>;

export const Default: Story = {
  args: {
    placeholder: 'Entrez votre texte...',
    state: 'default',
    size: 'md',
    appearance: 'default',
    resize: 'vertical',
    disabled: false,
    readonly: false,
    rows: 4,
  },
  render: (args) => ({
    props: args,
    template: `<primitive-textarea [placeholder]="placeholder" [state]="state" [size]="size" [appearance]="appearance" [resize]="resize" [disabled]="disabled" [readonly]="readonly" [rows]="rows"></primitive-textarea>`,
  }),
};

export const AllStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 400px;">
        <primitive-textarea placeholder="Default" state="default" [rows]="3"></primitive-textarea>
        <primitive-textarea placeholder="Success" state="success" [rows]="3"></primitive-textarea>
        <primitive-textarea placeholder="Warning" state="warning" [rows]="3"></primitive-textarea>
        <primitive-textarea placeholder="Error" state="error" [rows]="3"></primitive-textarea>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 400px;">
        <primitive-textarea placeholder="Small" size="sm" [rows]="2"></primitive-textarea>
        <primitive-textarea placeholder="Medium" size="md" [rows]="3"></primitive-textarea>
        <primitive-textarea placeholder="Large" size="lg" [rows]="4"></primitive-textarea>
      </div>
    `,
  }),
};

export const ResizeModes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 400px;">
        <div>
          <p style="margin: 0 0 4px 0; font-size: 12px;">Vertical (défaut)</p>
          <primitive-textarea placeholder="Redimensionnable verticalement" resize="vertical" [rows]="2"></primitive-textarea>
        </div>
        <div>
          <p style="margin: 0 0 4px 0; font-size: 12px;">Horizontal</p>
          <primitive-textarea placeholder="Redimensionnable horizontalement" resize="horizontal" [rows]="2"></primitive-textarea>
        </div>
        <div>
          <p style="margin: 0 0 4px 0; font-size: 12px;">Both</p>
          <primitive-textarea placeholder="Redimensionnable dans les deux sens" resize="both" [rows]="2"></primitive-textarea>
        </div>
        <div>
          <p style="margin: 0 0 4px 0; font-size: 12px;">None</p>
          <primitive-textarea placeholder="Non redimensionnable" resize="none" [rows]="2"></primitive-textarea>
        </div>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 400px;">
        <primitive-textarea [disabled]="true" placeholder="Désactivé" [rows]="3"></primitive-textarea>
        <primitive-textarea [disabled]="true" value="Contenu désactivé" [rows]="3"></primitive-textarea>
      </div>
    `,
  }),
};

export const Readonly: Story = {
  render: () => ({
    template: `
      <primitive-textarea [readonly]="true" value="Ce texte est en lecture seule et ne peut pas être modifié." [rows]="3" style="max-width: 400px;"></primitive-textarea>
    `,
  }),
};

export const WithMaxLength: Story = {
  render: () => ({
    template: `
      <primitive-textarea placeholder="Maximum 100 caractères" [maxlength]="100" [rows]="3" style="max-width: 400px;"></primitive-textarea>
    `,
  }),
};
