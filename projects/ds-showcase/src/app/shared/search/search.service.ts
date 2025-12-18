import { Injectable, inject } from '@angular/core';
import { ComponentRegistry } from '../../registry/component.registry';
import { SearchResult } from '../../registry/types';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private registry = inject(ComponentRegistry);

  /** Pages de documentation statiques */
  private readonly docPages: SearchResult[] = [
    {
      id: 'doc-getting-started',
      label: 'Getting Started',
      type: 'documentation',
      path: '/docs/getting-started',
      icon: '🚀',
      description: 'Installation et configuration de DS-Angular',
    },
    {
      id: 'doc-tokens',
      label: 'Design Tokens',
      type: 'documentation',
      path: '/docs/tokens',
      icon: '🎨',
      description: 'Variables CSS et tokens du design system',
    },
    {
      id: 'doc-theming',
      label: 'Theming',
      type: 'documentation',
      path: '/docs/theming',
      icon: '🎭',
      description: 'Thèmes Light, Dark et Custom',
    },
    {
      id: 'doc-accessibility',
      label: 'Accessibility',
      type: 'documentation',
      path: '/docs/accessibility',
      icon: '♿',
      description: 'WCAG 2.1 AA, navigation clavier, ARIA',
    },
    {
      id: 'doc-forms-patterns',
      label: 'Forms Patterns',
      type: 'documentation',
      path: '/docs/forms-patterns',
      icon: '📝',
      description: 'Patterns de formulaires réactifs',
    },
    {
      id: 'doc-navigation-patterns',
      label: 'Navigation Patterns',
      type: 'documentation',
      path: '/docs/navigation-patterns',
      icon: '🧭',
      description: 'Patterns de navigation et layout',
    },
    {
      id: 'doc-overlays-patterns',
      label: 'Overlays Patterns',
      type: 'documentation',
      path: '/docs/overlays-patterns',
      icon: '🪟',
      description: 'Patterns de modals, drawers, tooltips',
    },
    {
      id: 'doc-examples',
      label: 'Examples',
      type: 'documentation',
      path: '/docs/examples',
      icon: '💡',
      description: 'Exemples de compositions complètes',
    },
    {
      id: 'doc-contributing',
      label: 'Contributing',
      type: 'documentation',
      path: '/docs/contributing',
      icon: '🤝',
      description: 'Guide de contribution au projet',
    },
    {
      id: 'doc-migration',
      label: 'Migration',
      type: 'documentation',
      path: '/docs/migration',
      icon: '📦',
      description: 'Guide de migration entre versions',
    },
  ];

  /**
   * Recherche unifiée dans les composants et la documentation
   */
  search(query: string): SearchResult[] {
    if (!query || query.trim().length < 2) {
      return [];
    }

    const lowerQuery = query.toLowerCase().trim();
    const results: SearchResult[] = [];

    // Recherche dans les composants
    const components = this.registry.search(query);
    for (const comp of components) {
      results.push({
        id: comp.id,
        label: comp.name,
        type: 'component',
        path: `/components/${comp.category}/${comp.id}`,
        category: comp.category,
        description: comp.description,
        icon: this.getCategoryIcon(comp.category),
      });
    }

    // Recherche dans les pages de documentation
    for (const doc of this.docPages) {
      if (
        doc.label.toLowerCase().includes(lowerQuery) ||
        doc.description?.toLowerCase().includes(lowerQuery)
      ) {
        results.push(doc);
      }
    }

    // Trier : composants d'abord, puis documentation
    return results.sort((a, b) => {
      if (a.type === b.type) {
        return a.label.localeCompare(b.label);
      }
      return a.type === 'component' ? -1 : 1;
    });
  }

  /**
   * Retourne l'icône correspondant à une catégorie
   */
  private getCategoryIcon(category: string): string {
    const icons: Record<string, string> = {
      actions: '⚡',
      forms: '📝',
      navigation: '🧭',
      'data-display': '📊',
      feedback: '🔔',
      overlays: '🪟',
      layout: '📐',
    };
    return icons[category] || '📦';
  }
}
