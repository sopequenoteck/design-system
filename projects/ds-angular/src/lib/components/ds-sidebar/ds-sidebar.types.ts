import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/**
 * Mode d'affichage de la sidebar.
 * - `full` : largeur complète avec labels
 * - `collapsed` : icônes seulement avec tooltips
 * - `overlay` : panneau glissant avec backdrop (mobile)
 */
export type SidebarMode = 'full' | 'collapsed' | 'overlay';

/**
 * Taille de la sidebar (largeur).
 * - `sm` : 200px
 * - `md` : 240px
 * - `lg` : 280px
 */
export type SidebarSize = 'sm' | 'md' | 'lg';

/**
 * Position de la sidebar.
 */
export type SidebarPosition = 'left' | 'right';

/**
 * Trigger pour ouvrir le popover en mode collapsed.
 * - `hover` : Ouvre au survol de la souris
 * - `click` : Ouvre au clic
 */
export type SidebarCollapsedTrigger = 'hover' | 'click';

/**
 * Variante de couleur pour les badges.
 */
export type SidebarBadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';

/**
 * Item de navigation dans la sidebar.
 */
export interface SidebarItem {
  /** Identifiant unique de l'item */
  id: string | number;

  /** Label affiché */
  label: string;

  /** Icône FontAwesome */
  icon?: IconDefinition;

  /** Route Angular (routerLink) */
  routerLink?: string | string[];

  /** Options pour routerLinkActive */
  routerLinkActiveOptions?: { exact: boolean };

  /** Lien href classique */
  href?: string;

  /** Ouvre dans un nouvel onglet (pour href) */
  external?: boolean;

  /** Items enfants (sous-menu) */
  children?: SidebarItem[];

  /** Item désactivé */
  disabled?: boolean;

  /** État initial d'expansion (pour items avec children) */
  expanded?: boolean;

  /** Badge/compteur affiché */
  badge?: string | number;

  /** Variante de couleur du badge */
  badgeVariant?: SidebarBadgeVariant;

  /** Affiche un séparateur après cet item */
  dividerAfter?: boolean;

  /** Données personnalisées attachées à l'item */
  data?: unknown;
}

/**
 * Événement émis lors du clic sur un item.
 */
export interface SidebarItemClickEvent {
  /** Item cliqué */
  item: SidebarItem;
  /** Événement souris original */
  event: MouseEvent;
}

/**
 * Événement émis lors de l'expansion/collapse d'un item.
 */
export interface SidebarItemExpandEvent {
  /** Item concerné */
  item: SidebarItem;
  /** Nouvel état d'expansion */
  expanded: boolean;
}

/**
 * Item aplati pour la navigation clavier.
 */
export interface FlattenedSidebarItem {
  /** Item original */
  item: SidebarItem;
  /** Niveau d'imbrication (0 = racine) */
  level: number;
  /** Index dans la liste aplatie */
  flatIndex: number;
  /** ID du parent (null si racine) */
  parentId: string | number | null;
}
