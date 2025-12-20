import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DsSelect, DsButton, DsAvatar, DsBadge } from 'ds-angular';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { ComponentPageHeader } from '../../../shared/page/component-page-header';
import { DocIcon } from '../../../shared/icon/doc-icon';
import { DsSelectDefinition } from '../../../registry/definitions/ds-select.definition';
import { ControlValues } from '../../../registry/types';

type SelectSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-select-page',
  standalone: true,
  imports: [FormsModule, DsSelect, DsButton, DsAvatar, DsBadge, DemoContainer, PropsTable, ComponentPageHeader, DocIcon],
  template: `
    <div class="component-page">
      <doc-component-page-header
        category="forms"
        [name]="definition.name"
        [description]="definition.description"
        [selector]="definition.selector"
        version="1.7.0"
        status="stable"
        sourceLink="https://github.com/anthropics/design-system/tree/main/projects/ds-angular/src/lib/components/ds-select"
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
          [code]="definition.demos[0].code"
          [controls]="definition.demos[0].controls"
          [initialValues]="defaultValues()"
          (controlChange)="onDefaultChange($event)"
        >
          <ds-select
            label="Pays"
            placeholder="Sélectionner un pays"
            [options]="countryOptions"
            [size]="demoSize()"
            [searchable]="demoSearchable()"
            [clearable]="demoClearable()"
            [disabled]="demoDisabled()"
          />
        </doc-demo-container>
      </section>

      <!-- Section 2: Tailles -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Tailles</h2>
          <p class="section-desc">Trois tailles pour s'adapter à différents contextes.</p>
        </div>

        <doc-demo-container [code]="sizesCode">
          <div class="demo-row demo-row--align-end">
            <ds-select
              label="Small"
              [options]="countryOptions"
              size="sm"
              placeholder="Sélectionner"
            />
            <ds-select
              label="Medium"
              [options]="countryOptions"
              size="md"
              placeholder="Sélectionner"
            />
            <ds-select
              label="Large"
              [options]="countryOptions"
              size="lg"
              placeholder="Sélectionner"
            />
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 3: Searchable -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Recherche intégrée</h2>
          <p class="section-desc">Mode searchable pour filtrer les options rapidement.</p>
        </div>

        <doc-demo-container [code]="definition.demos[1].code">
          <div class="demo-column">
            <ds-select
              label="Rechercher un pays"
              [options]="allCountries"
              [searchable]="true"
              placeholder="Tapez pour rechercher..."
            />
          </div>
        </doc-demo-container>
      </section>

      <!-- Section 4: États -->
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">États</h2>
          <p class="section-desc">Différents états visuels : disabled, error, clearable.</p>
        </div>

        <doc-demo-container [code]="definition.demos[2].code">
          <div class="demo-column">
            <ds-select
              label="Disabled"
              [options]="countryOptions"
              [disabled]="true"
              placeholder="Non modifiable"
            />
            <ds-select
              label="Error"
              [options]="countryOptions"
              error="Veuillez sélectionner une option"
            />
            <ds-select
              label="Clearable"
              [options]="countryOptions"
              [clearable]="true"
              placeholder="Peut être effacé"
            />
          </div>
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

        <!-- Use Case 1: Choix pays/langue -->
        <div class="use-case">
          <h3 class="use-case__title">Sélection de langue</h3>
          <p class="use-case__desc">Préférences utilisateur avec drapeaux et codes.</p>
          <doc-demo-container [code]="languageCode">
            <div class="demo-column">
              <ds-select
                label="Langue de l'interface"
                [options]="languageOptions"
                [(ngModel)]="selectedLanguage"
                placeholder="Choisir une langue"
              />
              @if (selectedLanguage()) {
                <p class="selection-feedback">Langue sélectionnée : {{ selectedLanguage() }}</p>
              }
            </div>
          </doc-demo-container>
        </div>

        <!-- Use Case 2: Filtres table -->
        <div class="use-case">
          <h3 class="use-case__title">Filtres de données</h3>
          <p class="use-case__desc">Filtrage rapide dans un tableau ou une liste.</p>
          <doc-demo-container [code]="filterCode">
            <div class="filter-bar">
              <ds-select
                label="Statut"
                [options]="statusOptions"
                [(ngModel)]="statusFilter"
                [clearable]="true"
                size="sm"
                placeholder="Tous"
              />
              <ds-select
                label="Catégorie"
                [options]="categoryOptions"
                [(ngModel)]="categoryFilter"
                [clearable]="true"
                size="sm"
                placeholder="Toutes"
              />
              <ds-button variant="ghost" size="sm" (clicked)="clearFilters()">
                Réinitialiser
              </ds-button>
            </div>
            @if (statusFilter() || categoryFilter()) {
              <div class="active-filters">
                Filtres actifs :
                @if (statusFilter()) {
                  <ds-badge type="primary">{{ statusFilter() }}</ds-badge>
                }
                @if (categoryFilter()) {
                  <ds-badge type="info">{{ categoryFilter() }}</ds-badge>
                }
              </div>
            }
          </doc-demo-container>
        </div>

        <!-- Use Case 3: Formulaire adresse -->
        <div class="use-case">
          <h3 class="use-case__title">Formulaire d'adresse</h3>
          <p class="use-case__desc">Sélection hiérarchique pays → région.</p>
          <doc-demo-container [code]="addressCode">
            <div class="demo-column">
              <ds-select
                label="Pays"
                [options]="countryOptions"
                [(ngModel)]="selectedCountry"
                [searchable]="true"
                placeholder="Sélectionner un pays"
              />
              <ds-select
                label="Région"
                [options]="regionOptions()"
                [disabled]="!selectedCountry()"
                [searchable]="true"
                placeholder="Sélectionner une région"
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
          <h3 class="use-case__title">Formulaire d'inscription</h3>
          <p class="use-case__desc">Select intégré dans un formulaire complet.</p>
          <doc-demo-container [code]="formCode">
            <div class="composition-form">
              <ds-select
                label="Type de compte"
                [options]="accountTypes"
                [required]="true"
                placeholder="Choisir le type"
              />
              <ds-select
                label="Secteur d'activité"
                [options]="sectorOptions"
                [searchable]="true"
                placeholder="Sélectionner votre secteur"
              />
              <ds-select
                label="Comment nous avez-vous connu ?"
                [options]="referralOptions"
                [clearable]="true"
                placeholder="Optionnel"
              />
              <div class="form-actions">
                <ds-button variant="ghost">Annuler</ds-button>
                <ds-button variant="primary">Continuer</ds-button>
              </div>
            </div>
          </doc-demo-container>
        </div>

        <!-- Composition 2: User picker -->
        <div class="use-case">
          <h3 class="use-case__title">Sélection d'utilisateur</h3>
          <p class="use-case__desc">Select avec avatars pour assigner un responsable.</p>
          <doc-demo-container [code]="userPickerCode">
            <div class="user-picker">
              <label class="user-picker__label">Assigner à</label>
              <div class="user-picker__options">
                @for (user of teamMembers; track user.id) {
                  <button
                    class="user-option"
                    [class.user-option--selected]="selectedUser() === user.id"
                    (click)="selectUser(user.id)"
                  >
                    <ds-avatar [name]="user.name" size="sm" />
                    <span class="user-option__name">{{ user.name }}</span>
                    @if (selectedUser() === user.id) {
                      <doc-icon name="check" size="xs" />
                    }
                  </button>
                }
              </div>
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
    }

    .demo-row--align-end {
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

    .selection-feedback {
      margin: 0;
      padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
      background: var(--doc-surface-elevated, #f8fafc);
      border-radius: var(--doc-radius-md, 8px);
      font-size: 0.875rem;
      color: var(--doc-text-secondary, #64748b);
    }

    /* Filter bar */
    .filter-bar {
      display: flex;
      gap: var(--doc-space-md, 16px);
      align-items: flex-end;
      flex-wrap: wrap;
    }

    .active-filters {
      display: flex;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
      margin-top: var(--doc-space-md, 16px);
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

    /* User picker */
    .user-picker {
      max-width: 320px;
    }

    .user-picker__label {
      display: block;
      margin-bottom: var(--doc-space-sm, 8px);
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--doc-text-primary, #0f172a);
    }

    .user-picker__options {
      display: flex;
      flex-direction: column;
      gap: var(--doc-space-xs, 4px);
    }

    .user-option {
      display: flex;
      align-items: center;
      gap: var(--doc-space-sm, 8px);
      padding: var(--doc-space-sm, 8px) var(--doc-space-md, 12px);
      background: transparent;
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-md, 8px);
      cursor: pointer;
      transition: all 150ms ease;

      &:hover {
        background: var(--doc-surface-elevated, #f8fafc);
      }

      &--selected {
        background: var(--color-primary-light, #eff6ff);
        border-color: var(--color-primary, #3b82f6);
      }
    }

    .user-option__name {
      flex: 1;
      text-align: left;
      font-size: 0.875rem;
      color: var(--doc-text-primary, #0f172a);
    }
  `]
})
export class SelectPage {
  definition = DsSelectDefinition;

