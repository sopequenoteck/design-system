import type { Meta, StoryObj } from '@storybook/angular';
import { DsDropdown } from './ds-dropdown';
import { DropdownItem } from './model/dropdown-item.model';
import { faChevronDown, faUser, faCog, faGlobe } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<DsDropdown> = {
  title: 'Components/Dropdown',
  component: DsDropdown,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'success', 'warning', 'error', 'info'],
      description: 'Variante du bouton',
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline'],
      description: 'Apparence',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille',
    },
    disabled: {
      control: 'boolean',
      description: 'Désactivé',
    },
    loading: {
      control: 'boolean',
      description: 'En chargement',
    },
    block: {
      control: 'boolean',
      description: 'Pleine largeur',
    },
  },
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
    type: 'primary',
    variant: 'solid',
    size: 'md',
    disabled: false,
  },
  render: (args) => ({
    props: { ...args, faChevronDown },
    template: `
      <ds-dropdown
        [dropdownItems]="dropdownItems"
        [type]="type"
        [variant]="variant"
        [size]="size"
        [disabled]="disabled"
        [dropdownEndIcon]="faChevronDown">
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
  render: () => ({
    props: {
      items: basicItems,
      faChevronDown,
    },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <ds-dropdown [dropdownItems]="items" type="primary" [dropdownEndIcon]="faChevronDown">Primary</ds-dropdown>
        <ds-dropdown [dropdownItems]="items" type="secondary" [dropdownEndIcon]="faChevronDown">Secondary</ds-dropdown>
        <ds-dropdown [dropdownItems]="items" type="ghost" [dropdownEndIcon]="faChevronDown">Ghost</ds-dropdown>
        <ds-dropdown [dropdownItems]="items" variant="outline" [dropdownEndIcon]="faChevronDown">Outline</ds-dropdown>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    props: {
      items: basicItems,
      faChevronDown,
    },
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <ds-dropdown [dropdownItems]="items" size="sm" [dropdownEndIcon]="faChevronDown">Small</ds-dropdown>
        <ds-dropdown [dropdownItems]="items" size="md" [dropdownEndIcon]="faChevronDown">Medium</ds-dropdown>
        <ds-dropdown [dropdownItems]="items" size="lg" [dropdownEndIcon]="faChevronDown">Large</ds-dropdown>
      </div>
    `,
  }),
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
