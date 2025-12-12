# Pattern Integration Stories

Ce guide documente le pattern utilisé dans `Integration.stories.ts` pour créer des stories Storybook complexes démontrant l'utilisation combinée de plusieurs composants.

---

## Vue d'ensemble

Le fichier `Integration.stories.ts` contient des **stories d'intégration** qui démontrent l'utilisation de plusieurs composants du Design System dans des scénarios réels :

- **ContactForm** : Formulaire réactif complet avec validation
- **Dashboard** : Layout grid avec cards et badges statistiques
- **ThemeSwitcher** : Changement de thème dynamique

Ces stories servent de **référence d'implémentation** pour les développeurs intégrant le Design System dans leurs projets.

---

## Architecture du pattern

### 1. Métadonnées de la story

```typescript
const meta: Meta = {
  title: 'Patterns/Integration',  // Catégorie dans Storybook
  tags: ['autodocs'],              // Génération automatique de docs
  decorators: [
    applicationConfig({
      providers: [provideAnimations()], // Providers Angular nécessaires
    }),
  ],
};

export default meta;
```

**Points clés** :
- `title` positionne les stories dans la sidebar Storybook
- `tags: ['autodocs']` active la documentation automatique
- `applicationConfig` permet d'injecter des providers Angular (animations, services)

### 2. Composant standalone encapsulé

Chaque story utilise un **composant Angular standalone** dédié :

```typescript
@Component({
  selector: 'story-contact-form',  // Préfixe 'story-' pour éviter conflits
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DsButton,
    DsInputField,
    // ... autres composants DS
  ],
  template: `<!-- Template inline -->`,
  styles: [`/* Styles inline */`],
})
export class StoryContactFormComponent {
  // Logique du composant
}
```

**Avantages** :
- **Isolation** : Pas de dépendances externes, tout est auto-suffisant
- **Standalone** : Compatible Angular 20+ (pas de module requis)
- **Inline template/styles** : Tout dans un fichier pour faciliter la lecture

### 3. Export de la story

```typescript
type Story = StoryObj<StoryContactFormComponent>;

export const ContactForm: Story = {
  render: () => ({
    props: {},
  }),
};
```

**Pattern minimal** : Storybook instancie automatiquement le composant via `render()`.

---

## Story 1 : ContactForm (Formulaire réactif)

### Fonctionnalités démontrées

1. **Reactive Forms Angular**
   - `FormBuilder` avec `Validators`
   - Validation email, message requis, longueur max
   - Erreurs affichées conditionnellement via signals

2. **Signals Angular**
   - `emailError = computed(() => ...)` : Erreur email calculée
   - `messageError = computed(() => ...)` : Erreur message calculée
   - `isSubmitting = signal(false)` : État de soumission

3. **Composition de composants DS**
   - `DsCard` : Container du formulaire
   - `DsInputField` : Champ email avec validation
   - `DsInputTextarea` : Zone de texte avec `maxLength`
   - `DsRadioGroup` : Type de demande
   - `DsCheckbox` : Acceptation des conditions
   - `DsToggle` : Newsletter
   - `DsButton` : Soumission
   - `DsToastService` : Feedback utilisateur

### Extrait de code

```typescript
export class StoryContactFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly toastService = inject(DsToastService);

  readonly contactForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.maxLength(500)]],
    requestType: ['support'],
    acceptTerms: [false, Validators.requiredTrue],
    newsletter: [false],
  });

  readonly emailError = computed(() => {
    const control = this.contactForm.get('email');
    if (!control?.touched) return null;
    if (control.hasError('required')) return 'Email requis';
    if (control.hasError('email')) return 'Email invalide';
    return null;
  });

  submitForm(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.toastService.show({
        message: 'Veuillez corriger les erreurs',
        type: 'error',
      });
      return;
    }

    this.toastService.show({
      message: 'Message envoyé avec succès !',
      type: 'success',
    });
    this.contactForm.reset();
  }
}
```

### Bonnes pratiques illustrées

✅ **Validation réactive** : Les erreurs s'affichent après `touched` uniquement
✅ **Signals pour UI** : `computed()` recalcule automatiquement les erreurs
✅ **Toast feedback** : Success/error explicites pour l'utilisateur
✅ **Reset après submit** : `contactForm.reset()` pour réinitialiser

---

## Story 2 : Dashboard (Grid layout)

### Fonctionnalités démontrées

1. **Layout CSS Grid**
   - 3 colonnes responsives (`repeat(auto-fit, minmax(300px, 1fr))`)
   - Gap uniforme avec token `--space-6`

2. **Composition de composants DS**
   - `DsBreadcrumb` : Navigation fil d'Ariane
   - `DsCard` : Cards statistiques
   - `DsBadge` : Indicateurs de valeur

3. **Signals pour données**
   - `stats = signal([...])` : Données statistiques
   - Boucle `@for` pour générer les cards

### Extrait de code

```typescript
export class StoryDashboardComponent {
  readonly breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Accueil', url: '/' },
    { label: 'Tableau de bord', url: '/dashboard' },
  ];

  readonly stats = signal([
    { label: 'Vues', value: '12,543', color: 'primary', change: '+12%' },
    { label: 'Ventes', value: '€3,245', color: 'success', change: '+8%' },
    { label: 'Paniers', value: '89', color: 'warning', change: '-3%' },
  ]);
}
```

