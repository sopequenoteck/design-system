# Tasks: DsInputDate

**Input**: Design documents from `/specs/001-ds-input-date/`
**Prerequisites**: plan.md, spec.md, data-model.md, research.md, quickstart.md

**Tests**: Tests unitaires inclus (Constitution exige TDD avec couverture ≥80%)

**Organization**: Tasks groupées par user story pour permettre implémentation et test indépendants.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Peut s'exécuter en parallèle (fichiers différents, pas de dépendances)
- **[Story]**: User story associée (US1, US2, US3...)
- Chemins exacts dans les descriptions

## Path Conventions

```text
projects/ds-angular/src/lib/
├── components/ds-input-date/    # Composant principal
├── styles/themes/               # Tokens thématiques
└── components/index.ts          # Export barrel

projects/ds-showcase/src/app/features/components/
└── input-date/                  # Démo Showcase
```

---

## Phase 1: Setup

**Purpose**: Structure de fichiers et configuration initiale

- [x] T001 Créer la structure du dossier ds-input-date dans projects/ds-angular/src/lib/components/ds-input-date/
- [x] T002 [P] Créer le fichier ds-input-date.ts avec le squelette du composant standalone
- [x] T003 [P] Créer le fichier ds-input-date.html avec le template de base
- [x] T004 [P] Créer le fichier ds-input-date.scss avec l'import des tokens
- [x] T005 [P] Créer le fichier ds-input-date.spec.ts avec la configuration TestBed

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infrastructure partagée par toutes les user stories

**⚠️ CRITICAL**: Aucune user story ne peut commencer avant cette phase

- [x] T006 Définir les types InputDateSize et DateParseResult dans projects/ds-angular/src/lib/components/ds-input-date/ds-input-date.ts
- [x] T007 Implémenter la fonction parseDate() avec regex multi-format (dd/MM/yyyy, dd-MM-yyyy, dd.MM.yyyy, dd MM yyyy) dans ds-input-date.ts
- [x] T008 Implémenter la fonction formatDate() avec Intl.DateTimeFormat dans ds-input-date.ts
- [x] T009 [P] Ajouter les tokens ds-input-date dans projects/ds-angular/src/lib/styles/themes/_light.scss
- [x] T010 [P] Ajouter les tokens ds-input-date dans projects/ds-angular/src/lib/styles/themes/_dark.scss
- [x] T011 [P] Ajouter les tokens ds-input-date dans projects/ds-angular/src/lib/styles/themes/_custom.scss
- [x] T012 Exporter DsInputDate et types dans projects/ds-angular/src/lib/components/index.ts

**Checkpoint**: Foundation prête - implémentation des user stories peut commencer

---

## Phase 3: User Story 1 - Sélection de date via calendrier (Priority: P1) 🎯 MVP

**Goal**: L'utilisateur peut ouvrir un popup calendrier et sélectionner une date

**Independent Test**: Cliquer sur l'icône, sélectionner une date, vérifier l'affichage formaté

### Tests for User Story 1

- [x] T013 [P] [US1] Test: popup s'ouvre au clic sur l'icône calendrier dans ds-input-date.spec.ts
- [x] T014 [P] [US1] Test: popup se ferme après sélection de date dans ds-input-date.spec.ts
- [x] T015 [P] [US1] Test: date sélectionnée s'affiche formatée dans l'input dans ds-input-date.spec.ts
- [x] T015b [P] [US1] Test: output dateChange émet la Date sélectionnée après clic calendrier dans ds-input-date.spec.ts

### Implementation for User Story 1

- [x] T016 [US1] Ajouter les inputs signals (value, size, placeholder, label, disabled, readonly) dans ds-input-date.ts
- [x] T017 [US1] Ajouter le output dateChange dans ds-input-date.ts
- [x] T018 [US1] Ajouter les signals internes (isOpen, internalValue, isFocused) dans ds-input-date.ts
- [x] T019 [US1] Ajouter les computed (displayValue, containerClasses, isDisabled) dans ds-input-date.ts
- [x] T020 [US1] Implémenter le template input + icône calendrier dans ds-input-date.html
- [x] T021 [US1] Implémenter le CDK Overlay avec CdkConnectedOverlay dans ds-input-date.ts et ds-input-date.html
  - Note: FR-017 (repositionnement viewport) est géré automatiquement par CDK Overlay. Validation manuelle dans Showcase (T077).
