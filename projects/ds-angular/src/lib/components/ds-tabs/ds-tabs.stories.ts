import type { Meta, StoryObj } from '@storybook/angular';
import { DsTabs, TabItem } from './ds-tabs';

const meta: Meta<DsTabs> = {
  title: 'Components/Navigation/DsTabs',
  component: DsTabs,
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      control: 'object',
      description: 'Liste des onglets. Chaque onglet a un id (unique), un label, et optionnellement disabled.',
    },
    activeTabId: {
      control: 'text',
      description: 'ID de l\'onglet actif. Si non fourni, le premier onglet est sélectionné.',
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: 'Tabs standard avec 3 onglets. Navigation clavier supportée (flèches, Home, End).',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `<ds-tabs [tabs]="tabs"></ds-tabs>`,
  }),
};

export const WithActiveTab: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tabs avec un onglet spécifique sélectionné par défaut via activeTabId.',
      },
    },
  },
  render: () => ({
    props: {
      tabs: basicTabs,
    },
    template: `<ds-tabs [tabs]="tabs" activeTabId="tab2"></ds-tabs>`,
  }),
};

export const WithDisabledTab: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tabs avec un onglet désactivé. L\'onglet reste visible mais non cliquable.',
      },
    },
  },
  render: () => ({
    props: {
      tabs: [
        { id: 'tab1', label: 'Tableau de bord' },
        { id: 'tab2', label: 'Statistiques' },
        { id: 'tab3', label: 'Export (bientôt)', disabled: true },
        { id: 'tab4', label: 'Paramètres' },
      ] as TabItem[],
    },
    template: `<ds-tabs [tabs]="tabs"></ds-tabs>`,
  }),
};

export const ManyTabs: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tabs avec de nombreux onglets. Le composant gère le dépassement avec un scroll horizontal si nécessaire.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: 'Tabs avec contenu dynamique. L\'événement tabChanged permet de réagir aux changements d\'onglet.',
      },
    },
  },
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
            <p>Vue d'ensemble du projet : 3 tâches en cours, 12 terminées cette semaine.</p>
          }
          @if (activeTab === 'tab2') {
            <p>Détails du projet : créé le 1er janvier 2025, dernière mise à jour il y a 2 heures.</p>
          }
          @if (activeTab === 'tab3') {
            <p>Paramètres : notifications activées, thème clair, langue française.</p>
          }
        </div>
      </div>
    `,
  }),
};

export const FormTabs: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tabs intégrés dans un formulaire de compte utilisateur. Pattern courant pour les pages de paramètres.',
      },
    },
  },
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
          <p style="color: #6b7280;">Gérez vos informations personnelles, paramètres de sécurité et préférences.</p>
        </div>
      </div>
    `,
  }),
};
