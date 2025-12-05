# DS_TODO — Plan de maintenance et évolution du Design System

## Contexte

Le design system Angular (`ds-angular`) est **publié en v1.0.0** sur npm avec une architecture mature : 7 primitives, 17 composants DS, système de tokens 3 couches, 3 thèmes, documentation complète (5 MDX), CI/CD opérationnelle, starter kit, et déploiement Storybook automatique. Les ÉTAPES 1-12 sont terminées. Ce plan définit les tâches de **maintenance corrective** et les **évolutions futures** pour garantir la stabilité et enrichir l'offre.

**Métadonnées** : design-system | 2025-12-05 23:15

---

## Résumé architectural observé

- **7 primitives** : primitive-button, primitive-input, primitive-badge, primitive-checkbox, primitive-radio, primitive-textarea, primitive-toggle
- **17 composants DS** : ds-button, ds-modal, ds-dropdown, ds-toast, ds-tooltip, ds-popover, ds-tabs, ds-breadcrumb, ds-input-field, ds-input-textarea, ds-checkbox, ds-radio-group, ds-toggle, ds-badge, ds-card, ds-alert, ds-divider
- **Tokens** : _primitives.scss (valeurs brutes) → _semantic.scss (tokens composants) → _tokens.scss (CSS custom properties :root)
- **Thèmes** : light, dark, custom (classes `:root.theme-*`)
- **Documentation** : Introduction.mdx, Tokens.mdx, Patterns.mdx, Integration.mdx, Contributing.mdx
- **Publication** : ds-angular@1.0.0 sur npm, Storybook auto-déployé sur GitHub Pages
- **CI/CD** : tests ≥80%, a11y WCAG 2.1 AA, bundle size ≤5MB, publication npm automatique

---

## ÉTAPE 13 — Corrections et stabilisation post-publication

### Objectif
Corriger les erreurs de tests bloquantes et stabiliser le code pour garantir que la CI passe en vert.

### Prérequis
Publication v1.0.0 terminée.

### Livrables
- Tests passent sans erreurs TypeScript
- Couverture mesurable ≥80%
- CI passe en vert

### Impacts
- Qualité de code vérifiable
- Confiance pour les utilisateurs npm

### Risques
- Modification mineure de l'API si propriétés doivent devenir publiques

### Tâches

