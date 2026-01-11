# Data Model: DsInputDate

**Feature**: DsInputDate
**Date**: 2026-01-11

## Entities

### DsInputDate Component

Composant Angular standalone de saisie de date.

#### Inputs (Signals)

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `value` | `Date \| null` | `null` | Valeur de la date sélectionnée |
| `size` | `InputDateSize` | `'md'` | Taille du composant (sm, md, lg) |
| `disabled` | `boolean` | `false` | État désactivé |
| `readonly` | `boolean` | `false` | État lecture seule |
| `placeholder` | `string` | `'dd/mm/yyyy'` | Placeholder de l'input |
| `label` | `string \| undefined` | `undefined` | Label affiché au-dessus |
| `error` | `string \| undefined` | `undefined` | Message d'erreur |
| `helper` | `string \| undefined` | `undefined` | Texte d'aide |
| `minDate` | `Date \| null` | `null` | Date minimum sélectionnable |
| `maxDate` | `Date \| null` | `null` | Date maximum sélectionnable |
| `clearable` | `boolean` | `true` | Affiche le bouton clear |
| `displayFormat` | `string` | `'dd/MM/yyyy'` | Format d'affichage |
| `locale` | `string` | `'fr-FR'` | Locale pour le formatage |

#### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `dateChange` | `Date \| null` | Émis quand la date change |

#### Internal State (Signals)

| Signal | Type | Description |
|--------|------|-------------|
| `isOpen` | `boolean` | État ouvert/fermé du popup |
| `internalValue` | `Date \| null` | Valeur interne synchronisée avec CVA |
| `isFocused` | `boolean` | État focus de l'input |
| `inputText` | `string` | Texte saisi dans l'input |
| `hasParseError` | `boolean` | Erreur de parsing de la saisie |

#### Computed Properties (readonly)

| Computed | Type | Description |
|----------|------|-------------|
| `displayValue` | `string` | Date formatée pour affichage |
| `containerClasses` | `string` | Classes CSS du container |
| `isDisabled` | `boolean` | disabled OR readonly |
| `inputState` | `InputState` | État visuel (error si hasParseError) |
| `showClearButton` | `boolean` | Afficher bouton clear |

---

### Types

```typescript
export type InputDateSize = 'sm' | 'md' | 'lg';

export interface DateParseResult {
  valid: boolean;
  date: Date | null;
  error?: 'invalid_format' | 'invalid_date' | 'out_of_range';
}
```

---

## State Transitions

### Popup State

```
CLOSED ──[click icon/Enter]──> OPEN
OPEN ──[select date]──> CLOSED (value updated)
OPEN ──[Escape/click outside]──> CLOSED (value unchanged)
OPEN ──[backdrop click]──> CLOSED (value unchanged)
```

### Value State

```
NULL ──[user types valid date]──> DATE
NULL ──[user selects from calendar]──> DATE
DATE ──[user clears]──> NULL
DATE ──[user types invalid]──> DATE (error shown, value unchanged)
DATE ──[user selects different date]──> DATE (new value)
```

### Input Text State

```
EMPTY ──[user types]──> TYPING
TYPING ──[blur + valid]──> FORMATTED (value updated)
TYPING ──[blur + invalid]──> ERROR (value unchanged)
FORMATTED ──[focus]──> TYPING (user can edit)
```

---

## Validation Rules

### Date Parsing
- Format accepté: `dd/MM/yyyy`, `dd-MM-yyyy`, `dd.MM.yyyy`, `dd MM yyyy`
- Jour: 1-31 (validé selon le mois)
- Mois: 1-12
- Année: 4 chiffres (0001-9999)

### Constraints
- Si `minDate` défini: date >= minDate
- Si `maxDate` défini: date <= maxDate
- Si minDate > maxDate: contraintes ignorées (warning console)

### Error Messages
| Condition | Error |
|-----------|-------|
| Format invalide | "Format de date invalide" |
| Date inexistante (31/02) | "Date invalide" |
| Date < minDate | "Date antérieure au minimum autorisé" |
| Date > maxDate | "Date postérieure au maximum autorisé" |

---

## ControlValueAccessor Interface

```typescript
interface ControlValueAccessor {
  writeValue(value: Date | null): void;
  registerOnChange(fn: (value: Date | null) => void): void;
  registerOnTouched(fn: () => void): void;
  setDisabledState(isDisabled: boolean): void;
}
```

### Value Flow

```
FormControl.setValue(date)
    │
    ▼
writeValue(date)
    │
    ▼
internalValue.set(date)
    │
    ▼
displayValue computed updates
    │
    ▼
Input shows formatted date
```

```
User selects date in calendar
    │
    ▼
onDateSelected(date)
    │
    ▼
internalValue.set(date)
    │
    ▼
onChange(date) [CVA callback]
    │
    ▼
FormControl value updated
    │
    ▼
dateChange.emit(date)
```

---

## CSS Tokens

Tokens suivant le pattern DsInputField, définis dans `_light.scss`, `_dark.scss`, `_custom.scss`.

| Token | Usage | Exemple Light |
|-------|-------|---------------|
| `--ds-input-date-bg` | Fond du container | `var(--input-bg)` |
| `--ds-input-date-border` | Bordure | `var(--input-border)` |
| `--ds-input-date-border-focus` | Bordure au focus | `var(--input-border-focus)` |
| `--ds-input-date-border-error` | Bordure erreur | `var(--color-error)` |
| `--ds-input-date-text` | Couleur texte | `var(--input-text)` |
| `--ds-input-date-placeholder` | Couleur placeholder | `var(--input-placeholder)` |
| `--ds-input-date-icon` | Couleur icône calendrier | `var(--input-icon)` |
| `--ds-input-date-icon-hover` | Couleur icône hover | `var(--color-primary)` |
| `--ds-input-date-popup-bg` | Fond popup | `var(--surface-overlay)` |
| `--ds-input-date-popup-shadow` | Shadow popup | `var(--shadow-lg)` |

Note: Les tokens réutilisent les variables `--input-*` existantes pour garantir la cohérence avec DsInputField et DsTimePicker.
