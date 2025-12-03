import type { Meta, StoryObj } from '@storybook/angular';
import { DsBreadcrumb, BreadcrumbItem } from './ds-breadcrumb';

const meta: Meta<DsBreadcrumb> = {
  title: 'Components/Breadcrumb',
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
