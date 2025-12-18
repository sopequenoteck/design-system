import { ComponentDefinition } from '../types';

export const DsCarouselDefinition: ComponentDefinition = {
  id: 'ds-carousel',
  name: 'Carousel',
  selector: 'ds-carousel',
  category: 'data-display',
  description:
    "Composant carousel pour afficher une série d'images ou de contenus avec navigation, autoplay et support tactile.",
  props: [
    {
      name: 'slides',
      kind: 'input',
      type: 'CarouselSlide[]',
      defaultValue: '[]',
      description: 'Liste des slides à afficher',
    },
    {
      name: 'autoplay',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Activer le défilement automatique',
    },
    {
      name: 'autoplaySpeed',
      kind: 'input',
      type: 'number',
      defaultValue: '3000',
      description: 'Vitesse du défilement automatique (ms)',
    },
    {
      name: 'effect',
      kind: 'input',
      type: "'slide' | 'fade'",
      defaultValue: "'slide'",
      description: 'Effet de transition entre slides',
    },
    {
      name: 'dots',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Afficher les indicateurs de pagination',
    },
    {
      name: 'dotsPosition',
      kind: 'input',
      type: "'bottom' | 'top' | 'left' | 'right'",
      defaultValue: "'bottom'",
      description: 'Position des indicateurs',
    },
    {
      name: 'arrows',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Afficher les flèches de navigation',
    },
    {
      name: 'infinite',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Activer le défilement infini',
    },
    {
      name: 'pauseOnHover',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: "Pause de l'autoplay au survol",
    },
    {
      name: 'activeIndex',
      kind: 'input',
      type: 'number',
      defaultValue: '0',
      description: 'Index du slide actif',
    },
    {
      name: 'slideChange',
      kind: 'output',
      type: 'EventEmitter<{ index: number; slide: CarouselSlide }>',
      description: 'Émis lors du changement de slide',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Carousel avec contrôles interactifs.',
      controls: [
        { name: 'effect', type: 'select', defaultValue: 'slide', options: ['slide', 'fade'] },
        { name: 'autoplay', type: 'boolean', defaultValue: false },
        { name: 'dots', type: 'boolean', defaultValue: true },
        { name: 'arrows', type: 'boolean', defaultValue: true },
        { name: 'infinite', type: 'boolean', defaultValue: true },
      ],
      code: `<ds-carousel
  [slides]="slides"
  [effect]="effect"
  [autoplay]="autoplay"
  [dots]="dots"
  [arrows]="arrows"
  [infinite]="infinite"
/>`,
    },
    {
      id: 'autoplay',
      name: 'Autoplay',
      description: 'Carousel avec défilement automatique.',
      controls: [],
      code: `<ds-carousel
  [slides]="slides"
  [autoplay]="true"
  [autoplaySpeed]="3000"
  [pauseOnHover]="true"
/>`,
    },
    {
      id: 'fade-effect',
      name: 'Fade Effect',
      description: 'Transition en fondu.',
      controls: [],
      code: `<ds-carousel
  [slides]="slides"
  effect="fade"
/>`,
    },
    {
      id: 'custom-dots',
      name: 'Custom Dots Position',
      description: 'Position personnalisée des indicateurs.',
      controls: [],
      code: `<ds-carousel
  [slides]="slides"
  dotsPosition="top"
/>`,
    },
    {
      id: 'no-navigation',
      name: 'Without Navigation',
      description: 'Carousel sans flèches ni dots.',
      controls: [],
      code: `<ds-carousel
  [slides]="slides"
  [arrows]="false"
  [dots]="false"
  [autoplay]="true"
/>`,
    },
  ],
};
