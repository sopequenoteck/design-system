import type { Meta, StoryObj } from '@storybook/angular';
import { DsDropdown } from './ds-dropdown';
import { DropdownItem } from './model/dropdown-item.model';
import { faChevronDown, faUser, faCog, faGlobe } from '@fortawesome/free-solid-svg-icons';
import {
  buildButtonArgTypes,
  buildButtonArgs,
  createVariantRender,
  createSizeRender,
} from '../../utils/storybook-controls';

const baseButtonArgs = buildButtonArgs();

const meta: Meta<DsDropdown> = {
  title: 'Overlays/DsDropdown',
  component: DsDropdown,
  argTypes: (() => {
    const buttonControls = buildButtonArgTypes();
    return {
      type: { ...buttonControls['variant'], description: 'Variante du bouton' },
      variant: { ...buttonControls['appearance'], description: 'Apparence' },
      size: buttonControls['size'],
      disabled: buttonControls['disabled'],
      loading: buttonControls['loading'],
      block: buttonControls['block'],
    };
  })(),
};

export default meta;
type Story = StoryObj<DsDropdown>;

const basicItems: DropdownItem[] = [
  { code: 'option1', label: 'Option 1' },
  { code: 'option2', label: 'Option 2' },
  { code: 'option3', label: 'Option 3' },
];

export const Default: Story = {
  args: {
    dropdownItems: basicItems,
    type: baseButtonArgs.variant as any,
    variant: baseButtonArgs.appearance as any,
    size: baseButtonArgs.size as any,
    disabled: baseButtonArgs.disabled,
    loading: baseButtonArgs.loading,
    block: baseButtonArgs.block,
    dropdownEndIcon: faChevronDown,
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-dropdown
        [dropdownItems]="dropdownItems"
        [type]="type"
        [variant]="variant"
        [size]="size"
        [disabled]="disabled"
        [dropdownEndIcon]="dropdownEndIcon">
        Sélectionner
      </ds-dropdown>
    `,
  }),
};

export const WithSelectedItem: Story = {
  render: () => ({
    props: {
      items: basicItems,
      faChevronDown,
    },
    template: `
      <ds-dropdown
        [dropdownItems]="items"
        selectedItem="option2"
        [dropdownEndIcon]="faChevronDown">
        Sélectionner
      </ds-dropdown>
    `,
  }),
};

export const Variants: Story = {
  args: { ...buildButtonArgs(), dropdownItems: basicItems, dropdownEndIcon: faChevronDown } as any,
  render: createVariantRender('ds-dropdown', {
    variant: 'type',
    appearance: 'variant',
    size: 'size',
    disabled: 'disabled',
    loading: 'loading',
    block: 'block',
  }, '[dropdownItems]="dropdownItems" [dropdownEndIcon]="dropdownEndIcon"'),
};

export const Sizes: Story = {
  args: { ...buildButtonArgs(), dropdownItems: basicItems, dropdownEndIcon: faChevronDown } as any,
  render: createSizeRender('ds-dropdown', {
    variant: 'type',
    appearance: 'variant',
    size: 'size',
    disabled: 'disabled',
    loading: 'loading',
    block: 'block',
  }, '[dropdownItems]="dropdownItems" [dropdownEndIcon]="dropdownEndIcon"'),
};

export const WithIcons: Story = {
  render: () => ({
    props: {
      items: basicItems,
      faUser,
      faChevronDown,
    },
    template: `
      <ds-dropdown
        [dropdownItems]="items"
        [dropdownStartIcon]="faUser"
        [dropdownEndIcon]="faChevronDown">
        Mon compte
      </ds-dropdown>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    props: {
      items: basicItems,
      faChevronDown,
    },
    template: `
      <ds-dropdown
        [dropdownItems]="items"
        [disabled]="true"
        [dropdownEndIcon]="faChevronDown">
        Désactivé
      </ds-dropdown>
    `,
  }),
};

export const Loading: Story = {
  render: () => ({
    props: {
      items: basicItems,
    },
    template: `
      <ds-dropdown
        [dropdownItems]="items"
        [loading]="true">
        Chargement...
      </ds-dropdown>
    `,
  }),
};

export const LanguageSelector: Story = {
  render: () => ({
    props: {
      languages: [
        { code: 'fr', label: 'Français' },
        { code: 'en', label: 'English' },
        { code: 'es', label: 'Español' },
        { code: 'de', label: 'Deutsch' },
      ] as DropdownItem[],
      faGlobe,
      faChevronDown,
    },
    template: `
      <ds-dropdown
        [dropdownItems]="languages"
        selectedItem="fr"
        [dropdownStartIcon]="faGlobe"
        [dropdownEndIcon]="faChevronDown"
        type="ghost">
        Langue
      </ds-dropdown>
    `,
  }),
};

export const SettingsMenu: Story = {
  render: () => ({
    props: {
      settings: [
        { code: 'profile', label: 'Mon profil' },
        { code: 'settings', label: 'Paramètres' },
        { code: 'billing', label: 'Facturation' },
        { code: 'logout', label: 'Déconnexion' },
      ] as DropdownItem[],
      faUser,
      faChevronDown,
    },
    template: `
      <ds-dropdown
        [dropdownItems]="settings"
        [dropdownStartIcon]="faUser"
        [dropdownEndIcon]="faChevronDown"
        type="secondary"
        variant="outline">
        John Doe
      </ds-dropdown>
    `,
  }),
};

export const Themed: Story = {
  render: () => ({
    props: {
      items: [
        { code: 'option1', label: 'Option 1' },
        { code: 'option2', label: 'Option 2' },
      ] as DropdownItem[],
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div class="theme-light" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Light</h4>
          <ds-dropdown [dropdownItems]="items" placeholder="Select">Select</ds-dropdown>
        </div>
        <div class="theme-dark" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Dark</h4>
          <ds-dropdown [dropdownItems]="items" placeholder="Select">Select</ds-dropdown>
        </div>
        <div class="theme-custom" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Custom</h4>
          <ds-dropdown [dropdownItems]="items" placeholder="Select">Select</ds-dropdown>
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
