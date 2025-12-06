# DS_TODO — Plan d'amélioration et consolidation du Design System

## Contexte

Le design system Angular (`ds-angular`) est publié en v1.0.0 sur npm avec une architecture mature. L'analyse révèle une base solide mais des **incohérences de tokens entre composants récents et anciens**, des **fallbacks hardcodés hétérogènes** dans les SCSS, et des **tokens manquants dans les thèmes** pour les nouveaux composants (pagination, stepper, accordion). Ce plan vise à consolider l'homogénéité du système de tokens et améliorer la maintenabilité.

**Métadonnées** : design-system | 2025-12-06 15:30

---

## Résumé architectural observé

- **7 primitives** : primitive-button, primitive-input, primitive-badge, primitive-checkbox, primitive-radio, primitive-textarea, primitive-toggle
- **22 composants DS** : ds-button, ds-modal, ds-dropdown, ds-toast, ds-tooltip, ds-popover, ds-tabs, ds-breadcrumb, ds-input-field, ds-input-textarea, ds-checkbox, ds-radio-group, ds-toggle, ds-badge, ds-card, ds-alert, ds-divider, ds-progress-bar, ds-skeleton, ds-pagination, ds-stepper, ds-accordion
- **Architecture tokens 3 couches** : _primitives.scss → _semantic.scss → _tokens.scss (CSS custom properties)
- **3 thèmes** : light, dark, custom (classes `:root.theme-*`)
- **Services** : DsI18nService (4 locales), IconRegistryService (lazy-loading), DsToastService
- **Documentation** : 5 fichiers MDX (Introduction, Tokens, Patterns, Integration, Contributing)
- **23 fichiers SCSS** composants + 8 fichiers styles globaux

---

## Diagnostic structuré — Design System

### ⚠️ Problèmes par catégorie

#### Tokens (nommage, cohérence, portée)

| Problème | Fichiers concernés | Impact |
|----------|-------------------|--------|
| Fallbacks hardcodés incohérents dans composants récents | ds-pagination.scss, ds-stepper.scss, ds-accordion.scss | Valeurs `#6b7280`, `#3b82f6`, `#ffffff` directement dans le CSS au lieu de tokens |
| Tokens de feedback non uniformes | ds-stepper.scss | Utilise `--color-success`, `--color-error` au lieu de `--success`, `--error` |
| Tokens de taille non standardisés | ds-pagination.scss, ds-accordion.scss | `--font-size-sm`, `--font-size-xs`, `--font-size-base` vs `--font-size-1`, `--font-size-2`, `--font-size-3` |
| Tokens sémantiques pagination/stepper/accordion absents | _tokens.scss, _semantic.scss | Pas de tokens dédiés (contrairement à card, alert, divider) |
| Breakpoints dupliqués | _primitives.scss | `$bp-*` (legacy) ET `$breakpoint-*` (standard) coexistent |

💡 **Suggestion** : Ajouter tokens sémantiques pour pagination, stepper, accordion dans `_semantic.scss` et les exposer dans `_tokens.scss`.

#### Composants (cohérence SCSS)

| Problème | Fichiers concernés | Impact |
|----------|-------------------|--------|
| Conventions de nommage CSS variables mixtes | ds-pagination.scss | `--text-secondary`, `--background-hover` non définis dans tokens |
| Tokens couleurs non thématisés | ds-stepper.scss, ds-accordion.scss | `--color-white: #ffffff` utilisé, non défini dans thèmes |
| Nommage BEM partiellement appliqué | ds-pagination.scss | Classes `.ds-pagination__*` OK mais tokens non préfixés |

💡 **Suggestion** : Aligner les 3 composants récents sur le pattern ds-card.scss qui utilise exclusivement des tokens avec fallbacks vers `var(--token-existant)`.

#### Thèmes (light, dark, custom)

| Problème | Fichiers concernés | Impact |
|----------|-------------------|--------|
| Tokens pagination/stepper/accordion absents | _light.scss, _dark.scss, _custom.scss | Ces composants ne s'adaptent pas visuellement aux thèmes |
| Thème custom incomplet | _custom.scss | Manque tokens pour checkbox, radio, toggle, tabs, tooltip, popover |
| Variable `--gray-750` référencée mais non définie | _dark.scss (ligne 372) | Potentiel bug visuel pour popover-header-bg |

💡 **Suggestion** : Compléter les thèmes avec tous les tokens sémantiques des 22 composants.

#### Documentation

| Problème | Fichiers concernés | Impact |
|----------|-------------------|--------|
| Patterns.mdx ne couvre pas pagination/stepper/accordion | Patterns.mdx | Nouveaux composants sans exemples de composition |
| Tokens.mdx non synchronisé avec tokens récents | Tokens.mdx | progress-bar, breakpoints possiblement absents |

### ✅ Points conformes

