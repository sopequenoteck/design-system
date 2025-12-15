# /ds-doc

Analyse un composant DS et génère/met à jour sa documentation MDX.

---

## Objectif

Extraire automatiquement les informations d'un composant (inputs, outputs, variants, slots) depuis son code source et ses stories, puis générer ou mettre à jour la documentation MDX correspondante dans Storybook.

## Arguments

- **Sans argument** : Affiche l'aide
- `$ARGUMENTS = <composant>` : Analyse et génère la doc pour le composant (ex: `ds-list`)
- `$ARGUMENTS = <composant> --preview` : Affiche la doc générée sans modifier les fichiers
- `$ARGUMENTS = --all` : Scanne tous les composants et liste ceux sans documentation

## Chemins du projet

```
PROJET: /Users/kellysossoe/Desktop/Devs/En cours/design-system
COMPOSANTS: projects/ds-angular/src/lib/components/
PRIMITIVES: projects/ds-angular/src/lib/primitives/
DOCS_MDX: projects/ds-angular/src/lib/docs/
```

## Workflow

### Mode `--all` (scan global)

1. Lister tous les dossiers dans `components/` et `primitives/`
2. Pour chaque composant, vérifier s'il est référencé dans un fichier MDX de `docs/`
3. Afficher un rapport :

```
## Composants documentés (42)
✓ ds-button (Actions.mdx)
✓ ds-table (DataDisplay.mdx)
...

## Composants sans documentation (3)
✗ ds-list → Catégorie détectée: Data Display
✗ ds-list-item → Catégorie détectée: Data Display
✗ ds-list-group → Catégorie détectée: Data Display
```

### Mode `<composant>` (analyse individuelle)

#### Étape 1 : Localisation

1. Chercher le composant dans `components/{nom}/` puis `primitives/{nom}/`
2. Si non trouvé, lister les composants disponibles et arrêter

#### Étape 2 : Lecture des fichiers sources

Lire les fichiers du composant :
- `{nom}.ts` → Classe TypeScript (inputs, outputs, signals)
- `{nom}.html` → Template (slots, structure)
- `{nom}.stories.ts` → Stories (title, variants, exemples)

#### Étape 3 : Extraction des métadonnées

Depuis le fichier `.ts`, extraire via patterns :
- `input<TYPE>(...)` ou `@Input()` → Liste des inputs avec types et valeurs par défaut
- `output<TYPE>()` ou `@Output()` → Liste des outputs avec types
- `model<TYPE>()` → Two-way bindings

Depuis le fichier `.stories.ts`, extraire :
- `title: 'Components/CATEGORIE/Nom'` → Catégorie pour le MDX
- `argTypes` → Descriptions et options des propriétés
- Exports `const XXX: Story` → Liste des stories disponibles

Depuis le fichier `.html`, extraire :
- `<ng-content select="[slot]">` → Slots disponibles

#### Étape 4 : Détection du MDX cible

Mapper la catégorie vers le fichier MDX :
- `Actions` → `Actions.mdx`
- `Data Display` → `DataDisplay.mdx`
- `Form` → `Form.mdx`
- `Navigation` → `Navigation.mdx`
- `Feedback` → `Feedback.mdx`
- `Overlays` → `Overlays.mdx`

Si le MDX n'existe pas :
```
⚠ Pas de MDX trouvé pour la catégorie "CATEGORIE"
→ Crée d'abord : projects/ds-angular/src/lib/docs/CATEGORIE.mdx
```
Et arrêter.

#### Étape 5 : Génération du contenu

Générer la section documentation au format :

```markdown
---

## NomComposant

Description courte basée sur la description des stories ou le commentaire de classe.

### Inputs

| Nom | Type | Défaut | Description |
|-----|------|--------|-------------|
| variant | 'default' \| 'divided' \| 'card' | 'default' | Variante visuelle |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Taille du composant |
| loading | boolean | false | Affiche les skeletons |

### Outputs

| Nom | Type | Description |
|-----|------|-------------|
| dropped | CdkDragDrop | Événement déclenché après un drop |
| selectionChange | T[] | Émis quand la sélection change |

### Slots

| Nom | Description |
|-----|-------------|
| default | Contenu principal (ds-list-item) |
| empty | Contenu personnalisé pour l'état vide |

### Exemple d'utilisation

```html
<ds-NOM
  [prop]="value"
  (event)="handler($event)"
>
  Contenu
</ds-NOM>
`` `

### Stories disponibles

- Default
- AllVariants
- Loading
- Empty
```

#### Étape 6 : Mise à jour du MDX

**Mode `--preview`** :
- Afficher le contenu généré dans la console
- Ne pas modifier de fichier
- Afficher : `[PREVIEW] Aucun fichier modifié`

**Mode normal (première fois pour ce composant)** :
- Afficher le preview
- Demander confirmation : `Ajouter cette section à {MDX} ? (o/n)`
- Si oui, ajouter la section à la fin du fichier avant le dernier `---` ou à la fin

**Mode normal (composant déjà documenté)** :
- Trouver la section existante (entre `## NomComposant` et le prochain `## ` ou `---`)
- Remplacer par le nouveau contenu
- Afficher : `✓ Section mise à jour dans {MDX}`

#### Étape 7 : Résumé final

Afficher :

```
## ds-list

### Inputs (12)
| Nom | Type | Défaut | Description |
|-----|------|--------|-------------|
| variant | 'default' | 'divided' | 'card' | 'default' | Variante visuelle |
| size | 'sm' | 'md' | 'lg' | 'md' | Taille |
| loading | boolean | false | Affiche skeletons |
| loadingCount | number | 3 | Nombre de skeletons |
| empty | boolean | false | État vide |
| emptyTitle | string | '' | Titre état vide |
| emptyDescription | string | '' | Description état vide |
| draggable | boolean | false | Active Drag & Drop |
| virtual | boolean | false | Active virtualisation |
| itemSize | number | 48 | Hauteur item (virtual) |
| viewportHeight | number | 400 | Hauteur viewport |
| dragData | T[] | [] | Données pour le drag |

### Outputs (2)
| Nom | Type | Description |
|-----|------|-------------|
| dropped | CdkDragDrop<T[]> | Événement de drop |
| selectionChange | T[] | Changement de sélection |

### Stories (12)
Default, Divided, Card, Loading, Empty, AllVariants, AllSizes,
WithDragAndDrop, TaskListExample, LoadingStates, EmptyStates, CompleteShowcase

→ MDX mis à jour : DataDisplay.mdx
```

## Contraintes

- **Lecture seule par défaut** : Toujours prévisualiser avant modification
- **Pas de suppression** : Ne jamais supprimer de contenu existant, seulement ajouter ou mettre à jour
- **Respect du format** : Suivre exactement le format des MDX existants
- **Détection automatique** : Utiliser le `title` des stories pour la catégorie, pas de paramètre manuel
- **Confirmation** : Demander confirmation avant la première écriture d'un nouveau composant

## Exemples

```bash
# Aide
/ds-doc

# Analyser et documenter ds-list
/ds-doc ds-list

# Prévisualiser sans modifier
/ds-doc ds-list --preview

# Lister les composants sans doc
/ds-doc --all
```
