import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { DsDatePicker } from './ds-date-picker';

const meta: Meta<DsDatePicker> = {
  title: 'Components/DsDatePicker',
  component: DsDatePicker,
  decorators: [
    moduleMetadata({
      imports: [DsDatePicker, ReactiveFormsModule],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du calendrier',
    },
    mode: {
      control: 'select',
      options: ['single', 'range'],
      description: 'Mode de sélection',
    },
    disabled: {
      control: 'boolean',
      description: 'État désactivé',
    },
    showTodayButton: {
      control: 'boolean',
      description: "Afficher le bouton Aujourd'hui",
    },
    showClearButton: {
      control: 'boolean',
      description: 'Afficher le bouton Effacer',
    },
  },
};

export default meta;
type Story = StoryObj<DsDatePicker>;

export const Default: Story = {
  args: {
    size: 'md',
    mode: 'single',
    disabled: false,
    showTodayButton: true,
    showClearButton: true,
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 32px; align-items: flex-start;">
        <div>
          <p style="margin: 0 0 8px; color: var(--text-muted);">Small</p>
          <ds-date-picker size="sm"></ds-date-picker>
        </div>
        <div>
          <p style="margin: 0 0 8px; color: var(--text-muted);">Medium (default)</p>
          <ds-date-picker size="md"></ds-date-picker>
        </div>
        <div>
          <p style="margin: 0 0 8px; color: var(--text-muted);">Large</p>
          <ds-date-picker size="lg"></ds-date-picker>
        </div>
      </div>
    `,
  }),
};

export const SingleSelection: Story = {
  render: () => ({
    props: {
      selectedDate: null as Date | null,
      onDateChange: function (date: Date | null) {
        this["selectedDate"] = date;
      },
    },
    template: `
      <div style="max-width: 400px;">
        <ds-date-picker
          mode="single"
          (dateChange)="onDateChange($event)">
        </ds-date-picker>
        <p style="margin-top: 16px; color: var(--text-muted);">
          Date sélectionnée: {{ selectedDate ? (selectedDate | date:'fullDate':'':'fr') : '(aucune)' }}
        </p>
      </div>
    `,
  }),
};

export const RangeSelection: Story = {
  render: () => ({
    props: {
      range: { start: null, end: null },
      onRangeChange: function (range: { start: Date | null; end: Date | null }) {
        this["range"] = range;
      },
    },
    template: `
      <div style="max-width: 400px;">
        <ds-date-picker
          mode="range"
          (rangeChange)="onRangeChange($event)">
        </ds-date-picker>
        <p style="margin-top: 16px; color: var(--text-muted);">
          @if (range.start && range.end) {
            Du {{ range.start | date:'shortDate':'':'fr' }}
            au {{ range.end | date:'shortDate':'':'fr' }}
          } @else if (range.start) {
            Début: {{ range.start | date:'shortDate':'':'fr' }} (sélectionnez une date de fin)
          } @else {
            Sélectionnez une plage de dates
          }
        </p>
      </div>
    `,
  }),
};

export const WithMinMaxDate: Story = {
  render: () => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(minDate.getDate() - 7);
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 30);

    return {
      props: {
        minDate,
        maxDate,
      },
      template: `
        <div style="max-width: 400px;">
          <ds-date-picker
            [minDate]="minDate"
            [maxDate]="maxDate">
          </ds-date-picker>
          <p style="margin-top: 16px; color: var(--text-muted);">
            Dates sélectionnables : 7 jours avant à 30 jours après aujourd'hui
          </p>
        </div>
      `,
    };
  },
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <ds-date-picker [disabled]="true"></ds-date-picker>
    `,
  }),
};

export const WithoutActions: Story = {
  render: () => ({
    template: `
      <div style="max-width: 400px;">
        <ds-date-picker
          [showTodayButton]="false"
          [showClearButton]="false">
        </ds-date-picker>
        <p style="margin-top: 16px; color: var(--text-muted);">
          Sans boutons "Aujourd'hui" et "Effacer"
        </p>
      </div>
    `,
  }),
};

export const WithFormControl: Story = {
  render: () => ({
    props: {
      dateControl: new FormControl<Date | null>(new Date()),
    },
    template: `
      <div style="max-width: 400px;">
        <ds-date-picker [formControl]="dateControl"></ds-date-picker>
        <p style="margin-top: 16px; color: var(--text-muted);">
          Valeur FormControl: {{ dateControl.value | date:'fullDate':'':'fr' }}
        </p>
        <div style="margin-top: 8px; display: flex; gap: 8px;">
          <button (click)="dateControl.setValue(null)">Réinitialiser</button>
          <button (click)="dateControl.setValue(new Date(2025, 11, 25))">Noël 2025</button>
        </div>
      </div>
    `,
  }),
};