- [x] T022 [US1] Intégrer DsDatePicker en mode single dans le popup overlay dans ds-input-date.html
- [x] T023 [US1] Implémenter onDateSelected() qui ferme le popup et met à jour la valeur dans ds-input-date.ts
- [x] T024 [US1] Implémenter la fermeture au clic en dehors (onBackdropClick) dans ds-input-date.ts
- [x] T025 [US1] Styler le container input avec les 3 tailles (sm, md, lg) et le label optionnel dans ds-input-date.scss
- [x] T026 [US1] Styler le popup overlay avec z-index et shadow dans ds-input-date.scss

**Checkpoint**: US1 fonctionnelle - sélection de date via calendrier opérationnelle

---

## Phase 4: User Story 2 - Saisie manuelle de date (Priority: P1)

**Goal**: L'utilisateur peut taper une date directement dans l'input

**Independent Test**: Taper "15/03/2025", vérifier que la date est acceptée. Taper "abc", vérifier l'erreur.

### Tests for User Story 2

- [x] T027 [P] [US2] Test: saisie "15/03/2025" acceptée et valeur émise dans ds-input-date.spec.ts
- [x] T028 [P] [US2] Test: saisie "15-03-2025" (tirets) acceptée dans ds-input-date.spec.ts
- [x] T029 [P] [US2] Test: saisie "abc" affiche état erreur dans ds-input-date.spec.ts
- [x] T030 [P] [US2] Test: saisie "32/13/2025" affiche état erreur dans ds-input-date.spec.ts
- [x] T030b [P] [US2] Test: collage "15/03/2025" depuis presse-papier accepté dans ds-input-date.spec.ts
- [x] T030c [P] [US2] Test: saisie "15 03 2025" (espaces) acceptée dans ds-input-date.spec.ts
- [x] T030d [P] [US2] Test: date parsée est à 00:00:00 heure locale (pas UTC) dans ds-input-date.spec.ts

### Implementation for User Story 2

- [x] T031 [US2] Ajouter le signal inputText pour stocker la saisie utilisateur dans ds-input-date.ts
- [x] T032 [US2] Ajouter le signal hasParseError pour l'état d'erreur de parsing dans ds-input-date.ts
- [x] T033 [US2] Ajouter le computed inputState qui retourne 'error' si hasParseError dans ds-input-date.ts
- [x] T034 [US2] Implémenter onInputChange() appelé à chaque frappe clavier dans ds-input-date.ts
  - Note: Garder léger (mise à jour inputText signal seulement). Le parsing/validation se fait uniquement dans onInputBlur() (T035).
- [x] T035 [US2] Implémenter onInputBlur() qui parse et valide la saisie dans ds-input-date.ts
- [x] T036 [US2] Mettre à jour le template pour binder inputText et les handlers dans ds-input-date.html
- [x] T037 [US2] Styler l'état erreur (bordure rouge, icône warning) dans ds-input-date.scss

**Checkpoint**: US2 fonctionnelle - saisie manuelle opérationnelle

---

## Phase 5: User Story 3 - Intégration formulaire Angular (Priority: P1)

**Goal**: Le composant s'intègre avec Reactive Forms via ControlValueAccessor

**Independent Test**: FormGroup avec Validators.required, vérifier FormControl.invalid quand vide

### Tests for User Story 3

- [x] T038 [P] [US3] Test: writeValue met à jour displayValue dans ds-input-date.spec.ts
- [x] T039 [P] [US3] Test: sélection date appelle onChange dans ds-input-date.spec.ts
- [x] T040 [P] [US3] Test: FormControl disabled désactive le composant dans ds-input-date.spec.ts
- [x] T041 [P] [US3] Test: FormControl avec required invalide quand null dans ds-input-date.spec.ts
- [x] T041b [P] [US3] Test: input readonly empêche la saisie et le clic calendrier dans ds-input-date.spec.ts

### Implementation for User Story 3

- [x] T042 [US3] Ajouter NG_VALUE_ACCESSOR provider dans le décorateur @Component ds-input-date.ts
- [x] T043 [US3] Implémenter writeValue(value: Date | null) dans ds-input-date.ts
- [x] T044 [US3] Implémenter registerOnChange(fn) dans ds-input-date.ts
- [x] T045 [US3] Implémenter registerOnTouched(fn) dans ds-input-date.ts
- [x] T046 [US3] Implémenter setDisabledState(isDisabled) dans ds-input-date.ts
- [x] T047 [US3] Compléter onDateSelected() et onInputBlur() pour appeler onChange() (intégration CVA) dans ds-input-date.ts
- [x] T048 [US3] Appeler onTouched() au blur de l'input dans ds-input-date.ts

