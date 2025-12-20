import { ComponentDefinition } from '../types';
import { getExampleSources } from '../../../generated/examples-source.generated';

export const DsAlertDefinition: ComponentDefinition = {
  id: 'ds-alert',
  name: 'Alert',
  selector: 'ds-alert',
  category: 'feedback',
  description:
    "Composant de bannière de feedback pour afficher des messages de succès, d'avertissement, d'erreur ou d'information.",
  props: [
    {
      name: 'type',
      kind: 'input',
      type: "'success' | 'warning' | 'error' | 'info'",
      defaultValue: "'info'",
      description: 'Type de feedback',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: "Taille de l'alerte",
    },
    {
      name: 'showIcon',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Affiche une icône selon le type',
    },
    {
      name: 'closable',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Permet de fermer l\'alerte',
    },
    {
      name: 'hidden',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: "Masque l'alerte",
    },
    {
      name: 'closed',
      kind: 'output',
      type: 'EventEmitter<void>',
      description: "Émis lorsque l'utilisateur ferme l'alerte",
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Alerte avec contrôles interactifs.',
      examplePath: 'ds-alert/default',
      sources: getExampleSources('ds-alert', 'default'),
      controls: [
        { name: 'type', type: 'select', defaultValue: 'info', options: ['success', 'warning', 'error', 'info'] },
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
        { name: 'showIcon', type: 'boolean', defaultValue: true },
        { name: 'closable', type: 'boolean', defaultValue: false },
      ],
      code: `<ds-alert
  [type]="type"
  [size]="size"
  [showIcon]="showIcon"
  [closable]="closable"
>
  Ceci est un message d'alerte.
</ds-alert>`,
    },
    {
      id: 'types',
      name: 'All Types',
      description: 'Les 4 types de feedback.',
      controls: [],
      code: `<ds-alert type="success">Opération réussie !</ds-alert>
<ds-alert type="warning">Attention à cette action.</ds-alert>
<ds-alert type="error">Une erreur est survenue.</ds-alert>
<ds-alert type="info">Information importante.</ds-alert>`,
    },
    {
      id: 'closable',
      name: 'Closable',
      description: 'Alerte avec bouton de fermeture.',
      controls: [],
      code: `<ds-alert
  type="warning"
  [closable]="true"
  (closed)="onClose()"
>
  Cette alerte peut être fermée.
</ds-alert>`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Différentes tailles.',
      controls: [],
      code: `<ds-alert type="info" size="sm">Petite alerte</ds-alert>
<ds-alert type="info" size="md">Alerte moyenne</ds-alert>
<ds-alert type="info" size="lg">Grande alerte</ds-alert>`,
    },
  ],
};
