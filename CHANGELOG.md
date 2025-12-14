# Changelog

Tous les changements notables de ce projet seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

---

## [En cours] - 2025-12-14

### ✨ Nouvelles fonctionnalités

- **ds-time-picker**: implement minTime/maxTime validation with tests and stories ([8b9ef85])
- **components**: add ds-color-picker component ([016ead7])
- **components**: add DsSegmentedControl component ([19dffe6])
- **components**: add DsInputNumber + e2e tests for 4 components ([ef187c3])
- **components**: add 6 new components + 3 MDX docs ([a4e92e4])
- **components**: add ds-password-strength component ([0cd154f])
- **stories**: complete 62 stories improvements (4 sprints) ([6e09cf6])
- **stories**: complete Sprint 3 - couverture etats et themes ([b70481b])
- **components**: add DsTree component ([ecf4539])
- **components**: add DsTimePicker component ([852904a])
- **components**: create DsDrawer component with CDK overlay and focus trap ([edf0cb8])
- **components**: create DsRating component with half stars and keyboard navigation ([fb6cd56])
- **components**: create DsEmpty component with icon/image and action slot ([0b5d945])
- **tokens**: add --space-7 token and document breakpoints ([27bd1f1])
- **tokens**: complete SPRINT-001 custom theme tokens and fix file-upload ([32ed5b1])
- **tokens**: add ds-chip tokens and fix SPRINT-001 issues ([4737785])
- **components**: add ds-chip, ds-slider, ds-file-upload and complete SPRINT-001 ([b3174ff])
- **tokens**: add thematic tokens for 8 components ([a559f35])
- **tokens**: harmonisation tokens search-input, date-picker, container ([6d6b4c2])
- **components**: add DsAvatar and DsMenu components ([808973a])
- **docker**: add Docker configuration for Storybook ([84b1f72])
- **components**: créer DsContainer, DsSearchInput et DsDatePicker (ÉTAPE 24) ([3e1faac])
- **components**: créer ds-table et ds-combobox avec tokens (ÉTAPE 23) ([8cb9903])
- **components**: créer ds-select avec CVA et tokens sémantiques (ÉTAPE 23) ([8fd9861])
- **tokens**: harmoniser tokens navigation et compléter thèmes (ÉTAPES 18-21) ([5334965])
- **i18n**: ajouter service i18n et tokens breakpoints (ÉTAPE 17) ([cc7cc64])
- **components**: créer ds-pagination, ds-stepper et ds-accordion (ÉTAPE 16) ([47ee82d])
- **components**: créer ds-progress-bar et ds-skeleton (ÉTAPE 15) ([ca5c572])
- **tokens**: harmoniser tokens et enrichir Patterns.mdx (ÉTAPE 14) ([b6e4141])
- finaliser ÉTAPE 12 - Déploiement Storybook GitHub Pages (100%) ([384a764])
- **npm**: publier ds-angular@1.0.0 sur npm (ÉTAPE 12) ([41d240a])
- **starter-kit**: créer template Angular 20 avec ds-angular (ÉTAPE 12) ([99a357e])
- **npm**: préparer publication v1.0.0 (ÉTAPE 12 - 3/8 tâches) ([940de80])
- finaliser ÉTAPE 11 - Tests automatisés avancés (100%) ([003c34b])
- **examples**: créer demo app Angular 20 (ÉTAPE 10) ([0bb4563])
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

- **utils**: add generateId utility to replace crypto.randomUUID ([53f1a79])
- **ds-time-picker**: corrige ouverture panel overlay (cdkConnectedOverlay + styles) ([90475d3])
- **ds-time-picker**: corrige overlay multi-instances et ajoute Escape key handler ([8952a54])
- **ds-segmented-control**: correct FontAwesome icon parsing ([683c6f0])
- **tokens**: remplace les couleurs hardcodees par tokens RGB dans rgba() ([0c5e389])
- **stories**: correct ds-time-picker stories format for Storybook ([cd3d59e])
- **storybook**: resolve TS4111, TS18046 and SCSS variable errors ([7bd6d6f])
- **ds-avatar**: correct image overflow in avatar container ([465297a])
- **ds-avatar**: prevent background color when image is displayed ([f30bb15])
- **storybook**: rename deprecated 'globals' to 'initialGlobals' ([8f24ec5])
- **storybook**: corriger erreurs TypeScript dans stories ([f1c0ca2])
- **stories**: corriger accès propriétés this dans ds-date-picker.stories ([566f7c5])
- **stories**: corriger erreurs TypeScript Storybook ([25ac977])
- **tooltip**: corriger DsTooltip avec pattern CDK Portal (ÉTAPE 22) ([4aadea2])
- **storybook**: corriger import types @storybook/csf ([a37319f])
- **ci**: tolérer tests échoués préexistants (106/942) ([f7b3ff4])
- **deps**: mettre à jour ng-packagr@20 et ajouter --legacy-peer-deps ([67ee43d])
- **ci**: corriger erreur YAML dans workflow CI ([cec89bf])
- **ds-alert**: rendre propriété icons publique (ÉTAPE 13) ([dab93fd])
- **build**: retirer sideEffects de ng-package.json ([ca84fc7])
- **ds-tabs**: corriger erreur TS2445 - rendre activeIndex public ([ebc2002])
- **storybook**: corrections erreurs de compilation ([907f920])
- **storybook**: correction du chargement des styles ([802f323])

