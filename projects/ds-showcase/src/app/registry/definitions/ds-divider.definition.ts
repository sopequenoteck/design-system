import { ComponentDefinition } from '../types';
import { getExampleSources } from '../../../generated/examples-source.generated';

export const DsDividerDefinition: ComponentDefinition = {
  id: 'ds-divider',
  name: 'Divider',
  category: 'layout',
  description: 'Séparateur visuel horizontal ou vertical avec label optionnel.',
  selector: 'ds-divider',
  props: [
    { name: 'orientation', kind: 'input', type: "'horizontal' | 'vertical'", defaultValue: "'horizontal'", description: 'Orientation du séparateur' },
    { name: 'variant', kind: 'input', type: "'solid' | 'dashed' | 'dotted'", defaultValue: "'solid'", description: 'Variante visuelle de la ligne' },
    { name: 'size', kind: 'input', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Épaisseur du séparateur' },
    { name: 'labelPosition', kind: 'input', type: "'left' | 'center' | 'right'", defaultValue: "'center'", description: 'Position du label (horizontal uniquement)' },
    { name: 'spacing', kind: 'input', type: "'none' | 'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Marge autour du divider' },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Divider horizontal basique.',
      examplePath: 'ds-divider/default',
      sources: getExampleSources('ds-divider', 'default'),
      controls: [],
      code: `<ds-divider />`,
    },
    {
      id: 'with-label',
      name: 'With Label',
      description: 'Divider avec texte central.',
      controls: [],
      code: `<ds-divider>Section suivante</ds-divider>`,
    },
    {
      id: 'variants',
      name: 'Variants',
      description: 'Différentes variantes visuelles.',
      controls: [],
      code: `<ds-divider variant="solid" />
<ds-divider variant="dashed" />
<ds-divider variant="dotted" />`,
    },
    {
      id: 'vertical',
      name: 'Vertical',
      description: 'Divider vertical.',
      controls: [],
      code: `<div style="display: flex; height: 100px; align-items: center;">
  <span>Gauche</span>
  <ds-divider orientation="vertical" />
  <span>Droite</span>
</div>`,
    },
    {
      id: 'label-positions',
      name: 'Label Positions',
      description: 'Différentes positions du label.',
      controls: [],
      code: `<ds-divider labelPosition="left">Gauche</ds-divider>
<ds-divider labelPosition="center">Centre</ds-divider>
<ds-divider labelPosition="right">Droite</ds-divider>`,
    },
  ],
};
