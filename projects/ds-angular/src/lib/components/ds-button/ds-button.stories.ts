import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { DsButton } from './ds-button';
import { provideAnimations } from '@angular/platform-browser/animations';
import { faPlus, faDownload, faSave } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<DsButton> = {
  title: 'Components/DsButton',
  component: DsButton,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideAnimations()]
    })
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'success', 'warning', 'error', 'info'],
      description: 'Variant du bouton'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du bouton'
    },
    disabled: {
      control: 'boolean',
      description: 'État désactivé'
    },
    outline: {
      control: 'boolean',
      description: 'Style outline'
    },
    loading: {
      control: 'boolean',
      description: 'État de chargement'
    }
  }
};

export default meta;
type Story = StoryObj<DsButton>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    outline: false,
    loading: false
  },
  render: (args) => ({
    props: args,
    template: `<ds-button [variant]="variant" [size]="size" [disabled]="disabled" [outline]="outline" [loading]="loading">Click me</ds-button>`
  })
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; padding: 1rem;">
        <ds-button variant="primary">Primary</ds-button>
        <ds-button variant="secondary">Secondary</ds-button>
        <ds-button variant="ghost">Ghost</ds-button>
        <ds-button variant="success">Success</ds-button>
        <ds-button variant="warning">Warning</ds-button>
        <ds-button variant="error">Error</ds-button>
        <ds-button variant="info">Info</ds-button>
      </div>
    `
  })
};

export const WithIcons: Story = {
  render: () => ({
    props: { faPlus, faDownload, faSave },
    template: `
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; padding: 1rem;">
        <ds-button [startIcon]="faPlus">Add Item</ds-button>
        <ds-button [endIcon]="faDownload" variant="secondary">Download</ds-button>
        <ds-button [startIcon]="faSave" variant="success">Save</ds-button>
      </div>
    `
  })
};

export const Loading: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; padding: 1rem;">
        <ds-button [loading]="true">Loading...</ds-button>
        <ds-button variant="primary" [loading]="true">Processing</ds-button>
        <ds-button variant="success" [loading]="true">Saving</ds-button>
      </div>
    `
  })
};
