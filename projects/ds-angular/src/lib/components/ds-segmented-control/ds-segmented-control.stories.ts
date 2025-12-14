import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DsSegmentedControl, SegmentOption } from './ds-segmented-control';
import { IconRegistryService } from '../../utils/icon-registry.service';

const meta: Meta<DsSegmentedControl> = {
  title: 'Forms/Input Controls/Segmented Control',
  component: DsSegmentedControl,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ReactiveFormsModule, DsSegmentedControl],
      providers: [IconRegistryService],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Liste des options du segmented control',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du segmented control',
    },
    disabled: {
      control: 'boolean',
      description: 'État désactivé global',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Prend toute la largeur du conteneur',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation du segmented control',
    },
    color: {
      control: 'select',
      options: ['primary', 'neutral'],
      description: 'Couleur du segment actif',
    },
  },
};

export default meta;
type Story = StoryObj<DsSegmentedControl>;

const viewOptions: SegmentOption[] = [
  { value: 'list', label: 'Liste' },
  { value: 'grid', label: 'Grille' },
  { value: 'map', label: 'Carte' },
];

const viewOptionsWithIcons: SegmentOption[] = [
  { value: 'list', label: 'Liste', icon: 'list' },
  { value: 'grid', label: 'Grille', icon: 'grip' },
  { value: 'map', label: 'Carte', icon: 'map' },
];

const alignmentOptions: SegmentOption[] = [
  { value: 'left', label: 'Gauche', icon: 'align-left' },
  { value: 'center', label: 'Centre', icon: 'align-center' },
  { value: 'right', label: 'Droite', icon: 'align-right' },
  { value: 'justify', label: 'Justifié', icon: 'align-justify' },
];

const modeOptions: SegmentOption[] = [
  { value: 'light', label: 'Clair' },
  { value: 'dark', label: 'Sombre' },
  { value: 'auto', label: 'Auto' },
];

const optionsWithDisabled: SegmentOption[] = [
  { value: 'edit', label: 'Modifier', icon: 'edit' },
  { value: 'delete', label: 'Supprimer', icon: 'trash', disabled: true },
  { value: 'archive', label: 'Archiver', icon: 'archive' },
];

const manyOptions: SegmentOption[] = [
  { value: 'jan', label: 'Jan' },
  { value: 'feb', label: 'Fév' },
  { value: 'mar', label: 'Mar' },
  { value: 'apr', label: 'Avr' },
  { value: 'may', label: 'Mai' },
  { value: 'jun', label: 'Jun' },
];

/**
 * Exemple par défaut du segmented control
 */
export const Default: Story = {
  args: {
    options: viewOptions,
    size: 'md',
    disabled: false,
    fullWidth: false,
    orientation: 'horizontal',
    color: 'primary',
  },
};

/**
 * Segmented control avec icônes
 */
export const WithIcons: Story = {
  args: {
    options: viewOptionsWithIcons,
    size: 'md',
  },
};

/**
 * Taille small
 */
export const SizeSmall: Story = {
  args: {
    options: viewOptions,
    size: 'sm',
  },
};

/**
 * Taille medium (par défaut)
 */
export const SizeMedium: Story = {
  args: {
    options: viewOptions,
    size: 'md',
  },
};

/**
 * Taille large
 */
export const SizeLarge: Story = {
  args: {
    options: viewOptions,
    size: 'lg',
  },
};

