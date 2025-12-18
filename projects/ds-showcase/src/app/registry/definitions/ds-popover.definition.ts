import { ComponentDefinition } from '../types';

export const DsPopoverDefinition: ComponentDefinition = {
  id: 'ds-popover',
  name: 'Popover',
  selector: '[dsPopover]',
  category: 'overlays',
  description:
    "Directive pour afficher un popover flottant positionné automatiquement. Supporte click et hover.",
  props: [
    {
      name: 'dsPopover',
      kind: 'input',
      type: 'TemplateRef<unknown>',
      description: 'Template contenant le contenu du popover (requis)',
      required: true,
    },
    {
      name: 'dsPopoverTrigger',
      kind: 'input',
      type: "'click' | 'hover'",
      defaultValue: "'click'",
      description: 'Mode de déclenchement',
    },
    {
      name: 'dsPopoverCloseOnBackdrop',
      kind: 'input',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Ferme le popover au clic extérieur',
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Popover au clic.',
      controls: [
        { name: 'dsPopoverTrigger', type: 'select', defaultValue: 'click', options: ['click', 'hover'] },
        { name: 'dsPopoverCloseOnBackdrop', type: 'boolean', defaultValue: true },
      ],
      code: `<ng-template #popoverContent>
  <ds-popover header="Informations">
    <p>Contenu du popover</p>
  </ds-popover>
</ng-template>

<button [dsPopover]="popoverContent">
  Ouvrir le popover
</button>`,
    },
    {
      id: 'hover',
      name: 'Hover Trigger',
      description: 'Popover au survol.',
      controls: [],
      code: `<ng-template #hoverContent>
  <ds-popover header="Aide">
    <p>Information contextuelle</p>
  </ds-popover>
</ng-template>

<button [dsPopover]="hoverContent" dsPopoverTrigger="hover">
  Survoler pour aide
</button>`,
    },
    {
      id: 'persistent',
      name: 'Persistent',
      description: 'Popover sans fermeture au clic extérieur.',
      controls: [],
      code: `<ng-template #persistentContent>
  <ds-popover header="Actions">
    <button (click)="action1()">Action 1</button>
    <button (click)="action2()">Action 2</button>
  </ds-popover>
</ng-template>

<button
  [dsPopover]="persistentContent"
  [dsPopoverCloseOnBackdrop]="false"
>
  Menu persistant
</button>`,
    },
    {
      id: 'with-form',
      name: 'With Form',
      description: 'Popover avec formulaire.',
      controls: [],
      code: `<ng-template #formContent>
  <ds-popover header="Filtre rapide">
    <form (submit)="applyFilter()">
      <input placeholder="Rechercher..." />
      <button type="submit">Appliquer</button>
    </form>
  </ds-popover>
</ng-template>

<button [dsPopover]="formContent">
  Filtrer
</button>`,
    },
  ],
};
