# Guide de migration — Design System Assist-AI

Ce guide vous accompagne dans la migration entre les différentes versions du design system `ds-angular`.

## Table des matières

- [Migration vers v1.0.0](#migration-vers-v100)
- [Migration depuis les versions pré-1.0](#migration-depuis-les-versions-pré-10)
- [Politique de versioning](#politique-de-versioning)
- [Dépréciations et suppressions](#dépréciations-et-suppressions)

---

## Migration vers v1.0.0

La version 1.0.0 est la première version stable du design system. Elle consolide l'architecture à deux niveaux (primitives + components), le système de tokens à 3 couches, et introduit 17 composants DS prêts pour la production.

### Architecture consolidée

**Avant (versions alpha/beta)** :
- Architecture expérimentale avec tokens éparpillés
- Composants mixant primitives et logique métier
- Thèmes incomplets

**Après (v1.0.0)** :
```
projects/ds-angular/src/
├── lib/
│   ├── primitives/      # 7 primitives atomiques
│   ├── components/      # 17 composants DS
│   └── utils/           # Utilitaires partagés
└── styles/
    ├── tokens/          # Architecture 3 couches
    │   ├── _primitives.scss
    │   ├── _semantic.scss
    │   └── _tokens.scss
    └── themes/          # 3 thèmes (light, dark, custom)
```

### Changements de nommage des tokens

#### Tokens badge (BREAKING CHANGE)

**Avant** :
```scss
--badge-bg-color      // ❌ Déprécié
--badge-text-color    // ❌ Déprécié
--badge-fg            // ❌ Déprécié
```

**Après** :
```scss
--badge-bg            // ✅ Nouveau standard
--badge-text          // ✅ Nouveau standard
```

**Migration** :
```scss
// Ancien code
.my-badge {
  background: var(--badge-bg-color);
  color: var(--badge-text-color);
}

// Nouveau code
.my-badge {
  background: var(--badge-bg);
  color: var(--badge-text);
}
```

#### Tokens modal/input harmonisés

**Avant** :
```scss
--modal-border        // ❌ Supprimé (doublon)
--input-border        // ❌ Supprimé (doublon)
```

**Après** :
```scss
--modal-border-color  // ✅ Unique token
--input-border-color  // ✅ Unique token
```

### Nouveaux composants

La v1.0.0 introduit 3 nouveaux composants utilitaires :

```typescript
// ds-card : container avec header, body, footer
import { DsCard } from 'ds-angular';

@Component({
  template: `
    <ds-card variant="elevated" size="md">
      <div header>Titre</div>
      <div body>Contenu</div>
      <div footer>Actions</div>
    </ds-card>
  `
})

// ds-alert : bannières de feedback
import { DsAlert } from 'ds-angular';

@Component({
  template: `
    <ds-alert type="success" [closable]="true">
      Opération réussie !
    </ds-alert>
  `
})

// ds-divider : séparateurs
import { DsDivider } from 'ds-angular';

@Component({
  template: `
    <ds-divider>Section suivante</ds-divider>
  `
})
```

### Mise à jour des imports

**Avant (imports directs)** :
```typescript
import { DsButton } from 'ds-angular/lib/components/ds-button/ds-button';
```

**Après (barrel exports)** :
```typescript
import { DsButton, DsModal, DsAlert } from 'ds-angular';
```

Tous les composants et types sont désormais exportés via le barrel `index.ts` pour un import simplifié.

### Thèmes

**Activation d'un thème** :
```typescript
// Angular 20+ avec signals
import { effect } from '@angular/core';

export class AppComponent {
  theme = signal<'light' | 'dark' | 'custom'>('light');

  constructor() {
    effect(() => {
      document.documentElement.className = `theme-${this.theme()}`;
    });
  }
}
```

**Thème custom** :
Créez un fichier `_custom-overrides.scss` :
```scss
:root.theme-custom {
  --custom-accent-primary: #your-color;
  --custom-bg: #your-bg;
  --custom-text-default: #your-text;
}
```

---

## Migration depuis les versions pré-1.0

### Depuis v0.6.x (ÉTAPE 6 - Optimisation)

**Changements mineurs** :
- Tree-shaking activé : `sideEffects: false` dans `ng-package.json`
- IconRegistryService créé pour lazy-loading FontAwesome
- Pas de breaking changes

**Migration** : Aucune action requise, upgrade direct possible.

### Depuis v0.5.x (ÉTAPE 5 - Outillage)

**Changements** :
- Workflow CI/CD avec détection de régressions
- Scripts validation ajoutés : `test:a11y`, `validate:tokens`

**Migration** : Vérifier que votre CI passe les nouveaux seuils (couverture ≥80%, bundle ≤5MB).

### Depuis v0.4.x (ÉTAPE 4 - Documentation)

**Changements** :
- 5 fichiers MDX ajoutés : Introduction, Tokens, Contributing, Patterns, Integration
- Stories Storybook enrichies (50+ stories)

**Migration** : Aucune action requise pour le code, documentation mise à jour.

### Depuis v0.3.x (ÉTAPE 3 - Renforcement)

**Changements importants** :
- Navigation clavier complète sur tous les composants overlay
- Attributs ARIA conformes WCAG 2.1 AA

**Migration** :
- Vérifier que vos usages custom respectent les nouveaux attributs ARIA
- Tester la navigation clavier dans vos formulaires

### Depuis v0.2.x (ÉTAPE 2 - Primitives)

**Changements structurels** :
- Introduction de l'architecture à 2 niveaux (primitives + components)

**Migration** :
Si vous utilisiez des composants internes, migrer vers les primitives :
```typescript
// Avant
import { InternalButton } from 'ds-angular/internals';

// Après
import { PrimitiveButton } from 'ds-angular/primitives';
```

### Depuis v0.1.x (ÉTAPE 1 - Tokens)

**Changements majeurs (BREAKING)** :
- Système de tokens complètement refondu
- Architecture 3 couches introduite

**Migration complète requise** :
1. Remplacer tous les tokens dépréciés (voir section ci-dessus)
2. Importer les nouveaux thèmes dans `styles.scss` :
```scss
@use 'ds-angular/themes/light';
@use 'ds-angular/themes/dark';
```
3. Activer un thème par défaut sur `:root`

---

## Politique de versioning

Le design system suit [Semantic Versioning 2.0.0](https://semver.org/) :

- **MAJOR (x.0.0)** : Breaking changes (tokens supprimés, API modifiée)
- **MINOR (0.x.0)** : Nouvelles fonctionnalités rétrocompatibles (nouveaux composants, nouveaux tokens)
- **PATCH (0.0.x)** : Corrections de bugs, optimisations sans breaking changes

### Calendrier de dépréciation

Les tokens et APIs dépréciés suivent ce calendrier :

1. **Annonce de dépréciation** : Token marqué `@deprecated` avec date d'expiration
2. **Période de transition (3 mois)** : Fallback CSS fourni pour rétrocompatibilité
3. **Suppression** : Token supprimé dans la prochaine version majeure

**Exemple** :
```scss
// v0.9.0 (Décembre 2024)
--badge-bg-color: var(--badge-bg); // @deprecated Utiliser --badge-bg

// v1.0.0 (Mars 2025)
// --badge-bg-color supprimé ❌
```

---

## Dépréciations et suppressions

### Tokens supprimés en v1.0.0

| Token déprécié | Remplacement | Date de suppression |
|----------------|--------------|---------------------|
| `--badge-bg-color` | `--badge-bg` | 2025-03-01 ✅ |
| `--badge-text-color` | `--badge-text` | 2025-03-01 ✅ |
| `--badge-fg` | `--badge-text` | 2025-03-01 ✅ |
| `--modal-border` | `--modal-border-color` | 2025-03-01 ✅ |
| `--input-border` | `--input-border-color` | 2025-03-01 ✅ |

### Tokens à surveiller (prochaines versions)

| Token actuel | Statut | Action recommandée |
|--------------|--------|-------------------|
| `--color-primary` | ✅ Stable | Aucune action |
| `--font-size-1` à `--font-size-6` | ✅ Stable | Aucune action |
| `--space-1` à `--space-8` | ✅ Stable | Aucune action |
| `--radius-1` à `--radius-4` | ✅ Stable | Aucune action |

### APIs dépréciées

Aucune API n'est dépréciée en v1.0.0. Toutes les APIs sont stables.

---

## Support et ressources

- **Documentation complète** : [Storybook](https://votre-storybook-url.com)
- **Issues et bugs** : [GitHub Issues](https://github.com/votre-org/design-system/issues)
- **Discussions** : [GitHub Discussions](https://github.com/votre-org/design-system/discussions)
- **Changelog** : [CHANGELOG.md](./CHANGELOG.md)

Pour toute question sur la migration, ouvrez une discussion sur GitHub.
