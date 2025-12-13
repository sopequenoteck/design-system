import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  signal,
  forwardRef,
  effect,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEyeDropper, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { OverlayModule, OverlayRef, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DsColorPickerPanelComponent } from './color-picker-panel.component';

export type ColorPickerSize = 'sm' | 'md' | 'lg';
export type ColorFormat = 'hex' | 'rgb' | 'hsl';

export interface RGBColor {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface HSLColor {
  h: number;
  s: number;
  l: number;
  a?: number;
}

/**
 * DsColorPicker - Composant de sélection de couleur
 *
 * @description
 * Sélecteur de couleur avec palette prédéfinie, spectre de couleurs,
 * support RGB/HSL, alpha channel optionnel, et intégration formulaires.
 *
 * @example
 * ```html
 * <ds-color-picker
 *   [value]="'#3b82f6'"
 *   [showAlpha]="true"
 *   (colorChange)="onColorChange($event)">
 * </ds-color-picker>
 * ```
 */
@Component({
  selector: 'ds-color-picker',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule, OverlayModule],
  templateUrl: './ds-color-picker.html',
  styleUrl: './ds-color-picker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsColorPicker),
      multi: true,
    },
  ],
})
export class DsColorPicker implements ControlValueAccessor {
  // Inputs
  readonly value = input<string>('');
  readonly size = input<ColorPickerSize>('md');
  readonly disabled = input(false);
  readonly showAlpha = input(false);
  readonly presetColors = input<string[]>([]);
  readonly format = input<ColorFormat>('hex');
  readonly placeholder = input('Select color');
  readonly allowClear = input(true);
  readonly showRecentColors = input(true);
  readonly maxRecentColors = input(8);

  // Outputs
  readonly colorChange = output<string>();

  // Icons
  readonly pickerIcon = faEyeDropper;
  readonly clearIcon = faTimes;
  readonly checkIcon = faCheck;

  // State
  readonly isOpen = signal(false);
  readonly internalValue = signal<string>('');
  readonly isFocused = signal(false);
  readonly recentColors = signal<string[]>([]);

  // Overlay
  private overlayRef: OverlayRef | null = null;

  // Computed
  readonly containerClasses = computed(() => {
    const classes = ['ds-color-picker'];
    classes.push(`ds-color-picker--${this.size()}`);
    if (this.disabled()) classes.push('ds-color-picker--disabled');
    if (this.isFocused()) classes.push('ds-color-picker--focused');
    if (this.isOpen()) classes.push('ds-color-picker--open');
    return classes.join(' ');
  });

  readonly displayValue = computed(() => {
    const val = this.internalValue();
    if (!val) return '';

    // Convertir selon le format demandé
    const format = this.format();
    if (format === 'hex') {
      return this.toHex(val);
    } else if (format === 'rgb') {
      return this.toRGB(val);
    } else if (format === 'hsl') {
      return this.toHSL(val);
    }
    return val;
  });

  readonly previewColor = computed(() => {
    return this.internalValue() || 'transparent';
  });

  readonly effectivePresets = computed(() => {
    const custom = this.presetColors();
    if (custom.length > 0) return custom;

    // Palette par défaut
    return [
      '#000000', '#ffffff', '#f87171', '#fb923c', '#fbbf24', '#facc15',
      '#a3e635', '#4ade80', '#34d399', '#2dd4bf', '#22d3ee', '#38bdf8',
      '#60a5fa', '#818cf8', '#a78bfa', '#c084fc', '#e879f9', '#f472b6',
      '#fb7185', '#f43f5e', '#ef4444', '#dc2626', '#b91c1c', '#991b1b',
    ];
  });

  // ControlValueAccessor
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(
    private overlay: Overlay,
    private elementRef: ElementRef
  ) {
    // Sync external value with internal
    effect(() => {
      const val = this.value();
      if (val !== this.internalValue()) {
        this.internalValue.set(val);
      }
    });

    // Charger les couleurs récentes depuis localStorage
    this.loadRecentColors();
  }

