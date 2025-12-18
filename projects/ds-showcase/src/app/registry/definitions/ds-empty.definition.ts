import { ComponentDefinition } from '../types';

export const DsEmptyDefinition: ComponentDefinition = {
  id: 'ds-empty',
  name: 'Empty',
  selector: 'ds-empty',
  category: 'data-display',
  description:
    "Composant d'état vide standardisé pour afficher un message lorsqu'aucune donnée n'est disponible.",
  props: [
    {
      name: 'title',
      kind: 'input',
      type: 'string',
      defaultValue: "'Aucune donnée'",
      description: "Titre principal de l'état vide",
    },
    {
      name: 'description',
      kind: 'input',
      type: 'string',
      defaultValue: "''",
      description: 'Description complémentaire',
    },
    {
      name: 'icon',
      kind: 'input',
      type: 'IconDefinition',
      defaultValue: 'faInbox',
      description: 'Icône FontAwesome à afficher',
    },
    {
      name: 'imageUrl',
      kind: 'input',
      type: 'string',
      defaultValue: "''",
      description: "URL d'une image personnalisée",
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille du composant',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'État vide avec contrôles interactifs.',
      controls: [
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
      ],
      code: `<ds-empty
  title="Aucun résultat"
  description="Essayez de modifier vos filtres"
  [size]="size"
/>`,
    },
    {
      id: 'with-action',
      name: 'With Action',
      description: 'État vide avec bouton d\'action.',
      controls: [],
      code: `<ds-empty
  title="Aucun projet"
  description="Créez votre premier projet pour commencer"
>
  <ds-button>Créer un projet</ds-button>
</ds-empty>`,
    },
    {
      id: 'with-image',
      name: 'With Image',
      description: 'État vide avec illustration personnalisée.',
      controls: [],
      code: `<ds-empty
  title="Boîte de réception vide"
  description="Vous n'avez aucun message"
  imageUrl="assets/empty-inbox.svg"
/>`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<ds-empty title="Small" size="sm" />
<ds-empty title="Medium" size="md" />
<ds-empty title="Large" size="lg" />`,
    },
  ],
};
