import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DsListGroup } from './ds-list-group';
import { DsList } from '../ds-list/ds-list';
import { DsListItem } from '../ds-list-item/ds-list-item';
import { DsChip } from '../ds-chip/ds-chip';

const meta: Meta<DsListGroup> = {
  title: 'Components/Data Display/ListGroup',
  component: DsListGroup,
  decorators: [
    moduleMetadata({
      imports: [DsListGroup, DsList, DsListItem, DsChip],
    }),
  ],
  argTypes: {
    title: { control: 'text', description: 'Titre du groupe' },
    subtitle: { control: 'text', description: 'Sous-titre' },
    count: { control: 'number', description: 'Compteur' },
    variant: { control: 'select', options: ['default', 'collapsible'] },
    expanded: { control: 'boolean', description: 'État expanded' },
    sticky: { control: 'boolean', description: 'Header sticky' },
    expandedChange: { action: 'expandedChange' },
  },
};

export default meta;
type Story = StoryObj<DsListGroup>;

export const Default: Story = {
  render: () => ({
    template: `
      <ds-list-group title="Aujourd'hui" style="max-width: 450px;">
        <ds-list-item title="Tâche 1" [checkable]="true" />
        <ds-list-item title="Tâche 2" [checkable]="true" />
        <ds-list-item title="Tâche 3" [checkable]="true" />
      </ds-list-group>
    `,
  }),
};

export const WithCount: Story = {
  render: () => ({
    template: `
      <ds-list-group title="Aujourd'hui" [count]="3" style="max-width: 450px;">
        <ds-list-item title="Tâche 1" [checkable]="true" />
        <ds-list-item title="Tâche 2" [checkable]="true" />
        <ds-list-item title="Tâche 3" [checkable]="true" />
      </ds-list-group>
    `,
  }),
};

export const Collapsible: Story = {
  render: () => ({
    template: `
      <ds-list-group title="Cette semaine" [count]="5" variant="collapsible" style="max-width: 450px;">
        <ds-list-item title="Réunion équipe" [checkable]="true" indicator="priority" indicatorColor="high" />
        <ds-list-item title="Livraison projet" [checkable]="true" indicator="priority" indicatorColor="high" />
        <ds-list-item title="Review code" [checkable]="true" indicator="priority" indicatorColor="medium" />
        <ds-list-item title="Documentation" [checkable]="true" indicator="priority" indicatorColor="low" />
        <ds-list-item title="Formation" [checkable]="true" />
      </ds-list-group>
    `,
  }),
};

export const CollapsedByDefault: Story = {
  render: () => ({
    template: `
      <ds-list-group title="Plus tard" [count]="8" variant="collapsible" [expanded]="false" style="max-width: 450px;">
        <ds-list-item title="Tâche future 1" [checkable]="true" />
        <ds-list-item title="Tâche future 2" [checkable]="true" />
      </ds-list-group>
    `,
  }),
};

export const MultipleGroups: Story = {
  render: () => ({
    template: `
      <ds-list variant="card" style="max-width: 500px;">
        <ds-list-group title="Haute priorité" [count]="2" variant="collapsible">
          <ds-list-item title="Urgence client" [checkable]="true" indicator="priority" indicatorColor="high">
            <ds-chip inline size="sm" color="error">Urgent</ds-chip>
          </ds-list-item>
          <ds-list-item title="Bug critique" [checkable]="true" indicator="priority" indicatorColor="high" />
        </ds-list-group>

        <ds-list-group title="Normale" [count]="3" variant="collapsible">
          <ds-list-item title="Feature X" [checkable]="true" indicator="priority" indicatorColor="medium" />
          <ds-list-item title="Feature Y" [checkable]="true" indicator="priority" indicatorColor="medium" />
          <ds-list-item title="Refactoring" [checkable]="true" indicator="priority" indicatorColor="low" />
        </ds-list-group>

        <ds-list-group title="Backlog" [count]="5" variant="collapsible" [expanded]="false">
          <ds-list-item title="Amélioration UX" [checkable]="true" />
          <ds-list-item title="Tests E2E" [checkable]="true" />
        </ds-list-group>
      </ds-list>
    `,
  }),
};

