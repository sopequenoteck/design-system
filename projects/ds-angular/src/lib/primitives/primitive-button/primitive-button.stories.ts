import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { PrimitiveButton } from './primitive-button';
import { provideAnimations } from '@angular/platform-browser/animations';
import { faPlus, faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<PrimitiveButton> = {
  title: 'Primitives/PrimitiveButton',
  component: PrimitiveButton,
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
    }
  }
};

export default meta;
type Story = StoryObj<PrimitiveButton>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    outline: false
  },
  render: (args) => ({
    props: args,
    template: `<primitive-button [variant]="variant" [size]="size" [disabled]="disabled" [outline]="outline">Primary Button</primitive-button>`
  })
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; padding: 1rem;">
        <primitive-button variant="primary">Primary</primitive-button>
        <primitive-button variant="secondary">Secondary</primitive-button>
        <primitive-button variant="ghost">Ghost</primitive-button>
        <primitive-button variant="success">Success</primitive-button>
        <primitive-button variant="warning">Warning</primitive-button>
        <primitive-button variant="error">Error</primitive-button>
        <primitive-button variant="info">Info</primitive-button>
      </div>
    `
  })
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem; align-items: center; padding: 1rem;">
        <primitive-button size="sm">Small</primitive-button>
        <primitive-button size="md">Medium</primitive-button>
        <primitive-button size="lg">Large</primitive-button>
      </div>
    `
  })
};

export const WithIcons: Story = {
  render: () => ({
    props: { faPlus, faTrash, faEdit, faCheck },
    template: `
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; padding: 1rem;">
        <primitive-button [startIcon]="faPlus">Add</primitive-button>
        <primitive-button [endIcon]="faTrash" variant="error">Delete</primitive-button>
        <primitive-button [startIcon]="faEdit" variant="secondary">Edit</primitive-button>
        <primitive-button [startIcon]="faCheck" variant="success">Confirm</primitive-button>
      </div>
    `
  })
};

export const Outline: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; padding: 1rem;">
        <primitive-button variant="primary" [outline]="true">Primary</primitive-button>
        <primitive-button variant="secondary" [outline]="true">Secondary</primitive-button>
        <primitive-button variant="success" [outline]="true">Success</primitive-button>
        <primitive-button variant="error" [outline]="true">Error</primitive-button>
      </div>
    `
  })
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; padding: 1rem;">
        <primitive-button [disabled]="true">Disabled</primitive-button>
        <primitive-button variant="primary" [disabled]="true">Disabled Primary</primitive-button>
        <primitive-button variant="error" [disabled]="true">Disabled Error</primitive-button>
      </div>
    `
  })
};