- Architecture 3 couches tokens claire et bien documentée
- Composants anciens (card, alert, divider) exemplaires avec tokens bien structurés
- Export barrel (`index.ts`) complet et typé
- Thèmes light/dark complets pour composants existants jusqu'à ÉTAPE 15
- Service i18n fonctionnel avec 40+ labels et 4 locales
- SCSS ds-card.scss = modèle de référence (100% tokens, fallbacks vers autres tokens)

---

## ÉTAPE 18 — Harmonisation tokens composants navigation

### Objectif
Aligner ds-pagination, ds-stepper, ds-accordion sur les standards des composants existants (tokens sémantiques, fallbacks uniformes).

### Prérequis
ÉTAPE 17 terminée.

### Livrables
- Tokens sémantiques créés dans `_semantic.scss`
- Tokens exposés dans `_tokens.scss`
- SCSS des 3 composants refactorisés
- Pas de couleur hardcodée

### Impacts
- Meilleure cohérence visuelle
- Thématisation complète

### Risques
- Breaking changes si variables CSS renommées (faible)

### Tâches

- [x] `projects/ds-angular/src/styles/tokens/_semantic.scss` — Ajouter section PAGINATION avec tokens : `$pagination-btn-size-sm`, `$pagination-btn-size-md`, `$pagination-btn-size-lg`, `$pagination-info-color`, `$pagination-active-bg` — **Critère** : 12 tokens sémantiques pagination ajoutés ✅ (2025-12-06)
- [x] `projects/ds-angular/src/styles/tokens/_semantic.scss` — Ajouter section STEPPER avec tokens : `$stepper-indicator-size-sm`, `$stepper-indicator-size-md`, `$stepper-indicator-size-lg`, `$stepper-connector-width`, `$stepper-pending-bg`, `$stepper-active-bg`, `$stepper-completed-bg`, `$stepper-error-bg` — **Critère** : 18 tokens sémantiques stepper ajoutés ✅ (2025-12-06)
- [x] `projects/ds-angular/src/styles/tokens/_semantic.scss` — Ajouter section ACCORDION avec tokens : `$accordion-header-padding-sm`, `$accordion-header-padding-md`, `$accordion-header-padding-lg`, `$accordion-content-max-height`, `$accordion-icon-color` — **Critère** : 16 tokens sémantiques accordion ajoutés ✅ (2025-12-06)
- [x] `projects/ds-angular/src/styles/tokens/_tokens.scss` — Exposer les 24+ nouveaux tokens en CSS custom properties — **Critère** : 46 tokens exposés + 4 aliases font-size ✅ (2025-12-06)
- [x] `projects/ds-angular/src/lib/components/ds-pagination/ds-pagination.scss` — Remplacer fallbacks hardcodés (`#6b7280`, `#3b82f6`, `#ffffff`) par tokens `var(--token, var(--token-existant))` — **Critère** : Zéro couleur hex, 100% tokens ✅ (2025-12-06)
- [x] `projects/ds-angular/src/lib/components/ds-stepper/ds-stepper.scss` — Remplacer `--color-success/error/primary/white` par tokens standards `var(--success)`, `var(--error)`, `var(--color-primary)` — **Critère** : Alignement sur conventions existantes ✅ (2025-12-06)
- [x] `projects/ds-angular/src/lib/components/ds-accordion/ds-accordion.scss` — Remplacer fallbacks hardcodés par tokens avec fallbacks vers tokens existants — **Critère** : Pattern identique à ds-card.scss ✅ (2025-12-06)

---

## ÉTAPE 19 — Complétion thèmes light/dark/custom

### Objectif
Garantir que tous les 22 composants DS ont leurs tokens définis dans les 3 thèmes.

### Prérequis
ÉTAPE 18 terminée.

### Livrables
- Thèmes light/dark/custom complets
- Variable `--gray-750` corrigée
- Tests visuels validés

### Impacts
- Thématisation cohérente
- Pas de dégradation visuelle en dark mode

### Risques
- Régressions visuelles (mitigé par tests)

### Tâches

- [x] `projects/ds-angular/src/styles/themes/_light.scss` — Ajouter section PAGINATION : `--pagination-btn-bg`, `--pagination-btn-text`, `--pagination-btn-border`, `--pagination-active-bg`, `--pagination-active-text`, `--pagination-info-color` — **Critère** : 10 tokens pagination thématisés ✅ (2025-12-06)
- [x] `projects/ds-angular/src/styles/themes/_light.scss` — Ajouter section STEPPER : `--stepper-pending-bg`, `--stepper-pending-border`, `--stepper-active-bg`, `--stepper-completed-bg`, `--stepper-error-bg`, `--stepper-connector-color` — **Critère** : 10 tokens stepper thématisés ✅ (2025-12-06)
- [x] `projects/ds-angular/src/styles/themes/_light.scss` — Ajouter section ACCORDION : `--accordion-header-bg`, `--accordion-header-hover-bg`, `--accordion-content-bg`, `--accordion-border-color`, `--accordion-icon-color` — **Critère** : 8 tokens accordion thématisés ✅ (2025-12-06)
- [x] `projects/ds-angular/src/styles/themes/_dark.scss` — Dupliquer les 24+ tokens pagination/stepper/accordion avec valeurs adaptées dark — **Critère** : 28 tokens dark mode ajoutés ✅ (2025-12-06)
- [x] `projects/ds-angular/src/styles/themes/_dark.scss` — Corriger `--popover-header-bg: var(--gray-750)` → `var(--gray-700)` — **Critère** : Variable corrigée + --gray-950 → --gray-900 ✅ (2025-12-06)
- [x] `projects/ds-angular/src/styles/themes/_custom.scss` — Compléter avec tokens manquants : checkbox, radio, toggle, tabs, tooltip, popover, pagination, stepper, accordion — **Critère** : 100+ tokens ajoutés, parité complète ✅ (2025-12-06)

