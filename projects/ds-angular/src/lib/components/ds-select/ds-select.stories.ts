import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { DsSelect, DsSelectOption } from './ds-select';

const defaultOptions: DsSelectOption[] = [
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Allemagne' },
  { value: 'es', label: 'Espagne' },
  { value: 'it', label: 'Italie' },
  { value: 'uk', label: 'Royaume-Uni' },
];

const manyOptions: DsSelectOption[] = [
  { value: '1', label: 'Afghanistan' },
  { value: '2', label: 'Albanie' },
  { value: '3', label: 'Algérie' },
  { value: '4', label: 'Allemagne' },
  { value: '5', label: 'Andorre' },
  { value: '6', label: 'Angola' },
  { value: '7', label: 'Argentine' },
  { value: '8', label: 'Australie' },
  { value: '9', label: 'Autriche' },
  { value: '10', label: 'Belgique' },
  { value: '11', label: 'Brésil' },
  { value: '12', label: 'Canada' },
  { value: '13', label: 'Chine' },
  { value: '14', label: 'Espagne' },
  { value: '15', label: 'France' },
];

const meta: Meta<DsSelect> = {
  title: 'Components/Forms/DsSelect',
  component: DsSelect,
  decorators: [
    moduleMetadata({
      imports: [DsSelect, FormsModule],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Liste des options',
    },
    placeholder: {
      control: 'text',
      description: 'Texte placeholder',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du composant',
    },
    disabled: {
      control: 'boolean',
      description: 'Désactiver le composant',
    },
    error: {
      control: 'text',
      description: 'Message d\'erreur',
    },
    helper: {
      control: 'text',
      description: 'Texte d\'aide',
    },
    label: {
      control: 'text',
      description: 'Label du champ',
    },
    clearable: {
      control: 'boolean',
      description: 'Permettre d\'effacer la sélection',
    },
    searchable: {
      control: 'boolean',
      description: 'Permettre la recherche',
    },
    required: {
      control: 'boolean',
      description: 'Champ requis',
    },
  },
};

export default meta;
type Story = StoryObj<DsSelect>;

export const Default: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Sélectionner un pays',
    size: 'md',
    disabled: false,
    clearable: false,
    searchable: false,
  },
};

export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: 'Pays de résidence',
  },
};

export const WithLabelAndRequired: Story = {
  args: {
    ...Default.args,
    label: 'Pays de résidence',
    required: true,
  },
};

export const WithHelper: Story = {
  args: {
    ...Default.args,
    label: 'Pays',
    helper: 'Sélectionnez votre pays de résidence actuel',
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    label: 'Pays',
    error: 'Ce champ est requis',
  },
};

export const Clearable: Story = {
  args: {
    ...Default.args,
    label: 'Pays',
    clearable: true,
  },
  render: (args) => ({
    props: { ...args, selectedValue: 'fr' },
    template: `
      <ds-select
        [options]="options"
        [placeholder]="placeholder"
        [size]="size"
        [label]="label"
        [clearable]="clearable"
        [(ngModel)]="selectedValue">
      </ds-select>
      <p style="margin-top: 16px; color: var(--text-muted);">
        Valeur: {{ selectedValue || 'null' }}
      </p>
    `,
  }),
};

export const Searchable: Story = {
  args: {
    options: manyOptions,
    placeholder: 'Rechercher un pays...',
    label: 'Pays',
    searchable: true,
    size: 'md',
  },
};

export const SearchableAndClearable: Story = {
  args: {
    options: manyOptions,
    placeholder: 'Rechercher un pays...',
    label: 'Pays',
    searchable: true,
    clearable: true,
    size: 'md',
  },
};

export const SmallSize: Story = {
  args: {
    ...Default.args,
    label: 'Pays',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    ...Default.args,
    label: 'Pays',
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    label: 'Pays',
    disabled: true,
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: 'fr', label: 'France' },
      { value: 'de', label: 'Allemagne', disabled: true },
      { value: 'es', label: 'Espagne' },
      { value: 'it', label: 'Italie', disabled: true },
      { value: 'uk', label: 'Royaume-Uni' },
    ],
    label: 'Pays',
    placeholder: 'Sélectionner un pays',
    helper: 'Certaines options sont désactivées',
  },
};

export const PreSelected: Story = {
  args: {
    ...Default.args,
    label: 'Pays',
  },
  render: (args) => ({
    props: { ...args, selectedValue: 'es' },
    template: `
      <ds-select
        [options]="options"
        [placeholder]="placeholder"
        [size]="size"
        [label]="label"
        [(ngModel)]="selectedValue">
      </ds-select>
    `,
  }),
};

export const InForm: Story = {
  render: () => ({
    template: `
      <form style="max-width: 400px; display: flex; flex-direction: column; gap: 16px;">
        <ds-select
          [options]="countries"
          label="Pays"
          placeholder="Sélectionner un pays"
          required
          [(ngModel)]="country"
          name="country">
        </ds-select>

        <ds-select
          [options]="languages"
          label="Langue préférée"
          placeholder="Sélectionner une langue"
          clearable
          [(ngModel)]="language"
          name="language">
        </ds-select>

        <button
          type="submit"
          style="padding: 8px 16px; background: var(--color-primary); color: white; border: none; border-radius: var(--radius-2); cursor: pointer;">
          Enregistrer
        </button>
      </form>
    `,
    props: {
      countries: defaultOptions,
      languages: [
        { value: 'fr', label: 'Français' },
        { value: 'en', label: 'English' },
        { value: 'de', label: 'Deutsch' },
        { value: 'es', label: 'Español' },
      ],
      country: null,
      language: null,
    },
  }),
};

export const Themed: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div class="theme-light" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Light</h4>
          <ds-select
            [options]="options"
            label="Pays"
            placeholder="Sélectionner..."
            clearable
            [(ngModel)]="value1">
          </ds-select>
        </div>
        <div class="theme-dark" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Dark</h4>
          <ds-select
            [options]="options"
            label="Pays"
            placeholder="Sélectionner..."
            clearable
            [(ngModel)]="value2">
          </ds-select>
        </div>
        <div class="theme-custom" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Custom</h4>
          <ds-select
            [options]="options"
            label="Pays"
            placeholder="Sélectionner..."
            clearable
            [(ngModel)]="value3">
          </ds-select>
        </div>
      </div>
    `,
    props: {
      options: defaultOptions,
      value1: 'fr',
      value2: 'de',
      value3: 'es',
    },
  }),
};
