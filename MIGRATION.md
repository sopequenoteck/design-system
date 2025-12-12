# Guide de migration - DS Angular

Ce guide documente les changements majeurs entre les versions et les étapes de migration nécessaires.

---

## Migration v1.2 → v1.3

**Date de sortie** : Décembre 2025
**Type** : Minor release (nouvelles fonctionnalités, rétrocompatible)

### Nouvelles fonctionnalités

#### Composants ajoutés (SPRINT-001)

Trois nouveaux composants formulaires sont disponibles :

1. **DsChip** : Étiquettes interactives avec support removable et selectable
2. **DsSlider** : Sélecteur de valeur numérique (simple et range)
3. **DsFileUpload** : Upload de fichiers avec drag & drop et preview

```typescript
// Imports
import { DsChip } from '@kksdev/ds-angular';
import { DsSlider } from '@kksdev/ds-angular';
import { DsFileUpload } from '@kksdev/ds-angular';

// Utilisation
@Component({
  standalone: true,
  imports: [DsChip, DsSlider, DsFileUpload],
  template: `
    <ds-chip color="primary" [removable]="true">Angular 20</ds-chip>
    <ds-slider [min]="0" [max]="100" [(value)]="volume" />
    <ds-file-upload [accept]="'image/*'" [multiple]="true" />
  `
})
export class MyComponent {
  volume = 50;
}
```

#### Nouveaux tokens SPRINT-001

**Chip tokens** (16 tokens)
- `--chip-height-{sm|md|lg}`
- `--chip-padding-{x|y}-{sm|md|lg}`
- `--chip-font-size-{sm|md|lg}`
- `--chip-border-radius`

**Slider tokens** (16 tokens)
- `--slider-track-height-{sm|md|lg}`
- `--slider-thumb-size-{sm|md|lg}`
- `--slider-track-radius`
- `--slider-label-gap`

**File Upload tokens** (18 tokens)
- `--file-upload-min-height-{sm|md|lg}`
- `--file-upload-padding-{sm|md|lg}`
- `--file-upload-radius`
- `--file-upload-preview-size-{sm|md|lg}`

Tous ces tokens sont disponibles dans les 3 thèmes (light, dark, custom).

#### Token `--space-7` ajouté

Un token manquant a été ajouté pour compléter l'échelle d'espacement :

```scss
// _primitives.scss
$space-7: 1.75rem; // 28px

// _tokens.scss
--space-7: 1.75rem;
```

**Impact** : Aucune action requise, améliore la granularité de l'échelle.

#### Barrel export pour `ds-toast`

Simplification des imports pour le composant Toast :

**Avant v1.3** :
```typescript
import { DsToastComponent } from '@kksdev/ds-angular/components/ds-toast/ds-toast.component';
import { DsToastService } from '@kksdev/ds-angular/components/ds-toast/ds-toast.service';
```

**Après v1.3** :
```typescript
import { DsToastComponent, DsToastService } from '@kksdev/ds-angular';
// ou
import { DsToastComponent, DsToastService } from '@kksdev/ds-angular/components/ds-toast';
```

### Tests e2e ajoutés

90+ tests Playwright pour les nouveaux composants :
- `e2e/chip.spec.ts` (30 tests)
- `e2e/slider.spec.ts` (28 tests)
- `e2e/file-upload.spec.ts` (32 tests)

### Documentation enrichie

- **Tokens.mdx** : Section "Breakpoints" avec exemples visuels
- **Accessibility.mdx** : Patterns WCAG pour chip, slider, file-upload
- **Integration.mdx** : Exemples formulaires avec nouveaux composants

### Actions requises

#### 1. Mise à jour du package

```bash
npm install @kksdev/ds-angular@1.3.0
```

#### 2. Imports (optionnel, amélioration)

Vous pouvez simplifier les imports du composant Toast si utilisé :

```typescript
// Ancien (toujours supporté)
import { DsToastComponent } from '@kksdev/ds-angular';

// Nouveau (recommandé)
import { DsToastComponent, DsToastService, ToastOptions } from '@kksdev/ds-angular';
```

#### 3. Thèmes personnalisés

Si vous utilisez un thème custom, vous pouvez surcharger les nouveaux tokens SPRINT-001 dans votre fichier de thème :

```scss
:root.theme-custom {
  // Chip
  --chip-bg-primary: #your-color;
  --chip-text-primary: #your-text-color;

  // Slider
  --slider-track-bg: #your-track-color;
  --slider-thumb-bg: #your-thumb-color;

  // File Upload
  --file-upload-border: #your-border-color;
  --file-upload-bg-hover: #your-hover-bg;
}
```

### Dépréciations

Aucune dépréciation dans cette version.

### Bugs corrigés

- Fix : Warning Storybook addon `experimental-addon-test` supprimé
- Fix : Token `--space-7` manquant ajouté à l'échelle d'espacement

---

## Migration v1.1 → v1.2

**Date de sortie** : Décembre 2025
**Type** : Minor release

### Changements majeurs

#### Upgrade FontAwesome v7

- `@fortawesome/fontawesome-svg-core` : v6 → v7
- `@fortawesome/angular-fontawesome` : v2 → v3

**Action requise** : Aucune, les icônes sont gérées en interne par `IconRegistryService`.

#### Tokens thématiques pour 8 composants

Ajout de tokens thématiques dans `_light.scss` et `_dark.scss` pour :
- `ds-card`
- `ds-alert`
- `ds-divider`
- `ds-select`
- `ds-table`
- `ds-combobox`
- `ds-progress-bar`
- `ds-skeleton`

**Impact** : Les composants respectent automatiquement le thème actif sans action utilisateur.

#### Fix avatar overflow

Correction de l'overflow d'image dans `ds-avatar` en mode `circle`.

---

## Migration v1.0 → v1.1

**Date de sortie** : Décembre 2025
**Type** : Minor release

### Changements majeurs

#### Renommage du package npm

Le package a été renommé de `ds-angular` à `@kksdev/ds-angular`.

**Action requise** :

```bash
# Désinstaller l'ancien package
npm uninstall ds-angular

# Installer le nouveau
npm install @kksdev/ds-angular
```

Mettez à jour tous les imports dans votre projet :

```typescript
// Avant
import { DsButton } from 'ds-angular';

// Après
import { DsButton } from '@kksdev/ds-angular';
```

```scss
// Avant
@use 'ds-angular/styles';

// Après
@use '@kksdev/ds-angular/styles';
```

#### Nouveaux composants

- `DsAvatar` : Affichage photo/initiales utilisateur
- `DsMenu` : Menu contextuel avec items et dividers

#### Configuration Docker pour Storybook

Ajout d'un `Dockerfile` et `docker-compose.yml` pour lancer Storybook en conteneur.

#### Workflows CI/CD enrichis

- Workflow `a11y-wave.yml` : Tests accessibilité automatisés
- Workflow `chromatic.yml` : Visual regression testing
- Workflow `bundlesize.yml` : Surveillance taille bundle avec commentaires PR

---

## Support

Pour toute question sur la migration, consultez :
- **Storybook** : Documentation interactive (`npm run storybook`)
- **Issues GitHub** : https://github.com/sopequeno-tech/design-system/issues
- **CHANGELOG.md** : Historique détaillé des versions
