import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  forwardRef,
  input,
  computed,
  signal,
  effect,
  output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faClose } from '@fortawesome/free-solid-svg-icons';
import {
  PrimitiveTextarea,
  TextareaAppearance,
  TextareaResize,
  TextareaSize,
  TextareaState,
} from '../../primitives/primitive-textarea/primitive-textarea';

type WindowWithResizeObserver = typeof window & { ['ResizeObserver']?: typeof globalThis.ResizeObserver };

/**
 * Composant textarea multiligne pour le Design System.
 *
 * Wrapper autour de `PrimitiveTextarea` avec support complet des formulaires Angular
 * via `ControlValueAccessor`. Inclut label, helper text, validation, compteur de caractères,
 * auto-resize et bouton d'effacement.
 *
 * @example
 * ```html
 * <!-- Usage simple -->
 * <ds-input-textarea
 *   label="Description"
 *   placeholder="Entrez votre description..."
 *   [rows]="4">
 * </ds-input-textarea>
 *
 * <!-- Avec formulaire réactif -->
 * <ds-input-textarea
 *   formControlName="description"
 *   label="Description"
 *   [maxlength]="500"
 *   [clearable]="true">
 * </ds-input-textarea>
 * ```
 *
 * @usageNotes
 * ### Accessibilité
 * - Le label est associé au textarea via `for`/`id`
 * - Les messages d'aide/erreur sont liés via `aria-describedby`
 * - Les erreurs sont annoncées via `role="alert"`
 * - Navigation clavier standard
 *
 * ### Auto-resize
 * Utiliser `resizeAuto` pour activer le redimensionnement automatique.
 * La valeur définit la hauteur maximale en pixels.
 *
 * @selector ds-input-textarea
 * @standalone true
 */
@Component({
  selector: 'ds-input-textarea',
  imports: [CommonModule, PrimitiveTextarea, FaIconComponent],
  templateUrl: './ds-input-textarea.html',
  styleUrl: './ds-input-textarea.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsInputTextarea),
      multi: true,
    },
  ],
})
export class DsInputTextarea implements ControlValueAccessor, AfterViewInit, OnDestroy {
  // ═══════════════════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════════════════

  /** Identifiant unique du textarea. Auto-généré si non fourni. */
  id = input<string>(crypto.randomUUID());

  /** Nom du champ pour les formulaires HTML natifs. */
  name = input<string | undefined>(undefined);

  /** Label visible affiché au-dessus du textarea. */
  label = input<string | undefined>(undefined);

  /** Label accessible pour les lecteurs d'écran (si pas de label visible). */
  ariaLabel = input<string | undefined>(undefined);

  /** Texte indicatif affiché quand le champ est vide. */
  placeholder = input<string>('');

  /** Désactive le champ (non modifiable, exclu de la navigation clavier). */
  disabled = input<boolean>(false);

  /** Champ en lecture seule (visible et sélectionnable, non modifiable). */
  readonly = input<boolean>(false);

  /** Marque le champ comme obligatoire (affiche * après le label). */
  required = input<boolean>(false);

  /**
   * État visuel de validation.
   * @default 'default'
   */
  state = input<TextareaState>('default');

  /**
   * Taille du composant.
   * @default 'md'
   */
  size = input<TextareaSize>('md');

  /**
   * Variante visuelle (outline ou filled).
   * @default 'default'
   */
  variant = input<TextareaAppearance>('default');

  /** Nombre de lignes visibles. */
  rows = input<number | undefined>(undefined);

  /** Nombre de colonnes (largeur en caractères). */
  cols = input<number | undefined>(undefined);

  /**
   * Mode de redimensionnement manuel.
   * Ignoré si `resizeAuto` est défini.
   * @default 'vertical'
   */
  resize = input<TextareaResize>('vertical');

  /**
   * Active le redimensionnement automatique.
   * La valeur définit la hauteur maximale en pixels.
   * Désactive le resize manuel.
   */
  resizeAuto = input<number | undefined>(undefined);

  /** Limite de caractères avec compteur affiché. */
  maxlength = input<number | undefined>(undefined);

  /** Texte d'aide affiché sous le champ. */
  helper = input<string | undefined>(undefined);

  /** Message d'erreur (remplace helper, force l'état 'error'). */
  error = input<string | undefined>(undefined);

  /** Icône FontAwesome à gauche du textarea. */
  iconStart = input<IconDefinition | null>(null);

  /** Icône FontAwesome à droite du textarea. */
  iconEnd = input<IconDefinition | null>(null);

  /** Affiche un bouton X pour effacer le contenu. */
  clearable = input<boolean>(false);

  /**
   * Valeur externe pour initialisation sans formulaire.
   * Utile pour les stories Storybook.
   */
  externalValue = input<string | null | undefined>(undefined);

  // ═══════════════════════════════════════════════════════════════════════════
  // SIGNALS & OUTPUTS
  // ═══════════════════════════════════════════════════════════════════════════

  /** État disabled géré par ControlValueAccessor. */
  private readonly disabledState = signal<boolean>(false);

  /** Indique si une valeur externe a été fournie. */
  private readonly hasExternalValue = signal<boolean>(false);

