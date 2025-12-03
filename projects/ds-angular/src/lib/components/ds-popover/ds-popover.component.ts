import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-popover',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ds-popover" role="dialog" [attr.aria-label]="ariaLabel()">
      @if (header()) {
        <div class="ds-popover__header">
          <span class="ds-popover__header-title">{{ header() }}</span>
          @if (closeable()) {
            <button
              type="button"
              class="ds-popover__close"
              (click)="close.emit()"
              aria-label="Fermer"
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
          }
        </div>
      }

      <div class="ds-popover__body">
        <ng-content></ng-content>
      </div>

      @if (footer()) {
        <div class="ds-popover__footer">
          {{ footer() }}
        </div>
      }
    </div>
  `,
  styleUrl: './ds-popover.component.scss',
})
export class DsPopoverComponent {
  header = input<string | undefined>(undefined);
  footer = input<string | undefined>(undefined);
  closeable = input<boolean>(true);
  ariaLabel = input<string>('Popover');

  close = output<void>();
}
