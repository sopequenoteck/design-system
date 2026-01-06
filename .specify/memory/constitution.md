<!--
SYNC IMPACT REPORT
==================
Version change: 0.0.0 → 1.0.0 (MAJOR - Initial ratification)
Modified principles: N/A (initial creation)
Added sections:
  - 7 Core Principles (I-VII)
  - Angular Conventions section
  - Quality Gates section
  - Governance section
Removed sections: N/A
Templates requiring updates:
  - .specify/templates/plan-template.md: ✅ Constitution Check section exists
  - .specify/templates/spec-template.md: ✅ Compatible (user stories + requirements)
  - .specify/templates/tasks-template.md: ✅ Compatible (test-first workflow)
Follow-up TODOs: None
==================
-->

# DS-Angular Design System Constitution

## Core Principles

### I. Accessibilité WCAG 2.1 AA

Tous les composants DOIVENT être conformes au niveau AA des WCAG 2.1.

**Exigences non-négociables** :
- Navigation clavier complète (Tab, Arrow keys, Enter, Escape)
- Attributs ARIA appropriés sur tous les éléments interactifs
- Contraste de couleurs ≥ 4.5:1 pour le texte normal, ≥ 3:1 pour le texte large
- Focus visible et distinct sur tous les éléments focusables
- Labels et descriptions accessibles pour tous les contrôles de formulaire

**Rationale** : L'accessibilité n'est pas une fonctionnalité optionnelle. Un composant inaccessible est un composant défectueux qui exclut des utilisateurs.

**Validation CI** : `npm run test:a11y` DOIT passer sans erreur.

---

### II. Test-First / Couverture ≥80%

Les tests DOIVENT être écrits AVANT l'implémentation. La couverture de code DOIT être ≥80%.

**Exigences non-négociables** :
- Tout nouveau composant DOIT avoir des tests colocalisés (`*.spec.ts`)
- Les tests DOIVENT échouer avant l'implémentation (Red-Green-Refactor)
- Couverture des cas : nominal, erreurs, limites (null, vide, max, min), bords (0, 1, n-1, n)
- Tests d'états et variantes pour chaque composant
- Tests ControlValueAccessor pour les composants de formulaire

**Rationale** : Les tests garantissent la non-régression et documentent le comportement attendu. Sans tests, les refactorings deviennent risqués.

**Validation CI** : `npm run test:coverage` DOIT atteindre le seuil de 80%.

---

### III. Standalone Components + Signals

Tous les composants DOIVENT utiliser les patterns Angular 20 : standalone components et signals.

**Exigences non-négociables** :
- INTERDIT : `@Input()` / `@Output()` decorators → Utiliser `input()` / `output()` signals
- INTERDIT : NgModule → Tous les composants DOIVENT être standalone
- INTERDIT : `EventEmitter` → Utiliser `output()` (sauf exceptions legacy documentées)
- OBLIGATOIRE : `computed()` pour les propriétés dérivées (DOIVENT être `readonly`)
- OBLIGATOIRE : Imports explicites dans le décorateur `@Component`

**Rationale** : Les signals offrent une réactivité fine-grained et améliorent les performances. Les standalone components simplifient l'architecture et le tree-shaking.

**Validation CI** : Lint rules DOIVENT détecter l'usage de patterns dépréciés.

---

### IV. Système de Tokens

Tous les styles DOIVENT utiliser le système de tokens CSS custom properties. Chaque composant DOIT supporter les 3 thèmes.

**Exigences non-négociables** :
- INTERDIT : Couleurs en dur (`#6366f1`) → Utiliser `var(--color-primary)`
- INTERDIT : Variables SCSS locales pour les couleurs/espacements → Utiliser les tokens
- OBLIGATOIRE : Définir les tokens dans `_light.scss`, `_dark.scss` ET `_custom.scss`
- OBLIGATOIRE : Utiliser les CSS custom properties existantes avant d'en créer de nouvelles

**Rationale** : Le système de tokens garantit la cohérence visuelle et permet le theming dynamique sans recompilation.

**Validation CI** : `npm run validate:tokens` DOIT passer sans erreur.

---

### V. Conventions de Nommage

Le nommage DOIT suivre les patterns établis sans exception.

**Patterns obligatoires** :

