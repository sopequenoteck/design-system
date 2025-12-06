import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { DsSearchInput } from './ds-search-input';

const meta: Meta<DsSearchInput> = {
  title: 'Components/DsSearchInput',
  component: DsSearchInput,
  decorators: [
    moduleMetadata({
      imports: [DsSearchInput, FormsModule],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du composant',
    },
    placeholder: {
      control: 'text',
      description: 'Texte placeholder',
    },
    debounceMs: {
      control: 'number',
      description: 'Délai de debounce en ms',
    },
    disabled: {
      control: 'boolean',
      description: 'État désactivé',
    },
    loading: {
      control: 'boolean',
      description: 'État de chargement',
    },
    clearable: {
      control: 'boolean',
      description: 'Afficher le bouton clear',
    },
    minChars: {
      control: 'number',
      description: 'Caractères minimum avant recherche',
    },
  },
};

export default meta;
type Story = StoryObj<DsSearchInput>;

export const Default: Story = {
  args: {
    placeholder: 'Rechercher...',
    size: 'md',
    debounceMs: 300,
    disabled: false,
    loading: false,
    clearable: true,
    minChars: 0,
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <p style="margin: 0 0 8px; color: var(--text-muted);">Small</p>
          <ds-search-input size="sm" placeholder="Rechercher..."></ds-search-input>
        </div>
        <div>
          <p style="margin: 0 0 8px; color: var(--text-muted);">Medium (default)</p>
          <ds-search-input size="md" placeholder="Rechercher..."></ds-search-input>
        </div>
        <div>
          <p style="margin: 0 0 8px; color: var(--text-muted);">Large</p>
          <ds-search-input size="lg" placeholder="Rechercher..."></ds-search-input>
        </div>
      </div>
    `,
  }),
};

export const WithValue: Story = {
  render: () => ({
    props: {
      value: 'Angular design system',
    },
    template: `
      <div style="max-width: 400px;">
        <ds-search-input
          placeholder="Rechercher..."
          [(ngModel)]="value"
          (search)="console.log('Search:', $event)">
        </ds-search-input>
        <p style="margin-top: 16px; color: var(--text-muted);">Valeur: {{ value }}</p>
      </div>
    `,
  }),
};

export const Loading: Story = {
  render: () => ({
    props: {
      value: 'Recherche en cours',
    },
    template: `
      <div style="max-width: 400px;">
        <ds-search-input
          placeholder="Rechercher..."
          [loading]="true"
          [(ngModel)]="value">
        </ds-search-input>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="max-width: 400px;">
        <ds-search-input
          placeholder="Rechercher..."
          [disabled]="true">
        </ds-search-input>
      </div>
    `,
  }),
};

export const WithMinChars: Story = {
  render: () => ({
    props: {
      searchResult: '',
      onSearch: (value: string) => console.log('Search triggered:', value),
    },
    template: `
      <div style="max-width: 400px;">
        <ds-search-input
          placeholder="Minimum 3 caractères..."
          [minChars]="3"
          (search)="searchResult = $event; onSearch($event)">
        </ds-search-input>
        <p style="margin-top: 16px; color: var(--text-muted);">
          La recherche ne s'active qu'à partir de 3 caractères.
          <br/>
          Dernière recherche: {{ searchResult || '(aucune)' }}
        </p>
      </div>
    `,
  }),
};

export const WithCustomDebounce: Story = {
  render: () => ({
    props: {
      searchCount: 0,
    },
    template: `
      <div style="max-width: 400px;">
        <ds-search-input
          placeholder="Debounce 1 seconde..."
          [debounceMs]="1000"
          (search)="searchCount = searchCount + 1">
        </ds-search-input>
        <p style="margin-top: 16px; color: var(--text-muted);">
          Recherches effectuées: {{ searchCount }}
        </p>
      </div>
    `,
  }),
};

export const NotClearable: Story = {
  render: () => ({
    props: {
      value: 'Test sans bouton clear',
    },
    template: `
      <div style="max-width: 400px;">
        <ds-search-input
          placeholder="Rechercher..."
          [clearable]="false"
          [(ngModel)]="value">
        </ds-search-input>
      </div>
    `,
  }),
};

export const SearchWithResults: Story = {
  render: () => ({
    props: {
      query: '',
      loading: false,
      results: [] as string[],
      allItems: ['Angular', 'React', 'Vue', 'Svelte', 'Solid', 'Ember', 'Backbone'],
      onSearch: function (value: string) {
        this["loading"] = true;
        setTimeout(() => {
          this["results"] = value
            ? this["allItems"].filter((item: string) =>
                item.toLowerCase().includes(value.toLowerCase())
              )
            : [];
          this["loading"] = false;
        }, 500);
      },
    },
    template: `
      <div style="max-width: 400px;">
        <ds-search-input
          placeholder="Rechercher un framework..."
          [loading]="loading"
          [(ngModel)]="query"
          (search)="onSearch($event)">
        </ds-search-input>

        @if (results.length > 0) {
          <ul style="margin-top: 16px; padding: 0; list-style: none;">
            @for (result of results; track result) {
              <li style="padding: 8px 12px; border-bottom: 1px solid var(--border-default);">
                {{ result }}
              </li>
            }
          </ul>
        } @else if (query && !loading) {
          <p style="margin-top: 16px; color: var(--text-muted);">Aucun résultat trouvé</p>
        }
      </div>
    `,
  }),
};
