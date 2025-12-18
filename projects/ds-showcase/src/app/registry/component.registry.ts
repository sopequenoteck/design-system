import { Injectable } from '@angular/core';
import { ComponentDefinition, ComponentCategory, NavItem } from './types';

@Injectable({ providedIn: 'root' })
export class ComponentRegistry {
  private definitions = new Map<string, ComponentDefinition>();

  /**
   * Enregistre une définition de composant
   */
  register(definition: ComponentDefinition): void {
    this.definitions.set(definition.id, definition);
  }

  /**
   * Enregistre plusieurs définitions
   */
  registerAll(definitions: ComponentDefinition[]): void {
    definitions.forEach(def => this.register(def));
  }

  /**
   * Récupère une définition par son ID
   */
  get(id: string): ComponentDefinition | undefined {
    return this.definitions.get(id);
  }

  /**
   * Récupère toutes les définitions
   */
  getAll(): ComponentDefinition[] {
    return Array.from(this.definitions.values());
  }

  /**
   * Récupère les composants par catégorie
   */
  getByCategory(category: ComponentCategory): ComponentDefinition[] {
    return this.getAll().filter(def => def.category === category);
  }

  /**
   * Génère la structure de navigation pour la sidebar
   */
  getNavigation(): NavItem[] {
    const categories: { id: ComponentCategory; label: string; icon: string }[] = [
      { id: 'actions', label: 'Actions', icon: '🔘' },
      { id: 'forms', label: 'Forms', icon: '📝' },
      { id: 'navigation', label: 'Navigation', icon: '🧭' },
      { id: 'display', label: 'Display', icon: '📊' },
      { id: 'data', label: 'Data', icon: '📋' },
      { id: 'feedback', label: 'Feedback', icon: '💬' },
      { id: 'overlays', label: 'Overlays', icon: '🪟' },
      { id: 'layout', label: 'Layout', icon: '📐' },
    ];

    const items: NavItem[] = [];

    for (const cat of categories) {
      const components = this.getByCategory(cat.id);
      if (components.length > 0) {
        items.push({
          id: cat.id,
          label: cat.label,
          icon: cat.icon,
          children: components.map(comp => ({
            id: comp.id,
            label: comp.name,
            path: `/components/${cat.id}/${comp.id}`,
          })),
        });
      }
    }

    return items;
  }

  /**
   * Recherche de composants par nom
   */
  search(query: string): ComponentDefinition[] {
    const lowerQuery = query.toLowerCase();
    return this.getAll().filter(
      def =>
        def.name.toLowerCase().includes(lowerQuery) ||
        def.id.toLowerCase().includes(lowerQuery) ||
        def.description.toLowerCase().includes(lowerQuery)
    );
  }
}