**Checkpoint**: US3 fonctionnelle - intégration Angular Forms opérationnelle

---

## Phase 6: User Story 4 - Contraintes de dates (Priority: P2)

**Goal**: L'utilisateur ne peut sélectionner que des dates dans une plage min/max

**Independent Test**: Configurer minDate=today, vérifier dates passées grisées et rejetées

### Tests for User Story 4

- [x] T049 [P] [US4] Test: minDate est passé à DsDatePicker dans ds-input-date.spec.ts
- [x] T050 [P] [US4] Test: maxDate est passé à DsDatePicker dans ds-input-date.spec.ts
- [x] T051 [P] [US4] Test: saisie manuelle hors plage affiche erreur dans ds-input-date.spec.ts
- [x] T051b [P] [US4] Test: configuration minDate > maxDate log warning et ignore contraintes dans ds-input-date.spec.ts

### Implementation for User Story 4

- [x] T052 [US4] Ajouter les inputs minDate et maxDate dans ds-input-date.ts
- [x] T053 [US4] Passer minDate et maxDate à DsDatePicker dans le template ds-input-date.html
- [x] T054 [US4] Valider la date saisie contre min/max dans onInputBlur() ds-input-date.ts
  - Note: Si minDate > maxDate (config invalide), logger `console.warn()` et ignorer les contraintes (cf. Edge Case spec.md:L108)
- [x] T055 [US4] Ajouter l'input error pour message d'erreur custom dans ds-input-date.ts
- [x] T056 [US4] Afficher le message d'erreur sous l'input dans ds-input-date.html et ds-input-date.scss

**Checkpoint**: US4 fonctionnelle - contraintes min/max opérationnelles

---

## Phase 7: User Story 5 - Effacement de la date (Priority: P2)

**Goal**: L'utilisateur peut effacer la date via un bouton clear

**Independent Test**: Sélectionner date, cliquer clear, vérifier valeur null

### Tests for User Story 5

- [x] T057 [P] [US5] Test: bouton clear visible quand valeur présente et clearable=true dans ds-input-date.spec.ts
- [x] T058 [P] [US5] Test: bouton clear invisible quand valeur null dans ds-input-date.spec.ts
- [x] T059 [P] [US5] Test: clic clear met valeur à null dans ds-input-date.spec.ts

### Implementation for User Story 5

- [x] T060 [US5] Ajouter l'input `clearable = input<boolean>(true)` dans ds-input-date.ts
- [x] T061 [US5] Ajouter le computed showClearButton dans ds-input-date.ts
- [x] T062 [US5] Implémenter clearValue() dans ds-input-date.ts
- [x] T063 [US5] Ajouter le bouton clear avec icône faTimes dans le template ds-input-date.html
- [x] T064 [US5] Styler le bouton clear dans ds-input-date.scss

**Checkpoint**: US5 fonctionnelle - effacement opérationnel

---

## Phase 8: User Story 6 - Navigation clavier (Priority: P3)

**Goal**: Le composant est entièrement utilisable au clavier (WCAG 2.1 AA)

**Independent Test**: Tab vers composant, Enter pour ouvrir, flèches pour naviguer, Escape pour fermer

### Tests for User Story 6

- [x] T065 [P] [US6] Test: Enter sur input ouvre le popup dans ds-input-date.spec.ts
- [x] T066 [P] [US6] Test: Escape ferme le popup sans modifier la valeur dans ds-input-date.spec.ts
- [x] T067 [P] [US6] Test: ArrowDown sur input ouvre le popup dans ds-input-date.spec.ts

### Implementation for User Story 6

- [x] T068 [US6] Implémenter onInputKeydown() pour gérer Enter, ArrowDown, Escape dans ds-input-date.ts
- [x] T069 [US6] Implémenter onOverlayKeydown() pour Escape dans ds-input-date.ts
- [x] T070 [US6] Ajouter les attributs ARIA (aria-haspopup, aria-expanded, aria-controls) dans ds-input-date.html
- [x] T071 [US6] Gérer le retour du focus à l'input après fermeture du popup dans ds-input-date.ts
- [x] T072 [US6] Ajouter les styles focus visible conformes WCAG dans ds-input-date.scss

