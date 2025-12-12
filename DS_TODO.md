# DS_TODO - Design System Tasks

> Généré automatiquement par `/orchestrator-ds`
> Date : 2025-12-12
> **Dernière mise à jour : 2025-12-12 12:10**

---

## Tokens ✅ TERMINÉ

- [x] [TOKEN] Ajouter tokens sémantiques ds-chip (_semantic.scss) | `_semantic.scss` | ~1h
- [x] [TOKEN] Exposer tokens ds-chip dans _tokens.scss | `_tokens.scss` | ~0.5h
- [x] [TOKEN] Ajouter tokens thématiques ds-chip dans _light.scss | `_light.scss` | ~0.5h
- [x] [TOKEN] Ajouter tokens thématiques ds-chip dans _dark.scss | `_dark.scss` | ~0.5h
- [x] [TOKEN] Corriger bug --gray-750 dans _dark.scss (lignes 610, 621) | `_dark.scss` | ~0.5h

## Composants ✅ TERMINÉ

- [x] [COMP] Vérifier et corriger erreurs TypeScript ds-chip (si présentes) | `ds-chip.ts` | ~1h
- [x] [COMP] Vérifier et corriger erreurs TypeScript ds-slider (si présentes) | `ds-slider.ts` | ~1h
- [x] [COMP] Vérifier et corriger erreurs TypeScript ds-file-upload (protected→readonly) | `ds-file-upload.ts` | ~1h

## Stories ✅ DÉJÀ EXISTANTES

- [x] [STORY] Story "Themed" pour ds-chip (Light/Dark/Custom) | `ds-chip.stories.ts` | ✅
- [x] [STORY] Story "Themed" pour ds-slider (Light/Dark/Custom) | `ds-slider.stories.ts` | ✅
- [x] [STORY] Story "Themed" pour ds-file-upload (Light/Dark/Custom) | `ds-file-upload.stories.ts` | ✅

## Documentation ✅ TERMINÉ

- [x] [DOC] Documenter ds-chip dans Tokens.mdx (section composants SPRINT-001) | `Tokens.mdx` | ~0.5h
- [x] [DOC] Documenter ds-slider dans Tokens.mdx (section composants SPRINT-001) | `Tokens.mdx` | ~0.5h
- [x] [DOC] Documenter ds-file-upload dans Tokens.mdx (section composants SPRINT-001) | `Tokens.mdx` | ~0.5h

## Tests ✅ TERMINÉ (99.8%)

- [x] [TEST] Exécuter tests unitaires ds-chip et corriger échecs | `ds-chip.spec.ts` | ~1h
- [x] [TEST] Exécuter tests unitaires ds-slider | `ds-slider.spec.ts` | ✅
- [x] [TEST] Exécuter tests unitaires ds-file-upload | `ds-file-upload.spec.ts` | ~1h
- [ ] [TEST] Ajouter tests e2e Playwright pour ds-chip | `e2e/chip.spec.ts` | ~2h
- [ ] [TEST] Ajouter tests e2e Playwright pour ds-slider | `e2e/slider.spec.ts` | ~2h
- [ ] [TEST] Ajouter tests e2e Playwright pour ds-file-upload | `e2e/file-upload.spec.ts` | ~2h

---

## Résumé

| Catégorie | Statut | Progression |
|-----------|--------|-------------|
| TOKEN | ✅ TERMINÉ | 5/5 (100%) |
| COMP | ✅ TERMINÉ | 3/3 (100%) |
| STORY | ✅ EXISTANT | 3/3 (100%) |
| DOC | ✅ TERMINÉ | 3/3 (100%) |
| TEST (unitaires) | ✅ TERMINÉ | 1628/1630 (99.8%) |
| TEST (e2e) | ⏳ EN ATTENTE | 0/3 (0%) |

**Total** : 17/20 tâches terminées (85%)

---

## Détails des corrections effectuées

### Tokens ds-chip
- **_semantic.scss** : 16 variables SCSS (tailles, paddings, fonts, gaps, avatars, icônes)
- **_tokens.scss** : 27 CSS custom properties exposées sur `:root`
- **_light.scss** : 42 tokens thématiques (default, primary, success, warning, error, info)
- **_dark.scss** : 42 tokens thématiques adaptés au dark mode

### Bug --gray-750 corrigé
- Lignes 610 et 621 de `_dark.scss` : `--gray-750` → `--gray-700`

### Correction ds-file-upload.ts
- Icônes FontAwesome `protected` → `readonly` pour accès template

### Correction ds-chip.spec.ts
- Ajout helper `getChipElement()` pour query DOM après detectChanges()
- Remplacement de toutes les références `chipElement` obsolètes

### Documentation Tokens.mdx
- Nouvelle section "Tokens composants SPRINT-001"
- 3 sous-sections : Chip (18 tokens), Slider (14 tokens), File Upload (15 tokens)
- Exemples visuels interactifs pour chaque composant

---

## Prochaines étapes (SPRINT-002)

### Priorité haute
1. [ ] Tests e2e Playwright pour chip, slider, file-upload
2. [ ] Correction test `DsFileUpload Multiple files should replace file in single mode`

### Priorité moyenne
3. [ ] Tokens ds-chip dans `_custom.scss` (thème custom)
4. [ ] Documentation accessibilité WCAG 2.1 AA

### Priorité basse
5. [ ] Exemples d'utilisation dans Integration.mdx
6. [ ] Publication npm v1.3.0

---

## Métriques finales

| Métrique | Valeur |
|----------|--------|
| Composants DS total | 33 |
| Tests unitaires | 1628/1630 (99.8%) |
| Build bibliothèque | ✅ 3.9s |
| Tokens sémantiques ds-chip | 16 |
| Tokens thématiques ds-chip | 84 (42 light + 42 dark) |
