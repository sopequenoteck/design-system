import { Component, input, output, signal, ViewChild, computed, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { ThemeSwitcher } from '../theme/theme-switcher';
import { CodePreview } from './code-preview';
import { CodeTabs } from './code-tabs';
import { ControlsPanel } from './controls-panel';
import { DeviceSwitcher, DeviceType } from './device-switcher';
import { DocIcon } from '../icon/doc-icon';
import { ControlConfig, ControlValues, CodeSource } from '../../registry/types';
import { DsButton, DsTooltip, DsBadge } from 'ds-angular';

@Component({
  selector: 'doc-demo-container',
  standalone: true,
  imports: [ThemeSwitcher, CodePreview, CodeTabs, ControlsPanel, DeviceSwitcher, DocIcon, DsButton, DsTooltip, DsBadge],
  template: `
    <div class="demo-container" [class.demo-container--with-controls]="controls().length > 0" [class.demo-container--fullscreen]="isFullscreen()">
      <!-- Toolbar -->
      <div class="demo-toolbar">
        <div class="demo-tabs" role="tablist">
          <button
            #previewTab
            type="button"
            role="tab"
            class="demo-tab"
            [class.active]="activeTab() === 'preview'"
            [attr.aria-selected]="activeTab() === 'preview'"
            (click)="setActiveTab('preview')"
          >
            <doc-icon name="eye" size="sm" />
            <span>Preview</span>
          </button>
          <button
            #codeTab
            type="button"
            role="tab"
            class="demo-tab"
            [class.active]="activeTab() === 'code'"
            [attr.aria-selected]="activeTab() === 'code'"
            (click)="setActiveTab('code')"
          >
            <doc-icon name="code" size="sm" />
            <span>Code</span>
          </button>
          <div
            class="demo-tabs__indicator"
            [style.width.px]="indicatorWidth()"
            [style.transform]="'translateX(' + indicatorOffset() + 'px)'"
          ></div>
        </div>

        <div class="demo-actions">
          @if (activeTab() === 'preview') {
            <doc-device-switcher [(selectedDevice)]="selectedDevice" />
            <div class="demo-separator"></div>
          }
          @if (activeTab() === 'code') {
            <ds-button
              variant="ghost"
              size="sm"
              [dsTooltip]="copied() ? 'Copié !' : 'Copier le code'"
              (click)="copyCode()"
              class="demo-action-btn"
            >
              <doc-icon [name]="copied() ? 'check' : 'copy'" size="sm" />
            </ds-button>
          }
          <ds-button
            variant="ghost"
            size="sm"
            [dsTooltip]="isFullscreen() ? 'Quitter le plein écran' : 'Plein écran'"
            (click)="toggleFullscreen()"
            class="demo-action-btn"
          >
            <doc-icon [name]="isFullscreen() ? 'close' : 'fullscreen'" size="sm" />
          </ds-button>
          <div class="demo-separator"></div>
          <doc-theme-switcher />
        </div>
      </div>

      <!-- Preview area -->
      @if (activeTab() === 'preview') {
        <div
          class="demo-preview"
          [class.demo-preview--device-mode]="selectedDevice() !== 'desktop'"
          role="tabpanel"
        >
          <div
            class="demo-preview__viewport"
            [class.demo-preview__viewport--tablet]="selectedDevice() === 'tablet'"
            [class.demo-preview__viewport--mobile]="selectedDevice() === 'mobile'"
            [style.maxWidth.px]="previewWidth()"
          >
            <ng-content />
          </div>
        </div>

        <!-- Controls panel -->
        @if (controls().length > 0) {
          <div class="demo-controls">
            <div class="demo-controls__header">
              <ds-badge type="primary" size="sm" variant="outline">
                <doc-icon name="forms" size="xs" />
                Contrôles
              </ds-badge>
            </div>
            <doc-controls-panel
              [controls]="controls()"
              [(values)]="controlValues"
              (valueChange)="onControlChange($event)"
            />
          </div>
        }
      }

      <!-- Code area -->
      @if (activeTab() === 'code') {
        <div class="demo-code" role="tabpanel">
          @if (sources().length > 0) {
            <doc-code-tabs [sources]="sources()" />
          } @else if (code()) {
            <doc-code-preview [code]="code()!" [language]="language()" />
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .demo-container {
      background: var(--doc-surface-elevated, #ffffff);
      border: 1px solid var(--doc-border-default, #e2e8f0);
      border-radius: var(--doc-radius-lg, 14px);
      overflow: hidden;
      transition: box-shadow var(--doc-transition-fast, 150ms);

      &:hover {
        box-shadow: var(--doc-shadow-sm);
      }

      // Mode fullscreen
      &--fullscreen {
        position: fixed;
        inset: 0;
        z-index: 9999;
        border-radius: 0;
        border: none;
        display: flex;
        flex-direction: column;
        animation: fullscreenFadeIn 0.2s ease;

        .demo-toolbar {
          flex-shrink: 0;
        }

        .demo-preview {
          flex: 1;
          padding: var(--doc-space-2xl, 48px);
          overflow: auto;
        }

        .demo-controls {
          flex-shrink: 0;
          max-height: 40vh;
          overflow: auto;
        }
      }
    }

    @keyframes fullscreenFadeIn {
      from {
        opacity: 0;
        transform: scale(0.98);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    // ==========================================================================
    // Toolbar
    // ==========================================================================
    .demo-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
      border-bottom: 1px solid var(--doc-border-default, #e2e8f0);
      background: var(--doc-surface-sunken, #f8fafc);
      gap: var(--doc-space-md, 16px);
    }

    // ==========================================================================
    // Tabs
    // ==========================================================================
    .demo-tabs {
      display: flex;
      align-items: center;
      gap: var(--doc-space-xs, 4px);
      position: relative;
      padding: var(--doc-space-xs, 4px);
      background: var(--doc-surface-elevated, #ffffff);
      border-radius: var(--doc-radius-md, 10px);
      border: 1px solid var(--doc-border-subtle, #f1f5f9);
    }

    .demo-tab {
      display: inline-flex;
      align-items: center;
      gap: var(--doc-space-xs, 4px);
      padding: var(--doc-space-xs, 4px) var(--doc-space-md, 16px);
      height: 32px;
      border: none;
      border-radius: var(--doc-radius-sm, 6px);
      background: transparent;
      color: var(--doc-text-tertiary, #94a3b8);
      font-size: 0.8125rem;
      font-weight: 500;
      cursor: pointer;
      transition: all var(--doc-transition-fast, 150ms);
      position: relative;
      z-index: 1;

      &:hover:not(.active) {
        color: var(--doc-text-secondary, #475569);
      }

      &.active {
        color: var(--doc-accent-primary, #6366f1);
      }

      span {
        position: relative;
        z-index: 1;
      }
    }

    .demo-tabs__indicator {
      position: absolute;
      top: var(--doc-space-xs, 4px);
      left: var(--doc-space-xs, 4px);
      height: 32px;
      background: var(--doc-accent-primary-light, #eef2ff);
      border-radius: var(--doc-radius-sm, 6px);
      transition: transform var(--doc-transition-fast, 150ms),
                  width var(--doc-transition-fast, 150ms);
      z-index: 0;
    }

    // ==========================================================================
    // Actions
    // ==========================================================================
    .demo-actions {
      display: flex;
      align-items: center;
      gap: var(--doc-space-xs, 4px);
    }

    .demo-action-btn {
      // Style minimal pour ds-button ghost
      --btn-height-sm: 32px;
      --btn-padding-sm: 0 8px;
      min-width: 32px;

      &:deep(.ds-button) {
        color: var(--doc-text-tertiary, #94a3b8);
        transition: all var(--doc-transition-fast, 150ms);
      }

      &:hover:deep(.ds-button) {
        color: var(--doc-text-primary, #0f172a);
        background: var(--doc-surface-sunken, #f1f5f9);
      }
    }

    .demo-separator {
      width: 1px;
      height: 20px;
      background: var(--doc-border-default, #e2e8f0);
      margin: 0 var(--doc-space-xs, 4px);
    }

    // ==========================================================================
    // Preview area
    // ==========================================================================
    .demo-preview {
      padding: var(--doc-space-xl, 32px);
      min-height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--doc-space-md, 16px);
      flex-wrap: wrap;
      background: var(--doc-surface-elevated, #ffffff);
      animation: doc-fade-in 200ms ease-out;

      // Mode device actif (tablet ou mobile)
      &--device-mode {
        background: var(--doc-surface-sunken, #f8fafc);
        background-image: radial-gradient(
          circle,
          var(--doc-border-subtle, #e2e8f0) 1px,
          transparent 1px
        );
        background-size: 16px 16px;
        padding: var(--doc-space-xl, 32px);
      }
    }

    // Viewport qui contient le composant
    .demo-preview__viewport {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--doc-space-md, 16px);
      flex-wrap: wrap;
      transition: all var(--doc-transition-base, 200ms) ease;

      &--tablet,
      &--mobile {
        background: var(--doc-surface-elevated, #ffffff);
        border-radius: var(--doc-radius-lg, 14px);
        box-shadow: var(--doc-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
        padding: var(--doc-space-xl, 32px);
        animation: deviceViewportIn 0.3s ease-out;
      }

      &--tablet {
        border: 3px solid #1a1a1a;
        border-radius: 20px;
      }

      &--mobile {
        border: 4px solid #1a1a1a;
        border-radius: 32px;
        padding: var(--doc-space-lg, 24px);
      }
    }

    @keyframes deviceViewportIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    // ==========================================================================
    // Controls area
    // ==========================================================================
    .demo-controls {
      border-top: 1px solid var(--doc-border-default, #e2e8f0);
      animation: doc-fade-in-up 200ms ease-out;
    }

    .demo-controls__header {
      display: flex;
      align-items: center;
      gap: var(--doc-space-xs, 4px);
      padding: var(--doc-space-sm, 8px) var(--doc-space-md, 16px);
      background: var(--doc-surface-sunken, #f8fafc);
      border-bottom: 1px solid var(--doc-border-subtle, #f1f5f9);

      ds-chip {
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
    }

    :host ::ng-deep .demo-controls doc-controls-panel {
      padding: var(--doc-space-md, 16px);
    }

    // ==========================================================================
    // Code area
    // ==========================================================================
    .demo-code {
      padding: 0;
      animation: doc-fade-in 200ms ease-out;

      :host ::ng-deep doc-code-preview {
        border-radius: 0;
      }

      :host ::ng-deep .hljs {
        border-radius: 0;
        margin: 0;
      }
    }
  `]
})
export class DemoContainer implements AfterViewInit {
  @ViewChild('previewTab') previewTab?: ElementRef<HTMLButtonElement>;
  @ViewChild('codeTab') codeTab?: ElementRef<HTMLButtonElement>;

