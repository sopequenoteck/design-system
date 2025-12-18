import { Component } from '@angular/core';
import { DsDivider, DsCard, DsAlert } from 'ds-angular';

@Component({
  selector: 'app-forms-patterns-page',
  standalone: true,
  imports: [DsDivider, DsCard, DsAlert],
  template: `
    <div class="doc-page">
      <header class="doc-header">
        <span class="doc-badge">Patterns</span>
        <h1 class="doc-title">Forms Patterns</h1>
        <p class="doc-desc">
          Bonnes pratiques et patterns pour créer des formulaires accessibles et maintenables avec DS-Angular.
        </p>
      </header>

      <!-- Section: Formulaire basique -->
      <section class="doc-section">
        <h2>1. Formulaire basique (Template-driven)</h2>
        <p class="section-desc">
          Approche simple pour les formulaires légers avec ngModel.
        </p>

        <div class="code-block">
          <pre><code>{{ basicFormCode }}</code></pre>
        </div>

        <ds-alert type="info" [showIcon]="true">
          <strong>Quand utiliser ?</strong><br>
          Template-driven est idéal pour les formulaires simples (2-4 champs) sans validation complexe.
        </ds-alert>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Formulaire réactif -->
      <section class="doc-section">
        <h2>2. Formulaire réactif (Reactive Forms)</h2>
        <p class="section-desc">
          Approche recommandée pour les formulaires complexes avec validation avancée.
        </p>

        <div class="code-block">
          <pre><code>{{ reactiveFormCode }}</code></pre>
        </div>

        <ds-alert type="success" [showIcon]="true">
          <strong>Avantages Reactive Forms</strong><br>
          Validation synchrone/asynchrone, typage fort, testabilité, transformations.
        </ds-alert>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Validation synchrone -->
      <section class="doc-section">
        <h2>3. Validation synchrone</h2>
        <p class="section-desc">
          Validation instantanée avec les Validators Angular.
        </p>

        <div class="code-block">
          <pre><code>{{ syncValidationCode }}</code></pre>
        </div>

        <h3>Affichage des erreurs</h3>
        <div class="code-block">
          <pre><code>{{ errorDisplayCode }}</code></pre>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Validation asynchrone -->
      <section class="doc-section">
        <h2>4. Validation asynchrone</h2>
        <p class="section-desc">
          Pour les vérifications serveur (email unique, username disponible, etc.).
        </p>

        <div class="code-block">
          <pre><code>{{ asyncValidationCode }}</code></pre>
        </div>

        <ds-alert type="warning" [showIcon]="true">
          <strong>Performance</strong><br>
          Utilisez debounceTime pour éviter trop de requêtes serveur. 300-500ms est recommandé.
        </ds-alert>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Gestion des erreurs -->
      <section class="doc-section">
        <h2>5. Gestion centralisée des erreurs</h2>
        <p class="section-desc">
          Service pour gérer les messages d'erreur de manière cohérente.
        </p>

        <div class="code-block">
          <pre><code>{{ errorServiceCode }}</code></pre>
        </div>

        <h3>Utilisation dans le template</h3>
        <div class="code-block">
          <pre><code>{{ errorUsageCode }}</code></pre>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Groupes de champs -->
      <section class="doc-section">
        <h2>6. Groupes de champs (FormGroup imbriqués)</h2>
        <p class="section-desc">
          Organisez les formulaires complexes en sections logiques.
        </p>

        <div class="code-block">
          <pre><code>{{ formGroupCode }}</code></pre>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Formulaire multi-colonnes -->
      <section class="doc-section">
        <h2>7. Formulaire multi-colonnes</h2>
        <p class="section-desc">
          Layout responsive avec CSS Grid.
        </p>

        <div class="code-block">
          <pre><code>{{ multiColumnCode }}</code></pre>
        </div>

        <h3>Styles CSS</h3>
        <div class="code-block">
          <pre><code>{{ multiColumnStyles }}</code></pre>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Bonnes pratiques -->
      <section class="doc-section">
        <h2>Bonnes pratiques</h2>

        <div class="practices-grid">
          <ds-card variant="outlined">
            <h4>&#x2705; Labels explicites</h4>
            <p>Chaque champ doit avoir un label visible. Évitez les placeholders seuls.</p>
            <div class="code-inline">
              <code>&lt;ds-input-field label="Email" /&gt;</code>
            </div>
          </ds-card>

          <ds-card variant="outlined">
            <h4>&#x2705; Validation en temps réel</h4>
            <p>Affichez les erreurs dès que l'utilisateur quitte le champ (blur).</p>
            <div class="code-inline">
              <code>updateOn: 'blur'</code>
            </div>
          </ds-card>

          <ds-card variant="outlined">
            <h4>&#x2705; Messages d'erreur clairs</h4>
            <p>Expliquez comment corriger l'erreur, pas juste qu'elle existe.</p>
            <div class="code-inline">
              <code>"Le mot de passe doit contenir 8 caractères"</code>
            </div>
          </ds-card>

          <ds-card variant="outlined">
            <h4>&#x2705; Indicateurs requis</h4>
            <p>Marquez clairement les champs obligatoires.</p>
            <div class="code-inline">
              <code>&lt;ds-input-field [required]="true" /&gt;</code>
            </div>
          </ds-card>

          <ds-card variant="outlined">
            <h4>&#x274C; Évitez les resets</h4>
            <p>Ne videz pas le formulaire en cas d'erreur serveur.</p>
            <div class="code-inline">
              <code>Conservez les données saisies</code>
            </div>
          </ds-card>

          <ds-card variant="outlined">
            <h4>&#x274C; Pas de double submit</h4>
            <p>Désactivez le bouton pendant la soumission.</p>
            <div class="code-inline">
              <code>[loading]="isSubmitting"</code>
            </div>
          </ds-card>
        </div>
      </section>

      <ds-divider spacing="lg" />

      <!-- Section: Composants formulaire -->
      <section class="doc-section">
        <h2>Composants formulaire disponibles</h2>

        <div class="components-table">
          <table class="doc-table">
            <thead>
              <tr>
                <th>Composant</th>
                <th>Usage</th>
                <th>CVA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>ds-input-field</code></td>
                <td>Texte, email, password, tel, url</td>
                <td>&#x2705;</td>
              </tr>
              <tr>
                <td><code>ds-input-number</code></td>
                <td>Nombres avec stepper +/-</td>
                <td>&#x2705;</td>
              </tr>
              <tr>
                <td><code>ds-input-textarea</code></td>
                <td>Texte multi-lignes</td>
                <td>&#x2705;</td>
              </tr>
              <tr>
                <td><code>ds-search-input</code></td>
                <td>Recherche avec debounce</td>
                <td>&#x2705;</td>
              </tr>
              <tr>
                <td><code>ds-select</code></td>
                <td>Liste déroulante</td>
                <td>&#x2705;</td>
              </tr>
              <tr>
                <td><code>ds-combobox</code></td>
                <td>Autocomplete avec filtrage</td>
                <td>&#x2705;</td>
              </tr>
              <tr>
                <td><code>ds-checkbox</code></td>
                <td>Case à cocher</td>
                <td>&#x2705;</td>
              </tr>
              <tr>
                <td><code>ds-checkbox-list</code></td>
                <td>Liste de checkboxes groupées</td>
                <td>&#x2705;</td>
              </tr>
              <tr>
                <td><code>ds-radio-group</code></td>
                <td>Groupe d'options exclusives</td>
                <td>&#x2705;</td>
              </tr>
              <tr>
                <td><code>ds-toggle</code></td>
                <td>Switch on/off</td>
                <td>&#x2705;</td>
              </tr>
              <tr>
                <td><code>ds-segmented-control</code></td>
                <td>Boutons radio visuels</td>
                <td>&#x2705;</td>
              </tr>
              <tr>
                <td><code>ds-date-picker</code></td>
                <td>Sélecteur de date</td>
                <td>&#x2705;</td>
              </tr>
              <tr>
                <td><code>ds-time-picker</code></td>
                <td>Sélecteur d'heure</td>
                <td>&#x2705;</td>
              </tr>
              <tr>
                <td><code>ds-color-picker</code></td>
                <td>Sélecteur de couleur</td>
                <td>&#x2705;</td>
              </tr>
              <tr>
                <td><code>ds-file-upload</code></td>
                <td>Upload de fichiers</td>
                <td>&#x2705;</td>
              </tr>
              <tr>
                <td><code>ds-slider</code></td>
                <td>Curseur de valeur</td>
                <td>&#x2705;</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="table-note">
          <strong>CVA</strong> = ControlValueAccessor (compatible avec ngModel et formControlName)
        </p>
      </section>
    </div>
  `,
  styles: [`
    .doc-page {
      max-width: 900px;
    }

    .doc-header {
      margin-bottom: 48px;
    }

    .doc-badge {
      display: inline-block;
      padding: 4px 10px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: var(--color-primary-light, #eff6ff);
      color: var(--color-primary, #3b82f6);
      border-radius: 4px;
      margin-bottom: 12px;
    }

    .doc-title {
      margin: 0 0 12px 0;
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-default, #1a1a1a);
    }

    .doc-desc {
      margin: 0;
      font-size: 1.125rem;
      color: var(--text-muted, #6b7280);
      line-height: 1.6;
    }

    .doc-section {
      margin-bottom: 32px;

      h2 {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-default, #1a1a1a);
        margin: 0 0 8px 0;
      }

      h3 {
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-default, #374151);
        margin: 24px 0 12px 0;
      }
    }

    .section-desc {
      margin: 0 0 20px 0;
      font-size: 0.875rem;
      color: var(--text-muted, #6b7280);
    }

    // ==========================================================================
    // Code blocks
    // ==========================================================================
    .code-block {
      background: var(--gray-900, #111827);
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 16px;

      pre {
        margin: 0;
        padding: 16px;
        overflow-x: auto;
      }

      code {
        font-family: 'SF Mono', Monaco, monospace;
        font-size: 0.8125rem;
        line-height: 1.6;
        color: #e5e7eb;
        white-space: pre;
      }
    }

    .code-inline {
      margin-top: 12px;

      code {
        display: block;
        padding: 8px 12px;
        background: var(--gray-100, #f3f4f6);
        border-radius: 4px;
        font-size: 0.75rem;
        color: var(--text-default, #374151);
      }
    }

    // ==========================================================================
    // Practices grid
    // ==========================================================================
    .practices-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;

      h4 {
        margin: 0 0 8px 0;
        font-size: 0.9375rem;
      }

      p {
        margin: 0;
        font-size: 0.8125rem;
        color: var(--text-muted, #6b7280);
      }
    }

    // ==========================================================================
    // Components table
    // ==========================================================================
    .components-table {
      overflow-x: auto;
      margin-bottom: 12px;
    }

    .doc-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;

      th, td {
        padding: 12px 16px;
        text-align: left;
        border-bottom: 1px solid var(--border-default, #e5e7eb);
      }

      th {
        background: var(--background-secondary, #f3f4f6);
        font-weight: 600;
        color: var(--text-default, #374151);
      }

      td {
        color: var(--text-default, #4b5563);

        code {
          font-size: 0.8125rem;
          color: var(--color-primary, #3b82f6);
        }
      }
    }

    .table-note {
      font-size: 0.75rem;
      color: var(--text-muted, #6b7280);
    }
  `]
})
export class FormsPatternsPage {
  // Code examples
  basicFormCode = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DsInputField, DsButton } from '@kksdev/ds-angular';

