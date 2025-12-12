import type { Meta, StoryObj } from '@storybook/angular';
import { DsSlider } from './ds-slider';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';

const meta: Meta<DsSlider> = {
  title: 'Form/Selection/DsSlider',
  component: DsSlider,
  argTypes: {
    min: {
      control: 'number',
      description: 'Valeur minimale du slider',
    },
    max: {
      control: 'number',
      description: 'Valeur maximale du slider',
    },
    step: {
      control: 'number',
      description: 'Incrément de valeur',
    },
    disabled: {
      control: 'boolean',
      description: 'État désactivé',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du slider',
    },
    range: {
      control: 'boolean',
      description: 'Mode range (deux handles)',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation du slider',
    },
    showLabels: {
      control: 'boolean',
      description: 'Afficher les labels min/max',
    },
    showTicks: {
      control: 'boolean',
      description: 'Afficher les ticks',
    },
    tickInterval: {
      control: 'number',
      description: 'Intervalle des ticks',
    },
  },
};

export default meta;
type Story = StoryObj<DsSlider>;

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    size: 'md',
    range: false,
    orientation: 'horizontal',
    showLabels: false,
    showTicks: false,
  },
};

export const WithRange: Story = {
  args: {
    ...Default.args,
    range: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-slider
        [min]="min"
        [max]="max"
        [step]="step"
        [disabled]="disabled"
        [size]="size"
        [range]="range"
        [orientation]="orientation"
        [showLabels]="showLabels"
        [showTicks]="showTicks"
        [tickInterval]="tickInterval">
      </ds-slider>
      <p style="margin-top: 1rem;">Sélectionnez une plage de valeurs entre 0 et 100.</p>
    `,
  }),
};

export const WithLabels: Story = {
  args: {
    ...Default.args,
    showLabels: true,
    min: 0,
    max: 100,
  },
};

export const WithTicks: Story = {
  args: {
    ...Default.args,
    showTicks: true,
    tickInterval: 10,
    min: 0,
    max: 100,
  },
};

export const CustomStep: Story = {
  args: {
    ...Default.args,
    min: 0,
    max: 100,
    step: 5,
    showLabels: true,
    showTicks: true,
    tickInterval: 25,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const SmallSize: Story = {
  args: {
    ...Default.args,
    size: 'sm',
    showLabels: true,
  },
};

export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: 'lg',
    showLabels: true,
  },
};

export const WithFormatLabelCurrency: Story = {
  args: {
    ...Default.args,
    min: 0,
    max: 1000,
    step: 10,
    showLabels: true,
  },
  render: (args) => ({
    props: {
      ...args,
      formatLabel: (value: number) => `${value}€`,
    },
    template: `
      <ds-slider
        [min]="min"
        [max]="max"
        [step]="step"
        [disabled]="disabled"
        [size]="size"
        [range]="range"
        [orientation]="orientation"
        [showLabels]="showLabels"
        [showTicks]="showTicks"
        [tickInterval]="tickInterval"
        [formatLabel]="formatLabel">
      </ds-slider>
      <p style="margin-top: 1rem;">Format: monétaire (€)</p>
    `,
  }),
};

export const WithFormatLabelPercentage: Story = {
  args: {
    ...Default.args,
    min: 0,
    max: 100,
    step: 1,
    showLabels: true,
    showTicks: true,
    tickInterval: 25,
  },
  render: (args) => ({
    props: {
      ...args,
      formatLabel: (value: number) => `${value}%`,
    },
    template: `
      <ds-slider
        [min]="min"
        [max]="max"
        [step]="step"
        [disabled]="disabled"
        [size]="size"
        [range]="range"
        [orientation]="orientation"
        [showLabels]="showLabels"
        [showTicks]="showTicks"
        [tickInterval]="tickInterval"
        [formatLabel]="formatLabel">
      </ds-slider>
      <p style="margin-top: 1rem;">Format: pourcentage (%)</p>
    `,
  }),
};

export const Vertical: Story = {
  args: {
    ...Default.args,
    orientation: 'vertical',
    showLabels: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 300px; display: flex; justify-content: center;">
        <ds-slider
          [min]="min"
          [max]="max"
          [step]="step"
          [disabled]="disabled"
          [size]="size"
          [range]="range"
          [orientation]="orientation"
          [showLabels]="showLabels"
          [showTicks]="showTicks"
          [tickInterval]="tickInterval">
        </ds-slider>
      </div>
    `,
  }),
};

