# Changelog

Tous les changements notables de ce projet seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

---

## [En cours] - 2025-12-05

### ✨ Nouvelles fonctionnalités

- **tokens**: ajouter tokens sémantiques et exports pour card, alert, divider (ÉTAPE 9 finale) ([8f6656e])
- **components**: compléter ds-alert et ds-divider (ÉTAPE 9) ([f43b0d7])
- **components**: créer composants ds-card et ds-alert (ÉTAPE 9 partielle) ([ca70754])
- **storybook**: enrichir stories ds-breadcrumb, ds-radio-group, ds-toggle, ds-input-textarea ([7e5212f])
- **ci**: ajout détection régression bundle size ([76b572b])
- **utils**: ajout IconRegistryService pour lazy-loading des icônes ([6861bb0])
- **build**: active tree-shaking optimal avec sideEffects et exports nommés ([680d646])
- **typedoc**: configuration documentation API ([66e6a97])
- **scripts**: ajout scripts validation a11y et tokens ([c8c1f9d])
- **primitives**: tests complets et JSDoc pour 5 primitives restantes ([77885a9])
- **primitive-input**: tests complets et documentation JSDoc ([337635b])
- **primitive-button**: tests complets et documentation JSDoc ([6d0450a])
- **tokens**: harmonisation et cohérence des tokens (ÉTAPE 1) ([8445877])
- **storybook**: PHASE 8 - Configuration Storybook (partiellement) ([28a9b71])
- **tests**: PHASE 7 - Configuration et exécution des tests ([4632e73])
- **ds-angular**: migration PHASE 6 - composants Design System ([b73fa24])
- **ds-angular**: migration PHASES 1-5 - configuration workspace et primitives ([14c4711])

### 🐛 Corrections de bugs

- **build**: retirer sideEffects de ng-package.json ([ca84fc7])
- **ds-tabs**: corriger erreur TS2445 - rendre activeIndex public ([ebc2002])
- **storybook**: corrections erreurs de compilation ([907f920])
- **storybook**: correction du chargement des styles ([802f323])

### 📝 Documentation

- finaliser ÉTAPE 9 - Composants utilitaires essentiels ([5796e5b])
- **CLAUDE**: ajouter rapport ÉTAPE 8 - Enrichissement Storybook ([1646902])
- **storybook**: enrichir documentation Tokens avec section Thème Custom ([ddf0419])
- **CLAUDE**: ajouter rapport ÉTAPE 7 - Stabilisation ([e68d885])
- **scss**: ajout guide d'optimisation SCSS ([371e928])
- complétion ÉTAPE 5 - Outillage et CI/CD ([05353ef])
- **readme**: refonte complète avec badges CI/CD ([26f5542])
- complétion ÉTAPE 4 - Documentation et guides d'usage ([33a11f6])
- **stories**: enrichissement ds-input-field.stories.ts (23 stories) ([831e2ba])
- **stories**: enrichissement ds-modal.stories.ts (16 stories) ([d257147])
- **stories**: enrichissement ds-button.stories.ts (14 stories) ([8c0a091])
- **patterns,integration**: création guides de composition et intégration ([ff9d51d])
- **tokens**: ajout exemples visuels pour shadows et radius ([e2e0b4a])
- **introduction,contributing**: enrichissement documentation ([0c2b551])
- **claude**: ajout rapport complétion ÉTAPE 3 ([9edef44])

### ✅ Tests

- **ds-toggle**: compléter tests unitaires - couverture ≥90% ([0c16677])
- **ds-radio-group**: compléter tests unitaires - couverture ≥90% ([e0d4736])
- **ds-breadcrumb**: compléter tests unitaires - couverture ≥90% ([3cca789])
- **ds-popover**: compléter tests unitaires - couverture ≥85% ([c86b80d])
- **ds-tooltip**: compléter tests unitaires - couverture ≥85% ([93fffb7])
- **ds-tabs**: compléter tests unitaires - couverture ≥85% ([37aa88f])
- **ds-input-field**: compléter tests unitaires - couverture ≥90% ([72454ff])
- **ds-checkbox**: compléter tests unitaires pour atteindre 90% de couverture ([4abe221])
- **ds-toast**: compléter tests unitaires pour atteindre 90% de couverture ([5316298])
- **ds-dropdown**: compléter tests unitaires pour atteindre 85% de couverture ([712a606])
- **ds-modal**: compléter tests unitaires pour atteindre 85% de couverture ([ed5f487])
- **ds-button**: compléter tests unitaires - couverture ≥90% ([d49f5a0])

### 🔧 Maintenance

