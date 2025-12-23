import { Component, signal, computed } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { DsEntityPicker, DsEntityOption, DsEntityPickerSize, DsEntityPickerDisplayMode } from 'ds-angular';
import { faStar, faHeart, faBookmark, faBolt, faFire, faGem } from '@fortawesome/free-solid-svg-icons';
import { DemoContainer } from '../../../shared/demo/demo-container';
import { PropsTable } from '../../../shared/props/props-table';
import { DsEntityPickerDefinition } from '../../../registry/definitions/ds-entity-picker.definition';
import { ControlValues } from '../../../registry/types';

@Component({
  selector: 'app-entity-picker-page',
  standalone: true,
  imports: [JsonPipe, FormsModule, ReactiveFormsModule, DsEntityPicker, DemoContainer, PropsTable],
  template: `
    <div class="component-page">
      <header class="component-header">
        <div class="component-header__meta">
          <span class="component-badge">{{ definition.category }}</span>
        </div>
        <h1 class="component-title">{{ definition.name }}</h1>
        <p class="component-desc">{{ definition.description }}</p>
        <code class="component-selector">&lt;{{ definition.selector }}&gt;</code>
      </header>

      <section class="component-section">
        <h2>Exemples</h2>

        <!-- Default -->
        <div class="demo-block">
          <h3 class="demo-block__title">Default</h3>
          <p class="demo-block__desc">{{ definition.demos[0].description }}</p>
          <doc-demo-container
            [code]="definition.demos[0].code"
            [controls]="definition.demos[0].controls"
            [initialValues]="defaultValues()"
            (controlChange)="onDefaultChange($event)"
          >
            <ds-entity-picker
              [options]="simpleOptions"
              [size]="demoSize()"
              [clearable]="demoClearable()"
              [disabled]="demoDisabled()"
              placeholder="Sélectionner une étiquette..."
            />
          </doc-demo-container>
        </div>

        <!-- With Icons & Colors -->
        <div class="demo-block">
          <h3 class="demo-block__title">With Icons & Colors</h3>
          <p class="demo-block__desc">{{ definition.demos[1].description }}</p>
          <doc-demo-container [code]="definition.demos[1].code">
            <ds-entity-picker
              [options]="richOptions"
              placeholder="Choisir un tag..."
            />
          </doc-demo-container>
        </div>

        <!-- Multiple Selection -->
        <div class="demo-block">
          <h3 class="demo-block__title">Multiple Selection</h3>
          <p class="demo-block__desc">{{ definition.demos[2].description }}</p>
          <doc-demo-container
            [code]="definition.demos[2].code"
            [controls]="definition.demos[2].controls"
            [initialValues]="multipleValues()"
            (controlChange)="onMultipleChange($event)"
          >
            <ds-entity-picker
              [options]="richOptions"
              [multiple]="true"
              [maxSelections]="demoMaxSelections() || undefined"
              [displayMode]="demoDisplayMode()"
              placeholder="Ajouter des tags..."
              [(ngModel)]="selectedMultiple"
            />
            @if (selectedMultiple.length > 0) {
              <div class="demo-result">
                <strong>Sélection :</strong> {{ selectedMultiple.join(', ') }}
              </div>
            }
          </doc-demo-container>
        </div>

        <!-- Allow Create -->
        <div class="demo-block">
          <h3 class="demo-block__title">Allow Create</h3>
          <p class="demo-block__desc">{{ definition.demos[3].description }}</p>
          <doc-demo-container [code]="definition.demos[3].code">
            <ds-entity-picker
              [options]="creatableOptions()"
              [allowCreate]="true"
              (createRequested)="onCreateTag($event)"
              placeholder="Taper ou créer..."
            />
            @if (lastCreated()) {
              <div class="demo-result demo-result--success">
                Créé : {{ lastCreated() }}
              </div>
            }
          </doc-demo-container>
        </div>

        <!-- Sizes -->
        <div class="demo-block">
          <h3 class="demo-block__title">Sizes</h3>
          <p class="demo-block__desc">{{ definition.demos[4].description }}</p>
          <doc-demo-container [code]="definition.demos[4].code">
            <div class="demo-column">
              <ds-entity-picker [options]="simpleOptions" size="sm" placeholder="Small" />
              <ds-entity-picker [options]="simpleOptions" size="md" placeholder="Medium" />
              <ds-entity-picker [options]="simpleOptions" size="lg" placeholder="Large" />
            </div>
          </doc-demo-container>
        </div>

        <!-- With Reactive Form -->
        <div class="demo-block">
          <h3 class="demo-block__title">With Reactive Form</h3>
          <p class="demo-block__desc">{{ definition.demos[5].description }}</p>
          <doc-demo-container [code]="definition.demos[5].code">
            <form [formGroup]="form" class="demo-form">
              <ds-entity-picker
                [options]="richOptions"
                [multiple]="true"
                formControlName="tags"
                label="Tags"
                helper="Sélectionnez au moins un tag"
                [error]="form.get('tags')?.touched && form.get('tags')?.errors?.['required'] ? 'Champ obligatoire' : ''"
              />
              <div class="demo-form__actions">
                <button type="button" (click)="submitForm()" [disabled]="form.invalid">
                  Valider
                </button>
                <button type="button" (click)="resetForm()">
                  Reset
                </button>
              </div>
              @if (formSubmitted()) {
                <div class="demo-result demo-result--success">
                  Formulaire soumis avec : {{ form.value.tags | json }}
                </div>
              }
            </form>
          </doc-demo-container>
        </div>

        <!-- States -->
        <div class="demo-block">
          <h3 class="demo-block__title">States</h3>
          <p class="demo-block__desc">{{ definition.demos[6].description }}</p>
          <doc-demo-container [code]="definition.demos[6].code">
            <div class="demo-column">
              <ds-entity-picker
                [options]="simpleOptions"
                [disabled]="true"
                placeholder="Désactivé"
                label="Disabled"
              />
              <ds-entity-picker
                [options]="simpleOptions"
                error="Ce champ est obligatoire"
                label="Error"
              />
              <ds-entity-picker
                [options]="simpleOptions"
                helper="Choisissez une ou plusieurs options"
                label="With Helper"
              />
            </div>
          </doc-demo-container>
        </div>

        <!-- Multiple with Chips Preview -->
        <div class="demo-block">
          <h3 class="demo-block__title">Chips colorés</h3>
          <p class="demo-block__desc">Aperçu des chips avec couleurs personnalisées.</p>
          <doc-demo-container [code]="chipsPreviewCode">
            <ds-entity-picker
              [options]="richOptions"
              [multiple]="true"
              [(ngModel)]="preSelectedTags"
              placeholder="Tags pré-sélectionnés"
            />
          </doc-demo-container>
        </div>
      </section>

      <section class="component-section">
        <h2>API Reference</h2>
        <doc-props-table [props]="definition.props" />
      </section>

      <section class="component-section">
        <h2>Interface DsEntityOption</h2>
        <div class="code-block">
          <pre><code>{{ entityOptionInterface }}</code></pre>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .component-page { max-width: 900px; }
    .component-header { margin-bottom: 48px; }
    .component-header__meta { margin-bottom: 12px; }
    .component-badge {
      display: inline-block; padding: 4px 10px; font-size: 0.75rem; font-weight: 500;
      text-transform: uppercase; letter-spacing: 0.05em;
      background: var(--color-primary-light, #eff6ff); color: var(--color-primary, #3b82f6); border-radius: 4px;
    }
    .component-title { margin: 0 0 12px 0; font-size: 2rem; font-weight: 700; color: var(--text-default, #1a1a1a); }
    .component-desc { margin: 0 0 16px 0; font-size: 1.125rem; color: var(--text-muted, #6b7280); line-height: 1.6; }
    .component-selector {
      display: inline-block; padding: 6px 12px; font-family: var(--doc-code-font, monospace); font-size: 0.875rem;
      background: var(--background-secondary, #f3f4f6); color: var(--text-default, #374151); border-radius: 4px;
    }
    .component-section {
      margin-bottom: 48px;
      h2 { font-size: 1.25rem; font-weight: 600; color: var(--text-default, #1a1a1a); margin: 0 0 24px 0; padding-bottom: 12px; border-bottom: 1px solid var(--border-default, #e5e7eb); }
    }
    .demo-block { margin-bottom: 32px; }
    .demo-block__title { margin: 0 0 8px 0; font-size: 1rem; font-weight: 600; color: var(--text-default, #1a1a1a); }
    .demo-block__desc { margin: 0 0 16px 0; font-size: 0.875rem; color: var(--text-muted, #6b7280); }
    .demo-column { display: flex; flex-direction: column; gap: 16px; }
    .demo-result {
      margin-top: 12px; padding: 8px 12px; font-size: 0.875rem;
      background: var(--gray-50, #f9fafb); border-radius: 4px; color: var(--text-muted, #6b7280);
    }
    .demo-result--success {
      background: var(--success-50, #ecfdf5); color: var(--success-700, #047857);
    }
    .demo-form { display: flex; flex-direction: column; gap: 16px; }
    .demo-form__actions { display: flex; gap: 8px; }
    .demo-form__actions button {
      padding: 8px 16px; border-radius: 6px; font-size: 0.875rem; cursor: pointer;
      border: 1px solid var(--border-default, #d1d5db);
      background: var(--background-main, #fff); color: var(--text-default, #1a1a1a);
      transition: all 0.15s ease;
    }
    .demo-form__actions button:hover:not(:disabled) {
      background: var(--gray-50, #f9fafb);
    }
    .demo-form__actions button:disabled {
      opacity: 0.5; cursor: not-allowed;
    }
    .code-block {
      background: var(--gray-900, #111827); color: var(--gray-100, #f3f4f6);
      padding: 16px; border-radius: 8px; overflow-x: auto;
    }
    .code-block pre { margin: 0; }
    .code-block code { font-family: var(--doc-code-font, monospace); font-size: 0.875rem; line-height: 1.6; }
  `]
})
export class EntityPickerPage {
  definition = DsEntityPickerDefinition;