export const GroupedByDate: Story = {
  render: () => ({
    template: `
      <ds-list variant="card" style="max-width: 500px;">
        <ds-list-group title="Aujourd'hui" [count]="3" variant="collapsible">
          <ds-list-item title="Réunion standup" [checkable]="true" [checked]="true" [completed]="true">
            <span meta style="color: var(--text-muted);">09:00</span>
          </ds-list-item>
          <ds-list-item title="Code review PR #45" [checkable]="true" indicator="priority" indicatorColor="high">
            <span meta style="color: var(--color-primary);">14:00</span>
          </ds-list-item>
          <ds-list-item title="Rédiger specs" [checkable]="true" indicator="priority" indicatorColor="medium">
            <span meta style="color: var(--text-muted);">2h</span>
          </ds-list-item>
        </ds-list-group>

        <ds-list-group title="Demain" [count]="2" variant="collapsible">
          <ds-list-item title="Présentation client" [checkable]="true" indicator="priority" indicatorColor="high">
            <ds-chip inline size="sm" color="primary">Travail</ds-chip>
            <span meta style="color: var(--color-primary);">10:00</span>
          </ds-list-item>
          <ds-list-item title="Déploiement v2.0" [checkable]="true" indicator="priority" indicatorColor="high" />
        </ds-list-group>

        <ds-list-group title="Cette semaine" [count]="4" variant="collapsible" [expanded]="false">
          <ds-list-item title="Formation Angular" [checkable]="true" />
          <ds-list-item title="Documentation API" [checkable]="true" />
        </ds-list-group>
      </ds-list>
    `,
  }),
};

export const WithSubtitle: Story = {
  render: () => ({
    template: `
      <ds-list style="max-width: 500px;">
        <ds-list-group title="Projet Alpha" subtitle="Sprint 12" [count]="5" variant="collapsible">
          <ds-list-item title="Tâche 1" [checkable]="true" />
          <ds-list-item title="Tâche 2" [checkable]="true" />
        </ds-list-group>

        <ds-list-group title="Projet Beta" subtitle="En attente" [count]="3" variant="collapsible">
          <ds-list-item title="Tâche A" [checkable]="true" />
          <ds-list-item title="Tâche B" [checkable]="true" />
        </ds-list-group>
      </ds-list>
    `,
  }),
};

export const PlannerExample: Story = {
  render: () => ({
    template: `
      <div style="max-width: 550px;">
        <h2 style="margin-bottom: 1rem; color: var(--text-default);">Mon planning</h2>
        <ds-list variant="card">
          <ds-list-group title="Aujourd'hui" [count]="4" variant="collapsible">
            <ds-list-item
              title="Réviser PR #123"
              [checkable]="true"
              [checked]="true"
              [completed]="true"
              indicator="priority"
              indicatorColor="high"
            >
              <ds-chip inline size="sm" color="success">Done</ds-chip>
            </ds-list-item>
            <ds-list-item
              title="Réunion équipe"
              [checkable]="true"
              indicator="priority"
              indicatorColor="high"
            >
              <ds-chip inline size="sm" color="primary">Travail</ds-chip>
              <span meta style="color: var(--color-primary);">10:00</span>
            </ds-list-item>
            <ds-list-item
              title="Écrire documentation"
              [checkable]="true"
              indicator="priority"
              indicatorColor="medium"
            >
              <span meta style="color: var(--text-muted);">2h</span>
            </ds-list-item>
            <ds-list-item
              title="Sport"
              [checkable]="true"
            >
              <ds-chip inline size="sm" color="success">Santé</ds-chip>
              <span meta style="color: var(--color-primary);">18:00</span>
            </ds-list-item>
          </ds-list-group>

          <ds-list-group title="Cette semaine" [count]="3" variant="collapsible">
            <ds-list-item title="Livraison v2.0" [checkable]="true" indicator="priority" indicatorColor="high" />
            <ds-list-item title="Formation TypeScript" [checkable]="true" indicator="priority" indicatorColor="medium" />
            <ds-list-item title="Organiser backlog" [checkable]="true" indicator="priority" indicatorColor="low" />
          </ds-list-group>

          <ds-list-group title="Plus tard" [count]="6" variant="collapsible" [expanded]="false">
            <ds-list-item title="Refactoring module auth" [checkable]="true" />
            <ds-list-item title="Tests E2E" [checkable]="true" />
          </ds-list-group>
        </ds-list>
      </div>
    `,
  }),
};
