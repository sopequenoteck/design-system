import { ComponentDefinition } from '../types';

export const PrimitiveInputDefinition: ComponentDefinition = {
  id: 'primitive-input',
  name: 'PrimitiveInput',
  selector: 'primitive-input',
  category: 'primitives',
  description:
    'Champ de saisie primitif atomique stylisé par CSS custom properties. Supporte plusieurs types HTML5, états visuels, tailles et apparences.',

  props: [
    {
      name: 'value',
      kind: 'model',
      type: 'string',
      defaultValue: "''",
      description: 'Valeur du champ (binding bidirectionnel).',
    },
    {
      name: 'type',
      kind: 'input',
      type: "'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date'",
      defaultValue: "'text'",
      description: 'Type HTML5 du champ.',
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
      description: 'État visuel du champ (feedback utilisateur).',
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
      name: 'required',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Champ obligatoire.',
    },
    {
      name: 'maxlength',
      kind: 'input',
      type: 'number | undefined',
      defaultValue: 'undefined',
      description: 'Longueur maximale autorisée.',
    },
    {
      name: 'iconStart',
      kind: 'input',
      type: 'IconDefinition | null',
      defaultValue: 'null',
      description: 'Icône FontAwesome affichée avant le champ.',
    },
    {
      name: 'iconEnd',
      kind: 'input',
      type: 'IconDefinition | null',
      defaultValue: 'null',
      description: 'Icône FontAwesome affichée après le champ.',
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
      description: 'Input avec contrôles interactifs.',
      controls: [
        {
          name: 'type',
          type: 'select',
          defaultValue: 'text',
          options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search', 'date'],
          description: 'Type',
        },
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
          name: 'disabled',
          type: 'boolean',
          defaultValue: false,
          description: 'Désactivé',
        },
      ],
      code: `<primitive-input
  type="text"
  state="default"
  size="md"
  placeholder="Entrez du texte..."
  [disabled]="false"
/>`,
    },
    {
      id: 'types',
      name: 'Input Types',
      description: 'Différents types HTML5.',
      controls: [],
      code: `<primitive-input type="text" placeholder="Texte" />
<primitive-input type="email" placeholder="email@example.com" />
<primitive-input type="password" placeholder="Mot de passe" />
<primitive-input type="number" placeholder="123" />
<primitive-input type="tel" placeholder="+33 1 23 45 67 89" />
<primitive-input type="date" />`,
    },
    {
      id: 'states',
      name: 'States',
      description: 'Les quatre états visuels.',
      controls: [],
      code: `<primitive-input state="default" placeholder="Default" />
<primitive-input state="success" placeholder="Success" />
<primitive-input state="warning" placeholder="Warning" />
<primitive-input state="error" placeholder="Error" />`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<primitive-input size="sm" placeholder="Small" />
<primitive-input size="md" placeholder="Medium" />
<primitive-input size="lg" placeholder="Large" />`,
    },
    {
      id: 'disabled-readonly',
      name: 'Disabled & Readonly',
      description: 'États désactivé et lecture seule.',
      controls: [],
      code: `<primitive-input [disabled]="true" placeholder="Disabled" />
<primitive-input [readonly]="true" value="Read only" />`,
    },
  ],
};
