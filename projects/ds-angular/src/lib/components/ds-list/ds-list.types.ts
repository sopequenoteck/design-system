import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/**
 * Variantes visuelles disponibles pour DsList
 * - default: liste simple sans séparateurs
 * - divided: liste avec séparateurs entre les items
 * - card: liste dans un conteneur card avec bordure
 */
export type ListVariant = 'default' | 'divided' | 'card';

/**
 * Tailles disponibles pour DsList
 */
export type ListSize = 'sm' | 'md' | 'lg';

/**
 * Événement émis lors d'un drag & drop
 */
export interface ListDragEvent<T = unknown> {
  /** L'élément déplacé */
  item: T;
  /** Index avant le déplacement */
  previousIndex: number;
  /** Index après le déplacement */
  currentIndex: number;
}

/**
 * Événement émis lors d'un changement de sélection
 */
export interface ListSelectionChangeEvent<T = unknown> {
  /** Éléments sélectionnés */
  selected: T[];
}

/**
 * Configuration de l'état vide
 */
export interface ListEmptyConfig {
  /** Titre affiché */
  title: string;
  /** Description optionnelle */
  description?: string;
  /** Icône optionnelle */
  icon?: IconDefinition;
}
