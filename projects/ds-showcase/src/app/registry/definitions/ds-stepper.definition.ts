import { ComponentDefinition } from '../types';

export const DsStepperDefinition: ComponentDefinition = {
  id: 'ds-stepper',
  name: 'Stepper',
  selector: 'ds-stepper',
  category: 'navigation',
  description:
    "Composant de stepper pour guider l'utilisateur à travers un processus multi-étapes.",
  props: [
    {
      name: 'steps',
      kind: 'input',
      type: 'Step[]',
      description: 'Liste des étapes (requis)',
      required: true,
    },
    {
      name: 'activeStep',
      kind: 'input',
      type: 'number',
      defaultValue: '0',
      description: "Index de l'étape active (0-indexed)",
    },
    {
      name: 'orientation',
      kind: 'input',
      type: "'horizontal' | 'vertical'",
      defaultValue: "'horizontal'",
      description: 'Orientation du stepper',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: 'Taille du stepper',
    },
    {
      name: 'clickable',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Permettre la navigation par clic',
    },
    {
      name: 'linear',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Navigation linéaire obligatoire',
    },
    {
      name: 'showDescriptions',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Afficher les descriptions',
    },
    {
      name: 'stepChange',
      kind: 'output',
      type: 'EventEmitter<StepChangeEvent>',
      description: "Émis lors du changement d'étape",
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Stepper avec contrôles interactifs.',
      controls: [
        { name: 'orientation', type: 'select', defaultValue: 'horizontal', options: ['horizontal', 'vertical'] },
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
        { name: 'clickable', type: 'boolean', defaultValue: true },
        { name: 'linear', type: 'boolean', defaultValue: false },
      ],
      code: `<ds-stepper
  [steps]="steps"
  [activeStep]="activeStep"
  [orientation]="orientation"
  [size]="size"
  [clickable]="clickable"
  [linear]="linear"
  (stepChange)="onStepChange($event)"
/>`,
    },
    {
      id: 'vertical',
      name: 'Vertical',
      description: 'Stepper en mode vertical.',
      controls: [],
      code: `<ds-stepper
  [steps]="steps"
  [activeStep]="1"
  orientation="vertical"
/>`,
    },
    {
      id: 'linear',
      name: 'Linear',
      description: 'Navigation linéaire obligatoire.',
      controls: [],
      code: `<ds-stepper
  [steps]="steps"
  [activeStep]="0"
  [linear]="true"
/>`,
    },
    {
      id: 'with-error',
      name: 'With Error',
      description: 'Étape avec état erreur.',
      controls: [],
      code: `<ds-stepper
  [steps]="stepsWithError"
  [activeStep]="2"
/>

// stepsWithError = [
//   { label: 'Step 1', state: 'completed' },
//   { label: 'Step 2', state: 'error' },
//   { label: 'Step 3' },
// ]`,
    },
  ],
};
