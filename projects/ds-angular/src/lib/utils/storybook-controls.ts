import type { Args, ArgTypes } from '@storybook/angular';
import type { ButtonVariant, ButtonAppearance, ButtonSize } from '../primitives/primitive-button/primitive-button';

export const BUTTON_VARIANT_OPTIONS = ['primary', 'secondary', 'ghost', 'success', 'warning', 'error', 'info'] as const;
export const BUTTON_APPEARANCE_OPTIONS = ['solid', 'outline'] as const;
export const BUTTON_SIZE_OPTIONS = ['sm', 'md', 'lg'] as const;

interface ArgTypeOptions {
  includeLoading?: boolean;
  includeBlock?: boolean;
  variantDescription?: string;
  appearanceDescription?: string;
  sizeDescription?: string;
  disabledDescription?: string;
  loadingDescription?: string;
  blockDescription?: string;
}

export const buildButtonArgTypes = ({
  includeLoading = true,
  includeBlock = true,
  variantDescription = 'Variante visuelle',
  appearanceDescription = 'Apparence',
  sizeDescription = 'Taille',
  disabledDescription = 'Désactivé',
  loadingDescription = 'En chargement',
  blockDescription = 'Pleine largeur',
}: ArgTypeOptions = {}): ArgTypes<Args> => ({
  variant: {
    control: 'select',
    options: BUTTON_VARIANT_OPTIONS,
    description: variantDescription,
  },
  appearance: {
    control: 'select',
    options: BUTTON_APPEARANCE_OPTIONS,
    description: appearanceDescription,
  },
  size: {
    control: 'select',
    options: BUTTON_SIZE_OPTIONS,
    description: sizeDescription,
  },
  disabled: {
    control: 'boolean',
    description: disabledDescription,
  },
  ...(includeLoading
    ? {
        loading: {
          control: 'boolean',
          description: loadingDescription,
        },
      }
    : {}),
  ...(includeBlock
    ? {
        block: {
          control: 'boolean',
          description: blockDescription,
        },
      }
    : {}),
});

interface ArgOptions {
  includeLoading?: boolean;
  includeBlock?: boolean;
}

export const buildButtonArgs = ({ includeLoading = true, includeBlock = true }: ArgOptions = {}) => ({
  variant: 'primary' as ButtonVariant,
  appearance: 'solid' as ButtonAppearance,
  size: 'md' as ButtonSize,
  disabled: false,
  ...(includeLoading ? { loading: false } : {}),
  ...(includeBlock ? { block: false } : {}),
});

interface ButtonBindings {
  variant: string;
  appearance?: string;
  size: string;
  disabled?: string;
  loading?: string;
  block?: string;
}

export const createVariantRender = (
  tagName: string,
  bindings: ButtonBindings,
  extraAttributes = '',
) =>
  (args: Args) => ({
    props: { ...args, variants: BUTTON_VARIANT_OPTIONS },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <${tagName}
          *ngFor="let variant of variants"
          [${bindings.variant}]="variant"${bindings.appearance ? `
          [${bindings.appearance}]="appearance"` : ''}
          [${bindings.size}]="size"${bindings.disabled ? `
          [${bindings.disabled}]="disabled"` : ''}${bindings.loading ? `
          [${bindings.loading}]="loading"` : ''}${bindings.block ? `
          [${bindings.block}]="block"` : ''}${extraAttributes ? `
          ${extraAttributes}` : ''}>
          {{ variant }}
        </${tagName}>
      </div>
    `,
  });

export const createSizeRender = (
  tagName: string,
  bindings: ButtonBindings,
  extraAttributes = '',
) =>
  (args: Args) => ({
    props: { ...args, sizes: BUTTON_SIZE_OPTIONS },
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <${tagName}
          *ngFor="let size of sizes"
          [${bindings.size}]="size"${bindings.variant ? `
          [${bindings.variant}]="variant"` : ''}${bindings.appearance ? `
          [${bindings.appearance}]="appearance"` : ''}${bindings.disabled ? `
          [${bindings.disabled}]="disabled"` : ''}${bindings.loading ? `
          [${bindings.loading}]="loading"` : ''}${bindings.block ? `
          [${bindings.block}]="block"` : ''}${extraAttributes ? `
          ${extraAttributes}` : ''}>
          {{ size }}
        </${tagName}>
      </div>
    `,
  });