**Template** :
```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--space-6);">
  @for (stat of stats(); track stat.label) {
    <ds-card variant="elevated" size="sm">
      <div header>{{ stat.label }}</div>
      <div body>
        <div style="font-size: var(--font-size-xxl);">{{ stat.value }}</div>
        <ds-badge [color]="stat.color">{{ stat.change }}</ds-badge>
      </div>
    </ds-card>
  }
</div>
```

### Bonnes pratiques illustrées

✅ **Grid responsive** : S'adapte automatiquement à la largeur écran
✅ **Design tokens** : `--space-6`, `--font-size-xxl` pour cohérence
✅ **@for loop** : Syntaxe Angular 20+ avec `track`

---

## Story 3 : ThemeSwitcher (Thème dynamique)

### Fonctionnalités démontrées

1. **Changement de thème en runtime**
   - Manipulation du `document.documentElement.className`
   - `effect()` pour réagir aux changements de thème

2. **Signals pour état**
   - `currentTheme = signal('theme-light')`
   - `availableThemes` : Liste des thèmes disponibles

3. **Composition de composants DS**
   - `DsDropdown` : Sélecteur de thème
   - `DsCard` : Preview du thème actif
   - `DsAlert` : Message de confirmation

### Extrait de code

```typescript
export class StoryThemeSwitcherComponent {
  readonly currentTheme = signal<'theme-light' | 'theme-dark' | 'theme-custom'>('theme-light');

  readonly availableThemes: DropdownItem[] = [
    { label: 'Light', value: 'theme-light', icon: 'sun' },
    { label: 'Dark', value: 'theme-dark', icon: 'moon' },
    { label: 'Custom', value: 'theme-custom', icon: 'palette' },
  ];

  constructor() {
    effect(() => {
      document.documentElement.className = this.currentTheme();
    });
  }

  switchTheme(theme: string): void {
    this.currentTheme.set(theme as any);
  }
}
```

**Template** :
```html
<ds-dropdown
  [items]="availableThemes"
  (itemSelected)="switchTheme($event.value)">
  Thème : {{ currentTheme() }}
</ds-dropdown>

<ds-card>
  <div body>
    <p>Couleur primaire : <span style="color: var(--color-primary)">Exemple</span></p>
    <p>Background : <span style="background: var(--background-main)">Exemple</span></p>
  </div>
</ds-card>
```

### Bonnes pratiques illustrées

✅ **Effect réactif** : Le thème se met à jour automatiquement avec le signal
✅ **Prévisualisation tokens** : `var(--color-primary)` affiche le thème actif
✅ **UX claire** : Dropdown avec icônes pour sélection visuelle

---

## Checklist pour créer une nouvelle Integration Story

Utilisez cette checklist pour créer votre propre story d'intégration :

### 1. Structure du composant

- [ ] Créer un composant standalone avec préfixe `story-`
- [ ] Importer `CommonModule` et `ReactiveFormsModule` si nécessaire
- [ ] Importer tous les composants DS utilisés
- [ ] Template et styles inline pour lisibilité

### 2. Logique métier

- [ ] Utiliser `inject()` pour injecter les services
- [ ] Utiliser `signal()` pour état réactif
- [ ] Utiliser `computed()` pour valeurs dérivées
- [ ] Utiliser `effect()` pour effets de bord

### 3. Formulaires (si applicable)

- [ ] `FormBuilder` avec `Validators`
- [ ] Computed signals pour erreurs
- [ ] `markAllAsTouched()` avant validation
- [ ] Toast feedback pour succès/erreur

### 4. Export de la story

- [ ] Type `Story = StoryObj<YourComponent>`
- [ ] Export const avec render function
- [ ] Documentation JSDoc si complexe

### 5. Tests recommandés

- [ ] Tester la story dans Storybook
- [ ] Vérifier tous les thèmes (Light/Dark/Custom)
- [ ] Tester la validation formulaire
- [ ] Vérifier accessibilité clavier

---

## Ressources complémentaires

- **Integration.stories.ts** : Code source complet (468 lignes)
- **Patterns.mdx** : Patterns de composition des composants
- **Theming.mdx** : Configuration des thèmes
- **Accessibility.mdx** : Bonnes pratiques WCAG 2.1 AA

---

## Exemples d'utilisation dans un projet

### Intégrer ContactForm dans une application

```typescript
// src/app/contact/contact.component.ts
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DsInputField, DsButton, DsCard } from '@kksdev/ds-angular';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, DsInputField, DsButton, DsCard],
  template: `
    <!-- Copier le template de StoryContactFormComponent -->
  `,
})
export class ContactComponent {
  // Copier la logique de StoryContactFormComponent
}
```

### Réutiliser le pattern Dashboard

```typescript
// src/app/dashboard/dashboard.component.ts
import { Component, signal } from '@angular/core';
import { DsCard, DsBadge, DsBreadcrumb } from '@kksdev/ds-angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DsCard, DsBadge, DsBreadcrumb],
  template: `
    <!-- Copier le template de StoryDashboardComponent -->
  `,
})
export class DashboardComponent {
  // Adapter les données à votre contexte métier
  readonly stats = signal([
    // Vos propres statistiques
  ]);
}
```

---

## Conclusion

Le pattern **Integration Stories** permet de :

1. **Documenter des cas d'usage réels** : Pas juste des composants isolés
2. **Fournir des exemples copiables** : Code prêt à l'emploi
3. **Démontrer les bonnes pratiques** : Signals, Reactive Forms, Services
4. **Faciliter l'adoption** : Développeurs voient immédiatement comment utiliser le DS

**Prochaines étapes** :
- Créer des stories pour vos propres patterns métier
- Ajouter des tests Playwright pour vos stories
- Documenter les patterns spécifiques à votre domaine