@Component({
  standalone: true,
  imports: [FormsModule, DsInputField, DsButton],
  template: \`
    <form #form="ngForm" (ngSubmit)="onSubmit()">
      <ds-input-field
        label="Nom"
        [(ngModel)]="user.name"
        name="name"
        [required]="true"
      />

      <ds-input-field
        label="Email"
        type="email"
        [(ngModel)]="user.email"
        name="email"
        [required]="true"
      />

      <ds-button type="submit" [disabled]="form.invalid">
        Envoyer
      </ds-button>
    </form>
  \`
})
export class BasicFormComponent {
  user = { name: '', email: '' };

  onSubmit() {
    console.log('Form submitted:', this.user);
  }
}`;

  reactiveFormCode = `import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DsInputField, DsSelect, DsButton } from '@kksdev/ds-angular';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, DsInputField, DsSelect, DsButton],
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <ds-input-field
        label="Nom"
        formControlName="name"
        [required]="true"
      />

      <ds-input-field
        label="Email"
        type="email"
        formControlName="email"
        [required]="true"
      />

      <ds-select
        label="Pays"
        formControlName="country"
        [options]="countries"
        [required]="true"
      />

      <ds-button
        type="submit"
        variant="primary"
        [disabled]="form.invalid"
        [loading]="isSubmitting"
      >
        Enregistrer
      </ds-button>
    </form>
  \`
})
export class ReactiveFormComponent {
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    country: ['', Validators.required]
  });

  countries = [
    { value: 'fr', label: 'France' },
    { value: 'be', label: 'Belgique' },
    { value: 'ch', label: 'Suisse' }
  ];

  isSubmitting = false;

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitting = true;
      // API call...
    }
  }
}`;

  syncValidationCode = `import { Validators, AbstractControl } from '@angular/forms';

// Validators intégrés
form = this.fb.group({
  email: ['', [
    Validators.required,
    Validators.email
  ]],
  password: ['', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])/)
  ]],
  age: ['', [
    Validators.required,
    Validators.min(18),
    Validators.max(120)
  ]]
});

// Validator personnalisé
function passwordMatchValidator(control: AbstractControl) {
  const password = control.get('password');
  const confirm = control.get('confirmPassword');

  if (password?.value !== confirm?.value) {
    confirm?.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  }
  return null;
}`;

  errorDisplayCode = `<ds-input-field
  label="Email"
  formControlName="email"
  [error]="getError('email')"
/>

// Dans le composant
getError(field: string): string | null {
  const control = this.form.get(field);
  if (control?.errors && control.touched) {
    if (control.errors['required']) return 'Ce champ est requis';
    if (control.errors['email']) return 'Email invalide';
    if (control.errors['minlength']) {
      return \`Minimum \${control.errors['minlength'].requiredLength} caractères\`;
    }
  }
  return null;
}`;

  asyncValidationCode = `import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map, debounceTime, switchMap, first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UniqueEmailValidator {
  constructor(private http: HttpClient) {}

  validate(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(400),
        switchMap(email =>
          this.http.get<boolean>(\`/api/check-email?email=\${email}\`)
        ),
        map(exists => exists ? { emailTaken: true } : null),
        first()
      );
    };
  }
}

// Utilisation
form = this.fb.group({
  email: ['',
    [Validators.required, Validators.email],
    [this.emailValidator.validate()]
  ]
});`;

  errorServiceCode = `import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormErrorService {
  private messages: Record<string, (params?: any) => string> = {
    required: () => 'Ce champ est requis',
    email: () => 'Adresse email invalide',
    minlength: (p) => \`Minimum \${p.requiredLength} caractères\`,
    maxlength: (p) => \`Maximum \${p.requiredLength} caractères\`,
    min: (p) => \`Valeur minimum : \${p.min}\`,
    max: (p) => \`Valeur maximum : \${p.max}\`,
    pattern: () => 'Format invalide',
    emailTaken: () => 'Cet email est déjà utilisé',
    passwordMismatch: () => 'Les mots de passe ne correspondent pas'
  };

  getError(control: AbstractControl | null): string | null {
    if (!control?.errors || !control.touched) return null;

    const errorKey = Object.keys(control.errors)[0];
    const errorFn = this.messages[errorKey];

    return errorFn ? errorFn(control.errors[errorKey]) : 'Erreur de validation';
  }
}`;

  errorUsageCode = `@Component({
  template: \`
    <ds-input-field
      label="Email"
      formControlName="email"
      [error]="errorService.getError(form.get('email'))"
    />
  \`
})
export class MyFormComponent {
  constructor(public errorService: FormErrorService) {}
}`;

  formGroupCode = `form = this.fb.group({
  // Groupe principal
  personal: this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthDate: ['']
  }),

  // Groupe adresse
  address: this.fb.group({
    street: ['', Validators.required],
    city: ['', Validators.required],
    zipCode: ['', [Validators.required, Validators.pattern(/^\\d{5}$/)]],
    country: ['FR', Validators.required]
  }),

  // Groupe préférences
  preferences: this.fb.group({
    newsletter: [false],
    notifications: [true],
    theme: ['light']
  })
});

// Accès aux valeurs
const city = this.form.get('address.city')?.value;

// Template avec formGroupName
<form [formGroup]="form">
  <fieldset formGroupName="personal">
    <legend>Informations personnelles</legend>
    <ds-input-field label="Prénom" formControlName="firstName" />
    <ds-input-field label="Nom" formControlName="lastName" />
  </fieldset>

  <fieldset formGroupName="address">
    <legend>Adresse</legend>
    <ds-input-field label="Rue" formControlName="street" />
    <ds-input-field label="Ville" formControlName="city" />
  </fieldset>
</form>`;

  multiColumnCode = `<form [formGroup]="form" class="form-grid">
  <div class="form-row">
    <ds-input-field label="Prénom" formControlName="firstName" />
    <ds-input-field label="Nom" formControlName="lastName" />
  </div>

  <div class="form-row">
    <ds-input-field label="Email" formControlName="email" class="span-2" />
  </div>

  <div class="form-row form-row--3">
    <ds-input-field label="Ville" formControlName="city" />
    <ds-input-field label="Code postal" formControlName="zip" />
    <ds-select label="Pays" formControlName="country" [options]="countries" />
  </div>

  <div class="form-actions">
    <ds-button variant="outline">Annuler</ds-button>
    <ds-button variant="primary" type="submit">Enregistrer</ds-button>
  </div>
</form>`;

  multiColumnStyles = `.form-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);

  &--3 {
    grid-template-columns: repeat(3, 1fr);
  }

  .span-2 {
    grid-column: span 2;
  }
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  margin-top: var(--space-4);
}

/* Responsive */
@media (max-width: 768px) {
  .form-row,
  .form-row--3 {
    grid-template-columns: 1fr;
  }

  .span-2 {
    grid-column: span 1;
  }
}`;
}
