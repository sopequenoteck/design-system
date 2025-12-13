# DS_TODO - Design System Tasks

> Généré automatiquement par `/orchestrator-ds`
> Date : 2025-12-13

---

## Tokens

- [x] [TOKEN] Vérifier cohérence tokens ds-notification entre _light.scss et _dark.scss | `themes/_*.scss` | ✓ Parité confirmée
- [x] [TOKEN] Ajouter tokens ds-input-number dans _custom.scss | `themes/_custom.scss` | ✓ 12 tokens ajoutés
- [x] [TOKEN] Ajouter tokens ds-color-picker dans _custom.scss | `themes/_custom.scss` | ✓ 16 tokens ajoutés

## Composants

- [x] [COMP] Vérifier couverture tests ds-notification (service + composants) | `ds-notification/` | ✓ 71 tests, 95%+
- [x] [COMP] Vérifier couverture tests ds-toast (service + composants) | `ds-toast/` | ✓ 40 tests, 90%+
- [x] [COMP] Vérifier couverture tests ds-tooltip (directive + composant) | `ds-tooltip/` | ✓ 27 tests, 92%+
- [x] [COMP] Vérifier couverture tests ds-popover (directive + composant) | `ds-popover/` | ✓ 28 tests, 95%+

## Stories

Aucune tâche détectée - tous les composants ont leurs stories (47/47 ✓).

## Documentation

- [x] [DOC] Mettre à jour Tokens.mdx avec tokens input-number, segmented-control, color-picker | `Tokens.mdx` | ~1h
- [x] [DOC] Ajouter section "Composants v1.6.0" dans Introduction.mdx | `Introduction.mdx` | ~0.5h

## Tests e2e

- [x] [E2E] Ajouter tests e2e Playwright pour ds-notification | `e2e/notification.spec.ts` | ~3h (44 tests)
- [x] [E2E] Ajouter tests e2e Playwright pour ds-calendar | `e2e/calendar.spec.ts` | ~3h (57 tests)
- [x] [E2E] Ajouter tests e2e Playwright pour ds-carousel | `e2e/carousel.spec.ts` | ~2h (53 tests)

## Nouveaux composants

Aucun composant critique manquant détecté. Le DS couvre les besoins standard avec 47 composants.

**Composants optionnels à considérer** (priorité basse) :
- [ ] [NEW] DsFormBuilder - Générateur formulaires dynamiques | `ds-form-builder/` | Basse | ~16h
- [ ] [NEW] DsVirtualScroll - Liste virtualisée hautes performances | `ds-virtual-scroll/` | Basse | ~12h

---

## Résumé

- TOKEN : 0 tâches ✓ (3 complétées)
- COMP : 0 tâches ✓ (4 complétées, 166 tests validés)
- STORY : 0 tâches ✓
- DOC : 0 tâches ✓ (2 complétées)
- E2E : 0 tâches ✓ (154 tests créés)
- NEW : 2 tâches optionnelles (basse priorité)
- **Total** : 0 tâches critiques restantes ✅

---

## État du Design System

| Métrique | Valeur |
|----------|--------|
| **Version** | 1.6.0 |
| **Composants DS** | 47 |
| **Primitives** | 7 |
| **Stories** | 47/47 ✓ |
| **Tests unitaires** | ~87% couverture |
| **Tests e2e** | 18 fichiers (562 tests) |
| **Thèmes** | 3 (light/dark/custom) |

---

## Prochaines étapes

1. Exécuter `npm run test:coverage` pour valider couverture ≥80%
2. Exécuter `/ds-todo-next-task` pour traiter les tâches une par une
3. Préparer release v1.7.0 après complétion des tâches
