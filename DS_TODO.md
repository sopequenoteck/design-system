# DS_TODO — Plan d'amélioration et de consolidation du Design System

## Contexte

Le design system Angular (`ds-angular`) présente une architecture à deux niveaux (primitives / components) cohérente, un système de tokens primitifs et sémantiques bien structuré, et trois thèmes fonctionnels (light, dark, custom). L'analyse révèle une base solide nécessitant des améliorations ciblées pour renforcer la cohérence, améliorer la maintenabilité et consolider la documentation.

**Métadonnées** : design-system | 2025-12-05 11:30

---

## Résumé architectural observé

Le design system s'organise autour de :
- **7 primitives** (button, input, badge, checkbox, radio, textarea, toggle) : composants atomiques stylisés par CSS custom properties
- **14 components DS** (ds-button, ds-modal, ds-dropdown, ds-toast, ds-tooltip, ds-popover, ds-tabs, ds-breadcrumb, ds-input-field, ds-input-textarea, ds-checkbox, ds-radio-group, ds-toggle, ds-badge) utilisant les primitives et CDK Angular
- **Tokens structurés** : `_primitives.scss` → `_semantic.scss` → `_tokens.scss` (CSS custom properties)
- **3 thèmes** : light, dark, custom (système via classes `:root.theme-*`)
- **3 MDX** de documentation : Introduction.mdx, Tokens.mdx, Contributing.mdx
- **Storybook** opérationnel pour tous les composants

---

## ÉTAPE 1 — Harmonisation et cohérence des tokens

### Objectif
Garantir la cohérence du nommage, éliminer les duplications et consolider l'architecture des tokens pour améliorer la maintenabilité.

### Prérequis
Aucun.

### Livrables
- Nommage cohérent des tokens dans `_primitives.scss`, `_semantic.scss` et `_tokens.scss`
- Documentation mise à jour des règles de nommage
- Suppression des variables dépréciées expirées

### Impacts
- Meilleure lisibilité du code
- Réduction de la surface de maintenance

### Risques
- Risque de régression si les variables dépréciées sont encore utilisées dans du code externe

### Tâches

- [x] `projects/ds-angular/src/styles/tokens/_tokens.scss` — Supprimer les variables dépréciées de badge expirées au 2025-06-01 (lignes 188-200) : `--badge-bg-color`, `--badge-text-color`, `--badge-fg` — **Critère** : aucune variable dépréciée présente dans le fichier
- [x] `projects/ds-angular/src/styles/tokens/_primitives.scss` — Vérifier l'absence d'usages de tokens dépréciés dans Storybook et composants via recherche globale — **Critère** : aucune occurrence de `--badge-bg-color`, `--badge-text-color`, `--badge-fg` dans les fichiers `.ts`, `.scss`, `.html`
- [x] `projects/ds-angular/src/styles/tokens/_semantic.scss` — Ajouter un commentaire de section pour `// === POPOVER ===` manquant (ligne 201) pour cohérence avec les autres sections — **Critère** : toutes les sections de composants ont un commentaire `// === NOM ===`
- [x] `projects/ds-angular/src/styles/themes/_light.scss` — Harmoniser le nommage des variables `--modal-border-color` et `--modal-border` (actuellement les deux existent) en conservant uniquement `--modal-border-color` — **Critère** : une seule variable de bordure modale existe
- [x] `projects/ds-angular/src/styles/themes/_dark.scss` — Harmoniser le nommage des variables `--modal-border-color` et `--input-border-color` / `--input-border` (duplications) en conservant uniquement les versions `-color` — **Critère** : aucune duplication de variable de bordure
- [x] `projects/ds-angular/src/lib/Tokens.mdx` — Documenter les règles de nommage des tokens (primitifs, sémantiques, thématiques) avec des exemples concrets et la hiérarchie des couches — **Critère** : section "Règles de nommage" présente avec au moins 3 exemples

---

## ÉTAPE 2 — Consolidation de la couche primitives

### Objectif
Renforcer la stabilité, la testabilité et la cohérence des primitives pour garantir leur rôle de fondation du design system.

### Prérequis
Étape 1 terminée (tokens harmonisés).

### Livrables
- Tests unitaires complets pour toutes les primitives
- Documentation inline des propriétés et événements
- Conformité stricte au contrat "primitive = pas de logique métier"

### Impacts
- Réduction des régressions sur les composants DS
- Onboarding facilité pour les nouveaux développeurs

