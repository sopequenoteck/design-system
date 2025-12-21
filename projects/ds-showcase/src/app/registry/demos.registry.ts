/**
 * Registre des démos - Mapping composants → démos
 */

export interface DemoInfo {
  id: string;
  label: string;
  path: string;
  category: 'forms' | 'navigation' | 'data' | 'feedback';
}

/**
 * Liste des démos disponibles
 */
export const DEMOS: DemoInfo[] = [
  // Forms
  { id: 'login', label: 'Login', path: '/demos/forms/login', category: 'forms' },
  { id: 'contact', label: 'Contact', path: '/demos/forms/contact', category: 'forms' },
  { id: 'settings', label: 'Settings', path: '/demos/forms/settings', category: 'forms' },
  // Navigation
  { id: 'sidebar-layout', label: 'Sidebar Layout', path: '/demos/navigation/sidebar-layout', category: 'navigation' },
  { id: 'header', label: 'Header', path: '/demos/navigation/header', category: 'navigation' },
  // Data
  { id: 'dashboard', label: 'Dashboard', path: '/demos/data/dashboard', category: 'data' },
  { id: 'table-advanced', label: 'Table Advanced', path: '/demos/data/table-advanced', category: 'data' },
  { id: 'cards-grid', label: 'Cards Grid', path: '/demos/data/cards-grid', category: 'data' },
  // Feedback
  { id: 'notifications', label: 'Notifications', path: '/demos/feedback/notifications', category: 'feedback' },
  { id: 'loading-states', label: 'Loading States', path: '/demos/feedback/loading-states', category: 'feedback' },
];

/**
 * Mapping composant ID → démos qui l'utilisent
 */
export const COMPONENT_TO_DEMOS: Record<string, string[]> = {
  // Actions
  'ds-button': ['login', 'contact', 'settings', 'sidebar-layout', 'header', 'table-advanced', 'cards-grid', 'notifications', 'loading-states'],

  // Forms - Text inputs
  'ds-input-field': ['login', 'contact', 'settings'],
  'ds-input-textarea': ['contact'],
  'ds-search-input': ['table-advanced'],

  // Forms - Selection
  'ds-checkbox': ['login'],
  'ds-toggle': ['settings'],
  'ds-select': ['settings'],

  // Data Display
  'ds-card': ['login', 'contact', 'settings', 'dashboard', 'cards-grid', 'loading-states'],
  'ds-avatar': ['header', 'cards-grid'],
  'ds-badge': ['dashboard', 'table-advanced', 'cards-grid'],
  'ds-table': ['table-advanced'],

  // Navigation
  'ds-sidebar': ['sidebar-layout'],
  'ds-nav-list': ['sidebar-layout'],
  'ds-pagination': ['table-advanced'],
  'ds-dropdown': ['header'],

  // Feedback
  'ds-alert': ['notifications'],
  'ds-toast': ['notifications'],
  'ds-notification': ['notifications'],
  'ds-progress-bar': ['dashboard', 'loading-states'],
  'ds-skeleton': ['loading-states'],

  // Layout
  'ds-divider': ['login', 'settings'],
};

/**
 * Récupère les démos qui utilisent un composant
 */
export function getDemosForComponent(componentId: string): DemoInfo[] {
  const demoIds = COMPONENT_TO_DEMOS[componentId] || [];
  return DEMOS.filter(demo => demoIds.includes(demo.id));
}
