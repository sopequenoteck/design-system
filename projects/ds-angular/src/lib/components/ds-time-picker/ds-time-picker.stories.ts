import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DsTimePicker } from './ds-time-picker';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';

const meta: Meta<DsTimePicker> = {
  title: 'Form/Pickers/DsTimePicker',
  component: DsTimePicker,
  argTypes: {
    value: { control: 'text' },
    format: { control: 'radio', options: ['12h', '24h'] },
    showSeconds: { control: 'boolean' },
    minuteStep: { control: 'number' },
    hourStep: { control: 'number' },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    placeholder: { control: 'text' },
    minTime: { control: 'text' },
    maxTime: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<DsTimePicker>;

export const Default: Story = {
  args: {
    placeholder: 'Select time',
  },
};

export const With24HourFormat: Story = {
  args: {
    value: '14:30',
    format: '24h',
    placeholder: 'HH:mm',
  },
};

export const With12HourFormat: Story = {
  args: {
    value: '14:30',
    format: '12h',
    placeholder: 'hh:mm AM/PM',
  },
};

export const WithSeconds: Story = {
  args: {
    value: '14:30:45',
    format: '24h',
    showSeconds: true,
    placeholder: 'HH:mm:ss',
  },
};

export const WithSeconds12Hour: Story = {
  args: {
    value: '14:30:45',
    format: '12h',
    showSeconds: true,
    placeholder: 'hh:mm:ss AM/PM',
  },
};

export const WithMinuteStep5: Story = {
  args: {
    value: '14:30',
    minuteStep: 5,
    placeholder: 'Select time (5 min steps)',
  },
};

export const WithMinuteStep15: Story = {
  args: {
    value: '14:30',
    minuteStep: 15,
    placeholder: 'Select time (15 min steps)',
  },
};

export const SmallSize: Story = {
  args: {
    size: 'sm',
    value: '10:00',
    placeholder: 'Small',
  },
};

export const MediumSize: Story = {
  args: {
    size: 'md',
    value: '10:00',
    placeholder: 'Medium',
  },
};

export const LargeSize: Story = {
  args: {
    size: 'lg',
    value: '10:00',
    placeholder: 'Large',
  },
};

export const Disabled: Story = {
  args: {
    value: '14:30',
    disabled: true,
  },
};

export const Readonly: Story = {
  args: {
    value: '14:30',
    readonly: true,
  },
};

export const Midnight: Story = {
  args: {
    value: '00:00',
    format: '12h',
    placeholder: 'Midnight',
  },
};

export const Noon: Story = {
  args: {
    value: '12:00',
    format: '12h',
    placeholder: 'Noon',
  },
};

@Component({
  selector: 'storybook-time-picker-reactive-form',
  standalone: true,
  imports: [DsTimePicker, ReactiveFormsModule],
  template: `
    <div style="max-width: 300px;">
      <h3 style="margin-bottom: 1rem;">Reactive Form Example</h3>

      <ds-time-picker
        [formControl]="timeControl"
        [format]="'24h'"
        [showSeconds]="true"
        placeholder="Select meeting time">
      </ds-time-picker>

      <div style="margin-top: 1rem; padding: 1rem; background: #f5f5f5; border-radius: 4px;">
        <p style="margin: 0; font-size: 14px;">
          <strong>Selected time:</strong>
          {{ timeControl.value || 'None' }}
        </p>
        <p style="margin: 0.5rem 0 0 0; font-size: 14px;">
          <strong>Valid:</strong>
          {{ timeControl.valid ? 'Yes' : 'No' }}
        </p>
        <p style="margin: 0.5rem 0 0 0; font-size: 14px;">
          <strong>Touched:</strong>
          {{ timeControl.touched ? 'Yes' : 'No' }}
        </p>
      </div>

      <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
        <button
          (click)="timeControl.setValue('09:00:00')"
          style="padding: 0.5rem 1rem; cursor: pointer;">
          Set 9:00 AM
        </button>
        <button
          (click)="timeControl.setValue('14:30:00')"
          style="padding: 0.5rem 1rem; cursor: pointer;">
          Set 2:30 PM
        </button>
        <button
          (click)="timeControl.reset()"
          style="padding: 0.5rem 1rem; cursor: pointer;">
          Reset
        </button>
      </div>
    </div>
  `,
})
class ReactiveFormStory {
  timeControl = new FormControl('10:30:00');
}

export const InReactiveForm: Story = {
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormStory],
    }),
  ],
  render: () => ({
    template: `<storybook-time-picker-reactive-form></storybook-time-picker-reactive-form>`,
  }),
};