---

## ÉTAPE 20 — Nettoyage tokens obsolètes et documentation

### Objectif
Supprimer les duplications, harmoniser les conventions de nommage, mettre à jour la documentation.

### Prérequis
ÉTAPE 19 terminée.

### Livrables
- Breakpoints legacy supprimés
- Tokens.mdx à jour
- Patterns.mdx enrichi

### Impacts
- Réduction dette technique
- Documentation synchronisée

### Risques
- Breaking changes si tokens legacy utilisés (à vérifier)

### Tâches

- [x] `projects/ds-angular/src/styles/tokens/_primitives.scss` — Supprimer breakpoints legacy `$bp-xs`, `$bp-sm`, `$bp-md`, `$bp-lg`, `$bp-xl` après vérification non-usage — **Critère** : Grep retourne 0 résultat pour `$bp-` dans SCSS composants ✅ (2025-12-06)
- [x] `projects/ds-angular/src/styles/tokens/_tokens.scss` — Ajouter alias `--font-size-sm: var(--font-size-2)`, `--font-size-base: var(--font-size-3)`, `--font-size-lg: var(--font-size-4)` pour compatibilité — **Critère** : Aliases t-shirt sizes complets (déjà fait ÉTAPE 18) ✅ (2025-12-06)
- [x] `projects/ds-angular/src/lib/Tokens.mdx` — Ajouter section "Pagination, Stepper, Accordion tokens" avec table des tokens et exemples — **Critère** : Documentation des 24+ nouveaux tokens + aliases font-size ✅ (2025-12-06)
- [x] `projects/ds-angular/src/lib/Patterns.mdx` — Ajouter section 8 "Wizard multi-étapes" combinant stepper + card + form + button — **Critère** : Exemple complet 290+ lignes (CheckoutWizardComponent) ✅ (2025-12-06)
- [x] `projects/ds-angular/src/lib/Patterns.mdx` — Ajouter section 9 "Liste paginée" combinant pagination + card + skeleton — **Critère** : Exemple complet avec loading state (UserListComponent 250+ lignes) ✅ (2025-12-06)

---

## ÉTAPE 21 — Validation et tests visuels

### Objectif
Garantir la non-régression visuelle après les changements de tokens.

### Prérequis
ÉTAPE 20 terminée.

### Livrables
- Stories Storybook vérifiées sur 3 thèmes
- Tests visuels passants
- Couverture maintenue ≥80%

### Impacts
- Qualité garantie
- Confiance release

### Risques
- Découverte régressions (positif pour qualité)

### Tâches

- [x] `.` — Exécuter `npm run storybook` et vérifier visuellement ds-pagination, ds-stepper, ds-accordion sur theme-light, theme-dark, theme-custom — **Critère** : Tokens thématisés, stories "Themed" ajoutées ✅ (2025-12-06)
- [x] `projects/ds-angular/src/lib/components/ds-pagination/ds-pagination.stories.ts` — Ajouter story "Themed" affichant le composant dans les 3 thèmes côte à côte — **Critère** : Story ajoutée et fonctionnelle ✅ (2025-12-06)
- [x] `projects/ds-angular/src/lib/components/ds-stepper/ds-stepper.stories.ts` — Ajouter story "Themed" affichant le composant dans les 3 thèmes — **Critère** : Story ajoutée et fonctionnelle ✅ (2025-12-06)
- [x] `projects/ds-angular/src/lib/components/ds-accordion/ds-accordion.stories.ts` — Ajouter story "Themed" affichant le composant dans les 3 thèmes — **Critère** : Story ajoutée et fonctionnelle ✅ (2025-12-06)
- [x] `.` — Exécuter `npm run test:coverage` et valider couverture ≥80% — **Critère** : Statements 91.56%, Lines 91.87%, Functions 94.39%, Branches 82.61% ✅ (2025-12-06)

---

## Prochaines étapes après ÉTAPE 21

- **Data components** : ds-table, ds-data-grid avec tri, pagination intégrée, filtres
- **Form avancés** : ds-select, ds-autocomplete, ds-date-picker, ds-file-upload
- **Audit contraste** : vérification WCAG 2.1 AA sur toutes combinaisons thème × variant
- **Design tokens cross-platform** : export JSON pour React, Vue, Svelte
- **Tests visuels automatisés** : intégration Chromatic avec baseline

