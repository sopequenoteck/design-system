import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DsRating } from './ds-rating';

/**
 * # DsRating
 *
 * Composant de notation par étoiles permettant d'afficher et de saisir
 * une note sur une échelle configurable.
 *
 * ## Usage
 *
 * ```html
 * <ds-rating
 *   [(value)]="rating"
 *   [max]="5"
 *   [allowHalf]="true"
 *   (ratingChange)="handleRatingChange($event)" />
 * ```
 */
const meta: Meta<DsRating> = {
  title: 'Data Display/DsRating',
  component: DsRating,
  decorators: [
    moduleMetadata({
      imports: [DsRating, ReactiveFormsModule],
    }),
  ],
  argTypes: {
    value: {
      control: 'number',
      description: 'Valeur actuelle de la notation',
    },
    max: {
      control: 'number',
      description: 'Valeur maximale de la notation',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du composant',
    },
    allowHalf: {
      control: 'boolean',
      description: 'Permet les demi-étoiles',
    },
    readonly: {
      control: 'boolean',
      description: 'Mode lecture seule',
    },
    disabled: {
      control: 'boolean',
      description: 'État désactivé',
    },
  },
};

export default meta;
type Story = StoryObj<DsRating>;

/**
 * État par défaut avec 5 étoiles.
 */
export const Default: Story = {
  args: {
    value: 0,
    max: 5,
    size: 'md',
    allowHalf: false,
    readonly: false,
    disabled: false,
  },
};

/**
 * Rating avec valeur initiale.
 */
export const WithValue: Story = {
  args: {
    value: 3.5,
    max: 5,
    allowHalf: true,
    size: 'md',
  },
};

/**
 * Rating avec demi-étoiles activées.
 */
export const AllowHalfStars: Story = {
  args: {
    value: 0,
    max: 5,
    allowHalf: true,
    size: 'md',
  },
};

/**
 * Mode lecture seule (affichage seulement).
 */
export const Readonly: Story = {
  args: {
    value: 4,
    max: 5,
    readonly: true,
    size: 'md',
  },
};

/**
 * État désactivé.
 */
export const Disabled: Story = {
  args: {
    value: 2.5,
    max: 5,
    allowHalf: true,
    disabled: true,
    size: 'md',
  },
};

/**
 * Taille small.
 */
export const SizeSmall: Story = {
  args: {
    value: 3,
    max: 5,
    size: 'sm',
  },
};

/**
 * Taille large.
 */
export const SizeLarge: Story = {
  args: {
    value: 4,
    max: 5,
    size: 'lg',
  },
};

/**
 * Rating sur 10 étoiles.
 */
export const MaxTen: Story = {
  args: {
    value: 7,
    max: 10,
    size: 'md',
  },
};

/**
 * Toutes les tailles côte à côte.
 */
export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; align-items: start;">
        <div>
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Small</label>
          <ds-rating [value]="3" size="sm" />
        </div>

        <div>
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Medium</label>
          <ds-rating [value]="3" size="md" />
        </div>

        <div>
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Large</label>
          <ds-rating [value]="3" size="lg" />
        </div>
      </div>
    `,
  }),
};

/**
 * Différentes valeurs affichées en mode readonly.
 */
export const DifferentRatings: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;">
        <div>
          <div style="margin-bottom: 0.5rem; color: var(--text-muted);">0 étoiles</div>
          <ds-rating [value]="0" [readonly]="true" />
        </div>

        <div>
          <div style="margin-bottom: 0.5rem; color: var(--text-muted);">1.5 étoiles</div>
          <ds-rating [value]="1.5" [allowHalf]="true" [readonly]="true" />
        </div>

        <div>
          <div style="margin-bottom: 0.5rem; color: var(--text-muted);">3 étoiles</div>
          <ds-rating [value]="3" [readonly]="true" />
        </div>

        <div>
          <div style="margin-bottom: 0.5rem; color: var(--text-muted);">4.5 étoiles</div>
          <ds-rating [value]="4.5" [allowHalf]="true" [readonly]="true" />
        </div>

        <div>
          <div style="margin-bottom: 0.5rem; color: var(--text-muted);">5 étoiles</div>
          <ds-rating [value]="5" [readonly]="true" />
        </div>
      </div>
    `,
  }),
};

/**
 * Intégration avec formulaire réactif.
 */