  // Options de base
  countryOptions = [
    { value: 'fr', label: 'France' },
    { value: 'be', label: 'Belgique' },
    { value: 'ch', label: 'Suisse' },
    { value: 'ca', label: 'Canada' },
  ];

  allCountries = [
    { value: 'fr', label: 'France' },
    { value: 'be', label: 'Belgique' },
    { value: 'ch', label: 'Suisse' },
    { value: 'ca', label: 'Canada' },
    { value: 'de', label: 'Allemagne' },
    { value: 'es', label: 'Espagne' },
    { value: 'it', label: 'Italie' },
    { value: 'uk', label: 'Royaume-Uni' },
    { value: 'us', label: 'États-Unis' },
    { value: 'jp', label: 'Japon' },
    { value: 'cn', label: 'Chine' },
    { value: 'br', label: 'Brésil' },
  ];

  languageOptions = [
    { value: 'fr', label: '🇫🇷 Français' },
    { value: 'en', label: '🇬🇧 English' },
    { value: 'de', label: '🇩🇪 Deutsch' },
    { value: 'es', label: '🇪🇸 Español' },
    { value: 'it', label: '🇮🇹 Italiano' },
  ];

  statusOptions = [
    { value: 'active', label: 'Actif' },
    { value: 'pending', label: 'En attente' },
    { value: 'archived', label: 'Archivé' },
  ];

