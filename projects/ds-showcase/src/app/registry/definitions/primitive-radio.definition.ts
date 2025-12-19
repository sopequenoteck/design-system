import { ComponentDefinition } from '../types';

export const PrimitiveRadioDefinition: ComponentDefinition = {
  id: 'primitive-radio',
  name: 'PrimitiveRadio',
  selector: 'primitive-radio',
  category: 'primitives',
  description:
    'Bouton radio primitif atomique stylisé par CSS custom properties. Respecte le comportement natif des radios avec sélection exclusive par groupe.',

  props: [
    {
      name: 'checked',
      kind: 'model',
      type: 'boolean',
      defaultValue: 'false',
      description: 'État sélectionné du radio (binding bidirectionnel).',
    },
    {
      name: 'disabled',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'État désactivé du radio.',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille du radio.',
    },
    {
      name: 'label',
      kind: 'input',
      type: 'string',
      defaultValue: "''",
      description: 'Texte du label affiché à côté.',
    },
    {
      name: 'name',
      kind: 'input',
      type: 'string',
      defaultValue: "''",
      description: 'Nom du groupe pour le comportement exclusif.',
    },
    {
      name: 'value',
      kind: 'input',
      type: 'string',
      defaultValue: "''",
      description: 'Valeur du radio pour l\'identification.',
    },
    {
      name: 'radioId',
      kind: 'input',
      type: 'string',
      defaultValue: "'radio-{random}'",
      description: 'Identifiant unique pour l\'accessibilité.',
    },
    {
      name: 'checkedChange',
      kind: 'output',
      type: 'boolean',
      description: 'Événement émis lors de la sélection.',
    },
  ],

  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Radio avec contrôles interactifs.',
      controls: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Option A',
          description: 'Label',
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
      code: `<primitive-radio
  label="Option A"
  size="md"
  [disabled]="false"
/>`,
    },
    {
      id: 'states',
      name: 'States',
      description: 'Les différents états.',
      controls: [],
      code: `<primitive-radio label="Non sélectionné" />
<primitive-radio [checked]="true" label="Sélectionné" />`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<primitive-radio size="sm" label="Small" />
<primitive-radio size="md" label="Medium" />
<primitive-radio size="lg" label="Large" />`,
    },
    {
      id: 'disabled',
      name: 'Disabled',
      description: 'Radios désactivés.',
      controls: [],
      code: `<primitive-radio [disabled]="true" label="Désactivé" />
<primitive-radio [disabled]="true" [checked]="true" label="Désactivé (sélectionné)" />`,
    },
    {
      id: 'group',
      name: 'Radio Group',
      description: 'Groupe de radios avec sélection exclusive.',
      controls: [],
      code: `<primitive-radio name="size" value="small" label="Petit" />
<primitive-radio name="size" value="medium" label="Moyen" [checked]="true" />
<primitive-radio name="size" value="large" label="Grand" />`,
    },
  ],
};
