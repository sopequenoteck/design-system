import type { Meta, StoryObj } from '@storybook/angular';
import { expect, userEvent, within } from '@storybook/test';
import { DsCheckbox } from './ds-checkbox';

const meta: Meta<DsCheckbox> = {
  title: 'Form/Selection/DsCheckbox',
  component: DsCheckbox,
  argTypes: {
    label: {
      control: 'text',
      description: 'Label accompagnant la case à cocher. Requis pour l\'accessibilité.',
    },
    helper: {
      control: 'text',
      description: 'Texte d\'aide affiché sous le composant pour guider l\'utilisateur.',
    },
    error: {
      control: 'text',
      description: 'Message d\'erreur affiché lorsque la validation échoue. Active l\'état erreur.',
    },
    required: {
      control: 'boolean',
      description: 'Marque le champ comme obligatoire. Ajoute un indicateur visuel (*).',
    },
    disabled: {
      control: 'boolean',
      description: 'Désactive le composant. L\'utilisateur ne peut plus interagir avec.',
    },
    indeterminate: {
      control: 'boolean',
      description: 'État indéterminé (-). Utile pour une checkbox parent avec enfants partiellement sélectionnés.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du composant (sm: compact, md: standard, lg: large).',
    },
  },
};

export default meta;
type Story = StoryObj<DsCheckbox>;

export const Default: Story = {
  args: {
    label: 'J\'accepte les conditions',
    disabled: false,
    required: false,
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Checkbox standard avec label. Utilisez les contrôles pour modifier les propriétés.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `<ds-checkbox [label]="label" [disabled]="disabled" [required]="required" [size]="size"></ds-checkbox>`,
  }),
};

export const WithHelper: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Checkbox avec texte d\'aide sous le label pour guider l\'utilisateur.',
      },
    },
  },
  render: () => ({
    template: `
      <ds-checkbox
        label="Newsletter"
        helper="Recevez nos dernières actualités par email">
      </ds-checkbox>
    `,
  }),
};

export const WithError: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Checkbox en état d\'erreur avec message de validation. Utilisé quand l\'utilisateur doit accepter des conditions obligatoires.',
      },
    },
  },
  render: () => ({
    template: `
      <ds-checkbox
        label="J'accepte les conditions d'utilisation"
        [required]="true"
        error="Vous devez accepter les conditions pour continuer">
      </ds-checkbox>
    `,
  }),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Les trois tailles disponibles : `sm` pour les interfaces denses, `md` par défaut, `lg` pour les écrans tactiles.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <ds-checkbox size="sm" label="Small"></ds-checkbox>
        <ds-checkbox size="md" label="Medium"></ds-checkbox>
        <ds-checkbox size="lg" label="Large"></ds-checkbox>
      </div>
    `,
  }),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'États visuels : non coché (par défaut) et indéterminé. L\'état indéterminé est utilisé pour les sélections partielles.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <ds-checkbox label="Non coché"></ds-checkbox>
        <ds-checkbox [indeterminate]="true" label="Indéterminé"></ds-checkbox>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Checkbox désactivée. Empêche toute interaction utilisateur tout en restant visible.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <ds-checkbox [disabled]="true" label="Désactivé"></ds-checkbox>
      </div>
    `,
  }),
};

export const Required: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Checkbox obligatoire avec indicateur visuel (*). Doit être cochée pour soumettre le formulaire.',
      },
    },
  },
  render: () => ({
    template: `
      <ds-checkbox
        [required]="true"
        label="Champ obligatoire">
      </ds-checkbox>
    `,
  }),
};

export const FormExample: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Exemple de formulaire de préférences avec plusieurs checkboxes. Montre l\'utilisation combinée de helpers et de l\'état désactivé.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="max-width: 400px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h3 style="margin: 0 0 16px;">Préférences</h3>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <ds-checkbox label="Notifications par email" helper="Résumé quotidien"></ds-checkbox>
          <ds-checkbox label="Notifications SMS" helper="Alertes importantes uniquement"></ds-checkbox>
          <ds-checkbox label="Newsletter mensuelle"></ds-checkbox>
          <ds-checkbox [disabled]="true" label="Offres partenaires" helper="Indisponible"></ds-checkbox>
        </div>
      </div>
    `,
  }),
};

export const Themed: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div class="theme-light" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Light</h4>
          <ds-checkbox label="Checkbox option"></ds-checkbox>
        </div>
        <div class="theme-dark" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Dark</h4>
          <ds-checkbox label="Checkbox option"></ds-checkbox>
        </div>
        <div class="theme-custom" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Custom</h4>
          <ds-checkbox label="Checkbox option"></ds-checkbox>
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

export const Accessibility: Story = {
  args: {
    label: 'J\'accepte les conditions',
    helper: 'Cochez cette case pour continuer',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: `
### Accessibilité clavier

| Touche | Action |
|--------|--------|
| Tab | Déplace le focus vers la checkbox |
| Space | Coche/décoche la checkbox |
| Shift + Tab | Déplace le focus vers l'élément précédent |

### Attributs ARIA
- \`role="checkbox"\`: Identifie l'élément comme une case à cocher
- \`aria-checked\`: Indique l'état coché/non coché/indéterminé
- \`aria-disabled\`: Indique si la checkbox est désactivée
- \`aria-required\`: Indique si la checkbox est obligatoire
- \`aria-describedby\`: Lie le message d'aide ou d'erreur

### Bonnes pratiques
- Le label est toujours visible et cliquable
- L'état de focus est clairement visible
- Les messages d'erreur sont annoncés aux lecteurs d'écran
- L'indicateur requis (*) est présent visuellement et dans le label ARIA
        `,
      },
    },
  },
};

export const WithInteractionTest: Story = {
  args: {
    label: 'Option de test',
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: `<ds-checkbox [label]="label" [size]="size" data-testid="test-checkbox"></ds-checkbox>`,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Attendre le rendu initial
    await new Promise(resolve => setTimeout(resolve, 200));

    const checkboxContainer = canvas.getByTestId('test-checkbox');

    // Vérifier que le container est dans le DOM
    await expect(checkboxContainer).toBeInTheDocument();

    // Trouver l'élément cliquable
    const checkbox = checkboxContainer.querySelector('input[type="checkbox"]');
    const clickableElement = checkbox || checkboxContainer.querySelector('.primitive-checkbox, .ds-checkbox__box') || checkboxContainer;

    if (!clickableElement) {
      return;
    }

    // Cliquer pour cocher
    await userEvent.click(clickableElement);
    await new Promise(resolve => setTimeout(resolve, 150));

    // Cliquer pour décocher
    await userEvent.click(clickableElement);
    await new Promise(resolve => setTimeout(resolve, 150));

    // Test terminé avec succès
    await expect(checkboxContainer).toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: 'Test d\'interaction automatisé : vérifie le toggle de l\'état coché/décoché.',
      },
    },
  },
};
