import { Meta, StoryObj, moduleMetadata, applicationConfig } from '@storybook/angular';
import { DsInputNumber } from './ds-input-number';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { JsonPipe } from '@angular/common';

const meta: Meta<DsInputNumber> = {
  title: 'Components/DsInputNumber',
  component: DsInputNumber,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DsInputNumber],
    }),
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du composant',
    },
    controlsPosition: {
      control: 'select',
      options: ['both', 'right'],
      description: 'Position des boutons +/-',
    },
    min: {
      control: 'number',
      description: 'Valeur minimum',
    },
    max: {
      control: 'number',
      description: 'Valeur maximum',
    },
    step: {
      control: 'number',
      description: "Pas d'incrémentation",
    },
    precision: {
      control: 'number',
      description: 'Nombre de décimales',
    },
    disabled: {
      control: 'boolean',
      description: 'État désactivé',
    },
    readonly: {
      control: 'boolean',
      description: 'Lecture seule',
    },
    controls: {
      control: 'boolean',
      description: 'Afficher les boutons +/-',
    },
  },
};

export default meta;
type Story = StoryObj<DsInputNumber>;

// === DEFAULT ===

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    size: 'md',
    placeholder: 'Enter a number',
  },
};

// === WITH MIN/MAX ===

export const WithMinMax: Story = {
  args: {
    min: 10,
    max: 50,
    step: 1,
    size: 'md',
    placeholder: 'Between 10 and 50',
  },
};

// === WITH STEP ===

export const WithStep: Story = {
  args: {
    min: 0,
    max: 100,
    step: 5,
    size: 'md',
    placeholder: 'Step by 5',
  },
};

// === SIZES ===

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <ds-input-number size="sm" [min]="0" [max]="100" placeholder="Small" />
        <ds-input-number size="md" [min]="0" [max]="100" placeholder="Medium" />
        <ds-input-number size="lg" [min]="0" [max]="100" placeholder="Large" />
      </div>
    `,
  }),
};

// === WITH PREFIX/SUFFIX ===

export const WithPrefixSuffix: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <ds-input-number [min]="0" [max]="1000" prefix="$" placeholder="Price" />
        <ds-input-number [min]="0" [max]="100" suffix="kg" placeholder="Weight" />
        <ds-input-number [min]="0" [max]="100" suffix="%" placeholder="Percentage" />
        <ds-input-number [min]="0" [max]="1000" prefix="€" suffix="EUR" placeholder="Amount" />
      </div>
    `,
  }),
};

// === DISABLED ===

export const Disabled: Story = {
  args: {
    disabled: true,
    min: 0,
    max: 100,
    placeholder: 'Disabled input',
  },
};

// === READONLY ===

export const Readonly: Story = {
  args: {
    readonly: true,
    min: 0,
    max: 100,
    placeholder: 'Readonly input',
  },
};

// === WITH PRECISION (DECIMALS) ===