  /** Valeur interne du textarea. */
  readonly internalValue = signal<string>('');

  /**
   * Émis à chaque changement de valeur.
   * Payload : nouvelle valeur (string).
   */
  readonly valueChange = output<string>();

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPUTED (accessibilité & état)
  // ═══════════════════════════════════════════════════════════════════════════

  /** ID de l'élément erreur pour aria-describedby. */
  readonly arErrorId = computed<string | undefined>(() => (this.error() ? `${this.id()}-error` : undefined));

  /** ID de l'élément helper pour aria-describedby. */
  readonly arHelperId = computed<string | undefined>(() => (this.helper() ? `${this.id()}-helper` : undefined));

  /** ID de l'élément compteur pour aria-describedby. */
  readonly arCounterId = computed<string | undefined>(() => (this.maxlength() ? `${this.id()}-counter` : undefined));

  /** Attribut aria-describedby combinant erreur, helper et compteur. */
  readonly ariaDescribedBy = computed<string | undefined>(() => {
    const refs = [this.arErrorId(), this.arHelperId(), this.arCounterId()].filter(Boolean) as string[];
    return refs.length ? refs.join(' ') : undefined;
  });

  /** True si le champ est désactivé (input ou CVA). */
  readonly isDisabled = computed<boolean>(() => this.disabled() || this.disabledState());

  /** État visuel effectif (error forcé si message d'erreur). */
  readonly inputState = computed<TextareaState>(() => {
    if (this.error()) {
      return 'error';
    }
    return this.state();
  });

  /** True si le bouton clear doit être affiché. */
  readonly showClearButton = computed<boolean>(() =>
    this.clearable() && !this.isDisabled() && !this.readonly() && this.internalValue().length > 0,
  );

  /** Mode de resize effectif (none si resizeAuto activé). */
  readonly textareaResize = computed<TextareaResize>(() => (this.resizeAuto() ? 'none' : this.resize()));

  /** Nombre de caractères saisis. */
  readonly characterCount = computed<number>(() => this.internalValue().length);

  protected readonly faClose = faClose;

  @ViewChild('textareaHost', { read: ElementRef }) textareaHost?: ElementRef<HTMLElement>;
  private resizeHandle: number | null = null;
  private resizeObserver?: ResizeObserver;

  constructor() {
    effect(() => {
      const provided = this.externalValue();
      if (provided === undefined) {
        return;
      }
      if (this.hasExternalValue()) {
        return;
      }
      this.internalValue.set(provided ?? '');
    });

    effect(() => {
      this.internalValue();
      if (this.resizeAuto()) {
        queueMicrotask(() => this.scheduleAutoResize());
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.resizeAuto()) {
      this.scheduleAutoResize();
      this.setupResizeObserver();
    }
  }

  ngOnDestroy(): void {
    if (this.resizeHandle && typeof cancelAnimationFrame === 'function') {
      cancelAnimationFrame(this.resizeHandle);
    }
    this.resizeObserver?.disconnect();
  }

  // ControlValueAccessor
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this.hasExternalValue.set(true);
    this.internalValue.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledState.set(isDisabled);
  }

  onPrimitiveValueChange(newValue: string): void {
    if (this.isDisabled()) {
      return;
    }
    this.hasExternalValue.set(true);
    this.internalValue.set(newValue);
    this.onChange(newValue);
    this.valueChange.emit(newValue);
  }

  onInputBlur(): void {
    this.onTouched();
  }

  clearValue(): void {
    if (!this.showClearButton()) {
      return;
    }
    this.hasExternalValue.set(true);
    this.internalValue.set('');
    this.onChange('');
    this.valueChange.emit('');
    this.onTouched();
  }

  private setupResizeObserver(): void {
    if (!this.resizeAuto() || typeof window === 'undefined') {
      return;
    }
    const resizeObserverCtor = (window as WindowWithResizeObserver).ResizeObserver;
    if (typeof resizeObserverCtor !== 'function') {
      return;
    }
    this.resizeObserver?.disconnect();
    const host = this.textareaHost?.nativeElement;
    if (!host) {
      return;
    }
    this.resizeObserver = new resizeObserverCtor(() => this.scheduleAutoResize());
    this.resizeObserver?.observe(host);
  }

  private scheduleAutoResize(): void {
    if (!this.resizeAuto()) {
      return;
    }
    if (typeof requestAnimationFrame !== 'function') {
      this.performAutoResize();
      return;
    }
    if (this.resizeHandle && typeof cancelAnimationFrame === 'function') {
      cancelAnimationFrame(this.resizeHandle);
    }
    this.resizeHandle = requestAnimationFrame(() => this.performAutoResize());
  }

  private performAutoResize(): void {
    const host = this.textareaHost?.nativeElement;
    if (!host) {
      return;
    }
    const textarea = host.querySelector('textarea');
    if (!textarea) {
      return;
    }

    const element = textarea as HTMLTextAreaElement;
    element.style.height = 'auto';
    let nextHeight = element.scrollHeight;
    const maxHeight = this.resizeAuto();
    if (typeof maxHeight === 'number' && maxHeight > 0) {
      nextHeight = Math.min(nextHeight, maxHeight);
    }
    element.style.height = `${nextHeight}px`;
  }
}
