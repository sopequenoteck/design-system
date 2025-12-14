# /ds-todo

Exécute la prochaine tâche du fichier DS_TODO.md.

## Objectif

Exécuter les tâches du Design System une par une depuis `DS_TODO.md`.

## Workflow

### 1. Lecture des tâches

1. Lire `DS_TODO.md` à la racine du projet
2. Parser les lignes : `- [ ] [CATÉGORIE] Description | fichier | ~Xh`
3. Filtrer : seulement les tâches non cochées `- [ ]`
4. Trier par catégorie (TOKEN > COMP > STORY > DOC > NEW)

### 2. Sélection

- Prendre la première tâche non cochée
- Si aucune tâche : afficher "Toutes les tâches sont complétées"

### 3. Affichage avant exécution

```
═══════════════════════════════════════════
  PROCHAINE TÂCHE - Design System
═══════════════════════════════════════════

[CATÉGORIE] | ~Xh

Description de la tâche

Fichier concerné :
  - chemin/vers/fichier

───────────────────────────────────────────
  Restantes : TOKEN: X | COMP: X | STORY: X | DOC: X
───────────────────────────────────────────

Exécuter cette tâche ? (oui/non)
```

### 4. Exécution

Si confirmé :
- Charger le contexte du projet (CLAUDE.md)
- Analyser le fichier concerné
- Exécuter l'action demandée
- Respecter les conventions du projet

### 5. Mise à jour DS_TODO.md

**Si réussi** :
- Cocher la tâche : `- [x]` au lieu de `- [ ]`
- Proposer la tâche suivante

**Si échec ou blocage** :
- Ajouter `[BLOCKED]` à la ligne
- Expliquer la raison du blocage
- Proposer de passer à la suivante

## Comptage des tâches

- `[TOKEN]` → Tokens CSS
- `[COMP]` → Composants Angular
- `[STORY]` → Stories Storybook
- `[DOC]` → Documentation
- `[NEW]` → Nouveaux composants

## Règles

- Une seule tâche par confirmation
- En cas de doute : demander clarification
- Toujours mettre à jour DS_TODO.md après exécution
