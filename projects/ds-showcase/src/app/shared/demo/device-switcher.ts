import { Component, input, model } from '@angular/core';
import { DocIcon, DocIconName } from '../icon/doc-icon';
import { DsTooltip } from 'ds-angular';

/** Types de devices disponibles */
export type DeviceType = 'desktop' | 'tablet' | 'mobile';

/** Configuration d'un device */
interface DeviceConfig {
  type: DeviceType;
  label: string;
  icon: DocIconName;
  width: number | null; // null = 100%
}

/** Configurations des devices */
const DEVICE_CONFIGS: DeviceConfig[] = [
  { type: 'desktop', label: 'Desktop', icon: 'desktop', width: null },
  { type: 'tablet', label: 'Tablette (768px)', icon: 'tablet', width: 768 },
  { type: 'mobile', label: 'Mobile (375px)', icon: 'mobile', width: 375 },
];

@Component({
  selector: 'doc-device-switcher',
  standalone: true,
  imports: [DocIcon, DsTooltip],
  template: `
    <div
      class="device-switcher"
      [class.device-switcher--disabled]="disabled()"
      role="radiogroup"
      aria-label="Sélection du device"
    >
      @for (device of devices; track device.type) {
        <button
          type="button"
          class="device-switcher__btn"
          [class.active]="selectedDevice() === device.type"
          [attr.aria-pressed]="selectedDevice() === device.type"
          [dsTooltip]="device.label"
          [disabled]="disabled()"
          (click)="selectDevice(device.type)"
        >
          <doc-icon [name]="device.icon" size="sm" />
          <span class="sr-only">{{ device.label }}</span>
        </button>
      }
    </div>
  `,
  styles: [`
    .device-switcher {
      display: inline-flex;
      gap: 2px;
      padding: var(--doc-space-xs, 4px);
      background: var(--doc-surface-elevated, #ffffff);
      border: 1px solid var(--doc-border-subtle, #f1f5f9);
      border-radius: var(--doc-radius-md, 10px);

      &--disabled {
        opacity: 0.5;
        pointer-events: none;
      }
    }

    .device-switcher__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      padding: 0;
      border: none;
      border-radius: var(--doc-radius-sm, 6px);
      background: transparent;
      color: var(--doc-text-tertiary, #94a3b8);
      cursor: pointer;
      transition: all var(--doc-transition-fast, 150ms);

      &:hover:not(.active):not(:disabled) {
        background: var(--doc-surface-sunken, #f1f5f9);
        color: var(--doc-text-secondary, #475569);
      }

      &.active {
        background: var(--doc-accent-primary-light, #eef2ff);
        color: var(--doc-accent-primary, #6366f1);
      }

      &:disabled {
        cursor: not-allowed;
      }

      &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 2px var(--doc-accent-primary-light, #eef2ff),
                    0 0 0 4px var(--doc-accent-primary, #6366f1);
      }
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }

    // Masquer sur mobile (pas de sens de tester mobile sur mobile)
    @media (max-width: 640px) {
      :host {
        display: none;
      }
    }
  `]
})
export class DeviceSwitcher {
  /** Device actuellement sélectionné */
  selectedDevice = model<DeviceType>('desktop');

  /** Désactiver le switcher */
  disabled = input<boolean>(false);

  /** Configurations des devices */
  protected readonly devices = DEVICE_CONFIGS;

  /** Sélectionner un device */
  selectDevice(type: DeviceType): void {
    if (!this.disabled()) {
      this.selectedDevice.set(type);
    }
  }

  /** Obtenir la largeur du device sélectionné */
  getDeviceWidth(): number | null {
    const device = DEVICE_CONFIGS.find(d => d.type === this.selectedDevice());
    return device?.width ?? null;
  }
}
