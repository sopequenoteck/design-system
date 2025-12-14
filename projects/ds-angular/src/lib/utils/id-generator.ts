/**
 * Génère un identifiant unique compatible avec tous les environnements.
 * Utilise crypto.randomUUID() si disponible, sinon génère un UUID v4 manuellement.
 *
 * @returns Un identifiant UUID v4 unique
 */
export function generateId(): string {
  // Check if crypto.randomUUID is available (modern browsers, Node.js 19+)
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  // Fallback: Generate UUID v4 manually
  // Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Génère un identifiant court (sans tirets) pour les cas où un UUID complet n'est pas nécessaire.
 *
 * @param prefix Préfixe optionnel à ajouter à l'identifiant
 * @returns Un identifiant court unique
 */
export function generateShortId(prefix?: string): string {
  const id = Math.random().toString(36).substring(2, 11);
  return prefix ? `${prefix}-${id}` : id;
}
