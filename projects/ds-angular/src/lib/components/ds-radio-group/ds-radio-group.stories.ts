import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { PrimitiveRadio } from '../../primitives/primitive-radio/primitive-radio';

const meta: Meta = {
  title: 'Components/RadioGroup',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [PrimitiveRadio],
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => ({
    template: `
      <fieldset style="border: none; padding: 0; margin: 0;">
        <legend style="font-weight: 500; margin-bottom: 12px;">Choisissez une option</legend>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <primitive-radio name="default" value="option1" label="Option 1" [checked]="true"></primitive-radio>
          <primitive-radio name="default" value="option2" label="Option 2"></primitive-radio>
          <primitive-radio name="default" value="option3" label="Option 3"></primitive-radio>
        </div>
      </fieldset>
    `,
  }),
};

export const Horizontal: Story = {
  render: () => ({
    template: `
      <fieldset style="border: none; padding: 0; margin: 0;">
        <legend style="font-weight: 500; margin-bottom: 12px;">Taille</legend>
        <div style="display: flex; gap: 16px;">
          <primitive-radio name="size" value="sm" label="S" [checked]="true"></primitive-radio>
          <primitive-radio name="size" value="md" label="M"></primitive-radio>
          <primitive-radio name="size" value="lg" label="L"></primitive-radio>
          <primitive-radio name="size" value="xl" label="XL"></primitive-radio>
        </div>
      </fieldset>
    `,
  }),
};

export const WithDisabled: Story = {
  render: () => ({
    template: `
      <fieldset style="border: none; padding: 0; margin: 0;">
        <legend style="font-weight: 500; margin-bottom: 12px;">Plan tarifaire</legend>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <primitive-radio name="plan" value="free" label="Gratuit" [checked]="true"></primitive-radio>
          <primitive-radio name="plan" value="pro" label="Professionnel"></primitive-radio>
          <primitive-radio name="plan" value="enterprise" label="Entreprise (bientôt)" [disabled]="true"></primitive-radio>
        </div>
      </fieldset>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <fieldset style="border: none; padding: 0; margin: 0;">
          <legend style="font-weight: 500; margin-bottom: 8px;">Small</legend>
          <div style="display: flex; gap: 12px;">
            <primitive-radio name="small" value="a" label="A" size="sm" [checked]="true"></primitive-radio>
            <primitive-radio name="small" value="b" label="B" size="sm"></primitive-radio>
          </div>
        </fieldset>
        <fieldset style="border: none; padding: 0; margin: 0;">
          <legend style="font-weight: 500; margin-bottom: 8px;">Medium</legend>
          <div style="display: flex; gap: 12px;">
            <primitive-radio name="medium" value="a" label="A" size="md" [checked]="true"></primitive-radio>
            <primitive-radio name="medium" value="b" label="B" size="md"></primitive-radio>
          </div>
        </fieldset>
        <fieldset style="border: none; padding: 0; margin: 0;">
          <legend style="font-weight: 500; margin-bottom: 8px;">Large</legend>
          <div style="display: flex; gap: 12px;">
            <primitive-radio name="large" value="a" label="A" size="lg" [checked]="true"></primitive-radio>
            <primitive-radio name="large" value="b" label="B" size="lg"></primitive-radio>
          </div>
        </fieldset>
      </div>
    `,
  }),
};

export const PaymentMethod: Story = {
  render: () => ({
    template: `
      <div style="max-width: 400px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h3 style="margin: 0 0 16px;">Mode de paiement</h3>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; align-items: center; padding: 12px; border: 1px solid #e5e7eb; border-radius: 6px;">
            <primitive-radio name="payment" value="card" [checked]="true"></primitive-radio>
            <span style="margin-left: 12px;">Carte bancaire</span>
          </div>
          <div style="display: flex; align-items: center; padding: 12px; border: 1px solid #e5e7eb; border-radius: 6px;">
            <primitive-radio name="payment" value="paypal"></primitive-radio>
            <span style="margin-left: 12px;">PayPal</span>
          </div>
          <div style="display: flex; align-items: center; padding: 12px; border: 1px solid #e5e7eb; border-radius: 6px;">
            <primitive-radio name="payment" value="transfer"></primitive-radio>
            <span style="margin-left: 12px;">Virement bancaire</span>
          </div>
        </div>
      </div>
    `,
  }),
};