  writeValue(value: string): void {
    this.internalValue.set(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Géré par input disabled
  }

  toggle(): void {
    if (this.disabled()) return;

    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  open(): void {
    if (this.disabled() || this.isOpen()) return;

    this.isOpen.set(true);
    this.createOverlay();
  }

  close(): void {
    if (!this.isOpen()) return;

    this.isOpen.set(false);
    this.destroyOverlay();
    this.onTouched();
  }

  onFocus(): void {
    if (!this.disabled()) {
      this.isFocused.set(true);
    }
  }

  onBlur(): void {
    this.isFocused.set(false);
    if (!this.isOpen()) {
      this.onTouched();
    }
  }

  clear(): void {
    if (this.disabled()) return;
    this.updateValue('');
  }

  onColorSelected(color: string): void {
    this.updateValue(color);
    this.addToRecentColors(color);
  }

  private updateValue(value: string): void {
    this.internalValue.set(value);
    this.onChange(value);
    this.colorChange.emit(value);
  }

  private createOverlay(): void {
    if (this.overlayRef) return;

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef.nativeElement.querySelector('.ds-color-picker__trigger'))
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 8,
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: -8,
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });

    const portal = new ComponentPortal(DsColorPickerPanelComponent);
    const componentRef = this.overlayRef.attach(portal);

    // Configuration du panel
    componentRef.instance.value = this.internalValue();
    componentRef.instance.showAlpha = this.showAlpha();
    componentRef.instance.presetColors = this.effectivePresets();
    componentRef.instance.recentColors = this.recentColors();
    componentRef.instance.showRecentColors = this.showRecentColors();
    componentRef.instance.format = this.format();

    // Écouter les événements
    componentRef.instance.colorSelected.subscribe((color: string) => {
      this.onColorSelected(color);
    });

    componentRef.instance.closed.subscribe(() => {
      this.close();
    });

    // Fermer au clic sur backdrop
    this.overlayRef.backdropClick().subscribe(() => {
      this.close();
    });
  }

  private destroyOverlay(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  private addToRecentColors(color: string): void {
    if (!this.showRecentColors() || !color) return;

    const recent = this.recentColors();
    const filtered = recent.filter(c => c !== color);
    const updated = [color, ...filtered].slice(0, this.maxRecentColors());

    this.recentColors.set(updated);
    this.saveRecentColors(updated);
  }

  private loadRecentColors(): void {
    try {
      const stored = localStorage.getItem('ds-color-picker-recent');
      if (stored) {
        const colors = JSON.parse(stored);
        if (Array.isArray(colors)) {
          this.recentColors.set(colors.slice(0, this.maxRecentColors()));
        }
      }
    } catch (e) {
      // Ignorer les erreurs de parsing
    }
  }

  private saveRecentColors(colors: string[]): void {
    try {
      localStorage.setItem('ds-color-picker-recent', JSON.stringify(colors));
    } catch (e) {
      // Ignorer les erreurs de stockage
    }
  }

  // === Conversions de couleurs ===

  private toHex(color: string): string {
    if (color.startsWith('#')) return color;

    const rgb = this.parseRGB(color);
    if (rgb) {
      const r = rgb.r.toString(16).padStart(2, '0');
      const g = rgb.g.toString(16).padStart(2, '0');
      const b = rgb.b.toString(16).padStart(2, '0');
      return `#${r}${g}${b}`;
    }

    return color;
  }

  private toRGB(color: string): string {
    if (color.startsWith('rgb')) return color;

    const rgb = this.hexToRGB(color);
    if (rgb) {
      if (rgb.a !== undefined) {
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
      }
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    }

    return color;
  }

  private toHSL(color: string): string {
    if (color.startsWith('hsl')) return color;

    const rgb = this.hexToRGB(color);
    if (rgb) {
      const hsl = this.rgbToHSL(rgb);
      if (hsl.a !== undefined) {
        return `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${hsl.a})`;
      }
      return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    }

    return color;
  }

  private hexToRGB(hex: string): RGBColor | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
    if (!result) return null;

    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
      a: result[4] ? parseInt(result[4], 16) / 255 : undefined,
    };
  }

  private parseRGB(rgb: string): RGBColor | null {
    const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (!match) return null;

    return {
      r: parseInt(match[1], 10),
      g: parseInt(match[2], 10),
      b: parseInt(match[3], 10),
      a: match[4] ? parseFloat(match[4]) : undefined,
    };
  }

  private rgbToHSL(rgb: RGBColor): HSLColor {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
      a: rgb.a,
    };
  }
}
