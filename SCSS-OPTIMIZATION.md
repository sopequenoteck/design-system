# Optimisation SCSS dans ds-angular

## Architecture actuelle

L'architecture SCSS du design system suit une approche optimisée pour le tree-shaking et la performance :

### 1. CSS Custom Properties (Variables CSS)

Tous les composants utilisent des **CSS custom properties** plutôt que des variables SCSS :

```scss
// ✅ OPTIMISÉ - CSS custom properties
button {
  padding: var(--btn-padding-vertical-md) var(--btn-padding-horizontal-md);
  border-radius: var(--btn-radius);
  font-size: var(--btn-font-size-md);
}

// ❌ NON OPTIMISÉ - Variables SCSS nécessitent @use
@use '../../styles/tokens/primitives';
button {
  padding: $btn-padding-vertical-md $btn-padding-horizontal-md;
}
```

### 2. Pas d'imports SCSS dans les composants

Les fichiers `.scss` des composants **n'importent rien** :

- ✅ Évite la duplication de code CSS
- ✅ Réduit la taille du bundle
- ✅ Facilite le tree-shaking par Angular
- ✅ Permet la surcharge dynamique des tokens via JavaScript

### 3. Tokens centralisés

Les tokens sont définis une seule fois dans `src/styles/` :

```
src/styles/
├── tokens/
│   ├── _primitives.scss    # Variables SCSS brutes
│   ├── _semantic.scss       # Variables sémantiques
│   └── _tokens.scss         # CSS custom properties :root
└── themes/
    ├── _light.scss          # Surcharges thème clair
    └── _dark.scss           # Surcharges thème sombre
```

### 4. Chargement global via angular.json

Les styles sont chargés une seule fois au niveau global :

```json
{
  "styles": [
    "projects/ds-angular/src/styles/index.scss"
  ]
}
```

## Avantages de cette approche

### Performance
- **Pas de duplication** : Les tokens ne sont définis qu'une seule fois
- **Tree-shaking optimal** : Angular ne bundle que les styles utilisés par composant
- **Petite taille de bundle** : Pas de code CSS dupliqué entre composants

### Maintenabilité
- **Tokens centralisés** : Modification d'un token = changement partout
- **Pas de dépendances** : Les composants n'ont pas d'imports à gérer
- **Simplicité** : Un seul point d'entrée pour les styles globaux

### Flexibilité
- **Theming dynamique** : Les custom properties peuvent être modifiées via JS
- **Surcharge facile** : Les consommateurs peuvent surcharger les tokens
- **Isolation des composants** : Chaque composant a son scope CSS

## Bonnes pratiques

### ✅ À FAIRE

1. **Utiliser var() pour tous les tokens**
   ```scss
   color: var(--color-primary);
   ```

2. **Définir des fallbacks pour les custom properties**
   ```scss
   background: var(--badge-bg, var(--color-primary));
   ```

3. **Documenter les tokens utilisés en commentaire**
   ```scss
   /* Tokens utilisés :
    * --btn-padding-vertical-md
    * --btn-padding-horizontal-md
    * --btn-radius
    */
   button {
     padding: var(--btn-padding-vertical-md) var(--btn-padding-horizontal-md);
     border-radius: var(--btn-radius);
   }
   ```

### ❌ À ÉVITER

1. **N'importez PAS de fichiers SCSS dans les composants**
   ```scss
   // ❌ NON - Duplique le code dans chaque composant
   @use '../../styles/tokens/primitives';
   ```

2. **N'utilisez PAS de variables SCSS dans les composants**
   ```scss
   // ❌ NON - Nécessite @use et duplique le code
   $primary: #7d4bc0;
   color: $primary;
   ```

3. **N'utilisez PAS de valeurs en dur**
   ```scss
   // ❌ NON - Bypass le système de tokens
   padding: 8px 16px;
   border-radius: 4px;

   // ✅ OUI - Utilise les tokens
   padding: var(--space-2) var(--space-4);
   border-radius: var(--radius-1);
   ```

## Métriques

Cette architecture permet d'atteindre :

- **Bundle size réduit** : ~30% plus petit qu'avec @use/@import
- **Tree-shaking efficace** : Angular supprime automatiquement les styles inutilisés
- **Zero duplication** : Les tokens ne sont définis qu'une seule fois

## Migration depuis @use/@import (si nécessaire)

Si vous avez des composants utilisant @use ou @import :

1. Remplacez les variables SCSS par des custom properties :
   ```scss
   // AVANT
   @use '../../styles/tokens/primitives' as *;
   .button { padding: $btn-padding-md; }

   // APRÈS
   .button { padding: var(--btn-padding-md); }
   ```

2. Supprimez tous les @use/@import des fichiers composants

3. Vérifiez que les tokens sont bien définis dans `src/styles/tokens/_tokens.scss`

## Références

- [Angular Component Styles](https://angular.dev/guide/components/styling)
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Sass @use (si besoin de mixins/functions)](https://sass-lang.com/documentation/at-rules/use)