export const InReactiveForm: Story = {
  render: () => ({
    props: {
      form: new FormGroup({
        rating: new FormControl(0, [Validators.required, Validators.min(1)]),
      }),
      onSubmit(form: FormGroup) {
        console.log('Form submitted:', form.value);
        alert(`Rating soumis : ${form.value.rating} étoiles`);
      },
    },
    template: `
      <form [formGroup]="form" (ngSubmit)="onSubmit(form)">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">
            Notez ce produit *
          </label>
          <ds-rating formControlName="rating" [allowHalf]="true" size="lg" />

          @if (form.get('rating')?.touched && form.get('rating')?.hasError('required')) {
            <div style="color: var(--error); font-size: 0.875rem; margin-top: 0.5rem;">
              Une note est requise
            </div>
          }

          @if (form.get('rating')?.touched && form.get('rating')?.hasError('min')) {
            <div style="color: var(--error); font-size: 0.875rem; margin-top: 0.5rem;">
              Veuillez donner au moins 1 étoile
            </div>
          }
        </div>

        <div style="margin-top: 1rem;">
          <button
            type="submit"
            [disabled]="!form.valid"
            style="padding: 0.5rem 1rem; background: var(--color-primary); color: white; border: none; border-radius: var(--radius-2); cursor: pointer;">
            Soumettre
          </button>
        </div>

        <div style="margin-top: 1rem; padding: 1rem; background: var(--surface-raised); border-radius: var(--radius-2);">
          <strong>Valeur actuelle :</strong> {{ form.get('rating')?.value }} étoiles
          <br>
          <strong>Formulaire valide :</strong> {{ form.valid ? 'Oui' : 'Non' }}
        </div>
      </form>
    `,
  }),
};

/**
 * Cas d'usage : avis produit.
 */
export const ProductReview: Story = {
  render: () => ({
    template: `
      <div style="max-width: 500px; padding: 1.5rem; border: 1px solid var(--border-default); border-radius: var(--radius-2);">
        <h3 style="margin: 0 0 1rem;">Avis client</h3>

        <div style="margin-bottom: 1.5rem;">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <ds-rating [value]="4.5" [allowHalf]="true" [readonly]="true" size="lg" />
            <span style="font-size: 1.25rem; font-weight: 600;">4.5/5</span>
          </div>
          <div style="color: var(--text-muted); font-size: 0.875rem;">
            Basé sur 128 avis
          </div>
        </div>

        <div style="border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
          <div style="margin-bottom: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
              <ds-rating [value]="5" [readonly]="true" size="sm" />
              <div style="flex: 1; height: 8px; background: var(--surface-raised); border-radius: 4px; overflow: hidden;">
                <div style="height: 100%; width: 65%; background: var(--warning);"></div>
              </div>
              <span style="font-size: 0.875rem; color: var(--text-muted); min-width: 30px;">65%</span>
            </div>

            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
              <ds-rating [value]="4" [readonly]="true" size="sm" />
              <div style="flex: 1; height: 8px; background: var(--surface-raised); border-radius: 4px; overflow: hidden;">
                <div style="height: 100%; width: 20%; background: var(--warning);"></div>
              </div>
              <span style="font-size: 0.875rem; color: var(--text-muted); min-width: 30px;">20%</span>
            </div>

            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
              <ds-rating [value]="3" [readonly]="true" size="sm" />
              <div style="flex: 1; height: 8px; background: var(--surface-raised); border-radius: 4px; overflow: hidden;">
                <div style="height: 100%; width: 10%; background: var(--warning);"></div>
              </div>
              <span style="font-size: 0.875rem; color: var(--text-muted); min-width: 30px;">10%</span>
            </div>

            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
              <ds-rating [value]="2" [readonly]="true" size="sm" />
              <div style="flex: 1; height: 8px; background: var(--surface-raised); border-radius: 4px; overflow: hidden;">
                <div style="height: 100%; width: 3%; background: var(--warning);"></div>
              </div>
              <span style="font-size: 0.875rem; color: var(--text-muted); min-width: 30px;">3%</span>
            </div>

            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <ds-rating [value]="1" [readonly]="true" size="sm" />
              <div style="flex: 1; height: 8px; background: var(--surface-raised); border-radius: 4px; overflow: hidden;">
                <div style="height: 100%; width: 2%; background: var(--warning);"></div>
              </div>
              <span style="font-size: 0.875rem; color: var(--text-muted); min-width: 30px;">2%</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

/**
 * Test des 3 thèmes (Light/Dark/Custom) côte à côte.
 */
export const Themed: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
        <div class="theme-light" style="padding: var(--space-6); background: var(--background-main); border: 1px solid var(--border-default); border-radius: var(--radius-2);">
          <h4 style="margin: 0 0 var(--space-4); text-align: center; color: var(--text-default);">Light Theme</h4>
          <ds-rating [value]="3.5" [allowHalf]="true" size="lg" />
        </div>

        <div class="theme-dark" style="padding: var(--space-6); background: var(--background-main); border: 1px solid var(--border-default); border-radius: var(--radius-2);">
          <h4 style="margin: 0 0 var(--space-4); text-align: center; color: var(--text-default);">Dark Theme</h4>
          <ds-rating [value]="3.5" [allowHalf]="true" size="lg" />
        </div>

        <div class="theme-custom" style="padding: var(--space-6); background: var(--background-main); border: 1px solid var(--border-default); border-radius: var(--radius-2);">
          <h4 style="margin: 0 0 var(--space-4); text-align: center; color: var(--text-default);">Custom Theme</h4>
          <ds-rating [value]="3.5" [allowHalf]="true" size="lg" />
        </div>
      </div>
    `,
  }),
};
