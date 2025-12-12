import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { expect, userEvent, within } from '@storybook/test';
import { DsAccordion, AccordionItem } from './ds-accordion';

const defaultItems: AccordionItem[] = [
  {
    id: '1',
    header: 'Qu\'est-ce qu\'un Design System ?',
    content: 'Un Design System est un ensemble de composants réutilisables, guidé par des standards clairs, qui peuvent être assemblés pour construire un nombre illimité d\'applications.',
  },
  {
    id: '2',
    header: 'Pourquoi utiliser un Design System ?',
    content: 'Un Design System permet d\'assurer la cohérence visuelle et fonctionnelle à travers toutes les applications, d\'accélérer le développement et de faciliter la collaboration entre designers et développeurs.',
  },
  {
    id: '3',
    header: 'Comment commencer ?',
    content: 'Installez le package via npm, importez les composants dont vous avez besoin, et consultez la documentation Storybook pour les exemples d\'utilisation.',
  },
];

const meta: Meta<DsAccordion> = {
  title: 'Actions/DsAccordion',
  component: DsAccordion,
  decorators: [
    moduleMetadata({
      imports: [DsAccordion],
    }),
  ],
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Permettre plusieurs items ouverts simultanément',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du composant',
    },
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'separated'],
      description: 'Variant de style',
    },
    disabled: {
      control: 'boolean',
      description: 'Désactiver l\'accordion',
    },
  },
};

export default meta;
type Story = StoryObj<DsAccordion>;

export const Default: Story = {
  args: {
    items: defaultItems,
    multiple: false,
    size: 'md',
    variant: 'default',
    disabled: false,
  },
};

export const Multiple: Story = {
  args: {
    ...Default.args,
    multiple: true,
  },
};

export const Bordered: Story = {
  args: {
    ...Default.args,
    variant: 'bordered',
  },
};

export const Separated: Story = {
  args: {
    ...Default.args,
    variant: 'separated',
  },
};

export const SmallSize: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};

export const WithInitialExpanded: Story = {
  args: {
    ...Default.args,
    expandedIds: ['1'],
  },
};

export const MultipleExpanded: Story = {
  args: {
    ...Default.args,
    multiple: true,
    expandedIds: ['1', '2'],
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    expandedIds: ['1'],
  },
};

export const WithDisabledItem: Story = {
  args: {
    items: [
      { id: '1', header: 'Item actif', content: 'Ce contenu est accessible.' },
      { id: '2', header: 'Item désactivé', content: 'Ce contenu n\'est pas accessible.', disabled: true },
      { id: '3', header: 'Autre item actif', content: 'Ce contenu est aussi accessible.' },
    ],
    multiple: false,
    size: 'md',
    variant: 'default',
  },
};

export const FAQ: Story = {
  args: {
    items: [
      { id: 'faq1', header: 'Comment puis-je réinitialiser mon mot de passe ?', content: 'Cliquez sur "Mot de passe oublié" sur la page de connexion et suivez les instructions envoyées par email.' },
      { id: 'faq2', header: 'Quels sont les modes de paiement acceptés ?', content: 'Nous acceptons les cartes Visa, Mastercard, American Express, PayPal et les virements bancaires.' },
      { id: 'faq3', header: 'Quelle est la politique de retour ?', content: 'Vous disposez de 30 jours pour retourner un article non utilisé dans son emballage d\'origine.' },
      { id: 'faq4', header: 'Comment contacter le support ?', content: 'Vous pouvez nous contacter par email à support@example.com ou par téléphone au 01 23 45 67 89.' },
    ],
    variant: 'bordered',
  },
};

export const LongContent: Story = {
  args: {
    items: [
      {
        id: '1',
        header: 'Conditions générales d\'utilisation',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
    ],
    variant: 'bordered',
  },
};

export const Themed: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div class="theme-light" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Light</h4>
          <ds-accordion
            [items]="items"
            [expandedIds]="['1']"
            variant="bordered"
            size="md">
          </ds-accordion>
        </div>
        <div class="theme-dark" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Dark</h4>
          <ds-accordion
            [items]="items"
            [expandedIds]="['1']"
            variant="bordered"
            size="md">
          </ds-accordion>
        </div>
        <div class="theme-custom" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Custom</h4>
          <ds-accordion
            [items]="items"
            [expandedIds]="['1']"
            variant="bordered"
            size="md">
          </ds-accordion>
        </div>
      </div>
    `,
    props: {
      items: [
        { id: '1', header: 'Section 1', content: 'Contenu de la première section avec tokens thématisés.' },
        { id: '2', header: 'Section 2', content: 'Contenu de la deuxième section.' },
        { id: '3', header: 'Section 3', content: 'Contenu de la troisième section.' },
      ],
    },
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
    items: defaultItems,
    variant: 'bordered',
    size: 'md',
    multiple: false,
  },
  parameters: {
    docs: {
      description: {
        story: `
### Accessibilité clavier

| Touche | Action |
|--------|--------|
| Tab | Déplace le focus vers le header suivant |
| Enter/Space | Expand/Collapse le panneau |
| Arrow Down | Va au header suivant |
| Arrow Up | Va au header précédent |
| Home | Va au premier header |
| End | Va au dernier header |

### Attributs ARIA
- \`role="region"\`: Identifie chaque section
- \`aria-expanded\`: Indique l'état ouvert/fermé
- \`aria-controls\`: Lie le header au panneau de contenu
- \`aria-labelledby\`: Identifie le titre du panneau
- \`aria-disabled\`: Indique les items désactivés

### Bonnes pratiques
- Mode multiple permet l'ouverture de plusieurs sections
- Les headers sont toujours visibles et cliquables
- L'animation d'ouverture/fermeture est fluide
- Les items désactivés restent visibles
        `,
      },
    },
  },
};

export const WithInteractionTest: Story = {
  args: {
    items: defaultItems,
    variant: 'default',
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: `<ds-accordion [items]="items" [variant]="variant" [size]="size" data-testid="test-accordion"></ds-accordion>`,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const accordionContainer = canvas.getByTestId('test-accordion');
    const headers = accordionContainer.querySelectorAll('.ds-accordion__header');

    // Vérifier que les headers sont dans le DOM
    await expect(headers.length).toBeGreaterThan(0);

    const firstHeader = headers[0] as HTMLElement;

    // Vérifier que le panneau est fermé par défaut
    await expect(firstHeader).toHaveAttribute('aria-expanded', 'false');

    // Cliquer pour ouvrir le premier panneau
    await userEvent.click(firstHeader);

    await new Promise(resolve => setTimeout(resolve, 300));

    // Vérifier que le panneau est maintenant ouvert
    await expect(firstHeader).toHaveAttribute('aria-expanded', 'true');

    // Cliquer à nouveau pour fermer
    await userEvent.click(firstHeader);

    await new Promise(resolve => setTimeout(resolve, 300));

    // Vérifier que le panneau est fermé
    await expect(firstHeader).toHaveAttribute('aria-expanded', 'false');
  },
  parameters: {
    docs: {
      description: {
        story: 'Test d\'interaction automatisé : vérifie l\'ouverture et la fermeture des panneaux.',
      },
    },
  },
};
