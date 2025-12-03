# Migration du Design System Assist-AI vers ds-angular

## Vue d'Ensemble

Migration d'un design system Angular 20 (23 composants) depuis assist-ai vers une bibliothèque Angular standalone publiable sur npm avec Storybook.

**Date de début :** 2025-12-03
**Statut global :** 🟢 En cours (6/10 phases complétées)

---

## 📊 Progression Globale

- ✅ **PHASE 1** : Préparation du Workspace (100%)
- ✅ **PHASE 2** : Migration Tokens & Styles (100%)
- ✅ **PHASE 3** : Configuration Secondary Entry Points (100%)
- ✅ **PHASE 4** : Migration Utils (100%)
- ✅ **PHASE 5** : Migration Primitives (100%)
- ✅ **PHASE 6** : Migration Composants DS (100%)
- ⬜ **PHASE 7** : Tests (0%)
- ⬜ **PHASE 8** : Storybook (0%)
- ⬜ **PHASE 9** : Build & Validation (0%)
- ⬜ **PHASE 10** : Documentation (0%)

**Progression totale : 60%**

---

## ✅ PHASE 1 : Préparation du Workspace (Complétée)

### Objectif
Configurer le workspace Angular 20 avec toutes les dépendances nécessaires.

### Actions Réalisées

#### 1.1 Configuration package.json racine ✅
- [x] Upgrade Angular 19 → Angular 20.3
- [x] Ajout @angular/cdk ^20.3.0
- [x] Ajout @fortawesome/angular-fontawesome ^0.15.0
- [x] Ajout @fortawesome/fontawesome-svg-core ^6.7.2
- [x] Ajout @fortawesome/free-solid-svg-icons ^6.7.2
- [x] Ajout Storybook 8.5.0 (tous les addons)
- [x] Scripts : `build:lib`, `test:headless`, `test:coverage`
- [x] Scripts : `storybook`, `build-storybook`
- [x] Scripts : `publish:lib`, `publish:lib:dry-run`

#### 1.2 Configuration package.json de la lib ✅
- [x] Mise à jour version → 0.1.0
- [x] Ajout description et métadonnées
- [x] Configuration peerDependencies pour Angular 20
- [x] Ajout keywords (angular20, design-system, standalone)
- [x] Configuration `sideEffects: ["*.scss", "*.css"]`

#### 1.3 Configuration angular.json ✅
- [x] Modification prefix : `lib` → `ds`

#### 1.4 Configuration tsconfig.json ✅
- [x] Ajout paths mapping : `ds-angular` et `ds-angular/*`

#### 1.5 Installation des dépendances ✅
- [x] Exécution `npm install --legacy-peer-deps`
- [x] 1183 packages installés, 0 vulnérabilités

### Fichiers Modifiés
- `/package.json`
- `/projects/ds-angular/package.json`
- `/angular.json`
- `/tsconfig.json`
- `/CLAUDE.md` (mise à jour Angular 20)

---

## ✅ PHASE 2 : Migration Tokens & Styles (Complétée)

### Objectif
Migrer le système de tokens SCSS à 3 niveaux et les thèmes.

### Actions Réalisées

#### 2.1 Structure de dossiers ✅
- [x] Création `projects/ds-angular/src/styles/tokens/`
- [x] Création `projects/ds-angular/src/styles/themes/`

#### 2.2 Migration fichiers tokens ✅
- [x] Copie `_primitives.scss` (couleurs, spacing, radius, shadows, z-index, animations, typo)
- [x] Copie `_semantic.scss` (tokens composant-spécifiques)
- [x] Copie `_tokens.scss` (250+ CSS custom properties)

#### 2.3 Migration thèmes ✅
- [x] Copie `_light.scss`
- [x] Copie `_dark.scss`
- [x] Copie `_custom.scss`

#### 2.4 Fichiers d'export ✅
- [x] Création `_index.scss` (barrel principal SCSS)
- [x] Création `README.md` avec documentation complète

