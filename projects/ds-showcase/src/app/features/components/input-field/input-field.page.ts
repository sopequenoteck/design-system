import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DsInputField, DsButton } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { ComponentPageHeader } from '../../../shared/page/component-page-header';
import { DocIcon } from '../../../shared/icon/doc-icon';
import { DsInputFieldDefinition } from '../../../registry/definitions/ds-input-field.definition';
import { ControlValues } from '../../../registry/types';

import { UsedInSection } from '../../../shared/used-in/used-in-section';
type InputSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-input-field-page',
  standalone: true,
  imports: [FormsModule, DsInputField, DsButton, DemoContainer, PropsTable, ComponentPageHeader, DocIcon, UsedInSection],
  template: `
    <div class="component-page">
      <doc-component-page-header
        category="forms"
        [name]="definition.name"
        [description]="definition.description"
        [selector]="definition.selector"
        version="1.7.0"
        status="stable"
        sourceLink="https://github.com/anthropics/design-system/tree/main/projects/ds-angular/src/lib/components/ds-input-field"
      />

      <!-- Section 1: Playground -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="eye" size="sm" />
            Playground
          </h2>
          <p class="section-desc">Explorez les différentes options du composant de manière interactive.</p>
        </div>

        <doc-demo-container
          [sources]="definition.demos[0].sources ?? []"
          [code]="definition.demos[0].code"
          [controls]="definition.demos[0].controls"
          [initialValues]="defaultValues()"
          (controlChange)="onDefaultChange($event)"
        >
          <ds-input-field
            [label]="demoLabel()"
            [placeholder]="demoPlaceholder()"
            [size]="demoSize()"
            [disabled]="demoDisabled()"
            [required]="demoRequired()"
          />
        </doc-demo-container>
      </section>

      <!-- Section 2: Tailles -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Tailles</h2>
          <p class="section-desc">Trois tailles disponibles pour s'adapter à différents contextes.</p>
        </div>

        <doc-demo-container [code]="definition.demos[1].code">
          <div class="demo-column">
            <ds-input-field label="Small" size="sm" placeholder="Placeholder" />
            <ds-input-field label="Medium" size="md" placeholder="Placeholder" />
            <ds-input-field label="Large" size="lg" placeholder="Placeholder" />
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 3: États -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">États</h2>
          <p class="section-desc">Différents états visuels : disabled, readonly, error.</p>
        </div>

        <doc-demo-container [code]="definition.demos[2].code">
          <div class="demo-column">
            <ds-input-field label="Disabled" [disabled]="true" placeholder="Non modifiable" />
            <ds-input-field label="Readonly" [readonly]="true" value="Valeur fixe" />
            <ds-input-field label="Error" error="Ce champ est invalide" />
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 4: Avec aide -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Avec aide</h2>
          <p class="section-desc">Message d'aide pour guider l'utilisateur.</p>
        </div>

        <doc-demo-container [code]="definition.demos[3].code">
          <ds-input-field
            label="Mot de passe"
            type="password"
            hint="Minimum 8 caractères"
          />
        </doc-demo-container>
      </section>

      <!-- Section 5: Use Cases -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="zap" size="sm" />
            Use Cases
          </h2>
          <p class="section-desc">Scénarios d'utilisation concrets dans une application.</p>
        </div>

        <!-- Use Case 1: Login Form -->
        <div class="use-case">
          <h3 class="use-case__title">Formulaire de connexion</h3>
          <p class="use-case__desc">Champs email et mot de passe avec validation.</p>
          <doc-demo-container [code]="loginFormCode">
            <div class="demo-column">
              <ds-input-field
                label="Email"
                type="email"
                placeholder="nom@exemple.com"
                [required]="true"
              />
              <ds-input-field
                label="Mot de passe"
                type="password"
                placeholder="Entrez votre mot de passe"
                [required]="true"
                hint="8 caractères minimum"
              />
              <ds-button variant="primary" class="w-full">Se connecter</ds-button>
            </div>
          </doc-demo-container>
        </div>

        <!-- Use Case 2: Search -->
        <div class="use-case">
          <h3 class="use-case__title">Recherche temps réel</h3>
          <p class="use-case__desc">Champ de recherche avec feedback instantané.</p>
          <doc-demo-container [code]="searchCode">
            <div class="demo-row">
              <ds-input-field
                label="Rechercher un produit"
                placeholder="Ex: iPhone, MacBook..."
                [(ngModel)]="searchValue"
              />
            </div>
            @if (searchValue()) {
              <p class="search-feedback">Recherche : "{{ searchValue() }}"</p>
            }
          </doc-demo-container>
        </div>

        <!-- Use Case 3: Validation inline -->
        <div class="use-case">
          <h3 class="use-case__title">Validation inline</h3>
          <p class="use-case__desc">Validation en temps réel avec messages d'erreur.</p>
          <doc-demo-container [code]="validationCode">
            <div class="demo-column">
              <ds-input-field
                label="Nom d'utilisateur"
                placeholder="3-20 caractères"
                [(ngModel)]="username"
                [error]="usernameError()"
              />
              <ds-input-field
                label="Email"
                type="email"
                placeholder="nom@exemple.com"
                [(ngModel)]="email"
                [error]="emailError()"
              />
            </div>
          </doc-demo-container>
        </div>
      </section>

      <!-- Section 6: Composition -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="grid" size="sm" />
            Composition
          </h2>
          <p class="section-desc">Combinaisons avec d'autres composants du Design System.</p>
        </div>

        <!-- Composition 1: Form complet -->
        <div class="use-case">
          <h3 class="use-case__title">Formulaire de contact</h3>
          <p class="use-case__desc">Input combiné avec label, hint, error et bouton.</p>
          <doc-demo-container [code]="formCode">
            <div class="composition-form">
              <ds-input-field
                label="Nom complet"
                placeholder="Jean Dupont"
                [required]="true"
              />
              <ds-input-field
                label="Email"
                type="email"
                placeholder="jean@exemple.com"
                [required]="true"
                hint="Nous ne partagerons jamais votre email"
              />
              <ds-input-field
                label="Sujet"
                placeholder="Objet de votre message"
              />
              <div class="form-actions">
                <ds-button variant="ghost">Annuler</ds-button>
                <ds-button variant="primary">Envoyer</ds-button>
              </div>
            </div>
          </doc-demo-container>
        </div>

        <!-- Composition 2: Search avec bouton -->
        <div class="use-case">
          <h3 class="use-case__title">Recherche avec action</h3>
          <p class="use-case__desc">Input associé à un bouton de recherche.</p>
          <doc-demo-container [code]="searchButtonCode">
            <div class="search-group">
              <ds-input-field
                placeholder="Rechercher..."
                size="md"
              />
              <ds-button variant="primary">Rechercher</ds-button>
            </div>
          </doc-demo-container>
        </div>
      </section>

      <!-- Section 7: API Reference -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">
            <doc-icon name="code" size="sm" />
            API Reference
          </h2>
          <p class="section-desc">Documentation complète des propriétés et événements.</p>
        </div>

        <doc-props-table [props]="definition.props" />
      </section>

      <!-- Utilisé dans -->
      <doc-used-in-section [componentId]="definition.id" />
    </div>
  `,
  styles: [`
    .component-page {
      max-width: 900px;
    }

    .page-section {
      margin-bottom: var(--doc-space-2xl, 48px);
      animation: doc-fade-in-up 300ms ease-out;
      animation-fill-mode: both;

      &:nth-child(2) { animation-delay: 50ms; }
      &:nth-child(3) { animation-delay: 100ms; }
      &:nth-child(4) { animation-delay: 150ms; }
      &:nth-child(5) { animation-delay: 200ms; }
      &:nth-child(6) { animation-delay: 250ms; }
      &:nth-child(7) { animation-delay: 300ms; }
      &:nth-child(8) { animation-delay: 350ms; }
    }

    .section-header {
      margin-bottom: var(--doc-space-lg, 24px);
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
      margin: 0 0 var(--doc-space-sm, 8px) 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--doc-text-primary, #0f172a);
    }

    .section-desc {
      margin: 0;
      font-size: 0.9375rem;
      color: var(--doc-text-secondary, #475569);
      line-height: 1.6;
    }

    .demo-column {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-md, 16px);
      max-width: 320px;
    }

    .demo-row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--doc-space-md, 16px);
      align-items: flex-end;
    }

    /* Use Cases */
    .use-case {
      margin-bottom: var(--doc-space-xl, 32px);

      &:last-child {
        margin-bottom: 0;
      }
    }

    .use-case__title {
      margin: 0 0 var(--doc-space-xs, 4px) 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--doc-text-primary, #0f172a);
    }

    .use-case__desc {
      margin: 0 0 var(--doc-space-md, 16px) 0;
      font-size: 0.875rem;
      color: var(--doc-text-secondary, #64748b);
    }

    /* Composition styles */
    .composition-form {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-md, 16px);
      max-width: 400px;
    }

    .form-actions {
      display: flex;
      gap: var(--doc-space-sm, 8px);
      justify-content: flex-end;
      margin-top: var(--doc-space-sm, 8px);
    }

    .search-group {
      display: flex;
      gap: var(--doc-space-sm, 8px);
      align-items: flex-end;
      max-width: 400px;

      ds-input-field {
        flex: 1;
      }
    }

    .search-feedback {
      margin: var(--doc-space-md, 16px) 0 0 0;
      padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #f8fafc);
      border-radius: var(--doc-radius-md, 8px);
      font-size: 0.875rem;
      color: var(--doc-text-secondary, #64748b);
    }
  `]
})
export class InputFieldPage {
  definition = DsInputFieldDefinition;

