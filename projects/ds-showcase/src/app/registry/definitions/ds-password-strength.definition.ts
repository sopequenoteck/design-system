import { ComponentDefinition } from '../types';
import { getExampleSources } from '../../../generated/examples-source.generated';

export const DsPasswordStrengthDefinition: ComponentDefinition = {
  id: 'ds-password-strength',
  name: 'Password Strength',
  selector: 'ds-password-strength',
  category: 'forms',
  description:
    'Indicateur de force de mot de passe avec barres visuelles et critères de validation détaillés.',
  props: [
    {
      name: 'password',
      kind: 'input',
      type: 'string',
      defaultValue: "''",
      description: 'Mot de passe à évaluer',
    },
    {
      name: 'minLength',
      kind: 'input',
      type: 'number',
      defaultValue: '8',
      description: 'Longueur minimale requise',
    },
    {
      name: 'showLabel',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Afficher le label textuel (Faible, Moyen, Fort)',
    },
    {
      name: 'showCriteria',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Afficher les critères détaillés',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille du composant',
    },
    {
      name: 'strengthChange',
      kind: 'output',
      type: "EventEmitter<'none' | 'weak' | 'medium' | 'strong'>",
      description: 'Émis lors du changement de force',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Password strength avec contrôles interactifs.',
      examplePath: 'ds-password-strength/default',
      sources: getExampleSources('ds-password-strength', 'default'),
      controls: [
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
        { name: 'showLabel', type: 'boolean', defaultValue: true },
        { name: 'showCriteria', type: 'boolean', defaultValue: false },
      ],
      code: `<ds-password-strength
  [password]="password"
  [size]="size"
  [showLabel]="showLabel"
  [showCriteria]="showCriteria"
/>`,
    },
    {
      id: 'with-criteria',
      name: 'With Criteria',
      description: 'Affichage des critères de validation.',
      controls: [],
      code: `<ds-password-strength
  [password]="password"
  [showCriteria]="true"
/>`,
    },
    {
      id: 'custom-min-length',
      name: 'Custom Min Length',
      description: 'Longueur minimale personnalisée (12 caractères).',
      controls: [],
      code: `<ds-password-strength
  [password]="password"
  [minLength]="12"
/>`,
    },
    {
      id: 'all-states',
      name: 'All States',
      description: 'Démonstration des différents niveaux de force.',
      controls: [],
      code: `<!-- None -->
<ds-password-strength [password]="''" />

<!-- Weak -->
<ds-password-strength [password]="'abc'" />

<!-- Medium -->
<ds-password-strength [password]="'Password1'" />

<!-- Strong -->
<ds-password-strength [password]="'Password1!'" />`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Les trois tailles disponibles.',
      controls: [],
      code: `<ds-password-strength [password]="'Test123!'" size="sm" />
<ds-password-strength [password]="'Test123!'" size="md" />
<ds-password-strength [password]="'Test123!'" size="lg" />`,
    },
  ],
};
