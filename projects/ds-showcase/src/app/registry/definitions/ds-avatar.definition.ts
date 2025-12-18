import { ComponentDefinition } from '../types';

export const DsAvatarDefinition: ComponentDefinition = {
  id: 'ds-avatar',
  name: 'Avatar',
  selector: 'ds-avatar',
  category: 'data-display',
  description:
    'Composant avatar affichant une image, des initiales ou un placeholder avec support des formes et tailles multiples.',
  props: [
    {
      name: 'src',
      kind: 'input',
      type: 'string | undefined',
      defaultValue: 'undefined',
      description: "URL de l'image avatar",
    },
    {
      name: 'alt',
      kind: 'input',
      type: 'string',
      defaultValue: "''",
      description: "Texte alternatif pour l'image",
    },
    {
      name: 'name',
      kind: 'input',
      type: 'string',
      defaultValue: "''",
      description: 'Nom complet pour générer les initiales',
    },
    {
      name: 'initials',
      kind: 'input',
      type: 'string | undefined',
      defaultValue: 'undefined',
      description: 'Initiales personnalisées (priorité sur name)',
    },
    {
      name: 'shape',
      kind: 'input',
      type: "'circle' | 'rounded' | 'square'",
      defaultValue: "'circle'",
      description: "Forme de l'avatar",
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg' | 'xl'",
      defaultValue: "'md'",
      description: "Taille de l'avatar",
    },
    {
      name: 'autoColor',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Générer automatiquement une couleur de fond à partir des initiales',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Avatar avec contrôles interactifs.',
      controls: [
        { name: 'shape', type: 'select', defaultValue: 'circle', options: ['circle', 'rounded', 'square'] },
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg', 'xl'] },
        { name: 'autoColor', type: 'boolean', defaultValue: false },
      ],
      code: `<ds-avatar
  [src]="src"
  [name]="name"
  [shape]="shape"
  [size]="size"
  [autoColor]="autoColor"
/>`,
    },
    {
      id: 'with-image',
      name: 'With Image',
      description: "Avatar avec image d'utilisateur.",
      controls: [],
      code: `<ds-avatar
  src="https://i.pravatar.cc/150?img=1"
  alt="John Doe"
/>`,
    },
    {
      id: 'with-initials',
      name: 'With Initials',
      description: 'Avatar affichant des initiales.',
      controls: [],
      code: `<ds-avatar name="John Doe" />
<ds-avatar initials="AB" />`,
    },
    {
      id: 'shapes',
      name: 'Shapes',
      description: 'Les trois formes disponibles.',
      controls: [],
      code: `<ds-avatar name="John Doe" shape="circle" />
<ds-avatar name="John Doe" shape="rounded" />
<ds-avatar name="John Doe" shape="square" />`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les quatre tailles disponibles.',
      controls: [],
      code: `<ds-avatar name="JD" size="sm" />
<ds-avatar name="JD" size="md" />
<ds-avatar name="JD" size="lg" />
<ds-avatar name="JD" size="xl" />`,
    },
    {
      id: 'auto-color',
      name: 'Auto Color',
      description: 'Couleur de fond générée automatiquement.',
      controls: [],
      code: `<ds-avatar name="Alice" [autoColor]="true" />
<ds-avatar name="Bob" [autoColor]="true" />
<ds-avatar name="Charlie" [autoColor]="true" />`,
    },
  ],
};
