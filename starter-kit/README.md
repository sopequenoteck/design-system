# DS-Angular Starter Kit

Kit de démarrage pour créer une application Angular 20 avec le Design System ds-angular.

## Prérequis

- Node.js 20.x ou supérieur
- npm 10.x ou supérieur
- Angular CLI 20.x

## Installation rapide

```bash
# Cloner ou copier ce starter kit
cp -r starter-kit mon-projet
cd mon-projet

# Installer les dépendances
npm install

# Lancer l'application
ng serve
```

## Structure du projet

```
mon-projet/
├── src/
│   ├── app/
│   │   ├── app.component.ts      # Composant principal avec exemples
│   │   ├── app.component.html    # Template avec composants DS
│   │   └── app.config.ts         # Configuration standalone
│   ├── styles.scss               # Import des styles DS
│   └── index.html
├── angular.json                  # Configuration Angular
├── package.json                  # Dépendances pré-configurées
└── tsconfig.json                 # Configuration TypeScript
```

## Utilisation des composants

### Import des composants

```typescript
import { Component } from '@angular/core';
import { DsButton, DsModal, DsInput, DsToast } from 'ds-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DsButton, DsModal, DsInput],
  template: `
    <ds-button variant="primary" (click)="onClick()">
      Mon bouton
    </ds-button>
  `
})
export class AppComponent {
  onClick() {
    console.log('Cliqué!');
  }
}
```

### Styles et thèmes

Les styles sont importés dans `src/styles.scss` :

```scss
// Tokens et styles de base
@use 'ds-angular/styles';

// Thèmes disponibles
@use 'ds-angular/styles/themes/light';
@use 'ds-angular/styles/themes/dark';
```

Pour changer de thème :

```typescript
// Dans un service ou composant
document.documentElement.className = 'theme-dark'; // ou 'theme-light'
```

## Composants disponibles

### Formulaires
- `DsInputField` - Champ de saisie avec label et validation
- `DsInputTextarea` - Zone de texte multiligne
- `DsCheckbox` - Case à cocher
- `DsRadioGroup` - Groupe de boutons radio
- `DsToggle` - Interrupteur on/off
- `DsButton` - Bouton avec variantes

### Feedback
- `DsModal` - Fenêtre modale
- `DsToast` - Notifications toast
- `DsAlert` - Bannière d'alerte
- `DsTooltip` - Info-bulle
- `DsPopover` - Popover contextuel

### Navigation
- `DsTabs` - Onglets
- `DsBreadcrumb` - Fil d'Ariane
- `DsDropdown` - Menu déroulant

### Utilitaires
- `DsCard` - Carte conteneur
- `DsDivider` - Séparateur
- `DsBadge` - Badge/étiquette

## Scripts npm

```bash
npm start       # Lance le serveur de développement
npm run build   # Build de production
npm test        # Lance les tests
```

## Personnalisation

### Surcharger les tokens

Créez un fichier `_custom-tokens.scss` :

```scss
:root {
  --color-primary: #your-color;
  --btn-height-md: 44px;
}
```

### Créer un thème personnalisé

```scss
:root.theme-custom {
  --background-main: #your-bg;
  --text-default: #your-text;
  --color-primary: #your-primary;
}
```

## Ressources

- [Documentation Storybook](https://design-system.example.com)
- [GitHub Repository](https://github.com/assist-ai/design-system)
- [npm Package](https://www.npmjs.com/package/ds-angular)

## Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Consulter la documentation Storybook
