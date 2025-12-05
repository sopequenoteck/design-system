# Demo App — Exemple d'intégration du Design System

Application de démonstration Angular 20 illustrant l'utilisation complète du design system `ds-angular`.

## Fonctionnalités démontrées

Cette application exemple montre :

- ✅ **Formulaires réactifs** avec validation (input, checkbox, radio, toggle, textarea)
- ✅ **Modal dynamique** avec gestion du focus trap
- ✅ **Notifications toast** avec différents types (success, error, info, warning)
- ✅ **Navigation par onglets** avec routing lazy-loaded
- ✅ **Thèmes dynamiques** (light, dark, custom) avec switch en temps réel
- ✅ **Composants utilitaires** (card, alert, divider, badge, breadcrumb)
- ✅ **Accessibilité complète** (navigation clavier, ARIA, focus management)

## Architecture

L'application utilise les patterns Angular 20 modernes :

- **Standalone components** : pas de NgModules
- **Signals** : gestion d'état réactive avec `signal()`, `computed()`, `effect()`
- **Reactive forms** : validation avec `FormBuilder`, `Validators`
- **Lazy loading** : routing avec `loadComponent()`
- **CDK Overlay** : pour les composants flottants (via ds-angular)

## Structure du code

```
demo-app/
├── src/
│   ├── app/
│   │   ├── components/          # Composants de l'application
│   │   │   ├── demo-form/       # Formulaire avec validation
│   │   │   ├── demo-tabs/       # Navigation par onglets
│   │   │   ├── demo-theme/      # Sélecteur de thème
│   │   │   └── demo-dashboard/  # Dashboard avec cards
│   │   ├── app.component.ts     # Composant racine
│   │   ├── app.config.ts        # Configuration app (providers)
│   │   └── app.routes.ts        # Routes avec lazy loading
│   ├── index.html               # Point d'entrée HTML
│   ├── main.ts                  # Bootstrap Angular
│   └── styles.scss              # Styles globaux (import DS)
└── README.md                    # Ce fichier
```

## Prérequis

- Node.js ≥ 18.x
- npm ≥ 9.x
- Angular CLI 20.x

## Installation

Depuis la racine du monorepo :

```bash
# 1. Build du design system
npm run build:lib

# 2. Installer les dépendances (si nécessaire)
npm install

# 3. Lancer l'application de démo
cd examples/demo-app
npm start
# ou depuis la racine: npm run demo
```

L'application démarre sur `http://localhost:4201`.

## Utilisation des composants

### Import des composants

```typescript
import {
  DsButton,
  DsInputField,
  DsModal,
  DsToastService,
  DsCard,
  DsAlert,
} from 'ds-angular';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [DsButton, DsInputField, DsCard, DsAlert],
})
export class DemoComponent {}
```

### Formulaire réactif

```typescript
import { FormBuilder, Validators } from '@angular/forms';

export class DemoFormComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    newsletter: [false],
  });

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
```

### Thèmes dynamiques

```typescript
import { signal, effect } from '@angular/core';

export class AppComponent {
  theme = signal<'light' | 'dark' | 'custom'>('light');

  constructor() {
    effect(() => {
      document.documentElement.className = `theme-${this.theme()}`;
    });
  }

  switchTheme(newTheme: 'light' | 'dark' | 'custom') {
    this.theme.set(newTheme);
  }
}
```

### Notifications toast

```typescript
import { DsToastService } from 'ds-angular';

export class DemoComponent {
  private toast = inject(DsToastService);

  showSuccess() {
    this.toast.show({
      type: 'success',
      message: 'Opération réussie !',
      duration: 3000,
    });
  }

  showError() {
    this.toast.show({
      type: 'error',
      message: 'Une erreur est survenue',
      duration: 5000,
    });
  }
}
```

### Modal avec formulaire

```typescript
import { DsModalService } from 'ds-angular';

export class DemoComponent {
  private modalService = inject(DsModalService);

  openModal() {
    const modalRef = this.modalService.open(MyFormModalComponent, {
      size: 'md',
      closeOnBackdrop: false,
    });

    modalRef.closed.subscribe(result => {
      if (result) {
        console.log('Modal fermée avec:', result);
      }
    });
  }
}
```

## Composants utilisés

Cette démo utilise **15+ composants** du design system :

- **Formulaires** : DsInputField, DsInputTextarea, DsCheckbox, DsRadioGroup, DsToggle, DsButton
- **Overlays** : DsModal, DsToast, DsTooltip, DsPopover, DsDropdown
- **Navigation** : DsTabs, DsBreadcrumb
- **Affichage** : DsCard, DsAlert, DsBadge, DsDivider

## Tests

```bash
# Tests unitaires
npm test

# Tests e2e (si configurés)
npm run e2e
```

## Ressources

- [Documentation complète](https://votre-storybook-url.com)
- [Guide de contribution](../../CLAUDE.md)
- [Migration guide](../../MIGRATION.md)
- [Changelog](../../CHANGELOG.md)

## Support

Pour toute question sur cet exemple :

- Ouvrir une issue : [GitHub Issues](https://github.com/votre-org/design-system/issues)
- Discussion : [GitHub Discussions](https://github.com/votre-org/design-system/discussions)
