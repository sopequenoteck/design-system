import { ComponentDefinition } from '../types';
import { getExampleSources } from '../../../generated/examples-source.generated';

export const DsRadioGroupDefinition: ComponentDefinition = {
  id: 'ds-radio-group',
  name: 'Radio Group',
  selector: 'ds-radio-group',
  category: 'forms',
  description:
    'Groupe de boutons radio avec sélection exclusive. Supporte les layouts vertical/horizontal, helper, erreur et intégration formulaires réactifs.',

  props: [
    {
      name: 'label',
      kind: 'input',
      type: 'string',
      defaultValue: "''",
      description: 'Label principal du groupe.',
    },
    {
      name: 'options',
      kind: 'input',
      type: 'RadioOption[]',
      required: true,
      description: 'Options du groupe ({ label, value, disabled? }).',
    },
    {
      name: 'helper',
      kind: 'input',
      type: 'string | undefined',
      defaultValue: 'undefined',
      description: "Texte d'aide affiché sous le groupe.",
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
      description: 'Désactive toutes les options.',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille des boutons radio.',
    },
    {
      name: 'layout',
      kind: 'input',
      type: "'vertical' | 'horizontal'",
      defaultValue: "'vertical'",
      description: 'Orientation du groupe.',
    },
  ],

  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Radio group avec contrôles interactifs.',
      examplePath: 'ds-radio-group/default',
      sources: getExampleSources('ds-radio-group', 'default'),
      controls: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Choisissez une option',
          description: 'Label du groupe',
        },
        {
          name: 'layout',
          type: 'select',
          defaultValue: 'vertical',
          options: ['vertical', 'horizontal'],
          description: 'Layout',
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
          description: 'Requis',
        },
        {
          name: 'disabled',
          type: 'boolean',
          defaultValue: false,
          description: 'Désactivé',
        },
      ],
      code: `<ds-radio-group
  label="Choisissez une option"
  [options]="[
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' }
  ]"
  layout="vertical"
  size="md"
/>`,
    },
    {
      id: 'horizontal',
      name: 'Horizontal',
      description: 'Layout horizontal pour options courtes.',
      controls: [],
      code: `<ds-radio-group
  label="Taille"
  [options]="[
    { label: 'S', value: 'sm' },
    { label: 'M', value: 'md' },
    { label: 'L', value: 'lg' },
    { label: 'XL', value: 'xl' }
  ]"
  layout="horizontal"
/>`,
    },
    {
      id: 'with-disabled',
      name: 'With Disabled Option',
      description: 'Options individuellement désactivées.',
      controls: [],
      code: `<ds-radio-group
  label="Plan tarifaire"
  [options]="[
    { label: 'Gratuit', value: 'free' },
    { label: 'Pro', value: 'pro' },
    { label: 'Enterprise (bientôt)', value: 'enterprise', disabled: true }
  ]"
/>`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<ds-radio-group size="sm" label="Small" [options]="options" />
<ds-radio-group size="md" label="Medium" [options]="options" />
<ds-radio-group size="lg" label="Large" [options]="options" />`,
    },
    {
      id: 'with-error',
      name: 'With Error',
      description: "Radio group en état d'erreur.",
      controls: [],
      code: `<ds-radio-group
  label="Type de contrat"
  [required]="true"
  error="Vous devez sélectionner un type de contrat"
  [options]="[
    { label: 'CDI', value: 'cdi' },
    { label: 'CDD', value: 'cdd' },
    { label: 'Freelance', value: 'freelance' }
  ]"
/>`,
    },
  ],
};