export const WithPrecision: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500;">Integer (precision=0)</label>
          <ds-input-number [min]="0" [max]="100" [precision]="0" [step]="1" />
        </div>
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500;">1 decimal (precision=1)</label>
          <ds-input-number [min]="0" [max]="10" [precision]="1" [step]="0.1" />
        </div>
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500;">2 decimals (precision=2)</label>
          <ds-input-number [min]="0" [max]="1" [precision]="2" [step]="0.01" prefix="$" />
        </div>
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500;">3 decimals (precision=3)</label>
          <ds-input-number [min]="0" [max]="1" [precision]="3" [step]="0.001" />
        </div>
      </div>
    `,
  }),
};

// === CONTROLS RIGHT ===

export const ControlsRight: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    size: 'md',
    controlsPosition: 'right',
    placeholder: 'Controls on right',
  },
};

// === NO CONTROLS ===

export const NoControls: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    size: 'md',
    controls: false,
    placeholder: 'No controls',
  },
};

// === IN REACTIVE FORM ===

@Component({
  selector: 'story-reactive-form',
  template: `
    <form [formGroup]="form()" style="max-width: 400px;">
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500;">Quantity</label>
          <ds-input-number
            formControlName="quantity"
            [min]="1"
            [max]="100"
            [step]="1"
            placeholder="Enter quantity"
          />
        </div>

        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500;">Price ($)</label>
          <ds-input-number
            formControlName="price"
            [min]="0"
            [max]="10000"
            [step]="0.01"
            [precision]="2"
            prefix="$"
            placeholder="Enter price"
          />
        </div>

        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500;">Weight (kg)</label>
          <ds-input-number
            formControlName="weight"
            [min]="0"
            [max]="1000"
            [step]="0.1"
            [precision]="1"
            suffix="kg"
            placeholder="Enter weight"
          />
        </div>

        <div style="padding: 12px; background: var(--gray-100); border-radius: 4px;">
          <strong>Form Value:</strong>
          <pre style="margin: 8px 0 0; font-size: 12px;">{{ form().value | json }}</pre>
        </div>

        <div>
          <button type="button" (click)="reset()" style="padding: 8px 16px; cursor: pointer;">
            Reset Form
          </button>
        </div>
      </div>
    </form>
  `,
  imports: [DsInputNumber, ReactiveFormsModule, JsonPipe],
})
class StoryReactiveFormComponent {
  form = signal(
    new FormGroup({
      quantity: new FormControl(1),
      price: new FormControl(99.99),
      weight: new FormControl(10.5),
    })
  );

  reset(): void {
    this.form().reset({
      quantity: 1,
      price: 99.99,
      weight: 10.5,
    });
  }
}

export const InReactiveForm: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [StoryReactiveFormComponent],
    },
    template: '<story-reactive-form />',
  }),
};

// === WITH VALIDATION ===

@Component({
  selector: 'story-with-validation',
  template: `
    <form [formGroup]="form()" style="max-width: 400px;">
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500;">
            Age (Required, 18-120)
          </label>
          <ds-input-number
            formControlName="age"
            [min]="18"
            [max]="120"
            [step]="1"
            placeholder="Enter your age"
            required
          />
          @if (form().get('age')?.invalid && form().get('age')?.touched) {
            <small style="color: var(--error); margin-top: 4px; display: block;">
              Age is required and must be between 18 and 120
            </small>
          }
        </div>

        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500;">
            Discount (0-100%)
          </label>
          <ds-input-number
            formControlName="discount"
            [min]="0"
            [max]="100"
            [step]="5"
            suffix="%"
            placeholder="Enter discount"
          />
          @if (form().get('discount')?.value !== null && form().get('discount')?.value > 50) {
            <small style="color: var(--warning); margin-top: 4px; display: block;">
              Warning: Discount is over 50%
            </small>
          }
        </div>

        <div style="padding: 12px; background: var(--gray-100); border-radius: 4px;">
          <strong>Form Valid:</strong> {{ form().valid }}<br />
          <strong>Form Value:</strong>
          <pre style="margin: 8px 0 0; font-size: 12px;">{{ form().value | json }}</pre>
        </div>

        <div>
          <button
            type="button"
            [disabled]="form().invalid"
            style="padding: 8px 16px; cursor: pointer;"
            (click)="submit()"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  `,
  imports: [DsInputNumber, ReactiveFormsModule, JsonPipe],
})
class StoryWithValidationComponent {
  form = signal(
    new FormGroup({
      age: new FormControl(null, [Validators.required, Validators.min(18), Validators.max(120)]),
      discount: new FormControl(10),
    })
  );

  submit(): void {
    if (this.form().valid) {
      alert('Form submitted: ' + JSON.stringify(this.form().value));
    }
  }
}

export const WithValidation: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [StoryWithValidationComponent],
    },
    template: '<story-with-validation />',
  }),
};

// === KEYBOARD NAVIGATION ===

export const KeyboardNavigation: Story = {
  render: () => ({
    template: `
      <div style="max-width: 400px;">
        <h3 style="margin-bottom: 16px;">Keyboard Navigation</h3>
        <ds-input-number [min]="0" [max]="100" [step]="1" placeholder="Try keyboard shortcuts" />
        <div style="margin-top: 16px; padding: 12px; background: var(--gray-100); border-radius: 4px;">
          <strong>Keyboard Shortcuts:</strong>
          <ul style="margin: 8px 0; padding-left: 20px; font-size: 14px;">
            <li><kbd>↑</kbd> / <kbd>↓</kbd> - Increment/Decrement by step</li>
            <li><kbd>Home</kbd> - Set to minimum value</li>
            <li><kbd>End</kbd> - Set to maximum value</li>
            <li><kbd>Page Up</kbd> - Increment by 10 steps</li>
            <li><kbd>Page Down</kbd> - Decrement by 10 steps</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

// === THEMED ===

export const Themed: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 32px;">
        <div class="theme-light" style="padding: 24px; flex: 1;">
          <h3 style="margin-bottom: 16px;">Light Theme</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <ds-input-number [min]="0" [max]="100" prefix="$" placeholder="Price" />
            <ds-input-number [min]="0" [max]="100" suffix="%" placeholder="Discount" controlsPosition="right" />
            <ds-input-number [min]="0" [max]="100" disabled placeholder="Disabled" />
          </div>
        </div>

        <div class="theme-dark" style="padding: 24px; flex: 1;">
          <h3 style="margin-bottom: 16px;">Dark Theme</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <ds-input-number [min]="0" [max]="100" prefix="$" placeholder="Price" />
            <ds-input-number [min]="0" [max]="100" suffix="%" placeholder="Discount" controlsPosition="right" />
            <ds-input-number [min]="0" [max]="100" disabled placeholder="Disabled" />
          </div>
        </div>
      </div>
    `,
  }),
};
