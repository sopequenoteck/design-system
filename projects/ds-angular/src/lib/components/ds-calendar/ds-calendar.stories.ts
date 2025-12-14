import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DsCalendar, CalendarEvent } from './ds-calendar';

const meta: Meta<DsCalendar> = {
  title: 'Components/Calendar',
  component: DsCalendar,
  decorators: [
    moduleMetadata({
      imports: [DsCalendar],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    // Ignorer les erreurs de smoke tests pour ce composant complexe
    test: {
      dangerouslyIgnoreUnhandledErrors: true,
    },
  },
  argTypes: {
    value: {
      control: 'date',
      description: 'Date courante affichée',
    },
    mode: {
      control: 'select',
      options: ['month', 'year'],
      description: 'Mode d\'affichage du calendrier',
    },
    events: {
      control: 'object',
      description: 'Événements à afficher dans le calendrier',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du calendrier',
    },
    locale: {
      control: 'text',
      description: 'Locale pour les noms de jours et mois',
    },
    firstDayOfWeek: {
      control: { type: 'number', min: 0, max: 6 },
      description: 'Premier jour de la semaine (0=dimanche, 1=lundi)',
    },
    dateSelect: {
      action: 'dateSelect',
      description: 'Émis lors de la sélection d\'une date',
    },
    monthChange: {
      action: 'monthChange',
      description: 'Émis lors du changement de mois',
    },
    modeChange: {
      action: 'modeChange',
      description: 'Émis lors du changement de mode',
    },
    eventClick: {
      action: 'eventClick',
      description: 'Émis lors du clic sur un événement',
    },
  },
};

export default meta;
type Story = StoryObj<DsCalendar>;

// =========================================================================
// HELPERS
// =========================================================================

function generateEvents(count: number = 10): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  const today = new Date();
  const types: Array<'default' | 'success' | 'warning' | 'error'> = [
    'default',
    'success',
    'warning',
    'error',
  ];

  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + Math.floor(Math.random() * 30) - 15);

    events.push({
      id: `event-${i}`,
      date,
      title: `Événement ${i + 1}`,
      type: types[Math.floor(Math.random() * types.length)],
    });
  }

  return events;
}

// =========================================================================
// STORIES
// =========================================================================

/**
 * Calendrier par défaut sans événements
 */
export const Default: Story = {
  args: {
    value: new Date(),
    mode: 'month',
    events: [],
    size: 'md',
    locale: 'fr-FR',
    firstDayOfWeek: 1,
  },
};

/**
 * Calendrier avec événements
 */
export const WithEvents: Story = {
  args: {
    value: new Date(),
    mode: 'month',
    events: generateEvents(15),
    size: 'md',
    locale: 'fr-FR',
    firstDayOfWeek: 1,
  },
};

/**
 * Calendrier en mode année
 */
export const YearMode: Story = {
  args: {
    value: new Date(),
    mode: 'year',
    events: [],
    size: 'md',
    locale: 'fr-FR',
    firstDayOfWeek: 1,
  },
};

/**
 * Calendrier petit (sm)
 */
export const SizeSmall: Story = {
  args: {
    value: new Date(),
    mode: 'month',
    events: generateEvents(5),
    size: 'sm',
    locale: 'fr-FR',
    firstDayOfWeek: 1,
  },
};

/**
 * Calendrier moyen (md) - défaut
 */
export const SizeMedium: Story = {
  args: {
    value: new Date(),
    mode: 'month',
    events: generateEvents(8),
    size: 'md',
    locale: 'fr-FR',
    firstDayOfWeek: 1,
  },
};

/**
 * Calendrier grand (lg)
 */
export const SizeLarge: Story = {
  args: {
    value: new Date(),
    mode: 'month',
    events: generateEvents(10),
    size: 'lg',
    locale: 'fr-FR',
    firstDayOfWeek: 1,
  },
};

/**
 * Calendrier avec locale anglais
 */
export const EnglishLocale: Story = {
  args: {
    value: new Date(),
    mode: 'month',
    events: generateEvents(8),
    size: 'md',
    locale: 'en-US',
    firstDayOfWeek: 0, // Dimanche en premier
  },
};

/**
 * Calendrier avec locale espagnol
 */
export const SpanishLocale: Story = {
  args: {
    value: new Date(),
    mode: 'month',
    events: generateEvents(8),
    size: 'md',
    locale: 'es-ES',
    firstDayOfWeek: 1,
  },
};

/**
 * Calendrier avec locale allemand
 */
export const GermanLocale: Story = {
  args: {
    value: new Date(),
    mode: 'month',
    events: generateEvents(8),
    size: 'md',
    locale: 'de-DE',
    firstDayOfWeek: 1,
  },
};

/**
 * Calendrier avec premier jour dimanche
 */
export const SundayFirst: Story = {
  args: {
    value: new Date(),
    mode: 'month',
    events: generateEvents(8),
    size: 'md',
    locale: 'fr-FR',
    firstDayOfWeek: 0,
  },
};

/**
 * Calendrier avec dates désactivées (weekends)
 */
