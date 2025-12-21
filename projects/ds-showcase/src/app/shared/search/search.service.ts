import { Injectable, inject } from '@angular/core';
import { ComponentRegistry } from '../../registry/component.registry';
import { SearchResult } from '../../registry/types';
import { DEMOS } from '../../registry/demos.registry';

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
  ];

  /** Démos disponibles */
  private readonly demoPages: SearchResult[] = DEMOS.map(demo => ({
    id: `demo-${demo.id}`,
    label: demo.label,
    type: 'demo' as const,
    path: demo.path,
    icon: this.getDemoCategoryIcon(demo.category),
    category: demo.category,
    description: this.getDemoDescription(demo.id),
  }));

  /**
   * Recherche unifiée dans les composants, démos et documentation
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

    // Recherche dans les démos
    for (const demo of this.demoPages) {
      if (
        demo.label.toLowerCase().includes(lowerQuery) ||
        demo.description?.toLowerCase().includes(lowerQuery) ||
        demo.category?.toLowerCase().includes(lowerQuery)
      ) {
        results.push(demo);
      }
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

    // Trier : composants d'abord, puis démos, puis documentation
    return results.sort((a, b) => {
      const typeOrder = { component: 0, demo: 1, documentation: 2 };
      const orderA = typeOrder[a.type as keyof typeof typeOrder] ?? 3;
      const orderB = typeOrder[b.type as keyof typeof typeOrder] ?? 3;
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      return a.label.localeCompare(b.label);
    });
  }

  /**
   * Retourne l'icône correspondant à une catégorie de composant
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

  /**
   * Retourne l'icône correspondant à une catégorie de démo
   */
  private getDemoCategoryIcon(category: string): string {
    const icons: Record<string, string> = {
      forms: '📝',
      navigation: '🧭',
      data: '📊',
      feedback: '🔔',
    };
    return icons[category] || '💡';
  }

  /**
   * Retourne la description d'une démo
   */
  private getDemoDescription(demoId: string): string {
    const descriptions: Record<string, string> = {
      'login': 'Formulaire de connexion complet',
      'contact': 'Formulaire de contact',
      'settings': 'Page de paramètres utilisateur',
      'sidebar-layout': 'Layout avec sidebar de navigation',
      'header': 'En-tête d\'application',
      'dashboard': 'Tableau de bord avec métriques',
      'table-advanced': 'Table avec recherche et pagination',
      'cards-grid': 'Grille de cartes',
      'notifications': 'Alertes et toasts',
      'loading-states': 'États de chargement',
    };
    return descriptions[demoId] || 'Démo interactive';
  }
}
