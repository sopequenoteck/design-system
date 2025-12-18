import { ComponentDefinition } from '../types';

export const DsNotificationDefinition: ComponentDefinition = {
  id: 'ds-notification',
  name: 'Notification',
  selector: 'ds-notification',
  category: 'feedback',
  description:
    "Système de notifications push avec différents types, positions et actions personnalisables.",
  props: [
    {
      name: 'title',
      kind: 'input',
      type: 'string',
      description: 'Titre de la notification (requis)',
    },
    {
      name: 'message',
      kind: 'input',
      type: 'string',
      description: 'Message de la notification (requis)',
    },
    {
      name: 'type',
      kind: 'input',
      type: "'info' | 'success' | 'warning' | 'error'",
      defaultValue: "'info'",
      description: 'Type de notification',
    },
    {
      name: 'duration',
      kind: 'input',
      type: 'number',
      defaultValue: '4500',
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
      name: 'placement',
      kind: 'input',
      type: "'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft'",
      defaultValue: "'topRight'",
      description: 'Position des notifications',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Notification via le service.',
      controls: [
        { name: 'type', type: 'select', defaultValue: 'info', options: ['info', 'success', 'warning', 'error'] },
        { name: 'duration', type: 'number', defaultValue: 4500 },
      ],
      code: `// Dans le composant
notificationService.show({
  title: 'Titre',
  message: 'Message de notification',
  type: 'info',
  duration: 4500,
});`,
    },
    {
      id: 'types',
      name: 'All Types',
      description: 'Les 4 types de notification.',
      controls: [],
      code: `notificationService.show({ title: 'Succès', message: 'Opération réussie', type: 'success' });
notificationService.show({ title: 'Attention', message: 'Vérifiez vos données', type: 'warning' });
notificationService.show({ title: 'Erreur', message: 'Une erreur est survenue', type: 'error' });
notificationService.show({ title: 'Info', message: 'Information importante', type: 'info' });`,
    },
    {
      id: 'persistent',
      name: 'Persistent',
      description: 'Notification persistante (duration: 0).',
      controls: [],
      code: `notificationService.show({
  title: 'Action requise',
  message: 'Veuillez confirmer votre email.',
  type: 'warning',
  duration: 0,
  closable: true,
});`,
    },
    {
      id: 'with-actions',
      name: 'With Actions',
      description: 'Notification avec boutons d\'action.',
      controls: [],
      code: `notificationService.show({
  title: 'Mise à jour disponible',
  message: 'Une nouvelle version est disponible.',
  type: 'info',
  actions: [
    { label: 'Mettre à jour', handler: () => update(), variant: 'primary' },
    { label: 'Plus tard', handler: () => dismiss(), variant: 'ghost' },
  ],
});`,
    },
  ],
};
