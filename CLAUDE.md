# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projet

Projet Angular 20.3 contenant une bibliothèque de design system (`ds-angular`) destinée à être publiée sur npm.

## Structure

- **Workspace root** : Configuration du workspace Angular
- **projects/ds-angular/** : Bibliothèque Angular publishable contenant les composants du design system
  - `src/public-api.ts` : Point d'entrée public de la bibliothèque
  - `src/lib/` : Code source des composants, services et directives

## Commandes principales

### Développement
```bash
ng serve                    # Démarre le serveur de développement (port 4200)
ng build                    # Build du projet par défaut
ng build ds-angular         # Build de la bibliothèque ds-angular
ng build --watch            # Build en mode watch (développement)
```

### Tests
```bash
ng test                     # Lance tous les tests Karma/Jasmine
ng test ds-angular          # Lance les tests de la bibliothèque
```

### Génération de code
```bash
ng generate component <name>         # Génère un composant
ng generate directive <name>         # Génère une directive
ng generate service <name>           # Génère un service
ng generate --help                   # Liste tous les schematics disponibles
```

### Publication
```bash
ng build ds-angular                  # Build la bibliothèque
cd dist/ds-angular && npm publish    # Publie sur npm
```

## Configuration TypeScript

- **Mode strict activé** : `strict`, `noImplicitOverride`, `noPropertyAccessFromIndexSignature`, `noImplicitReturns`, `noFallthroughCasesInSwitch`
- **Angular strict mode** : Templates stricts, injection stricte
- **Target** : ES2022
- **Module** : ES2022
- **Decorators** : Activés (`experimentalDecorators`)

## Dépendances Angular

- Angular 20.3.x
- @angular/cdk 20.x
- @fortawesome/angular-fontawesome 0.15.x
- RxJS ~7.8.0
- Zone.js ~0.16.0
- TypeScript ~5.7.2
- Storybook 8.5.x

## Points d'attention

- La bibliothèque `ds-angular` est construite avec `ng-packagr`
- Le path alias `ds-angular` pointe vers `./dist/ds-angular` dans tsconfig
- Utiliser le prefix `lib` pour les composants de la bibliothèque
- La bibliothèque est marquée `sideEffects: false` pour optimisation tree-shaking
