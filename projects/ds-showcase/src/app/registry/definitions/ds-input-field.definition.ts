import { ComponentDefinition } from '../types';
import { getExampleSources } from '../../../generated/examples-source.generated';

export const DsInputFieldDefinition: ComponentDefinition = {
  id: 'ds-input-field',
  name: 'Input Field',
  selector: 'ds-input-field',
  category: 'forms',
  description: 'Champ de saisie avec label, placeholder, validation et messages d\'aide. Supporte ControlValueAccessor.',

  props: [
    {
      name: 'label',
      kind: 'input',
      type: 'string',
      description: 'Label affiché au-dessus du champ.',
    },
    {
      name: 'placeholder',
      kind: 'input',
      type: 'string',
      description: 'Texte d\'indication dans le champ vide.',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille du champ.',
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
      description: 'Champ en lecture seule.',
    },
    {
      name: 'required',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Marque le champ comme requis.',
    },
    {
      name: 'error',
      kind: 'input',
      type: 'string',
      description: 'Message d\'erreur à afficher.',
    },
    {
      name: 'hint',
      kind: 'input',
      type: 'string',
      description: 'Texte d\'aide sous le champ.',
    },
    {
      name: 'type',
      kind: 'input',
      type: "'text' | 'email' | 'password' | 'number' | 'tel' | 'url'",
      defaultValue: "'text'",
      description: 'Type HTML de l\'input.',
    },
    {
      name: 'valueChange',
      kind: 'output',
      type: 'EventEmitter<string>',
      description: 'Émis lors du changement de valeur.',
    },
  ],

  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Champ de saisie par défaut avec contrôles.',
      examplePath: 'ds-input-field/default',
      sources: getExampleSources('ds-input-field', 'default'),
      controls: [
        { name: 'label', type: 'text', defaultValue: 'Email', description: 'Label du champ' },
        { name: 'placeholder', type: 'text', defaultValue: 'Entrez votre email', description: 'Placeholder' },
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
        { name: 'disabled', type: 'boolean', defaultValue: false },
        { name: 'required', type: 'boolean', defaultValue: false },
      ],
      code: `<ds-input-field
  label="Email"
  placeholder="Entrez votre email"
  size="md"
></ds-input-field>`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<ds-input-field label="Small" size="sm"></ds-input-field>
<ds-input-field label="Medium" size="md"></ds-input-field>
<ds-input-field label="Large" size="lg"></ds-input-field>`,
    },
    {
      id: 'states',
      name: 'States',
      description: 'États disabled, readonly et error.',
      controls: [],
      code: `<ds-input-field label="Disabled" [disabled]="true"></ds-input-field>
<ds-input-field label="Readonly" [readonly]="true" value="Valeur fixe"></ds-input-field>
<ds-input-field label="Error" error="Ce champ est invalide"></ds-input-field>`,
    },
    {
      id: 'with-hint',
      name: 'With Hint',
      description: 'Champ avec message d\'aide.',
      controls: [],
      code: `<ds-input-field
  label="Mot de passe"
  type="password"
  hint="Minimum 8 caractères"
></ds-input-field>`,
    },
  ],
};
