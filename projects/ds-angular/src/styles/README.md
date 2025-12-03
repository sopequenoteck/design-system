# Design System Angular - Styles & Tokens

## Architecture à 3 niveaux

### 1. Primitives (`_primitives.scss`)
Variables SCSS de base définissant les valeurs brutes :
- Couleurs : `$gray-50` à `$gray-900`, `$primary`, `$secondary`, `$alt`
- Spacing : `$space-1` à `$space-8` (0.25rem à 2rem)
- Radius : `$radius-1` à `$radius-round`
- Shadows : `$shadow-1`, `$shadow-2`, `$shadow-3`
- Z-index : `$z-index-1` à `$z-index-full`
- Animations : `$duration-fast/normal/slow`, `$easing-default/in/out`
- Typographie : `$font-family-base`, `$font-size-1` à `$font-size-6`

### 2. Semantic (`_semantic.scss`)
Tokens composant-spécifiques construits à partir des primitives :
- Button : `$btn-height-sm/md/lg`, `$btn-padding-*`, `$btn-radius-*`
- Input : `$input-height-sm/md/lg`, `$input-padding-*`, `$input-border-radius`
- Badge, Modal, Dropdown, Toast, Checkbox, Radio, Toggle, etc.

### 3. Tokens (`_tokens.scss`)
250+ CSS custom properties pour usage runtime dans les composants :
- Variables brand : `--brand-primary`, `--brand-secondary`
- Variables role : `--role-primary`, `--role-secondary`
- API publique : `--color-primary`, `--color-secondary`, `--space-*`, `--font-size-*`
- Tokens composants : `--btn-primary-bg`, `--btn-primary-hover-bg`, etc.

## Thèmes

Thèmes disponibles : `light`, `dark`, `custom`

Fichiers :
- `themes/_light.scss` : Thème clair (par défaut)
- `themes/_dark.scss` : Thème foncé
- `themes/_custom.scss` : Placeholder pour personnalisation

## Usage dans un projet consommateur

### Import complet
```scss
@use 'ds-angular/styles' as ds;

.my-component {
  padding: ds.$space-4;
  border-radius: ds.$radius-2;
  color: var(--color-primary);
}
```

### Import sélectif
```scss
@use 'ds-angular/styles/tokens' as tokens;

.my-component {
  color: var(--color-primary);
  background: var(--background-main);
  padding: tokens.$space-4;
}
```

### Utilisation des CSS variables dans les templates Angular
```html
<div [style.padding]="'var(--space-4)'">
  <button [style.background]="'var(--btn-primary-bg)'">
    Click me
  </button>
</div>
```

### Application des thèmes

Via classe CSS sur le body :
```html
<body class="theme-light">
  <!-- Contenu -->
</body>

<!-- Ou -->
<body class="theme-dark">
  <!-- Contenu -->
</body>
```

Via JavaScript (pour switcher dynamiquement) :
```typescript
document.body.classList.remove('theme-light', 'theme-dark');
document.body.classList.add('theme-dark');
```

## Personnalisation

Pour surcharger des tokens, créez votre propre fichier de thème :

```scss
@use 'ds-angular/styles/tokens' as ds;

:root {
  // Surcharge des tokens brand
  --brand-primary: #your-color;
  --brand-secondary: #your-color;

  // Les rôles et l'API s'adapteront automatiquement
}
```