- **DS_TODO**: marquer ÉTAPE 8 comme terminée - Enrichissement Storybook complet ([aa3894f])
- finalisation ÉTAPE 6 — Optimisation et performance ([42a6c92])
- Merge pull request #8 from sopequenoteck/codex/import-themes-and-customize-global-types ([c604fe1])
- Improve Storybook theming controls ([61db4db])
- Merge pull request #7 from sopequenoteck/codex/add-sorted-stories-and-shared-paths ([bffec7a])
- Configure Storybook setup for docs and assets ([42fbdb0])
- Create DS_TODO.md ([d6bacd5])
- Update AGENTS.md ([16f94fb])
- demarre ([cbcabec])
- Merge pull request #6 from sopequenoteck/codex/add-scss-token-imports-to-storybook ([b01d971])
- Load design tokens in Storybook preview ([c987695])
- corrections ([a052aa1])
- Merge pull request #5 from sopequenoteck/codex/centralize-common-argtypes-and-args ([01d767f])
- Refactor shared button story controls ([d0df121])
- Merge pull request #4 from sopequenoteck/codex/add-new-mdx-pages-in-ds-angular ([3f904d6])
- Add tokens and contributing MDX docs ([f16daff])
- okay ([ee83d6a])
- Merge pull request #3 from sopequenoteck/codex/update-storybook-theme-and-styles ([abc2e67])
- Enhance Storybook theming and backgrounds ([bfb8e8b])
- démarre ([ec92453])
- Merge pull request #1 from sopequenoteck/codex/extract-theme-logic-to-dedicated-decorator ([6f62c69])
- Enhance Storybook theming and token docs ([17fda28])
- claude ([bf2d327])
- limit ([3ecd823])
- Delete MIGRATION_DS.md ([6f7443d])
- okay reprise ([abc1cac])
- projet créer ([0e34bde])
- initial commit ([34fe3fc])

---

## [1.0.0] - 2025-03-01 (À venir)

Version stable initiale du design system avec architecture consolidée.

### ✨ Composants disponibles

- **7 Primitives** : button, input, badge, checkbox, radio, textarea, toggle
- **17 Composants DS** : button, modal, dropdown, toast, tooltip, popover, tabs, breadcrumb, input-field, input-textarea, checkbox, radio-group, toggle, badge, card, alert, divider

### 🎨 Système de design

- **Architecture tokens 3 couches** : primitives → sémantiques → CSS custom properties
- **3 thèmes** : light, dark, custom
- **Accessibilité** : WCAG 2.1 AA complète
- **Navigation clavier** : support complet sur tous les composants

### 📚 Documentation

- 5 fichiers MDX : Introduction, Tokens, Contributing, Patterns, Integration
- 60+ stories Storybook interactives
- Guide de migration (MIGRATION.md)
- Exemples d'intégration complets

### 🔧 Outillage

- CI/CD complète avec GitHub Actions
- Tests unitaires ≥80% coverage
- Tests accessibilité automatisés
- Détection régressions bundle size
- Tree-shaking optimal

---

## Historique des étapes de consolidation

### ÉTAPE 9 — Composants utilitaires essentiels (2025-12-05)

- ✅ Création ds-card (11 stories, 35+ tests)
- ✅ Création ds-alert (10 stories, 40+ tests)
- ✅ Création ds-divider (10 stories, 30+ tests)
- ✅ 30 tokens sémantiques ajoutés
- ✅ Exports TypeScript avec types

### ÉTAPE 8 — Enrichissement Storybook (2025-12-05)

- ✅ Stories enrichies : breadcrumb, radio-group, toggle, checkbox, textarea
- ✅ Documentation thème custom dans Tokens.mdx
- ✅ 50+ stories interactives
- ✅ Contrôle thème dans Storybook toolbar

### ÉTAPE 7 — Stabilisation et corrections (2025-12-05)

- ✅ Correction erreur TS2445 ds-tabs
- ✅ Build bibliothèque sans warnings
- ✅ Couverture mesurable : 92.62% lines
- ✅ 87% des tests globaux passent

### ÉTAPE 6 — Optimisations (2025-12-05)

- ✅ Tree-shaking optimal activé
- ✅ IconRegistryService pour lazy-loading FontAwesome
- ✅ CI détection régression bundle size
- ✅ Architecture SCSS optimisée

### ÉTAPE 5 — Outillage (2025-12-05)

- ✅ Workflow CI (tests, build, couverture ≥80%)
- ✅ Workflow Publish (npm sur tags v*)
- ✅ Scripts validation : test:a11y, validate:tokens
- ✅ TypeDoc configuré

### ÉTAPE 4 — Documentation (2025-12-05)

- ✅ Contributing.mdx : 9 sections complètes
- ✅ Introduction.mdx : Quick Start avec exemples
- ✅ Patterns.mdx : 4 patterns de composition
- ✅ Integration.mdx : 3 exemples Angular
- ✅ Tokens.mdx : exemples visuels complets

### ÉTAPE 3 — Renforcement (2025-12-05)

- ✅ Tests unitaires ≥85% pour 12 composants DS
- ✅ Audits accessibilité WCAG 2.1 AA
- ✅ Navigation clavier complète
- ✅ Attributs ARIA conformes
- ✅ Focus trap sur overlays

### ÉTAPE 2 — Primitives (2025-12-05)

- ✅ Architecture à 2 niveaux définie
- ✅ 7 primitives atomiques créées
- ✅ Tests unitaires ≥90% sur primitives

### ÉTAPE 1 — Tokens (2025-12-05)

- ✅ Architecture tokens 3 couches
- ✅ 3 thèmes (light, dark, custom)
- ✅ Nettoyage tokens dépréciés
- ✅ Documentation Tokens.mdx complète

---

## [0.0.0] - 2024-11-01

Version initiale du projet (pré-consolidation).
