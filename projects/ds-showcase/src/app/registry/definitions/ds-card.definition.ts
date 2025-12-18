import { ComponentDefinition } from '../types';

export const DsCardDefinition: ComponentDefinition = {
  id: 'ds-card',
  name: 'Card',
  selector: 'ds-card',
  category: 'data-display',
  description:
    'Composant container permettant de regrouper du contenu avec un en-tête, un corps et un pied de page optionnels.',
  props: [
    {
      name: 'variant',
      kind: 'input',
      type: "'default' | 'elevated' | 'outlined'",
      defaultValue: "'default'",
      description: 'Variante visuelle de la carte',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille de la carte (affecte le padding)',
    },
    {
      name: 'disabled',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: "Désactive l'interaction avec la carte",
    },
    {
      name: 'clickable',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Rend la carte cliquable avec effet hover',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Card avec contrôles interactifs.',
      controls: [
        { name: 'variant', type: 'select', defaultValue: 'default', options: ['default', 'elevated', 'outlined'] },
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
        { name: 'clickable', type: 'boolean', defaultValue: false },
        { name: 'disabled', type: 'boolean', defaultValue: false },
      ],
      code: `<ds-card
  [variant]="variant"
  [size]="size"
  [clickable]="clickable"
  [disabled]="disabled"
>
  <div header>Titre de la carte</div>
  <p>Contenu principal de la carte.</p>
  <div footer>Actions</div>
</ds-card>`,
    },
    {
      id: 'variants',
      name: 'Variants',
      description: 'Les trois variantes visuelles.',
      controls: [],
      code: `<ds-card variant="default">
  <div header>Default</div>
  <p>Carte avec bordure simple.</p>
</ds-card>

<ds-card variant="elevated">
  <div header>Elevated</div>
  <p>Carte avec ombre portée.</p>
</ds-card>

<ds-card variant="outlined">
  <div header>Outlined</div>
  <p>Carte avec bordure accentuée.</p>
</ds-card>`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<ds-card size="sm">
  <div header>Small</div>
  <p>Padding réduit.</p>
</ds-card>

<ds-card size="md">
  <div header>Medium</div>
  <p>Padding standard.</p>
</ds-card>

<ds-card size="lg">
  <div header>Large</div>
  <p>Padding étendu.</p>
</ds-card>`,
    },
    {
      id: 'clickable',
      name: 'Clickable',
      description: 'Carte interactive avec effet hover.',
      controls: [],
      code: `<ds-card [clickable]="true" variant="elevated">
  <div header>Carte cliquable</div>
  <p>Survolez pour voir l'effet.</p>
</ds-card>`,
    },
    {
      id: 'with-content',
      name: 'With Rich Content',
      description: 'Carte avec contenu riche.',
      controls: [],
      code: `<ds-card variant="elevated">
  <div header>
    <h3>Article Title</h3>
    <ds-badge type="success">New</ds-badge>
  </div>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  <div footer>
    <ds-button variant="ghost" size="sm">Cancel</ds-button>
    <ds-button size="sm">Read More</ds-button>
  </div>
</ds-card>`,
    },
  ],
};
