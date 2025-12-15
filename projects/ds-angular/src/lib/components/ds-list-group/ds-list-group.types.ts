/**
 * Variantes disponibles pour DsListGroup
 * - default: header simple sans interaction
 * - collapsible: header cliquable pour expand/collapse
 */
export type ListGroupVariant = 'default' | 'collapsible';

/**
 * Événement émis lors du toggle expand/collapse
 */
export interface ListGroupToggleEvent {
  /** Nouvel état expanded */
  expanded: boolean;
}
