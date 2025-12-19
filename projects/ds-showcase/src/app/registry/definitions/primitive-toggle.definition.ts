import { ComponentDefinition } from '../types';

export const PrimitiveToggleDefinition: ComponentDefinition = {
  id: 'primitive-toggle',
  name: 'PrimitiveToggle',
  selector: 'primitive-toggle',
  category: 'primitives',
  description:
    'Interrupteur (switch) primitif atomique stylisé par CSS custom properties. Représente un état binaire on/off avec animation fluide et label positionnable.',

  props: [
    {
      name: 'checked',
      kind: 'model',
      type: 'boolean',
      defaultValue: 'false',
      description: 'État activé du toggle (binding bidirectionnel).',
    },
    {
      name: 'disabled',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'État désactivé du toggle.',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille du toggle.',
    },
    {
      name: 'label',
      kind: 'input',
      type: 'string',
      defaultValue: "''",
      description: 'Texte du label affiché à côté.',
    },
    {
      name: 'labelPosition',
      kind: 'input',
      type: "'left' | 'right'",
      defaultValue: "'right'",
      description: 'Position du label par rapport au switch.',
    },
    {
      name: 'toggleId',
      kind: 'input',
      type: 'string',
      defaultValue: "'toggle-{random}'",
      description: 'Identifiant unique pour l\'accessibilité.',
    },
    {
      name: 'checkedChange',
      kind: 'output',
      type: 'boolean',
      description: 'Événement émis lors du changement d\'état.',
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
      code: `<primitive-toggle
  label="Activer la fonctionnalité"
  labelPosition="right"
  size="md"
  [disabled]="false"
/>`,
    },
    {
      id: 'states',
      name: 'States',
      description: 'Les différents états.',
      controls: [],
      code: `<primitive-toggle label="Désactivé" />
<primitive-toggle [checked]="true" label="Activé" />`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<primitive-toggle size="sm" label="Small" />
<primitive-toggle size="md" label="Medium" />
<primitive-toggle size="lg" label="Large" />`,
    },
    {
      id: 'label-positions',
      name: 'Label Positions',
      description: 'Position du label à gauche ou à droite.',
      controls: [],
      code: `<primitive-toggle labelPosition="left" label="Label à gauche" />
<primitive-toggle labelPosition="right" label="Label à droite" />`,
    },
    {
      id: 'disabled',
      name: 'Disabled',
      description: 'Toggles désactivés.',
      controls: [],
      code: `<primitive-toggle [disabled]="true" label="Désactivé (off)" />
<primitive-toggle [disabled]="true" [checked]="true" label="Désactivé (on)" />`,
    },
    {
      id: 'settings',
      name: 'Settings Example',
      description: 'Exemple de panneau de paramètres.',
      controls: [],
      code: `<primitive-toggle label="Notifications email" />
<primitive-toggle label="Notifications push" />
<primitive-toggle label="Newsletter" [checked]="true" />
<primitive-toggle label="Mode marketing" [disabled]="true" />`,
    },
  ],
};
