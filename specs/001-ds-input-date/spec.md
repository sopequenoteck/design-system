# Feature Specification: DsInputDate

**Feature Branch**: `001-ds-input-date`
**Created**: 2026-01-11
**Status**: Draft
**Input**: User description: "Créer un composant DsInputDate : input textuel avec icône calendrier et popup DatePicker pour la sélection de date dans les formulaires"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Sélection de date via calendrier (Priority: P1)

L'utilisateur clique sur l'icône calendrier dans le champ de saisie. Un popup s'ouvre avec un calendrier mensuel. L'utilisateur navigue dans les mois si nécessaire et clique sur une date. Le popup se ferme automatiquement et la date sélectionnée s'affiche formatée dans l'input.

**Why this priority**: Fonctionnalité principale du composant - sans elle, le composant n'a pas de valeur ajoutée par rapport à un input texte classique.

**Independent Test**: Peut être testé en plaçant le composant seul dans une page, en cliquant sur l'icône et en sélectionnant une date. Vérifie que la date apparaît correctement formatée.

**Acceptance Scenarios**:

1. **Given** un DsInputDate sans valeur, **When** l'utilisateur clique sur l'icône calendrier, **Then** un popup s'ouvre avec le mois courant affiché
2. **Given** le popup calendrier ouvert, **When** l'utilisateur clique sur une date, **Then** le popup se ferme et la date s'affiche dans l'input au format dd/MM/yyyy
3. **Given** un DsInputDate avec une date sélectionnée, **When** l'utilisateur rouvre le calendrier, **Then** le mois de la date sélectionnée est affiché avec cette date mise en évidence

---

### User Story 2 - Saisie manuelle de date (Priority: P1)

L'utilisateur peut taper directement une date dans l'input au format attendu. Si le format est valide, la date est acceptée. Si le format est invalide, un message d'erreur s'affiche.

**Why this priority**: Permet une saisie rapide sans utiliser le calendrier, essentiel pour les utilisateurs expérimentés et l'accessibilité clavier.

**Independent Test**: Taper une date valide (ex: "15/03/2025") dans l'input et vérifier qu'elle est acceptée. Taper une date invalide et vérifier l'affichage de l'erreur.

**Acceptance Scenarios**:

1. **Given** un DsInputDate vide, **When** l'utilisateur saisit "15/03/2025", **Then** la date est acceptée et le composant émet la valeur correspondante
2. **Given** un DsInputDate vide, **When** l'utilisateur saisit "abc" ou "32/13/2025", **Then** le composant affiche un état d'erreur visuel
3. **Given** un DsInputDate avec une date, **When** l'utilisateur efface le contenu et quitte le champ, **Then** la valeur devient null

---

### User Story 3 - Intégration formulaire Angular (Priority: P1)

Le composant s'intègre avec les formulaires Angular (Reactive Forms et Template-driven). Il supporte la validation, les états disabled/readonly, et émet les événements appropriés.

**Why this priority**: Sans intégration formulaire, le composant ne peut pas être utilisé dans des cas réels de saisie de données.

**Independent Test**: Intégrer le composant dans un FormGroup avec des validateurs required et vérifier que la validation fonctionne.

**Acceptance Scenarios**:

1. **Given** un DsInputDate dans un FormGroup avec `Validators.required`, **When** aucune date n'est sélectionnée, **Then** le FormControl est invalide
2. **Given** un FormControl disabled, **When** le formulaire est affiché, **Then** l'input et l'icône calendrier sont désactivés visuellement et fonctionnellement
3. **Given** un DsInputDate avec `formControlName`, **When** une date est sélectionnée, **Then** la valeur du FormControl est mise à jour automatiquement

---

### User Story 4 - Contraintes de dates (Priority: P2)

L'utilisateur ne peut sélectionner que des dates dans une plage définie par minDate et maxDate. Les dates hors plage sont grisées dans le calendrier et rejetées si saisies manuellement.

**Why this priority**: Fonctionnalité importante pour les cas d'usage comme dates de naissance, réservations, etc. mais pas bloquante pour un MVP.

**Independent Test**: Configurer minDate à aujourd'hui et vérifier que les dates passées sont non sélectionnables.

**Acceptance Scenarios**:

1. **Given** un DsInputDate avec `minDate` défini au 1er janvier 2025, **When** l'utilisateur ouvre le calendrier, **Then** les dates avant le 1er janvier 2025 sont grisées et non cliquables
2. **Given** un DsInputDate avec `maxDate` défini, **When** l'utilisateur saisit manuellement une date postérieure, **Then** le composant affiche une erreur de validation

---

### User Story 5 - Effacement de la date (Priority: P2)

L'utilisateur peut effacer la date sélectionnée via un bouton "clear" qui apparaît quand une valeur est présente.

**Why this priority**: Améliore l'UX mais n'est pas critique pour le fonctionnement de base.

**Independent Test**: Sélectionner une date, vérifier que le bouton clear apparaît, cliquer dessus et vérifier que la valeur est effacée.

**Acceptance Scenarios**:

1. **Given** un DsInputDate avec une date et clearable activé, **When** l'utilisateur clique sur le bouton clear, **Then** la valeur devient null et le bouton disparaît
2. **Given** un DsInputDate vide, **When** le composant est affiché, **Then** le bouton clear n'est pas visible

---

