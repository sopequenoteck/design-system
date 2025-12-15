/**
 * Tailles disponibles pour DsListItem
 */
export type ListItemSize = 'sm' | 'md' | 'lg';

/**
 * Types d'indicateur visuel (barre/dot à gauche)
 * - none: pas d'indicateur
 * - priority: barre verticale colorée (style TickTick)
 * - dot: point coloré
 * - status: point coloré (alias de dot)
 */
export type ListItemIndicator = 'none' | 'priority' | 'dot' | 'status';

/**
 * Couleurs prédéfinies pour l'indicateur
 */
export type ListItemIndicatorColor =
  | 'high'
  | 'medium'
  | 'low'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

/**
 * Événement émis lors du clic sur l'item
 */
export interface ListItemClickEvent {
  event: MouseEvent | KeyboardEvent;
}

/**
 * Événement émis lors du changement de la checkbox
 */
export interface ListItemCheckEvent {
  checked: boolean;
}