  // Playground values
  defaultValues = signal<ControlValues>({
    label: 'Email',
    placeholder: 'Entrez votre email',
    size: 'md',
    disabled: false,
    required: false,
  });

  demoLabel = computed(() => this.defaultValues()['label'] as string);
  demoPlaceholder = computed(() => this.defaultValues()['placeholder'] as string);
  demoSize = computed(() => this.defaultValues()['size'] as InputSize);
  demoDisabled = computed(() => this.defaultValues()['disabled'] as boolean);
  demoRequired = computed(() => this.defaultValues()['required'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  // Use Case: Search
  searchValue = signal('');

  // Use Case: Validation
  username = signal('');
  email = signal('');

  usernameError = computed(() => {
    const value = this.username();
    if (!value) return '';
    if (value.length < 3) return 'Minimum 3 caractères';
    if (value.length > 20) return 'Maximum 20 caractères';
    if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Lettres, chiffres et _ uniquement';
    return '';
  });

  emailError = computed(() => {
    const value = this.email();
    if (!value) return '';
    if (!value.includes('@')) return 'Email invalide';
    return '';
  });

  // Code snippets
  loginFormCode = `<ds-input-field
  label="Email"
  type="email"
  placeholder="nom@exemple.com"
  [required]="true"
/>
<ds-input-field
  label="Mot de passe"
  type="password"
  placeholder="Entrez votre mot de passe"
  [required]="true"
  hint="8 caractères minimum"
/>
<ds-button variant="primary" class="w-full">Se connecter</ds-button>`;

  searchCode = `<ds-input-field
  label="Rechercher un produit"
  placeholder="Ex: iPhone, MacBook..."
  [(ngModel)]="searchValue"
/>`;

  validationCode = `// Composant
username = signal('');
email = signal('');

usernameError = computed(() => {
  const value = this.username();
  if (!value) return '';
  if (value.length < 3) return 'Minimum 3 caractères';
  return '';
});

// Template
<ds-input-field
  label="Nom d'utilisateur"
  [(ngModel)]="username"
  [error]="usernameError()"
/>`;

  formCode = `<ds-input-field
  label="Nom complet"
  placeholder="Jean Dupont"
  [required]="true"
/>
<ds-input-field
  label="Email"
  type="email"
  placeholder="jean@exemple.com"
  [required]="true"
  hint="Nous ne partagerons jamais votre email"
/>
<ds-input-field
  label="Sujet"
  placeholder="Objet de votre message"
/>
<div class="form-actions">
  <ds-button variant="ghost">Annuler</ds-button>
  <ds-button variant="primary">Envoyer</ds-button>
</div>`;

  searchButtonCode = `<div class="search-group">
  <ds-input-field placeholder="Rechercher..." size="md" />
  <ds-button variant="primary">Rechercher</ds-button>
</div>`;
}
