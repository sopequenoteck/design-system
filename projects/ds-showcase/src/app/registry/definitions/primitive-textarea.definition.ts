import { ComponentDefinition } from '../types';
import { getExampleSources } from '../../../generated/examples-source.generated';

export const PrimitiveTextareaDefinition: ComponentDefinition = {
  id: 'primitive-textarea',
  name: 'PrimitiveTextarea',
  selector: 'primitive-textarea',
  category: 'primitives',
  description:
    'Zone de saisie multiligne primitive stylisée par CSS custom properties. Supporte plusieurs états visuels, tailles, apparences et modes de redimensionnement.',

  props: [
    {
      name: 'value',
      kind: 'model',
      type: 'string',
      defaultValue: "''",
      description: 'Valeur du champ (binding bidirectionnel).',
    },
    {
      name: 'placeholder',
      kind: 'input',
      type: 'string',
      defaultValue: "''",
      description: 'Texte d\'indication affiché lorsque le champ est vide.',
    },
    {
      name: 'state',
      kind: 'input',
      type: "'default' | 'success' | 'warning' | 'error'",
      defaultValue: "'default'",
      description: 'État visuel du champ.',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille du champ.',
    },
    {
      name: 'appearance',
      kind: 'input',
      type: "'default' | 'outline' | 'ghost'",
      defaultValue: "'default'",
      description: 'Apparence visuelle du champ.',
    },
    {
      name: 'resize',
      kind: 'input',
      type: "'none' | 'vertical' | 'horizontal' | 'both'",
      defaultValue: "'vertical'",
      description: 'Mode de redimensionnement.',
    },
    {
      name: 'rows',
      kind: 'input',
      type: 'number | undefined',
      defaultValue: 'undefined',
      description: 'Nombre de lignes visibles.',
    },
    {
      name: 'cols',
      kind: 'input',
      type: 'number | undefined',
      defaultValue: 'undefined',
      description: 'Nombre de colonnes.',
    },
    {
      name: 'maxlength',
      kind: 'input',
      type: 'number | undefined',
      defaultValue: 'undefined',
      description: 'Longueur maximale autorisée.',
    },
    {
      name: 'disabled',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'État désactivé du champ.',
    },
    {
      name: 'readonly',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'État lecture seule.',
    },
    {
      name: 'inputChanged',
      kind: 'output',
      type: 'string',
      description: 'Événement émis à chaque modification.',
    },
    {
      name: 'inputBlurred',
      kind: 'output',
      type: 'void',
      description: 'Événement émis lorsque le champ perd le focus.',
    },
    {
      name: 'inputFocused',
      kind: 'output',
      type: 'void',
      description: 'Événement émis lorsque le champ reçoit le focus.',
    },
  ],

  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Textarea avec contrôles interactifs.',
      controls: [
        {
          name: 'state',
          type: 'select',
          defaultValue: 'default',
          options: ['default', 'success', 'warning', 'error'],
          description: 'État',
        },
        {
          name: 'size',
          type: 'select',
          defaultValue: 'md',
          options: ['sm', 'md', 'lg'],
          description: 'Taille',
        },
        {
          name: 'resize',
          type: 'select',
          defaultValue: 'vertical',
          options: ['none', 'vertical', 'horizontal', 'both'],
          description: 'Redimensionnement',
        },
        {
          name: 'disabled',
          type: 'boolean',
          defaultValue: false,
          description: 'Désactivé',
        },
      ],
      examplePath: 'primitive-textarea/default',
      sources: getExampleSources('primitive-textarea', 'default'),
    },
    {
      id: 'states',
      name: 'States',
      description: 'Les quatre états visuels.',
      controls: [],
      code: `<primitive-textarea state="default" placeholder="Default" />
<primitive-textarea state="success" placeholder="Success" />
<primitive-textarea state="warning" placeholder="Warning" />
<primitive-textarea state="error" placeholder="Error" />`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<primitive-textarea size="sm" placeholder="Small" />
<primitive-textarea size="md" placeholder="Medium" />
<primitive-textarea size="lg" placeholder="Large" />`,
    },
    {
      id: 'resize-modes',
      name: 'Resize Modes',
      description: 'Les quatre modes de redimensionnement.',
      controls: [],
      code: `<primitive-textarea resize="none" placeholder="No resize" />
<primitive-textarea resize="vertical" placeholder="Vertical only" />
<primitive-textarea resize="horizontal" placeholder="Horizontal only" />
<primitive-textarea resize="both" placeholder="Both directions" />`,
    },
    {
      id: 'with-rows',
      name: 'With Rows',
      description: 'Textarea avec nombre de lignes défini.',
      controls: [],
      code: `<primitive-textarea [rows]="3" placeholder="3 lignes" />
<primitive-textarea [rows]="6" placeholder="6 lignes" />`,
    },
    {
      id: 'maxlength',
      name: 'With Maxlength',
      description: 'Textarea avec limite de caractères.',
      controls: [],
      code: `<primitive-textarea [maxlength]="100" placeholder="Max 100 caractères" />`,
    },
  ],
};
