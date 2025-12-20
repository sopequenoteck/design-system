import { ComponentDefinition } from '../types';
import { getExampleSources } from '../../../generated/examples-source.generated';

export const DsCheckboxDefinition: ComponentDefinition = {
  id: 'ds-checkbox',
  name: 'Checkbox',
  selector: 'ds-checkbox',
  category: 'forms',
  description:
    'Case à cocher avec label, helper, erreur et état indéterminé. Intégration formulaires réactifs via ControlValueAccessor.',

  props: [
    {
      name: 'label',
      kind: 'input',
      type: 'string',
      defaultValue: "''",
      description: 'Label affiché à côté de la checkbox.',
    },
    {
      name: 'helper',
      kind: 'input',
      type: 'string | undefined',
      defaultValue: 'undefined',
      description: "Texte d'aide affiché sous la checkbox.",
    },
    {
      name: 'error',
      kind: 'input',
      type: 'string | undefined',
      defaultValue: 'undefined',
      description: "Message d'erreur affiché en rouge.",
    },
    {
      name: 'required',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Marque le champ comme obligatoire (affiche *).',
    },
    {
      name: 'disabled',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Désactive la checkbox.',
    },
    {
      name: 'indeterminate',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'État indéterminé (tiret). Pour sélections partielles.',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille de la checkbox.',
    },
    {
      name: 'name',
      kind: 'input',
      type: 'string | undefined',
      defaultValue: 'undefined',
      description: 'Nom du contrôle pour les formulaires.',
    },
  ],

  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Checkbox avec contrôles interactifs.',
      examplePath: 'ds-checkbox/default',
      sources: getExampleSources('ds-checkbox', 'default'),
      controls: [
        {
          name: 'label',
          type: 'text',
          defaultValue: "J'accepte les conditions",
          description: 'Label de la checkbox',
        },
        {
          name: 'size',
          type: 'select',
          defaultValue: 'md',
          options: ['sm', 'md', 'lg'],
          description: 'Taille',
        },
        {
          name: 'required',
          type: 'boolean',
          defaultValue: false,
          description: 'Champ requis',
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
          description: 'État indéterminé',
        },
      ],
      code: `<ds-checkbox
  label="J'accepte les conditions"
  size="md"
  [required]="false"
  [disabled]="false"
/>`,
    },
    {
      id: 'with-helper',
      name: 'With Helper',
      description: "Checkbox avec texte d'aide.",
      controls: [],
      code: `<ds-checkbox
  label="Newsletter"
  helper="Recevez nos dernières actualités par email"
/>`,
    },
    {
      id: 'with-error',
      name: 'With Error',
      description: "Checkbox en état d'erreur avec message de validation.",
      controls: [],
      code: `<ds-checkbox
  label="J'accepte les conditions d'utilisation"
  [required]="true"
  error="Vous devez accepter les conditions pour continuer"
/>`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<ds-checkbox size="sm" label="Small" />
<ds-checkbox size="md" label="Medium" />
<ds-checkbox size="lg" label="Large" />`,
    },
    {
      id: 'states',
      name: 'States',
      description: 'États normal et indéterminé.',
      controls: [],
      code: `<ds-checkbox label="Non coché" />
<ds-checkbox [indeterminate]="true" label="Indéterminé" />`,
    },
  ],
};
