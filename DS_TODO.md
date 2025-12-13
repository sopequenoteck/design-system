# DS_TODO - Design System Tasks

> Généré automatiquement par `/orchestrator-ds`
> Dernière mise à jour : 2025-12-13

---

## État actuel

| Métrique | Valeur |
|----------|--------|
| Composants DS | 47 |
| Primitives | 7 |
| Stories | 80+ |
| Tests unitaires | 2300+ |
| Tests e2e | 710+ |
| Couverture | ~87% statements |

---

## Tokens

- [x] [TOKEN] Tous les tokens structurels exposés dans `_tokens.scss` | ✅ Complet
- [x] [TOKEN] Parité light/dark pour tous les 44 composants | ✅ Complet
- [x] [TOKEN] Tokens password-strength (21 tokens) | ✅ Complet
- [x] [TOKEN] Tokens transfer (46 tokens) | ✅ Complet
- [x] [TOKEN] Tokens timeline (33 tokens) | ✅ Complet
- [x] [TOKEN] Tokens notification (24 tokens) | ✅ Complet
- [x] [TOKEN] Tokens calendar (64 tokens) | ✅ Complet
- [x] [TOKEN] Tokens carousel (37 tokens) | ✅ Complet

---

## Composants

- [x] [COMP] 44/44 composants DS | ✅ Complet
- [x] [COMP] ds-password-strength | ✅ Complet
- [x] [COMP] ds-transfer | ✅ Complet
- [x] [COMP] ds-timeline | ✅ Complet
- [x] [COMP] ds-notification | ✅ Complet
- [x] [COMP] ds-calendar | ✅ Complet
- [x] [COMP] ds-carousel | ✅ Complet

---

## Stories

- [x] [STORY] Stories 44 composants DS | ✅ Complet
- [x] [STORY] 8 stories ds-password-strength | ✅ Complet
- [x] [STORY] 14 stories ds-transfer | ✅ Complet
- [x] [STORY] 13 stories ds-timeline | ✅ Complet
- [x] [STORY] 11 stories ds-notification | ✅ Complet
- [x] [STORY] 17 stories ds-calendar | ✅ Complet
- [x] [STORY] 20 stories ds-carousel | ✅ Complet

---

## Documentation

- [x] [DOC] Tests e2e pour composants critiques | ✅ 480+ tests
- [x] [DOC] Accessibility.mdx (guide a11y WCAG 2.1 AA) | ✅ Complet
- [x] [DOC] Testing.mdx (stratégie tests unit/e2e) | ✅ Complet
- [x] [DOC] Contributing.mdx (guide contribution) | ✅ Complet

---

## Maintenance

- [x] [MAINT] Vérifier couverture tests ≥80% | ✅ ~87% statements
- [x] [MAINT] Synchronisation CLAUDE.md | ✅ Complet (44 composants documentés)
- [x] [MAINT] Publication npm v1.5.0 | ✅ Publié @kksdev/ds-angular@1.5.0
- [x] [MAINT] Tests e2e nouveaux composants (transfer, calendar, carousel, notification) | ✅ ~230 tests créés

---

## Nouveaux composants (vs Material/Ant Design)

| Composant | Priorité | Description | Estimation |
|-----------|----------|-------------|------------|
| DsInputNumber | Haute | Input numérique avec stepper +/- | ~4h |
| DsSegmentedControl | Moyenne | Boutons radio groupés visuels | ~3h |
| DsColorPicker | Moyenne | Sélecteur de couleur | ~6h |
| DsMentions | Basse | Input avec @mentions autocomplete | ~8h |
| DsBackTop | Basse | Bouton retour en haut | ~2h |

### Tâches proposées

- [x] [NEW] DsInputNumber - Input numérique avec boutons +/- | ✅ 55 tests + 14 stories
- [x] [NEW] DsSegmentedControl - Boutons radio en groupe visuel | ✅ 42 tests + 17 stories
- [x] [NEW] DsColorPicker - Sélecteur de couleur | ✅ 52 tests + 12 stories

---

## Tests e2e Playwright (17 composants couverts)

| Composant | Tests | Status |
|-----------|-------|--------|
| modal | ~12 | ✅ |
| dropdown | ~14 | ✅ |
| tabs | ~12 | ✅ |
| toast | ~14 | ✅ |
| chip | ~30 | ✅ |
| slider | ~28 | ✅ |
| file-upload | ~32 | ✅ |
| empty | ~90 | ✅ |
| rating | ~80 | ✅ |
| drawer | ~85 | ✅ |
| time-picker | ~95 | ✅ |
| tree | ~100 | ✅ |
| password-strength | ~30 | ✅ |
| transfer | ~55 | ✅ |
| calendar | ~60 | ✅ |
| carousel | ~60 | ✅ |
| notification | ~55 | ✅ |

---

## Résumé

| Catégorie | Tâches restantes | Status |
|-----------|------------------|--------|
| TOKEN | 0 | ✅ Complet |
| COMP | 0 | ✅ Complet |
| STORY | 0 | ✅ Complet |
| DOC | 0 | ✅ Complet |
| NEW | 0 | ✅ Complet |
| MAINT | 0 | ✅ Complet |

**Total** : 0 tâche restante - Design System complet ! 🎉

---

## Notes de version

### v1.5.0 (2025-12-13) ✅ Publié

**Composants ajoutés depuis v1.4.0** :
- ds-transfer (transfert items entre listes)
- ds-timeline (événements chronologiques)
- ds-notification (centre notifications)
- ds-calendar (vue calendrier mensuelle)
- ds-carousel (défilement images)

**Total** : 44 composants DS, 7 primitives, 2200+ tests, 87% couverture

**Ajouts post-publication** :
- ds-input-number (stepper numérique CVA) - 55 tests + 14 stories
- ds-segmented-control (boutons radio visuels) - 42 tests + 17 stories
- ds-color-picker (sélecteur couleur complet) - 52 tests + 12 stories

---

## Prochaines étapes

1. Publier v1.6.0 avec les 3 nouveaux composants
2. (Optionnel) Implémenter DsMentions ou DsBackTop
