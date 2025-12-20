import { ComponentDefinition } from '../types';
import { getExampleSources } from '../../../generated/examples-source.generated';

export const DsDrawerDefinition: ComponentDefinition = {
  id: 'ds-drawer',
  name: 'Drawer',
  selector: 'ds-drawer',
  category: 'overlays',
  description:
    "Panneau latéral overlay avec animation slide-in/out, focus trap et gestion clavier.",
  props: [
    {
      name: 'visible',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Contrôle la visibilité du drawer',
    },
    {
      name: 'position',
      kind: 'input',
      type: "'left' | 'right'",
      defaultValue: "'right'",
      description: 'Position du drawer',
    },
    {
      name: 'size',
      kind: 'input',
      type: "'sm' | 'md' | 'lg' | 'full'",
      defaultValue: "'md'",
      description: 'Taille du drawer',
    },
    {
      name: 'title',
      kind: 'input',
      type: 'string',
      description: 'Titre affiché dans le header',
    },
    {
      name: 'closable',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Affiche le bouton de fermeture',
    },
    {
      name: 'maskClosable',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Ferme le drawer au clic sur le backdrop',
    },
    {
      name: 'visibleChange',
      kind: 'output',
      type: 'EventEmitter<boolean>',
      description: 'Émis lors du changement de visibilité',
    },
    {
      name: 'closed',
      kind: 'output',
      type: 'EventEmitter<void>',
      description: 'Émis à la fermeture',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Drawer avec contrôles interactifs.',
      examplePath: 'ds-drawer/default',
      sources: getExampleSources('ds-drawer', 'default'),
      controls: [
        { name: 'position', type: 'select', defaultValue: 'right', options: ['left', 'right'] },
        { name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg', 'full'] },
        { name: 'closable', type: 'boolean', defaultValue: true },
      ],
      code: `<button (click)="isOpen = true">Ouvrir le drawer</button>

<ds-drawer
  [visible]="isOpen"
  [position]="position"
  [size]="size"
  title="Détails"
  (closed)="isOpen = false"
>
  <p>Contenu du drawer</p>
</ds-drawer>`,
    },
    {
      id: 'left',
      name: 'Left Position',
      description: 'Drawer à gauche.',
      controls: [],
      code: `<ds-drawer
  [visible]="isOpen"
  position="left"
  title="Menu"
>
  <nav>Navigation</nav>
</ds-drawer>`,
    },
    {
      id: 'with-footer',
      name: 'With Footer',
      description: 'Drawer avec header et footer personnalisés.',
      controls: [],
      code: `<ds-drawer [visible]="isOpen" title="Formulaire">
  <ng-template #footer>
    <button (click)="isOpen = false">Annuler</button>
    <button (click)="save()">Enregistrer</button>
  </ng-template>

  <form>
    <input placeholder="Nom" />
  </form>
</ds-drawer>`,
    },
    {
      id: 'full-width',
      name: 'Full Width',
      description: 'Drawer pleine largeur.',
      controls: [],
      code: `<ds-drawer
  [visible]="isOpen"
  size="full"
  title="Vue détaillée"
>
  <div class="full-content">...</div>
</ds-drawer>`,
    },
  ],
};
