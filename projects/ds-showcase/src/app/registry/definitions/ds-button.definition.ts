import { ComponentDefinition } from '../types';

export const DsButtonDefinition: ComponentDefinition = {
  id: 'ds-button',
  name: 'Button',
  selector: 'ds-button',
  category: 'actions',
  description: 'Bouton d\'action avec plusieurs variantes, tailles et états. Supporte les icônes et le mode loading.',

  props: [
    {
      name: 'variant',
      kind: 'input',
      type: "'primary' | 'secondary' | 'ghost' | 'success' | 'warning' | 'error' | 'info'",
      defaultValue: "'primary'",
      description: 'Variante visuelle du bouton.',
    },
    {
      name: 'appearance',
      kind: 'input',
      type: "'solid' | 'outline'",
      defaultValue: "'solid'",
      description: 'Apparence du bouton (rempli ou contour).',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille du bouton.',
    },
    {
      name: 'disabled',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Désactive le bouton et empêche les interactions.',
    },
    {
      name: 'loading',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Affiche un spinner et désactive le clic.',
    },
    {
      name: 'block',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Le bouton prend toute la largeur disponible.',
    },
    {
      name: 'type',
      kind: 'input',
      type: "'button' | 'submit' | 'reset'",
      defaultValue: "'button'",
      description: 'Type HTML du bouton.',
    },
    {
      name: 'clicked',
      kind: 'output',
      type: 'EventEmitter<void>',
      description: 'Émis lors du clic sur le bouton actif.',
    },
  ],

  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Bouton par défaut avec contrôles interactifs.',
      controls: [
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'primary',
          options: ['primary', 'secondary', 'ghost', 'success', 'warning', 'error', 'info'],
          description: 'Variante du bouton',
        },
        {
          name: 'appearance',
          type: 'select',
          defaultValue: 'solid',
          options: ['solid', 'outline'],
          description: 'Apparence du bouton',
        },
        {
          name: 'size',
          type: 'select',
          defaultValue: 'md',
          options: ['sm', 'md', 'lg'],
          description: 'Taille du bouton',
        },
        {
          name: 'disabled',
          type: 'boolean',
          defaultValue: false,
          description: 'État désactivé',
        },
        {
          name: 'loading',
          type: 'boolean',
          defaultValue: false,
          description: 'État loading',
        },
      ],
      code: `<ds-button
  variant="primary"
  appearance="solid"
  size="md"
  [disabled]="false"
  [loading]="false"
>
  Click me
</ds-button>`,
    },
    {
      id: 'variants',
      name: 'All Variants',
      description: 'Toutes les variantes de couleur disponibles.',
      controls: [],
      code: `<ds-button variant="primary">Primary</ds-button>
<ds-button variant="secondary">Secondary</ds-button>
<ds-button variant="ghost">Ghost</ds-button>
<ds-button variant="success">Success</ds-button>
<ds-button variant="warning">Warning</ds-button>
<ds-button variant="error">Error</ds-button>
<ds-button variant="info">Info</ds-button>`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<ds-button size="sm">Small</ds-button>
<ds-button size="md">Medium</ds-button>
<ds-button size="lg">Large</ds-button>`,
    },
    {
      id: 'outline',
      name: 'Outline Appearance',
      description: 'Boutons avec apparence outline.',
      controls: [],
      code: `<ds-button variant="primary" appearance="outline">Primary</ds-button>
<ds-button variant="secondary" appearance="outline">Secondary</ds-button>
<ds-button variant="success" appearance="outline">Success</ds-button>`,
    },
    {
      id: 'states',
      name: 'States',
      description: 'États disabled et loading.',
      controls: [],
      code: `<ds-button [disabled]="true">Disabled</ds-button>
<ds-button [loading]="true">Loading</ds-button>`,
    },
  ],
};
