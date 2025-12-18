import { ComponentDefinition } from '../types';

export const DsSkeletonDefinition: ComponentDefinition = {
  id: 'ds-skeleton',
  name: 'Skeleton',
  selector: 'ds-skeleton',
  category: 'feedback',
  description:
    "Placeholder animé pour indiquer le chargement de contenu et améliorer l'expérience utilisateur.",
  props: [
    {
      name: 'variant',
      kind: 'input',
      type: "'text' | 'circle' | 'rectangle' | 'card'",
      defaultValue: "'text'",
      description: 'Type de skeleton',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille (circle et rectangle)',
    },
    {
      name: 'lines',
      kind: 'input',
      type: 'number',
      defaultValue: '1',
      description: 'Nombre de lignes (text)',
    },
    {
      name: 'width',
      kind: 'input',
      type: 'string',
      description: 'Largeur personnalisée',
    },
    {
      name: 'height',
      kind: 'input',
      type: 'string',
      description: 'Hauteur personnalisée',
    },
    {
      name: 'noAnimation',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: "Désactive l'animation pulse",
    },
    {
      name: 'ariaLabel',
      kind: 'input',
      type: 'string',
      defaultValue: "'Chargement en cours...'",
      description: 'Label accessible',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Skeleton avec contrôles.',
      controls: [
        { name: 'variant', type: 'select', defaultValue: 'text', options: ['text', 'circle', 'rectangle', 'card'] },
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
        { name: 'lines', type: 'number', defaultValue: 1, min: 1, max: 10 },
      ],
      code: `<ds-skeleton
  [variant]="variant"
  [size]="size"
  [lines]="lines"
/>`,
    },
    {
      id: 'text-lines',
      name: 'Text Lines',
      description: 'Plusieurs lignes de texte.',
      controls: [],
      code: `<ds-skeleton variant="text" [lines]="3" />`,
    },
    {
      id: 'avatar',
      name: 'Avatar',
      description: 'Skeleton circulaire pour avatar.',
      controls: [],
      code: `<ds-skeleton variant="circle" size="lg" />`,
    },
    {
      id: 'card',
      name: 'Card',
      description: 'Skeleton de carte.',
      controls: [],
      code: `<ds-skeleton variant="card" />`,
    },
    {
      id: 'custom-size',
      name: 'Custom Size',
      description: 'Taille personnalisée.',
      controls: [],
      code: `<ds-skeleton
  variant="rectangle"
  width="300px"
  height="200px"
/>`,
    },
    {
      id: 'user-list',
      name: 'User List Loading',
      description: 'Exemple de liste utilisateurs.',
      controls: [],
      code: `<div class="user-skeleton">
  <ds-skeleton variant="circle" size="md" />
  <div>
    <ds-skeleton variant="text" width="150px" />
    <ds-skeleton variant="text" width="100px" />
  </div>
</div>`,
    },
  ],
};
