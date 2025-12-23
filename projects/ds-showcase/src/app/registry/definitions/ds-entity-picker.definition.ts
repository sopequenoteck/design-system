import { ComponentDefinition } from '../types';

export const DsEntityPickerDefinition: ComponentDefinition = {
  id: 'ds-entity-picker',
  name: 'Entity Picker',
  selector: 'ds-entity-picker',
  category: 'forms',
  description:
    'Sélecteur d\'entités riches avec support des icônes, couleurs, emojis et multi-sélection. Idéal pour les tags, catégories et étiquettes.',
  props: [
    {
      name: 'options',
      kind: 'input',
      type: 'DsEntityOption[]',
      defaultValue: '[]',
      description: 'Liste des options disponibles avec value, label, color, icon, emoji',
    },
    {
      name: 'multiple',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Active la sélection multiple avec affichage en chips',
    },
    {
      name: 'allowCreate',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Permet la création d\'options à la volée',
    },
    {
      name: 'placeholder',
      kind: 'input',
      type: 'string',
      defaultValue: "'Rechercher...'",
      description: 'Placeholder du champ de recherche',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille du composant',
    },
    {
      name: 'displayMode',
      kind: 'input',
      type: "'chip' | 'count'",
      defaultValue: "'chip'",
      description: 'Mode d\'affichage des sélections multiples',
    },
    {
      name: 'clearable',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Afficher le bouton pour effacer la sélection',
    },
    {
      name: 'maxSelections',
      kind: 'input',
      type: 'number',
      defaultValue: 'undefined',
      description: 'Nombre maximum de sélections en mode multiple',
    },
    {
      name: 'label',
      kind: 'input',
      type: 'string',
      defaultValue: "''",
      description: 'Label du champ',
    },
    {
      name: 'error',
      kind: 'input',
      type: 'string',
      defaultValue: "''",
      description: 'Message d\'erreur',
    },
    {
      name: 'helper',
      kind: 'input',
      type: 'string',
      defaultValue: "''",
      description: 'Texte d\'aide',
    },
    {
      name: 'disabled',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Désactiver le composant',
    },
    {
      name: 'required',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Champ obligatoire (affiche un astérisque)',
    },
    {
      name: 'minChars',
      kind: 'input',
      type: 'number',
      defaultValue: '0',
      description: 'Caractères minimum avant filtrage',
    },
    {
      name: 'noResultsText',
      kind: 'input',
      type: 'string',
      defaultValue: "'Aucun résultat'",
      description: 'Texte affiché si aucun résultat',
    },
    {
      name: 'createText',
      kind: 'input',
      type: 'string',
      defaultValue: "'Créer \"{query}\"'",
      description: 'Template du texte de création. Utiliser {query} comme placeholder pour la valeur recherchée.',
    },
    {
      name: 'selectionChange',
      kind: 'output',
      type: 'EventEmitter<DsEntityOption | DsEntityOption[] | null>',
      description: 'Émis lors d\'un changement de sélection',
    },
    {
      name: 'createRequested',
      kind: 'output',
      type: 'EventEmitter<string>',
      description: 'Émis lors d\'une demande de création',
    },
    {
      name: 'searchChange',
      kind: 'output',
      type: 'EventEmitter<string>',
      description: 'Émis lors d\'un changement de recherche',
    },
    {
      name: 'opened',
      kind: 'output',
      type: 'EventEmitter<void>',
      description: 'Émis à l\'ouverture du panel',
    },
    {
      name: 'closed',
      kind: 'output',
      type: 'EventEmitter<void>',
      description: 'Émis à la fermeture du panel',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Sélection simple avec contrôles interactifs.',
      controls: [
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
        { name: 'clearable', type: 'boolean', defaultValue: true },
        { name: 'disabled', type: 'boolean', defaultValue: false },
      ],
      code: `<ds-entity-picker
  [options]="options"
  [size]="size"
  [clearable]="clearable"
  [disabled]="disabled"
  placeholder="Sélectionner une étiquette..."
/>`,
    },
    {
      id: 'with-icons-colors',
      name: 'With Icons & Colors',
      description: 'Options avec icônes FontAwesome, emojis et couleurs personnalisées.',
      controls: [],
      code: `<ds-entity-picker
  [options]="richOptions"
  placeholder="Choisir un tag..."
/>

// richOptions = [
//   { value: 'important', label: 'Important', color: '#ef4444', emoji: '🏷️' },
//   { value: 'favorite', label: 'Favori', color: '#f59e0b', icon: faStar },
//   { value: 'personal', label: 'Personnel', color: '#10b981' },
// ]`,
    },
    {
      id: 'multiple',
      name: 'Multiple Selection',
      description: 'Multi-sélection avec affichage en chips colorés.',
      controls: [
        { name: 'maxSelections', type: 'number', defaultValue: 0, min: 0, max: 10 },
        { name: 'displayMode', type: 'select', defaultValue: 'chip', options: ['chip', 'count'] },
      ],
      code: `<ds-entity-picker
  [options]="options"
  [multiple]="true"
  [maxSelections]="maxSelections"
  [displayMode]="displayMode"
  placeholder="Ajouter des tags..."
/>`,
    },
    {
      id: 'allow-create',
      name: 'Allow Create',
      description: 'Permet de créer de nouvelles options à la volée.',
      controls: [],
      code: `<ds-entity-picker
  [options]="options"
  [allowCreate]="true"
  (createRequested)="onCreateTag($event)"
  placeholder="Taper ou créer..."
/>

onCreateTag(value: string) {
  // Ajouter la nouvelle option à la liste
  this.options = [...this.options, { value, label: value, color: '#6b7280' }];
}`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<ds-entity-picker [options]="options" size="sm" placeholder="Small" />
<ds-entity-picker [options]="options" size="md" placeholder="Medium" />
<ds-entity-picker [options]="options" size="lg" placeholder="Large" />`,
    },
    {
      id: 'with-form',
      name: 'With Reactive Form',
      description: 'Intégration avec les formulaires réactifs Angular.',
      controls: [],
      code: `<form [formGroup]="form">
  <ds-entity-picker
    [options]="options"
    [multiple]="true"
    formControlName="tags"
    label="Tags"
    helper="Sélectionnez au moins un tag"
    [error]="form.get('tags')?.errors?.['required'] ? 'Champ obligatoire' : ''"
  />
</form>

// form = new FormGroup({
//   tags: new FormControl<string[]>([], Validators.required)
// });`,
    },
    {
      id: 'states',
      name: 'States',
      description: 'États disabled, error et avec helper.',
      controls: [],
      code: `<!-- Disabled -->
<ds-entity-picker [options]="options" [disabled]="true" placeholder="Désactivé" />

<!-- Error -->
<ds-entity-picker [options]="options" error="Ce champ est obligatoire" />

<!-- With helper -->
<ds-entity-picker [options]="options" helper="Choisissez une ou plusieurs options" />`,
    },
  ],
};