  /** Code source à afficher (format simple, déprécié) */
  code = input<string | undefined>('');

  /** Langage du code */
  language = input<'typescript' | 'html' | 'scss'>('html');

  /** Sources de code multiples (HTML, TS, SCSS) */
  sources = input<CodeSource[]>([]);

  /** Configuration des contrôles */
  controls = input<ControlConfig[]>([]);

  /** Valeurs initiales des contrôles */
  initialValues = input<ControlValues>({});

  /** Événement de changement des contrôles */
  controlChange = output<ControlValues>();

  /** Onglet actif */
  activeTab = signal<'preview' | 'code'>('preview');

  /** Mode plein écran */
  isFullscreen = signal(false);

  /** Device sélectionné pour la preview */
  selectedDevice = signal<DeviceType>('desktop');

  /** Largeur de la preview selon le device */
  readonly previewWidth = computed(() => {
    const widths: Record<DeviceType, number | null> = {
      desktop: null,
      tablet: 768,
      mobile: 375
    };
    return widths[this.selectedDevice()];
  });

  /** Code copié */
  copied = signal(false);

  /** Valeurs des contrôles */
  controlValues = signal<ControlValues>({});

  /** Largeur de l'indicateur */
  indicatorWidth = signal(0);

  /** Offset de l'indicateur */
  indicatorOffset = signal(0);

