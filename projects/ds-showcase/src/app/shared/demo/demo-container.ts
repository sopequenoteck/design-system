import { Component, input, output, signal, computed, TemplateRef, contentChild } from '@angular/core';
import { ThemeSwitcher } from '../theme/theme-switcher';
import { CodePreview } from './code-preview';
import { ControlsPanel } from './controls-panel';
import { ControlConfig, ControlValues } from '../../registry/types';

@Component({
  selector: 'doc-demo-container',
  standalone: true,
  imports: [ThemeSwitcher, CodePreview, ControlsPanel],
  template: `
    <div class="demo-container">
      <!-- Toolbar -->
      <div class="demo-container__toolbar">
        <div class="demo-container__tabs">
          <button
            type="button"
            class="demo-tab"
            [class.active]="activeTab() === 'preview'"
            (click)="activeTab.set('preview')"
          >
            Preview
          </button>
          <button
            type="button"
            class="demo-tab"
            [class.active]="activeTab() === 'code'"
            (click)="activeTab.set('code')"
          >
            Code
          </button>
        </div>

        <div class="demo-container__actions">
          <doc-theme-switcher />
        </div>
      </div>

      <!-- Preview area -->
      @if (activeTab() === 'preview') {
        <div class="demo-container__preview">
          <ng-content />
        </div>

        <!-- Controls panel -->
        @if (controls().length > 0) {
          <div class="demo-container__controls">
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
        <div class="demo-container__code">
          <doc-code-preview [code]="code()" [language]="language()" />
        </div>
      }
    </div>
  `,
  styles: [`
    .demo-container {
      background: var(--background-panel, #ffffff);
      border: 1px solid var(--border-default, #e5e7eb);
      border-radius: var(--radius-3, 12px);
      overflow: hidden;
    }

    // ==========================================================================
    // Toolbar
    // ==========================================================================
    .demo-container__toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 16px;
      border-bottom: 1px solid var(--border-default, #e5e7eb);
      background: var(--background-secondary, #f9fafb);
    }

    .demo-container__tabs {
      display: flex;
      gap: 4px;
    }

    .demo-tab {
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      background: transparent;
      color: var(--text-muted, #6b7280);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;

      &:hover {
        background: var(--background-main, #ffffff);
        color: var(--text-default, #1a1a1a);
      }

      &.active {
        background: var(--background-main, #ffffff);
        color: var(--color-primary, #3b82f6);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      }
    }

    .demo-container__actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    // ==========================================================================
    // Preview area
    // ==========================================================================
    .demo-container__preview {
      padding: 32px;
      min-height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
      background: var(--background-main, #ffffff);
    }

    // ==========================================================================
    // Controls area
    // ==========================================================================
    .demo-container__controls {
      padding: 16px;
      border-top: 1px solid var(--border-default, #e5e7eb);
      background: var(--background-secondary, #f9fafb);
    }

    // ==========================================================================
    // Code area
    // ==========================================================================
    .demo-container__code {
      padding: 0;
    }
  `]
})
export class DemoContainer {
  /** Code source à afficher */
  code = input<string>('');

  /** Langage du code */
  language = input<'typescript' | 'html' | 'scss'>('html');

  /** Configuration des contrôles */
  controls = input<ControlConfig[]>([]);

  /** Valeurs initiales des contrôles */
  initialValues = input<ControlValues>({});

  /** Événement de changement des contrôles */
  controlChange = output<ControlValues>();

  /** Onglet actif */
  activeTab = signal<'preview' | 'code'>('preview');

  /** Valeurs des contrôles */
  controlValues = signal<ControlValues>({});

  constructor() {
    // Initialiser avec les valeurs par défaut
    const initial = this.initialValues();
    if (Object.keys(initial).length > 0) {
      this.controlValues.set(initial);
    }
  }

  onControlChange(values: ControlValues): void {
    this.controlChange.emit(values);
  }
}
