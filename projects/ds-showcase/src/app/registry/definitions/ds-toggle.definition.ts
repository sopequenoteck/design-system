import { ComponentDefinition } from '../types';

export const DsToggleDefinition: ComponentDefinition = {
  id: 'ds-toggle',
  name: 'Toggle',
  selector: 'ds-toggle',
  category: 'forms',
  description:
    'Interrupteur on/off avec label et helper. Position du label configurable. Intégration formulaires réactifs via ControlValueAccessor.',

  props: [
    {
      name: 'label',
      kind: 'input',
      type: 'string',
      defaultValue: "''",
      description: 'Label affiché à côté du toggle.',
    },
    {
      name: 'labelPosition',
      kind: 'input',
      type: "'left' | 'right'",
      defaultValue: "'right'",
      description: 'Position du label par rapport au toggle.',
    },
    {
      name: 'helper',
      kind: 'input',
      type: 'string | undefined',
      defaultValue: 'undefined',
      description: "Texte d'aide affiché sous le toggle.",
    },
    {
      name: 'disabled',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Désactive le toggle.',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille du toggle.',
    },
    {
      name: 'name',
      kind: 'input',
      type: 'string | undefined',
      defaultValue: 'undefined',
      description: 'Nom du contrôle pour les formulaires.',
    },
  ],

  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Toggle avec contrôles interactifs.',
      controls: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Activer la fonctionnalité',
          description: 'Label',
        },
        {
          name: 'labelPosition',
          type: 'select',
          defaultValue: 'right',
          options: ['left', 'right'],
          description: 'Position du label',
        },
        {
          name: 'size',
          type: 'select',
          defaultValue: 'md',
          options: ['sm', 'md', 'lg'],
          description: 'Taille',
        },
        {
          name: 'disabled',
          type: 'boolean',
          defaultValue: false,
          description: 'Désactivé',
        },
      ],
      code: `<ds-toggle
  label="Activer la fonctionnalité"
  labelPosition="right"
  size="md"
  [disabled]="false"
/>`,
    },
    {
      id: 'with-helper',
      name: 'With Helper',
      description: "Toggle avec texte d'aide.",
      controls: [],
      code: `<ds-toggle
  label="Notifications push"
  helper="Recevez des alertes en temps réel sur votre appareil"
/>`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<ds-toggle size="sm" label="Small" />
<ds-toggle size="md" label="Medium" />
<ds-toggle size="lg" label="Large" />`,
    },
    {
      id: 'label-positions',
      name: 'Label Positions',
      description: 'Position du label à gauche ou à droite.',
      controls: [],
      code: `<ds-toggle labelPosition="left" label="Label à gauche" />
<ds-toggle labelPosition="right" label="Label à droite" />`,
    },
    {
      id: 'settings-panel',
      name: 'Settings Panel',
      description: 'Exemple de panneau de paramètres.',
      controls: [],
      code: `<ds-toggle label="Notifications email" helper="Résumé quotidien" />
<ds-toggle label="Notifications push" helper="Alertes temps réel" />
<ds-toggle label="Newsletter" helper="Actualités mensuelles" />
<ds-toggle label="Mode marketing" [disabled]="true" helper="Indisponible" />`,
    },
  ],
};
