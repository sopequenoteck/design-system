import { ComponentDefinition } from '../types';
import { getExampleSources } from '../../../generated/examples-source.generated';

export const DsFileUploadDefinition: ComponentDefinition = {
  id: 'ds-file-upload',
  name: 'File Upload',
  selector: 'ds-file-upload',
  category: 'forms',
  description:
    'Téléchargement de fichiers avec drag & drop, validation, preview et barre de progression.',
  props: [
    {
      name: 'accept',
      kind: 'input',
      type: 'string',
      defaultValue: "'*'",
      description: "Types de fichiers acceptés (ex: 'image/*,.pdf')",
    },
    {
      name: 'maxFileSize',
      kind: 'input',
      type: 'number',
      defaultValue: '10485760',
      description: 'Taille maximale en bytes (10 MB par défaut)',
    },
    {
      name: 'maxFiles',
      kind: 'input',
      type: 'number',
      defaultValue: '1',
      description: 'Nombre maximum de fichiers',
    },
    {
      name: 'multiple',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Permet la sélection multiple',
    },
    {
      name: 'disabled',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Désactiver le composant',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille du composant',
    },
    {
      name: 'showPreview',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Afficher une preview pour les images',
    },
    {
      name: 'label',
      kind: 'input',
      type: 'string',
      defaultValue: "'Choisir un fichier'",
      description: 'Label personnalisé',
    },
    {
      name: 'filesChange',
      kind: 'output',
      type: 'EventEmitter<File[]>',
      description: 'Émis lors du changement de fichiers',
    },
    {
      name: 'fileRemoved',
      kind: 'output',
      type: 'EventEmitter<File>',
      description: 'Émis lors de la suppression d\'un fichier',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'File upload avec contrôles interactifs.',
      examplePath: 'ds-file-upload/default',
      sources: getExampleSources('ds-file-upload', 'default'),
      controls: [
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
        { name: 'multiple', type: 'boolean', defaultValue: false },
        { name: 'showPreview', type: 'boolean', defaultValue: true },
        { name: 'disabled', type: 'boolean', defaultValue: false },
      ],
      code: `<ds-file-upload
  [size]="size"
  [multiple]="multiple"
  [showPreview]="showPreview"
  [disabled]="disabled"
  (filesChange)="onFilesChange($event)"
/>`,
    },
    {
      id: 'images-only',
      name: 'Images Only',
      description: 'Accepte uniquement les images.',
      controls: [],
      code: `<ds-file-upload
  accept="image/*"
  [showPreview]="true"
/>`,
    },
    {
      id: 'multiple-files',
      name: 'Multiple Files',
      description: 'Upload de plusieurs fichiers (max 5).',
      controls: [],
      code: `<ds-file-upload
  [multiple]="true"
  [maxFiles]="5"
/>`,
    },
    {
      id: 'custom-size-limit',
      name: 'Custom Size Limit',
      description: 'Limite de taille personnalisée (2 MB).',
      controls: [],
      code: `<ds-file-upload
  [maxFileSize]="2097152"
  label="Max 2 MB"
/>`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<ds-file-upload size="sm" />
<ds-file-upload size="md" />
<ds-file-upload size="lg" />`,
    },
  ],
};
