# Quickstart: DsInputDate

**Feature**: DsInputDate
**Date**: 2026-01-11

## Installation

Le composant fait partie de `@kksdev/ds-angular`. Aucune installation supplémentaire requise.

```typescript
import { DsInputDate } from '@kksdev/ds-angular';
```

---

## Usage basique

### Template-driven

```html
<ds-input-date
  [(ngModel)]="selectedDate"
  label="Date de naissance"
  placeholder="jj/mm/aaaa">
</ds-input-date>
```

### Reactive Forms

```typescript
// Component
import { FormControl, FormGroup, Validators } from '@angular/forms';

form = new FormGroup({
  birthDate: new FormControl<Date | null>(null, Validators.required),
});
```

```html
<form [formGroup]="form">
  <ds-input-date
    formControlName="birthDate"
    label="Date de naissance"
    [error]="form.get('birthDate')?.errors?.['required'] ? 'Ce champ est requis' : undefined">
  </ds-input-date>
</form>
```

---

## Exemples par cas d'usage

### Avec contraintes min/max

```html
<!-- Réservation: dates futures uniquement -->
<ds-input-date
  [(ngModel)]="reservationDate"
  label="Date de réservation"
  [minDate]="today"
  [maxDate]="maxReservationDate">
</ds-input-date>
```

```typescript
today = new Date();
maxReservationDate = new Date();
maxReservationDate.setMonth(maxReservationDate.getMonth() + 3);
```

### Avec message d'aide

```html
<ds-input-date
  [(ngModel)]="eventDate"
  label="Date de l'événement"
  helper="Sélectionnez une date dans les 30 prochains jours">
</ds-input-date>
```

### Différentes tailles

```html
<ds-input-date size="sm" placeholder="Petit"></ds-input-date>
<ds-input-date size="md" placeholder="Moyen (défaut)"></ds-input-date>
<ds-input-date size="lg" placeholder="Grand"></ds-input-date>
```

### Sans bouton clear

```html
<ds-input-date
  [(ngModel)]="mandatoryDate"
  [clearable]="false"
  label="Date obligatoire">
</ds-input-date>
```

### États disabled/readonly

```html
<!-- Désactivé -->
<ds-input-date
  [disabled]="true"
  [value]="fixedDate"
  label="Date fixée">
</ds-input-date>

<!-- Lecture seule -->
<ds-input-date
  [readonly]="true"
  [value]="displayDate"
  label="Date (non modifiable)">
</ds-input-date>
```

---

## Saisie manuelle

L'utilisateur peut taper directement une date dans l'input. Les formats acceptés :
- `15/03/2025` (slash)
- `15-03-2025` (tiret)
- `15.03.2025` (point)

La validation se fait au blur (perte de focus).

---

## Navigation clavier

| Touche | Action |
|--------|--------|
| `Tab` | Focus sur l'input |
| `Enter` / `↓` | Ouvre le calendrier |
| `Escape` | Ferme le calendrier sans changer la valeur |
| `↑↓←→` | Navigation dans le calendrier (jours) |
| `Enter` (dans calendrier) | Sélectionne la date focalisée |

---

## API complète

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `value` | `Date \| null` | `null` | Valeur de la date |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille |
| `disabled` | `boolean` | `false` | Désactivé |
| `readonly` | `boolean` | `false` | Lecture seule |
| `placeholder` | `string` | `'dd/mm/yyyy'` | Placeholder |
| `label` | `string` | - | Label |
| `error` | `string` | - | Message d'erreur |
| `helper` | `string` | - | Texte d'aide |
| `minDate` | `Date \| null` | `null` | Date minimum |
| `maxDate` | `Date \| null` | `null` | Date maximum |
| `clearable` | `boolean` | `true` | Bouton clear |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `dateChange` | `Date \| null` | Émis à chaque changement |

---

## Migration depuis input type="date"

```html
<!-- Avant (HTML natif) -->
<input type="date" [(ngModel)]="dateString">

<!-- Après (DsInputDate) -->
<ds-input-date [(ngModel)]="dateObject"></ds-input-date>
```

**Note**: DsInputDate utilise des objets `Date` JavaScript, pas des strings `YYYY-MM-DD`.

---

## Troubleshooting

### Le calendrier ne s'ouvre pas
- Vérifier que `disabled` n'est pas `true`
- Vérifier que `readonly` n'est pas `true`

### La date n'est pas acceptée
- Vérifier le format de saisie (dd/mm/yyyy)
- Vérifier que la date est dans la plage min/max

### Erreur "Date invalide"
- Vérifier que le jour existe pour ce mois (ex: 31 février n'existe pas)
