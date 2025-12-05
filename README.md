# DS-Angular Design System

[![CI](https://github.com/USER/design-system/actions/workflows/ci.yml/badge.svg)](https://github.com/USER/design-system/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/ds-angular.svg)](https://badge.fury.io/js/ds-angular)
[![codecov](https://codecov.io/gh/USER/design-system/branch/master/graph/badge.svg)](https://codecov.io/gh/USER/design-system)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Design system Angular moderne et accessible avec support TypeScript, theming, et composants standalone.

## 🚀 Quick Start

```bash
npm install ds-angular
```

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { DsButton } from 'ds-angular';

@Component({
  standalone: true,
  imports: [DsButton],
  template: `<ds-button variant="primary">Hello World</ds-button>`
})
export class AppComponent {}
```

```scss
// styles.scss
@use 'ds-angular/styles';
```

## 📚 Documentation

- **Storybook** : Documentation interactive des composants
- **API Docs** : Documentation TypeDoc générée automatiquement
- **Guides** : Contributing, Patterns, Integration

Consultez la [documentation complète](https://storybook-url.com) pour plus de détails.

## ✨ Fonctionnalités

- ✅ **Composants Angular 20** : Standalone components avec signals
- ✅ **Accessibilité WCAG 2.1 AA** : Navigation clavier, ARIA, contraste
- ✅ **Theming** : Light, Dark, et thèmes personnalisés
- ✅ **TypeScript strict** : Types complets et inférés
- ✅ **Tree-shakable** : Optimisé pour les bundles de production
- ✅ **Reactive Forms** : Intégration ControlValueAccessor
- ✅ **Storybook** : 50+ stories documentées

## 🧩 Composants

### Primitives
- `primitive-button`, `primitive-badge`, `primitive-input`
- `primitive-checkbox`, `primitive-radio`, `primitive-toggle`
- `primitive-textarea`

### Components (17 composants DS)
- **Forms** : `ds-input-field`, `ds-input-textarea`, `ds-checkbox`, `ds-radio-group`, `ds-toggle`
- **Display** : `ds-button`, `ds-badge`, `ds-card`, `ds-alert`, `ds-divider`
- **Navigation** : `ds-breadcrumb`, `ds-tabs`
- **Overlays** : `ds-modal`, `ds-dropdown`, `ds-tooltip`, `ds-popover`, `ds-toast`

## 🛠️ Développement

```bash
# Installation
npm install

# Storybook (développement)
npm run storybook

# Tests
npm test                    # Tests interactifs
npm run test:headless       # Tests headless (CI)
npm run test:coverage       # Avec couverture

# Build
npm run build:lib           # Build de la bibliothèque
npm run build:lib:watch     # Build en mode watch

# Validation
npm run validate:tokens     # Cohérence des tokens
npm run test:a11y           # Audit accessibilité
```

## 📦 Scripts disponibles

| Script | Description |
|--------|-------------|
| `npm run storybook` | Lance Storybook sur http://localhost:6006 |
| `npm run build:lib` | Build de la bibliothèque ds-angular |
| `npm run test:headless` | Tests unitaires headless |
| `npm run test:coverage` | Tests avec rapport de couverture |
| `npm run validate:tokens` | Validation de la cohérence des tokens |
| `npm run test:a11y` | Audit d'accessibilité WCAG 2.1 AA |

## 🎨 Theming

```typescript
// Activer un thème
document.documentElement.className = 'theme-light'; // ou 'theme-dark'
```

Les tokens sont exposés via CSS custom properties et peuvent être surchargés :

```css
:root {
  --color-primary: #7d4bc0;
  --color-secondary: #fbc224;
  --btn-height-md: 40px;
}
```

## 💡 Examples

Le dossier `examples/` contient des applications de démonstration complètes utilisant le design system :

### Demo App

Application Angular 20 standalone illustrant l'utilisation de 15+ composants du design system :

```bash
# Depuis la racine du projet
npm run build:lib        # Build du design system
cd examples/demo-app     # Naviguer vers la demo
npm start                # Lancer l'application
```

Fonctionnalités démontrées :
- ✅ Formulaires réactifs avec validation (input, checkbox, radio, toggle, textarea)
- ✅ Modal dynamique avec focus trap
- ✅ Notifications toast (success, error, info, warning)
- ✅ Navigation par onglets
- ✅ Thèmes dynamiques (light, dark, custom)
- ✅ Composants utilitaires (card, alert, divider, badge, breadcrumb)

Consultez [examples/demo-app/README.md](./examples/demo-app/README.md) pour plus de détails.

## 🧪 Tests

Le projet maintient une couverture de tests ≥ 80% :

```bash
npm run test:coverage
```

Les tests vérifient :
- Rendu des composants
- États et variantes
- Événements et interactions
- ControlValueAccessor (formulaires)
- Accessibilité (ARIA, navigation clavier)

## 🌍 Accessibilité

Tous les composants sont conformes WCAG 2.1 niveau AA :

- ✅ Navigation clavier complète (Tab, Arrow keys, Enter, Escape)
- ✅ Attributs ARIA appropriés
- ✅ Contraste de couleurs ≥ 4.5:1
- ✅ Focus visible
- ✅ Labels et descriptions

Audit automatique via `npm run test:a11y`.

## 📄 Licence

MIT © 2025

## 🤝 Contribution

Consultez [CONTRIBUTING.md](./projects/ds-angular/src/lib/Contributing.mdx) pour les guidelines de contribution.

1. Fork le projet
2. Créez une branche (`git checkout -b feat/amazing-feature`)
3. Commit vos changements (`git commit -m 'feat: add amazing feature'`)
4. Push vers la branche (`git push origin feat/amazing-feature`)
5. Ouvrez une Pull Request

## 🔗 Liens utiles

- [Storybook](https://storybook-url.com)
- [Documentation API](https://docs-url.com)
- [Issues](https://github.com/USER/design-system/issues)
- [Changelog](https://github.com/USER/design-system/releases)
