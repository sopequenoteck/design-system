import type { Meta, StoryObj } from '@storybook/angular';
import { DsBreadcrumb, BreadcrumbItem } from './ds-breadcrumb';

const meta: Meta<DsBreadcrumb> = {
  title: 'Components/Navigation/DsBreadcrumb',
  component: DsBreadcrumb,
  tags: ['autodocs'],
  argTypes: {
    separator: {
      control: 'text',
      description: 'Séparateur entre les éléments',
    },
    maxItems: {
      control: 'number',
      description: 'Nombre maximum d\'éléments affichés',
    },
  },
};

export default meta;
type Story = StoryObj<DsBreadcrumb>;

const basicItems: BreadcrumbItem[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Produits', href: '/products' },
  { label: 'Catégorie', href: '/products/category' },
  { label: 'Article' },
];

export const Default: Story = {
  args: {
    items: basicItems,
    separator: '/',
  },
  render: (args) => ({
    props: args,
    template: `<ds-breadcrumb [items]="items" [separator]="separator"></ds-breadcrumb>`,
  }),
};

export const CustomSeparator: Story = {
  render: () => ({
    props: {
      items: basicItems,
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <ds-breadcrumb [items]="items" separator="/"></ds-breadcrumb>
        <ds-breadcrumb [items]="items" separator=">"></ds-breadcrumb>
        <ds-breadcrumb [items]="items" separator="•"></ds-breadcrumb>
        <ds-breadcrumb [items]="items" separator="→"></ds-breadcrumb>
      </div>
    `,
  }),
};

export const WithMaxItems: Story = {
  render: () => ({
    props: {
      longItems: [
        { label: 'Accueil', href: '/' },
        { label: 'Catégorie A', href: '/a' },
        { label: 'Sous-catégorie B', href: '/a/b' },
        { label: 'Section C', href: '/a/b/c' },
        { label: 'Détail D', href: '/a/b/c/d' },
        { label: 'Article final' },
      ] as BreadcrumbItem[],
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <p style="margin: 0 0 4px; font-size: 12px; color: #666;">Sans limite :</p>
          <ds-breadcrumb [items]="longItems"></ds-breadcrumb>
        </div>
        <div>
          <p style="margin: 0 0 4px; font-size: 12px; color: #666;">Max 4 items :</p>
          <ds-breadcrumb [items]="longItems" [maxItems]="4"></ds-breadcrumb>
        </div>
        <div>
          <p style="margin: 0 0 4px; font-size: 12px; color: #666;">Max 3 items :</p>
          <ds-breadcrumb [items]="longItems" [maxItems]="3"></ds-breadcrumb>
        </div>
      </div>
    `,
  }),
};

export const Simple: Story = {
  render: () => ({
    props: {
      items: [
        { label: 'Accueil', href: '/' },
        { label: 'Page courante' },
      ] as BreadcrumbItem[],
    },
    template: `<ds-breadcrumb [items]="items"></ds-breadcrumb>`,
  }),
};

export const WithDisabledItem: Story = {
  render: () => ({
    props: {
      items: [
        { label: 'Accueil', href: '/' },
        { label: 'Archive (désactivé)', disabled: true },
        { label: 'Document' },
      ] as BreadcrumbItem[],
    },
    template: `<ds-breadcrumb [items]="items"></ds-breadcrumb>`,
  }),
};

export const AllItemsClickable: Story = {
  render: () => ({
    props: {
      items: [
        { label: 'Accueil', href: '/' },
        { label: 'Produits', href: '/products' },
        { label: 'Électronique', href: '/products/electronics' },
        { label: 'Ordinateurs', href: '/products/electronics/computers' },
      ] as BreadcrumbItem[],
    },
    template: `
      <div>
        <p style="margin: 0 0 8px; font-size: 14px; color: #666;">
          Tous les items sont cliquables (avec href)
        </p>
        <ds-breadcrumb [items]="items"></ds-breadcrumb>
      </div>
    `,
  }),
};

export const WithNavigationAction: Story = {
  render: () => {
    let lastClicked = '';
    return {
      props: {
        items: basicItems,
        onItemClicked: (item: BreadcrumbItem) => {
          lastClicked = item.label;
          console.log('Item clicked:', item);
        },
        getLastClicked: () => lastClicked,
      },
      template: `
        <div>
          <p style="margin: 0 0 8px; font-size: 14px; color: #666;">
            Cliquez sur un item pour déclencher l'événement itemClicked
          </p>
          <ds-breadcrumb
            [items]="items"
            (itemClicked)="onItemClicked($event)">
          </ds-breadcrumb>
          <p style="margin: 8px 0 0; font-size: 12px; color: #999;">
            Dernier item cliqué : <strong>{{ getLastClicked() || 'aucun' }}</strong>
          </p>
        </div>
      `,
    };
  },
};

export const LongLabels: Story = {
  render: () => ({
    props: {
      items: [
        { label: 'Accueil de l\'application principale', href: '/' },
        { label: 'Gestion des produits et services', href: '/products' },
        { label: 'Catégorie électronique et informatique', href: '/products/electronics' },
        { label: 'Article avec un nom très long qui pourrait causer des problèmes d\'affichage' },
      ] as BreadcrumbItem[],
    },
    template: `
      <div style="max-width: 600px;">
        <p style="margin: 0 0 8px; font-size: 14px; color: #666;">
          Test avec des labels longs (max-width: 600px)
        </p>
        <ds-breadcrumb [items]="items"></ds-breadcrumb>
      </div>
    `,
  }),
};

export const Themed: Story = {
  render: () => ({
    props: {
      items: [
        { label: 'Home' },
        { label: 'Products' },
        { label: 'Category' },
      ] as BreadcrumbItem[],
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div class="theme-light" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Light</h4>
          <ds-breadcrumb [items]="items"></ds-breadcrumb>
        </div>
        <div class="theme-dark" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Dark</h4>
          <ds-breadcrumb [items]="items"></ds-breadcrumb>
        </div>
        <div class="theme-custom" style="padding: 24px; background: var(--background-main); border-radius: 8px;">
          <h4 style="margin: 0 0 16px; color: var(--text-default);">Theme Custom</h4>
          <ds-breadcrumb [items]="items"></ds-breadcrumb>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Affiche le composant dans les 3 thèmes (Light, Dark, Custom) pour vérifier la thématisation.',
      },
    },
  },
};
