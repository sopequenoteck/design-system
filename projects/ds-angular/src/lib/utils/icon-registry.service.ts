import { Injectable } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/**
 * Service centralisé pour l'enregistrement des icônes FontAwesome.
 *
 * @description
 * Permet d'enregistrer des icônes de manière lazy et centralisée, évitant
 * d'importer toutes les icônes FontAwesome dans chaque composant. Les composants
 * peuvent utiliser les icônes enregistrées via leur nom plutôt que via l'objet complet.
 *
 * @example
 * ```typescript
 * // Dans app.config.ts ou main.ts
 * import { IconRegistryService } from 'ds-angular';
 * import { faCheck, faTimes, faExclamation } from '@fortawesome/free-solid-svg-icons';
 *
 * const iconRegistry = inject(IconRegistryService);
 * iconRegistry.registerIcons([faCheck, faTimes, faExclamation]);
 * ```
 *
 * @example
 * ```typescript
 * // Enregistrement par groupe thématique
 * import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
 *
 * iconRegistry.registerIconGroup('validation', [faCheck, faTimes]);
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class IconRegistryService {
  private registeredIcons = new Set<string>();
  private iconGroups = new Map<string, IconDefinition[]>();

  constructor(private library: FaIconLibrary) {}

  /**
   * Enregistre une ou plusieurs icônes FontAwesome dans la bibliothèque globale.
   *
   * @param icons - Tableau d'icônes FontAwesome à enregistrer
   * @returns Le service lui-même pour chaînage
   *
   * @example
   * ```typescript
   * iconRegistry.registerIcons([faUser, faEnvelope, faPhone]);
   * ```
   */
  registerIcons(icons: IconDefinition[]): this {
    icons.forEach(icon => {
      const iconName = `${icon.prefix}-${icon.iconName}`;
      if (!this.registeredIcons.has(iconName)) {
        this.library.addIcons(icon);
        this.registeredIcons.add(iconName);
      }
    });
    return this;
  }

  /**
   * Enregistre un groupe d'icônes sous un nom thématique.
   *
   * @param groupName - Nom du groupe (ex: 'forms', 'navigation')
   * @param icons - Tableau d'icônes du groupe
   * @returns Le service lui-même pour chaînage
   *
   * @example
   * ```typescript
   * iconRegistry.registerIconGroup('forms', [
   *   faCheck, faTimes, faExclamation, faInfo
   * ]);
   * ```
   */
  registerIconGroup(groupName: string, icons: IconDefinition[]): this {
    this.iconGroups.set(groupName, icons);
    return this.registerIcons(icons);
  }

  /**
   * Vérifie si une icône est déjà enregistrée.
   *
   * @param iconName - Nom de l'icône (format: 'prefix-iconName')
   * @returns true si l'icône est enregistrée
   *
   * @example
   * ```typescript
   * if (!iconRegistry.isIconRegistered('fas-check')) {
   *   iconRegistry.registerIcons([faCheck]);
   * }
   * ```
   */
  isIconRegistered(iconName: string): boolean {
    return this.registeredIcons.has(iconName);
  }

  /**
   * Récupère tous les noms d'icônes enregistrées.
   *
   * @returns Tableau des noms d'icônes enregistrées
   */
  getRegisteredIcons(): string[] {
    return Array.from(this.registeredIcons);
  }

  /**
   * Récupère les icônes d'un groupe thématique.
   *
   * @param groupName - Nom du groupe
   * @returns Icônes du groupe ou undefined si le groupe n'existe pas
   */
  getIconGroup(groupName: string): IconDefinition[] | undefined {
    return this.iconGroups.get(groupName);
  }

  /**
   * Liste tous les groupes d'icônes enregistrés.
   *
   * @returns Tableau des noms de groupes
   */
  getIconGroups(): string[] {
    return Array.from(this.iconGroups.keys());
  }
}
