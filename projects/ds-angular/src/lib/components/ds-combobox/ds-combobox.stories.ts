import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { DsCombobox, DsComboboxOption } from './ds-combobox';

const fruitOptions: DsComboboxOption[] = [
  { value: '1', label: 'Apple' },
  { value: '2', label: 'Banana' },
  { value: '3', label: 'Cherry' },
  { value: '4', label: 'Date' },
  { value: '5', label: 'Elderberry' },
  { value: '6', label: 'Fig' },
  { value: '7', label: 'Grape' },
  { value: '8', label: 'Honeydew' },
];

const countryOptions: DsComboboxOption[] = [
  { value: 'fr', label: 'France', description: 'Europe de l\'Ouest' },
  { value: 'de', label: 'Allemagne', description: 'Europe centrale' },
  { value: 'es', label: 'Espagne', description: 'Europe du Sud' },
  { value: 'it', label: 'Italie', description: 'Europe du Sud' },
  { value: 'uk', label: 'Royaume-Uni', description: 'Europe du Nord' },
  { value: 'pt', label: 'Portugal', description: 'Europe du Sud' },
  { value: 'be', label: 'Belgique', description: 'Europe de l\'Ouest' },
  { value: 'nl', label: 'Pays-Bas', description: 'Europe de l\'Ouest' },
  { value: 'ch', label: 'Suisse', description: 'Europe centrale' },
  { value: 'at', label: 'Autriche', description: 'Europe centrale' },
];

const meta: Meta<DsCombobox> = {
  title: 'Components/DsCombobox',
  component: DsCombobox,
  decorators: [
    moduleMetadata({
      imports: [DsCombobox, FormsModule],
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
      description: 'Permettre d\'effacer',
    },
    allowCustom: {
      control: 'boolean',
      description: 'Autoriser les valeurs personnalisées',
    },
    minChars: {
      control: 'number',
      description: 'Caractères minimum avant recherche',
    },
    maxResults: {
      control: 'number',
      description: 'Nombre maximum de résultats',
    },
  },
};

export default meta;
type Story = StoryObj<DsCombobox>;

export const Default: Story = {
  args: {
    options: fruitOptions,
    placeholder: 'Rechercher un fruit...',
    size: 'md',
    disabled: false,
    clearable: true,
    allowCustom: false,
    minChars: 0,
    maxResults: 50,
  },
};

export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: 'Fruit préféré',
  },
};

export const WithHelper: Story = {
  args: {
    ...Default.args,
    label: 'Fruit',
    helper: 'Commencez à taper pour rechercher',
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    label: 'Fruit',
    error: 'Veuillez sélectionner un fruit',
  },
};

export const WithDescriptions: Story = {
  args: {
    options: countryOptions,
    placeholder: 'Rechercher un pays...',
    label: 'Pays',
    size: 'md',
    clearable: true,
  },
};

export const MinimumCharacters: Story = {
  args: {
    options: countryOptions,
    placeholder: 'Tapez au moins 2 caractères...',
    label: 'Pays',
    minChars: 2,
    helper: 'Commencez à taper pour voir les suggestions',
  },
};

export const AllowCustomValues: Story = {
  args: {
    options: fruitOptions,
    placeholder: 'Rechercher ou créer...',
    label: 'Fruit',
    allowCustom: true,
    helper: 'Vous pouvez entrer une valeur personnalisée',
  },
};

export const SmallSize: Story = {
  args: {
    ...Default.args,
    label: 'Fruit',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    ...Default.args,
    label: 'Fruit',
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    label: 'Fruit',
    disabled: true,
  },
};

export const PreSelected: Story = {
  render: (args) => ({
    props: { ...args, selectedValue: '3' },
    template: `
      <ds-combobox
        [options]="options"
        [placeholder]="placeholder"
        [size]="size"
        [label]="label"
        [clearable]="clearable"
        [(ngModel)]="selectedValue">
      </ds-combobox>
      <p style="margin-top: 16px; color: var(--text-muted);">
        Valeur: {{ selectedValue || 'null' }}
      </p>
    `,
  }),
  args: {
    ...Default.args,
    label: 'Fruit',
  },
};

export const InForm: Story = {
  render: () => ({
    template: `
      <form style="max-width: 400px; display: flex; flex-direction: column; gap: 16px;">
        <ds-combobox
          [options]="fruits"
          label="Fruit préféré"
          placeholder="Rechercher un fruit..."
          [(ngModel)]="fruit"
          name="fruit">
        </ds-combobox>

        <ds-combobox
          [options]="countries"
          label="Pays de résidence"
          placeholder="Rechercher un pays..."
          [(ngModel)]="country"
          name="country">
        </ds-combobox>

        <button
          type="submit"
          style="padding: 8px 16px; background: var(--color-primary); color: white; border: none; border-radius: var(--radius-2); cursor: pointer;">
          Enregistrer
        </button>
      </form>
    `,
    props: {
      fruits: fruitOptions,
      countries: countryOptions,
      fruit: null,
      country: null,
    },
  }),
};

export const Themed: StoryObj = {
  render: () => ({
    props: {
      options: fruitOptions,
      value1: '1',
      value2: '2',
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div class="theme-light" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Light</h4>
          <ds-combobox
            [options]="options"
            label="Fruit"
            placeholder="Rechercher..."
            [(ngModel)]="value1">
          </ds-combobox>
        </div>
        <div class="theme-dark" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Dark</h4>
          <ds-combobox
            [options]="options"
            label="Fruit"
            placeholder="Rechercher..."
            [(ngModel)]="value2">
          </ds-combobox>
        </div>
      </div>
    `,
  }),
};
