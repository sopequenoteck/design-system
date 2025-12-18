# /migrate-component

Migre progressivement un composant Storybook vers ds-showcase.

## Objectif

Guider interactivement la migration d'un composant DS depuis Storybook vers l'application ds-showcase, en générant la définition, la page dédiée et la route.

## Arguments

- Sans argument : Affiche l'état de la migration et demande quel composant migrer
- `$ARGUMENTS = <component-id>` : Migre directement le composant spécifié (ex: ds-accordion)
- `$ARGUMENTS = status` : Affiche uniquement l'état de la migration (sans migrer)

## Workflow

### Phase 1 : Analyse de l'état

1. Scanner les composants Storybook existants :
   ```
   projects/ds-angular/src/lib/components/*/
   ```
   Chercher les dossiers contenant un fichier `.stories.ts`

2. Scanner les composants déjà migrés :
   ```
   projects/ds-showcase/src/app/registry/definitions/*.definition.ts
   ```

3. Afficher le statut de migration :
   ```
   📊 Migration ds-showcase

   ✅ Migrés (5/53) : 9%
   ds-button, ds-input-field, ds-modal, ds-select, ds-tabs

   📋 Restants par catégorie :
   • actions (2): ds-chip, ds-menu
   • forms (10): ds-checkbox, ds-radio-group, ds-toggle, ...
   • navigation (6): ds-accordion, ds-pagination, ds-stepper, ...
   • overlays (4): ds-dropdown, ds-tooltip, ds-popover, ds-drawer
   • feedback (5): ds-alert, ds-card, ds-empty, ds-skeleton, ...
   • data (4): ds-table, ds-combobox, ds-transfer, ...
   • layout (2): ds-container, ds-divider
   ```

### Phase 2 : Sélection du composant

Si `$ARGUMENTS = status` → s'arrêter après Phase 1.

Si `$ARGUMENTS` est un ID de composant (ex: ds-accordion) → passer à Phase 3 avec ce composant.

Sinon, demander à l'utilisateur :
- "Quel composant veux-tu migrer ?" avec AskUserQuestion
- Proposer les 5-6 premiers composants non migrés comme options

### Phase 3 : Extraction des métadonnées

1. Lire le fichier source du composant :
   ```
   projects/ds-angular/src/lib/components/{component}/{component}.ts
   ```
   Extraire :
   - Nom de la classe (ex: DsAccordion)
   - Sélecteur (ex: ds-accordion)
   - Inputs : `input()`, `input.required()`, `@Input()`
   - Outputs : `output()`, `@Output()`
   - Types exportés (interfaces, types)

2. Lire le fichier stories :
   ```
   projects/ds-angular/src/lib/components/{component}/{component}.stories.ts
   ```
   Extraire :
   - Catégorie depuis `title` (ex: "Components/Navigation/Accordion" → navigation)
   - Description depuis meta ou argTypes
   - Stories exportées (noms et configurations)

3. Afficher un résumé pour validation :
   ```
   📦 Composant : DsAccordion
   🏷️  Sélecteur : ds-accordion
   📂 Catégorie : navigation

   📥 Inputs :
   • items (required) : AccordionItem[]
   • multi : boolean = false
   • expandedIds : string[] = []

   📤 Outputs :
   • itemExpanded : EventEmitter<AccordionItem>
   • itemCollapsed : EventEmitter<AccordionItem>

   📖 Stories détectées (12) :
   Default, Sizes, MultiExpand, Nested, WithIcons, Disabled, ...

   Confirmer la migration ? (o/n)
   ```

### Phase 4 : Génération des fichiers

#### 4.1 Créer la définition

Fichier : `projects/ds-showcase/src/app/registry/definitions/ds-{component}.definition.ts`

```typescript
import { ComponentDefinition } from '../types';

export const Ds{Component}Definition: ComponentDefinition = {
  id: 'ds-{component}',
  name: '{Component}',
  selector: 'ds-{component}',
  category: '{category}',
  description: '{description}',

  props: [
    // Mapper les inputs/outputs extraits
  ],

  demos: [
    // Mapper les stories principales (max 5)
  ],
};
```

#### 4.2 Créer la page dédiée

Fichier : `projects/ds-showcase/src/app/features/components/{component}/{component}.page.ts`

```typescript
import { Component, signal, computed } from '@angular/core';
import { Ds{Component} } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { Ds{Component}Definition } from '../../../registry/definitions/ds-{component}.definition';
import { ControlValues } from '../../../registry/types';

@Component({
  selector: 'app-{component}-page',
  standalone: true,
  imports: [Ds{Component}, DemoContainer, PropsTable],
  template: `...`,
  styles: [`...`]
})
export class {Component}Page {
  definition = Ds{Component}Definition;
  // ... signals et méthodes
}
```

#### 4.3 Mettre à jour definitions/index.ts

Ajouter :
```typescript
export { Ds{Component}Definition } from './ds-{component}.definition';

// Dans ALL_DEFINITIONS :
Ds{Component}Definition,
```

#### 4.4 Mettre à jour app.routes.ts

Ajouter avant le fallback générique :
```typescript
{
  path: 'components/{category}/ds-{component}',
  loadComponent: () =>
    import('./features/components/{component}/{component}.page').then(m => m.{Component}Page),
},
```

### Phase 5 : Validation

1. Demander : "Veux-tu que je lance le build pour vérifier ?"

2. Si oui, exécuter :
   ```bash
   npm run build:lib && ng build ds-showcase --configuration=development
   ```

3. Si erreurs, les afficher et proposer des corrections.

4. Afficher le nouveau statut :
   ```
   ✅ Migration réussie : ds-accordion

   📊 Nouveau statut : 6/53 composants (11%)
   ```

## Mapping des catégories

| Pattern Storybook | Catégorie ds-showcase |
|-------------------|----------------------|
| */Actions/* | actions |
| */Forms/* | forms |
| */Navigation/* | navigation |
| */Data/* | data |
| */Feedback/* | feedback |
| Layout/* | layout |
| Overlays/* | overlays |
| * (autre) | display |

## Contraintes

- Ne jamais écraser un fichier existant sans confirmation explicite
- Générer du TypeScript valide et bien typé
- Utiliser les vrais composants DS (pas de placeholders)
- Respecter les conventions de style existantes (copier button.page.ts comme modèle)
- Limiter à 5 démos maximum par composant (les plus représentatives)
- Toujours utiliser des signals pour les contrôles interactifs

## Exemples

```
/migrate-component
→ Affiche l'état puis demande quel composant migrer

/migrate-component ds-accordion
→ Migre directement ds-accordion (avec confirmation)

/migrate-component status
→ Affiche uniquement l'état de la migration
```
