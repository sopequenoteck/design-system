import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { PrimitiveCheckbox } from './primitive-checkbox';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

const meta: Meta<PrimitiveCheckbox> = {
  title: 'Primitives/PrimitiveCheckbox',
  component: PrimitiveCheckbox,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideAnimations()]
    })
  ],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'État coché'
    },
    disabled: {
      control: 'boolean',
      description: 'État désactivé'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille de la checkbox'
    },
    label: {
      control: 'text',
      description: 'Label associé'
    }
  }
};

export default meta;
type Story = StoryObj<PrimitiveCheckbox>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    size: 'md',
    label: 'Checkbox label'
  },
  render: (args) => ({
    props: args,
    template: `<primitive-checkbox [checked]="checked" [disabled]="disabled" [size]="size" [label]="label"></primitive-checkbox>`
  })
};

export const AllStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem;">
        <primitive-checkbox [checked]="false" label="Unchecked"></primitive-checkbox>
        <primitive-checkbox [checked]="true" label="Checked"></primitive-checkbox>
        <primitive-checkbox [checked]="false" [disabled]="true" label="Disabled Unchecked"></primitive-checkbox>
        <primitive-checkbox [checked]="true" [disabled]="true" label="Disabled Checked"></primitive-checkbox>
      </div>
    `
  })
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem;">
        <primitive-checkbox size="sm" label="Small checkbox"></primitive-checkbox>
        <primitive-checkbox size="md" label="Medium checkbox"></primitive-checkbox>
        <primitive-checkbox size="lg" label="Large checkbox"></primitive-checkbox>
      </div>
    `
  })
};
