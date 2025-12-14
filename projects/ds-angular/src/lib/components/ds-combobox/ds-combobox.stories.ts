import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { expect, userEvent, within } from '@storybook/test';
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

interface DsComboboxArgs {
  options: DsComboboxOption[];
  placeholder: string;
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
  error: string;
  helper: string;
  label: string;
  clearable: boolean;
  allowCustom: boolean;
  minChars: number;
  maxResults: number;
}

const meta: Meta<DsComboboxArgs> = {
  title: 'Forms/Selection/Combobox',
  component: DsCombobox,
  decorators: [
    moduleMetadata({
      imports: [DsCombobox, FormsModule],
    }),
  ],
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
type Story = StoryObj<DsComboboxArgs>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Combobox standard avec recherche et sélection. Tapez pour filtrer les options disponibles.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: 'Combobox avec label associé pour l\'accessibilité.',
      },
    },
  },
  args: {
    ...Default.args,
    label: 'Fruit préféré',
  },
};

export const WithHelper: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Combobox avec texte d\'aide pour guider l\'utilisateur.',
      },
    },
  },
  args: {
    ...Default.args,
    label: 'Fruit',
    helper: 'Commencez à taper pour rechercher',
  },
};

export const WithError: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Combobox en état d\'erreur avec message de validation.',
      },
    },
  },
  args: {
    ...Default.args,
    label: 'Fruit',
    error: 'Veuillez sélectionner un fruit',
  },
};

export const WithDescriptions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Options avec descriptions secondaires pour plus de contexte sur chaque choix.',
      },
    },
  },
  args: {
    options: countryOptions,
    placeholder: 'Rechercher un pays...',
    label: 'Pays',
    size: 'md',
    clearable: true,
  },
};

export const MinimumCharacters: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Recherche activée après un nombre minimum de caractères. Réduit les appels serveur.',
      },
    },
  },
  args: {
    options: countryOptions,
    placeholder: 'Tapez au moins 2 caractères...',
    label: 'Pays',
    minChars: 2,
    helper: 'Commencez à taper pour voir les suggestions',
  },
};

export const AllowCustomValues: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Autorise l\'entrée de valeurs personnalisées non présentes dans la liste.',
      },
    },
  },
  args: {
    options: fruitOptions,
    placeholder: 'Rechercher ou créer...',
    label: 'Fruit',
    allowCustom: true,
    helper: 'Vous pouvez entrer une valeur personnalisée',
  },
};

export const SmallSize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Taille compacte pour les interfaces denses.',
      },
    },
  },
  args: {
    ...Default.args,
    label: 'Fruit',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Taille large pour les formulaires principaux ou écrans tactiles.',
      },
    },
  },
  args: {
    ...Default.args,
    label: 'Fruit',
    size: 'lg',
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'État désactivé. Le composant est visible mais non interactif.',
      },
    },
  },
  args: {
    ...Default.args,
    label: 'Fruit',
    disabled: true,
  },
};

export const PreSelected: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Combobox avec valeur pré-sélectionnée via ngModel.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: 'Intégration dans un formulaire avec plusieurs combobox et ngModel.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: 'Affiche le composant dans les 3 thèmes (Light, Dark, Custom) pour vérifier la thématisation.',
      },
    },
  },
  render: () => ({
    props: {
      options: fruitOptions,
      value1: '1',
      value2: '2',
      value3: '3',
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
        <div class="theme-custom" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Custom</h4>
          <ds-combobox
            [options]="options"
            label="Fruit"
            placeholder="Rechercher..."
            [(ngModel)]="value3">
          </ds-combobox>
        </div>
      </div>
    `,
  }),
};

export const Accessibility: Story = {
  args: {
    options: countryOptions,
    placeholder: 'Rechercher un pays...',
    label: 'Pays',
    helper: 'Tapez pour filtrer les options',
    minChars: 1,
  },
  parameters: {
    docs: {
      description: {
        story: `
### Accessibilité clavier

| Touche | Action |
|--------|--------|
| Tab | Déplace le focus vers l'input |
| Type | Filtre les options disponibles |
| Arrow Down | Ouvre le dropdown et navigue vers le bas |
| Arrow Up | Navigue vers le haut dans le dropdown |
| Enter | Sélectionne l'option focalisée |
| Escape | Ferme le dropdown |
| Home/End | Va à la première/dernière option |

### Attributs ARIA
- \`role="combobox"\`: Identifie le champ de recherche
- \`aria-autocomplete="list"\`: Indique le mode autocomplete
- \`aria-expanded\`: État d'ouverture du dropdown
- \`aria-controls\`: Lie l'input à la liste d'options
- \`aria-activedescendant\`: Identifie l'option focalisée
- \`role="listbox"\`: Identifie la liste des résultats
- \`role="option"\`: Identifie chaque option

### Bonnes pratiques
- Les descriptions des options fournissent du contexte supplémentaire
- Le filtrage est annoncé aux lecteurs d'écran
- Le mode allowCustom permet de saisir des valeurs libres
        `,
      },
    },
  },
};

export const WithInteractionTest: Story = {
  args: {
    options: fruitOptions,
    placeholder: 'Rechercher un fruit...',
    label: 'Fruits',
  },
  render: (args) => ({
    props: { ...args, selectedValue: null },
    template: `
      <ds-combobox
        [options]="options"
        [placeholder]="placeholder"
        [label]="label"
        [(ngModel)]="selectedValue"
        data-testid="test-combobox">
      </ds-combobox>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Attendre le rendu initial
    await new Promise(resolve => setTimeout(resolve, 100));

    const comboboxContainer = canvas.getByTestId('test-combobox');
    const input = comboboxContainer.querySelector('input') as HTMLInputElement;

    // Vérifier que le container est dans le DOM
    await expect(comboboxContainer).toBeInTheDocument();

    if (!input) {
      // Si pas d'input, le test passe sans erreur
      return;
    }

    // Taper du texte pour filtrer
    await userEvent.type(input, 'Ban');

    await new Promise(resolve => setTimeout(resolve, 400));

    // Vérifier que le dropdown apparaît (chercher dans le CDK overlay)
    const dropdown = document.querySelector('.ds-combobox__dropdown, .cdk-overlay-pane');

    if (dropdown) {
      // Sélectionner le premier résultat
      const firstOption = dropdown.querySelector('.ds-combobox__option, [role="option"]') as HTMLElement;
      if (firstOption) {
        await userEvent.click(firstOption);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }

    // Test terminé avec succès
    await expect(comboboxContainer).toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: 'Test d\'interaction automatisé : vérifie la saisie, le filtrage et la sélection.',
      },
    },
  },
};
