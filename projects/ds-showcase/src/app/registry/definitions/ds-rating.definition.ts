import { ComponentDefinition } from '../types';
import { getExampleSources } from '../../../generated/examples-source.generated';

export const DsRatingDefinition: ComponentDefinition = {
  id: 'ds-rating',
  name: 'Rating',
  category: 'data-display',
  description: 'Composant de notation par étoiles avec support des demi-étoiles et formulaires.',
  selector: 'ds-rating',
  props: [
    { name: 'value', kind: 'input', type: 'number', defaultValue: '0', description: 'Valeur actuelle de la notation' },
    { name: 'max', kind: 'input', type: 'number', defaultValue: '5', description: 'Valeur maximale de la notation' },
    { name: 'size', kind: 'input', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Taille des étoiles' },
    { name: 'allowHalf', kind: 'input', type: 'boolean', defaultValue: 'false', description: 'Permet les demi-étoiles' },
    { name: 'readonly', kind: 'input', type: 'boolean', defaultValue: 'false', description: 'Mode lecture seule' },
    { name: 'disabled', kind: 'input', type: 'boolean', defaultValue: 'false', description: 'État désactivé' },
    { name: 'ratingChange', kind: 'output', type: 'EventEmitter<number>', description: 'Émis lors du changement de notation' },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Rating interactif basique.',
      examplePath: 'ds-rating/default',
      sources: getExampleSources('ds-rating', 'default'),
      controls: [
        { name: 'value', type: 'number', defaultValue: 3, min: 0, max: 5, step: 0.5 },
      ],
      code: `<ds-rating
  [value]="rating"
  (ratingChange)="onRatingChange($event)" />`,
    },
    {
      id: 'half-stars',
      name: 'Half Stars',
      description: 'Rating avec demi-étoiles.',
      controls: [],
      code: `<ds-rating [allowHalf]="true" [value]="3.5" />`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Différentes tailles.',
      controls: [],
      code: `<ds-rating size="sm" [value]="4" />
<ds-rating size="md" [value]="4" />
<ds-rating size="lg" [value]="4" />`,
    },
    {
      id: 'readonly',
      name: 'Read Only',
      description: 'Mode lecture seule pour affichage.',
      controls: [],
      code: `<ds-rating [readonly]="true" [value]="4.5" [allowHalf]="true" />`,
    },
    {
      id: 'disabled',
      name: 'Disabled',
      description: 'État désactivé.',
      controls: [],
      code: `<ds-rating [disabled]="true" [value]="3" />`,
    },
  ],
};
