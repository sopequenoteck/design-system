import { Component, signal, computed } from '@angular/core';
import { DsTimeline, TimelineItem } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsTimelineDefinition } from '../../../registry/definitions/ds-timeline.definition';
import { ControlValues } from '../../../registry/types';

type TimelineMode = 'left' | 'right' | 'alternate';
type SizeType = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-timeline-page',
  standalone: true,
  imports: [DsTimeline, DemoContainer, PropsTable],
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
          <p class="demo-block__desc">Timeline avec contrôles interactifs.</p>
          <doc-demo-container
            [sources]="definition.demos[0].sources ?? []"
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-timeline
              [items]="events"
              [mode]="demoMode()"
              [size]="demoSize()"
              [pending]="demoPending()"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">Alternate Mode</h3>
          <p class="demo-block__desc">Contenu alterné gauche/droite.</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <ds-timeline
              [items]="events"
              mode="alternate"
            />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Colors</h3>
          <p class="demo-block__desc">Événements avec couleurs.</p>
          <doc-demo-container [code]="definition.demos[2].code">
            <ds-timeline [items]="coloredEvents" />
          </doc-demo-container>
        </div>

        <div class="demo-block">
          <h3 class="demo-block__title">With Pending</h3>
          <p class="demo-block__desc">Timeline avec indicateur en cours.</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <ds-timeline
              [items]="events"
              [pending]="true"
              pendingContent="Livraison en cours..."
            />
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
  `]
})
export class TimelinePage {
  definition = DsTimelineDefinition;

  events: TimelineItem[] = [
    { content: 'Commande passée', date: '10:00' },
    { content: 'Paiement confirmé', date: '10:05' },
    { content: 'En préparation', date: '10:30' },
    { content: 'Expédié', date: '14:00' },
  ];

  coloredEvents: TimelineItem[] = [
    { content: 'Créé', color: 'info' },
    { content: 'En cours', color: 'warning' },
    { content: 'Terminé', color: 'success' },
  ];

  defaultValues = signal<ControlValues>({
    mode: 'left',
    size: 'md',
    pending: false,
  });

  demoMode = computed(() => this.defaultValues()['mode'] as TimelineMode);
  demoSize = computed(() => this.defaultValues()['size'] as SizeType);
  demoPending = computed(() => this.defaultValues()['pending'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }
}
