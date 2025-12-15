import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

// =============================================================================
// DS-CHECKBOX-LIST — Types et Interfaces
// =============================================================================

/**
 * Taille du composant CheckboxList
 */
export type CheckboxListSize = 'sm' | 'md' | 'lg';

/**
 * Item de la liste de checkboxes.
 * Supporte icône FontAwesome OU emoji.
 */
export interface CheckboxListItem {
  /** Identifiant unique de l'item */
  id: string | number;

  /** Label affiché */
  label: string;

  /** Icône FontAwesome (mutually exclusive avec emoji) */
  icon?: IconDefinition;

  /** Emoji affiché à la place de l'icône */
  emoji?: string;

  /** État coché de l'item */
  checked: boolean;

  /** Item désactivé */
  disabled?: boolean;

  /** Texte d'aide affiché sous l'item */
  helper?: string;

  /** Données personnalisées attachées à l'item */
  data?: unknown;
}

/**
 * Événement émis lors du changement d'état d'un item.
 */
export interface CheckboxListItemChangeEvent {
  /** Item modifié */
  item: CheckboxListItem;

  /** Nouvel état coché */
  checked: boolean;

  /** Index de l'item dans la liste */
  index: number;
}

/**
 * Événement émis lors du changement global (tous les items).
 */
export interface CheckboxListChangeEvent {
  /** Liste complète des items avec leur état */
  items: CheckboxListItem[];

  /** IDs des items cochés */
  checkedIds: (string | number)[];
}