### Risques
- Découverte de bugs dans les primitives existantes lors de l'écriture des tests

### Tâches

- [x] `projects/ds-angular/src/lib/primitives/primitive-button/primitive-button.spec.ts` — Compléter les tests unitaires : tester toutes les variantes (primary, secondary, ghost, success, warning, error, info), tailles (sm, md, lg), apparences (solid, outline), états (disabled, block) et émission de l'événement `clicked` — **Critère** : couverture ≥ 90% sur primitive-button.ts
- [x] `projects/ds-angular/src/lib/primitives/primitive-input/primitive-input.spec.ts` — Compléter les tests unitaires : tester les états (disabled, readonly), sizes, types (text, email, password), émission d'événements (valueChange, blur, focus), placeholder et label — **Critère** : couverture ≥ 90% sur primitive-input.ts
- [x] `projects/ds-angular/src/lib/primitives/primitive-checkbox/primitive-checkbox.spec.ts` — Compléter les tests unitaires : tester les états (checked, disabled, indeterminate), sizes, émission de l'événement `checkedChange`, et intégration ControlValueAccessor — **Critère** : couverture ≥ 90% sur primitive-checkbox.ts
- [x] `projects/ds-angular/src/lib/primitives/primitive-radio/primitive-radio.spec.ts` — Compléter les tests unitaires : tester les états (checked, disabled), sizes, émission de l'événement `checkedChange`, comportement en groupe — **Critère** : couverture ≥ 90% sur primitive-radio.ts
- [x] `projects/ds-angular/src/lib/primitives/primitive-toggle/primitive-toggle.spec.ts` — Compléter les tests unitaires : tester les états (checked, disabled), sizes, émission de l'événement `checkedChange`, et intégration ControlValueAccessor — **Critère** : couverture ≥ 90% sur primitive-toggle.ts
- [x] `projects/ds-angular/src/lib/primitives/primitive-textarea/primitive-textarea.spec.ts` — Compléter les tests unitaires : tester les états (disabled, readonly), placeholder, rows, émission d'événements (valueChange, blur, focus) — **Critère** : couverture ≥ 90% sur primitive-textarea.ts
- [x] `projects/ds-angular/src/lib/primitives/primitive-badge/primitive-badge.spec.ts` — Compléter les tests unitaires : tester les variantes (default, primary, secondary, success, warning, error, info, neutral, accent), sizes, apparences (solid, outline), shapes (default, pill, square) — **Critère** : couverture ≥ 90% sur primitive-badge.ts
- [x] `projects/ds-angular/src/lib/primitives/primitive-button/primitive-button.ts` — Ajouter des commentaires JSDoc complets pour toutes les propriétés `input()` et `output()` en décrivant leur rôle, valeurs possibles et comportement — **Critère** : tous les inputs/outputs ont un commentaire JSDoc avec `@description`, `@example` si pertinent

---

## ÉTAPE 3 — Renforcement de la couche components

### Objectif
Améliorer la robustesse, l'accessibilité et la documentation des composants DS pour garantir leur qualité en production.

### Prérequis
Étape 2 terminée (primitives consolidées).

