import { ComponentDefinition } from '../types';

export const DsModalDefinition: ComponentDefinition = {
  id: 'ds-modal',
  name: 'Modal',
  selector: 'ds-modal',
  category: 'overlays',
  description: 'Fenêtre modale avec overlay, animations et gestion du focus trap. Supporte plusieurs tailles et types.',

  props: [
    {
      name: 'open',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Contrôle l\'ouverture de la modale.',
    },
    {
      name: 'title',
      kind: 'input',
      type: 'string',
      description: 'Titre affiché dans le header.',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille de la modale.',
    },
    {
      name: 'type',
      kind: 'input',
      type: "'success' | 'warning' | 'error' | 'info' | null",
      defaultValue: "null",
      description: 'Type sémantique de la modale (colore le header).',
    },
    {
      name: 'showIcon',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Affiche une icône correspondant au type.',
    },
    {
      name: 'closable',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Affiche le bouton de fermeture.',
    },
    {
      name: 'closeOnBackdrop',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Ferme la modale au clic sur l\'overlay.',
    },
    {
      name: 'closeOnEscape',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Ferme la modale avec la touche Escape.',
    },
    {
      name: 'closed',
      kind: 'output',
      type: 'EventEmitter<void>',
      description: 'Émis lors de la fermeture.',
    },
  ],

  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Modale par défaut.',
      controls: [
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
        { name: 'closable', type: 'boolean', defaultValue: true },
        { name: 'closeOnBackdrop', type: 'boolean', defaultValue: true },
      ],
      code: `<ds-button (clicked)="isOpen = true">Ouvrir</ds-button>

<ds-modal
  [open]="isOpen"
  title="Titre de la modale"
  size="md"
  (closed)="isOpen = false"
>
  <p>Contenu de la modale</p>
</ds-modal>`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<ds-modal size="sm" title="Small">...</ds-modal>
<ds-modal size="md" title="Medium">...</ds-modal>
<ds-modal size="lg" title="Large">...</ds-modal>`,
    },
    {
      id: 'types',
      name: 'Semantic Types',
      description: 'Types sémantiques pour différents contextes.',
      controls: [],
      code: `<ds-modal type="success" title="Succès">Opération réussie</ds-modal>
<ds-modal type="warning" title="Attention">Êtes-vous sûr ?</ds-modal>
<ds-modal type="error" title="Erreur">Une erreur est survenue</ds-modal>
<ds-modal type="info" title="Information">Note importante</ds-modal>`,
    },
  ],
};
