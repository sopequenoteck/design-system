import {
  Component,
  forwardRef,
  input,
  output,
  signal,
  computed,
  ElementRef,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faCloudArrowUp,
  faXmark,
  faFile,
  faFileImage,
  faFilePdf,
  faFileWord,
  faFileExcel,
} from '@fortawesome/free-solid-svg-icons';
import { DsProgressBar } from '../ds-progress-bar/ds-progress-bar';

/**
 * Tailles disponibles pour le composant file upload.
 */
export type FileUploadSize = 'sm' | 'md' | 'lg';

/**
 * Représente un fichier avec son état de chargement.
 */
export interface UploadFile {
  file: File;
  preview?: string;
  progress: number;
  error?: string;
}

/**
 * # DsFileUpload
 *
 * Composant de téléchargement de fichiers avec support drag & drop,
 * validation, preview et barre de progression.
 *
 * ## Usage
 *
 * ```html
 * <!-- Upload simple -->
 * <ds-file-upload
 *   [accept]="'image/*'"
 *   [maxFileSize]="5242880"
 *   (filesChange)="onFilesChange($event)">
 * </ds-file-upload>
 *
 * <!-- Upload multiple avec preview -->
 * <ds-file-upload
 *   [multiple]="true"
 *   [showPreview]="true"
 *   [maxFiles]="5"
 *   size="lg">
 * </ds-file-upload>
 * ```
 *
 * ## Accessibilité
 *
 * - Input natif avec label accessible
 * - Drag & drop avec feedback ARIA
 * - Messages d'erreur associés via aria-describedby
 *
 * @component
 */
@Component({
  selector: 'ds-file-upload',
  imports: [CommonModule, FaIconComponent, DsProgressBar],
  templateUrl: './ds-file-upload.html',
  styleUrl: './ds-file-upload.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsFileUpload),
      multi: true,
    },
  ],
})
export class DsFileUpload implements ControlValueAccessor {
  /**
   * Types de fichiers acceptés (ex: 'image/*,.pdf').
   * @default '*'
   */
  accept = input<string>('*');

  /**
   * Taille maximale d'un fichier en bytes.
   * @default 10485760 (10 MB)
   */
  maxFileSize = input<number>(10485760);

  /**
   * Nombre maximum de fichiers.
   * @default 1
   */
  maxFiles = input<number>(1);

  /**
   * Permet la sélection multiple de fichiers.
   * @default false
   */
  multiple = input<boolean>(false);

  /**
   * Désactive le composant.
   * @default false
   */
  disabled = input<boolean>(false);

  /**
   * Taille du composant.
   * @default 'md'
   */
  size = input<FileUploadSize>('md');

  /**
   * Affiche une preview pour les images.
   * @default true
   */
  showPreview = input<boolean>(true);

  /**
   * Label personnalisé pour le bouton.
   */
  label = input<string>('Choisir un fichier');

  /**
   * Texte d'aide pour le drag & drop.
   */
  dragHelpText = input<string>('ou glisser-déposer ici');

  /**
   * Événement émis lors du changement de fichiers.
   */
  filesChange = output<File[]>();

  /**
   * Événement émis lors de la suppression d'un fichier.
   */
  fileRemoved = output<File>();

  /**
   * Événement émis lors de la progression de l'upload.
   */
  uploadProgress = output<{ file: File; progress: number }>();

  // Icons (readonly for template access)
  readonly faCloudArrowUp = faCloudArrowUp;
  readonly faXmark = faXmark;
  readonly faFile = faFile;
  readonly faFileImage = faFileImage;
  readonly faFilePdf = faFilePdf;
  readonly faFileWord = faFileWord;
  readonly faFileExcel = faFileExcel;

  // ViewChild pour l'input file
  readonly fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  // État interne
  readonly files = signal<UploadFile[]>([]);
  readonly isDragging = signal<boolean>(false);
  readonly errorMessage = signal<string>('');

  // ControlValueAccessor
  private onChange: (value: File[] | null) => void = () => {};
  private onTouched: () => void = () => {};

  /**
   * Classes CSS calculées pour le conteneur (public pour tests).
   */
  readonly containerClasses = computed(() => {
    return [
      'ds-file-upload',
      `ds-file-upload--${this.size()}`,
      this.isDragging() ? 'ds-file-upload--dragging' : '',
      this.disabled() ? 'ds-file-upload--disabled' : '',
      this.errorMessage() ? 'ds-file-upload--error' : '',
    ].filter(Boolean);
  });

  /**
   * Nombre de fichiers actuellement sélectionnés (public pour tests).
   */
  readonly fileCount = computed(() => this.files().length);

  /**
   * Vérifie si la limite de fichiers est atteinte (public pour tests).
   */
  readonly isMaxFilesReached = computed(
    () => this.fileCount() >= this.maxFiles()
  );

  /**
   * Ouvre le sélecteur de fichiers.
   */
  openFileSelector(): void {
    if (this.disabled() || this.isMaxFilesReached()) {
      return;
    }
    this.fileInput()?.nativeElement.click();
  }

