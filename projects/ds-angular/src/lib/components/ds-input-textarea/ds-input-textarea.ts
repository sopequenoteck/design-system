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
  // Base inputs
  id = input<string>(crypto.randomUUID());
  name = input<string | undefined>(undefined);
  label = input<string | undefined>(undefined);
  ariaLabel = input<string | undefined>(undefined);
  placeholder = input<string>('');
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  required = input<boolean>(false);
  state = input<TextareaState>('default');
  size = input<TextareaSize>('md');
  variant = input<TextareaAppearance>('default');
  rows = input<number | undefined>(undefined);
  cols = input<number | undefined>(undefined);
  resize = input<TextareaResize>('vertical');
  resizeAuto = input<number | undefined>(undefined);
  maxlength = input<number | undefined>(undefined);
  helper = input<string | undefined>(undefined);
  error = input<string | undefined>(undefined);
  iconStart = input<IconDefinition | null>(null);
  iconEnd = input<IconDefinition | null>(null);
  clearable = input<boolean>(false);
  externalValue = input<string | null | undefined>(undefined);

  // Signals
  private readonly disabledState = signal<boolean>(false);
  private readonly hasExternalValue = signal<boolean>(false);
  readonly internalValue = signal<string>('');
  readonly valueChange = output<string>();

  readonly arErrorId = computed<string | undefined>(() => (this.error() ? `${this.id()}-error` : undefined));
  readonly arHelperId = computed<string | undefined>(() => (this.helper() ? `${this.id()}-helper` : undefined));
  readonly arCounterId = computed<string | undefined>(() => (this.maxlength() ? `${this.id()}-counter` : undefined));
  readonly ariaDescribedBy = computed<string | undefined>(() => {
    const refs = [this.arErrorId(), this.arHelperId(), this.arCounterId()].filter(Boolean) as string[];
    return refs.length ? refs.join(' ') : undefined;
  });

  readonly isDisabled = computed<boolean>(() => this.disabled() || this.disabledState());

  readonly inputState = computed<TextareaState>(() => {
    if (this.error()) {
      return 'error';
    }
    return this.state();
  });

  readonly showClearButton = computed<boolean>(() =>
    this.clearable() && !this.isDisabled() && !this.readonly() && this.internalValue().length > 0,
  );

  readonly textareaResize = computed<TextareaResize>(() => (this.resizeAuto() ? 'none' : this.resize()));
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
