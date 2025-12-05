import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
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
  title: 'Components/DsAccordion',
  component: DsAccordion,
  decorators: [
    moduleMetadata({
      imports: [DsAccordion],
    }),
  ],
  tags: ['autodocs'],
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