  /**
   * Gère la sélection de fichiers via l'input.
   */
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    this.handleFiles(Array.from(input.files));
    input.value = ''; // Reset pour permettre la réutilisation
  }

  /**
   * Gère le début du drag.
   */
  onDragEnter(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.disabled() && !this.isMaxFilesReached()) {
      this.isDragging.set(true);
    }
  }

  /**
   * Gère le survol pendant le drag.
   */
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Gère la sortie du drag.
   */
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const target = event.currentTarget as HTMLElement;
    const related = event.relatedTarget as HTMLElement;
    if (!target.contains(related)) {
      this.isDragging.set(false);
    }
  }

  /**
   * Gère le drop des fichiers.
   */
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    if (this.disabled() || this.isMaxFilesReached()) {
      return;
    }

    const files = event.dataTransfer?.files;
    if (files?.length) {
      this.handleFiles(Array.from(files));
    }
  }

  /**
   * Traite les fichiers sélectionnés ou déposés.
   */
  private handleFiles(newFiles: File[]): void {
    this.errorMessage.set('');

    // Vérifier la limite de fichiers
    const currentCount = this.fileCount();
    const maxFiles = this.maxFiles();
    const availableSlots = maxFiles - currentCount;

    if (availableSlots <= 0) {
      this.errorMessage.set(`Limite de ${maxFiles} fichier(s) atteinte`);
      return;
    }

    // Limiter le nombre de nouveaux fichiers
    const filesToAdd = this.multiple()
      ? newFiles.slice(0, availableSlots)
      : [newFiles[0]];

    // Valider et ajouter les fichiers
    const validFiles: UploadFile[] = [];

    for (const file of filesToAdd) {
      const validation = this.validateFile(file);
      if (validation.valid) {
        const uploadFile: UploadFile = {
          file,
          progress: 0,
        };

        // Générer preview pour les images
        if (this.showPreview() && file.type.startsWith('image/')) {
          this.generatePreview(file, uploadFile);
        }

        validFiles.push(uploadFile);
      } else {
        this.errorMessage.set(validation.error || 'Fichier invalide');
      }
    }

    if (validFiles.length > 0) {
      // Si single mode, remplacer le fichier existant
      if (!this.multiple()) {
        this.files.set(validFiles);
      } else {
        this.files.update((current) => [...current, ...validFiles]);
      }

      this.notifyChange();
      this.simulateUpload(validFiles);
    }
  }

  /**
   * Valide un fichier (taille, type).
   */
  private validateFile(file: File): { valid: boolean; error?: string } {
    // Vérifier la taille
    if (file.size > this.maxFileSize()) {
      const maxMB = (this.maxFileSize() / 1048576).toFixed(1);
      return {
        valid: false,
        error: `Fichier trop volumineux (max ${maxMB} MB)`,
      };
    }

    // Vérifier le type (si spécifié)
    const accept = this.accept();
    if (accept !== '*') {
      const acceptedTypes = accept.split(',').map((t) => t.trim());
      const isAccepted = acceptedTypes.some((type) => {
        if (type.startsWith('.')) {
          return file.name.toLowerCase().endsWith(type.toLowerCase());
        }
        if (type.endsWith('/*')) {
          const category = type.split('/')[0];
          return file.type.startsWith(category + '/');
        }
        return file.type === type;
      });

      if (!isAccepted) {
        return {
          valid: false,
          error: `Type de fichier non accepté`,
        };
      }
    }

    return { valid: true };
  }

  /**
   * Génère une preview pour les images.
   */
  private generatePreview(file: File, uploadFile: UploadFile): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadFile.preview = e.target?.result as string;
      this.files.update((files) => [...files]); // Trigger change detection
    };
    reader.readAsDataURL(file);
  }

  /**
   * Simule l'upload avec progression (pour démonstration).
   * Dans une vraie application, remplacer par un vrai upload HTTP.
   */
  private simulateUpload(uploadFiles: UploadFile[]): void {
    uploadFiles.forEach((uploadFile) => {
      const interval = setInterval(() => {
        uploadFile.progress += 10;
        if (uploadFile.progress >= 100) {
          clearInterval(interval);
        }
        this.uploadProgress.emit({
          file: uploadFile.file,
          progress: uploadFile.progress,
        });
        this.files.update((files) => [...files]); // Trigger change detection
      }, 100);
    });
  }

  /**
   * Retire un fichier de la liste.
   */
  removeFile(uploadFile: UploadFile): void {
    this.files.update((files) =>
      files.filter((f) => f.file !== uploadFile.file)
    );
    this.fileRemoved.emit(uploadFile.file);
    this.notifyChange();
    this.errorMessage.set('');
  }

  /**
   * Notifie le changement de valeur.
   */
  private notifyChange(): void {
    const fileList = this.files().map((uf) => uf.file);
    this.filesChange.emit(fileList);
    this.onChange(fileList.length > 0 ? fileList : null);
  }

  /**
   * Retourne l'icône appropriée pour le type de fichier (public pour tests).
   */
  getFileIcon(file: File) {
    if (file.type.startsWith('image/')) {
      return this.faFileImage;
    }
    if (file.type === 'application/pdf') {
      return this.faFilePdf;
    }
    if (
      file.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.type === 'application/msword'
    ) {
      return this.faFileWord;
    }
    if (
      file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel'
    ) {
      return this.faFileExcel;
    }
    return this.faFile;
  }

  /**
   * Formate la taille du fichier en MB ou KB (public pour tests).
   */
  formatFileSize(bytes: number): string {
    if (bytes >= 1048576) {
      return `${(bytes / 1048576).toFixed(1)} MB`;
    }
    return `${(bytes / 1024).toFixed(0)} KB`;
  }

  // ControlValueAccessor implementation
  writeValue(value: File[] | null): void {
    if (!value) {
      this.files.set([]);
      return;
    }

    const uploadFiles: UploadFile[] = value.map((file) => ({
      file,
      progress: 100,
    }));

    this.files.set(uploadFiles);
  }

  registerOnChange(fn: (value: File[] | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Le disabled est géré via input signal
  }
}
