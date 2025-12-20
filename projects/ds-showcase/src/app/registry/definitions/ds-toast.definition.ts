import { ComponentDefinition } from '../types';
import { getExampleSources } from '../../../generated/examples-source.generated';

export const DsToastDefinition: ComponentDefinition = {
  id: 'ds-toast',
  name: 'Toast',
  selector: 'ds-toast',
  category: 'feedback',
  description:
    "Messages éphémères non-bloquants pour feedback rapide, avec auto-dismiss et actions optionnelles.",
  props: [
    {
      name: 'message',
      kind: 'input',
      type: 'string',
      description: 'Message du toast (requis)',
    },
    {
      name: 'type',
      kind: 'input',
      type: "'success' | 'warning' | 'error' | 'info'",
      defaultValue: "'info'",
      description: 'Type de toast',
    },
    {
      name: 'duration',
      kind: 'input',
      type: 'number',
      defaultValue: '3000',
      description: 'Durée en ms (0 = persistant)',
    },
    {
      name: 'closable',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Affiche le bouton de fermeture',
    },
    {
      name: 'position',
      kind: 'input',
      type: "'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'",
      defaultValue: "'top-right'",
      description: 'Position du toast',
    },
    {
      name: 'actionLabel',
      kind: 'input',
      type: 'string',
      description: "Label du bouton d'action",
    },
    {
      name: 'pauseOnHover',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Pause le timer au survol',
    },
    {
      name: 'maxStack',
      kind: 'input',
      type: 'number',
      defaultValue: '4',
      description: 'Nombre max de toasts empilés',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Toast via le service.',
      examplePath: 'ds-toast/default',
      sources: getExampleSources('ds-toast', 'default'),
      controls: [
        { name: 'type', type: 'select', defaultValue: 'info', options: ['success', 'warning', 'error', 'info'] },
        { name: 'position', type: 'select', defaultValue: 'top-right', options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'] },
        { name: 'duration', type: 'number', defaultValue: 3000 },
      ],
      code: `// Dans le composant
toastService.show({
  message: 'Action effectuée',
  type: 'success',
  position: 'top-right',
});`,
    },
    {
      id: 'types',
      name: 'All Types',
      description: 'Les 4 types de toast.',
      controls: [],
      code: `toastService.show({ message: 'Succès !', type: 'success' });
toastService.show({ message: 'Attention', type: 'warning' });
toastService.show({ message: 'Erreur', type: 'error' });
toastService.show({ message: 'Info', type: 'info' });`,
    },
    {
      id: 'with-action',
      name: 'With Action',
      description: "Toast avec bouton d'action.",
      controls: [],
      code: `toastService.show({
  message: 'Élément supprimé',
  type: 'info',
  actionLabel: 'Annuler',
  onAction: () => restore(),
});`,
    },
    {
      id: 'positions',
      name: 'Positions',
      description: 'Différentes positions.',
      controls: [],
      code: `toastService.show({ message: 'Top Right', position: 'top-right' });
toastService.show({ message: 'Top Left', position: 'top-left' });
toastService.show({ message: 'Bottom Right', position: 'bottom-right' });
toastService.show({ message: 'Bottom Left', position: 'bottom-left' });`,
    },
    {
      id: 'persistent',
      name: 'Persistent',
      description: 'Toast persistant.',
      controls: [],
      code: `toastService.show({
  message: 'Ce toast ne disparaît pas automatiquement',
  type: 'warning',
  duration: 0,
  closable: true,
});`,
    },
  ],
};
