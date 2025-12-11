import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { DsFileUpload } from './ds-file-upload';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';

const meta: Meta<DsFileUpload> = {
  title: 'Components/FileUpload',
  component: DsFileUpload,
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    accept: {
      control: 'text',
      description: 'Types de fichiers acceptés (ex: image/*,.pdf)',
    },
    maxFileSize: {
      control: 'number',
      description: 'Taille maximale en bytes (default: 10 MB)',
    },
    maxFiles: {
      control: 'number',
      description: 'Nombre maximum de fichiers',
    },
    multiple: {
      control: 'boolean',
      description: 'Permet la sélection multiple',
    },
    disabled: {
      control: 'boolean',
      description: 'Désactive le composant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du composant',
    },
    showPreview: {
      control: 'boolean',
      description: 'Affiche une preview pour les images',
    },
    label: {
      control: 'text',
      description: 'Label du bouton',
    },
    dragHelpText: {
      control: 'text',
      description: "Texte d'aide pour le drag & drop",
    },
  },
};

export default meta;
type Story = StoryObj<DsFileUpload>;

/**
 * Configuration par défaut du composant file upload.
 */
export const Default: Story = {
  args: {
    accept: '*',
    maxFileSize: 10485760, // 10 MB
    maxFiles: 1,
    multiple: false,
    disabled: false,
    size: 'md',
    showPreview: true,
    label: 'Choisir un fichier',
    dragHelpText: 'ou glisser-déposer ici',
  },
};

/**
 * Upload d'images uniquement avec preview.
 */
export const ImagesOnly: Story = {
  args: {
    accept: 'image/*',
    maxFileSize: 5242880, // 5 MB
    showPreview: true,
    label: 'Choisir une image',
    dragHelpText: 'ou glisser-déposer une image',
  },
};

/**
 * Upload avec limite de taille personnalisée.
 */
export const WithMaxSize: Story = {
  args: {
    maxFileSize: 2097152, // 2 MB
    label: 'Fichier max 2 MB',
    dragHelpText: 'Taille maximale : 2 MB',
  },
};

/**
 * Upload multiple de fichiers.
 */
export const Multiple: Story = {
  args: {
    multiple: true,
    maxFiles: 5,
    label: 'Choisir des fichiers',
    dragHelpText: 'ou glisser-déposer jusqu\'à 5 fichiers',
  },
};

/**
 * Upload avec preview d'images multiples.
 */
export const MultipleWithPreview: Story = {
  args: {
    accept: 'image/*',
    multiple: true,
    maxFiles: 4,
    showPreview: true,
    label: 'Choisir des images',
    dragHelpText: 'jusqu\'à 4 images',
  },
};

/**
 * Upload désactivé.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Upload désactivé',
  },
};

/**
 * Upload en petite taille.
 */
export const SmallSize: Story = {
  args: {
    size: 'sm',
    label: 'Petit upload',
  },
};

/**
 * Upload en grande taille.
 */
export const LargeSize: Story = {
  args: {
    size: 'lg',
    label: 'Grand upload',
    dragHelpText: 'Zone de dépôt étendue',
  },
};

/**
 * Upload de PDF uniquement.
 */
export const PdfOnly: Story = {
  args: {
    accept: '.pdf',
    showPreview: false,
    label: 'Choisir un PDF',
    dragHelpText: 'Fichiers PDF uniquement',
  },
};

/**
 * Upload de documents Office.
 */
export const OfficeDocuments: Story = {
  args: {
    accept: '.doc,.docx,.xls,.xlsx,.ppt,.pptx',
    showPreview: false,
    multiple: true,
    maxFiles: 3,
    label: 'Documents Office',
    dragHelpText: 'Word, Excel, PowerPoint',
  },
};

/**
 * Upload avec formulaire réactif.
 */
