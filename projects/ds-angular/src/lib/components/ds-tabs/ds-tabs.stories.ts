import type { Meta, StoryObj } from '@storybook/angular';
import { DsTabs, TabItem } from './ds-tabs';

const meta: Meta<DsTabs> = {
  title: 'Components/Navigation/DsTabs',
  component: DsTabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DsTabs>;

const basicTabs: TabItem[] = [
  { id: 'tab1', label: 'Aperçu' },
  { id: 'tab2', label: 'Détails' },
  { id: 'tab3', label: 'Paramètres' },
];

export const Default: Story = {
  args: {
    tabs: basicTabs,
  },
  render: (args) => ({
    props: args,
    template: `<ds-tabs [tabs]="tabs"></ds-tabs>`,
  }),
};

export const WithActiveTab: Story = {
  render: () => ({
    props: {
      tabs: basicTabs,
    },
    template: `<ds-tabs [tabs]="tabs" activeTabId="tab2"></ds-tabs>`,
  }),
};

export const WithDisabledTab: Story = {
  render: () => ({
    props: {
      tabs: [
        { id: 'tab1', label: 'Actif' },
        { id: 'tab2', label: 'Disponible' },
        { id: 'tab3', label: 'Désactivé', disabled: true },
        { id: 'tab4', label: 'Autre' },
      ] as TabItem[],
    },
    template: `<ds-tabs [tabs]="tabs"></ds-tabs>`,
  }),
};

export const ManyTabs: Story = {
  render: () => ({
    props: {
      tabs: [
        { id: 'overview', label: 'Vue d\'ensemble' },
        { id: 'analytics', label: 'Analytiques' },
        { id: 'reports', label: 'Rapports' },
        { id: 'notifications', label: 'Notifications' },
        { id: 'settings', label: 'Paramètres' },
        { id: 'billing', label: 'Facturation' },
      ] as TabItem[],
    },
    template: `<ds-tabs [tabs]="tabs"></ds-tabs>`,
  }),
};

export const TabsWithContent: Story = {
  render: () => ({
    props: {
      tabs: basicTabs,
      activeTab: 'tab1',
    },
    template: `
      <div>
        <ds-tabs [tabs]="tabs" [activeTabId]="activeTab" (tabChanged)="activeTab = $event.id"></ds-tabs>
        <div style="padding: 16px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          @if (activeTab === 'tab1') {
            <p>Contenu de l'aperçu. Vue d'ensemble des informations principales.</p>
          }
          @if (activeTab === 'tab2') {
            <p>Contenu des détails. Informations approfondies sur l'élément sélectionné.</p>
          }
          @if (activeTab === 'tab3') {
            <p>Contenu des paramètres. Configuration et personnalisation.</p>
          }
        </div>
      </div>
    `,
  }),
};

export const FormTabs: Story = {
  render: () => ({
    props: {
      tabs: [
        { id: 'personal', label: 'Informations personnelles' },
        { id: 'security', label: 'Sécurité' },
        { id: 'preferences', label: 'Préférences' },
      ] as TabItem[],
    },
    template: `
      <div style="max-width: 600px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="margin: 0 0 16px;">Mon compte</h2>
        <ds-tabs [tabs]="tabs"></ds-tabs>
        <div style="padding: 16px 0;">
          <p style="color: #6b7280;">Sélectionnez un onglet pour voir son contenu.</p>
        </div>
      </div>
    `,
  }),
};