/**
 * Comparaison des tailles
 */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <p style="margin-bottom: 8px; font-weight: 600;">Small</p>
          <ds-segmented-control [options]="options" size="sm" />
        </div>
        <div>
          <p style="margin-bottom: 8px; font-weight: 600;">Medium</p>
          <ds-segmented-control [options]="options" size="md" />
        </div>
        <div>
          <p style="margin-bottom: 8px; font-weight: 600;">Large</p>
          <ds-segmented-control [options]="options" size="lg" />
        </div>
      </div>
    `,
    props: {
      options: viewOptions,
    },
  }),
};

/**
 * Segmented control pleine largeur
 */
export const FullWidth: Story = {
  args: {
    options: viewOptions,
    size: 'md',
    fullWidth: true,
  },
};

/**
 * Orientation verticale
 */
export const Vertical: Story = {
  args: {
    options: viewOptionsWithIcons,
    size: 'md',
    orientation: 'vertical',
  },
};

/**
 * État désactivé
 */
export const Disabled: Story = {
  args: {
    options: viewOptions,
    size: 'md',
    disabled: true,
  },
};

/**
 * Options individuellement désactivées
 */
export const DisabledOptions: Story = {
  args: {
    options: optionsWithDisabled,
    size: 'md',
  },
};

/**
 * Couleur neutre
 */
export const ColorNeutral: Story = {
  args: {
    options: modeOptions,
    size: 'md',
    color: 'neutral',
  },
};

/**
 * Segmented control d'alignement de texte
 */
export const TextAlignment: Story = {
  args: {
    options: alignmentOptions,
    size: 'md',
  },
};

/**
 * Utilisation dans un formulaire réactif
 */
export const InReactiveForm: Story = {
  render: () => ({
    template: `
      <div style="max-width: 400px;">
        <form>
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">
              Vue préférée
            </label>
            <ds-segmented-control
              [formControl]="viewControl"
              [options]="options"
              size="md"
            />
          </div>
          <div style="padding: 12px; background: var(--gray-100); border-radius: 8px;">
            <strong>Valeur sélectionnée :</strong> {{ viewControl.value || 'Aucune' }}
          </div>
        </form>
      </div>
    `,
    props: {
      options: viewOptionsWithIcons,
      viewControl: new FormControl('list'),
    },
  }),
};

/**
 * Avec validation de formulaire
 */
export const WithValidation: Story = {
  render: () => ({
    template: `
      <div style="max-width: 400px;">
        <form>
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">
              Mode d'affichage <span style="color: var(--error);">*</span>
            </label>
            <ds-segmented-control
              [formControl]="control"
              [options]="options"
              size="md"
            />
            @if (control.invalid && control.touched) {
              <div style="color: var(--error); font-size: 14px; margin-top: 8px;">
                Veuillez sélectionner un mode d'affichage
              </div>
            }
          </div>
          <button
            type="button"
            (click)="control.markAsTouched(); control.updateValueAndValidity()"
            style="padding: 8px 16px; border: 1px solid var(--gray-300); border-radius: 6px; cursor: pointer;"
          >
            Valider
          </button>
        </form>
      </div>
    `,
    props: {
      options: viewOptions,
      control: new FormControl(null, { validators: [(control) => control.value ? null : { required: true }] }),
    },
  }),
};

/**
 * Avec beaucoup d'options
 */
export const ManyOptions: Story = {
  args: {
    options: manyOptions,
    size: 'sm',
  },
};

/**
 * Comparaison des couleurs
 */
export const Colors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <p style="margin-bottom: 8px; font-weight: 600;">Primary (par défaut)</p>
          <ds-segmented-control [options]="options" color="primary" />
        </div>
        <div>
          <p style="margin-bottom: 8px; font-weight: 600;">Neutral</p>
          <ds-segmented-control [options]="options" color="neutral" />
        </div>
      </div>
    `,
    props: {
      options: viewOptionsWithIcons,
    },
  }),
};

/**
 * Thèmes light/dark
 */
export const Themed: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 32px;">
        <div class="theme-light" style="padding: 24px; background: var(--background-main); border-radius: 8px; flex: 1;">
          <p style="margin-bottom: 16px; font-weight: 600;">Light Theme</p>
          <ds-segmented-control [options]="options" size="md" />
        </div>
        <div class="theme-dark" style="padding: 24px; background: var(--background-main); border-radius: 8px; flex: 1;">
          <p style="margin-bottom: 16px; font-weight: 600;">Dark Theme</p>
          <ds-segmented-control [options]="options" size="md" />
        </div>
      </div>
    `,
    props: {
      options: viewOptionsWithIcons,
    },
  }),
};