| Élément | Pattern | Exemple |
|---------|---------|---------|
| Composant DS | `Ds[Nom]` | `DsButton`, `DsModal` |
| Primitive | `Primitive[Nom]` | `PrimitiveButton` |
| Sélecteur DS | `ds-[nom]` | `ds-button` |
| Sélecteur primitive | `primitive-[nom]` | `primitive-button` |
| Service | `Ds[Nom]Service` | `DsToastService` |
| Types | `[Nom]Variant`, `[Nom]Size` | `ButtonVariant` |
| Fichiers | kebab-case | `ds-button.ts` |

**Rationale** : Des conventions de nommage strictes facilitent la découverte, la maintenance et l'onboarding.

**Validation CI** : Les PR DOIVENT respecter les conventions. Violation = merge bloqué.

---

### VI. Code Review Obligatoire

Tout code DOIT passer une review avant merge. L'agent pre-commit-review DOIT être exécuté.

**Critères CRITIQUES (bloquants)** :
- Code mort (fonctions jamais appelées)
- Duplication (code similaire existant)
- Fichiers orphelins (créés mais jamais importés)
- Console.log oubliés
- Secrets hardcodés (apiKey, password, token)
- Code commenté (> 3 lignes)

**Critères WARNING** :
- TODO/FIXME (comptabilisés, non bloquants)

**Rationale** : La review automatisée détecte les problèmes courants avant qu'ils n'atteignent la codebase principale.

**Validation CI** : Pre-commit hooks DOIVENT bloquer sur critères CRITIQUES.

---

### VII. Primitives-First

Les composants DS DOIVENT être construits sur les primitives existantes. Pas de création de composant DS sans vérification des primitives.

**Hiérarchie obligatoire** :

```
Primitives (UI pure, sans logique métier)
    ↓ composent
Composants DS (features, ControlValueAccessor)
    ↓ documentés dans
Showcase (démos interactives)
```

**Exigences non-négociables** :
- INTERDIT : Logique métier dans les primitives
- OBLIGATOIRE : Vérifier `COMPONENT_REGISTRY.md` avant création
- OBLIGATOIRE : Si un composant DS similaire existe, l'étendre plutôt qu'en créer un nouveau

**Rationale** : La hiérarchie primitive → DS → showcase garantit la réutilisabilité et évite la duplication.

**Validation** : Review manuelle obligatoire pour tout nouveau composant.

---

## Angular Conventions

### Patterns obligatoires

```typescript
// ✅ DO: Standalone + signals + imports explicites
@Component({
  selector: 'ds-example',
  imports: [CommonModule, FaIconComponent],
  templateUrl: './ds-example.html',
  styleUrl: './ds-example.scss',
})
export class DsExample {
  variant = input<ExampleVariant>('primary');
  disabled = input<boolean>(false);
  readonly isDisabled = computed(() => this.disabled() || this.loading());
  clicked = output<void>();
}
```

### Anti-patterns interdits

- `@Input()` / `@Output()` → `input()` / `output()`
- `protected computed` → `readonly computed` (évite TS2445)
- NgModule → Standalone
- `EventEmitter` → `output()`

---

## Quality Gates

### Seuils CI (bloquants)

| Métrique | Seuil | Commande |
|----------|-------|----------|
| Couverture | ≥80% | `npm run test:coverage` |
| Bundle size | ≤5 MB | `npm run analyze:bundle` |
| Accessibilité | 0 erreur | `npm run test:a11y` |
| Tokens | Cohérent | `npm run validate:tokens` |
| Tests | 0 échec | `npm run test:headless` |

### Workflow

1. `npm run build:lib` OBLIGATOIRE avant `npm run showcase`
2. Tests headless OBLIGATOIRES avant commit
3. Pre-commit review OBLIGATOIRE (agent automatique)

---

## Governance

### Amendements

1. Toute modification de cette constitution DOIT être documentée
2. Les changements DOIVENT être approuvés par review
3. Un plan de migration DOIT accompagner les breaking changes
4. Le versioning suit SemVer :
   - MAJOR : Suppression/redéfinition de principe
   - MINOR : Ajout de principe ou expansion matérielle
   - PATCH : Clarifications, corrections de typos

### Conformité

- Toutes les PR DOIVENT vérifier la conformité aux principes
- La complexité DOIT être justifiée (tableau Complexity Tracking dans plan.md)
- Le fichier CLAUDE.md sert de guide de développement runtime

### Hiérarchie des documents

```
Constitution (ce fichier) - Principes non-négociables
    ↓ implémentés par
CLAUDE.md - Guide de développement runtime
    ↓ appliqués via
Templates .specify/ - Workflows de feature
```

**Version**: 1.0.0 | **Ratified**: 2026-01-06 | **Last Amended**: 2026-01-06
