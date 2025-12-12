import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DsStepper, Step } from './ds-stepper';

const defaultSteps: Step[] = [
  { label: 'Informations personnelles', description: 'Nom, prénom, email' },
  { label: 'Adresse', description: 'Adresse de livraison' },
  { label: 'Paiement', description: 'Méthode de paiement' },
  { label: 'Confirmation', description: 'Récapitulatif de la commande' },
];

const meta: Meta<DsStepper> = {
  title: 'Navigation/DsStepper',
  component: DsStepper,
  decorators: [
    moduleMetadata({
      imports: [DsStepper],
    }),
  ],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation du stepper',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du stepper',
    },
    activeStep: {
      control: { type: 'number', min: 0, max: 3 },
      description: 'Index de l\'étape active (0-indexed)',
    },
    clickable: {
      control: 'boolean',
      description: 'Permettre la navigation par clic',
    },
    linear: {
      control: 'boolean',
      description: 'Navigation linéaire obligatoire',
    },
    showDescriptions: {
      control: 'boolean',
      description: 'Afficher les descriptions',
    },
    showConnector: {
      control: 'boolean',
      description: 'Afficher les connecteurs',
    },
  },
};

export default meta;
type Story = StoryObj<DsStepper>;

export const Default: Story = {
  args: {
    steps: defaultSteps,
    activeStep: 0,
    orientation: 'horizontal',
    size: 'md',
    clickable: true,
    linear: false,
    showDescriptions: true,
    showConnector: true,
  },
};

export const SecondStep: Story = {
  args: {
    ...Default.args,
    activeStep: 1,
  },
};

export const ThirdStep: Story = {
  args: {
    ...Default.args,
    activeStep: 2,
  },
};

export const Completed: Story = {
  args: {
    ...Default.args,
    activeStep: 3,
  },
};

export const Vertical: Story = {
  args: {
    ...Default.args,
    orientation: 'vertical',
  },
};

export const VerticalActiveSecond: Story = {
  args: {
    ...Default.args,
    orientation: 'vertical',
    activeStep: 1,
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

export const WithoutDescriptions: Story = {
  args: {
    ...Default.args,
    showDescriptions: false,
  },
};

export const WithoutConnectors: Story = {
  args: {
    ...Default.args,
    showConnector: false,
  },
};

export const Linear: Story = {
  args: {
    ...Default.args,
    linear: true,
    activeStep: 1,
  },
};

export const NotClickable: Story = {
  args: {
    ...Default.args,
    clickable: false,
  },
};

export const WithErrorState: Story = {
  args: {
    steps: [
      { label: 'Informations', description: 'Complétées', state: 'completed' },
      { label: 'Validation', description: 'Erreur détectée', state: 'error' },
      { label: 'Confirmation', description: 'En attente' },
    ],
    activeStep: 1,
  },
};

export const WithOptionalSteps: Story = {
  args: {
    steps: [
      { label: 'Étape 1', description: 'Obligatoire' },
      { label: 'Étape 2', description: 'Facultative', optional: true },
      { label: 'Étape 3', description: 'Obligatoire' },
    ],
    activeStep: 0,
  },
};

export const WithDisabledSteps: Story = {
  args: {
    steps: [
      { label: 'Étape 1' },
      { label: 'Étape 2', disabled: true },
      { label: 'Étape 3' },
    ],
    activeStep: 0,
    clickable: true,
  },
};

export const ManySteps: Story = {
  args: {
    steps: [
      { label: 'Étape 1' },
      { label: 'Étape 2' },
      { label: 'Étape 3' },
      { label: 'Étape 4' },
      { label: 'Étape 5' },
      { label: 'Étape 6' },
    ],
    activeStep: 2,
    showDescriptions: false,
  },
};

export const Themed: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div class="theme-light" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Light</h4>
          <ds-stepper
            [steps]="steps"
            [activeStep]="1"
            orientation="horizontal"
            size="md">
          </ds-stepper>
        </div>
        <div class="theme-dark" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Dark</h4>
          <ds-stepper
            [steps]="steps"
            [activeStep]="1"
            orientation="horizontal"
            size="md">
          </ds-stepper>
        </div>
        <div class="theme-custom" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Custom</h4>
          <ds-stepper
            [steps]="steps"
            [activeStep]="1"
            orientation="horizontal"
            size="md">
          </ds-stepper>
        </div>
      </div>
    `,
    props: {
      steps: [
        { label: 'Informations', description: 'Complété', state: 'completed' },
        { label: 'Livraison', description: 'En cours' },
        { label: 'Paiement', description: 'En attente' },
        { label: 'Confirmation', description: 'En attente' },
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
