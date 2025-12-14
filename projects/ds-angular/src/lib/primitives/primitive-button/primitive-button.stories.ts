import type { Meta, StoryObj } from '@storybook/angular';
import { PrimitiveButton } from './primitive-button';
import { faPlus, faCheck, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {
  buildButtonArgTypes,
  buildButtonArgs,
  createVariantRender,
  createSizeRender,
} from '../../utils/storybook-controls';

const meta: Meta<PrimitiveButton> = {
  title: 'Foundation/Primitives/Button',
  component: PrimitiveButton,
  argTypes: {
    ...buildButtonArgTypes({ includeLoading: false }),
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Type HTML du bouton',
    },
  },
};

export default meta;
type Story = StoryObj<PrimitiveButton>;

export const Default: Story = {
  args: buildButtonArgs({ includeLoading: false }),
  render: (args) => ({
    props: args,
    template: `<primitive-button [variant]="variant" [size]="size" [appearance]="appearance" [disabled]="disabled" [block]="block">Bouton</primitive-button>`,
  }),
};

export const AllVariants: Story = {
  args: buildButtonArgs({ includeLoading: false }),
  render: createVariantRender('primitive-button', {
    variant: 'variant',
    appearance: 'appearance',
    size: 'size',
    disabled: 'disabled',
    block: 'block',
  }),
};

export const AllSizes: Story = {
  args: buildButtonArgs({ includeLoading: false }),
  render: createSizeRender('primitive-button', {
    variant: 'variant',
    appearance: 'appearance',
    size: 'size',
    disabled: 'disabled',
    block: 'block',
  }),
};

export const OutlineVariants: Story = {
  args: { ...buildButtonArgs({ includeLoading: false }), appearance: 'outline' },
  render: createVariantRender('primitive-button', {
    variant: 'variant',
    appearance: 'appearance',
    size: 'size',
    disabled: 'disabled',
    block: 'block',
  }),
};

export const WithIcons: Story = {
  render: () => ({
    props: {
      faPlus,
      faCheck,
      faArrowRight,
    },
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <primitive-button [iconStart]="faPlus">Ajouter</primitive-button>
        <primitive-button [iconEnd]="faArrowRight">Suivant</primitive-button>
        <primitive-button [iconStart]="faCheck" [iconEnd]="faArrowRight">Valider</primitive-button>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: { ...buildButtonArgs({ includeLoading: false }), disabled: true },
  render: createVariantRender('primitive-button', {
    variant: 'variant',
    appearance: 'appearance',
    size: 'size',
    disabled: 'disabled',
    block: 'block',
  }),
};

export const Block: Story = {
  args: { ...buildButtonArgs({ includeLoading: false }), block: true },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 300px;">
        <primitive-button [block]="block" [variant]="variant" [appearance]="appearance" [size]="size">Bouton pleine largeur</primitive-button>
      </div>
    `,
  }),
};
