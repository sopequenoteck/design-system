import { ComponentDefinition } from '../types';

export const DsTimelineDefinition: ComponentDefinition = {
  id: 'ds-timeline',
  name: 'Timeline',
  selector: 'ds-timeline',
  category: 'data-display',
  description:
    "Composant pour afficher une liste d'événements dans un ordre chronologique vertical avec modes d'affichage multiples.",
  props: [
    {
      name: 'items',
      kind: 'input',
      type: 'TimelineItem[]',
      description: 'Liste des événements (requis)',
    },
    {
      name: 'mode',
      kind: 'input',
      type: "'left' | 'right' | 'alternate'",
      defaultValue: "'left'",
      description: "Mode d'affichage",
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille du composant',
    },
    {
      name: 'pending',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Affiche un indicateur "en cours" à la fin',
    },
    {
      name: 'pendingContent',
      kind: 'input',
      type: 'string',
      defaultValue: "'En cours...'",
      description: 'Texte de l\'indicateur pending',
    },
    {
      name: 'reverse',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: "Inverse l'ordre d'affichage",
    },
    {
      name: 'itemClick',
      kind: 'output',
      type: 'EventEmitter<{ item: TimelineItem; index: number }>',
      description: 'Émis au clic sur un item',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Timeline avec contrôles interactifs.',
      controls: [
        { name: 'mode', type: 'select', defaultValue: 'left', options: ['left', 'right', 'alternate'] },
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
        { name: 'pending', type: 'boolean', defaultValue: false },
      ],
      code: `<ds-timeline
  [items]="events"
  [mode]="mode"
  [size]="size"
  [pending]="pending"
/>`,
    },
    {
      id: 'alternate',
      name: 'Alternate Mode',
      description: 'Contenu alterné gauche/droite.',
      controls: [],
      code: `<ds-timeline
  [items]="events"
  mode="alternate"
/>`,
    },
    {
      id: 'with-colors',
      name: 'With Colors',
      description: 'Événements avec couleurs.',
      controls: [],
      code: `<ds-timeline
  [items]="coloredEvents"
/>

// coloredEvents = [
//   { content: 'Créé', color: 'info' },
//   { content: 'En cours', color: 'warning' },
//   { content: 'Terminé', color: 'success' },
// ]`,
    },
    {
      id: 'pending',
      name: 'With Pending',
      description: 'Timeline avec indicateur en cours.',
      controls: [],
      code: `<ds-timeline
  [items]="events"
  [pending]="true"
  pendingContent="Livraison en cours..."
/>`,
    },
  ],
};
