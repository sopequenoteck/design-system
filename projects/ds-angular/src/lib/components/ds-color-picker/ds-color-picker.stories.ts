import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { DsColorPicker } from './ds-color-picker';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';

const meta: Meta<DsColorPicker> = {
  title: 'Components/ColorPicker',
  component: DsColorPicker,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
    moduleMetadata({
      imports: [FormsModule, ReactiveFormsModule],
    }),
  ],
  argTypes: {
    value: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    format: {
      control: 'select',
      options: ['hex', 'rgb', 'hsl'],
    },
    disabled: { control: 'boolean' },
    showAlpha: { control: 'boolean' },
    allowClear: { control: 'boolean' },
    showRecentColors: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<DsColorPicker>;

export const Default: Story = {
  args: {
    value: '#3b82f6',
    placeholder: 'Select color',
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
        <ds-color-picker
          [value]="'#3b82f6'"
          size="sm"
          placeholder="Small">
        </ds-color-picker>

        <ds-color-picker
          [value]="'#3b82f6'"
          size="md"
          placeholder="Medium">
        </ds-color-picker>

        <ds-color-picker
          [value]="'#3b82f6'"
          size="lg"
          placeholder="Large">
        </ds-color-picker>
      </div>
    `,
  }),
};

export const Formats: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
        <ds-color-picker
          [value]="'#3b82f6'"
          format="hex"
          placeholder="HEX format">
        </ds-color-picker>

        <ds-color-picker
          [value]="'#3b82f6'"
          format="rgb"
          placeholder="RGB format">
        </ds-color-picker>

        <ds-color-picker
          [value]="'#3b82f6'"
          format="hsl"
          placeholder="HSL format">
        </ds-color-picker>
      </div>
    `,
  }),
};

export const WithAlpha: Story = {
  args: {
    value: '#3b82f680',
    showAlpha: true,
    placeholder: 'Select color with alpha',
  },
};

export const CustomPresets: Story = {
  args: {
    value: '#3b82f6',
    presetColors: [
      '#ef4444', '#f97316', '#f59e0b', '#eab308',
      '#84cc16', '#22c55e', '#10b981', '#14b8a6',
      '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
      '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
    ],
  },
};

export const Disabled: Story = {
  args: {
    value: '#3b82f6',
    disabled: true,
  },
};

export const WithoutClear: Story = {
  args: {
    value: '#3b82f6',
    allowClear: false,
  },
};

export const EmptyState: Story = {
  args: {
    value: '',
    placeholder: 'Choose a color...',
  },
};

export const WithReactiveForm: Story = {
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
  render: () => ({
    props: {
      colorControl: new FormControl('#3b82f6'),
    },
    template: `
      <div style="max-width: 400px;">
        <h3>Reactive Form Integration</h3>

        <ds-color-picker
          [formControl]="colorControl"
          [showAlpha]="true"
          placeholder="Select color">
        </ds-color-picker>

        <div style="margin-top: 16px; padding: 16px; background: #f3f4f6; border-radius: 8px;">
          <strong>Form Value:</strong><br>
          {{ colorControl.value }}
        </div>

        <div style="margin-top: 8px; display: flex; gap: 8px;">
          <button
            (click)="colorControl.setValue('#ef4444')"
            style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; cursor: pointer;">
            Set Red
          </button>
          <button
            (click)="colorControl.setValue('#10b981')"
            style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; cursor: pointer;">
            Set Green
          </button>
          <button
            (click)="colorControl.setValue('')"
            style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; cursor: pointer;">
            Clear
          </button>
        </div>
      </div>
    `,
  }),
};

export const WithSignals: Story = {
  render: () => ({
    template: `
      <div style="max-width: 400px;">
        <h3>Signals Integration</h3>
        <p style="margin-bottom: 16px; color: #666;">
          Ce composant supporte les signals Angular via [(ngModel)] ou formControl.
        </p>

        <ds-color-picker
          [value]="selectedColor"
          [showAlpha]="true"
          (colorChange)="selectedColor = $event"
          placeholder="Select color">
        </ds-color-picker>

        <div style="margin-top: 16px; padding: 16px; background: #f3f4f6; border-radius: 8px;">
          <strong>Selected Color:</strong><br>
          {{ selectedColor || 'None' }}
        </div>

        <div
          style="margin-top: 16px; height: 100px; border-radius: 8px; border: 2px solid #e5e7eb;"
          [style.background-color]="selectedColor">
        </div>

        <div style="margin-top: 8px; display: flex; gap: 8px;">
          <button
            (click)="selectedColor = '#8b5cf6'"
            style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; cursor: pointer;">
            Set Purple
          </button>
          <button
            (click)="selectedColor = '#f59e0b'"
            style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; cursor: pointer;">
            Set Orange
          </button>
          <button
            (click)="selectedColor = ''"
            style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; cursor: pointer;">
            Clear
          </button>
        </div>
      </div>
    `,
    props: {
      selectedColor: '#3b82f6',
    },
  }),
};

export const ThemeShowcase: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; max-width: 700px;">
        <div>
          <h4>Primary Colors</h4>
          <ds-color-picker
            [value]="'#3b82f6'"
            [presetColors]="['#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#10b981', '#14b8a6']">
          </ds-color-picker>
        </div>

        <div>
          <h4>With Alpha Channel</h4>
          <ds-color-picker
            [value]="'#3b82f680'"
            [showAlpha]="true"
            [presetColors]="['#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899']">
          </ds-color-picker>
        </div>

        <div>
          <h4>Small Size</h4>
          <ds-color-picker
            [value]="'#10b981'"
            size="sm">
          </ds-color-picker>
        </div>

        <div>
          <h4>Large Size</h4>
          <ds-color-picker
            [value]="'#f59e0b'"
            size="lg">
          </ds-color-picker>
        </div>
      </div>
    `,
  }),
};

export const ColorPalette: Story = {
  render: () => ({
    template: `
      <div style="max-width: 600px;">
        <h3>Color Palette Builder</h3>
        <p style="color: #6b7280; margin-bottom: 16px;">
          Create and manage your color palette
        </p>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Primary</label>
            <ds-color-picker
              [value]="'#3b82f6'"
              placeholder="Primary color">
            </ds-color-picker>
          </div>

          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Secondary</label>
            <ds-color-picker
              [value]="'#8b5cf6'"
              placeholder="Secondary color">
            </ds-color-picker>
          </div>

          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Accent</label>
            <ds-color-picker
              [value]="'#f59e0b'"
              placeholder="Accent color">
            </ds-color-picker>
          </div>

          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Success</label>
            <ds-color-picker
              [value]="'#10b981'"
              placeholder="Success color">
            </ds-color-picker>
          </div>

          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Warning</label>
            <ds-color-picker
              [value]="'#f59e0b'"
              placeholder="Warning color">
            </ds-color-picker>
          </div>

          <div>
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Error</label>
            <ds-color-picker
              [value]="'#ef4444'"
              placeholder="Error color">
            </ds-color-picker>
          </div>
        </div>
      </div>
    `,
  }),
};

export const Playground: Story = {
  args: {
    value: '#3b82f6',
    size: 'md',
    format: 'hex',
    disabled: false,
    showAlpha: false,
    allowClear: true,
    showRecentColors: true,
    placeholder: 'Select color',
  },
};
