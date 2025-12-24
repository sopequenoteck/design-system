import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

// =============================================================================
// DS-NAV-LIST — Types et Interfaces
// =============================================================================

/**
 * Taille du composant NavList
 */
export type NavListSize = 'sm' | 'md' | 'lg';

/**
 * Variante de couleur pour les badges
 */
export type NavListBadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';

/**
 * Item de navigation dans la liste.
 * Supporte icône FontAwesome OU emoji, badge compteur, et indicateur coloré.
 */
export interface NavListItem {
  /** Identifiant unique de l'item */
  id: string | number;

  /** Label affiché */
  label: string;

  /** Icône FontAwesome (mutually exclusive avec emoji) */
  icon?: IconDefinition;

  /** Emoji affiché à la place de l'icône */
  emoji?: string;

  /** Badge compteur ou texte */
  badge?: number | string;

  /** Variante de couleur du badge */
  badgeVariant?: NavListBadgeVariant;

  /** Couleur de l'indicateur dot (ex: "#3b82f6") */
  dotColor?: string;

  /** Item désactivé */
  disabled?: boolean;

  /** Données personnalisées attachées à l'item */
  data?: unknown;
}

/**
 * Action dans le header d'un groupe (bouton icône).
 */
export interface NavListHeaderAction {
  /** Icône FontAwesome du bouton */
  icon: IconDefinition;

  /** Label d'accessibilité (aria-label) */
  ariaLabel: string;

  /** Tooltip au survol */
  tooltip?: string;
}

/**
 * Groupe d'items avec titre optionnel.
 * Permet d'organiser les items en sections (Sources, Filtres, etc.)
 */
export interface NavListGroup {
  /** Identifiant unique du groupe */
  id: string;

  /** Titre de la section (affiché comme divider) */
  title?: string;

  /** Items du groupe */
  items: NavListItem[];

  /** Groupe repliable */
  collapsible?: boolean;

  /** État initial replié (si collapsible) */
  collapsed?: boolean;

  /** Action dans le header (bouton icône) */
  headerAction?: NavListHeaderAction;
}

/**
 * Événement émis lors du clic sur un item.
 */
export interface NavListItemClickEvent {
  /** Item cliqué */
  item: NavListItem;

  /** Groupe contenant l'item */
  group: NavListGroup;

  /** Événement souris original */
  event: MouseEvent;
}

/**
 * Événement émis lors du toggle d'un groupe (collapse/expand).
 */
export interface NavListGroupToggleEvent {
  /** Groupe concerné */
  group: NavListGroup;

  /** Nouvel état (true = collapsed) */
  collapsed: boolean;
}

/**
 * Événement émis lors du clic sur l'action d'un groupe.
 */
export interface NavListGroupActionEvent {
  /** Groupe concerné */
  group: NavListGroup;

  /** Événement souris original */
  event: MouseEvent;
}
