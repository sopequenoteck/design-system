import { ComponentDefinition } from '../types';

export const DsTransferDefinition: ComponentDefinition = {
  id: 'ds-transfer',
  name: 'Transfer',
  category: 'forms',
  description: 'Composant de transfert d\'items entre deux listes avec recherche et sélection multiple.',
  selector: 'ds-transfer',
  props: [
    { name: 'source', kind: 'input', type: 'TransferItem[]', defaultValue: '[]', description: 'Items de la liste source' },
    { name: 'target', kind: 'input', type: 'TransferItem[]', defaultValue: '[]', description: 'Items de la liste cible' },
    { name: 'sourceTitle', kind: 'input', type: 'string', defaultValue: "'Source'", description: 'Titre de la liste source' },
    { name: 'targetTitle', kind: 'input', type: 'string', defaultValue: "'Target'", description: 'Titre de la liste cible' },
    { name: 'showSearch', kind: 'input', type: 'boolean', defaultValue: 'true', description: 'Afficher les champs de recherche' },
    { name: 'showSelectAll', kind: 'input', type: 'boolean', defaultValue: 'true', description: 'Afficher les boutons "Tout sélectionner"' },
    { name: 'disabled', kind: 'input', type: 'boolean', defaultValue: 'false', description: 'Désactive les interactions' },
    { name: 'size', kind: 'input', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Taille du composant' },
    { name: 'transferChange', kind: 'output', type: 'EventEmitter<TransferChangeEvent>', description: 'Émis lors d\'un transfert' },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Transfer basique avec recherche.',
      controls: [],
      code: `<ds-transfer
  [source]="sourceItems"
  [target]="targetItems"
  sourceTitle="Disponibles"
  targetTitle="Sélectionnés"
  (transferChange)="onTransfer($event)" />`,
    },
    {
      id: 'without-search',
      name: 'Without Search',
      description: 'Transfer sans barre de recherche.',
      controls: [],
      code: `<ds-transfer
  [source]="sourceItems"
  [target]="targetItems"
  [showSearch]="false" />`,
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Différentes tailles.',
      controls: [],
      code: `<ds-transfer size="sm" [source]="items" />
<ds-transfer size="md" [source]="items" />
<ds-transfer size="lg" [source]="items" />`,
    },
    {
      id: 'disabled',
      name: 'Disabled',
      description: 'État désactivé.',
      controls: [],
      code: `<ds-transfer [disabled]="true" [source]="items" [target]="selected" />`,
    },
  ],
};
