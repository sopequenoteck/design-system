# CLAUDE.md

Bibliothèque de design system Angular 20 (`@kksdev/ds-angular`) avec 55 composants DS et 7 primitives.

**Production** : https://ds-showcase.kkshome.online/

## Stack

- Angular 20 (standalone components, signals)
- TypeScript 5.8
- SCSS (tokens system)
- Karma/Jasmine (unit tests)
- Playwright (e2e + visual regression)
- ng-packagr (build library)
- FontAwesome (icons)
- Angular CDK (overlay, a11y)

---

## Architecture

```
projects/
├── ds-angular/src/lib/        # Bibliothèque publiée npm
│   ├── primitives/            # 7 composants atomiques
│   │   ├── primitive-button
│   │   ├── primitive-input
│   │   ├── primitive-checkbox
│   │   ├── primitive-radio
│   │   ├── primitive-textarea
│   │   ├── primitive-toggle
│   │   └── primitive-badge
│   ├── components/            # 55 composants DS
│   │   └── ds-*/              # ds-button, ds-modal, ds-table, etc.
│   ├── utils/                 # Utilitaires (overlay-positions, i18n, id-generator)
│   └── styles/                # Système de tokens
└── ds-showcase/               # App de documentation (port 4300)
    └── features/components/   # Démos des composants
```

### Hiérarchie des composants

```
Primitives (low-level, no logic)
    ↓ utilisés par
Composants DS (high-level, features, ControlValueAccessor)
    ↓ documentés dans
Showcase (démos interactives)
```

---

## Système de styles (3 couches)

```
styles/
├── tokens/
│   ├── _primitives.scss   # Variables SCSS brutes ($gray-700, $space-4)
│   ├── _semantic.scss     # Variables sémantiques ($btn-height-md)
│   └── _tokens.scss       # CSS custom properties (--color-primary)
└── themes/
    ├── _light.scss        # :root.theme-light
    ├── _dark.scss         # :root.theme-dark
    └── _custom.scss       # :root.theme-custom
```

**Règle** : Tout nouveau composant DOIT définir ses tokens dans `_light.scss`, `_dark.scss` ET `_custom.scss`.

Activation thème : `document.documentElement.className = 'theme-light'`

---

## Conventions de nommage

| Élément | Pattern | Exemple |
|---------|---------|---------|
| Composant DS | `Ds[Nom]` | `DsButton`, `DsModal` |
| Primitive | `Primitive[Nom]` | `PrimitiveButton` |
| Sélecteur DS | `ds-[nom]` | `ds-button`, `ds-modal` |
| Sélecteur primitive | `primitive-[nom]` | `primitive-button` |
| Service | `Ds[Nom]Service` | `DsToastService` |
| Types | `[Nom]Type`, `[Nom]Size` | `ButtonVariant`, `AlertSize` |
| Fichiers | kebab-case | `ds-button.ts`, `ds-button.scss` |
| Test | `*.spec.ts` (colocalisé) | `ds-button.spec.ts` |

---

## Conventions de code

### Composants Angular

```typescript
// ✅ DO: Standalone + signals + imports explicites
@Component({
  selector: 'ds-example',
  imports: [CommonModule, FaIconComponent],  // imports explicites
  templateUrl: './ds-example.html',
  styleUrl: './ds-example.scss',
})
export class DsExample {
  // Signals input
  variant = input<ExampleVariant>('primary');
  disabled = input<boolean>(false);

  // Computed properties (MUST be readonly, not protected)
  readonly isDisabled = computed(() => this.disabled() || this.loading());

  // Signals output
  clicked = output<void>();
}

// ❌ DON'T: @Input/@Output decorators
@Input() variant = 'primary';  // Deprecated
@Output() clicked = new EventEmitter();  // Use output() instead
```

### ControlValueAccessor (formulaires)

```typescript
@Component({
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DsInputField),
    multi: true,
  }],
})
export class DsInputField implements ControlValueAccessor {
  readonly internalValue = signal<string>('');
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this.internalValue.set(value ?? '');
  }
  // ...
}
```

### Services

```typescript
@Injectable({ providedIn: 'root' })
export class DsToastService {
  private readonly toastsSignal = signal<ToastInstance[]>([]);
  readonly toasts = this.toastsSignal.asReadonly();

  show(options: ToastOptions): string {
    // ...
  }
}
```

### Styles SCSS

```scss
// ✅ DO: Utiliser les CSS custom properties
.ds-button {
  height: var(--btn-height-md);
  background: var(--btn-primary-bg);
  border-radius: var(--btn-radius);
}

// ❌ DON'T: Variables SCSS en dur dans les composants
$my-color: #6366f1;  // Non, utiliser les tokens
```

