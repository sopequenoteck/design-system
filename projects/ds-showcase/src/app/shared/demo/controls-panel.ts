import { Component, input, output, model, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ControlConfig, ControlValues } from '../../registry/types';

@Component({
  selector: 'doc-controls-panel',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="controls-panel">
      <h4 class="controls-panel__title">Controls</h4>

      <div class="controls-panel__grid">
        @for (ctrl of controls(); track ctrl.name) {
          <div class="control-row">
            <label class="control-row__label" [for]="'ctrl-' + ctrl.name">
              {{ ctrl.name }}
              @if (ctrl.description) {
                <span class="control-row__hint" [title]="ctrl.description">ⓘ</span>
              }
            </label>

            <div class="control-row__input">
              @switch (ctrl.type) {
                @case ('boolean') {
                  <label class="control-toggle">
                    <input
                      type="checkbox"
                      [id]="'ctrl-' + ctrl.name"
                      [checked]="getControlValue(ctrl.name)"
                      (change)="updateValue(ctrl.name, $any($event.target).checked)"
                    />
                    <span class="control-toggle__track">
                      <span class="control-toggle__thumb"></span>
                    </span>
                  </label>
                }
                @case ('select') {
                  <select
                    class="control-select"
                    [id]="'ctrl-' + ctrl.name"
                    [value]="getControlValue(ctrl.name)"
                    (change)="updateValue(ctrl.name, $any($event.target).value)"
                  >
                    @for (opt of ctrl.options; track opt) {
                      <option [value]="opt">{{ opt }}</option>
                    }
                  </select>
                }
                @case ('text') {
                  <input
                    type="text"
                    class="control-input"
                    [id]="'ctrl-' + ctrl.name"
                    [value]="getControlValue(ctrl.name)"
                    (input)="updateValue(ctrl.name, $any($event.target).value)"
                  />
                }
                @case ('number') {
                  <input
                    type="number"
                    class="control-input"
                    [id]="'ctrl-' + ctrl.name"
                    [value]="getControlValue(ctrl.name)"
                    [min]="ctrl.min"
                    [max]="ctrl.max"
                    [step]="ctrl.step ?? 1"
                    (input)="updateValue(ctrl.name, +$any($event.target).value)"
                  />
                }
                @case ('color') {
                  <input
                    type="color"
                    class="control-color"
                    [id]="'ctrl-' + ctrl.name"
                    [value]="getControlValue(ctrl.name)"
                    (input)="updateValue(ctrl.name, $any($event.target).value)"
                  />
                }
              }
            </div>
          </div>
        }
      </div>

      @if (controls().length === 0) {
        <p class="controls-panel__empty">Pas de contrôles pour cette démo.</p>
      }
    </div>
  `,
  styles: [`
    .controls-panel {
      background: var(--background-panel, #ffffff);
      border: 1px solid var(--border-default, #e5e7eb);
      border-radius: var(--radius-2, 8px);
      padding: 16px;
    }

    .controls-panel__title {
      margin: 0 0 16px 0;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-default, #1a1a1a);
    }

    .controls-panel__grid {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .controls-panel__empty {
      margin: 0;
      color: var(--text-muted, #9ca3af);
      font-size: 0.875rem;
      font-style: italic;
    }

    // ==========================================================================
    // Control rows
    // ==========================================================================
    .control-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .control-row__label {
      font-size: 0.875rem;
      color: var(--text-default, #374151);
      font-family: var(--doc-code-font, monospace);
    }

    .control-row__hint {
      margin-left: 4px;
      color: var(--text-muted, #9ca3af);
      cursor: help;
    }

    .control-row__input {
      flex-shrink: 0;
    }

    // ==========================================================================
    // Input styles
    // ==========================================================================
    .control-input,
    .control-select {
      padding: 6px 12px;
      border: 1px solid var(--border-default, #d1d5db);
      border-radius: 4px;
      font-size: 0.875rem;
      min-width: 120px;
      background: var(--background-main, #ffffff);
      color: var(--text-default, #1a1a1a);

      &:focus {
        outline: none;
        border-color: var(--color-primary, #3b82f6);
        box-shadow: 0 0 0 2px var(--color-primary-light, #dbeafe);
      }
    }

    .control-color {
      width: 40px;
      height: 32px;
      padding: 2px;
      border: 1px solid var(--border-default, #d1d5db);
      border-radius: 4px;
      cursor: pointer;
    }

    // ==========================================================================
    // Toggle switch
    // ==========================================================================
    .control-toggle {
      position: relative;
      display: inline-block;
      cursor: pointer;

      input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
      }
    }

    .control-toggle__track {
      display: block;
      width: 40px;
      height: 22px;
      background: var(--gray-300, #d1d5db);
      border-radius: 11px;
      transition: background 0.2s ease;
    }

    .control-toggle__thumb {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 16px;
      height: 16px;
      background: white;
      border-radius: 50%;
      transition: transform 0.2s ease;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }

    .control-toggle input:checked + .control-toggle__track {
      background: var(--color-primary, #3b82f6);
    }

    .control-toggle input:checked + .control-toggle__track .control-toggle__thumb {
      transform: translateX(18px);
    }
  `]
})
export class ControlsPanel {
  /** Configuration des contrôles */
  controls = input<ControlConfig[]>([]);

  /** Valeurs actuelles (two-way binding) */
  values = model<ControlValues>({});

  /** Événement de changement */
  valueChange = output<ControlValues>();

  getControlValue(name: string): unknown {
    return this.values()[name];
  }

  updateValue(name: string, value: unknown): void {
    const newValues = { ...this.values(), [name]: value };
    this.values.set(newValues);
    this.valueChange.emit(newValues);
  }
}