export const CustomLabels: Story = {
  render: () => ({
    template: `
      <ds-date-picker
        todayLabel="Go to Today"
        clearLabel="Reset"
        prevMonthLabel="Previous month"
        nextMonthLabel="Next month">
      </ds-date-picker>
    `,
  }),
};

export const PreselectedDate: Story = {
  render: () => {
    const preselectedDate = new Date(2025, 6, 14); // 14 Juillet 2025

    return {
      props: {
        dateControl: new FormControl<Date | null>(preselectedDate),
      },
      template: `
        <div style="max-width: 400px;">
          <ds-date-picker [formControl]="dateControl"></ds-date-picker>
          <p style="margin-top: 16px; color: var(--text-muted);">
            Date présélectionnée : 14 Juillet 2025
          </p>
        </div>
      `,
    };
  },
};

export const RangeWithPreselection: Story = {
  render: () => ({
    props: {
      range: {
        start: new Date(2025, 5, 1),
        end: new Date(2025, 5, 15),
      },
    },
    template: `
      <div style="max-width: 400px;">
        <ds-date-picker
          mode="range"
          [ngModel]="range">
        </ds-date-picker>
        <p style="margin-top: 16px; color: var(--text-muted);">
          Plage présélectionnée : 1-15 Juin 2025
        </p>
      </div>
    `,
  }),
};

export const BookingExample: Story = {
  render: () => ({
    props: {
      checkIn: null as Date | null,
      checkOut: null as Date | null,
      step: 'checkin',
      minDate: new Date(),
      onDateChange: function (date: Date | null) {
        if (this["step"] === 'checkin') {
          this["checkIn"] = date;
          this["step"] = 'checkout';
          if (date) {
            const nextDay = new Date(date);
            nextDay.setDate(nextDay.getDate() + 1);
            this["minDate"] = nextDay;
          }
        } else {
          this["checkOut"] = date;
          this["step"] = 'done';
        }
      },
    },
    template: `
      <div style="max-width: 400px;">
        <h3 style="margin: 0 0 16px; color: var(--text-default);">
          {{ step === 'checkin' ? 'Sélectionnez la date d\\'arrivée' :
             step === 'checkout' ? 'Sélectionnez la date de départ' :
             'Réservation confirmée' }}
        </h3>

        @if (step !== 'done') {
          <ds-date-picker
            mode="single"
            [minDate]="minDate"
            [showClearButton]="false"
            (dateChange)="onDateChange($event)">
          </ds-date-picker>
        }

        <div style="margin-top: 16px; padding: 16px; background: var(--background-subtle); border-radius: 8px;">
          <p style="margin: 0 0 8px;"><strong>Arrivée:</strong> {{ checkIn ? (checkIn | date:'fullDate':'':'fr') : '-' }}</p>
          <p style="margin: 0;"><strong>Départ:</strong> {{ checkOut ? (checkOut | date:'fullDate':'':'fr') : '-' }}</p>
        </div>

        @if (step === 'done') {
          <button style="margin-top: 16px;" (click)="checkIn = null; checkOut = null; step = 'checkin'; minDate = new Date();">
            Nouvelle réservation
          </button>
        }
      </div>
    `,
  }),
};

export const EventCalendar: Story = {
  render: () => {
    const events = [
      { date: new Date(2025, new Date().getMonth(), 5), title: 'Réunion équipe' },
      { date: new Date(2025, new Date().getMonth(), 12), title: 'Livraison projet' },
      { date: new Date(2025, new Date().getMonth(), 20), title: 'Formation' },
    ];

    return {
      props: {
        events,
        selectedDate: null as Date | null,
        selectedEvent: null as typeof events[0] | null,
        onDateChange: function (date: Date | null) {
          this["selectedDate"] = date;
          this["selectedEvent"] = date
            ? this["events"].find((e: typeof events[0]) =>
                e.date.getDate() === date.getDate() &&
                e.date.getMonth() === date.getMonth()
              ) || null
            : null;
        },
      },
      template: `
        <div style="max-width: 400px;">
          <ds-date-picker
            mode="single"
            [showClearButton]="false"
            (dateChange)="onDateChange($event)">
          </ds-date-picker>

          @if (selectedEvent) {
            <div style="margin-top: 16px; padding: 16px; background: var(--color-info-subtle); border-radius: 8px; border-left: 4px solid var(--color-info);">
              <strong>{{ selectedEvent.title }}</strong>
              <p style="margin: 4px 0 0;">{{ selectedEvent.date | date:'fullDate':'':'fr' }}</p>
            </div>
          } @else if (selectedDate) {
            <p style="margin-top: 16px; color: var(--text-muted);">
              Aucun événement le {{ selectedDate | date:'fullDate':'':'fr' }}
            </p>
          }
        </div>
      `,
    };
  },
};