@Component({
  selector: 'storybook-time-picker-sizes',
  standalone: true,
  imports: [DsTimePicker],
  template: `
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Small</label>
        <ds-time-picker
          [size]="'sm'"
          [value]="'09:00'"
          placeholder="Small size">
        </ds-time-picker>
      </div>

      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Medium</label>
        <ds-time-picker
          [size]="'md'"
          [value]="'14:30'"
          placeholder="Medium size">
        </ds-time-picker>
      </div>

      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Large</label>
        <ds-time-picker
          [size]="'lg'"
          [value]="'18:45'"
          placeholder="Large size">
        </ds-time-picker>
      </div>
    </div>
  `,
})
class SizesStory {}

export const AllSizes: Story = {
  decorators: [
    moduleMetadata({
      imports: [SizesStory],
    }),
  ],
  render: () => ({
    template: `<storybook-time-picker-sizes></storybook-time-picker-sizes>`,
  }),
};

@Component({
  selector: 'storybook-time-picker-formats',
  standalone: true,
  imports: [DsTimePicker],
  template: `
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">24-hour format</label>
        <ds-time-picker
          [value]="'14:30'"
          [format]="'24h'"
          placeholder="HH:mm">
        </ds-time-picker>
      </div>

      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">12-hour format</label>
        <ds-time-picker
          [value]="'14:30'"
          [format]="'12h'"
          placeholder="hh:mm AM/PM">
        </ds-time-picker>
      </div>

      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">With seconds (24h)</label>
        <ds-time-picker
          [value]="'14:30:45'"
          [format]="'24h'"
          [showSeconds]="true"
          placeholder="HH:mm:ss">
        </ds-time-picker>
      </div>

      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">With seconds (12h)</label>
        <ds-time-picker
          [value]="'14:30:45'"
          [format]="'12h'"
          [showSeconds]="true"
          placeholder="hh:mm:ss AM/PM">
        </ds-time-picker>
      </div>
    </div>
  `,
})
class FormatsStory {}

export const AllFormats: Story = {
  decorators: [
    moduleMetadata({
      imports: [FormatsStory],
    }),
  ],
  render: () => ({
    template: `<storybook-time-picker-formats></storybook-time-picker-formats>`,
  }),
};

@Component({
  selector: 'storybook-time-picker-steps',
  standalone: true,
  imports: [DsTimePicker],
  template: `
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">1 minute step</label>
        <ds-time-picker
          [value]="'14:30'"
          [minuteStep]="1"
          placeholder="Every minute">
        </ds-time-picker>
      </div>

      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">5 minute step</label>
        <ds-time-picker
          [value]="'14:30'"
          [minuteStep]="5"
          placeholder="Every 5 minutes">
        </ds-time-picker>
      </div>

      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">15 minute step</label>
        <ds-time-picker
          [value]="'14:30'"
          [minuteStep]="15"
          placeholder="Every 15 minutes">
        </ds-time-picker>
      </div>

      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">30 minute step</label>
        <ds-time-picker
          [value]="'14:30'"
          [minuteStep]="30"
          placeholder="Every 30 minutes">
        </ds-time-picker>
      </div>
    </div>
  `,
})
class StepsStory {}