### Livrables
- Tests unitaires complets pour tous les composants DS
- Audit accessibilité (ARIA, focus, clavier) avec corrections
- Stories Storybook enrichies (tous les cas d'usage)

### Impacts
- Conformité WCAG 2.1 niveau AA
- Réduction des bugs en production
- Expérience développeur améliorée

### Risques
- Découverte de problèmes d'accessibilité nécessitant des refactorisations

### Tâches

- [x] `projects/ds-angular/src/lib/components/ds-button/ds-button.spec.ts` — Compléter les tests unitaires : tester tous les inputs (variant, appearance, size, submit, disabled, loading, block, iconStart, iconEnd), émission de l'événement `clicked`, état `isDisabled` calculé, type de bouton calculé (button/submit) — **Critère** : couverture ≥ 90% sur ds-button.ts
- [x] `projects/ds-angular/src/lib/components/ds-modal/ds-modal.component.spec.ts` — Compléter les tests unitaires : tester ouverture/fermeture, closable, closeOnBackdrop, focus trap, émissions d'événements (opened, closed), tailles (sm, md, lg), types (success, warning, error, info), lock/unlock body scroll, gestion ESC — **Critère** : couverture ≥ 85% sur ds-modal.component.ts
- [x] `projects/ds-angular/src/lib/components/ds-dropdown/ds-dropdown.spec.ts` — Compléter les tests unitaires : tester ouverture/fermeture, navigation clavier (ArrowDown, ArrowUp, Enter, Escape), sélection d'items, émission de l'événement `itemSelected`, gestion du backdrop — **Critère** : couverture ≥ 85% sur ds-dropdown.ts
- [x] `projects/ds-angular/src/lib/components/ds-toast/ds-toast.service.spec.ts` — Compléter les tests unitaires : tester création/suppression de toasts, types (success, warning, error, info), durée d'affichage, fermeture manuelle, limite de toasts simultanés — **Critère** : couverture ≥ 90% sur ds-toast.service.ts
- [ ] `projects/ds-angular/src/lib/components/ds-checkbox/ds-checkbox.spec.ts` — Compléter les tests unitaires : tester tous les inputs (size, disabled, label), intégration ControlValueAccessor, émission de l'événement `checkedChange`, états indeterminate — **Critère** : couverture ≥ 90% sur ds-checkbox.ts
- [ ] `projects/ds-angular/src/lib/components/ds-input-field/ds-input-field.spec.ts` — Compléter les tests unitaires : tester tous les inputs (size, type, disabled, readonly, label, placeholder, error, iconStart, iconEnd), intégration ControlValueAccessor, émissions d'événements (valueChange, blur, focus) — **Critère** : couverture ≥ 90% sur ds-input-field.ts
- [ ] `projects/ds-angular/src/lib/components/ds-tabs/ds-tabs.spec.ts` — Compléter les tests unitaires : tester navigation clavier (ArrowLeft, ArrowRight), sélection de tab, émission de l'événement `selectedChange`, état disabled, ARIA attributes (role, aria-selected) — **Critère** : couverture ≥ 85% sur ds-tabs.ts
- [ ] `projects/ds-angular/src/lib/components/ds-tooltip/ds-tooltip.directive.spec.ts` — Compléter les tests unitaires : tester affichage/masquage au hover, positions (top, bottom, left, right), delay, fermeture au clic extérieur — **Critère** : couverture ≥ 85% sur ds-tooltip.directive.ts
- [ ] `projects/ds-angular/src/lib/components/ds-popover/ds-popover.directive.spec.ts` — Compléter les tests unitaires : tester affichage/masquage au clic, positions (top, bottom, left, right), fermeture au clic extérieur, gestion du backdrop — **Critère** : couverture ≥ 85% sur ds-popover.directive.ts
- [ ] `projects/ds-angular/src/lib/components/ds-breadcrumb/ds-breadcrumb.spec.ts` — Compléter les tests unitaires : tester rendu des items, séparateurs, émission de l'événement `itemClicked`, état actif du dernier item, navigation — **Critère** : couverture ≥ 90% sur ds-breadcrumb.ts
- [ ] `projects/ds-angular/src/lib/components/ds-radio-group/ds-radio-group.spec.ts` — Compléter les tests unitaires : tester sélection exclusive, navigation clavier (ArrowUp, ArrowDown), intégration ControlValueAccessor, état disabled, émission de l'événement `valueChange` — **Critère** : couverture ≥ 90% sur ds-radio-group.ts
- [ ] `projects/ds-angular/src/lib/components/ds-toggle/ds-toggle.spec.ts` — Compléter les tests unitaires : tester tous les inputs (size, disabled, label), intégration ControlValueAccessor, émission de l'événement `checkedChange` — **Critère** : couverture ≥ 90% sur ds-toggle.ts
- [ ] `projects/ds-angular/src/lib/components/ds-modal/ds-modal.component.ts` — Audit accessibilité : vérifier les attributs ARIA (aria-modal, aria-labelledby, aria-describedby), role="dialog", focus trap fonctionnel, gestion ESC — **Critère** : conformité WCAG 2.1 AA sur les critères 2.1.1, 2.1.2, 4.1.2
- [ ] `projects/ds-angular/src/lib/components/ds-dropdown/ds-dropdown.ts` — Audit accessibilité : ajouter role="menu", aria-expanded, aria-haspopup, navigation clavier complète (ArrowUp/Down, Home, End, Enter, Escape), focus visible — **Critère** : conformité WCAG 2.1 AA sur les critères 2.1.1, 2.1.2, 4.1.2
- [ ] `projects/ds-angular/src/lib/components/ds-tabs/ds-tabs.ts` — Audit accessibilité : vérifier role="tablist", role="tab", role="tabpanel", aria-selected, aria-controls, navigation clavier (ArrowLeft/Right, Home, End) — **Critère** : conformité WCAG 2.1 AA sur les critères 2.1.1, 4.1.2

---

## ÉTAPE 4 — Documentation et guides d'usage

### Objectif
Fournir une documentation complète pour faciliter l'adoption, l'usage et la contribution au design system.

### Prérequis
Étapes 1, 2 et 3 terminées (tokens, primitives, components consolidés).

### Livrables
- Guide de contribution enrichi
- Documentation des patterns de composition
- Exemples d'intégration Angular (reactive forms, signals)
- Guide de migration entre versions

### Impacts
- Adoption facilitée par les équipes
- Réduction du support nécessaire
- Cohérence d'usage entre projets

### Risques
- Aucun risque technique

### Tâches

- [ ] `projects/ds-angular/src/lib/Contributing.mdx` — Enrichir le guide de contribution : ajouter des sections sur la structure du projet, les conventions de nommage, le workflow de développement (branche, PR, tests), et les bonnes pratiques (accessibilité, performance) — **Critère** : guide contient au moins 5 sections structurées avec exemples de code
- [ ] `projects/ds-angular/src/lib/Introduction.mdx` — Ajouter une section "Quick Start" avec exemples d'installation, import de tokens, et utilisation basique d'un composant (ds-button) — **Critère** : section "Quick Start" présente avec 3 exemples de code exécutables
- [ ] `projects/ds-angular/src/lib/Tokens.mdx` — Ajouter des exemples visuels de tous les tokens (couleurs, spacing, radius, shadows) avec rendu en Storybook via Canvas — **Critère** : tous les groupes de tokens ont au moins un exemple visuel
- [ ] `projects/ds-angular/src/lib/` — Créer `Patterns.mdx` documentant les patterns de composition courants : formulaire complet (input + checkbox + button), modal avec formulaire, dropdown dans toolbar, toast notifications système — **Critère** : fichier créé avec au moins 4 patterns documentés et illustrés
- [ ] `projects/ds-angular/src/lib/` — Créer `Integration.mdx` documentant l'intégration avec Angular : reactive forms (FormControl, FormGroup), signals (input(), computed()), validation, gestion d'erreurs — **Critère** : fichier créé avec au moins 3 exemples d'intégration complets
- [ ] `projects/ds-angular/src/lib/components/ds-button/` — Enrichir `ds-button.stories.ts` : ajouter des stories pour tous les cas d'usage (loading state, avec icônes start/end, block mode, tous les variants × appearances) — **Critère** : au moins 12 stories couvrant toutes les combinaisons principales
- [ ] `projects/ds-angular/src/lib/components/ds-modal/` — Enrichir `ds-modal.stories.ts` : ajouter des stories pour chaque type (success, warning, error, info), tailles (sm, md, lg), avec/sans icône, avec contenu scrollable, avec formulaire — **Critère** : au moins 10 stories couvrant les cas d'usage principaux
- [ ] `projects/ds-angular/src/lib/components/ds-input-field/` — Enrichir `ds-input-field.stories.ts` : ajouter des stories pour tous les états (error, success, warning, disabled, readonly), avec label, avec icônes, tous les types HTML (text, email, password, number) — **Critère** : au moins 15 stories couvrant tous les états et types

---

## ÉTAPE 5 — Outillage et CI/CD

### Objectif
Automatiser la vérification de la qualité, des tests et de l'accessibilité pour garantir un design system maintenable et fiable.

### Prérequis
Étapes 1 à 4 terminées (base consolidée et documentée).

### Livrables
- Pipeline CI/CD avec tests automatisés
- Audit accessibilité automatisé (axe-core)
- Rapport de couverture de tests
- Vérification de build avant publication npm

### Impacts
- Détection précoce des régressions
- Conformité accessibilité garantie
- Publication sécurisée sur npm

### Risques
- Temps de setup initial pour la CI/CD

### Tâches

- [ ] `.github/workflows/` — Créer `ci.yml` : workflow GitHub Actions exécutant `npm run test:headless` et `npm run build:lib` sur chaque PR — **Critère** : workflow créé, s'exécute sur PR, bloque le merge si échec
- [ ] `.github/workflows/ci.yml` — Ajouter étape de vérification de couverture de tests : échec si couverture globale < 80% — **Critère** : step ajoutée, seuil configurable, rapport publié en commentaire de PR
- [ ] `package.json` — Ajouter script `test:a11y` utilisant `@storybook/addon-a11y` pour auditer tous les composants Storybook avec axe-core — **Critère** : script créé, exécutable, retourne erreur si violation WCAG AA détectée
- [ ] `.github/workflows/ci.yml` — Ajouter étape d'audit accessibilité avec `npm run test:a11y` sur chaque PR — **Critère** : step ajoutée, bloque le merge si violations WCAG AA détectées
- [ ] `package.json` — Ajouter script `validate:tokens` vérifiant la cohérence des tokens (primitives → semantic → themes) via script Node.js custom — **Critère** : script créé, détecte les tokens manquants, duplications, et références invalides
- [ ] `.github/workflows/` — Créer `publish.yml` : workflow de publication npm automatique sur tag git, incluant build, tests, validation tokens, génération changelog — **Critère** : workflow créé, s'exécute sur tag `v*`, publie sur npm avec authentification par secret
- [ ] `projects/ds-angular/` — Configurer `ng-packagr` pour générer la documentation TypeDoc des exports publics lors du build — **Critère** : fichier `typedoc.json` créé, documentation générée dans `dist/ds-angular/docs/`
- [ ] `README.md` — Ajouter badges de statut CI/CD (build, tests, coverage, npm version) en en-tête du fichier — **Critère** : au moins 4 badges présents et fonctionnels

---

## ÉTAPE 6 — Optimisation et performance

### Objectif
Optimiser les performances du design system pour réduire la taille du bundle, améliorer le tree-shaking et garantir une expérience fluide.

### Prérequis
Étape 5 terminée (CI/CD opérationnelle).

### Livrables
- Analyse du bundle size
- Optimisation du tree-shaking
- Lazy-loading des icônes FontAwesome
- Benchmark de performance des composants

### Impacts
- Réduction de 20-30% du bundle size
- Temps de chargement amélioré
- Expérience utilisateur optimisée

### Risques
- Complexification de l'import des composants si mal implémenté

### Tâches

- [ ] `package.json` — Ajouter script `analyze:bundle` utilisant `webpack-bundle-analyzer` ou équivalent pour visualiser la taille du bundle de `ds-angular` — **Critère** : script créé, génère rapport HTML avec breakdown par module
- [ ] `projects/ds-angular/ng-package.json` — Vérifier que `sideEffects: false` est bien configuré pour activer le tree-shaking optimal — **Critère** : propriété présente et à `false`
- [ ] `projects/ds-angular/src/lib/components/index.ts` — Vérifier que tous les exports sont nommés (pas de `export *`) pour faciliter le tree-shaking — **Critère** : uniquement des exports nommés explicites
- [ ] `projects/ds-angular/src/lib/primitives/index.ts` — Vérifier que tous les exports sont nommés (pas de `export *`) pour faciliter le tree-shaking — **Critère** : uniquement des exports nommés explicites
- [ ] `projects/ds-angular/src/lib/components/` — Refactoriser les imports FontAwesome pour utiliser le pattern lazy-loading : créer un service `IconRegistry` centralisant les icônes nécessaires au lieu d'imports directs — **Critère** : service créé, tous les composants l'utilisent, réduction ≥ 15% du bundle FontAwesome
- [ ] `package.json` — Ajouter script `perf:benchmark` exécutant des tests de performance (temps de rendu, interactions clavier/souris) sur composants clés (ds-button, ds-modal, ds-dropdown) avec `@angular/cdk/testing` — **Critère** : script créé, génère rapport JSON avec métriques de performance
- [ ] `.github/workflows/ci.yml` — Ajouter étape de détection de régression de bundle size : comparer avec branche `master`, alerter si augmentation > 5% — **Critère** : step ajoutée, publie commentaire de PR avec diff de taille
- [ ] `projects/ds-angular/src/styles/_index.scss` — Optimiser les imports de tokens : importer uniquement les tokens nécessaires par composant via `@use` au lieu de charger tout `_index.scss` — **Critère** : chaque fichier SCSS de composant importe uniquement ses dépendances exactes

---

## Prochaines étapes après consolidation

- **Composants manquants** : Envisager l'ajout de ds-accordion, ds-progress, ds-alert, ds-card selon les besoins métier
- **Thème dark amélioré** : Audit du contraste WCAG sur toutes les combinaisons de couleurs
- **Animations** : Enrichir les tokens d'animation (spring, bounce) et documenter les transitions
- **Responsive** : Ajouter des tokens et patterns pour le design responsive (breakpoints, container queries)
- **Internationalisation** : Support i18n pour les labels par défaut (aria-label, placeholders)
