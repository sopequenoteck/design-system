import { ComponentDefinition } from '../types';
import { getExampleSources } from '../../../generated/examples-source.generated';

export const DsBadgeDefinition: ComponentDefinition = {
  id: 'ds-badge',
  name: 'Badge',
  selector: 'ds-badge',
  category: 'data-display',
  description:
    'Composant badge pour afficher des labels, statuts ou compteurs avec support des variantes et couleurs personnalisées.',
  props: [
    {
      name: 'type',
      kind: 'input',
      type: "'default' | 'accent' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'",
      defaultValue: "'default'",
      description: 'Type de badge (couleur prédéfinie)',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille du badge',
    },
    {
      name: 'variant',
      kind: 'input',
      type: "'solid' | 'outline'",
      defaultValue: "'solid'",
      description: 'Variante visuelle du badge',
    },
    {
      name: 'shape',
      kind: 'input',
      type: "'default' | 'pill' | 'square'",
      defaultValue: "'default'",
      description: 'Forme du badge',
    },
    {
      name: 'color',
      kind: 'input',
      type: 'string | undefined',
      defaultValue: 'undefined',
      description: 'Couleur personnalisée (hex, rgb, hsl, var)',
    },
    {
      name: 'iconStart',
      kind: 'input',
      type: 'IconDefinition | null',
      defaultValue: 'null',
      description: 'Icône au début du badge',
    },
    {
      name: 'iconEnd',
      kind: 'input',
      type: 'IconDefinition | null',
      defaultValue: 'null',
      description: 'Icône à la fin du badge',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Badge avec contrôles interactifs.',
      examplePath: 'ds-badge/default',
      sources: getExampleSources('ds-badge', 'default'),
      controls: [
        { name: 'type', type: 'select', defaultValue: 'default', options: ['default', 'primary', 'success', 'warning', 'error', 'info'] },
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
        { name: 'variant', type: 'select', defaultValue: 'solid', options: ['solid', 'outline'] },
        { name: 'shape', type: 'select', defaultValue: 'default', options: ['default', 'pill', 'square'] },
      ],
      code: `<ds-badge
  [type]="type"
  [size]="size"
  [variant]="variant"
  [shape]="shape"
>
  Badge
</ds-badge>`,
    },
    {
      id: 'types',
      name: 'Types',
      description: 'Les différents types de badges.',
      controls: [],
      code: `<ds-badge type="default">Default</ds-badge>
<ds-badge type="primary">Primary</ds-badge>
<ds-badge type="success">Success</ds-badge>
<ds-badge type="warning">Warning</ds-badge>
<ds-badge type="error">Error</ds-badge>
<ds-badge type="info">Info</ds-badge>`,
    },
    {
      id: 'variants',
      name: 'Variants',
      description: 'Solid vs Outline.',
      controls: [],
      code: `<ds-badge type="primary" variant="solid">Solid</ds-badge>
<ds-badge type="primary" variant="outline">Outline</ds-badge>`,
    },
    {
      id: 'shapes',
      name: 'Shapes',
      description: 'Les différentes formes.',
      controls: [],
      code: `<ds-badge shape="default">Default</ds-badge>
<ds-badge shape="pill">Pill</ds-badge>
<ds-badge shape="square">Square</ds-badge>`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<ds-badge size="sm">Small</ds-badge>
<ds-badge size="md">Medium</ds-badge>
<ds-badge size="lg">Large</ds-badge>`,
    },
    {
      id: 'custom-color',
      name: 'Custom Color',
      description: 'Badge avec couleur personnalisée.',
      controls: [],
      code: `<ds-badge color="#8b5cf6">Custom Purple</ds-badge>
<ds-badge color="rgb(236, 72, 153)" variant="outline">Custom Pink</ds-badge>`,
    },
  ],
};