---

## Conventions de tests

```typescript
describe('DsButton', () => {
  let fixture: ComponentFixture<DsButton>;
  let component: DsButton;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsButton],  // Standalone
    }).compileComponents();

    fixture = TestBed.createComponent(DsButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should apply variant input correctly', () => {
    // ✅ DO: Utiliser setInput pour les signals
    fixture.componentRef.setInput('variant', 'secondary');
    fixture.detectChanges();
    expect(component.variant()).toBe('secondary');
  });

  // ❌ DON'T: ng-reflect-* (signals non reflétés)
});
```

---

## Commandes

| Action | Commande |
|--------|----------|
| Build lib | `npm run build:lib` |
| Build lib (watch) | `npm run build:lib:watch` |
| Showcase | `npm run showcase` (port 4300) |
| Tests headless | `npm run test:headless` |
| Tests couverture | `npm run test:coverage` (seuil ≥80%) |
| Tests e2e | `npm run test:e2e` |
| Tests visuels | `npm run test:visual` |
| Valider tokens | `npm run validate:tokens` |
| Analyser bundle | `npm run analyze:bundle` (seuil 5 MB) |
| Publier (dry) | `npm run publish:lib:dry-run` |
| Publier | `npm run publish:lib` |
| Docker | `docker compose up -d --build` |

**Important** : `npm run build:lib` est REQUIS avant `npm run showcase` ou `npm run showcase:build`.

---

## Workflow création composant

### 1. Structure fichiers

```
components/
└── ds-example/
    ├── ds-example.ts          # Composant principal
    ├── ds-example.html        # Template
    ├── ds-example.scss        # Styles
    ├── ds-example.spec.ts     # Tests unitaires
    └── index.ts               # Export (optionnel)
```

### 2. Checklist

- [ ] Créer le dossier `ds-example/`
- [ ] Composant standalone avec `selector: 'ds-example'`
- [ ] Props avec `input()` signals
- [ ] Events avec `output()` signals
- [ ] `computed()` pour propriétés dérivées (MUST be `readonly`)
- [ ] Ajouter tokens dans `_light.scss`, `_dark.scss`, `_custom.scss`
- [ ] Exporter dans `components/index.ts`
- [ ] Créer tests unitaires
- [ ] Créer démo Showcase

### 3. Export

```typescript
// components/index.ts
export {
  DsExample,
  type ExampleVariant,
  type ExampleSize,
} from './ds-example/ds-example';
```

---

## CI/CD

- **CI** : Tests, build, couverture, bundle size sur push master
- **Docker** : Push auto vers `sopequenotech/ds-angular-showcase`
- **Seuils** : Couverture ≥80%, Bundle ≤5 MB

---

## Points d'attention

1. **Build lib avant showcase** : Le Showcase importe `ds-angular`, donc build lib d'abord

2. **Signals computed** : DOIVENT être `readonly` (pas `protected`) pour éviter TS2445

3. **Tokens thématiques** : Tout composant doit avoir ses tokens dans les 3 fichiers de thème

4. **Tests signals** : Utiliser `fixture.componentRef.setInput()` au lieu de `ng-reflect-*`

5. **CDK Overlay** : Pour composants flottants (modal, dropdown, tooltip, popover, toast)

---

## Anti-patterns à éviter

### Angular

- ❌ `@Input()/@Output()` decorators → ✅ `input()`/`output()` signals
- ❌ `protected computed` → ✅ `readonly computed` (TS2445)
- ❌ NgModule → ✅ Standalone components
- ❌ `ngOnInit` pour init simple → ✅ Signals avec valeur initiale
- ❌ `EventEmitter` → ✅ `output()` (sauf exceptions legacy)

### Styles

- ❌ Variables SCSS dans composants → ✅ CSS custom properties `var(--token)`
- ❌ Couleurs en dur `#6366f1` → ✅ Tokens `var(--color-primary)`
- ❌ Tokens uniquement dans light → ✅ Tokens dans light + dark + custom

### Structure

- ❌ Logique métier dans primitives → ✅ Primitives = UI pure
- ❌ Créer composant sans tests → ✅ Tests colocalisés
- ❌ Modifier sans build lib → ✅ `build:lib` avant test showcase

### Tests

- ❌ `component.variant = 'x'` → ✅ `fixture.componentRef.setInput('variant', 'x')`
- ❌ `ng-reflect-*` checks → ✅ `component.signal()` assertions
