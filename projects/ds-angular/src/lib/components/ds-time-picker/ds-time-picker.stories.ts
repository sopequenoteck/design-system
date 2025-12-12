import { Meta, StoryObj } from '@storybook/angular';
import { DsTimePicker } from './ds-time-picker';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';

const meta: Meta<DsTimePicker> = {
  title: 'Components/TimePicker',
  component: DsTimePicker,
  tags: ['autodocs'],
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
  render: () => ({
    component: ReactiveFormStory,
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
  render: () => ({
    component: SizesStory,
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
  render: () => ({
    component: FormatsStory,
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
  render: () => ({
    component: StepsStory,
  }),
};