@Component({
  selector: 'story-slider-form',
  imports: [DsSlider, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <div style="margin-bottom: 1rem;">
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Volume</label>
        <ds-slider
          formControlName="volume"
          [min]="0"
          [max]="100"
          [step]="1"
          [showLabels]="true"
          [formatLabel]="formatVolume">
        </ds-slider>
      </div>

      <div style="margin-bottom: 1rem;">
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Prix (range)</label>
        <ds-slider
          formControlName="priceRange"
          [min]="0"
          [max]="1000"
          [step]="10"
          [range]="true"
          [showLabels]="true"
          [formatLabel]="formatPrice">
        </ds-slider>
      </div>

      <div style="padding: 1rem; background: #f3f4f6; border-radius: 0.5rem;">
        <h4 style="margin-top: 0;">Valeurs du formulaire:</h4>
        <pre>{{ form.value | json }}</pre>
      </div>
    </form>
  `,
})
class StorySliderFormComponent {
  form = new FormGroup({
    volume: new FormControl(50),
    priceRange: new FormControl([200, 800]),
  });

  formatVolume = (value: number) => `${value}%`;
  formatPrice = (value: number) => `${value}€`;
}

export const InReactiveForm: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [DsSlider, ReactiveFormsModule],
    },
    component: StorySliderFormComponent,
  }),
};

@Component({
  selector: 'story-slider-themed',
  imports: [DsSlider],
  template: `
    <div style="display: flex; flex-direction: column; gap: 3rem;">
      <div>
        <h3 style="margin-bottom: 1rem;">Light Theme</h3>
        <div class="theme-light" style="padding: 2rem; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
          <ds-slider
            [min]="0"
            [max]="100"
            [step]="1"
            [showLabels]="true"
            [showTicks]="true"
            [tickInterval]="25">
          </ds-slider>
        </div>
      </div>

      <div>
        <h3 style="margin-bottom: 1rem;">Dark Theme</h3>
        <div class="theme-dark" style="padding: 2rem; background: #1f2937; border: 1px solid #374151; border-radius: 0.5rem;">
          <ds-slider
            [min]="0"
            [max]="100"
            [step]="1"
            [showLabels]="true"
            [showTicks]="true"
            [tickInterval]="25">
          </ds-slider>
        </div>
      </div>

      <div>
        <h3 style="margin-bottom: 1rem;">Custom Theme</h3>
        <div class="theme-custom" style="padding: 2rem; background: #fdf2f8; border: 1px solid #f9a8d4; border-radius: 0.5rem;">
          <ds-slider
            [min]="0"
            [max]="100"
            [step]="1"
            [showLabels]="true"
            [showTicks]="true"
            [tickInterval]="25">
          </ds-slider>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host ::ng-deep .theme-custom {
      --slider-track-bg: #fbcfe8;
      --slider-fill-bg: #ec4899;
      --slider-thumb-bg: #ffffff;
      --slider-thumb-border-color: #ec4899;
      --slider-tick-color: #f9a8d4;
      --slider-label-color: #831843;
    }
  `],
})
class StorySliderThemedComponent {}

export const Themed: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [DsSlider],
    },
    component: StorySliderThemedComponent,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Le slider s\'adapte automatiquement aux thèmes Light, Dark et Custom via les tokens CSS.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h4 style="margin-bottom: 0.5rem;">Small (sm)</h4>
          <ds-slider
            [min]="0"
            [max]="100"
            [step]="1"
            size="sm"
            [showLabels]="true">
          </ds-slider>
        </div>

        <div>
          <h4 style="margin-bottom: 0.5rem;">Medium (md)</h4>
          <ds-slider
            [min]="0"
            [max]="100"
            [step]="1"
            size="md"
            [showLabels]="true">
          </ds-slider>
        </div>

        <div>
          <h4 style="margin-bottom: 0.5rem;">Large (lg)</h4>
          <ds-slider
            [min]="0"
            [max]="100"
            [step]="1"
            size="lg"
            [showLabels]="true">
          </ds-slider>
        </div>
      </div>
    `,
  }),
};

export const RangeWithCustomFormatter: Story = {
  args: {
    ...Default.args,
    range: true,
    min: 18,
    max: 65,
    step: 1,
    showLabels: true,
  },
  render: (args) => ({
    props: {
      ...args,
      formatLabel: (value: number) => `${value} ans`,
    },
    template: `
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Tranche d'âge</label>
        <ds-slider
          [min]="min"
          [max]="max"
          [step]="step"
          [range]="range"
          [showLabels]="showLabels"
          [formatLabel]="formatLabel">
        </ds-slider>
        <p style="margin-top: 1rem; color: #6b7280;">Sélectionnez une tranche d'âge entre 18 et 65 ans.</p>
      </div>
    `,
  }),
};
