import { ComponentDefinition } from '../types';
import { getExampleSources } from '../../../generated/examples-source.generated';

export const PrimitiveBadgeDefinition: ComponentDefinition = {
  id: 'primitive-badge',
  name: 'PrimitiveBadge',
  selector: 'primitive-badge',
  category: 'primitives',
  description:
    'Badge primitif atomique stylisé par CSS custom properties. Affiche des statuts, compteurs ou labels avec variantes de couleur, tailles, formes et apparences.',

  props: [
    {
      name: 'type',
      kind: 'input',
      type: "'status' | 'count' | 'label'",
      defaultValue: "'label'",
      description: 'Type sémantique du badge (label, status, count).',
    },
    {
      name: 'variant',
      kind: 'input',
      type: "'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'default' | 'accent'",
      defaultValue: "'primary'",
      description: 'Variante de couleur du badge.',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille du badge.',
    },
    {
      name: 'shape',
      kind: 'input',
      type: "'rounded' | 'pill'",
      defaultValue: "'rounded'",
      description: 'Forme du badge (arrondi ou capsule).',
    },
    {
      name: 'appearance',
      kind: 'input',
      type: "'solid' | 'outline'",
      defaultValue: "'solid'",
      description: 'Apparence visuelle (fond plein ou bordure).',
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
      name: 'customStyles',
      kind: 'input',
      type: 'Record<string, string> | null',
      defaultValue: 'null',
      description: 'Styles CSS personnalisés appliqués au badge.',
    },
  ],

  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Badge avec contrôles interactifs.',
      controls: [
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'primary',
          options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
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
          name: 'shape',
          type: 'select',
          defaultValue: 'rounded',
          options: ['rounded', 'pill'],
          description: 'Forme',
        },
        {
          name: 'appearance',
          type: 'select',
          defaultValue: 'solid',
          options: ['solid', 'outline'],
          description: 'Apparence',
        },
      ],
      examplePath: 'primitive-badge/default',
      sources: getExampleSources('primitive-badge', 'default'),
    },
    {
      id: 'variants',
      name: 'All Variants',
      description: 'Toutes les variantes de couleur.',
      controls: [],
      code: `<primitive-badge variant="primary">Primary</primitive-badge>
<primitive-badge variant="secondary">Secondary</primitive-badge>
<primitive-badge variant="success">Success</primitive-badge>
<primitive-badge variant="warning">Warning</primitive-badge>
<primitive-badge variant="error">Error</primitive-badge>
<primitive-badge variant="info">Info</primitive-badge>
<primitive-badge variant="neutral">Neutral</primitive-badge>`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<primitive-badge size="sm">Small</primitive-badge>
<primitive-badge size="md">Medium</primitive-badge>
<primitive-badge size="lg">Large</primitive-badge>`,
    },
    {
      id: 'shapes',
      name: 'Shapes',
      description: 'Formes arrondie et capsule.',
      controls: [],
      code: `<primitive-badge shape="rounded">Rounded</primitive-badge>
<primitive-badge shape="pill">Pill</primitive-badge>`,
    },
    {
      id: 'outline',
      name: 'Outline Variants',
      description: 'Badges avec bordure et fond transparent.',
      controls: [],
      code: `<primitive-badge variant="primary" appearance="outline">Primary</primitive-badge>
<primitive-badge variant="success" appearance="outline">Success</primitive-badge>
<primitive-badge variant="error" appearance="outline">Error</primitive-badge>`,
    },
    {
      id: 'count',
      name: 'Count Badges',
      description: 'Badges de compteur (notifications).',
      controls: [],
      code: `<primitive-badge type="count" variant="error" shape="pill">5</primitive-badge>
<primitive-badge type="count" variant="primary" shape="pill">99+</primitive-badge>`,
    },
  ],
};