### Fichiers Créés
- `/projects/ds-angular/src/styles/tokens/_primitives.scss`
- `/projects/ds-angular/src/styles/tokens/_semantic.scss`
- `/projects/ds-angular/src/styles/tokens/_tokens.scss`
- `/projects/ds-angular/src/styles/themes/_light.scss`
- `/projects/ds-angular/src/styles/themes/_dark.scss`
- `/projects/ds-angular/src/styles/themes/_custom.scss`
- `/projects/ds-angular/src/styles/_index.scss`
- `/projects/ds-angular/src/styles/README.md`

---

## ✅ PHASE 3 : Configuration Secondary Entry Points (Complétée)

### Objectif
Configurer les points d'entrée secondaires pour exports granulaires.

### Actions Réalisées

#### 3.1 Entry Point "primitives/" ✅
- [x] Création `ng-package.json`
- [x] Création `package.json`
- [x] Création `public-api.ts`
- [x] Création `index.ts` (barrel avec exports commentés)

#### 3.2 Entry Point "components/" ✅
- [x] Création `ng-package.json`
- [x] Création `package.json`
- [x] Création `public-api.ts`
- [x] Création `index.ts` (barrel avec exports commentés)

#### 3.3 Entry Point "utils/" ✅
- [x] Création `ng-package.json`
- [x] Création `package.json`
- [x] Création `public-api.ts`
- [x] Création `index.ts` (barrel avec exports commentés)

#### 3.4 Mise à jour API principale ✅
- [x] Modification `/projects/ds-angular/src/public-api.ts`
- [x] Export `./lib/primitives`, `./lib/components`, `./lib/utils`

#### 3.5 Nettoyage ✅
- [x] Suppression fichiers de démo (`ds-angular.service`, `ds-angular.component`)

### Fichiers Créés
- `/projects/ds-angular/src/lib/primitives/{ng-package.json, package.json, public-api.ts, index.ts}`
- `/projects/ds-angular/src/lib/components/{ng-package.json, package.json, public-api.ts, index.ts}`
- `/projects/ds-angular/src/lib/utils/{ng-package.json, package.json, public-api.ts, index.ts}`

### Fichiers Modifiés
- `/projects/ds-angular/src/public-api.ts`

---

## ✅ PHASE 4 : Migration Utils (Complétée)

### Objectif
Migrer les utilitaires partagés (overlay positions CDK).

### Actions Réalisées

#### 4.1 Migration overlay-positions.ts ✅
- [x] Copie depuis `/Users/kellysossoe/Desktop/Devs/En cours/assist-ai/web-service/src/app/shared/ui/utils/`
- [x] Fichier contient : `DROPDOWN_POSITIONS`, `TOOLTIP_POSITIONS`, `POPOVER_POSITIONS`, `AUTOCOMPLETE_POSITIONS`

#### 4.2 Configuration export ✅
- [x] Décommentage export dans `lib/utils/index.ts`

### Fichiers Créés
- `/projects/ds-angular/src/lib/utils/overlay-positions.ts`

### Fichiers Modifiés
- `/projects/ds-angular/src/lib/utils/index.ts`

---

## ✅ PHASE 5 : Migration Primitives (Complétée)

### Objectif
Migrer les 7 composants primitives depuis assist-ai.

### Composants à Migrer

#### Ordre de migration :
1. ✅ **PrimitiveBadge** (simple, sans dépendances)
2. ✅ **PrimitiveButton** (FontAwesome)
3. ✅ **PrimitiveCheckbox** (CVA)
4. ✅ **PrimitiveRadio** (CVA)
5. ✅ **PrimitiveToggle** (CVA)
6. ✅ **PrimitiveInput** (CVA + complexe)
7. ✅ **PrimitiveTextarea** (CVA + complexe)

### Actions Réalisées

Pour chaque composant :
- [x] Créé dossier `projects/ds-angular/src/lib/primitives/primitive-<name>/`
- [x] Copié `primitive-<name>.ts` depuis assist-ai
- [x] Copié `primitive-<name>.html`
- [x] Copié `primitive-<name>.scss`
- [x] Copié `primitive-<name>.spec.ts`
- [x] Vérifié imports (inchangés, dépendances externes)
- [x] Pour CVA : vérifié `FormsModule`, `NG_VALUE_ACCESSOR`, implémentation `ControlValueAccessor`
- [x] Ajouté exports dans `lib/primitives/index.ts`

