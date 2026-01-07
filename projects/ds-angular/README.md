# @kksdev/ds-angular

Angular 20 Design System - Bibliothèque de composants standalone avec signals.

## Features

- 55 composants UI (Button, Modal, Table, Form, etc.)
- 7 primitives (Button, Input, Checkbox, Radio, Textarea, Toggle, Badge)
- 3 thèmes (Light, Dark, Custom)
- Support i18n
- Accessible (WCAG 2.1 AA)
- Standalone components avec signals

## Installation

```bash
npm install @kksdev/ds-angular
```

## Peer Dependencies

```bash
npm install @angular/cdk @fortawesome/angular-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons
```

## Usage

```typescript
import { DsButton, DsModal, DsInputField } from '@kksdev/ds-angular';

@Component({
  imports: [DsButton, DsModal, DsInputField],
  template: `
    <ds-button variant="primary" (clicked)="onSave()">
      Enregistrer
    </ds-button>
  `
})
export class MyComponent {}
```

## Thèmes

Activez un thème en ajoutant la classe sur le document :

```typescript
document.documentElement.className = 'theme-light'; // ou 'theme-dark', 'theme-custom'
```

## Documentation

Documentation complète et démos interactives :

**https://ds-showcase.kkshome.online/**

## Composants disponibles

### Primitives
`PrimitiveButton` `PrimitiveInput` `PrimitiveCheckbox` `PrimitiveRadio` `PrimitiveTextarea` `PrimitiveToggle` `PrimitiveBadge`

### Composants
`DsButton` `DsModal` `DsTable` `DsInputField` `DsSelect` `DsCheckbox` `DsRadio` `DsTextarea` `DsToggle` `DsAlert` `DsToast` `DsBadge` `DsCard` `DsTabs` `DsAccordion` `DsDropdown` `DsTooltip` `DsPopover` `DsProgress` `DsSpinner` `DsSkeleton` `DsAvatar` `DsBreadcrumb` `DsPagination` `DsDatePicker` `DsTimePicker` `DsSlider` `DsRating` `DsFileUpload` `DsAutocomplete` ...et plus

## License

MIT