  // Options simples
  simpleOptions: DsEntityOption[] = [
    { value: 'work', label: 'Travail' },
    { value: 'personal', label: 'Personnel' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'later', label: 'Plus tard' },
    { value: 'ideas', label: 'Idées' },
  ];

  // Options riches avec icônes, couleurs, emojis
  richOptions: DsEntityOption[] = [
    { value: 'important', label: 'Important', color: '#ef4444', emoji: '🏷️', description: 'Priorité haute' },
    { value: 'favorite', label: 'Favori', color: '#f59e0b', icon: faStar },
    { value: 'personal', label: 'Personnel', color: '#10b981', emoji: '👤' },
    { value: 'work', label: 'Travail', color: '#3b82f6', icon: faBookmark },
    { value: 'urgent', label: 'Urgent', color: '#8b5cf6', icon: faBolt, description: 'À traiter rapidement' },
    { value: 'creative', label: 'Créatif', color: '#ec4899', icon: faGem },
    { value: 'hot', label: 'Tendance', color: '#f97316', icon: faFire },
    { value: 'love', label: 'Coup de coeur', color: '#e11d48', icon: faHeart },
  ];

  // État pour la démo creatable
  creatableOptions = signal<DsEntityOption[]>([...this.simpleOptions]);
  lastCreated = signal<string>('');

