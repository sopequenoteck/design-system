import { ComponentDefinition } from '../types';
import { getExampleSources } from '../../../generated/examples-source.generated';

export const DsInputNumberDefinition: ComponentDefinition = {
  id: 'ds-input-number',
  name: 'Input Number',
  selector: 'ds-input-number',
  category: 'forms',
  description:
    'Champ numérique avec boutons +/-, min/max, step, précision décimale et navigation clavier. CVA pour formulaires réactifs.',

  props: [
    {
      name: 'min',
      kind: 'input',
      type: 'number',
      defaultValue: '-Infinity',
      description: 'Valeur minimale.',
    },
    {
      name: 'max',
      kind: 'input',
      type: 'number',
      defaultValue: 'Infinity',
      description: 'Valeur maximale.',
    },
    {
      name: 'step',
      kind: 'input',
      type: 'number',
      defaultValue: '1',
      description: "Incrément des boutons +/-.",
    },
    {
      name: 'precision',
      kind: 'input',
      type: 'number',
      defaultValue: '0',
      description: 'Nombre de décimales.',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille du composant.',
    },
    {
      name: 'placeholder',
      kind: 'input',
      type: 'string',
      defaultValue: "''",
      description: 'Texte indicatif.',
    },
    {
      name: 'prefix',
      kind: 'input',
      type: 'string | undefined',
      defaultValue: 'undefined',
      description: 'Préfixe affiché (ex: €).',
    },
    {
      name: 'suffix',
      kind: 'input',
      type: 'string | undefined',
      defaultValue: 'undefined',
      description: 'Suffixe affiché (ex: kg).',
    },
    {
      name: 'controls',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Affiche les boutons +/-.',
    },
    {
      name: 'controlsPosition',
      kind: 'input',
      type: "'both' | 'right'",
      defaultValue: "'both'",
      description: 'Position des boutons.',
    },
    {
      name: 'disabled',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Désactive le champ.',
    },
    {
      name: 'readonly',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Lecture seule.',
    },
    {
      name: 'valueChange',
      kind: 'output',
      type: 'EventEmitter<number>',
      description: 'Émis à chaque changement.',
    },
  ],

  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Input number avec contrôles interactifs.',
      examplePath: 'ds-input-number/default',
      sources: getExampleSources('ds-input-number', 'default'),
      controls: [
        {
          name: 'min',
          type: 'number',
          defaultValue: 0,
          description: 'Min',
        },
        {
          name: 'max',
          type: 'number',
          defaultValue: 100,
          description: 'Max',
        },
        {
          name: 'step',
          type: 'number',
          defaultValue: 1,
          description: 'Step',
        },
        {
          name: 'disabled',
          type: 'boolean',
          defaultValue: false,
          description: 'Désactivé',
        },
      ],
      code: `<ds-input-number
  [min]="0"
  [max]="100"
  [step]="1"
/>`,
    },
    {
      id: 'with-precision',
      name: 'With Precision',
      description: 'Valeurs décimales avec 2 chiffres.',
      controls: [],
      code: `<ds-input-number
  [min]="0"
  [max]="10"
  [step]="0.1"
  [precision]="2"
  placeholder="0.00"
/>`,
    },
    {
      id: 'with-prefix-suffix',
      name: 'With Prefix/Suffix',
      description: 'Préfixe et suffixe pour les unités.',
      controls: [],
      code: `<ds-input-number prefix="€" [min]="0" [max]="1000" placeholder="Prix" />
<ds-input-number suffix="kg" [min]="0" [max]="500" placeholder="Poids" />`,
    },
    {
      id: 'controls-right',
      name: 'Controls Right',
      description: 'Boutons +/- à droite.',
      controls: [],
      code: `<ds-input-number
  controlsPosition="right"
  [min]="0"
  [max]="10"
/>`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<ds-input-number size="sm" placeholder="Small" />
<ds-input-number size="md" placeholder="Medium" />
<ds-input-number size="lg" placeholder="Large" />`,
    },
  ],
};
