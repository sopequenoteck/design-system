import { ComponentDefinition } from '../types';

export const DsInputTextareaDefinition: ComponentDefinition = {
  id: 'ds-input-textarea',
  name: 'Input Textarea',
  selector: 'ds-input-textarea',
  category: 'forms',
  description:
    'Champ de texte multiligne avec label, helper, validation, compteur de caractères, auto-resize et bouton clear. CVA pour formulaires réactifs.',

  props: [
    {
      name: 'label',
      kind: 'input',
      type: 'string | undefined',
      defaultValue: 'undefined',
      description: 'Label affiché au-dessus du textarea.',
    },
    {
      name: 'placeholder',
      kind: 'input',
      type: 'string',
      defaultValue: "''",
      description: 'Texte indicatif quand le champ est vide.',
    },
    {
      name: 'helper',
      kind: 'input',
      type: 'string | undefined',
      defaultValue: 'undefined',
      description: "Texte d'aide sous le champ.",
    },
    {
      name: 'error',
      kind: 'input',
      type: 'string | undefined',
      defaultValue: 'undefined',
      description: "Message d'erreur (force l'état error).",
    },
    {
      name: 'rows',
      kind: 'input',
      type: 'number | undefined',
      defaultValue: 'undefined',
      description: 'Nombre de lignes visibles.',
    },
    {
      name: 'maxlength',
      kind: 'input',
      type: 'number | undefined',
      defaultValue: 'undefined',
      description: 'Limite de caractères avec compteur.',
    },
    {
      name: 'resize',
      kind: 'input',
      type: "'none' | 'vertical' | 'horizontal' | 'both'",
      defaultValue: "'vertical'",
      description: 'Mode de redimensionnement manuel.',
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
      description: 'Marque le champ comme obligatoire.',
    },
    {
      name: 'clearable',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Affiche un bouton pour effacer.',
    },
    {
      name: 'valueChange',
      kind: 'output',
      type: 'EventEmitter<string>',
      description: 'Émis à chaque changement de valeur.',
    },
  ],

  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Textarea avec contrôles interactifs.',
      controls: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Description',
          description: 'Label',
        },
        {
          name: 'placeholder',
          type: 'text',
          defaultValue: 'Entrez votre description...',
          description: 'Placeholder',
        },
        {
          name: 'rows',
          type: 'number',
          defaultValue: 4,
          description: 'Lignes',
        },
        {
          name: 'disabled',
          type: 'boolean',
          defaultValue: false,
          description: 'Désactivé',
        },
      ],
      code: `<ds-input-textarea
  label="Description"
  placeholder="Entrez votre description..."
  [rows]="4"
/>`,
    },
    {
      id: 'with-maxlength',
      name: 'With Maxlength',
      description: 'Textarea avec compteur de caractères.',
      controls: [],
      code: `<ds-input-textarea
  label="Bio"
  placeholder="Parlez-nous de vous..."
  [maxlength]="200"
  [rows]="3"
/>`,
    },
    {
      id: 'with-error',
      name: 'With Error',
      description: "Textarea en état d'erreur.",
      controls: [],
      code: `<ds-input-textarea
  label="Commentaire"
  [required]="true"
  error="Ce champ est obligatoire"
  [rows]="3"
/>`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<ds-input-textarea size="sm" label="Small" [rows]="2" />
<ds-input-textarea size="md" label="Medium" [rows]="2" />
<ds-input-textarea size="lg" label="Large" [rows]="2" />`,
    },
    {
      id: 'readonly',
      name: 'Readonly',
      description: 'Textarea en lecture seule.',
      controls: [],
      code: `<ds-input-textarea
  label="Contenu verrouillé"
  [readonly]="true"
  [rows]="3"
  externalValue="Ce texte ne peut pas être modifié."
/>`,
    },
  ],
};