### Fichiers à Créer
- 7 dossiers × 4 fichiers = 28 fichiers au total

### Fichiers à Modifier
- `/projects/ds-angular/src/lib/primitives/index.ts` (exports)

### Temps Estimé
3-4 heures

---

## ✅ PHASE 6 : Migration Composants Design System (Complétée)

### Objectif
Migrer les 16 composants DS depuis assist-ai.

### Composants à Migrer

#### Groupe 1 : Sans dépendances complexes
1. ✅ **DsBadge** (utilise PrimitiveBadge)
2. ✅ **DsButton** (utilise PrimitiveButton)
3. ✅ **DsTabs** (autonome)
4. ✅ **DsBreadcrumb** (autonome)

#### Groupe 2 : CVA + primitives
5. ✅ **DsCheckbox** (utilise PrimitiveCheckbox + CVA)
6. ✅ **DsRadioGroup** (utilise PrimitiveRadio + CVA)
7. ✅ **DsToggle** (utilise PrimitiveToggle + CVA)
8. ✅ **DsInputField** (utilise PrimitiveInput + CVA)
9. ✅ **DsInputTextarea** (utilise PrimitiveTextarea + CVA)

#### Groupe 3 : CDK Overlay
10. ✅ **DsDropdown** (CDK Overlay + model)
11. ✅ **DsTooltip** (directive + component + CDK)
12. ✅ **DsPopover** (directive + component + CDK)
13. ✅ **DsModal** (CDK FocusTrap + Overlay)

#### Groupe 4 : Services
14. ✅ **DsToast** (service + 2 composants)

### Actions Réalisées

Pour chaque composant :
- [x] Créé dossier `projects/ds-angular/src/lib/components/ds-<name>/`
- [x] Copié tous les fichiers depuis assist-ai
- [x] Pour DsDropdown : copié aussi `model/dropdown-item.model.ts`
- [x] Pour DsTooltip/DsPopover : copié directive + component
- [x] Pour DsToast : copié service + ds-toast.component + ds-toast-container.component
- [x] Vérifié imports relatifs (restent identiques grâce à structure préservée)
- [x] Ajouté exports dans `lib/components/index.ts`

### Fichiers à Créer
- 14-16 dossiers × 3-5 fichiers = ~60 fichiers au total

### Fichiers à Modifier
- `/projects/ds-angular/src/lib/components/index.ts` (exports)

### Temps Estimé
5-6 heures

---

## ⬜ PHASE 7 : Tests (En attente)

### Objectif
Configurer et exécuter les tests Karma/Jasmine.

### Actions à Réaliser

#### 7.1 Configuration Karma
- [ ] Vérifier/créer `projects/ds-angular/karma.conf.js`
- [ ] Vérifier `projects/ds-angular/tsconfig.spec.json`

#### 7.2 Adaptation des tests
- [ ] Vérifier imports Angular Testing dans tous les .spec.ts
- [ ] Ajouter `provideAnimations()` si nécessaire
- [ ] Ajouter `OverlayModule`, `NoopAnimationsModule` pour CDK
- [ ] Ajouter `FormsModule`, `ReactiveFormsModule` pour CVA

#### 7.3 Exécution
- [ ] Lancer `npm run test`
- [ ] Corriger les erreurs
- [ ] Lancer `npm run test:coverage`
- [ ] Vérifier coverage > 70%

### Fichiers à Vérifier
- Tous les `.spec.ts` (24 fichiers)

### Temps Estimé
1 heure

---

## ⬜ PHASE 8 : Storybook (En attente)

### Objectif
Installer et configurer Storybook avec stories pour tous les composants.

### Actions à Réaliser

#### 8.1 Installation
- [ ] Exécuter `npx storybook@latest init --type angular --builder webpack5`
- [ ] Laisser Storybook configurer `.storybook/`

#### 8.2 Configuration
- [ ] Créer/modifier `.storybook/main.ts`
- [ ] Configurer stories path : `../projects/ds-angular/src/**/*.stories.@(js|jsx|mjs|ts|tsx)`
- [ ] Ajouter addons : essentials, interactions, links, a11y
- [ ] Créer/modifier `.storybook/preview.ts`
- [ ] Importer styles SCSS : `!style-loader!css-loader!sass-loader!../projects/ds-angular/src/styles/tokens/_tokens.scss`
- [ ] Configurer thème switcher (light/dark)