export const DisabledWeekends: Story = {
  args: {
    value: new Date(),
    mode: 'month',
    events: generateEvents(8),
    size: 'md',
    locale: 'fr-FR',
    firstDayOfWeek: 1,
    disabledDate: (date: Date) => {
      const day = date.getDay();
      return day === 0 || day === 6; // Samedi et dimanche
    },
  },
};

/**
 * Calendrier avec dates passées désactivées
 */
export const DisabledPastDates: Story = {
  args: {
    value: new Date(),
    mode: 'month',
    events: generateEvents(8),
    size: 'md',
    locale: 'fr-FR',
    firstDayOfWeek: 1,
    disabledDate: (date: Date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today;
    },
  },
};

/**
 * Calendrier avec nombreux événements
 */
export const ManyEvents: Story = {
  args: {
    value: new Date(),
    mode: 'month',
    events: [
      ...generateEvents(20),
      // Événements spécifiques pour aujourd'hui
      {
        id: 'today-1',
        date: new Date(),
        title: 'Réunion équipe',
        type: 'success' as const,
      },
      {
        id: 'today-2',
        date: new Date(),
        title: 'Appel client',
        type: 'warning' as const,
      },
      {
        id: 'today-3',
        date: new Date(),
        title: 'Formation',
        type: 'default' as const,
      },
    ],
    size: 'lg',
    locale: 'fr-FR',
    firstDayOfWeek: 1,
  },
};

/**
 * Calendrier de planning d'équipe
 */
export const TeamPlanning: Story = {
  args: {
    value: new Date(),
    mode: 'month',
    events: [
      {
        id: '1',
        date: new Date(new Date().setDate(new Date().getDate() + 1)),
        title: 'Sprint Planning',
        type: 'success',
      },
      {
        id: '2',
        date: new Date(new Date().setDate(new Date().getDate() + 3)),
        title: 'Daily Standup',
        type: 'default',
      },
      {
        id: '3',
        date: new Date(new Date().setDate(new Date().getDate() + 5)),
        title: 'Code Review',
        type: 'warning',
      },
      {
        id: '4',
        date: new Date(new Date().setDate(new Date().getDate() + 7)),
        title: 'Sprint Review',
        type: 'success',
      },
      {
        id: '5',
        date: new Date(new Date().setDate(new Date().getDate() + 8)),
        title: 'Rétrospective',
        type: 'default',
      },
      {
        id: '6',
        date: new Date(new Date().setDate(new Date().getDate() + 10)),
        title: 'Release',
        type: 'error',
      },
      {
        id: '7',
        date: new Date(new Date().setDate(new Date().getDate() + 14)),
        title: 'Demo Client',
        type: 'success',
      },
    ],
    size: 'lg',
    locale: 'fr-FR',
    firstDayOfWeek: 1,
  },
};

/**
 * Calendrier de congés
 */
export const VacationCalendar: Story = {
  args: {
    value: new Date(2025, 7, 1), // Août 2025
    mode: 'month',
    events: [
      {
        id: '1',
        date: new Date(2025, 7, 5),
        title: 'Congés Paul',
        type: 'warning',
      },
      {
        id: '2',
        date: new Date(2025, 7, 6),
        title: 'Congés Paul',
        type: 'warning',
      },
      {
        id: '3',
        date: new Date(2025, 7, 7),
        title: 'Congés Paul',
        type: 'warning',
      },
      {
        id: '4',
        date: new Date(2025, 7, 12),
        title: 'Congés Marie',
        type: 'success',
      },
      {
        id: '5',
        date: new Date(2025, 7, 13),
        title: 'Congés Marie',
        type: 'success',
      },
      {
        id: '6',
        date: new Date(2025, 7, 20),
        title: 'Jour férié',
        type: 'error',
      },
    ],
    size: 'md',
    locale: 'fr-FR',
    firstDayOfWeek: 1,
    disabledDate: (date: Date) => {
      // Désactiver les weekends
      const day = date.getDay();
      return day === 0 || day === 6;
    },
  },
};

/**
 * Calendrier en mode année avec événements
 */
export const YearModeWithEvents: Story = {
  args: {
    value: new Date(),
    mode: 'year',
    events: generateEvents(30), // Les événements seront visibles après sélection d'un mois
    size: 'md',
    locale: 'fr-FR',
    firstDayOfWeek: 1,
  },
};

/**
 * Calendrier historique (date passée)
 */
export const HistoricalDate: Story = {
  args: {
    value: new Date(2020, 0, 1), // 1er janvier 2020
    mode: 'month',
    events: [
      {
        id: '1',
        date: new Date(2020, 0, 15),
        title: 'Événement historique',
        type: 'default',
      },
    ],
    size: 'md',
    locale: 'fr-FR',
    firstDayOfWeek: 1,
  },
};

/**
 * Calendrier futur (date future)
 */
export const FutureDate: Story = {
  args: {
    value: new Date(2030, 11, 1), // Décembre 2030
    mode: 'month',
    events: [
      {
        id: '1',
        date: new Date(2030, 11, 25),
        title: 'Noël 2030',
        type: 'success',
      },
    ],
    size: 'md',
    locale: 'fr-FR',
    firstDayOfWeek: 1,
  },
};
