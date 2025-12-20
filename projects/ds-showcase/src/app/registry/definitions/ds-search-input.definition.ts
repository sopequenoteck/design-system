import { ComponentDefinition } from '../types';
import { getExampleSources } from '../../../generated/examples-source.generated';

export const DsSearchInputDefinition: ComponentDefinition = {
  id: 'ds-search-input',
  name: 'Search Input',
  selector: 'ds-search-input',
  category: 'forms',
  description:
    'Champ de recherche avec icône, debounce configurable, bouton clear et état loading. CVA pour formulaires réactifs.',

  props: [
    {
      name: 'placeholder',
      kind: 'input',
      type: 'string',
      defaultValue: "'Rechercher...'",
      description: 'Texte indicatif.',
    },
    {
      name: 'debounceMs',
      kind: 'input',
      type: 'number',
      defaultValue: '300',
      description: 'Délai de debounce en ms.',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille du composant.',
    },
    {
      name: 'disabled',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Désactive le champ.',
    },
    {
      name: 'loading',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Affiche un spinner de chargement.',
    },
    {
      name: 'clearable',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Affiche le bouton clear.',
    },
    {
      name: 'minChars',
      kind: 'input',
      type: 'number',
      defaultValue: '0',
      description: 'Caractères minimum avant recherche.',
    },
    {
      name: 'search',
      kind: 'output',
      type: 'EventEmitter<string>',
      description: 'Émis après debounce.',
    },
    {
      name: 'searchImmediate',
      kind: 'output',
      type: 'EventEmitter<string>',
      description: 'Émis sur touche Entrée.',
    },
    {
      name: 'cleared',
      kind: 'output',
      type: 'EventEmitter<void>',
      description: "Émis lors de l'effacement.",
    },
  ],

  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Search input avec contrôles interactifs.',
      examplePath: 'ds-search-input/default',
      sources: getExampleSources('ds-search-input', 'default'),
      controls: [
        {
          name: 'placeholder',
          type: 'text',
          defaultValue: 'Rechercher...',
          description: 'Placeholder',
        },
        {
          name: 'size',
          type: 'select',
          defaultValue: 'md',
          options: ['sm', 'md', 'lg'],
          description: 'Taille',
        },
        {
          name: 'disabled',
          type: 'boolean',
          defaultValue: false,
          description: 'Désactivé',
        },
        {
          name: 'loading',
          type: 'boolean',
          defaultValue: false,
          description: 'Loading',
        },
      ],
      code: `<ds-search-input
  placeholder="Rechercher..."
  size="md"
  [disabled]="false"
  [loading]="false"
/>`,
    },
    {
      id: 'with-debounce',
      name: 'With Debounce',
      description: 'Debounce personnalisé de 500ms.',
      controls: [],
      code: `<ds-search-input
  placeholder="Recherche avec délai..."
  [debounceMs]="500"
  (search)="onSearch($event)"
/>`,
    },
    {
      id: 'loading-state',
      name: 'Loading State',
      description: 'Affichage du spinner pendant la recherche.',
      controls: [],
      code: `<ds-search-input
  placeholder="Recherche en cours..."
  [loading]="true"
/>`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<ds-search-input size="sm" placeholder="Small" />
<ds-search-input size="md" placeholder="Medium" />
<ds-search-input size="lg" placeholder="Large" />`,
    },
    {
      id: 'min-chars',
      name: 'Minimum Characters',
      description: 'Recherche déclenchée après 3 caractères.',
      controls: [],
      code: `<ds-search-input
  placeholder="Tapez au moins 3 caractères..."
  [minChars]="3"
  (search)="onSearch($event)"
/>`,
    },
  ],
};