  constructor() {
    // Initialiser avec les valeurs par défaut
    const initial = this.initialValues();
    if (Object.keys(initial).length > 0) {
      this.controlValues.set(initial);
    }
  }

  ngAfterViewInit(): void {
    // Calculer la position initiale de l'indicateur
    setTimeout(() => this.updateIndicator(), 0);
  }

  setActiveTab(tab: 'preview' | 'code'): void {
    this.activeTab.set(tab);
    this.updateIndicator();
  }

  private updateIndicator(): void {
    const activeButton = this.activeTab() === 'preview'
      ? this.previewTab?.nativeElement
      : this.codeTab?.nativeElement;

    if (activeButton) {
      this.indicatorWidth.set(activeButton.offsetWidth);
      this.indicatorOffset.set(activeButton.offsetLeft - 4); // -4 for padding
    }
  }

  onControlChange(values: ControlValues): void {
    this.controlChange.emit(values);
  }

  /** Fermeture via Escape */
  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.isFullscreen()) {
      this.closeFullscreen();
    }
  }

  /** Bascule le mode plein écran */
  toggleFullscreen(): void {
    if (this.isFullscreen()) {
      this.closeFullscreen();
    } else {
      this.openFullscreen();
    }
  }

  /** Ouvre le mode plein écran */
  private openFullscreen(): void {
    this.isFullscreen.set(true);
    document.body.classList.add('fullscreen-open');
  }

  /** Ferme le mode plein écran */
  private closeFullscreen(): void {
    this.isFullscreen.set(false);
    document.body.classList.remove('fullscreen-open');
  }

  /** Copie le code dans le presse-papier */
  copyCode(): void {
    const codeToCopy = this.getCodeToCopy();
    navigator.clipboard.writeText(codeToCopy);
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  /** Récupère le code à copier (HTML en priorité, sinon première source) */
  private getCodeToCopy(): string {
    const sourcesValue = this.sources();
    if (sourcesValue.length > 0) {
      const htmlSource = sourcesValue.find(s => s.language === 'html');
      return htmlSource?.content ?? sourcesValue[0]?.content ?? '';
    }
    return this.code() ?? '';
  }
}
