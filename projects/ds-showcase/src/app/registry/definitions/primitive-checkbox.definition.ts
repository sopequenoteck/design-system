import { ComponentDefinition } from '../types';

export const PrimitiveCheckboxDefinition: ComponentDefinition = {
  id: 'primitive-checkbox',
  name: 'PrimitiveCheckbox',
  selector: 'primitive-checkbox',
  category: 'primitives',
  description:
    'Case à cocher primitive atomique stylisée par CSS custom properties. Supporte trois états (non coché, coché, indéterminé), plusieurs tailles et un label optionnel.',

  props: [
    {
      name: 'checked',
      kind: 'model',
      type: 'boolean',
      defaultValue: 'false',
      description: 'État coché de la checkbox (binding bidirectionnel).',
    },
    {
      name: 'indeterminate',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'État indéterminé (prioritaire sur checked).',
    },
    {
      name: 'disabled',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'État désactivé de la checkbox.',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille de la checkbox.',
    },
    {
      name: 'label',
      kind: 'input',
      type: 'string',
      defaultValue: "''",
      description: 'Texte du label affiché à côté.',
    },
    {
      name: 'checkboxId',
      kind: 'input',
      type: 'string',
      defaultValue: "'checkbox-{random}'",
      description: 'Identifiant unique pour l\'accessibilité.',
    },
    {
      name: 'checkedChange',
      kind: 'output',
      type: 'boolean',
      description: 'Événement émis lors du changement d\'état.',
    },
  ],

  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Checkbox avec contrôles interactifs.',
      controls: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'J\'accepte les conditions',
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
        {
          name: 'indeterminate',
          type: 'boolean',
          defaultValue: false,
          description: 'Indéterminé',
        },
      ],
      code: `<primitive-checkbox
  label="J'accepte les conditions"
  size="md"
  [disabled]="false"
  [indeterminate]="false"
/>`,
    },
    {
      id: 'states',
      name: 'All States',
      description: 'Les trois états possibles.',
      controls: [],
      code: `<primitive-checkbox label="Non coché" />
<primitive-checkbox [checked]="true" label="Coché" />
<primitive-checkbox [indeterminate]="true" label="Indéterminé" />`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<primitive-checkbox size="sm" label="Small" />
<primitive-checkbox size="md" label="Medium" />
<primitive-checkbox size="lg" label="Large" />`,
    },
    {
      id: 'disabled',
      name: 'Disabled',
      description: 'Checkboxes désactivées.',
      controls: [],
      code: `<primitive-checkbox [disabled]="true" label="Désactivé (non coché)" />
<primitive-checkbox [disabled]="true" [checked]="true" label="Désactivé (coché)" />`,
    },
    {
      id: 'group',
      name: 'Checkbox Group',
      description: 'Groupe de checkboxes pour sélection multiple.',
      controls: [],
      code: `<primitive-checkbox label="Option A" />
<primitive-checkbox label="Option B" />
<primitive-checkbox label="Option C" />`,
    },
  ],
};