@Component({
  selector: 'story-reactive-form',
  standalone: true,
  imports: [DsFileUpload, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <ds-file-upload
        formControlName="files"
        [accept]="'image/*,.pdf'"
        [multiple]="true"
        [maxFiles]="3"
        size="md"
      ></ds-file-upload>

      <div style="margin-top: 1rem;">
        <button type="submit" [disabled]="!form.valid">
          Envoyer ({{ fileCount }} fichier{{ fileCount !== 1 ? 's' : '' }})
        </button>
        <button type="button" (click)="form.reset()" style="margin-left: 0.5rem;">
          Réinitialiser
        </button>
      </div>

      <div style="margin-top: 1rem; padding: 1rem; background: #f5f5f5; border-radius: 4px;">
        <strong>État du formulaire :</strong>
        <pre style="margin: 0.5rem 0 0 0;">{{ formValue | json }}</pre>
      </div>
    </form>
  `,
})
class StoryReactiveFormComponent {
  form = new FormGroup({
    files: new FormControl<File[] | null>(null),
  });

  get fileCount(): number {
    return this.form.value.files?.length || 0;
  }

  get formValue() {
    const files = this.form.value.files;
    if (!files) return { files: null };
    return {
      files: files.map(f => ({ name: f.name, size: f.size, type: f.type }))
    };
  }

  onSubmit() {
    console.log('Form submitted:', this.form.value);
    alert(`Formulaire soumis avec ${this.fileCount} fichier(s)`);
  }
}

export const InReactiveForm: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [StoryReactiveFormComponent],
    },
    template: '<story-reactive-form></story-reactive-form>',
  }),
};

/**
 * Upload avec progression simulée.
 */
@Component({
  selector: 'story-with-progress',
  standalone: true,
  imports: [DsFileUpload],
  template: `
    <ds-file-upload
      [multiple]="true"
      [maxFiles]="3"
      (filesChange)="onFilesChange($event)"
      (uploadProgress)="onProgress($event)"
    ></ds-file-upload>

    @if (uploadEvents.length > 0) {
      <div style="margin-top: 1rem; padding: 1rem; background: #f5f5f5; border-radius: 4px;">
        <strong>Événements de progression :</strong>
        <div style="max-height: 200px; overflow-y: auto; margin-top: 0.5rem;">
          @for (event of uploadEvents; track $index) {
            <div style="font-size: 0.875rem; margin: 0.25rem 0;">
              <strong>{{ event.file.name }}</strong> : {{ event.progress }}%
            </div>
          }
        </div>
      </div>
    }
  `,
})
class StoryWithProgressComponent {
  uploadEvents: Array<{ file: File; progress: number }> = [];

  onFilesChange(files: File[]) {
    console.log('Files changed:', files);
  }

  onProgress(event: { file: File; progress: number }) {
    this.uploadEvents.push(event);
    console.log('Upload progress:', event);
  }
}

export const WithProgress: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [StoryWithProgressComponent],
    },
    template: '<story-with-progress></story-with-progress>',
  }),
};

/**
 * Comparaison des thèmes Light, Dark et Custom.
 */
@Component({
  selector: 'story-themed',
  standalone: true,
  imports: [DsFileUpload],
  template: `
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;">
      <!-- Light -->
      <div>
        <h3 style="margin-bottom: 1rem;">Light</h3>
        <div class="theme-light" style="padding: 1rem; background: white;">
          <ds-file-upload
            [accept]="'image/*'"
            [showPreview]="true"
            size="md"
            label="Upload Light"
          ></ds-file-upload>
        </div>
      </div>

      <!-- Dark -->
      <div>
        <h3 style="margin-bottom: 1rem;">Dark</h3>
        <div class="theme-dark" style="padding: 1rem; background: #1a1a1a;">
          <ds-file-upload
            [accept]="'image/*'"
            [showPreview]="true"
            size="md"
            label="Upload Dark"
          ></ds-file-upload>
        </div>
      </div>

      <!-- Custom -->
      <div>
        <h3 style="margin-bottom: 1rem;">Custom</h3>
        <div class="theme-custom" style="padding: 1rem; background: #f0f4f8;">
          <ds-file-upload
            [accept]="'image/*'"
            [showPreview]="true"
            size="md"
            label="Upload Custom"
          ></ds-file-upload>
        </div>
      </div>
    </div>
  `,
})
class StoryThemedComponent {}

export const Themed: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [StoryThemedComponent],
    },
    template: '<story-themed></story-themed>',
  }),
};

/**
 * Toutes les tailles côte à côte.
 */
export const AllSizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: grid; gap: 2rem;">
        <div>
          <h4>Small</h4>
          <ds-file-upload size="sm" label="Upload Small"></ds-file-upload>
        </div>
        <div>
          <h4>Medium (default)</h4>
          <ds-file-upload size="md" label="Upload Medium"></ds-file-upload>
        </div>
        <div>
          <h4>Large</h4>
          <ds-file-upload size="lg" label="Upload Large"></ds-file-upload>
        </div>
      </div>
    `,
  }),
};