**Checkpoint**: US6 fonctionnelle - accessibilité clavier complète

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Finalisation et documentation

- [x] T073 [P] Créer le dossier input-date dans projects/ds-showcase/src/app/features/components/input-date/
- [x] T074 [P] Créer input-date.component.ts avec démos de toutes les variantes dans Showcase
- [x] T075 [P] Créer input-date.component.html avec exemples interactifs dans Showcase
- [x] T076 Ajouter la route input-date dans le routing Showcase
- [x] T077 Build lib et vérifier que le composant fonctionne dans Showcase (npm run build:lib && npm run showcase)
- [x] T078 Exécuter les tests headless et vérifier couverture ≥80% (npm run test:headless)
- [x] T079 Exécuter la validation des tokens (npm run validate:tokens)
- [x] T079b Exécuter la validation accessibilité : vérifier si `npm run test:a11y` existe, sinon audit manuel WCAG 2.1 AA (navigation clavier, contraste, ARIA, focus visible)
- [x] T080 Pre-commit review avec agent pre-commit-review

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Pas de dépendances - démarrer immédiatement
- **Phase 2 (Foundational)**: Dépend de Phase 1 - BLOQUE toutes les user stories
- **Phases 3-8 (User Stories)**: Dépendent de Phase 2
  - US1, US2, US3 sont P1 et DOIVENT être complétées avant US4, US5, US6
  - US4, US5 (P2) peuvent être parallélisées après US1-3
  - US6 (P3) peut commencer après US1-3
- **Phase 9 (Polish)**: Dépend de toutes les user stories souhaitées

### User Story Dependencies

| Story | Priority | Dépendances | Peut paralléliser avec |
|-------|----------|-------------|------------------------|
| US1 | P1 | Foundational | US2, US3 (après T019) |
| US2 | P1 | Foundational, US1 partiellement (inputs/signals) | US3 |
| US3 | P1 | Foundational, US1 partiellement | US2 |
| US4 | P2 | US1, US2, US3 | US5, US6 |
| US5 | P2 | US1 (valeur, clear button) | US4, US6 |
| US6 | P3 | US1 (popup, keyboard) | US4, US5 |

### Within Each User Story

1. Tests DOIVENT être écrits et ÉCHOUER avant implémentation
2. Signals/inputs avant computed
3. Logique métier avant template
4. Template avant styles
5. Story complète avant passage à la suivante (pour P1)

---

## Parallel Examples

### Setup Phase (tous parallélisables après T001)

```bash
# Lancer en parallèle après création du dossier:
T002: ds-input-date.ts (squelette)
T003: ds-input-date.html (template base)
T004: ds-input-date.scss (styles base)
T005: ds-input-date.spec.ts (config tests)
```

### Foundational Tokens (parallélisables)

```bash
# Lancer en parallèle:
T009: _light.scss tokens
T010: _dark.scss tokens
T011: _custom.scss tokens
```

### US1 Tests (parallélisables)

```bash
# Lancer en parallèle:
T013: test popup ouverture
T014: test popup fermeture
T015: test affichage date
```

---

## Implementation Strategy

### MVP First (US1 uniquement)

1. ✅ Phase 1: Setup
2. ✅ Phase 2: Foundational
3. ✅ Phase 3: User Story 1 (sélection calendrier)
4. **STOP et VALIDER**: Composant utilisable pour sélection simple
5. Deploy/demo si prêt

### Core Features (US1 + US2 + US3)

1. Phases 1-2: Setup + Foundational
2. Phases 3-5: US1-3 en séquence (toutes P1)
3. **STOP et VALIDER**: Composant complet pour formulaires
4. Deploy/demo

### Full Feature Set

1. Phases 1-8: Toutes les user stories
2. Phase 9: Polish + Showcase
3. Composant complet avec toutes les fonctionnalités

---

## Notes

- Tâches [P] = fichiers différents, pas de dépendances
- [US*] = user story pour traçabilité
- Chaque user story indépendamment testable
- Tests DOIVENT échouer avant implémentation (TDD)
- Commit après chaque tâche ou groupe logique
- Arrêter à chaque checkpoint pour valider la story
- Constitution: couverture ≥80%, tokens dans 3 thèmes, pre-commit review
