// =============================================================================
// Types pour le Registry des composants
// =============================================================================

/** Catégories de composants */
export type ComponentCategory =
  | 'actions'
  | 'forms'
  | 'navigation'
  | 'display'
  | 'data'
  | 'data-display'
  | 'feedback'
  | 'overlays'
  | 'layout';

/** Types de contrôles pour les démos */
export type ControlType = 'boolean' | 'select' | 'text' | 'number' | 'color';

/** Configuration d'un contrôle */
export interface ControlConfig {
  name: string;
  type: ControlType;
  defaultValue: unknown;
  description?: string;
  options?: string[];    // Pour type 'select'
  min?: number;          // Pour type 'number'
  max?: number;
  step?: number;
}

/** Type de prop (input/output/model) */
export type PropKind = 'input' | 'output' | 'model';

/** Définition d'une prop de composant */
export interface PropDefinition {
  name: string;
  kind: PropKind;
  type: string;              // ex: "'primary' | 'secondary'"
  defaultValue?: string;     // ex: "'primary'"
  required?: boolean;
  description: string;
  deprecated?: boolean;
}

/** Configuration d'une démo */
export interface DemoConfig {
  id: string;
  name: string;
  description: string;
  controls: ControlConfig[];
  code: string;
}

/** Définition complète d'un composant */
export interface ComponentDefinition {
  id: string;
  name: string;
  selector: string;
  description: string;
  category: ComponentCategory;
  props: PropDefinition[];
  demos: DemoConfig[];
}

/** Item de navigation pour la sidebar */
export interface NavItem {
  id: string;
  label: string;
  icon?: string;
  path?: string;
  children?: NavItem[];
  expanded?: boolean;
}

/** Valeurs des contrôles d'une démo */
export type ControlValues = Record<string, unknown>;

/** Résultat de recherche globale */
export interface SearchResult {
  id: string;
  label: string;
  type: 'component' | 'documentation';
  path: string;
  category?: string;
  description?: string;
  icon?: string;
}
