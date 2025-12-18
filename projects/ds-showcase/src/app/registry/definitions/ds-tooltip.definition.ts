import { ComponentDefinition } from '../types';

export const DsTooltipDefinition: ComponentDefinition = {
  id: 'ds-tooltip',
  name: 'Tooltip',
  selector: '[dsTooltip]',
  category: 'overlays',
  description:
    "Directive pour afficher une infobulle au survol ou au focus. Positionnement automatique CDK.",
  props: [
    {
      name: 'dsTooltip',
      kind: 'input',
      type: 'string',
      description: 'Texte du tooltip (requis)',
      required: true,
    },
  ],
  demos: [
    {
      id: 'default',
      name: 'Default',
      description: 'Tooltip basique au survol.',
      controls: [],
      code: `<button dsTooltip="Cliquez pour enregistrer">
  Enregistrer
</button>`,
    },
    {
      id: 'on-icons',
      name: 'On Icons',
      description: 'Tooltip sur des icônes.',
      controls: [],
      code: `<button dsTooltip="Modifier">
  <fa-icon [icon]="faEdit" />
</button>

<button dsTooltip="Supprimer">
  <fa-icon [icon]="faTrash" />
</button>

<button dsTooltip="Télécharger">
  <fa-icon [icon]="faDownload" />
</button>`,
    },
    {
      id: 'on-disabled',
      name: 'On Disabled Elements',
      description: 'Tooltip sur éléments désactivés (wrapper requis).',
      controls: [],
      code: `<!-- Wrapper car les éléments disabled ne reçoivent pas les events -->
<span dsTooltip="Cette action n'est pas disponible">
  <button disabled>Action indisponible</button>
</span>`,
    },
    {
      id: 'long-text',
      name: 'Long Text',
      description: 'Tooltip avec texte long.',
      controls: [],
      code: `<button dsTooltip="Cette action va exporter toutes les données au format CSV. Le fichier sera téléchargé automatiquement.">
  Exporter
</button>`,
    },
  ],
};
