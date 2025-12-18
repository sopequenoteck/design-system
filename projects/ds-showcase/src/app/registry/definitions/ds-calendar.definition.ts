import { ComponentDefinition } from '../types';

export const DsCalendarDefinition: ComponentDefinition = {
  id: 'ds-calendar',
  name: 'Calendar',
  category: 'data-display',
  description: 'Calendrier mensuel/annuel avec gestion d\'événements et navigation.',
  selector: 'ds-calendar',
  props: [
    { name: 'value', kind: 'input', type: 'Date', defaultValue: 'new Date()', description: 'Date courante affichée' },
    { name: 'mode', kind: 'input', type: "'month' | 'year'", defaultValue: "'month'", description: 'Mode d\'affichage' },
    { name: 'events', kind: 'input', type: 'CalendarEvent[]', defaultValue: '[]', description: 'Événements à afficher' },
    { name: 'size', kind: 'input', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Taille du calendrier' },
    { name: 'locale', kind: 'input', type: 'string', defaultValue: "'fr-FR'", description: 'Locale pour les noms de jours et mois' },
    { name: 'firstDayOfWeek', kind: 'input', type: 'number', defaultValue: '1', description: 'Premier jour de la semaine (0=dim, 1=lun)' },
    { name: 'disabledDate', kind: 'input', type: '(date: Date) => boolean', description: 'Fonction pour désactiver des dates' },
    { name: 'dateSelect', kind: 'output', type: 'EventEmitter<Date>', description: 'Émis lors de la sélection d\'une date' },
    { name: 'monthChange', kind: 'output', type: 'EventEmitter<Date>', description: 'Émis lors du changement de mois' },
    { name: 'modeChange', kind: 'output', type: 'EventEmitter<CalendarMode>', description: 'Émis lors du changement de mode' },
    { name: 'eventClick', kind: 'output', type: 'EventEmitter<CalendarEvent>', description: 'Émis lors du clic sur un événement' },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Calendrier basique.',
      controls: [],
      code: `<ds-calendar
  [value]="currentDate"
  (dateSelect)="onDateSelect($event)" />`,
    },
    {
      id: 'with-events',
      name: 'With Events',
      description: 'Calendrier avec événements.',
      controls: [],
      code: `<ds-calendar
  [value]="currentDate"
  [events]="events"
  (eventClick)="onEventClick($event)" />`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Différentes tailles de calendrier.',
      controls: [],
      code: `<ds-calendar size="sm" />
<ds-calendar size="md" />
<ds-calendar size="lg" />`,
    },
    {
      id: 'year-mode',
      name: 'Year Mode',
      description: 'Mode année pour sélection de mois.',
      controls: [],
      code: `<ds-calendar mode="year" />`,
    },
  ],
};