  categoryOptions = [
    { value: 'tech', label: 'Technologie' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Ventes' },
  ];

  accountTypes = [
    { value: 'personal', label: 'Personnel' },
    { value: 'business', label: 'Entreprise' },
    { value: 'enterprise', label: 'Enterprise' },
  ];

  sectorOptions = [
    { value: 'tech', label: 'Technologies' },
    { value: 'finance', label: 'Finance' },
    { value: 'health', label: 'Santé' },
    { value: 'education', label: 'Éducation' },
    { value: 'retail', label: 'Commerce' },
    { value: 'other', label: 'Autre' },
  ];

  referralOptions = [
    { value: 'search', label: 'Moteur de recherche' },
    { value: 'social', label: 'Réseaux sociaux' },
    { value: 'friend', label: 'Recommandation' },
    { value: 'ad', label: 'Publicité' },
  ];

  teamMembers = [
    { id: '1', name: 'Marie Dupont' },
    { id: '2', name: 'Jean Martin' },
    { id: '3', name: 'Sophie Bernard' },
    { id: '4', name: 'Pierre Durand' },
  ];

  regionsByCountry: Record<string, { value: string; label: string }[]> = {
    fr: [
      { value: 'idf', label: 'Île-de-France' },
      { value: 'paca', label: 'Provence-Alpes-Côte d\'Azur' },
      { value: 'ara', label: 'Auvergne-Rhône-Alpes' },
    ],
    be: [
      { value: 'bru', label: 'Bruxelles' },
      { value: 'fla', label: 'Flandre' },
      { value: 'wal', label: 'Wallonie' },
    ],
    ch: [
      { value: 'ge', label: 'Genève' },
      { value: 'vd', label: 'Vaud' },
      { value: 'zh', label: 'Zurich' },
    ],
    ca: [
      { value: 'qc', label: 'Québec' },
      { value: 'on', label: 'Ontario' },
      { value: 'bc', label: 'Colombie-Britannique' },
    ],
  };

  // Playground state
  defaultValues = signal<ControlValues>({
    size: 'md',
    searchable: false,
    clearable: false,
    disabled: false,
  });

  demoSize = computed(() => this.defaultValues()['size'] as SelectSize);
  demoSearchable = computed(() => this.defaultValues()['searchable'] as boolean);
  demoClearable = computed(() => this.defaultValues()['clearable'] as boolean);
  demoDisabled = computed(() => this.defaultValues()['disabled'] as boolean);

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  // Use Case states
  selectedLanguage = signal('');
  statusFilter = signal('');
  categoryFilter = signal('');
  selectedCountry = signal('');
  selectedUser = signal('');

  regionOptions = computed(() => {
    const country = this.selectedCountry();
    return country ? this.regionsByCountry[country] || [] : [];
  });

  clearFilters(): void {
    this.statusFilter.set('');
    this.categoryFilter.set('');
  }

  selectUser(userId: string): void {
    this.selectedUser.set(this.selectedUser() === userId ? '' : userId);
  }

  // Code snippets
  sizesCode = `<ds-select label="Small" [options]="options" size="sm" />
<ds-select label="Medium" [options]="options" size="md" />
<ds-select label="Large" [options]="options" size="lg" />`;

  languageCode = `<ds-select
  label="Langue de l'interface"
  [options]="languageOptions"
  [(ngModel)]="selectedLanguage"
  placeholder="Choisir une langue"
/>

// Options avec emojis
languageOptions = [
  { value: 'fr', label: '🇫🇷 Français' },
  { value: 'en', label: '🇬🇧 English' },
  { value: 'de', label: '🇩🇪 Deutsch' },
];`;

  filterCode = `<div class="filter-bar">
  <ds-select
    label="Statut"
    [options]="statusOptions"
    [(ngModel)]="statusFilter"
    [clearable]="true"
    size="sm"
  />
  <ds-select
    label="Catégorie"
    [options]="categoryOptions"
    [(ngModel)]="categoryFilter"
    [clearable]="true"
    size="sm"
  />
  <ds-button variant="ghost" (clicked)="clearFilters()">
    Réinitialiser
  </ds-button>
</div>`;

  addressCode = `<!-- Sélection hiérarchique -->
<ds-select
  label="Pays"
  [options]="countryOptions"
  [(ngModel)]="selectedCountry"
  [searchable]="true"
/>
<ds-select
  label="Région"
  [options]="regionOptions()"
  [disabled]="!selectedCountry()"
  [searchable]="true"
/>

// Computed pour les régions
regionOptions = computed(() => {
  const country = this.selectedCountry();
  return this.regionsByCountry[country] || [];
});`;

  formCode = `<ds-select
  label="Type de compte"
  [options]="accountTypes"
  [required]="true"
/>
<ds-select
  label="Secteur d'activité"
  [options]="sectorOptions"
  [searchable]="true"
/>
<ds-select
  label="Comment nous avez-vous connu ?"
  [options]="referralOptions"
  [clearable]="true"
/>`;

  userPickerCode = `<!-- Custom user picker avec avatars -->
<div class="user-picker">
  <label>Assigner à</label>
  @for (user of teamMembers; track user.id) {
    <button
      [class.selected]="selectedUser() === user.id"
      (click)="selectUser(user.id)"
    >
      <ds-avatar [name]="user.name" size="sm" />
      <span>{{ user.name }}</span>
    </button>
  }
</div>`;
}