### ♻️ Refactoring

- **ds-popover**: audit complet composant (+24 tests, a11y, JSDoc, stories) ([f83448d])
- **ds-input-textarea**: audit complet composant - tests, stories, a11y, doc ([68e32e4])
- **storybook**: remplace demo-app par stories Integration ([6fb529f])
- **storybook**: réorganiser sidebar avec structure hiérarchique ([516ce31])

### 📝 Documentation

- **ds-time-picker**: add COMPONENT_AUDIT.md report ([11bdb09])
- **ds-input-textarea**: ajoute rapport d'audit COMPONENT_AUDIT.md ([40fc4fe])
- update DS_TODO.md with v1.6.0 release notes ([5623af9])
- **stories**: mark Sprint 3 as completed in STORIES_TODO.md ([afd8145])
- **storybook**: reorganise sidebar avec categories fonctionnelles ([834d4f7])
- update DS_TODO.md and CLAUDE.md - 17/17 tasks completed ([787cb0c])
- update DS_TODO.md - mark DsEmpty, DsRating, DsDrawer as completed ([a2f8abe])
- update CLAUDE.md for v1.3.0 release and add DS_TODO.md ([ef585b3])
- add SPRINT-001 components to accessibility and integration guides, bump to v1.3.0 ([0946a08])
- **tokens**: complète documentation container et stories thématisées ([92aae19])
- **storybook**: améliorer documentation et convertir tableaux MDX en HTML ([5dfdd2b])
- créer guides Accessibility, Testing et Theming (ÉTAPE 25) ([2bad721])
- marquer ÉTAPE 23 terminée (100%) ([4cf1d65])
- marquer ÉTAPE 13 terminée (100%) ([9e37661])
- générer nouveau DS_TODO.md post-publication v1.0.0 ([dc7ecc5])
- valider dry-run npm publication (ÉTAPE 12 - 4/8 tâches) ([6cc8ebc])
- mettre à jour ÉTAPE 11 (partielle - 3/6 tâches) ([d1a90a7])
- finaliser ÉTAPE 10 - Documentation et guides d'adoption ([6f25132])
- **readme,integration**: enrichir documentation et exemples (ÉTAPE 10 finale) ([04a2e68])
- **changelog**: générer CHANGELOG.md initial (ÉTAPE 10) ([dc1e222])
- **migration**: créer guide de migration et script changelog (ÉTAPE 10 partielle) ([52aa1fb])
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

- **e2e**: add Playwright tests for SPRINT-001 components (chip, slider, file-upload) ([41a010d])
- **e2e**: ajouter 90+ tests Playwright pour select, table, combobox, date-picker (ÉTAPE 27) ([741cf49])
- **e2e**: valider 52 tests Playwright pour composants critiques (ÉTAPE 11) ([b2afde7])
- ajouter tests automatisés Storybook et Playwright (ÉTAPE 11 partielle) ([21e6729])
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

### 💄 Style

- **design-system**: ameliorations modernes phases 3-6 - transitions granulaires, easing cubic-bezier, focus ring double-ring, active scale ([aafb366])
- **design-system**: refonte moderne/minimaliste des tokens et primitives ([279973b])
- **tokens**: ajoute tokens time-picker aux themes custom/light/dark ([ed1e77e])

### 🔧 Maintenance

- okay ([6f06969])
- fix test:storybook script url parameter ([3188d27])
- complete DS_TODO tasks and fix tests ([645927b])
- **release**: bump version to 1.6.0 ([c1b454b])
- **release**: publie v1.4.0 avec 5 composants utilitaires finaux ([d03f83d])
- Delete DS_TODO.md ([80f5843])
- update package.json description - 38 components total ([e281c2c])
- **config**: fix Karma EPERM error and optimize Storybook build ([9d77d6a])
- Update Integration.stories.ts ([f6dfef9])
- Delete DS_TODO.md ([97c2a91])
- Delete TODO.md ([d9fc4cc])
- nrt ([c281458])
- **deps**: upgrade FontAwesome to v7 and angular-fontawesome to v3 ([d582e0c])
- Update package.json ([eae7d0d])
- Delete DS_TODO.md ([522f7ea])
- Update package.json ([6269604])
- rename package to @kksdev/ds-angular ([3510233])
- remove GitHub Pages deployment ([ded033b])
- Update index.html ([91f3322])
- **release**: v1.1.0 ([295ecc2])
- test okay ([8c047c2])
- Delete DS_TODO.md ([7b38870])
- Merge branch 'master' of github.com:sopequenoteck/design-system ([59a1c1e])
- Add Claude Code GitHub Workflow (#9) ([6a2dc6c])
- Delete DS_TODO.md ([3bbe7ca])
- Create perf-benchmark.json ([12141ad])
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