### User Story 6 - Navigation clavier (Priority: P3)

L'utilisateur peut naviguer et interagir avec le composant entièrement au clavier pour l'accessibilité.

**Why this priority**: Important pour l'accessibilité mais le composant reste utilisable sans.

**Independent Test**: Utiliser Tab pour naviguer vers le composant, Entrée pour ouvrir le calendrier, flèches pour naviguer dans les jours.

**Acceptance Scenarios**:

1. **Given** le focus sur l'input, **When** l'utilisateur appuie sur Entrée ou la flèche bas, **Then** le popup calendrier s'ouvre
2. **Given** le popup ouvert, **When** l'utilisateur appuie sur Échap, **Then** le popup se ferme sans modifier la valeur
3. **Given** le popup ouvert, **When** l'utilisateur navigue avec les flèches et appuie sur Entrée, **Then** la date focalisée est sélectionnée

---

### Edge Cases

- Que se passe-t-il si l'utilisateur colle une date depuis le presse-papier ? → La date est parsée si le format est reconnu
- Comment le composant gère-t-il les fuseaux horaires ? → Les dates sont traitées en heure locale, sans composante horaire (minuit)
- Que se passe-t-il si minDate > maxDate (configuration invalide) ? → Le composant ignore les contraintes invalides et log un warning
- Comment le popup se positionne-t-il si l'input est proche du bord de l'écran ? → Le CDK Overlay repositionne automatiquement le popup
- Que se passe-t-il si l'utilisateur saisit une date dans un format alternatif (01-03-2025) ? → Les 4 formats suivants sont acceptés : dd/MM/yyyy, dd-MM-yyyy, dd.MM.yyyy, dd MM yyyy

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Le composant DOIT afficher un champ de saisie texte avec une icône calendrier à droite
- **FR-002**: Le composant DOIT ouvrir un popup calendrier au clic sur l'icône calendrier
- **FR-003**: Le composant DOIT permettre la saisie manuelle de date au format dd/MM/yyyy par défaut
- **FR-004**: Le composant DOIT implémenter ControlValueAccessor pour l'intégration Angular Forms
- **FR-005**: Le composant DOIT supporter les états: default, focused, disabled, readonly, error
- **FR-006**: Le composant DOIT afficher la date au format dd/MM/yyyy (format français)
- **FR-007**: Le composant DOIT supporter les contraintes minDate et maxDate (dates inclusives: minDate et maxDate sont sélectionnables)
- **FR-008**: Le composant DOIT fermer le popup automatiquement après sélection d'une date
- **FR-009**: Le composant DOIT fermer le popup au clic en dehors (click outside)
- **FR-010**: Le composant DOIT fermer le popup à l'appui sur la touche Échap
- **FR-011**: Le composant DOIT supporter 3 tailles cohérentes avec le DS: sm, md (défaut), lg
- **FR-012**: Le composant DOIT afficher un bouton clear optionnel quand une valeur est présente (via input `clearable`, défaut: `true`)
- **FR-013**: Le composant DOIT supporter un placeholder configurable
- **FR-014**: Le composant DOIT supporter un label optionnel affiché au-dessus de l'input
- **FR-015**: Le composant DOIT émettre les changements de valeur via un output `dateChange`
- **FR-016**: Le composant DOIT utiliser le CDK Overlay pour le positionnement du popup
- **FR-017**: Le composant DOIT repositionner le popup automatiquement pour rester visible dans le viewport
- **FR-018**: Le composant DOIT réutiliser DsDatePicker en mode single pour le calendrier du popup

### Key Entities

- **Date value**: Valeur Date JavaScript représentant la date sélectionnée (null si vide)
- **Display format**: Format d'affichage de la date dans l'input (ex: dd/MM/yyyy)
- **Parse formats**: Formats acceptés pour la saisie manuelle (dd/MM/yyyy, dd-MM-yyyy, dd.MM.yyyy, dd MM yyyy)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: L'utilisateur peut sélectionner une date via le calendrier en 2 clics (ouvrir + sélectionner dans le mois courant)
- **SC-002**: L'utilisateur peut saisir une date manuellement et voir la validation immédiatement au blur
- **SC-003**: Le composant s'intègre dans un FormGroup Angular sans configuration additionnelle
- **SC-004**: Toutes les interactions clavier fonctionnent : Tab (focus), Enter/ArrowDown (ouvrir popup), Escape (fermer), Arrows (naviguer dans calendrier), Enter (sélectionner date)
- **SC-005**: Le popup s'affiche toujours entièrement visible dans le viewport

## Assumptions

- Le format de date par défaut est `dd/MM/yyyy` (format français)
- Le calendrier démarre la semaine le lundi (convention européenne)
- Le composant utilise l'objet Date JavaScript natif (pas de librairie externe type moment.js ou date-fns)
- Le popup calendrier réutilise le composant DsDatePicker existant en mode `single`
- Les tokens de style suivent le même pattern que les autres composants input du DS (DsInputField)
- Le composant est standalone comme tous les composants Angular 20 du DS

## Out of Scope

- Sélection de plage de dates (utiliser DsDatePicker directement en mode `range`)
- Sélection date + heure combinée (potentiel futur composant DsDateTimePicker)
- Support de calendriers non-grégoriens (hébraïque, islamique, etc.)
- Internationalisation des noms de jours/mois (géré par DsDatePicker sous-jacent)