#### 8.3 Création stories primitives
- [ ] `primitive-button.stories.ts` (variants, sizes, icons, disabled, outline)
- [ ] `primitive-input.stories.ts`
- [ ] `primitive-badge.stories.ts`
- [ ] `primitive-checkbox.stories.ts`
- [ ] `primitive-radio.stories.ts`
- [ ] `primitive-textarea.stories.ts`
- [ ] `primitive-toggle.stories.ts`

#### 8.4 Création stories composants DS
- [ ] `ds-button.stories.ts`
- [ ] `ds-input-field.stories.ts` (avec exemples CVA)
- [ ] `ds-input-textarea.stories.ts`
- [ ] `ds-checkbox.stories.ts`
- [ ] `ds-radio-group.stories.ts`
- [ ] `ds-toggle.stories.ts`
- [ ] `ds-dropdown.stories.ts`
- [ ] `ds-tabs.stories.ts`
- [ ] `ds-breadcrumb.stories.ts`
- [ ] `ds-badge.stories.ts`
- [ ] `ds-modal.stories.ts`
- [ ] `ds-popover.stories.ts`
- [ ] `ds-tooltip.stories.ts`
- [ ] `ds-toast.stories.ts`

#### 8.5 Stories documentation
- [ ] Créer `tokens.stories.mdx` (documentation tokens)
- [ ] Créer `tokens-colors.stories.ts` (affichage couleurs)

#### 8.6 Test Storybook
- [ ] Lancer `npm run storybook`
- [ ] Vérifier sur `http://localhost:6006`
- [ ] Tester switcher de thème
- [ ] Tester contrôles interactifs
- [ ] Vérifier addon a11y

### Fichiers à Créer
- `.storybook/main.ts`
- `.storybook/preview.ts`
- ~25 fichiers `.stories.ts`
- 1-2 fichiers `.stories.mdx`

### Temps Estimé
4-5 heures

---

## ⬜ PHASE 9 : Build & Validation (En attente)

### Objectif
Builder la lib et valider le package distribué.

### Actions à Réaliser

#### 9.1 Build de la lib
- [ ] Exécuter `npm run build:lib`
- [ ] Vérifier sortie dans `dist/ds-angular/`

#### 9.2 Vérification structure dist
- [ ] Vérifier présence `dist/ds-angular/package.json`
- [ ] Vérifier secondary entry points : `primitives/`, `components/`, `utils/`
- [ ] Vérifier présence `styles/` (SCSS)
- [ ] Vérifier `esm2022/` et `fesm2022/`

#### 9.3 Test d'intégration
- [ ] Créer projet Angular test temporaire
- [ ] Installer lib locale : `npm install /chemin/vers/dist/ds-angular`
- [ ] Tester import principal : `import { DsButton } from 'ds-angular'`
- [ ] Tester secondary entry points : `import { PrimitiveButton } from 'ds-angular/primitives'`
- [ ] Tester import SCSS : `@use 'ds-angular/styles/tokens' as ds;`

#### 9.4 Build Storybook
- [ ] Exécuter `npm run build-storybook`
- [ ] Vérifier output dans `storybook-static/`
- [ ] Tester localement

### Temps Estimé
1 heure

---

## ⬜ PHASE 10 : Documentation (En attente)

### Objectif
Créer la documentation complète pour publication npm.

### Actions à Réaliser

#### 10.1 README.md de la lib
- [ ] Créer `projects/ds-angular/README.md`
- [ ] Section : Installation
- [ ] Section : Usage basique
- [ ] Section : Secondary entry points
- [ ] Section : Import des styles
- [ ] Section : Liste des composants
- [ ] Section : Exemples
- [ ] Section : Lien Storybook

#### 10.2 CHANGELOG.md
- [ ] Créer `projects/ds-angular/CHANGELOG.md`
- [ ] Version 0.1.0 avec liste complète des features

#### 10.3 .npmignore
- [ ] Créer `projects/ds-angular/.npmignore`
- [ ] Exclure sources, tests, stories, configs

