import { ComponentDefinition } from '../types';

export const DsContainerDefinition: ComponentDefinition = {
  id: 'ds-container',
  name: 'Container',
  category: 'layout',
  description: 'Conteneur responsive avec max-width configurable et centrage automatique.',
  selector: 'ds-container',
  props: [
    { name: 'maxWidth', kind: 'input', type: "'fluid' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'", defaultValue: "'lg'", description: 'Largeur maximale du conteneur' },
    { name: 'center', kind: 'input', type: 'boolean', defaultValue: 'true', description: 'Centrer le conteneur horizontalement' },
    { name: 'gutter', kind: 'input', type: "'none' | 'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Padding horizontal (gutter)' },
    { name: 'paddingY', kind: 'input', type: "'none' | 'sm' | 'md' | 'lg'", defaultValue: "'none'", description: 'Padding vertical' },
    { name: 'customClass', kind: 'input', type: 'string', defaultValue: "''", description: 'Classe CSS additionnelle' },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Conteneur avec largeur par défaut (lg = 960px).',
      controls: [],
      code: `<ds-container>
  <p>Contenu centré avec max-width 960px</p>
</ds-container>`,
    },
    {
      id: 'max-widths',
      name: 'Max Widths',
      description: 'Différentes largeurs maximales.',
      controls: [],
      code: `<ds-container maxWidth="sm">540px</ds-container>
<ds-container maxWidth="md">720px</ds-container>
<ds-container maxWidth="lg">960px</ds-container>
<ds-container maxWidth="xl">1140px</ds-container>
<ds-container maxWidth="2xl">1320px</ds-container>
<ds-container maxWidth="fluid">100%</ds-container>`,
    },
    {
      id: 'gutters',
      name: 'Gutters',
      description: 'Différents paddings horizontaux.',
      controls: [],
      code: `<ds-container gutter="none">Pas de gutter</ds-container>
<ds-container gutter="sm">Gutter 16px</ds-container>
<ds-container gutter="md">Gutter 24px</ds-container>
<ds-container gutter="lg">Gutter 32px</ds-container>`,
    },
  ],
};
