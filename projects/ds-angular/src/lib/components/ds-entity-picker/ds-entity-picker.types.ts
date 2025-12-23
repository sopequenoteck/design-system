import { IconDefinition } from '@fortawesome/angular-fontawesome';

/**
 * Option pour le ds-entity-picker
 * Supporte les entités riches avec icône, couleur, emoji
 */
export interface DsEntityOption {
  /** Identifiant unique de l'option */
  value: string;
  /** Texte affiché */
  label: string;
  /** Description secondaire (optionnel) */
  description?: string;
  /** Icône FontAwesome (optionnel) */
  icon?: IconDefinition;
  /** Emoji affiché à gauche (optionnel) */
  emoji?: string;
  /** Couleur hex ou CSS (optionnel) */
  color?: string;
  /** Option désactivée */
  disabled?: boolean;
  /** Données custom attachées */
  data?: unknown;
}

/** Tailles disponibles */
export type DsEntityPickerSize = 'sm' | 'md' | 'lg';

/** Mode d'affichage des sélections multiples */
export type DsEntityPickerDisplayMode = 'chip' | 'count';
