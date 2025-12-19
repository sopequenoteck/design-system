import { ComponentDefinition } from '../types';

export const PrimitiveButtonDefinition: ComponentDefinition = {
  id: 'primitive-button',
  name: 'PrimitiveButton',
  selector: 'primitive-button',
  category: 'primitives',
  description:
    'Bouton primitif atomique stylisé par CSS custom properties. Supporte plusieurs variantes, tailles, apparences et peut afficher des icônes FontAwesome.',

  props: [
    {
      name: 'type',
      kind: 'input',
      type: "'button' | 'submit' | 'reset'",
      defaultValue: "'button'",
      description: 'Type HTML du bouton.',
    },
    {
      name: 'variant',
      kind: 'input',
      type: "'primary' | 'secondary' | 'ghost' | 'success' | 'warning' | 'error' | 'info'",
      defaultValue: "'primary'",
      description: 'Variante visuelle du bouton.',
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
      description: 'État désactivé du bouton.',
    },
    {
      name: 'appearance',
      kind: 'input',
      type: "'solid' | 'outline'",
      defaultValue: "'solid'",
      description: 'Apparence visuelle (fond plein ou bordure).',
    },
    {
      name: 'block',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Mode pleine largeur.',
    },
    {
      name: 'iconStart',
      kind: 'input',
      type: 'IconDefinition | null',
      defaultValue: 'null',
      description: 'Icône FontAwesome affichée avant le texte.',
    },
    {
      name: 'iconEnd',
      kind: 'input',
      type: 'IconDefinition | null',
      defaultValue: 'null',
      description: 'Icône FontAwesome affichée après le texte.',
    },
    {
      name: 'clicked',
      kind: 'output',
      type: 'void',
      description: 'Événement émis lors du clic.',
    },
  ],

  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Bouton avec contrôles interactifs.',
      controls: [
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'primary',
          options: ['primary', 'secondary', 'ghost', 'success', 'warning', 'error', 'info'],
          description: 'Variante',
        },
        {
          name: 'size',
          type: 'select',
          defaultValue: 'md',
          options: ['sm', 'md', 'lg'],
          description: 'Taille',
        },
        {
          name: 'appearance',
          type: 'select',
          defaultValue: 'solid',
          options: ['solid', 'outline'],
          description: 'Apparence',
        },
        {
          name: 'disabled',
          type: 'boolean',
          defaultValue: false,
          description: 'Désactivé',
        },
        {
          name: 'block',
          type: 'boolean',
          defaultValue: false,
          description: 'Pleine largeur',
        },
      ],
      code: `<primitive-button
  variant="primary"
  size="md"
  appearance="solid"
  [disabled]="false"
  [block]="false">
  Cliquez ici
</primitive-button>`,
    },
    {
      id: 'variants',
      name: 'All Variants',
      description: 'Toutes les variantes de couleur.',
      controls: [],
      code: `<primitive-button variant="primary">Primary</primitive-button>
<primitive-button variant="secondary">Secondary</primitive-button>
<primitive-button variant="ghost">Ghost</primitive-button>
<primitive-button variant="success">Success</primitive-button>
<primitive-button variant="warning">Warning</primitive-button>
<primitive-button variant="error">Error</primitive-button>
<primitive-button variant="info">Info</primitive-button>`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<primitive-button size="sm">Small</primitive-button>
<primitive-button size="md">Medium</primitive-button>
<primitive-button size="lg">Large</primitive-button>`,
    },
    {
      id: 'outline',
      name: 'Outline Variants',
      description: 'Boutons avec bordure et fond transparent.',
      controls: [],
      code: `<primitive-button variant="primary" appearance="outline">Primary</primitive-button>
<primitive-button variant="success" appearance="outline">Success</primitive-button>
<primitive-button variant="error" appearance="outline">Error</primitive-button>`,
    },
    {
      id: 'disabled',
      name: 'Disabled',
      description: 'Boutons désactivés.',
      controls: [],
      code: `<primitive-button [disabled]="true">Désactivé</primitive-button>
<primitive-button variant="error" [disabled]="true">Supprimé (désactivé)</primitive-button>`,
    },
    {
      id: 'block',
      name: 'Block Mode',
      description: 'Bouton en pleine largeur.',
      controls: [],
      code: `<primitive-button [block]="true">Bouton pleine largeur</primitive-button>`,
    },
  ],
};