#### 10.4 Dry-run publication
- [ ] Exécuter `npm run publish:lib:dry-run`
- [ ] Vérifier package.json généré
- [ ] Vérifier taille du package
- [ ] Vérifier contenu du package

### Fichiers à Créer
- `projects/ds-angular/README.md`
- `projects/ds-angular/CHANGELOG.md`
- `projects/ds-angular/.npmignore`

### Temps Estimé
1 heure

---

## 📈 Statistiques du Projet

### Composants
- **Primitives** : 0/7 migrés (0%)
- **Design System** : 0/16 migrés (0%)
- **Total composants** : 0/23 migrés (0%)

### Fichiers
- **Tokens SCSS** : 3/3 migrés (100%)
- **Thèmes SCSS** : 3/3 migrés (100%)
- **Utils** : 1/1 migrés (100%)
- **Tests** : 0/24 migrés (0%)
- **Stories** : 0/25 créés (0%)

### Configuration
- **Secondary entry points** : 3/3 configurés (100%)
- **Build pipeline** : 1/1 configuré (100%)
- **Storybook** : 0/1 configuré (0%)

---

## 🎯 Prochaine Session

### Priorité : PHASE 5 - Migration Primitives

**Ordre d'exécution recommandé :**
1. PrimitiveBadge (le plus simple)
2. PrimitiveButton (avec FontAwesome)
3. PrimitiveCheckbox, PrimitiveRadio, PrimitiveToggle (CVA simples)
4. PrimitiveInput, PrimitiveTextarea (CVA complexes)

**Commande pour démarrer :**
```bash
# Créer le premier dossier
mkdir -p projects/ds-angular/src/lib/primitives/primitive-badge

# Copier les fichiers
cp /Users/kellysossoe/Desktop/Devs/En\ cours/assist-ai/web-service/src/app/shared/ui/primitives/primitive-badge/* \
   projects/ds-angular/src/lib/primitives/primitive-badge/
```

---

## 🔗 Ressources

### Chemins Importants

**Source (assist-ai) :**
- Primitives : `/Users/kellysossoe/Desktop/Devs/En cours/assist-ai/web-service/src/app/shared/ui/primitives/`
- Design System : `/Users/kellysossoe/Desktop/Devs/En cours/assist-ai/web-service/src/app/shared/ui/design-system/`

**Destination (design-system) :**
- Primitives : `/Users/kellysossoe/Desktop/Devs/En cours/design-system/projects/ds-angular/src/lib/primitives/`
- Components : `/Users/kellysossoe/Desktop/Devs/En cours/design-system/projects/ds-angular/src/lib/components/`

### Documentation
- Plan complet : `/Users/kellysossoe/.claude/plans/generic-swimming-canyon.md`
- CLAUDE.md : `/Users/kellysossoe/Desktop/Devs/En cours/design-system/CLAUDE.md`

### Scripts Utiles
```bash
# Build de la lib
npm run build:lib

# Build en mode watch
npm run build:lib:watch

# Tests
npm run test
npm run test:headless
npm run test:coverage

# Storybook (après PHASE 8)
npm run storybook
npm run build-storybook

# Publication (après PHASE 10)
npm run publish:lib:dry-run
npm run publish:lib
```

---

## ⚠️ Notes Importantes

### Compatibilité
- Angular 20.3.0 installé avec succès
- FontAwesome 0.15.0 (demande Angular 18, mais fonctionne avec `--legacy-peer-deps`)
- Storybook 8.5.0 prêt à être configuré

### Points d'Attention
- Les imports relatifs doivent rester identiques grâce à la structure préservée
- Les composants CVA nécessitent `FormsModule` et `NG_VALUE_ACCESSOR`
- Les composants CDK nécessitent `OverlayModule` dans les tests
- Les styles SCSS utilisent `var(--token-name)` pour accéder aux CSS custom properties

### Structure Préservée
La structure `primitives/ → components/` est identique entre assist-ai et ds-angular, ce qui facilite les imports relatifs :
```typescript
// Fonctionne tel quel sans modification
import { PrimitiveButton } from '../../primitives/primitive-button/primitive-button';
```

---

**Dernière mise à jour :** 2025-12-03 17:30
**Prochaine phase :** PHASE 7 - Tests
