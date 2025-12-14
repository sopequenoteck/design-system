# /ds-orchestrator

Analyse le projet Design System et génère DS_TODO.md.

## Objectif

Analyser l'état du design system, synchroniser `CLAUDE.md`, et générer `DS_TODO.md`.

## Dossiers à scanner

- `projects/ds-angular/src/lib/` (primitives, components, utils)
- `projects/ds-angular/src/styles/` (tokens, themes)

## Étapes

### 1. Lecture de la référence

- Lire `CLAUDE.md` à la racine du projet
- Extraire : architecture cible, composants listés, tokens documentés

### 2. Analyse de l'état réel

Scanner et identifier :

| Catégorie | Éléments | Fichiers |
|-----------|----------|----------|
| TOKEN | Tokens CSS | `_*.scss` |
| COMP | Composants Angular | `*.component.ts` |
| STORY | Stories Storybook | `*.stories.ts` |
| DOC | Documentation | `*.mdx` |

Détecter :
- Incohérences entre CLAUDE.md et état réel
- Tokens manquants ou mal nommés
- Composants sans stories
- Stories sans composants correspondants

### 3. Composants manquants (vs références)

Comparer avec Design Systems standards (Material, Ant) :

| Composant | Priorité | Description |
|-----------|----------|-------------|
| DsSwitch | Haute | Toggle binaire explicite |
| DsTree | Haute | Affichage hiérarchique |
| DsTimePicker | Haute | Sélecteur heure |
| DsDrawer | Moyenne | Panneau latéral overlay |
| DsEmpty | Moyenne | État vide standardisé |

Maximum 5 propositions par exécution.

### 4. Synchronisation CLAUDE.md

Si écart détecté :
- Mettre à jour `CLAUDE.md` directement
- Créer une tâche `[DOC]` si action code nécessaire

### 5. Génération DS_TODO.md

Format :

```markdown
# DS_TODO - Design System Tasks

> Généré par /ds-orchestrator
> Date : YYYY-MM-DD

## Tokens
- [ ] [TOKEN] Description | `fichier.scss` | ~2h

## Composants
- [ ] [COMP] Description | `component.ts` | ~3h

## Stories
- [ ] [STORY] Description | `component.stories.ts` | ~1h

## Documentation
- [ ] [DOC] Description | `fichier.md` | ~0.5h

## Nouveaux composants
- [ ] [NEW] DsXxx - Description | `ds-xxx/` | Priorité | ~4h

---
## Résumé
- TOKEN : X tâches
- COMP : X tâches
- Total : X tâches (~Xh estimées)
```

### 6. Diagnostic (affichage)

```
═══════════════════════════════════════════
  DIAGNOSTIC DESIGN SYSTEM
═══════════════════════════════════════════

ÉTAT ACTUEL
  Tokens    : X définis
  Composants: X implémentés
  Stories   : X créées

PROBLÈMES DÉTECTÉS
  [TOKEN] X problèmes
  [COMP]  X problèmes

COMPOSANTS MANQUANTS
  [NEW] DsSwitch, DsTree...

TÂCHES CRÉÉES DANS DS_TODO.md
  - [TOKEN] Description
  ...

PROCHAINES ÉTAPES
  Exécuter /ds-todo pour traiter les tâches
═══════════════════════════════════════════
```

## Contraintes

- Ne pas inventer de fichiers inexistants
- Ne pas modifier le code source (sauf CLAUDE.md et DS_TODO.md)
- Maximum 20 tâches par exécution
- Préserver les tâches non cochées existantes