- [x] `projects/ds-angular/src/lib/components/ds-alert/ds-alert.ts` — Rendre la propriété `icons` publique (readonly) ou créer méthode publique `getIconForType(type: AlertType)` — **Critère** : tests ds-alert.spec.ts compilent sans erreur TS2445 ✅ (2025-12-05)
- [x] `projects/ds-angular/src/lib/components/ds-alert/ds-alert.spec.ts` — Adapter les tests pour utiliser la méthode publique au lieu d'accéder directement à `icons` — **Critère** : 40/40 tests passent ✅ (2025-12-05)
- [x] `.` — Exécuter `npm run test:coverage` pour valider couverture ≥80% — **Critère** : Statements 92.51%, Lines 92.71%, Functions 93.52%, Branches 82.98% ✅ (2025-12-05)
- [x] `.github/workflows/ci.yml` — Vérifier que la CI passe en vert après corrections — **Critère** : CI success (run #19977860629) ✅ (2025-12-05)

---

## ÉTAPE 14 — Harmonisation tokens et documentation

### Objectif
Corriger les incohérences mineures de nommage des tokens et synchroniser la documentation avec les composants récents.

### Prérequis
ÉTAPE 13 terminée (tests stables).

### Livrables
- Tokens harmonisés sans breaking changes
- Patterns.mdx enrichi avec card, alert, divider

### Impacts
- Meilleure cohérence du système de design
- Documentation à jour

### Risques
- Aucun (changements rétrocompatibles)

### Tâches

- [x] `projects/ds-angular/src/styles/tokens/_tokens.scss` — Ajouter alias `--btn-radius-md` pointant vers `--btn-radius` pour cohérence — **Critère** : `--btn-radius-md: var(--btn-radius);` ajouté ligne 154 ✅ (2025-12-05)
- [x] `projects/ds-angular/src/styles/tokens/_tokens.scss` — Ajouter `--space-5: 1.25rem;` pour compléter l'échelle spacing (entre space-4 et space-6) — **Critère** : token ajouté dans _primitives.scss et _tokens.scss ✅ (2025-12-05)
- [x] `projects/ds-angular/src/lib/Patterns.mdx` — Ajouter section "Carte avec Alert" illustrant composition ds-card + ds-alert — **Critère** : Section 5 ajoutée avec exemple AccountCardComponent ✅ (2025-12-05)
- [x] `projects/ds-angular/src/lib/Patterns.mdx` — Ajouter section "Divider dans liste" illustrant ds-divider entre éléments — **Critère** : Section 6 ajoutée avec exemple SettingsListComponent et variantes ✅ (2025-12-05)

---

## ÉTAPE 15 — Composants utilitaires avancés (roadmap v1.1)

### Objectif
Enrichir l'offre du design system avec les composants utilitaires demandés dans la roadmap.

### Prérequis
ÉTAPE 14 terminée.

### Livrables
- ds-progress-bar créé (determinate, indeterminate, variants)
- ds-skeleton créé (variants: text, circle, rectangle)
- Tests ≥90% et stories complètes

### Impacts
- Offre plus complète
- Réduction duplication code consommateurs

### Risques
- Augmentation surface maintenance

### Tâches

- [x] `projects/ds-angular/src/lib/components/ds-progress-bar/` — Créer composant ds-progress-bar : modes (determinate, indeterminate), tailles (sm, md, lg), variants (default, success, warning, error) — **Critère** : 5 fichiers créés, 12+ stories, tests complets ✅ (2025-12-05)
- [x] `projects/ds-angular/src/styles/tokens/_semantic.scss` — Ajouter tokens progress-bar : `$progress-height-sm`, `$progress-height-md`, `$progress-height-lg`, `$progress-radius` — **Critère** : 6 tokens ajoutés et exposés ✅ (2025-12-05)
- [x] `projects/ds-angular/src/lib/components/ds-skeleton/` — Créer composant ds-skeleton : variants (text, circle, rectangle, card), animation pulse, tailles — **Critère** : 5 fichiers créés, 12+ stories, tests complets ✅ (2025-12-05)
- [x] `projects/ds-angular/src/lib/components/index.ts` — Exporter DsProgressBar et DsSkeleton avec types — **Critère** : 6 types exportés (DsProgressBar, DsSkeleton + types) ✅ (2025-12-05)

---

## ÉTAPE 16 — Composants navigation avancés (roadmap v1.2)

### Objectif
Ajouter les composants de navigation complexes pour couvrir les patterns courants.

### Prérequis
ÉTAPE 15 terminée.

### Livrables
- ds-pagination créé
- ds-stepper créé
- ds-accordion créé

### Impacts
- Patterns navigation complets
- Adoption facilitée projets complexes

### Risques
- Complexité accessibilité (ARIA)

### Tâches

- [x] `projects/ds-angular/src/lib/components/ds-pagination/` — Créer composant ds-pagination : pages, prev/next, first/last, page size selector, total items — **Critère** : composant créé (5 fichiers), 14 stories, 41 tests, navigation clavier, ARIA ✅ (2025-12-06)
- [x] `projects/ds-angular/src/lib/components/ds-stepper/` — Créer composant ds-stepper : horizontal/vertical, états (active, completed, error), navigation — **Critère** : composant créé (5 fichiers), 16 stories, 39 tests ✅ (2025-12-06)
- [x] `projects/ds-angular/src/lib/components/ds-accordion/` — Créer composant ds-accordion : single/multi expand, animation, header/content slots — **Critère** : composant créé (5 fichiers), 12 stories, 29 tests, ARIA ✅ (2025-12-06)
- [x] `projects/ds-angular/src/lib/components/index.ts` — Exporter DsPagination, DsStepper, DsAccordion avec types — **Critère** : 11 types exportés ✅ (2025-12-06)

---

## ÉTAPE 17 — Internationalisation et responsive design

### Objectif
Préparer le design system pour l'internationalisation et améliorer le support responsive.

### Prérequis
ÉTAPE 16 terminée.

### Livrables
- Tokens responsive (breakpoints, container queries)
- Support i18n pour labels par défaut
- Documentation responsive patterns

### Impacts
- Adoption internationale
- Meilleur support mobile

### Risques
- Breaking changes si mal planifié

### Tâches

- [ ] `projects/ds-angular/src/styles/tokens/_primitives.scss` — Ajouter tokens breakpoints : `$breakpoint-xs`, `$breakpoint-sm`, `$breakpoint-md`, `$breakpoint-lg`, `$breakpoint-xl` — **Critère** : 5 tokens avec valeurs standard (320, 576, 768, 992, 1200)
- [ ] `projects/ds-angular/src/styles/tokens/_tokens.scss` — Exposer breakpoints en CSS custom properties — **Critère** : `--breakpoint-*` disponibles
- [ ] `projects/ds-angular/src/lib/utils/i18n.service.ts` — Créer service i18n minimal pour labels par défaut (close, loading, error, etc.) — **Critère** : service créé, 10+ labels, méthode `setLocale()`
- [ ] `projects/ds-angular/src/lib/Patterns.mdx` — Ajouter section "Responsive patterns" avec exemples media queries et container queries — **Critère** : 3 exemples responsives documentés

---

## Prochaines étapes après v1.2

- **Data components** : ds-table, ds-data-grid avec tri, pagination, filtres
- **Form avancés** : ds-select, ds-autocomplete, ds-date-picker, ds-file-upload
- **Thème dark amélioré** : audit complet contraste WCAG sur toutes combinaisons
- **Design tokens cross-platform** : export JSON pour React, Vue, Svelte
- **Tests visuels** : activer Chromatic avec token projet