export const MinuteSteps: Story = {
  decorators: [
    moduleMetadata({
      imports: [StepsStory],
    }),
  ],
  render: () => ({
    template: `<storybook-time-picker-steps></storybook-time-picker-steps>`,
  }),
};

export const Accessibility: Story = {
  args: {
    format: '24h',
    showSeconds: true,
    size: 'md',
    placeholder: 'HH:mm:ss',
  },
  parameters: {
    docs: {
      description: {
        story: `
### Accessibilité clavier

| Touche | Action |
|--------|--------|
| Tab | Navigue entre heures, minutes, secondes |
| Arrow Up/Down | Incrémente/décrémente la valeur |
| Home/End | Va à min/max (00 ou 23/59) |
| Type | Saisie directe de la valeur |
| Enter | Valide la saisie |

### Attributs ARIA
- \`role="spinbutton"\`: Pour chaque champ (heure, minute, seconde)
- \`aria-valuenow\`: Valeur actuelle
- \`aria-valuemin\`: Valeur minimale
- \`aria-valuemax\`: Valeur maximale
- \`aria-label\`: Identifie chaque champ

### Bonnes pratiques
- Support 12h et 24h avec AM/PM
- Steps configurables (minuteStep, hourStep)
- Saisie directe et navigation clavier
- Format clair avec placeholder
        `,
      },
    },
  },
};

export const WithMinTime: Story = {
  args: {
    value: '10:00',
    minTime: '09:00',
    format: '24h',
    placeholder: 'Min: 09:00',
  },
  parameters: {
    docs: {
      description: {
        story: 'Time picker with minimum time constraint. Hours before 09:00 are disabled.',
      },
    },
  },
};

export const WithMaxTime: Story = {
  args: {
    value: '16:00',
    maxTime: '18:00',
    format: '24h',
    placeholder: 'Max: 18:00',
  },
  parameters: {
    docs: {
      description: {
        story: 'Time picker with maximum time constraint. Hours after 18:00 are disabled.',
      },
    },
  },
};

export const WithMinMaxRange: Story = {
  args: {
    value: '12:00',
    minTime: '09:00',
    maxTime: '17:30',
    format: '24h',
    placeholder: '09:00 - 17:30',
  },
  parameters: {
    docs: {
      description: {
        story: 'Time picker with both min and max constraints. Only times between 09:00 and 17:30 are selectable.',
      },
    },
  },
};

@Component({
  selector: 'storybook-time-picker-constraints',
  standalone: true,
  imports: [DsTimePicker],
  template: `
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 300px;">
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Business Hours (09:00 - 18:00)</label>
        <ds-time-picker
          [value]="'10:00'"
          [minTime]="'09:00'"
          [maxTime]="'18:00'"
          [minuteStep]="15"
          placeholder="Select meeting time">
        </ds-time-picker>
        <p style="margin: 0.5rem 0 0 0; font-size: 12px; color: #666;">
          Hours outside 09:00-18:00 are disabled
        </p>
      </div>

      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Afternoon Only (12:00 - 17:00)</label>
        <ds-time-picker
          [value]="'14:00'"
          [minTime]="'12:00'"
          [maxTime]="'17:00'"
          placeholder="Afternoon slot">
        </ds-time-picker>
      </div>

      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Morning Only (06:00 - 12:00)</label>
        <ds-time-picker
          [value]="'09:00'"
          [minTime]="'06:00'"
          [maxTime]="'12:00'"
          [format]="'12h'"
          placeholder="Morning slot (12h)">
        </ds-time-picker>
      </div>
    </div>
  `,
})
class ConstraintsStory {}

export const TimeConstraints: Story = {
  decorators: [
    moduleMetadata({
      imports: [ConstraintsStory],
    }),
  ],
  render: () => ({
    template: `<storybook-time-picker-constraints></storybook-time-picker-constraints>`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Examples of time pickers with various time constraints for different use cases.',
      },
    },
  },
};