  // État multi-select
  selectedMultiple: string[] = [];

  // Tags pré-sélectionnés pour la démo chips
  preSelectedTags: string[] = ['important', 'favorite', 'work'];

  // Formulaire réactif
  form = new FormGroup({
    tags: new FormControl<string[]>([], Validators.required)
  });
  formSubmitted = signal(false);

  // Valeurs des contrôles
  defaultValues = signal<ControlValues>({
    size: 'md',
    clearable: true,
    disabled: false,
  });

  multipleValues = signal<ControlValues>({
    maxSelections: 0,
    displayMode: 'chip',
  });

  // Computed pour les démos
  demoSize = computed(() => this.defaultValues()['size'] as DsEntityPickerSize);
  demoClearable = computed(() => this.defaultValues()['clearable'] as boolean);
  demoDisabled = computed(() => this.defaultValues()['disabled'] as boolean);
  demoMaxSelections = computed(() => this.multipleValues()['maxSelections'] as number);
  demoDisplayMode = computed(() => this.multipleValues()['displayMode'] as DsEntityPickerDisplayMode);

  // Code pour la démo chips
  chipsPreviewCode = `<ds-entity-picker
  [options]="richOptions"
  [multiple]="true"
  [(ngModel)]="selectedTags"
/>

// selectedTags = ['important', 'favorite', 'work']`;

  // Interface pour la doc
  entityOptionInterface = `interface DsEntityOption {
  value: string;           // Identifiant unique
  label: string;           // Texte affiché
  description?: string;    // Description secondaire
  icon?: IconDefinition;   // Icône FontAwesome
  emoji?: string;          // Emoji
  color?: string;          // Couleur hex (#ef4444) ou CSS
  disabled?: boolean;      // Option désactivée
  data?: unknown;          // Données custom attachées
}`;

  onDefaultChange(values: ControlValues): void {
    this.defaultValues.set(values);
  }

  onMultipleChange(values: ControlValues): void {
    this.multipleValues.set(values);
  }

  onCreateTag(value: string): void {
    const newOption: DsEntityOption = {
      value: value.toLowerCase().replace(/\s+/g, '-'),
      label: value,
      color: this.getRandomColor(),
    };
    this.creatableOptions.update(opts => [...opts, newOption]);
    this.lastCreated.set(value);
    setTimeout(() => this.lastCreated.set(''), 3000);
  }

  submitForm(): void {
    if (this.form.valid) {
      this.formSubmitted.set(true);
      setTimeout(() => this.formSubmitted.set(false), 3000);
    }
  }

  resetForm(): void {
    this.form.reset({ tags: [] });
    this.formSubmitted.set(false);
  }

  private getRandomColor(): string {
    const colors = ['#6b7280', '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
