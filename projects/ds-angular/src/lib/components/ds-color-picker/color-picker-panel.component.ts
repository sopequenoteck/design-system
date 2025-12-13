import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  output,
  effect,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export type ColorFormat = 'hex' | 'rgb' | 'hsl';

@Component({
  selector: 'ds-color-picker-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  template: `
    <div class="ds-color-picker-panel" role="dialog" aria-label="Color picker">
      <!-- Spectre de couleurs -->
      <div class="ds-color-picker-panel__spectrum">
        <canvas
          #spectrumCanvas
          class="ds-color-picker-panel__spectrum-canvas"
          width="280"
          height="180"
          (mousedown)="onSpectrumMouseDown($event)"
          (mousemove)="onSpectrumMouseMove($event)"
          (mouseup)="onSpectrumMouseUp()"
          (mouseleave)="onSpectrumMouseUp()">
        </canvas>

        <!-- Curseur de sélection -->
        @if (cursorX() !== null && cursorY() !== null) {
          <div
            class="ds-color-picker-panel__cursor"
            [style.left.px]="cursorX()"
            [style.top.px]="cursorY()">
          </div>
        }
      </div>

      <!-- Slider de teinte -->
      <div class="ds-color-picker-panel__hue-slider">
        <input
          type="range"
          class="ds-color-picker-panel__slider"
          min="0"
          max="360"
          step="1"
          [value]="hue()"
          (input)="onHueChange($event)"
          aria-label="Hue" />
      </div>

      <!-- Slider alpha (optionnel) -->
      @if (showAlpha) {
        <div class="ds-color-picker-panel__alpha-slider">
          <div class="ds-color-picker-panel__alpha-bg"></div>
          <input
            type="range"
            class="ds-color-picker-panel__slider ds-color-picker-panel__slider--alpha"
            min="0"
            max="100"
            step="1"
            [value]="alpha() * 100"
            (input)="onAlphaChange($event)"
            aria-label="Alpha" />
        </div>
      }

      <!-- Inputs manuels -->
      <div class="ds-color-picker-panel__inputs">
        @if (format === 'hex') {
          <div class="ds-color-picker-panel__input-group">
            <label class="ds-color-picker-panel__label">HEX</label>
            <input
              type="text"
              class="ds-color-picker-panel__input"
              [value]="hexValue()"
              (input)="onHexInput($event)"
              maxlength="7"
              placeholder="#000000" />
          </div>
        }

        @if (format === 'rgb') {
          <div class="ds-color-picker-panel__input-group">
            <label class="ds-color-picker-panel__label">R</label>
            <input
              type="number"
              class="ds-color-picker-panel__input"
              min="0"
              max="255"
              [value]="rgb().r"
              (input)="onRGBInput('r', $event)" />
          </div>
          <div class="ds-color-picker-panel__input-group">
            <label class="ds-color-picker-panel__label">G</label>
            <input
              type="number"
              class="ds-color-picker-panel__input"
              min="0"
              max="255"
              [value]="rgb().g"
              (input)="onRGBInput('g', $event)" />
          </div>
          <div class="ds-color-picker-panel__input-group">
            <label class="ds-color-picker-panel__label">B</label>
            <input
              type="number"
              class="ds-color-picker-panel__input"
              min="0"
              max="255"
              [value]="rgb().b"
              (input)="onRGBInput('b', $event)" />
          </div>
          @if (showAlpha) {
            <div class="ds-color-picker-panel__input-group">
              <label class="ds-color-picker-panel__label">A</label>
              <input
                type="number"
                class="ds-color-picker-panel__input"
                min="0"
                max="1"
                step="0.01"
                [value]="alpha()"
                (input)="onAlphaInputManual($event)" />
            </div>
          }
        }
      </div>

      <!-- Couleurs prédéfinies -->
      @if (presetColors.length > 0) {
        <div class="ds-color-picker-panel__presets">
          <div class="ds-color-picker-panel__presets-label">Presets</div>
          <div class="ds-color-picker-panel__presets-grid">
            @for (color of presetColors; track color) {
              <button
                type="button"
                class="ds-color-picker-panel__preset"
                [style.background-color]="color"
                [class.ds-color-picker-panel__preset--selected]="color === value"
                (click)="selectPreset(color)"
                [attr.aria-label]="'Select ' + color">
                @if (color === value) {
                  <fa-icon [icon]="checkIcon" class="ds-color-picker-panel__preset-check"></fa-icon>
                }
              </button>
            }
          </div>
        </div>
      }

      <!-- Couleurs récentes -->
      @if (showRecentColors && recentColors.length > 0) {
        <div class="ds-color-picker-panel__recent">
          <div class="ds-color-picker-panel__recent-label">Recent</div>
          <div class="ds-color-picker-panel__recent-grid">
            @for (color of recentColors; track color) {
              <button
                type="button"
                class="ds-color-picker-panel__preset"
                [style.background-color]="color"
                [class.ds-color-picker-panel__preset--selected]="color === value"
                (click)="selectPreset(color)"
                [attr.aria-label]="'Select ' + color">
                @if (color === value) {
                  <fa-icon [icon]="checkIcon" class="ds-color-picker-panel__preset-check"></fa-icon>
                }
              </button>
            }
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: './color-picker-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsColorPickerPanelComponent implements AfterViewInit {
  @ViewChild('spectrumCanvas') spectrumCanvas?: ElementRef<HTMLCanvasElement>;

  // Config (set by parent)
  value = '';
  showAlpha = false;
  presetColors: string[] = [];
  recentColors: string[] = [];
  showRecentColors = false;
  format: ColorFormat = 'hex';

  // Outputs
  readonly colorSelected = output<string>();
  readonly closed = output<void>();

  // Icons
  readonly checkIcon = faCheck;

  // State
  readonly hue = signal(0);
  readonly saturation = signal(100);
  readonly lightness = signal(50);
  readonly alpha = signal(1);
  readonly cursorX = signal<number | null>(null);
  readonly cursorY = signal<number | null>(null);
  readonly isDragging = signal(false);

  // Computed
  readonly rgb = computed(() => this.hslToRGB(this.hue(), this.saturation(), this.lightness()));

  readonly hexValue = computed(() => {
    const rgb = this.rgb();
    const r = rgb.r.toString(16).padStart(2, '0');
    const g = rgb.g.toString(16).padStart(2, '0');
    const b = rgb.b.toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  });

  readonly currentColor = computed(() => {
    if (this.showAlpha && this.alpha() < 1) {
      const rgb = this.rgb();
      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${this.alpha()})`;
    }
    return this.hexValue();
  });

  constructor() {
    // Observer les changements de couleur
    effect(() => {
      const color = this.currentColor();
      if (color !== this.value) {
        this.colorSelected.emit(color);
      }
    });
  }

  ngAfterViewInit(): void {
    this.initializeFromValue();
    this.renderSpectrum();
  }

  private initializeFromValue(): void {
    if (!this.value) {
      this.updateCursor();
      return;
    }

    const rgb = this.parseColor(this.value);
    if (rgb) {
      const hsl = this.rgbToHSL(rgb.r, rgb.g, rgb.b);
      this.hue.set(hsl.h);
      this.saturation.set(hsl.s);
      this.lightness.set(hsl.l);
      if (rgb.a !== undefined) {
        this.alpha.set(rgb.a);
      }
      this.updateCursor();
    }
  }

  private renderSpectrum(): void {
    if (!this.spectrumCanvas) return;

    const canvas = this.spectrumCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Gradient de saturation (horizontal)
    const satGradient = ctx.createLinearGradient(0, 0, width, 0);
    satGradient.addColorStop(0, 'white');
    satGradient.addColorStop(1, `hsl(${this.hue()}, 100%, 50%)`);
    ctx.fillStyle = satGradient;
    ctx.fillRect(0, 0, width, height);

    // Gradient de luminosité (vertical)
    const lightGradient = ctx.createLinearGradient(0, 0, 0, height);
    lightGradient.addColorStop(0, 'transparent');
    lightGradient.addColorStop(1, 'black');
    ctx.fillStyle = lightGradient;
    ctx.fillRect(0, 0, width, height);
  }

  private updateCursor(): void {
    if (!this.spectrumCanvas) return;

    const canvas = this.spectrumCanvas.nativeElement;
    const x = (this.saturation() / 100) * canvas.width;
    const y = ((100 - this.lightness()) / 100) * canvas.height;

    this.cursorX.set(x);
    this.cursorY.set(y);
  }

  onHueChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.hue.set(parseInt(target.value, 10));
    this.renderSpectrum();
  }

  onAlphaChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.alpha.set(parseInt(target.value, 10) / 100);
  }

  onSpectrumMouseDown(event: MouseEvent): void {
    this.isDragging.set(true);
    this.updateColorFromSpectrum(event);
  }

  onSpectrumMouseMove(event: MouseEvent): void {
    if (this.isDragging()) {
      this.updateColorFromSpectrum(event);
    }
  }

  onSpectrumMouseUp(): void {
    this.isDragging.set(false);
  }

  private updateColorFromSpectrum(event: MouseEvent): void {
    if (!this.spectrumCanvas) return;

    const canvas = this.spectrumCanvas.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - rect.left, canvas.width));
    const y = Math.max(0, Math.min(event.clientY - rect.top, canvas.height));

    const saturation = (x / canvas.width) * 100;
    const lightness = 100 - (y / canvas.height) * 100;

    this.saturation.set(Math.round(saturation));
    this.lightness.set(Math.round(lightness));
    this.cursorX.set(x);
    this.cursorY.set(y);
  }

  onHexInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const hex = target.value;

    if (!hex.startsWith('#')) {
      target.value = '#' + hex;
      return;
    }

    const rgb = this.parseColor(hex);
    if (rgb) {
      const hsl = this.rgbToHSL(rgb.r, rgb.g, rgb.b);
      this.hue.set(hsl.h);
      this.saturation.set(hsl.s);
      this.lightness.set(hsl.l);
      this.renderSpectrum();
      this.updateCursor();
    }
  }

  onRGBInput(channel: 'r' | 'g' | 'b', event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value, 10);

    if (isNaN(value) || value < 0 || value > 255) return;

    const currentRGB = this.rgb();
    const newRGB = { ...currentRGB, [channel]: value };

    const hsl = this.rgbToHSL(newRGB.r, newRGB.g, newRGB.b);
    this.hue.set(hsl.h);
    this.saturation.set(hsl.s);
    this.lightness.set(hsl.l);
    this.renderSpectrum();
    this.updateCursor();
  }

  onAlphaInputManual(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = parseFloat(target.value);

    if (isNaN(value) || value < 0 || value > 1) return;

    this.alpha.set(value);
  }

  selectPreset(color: string): void {
    const rgb = this.parseColor(color);
    if (rgb) {
      const hsl = this.rgbToHSL(rgb.r, rgb.g, rgb.b);
      this.hue.set(hsl.h);
      this.saturation.set(hsl.s);
      this.lightness.set(hsl.l);
      if (rgb.a !== undefined) {
        this.alpha.set(rgb.a);
      }
      this.renderSpectrum();
      this.updateCursor();
    }
  }

  // === Conversions de couleurs ===

  private hslToRGB(h: number, s: number, l: number): { r: number; g: number; b: number } {
    h = h / 360;
    s = s / 100;
    l = l / 100;

    let r: number, g: number, b: number;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  }

  private rgbToHSL(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255;
    g /= 255;
    b /= 255;

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
    };
  }

  private parseColor(color: string): { r: number; g: number; b: number; a?: number } | null {
    // Parse HEX
    if (color.startsWith('#')) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(color);
      if (!result) return null;

      return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: result[4] ? parseInt(result[4], 16) / 255 : undefined,
      };
    }

    // Parse RGB/RGBA
    if (color.startsWith('rgb')) {
      const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (!match) return null;

      return {
        r: parseInt(match[1], 10),
        g: parseInt(match[2], 10),
        b: parseInt(match[3], 10),
        a: match[4] ? parseFloat(match[4]) : undefined,
      };
    }

    return null;
  }
}
