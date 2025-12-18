import { Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DsCalendar, CalendarEvent, CalendarMode } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsCalendarDefinition } from '../../../registry/definitions/ds-calendar.definition';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [DsCalendar, DemoContainer, PropsTable, DatePipe],
  template: `
    <div class="component-page">
      <header class="component-header">
        <div class="component-header__meta">
          <span class="component-badge">{{ definition.category }}</span>
        </div>
        <h1 class="component-title">{{ definition.name }}</h1>
        <p class="component-desc">{{ definition.description }}</p>
        <code class="component-selector">&lt;{{ definition.selector }}&gt;</code>
      </header>

      <section class="component-section">
        <h2>Exemples</h2>

        <div class="demo-block">
          <h3 class="demo-block__title">Default</h3>
          <p class="demo-block__desc">Calendrier basique avec navigation.</p>
          <doc-demo-container [code]="definition.demos[0].code">
            <ds-calendar
              [value]="currentDate"
              (dateSelect)="onDateSelect($event)"
            />
          </doc-demo-container>
          @if (selectedDate()) {
            <p class="demo-note">Date sélectionnée : {{ selectedDate() | date:'fullDate':'':'fr' }}</p>
          }
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Events</h3>
          <p class="demo-block__desc">Calendrier avec événements.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <ds-calendar
              [value]="currentDate"
              [events]="events"
              (eventClick)="onEventClick($event)"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Sizes</h3>
          <p class="demo-block__desc">Différentes tailles de calendrier.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <div class="demo-row">
              <ds-calendar size="sm" />
            </div>
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Year Mode</h3>
          <p class="demo-block__desc">Mode année pour sélection de mois.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <ds-calendar mode="year" />
          </doc-demo-container>
        </div>
      </section>

      <section class="component-section">
        <h2>API Reference</h2>
        <doc-props-table [props]="definition.props" />
      </section>
    </div>
  `,
  styles: [`
    .component-page { max-width: 900px; }
    .component-header { margin-bottom: 48px; }
    .component-header__meta { margin-bottom: 12px; }
    .component-badge {
      display: inline-block; padding: 4px 10px; font-size: 0.75rem; font-weight: 500;
      text-transform: uppercase; letter-spacing: 0.05em;
      background: var(--color-primary-light, #eff6ff); color: var(--color-primary, #3b82f6); border-radius: 4px;
    }
    .component-title { margin: 0 0 12px 0; font-size: 2rem; font-weight: 700; color: var(--text-default, #1a1a1a); }
    .component-desc { margin: 0 0 16px 0; font-size: 1.125rem; color: var(--text-muted, #6b7280); line-height: 1.6; }
    .component-selector {
      display: inline-block; padding: 6px 12px; font-family: var(--doc-code-font, monospace); font-size: 0.875rem;
      background: var(--background-secondary, #f3f4f6); color: var(--text-default, #374151); border-radius: 4px;
    }
    .component-section {
      margin-bottom: 48px;
      h2 { font-size: 1.25rem; font-weight: 600; color: var(--text-default, #1a1a1a); margin: 0 0 24px 0; padding-bottom: 12px; border-bottom: 1px solid var(--border-default, #e5e7eb); }
    }
    .demo-block { margin-bottom: 32px; }
    .demo-block__title { margin: 0 0 8px 0; font-size: 1rem; font-weight: 600; color: var(--text-default, #1a1a1a); }
    .demo-block__desc { margin: 0 0 16px 0; font-size: 0.875rem; color: var(--text-muted, #6b7280); }
    .demo-row { display: flex; gap: 24px; flex-wrap: wrap; }
    .demo-note {
      margin-top: 12px;
      padding: 8px 12px;
      background: var(--background-secondary, #f3f4f6);
      border-radius: 4px;
      font-size: 0.875rem;
      color: var(--text-default, #374151);
    }
  `]
})
export class CalendarPage {
  definition = DsCalendarDefinition;

  currentDate = new Date();
  selectedDate = signal<Date | null>(null);

  events: CalendarEvent[] = [
    { id: '1', date: new Date(), title: 'Réunion', type: 'default' },
    { id: '2', date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), title: 'Deadline', type: 'error' },
    { id: '3', date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), title: 'Event', type: 'success' },
  ];

  onDateSelect(date: Date): void {
    this.selectedDate.set(date);
  }

  onEventClick(event: CalendarEvent): void {
    console.log('Event clicked:', event);
  }
}
