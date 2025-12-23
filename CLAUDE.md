# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projet

Bibliothèque de design system Angular 20 (`@kksdev/ds-angular`) avec 55 composants DS et 7 primitives.

**Production** : https://ds-showcase.kkshome.online/

## Commandes principales

```bash
# Build
npm run build:lib              # Build bibliothèque (REQUIS avant showcase)
npm run build:lib:watch        # Build en mode watch
npm run showcase:build         # Build Showcase statique

# Développement
npm run showcase               # Lance Showcase (port 4300)
# Note : generate:examples est automatiquement exécuté avant showcase et showcase:build

# Tests
ng test ds-angular             # Tests interactifs
npm run test:headless          # Tests headless (CI)
npm run test:coverage          # Tests avec couverture (seuil ≥80%)
npm run test:e2e               # Tests e2e Playwright
npm run test:visual            # Tests visuels Playwright

# Validation
npm run validate:tokens        # Cohérence des tokens
npm run analyze:bundle         # Analyse taille bundle (seuil 5 MB)

# Publication
npm run publish:lib:dry-run    # Simulation
npm run publish:lib            # Publication npm

# Docker
docker compose up -d --build   # Build et lance Showcase sur port 4300
./scripts/docker-deploy.sh 1.8.0  # Push manuel vers Docker Hub
```

## Architecture

```
projects/
├── ds-angular/src/lib/        # Bibliothèque publiée sur npm
│   ├── primitives/            # 7 composants atomiques (primitive-button, primitive-input, etc.)
│   ├── components/            # 55 composants DS (ds-button, ds-modal, ds-table, etc.)
│   ├── utils/                 # Utilitaires (overlay-positions, i18n)
│   └── styles/                # Système de tokens et thèmes
└── ds-showcase/               # Documentation interactive (Angular app)
```

### Système de styles (3 couches)

```
projects/ds-angular/src/styles/
├── tokens/
│   ├── _primitives.scss       # Variables SCSS brutes ($gray-700, $space-4)
│   ├── _semantic.scss         # Variables sémantiques ($btn-height-md)
│   └── _tokens.scss           # CSS custom properties (--color-primary)
└── themes/
    ├── _light.scss            # :root.theme-light
    ├── _dark.scss             # :root.theme-dark
    └── _custom.scss           # :root.theme-custom
```

Activation thème : `document.documentElement.className = 'theme-light'`

## Patterns techniques

- **Standalone components** : Tous les composants Angular 20
- **Signals** : `input()`, `output()`, `computed()` pour la réactivité
- **ControlValueAccessor** : Composants formulaire (input, checkbox, select, etc.)
- **CDK Overlay** : Composants flottants (modal, dropdown, tooltip, popover, toast)
- **FontAwesome** : Icônes via `@fortawesome/angular-fontawesome`

## Conventions

- **Prefix composants** : `ds-` (ex: `ds-button`, `ds-modal`)
- **Prefix primitives** : `primitive-` (ex: `primitive-button`)
- **Build** : `ng-packagr` avec `sideEffects: false` pour tree-shaking
- **Tests** : Colocalisés avec composants (`*.spec.ts`)
- **Package npm** : `@kksdev/ds-angular`

## CI/CD

- **CI** : Tests, build, couverture, bundle size sur chaque push master
- **Docker Publish** : Push automatique vers `sopequenotech/ds-angular-showcase` sur chaque push master
- **Visual Regression** : Tests Playwright sur Showcase

## Points d'attention

1. **Build lib avant showcase** : Le Showcase importe `ds-angular`, donc `npm run build:lib` est requis avant `npm run showcase` ou `npm run showcase:build`

2. **Propriétés computed/signals** : Doivent être `readonly` (pas `protected`) pour éviter TS2445 dans les templates

3. **Tokens thématiques** : Tout nouveau composant doit avoir ses tokens dans `_light.scss`, `_dark.scss` ET `_custom.scss`

4. **Tests signals** : Utiliser `component.mySignal.set(value)` au lieu de `ng-reflect-*` (les signals ne sont pas reflétés)

5. **Device Switcher** : Le Showcase permet de prévisualiser les démos en Desktop (100%), Tablet (768px) et Mobile (375px) via le composant `DeviceSwitcher`
