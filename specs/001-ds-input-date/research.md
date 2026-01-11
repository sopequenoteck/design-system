# Research: DsInputDate

**Feature**: DsInputDate
**Date**: 2026-01-11
**Status**: Complete

## R1: Pattern CDK Overlay pour date picker

### Décision
Utiliser `CdkConnectedOverlay` avec positions prioritaires bottom-start puis top-start.

### Rationale
- Pattern déjà utilisé par DsTimePicker, DsSelect, DsCombobox dans le DS
- Gère automatiquement le repositionnement quand le popup dépasse le viewport
- API stable et bien documentée par Angular CDK

### Alternatives considérées
1. **CSS position: absolute** - Rejeté car ne gère pas le viewport awareness
2. **Floating UI (Popper.js)** - Rejeté car ajoute une dépendance externe non utilisée ailleurs
3. **Portal natif Angular** - Rejeté car plus bas niveau, CDK Overlay l'utilise déjà

### Implémentation
```typescript
const DATE_PICKER_POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
];
```

---

## R2: Parsing de date multi-format

### Décision
Parser les formats `dd/MM/yyyy`, `dd-MM-yyyy`, `dd.MM.yyyy` au blur avec regex unique.

### Rationale
- Les utilisateurs français utilisent `/` mais copient parfois des dates avec `-` ou `.`
- Flexibilité de saisie sans complexité excessive
- Pas besoin de librairie externe (moment.js, date-fns) pour ce cas simple

### Alternatives considérées
1. **Format unique strict (dd/MM/yyyy)** - Rejeté car frustrant pour l'utilisateur
2. **Détection automatique de locale** - Rejeté car complexe et hors scope
3. **Librairie date-fns** - Rejeté car dépendance lourde pour un parsing simple

### Implémentation
```typescript
function parseDate(input: string): Date | null {
  // Regex accepte / - . comme séparateurs
  const match = input.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})$/);
  if (!match) return null;

  const [, day, month, year] = match;
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

  // Valider que la date est réelle (pas 31/02)
  if (date.getDate() !== parseInt(day)) return null;
  return date;
}
```

---

## R3: Format d'affichage configurable

### Décision
Utiliser `Intl.DateTimeFormat` pour le formatage d'affichage avec format par défaut `dd/MM/yyyy`.

### Rationale
- API native JavaScript, pas de dépendance
- Supporte la locale pour affichage localisé
- Cohérent avec DsDatePicker qui utilise déjà `toLocaleDateString`

### Alternatives considérées
1. **Format hardcodé** - Rejeté car pas flexible
2. **Template string custom** - Plus complexe, `Intl.DateTimeFormat` suffit

### Implémentation
```typescript
function formatDate(date: Date, locale = 'fr-FR'): string {
  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}
```

---

## R4: Gestion du focus trap dans le popup

### Décision
Le focus reste dans le popup calendrier une fois ouvert, avec Échap pour fermer.

### Rationale
- Pattern établi par DsTimePicker
- Requis pour accessibilité WCAG 2.1 AA
- DsDatePicker gère déjà la navigation clavier interne

### Implémentation
- `cdkTrapFocus` sur le container du popup
- Événement keydown sur overlay pour Échap
- Focus retour à l'input après fermeture

---

## R5: Synchronisation valeur input/calendrier

### Décision
Two-way binding entre l'input texte et DsDatePicker via `signal()`.

### Rationale
- La saisie manuelle doit mettre à jour le calendrier
- La sélection calendrier doit mettre à jour l'input
- Pattern signal permet réactivité fine-grained

### Implémentation
```typescript
readonly internalValue = signal<Date | null>(null);
readonly displayValue = computed(() => {
  const date = this.internalValue();
  return date ? this.formatDate(date) : '';
});
```

---

## Unknowns résolus

| Unknown | Résolution |
|---------|------------|
| CDK Overlay vs autre solution popup | CDK Overlay (pattern DS établi) |
| Formats de parsing acceptés | dd/MM/yyyy, dd-MM-yyyy, dd.MM.yyyy |
| Gestion focus popup | Focus trap + Escape + retour focus |
| Librairie date externe | Aucune - API Date native + Intl |
