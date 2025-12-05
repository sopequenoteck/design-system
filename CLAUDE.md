# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projet

Projet Angular 20.x contenant une bibliothèque de design system (`ds-angular`) destinée à être publiée sur npm.

## Commandes principales

```bash
# Build
npm run build:lib              # Build de la bibliothèque ds-angular
npm run build:lib:watch        # Build en mode watch

# Tests
ng test ds-angular             # Tests interactifs
npm run test:headless          # Tests headless (CI)
npm run test:coverage          # Tests avec couverture

# Storybook
npm run storybook              # Lance Storybook (port 6006)
npm run build-storybook        # Build Storybook statique

# Publication
npm run publish:lib:dry-run    # Simulation de publication
npm run publish:lib            # Publication sur npm
```

## Architecture

### Organisation à deux niveaux

```
projects/ds-angular/src/lib/
├── primitives/      # Composants bas niveau (briques de base)
│   ├── primitive-button/
│   ├── primitive-badge/
│   ├── primitive-input/
│   ├── primitive-checkbox/
│   ├── primitive-radio/
│   ├── primitive-textarea/
│   └── primitive-toggle/
├── components/      # Composants haut niveau (utilisent les primitives)
│   ├── ds-button/
│   ├── ds-badge/
│   ├── ds-input-field/
│   ├── ds-checkbox/
│   ├── ds-modal/
│   ├── ds-dropdown/
│   ├── ds-toast/
│   ├── ds-tooltip/
│   ├── ds-popover/
│   └── ...
└── utils/           # Utilitaires partagés (overlay-positions, etc.)
```

**Primitives** : Composants atomiques sans logique métier, stylisés par CSS custom properties.

**Components** : Composants DS complets, souvent avec `ControlValueAccessor` pour les formulaires, utilisant `@angular/cdk` pour les overlays.

### Système de styles

```
projects/ds-angular/src/styles/
├── tokens/
│   ├── _primitives.scss   # Variables SCSS de base ($primary, $gray-50, etc.)
│   ├── _semantic.scss     # Variables sémantiques
│   └── _tokens.scss       # CSS custom properties sur :root
└── themes/
    ├── _light.scss        # Thème light (:root.theme-light)
    └── _dark.scss         # Thème dark (:root.theme-dark)
```

Les thèmes s'activent via la classe sur `:root` : `document.documentElement.className = 'theme-light'`

### Tokens et dépréciations

**Architecture à 3 couches** :
1. `_primitives.scss` : Variables SCSS brutes (valeurs absolues)
2. `_semantic.scss` : Variables SCSS sémantiques (usages composants)
3. `_tokens.scss` : CSS custom properties `:root` (exposition runtime)
4. `themes/*.scss` : CSS custom properties `:root.theme-*` (surcharges thématiques)

**Conventions de nommage** :
- Primitifs : `$gray-700`, `$space-4`, `$radius-2`
- Sémantiques : `$btn-height-md`, `$input-border-radius`
- Globaux : `--color-primary`, `--btn-height-md`
- Thématiques : `--background-main`, `--text-default`

**Politique de dépréciation** :
- Tokens marqués `@deprecated` avec date d'expiration
- Fallbacks CSS pour transitions sans casse : `var(--new-token, var(--old-token))`

**Nettoyage ÉTAPE 1** (2025-12-05) :
- ✅ Tokens badge dépréciés supprimés : `--badge-bg-color`, `--badge-text-color`, `--badge-fg`
- ✅ Primitive-badge.scss nettoyé : utilise `--badge-bg` et `--badge-text`
- ✅ Harmonisation _light.scss : `--modal-border` supprimé (ne garde que `--modal-border-color`)
- ✅ Harmonisation _dark.scss : `--input-border` supprimé (ne garde que `--input-border-color`)
- ✅ Documentation complète des règles de nommage dans `Tokens.mdx`

**Renforcement ÉTAPE 3** (2025-12-05) :
- ✅ Tests unitaires complets pour 12 composants DS (≥85% couverture)
- ✅ Audits accessibilité WCAG 2.1 AA : ds-modal, ds-dropdown, ds-tabs
- ✅ Navigation clavier complète : ArrowUp/Down, Home/End, Enter, Escape
- ✅ Attributs ARIA conformes : role, aria-selected, aria-expanded, aria-controls
- ✅ Focus trap et gestion ESC opérationnels sur les overlays

## Patterns techniques

- **Standalone components** : Tous les composants sont standalone (Angular 20)
- **Signals** : Utilisation des signals Angular (`input()`, `output()`, `computed()`)
- **ControlValueAccessor** : Pour les composants de formulaire (input, checkbox, radio, etc.)
- **CDK Overlay** : Pour les composants flottants (modal, dropdown, tooltip, popover, toast)
- **FontAwesome** : Icônes via `@fortawesome/angular-fontawesome`

## Configuration TypeScript

- Mode strict activé
- Target/Module : ES2022
- Path alias `ds-angular` pointe vers `./dist/ds-angular`

## Points d'attention

- Le prefix des composants est `ds` (ex: `ds-button`, `ds-modal`)
- Build avec `ng-packagr` (sideEffects: false pour tree-shaking)
- Stories Storybook colocalisées avec les composants (*.stories.ts)
