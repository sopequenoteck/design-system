# AGENTS.md

## Commandes essentielles

### Build
- `npm run build:lib` - Build la bibliothèque ds-angular
- `npm run build:lib:watch` - Build en mode watch

### Tests
- `npm test` - Lance tous les tests
- `npm run test:headless` - Tests sans interface (ChromeHeadless)
- `npm run test:coverage` - Tests avec couverture de code
- `ng test ds-angular --include="**/ds-button.spec.ts"` - Test spécifique

### Storybook
- `npm run storybook` - Démarre Storybook (port 6006)
- `npm run build-storybook` - Build Storybook statique

## Style de code

### Conventions Angular
- Préfixe composants : `ds` (ex: `ds-button`)
- Utiliser `input()` et `output()` (Angular 20+)
- Imports groupés : Angular → bibliothèques → composants locaux
- TypeScript strict mode activé

### Tests
- Structure : describe → beforeEach → it
- Utiliser `fixture.componentRef.setInput()` pour les inputs
- Tests couvrant inputs, états, events et rendu DOM

### Nommage
- Composants : `DsComponentName`
- Fichiers : kebab-case (`ds-button.component.ts`)
- Classes CSS : BEM avec préfixe `ds-`

### Erreurs
- Types stricts requis
- Pas de `any` autorisé
- Gestion des états disabled/loading dans les getters