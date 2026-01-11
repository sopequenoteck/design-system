# Implementation Plan: DsInputDate

**Branch**: `001-ds-input-date` | **Date**: 2026-01-11 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-ds-input-date/spec.md`

## Summary

Composant Angular de saisie de date avec input textuel, icône calendrier et popup DsDatePicker. Le composant réutilise DsDatePicker en mode `single` via CDK Overlay, implémente ControlValueAccessor pour l'intégration formulaires, et suit les patterns établis par DsTimePicker et DsInputField.

## Technical Context

**Language/Version**: TypeScript 5.8 / Angular 20
**Primary Dependencies**: @angular/cdk (Overlay), @fortawesome/angular-fontawesome, DsDatePicker (interne)
**Storage**: N/A (composant UI stateless)
**Testing**: Karma/Jasmine (unit), Playwright (e2e + visual regression)
**Target Platform**: Web (navigateurs modernes)
**Project Type**: Angular library (ds-angular)
**Performance Goals**: Popup ouverture < 100ms, pas de layout shift
**Constraints**: Bundle size minimal (réutilise composants existants), WCAG 2.1 AA
**Scale/Scope**: 1 composant DS, ~300 LOC estimé

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Requirement | Verified |
|-----------|-------------|----------|
| I. Accessibilité WCAG 2.1 AA | Navigation clavier (Tab, Enter, Escape, flèches), ARIA labels, focus visible | [x] |
| II. Test-First ≥80% | Tests unitaires colocalisés (ds-input-date.spec.ts), TDD workflow | [x] |
| III. Standalone + Signals | `input()`/`output()`, standalone, `readonly computed()` | [x] |
| IV. Système de Tokens | CSS custom properties, tokens dans light/dark/custom | [x] |
| V. Conventions Nommage | `DsInputDate`, `ds-input-date`, fichiers kebab-case | [x] |
| VI. Code Review | Pre-commit review requis, 0 critique bloquant | [x] |
| VII. Primitives-First | Réutilise PrimitiveInput (via DsInputField pattern) + DsDatePicker | [x] |

**Validation** : Toutes les cases cochées - pas de violation.

## Project Structure

### Documentation (this feature)

```text
specs/001-ds-input-date/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # N/A (composant UI, pas d'API)
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
projects/ds-angular/src/lib/
├── components/
│   └── ds-input-date/
│       ├── ds-input-date.ts          # Composant principal
│       ├── ds-input-date.html        # Template
│       ├── ds-input-date.scss        # Styles (tokens)
│       └── ds-input-date.spec.ts     # Tests unitaires
├── styles/themes/
│   ├── _light.scss                   # Tokens thème clair
│   ├── _dark.scss                    # Tokens thème sombre
│   └── _custom.scss                  # Tokens thème custom
└── components/index.ts               # Export barrel

projects/ds-showcase/src/app/features/components/
└── input-date/                       # Démo Showcase
    ├── input-date.component.ts
    └── input-date.component.html
```

**Structure Decision**: Structure standard pour un composant DS, alignée sur DsTimePicker et DsInputField. Pas de fichier contracts/ car le composant est purement UI (pas d'endpoints API).

## Complexity Tracking

> Aucune violation de constitution - section vide.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| - | - | - |

## Design Decisions

### D1: Réutilisation de DsDatePicker vs nouveau calendrier

**Décision**: Réutiliser DsDatePicker en mode `single`
**Rationale**: DsDatePicker existe déjà avec toutes les fonctionnalités calendrier (navigation mois/année, sélection, contraintes min/max). Créer un nouveau composant serait une duplication inutile.
**Impact**: Import direct de DsDatePicker dans le template du popup.

### D2: Pattern de popup (CDK Overlay)

**Décision**: Utiliser CdkConnectedOverlay comme DsTimePicker
**Rationale**: Pattern établi dans le DS (DsTimePicker, DsSelect, DsCombobox). Gère automatiquement le repositionnement viewport-aware.
**Impact**: Import de `@angular/cdk/overlay`, positions configurées identiques à DsTimePicker.

### D3: Saisie manuelle avec parsing flexible

**Décision**: Parser les formats dd/MM/yyyy, dd-MM-yyyy, dd.MM.yyyy, dd MM yyyy au blur
**Rationale**: Les utilisateurs experts veulent saisir rapidement sans utiliser le calendrier. Accepter plusieurs séparateurs courants améliore l'UX.
**Impact**: Fonction `parseDate()` interne avec regex multi-format.

### D4: Gestion des états via pattern DsInputField

**Décision**: Suivre la structure de DsInputField (container + input + zones icônes)
**Rationale**: Cohérence avec les autres composants input du DS. Réutilise les tokens CSS existants (`--input-*`).
**Impact**: Structure de template similaire à DsInputField avec zone icône calendrier à droite.

**Justification Constitution VII (Primitives-First)**: PrimitiveInput est conçu pour un seul slot d'icône (`iconPosition: left | right`). DsInputDate nécessite potentiellement 2 icônes (calendrier + clear) dans la zone droite, ce qui dépasse les capacités de PrimitiveInput. Le pattern de structure (container flex, zones icônes) est donc reproduit en utilisant les mêmes tokens CSS `--input-*` pour garantir la cohérence visuelle. Cette approche est alignée avec DsTimePicker et DsCombobox qui suivent le même pattern pour des raisons similaires.

## Dependencies

### Internes (DS)
- `DsDatePicker` - Calendrier popup
- `PrimitiveInput` (indirectement via pattern) - Styles input
- `generateId()` - Utilitaire ID unique

### Externes
- `@angular/cdk/overlay` - CdkConnectedOverlay, CdkOverlayOrigin
- `@fortawesome/angular-fontawesome` - FaIconComponent
- `@fortawesome/free-solid-svg-icons` - faCalendar, faTimes
